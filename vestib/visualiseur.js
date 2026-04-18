APP.pageNav('visualiseur.html');

class DiagnosticVisualizer {
  constructor(){
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

  bind(){
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

  resize(){
    const box = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = Math.max(760, Math.floor(box.width));
    this.canvas.height = 640;
    this.render();
  }

  fillChannelSelect(){
    const select = document.getElementById('channelSelect');
    select.innerHTML = Object.values(COURSE_DATA.channels)
      .map(c => `<option value="${c.id}">${c.name}</option>`)
      .join('');
    select.value = this.channel;
  }

  fillTestSelect(){
    const tests = COURSE_DATA.visualizer[this.channel].tests;
    const select = document.getElementById('testSelect');
    select.innerHTML = Object.entries(tests)
      .map(([id, test]) => `<option value="${id}">${test.name}</option>`)
      .join('');
    this.test = Object.keys(tests)[0];
    select.value = this.test;

    document.getElementById('variantWrap').style.display =
      this.channel === 'horiz' ? 'block' : 'none';
  }

  getTest(){
    return COURSE_DATA.visualizer[this.channel].tests[this.test];
  }

  getStep(){
    const steps = this.getTest().steps;
    return steps[Math.max(0, Math.min(this.stepIndex, steps.length - 1))];
  }

  move(delta){
    const steps = this.getTest().steps;
    this.stepIndex = Math.max(0, Math.min(this.stepIndex + delta, steps.length - 1));
    this.render();
  }

  play(){
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

  stop(){
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render(){
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
      <div class="note warn" style="margin-top:12px">Schéma pédagogique simplifié : il sert à comprendre le test, pas à représenter l’anatomie 3D réelle.</div>
    `;

    this.draw();
  }

  draw(){
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = '#f8fbff';
    ctx.fillRect(0, 0, w, h);

    this.drawHeader();
    this.drawCanalZone();
    this.drawNystagmusTitle();
    this.drawEyes();
    this.drawLegend();
  }

  drawHeader(){
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

  drawCanalZone(){
    if (this.channel === 'post') this.drawPosterior();
    if (this.channel === 'horiz') this.drawHorizontal();
    if (this.channel === 'ant') this.drawAnterior();
  }

  variantLabel(){
    return this.variant === 'geotropic'
      ? 'géotropique'
      : this.variant === 'ageotropic'
        ? 'agéotropique'
        : 'cupulolithiase';
  }

  progress(){
    const n = this.getTest().steps.length;
    return n <= 1 ? 0 : this.stepIndex / (n - 1);
  }

  mirrorX(x, centerX){
    return this.side === 'right' ? x : 2 * centerX - x;
  }

  pointOnEllipse(cx, cy, rx, ry, angle, rotation = 0){
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const ex = rx * Math.cos(angle);
    const ey = ry * Math.sin(angle);

    return {
      x: cx + ex * cos - ey * sin,
      y: cy + ex * sin + ey * cos
    };
  }

  drawPosterior(){
    const ctx = this.ctx;
    const cx = this.canvas.width / 2;
    const cy = 205;

    const utricle = { x: cx, y: cy + 74 };
    const loopCenter = { x: this.mirrorX(cx + 92, cx), y: cy + 6 };
    const rotation = this.side === 'right' ? -0.52 : 0.52;
    const rx = 92;
    const ry = 152;

    ctx.strokeStyle = '#43c7c0';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(loopCenter.x, loopCenter.y, rx, ry, rotation, 0.82, 5.46);
    ctx.stroke();

    const connect = this.pointOnEllipse(
      loopCenter.x,
      loopCenter.y,
      rx,
      ry,
      this.side === 'right' ? 2.55 : 0.59,
      rotation
    );

    ctx.beginPath();
    ctx.moveTo(utricle.x, utricle.y + 8);
    ctx.lineTo(connect.x, connect.y);
    ctx.stroke();

    this.drawUtricle(utricle.x, utricle.y, 24);

    const ampAngle = this.side === 'right' ? 5.15 : 4.27;
    const amp = this.pointOnEllipse(loopCenter.x, loopCenter.y, rx, ry, ampAngle, rotation);
    this.drawAmpulla(amp.x, amp.y, 19);

    const cup = this.pointOnEllipse(
      loopCenter.x,
      loopCenter.y,
      rx - 4,
      ry - 4,
      ampAngle - (this.side === 'right' ? 0.22 : -0.22),
      rotation
    );
    this.drawCupula(cup.x, cup.y, this.side === 'right' ? -0.35 : 0.35);

    const travelStart = this.side === 'right' ? 0.88 : 2.26;
    const travelEnd = this.side === 'right' ? 5.02 : 4.40;
    const angle = travelStart + (travelEnd - travelStart) * this.progress();
    const cluster = this.pointOnEllipse(loopCenter.x, loopCenter.y, rx, ry, angle, rotation);
    this.drawCluster(cluster.x, cluster.y);

    this.drawPathFlowHint(cluster.x, cluster.y, this.side === 'right' ? 1 : -1, '#14b8a6');
    this.drawSmallLabel('Utricule', utricle.x, utricle.y + 42);
    this.drawSmallLabel('Ampoule', amp.x + (this.side === 'right' ? 34 : -34), amp.y - 8);
  }

  drawHorizontal(){
    const ctx = this.ctx;
    const cx = this.canvas.width / 2;
    const cy = 205;
    const rx = 190;
    const ry = 82;

    ctx.strokeStyle = '#43c7c0';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();

    const utricle = { x: cx, y: cy };
    this.drawUtricle(utricle.x, utricle.y, 22);

    const ampX = this.side === 'right' ? cx + rx : cx - rx;
    this.drawAmpulla(ampX, cy, 18);
    this.drawCupula(ampX + (this.side === 'right' ? -14 : 14), cy, this.side === 'right' ? 0 : Math.PI);

    let cluster;

    if (this.variant === 'cupulo') {
      cluster = { x: ampX + (this.side === 'right' ? -22 : 22), y: cy };
    } else {
      const rightAngles = this.variant === 'geotropic'
        ? [Math.PI * 0.95, Math.PI * 0.15, Math.PI * 1.82]
        : [Math.PI * 1.95, Math.PI * 1.75, Math.PI * 0.05];

      const leftAngles = this.variant === 'geotropic'
        ? [Math.PI * 0.05, Math.PI * 0.85, Math.PI * 1.18]
        : [Math.PI * 1.05, Math.PI * 1.25, Math.PI * 0.95];

      const angles = this.side === 'right' ? rightAngles : leftAngles;
      const a = angles[Math.min(this.stepIndex, angles.length - 1)];
      cluster = this.pointOnEllipse(cx, cy, rx, ry, a, 0);
    }

    this.drawCluster(cluster.x, cluster.y);
    this.drawSmallLabel('Utricule', utricle.x, utricle.y + 38);
    this.drawSmallLabel('Ampoule', ampX + (this.side === 'right' ? 42 : -42), cy - 8);

    const flowDir = this.variant === 'geotropic' ? 1 : -1;
    this.drawArrow(cx - 80 * flowDir, cy - 112, cx + 80 * flowDir, cy - 112, '#14b8a6', 4);
  }

  drawAnterior(){
    const ctx = this.ctx;
    const cx = this.canvas.width / 2;
    const cy = 205;

    const utricle = { x: cx, y: cy + 78 };
    const loopCenter = { x: this.mirrorX(cx + 92, cx), y: cy + 6 };
    const rotation = this.side === 'right' ? 0.52 : -0.52;
    const rx = 92;
    const ry = 152;

    ctx.strokeStyle = '#43c7c0';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(loopCenter.x, loopCenter.y, rx, ry, rotation, 0.82, 5.46);
    ctx.stroke();

    const connect = this.pointOnEllipse(
      loopCenter.x,
      loopCenter.y,
      rx,
      ry,
      this.side === 'right' ? 3.70 : 5.72,
      rotation
    );

    ctx.beginPath();
    ctx.moveTo(utricle.x, utricle.y + 8);
    ctx.lineTo(connect.x, connect.y);
    ctx.stroke();

    this.drawUtricle(utricle.x, utricle.y, 24);

    const ampAngle = this.side === 'right' ? 4.05 : 5.38;
    const amp = this.pointOnEllipse(loopCenter.x, loopCenter.y, rx, ry, ampAngle, rotation);
    this.drawAmpulla(amp.x, amp.y, 19);

    const cup = this.pointOnEllipse(
      loopCenter.x,
      loopCenter.y,
      rx - 4,
      ry - 4,
      ampAngle + (this.side === 'right' ? 0.22 : -0.22),
      rotation
    );
    this.drawCupula(cup.x, cup.y, this.side === 'right' ? 0.38 : -0.38);

    const travelStart = this.side === 'right' ? 5.14 : 4.44;
    const travelEnd = this.side === 'right' ? 1.26 : 2.00;
    const angle = travelStart + (travelEnd - travelStart) * this.progress();
    const cluster = this.pointOnEllipse(loopCenter.x, loopCenter.y, rx, ry, angle, rotation);
    this.drawCluster(cluster.x, cluster.y);

    this.drawPathFlowHint(cluster.x, cluster.y, this.side === 'right' ? -1 : 1, '#14b8a6');
    this.drawSmallLabel('Utricule', utricle.x, utricle.y + 42);
    this.drawSmallLabel('Ampoule', amp.x + (this.side === 'right' ? -36 : 36), amp.y - 8);
  }

  drawNystagmusTitle(){
    const ctx = this.ctx;
    ctx.fillStyle = '#16324f';
    ctx.font = '700 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Illustration du nystagmus', this.canvas.width / 2, 360);
  }

  getEyeNystagmus(){
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

  drawEyes(){
    const cx = this.canvas.width / 2;
    const y = 465;
    const nyst = this.getEyeNystagmus();

    this.drawEye(cx - 120, y, 'Œil gauche', nyst);
    this.drawEye(cx + 120, y, 'Œil droit', nyst);
  }

  drawEye(x, y, label, nyst){
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

  drawTorsion(x, y, dir){
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

  drawLegend(){
    const ctx = this.ctx;
    const x = 18;
    const y = this.canvas.height - 86;
    const w = 300;
    const h = 64;

    ctx.fillStyle = 'rgba(255,255,255,.96)';
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = '#dbe5ef';
    ctx.strokeRect(x, y, w, h);

    ctx.fillStyle = '#16324f';
    ctx.font = '700 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Légende', x + 10, y + 16);

    this.drawCluster(x + 24, y + 38, 0.55);
    ctx.fillStyle = '#5f7288';
    ctx.font = '11px sans-serif';
    ctx.fillText('Otoconies', x + 44, y + 42);

    this.drawArrow(x + 10, y + 57, x + 28, y + 57, '#ef4444', 3);
    ctx.fillText('Sens du nystagmus', x + 44, y + 60);
  }

  drawUtricle(x, y, r){
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, r);
    g.addColorStop(0, '#ffffff');
    g.addColorStop(1, '#d9e5ff');

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6f85f3';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  drawAmpulla(x, y, r){
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, r);
    g.addColorStop(0, '#f9f1ff');
    g.addColorStop(1, '#c084fc');

    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  drawCupula(x, y, rotation){
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.fillStyle = '#92e2d4';
    ctx.beginPath();
    ctx.ellipse(0, 0, 9, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  drawCluster(x, y, scale = 1){
    const ctx = this.ctx;
    const dots = [[-6,-4,4.5],[6,-2,4],[-2,6,4],[7,6,4.5]];

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

  drawPathFlowHint(x, y, dir, color){
    this.drawArrow(x - 26 * dir, y + 28, x + 26 * dir, y + 28, color, 3);
  }

  drawSmallLabel(text, x, y){
    const ctx = this.ctx;
    ctx.fillStyle = '#5f7288';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);
  }

  drawArrow(x1, y1, x2, y2, color, width){
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
    ctx.lineTo(
      x2 - head * Math.cos(angle - Math.PI / 6),
      y2 - head * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      x2 - head * Math.cos(angle + Math.PI / 6),
      y2 - head * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }
}

window.addEventListener('DOMContentLoaded', () => new DiagnosticVisualizer());
