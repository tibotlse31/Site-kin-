// ========================================
// VPPB SIMULATOR - VERSION SIMPLE
// ========================================

const CANAL_INFO = {
    post: {
        name: 'Canal postérieur',
        frequency: '90%',
        symptoms: 'Vertiges brefs en se couchant, en se relevant ou en se tournant dans le lit.',
        nystagmus: 'Torsionnel géotropique, avec inversion au retour assis.'
    },
    horiz: {
        name: 'Canal horizontal',
        frequency: '9%',
        symptoms: 'Vertiges positionnels souvent plus prolongés.',
        nystagmus: 'Horizontal géotropique ou agéotropique.'
    },
    ant: {
        name: 'Canal antérieur',
        frequency: '1%',
        symptoms: 'Vertige moins franc, parfois sensation d’ébriété.',
        nystagmus: 'Vertical inférieur.'
    }
};

const MANOEUVRES = {
    post: [
        { id: 'epley', name: 'Épley', steps: 4 },
        { id: 'semont', name: 'Sémont', steps: 3 },
        { id: 'brandt', name: 'Brandt & Daroff', steps: 3 }
    ],
    horiz: [
        { id: 'lempert', name: 'Barbecue (Lempert)', steps: 4 },
        { id: 'gufoni3g', name: 'Gufoni 3G', steps: 3 },
        { id: 'gufoni3a', name: 'Gufoni 3A', steps: 3 }
    ],
    ant: [
        { id: 'yacovino', name: 'Yacovino', steps: 3 },
        { id: 'li', name: 'Li', steps: 3 },
        { id: 'kim', name: 'Kim', steps: 3 }
    ]
};

const TESTS = {
    post: [
        { id: 'dixhallpike', name: 'Dix-Hallpike', steps: 2 },
        { id: 'sidelying', name: 'Side-Lying', steps: 2 }
    ],
    horiz: [
        { id: 'bowlean', name: 'Bow and Lean', steps: 2 },
        { id: 'supineroll', name: 'Supine Roll Test', steps: 3 },
        { id: 'upright', name: 'Upright Head Roll', steps: 2 }
    ],
    ant: [
        { id: 'deepheading', name: 'Deep Head Hanging', steps: 2 }
    ]
};

const STEP_TEXT = {
    epley: [
        { title: 'Position 1', description: 'Dix-Hallpike : mise en mouvement des otolithes.' },
        { title: 'Position 2', description: 'Rotation vers le côté sain : poursuite de la migration.' },
        { title: 'Position 3', description: 'Roulade : les otolithes avancent vers le vestibule.' },
        { title: 'Position 4', description: 'Retour assis : possible inversion du nystagmus.' }
    ],
    semont: [
        { title: 'Position 1', description: 'Bascule rapide côté atteint : déclenchement.' },
        { title: 'Position 2', description: 'Passage côté opposé : déplacement libérateur.' },
        { title: 'Position 3', description: 'Retour assis : stabilisation.' }
    ],
    brandt: [
        { title: 'Position 1', description: 'Décubitus latéral d’un côté.' },
        { title: 'Position 2', description: 'Retour assis.' },
        { title: 'Position 3', description: 'Décubitus latéral opposé.' }
    ],
    lempert: [
        { title: 'Position 1', description: 'Départ en décubitus dorsal.' },
        { title: 'Position 2', description: 'Rotation intermédiaire.' },
        { title: 'Position 3', description: 'Rotation avancée.' },
        { title: 'Position 4', description: 'Fin de rotation et retour.' }
    ],
    gufoni3g: [
        { title: 'Position 1', description: 'Bascule latérale rapide.' },
        { title: 'Position 2', description: 'Rotation de tête vers la table.' },
        { title: 'Position 3', description: 'Retour assis.' }
    ],
    gufoni3a: [
        { title: 'Position 1', description: 'Bascule latérale rapide côté atteint.' },
        { title: 'Position 2', description: 'Rotation de tête vers le haut.' },
        { title: 'Position 3', description: 'Retour assis.' }
    ],
    yacovino: [
        { title: 'Position 1', description: 'Head hanging.' },
        { title: 'Position 2', description: 'Menton-poitrine.' },
        { title: 'Position 3', description: 'Retour assis.' }
    ],
    li: [
        { title: 'Position 1', description: 'Déclenchement en head hanging.' },
        { title: 'Position 2', description: 'Passage ventral.' },
        { title: 'Position 3', description: 'Retour progressif.' }
    ],
    kim: [
        { title: 'Position 1', description: 'Tête tournée côté sain.' },
        { title: 'Position 2', description: 'Position couchée avec extension.' },
        { title: 'Position 3', description: 'Retour assis.' }
    ],
    dixhallpike: [
        { title: 'Test', description: 'Déclenchement en position tête pendante.' },
        { title: 'Retour assis', description: 'Recherche de l’inversion du nystagmus.' }
    ],
    sidelying: [
        { title: 'Test', description: 'Décubitus latéral côté testé.' },
        { title: 'Retour assis', description: 'Observation clinique.' }
    ],
    bowlean: [
        { title: 'Bow', description: 'Tête fléchie : lecture du sens du nystagmus.' },
        { title: 'Lean', description: 'Tête redressée / inclinée : comparaison.' }
    ],
    supineroll: [
        { title: 'Centre', description: 'Position neutre.' },
        { title: 'Roll droit', description: 'Observation du nystagmus à droite.' },
        { title: 'Roll gauche', description: 'Observation du nystagmus à gauche.' }
    ],
    upright: [
        { title: 'Inclinaison 1', description: 'Inclinaison frontale d’un côté.' },
        { title: 'Inclinaison 2', description: 'Inclinaison frontale opposée.' }
    ],
    deepheading: [
        { title: 'Head hanging', description: 'Recherche d’un vertical inférieur.' },
        { title: 'Retour', description: 'Fin du test.' }
    ]
};

