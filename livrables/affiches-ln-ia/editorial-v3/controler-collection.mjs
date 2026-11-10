import {readFile,access,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {Script} from 'node:vm';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const pages=JSON.parse(await readFile(path.join(here,'sommaire.json'),'utf8'));
if(pages.length!==29||new Set(pages.map(p=>p.id)).size!==29)throw Error('Sommaire incomplet ou identifiants dupliqués');
const records=[];
for(const p of pages){
 const bytes=await readFile(path.join(here,'affiches',p.file));
 if(bytes.subarray(0,8).toString('hex')!=='89504e470d0a1a0a')throw Error('PNG invalide : '+p.file);
 const width=bytes.readUInt32BE(16),height=bytes.readUInt32BE(20);
 if(height<=width)throw Error('Affiche non portrait : '+p.file);
 records.push({id:p.id,file:p.file,width,height,bytes:bytes.length,sha256:createHash('sha256').update(bytes).digest('hex')});
}
if(new Set(records.map(r=>r.sha256)).size!==29)throw Error('Images dupliquées dans la collection');
const html=await readFile(path.join(here,'LIVRE-AFFICHES-LN-IA.html'),'utf8');
const missing=[];
for(const [,file] of html.matchAll(/(?:src|data-src|href)="([^"#]+)"/g)){
 if(/^(?:https?:|data:)/.test(file))continue;
 try{await access(path.join(here,file))}catch{missing.push(file)}
}
if(missing.length)throw Error('Fichiers manquants : '+missing.join(', '));
for(const [,anchor] of html.matchAll(/href="#([^"]+)"/g)){
 if(!html.includes(`id="${anchor}"`))throw Error('Ancre absente : '+anchor);
}
for(const [,script] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new Script(script);
await writeFile(path.join(here,'controle-fichiers.json'),JSON.stringify({status:'passed',images:records.length,unique:29,brokenLinks:0,inlineJavaScriptSyntax:'passed',scope:'Structure, intégrité des fichiers et syntaxe ; ne prouve pas la fidélité du texte généré ni le rendu navigateur.',records},null,2));
console.log('29 PNG portrait distincts, fichiers et ancres présents, JavaScript syntaxiquement valide.');
