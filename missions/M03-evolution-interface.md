# M03 — Faire évoluer le support Vite

Mode : travail supervisé dans Codex. Extension du MVP pédagogique.

## Besoin à choisir

Choisir une seule évolution avant de commencer. Exemple : ajouter un filtre par type de contrôle à la classification, avec un résultat vide compréhensible et une remise à zéro.

## Entrées et périmètre

Lire `src/`, `contenus/atelier.json`, `docs/ARCHITECTURE.md`, `AGENTS.md` et les scripts existants. Modifications limitées aux fichiers nécessaires. Conserver le logo, la distinction simulation/agent et le fonctionnement sans API.

## Critères

- Le comportement demandé est observable et décrit avant implémentation.
- Le clavier et le mobile permettent d’utiliser l’évolution.
- Les contenus et le laboratoire restent accessibles.
- `npm run check` réussit.
- Le comportement modifié est vérifié dans un navigateur. Si ce contrôle est impossible, le préciser sans annoncer une validation visuelle.
- Le support autonome est reconstruit.

## Budget et arrêt

Une seule fonctionnalité. Au maximum deux cycles de correction après la première implémentation. Pas de nouvelle dépendance sans justification de son utilité. Arrêter si la demande nécessite une refonte ou un service externe.

## Sorties

Code modifié et `livrables/M03/rapport.md` avec problème, choix, fichiers, contrôles exécutés, limites et décision attendue. Pas de publication automatique.
