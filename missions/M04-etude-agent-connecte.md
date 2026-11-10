# M04 — Concevoir une extension avec un agent connecté

Mode : étude technique. Aucune connexion ni implémentation d’un service.

## Objectif

Décrire le plus petit service capable de recevoir une mission, utiliser un modèle avec des outils autorisés, garder des traces et soumettre un résultat à la validation humaine.

## Questions à résoudre

- Quel utilisateur et quel bénéfice mesurable ?
- Pourquoi un script ou un workflow prédéfini ne suffit-il pas ?
- Quelles entrées, quels outils et quels effets réels ?
- Où les permissions sont-elles vérifiées avant chaque action ?
- Comment protéger les secrets côté serveur ?
- Comment limiter durée, coût, concurrence et tentatives ?
- Comment annuler, reprendre sans dupliquer un effet et révoquer un accès ?
- Comment authentifier une approbation humaine ?

## Sorties dans livrables/M04/

`architecture.md`, `contrats.md`, `risques.md`, `plan-essais.md`, `decision-poursuite.md`.

La comparaison de fournisseurs éventuelle utilise leurs documentations officielles à la date de l’étude. Les tarifs et capacités sont vérifiés avant estimation. Aucun nom de modèle, prix ou quota futur n’est inventé.

## Réception

Le dossier distingue front, serveur, modèle, outils, données, stockage et audit. Il propose un essai normal, un refus de permission, une donnée hostile, un budget épuisé, une reprise et une révocation. Les coûts inconnus restent explicitement inconnus.

Le résultat est une proposition pour décision. Le passage à l’implémentation demande une nouvelle mission concrète, un fournisseur choisi et des accès configurés dans l’environnement approprié.
