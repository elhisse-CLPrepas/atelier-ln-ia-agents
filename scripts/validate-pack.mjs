import { readFile, readdir, access } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { validateMission, validateData } from '../src/domain/production.js';
const readJson=async p=>JSON.parse(await readFile(p,'utf8'));
const data=await readJson('contenus/atelier.json');
for(const [key,count] of Object.entries({modules:4,slides:28,quiz:12,flashcards:12,taxonomy:8,risks:8,mvps:4}))assert.equal(data[key].length,count,`Nombre de ${key}`);
for(const q of data.quiz)assert.ok(q.correct>=0&&q.correct<q.options.length,`Réponse ${q.id}`);
for(const m of data.modules)assert.ok(m.exercise.steps.length&&m.exercise.acceptance.length&&m.concepts.length);
assert.deepEqual(validateMission(await readJson('missions/M01-fiche-pedagogique.json')),[]);
assert.deepEqual(validateData(await readJson('fixtures/corpus.json')),[]);
const dirs=await readdir('.agents/skills');assert.equal(dirs.length,4);
for(const dir of dirs){
  const text=await readFile(`.agents/skills/${dir}/SKILL.md`,'utf8');
  assert.match(dir,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  assert.ok(dir.length<=64&&text.startsWith('---\n'));
  assert.ok(text.includes(`name: ${dir}\n`),`Nom du skill ${dir}`);
  const description=text.match(/^description: (.+)$/m)?.[1];
  assert.ok(description&&description.length<=1024,`Description du skill ${dir}`);
}
for(const f of ['README.md','DEMARRER-ICI.md','PROMPT-MAITRE-CODEX.md','AGENTS.md','docs/ARCHITECTURE.md','docs/PROGRAMME-FORMATEUR.md','docs/CAHIER-PARTICIPANT.md','docs/SOURCES.md','public/logo-ln-ia.png','references/Dossier-Prospective-2027-source.docx'])await access(f);
console.log('Pack cohérent : contenus, missions, corpus, quatre skills et documents requis.');
