import { mkdir, copyFile, readdir, readFile } from 'node:fs/promises';
await mkdir('public/ressources',{recursive:true});
for(const name of await readdir('docs')) if(name.endsWith('.md')) await copyFile(`docs/${name}`,`public/ressources/${name}`);
for(const name of ['README.md','DEMARRER-ICI.md','PROMPT-MAITRE-CODEX.md','AGENTS.md']) await copyFile(name,`public/ressources/${name}`);
console.log('Documents publics synchronisés pour le support.');

// Liste explicite : les essais, traces de génération et archives ne sont pas publiés.
const collection = 'livrables/affiches-ln-ia/editorial-v3';
const index = JSON.parse(await readFile(`${collection}/sommaire.json`, 'utf8'));
await mkdir('public/affiches/affiches', { recursive: true });
for (const name of ['LIVRE-AFFICHES-LN-IA.html', 'logo-original.png', 'AFFICHES-LN-IA-29-PAGES-A4.pdf']) {
  await copyFile(`${collection}/${name}`, `public/affiches/${name}`);
}
for (const page of index) {
  if (!/^[a-z0-9-]+\.png$/.test(page.file)) throw new Error('Nom d’affiche non autorisé.');
  await copyFile(`${collection}/affiches/${page.file}`, `public/affiches/affiches/${page.file}`);
}
console.log(`${index.length} affiches, livre et PDF préparés pour publication.`);
