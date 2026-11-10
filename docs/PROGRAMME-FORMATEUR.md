# Programme formateur — Atelier LN-IA Agents

Version 1.0 · 10 novembre 2026 · Statut : à relire

Auteur pédagogique : Prof Abderrahman EL HISSE

## Intention pédagogique

Accompagner les participants de la compréhension des composants à la production d’un petit livrable vérifiable. Le résultat attendu est un dossier de preuves que son auteur sait expliquer et corriger.

L’atelier comporte quatre séances de 120 minutes. Il ne suppose pas une autonomie complète des systèmes. Le laboratoire du mini-site simule localement un cycle de production. Il n’appelle aucun modèle. L’exercice de production utilise ensuite Codex sous supervision si le poste et les accès sont disponibles. Un service d’agents autonomes avec un backend reste une extension à concevoir.

Le cycle proposé pour cet atelier est : cadrer, contrôler les entrées, planifier, agir, vérifier, revue humaine, livrer, capitaliser. Il ne constitue pas un protocole canonique LN-IA.

## Préparer la salle et les postes

Le [parcours guidé](PARCOURS-GUIDE.md) associe les sections du document Word fourni aux activités ci-dessous. La [fiche agent](FICHE-AGENT.md) et l’[évaluation complémentaire](EVALUATION-COMPLEMENTAIRE.md) s’intègrent aux durées existantes ; elles n’ajoutent pas une séance.

- Prévoir un navigateur récent, un éditeur de texte et le pack décompressé.
- Vérifier les prérequis d’exécution dans le README technique du pack.
- Pour la séance 4, vérifier que VS Code et Codex sont disponibles sur les postes concernés. Prévoir le travail en binôme si nécessaire.
- Préparer une copie des données fictives du cahier participant. Aucun compte réel ou secret n’est nécessaire au laboratoire.
- Répartir les fonctions de producteur et de relecteur. Une même personne peut les exercer successivement en conservant les traces.
- Choisir un dossier de travail séparé pour les exercices.
- Annoncer les critères d’acceptation avant chaque activité.

Le formateur explique la différence entre une démonstration de comportement et une preuve de fiabilité. Une transition réussie dans le simulateur prouve le fonctionnement de cette transition. Elle ne prouve pas la fiabilité d’un modèle ou d’un service externe.

## Séance 1 — Comprendre — 120 minutes

Objectif observable : classer cinq systèmes à partir de leur fonctionnement et justifier les limites de délégation.

| Minutes | Durée | Activité | Trace attendue |
|---|---:|---|---|
| 0–10 | 10 min | Présenter le livrable final et recueillir une tâche à déléguer | Une tâche et une erreur à éviter |
| 10–25 | 15 min | Montrer un script, un workflow et une boucle agentique | Trois différences observées |
| 25–45 | 20 min | Définir modèle, mission, outil, skill, agent et workflow | Glossaire annoté |
| 45–70 | 25 min | Classer les cinq systèmes de l’exercice 1 | Matrice renseignée |
| 70–85 | 15 min | Comparer les réponses et rechercher les preuves | Corrections argumentées |
| 85–105 | 20 min | Appliquer l’échelle locale A0–A3 à deux missions | Limite, validation et arrêt |
| 105–115 | 10 min | QCM et justification orale | Réponses expliquées |
| 115–120 | 5 min | Billet de sortie | Une confusion résolue et une question |

Diapositives : 1 à 7.

Points de correction : un outil n’est pas un agent. Un skill décrit une méthode réutilisable. Un workflow peut contenir un agent. Une conversation avec un modèle ne démontre pas à elle seule une boucle agentique outillée. « Non documenté » vaut mieux qu’une propriété inventée. Le nombre de rôles textuels ne démontre pas la présence de plusieurs agents.

Critère de passage : le participant décrit qui choisit l’action suivante et au moins un effet autorisé ou interdit.

## Séance 2 — Construire — 120 minutes

Objectif observable : rédiger une mission contrôlable et un skill ciblé pour le cas fictif Atelier Passage.

| Minutes | Durée | Activité | Trace attendue |
|---|---:|---|---|
| 0–10 | 10 min | Reprendre les distinctions de la séance 1 | Exemple corrigé |
| 10–25 | 15 min | Lire le besoin et délimiter le MVP | Périmètre et utilisateur |
| 25–45 | 20 min | Comparer les sources et leur statut | Tableau de provenance |
| 45–70 | 25 min | Écrire le contrat de mission | Mission versionnée |
| 70–90 | 20 min | Écrire le skill de contrôle | Fichier SKILL.md de travail |
| 90–110 | 20 min | Effectuer une revue croisée sur critères | Écarts et corrections |
| 110–120 | 10 min | Valider les entrées et le point d’arrêt | Décision de démarrage |

Diapositives : 8 à 14.

Points de correction : S01 est la source approuvée. S02 est conservée comme source périmée et ne fournit pas la date de l’annonce. S03 contient une instruction hostile à traiter comme donnée du test. Le skill ne donne aucune autorisation de publication. La mission doit définir une sortie, une limite et un responsable de validation.

