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

  function renderGlobalOrientationSVG(selection) {
    const canal = selection.canal || 'posterior';

    return `
      <svg class="visual-svg small" viewBox="0 0 360 180" role="img" aria-label="Vue globale d’orientation">
        <rect x="0" y="0" width="360" height="180" rx="16" fill="#fbfdff"/>
        <circle cx="180" cy="95" r="20" fill="#edf4ff" stroke="#8ab2e4" stroke-width="2.5"/>
        <text x="180" y="100" text-anchor="middle" font-size="11" fill="#305a86" font-family="Open Sans">Utricule</text>

        <path d="M110 112 C95 72, 112 34, 145 18" fill="none" stroke="${canal === 'posterior' ? '#216dd1' : '#c8d7e8'}" stroke-width="${canal === 'posterior' ? 12 : 8}" stroke-linecap="round"/>
        <path d="M250 112 C265 72, 248 34, 215 18" fill="none" stroke="${canal === 'anterior' ? '#216dd1' : '#c8d7e8'}" stroke-width="${canal === 'anterior' ? 12 : 8}" stroke-linecap="round"/>
        <ellipse cx="180" cy="96" rx="108" ry="42" fill="none" stroke="${canal === 'horizontal' ? '#216dd1' : '#c8d7e8'}" stroke-width="${canal === 'horizontal' ? 12 : 8}"/>

        <text x="74" y="28" font-size="11" fill="#587089" font-family="Open Sans">Postérieur</text>
        <text x="238" y="28" font-size="11" fill="#587089" font-family="Open Sans">Antérieur</text>
        <text x="145" y="156" font-size="11" fill="#587089" font-family="Open Sans">Horizontal</text>
      </svg>
    `;
  }

  function renderCanalPlaneSVG(selection, outcome) {
    const canal = selection.canal || 'posterior';
    const side = selection.side || 'right';
    const rightSide = side !== 'left';
    const ampouleX = rightSide ? 480 : 120;
    const particleX = rightSide ? 430 : 170;
    const mainColor = '#216dd1';
    const neutral = '#d7e3f0';
    const arrowColor = '#16a085';

    let pathMain = '';
    let ampouleY = 90;
    let title = 'Plan du canal sélectionné';
    let planeLabel = '';
    let flowArrow = '';
    let particles = '';

    if (canal === 'posterior') {
      title = 'Plan du canal postérieur';
      planeLabel = 'Plan vertical oblique postérieur';
      pathMain = rightSide
        ? `M 270 280 C 360 238, 430 168, 472 96`
        : `M 330 280 C 240 238, 170 168, 128 96`;
      flowArrow = rightSide
        ? `<path d="M385 162 L447 112" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
           <path d="M432 106 L450 110 L442 126" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linejoin="round"/>`
        : `<path d="M215 162 L153 112" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
           <path d="M168 106 L150 110 L158 126" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linejoin="round"/>`;
      particles = `
        <circle cx="${particleX}" cy="170" r="8" fill="#ef5b5b"/>
        <circle cx="${particleX + (rightSide ? -14 : 14)}" cy="186" r="6" fill="#ef5b5b"/>
        <circle cx="${particleX + (rightSide ? -6 : 6)}" cy="201" r="5" fill="#ef5b5b"/>
      `;
    } else if (canal === 'horizontal') {
      title = 'Plan du canal horizontal';
      planeLabel = 'Plan horizontal';
      ampouleY = 170;
      pathMain = `M 128 170 C 190 120, 410 120, 472 170 C 410 220, 190 220, 128 170`;
      flowArrow = rightSide
        ? `<path d="M332 170 L420 170" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
           <path d="M405 160 L425 170 L405 180" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linejoin="round"/>`
        : `<path d="M268 170 L180 170" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
           <path d="M195 160 L175 170 L195 180" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linejoin="round"/>`;
      particles = `
        <circle cx="${rightSide ? 300 : 260}" cy="170" r="8" fill="#ef5b5b"/>
        <circle cx="${rightSide ? 286 : 274}" cy="182" r="6" fill="#ef5b5b"/>
        <circle cx="${rightSide ? 318 : 242}" cy="160" r="5" fill="#ef5b5b"/>
      `;
    } else {
      title = 'Plan du canal antérieur';
      planeLabel = 'Plan vertical oblique antérieur';
      pathMain = rightSide
        ? `M 330 280 C 420 238, 460 160, 480 96`
        : `M 270 280 C 180 238, 140 160, 120 96`;
      flowArrow = rightSide
        ? `<path d="M408 148 L470 108" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
           <path d="M454 102 L472 106 L464 122" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linejoin="round"/>`
        : `<path d="M192 148 L130 108" stroke="${arrowColor}" stroke-width="5" stroke-linecap="round"/>
           <path d="M146 102 L128 106 L136 122" fill="none" stroke="${arrowColor}" stroke-width="5" stroke-linejoin="round"/>`;
      particles = `
        <circle cx="${particleX}" cy="150" r="8" fill="#ef5b5b"/>
        <circle cx="${particleX + (rightSide ? -12 : 12)}" cy="166" r="6" fill="#ef5b5b"/>
        <circle cx="${particleX + (rightSide ? -20 : 20)}" cy="182" r="5" fill="#ef5b5b"/>
      `;
    }

    return `
      <svg class="visual-svg" viewBox="0 0 600 340" role="img" aria-label="${escapeHtml(title)}">
        <rect x="0" y="0" width="600" height="340" rx="18" fill="#fbfdff"/>
        <text x="24" y="30" font-size="18" fill="#17324d" font-family="Montserrat">${escapeHtml(title)}</text>
        <text x="24" y="52" font-size="12" fill="#617a93" font-family="Open Sans">${escapeHtml(planeLabel)}</text>

        <circle cx="300" cy="250" r="30" fill="#edf4ff" stroke="#8ab2e4" stroke-width="3"/>
        <text x="300" y="255" text-anchor="middle" font-size="14" fill="#305a86" font-family="Open Sans">Utricule</text>

        ${canal !== 'horizontal'
          ? `
            <path d="M220 110 C 210 70, 230 40, 260 18" fill="none" stroke="${canal === 'anterior' ? neutral : '#c8d7e8'}" stroke-width="16" stroke-linecap="round"/>
            <path d="M380 110 C 390 70, 370 40, 340 18" fill="none" stroke="${canal === 'posterior' ? neutral : '#c8d7e8'}" stroke-width="16" stroke-linecap="round"/>
          `
          : `
            <path d="M220 110 C 210 70, 230 40, 260 18" fill="none" stroke="${neutral}" stroke-width="12" stroke-linecap="round"/>
            <path d="M380 110 C 390 70, 370 40, 340 18" fill="none" stroke="${neutral}" stroke-width="12" stroke-linecap="round"/>
          `
        }

        <path d="${pathMain}" fill="none" stroke="${mainColor}" stroke-width="20" stroke-linecap="round"/>

        <circle cx="${ampouleX}" cy="${ampouleY}" r="22" fill="#cfe9e2" stroke="#68b79f" stroke-width="3"/>
        <text x="${ampouleX}" y="${ampouleY - 34}" text-anchor="middle" font-size="13" fill="#305a86" font-family="Open Sans">Ampoule</text>

        ${particles}
        ${flowArrow}

        <text x="24" y="313" font-size="12" fill="#617a93" font-family="Open Sans">
          Bleu : canal étudié • Rouge : débris • Vert : sens de déplacement
        </text>
      </svg>
    `;
  }

  function renderNystagmusSVG(text) {
    const normalized = String(text).toLowerCase();

    let drawing = '';
    let title = 'Nystagmus attendu';

    if (normalized.includes('horizontal')) {
      drawing = `
        <text x="18" y="28" font-size="13" fill="#617a93" font-family="Open Sans">Horizontal</text>
        <path d="M40 82 L220 82" stroke="#216dd1" stroke-width="6" stroke-linecap="round"/>
        <path d="M200 68 L224 82 L200 96" fill="none" stroke="#216dd1" stroke-width="6" stroke-linejoin="round"/>
      `;
    } else if (normalized.includes('vertical inférieur')) {
      drawing = `
        <text x="18" y="28" font-size="13" fill="#617a93" font-family="Open Sans">Vertical inférieur</text>
        <path d="M128 42 L128 126" stroke="#216dd1" stroke-width="6" stroke-linecap="round"/>
        <path d="M114 104 L128 126 L142 104" fill="none" stroke="#216dd1" stroke-width="6" stroke-linejoin="round"/>
      `;
    } else {
      drawing = `
        <text x="18" y="28" font-size="13" fill="#617a93" font-family="Open Sans">Torsionnel / vertical supérieur</text>
        <path d="M78 98 C 90 55, 158 50, 176 95" fill="none" stroke="#216dd1" stroke-width="6" stroke-linecap="round"/>
        <path d="M162 84 L178 98 L156 104" fill="none" stroke="#216dd1" stroke-width="6" stroke-linejoin="round"/>
      `;
    }

    return `
      <svg class="visual-svg small" viewBox="0 0 260 160" role="img" aria-label="${escapeHtml(title)}">
        <rect x="0" y="0" width="260" height="160" rx="16" fill="#fbfdff"/>
        ${drawing}
      </svg>
    `;
  }

  return {
    escapeHtml,
    card,
    detailsBlock,
    choiceButtons,
    renderGlobalOrientationSVG,
    renderCanalPlaneSVG,
    renderNystagmusSVG
  };
})();
