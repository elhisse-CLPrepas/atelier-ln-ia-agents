---
name: lnia-valider-livrable
description: Vérifier un livrable LN-IA contre son contrat et ses sources, documenter les anomalies et préparer la décision humaine sans inventer une approbation.
---

# Valider un livrable

Lire le contrat, le rapport des entrées et le résultat. Si possible, relire les sources avant de consulter l’autoévaluation de la production.

## Procédure

1. Transformer les critères du contrat en une grille avec preuve, statut et correction.
2. Relier chaque fait du livrable à une source autorisée.
3. Vérifier format, complétude, longueur et absence d’ajout non sourcé.
4. Pour M02, lancer `node scripts/controler-annonce.mjs livrables/M02/annonce.md`. Compléter manuellement les critères non couverts par le script.
5. Distinguer défaut bloquant, majeur et mineur. Donner une preuve reproductible.
6. Si le budget l’autorise, corriger puis contrôler à nouveau uniquement les points affectés et leurs dépendances.
7. Remettre le résultat et la grille à la personne responsable. Enregistrer seulement sa décision réelle.

## Sortie

`grille-controle.md`, `issues.md` et `decision.md` dans le dossier de mission. Tant que la personne n’a pas répondu, écrire « en attente de revue humaine » dans `decision.md`.

## Réception

Un contrôle réussi n’équivaut pas à une acceptation finale. Un consensus entre modèles ne constitue pas une preuve indépendante. La mission reste bloquée si un défaut bloquant subsiste.
