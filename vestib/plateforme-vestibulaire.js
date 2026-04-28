(function(){
  const data = window.VESTIB_DATA;
  const app = document.getElementById('app');
  const state = {
    view:'home',
    guidedStep:0,
    motifs:new Set(),
    redFlags:new Set(),
    capteurs:new Set(),
    results:{},
    libraryTab:'tests',
    search:'',
    selectedCase:null,
    caseChoice:{},
    revealedCases:new Set()
  };

  const steps = ['Motif', 'Sécurité', 'Interrogatoire', 'Capteurs', 'Tests proposés', 'Résultats', 'Orientation', 'Prise en charge', 'Suivi'];

  function esc(str){
    return String(str ?? '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
  function list(items){ return `<ul class="mini-list">${(items||[]).map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`; }
  function badges(items, kind='blue'){
    return `<div class="badge-row">${(items||[]).map(b=>`<span class="badge ${kind}">${esc(b)}</span>`).join('')}</div>`;
  }
  function setView(view){ state.view=view; document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active', b.dataset.view===view)); render(); window.scrollTo({top:0, behavior:'smooth'}); }
  document.querySelectorAll('.nav-btn').forEach(btn=>btn.addEventListener('click',()=>setView(btn.dataset.view)));

  function render(){
    if(state.view==='home') renderHome();
    if(state.view==='bilan') renderBilan();
    if(state.view==='bibliotheque') renderLibrary();
    if(state.view==='algorithmes') renderAlgorithms();
    if(state.view==='cas') renderCases();
    if(state.view==='checklists') renderChecklists();
  }

  function renderHome(){
    app.innerHTML = `
      <section class="hero">
        <h1>Plateforme vestibulaire — ${esc(data.version)}</h1>
        <p>Structure finale centrée sur le bilan raisonné : sécurité → interrogatoire → bilan ciblé → orientation prudente → prise en charge → suivi. Les tests restent disponibles en bibliothèque pour la révision rapide.</p>
      </section>
      <section class="grid">
        ${data.homeCards.map(c=>`
          <article class="card clickable" data-home-view="${esc(c.view)}">
            <div class="icon">${c.icon}</div>
            <h2 class="h2">${esc(c.title)}</h2>
            <p class="lead">${esc(c.text)}</p>
            <span class="badge blue">Ouvrir →</span>
          </article>`).join('')}
      </section>
      <section class="grid two" style="margin-top:18px">
        <article class="panel">
          <h2 class="h2">Ce qui a été renforcé</h2>
          ${list(['HINTS visible comme protocole complet et limité au syndrome vestibulaire aigu.','IDs techniques corrigés : VNS, nystagmus spontané, oculomotricité décomposée.','Bilan des capteurs complet : vision, auditif, somatosensoriel, cognitif.','Centralité neurologique renforcée : paires crâniennes, Wallenberg, CBH, cérébelleux.','Rééducation plus protocolisée : fauteuil basse/haute vitesse, fixation/vection, optocinétique, VR, ETP.'])}
        </article>
        <article class="panel">
          <h2 class="h2">Principe pédagogique</h2>
          <p class="lead">Les fiches sont courtes, les algorithmes servent à décider, les checklists servent à ne rien oublier, et les cas cliniques entraînent le raisonnement.</p>
          <div class="note info">Formulations volontairement prudentes : compatible avec, oriente vers, à confirmer, réorientation si doute.</div>
        </article>
      </section>`;
    app.querySelectorAll('[data-home-view]').forEach(el=>el.addEventListener('click',()=>setView(el.dataset.homeView)));
  }

  function renderBilan(){
    app.innerHTML = `
      <section class="hero">
        <h1>🧭 Bilan vestibulaire guidé</h1>
        <p>Parcours interactif. Sélectionne le motif et les signes : les tests proposés se mettent à jour automatiquement. HINTS n’apparaît que dans le contexte adapté.</p>
      </section>
      <div class="layout">
        <aside class="sidebar panel">
          <h2 class="h2">Étapes</h2>
          <div class="step-list">
            ${steps.map((s,i)=>`<button class="step-button ${state.guidedStep===i?'active':''} ${isStepDone(i)?'done':''}" data-step="${i}">${i+1}. ${esc(s)}</button>`).join('')}
          </div>
          <div class="hr"></div>
          <button class="btn ghost" id="resetBilan">Réinitialiser</button>
        </aside>
        <section class="stack" id="bilanContent"></section>
      </div>`;
    app.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{state.guidedStep=Number(b.dataset.step); renderBilan();}));
    app.querySelector('#resetBilan').addEventListener('click',()=>{state.motifs.clear(); state.redFlags.clear(); state.capteurs.clear(); state.results={}; state.guidedStep=0; renderBilan();});
    renderBilanStep();
  }
  function isStepDone(i){
    if(i===0) return state.motifs.size>0;
    if(i===1) return state.redFlags.size>0;
    if(i===3) return state.capteurs.size>0;
    if(i>=4) return getRecommendedTestIds().length>0;
    return false;
  }
  function navButtons(){
    return `<div class="btn-row"><button class="btn" id="prevStep" ${state.guidedStep===0?'disabled':''}>← Précédent</button><button class="btn primary" id="nextStep" ${state.guidedStep===steps.length-1?'disabled':''}>Suivant →</button></div>`;
  }
  function attachNav(){
    const prev=document.getElementById('prevStep'), next=document.getElementById('nextStep');
    if(prev) prev.addEventListener('click',()=>{ if(state.guidedStep>0){state.guidedStep--; renderBilan();} });
    if(next) next.addEventListener('click',()=>{ if(state.guidedStep<steps.length-1){state.guidedStep++; renderBilan();} });
  }
  function renderBilanStep(){
    const root = document.getElementById('bilanContent');
    if(state.guidedStep===0) root.innerHTML = renderMotif();
    if(state.guidedStep===1) root.innerHTML = renderSecurity();
    if(state.guidedStep===2) root.innerHTML = renderInterrogatoire();
    if(state.guidedStep===3) root.innerHTML = renderCapteurs();
    if(state.guidedStep===4) root.innerHTML = renderRecommendedTests();
    if(state.guidedStep===5) root.innerHTML = renderResults();
    if(state.guidedStep===6) root.innerHTML = renderOrientation();
    if(state.guidedStep===7) root.innerHTML = renderPriseEnCharge();
    if(state.guidedStep===8) root.innerHTML = renderSuivi();
    attachBilanEvents(); attachNav();
  }
  function renderMotif(){
    return `<article class="panel"><h2 class="h2">1. Motif de consultation</h2><p class="lead">Sélectionne un ou plusieurs profils. Le choix détermine les tests proposés.</p><div class="check-grid">${data.motifs.map(m=>`<label class="check-item"><input type="checkbox" data-motif="${m.id}" ${state.motifs.has(m.id)?'checked':''}/><span><strong>${esc(m.label)}</strong><br><small class="muted">${esc(m.warning)}</small></span></label>`).join('')}</div>${navButtons()}</article>`;
  }
  function renderSecurity(){
    const danger = state.redFlags.size>0;
    return `<article class="panel"><h2 class="h2">2. Triage sécurité / drapeaux rouges</h2><p class="lead">Tout signe central ou doute impose une conduite prudente avant traitement vestibulaire.</p>${danger?'<div class="note danger"><strong>Alerte sélectionnée :</strong> réorientation ou avis médical à envisager avant traitement.</div>':'<div class="note info">Aucun drapeau rouge sélectionné pour l’instant. Continuer le bilan ciblé.</div>'}<div class="check-grid">${data.redFlags.map(r=>`<label class="check-item"><input type="checkbox" data-redflag="${r.id}" ${state.redFlags.has(r.id)?'checked':''}/><span>${esc(r.label)}</span></label>`).join('')}</div><div class="note warn"><strong>HINTS :</strong> à utiliser comme protocole complet seulement si syndrome vestibulaire aigu compatible, pas comme une checklist générique.</div>${navButtons()}</article>`;
  }
  function renderInterrogatoire(){
    return `<article class="panel"><h2 class="h2">3. Interrogatoire structuré</h2><div class="field-grid">
      ${field('debut','Début / évolution','Date, aiguë ou chronique')}
      ${field('nature','Nature du trouble','Vertige rotatoire, instabilité, ébriété, oscillopsie...')}
      ${field('duree','Durée réelle des crises','Secondes, minutes, heures, jours')}
      ${field('frequence','Fréquence','Inaugural, itératif, calendrier')}
      ${field('declencheurs','Déclencheurs','Position, effort, stress, grands espaces, fatigue')}
      ${field('associes','Signes associés','Auditifs, neurovégétatifs, céphalées, migraines, cervicalgies, trauma')}
      ${field('traitements','Traitements / pathologies','Bêtabloquants, Cordarone, ototoxiques, cardio, vision')}
      ${field('objectif','Question clinique principale','Ce que je cherche à trier')}
    </div>${navButtons()}</article>`;
  }
  function field(id,label,placeholder){ return `<div class="field"><label for="${id}">${label}</label><textarea id="${id}" data-field="${id}" placeholder="${placeholder}">${esc(state.results[id]||'')}</textarea></div>`; }
  function renderCapteurs(){
    return `<article class="panel"><h2 class="h2">4. Bilan des capteurs</h2><p class="lead">À intégrer avant de conclure vestibulaire pur : les entrées visuelle, auditive, somatosensorielle et cognitive peuvent modifier l’équilibre et l’interprétation.</p><div class="grid two">${data.capteurs.map(c=>`<div class="card"><div class="icon">${c.icon}</div><h3 class="h3">${esc(c.title)}</h3>${c.items.map((it,idx)=>`<label class="check-item"><input type="checkbox" data-capteur="${c.id}:${idx}" ${state.capteurs.has(`${c.id}:${idx}`)?'checked':''}/><span>${esc(it)}</span></label>`).join('')}</div>`).join('')}</div>${navButtons()}</article>`;
  }
  function getRecommendedTestIds(){
    const ids = new Set();
    state.motifs.forEach(mid=>{
      const motif = data.motifs.find(m=>m.id===mid);
      if(!motif) return;
      motif.tests.forEach(t=>ids.add(t));
    });
    // HINTS remains restricted: only with acute continuous profile or explicit HINTS central flag.
    if(!state.motifs.has('vertige_aigu_continu') && !state.redFlags.has('hints_central')) ids.delete('hints');
    if(state.redFlags.size>0){ ['saccades','poursuite','fixation','conjugaison','skew','ifo'].forEach(id=>ids.add(id)); }
    return [...ids];
  }
  function renderRecommendedTests(){
    const ids = getRecommendedTestIds();
    const cards = ids.map(id=>data.tests.find(t=>t.id===id)).filter(Boolean);
    const missing = ids.filter(id=>!data.tests.find(t=>t.id===id));
    return `<article class="panel"><h2 class="h2">5. Tests proposés</h2>${ids.length?'<p class="lead">Tests proposés selon les motifs et drapeaux rouges sélectionnés.</p>':'<div class="note warn">Aucun motif sélectionné : retourne à l’étape 1.</div>'}${missing.length?`<div class="note danger">IDs manquants : ${missing.map(esc).join(', ')}</div>`:''}<div class="grid two">${cards.map(t=>renderTestCard(t,true)).join('')}</div>${state.motifs.has('vertige_aigu_continu')?'<div class="note danger"><strong>HINTS visible :</strong> contexte aigu continu sélectionné. Interpréter HIT + nystagmus + skew ensemble.</div>':'<div class="note info"><strong>HINTS non proposé automatiquement :</strong> profil non aigu continu. Les composants peuvent rester utiles isolément selon le bilan.</div>'}${navButtons()}</article>`;
  }
  function renderResults(){
    const ids = getRecommendedTestIds();
    return `<article class="panel"><h2 class="h2">6. Saisie rapide des résultats</h2><p class="lead">Saisie volontairement simple pour générer une synthèse prudente.</p><div class="field-grid">${ids.map(id=>{const t=data.tests.find(x=>x.id===id); return `<div class="field"><label>${esc(t?t.title:id)}</label><select data-result="${id}"><option value="">Non renseigné</option><option ${state.results[id]==='normal'?'selected':''} value="normal">Normal / rassurant</option><option ${state.results[id]==='peripherique'?'selected':''} value="peripherique">Anormal compatible périphérique</option><option ${state.results[id]==='central'?'selected':''} value="central">Anormal / alerte centrale</option><option ${state.results[id]==='atypique'?'selected':''} value="atypique">Atypique / à reconsidérer</option></select></div>`}).join('')}</div>${navButtons()}</article>`;
  }
  function inferOrientations(){
    const o = new Set();
    state.motifs.forEach(mid=>{ const m=data.motifs.find(x=>x.id===mid); (m?.orientations||[]).forEach(x=>o.add(x)); });
    if(state.redFlags.size>0) o.add('atteinte_centrale');
    Object.entries(state.results).forEach(([id,val])=>{
      if(val==='central'||val==='atypique') o.add('atteinte_centrale');
      if(['hit','vhit','acuite_visuelle_dynamique'].includes(id)&&val==='peripherique') o.add('areflexie_bilat');
      if(id==='nystagmus_position'&&val==='peripherique') o.add('vppb');
    });
    return [...o];
  }
  function renderOrientation(){
    const ids = inferOrientations();
    const paths = ids.map(id=>data.pathologies.find(p=>p.id===id)).filter(Boolean);
    return `<article class="panel"><h2 class="h2">7. Orientation clinique prudente</h2><div class="note info">L’outil ne pose pas un diagnostic certain : il affiche des orientations compatibles et les éléments à confirmer.</div>${state.redFlags.size?'<div class="note danger"><strong>Drapeau rouge présent :</strong> priorité sécurité/réorientation avant traitement.</div>':''}<div class="grid two">${paths.map(p=>renderPathologyCard(p)).join('') || '<div class="note warn">Sélection insuffisante pour orienter.</div>'}</div>${navButtons()}</article>`;
  }
  function renderPriseEnCharge(){
    const related = chooseRehab();
    return `<article class="panel"><h2 class="h2">8. Axes de prise en charge</h2><p class="lead">Axes compatibles avec les orientations. À adapter au patient, au bilan et au matériel.</p><div class="grid two">${related.map(r=>renderRehabCard(r)).join('')}</div>${navButtons()}</article>`;
  }
  function chooseRehab(){
    const ori = inferOrientations();
    const ids = new Set(['etp']);
    if(ori.includes('dpa')) ids.add('compensation');
    if(ori.includes('areflexie_bilat')) ids.add('substitution'), ids.add('stabilisation_regard');
    if(ori.includes('pppd')||ori.includes('dependance_visuelle')||ori.includes('dns')||ori.includes('cinetose')||ori.includes('syndrome_autoroute')) ids.add('habituation'), ids.add('optocinetique'), ids.add('vr');
    if(ori.includes('meniere')) ids.add('fauteuil_basse');
    if(ori.includes('atteinte_centrale')) ids.add('fauteuil_basse'), ids.add('posturographie_rehab');
    if(ids.size===1) ['compensation','substitution','habituation'].forEach(id=>ids.add(id));
    return [...ids].map(id=>data.rehab.find(r=>r.id===id)).filter(Boolean);
  }
  function renderSuivi(){
    const synthesis = buildSynthesis();
    return `<article class="panel"><h2 class="h2">9. Suivi / synthèse exportable</h2><p class="lead">Comparer pré / per / post : symptômes, nystagmus, EVS, CTSIB/SOT, questionnaires et tolérance.</p><div class="split"><div>${renderChecklistMini('Suivi / re-bilan')}</div><div><h3 class="h3">Synthèse</h3><pre class="result-box" id="syntheseText">${esc(synthesis)}</pre><div class="btn-row"><button class="btn primary" id="copySynthese">Copier la synthèse</button><button class="btn" onclick="window.print()">Imprimer</button></div></div></div>${navButtons()}</article>`;
  }
  function buildSynthesis(){
    const motifs = [...state.motifs].map(id=>data.motifs.find(m=>m.id===id)?.label).filter(Boolean);
    const flags = [...state.redFlags].map(id=>data.redFlags.find(r=>r.id===id)?.label).filter(Boolean);
    const tests = getRecommendedTestIds().map(id=>data.tests.find(t=>t.id===id)?.title||id);
    const orientations = inferOrientations().map(id=>data.pathologies.find(p=>p.id===id)?.title||id);
    const res = Object.entries(state.results).filter(([k,v])=>v && !['debut','nature','duree','frequence','declencheurs','associes','traitements','objectif'].includes(k)).map(([k,v])=>`${data.tests.find(t=>t.id===k)?.title||k}: ${v}`);
    return `Synthèse de bilan vestibulaire\n\nMotifs sélectionnés :\n- ${motifs.join('\n- ') || 'Non renseigné'}\n\nDrapeaux rouges :\n- ${flags.join('\n- ') || 'Aucun sélectionné'}\n\nTests proposés / réalisés :\n- ${tests.join('\n- ') || 'Non renseigné'}\n\nRésultats saisis :\n- ${res.join('\n- ') || 'Non renseigné'}\n\nOrientations prudentes :\n- ${orientations.join('\n- ') || 'À compléter'}\n\nConduite :\n- Si signe central ou doute : réorientation / avis médical.\n- Si VPPB compatible : préciser canal, côté, lithiase et renvoyer plateforme VPPB.\n- Suivi : DHI/EEV/EVA, nystagmus, EVS, CTSIB/SOT, tolérance neurovégétative.`;
  }
  function renderChecklistMini(title){
    const c = data.checklists.find(x=>x.title===title) || data.checklists.find(x=>x.title.includes(title));
    return `<h3 class="h3">${esc(c?.title||title)}</h3>${list(c?.items||[])}`;
  }
  function attachBilanEvents(){
    app.querySelectorAll('[data-motif]').forEach(input=>input.addEventListener('change',e=>{toggleSet(state.motifs,e.target.dataset.motif,e.target.checked); renderBilan();}));
    app.querySelectorAll('[data-redflag]').forEach(input=>input.addEventListener('change',e=>{toggleSet(state.redFlags,e.target.dataset.redflag,e.target.checked); renderBilan();}));
    app.querySelectorAll('[data-capteur]').forEach(input=>input.addEventListener('change',e=>{toggleSet(state.capteurs,e.target.dataset.capteur,e.target.checked);}));
    app.querySelectorAll('[data-field]').forEach(el=>el.addEventListener('input',e=>{state.results[e.target.dataset.field]=e.target.value;}));
    app.querySelectorAll('[data-result]').forEach(el=>el.addEventListener('change',e=>{state.results[e.target.dataset.result]=e.target.value;}));
    const copy=document.getElementById('copySynthese'); if(copy) copy.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(document.getElementById('syntheseText').textContent); copy.textContent='Copié ✓';}catch(e){copy.textContent='Copie impossible';}});
  }
  function toggleSet(set,val,on){ on?set.add(val):set.delete(val); }

  function renderTestCard(t, compact=false){
    return `<article class="card test-card"><div>${badges(t.badges,'blue')}<h3 class="h3">${esc(t.title)}</h3><p class="muted"><strong>${esc(t.category)}</strong></p><p>${esc(t.indication)}</p></div>${compact?`<details><summary>Voir protocole / interprétation</summary>${testDetails(t)}</details>`:testDetails(t)}</article>`;
  }
  function testDetails(t){return `<h4>Protocole</h4>${list(t.protocole)}<h4>Normal</h4><p>${esc(t.normal)}</p><h4>Pathologique</h4><p>${esc(t.pathologique)}</p><h4>Interprétation</h4><p>${esc(t.interpretation)}</p>${t.pitfalls?`<h4>Pièges</h4>${list(t.pitfalls)}`:''}`;}
  function renderPathologyCard(p){return `<article class="card"><span class="badge purple">${esc(p.type)}</span><h3 class="h3">${esc(p.title)}</h3><p><strong>Temporalité :</strong> ${esc(p.tempo)}</p><p>${esc(p.profile)}</p><p><strong>Tests :</strong> ${esc((p.tests||[]).join(', '))}</p><p><strong>Axes :</strong> ${esc(p.rehab)}</p><div class="note warn"><strong>Piège :</strong> ${esc(p.pitfalls)}</div></article>`;}
  function renderRehabCard(r){return `<article class="card"><span class="badge green">${esc(r.context)}</span><h3 class="h3">${esc(r.title)}</h3><h4>Progression</h4>${list(r.steps)}<h4>Signes d’arrêt / prudence</h4>${list(r.stop)}</article>`;}

  function renderLibrary(){
    const tabs = [['tests','Tests'],['pathologies','Pathologies'],['rehab','Rééducation'],['capteurs','Capteurs'],['bases','Bases'],['neuro','Centralité neuro']];
    app.innerHTML = `<section class="hero"><h1>📚 Réviser / consulter</h1><p>Bibliothèque rapide, séparée du parcours clinique guidé.</p></section><div class="tabs">${tabs.map(([id,label])=>`<button class="tab-btn ${state.libraryTab===id?'active':''}" data-tab="${id}">${label}</button>`).join('')}</div><input class="search" id="search" placeholder="Rechercher : HINTS, HIT, skew, Ménière, PPPD..." value="${esc(state.search)}"/><div id="libraryContent" style="margin-top:18px"></div>`;
    app.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{state.libraryTab=b.dataset.tab; renderLibrary();}));
    app.querySelector('#search').addEventListener('input',e=>{state.search=e.target.value.toLowerCase(); renderLibraryContent();});
    renderLibraryContent();
  }
  function renderLibraryContent(){
    const q = state.search;
    const root = document.getElementById('libraryContent');
    if(state.libraryTab==='tests'){
      const items=data.tests.filter(t=>match(t,q));
      root.innerHTML=`<div class="grid two">${items.map(t=>renderTestCard(t)).join('')}</div>`;
    }
    if(state.libraryTab==='pathologies'){
      const items=data.pathologies.filter(p=>match(p,q));
      root.innerHTML=`<div class="grid two">${items.map(renderPathologyCard).join('')}</div>`;
    }
    if(state.libraryTab==='rehab'){
      const items=data.rehab.filter(r=>match(r,q));
      root.innerHTML=`<div class="grid two">${items.map(renderRehabCard).join('')}</div>`;
    }
    if(state.libraryTab==='capteurs'){
      root.innerHTML=`<div class="grid two">${data.capteurs.map(c=>`<article class="card"><div class="icon">${c.icon}</div><h3 class="h3">${esc(c.title)}</h3>${list(c.items)}</article>`).join('')}</div>`;
    }
    if(state.libraryTab==='bases'){
      root.innerHTML=`<div class="grid two">${data.bases.map(b=>`<article class="card"><h3 class="h3">${esc(b.title)}</h3><p class="lead">${esc(b.text)}</p></article>`).join('')}</div>`;
    }
    if(state.libraryTab==='neuro'){
      root.innerHTML=`<div class="grid two">${data.neuro.map(n=>`<article class="card"><h3 class="h3">${esc(n.title)}</h3>${list(n.items)}</article>`).join('')}</div>`;
    }
  }
  function match(obj,q){ return !q || JSON.stringify(obj).toLowerCase().includes(q); }

  function renderAlgorithms(){
    app.innerHTML=`<section class="hero"><h1>🔀 Algorithmes décisionnels</h1><p>Représentation synthétique par situation clinique.</p></section><div class="grid two">${data.algorithms.map(a=>`<article class="panel"><h2 class="h2">${esc(a.title)}</h2><div class="flow">${a.steps.map((s,i)=>`<div class="flow-step"><div class="flow-num">${i+1}</div><div class="flow-box">${esc(s)}</div></div>${i<a.steps.length-1?'<div class="flow-arrow">↓</div>':''}`).join('')}</div></article>`).join('')}</div>`;
  }
  function renderCases(){
    if(!state.selectedCase) state.selectedCase=data.cases[0].id;
    const c = data.cases.find(x=>x.id===state.selectedCase);
    const choice = state.caseChoice[c.id];
    const revealed = state.revealedCases.has(c.id);
    app.innerHTML=`<section class="hero"><h1>🧪 Cas cliniques interactifs</h1><p>Choisis une réponse, puis affiche l’explication.</p></section><div class="layout"><aside class="sidebar panel"><h2 class="h2">Cas</h2><div class="step-list">${data.cases.map(x=>`<button class="step-button ${x.id===c.id?'active':''}" data-case="${x.id}">${esc(x.title)}</button>`).join('')}</div></aside><section class="panel"><h2 class="h2">${esc(c.title)}</h2><p class="lead">${esc(c.intro)}</p><h3 class="h3">${esc(c.question)}</h3><div class="case-options">${c.options.map((o,i)=>`<button class="option ${choice===i?'selected':''} ${revealed && i===c.correct?'correct':''} ${revealed && choice===i && i!==c.correct?'incorrect':''}" data-choice="${i}">${esc(o)}</button>`).join('')}</div><div class="btn-row" style="margin-top:14px"><button class="btn primary" id="revealCase">Afficher la réponse</button><button class="btn" id="resetCase">Réessayer</button></div><div class="reveal ${revealed?'visible':''}"><div class="note success"><strong>Réponse :</strong> ${esc(c.options[c.correct])}</div><p>${esc(c.explanation)}</p><div class="note warn"><strong>Piège :</strong> ${esc(c.trap)}</div></div></section></div>`;
    app.querySelectorAll('[data-case]').forEach(b=>b.addEventListener('click',()=>{state.selectedCase=b.dataset.case; renderCases();}));
    app.querySelectorAll('[data-choice]').forEach(b=>b.addEventListener('click',()=>{state.caseChoice[c.id]=Number(b.dataset.choice); renderCases();}));
    app.querySelector('#revealCase').addEventListener('click',()=>{state.revealedCases.add(c.id); renderCases();});
    app.querySelector('#resetCase').addEventListener('click',()=>{delete state.caseChoice[c.id]; state.revealedCases.delete(c.id); renderCases();});
  }
  function renderChecklists(){
    app.innerHTML=`<section class="hero"><h1>✅ Checklists</h1><p>Checklists opérationnelles : HINTS est séparé et clairement contextualisé.</p></section><div class="grid two">${data.checklists.map(c=>`<article class="card"><h2 class="h2">${esc(c.title)}</h2>${c.title.includes('HINTS')?'<div class="note danger">À utiliser seulement dans le contexte indiqué.</div>':''}${c.items.map((it,i)=>`<label class="check-item"><input type="checkbox"/><span>${esc(it)}</span></label>`).join('')}</article>`).join('')}</div>`;
  }

  render();
})();
