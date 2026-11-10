# Glossaire de l’atelier LN-IA Agents

Version 1.0 · 10 novembre 2026 · Statut : à relire

Auteur pédagogique : Prof Abderrahman EL HISSE

| Terme | Définition dans cet atelier | Exemple ou distinction |
|---|---|---|
| Agent LLM | Système qui utilise un modèle de langage pour choisir des actions et exploiter leurs résultats dans une mission | Lire un fichier, constater un manque puis demander une donnée |
| API | Interface permettant à un programme de demander une opération à un service | Appel à un service de modèle depuis un backend |
| Autonomie | Étendue des décisions et actions déléguées sans intervention à chaque étape | Elle dépend des droits, des limites et de la supervision |
| A0–A3 | Échelle locale non normative de délégation utilisée dans le dossier | A0 propose, A1 agit dans une copie, A2 suit un workflow contrôlé, A3 réalise des actions opérationnelles autorisées |
| Backend | Partie d’un système exécutée côté serveur | Il peut contrôler les accès et appeler des services. Aucun backend autonome n’est livré ici |
| Bootstrap | Ensemble de styles et composants d’interface web | Il aide à construire la présentation. Il ne définit pas les règles du référencement |
| Boucle agentique | Répétition observation, choix, action et contrôle dans les limites d’une mission | Une condition d’arrêt reste nécessaire |
| Codex | Outil de travail sur le code et les fichiers utilisé sous supervision dans l’atelier | Ses capacités et accès dépendent de la configuration du poste |
| Contexte | Informations accessibles au modèle au moment d’une réponse | Il ne garantit pas une mémoire durable |
| Contrat de mission | Description du résultat, des entrées, des limites, des critères et de la validation | Un intitulé de rôle seul ne suffit pas |
| Contrôle déterministe | Vérification dont la règle est programmée et reproductible | Compter les mots selon une convention explicite |
| Évaluation | Examen d’un résultat avec des critères et des cas définis | Comparer les faits du brouillon à S01 |
| Garde-fou | Mesure qui limite un comportement ou un effet | Permission de lecture seule, limite d’essais ou revue préalable |
| Injection d’instructions | Tentative de faire traiter une donnée externe comme une instruction qui détourne la mission | Un document demande de transmettre le dossier ailleurs |
| Issue | Incident ou tâche de correction avec suivi | Un fait périmé devient une issue à corriger puis vérifier |
| Journal | Trace factuelle des actions, résultats, contrôles et décisions | Il ne demande pas d’exposer un raisonnement interne caché |
| Livrable | Résultat remis selon les critères de la mission | Annonce et grille de contrôle |
| LLM | Modèle de langage qui produit des réponses à partir d’un contexte | Le modèle seul n’a pas de permission générale d’agir |
| Mémoire persistante | Information conservée au-delà d’une session selon une politique explicite | Les droits, la durée et la mise à jour doivent être définis |
| Mission | Travail délimité avec un résultat attendu | Préparer une annonce à partir d’un brief approuvé |
| Modèle | Système appris utilisé pour produire une sortie | Il constitue un composant de l’agent |
| Multiagents | Organisation dans laquelle plusieurs agents exécutent des missions coordonnées | L’accord entre eux ne remplace pas une vérification |
| MVP | Version minimale permettant de tester une utilité précise | Une seule annonce avec contrôle et revue |
| Orchestration | Organisation des étapes, dépendances et échanges | Un workflow peut être prédéfini ou comporter des décisions d’agent |
| Outil | Opération exposée au système avec des paramètres et des effets | Lire un fichier ou lancer un contrôle |
| Permission | Droit effectif d’exécuter une opération sur une ressource | Une consigne textuelle et un contrôle d’accès ne sont pas identiques |
| Prompt | Instruction et contexte transmis au modèle | Il doit préciser la sortie et les critères utiles |
| Prompt maître | Instruction de démarrage qui organise le travail et renvoie aux fichiers de référence | Il ne remplace pas les sources ni les vérifications |
| Provenance | Origine, identité, version et statut d’une donnée | S01 version 2 approuvée le 10 novembre 2026 |
| Reprise | Redémarrage contrôlé après un arrêt ou une erreur | Corriger l’entrée puis refaire les contrôles concernés |
| Revue humaine | Examen explicite d’un livrable ou d’une action par une personne responsable | La décision porte sur une version identifiée |
| Script | Programme qui exécute des instructions définies | Un remplacement de champs sans modèle |
| SEO | Travail sur la compréhension et la visibilité d’un contenu dans les moteurs de recherche | Titres, descriptions, contenu et structure. Aucune position n’est garantie |
| Simulation | Reproduction contrôlée de certains comportements sans leur exécution réelle complète | Le laboratoire ne fait aucun appel à un modèle |
| Skill | Méthode réutilisable décrite dans un fichier et éventuellement accompagnée de ressources | Il guide une tâche sans élargir les droits |
| SKILL.md | Fichier décrivant un skill avec ses informations et sa procédure | Sa présence dans un exercice ne l’installe pas automatiquement |
| Traçabilité | Capacité à relier une sortie aux entrées, actions et décisions | Un fait de l’annonce renvoie à S01 |
| Vite | Outil de développement et de construction du site web | Il ne fournit pas à lui seul un agent ou un backend |
| Workflow prédéfini | Enchaînement de tâches et branches décidé à l’avance | Lire, classer, remplir un gabarit puis soumettre à l’humain |

Le vocabulaire décrit le périmètre pédagogique du pack. Les implémentations concrètes peuvent préciser les termes. Documenter ces différences plutôt que supposer qu’un même nom désigne toujours le même fonctionnement.
