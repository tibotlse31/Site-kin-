(function(){
  const data = window.VESTIB_DATA;
  const view = document.getElementById('view');
  const nav = document.getElementById('mainNav');
  let current = 'demarche';

  const esc = (s='') => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const slug = s => String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
  const badge = (txt, cls='') => `<span class="badge ${cls}">${esc(txt)}</span>`;
  const list = items => `<ul class="clean">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
  const checkList = items => `<ul class="check-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;

  function renderNav(){
    nav.innerHTML = data.nav.map(item => `<button class="nav-btn ${item.id===current?'active':''}" data-target="${item.id}">${item.icon} ${item.label}</button>`).join('');
    nav.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => { current = btn.dataset.target; render(); window.scrollTo({top:0,behavior:'smooth'}); }));
  }

  function hero(title, text){ return `<section class="hero"><h1>${title}</h1><p>${text}</p></section>`; }

  function renderDemarche(){
    const systematic = data.systematic.map(g => `<div class="card"><h3>${esc(g.title)}</h3>${list(g.items)}</div>`).join('');
    const core = `<div class="flow">${data.demarcheCore.map(s => `<div class="flow-step"><div><strong>${esc(s.title)}</strong><br><span>${esc(s.text)}</span></div></div>`).join('')}</div>`;
    const algorithms = data.algorithms.map((a,idx) => `<details ${idx===0?'open':''}><summary>${esc(a.title)} ${badge(a.color==='danger'?'prioritaire':a.color==='warn'?'prudence':a.color==='success'?'DNS':'raisonnement', a.color==='danger'?'danger':a.color==='warn'?'warn':a.color==='success'?'success':'')}</summary><div class="content"><div class="flow">${a.steps.map(st => `<div class="flow-step"><div><strong>${esc(st[0])}</strong><br><span>${esc(st[1])}</span></div></div>`).join('')}</div></div></details>`).join('');
    view.innerHTML = hero(data.demarcheIntro.title, data.demarcheIntro.text) +
      `<section class="panel"><h2>Carte générale</h2>${core}</section>` +
      `<h2 class="section-title">Ce qui est souvent utile vs contextuel</h2><div class="grid three">${systematic}</div>` +
      `<h2 class="section-title">Algorithmes par situation</h2><div class="accordion">${algorithms}</div>`;
  }

  function renderBases(){
    view.innerHTML = hero('Bases générales / physiologie', 'Fiches courtes pour comprendre les notions qui reviennent dans les tests, les pathologies et la rééducation.') +
      `<div class="grid">${data.bases.map(b => `<article class="card"><h3>${esc(b.title)}</h3><p><strong>${esc(b.key)}</strong></p><p>${esc(b.detail)}</p></article>`).join('')}</div>`;
  }

  function renderTests(){
    const options = data.testCategories.map(c => `<option value="${esc(c)}">${esc(c)}</option>`).join('');
    view.innerHTML = hero('Tests et protocoles', 'Recherche rapide. HINTS est visible comme protocole complet, et ses trois composants sont aussi indiqués dans les fiches HIT, nystagmus spontané et skew.') +
      `<div class="search-row"><input id="testSearch" placeholder="Rechercher : HINTS, HIT, index, Fukuda, nystagmus…"><select id="testFilter">${options}</select></div><div class="grid two" id="testGrid"></div>`;
    const search = document.getElementById('testSearch');
    const filter = document.getElementById('testFilter');
    const grid = document.getElementById('testGrid');
    function draw(){
      const q = search.value.trim().toLowerCase();
      const f = filter.value;
      const items = data.tests.filter(t => (f==='Tous' || t.cat===f || t.tags.includes(f)) && (!q || [t.title,t.short,t.cat,...t.tags].join(' ').toLowerCase().includes(q)));
      grid.innerHTML = items.map(t => {
        const tagHtml = t.tags.map(tag => badge(tag, tag==='HINTS'?'purple':tag.includes('Central')?'danger':tag==='EVS'?'success':'')).join('');
        const inter = t.interpretation ? `<h4>Interprétation HINTS</h4><div class="interp-grid">${t.interpretation.map(x=>`<div class="interp-box"><strong>${esc(x[0])}</strong><p>${esc(x[1])}</p></div>`).join('')}</div>` : '';
        return `<article class="card test-card" data-id="${t.id}"><div class="split"><h3>${esc(t.title)}</h3></div><p>${esc(t.short)}</p><div class="badge-row">${badge(t.cat)}${tagHtml}</div><div class="drawer" id="drawer-${t.id}"><h4>Indication</h4><p>${esc(t.indication)}</p><h4>Procédure</h4><p>${esc(t.procedure)}</p><h4>Normal / attendu</h4><p>${esc(t.normal)}</p><h4>Anormal / alerte</h4><p>${esc(t.abnormal)}</p>${inter}<h4>Piège</h4><p>${esc(t.traps)}</p></div></article>`;
      }).join('') || `<div class="panel"><p>Aucun test trouvé.</p></div>`;
      grid.querySelectorAll('.test-card').forEach(card => card.addEventListener('click', e => {
        const d = card.querySelector('.drawer');
        d.classList.toggle('visible');
      }));
    }
    search.addEventListener('input', draw); filter.addEventListener('change', draw); draw();
  }

  function renderPathologies(){
    const table = `<div class="table-wrap"><table class="kv-table"><thead><tr><th>Pathologie / famille</th><th>Temporalité</th><th>Signes clés</th><th>Tests utiles</th><th>Axe / prudence</th></tr></thead><tbody>${data.pathologies.map(p => `<tr><td>${esc(p.name)}<div class="badge-row">${badge(p.family, p.color==='danger'?'danger':p.color==='warn'?'warn':p.color==='success'?'success':p.color==='purple'?'purple':'')}</div></td><td>${esc(p.temporalite)}</td><td>${esc(p.signes)}</td><td>${esc(p.tests)}</td><td>${esc(p.prise)}</td></tr>`).join('')}</tbody></table></div>`;
    const cards = data.pathologies.map(p => `<article class="card path-card compare-card"><h3>${esc(p.name)}</h3><div class="badge-row">${badge(p.family, p.color==='danger'?'danger':p.color==='warn'?'warn':p.color==='success'?'success':p.color==='purple'?'purple':'')}</div><p><strong>Profil :</strong> ${esc(p.temporalite)}</p><p><strong>Différenciation :</strong> ${esc(p.signes)}</p></article>`).join('');
    view.innerHTML = hero('Pathologies — comparateur', 'Tableau comparatif pour différencier rapidement les grands profils, puis cartes visuelles pour mémoriser.') + table + `<h2 class="section-title">Cartes de mémorisation</h2><div class="grid">${cards}</div>`;
  }

  function renderReeducation(){
    view.innerHTML = hero('Rééducation — techniques et objectifs', 'Classé par technique avec indication, progression et pièges. Les axes restent prudents et doivent être adaptés au bilan.') +
      `<div class="grid two">${data.reeducation.map(r => `<article class="card"><h3>${esc(r.title)}</h3><p><strong>Quand :</strong> ${esc(r.when)}</p><h4>Comment</h4>${list(r.how)}<div class="note warn"><strong>À éviter :</strong> ${esc(r.avoid)}</div></article>`).join('')}</div>`;
  }

  function renderCas(){
    view.innerHTML = hero('Cas cliniques d’entraînement', 'Cas inspirés des cours et cas “pour aller plus loin”. Clique sur une question pour afficher la correction.') +
      `<div class="grid two">${data.cases.map((c,ci) => `<article class="card case-card"><div>${c.source==='plus'?'<span class="info-pill">💡 Pour aller plus loin — cas d’entraînement ajouté</span>':c.source==='entrainement'?'<span class="info-pill">💡 Cas d’entraînement construit à partir du cours</span>':'<span class="info-pill">📘 Inspiré directement des notions du cours</span>'}<h3>${esc(c.title)}</h3><p>${esc(c.presentation)}</p></div>${c.questions.map((q,qi)=>`<div class="panel" style="box-shadow:none;margin:0;padding:14px"><strong>${esc(q[0])}</strong><div class="btn-row">${q[1].map((opt,oi)=>`<button class="btn case-choice" data-ci="${ci}" data-qi="${qi}" data-oi="${oi}">${esc(opt)}</button>`).join('')}</div><div class="case-answer" id="ans-${ci}-${qi}"></div></div>`).join('')}<div class="note success"><strong>À retenir :</strong> ${esc(c.takeaway)}</div></article>`).join('')}</div>`;
    document.querySelectorAll('.case-choice').forEach(btn => btn.addEventListener('click', () => {
      const ci=+btn.dataset.ci, qi=+btn.dataset.qi, oi=+btn.dataset.oi;
      const q = data.cases[ci].questions[qi];
      const ans = document.getElementById(`ans-${ci}-${qi}`);
      const ok = oi === q[2];
      ans.innerHTML = `<strong>${ok?'✅ Correct':'❌ À revoir'}</strong><p>${esc(q[3])}</p>`;
      ans.classList.add('visible');
    }));
  }

  function renderChecklists(){
    view.innerHTML = hero('Checklists rapides', 'Listes courtes par situation. Elles servent à ne rien oublier, sans remplacer la démarche clinique.') +
      `<div class="checklist-grid">${data.checklists.map(c => `<article class="check-card"><h3>${esc(c.title)}</h3><div class="goal">${esc(c.goal)}</div>${checkList(c.items)}</article>`).join('')}</div>`;
  }

  function render(){
    renderNav();
    if(current==='demarche') renderDemarche();
    if(current==='bases') renderBases();
    if(current==='tests') renderTests();
    if(current==='pathologies') renderPathologies();
    if(current==='reeducation') renderReeducation();
    if(current==='cas') renderCas();
    if(current==='checklists') renderChecklists();
  }

  render();
})();
