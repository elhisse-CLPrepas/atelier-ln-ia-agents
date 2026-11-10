import { readFile } from 'node:fs/promises';
import { validateData } from '../src/domain/production.js';
const file=process.argv[2]||'fixtures/corpus.json';
try {
  const records=JSON.parse(await readFile(file,'utf8'));
  const issues=validateData(records);
  console.log(JSON.stringify({file,asOf:'2026-11-10',scope:'corpus pédagogique M01 uniquement',status:issues.length?'blocked':'passed',issues},null,2));
  process.exitCode=issues.length?1:0;
}catch(error){console.error(`Contrôle impossible : ${error.message}`);process.exitCode=1;}
