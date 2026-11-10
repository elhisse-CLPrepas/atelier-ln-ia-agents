# Production des affiches éditoriales LN-IA

Complément après cette production : le PDF A4 des 29 pages est désormais disponible. Son export et ses contrôles sont documentés dans `rapport-export-pdf.md`. Les mentions ci-dessous d’absence de PDF décrivent l’état de la première remise, avant ce complément.

## Résultat et statut

La direction professionnelle de l’affiche générale V2 a été jugée acceptable par l’utilisateur. Sur cette base, 28 déclinaisons ont été générées : quatre ouvertures d’étape, vingt repères et quatre missions. L’affiche générale V2 est conservée pour constituer une collection de 29 PNG indépendants, accompagnée d’un livre HTML à sommaire hiérarchique.

Statut des nouvelles affiches : en attente de revue humaine. L’appréciation de la direction générale ne constitue pas une acceptation de toutes les déclinaisons. Responsable de réception : à renseigner. Durée et coût : non mesurés.

## Fichiers

- `affiches/` : les 29 images finales, numérotées dans l’ordre de lecture.
- `LIVRE-AFFICHES-LN-IA.html` : navigation par étape, repère et mission, liens PNG et commandes d’impression.
- `logo-original.png` : copie intacte du logo pour la navigation.
- `LIRE-MOI.md` : ouverture, téléchargement, impression et reconstruction.
- `prompts.json` : les 28 prompts initiaux et leur correspondance avec les rubriques.
- `provenance-images.json` : chemins des premières générations et des versions sélectionnées, avec indication des corrections.
- `sommaire.json` : index ordonné et contenu pédagogique source accessible.
- `controle-fichiers.json` : résultats de contrôle et empreintes des 29 fichiers finaux, produit par le script de contrôle.
- `essais/` : premières versions des neuf images corrigées, exclues de la galerie et de l’archive de lecture.
- `construire-galerie.mjs` et `controler-collection.mjs` : reconstruction locale et vérification sans génération d’images.

Le lien du démarrage a été actualisé. La collection précédente avec personnage reste disponible. Le support Vite et `APERCU-AUTONOME.html` ne sont pas modifiés.

## Sources et opérations observables

Lecture du sommaire, du prompt V2, des modules de `contenus/atelier.json`, des règles de qualité et du skill de validation. Inspection de l’affiche V2 retenue. Production d’un prompt par affiche avec les textes source, une structure pédagogique et un diagramme propre au sujet. Les références visuelles étaient l’affiche V2 et le logo original.

Génération par Imagegen intégré : 28 premières affiches et neuf corrections ciblées, sans ajout d’API au projet. Les images ont été copiées dans le dossier local. Toutes les premières générations ont été ouvertes pour inspection ; les neuf versions corrigées ont été ouvertes à leur tour. Le logo n’a pas été recomposé par un outil vectoriel : ses occurrences dans les PNG sont générées à partir de la référence. La copie utilisée dans la navigation provient directement du fichier original.

Les textes du livre correspondent aux contenus sources, pas à une transcription certifiée de chaque mot produit dans les PNG. Ils permettent de retrouver le contenu même lorsque la lecture de l’image est difficile.

## Anomalies corrigées

| Affiche | Défaut observé | Correction inspectée |
|---|---|---|
| Étape Pratiquer | Chemin pouvant continuer depuis STOP et reprise vers Agir | Branche de défaut séparée ; retour vers cadrage et entrées |
| Étape Produire | Flèche vers une publication externe | Suppression de la publication ; revue en attente dans le périmètre local |
| Repère 1.1 | Agir et Examiner inversés dans la boucle | Observer → Choisir → Agir → Examiner → Observer |
| Repère 1.5 | Définitions A0–A3 modifiées et matrice de permissions inventée | Repères locaux rétablis ; aucune autorisation automatique de publier |
| Repère 2.5 | Assimilation « Script (IA) » et confusion sur l’objet contrôlé | Brouillon contrôlé ; script distinct d’une IA ; comparaison avec la source |
| Mission 2.6 | Skill présenté comme configurant droits et publication ; annonce déjà prête | Procédure du skill ; interdiction de publier M02 ; faits pour un futur brouillon |
| Repère 3.1 | Reprise vers Planifier sans nouveau contrôle des entrées | Retour vers Cadrer ; branches Conforme et Défaut distinctes |
| Repère 3.3 | Gravités décrites sans règle de réception précise | Bloquante : ne pas livrer ; majeure : corriger avant acceptation ; mineure : décision du relecteur |
| Repère 4.1 | Publication représentée comme suite immédiate et promesse de rapidité | Extension séparée avec nouvelle mission ; message sans promesse de vitesse |

Chaque affiche corrigée a consommé une reprise, dans la limite de deux prévue au contrat. Les premières versions sont conservées dans `essais/` pour tracer les écarts. Aucun accord humain n’a été généré ou enregistré pour ces corrections.

## Contrôles et limites

La commande `node construire-galerie.mjs` depuis ce dossier vérifie la présence des images et construit le livre. `node controler-collection.mjs` contrôle 29 identifiants uniques, 29 signatures PNG valides et images portrait distinctes, les références de fichiers, les ancres et la syntaxe du JavaScript intégré. Le résultat exact figure dans `controle-fichiers.json` après la dernière exécution.

Ces contrôles ne remplacent pas l’examen des textes intégrés aux images. L’inspection visuelle a porté sur la lisibilité, la hiérarchie, les notions principales et les diagrammes. Une relecture humaine reste nécessaire avant impression ou diffusion, notamment pour la fidélité de marque, la résolution d’impression choisie et d’éventuelles petites erreurs de texte.

Le livre n’a pas été vérifié dans un navigateur contrôlé lors de cette déclinaison. L’accès navigateur et l’accès à la fenêtre avaient échoué lors de la construction précédente ; aucune nouvelle réussite n’est revendiquée. Le fonctionnement mobile, clavier et la pagination d’impression restent donc à vérifier en usage réel. Aucun PDF exporté ni certification de conformité d’impression n’est fourni.

Les tests Vite ne sont pas relancés pour cette collection d’images et son livre séparé : le moteur, le support et les dépendances restent inchangés. Aucun déploiement, message, achat ou changement de droits effectué.

## Revue proposée

Ouvrir le livre, parcourir les quatre ouvertures, puis une fiche de repère et une mission par chapitre. Relever les ajustements de densité ou de vocabulaire souhaités. Accepter ou demander une correction sur une version identifiée. L’archive de lecture rassemble uniquement le livre, ses images, le logo et le mode d’emploi ; les traces de production restent dans le dossier du projet.
