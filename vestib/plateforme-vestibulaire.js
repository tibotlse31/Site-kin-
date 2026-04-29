(function(){
  const data = window.VESTIB_DATA;
  const view = document.getElementById('view');
  const nav = document.getElementById('mainNav');
  const glossaryBtn = document.getElementById('glossaryBtn');
  const glossaryPanel = document.getElementById('glossaryPanel');
  const overlay = document.getElementById('overlay');
  const deepBtn = document.getElementById('deepBtn');

  let current = 'home';
  let deep = false;
  let selectedConcept = data.concepts[0].id;
  let selectedPlan = (data.studyPlans && data.studyPlans[0] ? data.studyPlans[0].id : null);
  let selectedTest = data.tests[0].id;
  let selectedTestCat = 'Bilan';
  let selectedPathology = data.pathologies[0].id;
  let selectedRehab = data.rehabObjectives[0].id;
  let selectedReasoning = data.reasoningMaps[0].id;
  let selectedCase = data.cases[0].id;
  let searchQuery = '';

  const acronyms = data.acronyms || {};
  const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  const strip = s => String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();

  function fmt(s=''){
    let html = esc(s);
    const keys = Object.keys(acronyms).sort((a,b)=>b.length-a.length);
    keys.forEach(k => {
      const safe = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`(^|[^\\wÀ-ÿ])(${safe})(?=$|[^\\wÀ-ÿ])`, 'g');
      html = html.replace(re, `$1<abbr title="${esc(acronyms[k])}">$2</abbr>`);
    });
    return html;
  }
  const badge = (txt, cls='') => `<span class="badge ${cls}">${fmt(txt)}</span>`;
  const list = (arr=[], compact=false) => `<ul class="list ${compact?'compact':''}">${arr.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul>`;
  const tags = (arr=[]) => `<div class="badge-row">${arr.map(t=>badge(t, tone(t))).join('')}</div>`;
  function tone(t=''){
    const x = strip(t);
    if(x.includes('central') || x.includes('securite') || x.includes('urgence') || x.includes('danger')) return 'danger';
    if(x.includes('dns') || x.includes('ok') || x.includes('substitution')) return 'ok';
    if(x.includes('piege') || x.includes('prudence') || x.includes('fluctuant')) return 'warn';
    if(x.includes('preop') || x.includes('avancé') || x.includes('avance')) return 'purple';
    return '';
  }
  function hero(title, intro, chips=[]){
    const chipHtml = chips.length ? `<div class="mini-map">${chips.map(c=>`<span class="map-chip">${fmt(c)}</span>`).join('')}</div>` : '';
    return `<section class="hero"><h1>${fmt(title)}</h1><p>${fmt(intro)}</p>${chipHtml}</section>`;
  }
  function stepList(steps=[]){
    return `<div class="step-list">${steps.map(s=>`<div class="step"><div><strong>${fmt(s[0])}</strong><span>${fmt(s[1])}</span></div></div>`).join('')}</div>`;
  }

  function renderNav(){
    nav.innerHTML = data.nav.map(item => `<button class="nav-btn ${item.id===current?'active':''}" data-id="${item.id}" type="button">${item.icon} ${fmt(item.label)}</button>`).join('');
    nav.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
      current = btn.dataset.id;
      render();
      window.scrollTo({top:0, behavior:'smooth'});
    }));
  }

  function go(id){ current = id; render(); window.scrollTo({top:0, behavior:'smooth'}); }

  function renderHome(){
    const cards = data.home.cards.map(c => `<article class="card clickable" data-go="${c.target}"><h3>${fmt(c.title)}</h3><p>${fmt(c.text)}</p>${tags(c.tags)}</article>`).join('');
    view.innerHTML = hero(data.home.title, data.home.intro, ['Comprendre','Retrouver','Raisonner','S’entraîner'])
      + `<div class="grid four">${cards}</div>`
      + `<section class="panel"><h2>Architecture de raisonnement</h2>${stepList(data.home.workflow)}</section>`
      + `<div class="grid two"><section class="card"><h3>Règle d’examen</h3>${list(data.home.examLogic)}</section><section class="card"><h3>Entrées rapides</h3><div class="button-row"><button class="action-btn secondary" data-jump-search="PDN droite">PDN droite</button><button class="action-btn secondary" data-jump-search="Fukuda gauche">Fukuda gauche</button><button class="action-btn secondary" data-jump-search="vection symétrique">Vection symétrique</button><button class="action-btn secondary" data-jump-search="schwannome préop">Schwannome préop</button></div></section></div>`;
    view.querySelectorAll('[data-go]').forEach(el => el.addEventListener('click', () => go(el.dataset.go)));
    view.querySelectorAll('[data-jump-search]').forEach(btn => btn.addEventListener('click', () => { searchQuery = btn.dataset.jumpSearch; current='search'; render(); }));
  }

  function renderPlans(){
    const plans = data.studyPlans || [];
    const selected = plans.find(p=>p.id===selectedPlan) || plans[0];
    const cards = plans.map(p => '<article class="card clickable '+(selected && p.id===selected.id?'selected':'')+'" data-id="'+esc(p.id)+'"><div class="badge-row">'+badge(p.level, tone(p.level))+'</div><h3>'+fmt(p.title)+'</h3><p>'+fmt(p.goal)+'</p></article>').join('');
    view.innerHTML = hero('Parcours de révision', 'Séquences guidées pour apprendre sans devoir cliquer toutes les combinaisons possibles.', ['20 min','45 min','Cas examen','Centralité','VPPB','DNS'])
      + '<div class="layout-main-side"><section class="panel"><h2>Choisir un parcours</h2><div class="grid auto">'+cards+'</div></section><aside class="detail-panel"><h2>'+fmt(selected.title)+'</h2>'+badge(selected.level, tone(selected.level))+'<p class="subtle">'+fmt(selected.goal)+'</p><h3>Étapes</h3>'+stepList(selected.steps)+'<h3>Auto-contrôle</h3>'+list(selected.checkpoints||[])+'</aside></div>';
    view.querySelectorAll('[data-id]').forEach(card => card.addEventListener('click', () => { selectedPlan = card.dataset.id; renderPlans(); }));
  }

  function renderLearn(){
    const cats = Array.from(new Set(data.concepts.map(c=>c.cat)));
    const selected = data.concepts.find(c=>c.id===selectedConcept) || data.concepts[0];
    const cards = cats.map(cat => `<details ${cat===selected.cat?'open':''}><summary>${fmt(cat)}</summary><div class="inside path-list">${data.concepts.filter(c=>c.cat===cat).map(c=>`<button class="select-btn ${c.id===selected.id?'active':''}" data-id="${c.id}" type="button">${fmt(c.title)}<br><span class="tiny">${fmt(c.summary)}</span></button>`).join('')}</div></details>`).join('');
    view.innerHTML = hero('Comprendre les mécanismes', 'Fiches atomiques pour créer les automatismes nécessaires aux cas cliniques.', ['Nystagmus','Latéralisation','PDN','Fixation/vection','Compensation'])
      + `<div class="layout-main-side"><section class="panel"><h2>Cartes de révision</h2>${cards}</section><aside class="detail-panel"><h2>${fmt(selected.title)}</h2>${badge(selected.cat)}<p class="subtle">${fmt(selected.summary)}</p><h3>À retenir</h3>${list(selected.essential)}<h3>Chaîne logique</h3>${stepList((selected.logic||[]).map((x,i)=>[String(i+1),x]))}<h3>Pièges</h3>${list(selected.pitfalls||[])}<div class="mode-only"><h3>Liens utiles</h3>${tags(selected.links||[])}</div></aside></div>`;
    view.querySelectorAll('.select-btn').forEach(btn => btn.addEventListener('click', () => { selectedConcept = btn.dataset.id; renderLearn(); }));
  }

  function allSearchItems(){
    const items = [];
    (data.studyPlans||[]).forEach(x => items.push({type:'Parcours', title:x.title, text:[x.goal,x.level,...x.steps.flat(),...(x.checkpoints||[])].join(' '), id:x.id, jump:'plans'}));
    data.concepts.forEach(x => items.push({type:'Notion', title:x.title, text:[x.summary,...x.essential,...x.logic,...x.pitfalls,...(x.links||[])].join(' '), id:x.id, jump:'learn'}));
    data.tests.forEach(x => items.push({type:'Test', title:x.name, text:[x.cat,x.purpose,x.procedure,x.normal,x.abnormal,x.trap,...(x.keywords||[])].join(' '), id:x.id, jump:'assessment'}));
    data.pathologies.forEach(x => items.push({type:'Pathologie', title:x.name, text:[x.family,x.time,x.presentation,x.keySigns,x.assessment,x.rehab,x.avoid].join(' '), id:x.id, jump:'pathologies'}));
    data.rehabObjectives.forEach(x => items.push({type:'Rééducation', title:x.name, text:[x.when,x.why,x.tools,x.progress,x.measure,x.pitfall].join(' '), id:x.id, jump:'rehab'}));
    data.reasoningMaps.forEach(x => items.push({type:'Raisonnement', title:x.title, text:[x.shortAnswer,...(x.tags||[]),...x.steps.flat(),...(x.pitfalls||[])].join(' '), id:x.id, jump:'reasoning'}));
    data.cases.forEach(x => items.push({type:'Cas', title:x.title, text:[x.presentation,x.shortAnswer,...x.questions,...x.correction.flat(),...(x.pitfalls||[]),...(x.review||[])].join(' '), id:x.id, jump:'cases'}));
    return items;
  }
  function renderSearch(){
    const q = strip(searchQuery.trim());
    let results = [];
    if(q.length){
      const words = q.split(/\s+/).filter(Boolean);
      results = allSearchItems().map(item => {
        const hay = strip(`${item.type} ${item.title} ${item.text}`);
        let score = words.reduce((acc,w)=> acc + (hay.includes(w)?1:0), 0);
        if(strip(item.title).includes(q)) score += 3;
        return {...item, score};
      }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score || a.title.localeCompare(b.title)).slice(0,25);
    }
    const examples = ['nystagmus droit', 'PDN droite', 'Fukuda gauche', 'vection symétrique', 'HIT normal aigu', 'schwannome préop', 'Ménière crise', 'oscillopsie obscurité', 'supermarché PPPD'];
    view.innerHTML = hero('Retrouver une information', 'Recherche par mots cliniques, pas par cases à cocher. Elle renvoie vers les notions, tests, pathologies, objectifs et cas liés.', ['Recherche transversale','Révision rapide'])
      + `<section class="search-box"><div class="search-row"><input id="searchInput" class="search-input" type="search" placeholder="Ex : PDN droite, Fukuda gauche, vection symétrique…" value="${esc(searchQuery)}" /><button class="action-btn" id="clearSearch" type="button">Effacer</button></div><div class="mini-map" style="margin-top:12px">${examples.map(e=>`<button class="tab" data-example="${esc(e)}" type="button">${fmt(e)}</button>`).join('')}</div></section>`
      + `<section class="panel"><h2>${q? `${results.length} résultat(s)` : 'Exemples de recherche'}</h2>${q ? `<div class="search-results">${results.map(r=>`<article class="result-card" data-type="${r.type}" data-id="${r.id}" data-jump="${r.jump}"><div class="badge-row">${badge(r.type)}</div><h3>${fmt(r.title)}</h3><p class="subtle">${fmt(r.text.slice(0,220))}${r.text.length>220?'…':''}</p></article>`).join('') || '<p class="subtle">Aucun résultat. Essaye un terme plus court : “HST”, “vection”, “nystagmus”, “Ménière”.</p>'}</div>` : `<p class="subtle">Tape une observation clinique ou une notion. Le but est de retrouver le raisonnement associé, pas de générer automatiquement un diagnostic.</p>`}</section>`;
    const input = document.getElementById('searchInput');
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    input.addEventListener('input', e => { searchQuery = e.target.value; renderSearch(); });
    document.getElementById('clearSearch').addEventListener('click', () => { searchQuery=''; renderSearch(); });
    view.querySelectorAll('[data-example]').forEach(btn => btn.addEventListener('click', () => { searchQuery = btn.dataset.example; renderSearch(); }));
    view.querySelectorAll('.result-card').forEach(card => card.addEventListener('click', () => {
      const jump = card.dataset.jump;
      const id = card.dataset.id;
      if(jump==='plans') selectedPlan = id;
      if(jump==='learn') selectedConcept = id;
      if(jump==='assessment') selectedTest = id;
      if(jump==='pathologies') selectedPathology = id;
      if(jump==='rehab') selectedRehab = id;
      if(jump==='reasoning') selectedReasoning = id;
      if(jump==='cases') selectedCase = id;
      current = jump;
      render();
      window.scrollTo({top:0, behavior:'smooth'});
    }));
  }

  function renderReasoning(){
    const selected = data.reasoningMaps.find(r=>r.id===selectedReasoning) || data.reasoningMaps[0];
    const buttons = data.reasoningMaps.map(r=>`<button class="select-btn ${r.id===selected.id?'active':''}" data-id="${r.id}" type="button">${fmt(r.title)}<br><span class="tiny">${fmt((r.tags||[]).join(' · '))}</span></button>`).join('');
    view.innerHTML = hero('Raisonnements types', 'Cartes d’examen : elles transforment les observations en interprétation puis en objectif.', ['Observation','Interprétation','Objectif'])
      + `<div class="layout-main-side"><section class="panel"><h2>Choisir un raisonnement</h2><div class="path-list">${buttons}</div></section><aside class="detail-panel"><h2>${fmt(selected.title)}</h2>${tags(selected.tags||[])}<div class="note ok"><strong>Réponse courte :</strong> ${fmt(selected.shortAnswer)}</div><h3>Grille logique</h3>${stepList(selected.steps)}<h3>Pièges</h3>${list(selected.pitfalls||[])}<div class="mode-only"><h3>Liens</h3>${tags(selected.linked||[])}</div></aside></div>`;
    view.querySelectorAll('.select-btn').forEach(btn => btn.addEventListener('click', () => { selectedReasoning = btn.dataset.id; renderReasoning(); }));
  }

  function renderAssessment(){
    const cats = Array.from(new Set(data.tests.map(t=>t.cat)));
    const selected = data.tests.find(t=>t.id===selectedTest) || data.tests[0];
    selectedTestCat = selected.cat;
    const flowRows = data.assessmentFlow.map(f => `<tr><td><strong>${fmt(f.id)} — ${fmt(f.title)}</strong></td><td>${fmt(f.goal)}</td><td>${fmt(f.look)}</td><td>${fmt(f.interpret)}</td></tr>`).join('');
    const tabHtml = cats.map(c=>`<button class="tab ${c===selectedTestCat?'active':''}" data-cat="${esc(c)}" type="button">${fmt(c)}</button>`).join('');
    const testRows = data.tests.filter(t=>t.cat===selectedTestCat).map(t=>`<tr class="clickable ${t.id===selected.id?'selected':''}" data-id="${t.id}"><td><strong>${fmt(t.name)}</strong></td><td>${fmt(t.purpose)}</td><td>${fmt(t.abnormal)}</td><td>${fmt(t.trap)}</td></tr>`).join('');
    view.innerHTML = hero('Bilan & tests', 'Plan de bilan et bibliothèque de tests. Le bilan est choisi par l’interrogatoire et l’examen clinique.', ['A→H','VNS','EVS','Fauteuil','Questionnaires'])
      + `<section class="panel"><h2>Plan de bilan neurosensoriel</h2><div class="table-wrap"><table><thead><tr><th>Étape</th><th>But</th><th>À rechercher</th><th>Interprétation</th></tr></thead><tbody>${flowRows}</tbody></table></div></section>`
      + `<div class="tabs">${tabHtml}</div><div class="layout-detail"><section class="panel"><h2>${fmt(selectedTestCat)}</h2><div class="table-wrap"><table><thead><tr><th>Test</th><th>But</th><th>Anormal / alerte</th><th>Piège</th></tr></thead><tbody>${testRows}</tbody></table></div></section><aside class="detail-panel"><h2>${fmt(selected.name)}</h2>${badge(selected.cat)}<dl><div><dt>But</dt><dd>${fmt(selected.purpose)}</dd></div><div><dt>Procédure</dt><dd>${fmt(selected.procedure)}</dd></div><div><dt>Normal</dt><dd>${fmt(selected.normal)}</dd></div><div><dt>Anormal</dt><dd>${fmt(selected.abnormal)}</dd></div><div><dt>Piège</dt><dd>${fmt(selected.trap)}</dd></div></dl>${tags(selected.keywords||[])}</aside></div>`;
    view.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => { const first = data.tests.find(t=>t.cat===btn.dataset.cat); selectedTest = first.id; renderAssessment(); }));
    view.querySelectorAll('tr.clickable').forEach(row => row.addEventListener('click', () => { selectedTest = row.dataset.id; renderAssessment(); }));
  }

  function renderPathologies(){
    const selected = data.pathologies.find(p=>p.id===selectedPathology) || data.pathologies[0];
    const rows = data.pathologies.map(p=>`<tr class="clickable ${p.id===selected.id?'selected':''}" data-id="${p.id}"><td><strong>${fmt(p.name)}</strong></td><td>${fmt(p.family)}</td><td>${fmt(p.time)}</td><td>${fmt(p.presentation)}</td><td>${fmt(p.rehab)}</td></tr>`).join('');
    view.innerHTML = hero('Pathologies', 'Comparateur orienté révision : présentation typique, signes clés, bilan, objectif et pièges.', ['Périphérique','Central','DNS','Positionnel'])
      + `<div class="layout-detail"><section class="panel"><h2>Comparateur</h2><div class="table-wrap"><table><thead><tr><th>Pathologie</th><th>Famille</th><th>Temporalité</th><th>Présentation</th><th>Priorité</th></tr></thead><tbody>${rows}</tbody></table></div></section><aside class="detail-panel"><h2>${fmt(selected.name)}</h2>${badge(selected.family, tone(selected.family))}<dl><div><dt>Temporalité</dt><dd>${fmt(selected.time)}</dd></div><div><dt>Présentation type</dt><dd>${fmt(selected.presentation)}</dd></div><div><dt>Signes clés</dt><dd>${fmt(selected.keySigns)}</dd></div><div><dt>Bilan utile</dt><dd>${fmt(selected.assessment)}</dd></div><div><dt>Rééducation</dt><dd>${fmt(selected.rehab)}</dd></div><div><dt>À éviter</dt><dd>${fmt(selected.avoid)}</dd></div></dl></aside></div>`;
    view.querySelectorAll('tr.clickable').forEach(row => row.addEventListener('click', () => { selectedPathology = row.dataset.id; renderPathologies(); }));
  }

  function renderRehab(){
    const selected = data.rehabObjectives.find(r=>r.id===selectedRehab) || data.rehabObjectives[0];
    const buttons = data.rehabObjectives.map(r=>`<button class="select-btn ${r.id===selected.id?'active':''}" data-id="${r.id}" type="button">${fmt(r.name)}<br><span class="tiny">${fmt(r.when)}</span></button>`).join('');
    view.innerHTML = hero('Rééducation', 'Organisée par objectif thérapeutique, car c’est ce que demandent souvent les cas cliniques.', ['Compenser','Symétriser','Substituer','Habituer','Sécuriser'])
      + `<div class="layout-main-side"><section class="panel"><h2>Objectifs</h2><div class="path-list">${buttons}</div></section><aside class="detail-panel"><h2>${fmt(selected.name)}</h2><dl><div><dt>Quand ?</dt><dd>${fmt(selected.when)}</dd></div><div><dt>Pourquoi ?</dt><dd>${fmt(selected.why)}</dd></div><div><dt>Avec quoi ?</dt><dd>${fmt(selected.tools)}</dd></div><div><dt>Progression</dt><dd>${fmt(selected.progress)}</dd></div><div><dt>Mesure</dt><dd>${fmt(selected.measure)}</dd></div><div><dt>Piège</dt><dd>${fmt(selected.pitfall)}</dd></div></dl></aside></div>`;
    view.querySelectorAll('.select-btn').forEach(btn => btn.addEventListener('click', () => { selectedRehab = btn.dataset.id; renderRehab(); }));
  }

  function renderCases(){
    const selected = data.cases.find(c=>c.id===selectedCase) || data.cases[0];
    const buttons = data.cases.map(c=>`<button class="select-btn ${c.id===selected.id?'active':''}" data-id="${c.id}" type="button">${fmt(c.title)}<br><span class="tiny">${fmt(c.level)}</span></button>`).join('');
    view.innerHTML = hero('Cas cliniques', 'Mode examen : question ouverte, réponse courte, grille de correction, pièges et notions à revoir.', ['Réponse courte','Arguments','Objectif','Pièges'])
      + `<div class="layout-main-side"><section class="panel"><h2>Cas disponibles</h2><div class="path-list">${buttons}</div></section><aside class="detail-panel"><h2>${fmt(selected.title)}</h2>${badge(selected.level, tone(selected.level))}<p class="subtle">${fmt(selected.presentation)}</p><h3>Questions</h3>${list(selected.questions)}<div class="button-row"><button class="action-btn" id="revealCase" type="button">Afficher la correction</button></div><div id="caseAnswer" class="answer-hidden"><div class="note ok"><strong>Réponse courte :</strong> ${fmt(selected.shortAnswer)}</div><h3>Grille de correction</h3>${stepList(selected.correction)}<h3>Pièges</h3>${list(selected.pitfalls)}<h3>À revoir</h3>${tags(selected.review)}</div></aside></div>`;
    view.querySelectorAll('.select-btn').forEach(btn => btn.addEventListener('click', () => { selectedCase = btn.dataset.id; renderCases(); }));
    document.getElementById('revealCase').addEventListener('click', () => {
      document.getElementById('caseAnswer').classList.toggle('open');
      document.getElementById('revealCase').textContent = document.getElementById('caseAnswer').classList.contains('open') ? 'Masquer la correction' : 'Afficher la correction';
    });
  }

  function renderQuiz(){
    view.innerHTML = hero('Quiz flash', 'Cartes rapides pour mémoriser les automatismes. Clique sur une carte pour afficher la réponse.', ['Automatismes','Révision active'])
      + `<div class="grid auto">${data.flashcards.map((f,i)=>`<article class="card flashcard" data-flash="${i}"><div><div class="badge-row">${badge('Question')}</div><h3>${fmt(f.q)}</h3></div><div class="flash-answer"><strong>Réponse :</strong> ${fmt(f.a)}</div><div class="button-row"><button class="action-btn secondary" type="button">Afficher</button></div></article>`).join('')}</div>`;
    view.querySelectorAll('.flashcard').forEach(card => card.addEventListener('click', () => { card.classList.toggle('revealed'); card.querySelector('button').textContent = card.classList.contains('revealed') ? 'Masquer' : 'Afficher'; }));
  }

  function renderGlossary(){
    glossaryPanel.innerHTML = `<button class="close" type="button" aria-label="Fermer">×</button><h2>Acronymes</h2><p class="subtle">Définitions courtes. Les acronymes sont aussi soulignés dans les pages.</p><div class="glossary-list">${Object.entries(acronyms).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`<div class="glossary-item"><strong>${esc(k)}</strong><br><span>${esc(v)}</span></div>`).join('')}</div>`;
    glossaryPanel.querySelector('.close').addEventListener('click', closeGlossary);
  }
  function openGlossary(){ renderGlossary(); glossaryPanel.classList.add('open'); glossaryPanel.setAttribute('aria-hidden','false'); overlay.hidden = false; }
  function closeGlossary(){ glossaryPanel.classList.remove('open'); glossaryPanel.setAttribute('aria-hidden','true'); overlay.hidden = true; }

  function render(){
    renderNav();
    if(current==='home') renderHome();
    if(current==='plans') renderPlans();
    if(current==='learn') renderLearn();
    if(current==='search') renderSearch();
    if(current==='reasoning') renderReasoning();
    if(current==='assessment') renderAssessment();
    if(current==='pathologies') renderPathologies();
    if(current==='rehab') renderRehab();
    if(current==='cases') renderCases();
    if(current==='quiz') renderQuiz();
  }

  glossaryBtn.addEventListener('click', openGlossary);
  overlay.addEventListener('click', closeGlossary);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeGlossary(); });
  deepBtn.addEventListener('click', () => {
    deep = !deep;
    document.body.classList.toggle('deep', deep);
    deepBtn.classList.toggle('on', deep);
    deepBtn.setAttribute('aria-pressed', deep ? 'true' : 'false');
    deepBtn.textContent = deep ? 'Mode essentiel' : 'Mode approfondi';
  });

  render();
})();
