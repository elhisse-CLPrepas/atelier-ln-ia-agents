# Contrôle des données et réception des sorties

Version 1.0 · 10 novembre 2026

## Trois portes de contrôle

| Porte | Contrôles | Résultat requis |
|---|---|---|
| Avant production | Provenance, identité, version, date, statut, pertinence, usage autorisé | Entrées admises et anomalies documentées |
| Avant revue | Format, complétude, références, critères observables, budget | Brouillon vérifié ou blocage expliqué |
| Avant livraison | Sens, utilité, fidélité, défauts restants, décision humaine | Décision explicite et version identifiée |

Dans M01, le moteur vérifie une provenance commençant par LNIA-, des identifiants distincts, une classification `public-fictif`, une date valide et une ancienneté de 365 jours au maximum. La date de référence est fixe : 10 novembre 2026. Cela rend les exercices reproductibles. Ce seuil n’est pas une règle générale de fraîcheur.

Pour une vraie mission, choisir le délai admissible selon le domaine. Une date récente ne prouve pas la fiabilité. Une signature, un historique de versions ou une confirmation de la source peut être nécessaire.

## Scénarios reproductibles

| Scénario | Modification | Étape d’arrêt attendue | Correction attendue |
|---|---|---|---|
| Valide | Aucune | Revue humaine | Accepter ou refuser avec justification |
| Provenance absente | Source vide dans un enregistrement | Entrées | Restaurer la provenance après vérification |
| Donnée ancienne | Date du premier enregistrement en 2020 | Entrées | Vérifier le contenu puis actualiser la source avec preuve |
| Instruction hostile | Une entrée demande d’ignorer les instructions | Entrées | Rejeter l’entrée et garder sa trace |
| Budget insuffisant | Zéro action de rédaction autorisée | Agir | Réviser le périmètre ou obtenir un budget adapté |
| Refus humain | Refus commenté au point de revue | Revue | Nouvelle exécution après correction |

Le filtre d’injection est volontairement limité aux phrases de démonstration. Il n’offre aucune garantie générale. Le contrôle essentiel du simulateur est aussi l’absence d’outil externe et le périmètre fixe des actions. Un futur agent connecté demande des frontières techniques côté serveur, des droits minimaux et des essais adversariaux adaptés.

## Sorties M01

Le moteur attend trois points qui correspondent exactement à trois textes du corpus, un exercice, des références et les critères de la mission. Ce contrôle est adapté à un assemblage déterministe. Il ne convient pas tel quel à une reformulation libre.

Les critères personnalisés dans le formulaire sont transmis au livrable et à la revue. Le moteur ne comprend pas leur sens. L’humain doit vérifier qu’ils sont pertinents et respectés. Le champ objectif ne transforme pas la simulation en agent généraliste.

## Sorties M02

Le script `controler-annonce.mjs` contrôle la longueur selon une convention explicite et recherche plusieurs faits attendus. Il repère certains anciens faits et les liens non fournis. Un texte trompeur peut tout de même réussir ces règles partielles. Il faut donc comparer chaque fait au brief S01 et rechercher les ajouts, négations, ambiguïtés ou omissions.

## Issues et résultats

Dans le suivi de projet, une issue est une anomalie ou un travail à traiter. Dans une chaîne de production, l’issue désigne aussi le résultat du processus. Le pack emploie « anomalie » pour éviter la confusion.

Une anomalie comporte identifiant, mission, étape, preuve, gravité, responsable, statut et condition de clôture. Les gabarits sont dans `schemas/issue.schema.json` et `.github/ISSUE_TEMPLATE/`.

| Gravité | Exemple | Décision |
|---|---|---|
| Bloquante | Source essentielle absente, divulgation, action non autorisée | Arrêter et ne pas livrer |
| Majeure | Fait faux, exigence essentielle non satisfaite | Corriger avant acceptation |
| Mineure | Formulation améliorable sans perte d’information | Décision explicite du relecteur |

## Journal utile

Conserver la mission et sa version, le chemin des sources, les opérations effectuées, les résultats des outils, les budgets atteints, les anomalies, les corrections et la décision humaine. Éviter les secrets et le contenu personnel non nécessaire. Les traces portent sur les actions observables, pas sur un raisonnement interne privé.

Le journal du navigateur utilise des numéros de séquence. Il n’affiche pas de coût de modèle ni de durée de calcul inventés. Le journal exporté contient le scénario et le marquage `simulation: true`.

## Mesurer une amélioration

Mesurer le temps de cadrage, d’exécution, de revue et de reprise. Comparer des tâches de difficulté comparable selon la même grille. Rapporter aussi les échecs. Séparer mesure observée, estimation et hypothèse.

Le gain net de temps est la différence entre le temps total de référence et le temps total assisté. Si la référence n’a pas été mesurée, écrire « non mesuré ». Une démonstration unique ne permet pas de promettre un pourcentage de productivité.

## Réception pédagogique

La grille du support attribue deux points à chacune des cinq preuves du portfolio. Le seuil proposé est 8/10 sans défaut bloquant. Les cases sont une autodéclaration. Le formateur vérifie les pièces et décide. Ce score n’est pas une certification externe.
