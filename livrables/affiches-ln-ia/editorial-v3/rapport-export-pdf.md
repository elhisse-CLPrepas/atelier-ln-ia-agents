# Contrôle du PDF des affiches LN-IA

## Résultat

`AFFICHES-LN-IA-29-PAGES-A4.pdf` rassemble les 29 affiches existantes, une image entière par page A4 portrait, dans l’ordre de `sommaire.json`. Des signets hiérarchiques permettent de retrouver les quatre étapes et leurs rubriques. Les PNG sont inchangés.

Le livre HTML reçoit un lien de téléchargement du PDF. Une nouvelle archive de lecture avec PDF est créée séparément pour conserver l’archive précédente.

## Opérations et incident

Skill PDF lu et marqueur de création exécuté avec succès avant le premier lancement. Génération avec ReportLab, contrôle avec pypdf, rendu avec PyMuPDF ; Poppler n’était pas disponible parmi les commandes trouvées. Aucune dépendance installée.

Le premier lancement s’est arrêté sur une préférence d’affichage facultative de ReportLab (`DisplayDocTitle` refusait la valeur booléenne fournie). Cette préférence a été retirée, puis la génération a été relancée avec succès. Cet incident n’a pas modifié les affiches.

## Vérifications observées

- 29 pages et 29 entrées de signets.
- Format A4 portrait sur chaque page ; une image par page.
- Proportions conservées et marge de sécurité de 6 mm au minimum ; aucun recadrage.
- Rendu des 29 pages en PNG et comparaison de chaque zone d’affiche avec son image source. Écart absolu moyen maximal : 2,736 niveaux sur 255, compatible avec le rééchantillonnage du rendu.
- Inspection visuelle des cinq planches couvrant les 29 pages : ordre cohérent, aucune page blanche ou découpe observée, marges et numéros de page présents.
- Résolution effective minimale : 136,9 pixels par pouce au format retenu. Le PDF n’est pas une version vectorielle ou une recréation à 300 ppp.

Les résultats détaillés et empreintes sont dans `controle-pdf.json`. Les images de contrôle sont des intermédiaires de vérification et ne sont pas incluses dans l’archive de lecture.

## Limites et réception

Cet export confirme l’assemblage et le rendu, pas la vérité de chaque phrase générée dans les images. Les textes des affiches restent raster et ne deviennent pas sélectionnables ou recherchables par cet export. Le texte pédagogique source reste disponible dans le livre HTML.

La navigation HTML et son impression depuis un navigateur contrôlé ne sont pas nouvellement validées. Le PDF est indépendant de cette impression navigateur. Les limites antérieures concernant la fidélité exacte des logos générés et la revue humaine du contenu restent applicables.

Statut : prêt pour revue humaine. Aucune décision pédagogique globale n’est enregistrée. Responsable à renseigner. Temps et coût : non mesurés.
