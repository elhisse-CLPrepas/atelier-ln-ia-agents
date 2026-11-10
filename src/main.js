import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import atelier from '../contenus/atelier.json';
import initialMission from '../missions/M01-fiche-pedagogique.json';
import corpus from '../fixtures/corpus.json';
import { STAGES, advance, review, runUntilReview, makeScenario, validateMission, toMarkdown } from './domain/production.js';

const documents = import.meta.glob('../docs/*.md', { query: '?raw', import: 'default', eager: true });
const masterPrompts = import.meta.glob('../PROMPT-MAITRE-CODEX.md', { query: '?raw', import: 'default', eager: true });
const skillFiles = import.meta.glob('../.agents/skills/*/SKILL.md', { query: '?raw', import: 'default', eager: true });
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const list = items => `<ul class="content-list">${items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`;
const pages = [ ['accueil','Vue d’ensemble'], ['parcours','Les 4 étapes'], ['classification','Classer les agents'], ['missions','Écrire une mission'], ['skills','Créer un skill'], ['laboratoire','Laboratoire'], ['presentation','Présentation'], ['evaluation','Évaluer & livrer'], ['ressources','Dossier & sources'] ];
const page = () => pages.some(([id])=>id===location.hash.slice(1)) ? location.hash.slice(1) : 'accueil';
let completed = [];
try { completed = JSON.parse(localStorage.getItem('lnia-modules') || '[]'); if(!Array.isArray(completed)) completed=[]; } catch {}
let mission = structuredClone(initialMission);
let run = makeScenario(mission, corpus, 'valide');
let slideIndex = 0;
let showNotes = false;
let quizAnswers = {};
let quizSubmitted = false;
let cardIndex = 0;
let cardFlipped = false;
let activeModule = 'comprendre';
let activeSkill = 0;
let taxFilter = '';
let deliveryChecks = new Set();
const sourceLinks = [
 ['Vite — démarrer et construire', 'https://vite.dev/guide/', 'Installation et compilation du support.'],
 ['Bootstrap — intégration avec Vite', 'https://getbootstrap.com/docs/5.3/getting-started/vite/', 'Composants et styles locaux.'],
 ['Codex — créer des skills', 'https://learn.chatgpt.com/docs/build-skills', 'SKILL.md et découverte des skills de projet.'],
 ['Agent Skills — spécification', 'https://agentskills.io/specification', 'Structure et métadonnées des procédures.'],
 ['Codex — AGENTS.md', 'https://developers.openai.com/codex/guides/agents-md', 'Instructions du dépôt.'],
 ['Anthropic — workflows et agents', 'https://www.anthropic.com/research/building-effective-agents', 'Distinction conceptuelle. Article du 19 décembre 2024.'],
 ['MCP — architecture', 'https://modelcontextprotocol.io/docs/learn/architecture', 'Connexion entre applications et sources/outils.'],
 ['OWASP — risques des applications agentiques', 'https://genai.owasp.org/2025/12/09/owasp-top-10-for-agentic-applications-the-benchmark-for-agentic-security-in-the-age-of-autonomous-ai/', 'Repères pour analyser les permissions et les risques.']
];

function download(name, content, type='text/plain;charset=utf-8') {
  const url=URL.createObjectURL(new Blob([content],{type}));
  const a=document.createElement('a'); a.href=url; a.download=name; a.click();
  setTimeout(()=>URL.revokeObjectURL(url),1000);
  notify(`Fichier préparé : ${name}`);
}
function notify(message) { const toast=document.querySelector('#toast'); toast.textContent=message; toast.classList.add('visible'); setTimeout(()=>toast.classList.remove('visible'),3500); }
function header(kicker,title,intro) {return `<div class="page-heading"><p class="eyebrow">${esc(kicker)}</p><h1>${esc(title)}</h1><p class="lead-text">${esc(intro)}</p></div>`;}
function label(text, cls='') {return `<span class="tag ${cls}">${esc(text)}</span>`;}

