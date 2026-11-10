# Classifier les agents avec des critères observables

Version 1.0 · 10 novembre 2026 · Statut : à relire

Auteur pédagogique : Prof Abderrahman EL HISSE

## Une classification pour décider

La classification de cet atelier décrit le fonctionnement et les droits d’un système. Elle ne classe pas des personnalités. Les critères sont distincts. Un système avec une mémoire persistante n’est pas nécessairement plus autonome. Un système multiagents n’est pas nécessairement plus fiable.

Une propriété absente de la documentation reste « non documentée ». La fiche doit distinguer les capacités annoncées des capacités observées.

## Huit critères techniques

| Critère | Valeurs possibles | Preuve à examiner | Question de décision |
|---|---|---|---|
| Flux de décision | Déterministe, workflow prévu avec LLM, choix dynamique par LLM | Code d’orchestration, traces d’actions et conditions | Qui choisit l’action suivante ? |
| Outils et effets | Lecture, écriture isolée, modification réelle limitée, effet externe | Liste des outils, permissions et journal d’action | Que peut changer le système ? |
| Mémoire | Aucune, contexte de session, mémoire persistante contrôlée | Stockage, durée, mise à jour et suppression | Quelles informations restent après l’exécution ? |
| Déclenchement | Humain, événement, horaire, condition observée | Configuration du déclencheur et règle d’autorisation | Qui ou quoi lance le travail ? |
| Supervision | A0, A1, A2, A3 selon l’échelle locale | Points de revue, exceptions et arrêt | Où intervient la décision humaine ? |
| Coordination | Un agent, rôles successifs, agents parallèles, orchestrateur | Missions, dépendances et responsabilités | Qui produit, qui contrôle et qui arbitre ? |
| Environnement | Local, distant, hybride | Lieu du calcul, transferts et stockage | Où passent les données et les actions ? |
| Évaluation et traces | Contrôles déterministes, revue humaine, cas d’essai, journal | Résultats reliés à une version du livrable | Comment sait-on que le résultat est acceptable ? |

Plusieurs valeurs peuvent coexister sur un axe. Un agent peut lire un fichier local et appeler un service distant. Un système peut combiner un comptage automatique et une revue humaine.

## Échelle locale de délégation A0–A3

Cette échelle reprend le principe du dossier de l’atelier. Elle est locale et non normative. Elle ne remplace pas l’inventaire exact des permissions.

| Niveau | Délégation dans l’atelier | Exemple | Condition de contrôle |
|---|---|---|---|
| A0 | Proposer sans modifier une ressource de production | Suggérer une annonce | L’humain décide de l’utilisation |
| A1 | Agir dans une copie ou un espace de travail isolé | Modifier un brouillon local | Revue avant transfert du résultat |
| A2 | Exécuter un workflow borné avec contrôles | Produire, vérifier et remettre un dossier | Limites, traces et points de validation définis |
| A3 | Effectuer des actions opérationnelles autorisées | Mettre à jour une ressource réelle dans un périmètre défini | Autorisation, contrôles d’accès, surveillance et reprise adaptées |

A3 ne signifie pas « sans contrôle humain ». A2 ne garantit pas l’absence d’effet externe. Le contrat décrit les actions précises. L’atelier privilégie A0 et A1, puis la compréhension d’A2. Le backend autonome ne fait pas partie de la livraison.

## Distinctions à conserver

| Composant | Fonction | Ce qu’il ne démontre pas seul |
|---|---|---|
| Script | Exécuter des instructions programmées | Un choix dynamique par modèle |
| Workflow prédéfini | Organiser des étapes et branches prévues | Une autonomie de décision générale |
| Modèle de langage | Produire une réponse à partir d’un contexte | Une permission d’agir dans un système |
| Agent LLM | Choisir des actions et exploiter leurs résultats dans une mission | Une fiabilité ou une autorisation illimitée |
| Outil | Offrir une opération définie, par exemple lire ou écrire | Un objectif de production |
| Skill | Décrire une méthode réutilisable et ses ressources | Une nouvelle identité ou un droit supplémentaire |
| Multiagents | Coordonner plusieurs agents et leurs résultats | Un gain automatique de qualité ou de temps |