class SimplifiedVPPBSimulator {
    constructor() {
        this.currentCanal = 'post';
        this.affectedSide = 'right';
        this.horizontalVariant = 'geotropic';

        this.currentManoeuvre = null;
        this.currentTest = null;
        this.currentMode = 'none';

        this.currentStep = 1;
        this.totalSteps = 1;
        this.isAnimating = false;
        this.timer = null;

        this.otolithPosition = 0;

        this.nystagmus = {
            active: false,
            type: 'none',
            direction: 'none',
            intensity: 0,
            label: 'Aucun nystagmus'
        };

        this.init();
    }

    init() {
        this.bindUI();
        this.renderCanalButtons();
        this.renderManoeuvreButtons();
        this.renderTestButtons();
        this.updateUI();
    }

    bindUI() {
        document.querySelectorAll('#canalButtons .btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectCanal(btn.dataset.canal));
        });

        document.getElementById('affectedSide')?.addEventListener('change', (e) => {
            this.affectedSide = e.target.value;
            this.updateStepVisualization();
            this.updateUI();
        });

        document.getElementById('horizontalVariant')?.addEventListener('change', (e) => {
            this.horizontalVariant = e.target.value;
            this.updateStepVisualization();
            this.updateUI();
        });

        document.getElementById('prevStepBtn')?.addEventListener('click', () => this.prevStep('manoeuvre'));
        document.getElementById('nextStepBtn')?.addEventListener('click', () => this.nextStep('manoeuvre'));
        document.getElementById('playStepsBtn')?.addEventListener('click', () => this.playSequence('manoeuvre'));
        document.getElementById('resetStepsBtn')?.addEventListener('click', () => this.resetSequence('manoeuvre'));

