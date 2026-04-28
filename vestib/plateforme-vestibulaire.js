(function(){
  const data = window.VESTIB_DATA;
  const view = document.getElementById('view');
  const nav = document.getElementById('mainNav');
  const glossaryBtn = document.getElementById('glossaryBtn');
  const glossaryPanel = document.getElementById('glossaryPanel');
  const overlay = document.getElementById('overlay');
  const levelBtn = document.getElementById('levelBtn');

  let current = 'overview';
  let deep = false;
  let selectedFund = data.fundamentals[0].id;
  let selectedAssessment = data.assessment.sections[0].letter;
  let selectedTestCat = 'Oculomotricité';
  let selectedTestName = 'Saccades / test des index';
  let selectedPathName = 'VPPB';
  let selectedRehab = data.rehab.objectives[0].name;

  const acronyms = data.acronyms || {};
  const esc = (s='') => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

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
  const list = arr => `<ul class="list">${arr.map(x=>`<li>${fmt(x)}</li>`).join('')}</ul>`;

  function hero(title, intro, chips=[]){
    const chipHtml = chips.length ? `<div class="mini-map">${chips.map(c=>`<span class="map-chip">${fmt(c)}</span>`).join('')}</div>` : '';
    return `<section class="hero"><h1>${fmt(title)}</h1><p>${fmt(intro)}</p>${chipHtml}</section>`;
  }

  function renderNav(){
    nav.innerHTML = data.nav.map(item => `<button class="nav-btn ${item.id===current?'active':''}" data-id="${item.id}" type="button">${item.icon} ${fmt(item.label)}</button>`).join('');
    nav.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
      current = btn.dataset.id;
      render();
      window.scrollTo({top:0, behavior:'smooth'});
    }));
  }

  function renderOverview(){
    const cards = data.overview.cards.map(c => `<article class="card"><h3>${fmt(c.title)}</h3><p>${fmt(c.text)}</p><div class="badge-row">${c.tags.map(t=>badge(t)).join('')}</div></article>`).join('');
    const families = data.overview.families.map(f => `<article class="card family-card ${f.tone==='red'?'red':f.tone==='green'?'green':''}"><h3>${fmt(f.name)}</h3><p>${fmt(f.text)}</p></article>`).join('');
    view.innerHTML = hero(data.overview.title, data.overview.intro, ['Physiologie','Bilan','Tests','Pathologies','Rééducation','Cas'])
      + `<div class="grid four">${cards}</div>`
      + `<section class="panel"><h2>Carte du raisonnement</h2><div class="step-list">${data.overview.reasoning.map(r=>`<div class="step"><div><strong>${fmt(r[0])}</strong><span>${fmt(r[1])}</span></div></div>`).join('')}</div></section>`
      + `<h2 class="section-title">Trois familles du cours</h2><div class="family-grid">${families}</div>`
      + `<section class="panel"><h2>Comment utiliser l’outil</h2>${list(data.overview.usage)}</section>`;
  }

  function renderFundamentals(){
    const selected = data.fundamentals.find(x=>x.id===selectedFund) || data.fundamentals[0];
    view.innerHTML = hero('Fondamentaux', 'Bases du cours présentées en lecture progressive : essentiel visible, détails en mode approfondi.', ['RVO','Nystagmus','Ewald','Compensation','Organisation sensorielle'])
      + `<div class="layout-detail">
          <section class="panel"><h2>Notions</h2><div class="path-list">${data.fundamentals.map(f=>`<button class="select-btn ${f.id===selected.id?'active':''}" data-id="${f.id}" type="button">${fmt(f.title)}</button>`).join('')}</div></section>
          <aside class="detail-panel">
            <h2>${fmt(selected.title)}</h2>
            <h3>À retenir</h3>${list(selected.essential)}
            <h3>Pourquoi c’est important</h3><p class="subtle">${fmt(selected.why)}</p>
            <div class="note info"><strong>Exemple clinique :</strong> ${fmt(selected.clinical)}</div>
            <div class="mode-only"><h3>Approfondir</h3>${list(selected.details)}</div>
          </aside>
        </div>`;
    view.querySelectorAll('.select-btn').forEach(btn => btn.addEventListener('click', () => {
      selectedFund = btn.dataset.id;
      renderFundamentals();
    }));
  }

  function renderAssessment(){
    const selected = data.assessment.sections.find(x=>x.letter===selectedAssessment) || data.assessment.sections[0];
    const rows = data.assessment.sections.map(s => `<tr class="clickable ${s.letter===selected.letter?'selected':''}" data-letter="${s.letter}">
      <td><strong>${fmt(s.letter)} — ${fmt(s.title)}</strong></td><td>${fmt(s.goal)}</td><td>${fmt(s.look)}</td><td>${fmt(s.orient)}</td>
    </tr>`).join('');
    view.innerHTML = hero(data.assessment.title, data.assessment.intro, ['A → H','Interrogatoire','Centralité','Objectivation'])
      + `<div class="layout-detail">
          <section class="panel"><h2>Plan du bilan</h2><div class="table-wrap"><table><thead><tr><th>Étape</th><th>But</th><th>À rechercher</th><th>Oriente vers</th></tr></thead><tbody>${rows}</tbody></table></div></section>
          <aside class="detail-panel">
            <h2>${fmt(selected.letter)} — ${fmt(selected.title)}</h2>
            <dl>
              <div><dt>But</dt><dd>${fmt(selected.goal)}</dd></div>
              <div><dt>À rechercher</dt><dd>${fmt(selected.look)}</dd></div>
              <div><dt>Oriente vers</dt><dd>${fmt(selected.orient)}</dd></div>
            </dl>
            <div class="mode-only"><h3>Détails du cours</h3>${list(selected.details)}</div>
          </aside>
        </div>
        <div class="grid two">
          <section class="card"><h3>Signes d’alerte</h3><div class="note danger">Si ces éléments apparaissent, la priorité est la réorientation ou l’avis médical.</div>${list(data.assessment.redFlags)}</section>
          <section class="card"><h3>Suivi pré / per / post</h3><div class="note ok">Le suivi prouve l’évolution et guide l’adaptation de la prise en charge.</div>${list(data.assessment.tracking)}</section>
        </div>`;
    view.querySelectorAll('tr.clickable').forEach(row => row.addEventListener('click', () => {
      selectedAssessment = row.dataset.letter;
      renderAssessment();
    }));
  }

  function renderTests(){
    const cats = Array.from(new Set(data.tests.map(t=>t.cat)));
    if(!cats.includes(selectedTestCat)) selectedTestCat = cats[0];
    const filtered = data.tests.filter(t=>t.cat===selectedTestCat);
    let selected = filtered.find(t=>t.name===selectedTestName) || filtered[0];
    selectedTestName = selected.name;
    const rows = filtered.map(t => `<tr class="clickable ${t.name===selected.name?'selected':''}" data-name="${esc(t.name)}">
      <td><strong>${fmt(t.name)}</strong></td><td>${fmt(t.purpose)}</td><td>${fmt(t.alert)}</td><td>${fmt(t.trap)}</td>
    </tr>`).join('');
    view.innerHTML = hero('Tests', 'Bibliothèque de tests par familles : tableau lisible + fiche détaillée. Pas de test sans hypothèse clinique.', ['Oculomotricité','VNS','EVS','CTSIB','DHI'])
      + `<div class="tabs">${cats.map(c=>`<button class="tab ${c===selectedTestCat?'active':''}" data-cat="${esc(c)}" type="button">${fmt(c)}</button>`).join('')}</div>`
      + `<div class="layout-detail">
          <section class="panel"><h2>${fmt(selectedTestCat)}</h2><div class="table-wrap"><table><thead><tr><th>Test</th><th>Ce que ça cherche</th><th>Alerte</th><th>Piège</th></tr></thead><tbody>${rows}</tbody></table></div></section>
          <aside class="detail-panel">
            <h2>${fmt(selected.name)}</h2>
            <div class="badge-row">${badge(selected.cat)}</div>
            <dl>
              <div><dt>Objectif</dt><dd>${fmt(selected.purpose)}</dd></div>
              <div><dt>Procédure</dt><dd>${fmt(selected.procedure)}</dd></div>
              <div><dt>Normal / attendu</dt><dd>${fmt(selected.normal)}</dd></div>
              <div><dt>Anormal / alerte</dt><dd>${fmt(selected.alert)}</dd></div>
              <div><dt>Piège</dt><dd>${fmt(selected.trap)}</dd></div>
            </dl>
          </aside>
        </div>`;
    view.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => {
      selectedTestCat = btn.dataset.cat;
      selectedTestName = data.tests.find(t=>t.cat===selectedTestCat).name;
      renderTests();
    }));
    view.querySelectorAll('tr.clickable').forEach(row => row.addEventListener('click', () => {
      selectedTestName = row.dataset.name;
      renderTests();
    }));
  }

  function renderPathologies(){
    const families = data.pathologies.families.map(f => `<article class="card family-card ${f.tone==='red'?'red':f.tone==='green'?'green':''}">
      <h3>${fmt(f.name)}</h3><p>${fmt(f.text)}</p>
    </article>`).join('');
    let selected = data.pathologies.items.find(p=>p.name===selectedPathName) || data.pathologies.items[0];
    selectedPathName = selected.name;
    const rows = data.pathologies.items.map(p => `<tr class="clickable ${p.name===selected.name?'selected':''}" data-name="${esc(p.name)}">
      <td><strong>${fmt(p.name)}</strong></td><td>${fmt(p.family)}</td><td>${fmt(p.time)}</td><td>${fmt(p.signs)}</td><td>${fmt(p.rehab)}</td>
    </tr>`).join('');
    view.innerHTML = hero('Pathologies', 'Classement fidèle au cours : périphériques, centrales, désorganisations neurosensorielles.', ['Périphérique','Central','DNS'])
      + `<div class="family-grid">${families}</div>`
      + `<div class="layout-detail" style="margin-top:18px">
          <section class="panel"><h2>Comparateur</h2><div class="table-wrap"><table><thead><tr><th>Pathologie</th><th>Famille</th><th>Temporalité</th><th>Signes clés</th><th>Priorité</th></tr></thead><tbody>${rows}</tbody></table></div></section>
          <aside class="detail-panel">
            <h2>${fmt(selected.name)}</h2>
            <div class="badge-row">${badge(selected.family, selected.family.includes('Central')?'danger':selected.family.includes('DNS')?'ok':'')}</div>
            <dl>
              <div><dt>Définition</dt><dd>${fmt(selected.definition)}</dd></div>
              <div><dt>Temporalité</dt><dd>${fmt(selected.time)}</dd></div>
              <div><dt>Signes clés</dt><dd>${fmt(selected.signs)}</dd></div>
              <div><dt>Bilan utile</dt><dd>${fmt(selected.assessment)}</dd></div>
              <div><dt>Priorité de rééducation</dt><dd>${fmt(selected.rehab)}</dd></div>
              <div><dt>À éviter</dt><dd>${fmt(selected.avoid)}</dd></div>
            </dl>
          </aside>
        </div>`;
    view.querySelectorAll('tr.clickable').forEach(row => row.addEventListener('click', () => {
      selectedPathName = row.dataset.name;
      renderPathologies();
    }));
  }

  function renderRehab(){
    const selected = data.rehab.objectives.find(r=>r.name===selectedRehab) || data.rehab.objectives[0];
    selectedRehab = selected.name;
    const buttons = data.rehab.objectives.map(r=>`<button class="select-btn ${r.name===selected.name?'active':''}" data-name="${esc(r.name)}" type="button">${fmt(r.name)}</button>`).join('');
    const matrix = data.rehab.matrix.map(r=>`<tr><td><strong>${fmt(r[0])}</strong></td><td>${fmt(r[1])}</td></tr>`).join('');
    view.innerHTML = hero('Rééducation', 'Organisée par objectifs thérapeutiques : quand, pourquoi, avec quoi, progression, mesure, pièges.', ['Compensation','Substitution','Habituation','ETP'])
      + `<div class="layout-detail">
          <section class="panel"><h2>Objectifs</h2><div class="path-list">${buttons}</div></section>
          <aside class="detail-panel">
            <h2>${fmt(selected.name)}</h2>
            <dl>
              <div><dt>Quand ?</dt><dd>${fmt(selected.when)}</dd></div>
              <div><dt>Pourquoi ?</dt><dd>${fmt(selected.why)}</dd></div>
              <div><dt>Avec quoi ?</dt><dd>${fmt(selected.tools)}</dd></div>
              <div><dt>Progression</dt><dd>${fmt(selected.progression)}</dd></div>
              <div><dt>Mesure</dt><dd>${fmt(selected.measure)}</dd></div>
              <div><dt>Pièges</dt><dd>${fmt(selected.pitfalls)}</dd></div>
            </dl>
          </aside>
        </div>
        <div class="grid two">
          <section class="card"><h3>Priorités selon pathologie</h3><div class="table-wrap"><table><tbody>${matrix}</tbody></table></div></section>
          <section class="card"><h3>Critères d’une rééducation bien conduite</h3>${list(data.rehab.criteria)}</section>
        </div>`;
    view.querySelectorAll('.select-btn').forEach(btn => btn.addEventListener('click', () => {
      selectedRehab = btn.dataset.name;
      renderRehab();
    }));
  }

  function renderCases(){
    view.innerHTML = hero('Cas cliniques', 'Les cas sont séparés du cours pour entraîner le raisonnement sans surcharger les fiches.', ['Plainte','Hypothèse','Tests','Décision'])
      + `<div class="grid two">${data.cases.map((c,i)=>`<article class="card case-card">
          <div class="case-meta">${badge(c.level, c.level==='Sécurité'||c.level==='Central'?'danger':c.level==='DNS'?'ok':'')}</div>
          <h3>Cas ${i+1} — ${fmt(c.title)}</h3>
          <p><strong>Présentation :</strong> ${fmt(c.presentation)}</p>
          <details><summary>Voir le raisonnement</summary><div class="inside">
            <div class="step-list">${c.steps.map(s=>`<div class="step"><div><strong>${fmt(s[0])}</strong><span>${fmt(s[1])}</span></div></div>`).join('')}</div>
            <div class="note warn"><strong>Piège :</strong> ${fmt(c.trap)}</div>
          </div></details>
        </article>`).join('')}</div>`;
  }

  function renderGlossary(){
    glossaryPanel.innerHTML = `<button class="close" type="button" aria-label="Fermer">×</button><h2>Acronymes</h2><p class="subtle">Définitions courtes. Les acronymes sont aussi soulignés discrètement dans les pages.</p><div class="glossary-list">${
      Object.entries(acronyms).sort(([a],[b])=>a.localeCompare(b)).map(([k,v])=>`<div class="glossary-item"><strong>${esc(k)}</strong><br><span>${esc(v)}</span></div>`).join('')
    }</div>`;
    glossaryPanel.querySelector('.close').addEventListener('click', closeGlossary);
  }
  function openGlossary(){
    renderGlossary();
    glossaryPanel.classList.add('open');
    glossaryPanel.setAttribute('aria-hidden','false');
    overlay.hidden = false;
  }
  function closeGlossary(){
    glossaryPanel.classList.remove('open');
    glossaryPanel.setAttribute('aria-hidden','true');
    overlay.hidden = true;
  }

  function render(){
    renderNav();
    if(current === 'overview') renderOverview();
    if(current === 'fundamentals') renderFundamentals();
    if(current === 'assessment') renderAssessment();
    if(current === 'tests') renderTests();
    if(current === 'pathologies') renderPathologies();
    if(current === 'rehab') renderRehab();
    if(current === 'cases') renderCases();
  }

  glossaryBtn.addEventListener('click', openGlossary);
  overlay.addEventListener('click', closeGlossary);
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeGlossary(); });
  levelBtn.addEventListener('click', () => {
    deep = !deep;
    document.body.classList.toggle('deep', deep);
    levelBtn.classList.toggle('on', deep);
    levelBtn.setAttribute('aria-pressed', deep ? 'true' : 'false');
    levelBtn.textContent = deep ? 'Mode essentiel' : 'Mode approfondi';
  });

  render();
})();