if (window.APP && typeof window.APP.pageNav === 'function') {
  window.APP.pageNav('visualiseur.html');
}

class FixedSVGVPPBVisualizer {
  constructor() {
    this.channel = 'post';
    this.test = 'dixhallpike';
    this.side = 'right';
    this.variant = 'geotropic';
    this.stepIndex = 0;
    this.timer = null;

    this.host = document.getElementById('svgHost');

    this.bind();
    this.fillChannelSelect();
    this.fillTestSelect();
    this.render();
  }

  bind() {
    document.getElementById('channelSelect').addEventListener('change', e => {
      this.channel = e.target.value;
      this.stepIndex = 0;
      this.fillTestSelect();
      this.render();
    });

    document.getElementById('testSelect').addEventListener('change', e => {
      this.test = e.target.value;
      this.stepIndex = 0;
      this.render();
    });

    document.getElementById('sideSelect').addEventListener('change', e => {
      this.side = e.target.value;
      this.render();
    });

    document.getElementById('variantSelect').addEventListener('change', e => {
      this.variant = e.target.value;
      this.render();
    });

    document.getElementById('prevBtn').addEventListener('click', () => this.move(-1));
    document.getElementById('nextBtn').addEventListener('click', () => this.move(1));
    document.getElementById('resetBtn').addEventListener('click', () => {
      this.stop();
      this.stepIndex = 0;
      this.render();
    });
    document.getElementById('playBtn').addEventListener('click', () => this.play());

    window.addEventListener('resize', () => this.render());
  }

  fillChannelSelect() {
    const select = document.getElementById('channelSelect');
    select.innerHTML = Object.values(window.COURSE_DATA.channels)
      .map(c => `<option value="${c.id}">${c.name}</option>`)
      .join('');
    select.value = this.channel;
  }

  fillTestSelect() {
    const tests = window.COURSE_DATA.visualizer[this.channel].tests;
    const select = document.getElementById('testSelect');
    select.innerHTML = Object.entries(tests)
      .map(([id, test]) => `<option value="${id}">${test.name}</option>`)
      .join('');
    this.test = Object.keys(tests)[0];
    select.value = this.test;
    document.getElementById('variantWrap').style.display = this.channel === 'horiz' ? 'block' : 'none';
  }

  getTest() {
    return window.COURSE_DATA.visualizer[this.channel].tests[this.test];
  }

