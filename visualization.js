// ========================================
// VPPB SIMULATOR - VISUALIZATION SIMPLE (corrigée)
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
        this.height = Math.max(520, rect.height || 520);
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

        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.width, this.height);

        // fond
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, this.width, this.height);

        this.drawTitle();
        this.drawCanalZone();
        this.drawEyesZone();
        this.drawBottomLegend();
    }

    drawTitle() {
        const ctx = this.ctx;
        const sim = window.simulator;

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 22px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(this.getCanalTitle(), this.width / 2, 32);

        let sub = `Côté atteint : ${sim.affectedSide === 'right' ? 'droite' : 'gauche'}`;
        if (sim.currentCanal === 'horiz') {
            sub += ` • ${this.getHorizontalVariantLabel()}`;
        }

        ctx.fillStyle = '#64748b';
        ctx.font = '13px sans-serif';
        ctx.fillText(sub, this.width / 2, 54);
    }

    // =========================
    // ZONE CANAL
    // =========================

    drawCanalZone() {
        const sim = window.simulator;

        if (sim.currentCanal === 'post') this.drawPosteriorCanal();
        if (sim.currentCanal === 'horiz') this.drawHorizontalCanal();
        if (sim.currentCanal === 'ant') this.drawAnteriorCanal();

        if (!sim.currentManoeuvre && !sim.currentTest) {
            const ctx = this.ctx;
            ctx.fillStyle = '#64748b';
            ctx.font = '15px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Choisir une manœuvre ou un test pour démarrer.', this.width / 2, this.height * 0.46);
        }
    }

    drawPosteriorCanal() {
        const ctx = this.ctx;
        const sim = window.simulator;

        const cx = this.width / 2;
        const cy = this.height * 0.25;
        const r = Math.min(this.width, this.height) * 0.16;

        // titre local
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Canal postérieur', cx, 85);

        // canal
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 16;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, r, Math.PI, 0, false);
        ctx.stroke();

        // vestibule
        this.drawVestibule(cx, cy + r * 0.45, 24);

        // ampoule
        this.drawAmpulla(cx + r, cy, 20);

        // cupule
        this.drawCupula(cx + r - 8, cy, 10, 17, Math.PI / 4);

        // flèche simple du flux
        this.drawSimpleFlowArrow(cx - r * 0.35, cy + r * 0.65, cx + r * 0.20, cy + r * 0.65, sim.affectedSide === 'right' ? 1 : -1);

        // trajectoire otolithes
        const p = sim.otolithPosition;
        const angle = Math.PI - p * Math.PI;
        const ox = cx + Math.cos(angle) * r;
        const oy = cy + Math.sin(angle) * r;

        this.drawPosteriorTrail(cx, cy, r, p);
        this.drawCrystalCluster(ox, oy);

        // labels
        this.drawLabel('Vestibule', cx, cy + r * 0.45 + 42);
        this.drawLabel('Ampoule', cx + r, cy - 30);
    }

    drawHorizontalCanal() {
        const ctx = this.ctx;
        const sim = window.simulator;

        const cx = this.width / 2;
        const cy = this.height * 0.25;
        const rx = Math.min(this.width, 900) * 0.16;
        const ry = Math.min(this.height, 620) * 0.08;

        ctx.fillStyle = '#334155';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Canal horizontal', cx, 85);

        // canal ellipse
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 16;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // vestibule
        this.drawVestibule(cx, cy, 22);

        // ampoules
        this.drawAmpulla(cx + rx, cy, 18);
        this.drawAmpulla(cx - rx, cy, 18);

        // flèche flux
        this.drawSimpleFlowArrow(cx - 45, cy - ry - 28, cx + 45, cy - ry - 28, this.getHorizontalFlowSign());

        // otolithes
        const p = sim.otolithPosition;
        const isRight = sim.affectedSide === 'right';
        const startX = isRight ? cx - rx * 0.2 : cx + rx * 0.2;
        const endX = isRight ? cx + rx * 0.8 : cx - rx * 0.8;
        const ox = startX + (endX - startX) * p;
        const oy = cy;

        this.drawLineTrail(startX, cy, ox, oy);
        this.drawCrystalCluster(ox, oy);

        this.drawLabel('Vestibule', cx, cy + 40);
        this.drawLabel('D', cx + rx, cy - 25);
        this.drawLabel('G', cx - rx, cy - 25);
    }

    drawAnteriorCanal() {
        const ctx = this.ctx;
        const sim = window.simulator;

        const cx = this.width / 2;
        const cy = this.height * 0.25;
        const r = Math.min(this.width, this.height) * 0.16;

        ctx.fillStyle = '#334155';
        ctx.font = 'bold 15px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Canal antérieur', cx, 85);

        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 16;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI, false);
        ctx.stroke();

        this.drawVestibule(cx, cy - r * 0.45, 24);
        this.drawAmpulla(cx - r, cy, 20);
        this.drawCupula(cx - r + 8, cy, 10, 17, -Math.PI / 4);

        this.drawSimpleFlowArrow(cx + r * 0.2, cy + r * 0.65, cx - r * 0.2, cy + r * 0.65, -1);

        const p = sim.otolithPosition;
        const angle = p * Math.PI;
        const ox = cx + Math.cos(angle) * r;
        const oy = cy + Math.sin(angle) * r;

        this.drawAnteriorTrail(cx, cy, r, p);
        this.drawCrystalCluster(ox, oy);

        this.drawLabel('Vestibule', cx, cy - r * 0.45 - 30);
        this.drawLabel('Ampoule', cx - r, cy + 32);
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

    drawSimpleFlowArrow(x1, y1, x2, y2, sign = 1) {
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
            ctx.strokeStyle = 'rgba(255,255,255,0.75)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });
    }

    drawPosteriorTrail(cx, cy, r, p) {
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

    drawAnteriorTrail(cx, cy, r, p) {
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

    drawLineTrail(x1, y1, x2, y2) {
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

    // =========================
    // ZONE YEUX
    // =========================

    drawEyesZone() {
        const ctx = this.ctx;
        const sim = window.simulator;

        const centerY = this.height * 0.68;
        const leftX = this.width / 2 - 110;
        const rightX = this.width / 2 + 110;

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 16px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Mouvements oculaires', this.width / 2, this.height * 0.56);

        this.drawEye(leftX, centerY, 'Œil gauche', sim.nystagmus);
        this.drawEye(rightX, centerY, 'Œil droit', sim.nystagmus);
    }

    drawEye(x, y, label, nyst) {
        const ctx = this.ctx;
        const eyeRadius = 42;
        const pupilRadius = 13;

        ctx.save();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x, y, eyeRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#94a3b8';
        ctx.lineWidth = 2;
        ctx.stroke();

        let pupilX = x;
        let pupilY = y;

        if (nyst.active && nyst.type === 'horizontal') {
            const d = 14 * nyst.intensity;
            pupilX = nyst.direction === 'right' ? x + d : x - d;
        }

        if (nyst.active && nyst.type === 'vertical-down') {
            const d = 14 * nyst.intensity;
            pupilY = y + d;
        }

        ctx.fillStyle = '#2563eb';
        ctx.beginPath();
        ctx.arc(pupilX, pupilY, pupilRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(pupilX - 4, pupilY - 4, 4, 0, Math.PI * 2);
        ctx.fill();

        if (nyst.active) {
            if (nyst.type === 'horizontal') {
                if (nyst.direction === 'right') this.drawArrow(x - 24, y, x + 24, y, '#ef4444', 4);
                if (nyst.direction === 'left') this.drawArrow(x + 24, y, x - 24, y, '#ef4444', 4);
            }

            if (nyst.type === 'vertical-down') {
                this.drawArrow(x, y - 24, x, y + 24, '#ef4444', 4);
            }

            if (nyst.type === 'torsional') {
                this.drawTorsionalArrow(x, y, nyst.direction, nyst.intensity);
            }
        }

        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(label, x, y + 64);

        ctx.restore();
    }

    drawTorsionalArrow(x, y, direction, intensity) {
        const ctx = this.ctx;
        const r = 26;
        const ccw = direction === 'torsional-ccw';

        const start = ccw ? Math.PI * 0.2 : Math.PI * 0.8;
        const end = ccw ? Math.PI * (0.2 + 1.2 * intensity) : Math.PI * (0.8 - 1.2 * intensity);

        ctx.save();
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(x, y, r, start, end, ccw);
        ctx.stroke();

        const ax = x + Math.cos(end) * r;
        const ay = y + Math.sin(end) * r;
        const dx = ccw ? -10 : 10;
        this.drawArrow(ax - dx, ay, ax, ay, '#ef4444', 3);

        ctx.fillStyle = '#ef4444';
        ctx.font = '13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(ccw ? 'anti-horaire' : 'horaire', x, y - 50);

        ctx.restore();
    }

    // =========================
    // LÉGENDE BAS
    // =========================

    drawBottomLegend() {
        const ctx = this.ctx;
        const x = 20;
        const y = this.height - 92;
        const w = 250;
        const h = 72;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1;
        ctx.fillRect(x, y, w, h);
        ctx.strokeRect(x, y, w, h);

        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText('Légende', x + 10, y + 16);

        // otolithe
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(x + 18, y + 34, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#64748b';
        ctx.font = '10px sans-serif';
        ctx.fillText('Otolithe / cristal', x + 30, y + 38);

        // flèche
        this.drawArrow(x + 10, y + 56, x + 24, y + 56, '#ef4444', 2);
        ctx.fillStyle = '#64748b';
        ctx.fillText('Sens du nystagmus', x + 30, y + 60);

        ctx.restore();
    }

    drawLabel(text, x, y) {
        const ctx = this.ctx;
        ctx.fillStyle = '#64748b';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
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
        return sim.horizontalVariant === 'geotropic' ? 1 : -1;
    }
}

window.addEventListener('load', () => {
    window.visualization = new SimpleLabyrinthVisualization('labyrinthe');
});
