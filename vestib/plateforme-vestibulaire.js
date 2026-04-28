(function(){
  const DATA = window.VB_DATA;
  const state = {
    section: location.hash.replace('#','') || 'bilan',
    libraryType: 'tests',
    libraryQuery: '',
    choices: {
      symptoms: new Set(),
      redFlags: new Set(),
      history: new Set(),
      results: new Set()
    }
  };

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const esc = (v='') => String(v).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const uniq = arr => [...new Set(arr)];
  const list = items => `<ul class="vb-list">${(items || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  const badge = (txt, color='blue') => `<span class="vb-badge ${color}">${esc(txt)}</span>`;

  function init(){
    if(!DATA.sections.some(s => s.id === state.section)) state.section = 'bilan';
    renderNav();
    bindEvents();
    render();
  }

  function bindEvents(){
    document.addEventListener('click', event => {
      const sectionBtn = event.target.closest('[data-section]');
      if(sectionBtn){
        setSection(sectionBtn.dataset.section);
        return;
      }

      const libBtn = event.target.closest('[data-library-type]');
      if(libBtn){
        state.libraryType = libBtn.dataset.libraryType;
        render();
        return;
      }

      const revealBtn = event.target.closest('[data-reveal]');
      if(revealBtn){
        const box = document.getElementById(revealBtn.dataset.reveal);
        if(box){
          box.classList.toggle('visible');
          revealBtn.textContent = box.classList.contains('visible') ? 'Masquer la réponse' : 'Afficher la réponse';
        }
        return;
      }

      const copyBtn = event.target.closest('[data-copy-summary]');
      if(copyBtn){
        const text = $('#summaryText')?.value || buildSummaryText();
        navigator.clipboard?.writeText(text).then(() => toast('Synthèse copiée')).catch(() => toast('Copie indisponible'));
        return;
      }

      const resetBtn = event.target.closest('[data-reset-bilan]');
      if(resetBtn){
        Object.values(state.choices).forEach(set => set.clear());
        render();
        toast('Bilan remis à zéro');
        return;
      }

      const resetChecklist = event.target.closest('[data-reset-checklist]');
      if(resetChecklist){
        const card = resetChecklist.closest('.vb-checklist');
        $$('input[type="checkbox"]', card).forEach(input => input.checked = false);
        updateChecklist(card);
        toast('Checklist remise à zéro');
      }
    });

    document.addEventListener('change', event => {
      const input = event.target;
      if(input.matches('[data-choice-group]')){
        const group = input.dataset.choiceGroup;
        const id = input.value;
        if(input.checked) state.choices[group].add(id);
        else state.choices[group].delete(id);
        render();
        return;
      }

      if(input.matches('.vb-check-item input')){
        updateChecklist(input.closest('.vb-checklist'));
      }
    });

    document.addEventListener('input', event => {
      if(event.target.matches('#librarySearch')){
        state.libraryQuery = event.target.value.toLowerCase().trim();
        renderLibraryBody();
      }
    });

    window.addEventListener('hashchange', () => {
      const id = location.hash.replace('#','');
      if(DATA.sections.some(s => s.id === id)){
        state.section = id;
        render();
      }
    });
  }

  function setSection(id){
    state.section = id;
    history.replaceState(null, '', `#${id}`);
    render();
    $('#app')?.focus({preventScroll:true});
    window.scrollTo({top: $('#app').offsetTop - 20, behavior:'smooth'});
  }

  function renderNav(){
    $('#sectionNav').innerHTML = DATA.sections.map(s => `
      <button type="button" class="vb-nav-btn" data-section="${esc(s.id)}">
        <span>${s.icon} ${esc(s.title)}</span>
        <span class="vb-count">${countFor(s.id)}</span>
      </button>
    `).join('');
  }

  function countFor(id){
    if(id === 'bilan') return '7';
    if(id === 'bibliotheque') return DATA.tests.length + DATA.pathologies.length + DATA.rehab.length + DATA.bases.length;
    if(id === 'algorithmes') return '4';
    if(id === 'cas') return DATA.cases.length;
    if(id === 'checklists') return DATA.checklists.length;
    return '—';
  }

  function render(){
    $$('.vb-big-action').forEach(btn => btn.classList.toggle('active', btn.dataset.section === state.section));
    $$('.vb-nav-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.section === state.section));
    const section = DATA.sections.find(s => s.id === state.section);
    $('#app').innerHTML = `
      <section class="vb-panel">
        <div class="vb-panel-head">
          <div>
            <h2>${section.icon} ${esc(section.title)}</h2>
            <p>${esc(section.subtitle)}</p>
          </div>
          ${state.section === 'bilan' ? '<div class="vb-tools"><button class="vb-btn danger" type="button" data-reset-bilan>Réinitialiser le bilan</button></div>' : ''}
        </div>
        ${renderBody(state.section)}
      </section>
    `;
    updateAllChecklists();
  }

  function renderBody(id){
    if(id === 'bilan') return renderBilan();
    if(id === 'bibliotheque') return renderLibrary();
    if(id === 'algorithmes') return renderAlgorithms();
    if(id === 'cas') return renderCases();
    if(id === 'checklists') return renderChecklists();
    return empty();
  }

  function choiceCard(group, item){
    const checked = state.choices[group].has(item.id);
    return `
      <label class="vb-choice ${checked ? 'checked' : ''}">
        <input type="checkbox" value="${esc(item.id)}" data-choice-group="${esc(group)}" ${checked ? 'checked' : ''} />
        <span>
          <span class="vb-choice-title">${esc(item.title)}</span>
          <span class="vb-choice-desc">${esc(item.desc)}</span>
        </span>
      </label>
    `;
  }

  function renderBilan(){
    const triage = computeTriage();
    const recommendations = computeRecommendations();
    const orientations = computeOrientations();
    const summary = buildSummaryText(recommendations, orientations);
    return `
      <div class="vb-note info"><strong>Principe</strong> Le module guide le raisonnement. Il ne pose pas un diagnostic certain : il affiche des orientations compatibles et les points à confirmer.</div>

      <article class="vb-step">
        <details open>
          <summary>1. Motif de consultation</summary>
          <div class="vb-step-body">
            <p class="vb-muted">Sélectionner les plaintes principales. Plusieurs choix sont possibles.</p>
            <div class="vb-choice-grid">${DATA.bilan.symptoms.map(x => choiceCard('symptoms', x)).join('')}</div>
          </div>
        </details>
      </article>

      <article class="vb-step">
        <details open>
          <summary>2. Triage sécurité / drapeaux rouges</summary>
          <div class="vb-step-body">
            ${triage.html}
            <div class="vb-choice-grid">${DATA.bilan.redFlags.map(x => choiceCard('redFlags', x)).join('')}</div>
          </div>
        </details>
      </article>

      <article class="vb-step">
        <details open>
          <summary>3. Interrogatoire guidé</summary>
          <div class="vb-step-body">
            <div class="vb-note info"><strong>Objectif</strong> L’interrogatoire oriente le choix des tests. Il évite de tout tester systématiquement.</div>
            <div class="vb-choice-grid">${DATA.bilan.history.map(x => choiceCard('history', x)).join('')}</div>
          </div>
        </details>
      </article>

      <article class="vb-step">
        <details open>
          <summary>4. Tests proposés selon le profil</summary>
          <div class="vb-step-body">
            ${renderRecommendations(recommendations)}
          </div>
        </details>
      </article>

      <article class="vb-step">
        <details open>
          <summary>5. Résultats structurés</summary>
          <div class="vb-step-body">
            <p class="vb-muted">Cocher les éléments retrouvés. L’orientation se met à jour automatiquement.</p>
            ${renderResultGroups()}
          </div>
        </details>
      </article>

      <article class="vb-step">
        <details open>
          <summary>6. Orientation clinique et axes de prise en charge</summary>
          <div class="vb-step-body">
            ${renderOrientationCards(orientations)}
            <div class="vb-note warn"><strong>Formulation conseillée</strong> Utiliser “compatible avec”, “oriente vers”, “à confirmer par” et “réorientation si doute”, plutôt que “diagnostic certain”.</div>
            ${renderVppbLink(orientations)}
          </div>
        </details>
      </article>

      <article class="vb-step">
        <details open>
          <summary>7. Synthèse et suivi</summary>
          <div class="vb-step-body">
            <textarea id="summaryText" class="vb-textarea">${esc(summary)}</textarea>
            <div class="vb-footer-actions">
              <button type="button" class="vb-btn primary" data-copy-summary>Copier la synthèse</button>
              <button type="button" class="vb-btn ghost" data-section="checklists">Ouvrir les checklists</button>
            </div>
          </div>
        </details>
      </article>
    `;
  }

  function computeTriage(){
    const count = state.choices.redFlags.size;
    const acute = state.choices.symptoms.has('vertige_aigu_continu');
    if(count > 0){
      return { level:'danger', html:`<div class="vb-note danger"><strong>Prudence / réorientation</strong> ${count} drapeau(x) rouge(s) sélectionné(s). En contexte aigu, ne pas traiter comme périphérique simple sans avis adapté.</div>` };
    }
    if(acute){
      return { level:'warn', html:'<div class="vb-note warn"><strong>Vertige aigu continu</strong> HINTS/HIT/skew/nystagmus et oculomotricité sont prioritaires si le contexte est compatible.</div>' };
    }
    return { level:'ok', html:'<div class="vb-note success"><strong>Aucun drapeau rouge coché</strong> Poursuivre le bilan ciblé, en restant attentif à la cohérence globale.</div>' };
  }

  function computeRecommendations(){
    const ids = [];
    state.choices.symptoms.forEach(symId => {
      const symptom = DATA.bilan.symptoms.find(s => s.id === symId);
      if(symptom) ids.push(...symptom.tests);
    });
    if(state.choices.redFlags.size > 0) ids.unshift('hints','skew','saccades','poursuite','fixation','nystagmus_spontane');
    if(ids.length === 0) ids.push('saccades','poursuite','fixation','nystagmus_spontane','romberg','dhi');
    return uniq(ids).map(id => DATA.tests.find(t => t.id === id)).filter(Boolean);
  }

  function renderRecommendations(tests){
    if(!tests.length) return empty('Aucun test proposé. Sélectionner au moins un motif de consultation.');
    return `<div class="vb-reco-list">
      ${tests.map((t, index) => `
        <article class="vb-reco-card">
          <div>
            <h4>${esc(t.title)}</h4>
            <p>${esc(t.objective)}</p>
            <p class="vb-small"><strong>Indication :</strong> ${esc(t.indication)}</p>
          </div>
          <div class="vb-score">${index + 1}</div>
        </article>
      `).join('')}
    </div>`;
  }

  function renderResultGroups(){
    const groups = uniq(DATA.bilan.results.map(r => r.group));
    return groups.map(group => `
      <div class="vb-section-title"><h3>${esc(group)}</h3></div>
      <div class="vb-choice-grid">
        ${DATA.bilan.results.filter(r => r.group === group).map(r => choiceCard('results', r)).join('')}
      </div>
    `).join('');
  }

  function computeOrientations(){
    const scores = {};
    const reasons = {};
    DATA.pathologies.forEach(p => { scores[p.id] = 0; reasons[p.id] = []; });

    state.choices.symptoms.forEach(symId => {
      const symptom = DATA.bilan.symptoms.find(s => s.id === symId);
      if(!symptom) return;
      symptom.orientations.forEach(id => {
        scores[id] += 1;
        reasons[id].push(`motif : ${symptom.title}`);
      });
    });

    state.choices.results.forEach(resultId => {
      const result = DATA.bilan.results.find(r => r.id === resultId);
      if(!result) return;
      result.orientations.forEach(id => {
        scores[id] += 2;
        reasons[id].push(`résultat : ${result.title}`);
      });
    });

    if(state.choices.redFlags.size > 0){
      scores.central += 5;
      reasons.central.push('drapeau(x) rouge(s) sélectionné(s)');
    }

    const selected = Object.entries(scores)
      .filter(([,score]) => score > 0)
      .sort((a,b) => b[1] - a[1])
      .map(([id,score]) => ({...DATA.pathologies.find(p => p.id === id), score, reasons: uniq(reasons[id])}));

    if(!selected.length){
      return [{ id:'non_oriente', title:'Orientation non déterminée', type:'À compléter', score:0, profile:'Sélectionner des motifs, drapeaux rouges et résultats pour orienter le raisonnement.', signs: [], tests: [], rehab:'Commencer par interrogatoire + oculomotricité + nystagmus spontané + tests selon plainte.' }];
    }
    return selected;
  }

  function renderOrientationCards(orientations){
    return `<div class="vb-summary-grid">
      ${orientations.slice(0,4).map(o => {
        const cls = o.id === 'central' || o.score >= 5 ? 'high' : o.score >= 3 ? 'medium' : 'ok';
        const color = o.id === 'central' ? 'red' : o.score >= 3 ? 'orange' : 'green';
        return `
          <article class="vb-summary-card ${cls}">
            <div class="vb-card-head"><h3>${esc(o.title)}</h3>${badge(o.type || 'Orientation', color)}</div>
            <p>${esc(o.profile || '')}</p>
            ${o.reasons?.length ? `<div class="vb-note info"><strong>Arguments sélectionnés</strong>${list(o.reasons)}</div>` : ''}
            ${o.tests?.length ? `<div><strong>Tests utiles :</strong> ${esc(o.tests.join(', '))}</div>` : ''}
            <div class="vb-note success"><strong>Axe possible</strong>${esc(o.rehab || '')}</div>
          </article>
        `;
      }).join('')}
    </div>`;
  }

  function renderVppbLink(orientations){
    if(!orientations.some(o => o.id === 'vppb')) return '';
    return `
      <a class="vb-link-card" href="vestibulaire.html">
        <div><strong>Orientation VPPB</strong><br><span class="vb-muted">Poursuivre avec la plateforme VPPB dédiée : canal, côté, type de lithiase et manœuvre.</span></div>
        <span>Ouvrir →</span>
      </a>
    `;
  }

  function buildSummaryText(recommendations = computeRecommendations(), orientations = computeOrientations()){
    const selected = (group, arr) => arr.filter(x => state.choices[group].has(x.id)).map(x => x.title);
    const symptoms = selected('symptoms', DATA.bilan.symptoms);
    const red = selected('redFlags', DATA.bilan.redFlags);
    const history = selected('history', DATA.bilan.history);
    const results = selected('results', DATA.bilan.results);
    const orientationLines = orientations.slice(0,3).map(o => `- Compatible/oriente vers : ${o.title}${o.reasons?.length ? ' (' + o.reasons.join('; ') + ')' : ''}`);
    return [
      'SYNTHÈSE DE BILAN VESTIBULAIRE',
      '',
      `Motif(s) sélectionné(s) : ${symptoms.length ? symptoms.join(', ') : 'à compléter'}`,
      `Drapeaux rouges : ${red.length ? red.join(', ') : 'aucun coché'}`,
      `Interrogatoire documenté : ${history.length ? history.join(', ') : 'à compléter'}`,
      '',
      'Tests proposés / utiles :',
      recommendations.length ? recommendations.map(t => `- ${t.title}`).join('\n') : '- à compléter',
      '',
      'Résultats cochés :',
      results.length ? results.map(r => `- ${r}`).join('\n') : '- à compléter',
      '',
      'Orientation clinique prudente :',
      orientationLines.length ? orientationLines.join('\n') : '- non déterminée',
      '',
      'Axes de prise en charge / suivi :',
      '- Formuler en hypothèse compatible, à confirmer par la cohérence clinique.',
      '- Objectiver l’évolution : DHI/EEV/EVA, nystagmus, EVS, CTSIB/SOT si pertinent.',
      '- Réorienter si drapeau rouge, atypie ou évolution défavorable.'
    ].join('\n');
  }

  function renderLibrary(){
    const tabs = [
      ['tests','Tests'], ['pathologies','Pathologies'], ['rehab','Rééducation'], ['bases','Bases']
    ];
    return `
      <div class="vb-tools" style="margin-bottom:14px">
        <input id="librarySearch" class="vb-search" type="search" placeholder="Rechercher : HIT, Ménière, PPPD, optocinétique..." value="${esc(state.libraryQuery)}" />
      </div>
      <div class="vb-tabs">
        ${tabs.map(([id,label]) => `<button type="button" class="vb-tab ${state.libraryType === id ? 'active' : ''}" data-library-type="${id}">${label}</button>`).join('')}
      </div>
      <div id="libraryBody">${renderLibraryItems()}</div>
    `;
  }

  function renderLibraryBody(){
    const body = $('#libraryBody');
    if(body) body.innerHTML = renderLibraryItems();
  }

  function matchesQuery(item){
    if(!state.libraryQuery) return true;
    return JSON.stringify(item).toLowerCase().includes(state.libraryQuery);
  }

  function renderLibraryItems(){
    if(state.libraryType === 'tests'){
      const items = DATA.tests.filter(matchesQuery);
      return items.length ? items.map(t => `
        <details class="vb-details">
          <summary><span>${esc(t.title)}</span>${badge(t.cat,'blue')}</summary>
          <div class="vb-details-body">
            <div class="vb-def-grid">
              <div class="vb-def"><strong>Objectif</strong>${esc(t.objective)}</div>
              <div class="vb-def"><strong>Indication</strong>${esc(t.indication)}</div>
              <div class="vb-def"><strong>Procédure</strong>${esc(t.procedure)}</div>
            </div>
            <div class="vb-note success"><strong>Normal</strong>${esc(t.normal)}</div>
            <div class="vb-note warn"><strong>Pathologique</strong>${esc(t.patho)}</div>
            <div class="vb-note info"><strong>Pièges</strong>${esc(t.traps)}</div>
          </div>
        </details>
      `).join('') : empty();
    }

    if(state.libraryType === 'pathologies'){
      const items = DATA.pathologies.filter(matchesQuery);
      return items.length ? `<div class="vb-grid-2">${items.map(p => `
        <article class="vb-card">
          <div class="vb-card-head"><h3>${esc(p.title)}</h3>${badge(p.type,'purple')}</div>
          <p>${esc(p.profile)}</p>
          <div class="vb-note info"><strong>Signes clés</strong>${list(p.signs)}</div>
          <div class="vb-note success"><strong>Axes</strong>${esc(p.rehab)}</div>
        </article>
      `).join('')}</div>` : empty();
    }

    if(state.libraryType === 'rehab'){
      const items = DATA.rehab.filter(matchesQuery);
      return items.length ? `<div class="vb-grid-2">${items.map(r => `
        <article class="vb-card">
          <div class="vb-card-head"><h3>${esc(r.title)}</h3>${badge(r.for,'green')}</div>
          <p>${esc(r.aim)}</p>
          <div class="vb-note info"><strong>Outils</strong>${list(r.tools)}</div>
          <div class="vb-note warn"><strong>À éviter / prudence</strong>${esc(r.avoid)}</div>
        </article>
      `).join('')}</div>` : empty();
    }

    const items = DATA.bases.filter(matchesQuery);
    return items.length ? `<div class="vb-grid-2">${items.map(b => `
      <article class="vb-card">
        <div class="vb-card-head"><h3>${esc(b.title)}</h3>${badge(b.badge,'blue')}</div>
        <p>${esc(b.text)}</p>
        <div class="vb-note info"><strong>À retenir</strong>${list(b.points)}</div>
      </article>
    `).join('')}</div>` : empty();
  }

  function renderAlgorithms(){
    const symptomRows = DATA.bilan.symptoms.map(s => `<tr><td><strong>${esc(s.title)}</strong><br>${esc(s.desc)}</td><td>${s.tests.map(id => DATA.tests.find(t => t.id === id)?.title).filter(Boolean).join(', ')}</td><td>${s.orientations.map(id => DATA.pathologies.find(p => p.id === id)?.title).filter(Boolean).join(', ')}</td></tr>`).join('');
    const rehabRows = DATA.pathologies.map(p => `<tr><td><strong>${esc(p.title)}</strong><br>${esc(p.profile)}</td><td>${esc(p.tests.join(', '))}</td><td>${esc(p.rehab)}</td></tr>`).join('');
    return `
      <div class="vb-algo">
        <div class="vb-flow">
          <div class="vb-flow-box"><strong>1. Sécurité</strong><p>Drapeaux rouges, signes neuro, centralité, HINTS si contexte aigu.</p></div>
          <div class="vb-arrow">→</div>
          <div class="vb-flow-box"><strong>2. Interrogatoire</strong><p>Début, durée, fréquence, déclencheurs, auditif, migraine, trauma, médicaments.</p></div>
          <div class="vb-arrow">→</div>
          <div class="vb-flow-box"><strong>3. Tests ciblés</strong><p>Oculomotricité, VNS, HIT/HST, positionnels, EVS, CTSIB/questionnaires.</p></div>
        </div>
        <div class="vb-flow">
          <div class="vb-flow-box"><strong>4. Orientation</strong><p>Compatible avec périphérique, central, VPPB, Ménière, bilatéral, PPPD/DNS...</p></div>
          <div class="vb-arrow">→</div>
          <div class="vb-flow-box"><strong>5. Rééducation</strong><p>Compensation, substitution, habituation, optocinétique, VR, fauteuil, ETP.</p></div>
          <div class="vb-arrow">→</div>
          <div class="vb-flow-box"><strong>6. Suivi</strong><p>Objectiver : DHI/EEV/EVA, nystagmus, EVS, CTSIB, tolérance, progression.</p></div>
        </div>

        <div class="vb-panel" style="box-shadow:none">
          <div class="vb-panel-head"><div><h2>Motif → tests → hypothèses</h2><p>Table de décision rapide.</p></div></div>
          <div class="vb-matrix"><table><thead><tr><th>Motif</th><th>Tests prioritaires</th><th>Orientations possibles</th></tr></thead><tbody>${symptomRows}</tbody></table></div>
        </div>

        <div class="vb-panel" style="box-shadow:none">
          <div class="vb-panel-head"><div><h2>Orientation → bilan complémentaire → axe thérapeutique</h2><p>Synthèse pratique.</p></div></div>
          <div class="vb-matrix"><table><thead><tr><th>Orientation</th><th>Tests utiles</th><th>Axe de prise en charge</th></tr></thead><tbody>${rehabRows}</tbody></table></div>
        </div>
      </div>
    `;
  }

  function renderCases(){
    return `<div class="vb-grid-2">
      ${DATA.cases.map((c, index) => `
        <article class="vb-case">
          <div class="vb-card-head"><h3>${esc(c.title)}</h3></div>
          <div class="vb-case-meta">${c.tags.map(t => badge(t, t === 'urgence' ? 'red' : 'blue')).join('')}</div>
          <p>${esc(c.presentation)}</p>
          <div class="vb-case-question"><strong>Questions</strong>${list(c.questions)}</div>
          <button class="vb-btn primary" type="button" data-reveal="case-${index}">Afficher la réponse</button>
          <div id="case-${index}" class="vb-reveal vb-note success"><strong>Correction argumentée</strong>${esc(c.answer)}</div>
        </article>
      `).join('')}
    </div>`;
  }

  function renderChecklists(){
    return `<div class="vb-grid-2">
      ${DATA.checklists.map((c, index) => `
        <article class="vb-checklist">
          <div class="vb-card-head"><h3>${esc(c.title)}</h3><button class="vb-btn ghost" type="button" data-reset-checklist>Reset</button></div>
          <div class="vb-progress"><span></span></div>
          <div class="vb-small vb-muted" data-progress-text>0/${c.items.length}</div>
          <div>${c.items.map((item, i) => `
            <label class="vb-check-item"><input type="checkbox" /> <span>${esc(item)}</span></label>
          `).join('')}</div>
        </article>
      `).join('')}
    </div>`;
  }

  function updateChecklist(card){
    if(!card) return;
    const checks = $$('input[type="checkbox"]', card);
    const done = checks.filter(c => c.checked).length;
    const pct = checks.length ? Math.round(done / checks.length * 100) : 0;
    $('.vb-progress span', card).style.width = `${pct}%`;
    const text = $('[data-progress-text]', card);
    if(text) text.textContent = `${done}/${checks.length} · ${pct}%`;
  }

  function updateAllChecklists(){
    $$('.vb-checklist').forEach(updateChecklist);
  }

  function empty(text='Aucun résultat avec ces critères.'){
    return `<div class="vb-empty">${esc(text)}</div>`;
  }

  function toast(message){
    const t = $('#toast');
    t.textContent = message;
    t.classList.add('visible');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => t.classList.remove('visible'), 1800);
  }

  init();
})();