  getStep() {
    const steps = this.getTest().steps;
    return steps[Math.max(0, Math.min(this.stepIndex, steps.length - 1))];
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

  variantLabel() {
    if (this.variant === 'geotropic') return 'géotropique';
    if (this.variant === 'ageotropic') return 'agéotropique';
    return 'cupulolithiase';
  }

  render() {
    const test = this.getTest();
    const step = this.getStep();

    document.getElementById('stepBox').innerHTML = `
      <div class="badge success">Étape ${this.stepIndex + 1} / ${test.steps.length}</div>
      <h3 style="margin-top:12px">${step.title}</h3>
      <p>${step.text}</p>
      <div class="note info"><strong>Nystagmus attendu :</strong> ${step.nystagmus}</div>
    `;

    document.getElementById('interpretBox').innerHTML = `
      <h3>${test.name}</h3>
      <p>${test.interpretation}</p>
      ${this.extraInterpretation()}
    `;

    this.host.innerHTML = this.buildSVG();
  }

  extraInterpretation() {
    if (this.channel === 'horiz') {
      return `
        <div class="note warn">
          <strong>Repère anatomique :</strong> l’utricule et l’ampoule sont du côté vestibulaire.  
          La forme géotropique est représentée dans le <strong>bras long</strong>, alors que la forme agéotropique / cupulolithiase est montrée près du <strong>bras court / de la cupule</strong>.
        </div>
      `;
    }

    return `
      <div class="note warn">
        <strong>Repère anatomique :</strong> le <strong>bras commun (crus commune)</strong> est représenté sur les canaux verticaux, avec l’<strong>ampoule</strong> au versant ampullaire près de l’utricule.
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
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#d9e5ff"/>
          </radialGradient>
          <radialGradient id="ampullaGrad" cx="35%" cy="30%">
            <stop offset="0%" stop-color="#fff7ff"/>
            <stop offset="100%" stop-color="#c084fc"/>
          </radialGradient>
          <marker id="arrowRed" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#ef4444"></path>
          </marker>
          <marker id="arrowTeal" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 z" fill="#14b8a6"></path>
          </marker>
        </defs>

        <rect x="0" y="0" width="${w}" height="${h}" fill="#f8fbff"/>
        <text x="${w / 2}" y="36" text-anchor="middle" font-size="24" font-weight="700" fill="#16324f" font-family="Open Sans, sans-serif">
          ${this.escape(`${window.COURSE_DATA.channels[this.channel].name} — ${this.getTest().name}`)}
        </text>
        <text x="${w / 2}" y="60" text-anchor="middle" font-size="14" fill="#61758d" font-family="Open Sans, sans-serif">
          ${this.escape(`Côté atteint : ${this.side === 'right' ? 'droite' : 'gauche'}${this.channel === 'horiz' ? ' • ' + this.variantLabel() : ''}`)}
        </text>

        <rect x="34" y="84" width="${w - 68}" height="306" rx="18" fill="#eef5fc" stroke="#d8e5f2"/>
        <text x="${w / 2}" y="106" text-anchor="middle" font-size="12" fill="#6c8097" font-family="Open Sans, sans-serif">
          Schéma conventionnel simplifié
        </text>

        ${this.buildScene()}

        <text x="${w / 2}" y="430" text-anchor="middle" font-size="22" font-weight="700" fill="#16324f" font-family="Open Sans, sans-serif">
          Illustration du nystagmus
        </text>

        ${this.buildEyes()}

        ${this.buildLegend()}
      </svg>
    `;
  }

  buildScene() {
    if (this.channel === 'horiz') return this.buildHorizontalScene();
    if (this.channel === 'post') return this.buildPosteriorScene();
    return this.buildAnteriorScene();
  }

  buildPosteriorScene() {
    const leftX = 260;
    const rightX = 660;
    const y = 240;

    return `
      ${this.posteriorEar(leftX, y, 'left', this.side === 'left')}
      ${this.posteriorEar(rightX, y, 'right', this.side === 'right')}
    `;
  }

  buildAnteriorScene() {
    const leftX = 260;
    const rightX = 660;
    const y = 240;

    return `
      ${this.anteriorEar(leftX, y, 'left', this.side === 'left')}
      ${this.anteriorEar(rightX, y, 'right', this.side === 'right')}
    `;
  }

  buildHorizontalScene() {
    const leftX = 260;
    const rightX = 660;
    const y = 240;

    return `
      ${this.horizontalEar(leftX, y, 'left', this.side === 'left')}
      ${this.horizontalEar(rightX, y, 'right', this.side === 'right')}
    `;
  }

  abs(tx, ty, sx, x, y) {
    return { x: tx + sx * x, y: ty + y };
  }

  posteriorEar(tx, ty, earSide, active) {
    const sx = earSide === 'left' ? 1 : -1;
    const alpha = active ? 1 : 0.24;
    const p = (x, y) => this.abs(tx, ty, sx, x, y);

    const c0 = p(34, -96);   // bras commun
    const c1 = p(-6, -112);
    const c2 = p(-72, -44);
    const c3 = p(-64, 54);
    const c4 = p(-58, 114);
    const c5 = p(-8, 126);
    const c6 = p(34, 70);
    const c7 = p(46, 48);
    const c8 = p(50, 24);
    const a = p(56, 8);      // ampoule

    const u = p(108, 64);    // utricule
    const utTop = p(94, 30);
    const utLow = p(98, 56);
    const cup = p(43, 6);
    const commonLabel = p(52, -114);

    const d = `
      M ${c0.x} ${c0.y}
      C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${c3.x} ${c3.y}
      C ${c4.x} ${c4.y}, ${c5.x} ${c5.y}, ${c6.x} ${c6.y}
      C ${c7.x} ${c7.y}, ${c8.x} ${c8.y}, ${a.x} ${a.y}
    `;

    let cluster;
    let flow = '';

    if (active) {
      const shape = this.getStep().shape;
      if (shape === 'neutral') cluster = p(46, 42);
      else if (shape === 'post-provoked') {
        cluster = p(-26, -18);
        flow = this.arrowLine(p(40, 32), p(4, -8), '#14b8a6', 3);
      } else {
        cluster = p(14, 12);
        flow = this.arrowLine(p(0, 0), p(40, 30), '#14b8a6', 3);
      }
    }

    return `
      <g opacity="${alpha}">
        ${this.earLabel(tx, 130, earSide === 'left' ? 'Oreille gauche' : 'Oreille droite', active)}
        <path d="${d}" fill="none" stroke="#43c7c0" stroke-width="17" stroke-linecap="round"/>
        <line x1="${c0.x}" y1="${c0.y}" x2="${utTop.x}" y2="${utTop.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"/>
        <line x1="${a.x}" y1="${a.y}" x2="${utLow.x}" y2="${utLow.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"/>

        ${this.utricle(u.x, u.y, 22)}
        ${this.ampulla(a.x, a.y, 18)}
        ${this.cupula(cup.x, cup.y, sx * 0.28)}

        ${this.smallLabel(u.x, u.y + 40, 'Utricule')}
        ${this.smallLabel(a.x + sx * 52, a.y - 8, 'Ampoule')}
        ${active ? this.smallLabel(commonLabel.x, commonLabel.y, 'Bras commun') : ''}

        ${active && cluster ? this.cluster(cluster.x, cluster.y, 1) : ''}
        ${active ? flow : ''}
      </g>
    `;
  }

  anteriorEar(tx, ty, earSide, active) {
    const sx = earSide === 'left' ? 1 : -1;
    const alpha = active ? 1 : 0.24;
    const p = (x, y) => this.abs(tx, ty, sx, x, y);

    const c0 = p(34, -96);   // bras commun
    const c1 = p(-34, -118);
    const c2 = p(-86, -88);
    const c3 = p(-78, -10);
    const c4 = p(-72, 58);
    const c5 = p(-18, 88);
    const c6 = p(36, 56);
    const c7 = p(46, 40);
    const c8 = p(50, 18);
    const a = p(56, 0);      // ampoule
    const u = p(108, 64);    // utricule
    const utTop = p(98, 22);
    const utLow = p(96, 54);
    const cup = p(43, 2);
    const commonLabel = p(52, -114);

    const d = `
      M ${c0.x} ${c0.y}
      C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${c3.x} ${c3.y}
      C ${c4.x} ${c4.y}, ${c5.x} ${c5.y}, ${c6.x} ${c6.y}
      C ${c7.x} ${c7.y}, ${c8.x} ${c8.y}, ${a.x} ${a.y}
    `;

    let cluster;
    let flow = '';

    if (active) {
      const shape = this.getStep().shape;
      if (shape === 'neutral') cluster = p(46, 28);
      else if (shape === 'ant-provoked') {
        cluster = p(-26, -52);
        flow = this.arrowLine(p(38, 16), p(4, -22), '#14b8a6', 3);
      } else {
        cluster = p(12, -6);
        flow = this.arrowLine(p(-4, -20), p(34, 18), '#14b8a6', 3);
      }
    }

    return `
      <g opacity="${alpha}">
        ${this.earLabel(tx, 130, earSide === 'left' ? 'Oreille gauche' : 'Oreille droite', active)}
        <path d="${d}" fill="none" stroke="#43c7c0" stroke-width="17" stroke-linecap="round"/>
        <line x1="${c0.x}" y1="${c0.y}" x2="${utTop.x}" y2="${utTop.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"/>
        <line x1="${a.x}" y1="${a.y}" x2="${utLow.x}" y2="${utLow.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"/>

        ${this.utricle(u.x, u.y, 22)}
        ${this.ampulla(a.x, a.y, 18)}
        ${this.cupula(cup.x, cup.y, -sx * 0.28)}

        ${this.smallLabel(u.x, u.y + 40, 'Utricule')}
        ${this.smallLabel(a.x + sx * 52, a.y - 8, 'Ampoule')}
        ${active ? this.smallLabel(commonLabel.x, commonLabel.y, 'Bras commun') : ''}

        ${active && cluster ? this.cluster(cluster.x, cluster.y, 1) : ''}
        ${active ? flow : ''}
      </g>
    `;
  }

  horizontalEar(tx, ty, earSide, active) {
    const sx = earSide === 'left' ? 1 : -1;
    const alpha = active ? 1 : 0.24;
    const p = (x, y) => this.abs(tx, ty, sx, x, y);

    const s0 = p(48, -20);
    const s1 = p(0, -74);
    const s2 = p(-96, -64);
    const s3 = p(-108, 0);
    const s4 = p(-96, 64);
    const s5 = p(0, 74);
    const s6 = p(48, 20);

    const d = `
      M ${s0.x} ${s0.y}
      C ${s1.x} ${s1.y}, ${s2.x} ${s2.y}, ${s3.x} ${s3.y}
      C ${s4.x} ${s4.y}, ${s5.x} ${s5.y}, ${s6.x} ${s6.y}
    `;

    const u = p(102, 0);
    const utTop = p(90, -16);
    const utLow = p(90, 16);
    const a = p(56, 0);
    const cup = p(42, 0);

    let cluster = null;
    let note = '';
    let flow = '';

    if (active) {
      if (this.variant === 'geotropic') {
        cluster = p(-88, 0);
        note = this.smallLabel(tx, ty - 100, 'Bras long', 1);
      } else if (this.variant === 'ageotropic') {
        cluster = p(22, 26);
        note = this.smallLabel(tx, ty - 100, 'Bras court', 1);
      } else {
        cluster = p(42, 0);
        note = this.smallLabel(tx, ty - 100, 'Cupulolithiase', 1);
      }

      flow = this.horizontalFlow(tx, ty, sx);
    }

    return `
      <g opacity="${alpha}">
        ${this.earLabel(tx, 130, earSide === 'left' ? 'Oreille gauche' : 'Oreille droite', active)}
        <path d="${d}" fill="none" stroke="#43c7c0" stroke-width="17" stroke-linecap="round"/>
        <line x1="${s0.x}" y1="${s0.y}" x2="${utTop.x}" y2="${utTop.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"/>
        <line x1="${s6.x}" y1="${s6.y}" x2="${utLow.x}" y2="${utLow.y}" stroke="#43c7c0" stroke-width="12" stroke-linecap="round"/>

        ${this.utricle(u.x, u.y, 18)}
        ${this.ampulla(a.x, a.y, 16)}
        ${this.cupula(cup.x, cup.y, Math.PI / 2)}

        ${this.smallLabel(u.x, u.y + 34, 'Utricule')}
        ${this.smallLabel(a.x + sx * 46, a.y - 8, 'Ampoule')}
        ${note}

        ${active && cluster ? this.cluster(cluster.x, cluster.y, this.variant === 'cupulo' ? 0.9 : 1) : ''}
        ${active ? flow : ''}
      </g>
    `;
  }

  horizontalFlow(tx, ty, sx) {
    const shape = this.getStep().shape;
    const isTowardAmpulla = (() => {
      if (this.test === 'bowlean') {
        if (shape === 'bow') return this.variant === 'geotropic';
        if (shape === 'lean') return this.variant !== 'geotropic';
      }

      if (this.test === 'upright') {
        return this.variant === 'geotropic';
      }

      if (this.test === 'supineroll') {
        if (this.variant === 'cupulo') return false;
        if (shape === 'roll-right') return this.side === 'right' ? this.variant === 'geotropic' : this.variant !== 'geotropic';
        if (shape === 'roll-left') return this.side === 'left' ? this.variant === 'geotropic' : this.variant !== 'geotropic';
      }

      return this.variant === 'geotropic';
    })();

    const x1 = tx - sx * 46;
    const x2 = tx + sx * 46;
    const y = ty - 96;

    return isTowardAmpulla
      ? this.arrowLine(x1, y, x2, y, '#14b8a6', 3)
      : this.arrowLine(x2, y, x1, y, '#14b8a6', 3);
  }

  earLabel(x, y, text, active) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="13" font-weight="700" fill="${active ? '#16324f' : '#8ea2b8'}" font-family="Open Sans, sans-serif">${this.escape(text)}</text>`;
  }

  utricle(x, y, r) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#utricleGrad)" stroke="#6f85f3" stroke-width="2"/>`;
  }

