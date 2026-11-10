import { build } from 'vite';
import { readFile, writeFile } from 'node:fs/promises';
const result = await build({
  configFile: false,
  publicDir: false,
  build: { write: false, minify: true, cssCodeSplit: false,
    lib: { entry: 'src/main.js', name: 'LNIAAtelier', formats: ['iife'] }
  }
});
const outputs = (Array.isArray(result) ? result : [result]).flatMap(r=>r.output);
const code = outputs.filter(o=>o.type==='chunk').map(o=>o.code).join('\n');
const css = outputs.filter(o=>o.type==='asset'&&o.fileName.endsWith('.css')).map(o=>String(o.source)).join('\n');
const logo = `data:image/png;base64,${(await readFile('public/logo-ln-ia.png')).toString('base64')}`;
const icon = `data:image/svg+xml;base64,${(await readFile('public/favicon.svg')).toString('base64')}`;
let html = await readFile('index.html','utf8');
html = html.replace('<!-- PUBLIC_SEO -->','<!-- Support local autonome. Pas d’indexation. -->')
  .replace('href="./favicon.svg"',`href="${icon}"`)
  .replace('</head>',`<style>${css}</style></head>`)
  .replace('<script type="module" src="/src/main.js"></script>',`<script>${code.replaceAll('./logo-ln-ia.png',logo).replaceAll('./affiches/','./livrables/affiches-ln-ia/editorial-v3/').replaceAll('</script','<\\/script')}</script>`);
await writeFile('APERCU-AUTONOME.html',html);
console.log(`APERCU-AUTONOME.html : ${(Buffer.byteLength(html)/1024/1024).toFixed(2)} Mo, styles/scripts/logo intégrés.`);
