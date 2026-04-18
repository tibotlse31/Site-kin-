// ========================================
// VPPB SIMULATOR - VISUALISATION SIMPLE
// ========================================

class SimpleLabyrinthVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = 0;
        this.height = 0;
        this.needsRender = true;

        this.resizeObserver = new ResizeObserver(() => this.handleResize());
        this.resizeObserver.observe(this.canvas.parentElement);

        this.handleResize();
        this.startLoop();
    }

    handleResize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.width = Math.max(500, rect.width);
        this.height = Math.max(520, rect.height);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.requestRender();
    }

    requestRender() {
        this.needsRender = true;
    }

    startLoop() {
        const loop = () => {
            if (this.needsRender || (window.simulator && window.simulator.isAnimating)) {
                this.draw();
                this.needsRender = false;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    draw() {
        if (!window.simulator) return;

        this.ctx.fillStyle = '#f8fafc';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.drawTitle();
        this.drawCanalZone();
        this.drawEyesZone();
        this.drawBottomInfo();
    }

    drawTitle() {
        const ctx = this.ctx;
        const sim = window.simulator;

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 22px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(this.getCanalTitle(), this.width / 2, 32);

        ctx.fillStyle = '#475569';
        ctx.font = '13px Arial';
        let sub = `Côté atteint : ${sim.affectedSide === 'right' ? 'droite' : 'gauche'}`;
        if (sim.currentCanal === 'horiz') {
            sub += ` • ${this.getHorizontalVariantLabel()}`;
        }
        ctx.fillText(sub, this.width / 2, 54);
    }

    drawCanalZone() {
        const sim = window.simulator;

        if (sim.currentCanal === 'post') this.drawPosteriorCanal();
        if (sim.currentCanal === 'horiz') this.drawHorizontalCanal();
        if (sim.currentCanal === 'ant') this.drawAnteriorCanal();

        if (sim.currentMode === 'none') {
            this.ctx.fillStyle = '#64748b';
            this.ctx.font = '15px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Choisis une manœuvre ou un test pour voir l’animation.', this.width / 2, this.height * 0.48);
        }
    }

    drawPosteriorCanal() {
        const ctx = this.ctx;
        const cx = this.width / 2;
        const cy = this.height * 0.26;
        const r = Math.min(this.width, this.height) * 0.17;

        ctx.save();

        // Canal
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0, false);
        ctx.stroke();

        // Vestibule
        this.drawVestibule(cx, cy + r * 0.42, 25);

        // Ampoule
        this.drawAmpulla(cx + r, cy, 22);

        // Cupule
        this.drawCupula(cx + r - 10, cy, 10, 18, Math.PI / 4);

        // Flux simple
        this.drawFlowArrow(cx - r * 0.35, cy + r * 0.65, cx + r * 0.15, cy + r * 0.65, simDirectionSign());

        // Otolithes
        const p = window.simulator.otolithPosition;
        const angle = Math.PI - p * Math.PI;
        const ox = cx + Math.cos(angle) * r;
        const oy = cy + Math.sin(angle) * r;
        this.drawTrailPosterior(cx, cy, r, p);
        this.drawCrystalCluster(ox, oy);

        // Labels
        this.drawLabel('Canal', cx, cy - r - 18);
        this.drawLabel('Vestibule', cx, cy + r * 0.42 + 45);
        this.drawLabel('Ampoule', cx + r, cy - 32);

        ctx.restore();

        function simDirectionSign() {
            const sim = window.simulator;
            if (sim.currentMode === 'none') return 1;
            return sim.affectedSide === 'right' ? 1 : -1;
        }
    }

    drawHorizontalCanal() {
        const ctx = this.ctx;
        const cx = this.width / 2;
        const cy = this.height * 0.26;
        const rx = Math.min(this.width, 900) * 0.17;
        const ry = Math.min(this.height, 620) * 0.09;

        ctx.save();

        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        this.drawVestibule(cx, cy, 24);
        this.drawAmpulla(cx + rx, cy, 20);
        this.drawAmpulla(cx - rx, cy, 20);

        this.drawFlowArrow(cx - 45, cy - ry - 30, cx + 45, cy - ry - 30, this.getHorizontalFlowSign());

        const p = window.simulator.otolithPosition;
        const isRight = window.simulator.affectedSide === 'right';
        const startX = isRight ? cx - rx * 0.2 : cx + rx * 0.2;
        const endX = isRight ? cx + rx * 0.8 : cx - rx * 0.8;
        const ox = startX + (endX - startX) * p;
        const oy = cy;

        this.drawTrailLine(startX, cy, ox, oy);
        this.drawCrystalCluster(ox, oy);

        this.drawLabel('Canal horizontal', cx, cy - ry - 48);
        this.drawLabel('Vestibule', cx, cy + 42);
        this.drawLabel('D', cx + rx, cy - 28);
        this.drawLabel('G', cx - rx, cy - 28);

        ctx.restore();
    }

    drawAnteriorCanal() {
        const ctx = this.ctx;
        const cx = this.width / 2;
        const cy = this.height * 0.24;
        const r = Math.min(this.width, this.height) * 0.17;

        ctx.save();

        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 18;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI, false);
        ctx.stroke();

        this.drawVestibule(cx, cy - r * 0.42, 25);
        this.drawAmpulla(cx - r, cy, 22);
        this.drawCupula(cx - r + 10, cy, 10, 18, -Math.PI / 4);

        this.drawFlowArrow(cx + r * 0.2, cy + r * 0.65, cx - r * 0.25, cy + r * 0.65, -1);

        const p = window.simulator.otolithPosition;
        const angle = p * Math.PI;
        const ox = cx + Math.cos(angle) * r;
        const oy = cy + Math.sin(angle) * r;

        this.drawTrailAnterior(cx, cy, r, p);
        this.drawCrystalCluster(ox, oy);

        this.drawLabel('Canal', cx, cy + r + 26);
        this.drawLabel('Vestibule', cx, cy - r * 0.42 - 34);
        this.drawLabel('Ampoule', cx - r, cy + 34);

        ctx.restore();
    }

    drawVestibule(x, y, radius) {
        const ctx = this.ctx;
        const g = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, radius);
        g.addColorStop(0, '#ffffff');
        g.addColorStop(1, '#c7d2fe');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawAmpulla(x, y, radius) {
        const ctx = this.ctx;
        const g = ctx.createRadialGradient(x - 4, y - 4, 2, x, y, radius);
        g.addColorStop(0, '#f5edff');
        g.addColorStop(1, '#c084fc');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    drawCupula(x, y, rx, ry, rotation) {
        const ctx = this.ctx;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.fillStyle = '#95e1d3';
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    drawFlowArrow(x1, y1, x2, y2, sign = 1) {
        if (sign >= 0) {
            this.drawArrow(x1, y1, x2, y2, '#14b8a6', 4);
        } else {
            this.drawArrow(x2, y2, x1, y1, '#14b8a6', 4);
        }
    }

    drawArrow(x1, y1, x2, y2, color = '#2563eb', width = 4) {
        const ctx = this.ctx;
        const angle = Math.atan2(y2 - y1, x2 - x1);
        const head = 10;

        ctx.save();
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

        ctx.restore();
    }

    drawCrystalCluster(x, y) {
        const ctx = this.ctx;
        const offsets = [
            { x: -6, y: -4, r: 4.5 },
            { x: 6, y: -2, r: 4 },
            { x: -2, y: 6, r: 4 },
            { x: 7, y: 6, r: 4.5 }
        ];

        offsets.forEach(o => {
            ctx.beginPath();
            ctx.fillStyle = '#ef4444';
            ctx.arc(x + o.x, y + o.y, o.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.7)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }

    drawTrailPosterior(cx, cy, r, p) {
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = 'rgba(239,68,68,0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let t = 0; t <= p; t += 0.02) {
            const angle = Math.PI - t * Math.PI;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
    }

    drawTrailAnterior(cx, cy, r, p) {
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = 'rgba(239,68,68,0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let t = 0; t <= p; t += 0.02) {
            const angle = t * Math.PI;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            if (t === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.restore();
    }

    drawTrailLine(x1, y1, x2, y2) {
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = 'rgba(239,68,68,0.25)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.restore();
    }

    drawEyesZone() {
        const ctx = this.ctx;
        const sim = window.simulator;

        const centerY = this.height * 0.70;
        const leftX = this.width / 2 - 110;
        const rightX = this.width / 2 + 110;

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Mouvements oculaires', this.width / 2, this.height * 0.58);

        this.drawEye(leftX, centerY, 'Œil gauche', sim.nystagmus);
        this.drawEye(rightX, centerY, 'Œil droit', sim.nystagmus);
    }

    drawEye(x, y, label, nyst) {
        const ctx = this.ctx;
        const eyeR = 42;
        const pupilR = 13;

        ctx.save();

        // oeil
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, eyeR, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();

        // pupille
        let px = x;
        let py = y;

        if (nyst.active && nyst.type === 'horizontal') {
            const d = 14 * nyst.intensity;
            px = nyst.direction === 'right' ? x + d : x - d;
        }

        if (nyst.active && nyst.type === 'vertical') {
            const d = 14 * nyst.intensity;
            py = nyst.direction === 'down' ? y + d : y - d;
        }

        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(px, py, pupilR, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(px - 4, py - 4, 4, 0, Math.PI * 2);
        ctx.fill();

        // flèche ou rotation
        if (nyst.active) {
            if (nyst.type === 'horizontal') {
                if (nyst.direction === 'right') this.drawArrow(x - 24, y, x + 24, y, '#ef4444', 4);
                if (nyst.direction === 'left') this.drawArrow(x + 24, y, x - 24, y, '#ef4444', 4);
            }

            if (nyst.type === 'vertical') {
                if (nyst.direction === 'down') this.drawArrow(x, y - 24, x, y + 24, '#ef4444', 4);
                if (nyst.direction === 'up') this.drawArrow(x, y + 24, x, y - 24, '#ef4444', 4);
            }

            if (nyst.type === 'torsional') {
                this.drawCircularArrow(x, y, 26, nyst.direction === 'ccw');
            }
        }

        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + 64);

        ctx.restore();
    }

    drawCircularArrow(cx, cy, r, ccw = false) {
        const ctx = this.ctx;
        const start = ccw ? Math.PI * 0.2 : Math.PI * 0.8;
        const end = ccw ? Math.PI * 1.55 : Math.PI * -0.55;

        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, r, start, end, ccw);
        ctx.stroke();

        const angle = end;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        const dx = ccw ? -10 : 10;
        this.drawArrow(x - dx, y, x, y, '#ef4444', 3);
        ctx.restore();
    }

    drawBottomInfo() {
        const ctx = this.ctx;
        const sim = window.simulator;

        const x = 20;
        const y = this.height - 90;
        const w = this.width - 40;
        const h = 58;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.strokeStyle = 'rgba(148,163,184,0.35)';
        ctx.lineWidth = 1;
        this.roundRect(x, y, w, h, 10, true, true);

        let txt = 'Aucune animation active';
        if (sim.currentMode === 'manoeuvre' && sim.currentManoeuvre) {
            txt = `Manœuvre : ${sim.currentManoeuvre.name} — étape ${sim.currentStep}/${sim.totalSteps}`;
        }
        if (sim.currentMode === 'test' && sim.currentTest) {
            txt = `Test : ${sim.currentTest.name} — étape ${sim.currentStep}/${sim.totalSteps}`;
        }

        ctx.fillStyle = '#334155';
        ctx.font = '13px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(txt, x + 14, y + 24);

        ctx.fillStyle = '#64748b';
        ctx.font = '12px Arial';
        ctx.fillText(`Nystagmus : ${sim.nystagmus.active ? sim.nystagmus.label : 'aucun'}`, x + 14, y + 44);

        ctx.restore();
    }

    roundRect(x, y, w, h, r, fill, stroke) {
        const ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
        if (fill) ctx.fill();
        if (stroke) ctx.stroke();
    }

    drawLabel(text, x, y) {
        this.ctx.fillStyle = '#64748b';
        this.ctx.font = '12px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(text, x, y);
    }

    getCanalTitle() {
        const sim = window.simulator;
        if (sim.currentCanal === 'post') return 'Canal postérieur';
        if (sim.currentCanal === 'horiz') return 'Canal horizontal';
        return 'Canal antérieur';
    }

    getHorizontalVariantLabel() {
        const sim = window.simulator;
        if (sim.horizontalVariant === 'geotropic') return 'géotropique';
        if (sim.horizontalVariant === 'ageotropic') return 'agéotropique';
        return 'cupulolithiase';
    }

    getHorizontalFlowSign() {
        const sim = window.simulator;
        if (sim.horizontalVariant === 'geotropic') return 1;
        return -1;
    }
}

window.addEventListener('load', () => {
    window.visualization = new SimpleLabyrinthVisualization('labyrinthe');
});
