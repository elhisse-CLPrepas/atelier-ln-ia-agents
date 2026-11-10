# Les affiches éditoriales LN-IA

Ouvrez `LIVRE-AFFICHES-LN-IA.html` dans votre navigateur. Conservez le dossier `affiches/` et `logo-original.png` à côté du livre. La lecture ne nécessite ni serveur ni connexion Internet.

La collection comporte 29 images PNG indépendantes : la présentation générale V2 conservée, quatre étapes, vingt repères et quatre missions. Chaque affiche contient son propre texte et son propre schéma, dans la direction bleu nuit, or et blanc retenue après votre retour. Aucun personnage de bande dessinée n’est utilisé.

## Feuilleter

Le sommaire à gauche permet d’aller à une étape puis à ses repères et sa mission. Sur un écran étroit, le bouton Sommaire ouvre la liste. Les boutons Précédente et Suivante permettent de lire dans l’ordre. Les flèches du clavier fonctionnent lorsque le focus n’est pas sur une commande.

« PNG » ou « Télécharger cette affiche PNG » ouvre le téléchargement de l’image courante. Le texte pédagogique source est disponible sous l’image ; il reprend les données du pack, et ne constitue pas une transcription littérale de tous les mots intégrés par le générateur.

## Imprimer

Le fichier `AFFICHES-LN-IA-29-PAGES-A4.pdf` rassemble les 29 affiches dans l’ordre du parcours, une image entière par page A4, avec des signets. Il est accessible par le bouton « PDF · 29 affiches ». Les marges préservent les proportions et évitent le recadrage. Le PDF conserve la résolution des images ; ses textes restent intégrés aux images.

« Imprimer » prépare l’affiche courante depuis le livre HTML. « Toute la collection » prépare les 29 pages. Choisissez A4 portrait, sans en-têtes ni pieds de page de navigateur. Pour le PDF fourni, imprimez à taille réelle ou ajustez à la zone imprimable si votre imprimante l’exige.

Les images ont été inspectées. Le PDF fait l’objet d’un contrôle de structure et de rendu distinct, consigné dans `controle-pdf.json` et `rapport-export-pdf.md`. La pagination et la navigation du livre HTML n’ont pas été vérifiées dans un navigateur contrôlé ; les contrôles de fichiers et de syntaxe sont consignés séparément.

## Sources et reconstruction

Les rubriques, explications, exemples et exercices proviennent de `contenus/atelier.json`. Les schémas et textes courts ont été adaptés pour les affiches. Le contrat M02 reste la référence pour son exécution. M01 est une simulation ; M02 est une production supervisée distincte.

Les prompts initiaux sont dans `prompts.json`. `provenance-images.json` identifie les fichiers sélectionnés ; `rapport.md` documente les corrections. Le logo présent dans la navigation est le fichier original intact. Les logos intégrés dans les affiches ont été produits à partir de la référence et restent à contrôler pour une utilisation de marque exigeant une fidélité parfaite.

Depuis la racine du projet :

```powershell
node livrables/affiches-ln-ia/editorial-v3/construire-galerie.mjs
node livrables/affiches-ln-ia/editorial-v3/controler-collection.mjs
```

Ces commandes réutilisent les images existantes ; elles ne lancent aucune génération. L’ancien livre illustré est conservé dans le dossier parent.

Statut des nouvelles affiches : en attente de revue humaine. Votre appréciation favorable de la direction générale V2 n’a pas été transformée en approbation des 28 nouvelles déclinaisons.
