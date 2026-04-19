if (window.APP && typeof window.APP.pageNav === 'function') {
  window.APP.pageNav('visualiseur.html');
}

class SixTemplateVPPBVisualizer {
  constructor() {
    this.ids = [
      'svgHost',
      'stepBox',
      'interpretBox',
      'channelSelect',
      'testSelect',
      'sideSelect',
      'variantSelect',
      'variantWrap',
      'prevBtn',
      'playBtn',
      'nextBtn',
      'resetBtn'
    ];

    const missing = this.ids.filter(id => !document.getElementById(id));
    if (missing.length) {
      console.error('Visualiseur incomplet, IDs manquants :', missing);
      return;
    }

    this.host = document.getElementById('svgHost');
    this.stepBox = document.getElementById('stepBox');
    this.interpretBox = document.getElementById('interpretBox');
    this.channelSelect = document.getElementById('channelSelect');
    this.testSelect = document.getElementById('testSelect');
    this.sideSelect = document.getElementById('sideSelect');
    this.variantSelect = document.getElementById('variantSelect');
    this.variantWrap = document.getElementById('variantWrap');
    this.prevBtn = document.getElementById('prevBtn');
    this.playBtn = document.getElementById('playBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.resetBtn = document.getElementById('resetBtn');

    this.channel = 'post';
    this.test = 'dixhallpike';
    this.side = 'right';
    this.variant = 'geotropic';
    this.stepIndex = 0;
    this.timer = null;

    this.bind();
    this.fillChannelSelect();
    this.fillTestSelect();
    this.render();
  }

  bind() {
    this.channelSelect.addEventListener('change', e => {
      this.channel = e.target.value;
      this.stepIndex = 0;
      this.fillTestSelect();
      this.render();
    });

    this.testSelect.addEventListener('change', e => {
      this.test = e.target.value;
      this.stepIndex = 0;
      this.render();
    });

    this.sideSelect.addEventListener('change', e => {
      this.side = e.target.value;
      this.render();
    });

    this.variantSelect.addEventListener('change', e => {
      this.variant = e.target.value;
      this.render();
    });

    this.prevBtn.addEventListener('click', () => this.move(-1));
    this.nextBtn.addEventListener('click', () => this.move(1));
    this.resetBtn.addEventListener('click', () => {
      this.stop();
      this.stepIndex = 0;
      this.render();
    });

    this.playBtn.addEventListener('click', () => this.play());

    window.addEventListener('resize', () => this.render());
  }

  fillChannelSelect() {
    this.channelSelect.innerHTML = Object.values(window.COURSE_DATA.channels)
      .map(c => `<option value="${c.id}">${this.escape(c.name)}</option>`)
      .join('');
    this.channelSelect.value = this.channel;
  }

  fillTestSelect() {
    const tests = window.COURSE_DATA.visualizer[this.channel].tests;
    this.testSelect.innerHTML = Object.entries(tests)
      .map(([id, test]) => `<option value="${id}">${this.escape(test.name)}</option>`)
      .join('');
    this.test = Object.keys(tests)[0];
    this.testSelect.value = this.test;
    this.variantWrap.style.display = this.channel === 'horiz' ? 'block' : 'none';
  }

  getTest() {
    return window.COURSE_DATA.visualizer[this.channel].tests[this.test];
  }

  getStep() {
    const steps = this.getTest().steps;
    return steps[Math.max(0, Math.min(this.stepIndex, steps.length - 1))];
  }

  getShape() {
    return this.getStep().shape || 'neutral';
  }

  variantLabel() {
    if (this.variant === 'geotropic') return 'géotropique';
    if (this.variant === 'ageotropic') return 'agéotropique';
    return 'cupulolithiase';
  }

  progress() {
    const n = this.getTest().steps.length;
    return n <= 1 ? 0 : this.stepIndex / (n - 1);
  }

  move(delta) {
    const steps = this.getTest().steps;
    this.stepIndex = Math.max(0, Math.min(this.stepIndex + delta, steps.length - 1));
    this.render();
  }

  play() {
    if (this.timer) {
      this.stop();
      return;
    }

    const steps = this.getTest().steps;
    this.stepIndex = 0;
    this.render();

    this.timer = setInterval(() => {
      if (this.stepIndex >= steps.length - 1) {
        this.stop();
        return;
      }
      this.stepIndex += 1;
      this.render();
    }, 1800);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render() {
    const step = this.getStep();
    const test = this.getTest();

    this.stepBox.innerHTML = `
      <div class="badge success">Étape ${this.stepIndex + 1} / ${test.steps.length}</div>
      <h3 style="margin-top:12px">${this.escape(step.title)}</h3>
      <p>${this.escape(step.text)}</p>
      <div class="note info"><strong>Nystagmus attendu :</strong> ${this.escape(step.nystagmus)}</div>
    `;

    this.interpretBox.innerHTML = `
      <h3>${this.escape(test.name)}</h3>
      <p>${this.escape(test.interpretation)}</p>
      ${this.interpretationNote()}
    `;

    this.host.innerHTML = this.buildSVG();
  }

  interpretationNote() {
    if (this.channel === 'horiz') {
      const nullPoint = this.variant === 'cupulo'
        ? `<br><strong>Null point :</strong> en cupulolithiase, c’est l’arrêt du nystagmus lors d’une rotation limitée, utile pour préciser le côté atteint.`
        : '';
      return `
        <div class="note warn">
          <strong>Lecture du schéma :</strong> une seule oreille est affichée.  
          L’utricule est du côté vestibulaire.  
          L’ampoule et la cupule sont au versant ampullaire.  
          Géotropique = lithiase du <strong>bras long</strong>.  
          Agéotropique = lithiase du <strong>bras court</strong>.  
          Cupulolithiase = déflexion au niveau de la <strong>cupule</strong>.${nullPoint}
        </div>
      `;
    }

    return `
      <div class="note warn">
        <strong>Lecture du schéma :</strong> une seule oreille est affichée.  
        Les canaux verticaux montrent le <strong>bras commun</strong>, l’<strong>ampoule</strong> près de l’utricule, et un trajet simplifié des otoconies dans la lumière du canal.
      </div>
    `;
  }

  buildSVG() {
    const w = 920;
    const h = 700;

    return `
      <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Visualiseur VPPB">
        <defs>
          <radialGradient id="utricleGrad" cx="35%" cy="30%">
            <stop offset="0%" stop-color="#ffffff"></stop>
            <stop offset="100%" stop-color="#d9e5ff"></stop>
          </radialGradient>

          <radialGradient id="ampullaGrad" cx="35%" cy="30%">
            <stop offset="0%" stop-color="#fff7ff"></stop>
            <stop offset="100%" stop-color="#c084fc"></stop>
          </radialGradient>

          <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#ef4444"></path>
          </marker>

          <marker id="arrowTeal" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#14b8a6"></path>
          </marker>
        </defs>

        <rect x="0" y="0" width="${w}" height="${h}" fill="#f8fbff"></rect>
        <text x="${w / 2}" y="36" text-anchor="middle" font-size="24" font-weight="700" fill="#16324f" font-family="Open Sans, sans-serif">
          ${this.escape(window.COURSE_DATA.channels[this.channel].name)} — ${this.escape(this.getTest().name)}
        </text>
        <text x="${w / 2}" y="60" text-anchor="middle" font-size="14" fill="#61758d" font-family="Open Sans, sans-serif">
          ${this.escape(`Oreille atteinte : ${this.side === 'right' ? 'droite' : 'gauche'}${this.channel === 'horiz' ? ' • ' + this.variantLabel() : ''}`)}
        </text>

        <rect x="34" y="84" width="${w - 68}" height="306" rx="18" fill="#eef5fc" stroke="#d8e5f2"></rect>
        <text x="${w / 2}" y="106" text-anchor="middle" font-size="12" fill="#6c8097" font-family="Open Sans, sans-serif">
          Schéma conventionnel simplifié
        </text>

        ${this.currentTemplateSVG()}

        <text x="${w / 2}" y="430" text-anchor="middle" font-size="22" font-weight="700" fill="#16324f" font-family="Open Sans, sans-serif">
          Illustration du nystagmus
        </text>

        ${this.buildEyes()}
        ${this.buildLegend()}
      </svg>
    `;
  }

  currentTemplateSVG() {
    const key = `${this.channel}-${this.side}`;
    switch (key) {
      case 'post-right': return this.posteriorRightTemplate();
      case 'post-left': return this.posteriorLeftTemplate();
      case 'ant-right': return this.anteriorRightTemplate();
      case 'ant-left': return this.anteriorLeftTemplate();
      case 'horiz-right': return this.horizontalRightTemplate();
      case 'horiz-left': return this.horizontalLeftTemplate();
      default: return '';
    }
  }

  baseGeometry(side = 'right') {
    const sx = side === 'right' ? 1 : -1;
    const cx = 460;
    const cy = 240;
    const pt = (x, y) => ({ x: cx + sx * x, y: cy + y });
    return { sx, cx, cy, pt };
  }

  posteriorTemplate(side = 'right') {
    const { sx, cx, pt } = this.baseGeometry(side);

    const common = pt(-58, -112);
    const amp = pt(-94, -12);
    const cup = pt(-106, -14);
    const utricle = pt(-148, 28);
    const utTop = pt(-132, -8);
    const utLow = pt(-130, 16);

    const path = `
      M ${common.x} ${common.y}
      C ${pt(20, -140).x} ${pt(20, -140).y}, ${pt(122, -92).x} ${pt(122, -92).y}, ${pt(138, 0).x} ${pt(138, 0).y}
      C ${pt(150, 104).x} ${pt(150, 104).y}, ${pt(80, 174).x} ${pt(80, 174).y}, ${pt(6, 160).x} ${pt(6, 160).y}
      C ${pt(-60, 148).x} ${pt(-60, 148).y}, ${pt(-108, 88).x} ${pt(-108, 88).y}, ${pt(-106, 26).x} ${pt(-106, 26).y}
      C ${pt(-104, 8).x} ${pt(-104, 8).y}, ${pt(-100, -2).x} ${pt(-100, -2).y}, ${amp.x} ${amp.y}
    `;

    const shape = this.getShape();
    let cluster = '';
    let flow = '';

    if (shape === 'neutral') {
      const p = pt(20, 142);
      cluster = this.cluster(p.x, p.y, 1);
    } else if (shape === 'post-provoked') {
      const p = pt(54, -64);
      cluster = this.cluster(p.x, p.y, 1);
      flow = this.arrowLine(pt(18, 120).x, pt(18, 120).y, pt(48, -30).x, pt(48, -30).y, '#14b8a6', 3);
    } else {
      const p = pt(-10, 44);
      cluster = this.cluster(p.x, p.y, 1);
      flow = this.arrowLine(pt(26, -10).x, pt(26, -10).y, pt(-6, 52).x, pt(-6, 52).y, '#14b8a6', 3);
    }

    return `
      ${this.earTitle(cx, 132, side)}
      <path d="${path}" fill="none" stroke="#43c7c0" stroke-width="17" stroke-linecap="round"></path>
      <line x1="${common.x}" y1="${common.y}" x2="${utTop.x}" y2="${utTop.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"></line>
      <line x1="${amp.x}" y1="${amp.y}" x2="${utLow.x}" y2="${utLow.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"></line>

      ${this.utricle(utricle.x, utricle.y, 22)}
      ${this.ampulla(amp.x, amp.y, 18)}
      ${this.cupula(cup.x, cup.y, sx * 0.28)}

      ${this.smallLabel(utricle.x, utricle.y + 40, 'Utricule')}
      ${this.smallLabel(amp.x + sx * 56, amp.y - 8, 'Ampoule')}
      ${this.smallLabel(common.x + sx * 30, common.y - 12, 'Bras commun')}

      ${cluster}
      ${flow}
    `;
  }

  anteriorTemplate(side = 'right') {
    const { sx, cx, pt } = this.baseGeometry(side);

    const common = pt(-58, -112);
    const amp = pt(-96, 10);
    const cup = pt(-108, 10);
    const utricle = pt(-148, 48);
    const utTop = pt(-132, 8);
    const utLow = pt(-130, 28);

    const path = `
      M ${common.x} ${common.y}
      C ${pt(18, -150).x} ${pt(18, -150).y}, ${pt(130, -118).x} ${pt(130, -118).y}, ${pt(146, -26).x} ${pt(146, -26).y}
      C ${pt(158, 66).x} ${pt(158, 66).y}, ${pt(98, 132).x} ${pt(98, 132).y}, ${pt(18, 130).x} ${pt(18, 130).y}
      C ${pt(-54, 128).x} ${pt(-54, 128).y}, ${pt(-112, 82).x} ${pt(-112, 82).y}, ${pt(-108, 34).x} ${pt(-108, 34).y}
      C ${pt(-106, 22).x} ${pt(-106, 22).y}, ${pt(-102, 16).x} ${pt(-102, 16).y}, ${amp.x} ${amp.y}
    `;

    const shape = this.getShape();
    let cluster = '';
    let flow = '';

    if (shape === 'neutral') {
      const p = pt(16, 118);
      cluster = this.cluster(p.x, p.y, 1);
    } else if (shape === 'ant-provoked') {
      const p = pt(62, -78);
      cluster = this.cluster(p.x, p.y, 1);
      flow = this.arrowLine(pt(20, 110).x, pt(20, 110).y, pt(54, -34).x, pt(54, -34).y, '#14b8a6', 3);
    } else {
      const p = pt(-8, 38);
      cluster = this.cluster(p.x, p.y, 1);
      flow = this.arrowLine(pt(22, -12).x, pt(22, -12).y, pt(-4, 46).x, pt(-4, 46).y, '#14b8a6', 3);
    }

    return `
      ${this.earTitle(cx, 132, side)}
      <path d="${path}" fill="none" stroke="#43c7c0" stroke-width="17" stroke-linecap="round"></path>
      <line x1="${common.x}" y1="${common.y}" x2="${utTop.x}" y2="${utTop.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"></line>
      <line x1="${amp.x}" y1="${amp.y}" x2="${utLow.x}" y2="${utLow.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"></line>

      ${this.utricle(utricle.x, utricle.y, 22)}
      ${this.ampulla(amp.x, amp.y, 18)}
      ${this.cupula(cup.x, cup.y, -sx * 0.28)}

      ${this.smallLabel(utricle.x, utricle.y + 40, 'Utricule')}
      ${this.smallLabel(amp.x + sx * 56, amp.y - 8, 'Ampoule')}
      ${this.smallLabel(common.x + sx * 30, common.y - 12, 'Bras commun')}

      ${cluster}
      ${flow}
    `;
  }

  horizontalTemplate(side = 'right') {
    const { sx, cx, pt } = this.baseGeometry(side);

    const utricle = pt(-152, 0);
    const amp = pt(-96, 0);
    const cup = pt(-110, 0);
    const utTop = pt(-138, -12);
    const utLow = pt(-138, 12);
    const topEnd = pt(-82, -22);
    const lowEnd = pt(-82, 22);

    const path = `
      M ${topEnd.x} ${topEnd.y}
      C ${pt(-8, -92).x} ${pt(-8, -92).y}, ${pt(140, -78).x} ${pt(140, -78).y}, ${pt(194, 0).x} ${pt(194, 0).y}
      C ${pt(140, 78).x} ${pt(140, 78).y}, ${pt(-8, 92).x} ${pt(-8, 92).y}, ${lowEnd.x} ${lowEnd.y}
    `;

    const shape = this.getShape();
    let cluster = '';
    let flow = '';
    let siteLabel = '';

    if (this.variant === 'geotropic') {
      siteLabel = this.smallLabel(cx + sx * 132, 140, 'Bras long');
      const positions = {
        neutral: pt(136, 0),
        bow: pt(22, 24),
        lean: pt(126, -8),
        'roll-right': pt(18, 22),
        'roll-left': pt(132, 0),
        upright: pt(20, -12)
      };
      const p = positions[shape] || positions.neutral;
      cluster = this.cluster(p.x, p.y, 1);

      const towardAmpulla = ['bow', 'roll-right', 'upright'].includes(shape);
      if (shape !== 'neutral') {
        flow = towardAmpulla
          ? this.arrowLine(pt(92, 0).x, pt(92, 0).y, pt(-8, 0).x, pt(-8, 0).y, '#14b8a6', 3)
          : this.arrowLine(pt(-2, 0).x, pt(-2, 0).y, pt(94, 0).x, pt(94, 0).y, '#14b8a6', 3);
      }
    }

    if (this.variant === 'ageotropic') {
      siteLabel = this.smallLabel(cx + sx * 34, 140, 'Bras court');
      const positions = {
        neutral: pt(-20, 24),
        bow: pt(-34, 8),
        lean: pt(-6, 22),
        'roll-right': pt(-30, 20),
        'roll-left': pt(-18, -8),
        upright: pt(-30, 4)
      };
      const p = positions[shape] || positions.neutral;
      cluster = this.cluster(p.x, p.y, 1);

      const towardAmpulla = ['lean', 'roll-left'].includes(shape);
      if (shape !== 'neutral') {
        flow = towardAmpulla
          ? this.arrowLine(pt(28, 8).x, pt(28, 8).y, pt(-18, 6).x, pt(-18, 6).y, '#14b8a6', 3)
          : this.arrowLine(pt(-18, 8).x, pt(-18, 8).y, pt(28, 8).x, pt(28, 8).y, '#14b8a6', 3);
      }
    }

    if (this.variant === 'cupulo') {
      siteLabel = this.smallLabel(cx + sx * 12, 140, 'Cupule');
      const p = pt(-110, 0);
      cluster = this.cluster(p.x, p.y, 0.88);

      if (shape !== 'neutral') {
        const towardUtricle = ['lean'].includes(shape);
        flow = towardUtricle
          ? this.arrowLine(pt(-112, -28).x, pt(-112, -28).y, pt(-112, 24).x, pt(-112, 24).y, '#14b8a6', 3)
          : this.arrowLine(pt(-112, 24).x, pt(-112, 24).y, pt(-112, -28).x, pt(-112, -28).y, '#14b8a6', 3);
      }
    }

    return `
      ${this.earTitle(cx, 132, side)}
      <path d="${path}" fill="none" stroke="#43c7c0" stroke-width="17" stroke-linecap="round"></path>
      <line x1="${topEnd.x}" y1="${topEnd.y}" x2="${utTop.x}" y2="${utTop.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"></line>
      <line x1="${lowEnd.x}" y1="${lowEnd.y}" x2="${utLow.x}" y2="${utLow.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"></line>

      ${this.utricle(utricle.x, utricle.y, 18)}
      ${this.ampulla(amp.x, amp.y, 16)}
      ${this.cupula(cup.x, cup.y, Math.PI / 2)}

      ${this.smallLabel(utricle.x, utricle.y + 34, 'Utricule')}
      ${this.smallLabel(amp.x + sx * 46, amp.y - 8, 'Ampoule')}
      ${siteLabel}

      ${cluster}
      ${flow}
    `;
  }

  posteriorRightTemplate() { return this.posteriorTemplate('right'); }
  posteriorLeftTemplate() { return this.posteriorTemplate('left'); }
  anteriorRightTemplate() { return this.anteriorTemplate('right'); }
  anteriorLeftTemplate() { return this.anteriorTemplate('left'); }
  horizontalRightTemplate() { return this.horizontalTemplate('right'); }
  horizontalLeftTemplate() { return this.horizontalTemplate('left'); }

  earTitle(x, y, side) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="14" font-weight="700" fill="#16324f" font-family="Open Sans, sans-serif">Oreille ${side === 'right' ? 'droite' : 'gauche'}</text>`;
  }

  utricle(x, y, r) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#utricleGrad)" stroke="#6f85f3" stroke-width="2"></circle>`;
  }

  ampulla(x, y, r) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#ampullaGrad)" stroke="#a855f7" stroke-width="2"></circle>`;
  }

