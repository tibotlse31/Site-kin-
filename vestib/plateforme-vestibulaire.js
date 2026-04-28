(function(){
  const D = window.VESTIB_DATA;
  const state = { view:'accueil', filter:'Tous', checklist:'securite', search:'' };
  const $ = (id) => document.getElementById(id);

  function esc(s){ return String(s ?? '').replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
  function list(items){ return `<ul>${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`; }
  function badge(text, color='blue'){ return `<span class="badge ${color}">${esc(text)}</span>`; }
  function contains(obj, q){ return !q || JSON.stringify(obj).toLowerCase().includes(q.toLowerCase()); }

  function renderNav(){
    $('mainNav').innerHTML = D.nav.map(n => `<button class="nav-btn ${state.view===n.id?'active':''}" data-view="${n.id}">${n.icon} ${n.label}</button>`).join('');
    document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => setView(btn.dataset.view)));
  }
  function setView(view){ state.view = view; state.filter='Tous'; render(); window.scrollTo({top:0,behavior:'smooth'}); }

  function panel(title, intro, body){
    return `<section class="panel"><div class="panel-head"><div><h2>${title}</h2>${intro?`<p>${intro}</p>`:''}</div></div>${body}</section>`;
  }

  function renderAccueil(){
    return panel('Accès rapide', 'Choisis directement ce que tu veux consulter. Pas de parcours obligatoire : chaque rubrique sert à retrouver l’information rapidement.', `
      <div class="grid-3">
        ${D.homeCards.map(c => `
          <button class="card quick-card" data-open="${c.target}">
            <div class="icon">${c.icon}</div>
            <h3>${esc(c.title)}</h3>
            <p>${esc(c.text)}</p>
            <span class="badge blue">Ouvrir →</span>
          </button>`).join('')}
      </div>
      <div class="note info" style="margin-top:16px"><strong>Logique de l’outil :</strong> les contenus sont séparés par usage : comparer, vérifier, apprendre un test, suivre un algorithme ou s’entraîner sur un cas.</div>
    `);
  }

  function renderDemarche(){
    const cards = D.demarche.filter(x=>contains(x,state.search)).map(x=>`
      <article class="note ${x.type}">
        <div class="badge-row">${badge(x.badge, x.type==='danger'?'red':x.type==='warn'?'orange':x.type==='success'?'green':'blue')}</div>
        <h3 style="margin:10px 0 6px;color:#0f3e77">${esc(x.title)}</h3>
        <p style="margin:0">${esc(x.text)}</p>
      </article>`).join('');
    return panel('Démarche clinique', 'Une synthèse fixe pour comprendre l’ordre de raisonnement, sans formulaire interactif ni combinaisons incohérentes.', `<div class="stack">${cards}</div>`);
  }

  function renderTests(){
    const cats = ['Tous', ...Array.from(new Set(D.tests.map(t=>t.cat)))];
    const q = state.search;
    const tests = D.tests.filter(t => (state.filter==='Tous' || t.cat===state.filter) && contains(t,q));
    return panel('Tests', 'Fiches pratiques. HINTS est séparé du HIT : HINTS = protocole contextuel de syndrome vestibulaire aigu ; HIT = test individuel du RVO.', `
      <div class="filters">${cats.map(c=>`<button class="filter-btn ${state.filter===c?'active':''}" data-filter="${esc(c)}">${esc(c)}</button>`).join('')}</div>
      ${tests.length ? `<div class="test-list">${tests.map(t=>`
        <details class="card test-card" ${t.id==='hints'?'open':''}>
          <summary class="test-summary">
            <div class="test-title-row"><h3>${esc(t.title)}</h3>${badge(t.cat, t.cat==='Protocole'?'purple':'blue')}</div>
            <p>${esc(t.short)}</p>
            <div class="badge-row">${t.tags.map(tag=>badge(tag, tag.includes('Central')?'red':tag.includes('HINTS')?'purple':'blue')).join('')}</div>
          </summary>
          <div class="test-body">
            <div class="kv-grid">
              <div class="kv"><strong>Indication</strong>${esc(t.indication)}</div>
              <div class="kv"><strong>Procédure</strong>${esc(t.procedure)}</div>
              <div class="kv"><strong>Normal / attendu</strong>${esc(t.normal)}</div>
              <div class="kv"><strong>Pathologique / alerte</strong>${esc(t.abnormal)}</div>
            </div>
            <div class="note warn"><strong>Piège :</strong> ${esc(t.traps)}</div>
          </div>
        </details>`).join('')}</div>` : `<div class="empty">Aucun test trouvé.</div>`}
    `);
  }

  function renderPathologies(){
    const rows = D.pathologies.filter(row => contains(row,state.search));
    return panel('Pathologies — comparaison', 'Format tableau pour comparer rapidement temporalité, signes, tests et conduite. Les formulations restent prudentes : orientation, compatibilité, hypothèse.', `
      <div class="compare-wrap"><table class="compare-table">
        <thead><tr>${D.pathologyColumns.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r=>`<tr>${r.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
    `);
  }

  function renderReeducation(){
    const items = D.rehab.filter(x=>contains(x,state.search));
    return panel('Rééducation — par objectif', 'Entrée par objectif thérapeutique plutôt que par longue liste d’outils.', `
      <div class="rehab-grid">${items.map(r=>`
        <article class="card">
          <h3>${esc(r.title)}</h3>
          <p><strong>Quand :</strong> ${esc(r.when)}</p>
          <div><strong>Comment :</strong>${list(r.how)}</div>
          <div class="note warn"><strong>À éviter :</strong> ${esc(r.avoid)}</div>
        </article>`).join('')}</div>
    `);
  }

  function renderAlgorithmes(){
    const items = D.algorithms.filter(a=>contains(a,state.search));
    return panel('Algorithmes', 'Des parcours visuels fixes par situation clinique. Pas de cases à cocher : l’objectif est de synthétiser, pas de générer un diagnostic automatique.', `
      <div class="algorithm-grid">${items.map(a=>`
        <article class="algorithm-card">
          <h3>${esc(a.title)}</h3>
          <div class="flow">${a.steps.map(s=>`<div class="flow-step"><strong>${esc(s[0])}</strong>${esc(s[1])}</div>`).join('')}</div>
        </article>`).join('')}</div>
    `);
  }

  function renderCas(){
    const items = D.cases.filter(c=>contains(c,state.search));
    return panel('Cas cliniques', 'Questions courtes avec correction affichable. Format entraînement, pas cours brut.', `
      <div class="stack">${items.map((c,ci)=>`
        <article class="case-card">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.presentation)}</p>
          ${c.questions.map((q,qi)=>`
            <div class="case-question" data-case="${ci}" data-q="${qi}">
              <strong>${esc(q[0])}</strong>
              <div class="choice-row">${q[1].map((choice,i)=>`<button class="choice-btn" data-answer="${i}" data-correct="${q[2]}">${esc(choice)}</button>`).join('')}</div>
              <div class="answer">${esc(q[3])}</div>
            </div>`).join('')}
          <div class="note success"><strong>À retenir :</strong> ${esc(c.takeaway)}</div>
        </article>`).join('')}</div>
    `);
  }

  function renderChecklists(){
    const current = D.checklistGroups.find(g=>g.id===state.checklist) || D.checklistGroups[0];
    return panel('Checklists', 'Checklists séparées par situation pour éviter l’effet “mur d’informations”.', `
      <div class="checklist-layout">
        <aside class="checklist-menu">${D.checklistGroups.map(g=>`<button class="${current.id===g.id?'active':''}" data-checklist="${g.id}">${esc(g.label)}</button>`).join('')}</aside>
        <article class="checklist-card">
          <h3>${esc(current.label)}</h3>
          ${current.sections.map(s=>`<section class="check-section"><h4>${esc(s.title)}</h4><ul class="check-list">${s.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></section>`).join('')}
        </article>
      </div>
    `);
  }

  function render(){
    renderNav();
    let html = '';
    if(state.view==='accueil') html = renderAccueil();
    if(state.view==='demarche') html = renderDemarche();
    if(state.view==='tests') html = renderTests();
    if(state.view==='pathologies') html = renderPathologies();
    if(state.view==='reeducation') html = renderReeducation();
    if(state.view==='algorithmes') html = renderAlgorithmes();
    if(state.view==='cas') html = renderCas();
    if(state.view==='checklists') html = renderChecklists();
    $('content').innerHTML = html;

    document.querySelectorAll('[data-open]').forEach(b=>b.addEventListener('click',()=>setView(b.dataset.open)));
    document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{state.filter=b.dataset.filter; render();}));
    document.querySelectorAll('[data-checklist]').forEach(b=>b.addEventListener('click',()=>{state.checklist=b.dataset.checklist; render();}));
    document.querySelectorAll('.choice-btn').forEach(btn=>btn.addEventListener('click',()=>{
      const box = btn.closest('.case-question');
      const correct = Number(btn.dataset.correct);
      box.querySelectorAll('.choice-btn').forEach((b,i)=>{ b.classList.remove('correct','wrong'); if(i===correct)b.classList.add('correct'); });
      if(Number(btn.dataset.answer)!==correct) btn.classList.add('wrong');
      box.querySelector('.answer').classList.add('visible');
    }));
  }

  $('globalSearch').addEventListener('input', e => { state.search = e.target.value.trim(); render(); });
  render();
})();
