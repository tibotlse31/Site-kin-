(function(){
  const DATA = window.VESTIBULAR_DATA;
  const state = { module: location.hash.replace('#','') || 'bilan', query: '' };

  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const esc = (value='') => String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const list = (items=[]) => `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  const badge = (text, color='blue') => `<span class="pv-badge ${color}">${esc(text)}</span>`;

  function init(){
    renderModuleCards();
    renderSideNav();
    bindGlobalEvents();
    if(!DATA.modules.some(m => m.id === state.module)) state.module = 'bilan';
    render();
  }

  function bindGlobalEvents(){
    $('#searchInput').addEventListener('input', event => {
      state.query = event.target.value.trim().toLowerCase();
      render();
    });

    document.addEventListener('click', event => {
      const jump = event.target.closest('[data-jump]');
      if(jump){ setModule(jump.dataset.jump); return; }

      const mod = event.target.closest('[data-module]');
      if(mod){ setModule(mod.dataset.module); return; }

      const tab = event.target.closest('[data-filter]');
      if(tab){
        $$('.pv-tab').forEach(btn => btn.classList.remove('active'));
        tab.classList.add('active');
        renderTests(tab.dataset.filter);
        return;
      }

      const choice = event.target.closest('[data-choice]');
      if(choice){ handleChoice(choice); return; }

      const reveal = event.target.closest('[data-reveal]');
      if(reveal){
        const target = document.getElementById(reveal.dataset.reveal);
        if(target) target.classList.toggle('visible');
        return;
      }

      const reset = event.target.closest('[data-reset-checklist]');
      if(reset){
        const box = reset.closest('.pv-checklist');
        $$('input[type="checkbox"]', box).forEach(input => input.checked = false);
        updateChecklistProgress(box);
        toast('Checklist remise à zéro');
      }
    });

    document.addEventListener('change', event => {
      if(event.target.matches('.pv-check-item input')){
        updateChecklistProgress(event.target.closest('.pv-checklist'));
      }
    });

    window.addEventListener('hashchange', () => {
      const id = location.hash.replace('#','');
      if(DATA.modules.some(m => m.id === id)){
        state.module = id;
        render();
      }
    });
  }

  function setModule(id){
    state.module = id;
    history.replaceState(null, '', `#${id}`);
    render();
    $('#content').focus({preventScroll:true});
    window.scrollTo({top: $('#content').offsetTop - 20, behavior:'smooth'});
  }

  function renderModuleCards(){
    $('#moduleCards').innerHTML = DATA.modules.map(m => `
      <button class="pv-module-card" type="button" data-module="${m.id}">
        <div class="icon">${m.icon}</div>
        <h3>${esc(m.title)}</h3>
        <p>${esc(m.summary)}</p>
        <div class="pv-chip-row">${m.tags.map(t => `<span class="pv-chip">${esc(t)}</span>`).join('')}</div>
      </button>
    `).join('');
  }

  function renderSideNav(){
    $('#sideNav').innerHTML = DATA.modules.map(m => `
      <button class="pv-nav-btn" type="button" data-module="${m.id}">
        <span><span>${m.icon}</span><span>${esc(m.title)}</span></span>
        <span class="pv-nav-count">${getCount(m.id)}</span>
      </button>
    `).join('');
  }

  function getCount(id){
    const map = {
      bases: DATA.bases.length,
      bilan: DATA.bilanSteps.length,
      tests: DATA.tests.length,
      drapeaux: DATA.redFlags.length,
      pathologies: DATA.pathologies.length,
      reeducation: DATA.rehab.length,
      cas: DATA.cases.length,
      checklists: DATA.checklists.length
    };
    return map[id] || '—';
  }

  function render(){
    $$('.pv-module-card').forEach(card => card.classList.toggle('active', card.dataset.module === state.module));
    $$('.pv-nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.module === state.module));

    const mod = DATA.modules.find(m => m.id === state.module);
    const content = $('#content');
    content.innerHTML = `
      <section class="pv-panel">
        <div class="pv-panel-head">
          <div>
            <h2>${mod.icon} ${esc(mod.title)}</h2>
            <p>${esc(mod.summary)}</p>
          </div>
          <div class="pv-tools">
            ${state.query ? `<span class="pv-badge purple">Filtre : ${esc(state.query)}</span>` : ''}
          </div>
        </div>
        ${renderModuleBody(state.module)}
      </section>
    `;
  }

  function filterItems(items, fields){
    if(!state.query) return items;
    return items.filter(item => fields.some(field => String(item[field] || '').toLowerCase().includes(state.query)) || JSON.stringify(item).toLowerCase().includes(state.query));
  }

  function renderModuleBody(id){
    if(id === 'bases') return renderBases();
    if(id === 'bilan') return renderBilan();
    if(id === 'tests') return renderTests();
    if(id === 'drapeaux') return renderRedFlags();
    if(id === 'pathologies') return renderPathologies();
    if(id === 'reeducation') return renderReeducation();
    if(id === 'cas') return renderCases();
    if(id === 'checklists') return renderChecklists();
    return '<div class="pv-empty">Module non trouvé.</div>';
  }

  function renderBases(){
    const items = filterItems(DATA.bases, ['title','short','clinical','badge']);
    if(!items.length) return empty();
    return `<div class="pv-grid-2">
      ${items.map(item => `
        <article class="pv-card">
          <div class="pv-card-header">
            <h3>${esc(item.title)}</h3>
            ${badge(item.badge, item.color)}
          </div>
          <p>${esc(item.short)}</p>
          <div class="pv-note info"><strong>À retenir</strong>${list(item.key)}</div>
          <div class="pv-note success"><strong>Exemple clinique :</strong> ${esc(item.clinical)}</div>
        </article>
      `).join('')}
    </div>`;
  }

  function renderBilan(){
    const steps = filterItems(DATA.bilanSteps, ['title','goal','interpret']);
    if(!steps.length) return empty();
    return `
      <div class="pv-note info"><strong>Principe :</strong> le bilan suit le symptôme. L’interrogatoire oriente les tests ; les tests confirment ou corrigent l’hypothèse.</div>
      <div class="pv-stepper">
        ${steps.map((step, index) => `
          <article class="pv-step">
            <details ${index < 2 ? 'open' : ''}>
              <summary>${esc(step.title)}</summary>
              <div class="pv-step-body">
                <div class="pv-mini-grid">
                  <div class="pv-mini"><strong>Objectif</strong>${esc(step.goal)}</div>
                  <div class="pv-mini"><strong>Interprétation</strong>${esc(step.interpret)}</div>
                  <div class="pv-mini"><strong>Pièges</strong>${list(step.traps)}</div>
                </div>
                <div class="pv-card"><h3>À faire</h3>${list(step.do)}</div>
              </div>
            </details>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderTests(filter='Tous'){
    const root = $('#content .pv-panel');
    const cats = ['Tous', ...new Set(DATA.tests.map(t => t.cat))];
    let items = DATA.tests;
    if(filter !== 'Tous') items = items.filter(t => t.cat === filter);
    items = filterItems(items, ['title','cat','objective','procedure','normal','patho','traps']);
    const html = `
      <div class="pv-tabs">
        ${cats.map(cat => `<button class="pv-tab ${cat === filter ? 'active' : ''}" type="button" data-filter="${esc(cat)}">${esc(cat)}</button>`).join('')}
      </div>
      <div class="pv-filtered">
        ${items.length ? items.map(test => `
          <details class="pv-details">
            <summary>
              <span>${esc(test.title)}</span>
              ${badge(test.cat, 'blue')}
            </summary>
            <div class="pv-details-body">
              <div class="pv-mini-grid">
                <div class="pv-mini"><strong>Objectif</strong>${esc(test.objective)}</div>
                <div class="pv-mini"><strong>Procédure</strong>${esc(test.procedure)}</div>
                <div class="pv-mini"><strong>Normal</strong>${esc(test.normal)}</div>
              </div>
              <div class="pv-note warn"><strong>Pathologique :</strong> ${esc(test.patho)}</div>
              <div class="pv-note info"><strong>Pièges :</strong> ${esc(test.traps)}</div>
            </div>
          </details>
        `).join('') : empty()}
      </div>
    `;
    if(root && state.module === 'tests'){
      const head = root.querySelector('.pv-panel-head');
      root.innerHTML = '';
      root.appendChild(head);
      root.insertAdjacentHTML('beforeend', html);
    }
    return html;
  }

  function renderRedFlags(){
    const flags = filterItems(DATA.redFlags, ['title','why']);
    return `
      <div class="pv-algo">
        <div class="pv-algo-title">Algorithme synthétique — premier tri</div>
        <div class="pv-flow">
          <div class="pv-flow-row">
            <div class="pv-flow-box">Patient vertigineux ou instable</div>
            <div class="pv-arrow">→</div>
            <div class="pv-flow-box warn">Vertige aigu, atypique ou intense ?</div>
          </div>
          <div class="pv-flow-row">
            <div class="pv-flow-box danger">Signes neuro, skew, nystagmus vertical/multiple, gaze nystagmus ?</div>
            <div class="pv-arrow">→</div>
            <div class="pv-flow-box danger">Suspicion centrale : arrêt du raisonnement de rééducation et réorientation</div>
          </div>
          <div class="pv-flow-row">
            <div class="pv-flow-box success">Pas de drapeau rouge + tableau cohérent</div>
            <div class="pv-arrow">→</div>
            <div class="pv-flow-box success">Poursuivre bilan vestibulaire ciblé : VNS, tests dynamiques, posture</div>
          </div>
        </div>
      </div>
      <div class="pv-grid-2">
        ${flags.length ? flags.map(flag => `
          <article class="pv-card">
            <div class="pv-card-header"><h3>${esc(flag.title)}</h3>${badge(flag.level === 'red' ? 'Urgence possible' : 'Prudence', flag.level)}</div>
            <p>${esc(flag.why)}</p>
          </article>
        `).join('') : empty()}
      </div>
    `;
  }

  function renderPathologies(){
    const rows = filterItems(DATA.pathologies, ['name','family','temporal','signs','tests','rehab']);
    if(!rows.length) return empty();
    return `
      <div class="pv-note info"><strong>Lecture :</strong> comparer la temporalité, les signes associés, les tests utiles et l’objectif de rééducation.</div>
      <div class="pv-table-wrap">
        <table>
          <thead><tr><th>Pathologie</th><th>Famille</th><th>Temporalité</th><th>Signes typiques</th><th>Tests utiles</th><th>Priorité</th></tr></thead>
          <tbody>
            ${rows.map(p => `<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.family)}</td><td>${esc(p.temporal)}</td><td>${esc(p.signs)}</td><td>${esc(p.tests)}</td><td>${esc(p.rehab)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div class="pv-note warn"><strong>Point pédagogique :</strong> si le tableau est positionnel mais atypique, ne pas conclure automatiquement à un VPPB.</div>
    `;
  }

  function renderReeducation(){
    const items = filterItems(DATA.rehab, ['objective','indications','avoid']);
    if(!items.length) return empty();
    return `
      <div class="pv-grid-2">
        ${items.map(item => `
          <article class="pv-card">
            <div class="pv-card-header"><h3>${esc(item.objective)}</h3>${badge('Objectif', 'green')}</div>
            <div><strong>Outils possibles</strong>${list(item.tools)}</div>
            <div class="pv-note info"><strong>Indications :</strong> ${esc(item.indications)}</div>
            <div class="pv-note warn"><strong>À éviter :</strong> ${esc(item.avoid)}</div>
          </article>
        `).join('')}
      </div>
    `;
  }

  function renderCases(){
    const cases = filterItems(DATA.cases, ['title','presentation','takeaway']);
    if(!cases.length) return empty();
    return `<div class="pv-stack">
      ${cases.map((item, caseIndex) => `
        <article class="pv-case">
          <div class="pv-case-top">
            <div><h3>${esc(item.title)}</h3><p>${esc(item.presentation)}</p></div>
            ${badge(item.level, 'purple')}
          </div>
          ${item.questions.map((q, qIndex) => {
            const answerId = `answer-${caseIndex}-${qIndex}`;
            return `
              <div class="pv-question">
                <strong>Question ${qIndex + 1} — ${esc(q.q)}</strong>
                <div class="pv-choice-row">
                  ${q.choices.map((choice, choiceIndex) => `<button class="pv-choice" type="button" data-choice="${choiceIndex}" data-correct="${q.correct}">${esc(choice)}</button>`).join('')}
                </div>
                <button class="pv-btn pv-btn-soft" type="button" data-reveal="${answerId}">Afficher l’explication</button>
                <div class="pv-answer" id="${answerId}">${esc(q.explanation)}</div>
              </div>`;
          }).join('')}
          <div class="pv-note success"><strong>À retenir :</strong> ${esc(item.takeaway)}</div>
        </article>
      `).join('')}
    </div>`;
  }

  function handleChoice(choice){
    const row = choice.closest('.pv-choice-row');
    const correct = Number(choice.dataset.correct);
    const selected = Number(choice.dataset.choice);
    $$('.pv-choice', row).forEach(btn => {
      btn.disabled = true;
      const idx = Number(btn.dataset.choice);
      if(idx === correct) btn.classList.add('correct');
      if(idx === selected && selected !== correct) btn.classList.add('wrong');
    });
    toast(selected === correct ? 'Bonne réponse ✅' : 'Réponse à revoir ⚠️');
  }

  function renderChecklists(){
    const lists = filterItems(DATA.checklists, ['title']);
    if(!lists.length) return empty();
    setTimeout(() => $$('.pv-checklist').forEach(updateChecklistProgress), 0);
    return `<div class="pv-stack">
      ${lists.map((listItem, listIndex) => `
        <article class="pv-checklist" data-checklist="${listIndex}">
          <div class="pv-case-top">
            <h3>${esc(listItem.title)}</h3>
            <button class="pv-btn pv-btn-ghost" type="button" data-reset-checklist>Réinitialiser</button>
          </div>
          <div class="pv-progress"><span></span></div>
          ${listItem.items.map((item, itemIndex) => `
            <label class="pv-check-item">
              <input type="checkbox" />
              <span>${esc(item)}</span>
            </label>
          `).join('')}
        </article>
      `).join('')}
    </div>`;
  }

  function updateChecklistProgress(box){
    if(!box) return;
    const inputs = $$('input[type="checkbox"]', box);
    const done = inputs.filter(input => input.checked).length;
    const percent = inputs.length ? Math.round(done / inputs.length * 100) : 0;
    const bar = $('.pv-progress span', box);
    if(bar) bar.style.width = `${percent}%`;
  }

  function empty(){
    return '<div class="pv-empty">Aucun résultat pour cette recherche.</div>';
  }

  let toastTimer;
  function toast(message){
    const box = $('#toast');
    box.textContent = message;
    box.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => box.classList.remove('visible'), 1500);
  }

  init();
})();