        document.getElementById('prevTestBtn')?.addEventListener('click', () => this.prevStep('test'));
        document.getElementById('nextTestBtn')?.addEventListener('click', () => this.nextStep('test'));
        document.getElementById('playTestBtn')?.addEventListener('click', () => this.playSequence('test'));
        document.getElementById('resetTestBtn')?.addEventListener('click', () => this.resetSequence('test'));
    }

    stopAnimation() {
        this.isAnimating = false;
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    selectCanal(canal) {
        this.stopAnimation();
        this.currentCanal = canal;
        this.currentManoeuvre = null;
        this.currentTest = null;
        this.currentMode = 'none';
        this.currentStep = 1;
        this.totalSteps = 1;
        this.otolithPosition = 0;
        this.resetNystagmus();

        document.getElementById('horizontalVariant').disabled = canal !== 'horiz';

        this.renderCanalButtons();
        this.renderManoeuvreButtons();
        this.renderTestButtons();
        this.updateUI();
    }

    renderCanalButtons() {
        document.querySelectorAll('#canalButtons .btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.canal === this.currentCanal);
        });
    }

    renderManoeuvreButtons() {
        const container = document.getElementById('manoeuvreButtons');
        if (!container) return;

        container.innerHTML = '';
        MANOEUVRES[this.currentCanal].forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'btn' + (this.currentManoeuvre?.id === item.id ? ' active' : '');
            btn.textContent = item.name;
            btn.addEventListener('click', () => this.selectManoeuvre(item.id));
            container.appendChild(btn);
        });
    }

    renderTestButtons() {
        const container = document.getElementById('testButtons');
        if (!container) return;

        container.innerHTML = '';
        TESTS[this.currentCanal].forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'btn' + (this.currentTest?.id === item.id ? ' active' : '');
            btn.textContent = item.name;
            btn.addEventListener('click', () => this.selectTest(item.id));
            container.appendChild(btn);
        });
    }

    selectManoeuvre(id) {
        this.stopAnimation();
        this.currentManoeuvre = MANOEUVRES[this.currentCanal].find(m => m.id === id) || null;
        this.currentMode = 'manoeuvre';
        this.currentStep = 1;
        this.totalSteps = this.currentManoeuvre.steps;
        this.otolithPosition = 0;
        this.resetNystagmus();

        this.renderManoeuvreButtons();
        this.updateStepVisualization();
        this.updateUI();
    }

    selectTest(id) {
        this.stopAnimation();
        this.currentTest = TESTS[this.currentCanal].find(t => t.id === id) || null;
        this.currentMode = 'test';
        this.currentStep = 1;
        this.totalSteps = this.currentTest.steps;
        this.otolithPosition = 0;
        this.resetNystagmus();

        this.renderTestButtons();
        this.updateStepVisualization();
        this.updateUI();
    }

    prevStep(mode) {
        if (this.currentMode !== mode) return;
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepVisualization();
            this.updateUI();
        }
    }

    nextStep(mode) {
        if (this.currentMode !== mode) return;
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStepVisualization();
            this.updateUI();
        }
    }

    playSequence(mode) {
        if (this.currentMode !== mode) return;
        this.stopAnimation();
        this.isAnimating = true;

        this.timer = setInterval(() => {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStepVisualization();
                this.updateUI();
            } else {
                this.stopAnimation();
            }
        }, 1700);
    }

    resetSequence(mode) {
        if (this.currentMode !== mode) return;
        this.stopAnimation();
        this.currentStep = 1;
        this.otolithPosition = 0;
        this.resetNystagmus();
        this.updateStepVisualization();
        this.updateUI();
    }

    resetNystagmus() {
        this.nystagmus = {
            active: false,
            type: 'none',
            direction: 'none',
            intensity: 0,
            label: 'Aucun nystagmus'
        };
    }

    getProgress() {
        if (this.totalSteps <= 1) return 0;
        return (this.currentStep - 1) / (this.totalSteps - 1);
    }

    updateStepVisualization() {
        if (this.currentMode === 'none') {
            this.otolithPosition = 0;
            this.resetNystagmus();
            return;
        }

        this.otolithPosition = this.getProgress();
        this.computeNystagmus();
    }

    computeNystagmus() {
        this.resetNystagmus();

        const step = this.currentStep;
        const side = this.affectedSide;
        const variant = this.horizontalVariant;
        const selectionId = this.currentMode === 'manoeuvre' ? this.currentManoeuvre?.id : this.currentTest?.id;

        if (!selectionId) return;

        if (this.currentCanal === 'post') {
            this.nystagmus.type = 'torsional';

            const mainDir = side === 'right' ? 'ccw' : 'cw';
            const inverseDir = side === 'right' ? 'cw' : 'ccw';

            if (selectionId === 'dixhallpike' || selectionId === 'sidelying') {
                if (step === 1) {
                    this.setNystagmus(true, 'torsional', mainDir, 0.85, mainDir === 'cw' ? 'Torsionnel horaire' : 'Torsionnel anti-horaire');
                } else {
                    this.setNystagmus(true, 'torsional', inverseDir, 0.5, inverseDir === 'cw' ? 'Inversion horaire au retour assis' : 'Inversion anti-horaire au retour assis');
                }
                return;
            }

            if (selectionId === 'epley') {
                if (step <= 3) {
                    const intensities = [0.85, 0.65, 0.4];
                    this.setNystagmus(true, 'torsional', mainDir, intensities[step - 1], mainDir === 'cw' ? 'Torsionnel horaire' : 'Torsionnel anti-horaire');
                } else {
                    this.setNystagmus(true, 'torsional', inverseDir, 0.35, inverseDir === 'cw' ? 'Inversion horaire au retour assis' : 'Inversion anti-horaire au retour assis');
                }
                return;
            }

            if (selectionId === 'semont') {
                if (step === 1) {
                    this.setNystagmus(true, 'torsional', mainDir, 0.9, mainDir === 'cw' ? 'Torsionnel horaire' : 'Torsionnel anti-horaire');
                } else if (step === 2) {
                    this.setNystagmus(true, 'torsional', inverseDir, 0.45, inverseDir === 'cw' ? 'Torsionnel thérapeutique horaire' : 'Torsionnel thérapeutique anti-horaire');
                }
                return;
            }

            if (selectionId === 'brandt') {
                if (step === 1 || step === 3) {
                    this.setNystagmus(true, 'torsional', mainDir, 0.4, mainDir === 'cw' ? 'Torsionnel horaire faible' : 'Torsionnel anti-horaire faible');
                }
                return;
            }
        }

        if (this.currentCanal === 'horiz') {
            this.nystagmus.type = 'horizontal';

            if (selectionId === 'supineroll') {
                if (step === 1) return;

                if (variant === 'geotropic') {
                    const rightIntensity = side === 'right' ? 0.85 : 0.4;
                    const leftIntensity = side === 'left' ? 0.85 : 0.4;

                    if (step === 2) this.setNystagmus(true, 'horizontal', 'right', rightIntensity, 'Horizontal vers la droite');
                    if (step === 3) this.setNystagmus(true, 'horizontal', 'left', leftIntensity, 'Horizontal vers la gauche');
                    return;
                }

                if (variant === 'ageotropic' || variant === 'cupulo') {
                    const rightIntensity = side === 'left' ? 0.85 : 0.4;
                    const leftIntensity = side === 'right' ? 0.85 : 0.4;

                    if (step === 2) this.setNystagmus(true, 'horizontal', 'left', rightIntensity, 'Horizontal vers la gauche');
                    if (step === 3) this.setNystagmus(true, 'horizontal', 'right', leftIntensity, 'Horizontal vers la droite');
                    return;
                }
            }

            if (selectionId === 'bowlean') {
                if (variant === 'geotropic') {
                    if (step === 1) this.setNystagmus(true, 'horizontal', side === 'right' ? 'right' : 'left', 0.7, `Bow : horizontal vers ${side === 'right' ? 'la droite' : 'la gauche'}`);
                    if (step === 2) this.setNystagmus(true, 'horizontal', side === 'right' ? 'left' : 'right', 0.6, `Lean : horizontal vers ${side === 'right' ? 'la gauche' : 'la droite'}`);
                    return;
                }

                if (variant === 'ageotropic' || variant === 'cupulo') {
                    if (step === 1) this.setNystagmus(true, 'horizontal', side === 'right' ? 'left' : 'right', 0.7, `Bow : horizontal vers ${side === 'right' ? 'la gauche' : 'la droite'}`);
                    if (step === 2) this.setNystagmus(true, 'horizontal', side === 'right' ? 'right' : 'left', 0.7, `Lean : horizontal vers ${side === 'right' ? 'la droite' : 'la gauche'}`);
                    return;
                }
            }

            if (selectionId === 'upright') {
                if (variant === 'geotropic') {
                    if (step === 1) this.setNystagmus(true, 'horizontal', side === 'right' ? 'right' : 'left', 0.65, 'Inclinaison 1');
                    if (step === 2) this.setNystagmus(true, 'horizontal', side === 'right' ? 'left' : 'right', 0.45, 'Inclinaison 2');
                    return;
                }

                if (variant === 'ageotropic' || variant === 'cupulo') {
                    if (step === 1) this.setNystagmus(true, 'horizontal', side === 'right' ? 'left' : 'right', 0.65, 'Inclinaison 1');
                    if (step === 2) this.setNystagmus(true, 'horizontal', side === 'right' ? 'right' : 'left', 0.55, 'Inclinaison 2');
                    return;
                }
            }

            if (selectionId === 'lempert') {
                const dirs = ['right', 'right', 'left', 'none'];
                const ints = [0.7, 0.55, 0.35, 0];
                const dir = dirs[step - 1];
                const intensity = ints[step - 1];
                if (dir !== 'none') {
                    this.setNystagmus(true, 'horizontal', dir, intensity, `Horizontal vers ${dir === 'right' ? 'la droite' : 'la gauche'}`);
                }
                return;
            }

            if (selectionId === 'gufoni3g') {
                if (step === 1) this.setNystagmus(true, 'horizontal', side === 'right' ? 'right' : 'left', 0.7, 'Horizontal géotropique');
                if (step === 2) this.setNystagmus(true, 'horizontal', side === 'right' ? 'left' : 'right', 0.45, 'Nystagmus thérapeutique');
                return;
            }

            if (selectionId === 'gufoni3a') {
                if (step === 1) this.setNystagmus(true, 'horizontal', side === 'right' ? 'left' : 'right', 0.7, 'Horizontal agéotropique');
                if (step === 2) this.setNystagmus(true, 'horizontal', side === 'right' ? 'right' : 'left', 0.45, 'Nystagmus thérapeutique');
                return;
            }
        }

        if (this.currentCanal === 'ant') {
            this.nystagmus.type = 'vertical';

            if (selectionId === 'deepheading') {
                if (step === 1) this.setNystagmus(true, 'vertical', 'down', 0.8, 'Vertical inférieur');
                return;
            }

            if (selectionId === 'yacovino' || selectionId === 'li' || selectionId === 'kim') {
                if (step === 1) this.setNystagmus(true, 'vertical', 'down', 0.8, 'Vertical inférieur');
                if (step === 2) this.setNystagmus(true, 'vertical', 'down', 0.45, 'Vertical inférieur en décroissance');
                return;
            }
        }
    }

    setNystagmus(active, type, direction, intensity, label) {
        this.nystagmus = { active, type, direction, intensity, label };
    }

    getStepTextForManoeuvre() {
        if (!this.currentManoeuvre) {
            return { title: 'Aucune manœuvre sélectionnée', description: 'Choisis une manœuvre pour commencer.' };
        }
        return STEP_TEXT[this.currentManoeuvre.id][this.currentStep - 1] || STEP_TEXT[this.currentManoeuvre.id][0];
    }

    getStepTextForTest() {
        if (!this.currentTest) {
            return { title: 'Aucun test sélectionné', description: 'Choisis un test pour commencer.' };
        }
        return STEP_TEXT[this.currentTest.id][this.currentStep - 1] || STEP_TEXT[this.currentTest.id][0];
    }

    updateUI() {
        this.updateCanalInfo();
        this.updateStepPanels();
        this.updateNystagmusPanel();

        if (window.visualization && typeof window.visualization.requestRender === 'function') {
            window.visualization.requestRender();
        }
    }

    updateCanalInfo() {
        const info = CANAL_INFO[this.currentCanal];
        const box = document.getElementById('canalInfo');
        if (!box) return;

        box.innerHTML = `
            <p><strong>${info.name}</strong> — ${info.frequency}</p>
            <p><strong>Symptômes :</strong> ${info.symptoms}</p>
            <p><strong>Nystagmus attendu :</strong> ${info.nystagmus}</p>
        `;
    }

    updateStepPanels() {
        const manBox = document.getElementById('stepInfo');
        const testBox = document.getElementById('testInfo');

        if (manBox) {
            const t = this.getStepTextForManoeuvre();
            const footer = this.currentMode === 'manoeuvre' && this.currentManoeuvre
                ? `Étape ${this.currentStep}/${this.totalSteps}`
                : '';
            manBox.innerHTML = `
                <h4>${t.title}</h4>
                <p>${t.description}</p>
                ${footer ? `<p style="margin-top:0.5rem;color:#64748b;font-size:0.9rem;">${footer}</p>` : ''}
            `;
        }

        if (testBox) {
            const t = this.getStepTextForTest();
            const footer = this.currentMode === 'test' && this.currentTest
                ? `Étape ${this.currentStep}/${this.totalSteps}`
                : '';
            testBox.innerHTML = `
                <h4>${t.title}</h4>
                <p>${t.description}</p>
                ${footer ? `<p style="margin-top:0.5rem;color:#64748b;font-size:0.9rem;">${footer}</p>` : ''}
            `;
        }
    }

    updateNystagmusPanel() {
        const box = document.getElementById('nystagmusInfo');
        if (!box) return;

        if (!this.nystagmus.active) {
            box.textContent = 'Aucun nystagmus';
            return;
        }

        const intensityTxt = this.nystagmus.intensity >= 0.75
            ? 'FORT'
            : this.nystagmus.intensity >= 0.45
                ? 'MOYEN'
                : 'FAIBLE';

        box.textContent = `${this.nystagmus.label} — intensité ${intensityTxt}`;
    }
}

window.addEventListener('load', () => {
    window.simulator = new SimplifiedVPPBSimulator();
});
