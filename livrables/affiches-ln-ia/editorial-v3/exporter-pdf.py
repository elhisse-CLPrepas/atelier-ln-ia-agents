"""Assemble les PNG existants sans les modifier et contrôle le PDF rendu."""
from pathlib import Path
import json
import hashlib
import math
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from pypdf import PdfReader
from PIL import Image, ImageChops, ImageStat, ImageOps, ImageDraw
import fitz

HERE = Path(__file__).resolve().parent
PAGES = json.loads((HERE / 'sommaire.json').read_text(encoding='utf-8'))
OUTPUT = HERE / 'AFFICHES-LN-IA-29-PAGES-A4.pdf'
QA = HERE / 'controle-pdf'
QA.mkdir(exist_ok=True)
W, H = A4
MARGIN = 6 * mm
records = []
pdf = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
pdf.setTitle('Atelier LN-IA - Le parcours en 29 affiches')
pdf.setAuthor('LAB-NUMERIQUE-IA')
pdf.setSubject('Comprendre, construire, pratiquer et produire avec les agents IA')
for index, page in enumerate(PAGES):
    source = HERE / 'affiches' / page['file']
    with Image.open(source) as image:
        iw, ih = image.size
    scale = min((W - 2*MARGIN)/iw, (H - 2*MARGIN)/ih)
    dw, dh = iw*scale, ih*scale
    x, y = (W-dw)/2, (H-dh)/2
    assert x >= MARGIN - .01 and y >= MARGIN - .01
    pdf.bookmarkPage(page['id'])
    level = 0 if page['id']=='ouverture' or page['kind'].startswith('Étape') else 1
    pdf.addOutlineEntry(page['title'], page['id'], level=level, closed=False)
    pdf.drawImage(ImageReader(str(source)), x, y, width=dw, height=dh, mask='auto')
    pdf.setFont('Helvetica', 6)
    pdf.setFillColorRGB(.36, .39, .43)
    pdf.drawCentredString(W/2, 2.5*mm, f'LN-IA | {index+1:02d} / {len(PAGES)}')
    pdf.showPage()
    records.append({'page':index+1,'id':page['id'],'source':page['file'],
                    'source_sha256':hashlib.sha256(source.read_bytes()).hexdigest(),
                    'source_pixels':[iw,ih],'rectangle_points':[x,y,dw,dh],
                    'effective_dpi':round(iw/(dw/72),1)})
pdf.save()

reader = PdfReader(OUTPUT)
assert len(reader.pages)==len(PAGES)==29
def count_outlines(entries):
    return sum(count_outlines(e) if isinstance(e,list) else 1 for e in entries)
assert count_outlines(reader.outline)==29
rendered = fitz.open(OUTPUT)
for index, page in enumerate(rendered):
    assert abs(page.rect.width-W)<.1 and abs(page.rect.height-H)<.1
    assert len(page.get_images(full=True))==1
    pix = page.get_pixmap(matrix=fitz.Matrix(1.25,1.25), alpha=False)
    pix.save(str(QA / f'page-{index+1:02d}.png'))
    # Render only the actual image rectangle to compare it with its source.
    x,y,dw,dh=records[index]['rectangle_points']
    clip=fitz.Rect(x,H-y-dh,x+dw,H-y)
    crop=page.get_pixmap(matrix=fitz.Matrix(1,1),clip=clip,alpha=False)
    actual=Image.frombytes('RGB',[crop.width,crop.height],crop.samples)
    with Image.open(HERE/'affiches'/PAGES[index]['file']) as source:
        expected=source.convert('RGB').resize(actual.size,Image.Resampling.LANCZOS)
    diff=ImageChops.difference(expected,actual)
    error=sum(ImageStat.Stat(diff).mean)/3
    records[index]['render_mean_absolute_error']=round(error,3)
    assert error<20, (index+1,error)
rendered.close()

# Contact sheets are QA intermediates; the PNG posters stay unchanged.
for start in range(0,len(PAGES),6):
    sheet=Image.new('RGB',(720,1110),'#dedede')
    draw=ImageDraw.Draw(sheet)
    for offset in range(min(6,len(PAGES)-start)):
        n=start+offset
        with Image.open(QA/f'page-{n+1:02d}.png') as im:
            thumb=ImageOps.contain(im,(345,510))
        left=(offset%2)*360+(360-thumb.width)//2
        top=(offset//2)*370+23
        # 3 rows of 360 high, ratio preserved inside each slot.
        thumb.thumbnail((345,337),Image.Resampling.LANCZOS)
        sheet.paste(thumb,((offset%2)*360+(360-thumb.width)//2,top))
        draw.text(((offset%2)*360+15,(offset//2)*370+5),f'PAGE {n+1:02d}',fill='black')
    sheet.save(QA/f'planche-{start//6+1}.png')

report={'status':'passed','pages':29,'format':'A4 portrait','outline_entries':29,
        'images_per_page':1,'cropping':False,'renderer':'PyMuPDF',
        'scope':'Assemblage et rendu ; ne certifie pas chaque affirmation du texte raster.',
        'pdf_sha256':hashlib.sha256(OUTPUT.read_bytes()).hexdigest(),'records':records}
(HERE/'controle-pdf.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({'pdf':str(OUTPUT),'pages':29,'bookmarks':29,
                  'rendered_pages':29,'min_dpi':min(r['effective_dpi'] for r in records),
                  'max_render_error':max(r['render_mean_absolute_error'] for r in records)},ensure_ascii=False))
