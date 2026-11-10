# Rapport de vérification — Atelier LN-IA Agents IA

Version livrée : 1.0.0 · 10 novembre 2026

## Résultat

Le support se construit avec Vite. Le moteur de simulation passe 13 tests. Les contenus structurés et les quatre skills du dépôt passent les contrôles de structure. Les parcours clés de l’interface ont été essayés dans un navigateur.

## Environnement

- Node.js 24.22.1.
- Vite 8.3.7 et Bootstrap 5.3.8.
- Versions des dépendances fixées dans `package-lock.json`, avec des adresses du registre npm public.
- Navigateur Chrome distant pour les contrôles d’interface.

## Commandes exécutées

| Contrôle | Résultat observé |
|---|---|
| `npm run validate` | 4 modules, 28 slides, 12 QCM, 12 cartes, 8 critères, 8 risques et 4 MVP vérifiés ; corpus et skills valides |
| `npm test` | 13 tests réussis, 0 échec |
| `npm run build` | Site `dist/` et fichier autonome générés |
| `npm run demo` | Cinq journaux déterministes générés, sans approbation humaine réelle |
| Contrôle de l’annonce corrigée | 51 segments selon le script ; faits contrôlés présents ; revue humaine toujours requise |
| SEO sans URL publique | `noindex` et absence de canonique inventée |
| SEO avec domaine réservé au test | Canonique, URL de partage, sitemap et robots produits ; configurations HTTP, identifiants et paramètres rejetés |
| Structure du support autonome | CSS, script et logo intégrés ; aucun module JavaScript externe requis |

Le domaine `.invalid` utilisé pour le contrôle SEO n’est pas enregistré dans le build livré. Aucun site n’a été publié.

## Règles testées dans le moteur

- Attente de la revue avant livraison et impossibilité d’exporter avant acceptation.
- Blocage après refus humain.
- Approbation vide ou hors étape sans effet.
- Provenance manquante, donnée ancienne, instruction hostile du scénario et budget insuffisant.
- Permissions excessives ou validation humaine désactivée.
- Doublons, classification non admise et date future.
- Fait absent du corpus dans le livrable.
- Budget d’étapes indépendant du budget d’actions.
- Autorisation distincte de lire les sources et de rédiger le brouillon.

## Interactions observées dans le navigateur

- Affichage de l’accueil et du logo fourni.
- Simulation normale jusqu’à la revue, puis décision fictive de test et disponibilité du livrable.
- Instruction hostile bloquée à l’étape de contrôle des entrées.
- Modification du titre d’une mission, application et téléchargement du contrat JSON. Le contenu téléchargé a été relu.
- Présentation : passage à la diapositive suivante, sélection de la 28e, notes et bouton de fin désactivé.
- Mode présentation occupant la fenêtre, navigation et sortie du mode. Un mode CSS assure la continuité lorsque l’API plein écran est refusée par le navigateur.
- Quiz : 11 réponses justes et une erreur volontaire donnent 11/12 avec correction de la première question.
- Carte mémoire retournée et quatre fichiers SKILL.md présents dans l’interface.
- Accueil et laboratoire examinés dans des cadres de 390 × 844 et 768 × 844. Le menu mobile a été ouvert, le laboratoire atteint et le menu refermé. La largeur du document mobile correspond à la largeur visible, sans débordement horizontal observé sur cet écran.

## Limites de cette vérification

Le navigateur distant refuse le protocole `file://`. L’ouverture directe par double-clic de `APERCU-AUTONOME.html` n’a donc pas été essayée dans ce navigateur. La structure autonome a été contrôlée statiquement. Les interactions ont été exercées sur le support servi localement.

Le rendu imprimé dépend du navigateur et de ses réglages. Le pack fournit les styles d’impression des 28 diapositives. Aucun PDF imprimé n’est annoncé comme vérifié ni livré.

Les missions Codex M02 à M04 sont prêtes à exécuter sur le poste du participant. Aucun accès à son extension VS Code n’a été utilisé et aucune production de participant n’est déclarée réalisée.

Ces contrôles ne constituent ni un audit de sécurité, ni un test de performance d’un modèle, ni une certification pédagogique. Les documents pédagogiques restent à adapter et à relire par le responsable de l’atelier.
