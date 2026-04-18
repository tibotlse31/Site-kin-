window.VPPBUI = (() => {
  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function card({ title, text, icon = '•', action = null, meta = '' }) {
    const attrs = action
      ? `class="card clickable" data-action="${action.type}" ${Object.entries(action.payload || {})
          .map(([k, v]) => `data-${k}="${escapeHtml(v)}"`)
          .join(' ')}`
      : `class="card"`;

    return `
      <article ${attrs}>
        <div class="card-icon">${icon}</div>
        <h3 class="card-title">${escapeHtml(title)}</h3>
        <p>${escapeHtml(text)}</p>
        ${meta ? `<p class="card-meta">${escapeHtml(meta)}</p>` : ''}
      </article>
    `;
  }

  function detailsBlock(title, content) {
    return `
      <details class="more">
        <summary>${escapeHtml(title)}</summary>
        <div class="note" style="margin-top: 10px;">${content}</div>
      </details>
    `;
  }

  function choiceButtons({ items, selectedValue, action, formatter }) {
    if (!items.length) {
      return `<div class="empty-state">Aucune option disponible à ce stade.</div>`;
    }

    return `
      <div class="choice-grid">
        ${items
          .map(item => {
            const label = formatter ? formatter(item) : item;
            const isActive = item === selectedValue ? 'is-active' : '';
            return `
              <button
                class="choice-button ${isActive}"
                data-action="${action}"
                data-value="${escapeHtml(item)}"
              >
                ${escapeHtml(label)}
              </button>
            `;
          })
          .join('')}
      </div>
    `;
  }

  function renderLabyrinthSVG(selection, outcome) {
    const canal = selection.canal || 'posterior';
    const rightSide = selection.side !== 'left';
    const mirror = rightSide ? 1 : -1;
    const highlight = '#1f6fd1';
    const neutral = '#bfd2e6';
    const ampouleX = rightSide ? 470 : 130;
    const utricleX = 300;
    const arrowColor = '#13a38b';
    const particleX = rightSide ? 418 : 182;

    let canalPath = '';
    let secondaryPath = '';
    let tertiaryPath = '';

    if (canal === 'posterior') {
      canalPath = `M ${300 + mirror * 30} 290 C ${300 + mirror * 130} 250, ${300 + mirror * 170} 150, ${300 + mirror * 120} 85`;
      secondaryPath = `M 220 210 C 210 150, 230 105, 270 70`;
      tertiaryPath = `M 380 210 C 390 150, 370 105, 330 70`;
    } else if (canal === 'horizontal') {
      canalPath = `M 140 180 C 190 120, 410 120, 460 180 C 410 240, 190 240, 140 180`;
      secondaryPath = `M 220 260 C 200 180, 225 95, 280 55`;
      tertiaryPath = `M 380 260 C 400 180, 375 95, 320 55`;
    } else {
      canalPath = `M ${300 - mirror * 30} 290 C ${300 - mirror * 130} 250, ${300 - mirror * 170} 150, ${300 - mirror * 120} 85`;
      secondaryPath = `M 220 210 C 210 150, 230 105, 270 70`;
      tertiaryPath = `M 380 210 C 390 150, 370 105, 330 70`;
    }

    const flowArrow =
      canal === 'horizontal'
        ? (rightSide
            ? `<path d="M150 180 L230 180" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
               <path d="M220 170 L240 180 L220 190" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
            : `<path d="M450 180 L370 180" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
               <path d="M380 170 L360 180 L380 190" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`)
        : (rightSide
            ? `<path d="M390 120 L445 92" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
               <path d="M430 86 L448 90 L438 105" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`
            : `<path d="M210 120 L155 92" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
               <path d="M170 86 L152 90 L162 105" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`);

    const particleGroup =
      canal === 'horizontal'
        ? `
          <circle cx="${rightSide ? 395 : 205}" cy="180" r="8" fill="#ef5b5b"/>
          <circle cx="${rightSide ? 379 : 221}" cy="172" r="6" fill="#ef5b5b"/>
          <circle cx="${rightSide ? 379 : 221}" cy="189" r="5" fill="#ef5b5b"/>
        `
        : `
          <circle cx="${particleX}" cy="138" r="8" fill="#ef5b5b"/>
          <circle cx="${particleX + (rightSide ? -14 : 14)}" cy="152" r="6" fill="#ef5b5b"/>
          <circle cx="${particleX + (rightSide ? -3 : 3)}" cy="166" r="5" fill="#ef5b5b"/>
        `;

    const nystagmusMini = renderNystagmusMini(outcome?.expectedNystagmus || '');

    return `
      <svg class="visual-svg" viewBox="0 0 600 420" role="img" aria-label="Schéma vestibulaire">
        <rect x="0" y="0" width="600" height="420" rx="18" fill="#fbfdff"/>
        <circle cx="${utricleX}" cy="230" r="34" fill="#edf4ff" stroke="#8ab2e4" stroke-width="3"/>
        <text x="${utricleX}" y="236" text-anchor="middle" font-size="14" fill="#305a86" font-family="Open Sans">Utricule</text>

        <path d="${secondaryPath}" fill="none" stroke="${canal === 'anterior' ? neutral : neutral}" stroke-width="18" stroke-linecap="round"/>
        <path d="${tertiaryPath}" fill="none" stroke="${canal === 'posterior' ? neutral : neutral}" stroke-width="18" stroke-linecap="round"/>
        <path d="${canalPath}" fill="none" stroke="${highlight}" stroke-width="20" stroke-linecap="round"/>

        <circle cx="${ampouleX}" cy="${canal === 'horizontal' ? 180 : 92}" r="22" fill="#cde8e1" stroke="#6fbaa8" stroke-width="3"/>
        <text x="${ampouleX}" y="${canal === 'horizontal' ? 150 : 58}" text-anchor="middle" font-size="13" fill="#305a86" font-family="Open Sans">
          Ampoule
        </text>

        ${particleGroup}
        ${flowArrow}

        <text x="44" y="32" font-size="18" font-family="Montserrat" fill="#17324d">
          ${escapeHtml(
            outcome?.title ||
            'Visualisation pédagogique'
          )}
        </text>

        <g transform="translate(360,300)">
          ${nystagmusMini}
        </g>

        <text x="40" y="385" font-size="13" fill="#587089" font-family="Open Sans">
          Canal sélectionné en bleu • Débris en rouge • Flux en vert
        </text>
      </svg>
    `;
  }

  function renderNystagmusMini(text) {
    const normalized = text.toLowerCase();

    if (normalized.includes('horizontal')) {
      return `
        <text x="0" y="-18" font-size="13" fill="#305a86" font-family="Open Sans">Nystagmus</text>
        <path d="M0 0 L80 0" stroke="#1f6fd1" stroke-width="5" stroke-linecap="round"/>
        <path d="M68 -10 L82 0 L68 10" fill="none" stroke="#1f6fd1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    }

    if (normalized.includes('vertical inférieur')) {
      return `
        <text x="0" y="-18" font-size="13" fill="#305a86" font-family="Open Sans">Nystagmus</text>
        <path d="M40 -25 L40 35" stroke="#1f6fd1" stroke-width="5" stroke-linecap="round"/>
        <path d="M30 23 L40 38 L50 23" fill="none" stroke="#1f6fd1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      `;
    }

    return `
      <text x="0" y="-18" font-size="13" fill="#305a86" font-family="Open Sans">Nystagmus</text>
      <path d="M18 8 C 25 -15, 58 -18, 66 10" fill="none" stroke="#1f6fd1" stroke-width="5" stroke-linecap="round"/>
      <path d="M58 2 L68 12 L54 14" fill="none" stroke="#1f6fd1" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }

  return {
    escapeHtml,
    card,
    detailsBlock,
    choiceButtons,
    renderLabyrinthSVG
  };
})();
