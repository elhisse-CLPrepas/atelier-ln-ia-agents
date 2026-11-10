# Rapport d’intégration du document Word

Date : 10 novembre 2026. Statut : en attente de revue humaine.

## Résultat

Le texte du Word a été consulté par lecture de `word/document.xml` dans son archive DOCX. Les paragraphes et textes des tableaux ont été extraits ; les parties pédagogiques utiles ont été comparées au programme, au cahier et aux contrats. Aucune modification du Word n’a été effectuée. Les images, la pagination et la mise en page n’ont pas été évaluées visuellement. Les repères de navigation créés utilisent donc les titres des sections plutôt que des pages présumées.

Source : `Comprendre-et-utiliser-les-Agents-IA-LN-IA-v1.0.docx`, version 1.0 du 10 novembre 2026 selon son texte. Empreinte SHA256 relevée après lecture : `B10224E365DA9D83DF704A8E8EB7EDC150E58DEEF5021FCC66658C1BBE3F1308`. Cette empreinte identifie la source consultée ; aucune empreinte antérieure n’a été relevée pour une comparaison avant/après.

## Contrôle des entrées

Le Word est admis comme source pédagogique fournie, sans présumer d’une validation de ses références externes. Le programme et le cahier sont cohérents avec ses quatre séances. Le contrat M02 reste prioritaire pour les permissions, les deux tentatives et les huit sorties. S01 M02 version 2 est approuvée pour l’exercice ; S02 est périmée et S03 hostile. Ces deux dernières sources ne gouvernent aucune action.

Point clarifié : le cahier cite quatre fichiers principaux pour l’exercice 4, tandis que le contrat en demande huit. Le parcours précise que la production Codex M02 doit fournir les huit. Aucun contrat n’a été modifié.

## Fichiers produits ou complétés

- `docs/PARCOURS-GUIDE.md` : activité de départ, correspondance des quatre séances, preuves, passage à M02 et conditions de suite.
- `docs/FICHE-AGENT.md` : modèle vierge couvrant les huit critères, les arrêts, la reprise et la revue.
- `docs/EVALUATION-COMPLEMENTAIRE.md` : six questions, corrigé séparé et consignes de réception.
- `DEMARRER-ICI.md`, `docs/CAHIER-PARTICIPANT.md`, `docs/PROGRAMME-FORMATEUR.md` : liens vers les nouveaux documents.
- `livrables/construction-atelier/contrat.md` et le présent rapport : périmètre, critères et traces de cette évolution documentaire.

## Journal observable

1. Lecture des instructions Documents et des règles de cadrage du projet ; lecture explicite des SKILL.md de cadrage, contrôle des entrées et validation. Cette trace décrit la lecture des procédures, pas une preuve de déclenchement automatique.
2. Extraction du texte du Word et lecture complémentaire des sections sur les sources, les contrôles et les permissions.
3. Comparaison avec le programme, le cahier, le démarrage et M02.
4. Annonce du périmètre documentaire et des critères ; création du contrat, des trois documents et des liens.
5. Exécution des contrôles ci-dessous et rédaction du rapport.

Une rédaction initiale ; aucun cycle de correction supplémentaire. Durée et coût : non mesurés. Aucune mission M02 ou M03 exécutée, aucun résultat participant revendiqué.

## Grille de contrôle

| Critère | Résultat et preuve |
|---|---|
| Quatre séances de 120 minutes | Conservées dans le tableau du parcours, sans ajout de durée |
| Séparation simulation et production | M01 déterministe et M02 supervisée explicitement distinguées |
| Huit critères observables | Huit lignes dans la fiche, avec colonne de preuve et inconnues admises |
| Six questions et corrigé | Présents dans deux sections distinctes de l’évaluation |
| Absence d’approbation inventée | Modèle vierge ; responsable et décision à renseigner |
| Liens locaux | 13 liens contrôlés, aucun chemin manquant |
| Règles M02 | Huit fichiers, S01 seule source de faits, rejets de S02/S03, deux tentatives et revue |
| Structure du pack | `npm.cmd run validate` réussi |
| Règles du moteur | `npm.cmd test` : 13 tests réussis, aucun échec |
| Corpus M01 | `node scripts/controler-entrees.mjs` : passed, aucune anomalie |

## Limites et anomalies restantes

Aucun défaut bloquant détecté dans le périmètre documentaire. La pertinence pédagogique reste à examiner par le formateur avec un essai participant.

`npm.cmd run check` et la compilation n’ont pas été exécutés : cette intervention ne modifie pas le code et les dépendances Vite locales sont absentes. Aucun paquet n’a été installé. `public/ressources/`, `dist/` et `APERCU-AUTONOME.html` n’ont pas été régénérés ; ils n’intègrent donc pas encore les nouveaux documents. Les liens contrôlés sont ceux des sources Markdown locales. Aucun contrôle navigateur ni rendu du Word n’est revendiqué. Le manifeste SHA256 existant n’a pas été régénéré ; cette évolution ne constitue pas un nouveau pack de distribution vérifié.

## Décision attendue et prochaine activité

Responsable : à renseigner par l’utilisateur. Décision : en attente de revue humaine. La livraison n’est pas déclarée acceptée.

Commencer par l’activité « Commencer maintenant » du parcours : classification des systèmes A à E, fiche du système C et revue d’une justification. Une fois la préparation pédagogique examinée, la reconstruction du support et la production supervisée M02 constituent deux étapes distinctes à réaliser dans leurs périmètres respectifs.