  ampulla(x, y, r) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#ampullaGrad)" stroke="#a855f7" stroke-width="2"/>`;
  }

  cupula(x, y, rotation) {
    const deg = rotation * 180 / Math.PI;
    return `<ellipse cx="${x}" cy="${y}" rx="9" ry="16" fill="#92e2d4" transform="rotate(${deg} ${x} ${y})"/>`;
  }

  cluster(cx, cy, scale = 1) {
    const dots = [
      [-6, -4, 4.5],
      [6, -2, 4],
      [-2, 6, 4],
      [7, 6, 4.5]
    ];

    return dots.map(([dx, dy, r]) => `
      <circle cx="${cx + dx * scale}" cy="${cy + dy * scale}" r="${r * scale}" fill="#ef4444" stroke="rgba(255,255,255,.85)" stroke-width="1"/>
    `).join('');
  }

  smallLabel(x, y, text, opacity = 1) {
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="12" fill="#61758d" opacity="${opacity}" font-family="Open Sans, sans-serif">${this.escape(text)}</text>`;
  }

  arrowLine(x1, y1, x2, y2, color, width) {
    const marker = color === '#14b8a6' ? 'url(#arrowTeal)' : 'url(#arrowRed)';
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" marker-end="${marker}"/>`;
  }

  buildEyes() {
    const model = this.getEyeNystagmus();
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
        <circle cx="${x}" cy="${y}" r="42" fill="#fff" stroke="#9ab0c7" stroke-width="2"/>
        <circle cx="${pupilX}" cy="${pupilY}" r="13" fill="#1565c0"/>
        <circle cx="${pupilX - 4}" cy="${pupilY - 4}" r="4" fill="#fff"/>
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
      <path d="M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}" fill="none" stroke="#ef4444" stroke-width="4"/>
      ${ccw ? this.arrowLine(x2 + 10, y2, x2, y2, '#ef4444', 3) : this.arrowLine(x2 - 10, y2, x2, y2, '#ef4444', 3)}
      <text x="${x}" y="${y - 54}" text-anchor="middle" font-size="12" fill="#ef4444" font-family="Open Sans, sans-serif">${ccw ? 'anti-horaire' : 'horaire'}</text>
    `;
  }

  getEyeNystagmus() {
    const shape = this.getStep().shape;
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
      } else {
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
        <rect x="18" y="616" width="330" height="66" rx="12" fill="rgba(255,255,255,.96)" stroke="#dbe5ef"/>
        <text x="28" y="634" font-size="12" font-weight="700" fill="#16324f" font-family="Open Sans, sans-serif">Légende</text>
        ${this.cluster(40, 658, 0.55)}
        <text x="62" y="662" font-size="11" fill="#61758d" font-family="Open Sans, sans-serif">Otoconies dans le canal</text>
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
  new FixedSVGVPPBVisualizer();
});
