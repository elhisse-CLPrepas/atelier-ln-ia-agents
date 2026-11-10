import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRun, advance, review, runUntilReview, validateMission, validateData, validateOutput, makeScenario, toMarkdown } from '../src/domain/production.js';
const mission = JSON.parse(readFileSync(new URL('../missions/M01-fiche-pedagogique.json', import.meta.url)));
const corpus = JSON.parse(readFileSync(new URL('../fixtures/corpus.json', import.meta.url)));

test('un parcours valide attend la décision humaine avant toute livraison', () => {
  const pending = runUntilReview(createRun(mission, corpus));
  assert.equal(pending.status, 'waiting'); assert.equal(pending.delivered, false);
  assert.throws(() => toMarkdown(pending), /validé/);
  assert.deepEqual(advance(pending), pending);
  const approved = review(pending, true, 'Trois sources relues et exercice réalisable.');
  const done = runUntilReview(approved);
  assert.equal(done.status, 'completed'); assert.equal(done.delivered, true);
  assert.match(toMarkdown(done), /\[S01\]/); assert.equal(done.actions, 1);
});
test('un refus bloque la livraison et nécessite une nouvelle exécution', () => {
  const denied = review(runUntilReview(createRun(mission, corpus)), false, 'Exercice à préciser.');
  assert.equal(runUntilReview(denied).status, 'rejected'); assert.equal(denied.delivered, false);
  assert.throws(() => toMarkdown(denied));
});
test('une approbation vide ou hors étape est sans effet', () => {
  const fresh = createRun(mission, corpus); assert.deepEqual(review(fresh, true, 'ok'), fresh);
  const pending = runUntilReview(fresh); assert.equal(review(pending, true, '').status, 'waiting');
});
for (const scenario of ['source', 'fraicheur', 'injection', 'budget']) {
  test(`le scénario ${scenario} bloque sans livrer`, () => {
    const result = runUntilReview(makeScenario(mission, corpus, scenario));
    assert.equal(result.status, 'blocked'); assert.equal(result.delivered, false);
    assert.ok(result.issues.length); assert.equal(result.actions, 0);
  });
}
test('les permissions excessives et la désactivation de la revue sont rejetées', () => {
  assert.ok(validateMission({ ...mission, permissions: ['publier'] }).length);
  assert.ok(validateMission({ ...mission, humanApproval: false }).length);
});
test('les doublons et la classification confidentielle bloquent les entrées', () => {
  const changed = structuredClone(corpus); changed[1].id = 'S01'; changed[2].classification = 'confidentiel';
  assert.equal(validateData(changed).length, 2);
});
test('une date future ne constitue pas une preuve de fraîcheur', () => {
  const changed = structuredClone(corpus); changed[0].updatedAt = '2099-01-01';
  assert.ok(validateData(changed).length);
});
test('un fait inventé ou une référence absente échoue à la validation de sortie', () => {
  const result = runUntilReview(createRun(mission, corpus));
  result.output.points[0].text = 'Fait absent du corpus.';
  assert.ok(validateOutput(result.output, corpus).length);
});
test('le budget d’étapes limite une exécution indépendamment du budget d’actions', () => {
  const result = runUntilReview(createRun({ ...mission, maxSteps: 2 }, corpus));
  assert.equal(result.status, 'blocked'); assert.equal(result.steps, 2); assert.equal(result.actions, 0);
});

test('la lecture et la rédaction exigent chacune leur permission', () => {
  const readDenied = runUntilReview(createRun({ ...mission, permissions: ['rediger_brouillon'] }, corpus));
  assert.equal(readDenied.status, 'blocked'); assert.equal(readDenied.index, 1);
  const writeDenied = runUntilReview(createRun({ ...mission, permissions: ['lire_sources'] }, corpus));
  assert.equal(writeDenied.status, 'blocked'); assert.equal(writeDenied.index, 3);
});
