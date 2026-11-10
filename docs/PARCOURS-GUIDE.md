# Parcours guidé de l’atelier LN-IA

Version 1.0 · 10 novembre 2026 · En attente de revue humaine

Ce parcours relie le document fourni `Comprendre-et-utiliser-les-Agents-IA-LN-IA-v1.0.docx` aux exercices du pack. Il permet de commencer par une première preuve de compréhension, puis de préparer et contrôler une production locale. Les activités s’intègrent aux quatre séances existantes de 120 minutes ; elles ne s’ajoutent pas à leurs durées.

Le Word apporte les explications. Le [programme formateur](PROGRAMME-FORMATEUR.md) fixe les durées. Le [cahier participant](CAHIER-PARTICIPANT.md) fournit les exercices. Le [contrat M02](../missions/M02-annonce-factuelle.md) fixe les règles de la production supervisée. Les numéros de page mentionnés dans le Word n’ont pas été vérifiés par un rendu lors de cette intégration : les repères ci-dessous utilisent ses titres.

## Commencer maintenant

1. Lire dans le Word « Comprendre ce qui fait un agent » et « Décrire un agent selon huit critères ».
2. Effectuer l’exercice 1 du cahier participant : classer les cinq systèmes A à E et justifier qui choisit l’action suivante.
3. Copier le [modèle de fiche agent](FICHE-AGENT.md) dans un dossier de travail personnel, puis décrire le système C. Une information inconnue reste « non documentée ».
4. Faire relire une classification et un effet autorisé ou interdit. Consigner la correction avant de passer à la séance 2.

Cette première activité ne nécessite ni installation des dépendances ni appel à un modèle. Pour découvrir le laboratoire, ouvrir ensuite `APERCU-AUTONOME.html` à la racine du pack.

## Les quatre séances et leurs preuves

| Séance | Sections du Word | Activité du pack | Preuve à conserver | Condition de passage |
|---|---|---|---|---|
| 1 Comprendre · 120 min | Comprendre ce qui fait un agent ; Décrire un agent selon huit critères | Exercice 1, puis fiche agent | Matrice A à E, fiche et justification corrigée | Expliquer qui choisit l’action suivante et un effet permis ou interdit |
| 2 Construire · 120 min | Rédiger un contrat de mission ; Construire et utiliser un skill ; Contrôler les données avant de produire | Exercice 2 avec les sources Atelier Passage | Mission, skill de travail, tableau des entrées et grille | Identifier S01 approuvée, rejeter S02 et S03 avec preuve, nommer le relecteur |
| 3 Pratiquer · 120 min | Relier la boucle au cycle de production ; Vérifier et accepter le livrable | Laboratoire M01, puis exercice 3 et variantes documentaires | Export du journal et trois fiches d’incident | Expliquer l’arrêt et la condition de reprise sans inventer une capacité du simulateur |
| 4 Produire · 120 min | Produire avec Codex dans VS Code ; Évaluer la compréhension et la production | Exercice 4 et mission M02 | Huit fichiers M02, revue et portfolio | Relier chaque fait à S01 et obtenir une décision humaine sur une version identifiée |

Le corpus M01 et les sources Atelier Passage M02 sont distincts. Le laboratoire M01 est déterministe. Il ne lit pas automatiquement les sources M02 et ne déclenche pas Codex. Les variantes non disponibles à l’écran sont traitées dans les fiches d’incident.

## Préparer la production M02

Nommer le participant ou formateur responsable de la revue avant l’exercice. Lire le contrat, puis utiliser le [prompt maître](../PROMPT-MAITRE-CODEX.md). Le nom de l’auteur du Word ne constitue pas une désignation automatique du relecteur.

Les sorties attendues dans `livrables/M02/` sont : `contrat.md`, `controle-entrees.md`, `annonce.md`, `grille-controle.md`, `journal.md`, `issues.md`, `decision.md` et `portfolio.md`. Les quatre fichiers cités dans l’exercice 4 du cahier constituent le noyau pédagogique ; le contrat M02 demande le dossier complet de huit fichiers.

La source de faits est `fixtures/atelier-passage/sources/S01-brief-approuve.txt`, version 2. S02 est périmée, S03 est une donnée hostile de test. Leur contenu ne donne aucun droit supplémentaire. Deux tentatives de rédaction sont autorisées avant revue. Ne pas utiliser le skill de fiche pédagogique pour produire l’annonce.

Après rédaction seulement, exécuter depuis la racine :

```powershell
node scripts/controler-annonce.mjs livrables/M02/annonce.md
```

Comparer ensuite chaque fait avec S01, examiner les ajouts et les ambiguïtés, puis remettre la version et la grille au relecteur. Le statut reste « en attente de revue humaine » jusqu’à sa décision réelle. Aucun envoi ni publication n’est prévu.

## Vérifier la compréhension

Utiliser les [six questions complémentaires](EVALUATION-COMPLEMENTAIRE.md) après les activités. Conserver les réponses avant de consulter le corrigé et demander une preuve dans les fichiers ou le journal.

Le portfolio reçoit au maximum deux points par dimension : mission, entrées, livrable sourcé, journal et reprise, revue et bilan. Le seuil pédagogique proposé est 8/10 sans défaut bloquant. Un score ne remplace ni la décision du formateur ni la vérification des pièces. Il ne s’agit pas d’une certification.

## Choisir la suite

Terminer une première production M02 et sa revue avant de choisir une extension. M03 porte sur une seule évolution du support ; M04 est une étude de futur service connecté. Aucune de ces missions ne se lance automatiquement. Les durées et coûts non observés restent « non mesurés ».