  cupula(x, y, rotation) {
    const deg = rotation * 180 / Math.PI;
    return `<ellipse cx="${x}" cy="${y}" rx="9" ry="16" fill="#92e2d4" transform="rotate(${deg} ${x} ${y})"></ellipse>`;
  }

  cluster(cx, cy, scale = 1) {
    const dots = [
      [-6, -4, 4.5],
      [6, -2, 4],
      [-2, 6, 4],
      [7, 6, 4.5]
    ];

    return dots.map(([dx, dy, r]) => `
      <circle cx="${cx + dx * scale}" cy="${cy + dy * scale}" r="${r * scale}" fill="#ef4444" stroke="rgba(255,255,255,.85)" stroke-width="1"></circle>
    `).join('');
  }

  smallLabel(x, y, text) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="12" fill="#61758d" font-family="Open Sans, sans-serif">${this.escape(text)}</text>`;
  }

  arrowLine(x1, y1, x2, y2, color = '#ef4444', width = 4) {
    const marker = color === '#14b8a6' ? 'url(#arrowTeal)' : 'url(#arrowRed)';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" marker-end="${marker}"></line>`;
  }

  buildEyes() {
    const model = this.getEyeModel();
    return `
      ${this.eye(340, 530, 'Œil gauche', model)}
      ${this.eye(580, 530, 'Œil droit', model)}
    `;
  }

  eye(x, y, label, model) {
    let pupilX = x;
    let pupilY = y;
    let arrow = '';
    let torsion = '';

    if (model.type === 'horizontal') {
      pupilX += model.dir === 'right' ? 14 : -14;
      arrow = model.dir === 'right'
        ? this.arrowLine(x - 24, y, x + 24, y, '#ef4444', 4)
        : this.arrowLine(x + 24, y, x - 24, y, '#ef4444', 4);
    }

    if (model.type === 'vertical') {
      pupilY += model.dir === 'down' ? 14 : -14;
      arrow = model.dir === 'down'
        ? this.arrowLine(x, y - 24, x, y + 24, '#ef4444', 4)
        : this.arrowLine(x, y + 24, x, y - 24, '#ef4444', 4);
    }

    if (model.type === 'torsional') {
      torsion = this.torsion(x, y, model.dir);
    }

    return `
      <g>
        <circle cx="${x}" cy="${y}" r="42" fill="#fff" stroke="#9ab0c7" stroke-width="2"></circle>
        <circle cx="${pupilX}" cy="${pupilY}" r="13" fill="#1565c0"></circle>
        <circle cx="${pupilX - 4}" cy="${pupilY - 4}" r="4" fill="#fff"></circle>
        ${arrow}
        ${torsion}
        <text x="${x}" y="${y + 66}" text-anchor="middle" font-size="12" fill="#61758d" font-family="Open Sans, sans-serif">${this.escape(label)}</text>
      </g>
    `;
  }

  torsion(x, y, dir) {
    const ccw = dir === 'ccw';
    const start = ccw ? 0.15 * Math.PI : 0.85 * Math.PI;
    const end = ccw ? 1.30 * Math.PI : -0.30 * Math.PI;
    const largeArc = 1;
    const sweep = ccw ? 1 : 0;
    const r = 28;

    const x1 = x + Math.cos(start) * r;
    const y1 = y + Math.sin(start) * r;
    const x2 = x + Math.cos(end) * r;
    const y2 = y + Math.sin(end) * r;

    return `
      <path d="M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}" fill="none" stroke="#ef4444" stroke-width="4"></path>
      ${ccw ? this.arrowLine(x2 + 10, y2, x2, y2, '#ef4444', 3) : this.arrowLine(x2 - 10, y2, x2, y2, '#ef4444', 3)}
      <text x="${x}" y="${y - 54}" text-anchor="middle" font-size="12" fill="#ef4444" font-family="Open Sans, sans-serif">${ccw ? 'anti-horaire' : 'horaire'}</text>
    `;
  }

  getEyeModel() {
    const shape = this.getShape();

    if (shape === 'neutral') return { type: 'none' };

    if (this.channel === 'post') {
      return {
        type: 'torsional',
        dir: shape === 'post-return'
          ? (this.side === 'right' ? 'cw' : 'ccw')
          : (this.side === 'right' ? 'ccw' : 'cw')
      };
    }

    if (this.channel === 'ant') {
      return {
        type: 'vertical',
        dir: shape === 'ant-return' ? 'up' : 'down'
      };
    }

    if (this.channel === 'horiz') {
      let dir = 'right';

      if (this.test === 'bowlean') {
        if (shape === 'bow') {
          dir = this.variant === 'geotropic'
            ? (this.side === 'right' ? 'right' : 'left')
            : (this.side === 'right' ? 'left' : 'right');
        } else if (shape === 'lean') {
          dir = this.variant === 'geotropic'
            ? (this.side === 'right' ? 'left' : 'right')
            : (this.side === 'right' ? 'right' : 'left');
        }
      } else if (this.test === 'supineroll') {
        if (shape === 'roll-right') {
          dir = this.variant === 'geotropic' ? 'right' : 'left';
        } else if (shape === 'roll-left') {
          dir = this.variant === 'geotropic' ? 'left' : 'right';
        } else {
          return { type: 'none' };
        }
      } else if (this.test === 'upright') {
        dir = this.variant === 'geotropic'
          ? (this.side === 'right' ? 'right' : 'left')
          : (this.side === 'right' ? 'left' : 'right');
      }

      return { type: 'horizontal', dir };
    }

    return { type: 'none' };
  }

  buildLegend() {
    return `
      <g>
        <rect x="18" y="616" width="332" height="66" rx="12" fill="rgba(255,255,255,.96)" stroke="#dbe5ef"></rect>
        <text x="28" y="634" font-size="12" font-weight="700" fill="#16324f" font-family="Open Sans, sans-serif">Légende</text>
        ${this.cluster(40, 658, 0.55)}
        <text x="62" y="662" font-size="11" fill="#61758d" font-family="Open Sans, sans-serif">Otoconies</text>
        ${this.arrowLine(28, 675, 46, 675, '#ef4444', 3)}
        <text x="62" y="678" font-size="11" fill="#61758d" font-family="Open Sans, sans-serif">Sens du nystagmus</text>
      </g>
    `;
  }

  escape(str) {
    return String(str)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new SixTemplateVPPBVisualizer();
});
