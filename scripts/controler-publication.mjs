import {readFile, readdir, access, stat} from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const expected = process.env.SITE_URL;
assert.ok(expected, 'SITE_URL requise pour contrôler une publication réelle.');
const url = new URL(expected);
if (!url.pathname.endsWith('/')) url.pathname += '/';
const root = path.resolve('dist');
const html = await readFile(path.join(root, 'index.html'), 'utf8');
assert.ok(html.includes(`<link rel="canonical" href="${url.href}">`), 'Canonique publique incorrecte.');
assert.ok(html.includes('content="index,follow"'), 'Publication encore marquée noindex.');
const robots = await readFile(path.join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes('Allow: /') && !robots.includes('Disallow: /'));
assert.ok(robots.includes(new URL('sitemap.xml', url).href));
assert.ok((await readFile(path.join(root, 'sitemap.xml'), 'utf8')).includes(url.href));

async function checkLinks(file) {
  const content = await readFile(file, 'utf8');
  for (const [, raw] of content.matchAll(/(?:href|src)="([^"#]+)"/g)) {
    if (/^(?:https?:|data:|mailto:)/.test(raw)) continue;
    const relative = decodeURIComponent(raw.split(/[?#]/)[0]);
    if (!relative) continue;
    assert.ok(!relative.startsWith('/'), `Chemin absolu incompatible avec le sous-dossier : ${raw}`);
    const target = path.resolve(path.dirname(file), relative);
    assert.ok(target === root || target.startsWith(root+path.sep), `Lien hors dist : ${raw}`);
    await access(target);
  }
}
await checkLinks(path.join(root, 'index.html'));
await checkLinks(path.join(root, 'affiches/LIVRE-AFFICHES-LN-IA.html'));
const images = (await readdir(path.join(root, 'affiches/affiches'))).filter(f=>f.endsWith('.png'));
assert.equal(images.length, 29, 'La collection doit contenir 29 affiches.');
const pdf = await stat(path.join(root, 'affiches/AFFICHES-LN-IA-29-PAGES-A4.pdf'));
assert.ok(pdf.size > 1_000_000, 'PDF absent ou incomplet.');
assert.ok((await readFile('APERCU-AUTONOME.html','utf8')).includes('./livrables/affiches-ln-ia/editorial-v3/'), 'Lien des affiches locales absent du support autonome.');
console.log(`Publication contrôlée : ${url.href}, métadonnées, ressources, 29 affiches et PDF (${Math.round(pdf.size/1024/1024)} Mo).`);
