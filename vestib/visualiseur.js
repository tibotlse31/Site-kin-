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
    document.getElementById('resetBtn').addEventListener('click', () => { this.stop(); this.stepIndex = 0; this.render(); });
    document.getElementById('playBtn').addEventListener('click', () => this.play());
    new ResizeObserver(() => this.resize()).observe(this.canvas.parentElement);
    this.resize();
  }

  resize(){
    const box = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = Math.max(720, Math.floor(box.width));
    this.canvas.height = 620;
    this.render();
  }

  fillChannelSelect(){
    const select = document.getElementById('channelSelect');
    select.innerHTML = Object.values(COURSE_DATA.channels).map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    select.value = this.channel;
  }

  fillTestSelect(){
    const tests = COURSE_DATA.visualizer[this.channel].tests;
    const select = document.getElementById('testSelect');
    select.innerHTML = Object.entries(tests).map(([id, test]) => `<option value="${id}">${test.name}</option>`).join('');
    this.test = Object.keys(tests)[0];
    select.value = this.test;
    document.getElementById('variantWrap').style.display = this.channel === 'horiz' ? 'block' : 'none';
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
    if(this.timer){ this.stop(); return; }
    const steps = this.getTest().steps;
    this.stepIndex = 0;
    this.render();
    this.timer = setInterval(() => {
      if(this.stepIndex >= steps.length - 1){ this.stop(); return; }
      this.stepIndex += 1;
      this.render();
    }, 1800);
  }

  stop(){
    if(this.timer){ clearInterval(this.timer); this.timer = null; }
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
      <div class="note warn" style="margin-top:12px">Le visuel illustre le raisonnement. Il ne remplace pas l’observation clinique réelle.</div>
    `;
    this.draw();
  }

  draw(){
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#f8fbff';
    ctx.fillRect(0,0,w,h);

    this.drawHeader();
    this.drawCanal();
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
    ctx.fillText(`${channel.name} — ${test.name}`, this.canvas.width / 2, 34);
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#5f7288';
    let subtitle = `Côté atteint : ${this.side === 'right' ? 'droite' : 'gauche'}`;
    if(this.channel === 'horiz') subtitle += ` • ${this.variantLabel()}`;
    ctx.fillText(subtitle, this.canvas.width / 2, 58);
  }

  variantLabel(){
    return this.variant === 'geotropic' ? 'géotropique' : this.variant === 'ageotropic' ? 'agéotropique' : 'cupulolithiase';
  }

  drawCanal(){
    if(this.channel === 'post') this.drawPosterior();
    if(this.channel === 'horiz') this.drawHorizontal();
    if(this.channel === 'ant') this.drawAnterior();
  }

  drawPosterior(){
    const ctx = this.ctx;
    const cx = this.canvas.width / 2;
    const cy = 185;
    const r = 130;
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r, Math.PI, 0, false);
    ctx.stroke();
    this.drawVestibule(cx, cy + 58, 28);
    this.drawAmpulla(cx + r, cy, 20);
    this.drawArrow(cx - 80, cy + 128, cx + 65, cy + 128, '#14b8a6', 4);
    const p = this.stepIndex / (this.getTest().steps.length - 1 || 1);
    const angle = Math.PI - p * Math.PI;
    const ox = cx + Math.cos(angle) * r;
    const oy = cy + Math.sin(angle) * r;
    this.drawCluster(ox, oy);
  }

  drawHorizontal(){
    const ctx = this.ctx;
    const cx = this.canvas.width / 2;
    const cy = 185;
    const rx = 185;
    const ry = 72;
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.stroke();
    this.drawVestibule(cx, cy, 24);
    this.drawAmpulla(cx + rx, cy, 18);
    this.drawAmpulla(cx - rx, cy, 18);
    const sign = this.variant === 'geotropic' ? 1 : -1;
    if(sign > 0) this.drawArrow(cx - 80, cy - 110, cx + 80, cy - 110, '#14b8a6', 4);
    else this.drawArrow(cx + 80, cy - 110, cx - 80, cy - 110, '#14b8a6', 4);
    const p = this.stepIndex / (this.getTest().steps.length - 1 || 1);
    const from = this.side === 'right' ? cx - 60 : cx + 60;
    const to = this.side === 'right' ? cx + rx - 10 : cx - rx + 10;
    const ox = from + (to - from) * p;
    this.drawCluster(ox, cy);
  }

  drawAnterior(){
    const ctx = this.ctx;
    const cx = this.canvas.width / 2;
    const cy = 185;
    const r = 130;
    ctx.strokeStyle = '#4ecdc4';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI, false);
    ctx.stroke();
    this.drawVestibule(cx, cy - 58, 28);
    this.drawAmpulla(cx - r, cy, 20);
    this.drawArrow(cx + 70, cy + 128, cx - 70, cy + 128, '#14b8a6', 4);
    const p = this.stepIndex / (this.getTest().steps.length - 1 || 1);
    const angle = p * Math.PI;
    const ox = cx + Math.cos(angle) * r;
    const oy = cy + Math.sin(angle) * r;
    this.drawCluster(ox, oy);
  }

  drawEyes(){
    const cx = this.canvas.width / 2;
    const y = 430;
    const nyst = this.getEyeNystagmus();
    this.drawEye(cx - 110, y, 'Œil gauche', nyst);
    this.drawEye(cx + 110, y, 'Œil droit', nyst);
    const ctx = this.ctx;
    ctx.fillStyle = '#16324f';
    ctx.font = '700 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Illustration du nystagmus', cx, 340);
  }

  getEyeNystagmus(){
    const shape = this.getStep().shape;
    if(shape === 'neutral') return {type:'none'};
    if(this.channel === 'post'){
      return {type:'torsional', dir: shape === 'post-return' ? (this.side === 'right' ? 'cw' : 'ccw') : (this.side === 'right' ? 'ccw' : 'cw')};
    }
    if(this.channel === 'ant'){
      return {type:'vertical', dir: shape === 'ant-return' ? 'up' : 'down'};
    }
    if(this.channel === 'horiz'){
      let dir = 'right';
      if(this.test === 'bowlean'){
        if(shape === 'bow'){
          if(this.variant === 'cupulo') dir = this.side === 'right' ? 'left' : 'right';
          else dir = this.side === 'right' ? 'right' : 'left';
        } else if(shape === 'lean') {
          if(this.variant === 'cupulo') dir = this.side === 'right' ? 'right' : 'left';
          else dir = this.side === 'right' ? 'left' : 'right';
        }
      } else if(this.test === 'supineroll'){
        if(shape === 'roll-right'){
          if(this.variant === 'geotropic') dir = 'right';
          else dir = 'left';
        } else if(shape === 'roll-left'){
          if(this.variant === 'geotropic') dir = 'left';
          else dir = 'right';
        } else {
          return {type:'none'};
        }
      } else {
        dir = this.variant === 'geotropic' ? (this.side === 'right' ? 'right' : 'left') : (this.side === 'right' ? 'left' : 'right');
      }
      return {type:'horizontal', dir};
    }
    return {type:'none'};
  }

  drawEye(x,y,label,nyst){
    const ctx = this.ctx;
    const r = 42;
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#9ab0c7'; ctx.lineWidth = 2; ctx.stroke();
    let px=x, py=y;
    if(nyst.type === 'horizontal') px += nyst.dir === 'right' ? 14 : -14;
    if(nyst.type === 'vertical') py += nyst.dir === 'down' ? 14 : -14;
    ctx.fillStyle = '#1565c0';
    ctx.beginPath(); ctx.arc(px,py,13,0,Math.PI*2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(px-4,py-4,4,0,Math.PI*2); ctx.fill();
    if(nyst.type === 'horizontal'){
      if(nyst.dir === 'right') this.drawArrow(x - 24, y, x + 24, y, '#ef4444', 4);
      else this.drawArrow(x + 24, y, x - 24, y, '#ef4444', 4);
    }
    if(nyst.type === 'vertical'){
      if(nyst.dir === 'down') this.drawArrow(x, y - 24, x, y + 24, '#ef4444', 4);
      else this.drawArrow(x, y + 24, x, y - 24, '#ef4444', 4);
    }
    if(nyst.type === 'torsional') this.drawTorsion(x, y, nyst.dir);
    ctx.fillStyle = '#5f7288'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(label, x, y + 66);
  }

  drawTorsion(x,y,dir){
    const ctx = this.ctx;
    const ccw = dir === 'ccw';
    const start = ccw ? Math.PI * 0.15 : Math.PI * 0.85;
    const end = ccw ? Math.PI * 1.3 : Math.PI * -0.3;
    ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 4; ctx.beginPath();
    ctx.arc(x,y,28,start,end,ccw); ctx.stroke();
    const ax = x + Math.cos(end) * 28;
    const ay = y + Math.sin(end) * 28;
    this.drawArrow(ax + (ccw ? 10 : -10), ay, ax, ay, '#ef4444', 3);
    ctx.fillStyle = '#ef4444'; ctx.font = '12px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText(ccw ? 'anti-horaire' : 'horaire', x, y - 54);
  }

  drawLegend(){
    const ctx = this.ctx;
    const x = 18, y = this.canvas.height - 90, w = 290, h = 68;
    ctx.fillStyle = 'rgba(255,255,255,.96)';
    ctx.fillRect(x,y,w,h);
    ctx.strokeStyle = '#dbe5ef'; ctx.strokeRect(x,y,w,h);
    ctx.fillStyle = '#16324f'; ctx.font = '700 12px sans-serif'; ctx.textAlign = 'left';
    ctx.fillText('Légende', x+10, y+16);
    this.drawCluster(x + 26, y + 38, 0.55);
    ctx.fillStyle = '#5f7288'; ctx.font = '11px sans-serif';
    ctx.fillText('Otoconies / cristaux', x + 44, y + 42);
    this.drawArrow(x + 10, y + 58, x + 28, y + 58, '#ef4444', 3);
    ctx.fillText('Sens du nystagmus illustré', x + 44, y + 61);
  }

  drawVestibule(x,y,r){
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(x-4,y-4,2,x,y,r);
    g.addColorStop(0,'#fff'); g.addColorStop(1,'#c7d2fe');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#818cf8'; ctx.lineWidth = 2; ctx.stroke();
  }

  drawAmpulla(x,y,r){
    const ctx = this.ctx;
    const g = ctx.createRadialGradient(x-4,y-4,2,x,y,r);
    g.addColorStop(0,'#f5edff'); g.addColorStop(1,'#c084fc');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.strokeStyle = '#a855f7'; ctx.lineWidth = 2; ctx.stroke();
  }

  drawCluster(x,y,scale=1){
    const ctx = this.ctx;
    const dots = [[-6,-4,4.5],[6,-2,4],[-2,6,4],[7,6,4.5]];
    dots.forEach(([dx,dy,dr]) => {
      ctx.fillStyle = '#ef4444';
      ctx.beginPath(); ctx.arc(x + dx * scale, y + dy * scale, dr * scale, 0, Math.PI*2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.lineWidth = 1; ctx.stroke();
    });
  }

  drawArrow(x1,y1,x2,y2,color,width){
    const ctx = this.ctx;
    const angle = Math.atan2(y2-y1, x2-x1);
    const head = 10;
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1,y1); ctx.lineTo(x2,y2); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x2,y2);
    ctx.lineTo(x2 - head * Math.cos(angle - Math.PI/6), y2 - head * Math.sin(angle - Math.PI/6));
    ctx.lineTo(x2 - head * Math.cos(angle + Math.PI/6), y2 - head * Math.sin(angle + Math.PI/6));
    ctx.closePath(); ctx.fill();
  }
}

window.addEventListener('DOMContentLoaded', () => new DiagnosticVisualizer());