function shell() {
  document.querySelector('#app').innerHTML=`
    <aside class="sidebar" id="navigation"><a class="brand" href="#accueil" aria-label="LN-IA, accueil"><img src="./logo-ln-ia.png" alt="LN-IA — LAB-NUMÉRIQUE-IA"></a>
      <div class="sidebar-caption">Atelier de production</div>
      <nav aria-label="Navigation principale">${pages.map(([id,title],i)=>`<a href="#${id}" class="nav-item ${page()===id?'active':''}" ${page()===id?'aria-current="page"':''}><span class="nav-num">${String(i).padStart(2,'0')}</span>${title}</a>`).join('')}</nav>
      <div class="sidebar-bottom"><span class="tiny-label">VOTRE PARCOURS</span><div class="progress" role="progressbar" aria-label="Étapes terminées" aria-valuenow="${completed.length}" aria-valuemin="0" aria-valuemax="4"><div class="progress-bar" style="width:${completed.length*25}%"></div></div><p>${completed.length} / 4 étapes déclarées terminées</p><span class="tiny-label">LN-IA · VERSION 1.0 · 2026</span></div>
    </aside>
    <div class="workspace"><header class="topbar"><button class="menu-button btn btn-outline-dark" data-action="menu" aria-controls="navigation" aria-expanded="false">Menu</button><span>LAB-NUMÉRIQUE-IA <span class="topbar-divider">/</span> Challenge 100 jours</span><span class="edition">COMPRENDRE → PRODUIRE</span></header>
    <main id="main" tabindex="-1"></main><footer class="site-footer"><p>L’IA propose. L’humain contrôle. LN-IA valide.</p><span>Apprendre en produisant. Produire avec méthode.</span></footer></div>`;
  render();
}
function render() {
  const p=page();
  const views={accueil:home,parcours:course,classification:classification,missions:missionBuilder,skills:skills,laboratoire:laboratory,presentation:presentation,evaluation:evaluation,ressources:resources};
  const affiches = ['accueil','parcours','ressources'].includes(p) ? `<section class="section-space paper-panel"><p class="eyebrow">LE PARCOURS EN AFFICHES</p><h2>29 affiches pour lire, comprendre et pratiquer.</h2><p>Retrouvez les quatre étapes, leurs repères et leurs missions dans un livre à parcourir. Le PDF A4 rassemble toute la collection pour l’impression.</p><div class="d-flex flex-wrap gap-3"><a class="btn btn-navy" href="./affiches/LIVRE-AFFICHES-LN-IA.html">Feuilleter les affiches</a><a class="btn btn-outline-dark" href="./affiches/AFFICHES-LN-IA-29-PAGES-A4.pdf">Ouvrir le PDF A4</a></div></section>` : '';
  document.querySelector('#main').innerHTML=views[p]()+affiches;
  document.querySelectorAll('.nav-item').forEach(a=>{ const selected=a.hash===`#${p}`; a.classList.toggle('active',selected); if(selected)a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
}
function home() {
  return `<section class="hero"><div class="hero-copy"><p class="eyebrow light">ATELIER LN-IA · INITIATION AUX AGENTS IA</p><h1>Concevoir une mission.<br><em>Prouver le résultat.</em></h1><p>Comprenez ce qu’un agent peut décider. Construisez ses missions et ses skills. Produisez un livrable que vous pouvez expliquer et valider.</p><div class="hero-actions"><a class="btn btn-gold" href="#parcours">Commencer le parcours <span aria-hidden="true">→</span></a><a class="text-link light" href="#presentation">Ouvrir la présentation</a></div><div class="hero-metrics"><div><strong>04</strong><span>étapes de pratique</span></div><div><strong>08 h</strong><span>de parcours proposé</span></div><div><strong>01</strong><span>MVP à valider</span></div></div></div>
    <div class="hero-board" aria-label="Contrat de production"><div class="board-top"><span>MISSION / M01</span><span class="dot"></span></div><h2>Une fiche pédagogique<br>avec ses preuves.</h2><div class="board-row"><span>Entrées</span><strong>3 sources autorisées</strong></div><div class="board-row"><span>Actions</span><strong>Lire · rédiger</strong></div><div class="board-row"><span>Contrôle</span><strong>Critères + revue humaine</strong></div><div class="board-row"><span>Sortie</span><strong>Fiche + journal</strong></div><div class="board-status"><span class="status-ring"></span>Livraison soumise à validation</div><p>Le laboratoire simule ce cycle sans appel à un modèle.</p></div></section>
    <section class="section-space"><div class="section-heading"><div><p class="eyebrow">LA MÉTHODE DE L’ATELIER</p><h2>Quatre étapes. Des preuves à chaque étape.</h2></div><a class="text-link" href="#parcours">Voir les activités →</a></div><div class="row g-3">${atelier.modules.map((m,i)=>`<div class="col-md-6 col-xl-3"><a class="route-card" href="#parcours" data-module="${m.id}"><span class="route-index">0${i+1}</span><h3>${esc(m.title)}</h3><p>${esc(m.objective)}</p><span class="card-end">${esc(m.duration)} <span>↗</span></span></a></div>`).join('')}</div></section>
    <section class="statement-band"><span class="eyebrow">LA QUESTION CENTRALE</span><h2>Quelle décision confiez-vous à l’agent<br> et quelle preuve exigez-vous en retour ?</h2><p>La maîtrise se mesure par le périmètre, les contrôles et la qualité du livrable.</p></section>
    <section class="section-space"><div class="row g-4"><div class="col-lg-7"><p class="eyebrow">DU SUPPORT À LA PRODUCTION</p><h2>Un atelier à ouvrir.<br>Un dossier à continuer dans VS Code.</h2><p>Le support réunit une classification technique, des missions modifiables, quatre skills de projet et un laboratoire avec cinq scénarios. Les documents du dossier accompagnent l’exécution avec Codex.</p><a class="btn btn-navy" href="#laboratoire">Pratiquer dans le laboratoire</a></div><div class="col-lg-5"><div class="paper-panel"><h3>Ce qui est livré</h3><ul class="check-list"><li>Simulation locale explicite, sans clé API</li><li>Présentation de ${atelier.slides.length} diapositives</li><li>Missions et critères de réception</li><li>Prompt maître et sources vérifiables</li></ul><a class="text-link" href="#ressources">Consulter le dossier →</a></div></div></div></section>`;
}
function course() {
  const module=atelier.modules.find(m=>m.id===activeModule)||atelier.modules[0];
  return header('01 / PARCOURS','Comprendre. Construire. Pratiquer. Produire.','Quatre séances de deux heures. Chaque séance se termine par un livrable et un contrôle.')+
  `<div class="module-tabs" role="group" aria-label="Choix du module">${atelier.modules.map((m,i)=>`<button class="module-tab ${module.id===m.id?'selected':''}" data-action="module" data-id="${m.id}" aria-pressed="${module.id===m.id}"><span>0${i+1}</span>${esc(m.title)}${completed.includes(m.id)?' ✓':''}</button>`).join('')}</div>
  <section class="paper-panel module-intro"><div>${label(module.duration)}<h2>${esc(module.title)}</h2><p class="lead-text">${esc(module.objective)}</p></div><button class="btn ${completed.includes(module.id)?'btn-outline-dark':'btn-navy'}" data-action="complete" data-id="${module.id}">${completed.includes(module.id)?'Étape terminée · annuler':'Déclarer cette étape terminée'}</button></section>
  <div class="row g-3 my-2">${module.concepts.map((c,i)=>`<div class="col-lg-6"><article class="concept-card"><span class="tiny-label">REPÈRE ${i+1}</span><h3>${esc(c.title)}</h3><p>${esc(c.text)}</p><div class="example"><span>Exemple</span><p>${esc(c.example)}</p></div></article></div>`).join('')}</div>
  <section class="exercise-panel section-space"><div class="exercise-title"><span class="eyebrow light">À VOUS DE PRODUIRE</span><h2>La mission de la séance</h2><p>${esc(module.exercise.brief)}</p></div><div class="exercise-body"><h3>Faire</h3><ol>${module.exercise.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol><h3>Livrer</h3><p>${esc(module.exercise.deliverable)}</p><h3>Valider</h3>${list(module.exercise.acceptance)}</div></section>`;
}
function classification() {
  const filtered=atelier.taxonomy.filter(t=>`${t.criterion} ${t.values} ${t.evidence}`.toLowerCase().includes(taxFilter.toLowerCase()));
  return header('02 / CLASSIFICATION','Classer par fonctionnement.','Un métier attribué à un agent ne décrit pas son architecture. Observez ses décisions, ses outils et ses permissions.')+
  `<div class="row g-3 mb-4">${[
    ['Script','Suit des règles écrites. Même entrée et mêmes conditions donnent le même traitement.'],
    ['Workflow','Enchaîne des étapes définies. Certaines étapes peuvent appeler un modèle.'],
    ['Agent piloté par LLM','Choisit certaines actions à partir d’un objectif et d’observations.'],
    ['Système multi-agent','Coordonne plusieurs agents. Les échanges et les responsabilités ajoutent des coûts de contrôle.']
  ].map(([t,d])=>`<div class="col-md-6 col-xl-3"><article class="mini-card"><h3>${t}</h3><p>${d}</p></article></div>`).join('')}</div>
  <div class="section-heading"><h2>Les critères observables</h2><label class="search-label">Filtrer <input id="taxonomy-search" type="search" class="form-control" value="${esc(taxFilter)}" placeholder="Mémoire, outils, contrôle…"></label></div>
  <div class="table-responsive"><table class="table taxonomy-table"><thead><tr><th>Critère</th><th>Variantes possibles</th><th>Preuve à demander</th></tr></thead><tbody>${filtered.map(t=>`<tr><th scope="row">${esc(t.criterion)}</th><td>${esc(t.values)}</td><td>${esc(t.evidence)}</td></tr>`).join('')||'<tr><td colspan="3">Aucun critère ne correspond à votre recherche.</td></tr>'}</tbody></table></div>
  <section class="section-space"><p class="eyebrow">AUTONOMIE ACCORDÉE</p><h2>Une échelle locale pour décider du contrôle</h2><p>A0 à A3 sont les repères de cet atelier. Ils ne constituent pas une norme du secteur.</p><div class="autonomy-grid">${[
    ['A0','Assistance','L’humain choisit et applique chaque action.'],['A1','Exécution isolée','L’agent prépare un résultat dans un périmètre local. Revue avant acceptation.'],['A2','Enchaînement borné','Plusieurs actions autorisées sont exécutées avec budgets, traces et arrêts.'],['A3','Actions déléguées','Des effets externes sont permis dans une autorisation explicite. Révocation et reprise sont prévues.']
  ].map(([n,t,d])=>`<article><span>${n}</span><h3>${t}</h3><p>${d}</p></article>`).join('')}</div></section>
  <section class="section-space"><h2>Quatre MVP possibles</h2><div class="row g-3">${atelier.mvps.map(m=>`<div class="col-md-6"><article class="paper-panel"><p class="eyebrow">${esc(m.id)} · ${esc(m.level)}</p><h3>${esc(m.title)}</h3><p>${esc(m.problem)}</p><dl><dt>Utilisateur</dt><dd>${esc(m.user)}</dd><dt>Périmètre</dt><dd>${esc(m.scope)}</dd><dt>Réception</dt><dd>${esc(m.acceptance)}</dd></dl></article></div>`).join('')}</div></section>`;
}
function missionBuilder() {
  return header('03 / CONTRAT DE MISSION','Rendre la délégation vérifiable.','Définissez le résultat attendu, les actions permises, les budgets et les critères. Ce contrat pilote la prochaine simulation.')+
  `<div class="row g-4"><div class="col-xl-7"><form id="mission-form" class="paper-panel"><div class="mb-3"><label for="mission-title" class="form-label">Titre du livrable</label><input id="mission-title" name="title" class="form-control" required maxlength="120" value="${esc(mission.title)}"></div><div class="mb-3"><label for="mission-goal" class="form-label">Objectif observable</label><textarea id="mission-goal" name="goal" class="form-control" rows="3" required maxlength="700">${esc(mission.goal)}</textarea></div><div class="mb-3"><label for="mission-owner" class="form-label">Responsable de la validation</label><input id="mission-owner" name="owner" class="form-control" required maxlength="80" value="${esc(mission.owner)}"></div><div class="mb-3"><label for="mission-acceptance" class="form-label">Critères de réception · un par ligne, au moins deux</label><textarea id="mission-acceptance" name="acceptance" class="form-control" rows="5" required maxlength="1800">${esc(mission.acceptance.join('\n'))}</textarea></div><div class="row g-3"><div class="col-sm-6"><label for="mission-steps" class="form-label">Budget d’étapes · 1 à 30</label><input id="mission-steps" name="maxSteps" type="number" class="form-control" min="1" max="30" value="${mission.maxSteps}" required></div><div class="col-sm-6"><label for="mission-actions" class="form-label">Budget d’actions · 0 à 5</label><input id="mission-actions" name="maxActions" type="number" class="form-control" min="0" max="5" value="${mission.maxActions}" required></div></div><p class="form-text mt-3">Périmètre du MVP : trois sources fictives, lecture et rédaction locale. Validation humaine obligatoire. Les critères saisis devront être relus manuellement en plus des contrôles fixes du simulateur.</p><div id="mission-errors" role="alert"></div><button class="btn btn-navy mt-2" type="submit">Appliquer au laboratoire</button></form></div>
  <div class="col-xl-5"><div class="contract-panel"><p class="eyebrow">CONTRAT ACTIF / ${esc(mission.id)}</p><h2>${esc(mission.title)}</h2><dl><dt>Entrée</dt><dd>fixtures/corpus.json · 3 sources fictives</dd><dt>Outils autorisés</dt><dd>Lire les sources · rédiger le brouillon</dd><dt>Sortie</dt><dd>Une fiche et un journal de production</dd><dt>Arrêts</dt><dd>Source invalide, injection du scénario, budget épuisé ou refus humain</dd><dt>Autorité de validation</dt><dd>${esc(mission.owner)}</dd></dl><div class="d-flex flex-wrap gap-2"><button class="btn btn-gold" data-action="export-mission">Exporter le contrat JSON</button><button class="btn btn-outline-light" data-action="reset-mission">Réinitialiser</button></div></div><div class="callout mt-3"><h3>Mission ≠ prompt isolé</h3><p>La mission fixe le contrat. Le prompt formule une demande au modèle. Le skill apporte une procédure. Les permissions sont imposées par l’environnement d’exécution.</p></div></div></div>`;
}
function skills() {
  const entries=Object.entries(skillFiles).sort(([a],[b])=>a.localeCompare(b));
  const [path,content]=entries[activeSkill]||['',''];
  return header('04 / PROCÉDURES RÉUTILISABLES','Un skill explicite la méthode.','Chaque skill indique quand l’utiliser, comment travailler et quelles preuves rendre. Le dossier contient quatre skills de projet pour Codex.')+
  `<div class="row g-4"><div class="col-xl-4"><div class="skill-picker">${entries.map(([p],i)=>`<button class="skill-choice ${activeSkill===i?'selected':''}" data-action="skill" data-index="${i}"><span>0${i+1}</span>${esc(p.split('/').at(-2).replace('lnia-','').replaceAll('-',' '))}</button>`).join('')}</div><div class="callout mt-3"><h3>Où les placer ?</h3><p><code>.agents/skills/nom-du-skill/SKILL.md</code></p><p>Le fichier commence par un en-tête YAML avec <code>name</code> et <code>description</code>. Le nom correspond à son dossier.</p><p>Dans Codex, demandez explicitement l’utilisation du skill. Vérifiez sa détection dans votre version de l’extension.</p></div></div><div class="col-xl-8"><div class="code-heading"><span>${esc(path.replace('../',''))}</span><button class="btn btn-sm btn-outline-light" data-action="download-skill">Télécharger</button></div><pre class="code-panel"><code>${esc(content)}</code></pre></div></div>
  <section class="section-space"><h2>Une demande concrète dans Codex</h2><div class="prompt-example">Utilise le skill lnia-controler-entrees pour contrôler fixtures/corpus.json. Produis un rapport dans livrables/M01/controle-entrees.md. Signale les données rejetées et cite les règles appliquées. N’ajoute aucune source externe.</div><p class="mt-3">Les instructions d’un skill ne remplacent ni le bac à sable, ni les droits d’accès, ni les contrôles du serveur. MCP est un protocole de connexion aux outils et aux ressources. Ce n’est pas un modèle ni une permission automatique.</p></section>`;
}
function laboratory() {
  const statuses={ready:'Prêt à démarrer',running:'En cours',waiting:'Décision humaine requise',blocked:'Production bloquée',rejected:'Livrable refusé',completed:'Cycle terminé'};
  const disabled=!['ready','running'].includes(run.status);
  const issueHelp={source:'Renseignez la provenance dans une copie du corpus. Relancez les contrôles avant une nouvelle exécution.',fraicheur:'Vérifiez la source et actualisez la date seulement après relecture. Une date changée seule n’est pas une preuve.',injection:'Écartez la source hostile et conservez sa trace. Le filtre de démonstration ne détecte que le scénario fourni.',budget:'Réduisez le périmètre ou faites approuver un budget adapté. Le scénario valide autorise la rédaction d’une fiche.'};
  return header('05 / LABORATOIRE DE PRODUCTION','Suivre une mission jusqu’à sa preuve.','Ce cycle est la méthode proposée pour l’atelier. Observez les décisions, les contrôles et les conditions d’arrêt.')+
  `<div class="simulation-strip"><span class="status-dot"></span><strong>Simulation pédagogique</strong><span>Sans appel à un modèle · données fictives · aucune action externe</span></div>
  <div class="lab-toolbar"><label for="scenario">Scénario à explorer<select id="scenario" class="form-select">${[['valide','Données valides'],['source','Provenance absente'],['fraicheur','Donnée ancienne'],['injection','Instruction hostile'],['budget','Budget insuffisant']].map(([id,t])=>`<option value="${id}" ${run.scenario===id?'selected':''}>${t}</option>`).join('')}</select></label><div class="toolbar-buttons"><button class="btn btn-navy" data-action="step" ${disabled?'disabled':''}>Étape suivante</button><button class="btn btn-outline-dark" data-action="run" ${disabled?'disabled':''}>Avancer jusqu’à la revue</button><button class="btn btn-outline-dark" data-action="reset-run">Nouvelle exécution</button></div></div>
  <div class="row g-4"><div class="col-lg-4"><ol class="pipeline">${STAGES.map((s,i)=>{const done=run.log.some(x=>x.stage===s.id&&x.status==='passed')||(s.id==='revue'&&run.approval==='approved');const current=i===run.index;return `<li class="${done?'done':''} ${current?'current':''} ${current&&run.status==='blocked'?'failed':''}"><span class="pipeline-num">${done?'✓':String(i+1).padStart(2,'0')}</span><div><strong>${s.label}</strong><span>${done?'Contrôle passé':current?statuses[run.status]:'À venir'}</span></div></li>`;}).join('')}</ol></div>
  <div class="col-lg-8"><section class="paper-panel lab-result"><div class="section-heading"><h2>Journal de la mission</h2>${label(statuses[run.status],run.status)}</div><div class="lab-counters"><span><strong>${run.steps}</strong> / ${mission.maxSteps} étapes</span><span><strong>${run.actions}</strong> / ${mission.maxActions} actions</span><span><strong>0</strong> appel API</span></div><div class="journal" aria-live="polite">${run.log.length?run.log.map(l=>`<div class="journal-entry ${l.status}"><span>${String(l.sequence).padStart(2,'0')}</span><p><strong>${esc(STAGES.find(s=>s.id===l.stage)?.label||l.stage)}</strong>${esc(l.detail)}</p></div>`).join(''):'<div class="empty-state"><span class="empty-symbol">01</span><h3>Le contrat est prêt.</h3><p>Lancez la première étape pour observer les contrôles.</p></div>'}</div>
  ${run.issues.length?`<div class="issue-panel" role="status"><h3>${run.status==='rejected'?'Décision humaine : refus':'Une condition d’arrêt a été atteinte'}</h3>${list(run.issues)}<p>${esc(issueHelp[run.scenario]||'Corrigez le contrat ou les entrées, puis ouvrez une nouvelle exécution. Conservez le journal de celle-ci.')}</p></div>`:''}
  ${run.status==='waiting'?`<form id="review-form" class="review-panel"><h3>Votre décision engage la livraison.</h3><p>Relisez le brouillon ci-dessous et les critères de la mission.</p><label class="form-label" for="review-comment">Justification de votre décision</label><textarea id="review-comment" class="form-control" required minlength="3" maxlength="1000" rows="2" placeholder="Ce que vous avez contrôlé, ou ce qui doit être corrigé."></textarea><div class="d-flex flex-wrap gap-2 mt-3"><button class="btn btn-navy" type="submit" value="approve">Valider le livrable</button><button class="btn btn-outline-danger" type="submit" value="reject">Refuser et arrêter</button></div></form>`:''}
  <div class="d-flex flex-wrap gap-2 mt-3"><button class="btn btn-outline-dark" data-action="export-journal" ${!run.log.length?'disabled':''}>Exporter le journal JSON</button><button class="btn btn-gold" data-action="export-output" ${!run.delivered?'disabled':''}>Télécharger la fiche validée</button></div></section>
  ${run.output?`<section class="paper-panel mt-3"><p class="eyebrow">${run.delivered?'LIVRABLE VALIDÉ':'BROUILLON · À RELIRE'}</p><h2>${esc(run.output.title)}</h2><ul class="content-list">${run.output.points.map(p=>`<li>${esc(p.text)} <span class="source-ref">[${p.sourceId}]</span></li>`).join('')}</ul><h3>Exercice</h3><p>${esc(run.output.exercise)}</p><h3>Critères de la mission</h3>${list(run.output.acceptance)}</section>`:''}</div></div>
  <div class="callout mt-4"><h3>Ce que cette simulation démontre</h3><p>Des contrôles peuvent empêcher la livraison lorsque les entrées, le budget ou la revue ne conviennent pas. L’assemblage du texte est déterministe. La pertinence des critères personnalisés reste une décision humaine. La résistance à des attaques réelles exigerait d’autres contrôles côté serveur.</p></div>`;
}
function presentation() {
  const slide=atelier.slides[slideIndex];
  return header('06 / SUPPORT DU FORMATEUR',`${atelier.slides.length} diapositives pour animer l’atelier.`,'Naviguez avec les boutons ou les flèches du clavier. Les notes accompagnent la démonstration et les activités.')+
  `<div class="deck-toolbar"><label for="slide-select">Aller à<select class="form-select" id="slide-select">${atelier.slides.map((s,i)=>`<option value="${i}" ${i===slideIndex?'selected':''}>${String(i+1).padStart(2,'0')} · ${esc(s.title)}</option>`).join('')}</select></label><div class="d-flex gap-2"><button class="btn btn-outline-dark" data-action="notes" aria-pressed="${showNotes}">${showNotes?'Masquer':'Voir'} les notes</button><button class="btn btn-navy" data-action="fullscreen">Plein écran</button><button class="btn btn-outline-dark" data-action="print-deck">Imprimer le support</button></div></div>
  <section class="slide-stage" id="slide-stage" aria-label="Diaporama"><article class="slide"><div class="slide-top"><span>LN-IA / AGENTS IA</span><span>${String(slideIndex+1).padStart(2,'0')} / ${atelier.slides.length}</span></div><p class="eyebrow light">${esc(slide.kicker)}</p><h2>${esc(slide.title)}</h2>${list(slide.bullets)}${slide.activity?`<div class="slide-activity"><span>À FAIRE</span><p>${esc(slide.activity)}</p></div>`:''}<div class="slide-bottom"><span>L’IA propose. L’humain contrôle. LN-IA valide.</span><span>LAB-NUMÉRIQUE-IA</span></div></article><div class="slide-controls"><button class="btn btn-outline-light exit-presentation" data-action="exit-presentation">Quitter</button><button class="btn btn-outline-light" data-action="prev-slide" ${slideIndex===0?'disabled':''}>← Précédente</button><span aria-live="polite">${slideIndex+1} / ${atelier.slides.length}</span><button class="btn btn-gold" data-action="next-slide" ${slideIndex===atelier.slides.length-1?'disabled':''}>Suivante →</button></div></section>
  ${showNotes?`<div class="presenter-notes"><p class="eyebrow">NOTES D’ANIMATION</p><p>${esc(slide.notes)}</p></div>`:''}
  <div class="print-deck">${atelier.slides.map((s,i)=>`<article><p>LN-IA · AGENTS IA · ${i+1} / ${atelier.slides.length}</p><h2>${esc(s.title)}</h2>${list(s.bullets)}<h3>Animation</h3><p>${esc(s.notes)}</p>${s.activity?`<p>Activité : ${esc(s.activity)}</p>`:''}</article>`).join('')}</div>`;
}
const portfolioItems=['Mission complète et périmètre autorisé','Sources et entrées contrôlées avec rapport','Livrable lié à ses sources et à ses critères','Journal, incident et correction documentés','Revue humaine, décision et bilan présents'];
function evaluation() {
  const score=atelier.quiz.filter(q=>Number(quizAnswers[q.id])===q.correct&&quizAnswers[q.id]!==undefined).length;
  const card=atelier.flashcards[cardIndex];
  return header('07 / ÉVALUATION','Comprendre le système. Défendre le résultat.','Le quiz vérifie les repères. Le portfolio apporte les preuves d’une production. Le score ne constitue pas une certification.')+
  `<div class="row g-4"><div class="col-xl-8"><form id="quiz-form"><div class="section-heading"><h2>Les ${atelier.quiz.length} questions de l’atelier</h2>${quizSubmitted?label(`${score} / ${atelier.quiz.length}`,score>=9?'completed':'waiting'):label('Auto-évaluation')}</div>${atelier.quiz.map((q,i)=>`<fieldset class="quiz-question"><legend><span>${String(i+1).padStart(2,'0')}</span>${esc(q.question)}</legend>${q.options.map((o,j)=>`<label class="quiz-option ${quizSubmitted&&j===q.correct?'correct':''}"><input type="radio" name="${q.id}" value="${j}" ${Number(quizAnswers[q.id])===j&&quizAnswers[q.id]!==undefined?'checked':''} required ${quizSubmitted?'disabled':''}>${esc(o)}</label>`).join('')}${quizSubmitted?`<p class="quiz-feedback">${Number(quizAnswers[q.id])===q.correct?'Réponse juste.':'À revoir.'} ${esc(q.explanation)}</p>`:''}</fieldset>`).join('')}<div class="d-flex flex-wrap gap-2"><button type="submit" class="btn btn-navy" ${quizSubmitted?'disabled':''}>Vérifier mes réponses</button><button type="button" class="btn btn-outline-dark" data-action="reset-quiz">Recommencer</button>${quizSubmitted?'<button type="button" class="btn btn-outline-dark" data-action="export-score">Exporter le résultat</button>':''}</div></form></div><div class="col-xl-4"><section class="paper-panel sticky-panel"><p class="eyebrow">RÉVISER / ${cardIndex+1} SUR ${atelier.flashcards.length}</p><h2>La carte mémoire</h2><button class="flashcard" data-action="flip" aria-label="Retourner la carte"><span>${cardFlipped?'RÉPONSE':'QUESTION'}</span><p>${esc(cardFlipped?card.back:card.front)}</p><small>Cliquer pour retourner</small></button><div class="d-flex justify-content-between mt-3"><button class="btn btn-sm btn-outline-dark" data-action="prev-card">← Précédente</button><button class="btn btn-sm btn-outline-dark" data-action="next-card">Suivante →</button></div></section></div></div>
  <section class="section-space paper-panel"><div class="section-heading"><div><p class="eyebrow">PORTFOLIO DE PRODUCTION</p><h2>Votre dossier peut-il être accepté ?</h2></div><span class="portfolio-score">${deliveryChecks.size*2}<small> / 10</small></span></div><p>Barème proposé : 2 points par preuve présente et vérifiée. Seuil pédagogique : 8/10 et aucun défaut bloquant. L’acceptation finale appartient au formateur.</p>${portfolioItems.map((t,i)=>`<label class="portfolio-check"><input type="checkbox" data-portfolio="${i}" ${deliveryChecks.has(i)?'checked':''}><span>${t}</span><span>2 pts</span></label>`).join('')}<button class="btn btn-navy mt-3" data-action="export-portfolio">Exporter la grille de réception</button></section>
  <section class="section-space"><h2>Avantages et risques : demander une preuve</h2><p>Les gains possibles sont la répétabilité, la rapidité de préparation et la traçabilité. Comparez le temps total, les reprises et la qualité acceptée avant de conclure à un gain.</p><div class="table-responsive"><table class="table taxonomy-table"><thead><tr><th>Risque</th><th>Situation</th><th>Contrôle</th><th>Preuve attendue</th></tr></thead><tbody>${atelier.risks.map(r=>`<tr><th scope="row">${esc(r.risk)}</th><td>${esc(r.example)}</td><td>${esc(r.control)}</td><td>${esc(r.evidence)}</td></tr>`).join('')}</tbody></table></div></section>`;
}
function resources() {
  const docs=Object.entries(documents).sort(([a],[b])=>a.localeCompare(b));
  return header('08 / DOSSIER PROFESSIONNEL','Ouvrir le projet. Continuer la production.','Le pack ZIP contient le code, les documents pédagogiques, les missions, les skills, les tests et le support autonome.')+
  `<div class="row g-4"><div class="col-lg-7"><section class="contract-panel"><p class="eyebrow">VS CODE + CODEX</p><h2>Un point de départ explicite.</h2><ol><li>Décompressez le pack et ouvrez son dossier racine dans VS Code.</li><li>Lisez DEMARRER-ICI.md puis AGENTS.md.</li><li>Vérifiez les commandes avec le terminal intégré.</li><li>Collez le prompt maître dans Codex et choisissez une mission.</li></ol><pre><code>npm ci\nnpm run dev\nnpm run check</code></pre><button class="btn btn-gold" data-action="master-prompt">Télécharger le prompt maître</button></section></div><div class="col-lg-5"><section class="paper-panel"><p class="eyebrow">LES TROIS PÉRIMÈTRES</p><h3>MVP 0 · livré</h3><p>Support Vite et simulation déterministe locale.</p><h3>MVP 1 · à pratiquer</h3><p>Codex exécute une mission sur les fichiers du projet, avec revue humaine.</p><h3>MVP 2 · à construire ensuite</h3><p>Un serveur appelle un modèle et applique les permissions. Cette extension n’est pas incluse dans la simulation.</p></section></div></div>
  <section class="section-space"><div class="section-heading"><h2>Documents à utiliser</h2><span class="tiny-label">FORMAT MARKDOWN MODIFIABLE</span></div><div class="resource-grid">${docs.map(([p,c])=>`<button class="resource-item" data-action="document" data-path="${esc(p)}"><span class="file-icon">MD</span><span><strong>${esc(p.split('/').at(-1).replace('.md','').replaceAll('-',' '))}</strong><small>${Math.max(1,Math.ceil(c.length/6000))} min de lecture estimée</small></span><span aria-hidden="true">↓</span></button>`).join('')}</div></section>
  <section class="section-space"><p class="eyebrow">DOCUMENTATION PRIMAIRE · CONSULTÉE LE 10 NOVEMBRE 2026</p><h2>Les références techniques</h2><p>Les concepts de l’atelier s’appuient sur ces sources. Les choix pédagogiques et l’échelle A0–A3 sont propres à ce dossier.</p><div class="source-list">${sourceLinks.map(([t,u,d],i)=>`<a href="${u}" target="_blank" rel="noopener noreferrer"><span>${String(i+1).padStart(2,'0')}</span><div><strong>${t}</strong><p>${d}</p></div><span aria-hidden="true">↗</span></a>`).join('')}</div></section>
  <section class="paper-panel section-space"><h2>Référencement et publication</h2><p>Vite construit le site. Bootstrap organise la présentation responsive. Le référencement repose sur le HTML sémantique, les titres, les métadonnées, les données structurées et une URL publique réelle.</p><p>Sans <code>SITE_URL</code>, le build reste en prépublication avec <code>noindex</code>. Configurez votre adresse HTTPS dans <code>.env</code> puis reconstruisez : la balise canonique, le sitemap et le fichier robots seront générés. La version autonome sert à l’atelier et ne vise pas l’indexation.</p></section>`;
}

document.addEventListener('click',async event=>{
  const moduleLink=event.target.closest('[data-module]');if(moduleLink){activeModule=moduleLink.dataset.module;if(page()==='parcours')render();}
  const el=event.target.closest('[data-action]');if(!el)return;
  const action=el.dataset.action;
  if(action==='menu'){document.querySelector('.sidebar').classList.toggle('open');el.setAttribute('aria-expanded',String(document.querySelector('.sidebar').classList.contains('open')));return;}
  if(action==='module')activeModule=el.dataset.id;
  if(action==='complete'){ const id=el.dataset.id;completed=completed.includes(id)?completed.filter(x=>x!==id):[...completed,id];try{localStorage.setItem('lnia-modules',JSON.stringify(completed));}catch{}shell();return; }
  if(action==='skill')activeSkill=Number(el.dataset.index);
  if(action==='download-skill'){const [p,c]=Object.entries(skillFiles).sort(([a],[b])=>a.localeCompare(b))[activeSkill];download(`${p.split('/').at(-2)}-SKILL.md`,c);return;}
  if(action==='export-mission'){download('mission-ln-ia.json',JSON.stringify(mission,null,2),'application/json');return;}
  if(action==='reset-mission'){mission=structuredClone(initialMission);run=makeScenario(mission,corpus,'valide');}
  if(action==='step')run=advance(run);
  if(action==='run')run=runUntilReview(run);
  if(action==='reset-run')run=makeScenario(mission,corpus,run.scenario);
  if(action==='export-journal'){download('journal-ln-ia.json',JSON.stringify(run,null,2),'application/json');return;}
  if(action==='export-output'){try{download('fiche-ln-ia-validee.md',toMarkdown(run));}catch(error){notify(error.message);}return;}
  if(action==='next-slide')slideIndex=Math.min(slideIndex+1,atelier.slides.length-1);
  if(action==='prev-slide')slideIndex=Math.max(slideIndex-1,0);
  if(action==='notes')showNotes=!showNotes;
  if(action==='fullscreen'){document.body.classList.add('presenting');try{await document.querySelector('#main').requestFullscreen();}catch{}return;}
  if(action==='exit-presentation'){document.body.classList.remove('presenting');if(document.fullscreenElement)await document.exitFullscreen();return;}
  if(action==='print-deck'){window.print();return;}
  if(action==='flip')cardFlipped=!cardFlipped;
  if(action==='prev-card'){cardIndex=(cardIndex-1+atelier.flashcards.length)%atelier.flashcards.length;cardFlipped=false;}
  if(action==='next-card'){cardIndex=(cardIndex+1)%atelier.flashcards.length;cardFlipped=false;}
  if(action==='reset-quiz'){quizSubmitted=false;quizAnswers={};}
  if(action==='export-score'){const score=atelier.quiz.filter(q=>Number(quizAnswers[q.id])===q.correct).length;download('evaluation-ln-ia.json',JSON.stringify({type:'auto-evaluation',score,total:atelier.quiz.length,answers:quizAnswers},null,2),'application/json');return;}
  if(action==='export-portfolio'){download('reception-ln-ia.json',JSON.stringify({type:'auto-declaration-a-verifier',score:deliveryChecks.size*2,total:10,threshold:8,blockingDefectCheck:'À compléter par le formateur',criteria:portfolioItems.map((text,i)=>({text,checked:deliveryChecks.has(i)}))},null,2),'application/json');return;}
  if(action==='master-prompt'){download('PROMPT-MAITRE-CODEX.md',Object.values(masterPrompts)[0]||'Consultez le fichier PROMPT-MAITRE-CODEX.md à la racine du pack.');return;}
  if(action==='document'){download(el.dataset.path.split('/').at(-1),documents[el.dataset.path]);return;}
  render();
});
document.addEventListener('change',event=>{
  const el=event.target;
  if(el.id==='scenario'){run=makeScenario(mission,corpus,el.value);render();}
  if(el.id==='slide-select'){slideIndex=Number(el.value);render();}
  if(el.closest('#quiz-form')&&el.type==='radio')quizAnswers[el.name]=Number(el.value);
  if(el.dataset.portfolio!==undefined){const i=Number(el.dataset.portfolio);el.checked?deliveryChecks.add(i):deliveryChecks.delete(i);render();}
});
document.addEventListener('input',event=>{
  if(event.target.id==='taxonomy-search'){const value=event.target.value;const pos=event.target.selectionStart;taxFilter=value;render();const input=document.querySelector('#taxonomy-search');input.focus();try{input.setSelectionRange(pos,pos);}catch{}}
});
document.addEventListener('submit',event=>{
  if(event.target.id==='mission-form'){
    event.preventDefault();const data=new FormData(event.target);const next={...mission,title:data.get('title').trim(),goal:data.get('goal').trim(),owner:data.get('owner').trim(),acceptance:data.get('acceptance').split('\n').map(x=>x.trim()).filter(Boolean),maxSteps:Number(data.get('maxSteps')),maxActions:Number(data.get('maxActions'))};
    const errors=validateMission(next);if(errors.length){document.querySelector('#mission-errors').innerHTML=list(errors);return;}
    mission=next;run=makeScenario(mission,corpus,'valide');render();notify('Contrat appliqué. Le laboratoire est prêt pour une nouvelle exécution.');
  }
  if(event.target.id==='review-form'){event.preventDefault();const approved=event.submitter?.value==='approve';run=review(run,approved,document.querySelector('#review-comment').value);if(approved)run=runUntilReview(run);render();notify(approved?'Décision enregistrée. Le livrable est disponible.':'Refus enregistré. La livraison reste bloquée.');}
  if(event.target.id==='quiz-form'){event.preventDefault();quizSubmitted=true;render();notify('Résultats affichés avec les explications.');}
});
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&document.body.classList.contains('presenting')){document.body.classList.remove('presenting');if(document.fullscreenElement)document.exitFullscreen();return;}
  if(page()!=='presentation'||['INPUT','TEXTAREA','SELECT','BUTTON'].includes(document.activeElement?.tagName))return;
  if(event.key==='ArrowRight'){event.preventDefault();slideIndex=Math.min(slideIndex+1,atelier.slides.length-1);render();}
  if(event.key==='ArrowLeft'){event.preventDefault();slideIndex=Math.max(slideIndex-1,0);render();}
});
window.addEventListener('hashchange',()=>{document.body.classList.remove('presenting');render();document.querySelector('.sidebar').classList.remove('open');document.querySelector('.menu-button')?.setAttribute('aria-expanded','false');document.querySelector('#main').focus({preventScroll:true});window.scrollTo(0,0);});
shell();