Un workflow peut contenir un agent. Un agent peut appeler un outil qui exécute un script. Un skill peut guider plusieurs agents. La classification décrit ces relations sans les opposer artificiellement.

## Fiche 1 — Codex pour un brouillon local

| Champ | Description du cas pédagogique |
|---|---|
| Mission | Produire une annonce conforme à S01 et sa grille de contrôle |
| Flux | Choix d’actions par l’agent selon les fichiers et résultats |
| Outils | Lecture et écriture dans le dossier de travail, contrôles autorisés |
| Mémoire | Contexte de session. Persistance éventuelle à vérifier dans l’outil utilisé |
| Déclenchement | Demande explicite du participant |
| Supervision | A1 pour les modifications de la copie locale |
| Coordination | Un agent et un relecteur humain |
| Environnement | Éditeur local et service du modèle selon la configuration du poste |
| Évaluation | Comparaison avec S01, longueur, revue et décision consignée |
| Interdit par la mission | Publication ou transmission externe du dossier |
| Arrêt | Source essentielle absente ou limite d’essais atteinte |
| Preuve attendue | Mission, annonce, grille et journal du travail observé |

Cette fiche décrit le périmètre de l’exercice. Les permissions effectives du poste doivent correspondre à ce périmètre. Le texte d’une mission ne constitue pas à lui seul un contrôle technique d’accès.

## Fiche 2 — Workflow de tri d’incidents fictifs

| Champ | Description du MVP |
|---|---|
| Mission | Classer un petit lot d’incidents fictifs et proposer une action |
| Flux | Étapes prévues : lire, classer, vérifier le format, présenter à l’humain |
| Outils | Lecture du jeu de données et écriture d’un tableau de travail |
| Mémoire | Aucune mémoire persistante nécessaire au MVP |
| Déclenchement | Demande humaine sur un lot identifié |
| Supervision | A0 pour les propositions ou A1 si le tableau est écrit localement |
| Coordination | Un appel LLM éventuel dans un workflow déterministe |
| Environnement | À documenter selon l’implémentation choisie |
| Évaluation | Catégorie justifiée, incident conservé, aucune clôture réelle |
| Arrêt | Catégorie incertaine, donnée manquante ou format invalide |

Ce MVP n’exige pas nécessairement un agent. Un workflow prévisible peut suffire. Le choix dépend des variations observées dans les données et de la nécessité d’adapter les actions.

## Fiche 3 — Coordinateur multiagents de revue

Ce cas illustre une extension à étudier. Il n’est pas exécuté par le laboratoire local.

| Champ | Description proposée |
|---|---|
| Mission | Produire deux analyses distinctes d’un même dossier puis une synthèse |
| Flux | Coordinateur et missions spécialisées explicites |
| Outils | Lecture des sources autorisées, écriture des résultats intermédiaires |
| Mémoire | Résultats partagés versionnés, conservation à définir |
| Déclenchement | Demande humaine |
| Supervision | A1 pour des fichiers locaux, avec revue finale humaine |
| Coordination | Deux agents, un coordinateur et un responsable de décision |
| Environnement | À définir avant réalisation |
| Évaluation | Comparaison aux sources et recherche des désaccords |
| Risque distinctif | Les agents peuvent reproduire la même erreur ou utiliser la même source périmée |
| Condition d’adoption | Une comparaison sur des tâches représentatives justifie la coordination ajoutée |

## Gabarit de fiche agent

```text
Nom fonctionnel :
Version de la fiche :
Besoin utilisateur :
Mission et sortie :
Flux de décision :
Outils et effets autorisés :
Mémoire et durée de conservation :
Déclenchement :
Supervision et niveau local :
Coordination et responsable :
Environnement et flux de données :
Critères d’acceptation et traces :
Limite d’essais ou de durée :
Conditions d’arrêt :
Condition de reprise :
Capacités observées :
Points non évalués :
```

## Choisir un système

Commencer par une mission fréquente, délimitée et contrôlable. Vérifier si un script ou un workflow répond au besoin. Ajouter un choix dynamique lorsque les étapes doivent réellement s’adapter. Ajouter plusieurs agents lorsque la séparation des travaux et leur coordination apportent un résultat mesuré sur des cas représentatifs.
