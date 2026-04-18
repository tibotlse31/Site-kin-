APP.pageNav('visualiseur.html');

class DiagnosticVisualizer {
  constructor() {
    this.channel = 'post';
    this.test = 'dixhallpike';
    this.side = 'right';
    this.variant = 'geotropic';
    this.stepIndex = 0;
    this.timer = null;

    this.canvas = document.getElementById('vizCanvas');
    this.ctx = this.canvas.getContext('2d');

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

    new ResizeObserver(() => this.resize()).observe(this.canvas.parentElement);
    this.resize();
  }

  resize() {
    const box = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = Math.max(820, Math.floor(box.width));
    this.canvas.height = 680;
    this.render();
  }

  fillChannelSelect() {
    const select = document.getElementById('channelSelect');
    select.innerHTML = Object.values(COURSE_DATA.channels)
      .map(c => `<option value="${c.id}">${c.name}</option>`)
      .join('');
    select.value = this.channel;
  }

  fillTestSelect() {
    const tests = COURSE_DATA.visualizer[this.channel].tests;
    const select = document.getElementById('testSelect');
    select.innerHTML = Object.entries(tests)
      .map(([id, test]) => `<option value="${id}">${test.name}</option>`)
      .join('');
    this.test = Object.keys(tests)[0];
    select.value = this.test;
    document.getElementById('variantWrap').style.display = this.channel === 'horiz' ? 'block' : 'none';
  }

  getTest() {
    return COURSE_DATA.visualizer[this.channel].tests[this.test];
  }

  getStep() {
    const steps = this.getTest().steps;
    return steps[Math.max(0, Math.min(this.stepIndex, steps.length - 1))];
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

  progress() {
    const n = this.getTest().steps.length;
    return n <= 1 ? 0 : this.stepIndex / (n - 1);
  }

  render() {
    const test = this.getTest();
    const step = this.getStep();

    document.getElementById('stepBox').innerHTML = `
      <div class="badge success">Étape ${this.stepIndex + 1} / ${test.steps.length}</div>
      <h3 class="h3" style="margin-top:12px">${step.title}</h3>
      <p>${step.text}</p>
      <div class="note info" style="margin-top:12px"><strong>Nystagmus attendu :</strong> ${step.nystagmus}</div>
    `;

    document.getElementById('interpretBox').innerHTML = `
      <h3 class="h3">${test.name}</h3>
      <p>${test.interpretation}</p>
      <div class="note warn" style="margin-top:12px">Schéma conventionnel simplifié : il sert à repérer le canal, l’ampoule, l’utricule et le sens attendu du nystagmus.</div>
    `;

    this.draw();
  }

  draw() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f8fbff';
    ctx.fillRect(0, 0, w, h);

    this.drawHeader();
    this.drawReferenceBand();

    if (this.channel === 'horiz') this.drawHorizontalScene();
    else if (this.channel === 'post') this.drawVerticalScene('post');
    else this.drawVerticalScene('ant');

    this.drawNystagmusTitle();
    this.drawEyes();
    this.drawLegend();
  }

  drawHeader() {
    const ctx = this.ctx;
    const channel = COURSE_DATA.channels[this.channel];
    const test = this.getTest();

    ctx.fillStyle = '#16324f';
    ctx.textAlign = 'center';
    ctx.font = '700 24px sans-serif';
    ctx.fillText(`${channel.name} — ${test.name}`, this.canvas.width / 2, 36);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#5f7288';
    let subtitle = `Côté atteint : ${this.side === 'right' ? 'droite' : 'gauche'}`;
    if (this.channel === 'horiz') subtitle += ` • ${this.variantLabel()}`;
    ctx.fillText(subtitle, this.canvas.width / 2, 60);
  }

  drawReferenceBand() {
    const ctx = this.ctx;
    ctx.fillStyle = '#eef5fc';
    ctx.fillRect(40, 82, this.canvas.width - 80, 258);
    ctx.strokeStyle = '#d9e6f4';
    ctx.strokeRect(40, 82, this.canvas.width - 80, 258);

    ctx.fillStyle = '#5f7288';
    ctx.textAlign = 'center';
    ctx.font = '12px sans-serif';
    ctx.fillText('Schéma conventionnel', this.canvas.width / 2, 102);
  }

  variantLabel() {
    return this.variant === 'geotropic'
      ? 'géotropique'
      : this.variant === 'ageotropic'
        ? 'agéotropique'
        : 'cupulolithiase';
  }

