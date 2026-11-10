# M05 — Versionner et publier l’atelier

Demande explicite de l’utilisateur : examiner le dossier et Git, préparer un commit propre, configurer `elhisse-CLPrepas/atelier-ln-ia-agents` et publier sur GitHub Pages à partir de `dist/`.

## État et périmètre

Le dossier ne possédait pas de dépôt Git. Le dépôt GitHub est public et vide, selon la vérification initiale. Le compte GitHub CLI connecté correspond au propriétaire. Cette mission autorise l’initialisation locale, le commit, le rattachement à ce dépôt, le push et la configuration/publication Pages. Ne pas écraser un historique distant apparu depuis cette vérification ; ne pas effectuer de push forcé.

Conserver les sources de l’atelier et les productions retenues. Exclure de Git les secrets, dépendances, archives ZIP, essais et rendus de contrôle. Déployer seulement `dist/`, reconstruit par Actions. Inclure les 29 affiches, leur livre et leur PDF via une liste de fichiers publics explicite. Les références Word ne sont pas copiées dans le site.

## Critères

- Sources versionnées et fichiers exclus documentés ; aucun secret dans le commit.
- `npm run check` réussi et site reconstruit avec l’URL Pages réelle.
- Liens, ressources, canonique, robots, sitemap et 29 affiches présents dans `dist/`.
- Workflow avec compilation avant déploiement, droits Pages limités et environnement dédié.
- Commit local identifié, push sans écrasement, exécution Actions et URL HTTPS vérifiés.
- Rapporter les contrôles réellement effectués et toute limite de vérification visuelle.

La demande explicite autorise cette publication technique. Elle ne transforme pas les brouillons pédagogiques en livrables acceptés ni les déclarations de l’interface en décisions humaines. Responsable de la publication : utilisateur demandeur. Nom de réception pédagogique : à renseigner. Aucun achat, domaine personnalisé ou changement de visibilité du dépôt.
