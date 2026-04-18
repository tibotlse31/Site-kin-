// ========================================
// VPPB SIMULATOR - Visualization Module
// ========================================

class LabyrinthVisualization {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');

        this.width = 0;
        this.height = 0;
        this.needsRender = true;
        this.particles = [];
        this.phase = 0;

        this.resizeObserver = new ResizeObserver(() => this.handleResize());
        this.resizeObserver.observe(this.canvas.parentElement);

        this.handleResize();
        this.startLoop();
    }

    handleResize() {
        const rect = this.canvas.parentElement.getBoundingClientRect();
        this.width = Math.max(300, rect.width);
        this.height = Math.max(300, rect.height);
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.requestRender();
    }

    requestRender() {
        this.needsRender = true;
    }

    startLoop() {
        const loop = () => {
            this.phase += 0.025;
            if (this.needsRender || (window.simulator && simulator.isAnimating)) {
                this.draw();
                this.needsRender = false;
            }
            requestAnimationFrame(loop);
        };
        requestAnimationFrame(loop);
    }

    draw() {
        if (!window.simulator) return;

        const canal = simulator.currentCanal;
        this.ctx.clearRect(0, 0, this.width, this.height);

        switch (canal) {
            case 'post':
                this.drawPosteriorScene();
                break;
            case 'horiz':
                this.drawHorizontalScene();
                break;
            case 'ant':
                this.drawAnteriorScene();
                break;
        }

        this.drawMotionLegend();
        this.drawNystagmusIndicator();
    }

    // =========================
    // Scenes
    // =========================

    drawPosteriorScene() {
        const ctx = this.ctx;
        const cx = this.width * 0.48;
        const cy = this.height * 0.52;
        const r = Math.min(this.width, this.height) * 0.23;

        this.drawBackground('#f4f9ff', '#dbeafe');
        this.drawTitle('Canal semi-circulaire postérieur');

        this.drawReferenceGrid();

        ctx.save();
        ctx.translate(cx, cy);

        // Canal
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, -r * 0.28, r, Math.PI * 0.95, Math.PI * 0.02, true);
        ctx.stroke();

        // Vestibule
        this.drawVestibule(0, 0, 24);

        // Ampoule
        this.drawAmpulla(r * 0.93, -r * 0.25, 28);

        // Cupule
        this.drawCupula(r * 0.84, -r * 0.25, 14, 24, Math.PI / 4);

        // Flux
        this.drawArcFlow(0, -r * 0.28, r * 0.82, Math.PI * 0.95, Math.PI * 0.02, simulator.endolymph.flow);

        // Direction cupulaire
        this.drawCupulaVector(r * 0.84, -r * 0.25, simulator.cupula.deflection * 16, -simulator.cupula.deflection * 10);

        // Otoconies
        this.drawOtolithsOnPosterior(cx, cy, r);

        // Labels
        this.drawLabel('Vestibule', 0, 42, '#1e40af');
        this.drawLabel('Ampoule', r * 0.93, -r * 0.25 - 42, '#1e40af');
        this.drawLabel('Courant endolymphatique', -r * 0.48, r * 0.64, '#1e40af');

        ctx.restore();
    }

    drawHorizontalScene() {
        const ctx = this.ctx;
        const cx = this.width * 0.5;
        const cy = this.height * 0.5;
        const rx = this.width * 0.23;
        const ry = this.height * 0.17;

        this.drawBackground('#f2fbf7', '#dcfce7');
        this.drawTitle('Canal semi-circulaire horizontal');

        this.drawReferenceGrid();

        ctx.save();
        ctx.translate(cx, cy);

        // Canal
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();

        // Vestibule
        this.drawVestibule(0, 0, 24);

        // Ampoules
        this.drawAmpulla(rx, 0, 27);
        this.drawAmpulla(-rx, 0, 27);

        // Cupules
        this.drawCupula(rx - 8, 0, 10, 20, 0);
        this.drawCupula(-rx + 8, 0, 10, 20, 0);

        // Flux
        this.drawEllipseFlow(0, 0, rx * 0.85, ry * 0.78, simulator.endolymph.flow);

        // Direction cupulaire
        this.drawCupulaVector(
            simulator.affectedSide === 'right' ? rx - 8 : -rx + 8,
            0,
            simulator.cupula.deflection * 16,
            0
        );

        // Otoconies
        this.drawOtolithsOnHorizontal(cx, cy, rx, ry);

        // Labels
        this.drawLabel('Ampoule D', rx, -38, '#166534');
        this.drawLabel('Ampoule G', -rx, -38, '#166534');
        this.drawLabel('Vestibule', 0, 42, '#166534');

        ctx.restore();
    }

    drawAnteriorScene() {
        const ctx = this.ctx;
        const cx = this.width * 0.5;
        const cy = this.height * 0.5;
        const r = Math.min(this.width, this.height) * 0.22;

        this.drawBackground('#fffdf3', '#fef3c7');
        this.drawTitle('Canal semi-circulaire antérieur');

        this.drawReferenceGrid();

        ctx.save();
        ctx.translate(cx, cy);

        // Canal
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(0, r * 0.22, r, Math.PI * 0.02, Math.PI * 0.98, false);
        ctx.stroke();

        // Vestibule
        this.drawVestibule(0, 0, 24);

        // Ampoule
        this.drawAmpulla(-r * 0.93, r * 0.23, 28);

        // Cupule
        this.drawCupula(-r * 0.84, r * 0.23, 14, 24, -Math.PI / 4);

        // Flux
        this.drawArcFlow(0, r * 0.22, r * 0.82, Math.PI * 0.02, Math.PI * 0.98, simulator.endolymph.flow);

        // Direction cupulaire
        this.drawCupulaVector(-r * 0.84, r * 0.23, simulator.cupula.deflection * 16, simulator.cupula.deflection * 10);

        // Otoconies
        this.drawOtolithsOnAnterior(cx, cy, r);

        // Labels
        this.drawLabel('Vestibule', 0, -40, '#92400e');
        this.drawLabel('Ampoule', -r * 0.93, r * 0.23 + 44, '#92400e');
        this.drawLabel('Canal antérieur', r * 0.25, -r * 0.9, '#92400e');

        ctx.restore();
    }

    // =========================
    // Core drawing helpers
    // =========================

    drawBackground(color1, color2) {
        const g = this.ctx.createLinearGradient(0, 0, this.width, this.height);
        g.addColorStop(0, color1);
        g.addColorStop(1, color2);
        this.ctx.fillStyle = g;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    drawTitle(title) {
        this.ctx.save();
        this.ctx.fillStyle = '#0f172a';
        this.ctx.font = 'bold 22px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(title, this.width / 2, 34);

        this.ctx.fillStyle = '#475569';
        this.ctx.font = '13px Arial';
        this.ctx.fillText(
            `Côté atteint : ${simulator.affectedSide === 'right' ? 'droite' : 'gauche'}${simulator.currentCanal === 'horiz' ? ' • ' + this.getHorizontalLabel() : ''}`,
            this.width / 2,
            56
        );
        this.ctx.restore();
    }

    drawReferenceGrid() {
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = 'rgba(15, 23, 42, 0.06)';
        ctx.lineWidth = 1;

        for (let x = 0; x < this.width; x += 60) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.height);
            ctx.stroke();
        }

        for (let y = 0; y < this.height; y += 60) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.width, y);
            ctx.stroke();
        }

        ctx.restore();
    }

    drawVestibule(x, y, radius) {
        const ctx = this.ctx;
        ctx.save();
        const g = ctx.createRadialGradient(x - 6, y - 6, 2, x, y, radius);
        g.addColorStop(0, '#ffffff');
        g.addColorStop(1, '#c7d2fe');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#818cf8';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    drawAmpulla(x, y, radius) {
        const ctx = this.ctx;
        ctx.save();
        const g = ctx.createRadialGradient(x - 5, y - 5, 4, x, y, radius);
        g.addColorStop(0, '#f5edff');
        g.addColorStop(1, '#c7a0e8');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#9b7cc3';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }

    drawCupula(x, y, rx, ry, rotation = 0) {
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

    drawCupulaVector(x, y, dx, dy, color = '#0f766e') {
        const ctx = this.ctx;
        ctx.save();
        ctx.strokeStyle = color;
        ctx.fillStyle = color;
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + dx, y + dy);
        ctx.stroke();

        const angle = Math.atan2(dy, dx || 0.0001);
        const head = 10;

        ctx.beginPath();
        ctx.moveTo(x + dx, y + dy);
        ctx.lineTo(
            x + dx - head * Math.cos(angle - Math.PI / 6),
            y + dy - head * Math.sin(angle - Math.PI / 6)
        );
        ctx.lineTo(
            x + dx - head * Math.cos(angle + Math.PI / 6),
            y + dy - head * Math.sin(angle + Math.PI / 6)
        );
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    drawArcFlow(cx, cy, r, start, end, intensity) {
        const ctx = this.ctx;
        const direction = intensity >= 0 ? 1 : -1;
        const magnitude = Math.min(1, Math.abs(intensity));
        const steps = 8;

        ctx.save();
        ctx.lineWidth = 3;
        ctx.strokeStyle = `rgba(78, 205, 196, ${0.25 + magnitude * 0.45})`;

        for (let i = 0; i < steps; i++) {
            const t = i / (steps - 1);
            const angle = direction > 0
                ? start + (end - start) * t
                : end - (end - start) * t;

            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;

            ctx.beginPath();
            ctx.arc(px, py, 4 + magnitude * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(78, 205, 196, ${0.18 + magnitude * 0.35})`;
            ctx.fill();
        }

        const mid = direction > 0 ? start + (end - start) * 0.58 : start + (end - start) * 0.42;
        const dx = Math.cos(mid + direction * 0.25) * 26;
        const dy = Math.sin(mid + direction * 0.25) * 26;
        const ax = cx + Math.cos(mid) * r;
        const ay = cy + Math.sin(mid) * r;
        this.drawCupulaVector(ax, ay, dx * 0.55, dy * 0.55, '#14b8a6');

        ctx.restore();
    }

    drawEllipseFlow(cx, cy, rx, ry, intensity) {
        const ctx = this.ctx;
        const direction = intensity >= 0 ? 1 : -1;
        const magnitude = Math.min(1, Math.abs(intensity));
        const points = 10;

        ctx.save();
        for (let i = 0; i < points; i++) {
            const t = i / points;
            const a = this.phase * direction + t * Math.PI * 2;
            const x = cx + Math.cos(a) * rx;
            const y = cy + Math.sin(a) * ry;

            ctx.beginPath();
            ctx.fillStyle = `rgba(78, 205, 196, ${0.18 + magnitude * 0.35})`;
            ctx.arc(x, y, 4 + magnitude * 2, 0, Math.PI * 2);
            ctx.fill();
        }

        const a = this.phase * direction + Math.PI / 4;
        const x = cx + Math.cos(a) * rx;
        const y = cy + Math.sin(a) * ry;
        const dx = -Math.sin(a) * 22 * direction;
        const dy = Math.cos(a) * 14 * direction;
        this.drawCupulaVector(x, y, dx, dy, '#14b8a6');

        ctx.restore();
    }

    drawLabel(text, x, y, color = '#334155') {
        const ctx = this.ctx;
        ctx.save();
        ctx.fillStyle = color;
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    // =========================
    // Otoliths
    // =========================

    drawOtolithsOnPosterior(cx, cy, r) {
        const baseX = cx + simulator.otoliths.position.x * 0.8;
        const baseY = cy - r * 0.12 + simulator.otoliths.position.y * 0.65;
        this.drawTrailProjectedPosterior(cx, cy, r);
        this.drawCrystalCluster(baseX, baseY);
    }

    drawOtolithsOnHorizontal(cx, cy, rx, ry) {
        const baseX = cx + simulator.otoliths.position.x * 0.82;
        const baseY = cy + simulator.otoliths.position.y * 0.82;
        this.drawTrailProjectedHorizontal(cx, cy, rx, ry);
        this.drawCrystalCluster(baseX, baseY);
    }

    drawOtolithsOnAnterior(cx, cy, r) {
        const baseX = cx + simulator.otoliths.position.x * 0.8;
        const baseY = cy + r * 0.05 + simulator.otoliths.position.y * 0.65;
        this.drawTrailProjectedAnterior(cx, cy, r);
        this.drawCrystalCluster(baseX, baseY);
    }

    drawTrailProjectedPosterior(cx, cy, r) {
        const ctx = this.ctx;
        const trail = simulator.otoliths.trail;
        if (!trail.length) return;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.28)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        trail.forEach((p, index) => {
            const x = cx + p.x * 0.8;
            const y = cy - r * 0.12 + p.y * 0.65;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();
        ctx.restore();
    }

    drawTrailProjectedHorizontal(cx, cy, rx, ry) {
        const ctx = this.ctx;
        const trail = simulator.otoliths.trail;
        if (!trail.length) return;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.28)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        trail.forEach((p, index) => {
            const x = cx + p.x * 0.82;
            const y = cy + p.y * 0.82;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();
        ctx.restore();
    }

    drawTrailProjectedAnterior(cx, cy, r) {
        const ctx = this.ctx;
        const trail = simulator.otoliths.trail;
        if (!trail.length) return;

        ctx.save();
        ctx.strokeStyle = 'rgba(255, 107, 107, 0.28)';
        ctx.lineWidth = 2;
        ctx.beginPath();

        trail.forEach((p, index) => {
            const x = cx + p.x * 0.8;
            const y = cy + r * 0.05 + p.y * 0.65;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });

        ctx.stroke();
        ctx.restore();
    }

    drawCrystalCluster(baseX, baseY) {
        const ctx = this.ctx;
        const offsets = [
            { x: -8, y: -3, r: 5 },
            { x: 6, y: -7, r: 4 },
            { x: 10, y: 6, r: 5 },
            { x: -4, y: 9, r: 4 }
        ];

        ctx.save();
        offsets.forEach((o, i) => {
            const pulse = Math.sin(this.phase * 2 + i) * 0.6;
            ctx.beginPath();
            ctx.fillStyle = '#ff6b6b';
            ctx.arc(baseX + o.x, baseY + o.y, o.r + pulse, 0, Math.PI * 2);
            ctx.fill();

            ctx.strokeStyle = 'rgba(255,255,255,0.55)';
            ctx.lineWidth = 1;
            ctx.stroke();
        });

        // Vecteur déplacement
        const vx = simulator.otoliths.velocity.x * 0.9;
        const vy = simulator.otoliths.velocity.y * 0.9;
        this.drawCupulaVector(baseX, baseY, vx, vy, '#ef4444');

        ctx.restore();
    }

    // =========================
    // Bottom overlays
    // =========================

    drawMotionLegend() {
        const ctx = this.ctx;
        const x = 18;
        const y = this.height - 118;
        const w = 260;
        const h = 92;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.88)';
        ctx.strokeStyle = 'rgba(148,163,184,0.4)';
        ctx.lineWidth = 1;
        this.roundRect(x, y, w, h, 12, true, true);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 13px Arial';
        ctx.fillText('État dynamique', x + 14, y + 22);

        ctx.font = '12px Arial';
        ctx.fillStyle = '#334155';
        ctx.fillText(`Flux : ${simulator.endolymph.directionLabel}`, x + 14, y + 44);
        ctx.fillText(`Cupule : ${simulator.cupula.deflection.toFixed(2)}`, x + 14, y + 62);
        ctx.fillText(`Phase : ${simulator.nystagmus.phase}`, x + 14, y + 80);

        ctx.restore();
    }

    drawNystagmusIndicator() {
        const ctx = this.ctx;
        const panelW = Math.min(420, this.width * 0.42);
        const panelH = 92;
        const x = this.width - panelW - 18;
        const y = this.height - 118;

        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
        ctx.strokeStyle = 'rgba(148,163,184,0.45)';
        ctx.lineWidth = 1;
        this.roundRect(x, y, panelW, panelH, 12, true, true);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 13px Arial';
        ctx.fillText('Nystagmus simulé', x + 14, y + 22);

        const waveX = x + 14;
        const waveY = y + 58;
        const waveW = panelW - 180;
        const amp = Math.min(18, 4 + simulator.nystagmus.amplitude * 0.55);
        const freq = Math.max(0.5, simulator.nystagmus.frequency || 0.5);

        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i <= waveW; i += 4) {
            const t = (i / waveW) * Math.PI * 2 * freq + this.phase * 3;
            const yy = waveY + Math.sin(t) * amp;
            if (i === 0) ctx.moveTo(waveX + i, yy);
            else ctx.lineTo(waveX + i, yy);
        }
        ctx.stroke();

        ctx.fillStyle = '#475569';
        ctx.font = '11px Arial';
        ctx.fillText(`Type : ${simulator.nystagmus.type}`, x + panelW - 150, y + 38);
        ctx.fillText(`Amp : ${Math.round(simulator.nystagmus.amplitude)}°`, x + panelW - 150, y + 56);
        ctx.fillText(`Fréq : ${simulator.nystagmus.frequency.toFixed(1)} Hz`, x + panelW - 150, y + 74);

        ctx.restore();
    }

    // =========================
    // Utils
    // =========================

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

    getHorizontalLabel() {
        if (simulator.horizontalVariant === 'geotropic') return 'géotropique';
        if (simulator.horizontalVariant === 'ageotropic') return 'agéotropique';
        return 'cupulolithiase';
    }
}

let visualization = null;

window.addEventListener('load', () => {
    setTimeout(() => {
        visualization = new LabyrinthVisualization('labyrinthe');
        window.visualization = visualization;
        visualization.requestRender();
    }, 50);
});