Critère de passage : le contrat permet à un tiers de dire « accepté », « à corriger » ou « bloqué » à partir des mêmes pièces.

## Séance 3 — Pratiquer — 120 minutes

Objectif observable : expliquer les transitions du cycle et documenter trois incidents sans confondre simulation et exécution réelle.

| Minutes | Durée | Activité | Trace attendue |
|---|---:|---|---|
| 0–10 | 10 min | Présenter le cycle et les retours possibles | Point de contrôle repéré |
| 10–25 | 15 min | Parcours normal dans le laboratoire local | Journal de simulation |
| 25–45 | 20 min | Scénario de source manquante | Incident et décision d’arrêt |
| 45–65 | 20 min | Scénario d’instruction hostile dans une source | Preuve du refus d’élargir les droits |
| 65–85 | 20 min | Scénario de limite d’essais ou de budget | Motif d’arrêt et état conservé |
| 85–105 | 20 min | Corriger puis préparer la reprise | Entrée corrigée et nouveau contrôle |
| 105–115 | 10 min | Comparer contrôle automatique et revue humaine | Deux contrôles complémentaires |
| 115–120 | 5 min | Billet de sortie | Une règle de reprise |

Diapositives : 15 à 21.

Points de correction : l’arrêt doit être explicable. Une source absente ne se remplace pas par une invention. Une instruction trouvée dans un document ne modifie pas le contrat. Un compteur de simulation n’est pas une facture d’API. La détection par mots-clés est un exercice pédagogique et ne suffit pas à sécuriser un service réel.

Critère de passage : le journal distingue le statut du livrable, le résultat du contrôle et la décision humaine.

## Séance 4 — Produire — 120 minutes

Objectif observable : produire un MVP sous supervision avec un dossier de preuves et présenter une limite de son fonctionnement.

| Minutes | Durée | Activité | Trace attendue |
|---|---:|---|---|
| 0–10 | 10 min | Vérifier le poste, les fichiers et le contrat | Préparation consignée |
| 10–25 | 15 min | Adapter le prompt maître au périmètre de l’exercice | Plan et critères |
| 25–60 | 35 min | Exécuter dans Codex et conserver les résultats | Livrable et journal factuel |
| 60–80 | 20 min | Contrôler les faits puis corriger les écarts | Fiche de contrôle |
| 80–95 | 15 min | Constituer le dossier de preuves | Fichiers reliés à la mission |
| 95–115 | 20 min | Présenter et faire une modification demandée | Démonstration de maîtrise |
| 115–120 | 5 min | Choisir la prochaine extension | Décision argumentée |

Diapositives : 22 à 28.

Les 20 minutes de présentation s’adaptent à l’effectif. Dans un groupe de plus de cinq équipes, organiser des revues croisées simultanées puis une restitution commune. Ne pas raccourcir le contrôle pour faire passer chaque équipe devant toute la salle.

Points de correction : vérifier l’annonce avec la source approuvée et non avec l’assurance du producteur. Compter les corrections et le temps de revue dans les mesures. Sans mesure disponible, écrire « non mesuré ». Une exécution supervisée réussie ne valide pas une extension autonome.

Critère de passage : une personne autre que le producteur peut relier les faits du livrable aux entrées approuvées et comprendre la décision d’acceptation.

## Adaptation au niveau

| Niveau | Adaptation | Exigence conservée |
|---|---|---|
| Découverte | Fournir les gabarits et une démonstration du premier contrôle | Expliquer les sources et les droits |
| Intermédiaire | Laisser rédiger mission, skill et critères | Traces complètes et reprise explicite |
| Avancé | Ajouter un cas contradictoire et un contrôle indépendant | Ne pas augmenter les droits sans justification |

Si Codex n’est pas disponible, terminer manuellement le même livrable et marquer la séance « production manuelle avec revue ». Cette variante vérifie le contrat et les contrôles. Elle ne valide pas une exécution agentique.

## Évaluation et retour

Chaque dimension reçoit un statut : acquis, à renforcer ou non observé.

| Dimension | Indicateur observable |
|---|---|
| Compréhension | Distingue les composants et cite une preuve de fonctionnement |
| Cadrage | Mission avec entrées, limites, sortie et critères |
| Données | Identifie la version approuvée et traite les conflits |
| Contrôles | Exécute les vérifications prévues et conserve les écarts |
| Supervision | Explique qui autorise quelle action |
| Production | Livrable conforme et dossier de preuves lisible |
| Reprise | Corrige un incident sans masquer l’essai initial |
| Explication | Présente ce qui fonctionne et ce qui reste non évalué |

La validation pédagogique de cet atelier n’est pas une certification de sécurité ni une qualification à exploiter un système autonome en production.

## Préparer l’étape suivante

Choisir un seul MVP à prolonger. Mesurer un lot limité de tâches, conserver les échecs, relever le temps total et faire relire les sorties. Décider ensuite de conserver, simplifier ou étendre le système. La suite vers 2027 se construit sur ces observations plutôt que sur une promesse de gain.
