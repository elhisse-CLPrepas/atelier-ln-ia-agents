# Évaluation complémentaire de l’atelier

Adaptation des sections « Évaluer la compréhension et la production » et « Corriger les raisonnements des participants » du document Word fourni. Ces questions complètent le quiz du mini-site sans en modifier le contenu.

## Questions à remettre au participant

Répondre avant de consulter le corrigé. Pour chaque réponse, donner une explication et une preuve issue du cas étudié, ou indiquer ce qui reste non documenté.

1. Une seule instance joue successivement le rédacteur et le contrôleur. Cela démontre-t-il un système multiagents ?
2. Un agent conserve des informations entre deux sessions. Cela prouve-t-il un apprentissage ou un droit de publication ?
3. Dans M02, S01 et S02 indiquent des horaires différents. Quelle preuve permet de choisir ?
4. Le contrôle automatique de l’annonce réussit. Que reste-t-il à vérifier avant livraison ?
5. Le laboratoire M01 produit une fiche après validation. Qu’a-t-il démontré et que laisse-t-il non évalué ?
6. Une future mission doit automatiser une diffusion. Que faut-il définir avant d’autoriser cet effet externe ?

## Corrigé pour la revue

| Question | Raisonnement attendu | Preuve à demander |
|---|---|---|
| 1 | Des rôles successifs peuvent être assurés par une même instance. Plusieurs agents exigent des exécutions et échanges distincts. | Description des instances, tâches et échanges réellement observés |
| 2 | Mémoire, apprentissage et permissions sont des dimensions séparées. | Stockage et durée de conservation ; mécanisme d’apprentissage documenté ; droit d’action explicite |
| 3 | S01 est approuvée en version 2 ; S02 est explicitement remplacée. La plausibilité de l’horaire ne suffit pas. | Statut et version dans les fichiers de `fixtures/atelier-passage/sources/` |
| 4 | Comparer chaque fait à S01, rechercher ajouts, négations, ambiguïtés et omissions, puis recueillir la décision humaine. | Grille factuelle et décision sur la version examinée |
| 5 | Le simulateur illustre un cycle déterministe, ses arrêts et sa revue. Il n’évalue pas un LLM ni une sécurité générale contre les injections. | Journal exporté et distinction entre simulation et session Codex |
| 6 | Cadrer destinataire, contenu approuvé, droits techniques, contrôle avant action, budget, traces, annulation et reprise dans une nouvelle mission. | Nouveau contrat et vérifications des permissions ; aucune diffusion dans M02 |

## Consigner la réception

Pour chaque réponse, le formateur renseigne « acquis », « à renforcer » ou « non observé », avec la preuve examinée et la correction attendue. Aucune réponse n’est déclarée acquise dans ce modèle.

Terminer par une restitution de trois minutes : présenter le livrable, retrouver la source d’un fait et expliquer une limite ou une reprise. La réception du portfolio demeure celle du programme formateur, avec cinq dimensions sur deux points et un seuil proposé de 8/10 sans défaut bloquant. Ne pas convertir automatiquement ce questionnaire en score de portfolio.
