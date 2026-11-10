# Sources et statut des affirmations

Consultation : 10 novembre 2026. Les liens peuvent évoluer. Relire les documentations avant une modification importante du projet.

## Documentation primaire

| Source | URL | Utilité et limite |
|---|---|---|
| Vite — Guide | https://vite.dev/guide/ | Prérequis et construction. Le pack fixe les versions dans son lockfile |
| Bootstrap — Vite | https://getbootstrap.com/docs/5.3/getting-started/vite/ | Intégration locale des styles avec Vite |
| OpenAI — Build skills | https://learn.chatgpt.com/docs/build-skills | SKILL.md et découverte des skills dans `.agents/skills` |
| Agent Skills — Specification | https://agentskills.io/specification | Métadonnées et organisation d’un skill |
| OpenAI — AGENTS.md | https://developers.openai.com/codex/guides/agents-md | Instructions applicables au projet |
| Anthropic — Building effective agents | https://www.anthropic.com/research/building-effective-agents | Distinction conceptuelle entre workflows prédéfinis et agents. Article du 19 décembre 2024, pas un catalogue actuel de produits |
| MCP — Architecture | https://modelcontextprotocol.io/docs/learn/architecture | Architecture client-serveur et échange de contexte. MCP ne définit pas à lui seul la logique ni les autorisations d’un agent |
| OWASP — Agentic Top 10 | https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/ | Analyse des risques liés aux buts, aux outils, aux permissions et aux interactions d’agents |

## Références fournies pour cet atelier

- `references/Dossier-Prospective-2027-source.docx` : copie du dossier transmis par l’utilisateur. Il fournit le contexte du Challenge 100 jours, les contrats de mission et la réflexion sur la production supervisée. Ses sources et dates restent celles du document d’origine.
- `public/logo-ln-ia.png` : logo fourni par l’utilisateur. Conservé sans modification de l’image.

## Ce qui relève de choix de l’atelier

Les quatre séances de deux heures, le cycle en huit étapes, l’échelle locale A0–A3, le seuil de portfolio, les scénarios fictifs et les contrats M01 à M04 sont des choix pédagogiques. Ils ne sont pas présentés comme une norme externe.

Le code de simulation est déterministe. Les résultats de tests portent sur ses règles. Ils ne mesurent ni les performances d’un modèle ni la sécurité d’un service d’agents connecté.

La classification utilise des dimensions observables plutôt que des appellations commerciales. Plusieurs dimensions peuvent coexister : un agent peut être réactif et planificateur, disposer d’une mémoire de session et d’outils limités, puis être intégré dans un workflow plus large.

## Ce qui n’est pas affirmé

Le dossier ne prédit pas une autonomie générale en 2027. Il ne garantit pas une croissance exponentielle de la productivité et ne transforme pas un résultat de benchmark en promesse de gain individuel. La trajectoire proposée repose sur des productions mesurées et des extensions conditionnées aux preuves obtenues.
