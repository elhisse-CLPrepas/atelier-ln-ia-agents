# Missions, skills, outils et responsabilités

Version 1.0 · 10 novembre 2026

Une mission fixe le résultat. Un skill décrit une procédure réutilisable. Un outil accomplit une opération. Un workflow organise les étapes. Un agent choisit certaines actions selon l’objectif et les observations. Le modèle fournit des capacités de langage ou de décision, tandis que l’environnement applique les permissions.

## Les contrats fournis

| Mission | Résultat | Mode | Preuve de réussite |
|---|---|---|---|
| M01 | Fiche pédagogique et journal | Simulation locale ou exercice Codex distinct | Trois points reliés au corpus, exercice, revue |
| M02 | Annonce factuelle Atelier Passage | Codex supervisé | Faits conformes à S01, 100 mots au maximum, grille et décision |
| M03 | Évolution ciblée du support | Codex supervisé | Comportement démontré, tests adaptés, build et contrôle visuel |
| M04 | Dossier d’architecture d’un agent connecté | Étude | Contrats, frontières, quotas, plan de tests et décision de poursuite |

Le premier passage conseillé est M01 dans le navigateur, puis M02 dans VS Code. M03 et M04 sont des prolongements. Le prompt maître ne les lance pas tous.

## Les quatre skills de projet

| Skill | Déclencheur | Sortie attendue |
|---|---|---|
| `lnia-cadrer-mission` | Besoin à transformer en contrat | Contrat avec critères et limites |
| `lnia-controler-entrees` | Corpus à admettre avant rédaction | Tableau admis, rejeté, incertain et preuves |
| `lnia-produire-fiche` | Fiche pédagogique explicitement demandée | Brouillon sourcé et exercice |
| `lnia-valider-livrable` | Brouillon prêt pour contrôle | Grille, anomalies et statut de revue |

Le skill de production de fiche n’est pas utilisé pour l’annonce M02. La rédaction de l’annonce relève du contrat M02. Ce choix évite d’utiliser un skill uniquement parce qu’il existe.

## Créer un nouveau skill

1. Identifier une procédure répétée après l’avoir pratiquée.
2. Créer `.agents/skills/nom-court/SKILL.md`.
3. Ajouter un en-tête YAML `name` et `description`. Le nom utilise des minuscules, chiffres et tirets et correspond au dossier.
4. Décrire les entrées, la procédure, la sortie, les limites et la réception.
5. Référencer les scripts plutôt que recopier leur code.
6. Essayer le skill sur un cas normal et un cas qui doit être refusé.
7. Vérifier le déclenchement dans Codex et noter la version de l’environnement utilisé.

Ces fichiers sont des skills de dépôt. Le ZIP n’installe aucune compétence personnelle dans votre compte ChatGPT. La reconnaissance dépend de l’environnement qui prend en charge la convention. Lire le fichier explicitement reste un mode de travail possible mais doit être distingué d’une découverte automatique vérifiée.

## Contrat minimal

| Champ | Question à résoudre |
|---|---|
| Objectif et destinataire | Qui utilise le résultat et pour quelle décision ? |
| Entrées et provenance | Quelles sources peuvent être utilisées ? |
| Livrable et emplacement | Quel objet doit exister à la fin ? |
| Critères | Quelles propriétés sont observables ? |
| Permissions | Quelles actions l’environnement autorise-t-il réellement ? |
| Budgets | Combien d’étapes, de tentatives, de temps ou de dépenses ? |
| Arrêt et reprise | Qu’est-ce qui bloque et qui décide de reprendre ? |
| Revue et traces | Qui accepte et quelles preuves sont conservées ? |

## Du rôle à l’implémentation

Les fiches du dossier `agents/` décrivent des responsabilités. Elles ne lancent aucun processus. Une seule instance de Codex peut assumer plusieurs responsabilités successivement. Pour un premier atelier, cela évite d’introduire prématurément les problèmes de coordination et de mémoire partagée.

Une séparation entre producteur et contrôleur est utile, mais deux agents utilisant les mêmes sources et le même modèle peuvent partager une erreur. Les contrôles déterministes et la revue des sources restent nécessaires.
