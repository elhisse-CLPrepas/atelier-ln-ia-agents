import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { makeScenario, runUntilReview, review, toMarkdown } from '../src/domain/production.js';
const mission=JSON.parse(await readFile('missions/M01-fiche-pedagogique.json'));
const corpus=JSON.parse(await readFile('fixtures/corpus.json'));
await mkdir('livrables/demo',{recursive:true});
let run=runUntilReview(makeScenario(mission,corpus,'valide'));
await writeFile('livrables/demo/journal-en-attente.json',JSON.stringify(run,null,2));
console.log('Simulation arrêtée en revue. Aucune validation humaine réelle n’a été donnée.');
if(process.argv.includes('--illustrer-acceptation')){
  run=review(run,true,'EXEMPLE SIMULÉ : décision d’acceptation fictive pour illustrer la suite du cycle.');
  run=runUntilReview(run);
  await writeFile('livrables/demo/fiche-exemple.md','EXEMPLE SIMULÉ — ne constitue pas une validation humaine réelle.\n\n'+toMarkdown(run));
  await writeFile('livrables/demo/journal-exemple-accepte.json',JSON.stringify({...run,decisionFictive:true},null,2));
  console.log('Exemple accepté fictif exporté et explicitement identifié.');
}
for(const scenario of ['source','fraicheur','injection','budget']){
  const blocked=runUntilReview(makeScenario(mission,corpus,scenario));
  await writeFile(`livrables/demo/journal-${scenario}.json`,JSON.stringify(blocked,null,2));
}
console.log('Cinq journaux reproductibles disponibles dans livrables/demo/.');