  pointOnEllipse(cx, cy, rx, ry, angle, rotation = 0) {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const ex = rx * Math.cos(angle);
    const ey = ry * Math.sin(angle);
    return {
      x: cx + ex * cos - ey * sin,
      y: cy + ex * sin + ey * cos
    };
  }

  drawOpenEllipse({ cx, cy, rx, ry, rotation = 0, openCenter = Math.PI, gap = 0.78, color = '#40c8c0', width = 16, alpha = 1 }) {
    const ctx = this.ctx;
    const start = openCenter + gap / 2;
    const end = openCenter - gap / 2 + Math.PI * 2;

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, rotation, start, end);
    ctx.stroke();
    ctx.restore();

    return {
      p1: this.pointOnEllipse(cx, cy, rx, ry, start, rotation),
      p2: this.pointOnEllipse(cx, cy, rx, ry, end, rotation),
      start,
      end
    };
  }

  drawVerticalScene(type) {
    const leftX = this.canvas.width * 0.29;
    const rightX = this.canvas.width * 0.71;
    const cy = 215;

    this.drawEarLabel(leftX, 125, 'Oreille gauche', this.side === 'left');
    this.drawEarLabel(rightX, 125, 'Oreille droite', this.side === 'right');

    this.drawVerticalCanal(leftX, cy, 'left', type, this.side === 'left');
    this.drawVerticalCanal(rightX, cy, 'right', type, this.side === 'right');
  }

  drawVerticalCanal(panelX, panelY, earSide, type, active) {
    const medial = earSide === 'left' ? 1 : -1;
    const alpha = active ? 1 : 0.34;

    const loopCx = panelX - medial * 18;
    const loopCy = panelY;
    const rx = 78;
    const ry = type === 'post' ? 112 : 118;

    const openCenter = earSide === 'left'
      ? (type === 'post' ? 0.10 * Math.PI : 0.18 * Math.PI)
      : (type === 'post' ? 0.90 * Math.PI : 0.82 * Math.PI);

    const loop = this.drawOpenEllipse({
      cx: loopCx,
      cy: loopCy,
      rx,
      ry,
      rotation: type === 'post' ? 0.03 * medial : -0.05 * medial,
      openCenter,
      gap: 0.78,
      alpha
    });

    const topEnd = loop.p1.y < loop.p2.y ? loop.p1 : loop.p2;
    const bottomEnd = loop.p1.y > loop.p2.y ? loop.p1 : loop.p2;

    const utricle = {
      x: panelX + medial * 86,
      y: type === 'post' ? panelY + 82 : panelY + 74
    };

    this.drawConnector(topEnd, { x: utricle.x, y: utricle.y - 18 }, alpha);
    this.drawConnector(bottomEnd, { x: utricle.x + medial * 8, y: utricle.y - 2 }, alpha);

    this.drawUtricle(utricle.x, utricle.y, 23, alpha);
    this.drawAmpulla(bottomEnd.x, bottomEnd.y, 18, alpha);
    this.drawCupula(bottomEnd.x + medial * 13, bottomEnd.y - 4, medial * 0.25, alpha);

    this.drawSmallLabel('Utricule', utricle.x, utricle.y + 38, alpha);
    this.drawSmallLabel('Ampoule', bottomEnd.x + medial * 46, bottomEnd.y - 8, alpha);

    if (!active) return;

    const progress = this.progress();
    let angle;

    if (type === 'post') {
      angle = earSide === 'left'
        ? 1.10 * Math.PI - progress * 0.82 * Math.PI
        : -0.10 * Math.PI + progress * 0.82 * Math.PI;
    } else {
      angle = earSide === 'left'
        ? 1.55 * Math.PI + progress * 0.55 * Math.PI
        : 1.45 * Math.PI - progress * 0.55 * Math.PI;
    }

    const cluster = this.pointOnEllipse(loopCx, loopCy, rx, ry, angle, type === 'post' ? 0.03 * medial : -0.05 * medial);
    this.drawCluster(cluster.x, cluster.y, 1);
    this.drawArrow(cluster.x - medial * 26, cluster.y + 28, cluster.x + medial * 26, cluster.y + 28, '#14b8a6', 3);
  }

  drawHorizontalScene() {
    const ctx = this.ctx;
    const midX = this.canvas.width / 2;
    const cy = 215;

    ctx.fillStyle = '#edf2f7';
    ctx.beginPath();
    ctx.ellipse(midX, cy, 74, 96, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#cfd8e3';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = '#7a8da5';
    ctx.textAlign = 'center';
    ctx.font = '12px sans-serif';
    ctx.fillText('Repère médian', midX, cy + 118);

    this.drawHorizontalEar(midX - 165, cy, 'left', this.side === 'left');
    this.drawHorizontalEar(midX + 165, cy, 'right', this.side === 'right');
  }

  drawHorizontalEar(panelX, panelY, earSide, active) {
    const medial = earSide === 'left' ? 1 : -1;
    const alpha = active ? 1 : 0.34;

    this.drawEarLabel(panelX, 125, earSide === 'left' ? 'Oreille gauche' : 'Oreille droite', active);

    const loop = this.drawOpenEllipse({
      cx: panelX,
      cy: panelY,
      rx: 105,
      ry: 62,
      rotation: 0,
      openCenter: earSide === 'left' ? 0 : Math.PI,
      gap: 0.62,
      alpha
    });

    const upperEnd = loop.p1.y < loop.p2.y ? loop.p1 : loop.p2;
    const lowerEnd = loop.p1.y > loop.p2.y ? loop.p1 : loop.p2;
    const amp = { x: (upperEnd.x + lowerEnd.x) / 2, y: (upperEnd.y + lowerEnd.y) / 2 };
    const utricle = { x: panelX + medial * 118, y: panelY };

    this.drawConnector(upperEnd, { x: utricle.x, y: utricle.y - 18 }, alpha);
    this.drawConnector(lowerEnd, { x: utricle.x, y: utricle.y + 18 }, alpha);

    this.drawUtricle(utricle.x, utricle.y, 18, alpha);
    this.drawAmpulla(amp.x, amp.y, 16, alpha);
    this.drawCupula(amp.x + medial * 12, amp.y, Math.PI / 2, alpha);

    this.drawSmallLabel('Utricule', utricle.x, utricle.y + 34, alpha);
    this.drawSmallLabel('Ampoule', amp.x + medial * 46, amp.y - 6, alpha);

    if (!active) return;

    const progress = this.progress();
    let cluster;

    if (this.variant === 'cupulo') {
      cluster = { x: amp.x + medial * 8, y: amp.y };
    } else {
      let angle;
      if (this.variant === 'geotropic') {
        angle = earSide === 'left'
          ? 1.15 * Math.PI + progress * 0.70 * Math.PI
          : -0.15 * Math.PI + progress * 0.70 * Math.PI;
      } else {
        angle = earSide === 'left'
          ? 0.15 * Math.PI + progress * 0.50 * Math.PI
          : 0.85 * Math.PI + progress * 0.50 * Math.PI;
      }
      cluster = this.pointOnEllipse(panelX, panelY, 105, 62, angle, 0);
    }

    this.drawCluster(cluster.x, cluster.y, 1);

    const dir = this.variant === 'geotropic' ? medial : -medial;
    this.drawArrow(panelX - 56 * dir, panelY - 96, panelX + 56 * dir, panelY - 96, '#14b8a6', 3);
  }

  drawEarLabel(x, y, text, active) {
    const ctx = this.ctx;
    ctx.fillStyle = active ? '#16324f' : '#7f93aa';
    ctx.font = '700 13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
  }

  drawConnector(p1, p2, alpha = 1) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = '#40c8c0';
    ctx.lineWidth = 12;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
    ctx.restore();
  }

  drawNystagmusTitle() {
    const ctx = this.ctx;
    ctx.fillStyle = '#16324f';
    ctx.font = '700 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Illustration du nystagmus', this.canvas.width / 2, 392);
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
      return { type: 'vertical', dir: shape === 'ant-return' ? 'up' : 'down' };
    }

    if (this.channel === 'horiz') {
      let dir = 'right';

      if (this.test === 'bowlean') {
        if (shape === 'bow') {
          if (this.variant === 'cupulo') dir = this.side === 'right' ? 'left' : 'right';
          else dir = this.side === 'right' ? 'right' : 'left';
        } else if (shape === 'lean') {
          if (this.variant === 'cupulo') dir = this.side === 'right' ? 'right' : 'left';
          else dir = this.side === 'right' ? 'left' : 'right';
        }
      } else if (this.test === 'supineroll') {
        if (shape === 'roll-right') dir = this.variant === 'geotropic' ? 'right' : 'left';
        else if (shape === 'roll-left') dir = this.variant === 'geotropic' ? 'left' : 'right';
        else return { type: 'none' };
      } else {
        dir = this.variant === 'geotropic'
          ? (this.side === 'right' ? 'right' : 'left')
          : (this.side === 'right' ? 'left' : 'right');
      }

      return { type: 'horizontal', dir };
    }

    return { type: 'none' };
  }

  drawEyes() {
    const cx = this.canvas.width / 2;
    const y = 500;
    const nyst = this.getEyeNystagmus();

    this.drawEye(cx - 120, y, 'Œil gauche', nyst);
    this.drawEye(cx + 120, y, 'Œil droit', nyst);
  }

  drawEye(x, y, label, nyst) {
    const ctx = this.ctx;
    const r = 42;

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#9ab0c7';
    ctx.lineWidth = 2;
    ctx.stroke();

    let px = x;
    let py = y;

    if (nyst.type === 'horizontal') px += nyst.dir === 'right' ? 14 : -14;
    if (nyst.type === 'vertical') py += nyst.dir === 'down' ? 14 : -14;

    ctx.fillStyle = '#1565c0';
    ctx.beginPath();
    ctx.arc(px, py, 13, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(px - 4, py - 4, 4, 0, Math.PI * 2);
    ctx.fill();

    if (nyst.type === 'horizontal') {
      if (nyst.dir === 'right') this.drawArrow(x - 24, y, x + 24, y, '#ef4444', 4);
      else this.drawArrow(x + 24, y, x - 24, y, '#ef4444', 4);
    }

    if (nyst.type === 'vertical') {
      if (nyst.dir === 'down') this.drawArrow(x, y - 24, x, y + 24, '#ef4444', 4);
      else this.drawArrow(x, y + 24, x, y - 24, '#ef4444', 4);
    }

    if (nyst.type === 'torsional') this.drawTorsion(x, y, nyst.dir);

    ctx.fillStyle = '#5f7288';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 66);
  }

  drawTorsion(x, y, dir) {
    const ctx = this.ctx;
    const ccw = dir === 'ccw';
    const start = ccw ? Math.PI * 0.15 : Math.PI * 0.85;
    const end = ccw ? Math.PI * 1.30 : Math.PI * -0.30;

    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, 28, start, end, ccw);
    ctx.stroke();

    const ax = x + Math.cos(end) * 28;
    const ay = y + Math.sin(end) * 28;
    this.drawArrow(ax + (ccw ? 10 : -10), ay, ax, ay, '#ef4444', 3);

    ctx.fillStyle = '#ef4444';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(ccw ? 'anti-horaire' : 'horaire', x, y - 54);
  }

  drawLegend() {
    const ctx = this.ctx;
    const x = 18;
    const y = this.canvas.height - 86;
    const w = 320;
    const h = 66;

    ctx.fillStyle = 'rgba(255,255,255,.96)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#dbe5ef';
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#16324f';
    ctx.font = '700 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Légende', x + 10, y + 16);

    this.drawCluster(x + 24, y + 40, 0.55);
    ctx.fillStyle = '#5f7288';
    ctx.font = '11px sans-serif';
    ctx.fillText('Otoconies dans le canal', x + 44, y + 44);

    this.drawArrow(x + 10, y + 58, x + 28, y + 58, '#ef4444', 3);
    ctx.fillText('Sens du nystagmus', x + 44, y + 61);
  }

  drawUtricle(x, y, r, alpha = 1) {
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, r);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(1, '#d9e5ff');

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6f85f3';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  drawAmpulla(x, y, r, alpha = 1) {
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, r);
    g.addColorStop(0, '#f9f1ff');
    g.addColorStop(1, '#c084fc');

    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
  }

  drawCupula(x, y, rotation, alpha = 1) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = '#92e2d4';
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawCluster(x, y, scale = 1) {
    const ctx = this.ctx;
    const dots = [[-6, -4, 4.5], [6, -2, 4], [-2, 6, 4], [7, 6, 4.5]];
    dots.forEach(([dx, dy, dr]) => {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x + dx * scale, y + dy * scale, dr * scale, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.85)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });
  }

  drawSmallLabel(text, x, y, alpha = 1) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#5f7288';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
    ctx.restore();
  }

  drawArrow(x1, y1, x2, y2, color = '#2563eb', width = 4) {
    const ctx = this.ctx;
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const head = 10;

    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - head * Math.cos(angle - Math.PI / 6), y2 - head * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(x2 - head * Math.cos(angle + Math.PI / 6), y2 - head * Math.sin(angle + Math.PI / 6));
    ctx.closePath();
    ctx.fill();
  }
}

window.addEventListener('DOMContentLoaded', () => new DiagnosticVisualizer());
