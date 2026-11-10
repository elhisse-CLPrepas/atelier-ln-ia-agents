# Publication et SEO du support

Version 1.0 · 10 novembre 2026

Bootstrap est une bibliothèque de présentation responsive. Il ne définit pas une norme de méta-balises SEO. Vite compile le projet. Le référencement dépend du contenu HTML, de son accessibilité, des métadonnées et de l’hébergement.

## Éléments inclus

- Langue française, encodage UTF-8 et viewport mobile.
- Titre, description, auteur et couleur de thème.
- Balises Open Graph et Twitter.
- Données structurées `LearningResource` avec durée de huit heures et objectifs.
- Contenu descriptif dans le HTML initial avant exécution de JavaScript.
- Navigation, titres, labels de formulaire et lien d’évitement.
- Génération de la canonique, d’`og:url`, d’`og:image`, du sitemap et de robots à partir de l’URL publique configurée.

Le site utilise des sections avec fragments `#`. Ce sont des vues d’une même page, pas des pages de cours distinctes optimisées chacune pour une requête. Un futur site éditorial avec plusieurs pages indexables demanderait des routes et du contenu HTML propres à chaque page, éventuellement une génération statique.

## Activer une publication réelle

1. Choisir un hébergement statique et son URL définitive.
2. Copier `.env.example` vers `.env`.
3. Renseigner `SITE_URL` avec cette adresse HTTPS exacte, incluant un éventuel sous-dossier.
4. Exécuter `npm run check`.
5. Inspecter `dist/index.html`, `dist/robots.txt` et `dist/sitemap.xml`.
6. Publier uniquement après la décision du responsable.
7. Vérifier les URL, la réponse HTTPS, les ressources, le partage social et l’accessibilité sur le site publié.

Le dépôt comprend désormais un workflow GitHub Pages. Il ne crée aucun domaine personnalisé. Aucun exemple de domaine ne doit rester dans une canonique.

## Dépôt GitHub et GitHub Pages

Le dépôt cible est `https://github.com/elhisse-CLPrepas/atelier-ln-ia-agents`. Le site de projet est prévu à `https://elhisse-clprepas.github.io/atelier-ln-ia-agents/` ; l’URL effective est confirmée par l’API Pages et le déploiement.

La source de publication dans Settings → Pages est **GitHub Actions**. Le workflow `.github/workflows/pages.yml` installe les dépendances du verrou npm, exécute `npm run check`, contrôle le résultat, puis publie **uniquement `dist/`**. Il se lance sur les push vers `main` et manuellement. `SITE_URL` est obtenu de `actions/configure-pages`, sans secret ni fichier `.env` à committer.

Les 29 affiches, leur livre HTML et le PDF sont préparés dans `public/affiches/` à partir de la collection éditoriale retenue. Les ZIP, essais, rendus de contrôle et journaux de génération n’entrent pas dans cette copie publique. Les sources du dépôt sont publiques ; seules les sorties sélectionnées entrent dans le site. `dist/`, `public/ressources/` et `public/affiches/` sont reconstruits et exclus de Git.

Pour vérifier localement la même publication dans PowerShell :

```powershell
$env:SITE_URL = 'https://elhisse-clprepas.github.io/atelier-ln-ia-agents/'
npm.cmd ci
npm.cmd run check
node scripts/controler-publication.mjs
Remove-Item Env:SITE_URL
```

Pour une prépublication sans indexation, laisser `SITE_URL` vide. Ne jamais envoyer un `.env` contenant un secret dans le dépôt.

## Prépublication

Si `SITE_URL` est vide, `index.html` conserve `noindex,follow` et le fichier robots refuse l’exploration. Cela évite de présenter un atelier local comme un site déjà public. Ces réglages ne constituent pas un contrôle d’accès ni un moyen de garder des données secrètes.

Le support autonome conserve `noindex`. Il sert au déroulement local et contient des documents intégrés. Le build n’améliore pas automatiquement le classement d’un site dans un moteur de recherche.

## Contrôle de contenu avant publication

Retirer les documents que vous ne souhaitez pas distribuer. Les fichiers `docs/` et certains fichiers racine sont inclus dans le support et dans `public/ressources/`. Le dossier prospectif DOCX reste dans le ZIP de référence et n’est pas copié dans le site compilé.

N’ajouter ni témoignage, ni statistique de réussite, ni certification, ni note moyenne sans source réelle. Les données structurées ne contiennent aucune promesse de résultat.
