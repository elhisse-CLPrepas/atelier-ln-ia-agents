# Atelier LN-IA — Agents IA

Comprendre, construire, pratiquer et produire.

Version 1.0 · 10 novembre 2026 · LAB-NUMÉRIQUE-IA

L’IA propose. L’humain contrôle. LN-IA valide.

Ce dossier est un support d’atelier et un projet Vite modifiable. Il comprend quatre séances de deux heures, une présentation de 28 diapositives, un laboratoire de production, 12 questions corrigées, 12 cartes mémoire, quatre skills de projet et des missions pour Codex dans VS Code.

Commencez par `DEMARRER-ICI.md`. Pour animer, ouvrez `docs/PROGRAMME-FORMATEUR.md`. Pour pratiquer, ouvrez `docs/CAHIER-PARTICIPANT.md`. Pour poursuivre avec Codex, utilisez `PROMPT-MAITRE-CODEX.md`.

La collection éditoriale comprend aussi 29 affiches PNG, un livre à feuilleter et un PDF A4 dans `livrables/affiches-ln-ia/editorial-v3/`. Elle est intégrée au site lors du build.

## Version en ligne

Adresse GitHub Pages prévue : [ouvrir l’atelier LN-IA](https://elhisse-clprepas.github.io/atelier-ln-ia-agents/). Le [workflow de publication](.github/workflows/pages.yml) reconstruit et vérifie `dist/` avant le déploiement. Voir [la procédure de publication](docs/PUBLICATION-SEO.md).

## Voir immédiatement le support

Ouvrez `APERCU-AUTONOME.html` avec votre navigateur. Le code, le style, les documents intégrés et le logo sont inclus dans ce fichier. Aucun serveur ni appel à un modèle n’est nécessaire. Les liens de documentation externe demandent Internet.

La présentation se trouve dans l’entrée « Présentation ». Les flèches du clavier changent la diapositive. « Imprimer le support » prépare les 28 pages pour l’impression ou l’enregistrement en PDF depuis le navigateur.

## Modifier le projet

Prérequis : Node.js 24, npm, VS Code. L’extension Codex et un accès opérationnel à Codex sont nécessaires uniquement pour les exercices supervisés avec l’agent.

```bash
npm ci
npm run dev
```

Ouvrez l’adresse locale affichée. Pour vérifier et reconstruire :

```bash
npm run check
```

Cette commande vérifie le contenu, exécute les tests du cycle de production et reconstruit `dist/` ainsi que `APERCU-AUTONOME.html`.

## Ce qui s’exécute réellement

| Périmètre | Fonctionnement | Statut dans ce pack |
|---|---|---|
| MVP 0 | Interface et moteur déterministe dans le navigateur | Livré et vérifié |
| MVP 1 | Codex lit les fichiers, utilise les skills et réalise une mission locale sous supervision | Prêt à pratiquer sur votre poste. Aucun résultat réel de participant n’est prétendu |
| MVP 2 | Serveur, modèle, authentification, outils connectés, quotas et traces persistantes | Architecture d’évolution décrite. Non implémentée |

Le bouton de simulation ne lance pas un agent LLM. Il illustre une chaîne de production avec contrôles, arrêt, revue humaine et livraison. Le contrat JSON personnalise le titre, l’objectif, les critères et les budgets. L’objectif libre n’est pas interprété par un modèle. Les critères libres exigent une revue humaine.

## Deux cas complémentaires

- M01 : fiche pédagogique assemblée à partir de trois textes fictifs. Ce cas anime le laboratoire et les tests.
- M02 : annonce du cas fictif Atelier Passage. Ce cas accompagne le cahier participant et l’exécution dans Codex. Les sources physiques sont dans `fixtures/atelier-passage/sources/`.

Les identifiants S01 à S03 appartiennent à chaque corpus. Le chemin du corpus fait partie de l’identification d’une source. Ils ne doivent pas être mélangés.

## Données et confidentialité

La simulation n’effectue aucun appel réseau. Les exports restent locaux. Seules les étapes du parcours déclarées terminées sont enregistrées dans le stockage local du navigateur. Les missions saisies, le journal, les réponses du quiz et le portfolio restent en mémoire et sont réinitialisés au rechargement. Exportez ce que vous souhaitez conserver.

Dans Codex, l’usage des fichiers dépend du service, de votre compte, de sa configuration et de vos permissions. Utilisez les données fictives fournies pour l’atelier.

## Publication et référencement

Bootstrap gère la présentation. Les balises SEO sont dans `index.html` et le plugin Vite de `vite.config.js`.

Le build sans `SITE_URL` est une prépublication : `noindex` et `robots.txt` bloquent l’exploration. Pour une publication décidée par le responsable, créez `.env` à partir de `.env.example`, renseignez l’URL HTTPS réelle puis lancez `npm run build`. Le résultat comprend la canonique, `og:url`, `og:image`, `robots.txt` et `sitemap.xml`. Aucun domaine n’est inventé. Voir `docs/PUBLICATION-SEO.md`.

## Commandes

| Commande | Résultat |
|---|---|
| `npm run dev` | Serveur de développement |
| `npm test` | Tests des contrôles et de la livraison |
| `npm run validate` | Structure du pack et contenus |
| `npm run build` | Site compilé et support autonome |
| `npm run preview` | Prévisualisation locale du dossier compilé |
| `npm run demo` | Cinq journaux déterministes sans approbation réelle |
| `node scripts/controler-entrees.mjs` | Rapport de contrôle du corpus M01 |
| `node scripts/controler-annonce.mjs chemin/annonce.md` | Contrôles partiels de l’annonce M02, puis revue humaine |

Apprendre en produisant. Produire avec méthode. Partager avec valeur. Avancer avec conscience.
