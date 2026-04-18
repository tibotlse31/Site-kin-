// ========================================
// VPPB SIMULATOR - VERSION PÉDAGOGIQUE SIMPLIFIÉE
// ========================================

const CANAL_INFO = {
    post: {
        name: 'Canal postérieur',
        frequency: '90%',
        symptoms: 'Vertiges brefs en se couchant/levant',
        nystagmus: 'Torsionnel géotropique'
    },
    horiz: {
        name: 'Canal horizontal',
        frequency: '9%',
        symptoms: 'Vertiges prolongés, > 1 min',
        nystagmus: 'Horizontal géotropique ou agéotropique'
    },
    ant: {
        name: 'Canal antérieur',
        frequency: '1%',
        symptoms: 'Vertige moins franc',
        nystagmus: 'Vertical inférieur'
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
        { id: 'dixhallpike', name: 'Dix-Hallpike', steps: 2 }
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

// DESCRIPTIONS DES ÉTAPES
const STEP_DESCRIPTIONS = {
    // Épley postérieur
    epley_post: [
        { step: 1, title: 'Position 1 : Dix-Hallpike', description: 'Tête en extension, cristaux se mettent en mouvement' },
        { step: 2, title: 'Position 2 : Latéralisation', description: 'Tête tournée côté sain, cristaux glissent' },
        { step: 3, title: 'Position 3 : Roulade', description: 'Roulade côté sain, cristaux continuent à migrer' },
        { step: 4, title: 'Position 4 : Retour assis', description: 'Cristaux retombent dans le vestibule' }
    ],
    dixhallpike_post: [
        { step: 1, title: 'Dix-Hallpike', description: 'Tête en arrière, déclenchement du nystagmus' },
        { step: 2, title: 'Retour assis', description: 'Cristaux retombent, nystagmus s\'inverse' }
    ],
    supineroll_horiz: [
        { step: 1, title: 'Position centrale', description: 'Tête en arrière, observation de base' },
        { step: 2, title: 'Roll à droite', description: 'Observation du nystagmus côté droit' },
        { step: 3, title: 'Roll à gauche', description: 'Observation du nystagmus côté gauche, comparaison' }
    ]
};

class SimplifiedVPPBSimulator {
    constructor() {
        this.currentCanal = 'post';
        this.affectedSide = 'right';
        this.horizontalVariant = 'geotropic';

        this.currentManoeuvre = null;
        this.currentTest = null;
        this.currentMode = 'none'; // 'manoeuvre' ou 'test'

        this.currentStep = 1;
        this.totalSteps = 4;
        this.isAnimating = false;

        // État des otolithes (position simple 0-1)
        this.otolithPosition = 0;
        
        // État du nystagmus
        this.nystagmus = {
            active: false,
            direction: 'none', // 'left', 'right', 'up', 'down', 'torsional-cw', 'torsional-ccw'
            type: 'none', // 'torsional', 'horizontal', 'vertical'
            intensity: 0, // 0-1
            side: 'none' // 'right', 'left'
        };

        this.headPosition = {
            rotation: { x: 0, y: 0, z: 0 },
            label: 'neutre'
        };

        this.init();
    }

    init() {
        this.bindUI();
        this.updateUI();
    }

    bindUI() {
        // Sélection canal
        document.querySelectorAll('#canalButtons .btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectCanal(btn.dataset.canal));
        });

        // Côté atteint
        const affectedSideSelect = document.getElementById('affectedSide');
        if (affectedSideSelect) {
            affectedSideSelect.addEventListener('change', (e) => {
                this.affectedSide = e.target.value;
                this.updateUI();
            });
        }

        // Variante horizontale
        const variantSelect = document.getElementById('horizontalVariant');
        if (variantSelect) {
            variantSelect.addEventListener('change', (e) => {
                this.horizontalVariant = e.target.value;
                this.updateUI();
            });
        }

        // Onglets
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });

        // Boutons manœuvres
        this.updateManoeuvreButtons();
        
        // Boutons tests
        this.updateTestButtons();

        // Contrôles étapes
        document.getElementById('prevStepBtn')?.addEventListener('click', () => this.prevStep());
        document.getElementById('nextStepBtn')?.addEventListener('click', () => this.nextStep());
        document.getElementById('playStepsBtn')?.addEventListener('click', () => this.playSteps());
        document.getElementById('resetStepsBtn')?.addEventListener('click', () => this.resetSteps());
    }

    selectCanal(canal) {
        this.currentCanal = canal;
        this.currentManoeuvre = null;
        this.currentTest = null;
        this.currentMode = 'none';
        this.currentStep = 1;
        this.resetOtoliths();
        
        document.querySelectorAll('#canalButtons .btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.canal === canal);
        });

        const variantSelect = document.getElementById('horizontalVariant');
        if (variantSelect) {
            variantSelect.disabled = canal !== 'horiz';
        }

        this.updateUI();
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

        document.getElementById(tabName)?.classList.add('active');
        document.querySelector(`.tab[data-tab="${tabName}"]`)?.classList.add('active');
    }

    selectManoeuvre(manoeuvreId) {
        const manoeuvre = MANOEUVRES[this.currentCanal].find(m => m.id === manoeuvreId);
        if (!manoeuvre) return;

        this.currentManoeuvre = manoeuvre;
        this.currentTest = null;
        this.currentMode = 'manoeuvre';
        this.currentStep = 1;
        this.totalSteps = manoeuvre.steps;
        this.resetOtoliths();

        this.updateManoeuvreButtons();
        this.updateUI();
    }

    selectTest(testId) {
        const test = TESTS[this.currentCanal].find(t => t.id === testId);
        if (!test) return;

        this.currentTest = test;
        this.currentManoeuvre = null;
        this.currentMode = 'test';
        this.currentStep = 1;
        this.totalSteps = test.steps;
        this.resetOtoliths();

        this.updateTestButtons();
        this.updateUI();
    }

    updateManoeuvreButtons() {
        const container = document.getElementById('manoeuvreButtons');
        if (!container) return;

        container.innerHTML = '';
        MANOEUVRES[this.currentCanal].forEach(m => {
            const btn = document.createElement('button');
            btn.className = 'btn' + (this.currentManoeuvre?.id === m.id ? ' active' : '');
            btn.textContent = m.name;
            btn.addEventListener('click', () => this.selectManoeuvre(m.id));
            container.appendChild(btn);
        });
    }

    updateTestButtons() {
        const container = document.getElementById('testButtons');
        if (!container) return;

        container.innerHTML = '';
        TESTS[this.currentCanal].forEach(t => {
            const btn = document.createElement('button');
            btn.className = 'btn' + (this.currentTest?.id === t.id ? ' active' : '');
            btn.textContent = t.name;
            btn.addEventListener('click', () => this.selectTest(t.id));
            container.appendChild(btn);
        });
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            this.updateStepVisualization();
            this.updateUI();
        }
    }

    prevStep() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStepVisualization();
            this.updateUI();
        }
    }

    playSteps() {
        this.isAnimating = true;
        this.currentStep = 1;
        const interval = setInterval(() => {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStepVisualization();
                this.updateUI();
            } else {
                clearInterval(interval);
                this.isAnimating = false;
            }
        }, 2000); // 2 sec par étape
    }

    resetSteps() {
        this.isAnimating = false;
        this.currentStep = 1;
        this.resetOtoliths();
        this.updateStepVisualization();
        this.updateUI();
    }

    resetOtoliths() {
        this.otolithPosition = 0;
        this.nystagmus = {
            active: false,
            direction: 'none',
            type: 'none',
            intensity: 0,
            side: 'none'
        };
    }

    updateStepVisualization() {
        if (!this.currentManoeuvre && !this.currentTest) return;

        const step = this.currentStep;
        const total = this.totalSteps;
        const progress = step / total;

        // Mise à jour position otolithes
        this.otolithPosition = progress;

        // Mise à jour nystagmus selon étape et type
        this.updateNystagmusForStep();
    }

    updateNystagmusForStep() {
        if (!this.currentManoeuvre && !this.currentTest) {
            this.nystagmus.active = false;
            return;
        }

        const manoeuvreName = this.currentManoeuvre?.id || this.currentTest?.id;
        const step = this.currentStep;

        // Logique simple par manœuvre/test
        if (this.currentCanal === 'post') {
            // POSTÉRIEUR - Nystagmus torsionnel
            this.nystagmus.type = 'torsional';
            
            if (manoeuvreName === 'dixhallpike') {
                if (step === 1) {
                    // Dix-Hallpike : nystagmus actif
                    this.nystagmus.active = true;
                    this.nystagmus.intensity = 0.7;
                    this.nystagmus.direction = this.affectedSide === 'right' ? 'torsional-ccw' : 'torsional-cw';
                    this.nystagmus.side = this.affectedSide;
                } else {
                    // Retour assis : inversion
                    this.nystagmus.active = true;
                    this.nystagmus.intensity = 0.5;
                    this.nystagmus.direction = this.affectedSide === 'right' ? 'torsional-cw' : 'torsional-ccw';
                    this.nystagmus.side = this.affectedSide;
                }
            } else if (manoeuvreName === 'epley') {
                // Épley : nystagmus présent aux étapes 1-3
                if (step <= 3) {
                    this.nystagmus.active = true;
                    this.nystagmus.intensity = 0.5 + (4 - step) * 0.1; // Diminue progressivement
                    this.nystagmus.direction = this.affectedSide === 'right' ? 'torsional-ccw' : 'torsional-cw';
                    this.nystagmus.side = this.affectedSide;
                } else {
                    // Étape 4 : inversion
                    this.nystagmus.active = true;
                    this.nystagmus.intensity = 0.3;
                    this.nystagmus.direction = this.affectedSide === 'right' ? 'torsional-cw' : 'torsional-ccw';
                    this.nystagmus.side = this.affectedSide;
                }
            } else if (manoeuvreName === 'semont') {
                // Sémont : nystagmus étape 1
                if (step === 1) {
                    this.nystagmus.active = true;
                    this.nystagmus.intensity = 0.7;
                    this.nystagmus.direction = this.affectedSide === 'right' ? 'torsional-ccw' : 'torsional-cw';
                    this.nystagmus.side = this.affectedSide;
                } else {
                    this.nystagmus.active = false;
                }
            }

        } else if (this.currentCanal === 'horiz') {
            // HORIZONTAL - Nystagmus horizontal
            this.nystagmus.type = 'horizontal';

            if (this.horizontalVariant === 'geotropic') {
                // Géotropique : plus intense du côté atteint
                if (manoeuvreName === 'supineroll') {
                    this.nystagmus.active = true;
                    this.nystagmus.intensity = 0.6;
                    
                    if (step === 1) {
                        this.nystagmus.active = false; // Position neutre
                    } else if (step === 2) {
                        // Roll côté atteint : nystagmus FORT
                        this.nystagmus.intensity = 0.8;
                        this.nystagmus.direction = this.affectedSide === 'right' ? 'right' : 'left';
                        this.nystagmus.side = this.affectedSide;
                    } else if (step === 3) {
                        // Roll côté sain : nystagmus FAIBLE
                        this.nystagmus.intensity = 0.3;
                        this.nystagmus.direction = this.affectedSide === 'right' ? 'left' : 'right';
                        this.nystagmus.side = 'opposite';
                    }
                } else {
                    this.nystagmus.active = step > 1; // Après position 1
                    this.nystagmus.intensity = 0.6;
                    this.nystagmus.direction = this.affectedSide === 'right' ? 'right' : 'left';
                    this.nystagmus.side = this.affectedSide;
                }

            } else if (this.horizontalVariant === 'ageotropic') {
                // Agéotropique : plus intense du côté SAIN
                if (manoeuvreName === 'supineroll') {
                    this.nystagmus.active = true;
                    
                    if (step === 1) {
                        this.nystagmus.active = false;
                    } else if (step === 2) {
                        // Roll côté atteint : nystagmus FAIBLE
                        this.nystagmus.intensity = 0.3;
                        this.nystagmus.direction = this.affectedSide === 'right' ? 'left' : 'right';
                        this.nystagmus.side = 'opposite';
                    } else if (step === 3) {
                        // Roll côté sain : nystagmus FORT
                        this.nystagmus.intensity = 0.8;
                        this.nystagmus.direction = this.affectedSide === 'right' ? 'right' : 'left';
                        this.nystagmus.side = 'sain';
                    }
                } else {
                    this.nystagmus.active = step > 1;
                    this.nystagmus.intensity = 0.6;
                    this.nystagmus.direction = this.affectedSide === 'right' ? 'left' : 'right';
                    this.nystagmus.side = 'opposite';
                }

            } else if (this.horizontalVariant === 'cupulo') {
                // Cupulolithiase : nystagmus persistant, pas de latence
                this.nystagmus.active = step > 1;
                this.nystagmus.intensity = 0.5;
                this.nystagmus.direction = this.affectedSide === 'right' ? 'right' : 'left';
                this.nystagmus.side = this.affectedSide;
            }

        } else if (this.currentCanal === 'ant') {
            // ANTÉRIEUR - Nystagmus vertical inférieur
            this.nystagmus.type = 'vertical-down';

            if (manoeuvreName === 'deepheading') {
                this.nystagmus.active = step > 1;
                this.nystagmus.intensity = 0.6;
                this.nystagmus.direction = 'down';
                this.nystagmus.side = this.affectedSide;
            }
        }
    }

    getStepDescription() {
        if (!this.currentManoeuvre && !this.currentTest) return null;

        const key = this.getDescriptionKey();
        const descriptions = STEP_DESCRIPTIONS[key];
        
        if (descriptions && descriptions[this.currentStep - 1]) {
            return descriptions[this.currentStep - 1];
        }

        return {
            step: this.currentStep,
            title: `Position ${this.currentStep}`,
            description: `Étape ${this.currentStep} sur ${this.totalSteps}`
        };
    }

    getDescriptionKey() {
        if (this.currentManoeuvre) {
            return `${this.currentManoeuvre.id}_${this.currentCanal}`;
        } else if (this.currentTest) {
            return `${this.currentTest.id}_${this.currentCanal}`;
        }
        return 'default';
    }

    getNystagmusInfo() {
        if (!this.nystagmus.active) {
            return 'Aucun nystagmus';
        }

        let info = '';
        
        if (this.nystagmus.type === 'torsional') {
            info += '🔄 Torsionnel ';
            info += this.nystagmus.direction === 'torsional-cw' ? '(horaire)' : '(anti-horaire)';
        } else if (this.nystagmus.type === 'horizontal') {
            info += '↔️ Horizontal ';
            info += this.nystagmus.direction === 'right' ? '(droite)' : '(gauche)';
        } else if (this.nystagmus.type === 'vertical-down') {
            info += '↓ Vertical inférieur';
        }

        const intensity = this.nystagmus.intensity > 0.6 ? 'FORT' : this.nystagmus.intensity > 0.3 ? 'MOYEN' : 'FAIBLE';
        info += ` | Intensité: ${intensity}`;

        if (this.nystagmus.side && this.nystagmus.side !== 'none') {
            info += ` | Côté: ${this.nystagmus.side === 'opposite' ? 'sain' : 'atteint'}`;
        }

        return info;
    }

    updateUI() {
        this.updateStepInfo();
        this.updateNystagmusDisplay();
        
        if (window.visualization) {
            window.visualization.requestRender();
        }
    }

    updateStepInfo() {
        const desc = this.getStepDescription();
        if (desc) {
            const panel = document.getElementById('stepInfo');
            if (panel) {
                panel.innerHTML = `
                    <h4>${desc.title}</h4>
                    <p>${desc.description}</p>
                    <p style="margin-top: 0.5rem; font-size: 0.9rem; color: #666;">
                        Étape ${this.currentStep}/${this.totalSteps}
                    </p>
                `;
            }
        }
    }

    updateNystagmusDisplay() {
        const panel = document.getElementById('nystagmusInfo');
        if (panel) {
            panel.innerHTML = `<strong>${this.getNystagmusInfo()}</strong>`;
        }
    }
}

window.addEventListener('load', () => {
    window.simulator = new SimplifiedVPPBSimulator();
});
