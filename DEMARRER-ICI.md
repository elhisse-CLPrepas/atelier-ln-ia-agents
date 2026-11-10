# Démarrer l’atelier LN-IA

Version 1.0 · 10 novembre 2026

## 1. Choisir votre entrée

Pour une découverte visuelle, ouvrez la [collection d’affiches éditoriales LN-IA](livrables/affiches-ln-ia/editorial-v3/LIVRE-AFFICHES-LN-IA.html) : 29 affiches PNG, des schémas explicatifs et un sommaire en arborescence. Conservez son dossier `affiches/` et `logo-original.png` à côté du fichier HTML. La première version avec personnage, si elle est présente sur votre poste, reste locale et hors du dépôt publié.

Pour suivre le document pédagogique Word fourni avec ce dossier, ouvrez le [parcours guidé](docs/PARCOURS-GUIDE.md). Il relie ses sections aux quatre séances et propose la première activité à réaliser.

Pour découvrir sans installation : double-cliquez sur `APERCU-AUTONOME.html` après avoir décompressé le ZIP.

Pour animer : ouvrez le support puis « Présentation ». Lisez `docs/PROGRAMME-FORMATEUR.md` pour les durées, les démonstrations et les critères de réception.

Pour construire : ouvrez le dossier complet `atelier-ln-ia-agents` dans VS Code. Ne travaillez pas directement dans le ZIP.

## 2. Vérifier votre poste

Installez Node.js 24 depuis la source officielle https://nodejs.org/ si nécessaire. Ouvrez un nouveau terminal dans VS Code puis vérifiez :

```bash
node --version
npm --version
```

Le projet est testé sous Node 24. Vite exige une version compatible de Node. Le champ `engines` fixe ici le minimum à 22.12. Les versions impaires non maintenues ne sont pas la cible de l’atelier.

Dans PowerShell, si la politique du poste empêche `npm.ps1`, utilisez `npm.cmd ci` et `npm.cmd run dev` ou le terminal Invite de commandes. Il n’est pas nécessaire de désactiver une politique de sécurité.

## 3. Ouvrir le support modifiable

```bash
npm ci
npm run dev
```

L’installation demande Internet. Ouvrez l’adresse donnée par Vite. Un second poste sur le réseau peut y accéder si votre configuration le permet car le serveur de développement écoute sur toutes les interfaces. Pour un usage strictement local, lancez `npm run dev -- --host 127.0.0.1`.

## 4. Tester le laboratoire

1. Ouvrez « Laboratoire ».
2. Choisissez « Données valides » et avancez jusqu’à la revue.
3. Relisez les trois points et les critères.
4. Saisissez une justification puis validez ou refusez.
5. Exportez le journal. La fiche n’est exportable qu’après validation.
6. Recommencez avec une provenance absente puis un budget insuffisant.

Une nouvelle exécution efface le journal en mémoire. Exportez-le avant de changer de scénario si vous voulez le conserver.

## 5. Passer à Codex

Ouvrez l’extension Codex dans VS Code avec votre accès habituel. Lisez le fichier `AGENTS.md` puis copiez le contenu de `PROMPT-MAITRE-CODEX.md` dans une nouvelle tâche. Par défaut, la mission à exécuter est M02, qui produit une annonce locale à partir de données fictives.

Les quatre skills sont déjà rangés dans `.agents/skills/`. Ils font partie de ce projet. Ils ne sont pas installés comme compétences personnelles de ChatGPT. Pour les utiliser, demandez leur nom explicitement et vérifiez que votre version de Codex détecte les fichiers. Si elle ne les détecte pas, demandez la lecture du `SKILL.md` par son chemin et signalez ce mode de lecture dans le journal.

## 6. Recevoir votre première production

Cherchez dans `livrables/M02/` : le brouillon, la grille de contrôle, le journal, les anomalies et le bilan. Les fichiers ne sont créés qu’à l’exécution de la mission. Le pack fournit un exemple corrigé distinct, marqué comme fictif.

Contrôlez le résultat vous-même. Le fait que Codex annonce une réussite ne constitue pas une validation LN-IA.

## 7. Repartir d’un état connu

Conservez une copie du ZIP original. Si vous utilisez Git, initialisez votre dépôt et enregistrez une première version avant l’atelier. Ne commettez ni `.env`, ni secrets, ni données personnelles. En cas de blocage, comparez vos fichiers avec la copie d’origine avant d’effacer quoi que ce soit.

Le dossier `dist/` est compilé. Modifiez `src/`, `contenus/`, `missions/` ou `docs/`, puis reconstruisez.
