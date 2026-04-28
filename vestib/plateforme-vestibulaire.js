(function(){
  const data = window.VESTIB_DATA;
  const view = document.getElementById('view');
  const nav = document.getElementById('mainNav');
  const globalSearch = document.getElementById('globalSearch');
  const clearSearch = document.getElementById('clearSearch');
  let current = 'demarche';

  const esc = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const badgeClass = c => c==='danger'?'danger':c==='warn'?'warn':c==='success'?'success':c==='purple'?'purple':'';
  const badge = (txt, cls='') => `<span class="badge ${badgeClass(cls)}">${esc(txt)}</span>`;
  const list = items => `<ul class="clean">${(items||[]).map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
  const checklist = items => `<ul class="check-list">${(items||[]).map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
  const hero = (title,text,meta=[]) => `<section class="hero"><h1>${esc(title)}</h1><p>${esc(text)}</p>${meta.length?`<div class="meta">${meta.map(x=>badge(x[0],x[1])).join('')}</div>`:''}</section>`;
  const colorLabel = c => c==='danger'?'sécurité':c==='warn'?'prudence':c==='success'?'DNS':c==='purple'?'fonctionnel':'raisonnement';
  const joinText = obj => JSON.stringify(obj).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
  const norm = s => String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

  function renderNav(){
    nav.innerHTML = data.nav.map(item => `<button class="nav-btn ${item.id===current?'active':''}" data-target="${item.id}" type="button">${item.icon} ${esc(item.label)}</button>`).join('');
    nav.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
      current = btn.dataset.target;
      globalSearch.value = '';
      render();
      window.scrollTo({top:0,behavior:'smooth'});
    }));
  }

  function flow(steps){
    return `<div class="flow">${steps.map(s => `<div class="flow-step"><div><strong>${esc(s.title || s[0])}</strong><br><span>${esc(s.text || s[1])}</span></div></div>`).join('')}</div>`;
  }

  function renderDemarche(){
    const safety = `<section class="panel"><h2>${esc(data.safety.title)}</h2><p class="lead">${esc(data.safety.text)}</p><div class="note danger">${checklist(data.safety.items)}</div></section>`;
    const core = `<section class="panel"><h2>Carte générale du raisonnement</h2>${flow(data.demarcheCore)}</section>`;
    const routes = data.routes.map((r,i)=>`<details ${i===0?'open':''}><summary>${esc(r.title)} ${badge(colorLabel(r.color),r.color)}</summary><div class="content"><p class="lead"><strong>Objectif :</strong> ${esc(r.goal)}</p>${flow(r.steps)}</div></details>`).join('');
    const syst = data.systematic.map(g=>`<article class="card"><h3>${esc(g.title)}</h3>${list(g.items)}</article>`).join('');
    view.innerHTML = hero('Démarche clinique', 'Partir du patient, pas du test : sécuriser, interroger, choisir, interpréter, traiter, puis objectiver.') + safety + core + `<h2 class="section-title">Parcours par tableau clinique</h2><div class="accordion">${routes}</div>` + `<h2 class="section-title">Utilisation raisonnée des tests</h2><div class="grid">${syst}</div>`;
  }

  function renderBilan(){
    const stages = data.bilanStages.map(s=>`<article class="card"><h3>${esc(s.title)}</h3>${list(s.items)}</article>`).join('');
    const blocks = data.bilanBlocks.map(b=>`<details><summary>${esc(b.title)} ${badge(b.tag)}</summary><div class="content">${list(b.items)}</div></details>`).join('');
    view.innerHTML = hero('Bilan thérapeutique', 'Le bilan sert à analyser, quantifier, trier la centralité, formuler l’hypothèse kinésithérapique, orienter le traitement et objectiver les résultats.', [['fidèle cours','success'],['pré / per / post','']]) + `<div class="grid">${stages}</div><h2 class="section-title">Blocs du bilan neurosensoriel vestibulaire</h2><div class="accordion">${blocks}</div>`;
  }

  function renderBases(){
    view.innerHTML = hero('Bases générales / physiologie', 'Fiches courtes pour comprendre les notions qui reviennent dans les tests, pathologies et techniques.') + `<div class="grid">${data.bases.map(b=>`<article class="card"><h3>${esc(b.title)}</h3><p><strong>${esc(b.key)}</strong></p><p>${esc(b.detail)}</p></article>`).join('')}</div>`;
  }

  function testCard(t){
    return `<article class="card"><div class="card-head"><div><h3>${esc(t.title)}</h3><p>${esc(t.short)}</p><div class="badge-row">${badge(t.cat)}${(t.tags||[]).map(x=>badge(x, x.includes('Central')?'danger':x==='HINTS'?'purple':x==='VPPB'?'warn':'')).join('')}</div></div><button class="card-toggle" type="button" aria-expanded="false">Ouvrir</button></div><div class="drawer"><h4>Indication</h4><p>${esc(t.indication)}</p><h4>Procédure</h4><p>${esc(t.procedure)}</p><h4>Normal / attendu</h4><p>${esc(t.normal)}</p><h4>Anormal / alerte</h4><p>${esc(t.abnormal)}</p><h4>Piège</h4><p>${esc(t.traps)}</p>${t.source?`<div class="note info"><strong>Repère :</strong> ${esc(t.source)}</div>`:''}</div></article>`;
  }

  function activateToggles(scope=document){
    scope.querySelectorAll('.card-toggle').forEach(btn => btn.addEventListener('click', () => {
      const drawer = btn.closest('.card').querySelector('.drawer');
      const visible = drawer.classList.toggle('visible');
      btn.classList.toggle('active', visible);
      btn.setAttribute('aria-expanded', visible?'true':'false');
      btn.textContent = visible ? 'Fermer' : 'Ouvrir';
    }));
  }

  function renderTests(){
    const options = data.testCategories.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');
    view.innerHTML = hero('Tests et protocoles', 'Chaque fiche répond à la même logique pédagogique : indication, procédure, normal, anormal, piège.') + `<div class="search-row"><input id="testSearch" type="search" placeholder="Rechercher : HINTS, HIT, VPPB, Fukuda, nystagmus…"><select id="testFilter">${options}</select></div><div class="grid two" id="testGrid"></div>`;
    const qInput = document.getElementById('testSearch');
    const filt = document.getElementById('testFilter');
    const grid = document.getElementById('testGrid');
    function draw(){
      const q = norm(qInput.value);
      const f = filt.value;
      const items = data.tests.filter(t => (f==='Tous'||t.cat===f||(t.tags||[]).includes(f)) && (!q || norm([t.title,t.short,t.indication,t.cat,...(t.tags||[])].join(' ')).includes(q)));
      grid.innerHTML = items.length ? items.map(testCard).join('') : `<div class="panel empty">Aucun test trouvé.</div>`;
      activateToggles(grid);
    }
    qInput.addEventListener('input', draw); filt.addEventListener('change', draw); draw();
  }

  function renderPathologies(){
    const rows = data.pathologies.map(p=>`<tr><td>${esc(p.name)}<div class="badge-row">${badge(p.family,p.color)}</div></td><td>${esc(p.temporalite)}</td><td>${esc(p.signes)}</td><td>${esc(p.tests)}</td><td>${esc(p.prise)}</td></tr>`).join('');
    const cards = data.pathologies.map(p=>`<article class="card compare-card ${badgeClass(p.color)}"><h3>${esc(p.name)}</h3><div class="badge-row">${badge(p.family,p.color)}</div><p><strong>Profil :</strong> ${esc(p.temporalite)}</p><p><strong>Signes :</strong> ${esc(p.signes)}</p><p><strong>Conduite :</strong> ${esc(p.prise)}</p></article>`).join('');
    view.innerHTML = hero('Pathologies — comparateur', 'Comparer sans surdiagnostiquer : temporalité, signes, tests utiles et axe de prise en charge.') + `<div class="table-wrap"><table class="kv-table"><thead><tr><th>Pathologie</th><th>Temporalité</th><th>Signes clés</th><th>Tests utiles</th><th>Axe / prudence</th></tr></thead><tbody>${rows}</tbody></table></div><h2 class="section-title">Cartes rapides</h2><div class="grid">${cards}</div>`;
  }

  function renderReeducation(){
    const principles = data.rehabPrinciples.map(p=>`<article class="card"><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`).join('');
    const techs = data.reeducation.map(r=>`<article class="card"><div class="card-head"><div><h3>${esc(r.title)}</h3><p><strong>Quand :</strong> ${esc(r.when)}</p></div><button class="card-toggle" type="button" aria-expanded="false">Ouvrir</button></div><div class="drawer"><h4>Objectif</h4><p>${esc(r.goal)}</p><h4>Comment</h4>${list(r.how)}<h4>Progression</h4><p>${esc(r.progress)}</p><div class="note warn"><strong>À éviter :</strong> ${esc(r.avoid)}</div></div></article>`).join('');
    const criteria = `<section class="panel"><h2>Critères d’une rééducation bien conduite</h2>${checklist(data.criteria)}</section>`;
    view.innerHTML = hero('Rééducation — techniques et dosage', 'La technique n’est jamais première : elle dépend du bilan, de l’objectif, de la tolérance et du suivi objectivé.') + `<h2 class="section-title">Principes transversaux</h2><div class="grid">${principles}</div><h2 class="section-title">Techniques</h2><div class="grid two">${techs}</div>${criteria}`;
    activateToggles(view);
  }

  function renderCas(){
    const cards = data.cases.map((c,ci)=>`<article class="card"><h3>${esc(c.title)}</h3><div class="badge-row">${badge(c.badge, c.badge==='Piège'?'warn':c.badge==='Suivi'?'success':'')}</div><p>${esc(c.presentation)}</p>${c.questions.map((q,qi)=>`<div class="panel" style="box-shadow:none;margin:12px 0 0;padding:14px"><strong>${esc(q[0])}</strong><div class="btn-row">${q[1].map((opt,oi)=>`<button class="btn case-choice" type="button" data-ci="${ci}" data-qi="${qi}" data-oi="${oi}">${esc(opt)}</button>`).join('')}</div><div class="answer" id="ans-${ci}-${qi}"></div></div>`).join('')}<div class="note success"><strong>À retenir :</strong> ${esc(c.takeaway)}</div></article>`).join('');
    view.innerHTML = hero('Cas cliniques d’entraînement', 'Cas courts pour entraîner la décision : quelle hypothèse, quel test, quelle prudence, quel traitement ?') + `<div class="grid two">${cards}</div>`;
    document.querySelectorAll('.case-choice').forEach(btn => btn.addEventListener('click', () => {
      const ci=+btn.dataset.ci, qi=+btn.dataset.qi, oi=+btn.dataset.oi;
      const q = data.cases[ci].questions[qi];
      const ok = oi === q[2];
      const ans = document.getElementById(`ans-${ci}-${qi}`);
      ans.innerHTML = `<strong>${ok?'✅ Correct':'❌ À revoir'}</strong><p>${esc(q[3])}</p>`;
      ans.className = `answer visible ${ok?'success':'warn'}`;
      btn.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
    }));
  }

  function renderChecklists(){
    view.innerHTML = hero('Checklists rapides', 'Listes courtes pour ne rien oublier. Elles guident la séance sans remplacer le raisonnement clinique.') + `<div class="btn-row"><button class="btn" type="button" onclick="window.print()">Imprimer / PDF</button></div><div class="checklist-grid">${data.checklists.map(c=>`<article class="check-card"><h3>${esc(c.title)}</h3><div class="goal">${esc(c.goal)}</div>${checklist(c.items)}</article>`).join('')}</div>`;
  }

  function searchIndex(){
    const items = [];
    data.nav.forEach(n=>items.push({section:n.id,title:n.label,text:n.label,type:'Section'}));
    data.bilanBlocks.forEach(x=>items.push({section:'bilan',title:x.title,text:[x.tag,...x.items].join(' '),type:'Bilan'}));
    data.bases.forEach(x=>items.push({section:'bases',title:x.title,text:x.key+' '+x.detail,type:'Base'}));
    data.tests.forEach(x=>items.push({section:'tests',title:x.title,text:[x.cat,x.short,x.indication,x.procedure,x.normal,x.abnormal,x.traps,...(x.tags||[])].join(' '),type:'Test'}));
    data.pathologies.forEach(x=>items.push({section:'pathologies',title:x.name,text:[x.family,x.temporalite,x.signes,x.tests,x.prise].join(' '),type:'Pathologie'}));
    data.reeducation.forEach(x=>items.push({section:'reeducation',title:x.title,text:[x.when,x.goal,x.progress,x.avoid,...x.how].join(' '),type:'Rééducation'}));
    data.cases.forEach(x=>items.push({section:'cas',title:x.title,text:x.presentation+' '+x.takeaway,type:'Cas'}));
    data.checklists.forEach(x=>items.push({section:'checklists',title:x.title,text:x.goal+' '+x.items.join(' '),type:'Checklist'}));
    return items;
  }

  function renderSearch(){
    const q = norm(globalSearch.value.trim());
    if(!q){ render(); return; }
    const results = searchIndex().filter(x=>norm(x.title+' '+x.text).includes(q)).slice(0,60);
    renderNav();
    view.innerHTML = hero('Recherche globale', `${results.length} résultat(s) pour « ${globalSearch.value.trim()} »`) + (results.length ? `<div class="grid two">${results.map(r=>`<button class="card result-card" type="button" data-section="${r.section}"><div class="badge-row">${badge(r.type)}</div><h3>${esc(r.title)}</h3><p>${esc(r.text).slice(0,260)}${r.text.length>260?'…':''}</p></button>`).join('')}</div>` : `<div class="panel empty">Aucun résultat.</div>`);
    document.querySelectorAll('.result-card').forEach(card=>card.addEventListener('click',()=>{ current = card.dataset.section; globalSearch.value=''; render(); window.scrollTo({top:0,behavior:'smooth'}); }));
  }

  function render(){
    renderNav();
    if(current==='demarche') renderDemarche();
    if(current==='bilan') renderBilan();
    if(current==='bases') renderBases();
    if(current==='tests') renderTests();
    if(current==='pathologies') renderPathologies();
    if(current==='reeducation') renderReeducation();
    if(current==='cas') renderCas();
    if(current==='checklists') renderChecklists();
  }

  globalSearch.addEventListener('input', renderSearch);
  clearSearch.addEventListener('click', () => { globalSearch.value=''; render(); globalSearch.focus(); });
  render();
})();
