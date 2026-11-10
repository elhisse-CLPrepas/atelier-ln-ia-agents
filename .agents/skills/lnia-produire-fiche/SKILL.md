---
name: lnia-produire-fiche
description: Produire une fiche pédagogique locale à partir de sources validées quand la mission LN-IA demande trois points sourcés, un exercice et des critères de réception.
---

# Produire une fiche pédagogique

Utiliser ce skill pour M01 ou pour une mission qui demande explicitement une fiche. Ne pas l’appliquer par défaut à M02, qui produit une annonce.

## Entrées

Un contrat, un corpus autorisé et un rapport de contrôle des entrées sans blocage.

## Procédure

1. Lire l’objectif et les critères avant de rédiger.
2. Sélectionner trois points utiles présents dans le corpus.
3. Associer chaque point à son identifiant de source et au chemin du corpus.
4. Rédiger un titre, les trois points, un exercice faisable et ses critères.
5. Ne pas ajouter de fait ou de résultat de recherche non présent dans les sources.
6. Écrire un brouillon dans le dossier autorisé et conserver les références.
7. Utiliser `lnia-valider-livrable` puis remettre le résultat pour revue humaine.

## Sortie

`fiche.md` et les preuves de contrôle dans le dossier de mission. Le statut initial est « brouillon prêt pour revue », jamais « accepté » sans décision humaine.

## Démonstration

`npm run demo` illustre le cycle déterministe de M01. Cette commande ne constitue pas une exécution du présent skill par un modèle et ne donne aucune approbation réelle.
