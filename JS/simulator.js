// ========================================
// VPPB SIMULATOR - Core Logic
// ========================================

const CANAL_INFO = {
    post: {
        name: 'Canal postérieur',
        frequency: '90%',
        symptoms: 'Vertiges brefs déclenchés en se couchant, en se relevant ou en se tournant dans le lit.',
        duration: '6 ± 2 semaines',
        nystagmus: 'Torsionnel vertical supérieur, géotropique, paroxystique, épuisable, inversion au retour assis.',
        test: 'Dix-Hallpike / Side-Lying Test'
    },
    horiz: {
        name: 'Canal horizontal',
        frequency: '9%',
        symptoms: 'Vertiges positionnels souvent plus prolongés, parfois > 1 minute selon la forme.',
        duration: 'Variable',
        nystagmus: 'Horizontal géotropique ou agéotropique selon la lithiase et la position.',
        test: 'Bow and Lean / Supine Roll Test / Upright Head Roll'
    },
    ant: {
        name: 'Canal antérieur',
        frequency: '1%',
        symptoms: 'Ébriété, vertige moins franc, parfois amélioration en position couchée.',
        duration: 'Variable',
        nystagmus: 'Vertical inférieur ± composante torsionnelle, diagnostic plus délicat.',
        test: 'Deep Head Hanging / Dix-Hallpike'
    }
};

const MANOEUVRES = {
    post: [
        { id: 'epley', name: 'Manœuvre d’Epley', description: 'Repositionnement séquentiel en 4 positions.' },
        { id: 'semont', name: 'Manœuvre de Sémont', description: 'Manœuvre libératrice rapide, utile si extension cervicale limitée.' },
        { id: 'brandt', name: 'Brandt & Daroff', description: 'Exercices d’habituation, moins spécifiques que les manœuvres libératrices.' }
    ],
    horiz: [
        { id: 'lempert', name: 'Barbecue (Lempert)', description: 'Rotation progressive de 360° pour les formes géotropiques.' },
        { id: 'gufoni3g', name: 'Gufoni 3G', description: 'Pour canalolithiase géotropique.' },
        { id: 'gufoni3a', name: 'Gufoni 3A', description: 'Pour forme agéotropique / cupulolithiase.' }
    ],
    ant: [
        { id: 'yacovino', name: 'Manœuvre de Yacovino', description: 'Ne nécessite pas de latéralisation préalable.' },
        { id: 'li', name: 'Manœuvre de Li', description: 'Variante avec passage ventral après déclenchement.' },
        { id: 'kim', name: 'Manœuvre de Kim', description: 'Option si canal antérieur latéralisé.' }
    ]
};

const TESTS = {
    post: [
        { id: 'dixhallpike', name: 'Dix-Hallpike', description: 'Test diagnostique de référence du canal postérieur.' },
        { id: 'sidelying', name: 'Side-Lying Test', description: 'Alternative si extension cervicale limitée.' }
    ],
    horiz: [
        { id: 'bowlean', name: 'Bow and Lean', description: 'Aide à distinguer canalolithiase et cupulolithiase.' },
        { id: 'supineroll', name: 'Supine Roll Test', description: 'Test clé pour lire la forme géotropique / agéotropique.' },
        { id: 'upright', name: 'Upright Head Roll', description: 'Confirme le côté atteint par inclinaison frontale.' }
    ],
    ant: [
        { id: 'deepheading', name: 'Deep Head Hanging', description: 'Test de référence pour le canal antérieur.' },
        { id: 'dixhallpike_ant', name: 'Dix-Hallpike antérieur', description: 'Permet parfois de latéraliser via la torsion.' }
    ]
};

const CLINICAL_CASES = {
    post_1: {
        canal: 'post',
        side: 'right',
        title: 'Cas 1 - Canal postérieur droit',
        statement: 'Patient de 62 ans, vertiges rotatoires brefs au lever du lit, déclenchés quand il se couche côté droit. Dix-Hallpike droit : nystagmus torsionnel anti-horaire géotropique de courte durée.',
        expected: 'VPPB du canal postérieur droit.',
        manoeuvre: 'Epley ou Sémont à point de départ droit.',
        notes: 'Dormir du côté sain et éviter les grands mouvements dans le plan antéro-postérieur.'
    },
    post_4: {
        canal: 'post',
        side: 'right',
        title: 'Cas 4 - Bilatéral à prédominance droite',
        statement: 'Vertiges brefs déclenchés à gauche et à droite lors du coucher. Dix-Hallpike positif des deux côtés, plus marqué à droite.',
        expected: 'VPPB bilatéral à prédominance droite.',
        manoeuvre: 'Traiter d’abord le côté droit puis contrôler avant de traiter l’autre côté.',
        notes: 'Dormir demi-assis après traitement.'
    },
    horiz_9: {
        canal: 'horiz',
        side: 'left',
        variant: 'geotropic',
        title: 'Cas 9 - Horizontal géotropique gauche',
        statement: 'Au Supine Roll Test, le nystagmus est géotropique, plus intense à gauche.',
        expected: 'VPPB canal horizontal géotropique gauche.',
        manoeuvre: 'Gufoni côté sain ou Lempert vers la droite.',
        notes: 'Le côté atteint correspond au nystagmus le plus intense.'
    },
    horiz_10: {
        canal: 'horiz',
        side: 'left',
        variant: 'ageotropic',
        title: 'Cas 10 - Horizontal agéotropique gauche',
        statement: 'Nystagmus agéotropique plus marqué à droite au Supine Roll Test.',
        expected: 'VPPB horizontal agéotropique gauche.',
        manoeuvre: 'Gufoni 3A côté atteint gauche. Compléter par Bow and Lean.',
        notes: 'Le côté atteint est opposé au nystagmus le plus intense.'
    },
    ant_13: {
        canal: 'ant',
        side: 'right',
        title: 'Cas 13 - Canal antérieur droit',
        statement: 'Dix-Hallpike gauche : nystagmus vertical inférieur avec légère composante torsionnelle anti-horaire.',
        expected: 'VPPB du canal antérieur droit.',
        manoeuvre: 'Kim / Yacovino modifié ou Epley inversé selon la logique de latéralisation.',
        notes: 'Toujours garder en tête le diagnostic différentiel central.'
    },
    ant_15: {
        canal: 'ant',
        side: 'right',
        title: 'Cas 15 - Conversion vers antérieur',
        statement: 'Après une manœuvre d’Epley, apparition d’un nystagmus vertical inférieur au contrôle.',
        expected: 'Conversion canalaire vers le canal antérieur de la même oreille.',
        manoeuvre: 'Deep Head Hanging prolongé en Yacovino.',
        notes: 'Situation pédagogique typique de conversion des canaux verticaux.'
    }
};

class VPPBSimulator {
    constructor() {
        this.currentCanal = 'post';
        this.affectedSide = 'right';
        this.horizontalVariant = 'geotropic';

        this.currentManoeuvre = MANOEUVRES[this.currentCanal][0];
        this.currentTest = TESTS[this.currentCanal][0];

        this.activeMode = 'manoeuvre';
        this.isAnimating = false;
        this.animationProgress = 0;
        this.animationSpeed = 1;
        this.animationFrameId = null;
        this.lastTimestamp = null;

        this.otoliths = {
            position: { x: 0, y: 0, z: 0 },
            velocity: { x: 0, y: 0, z: 0 },
            trail: []
        };

        this.endolymph = {
            flow: 0,
            directionLabel: 'neutre'
        };

        this.cupula = {
            deflection: 0
        };

        this.nystagmus = {
            latence: 0,
            direction: 'aucun',
            amplitude: 0,
            frequency: 0,
            type: 'aucun',
            geometric: 'aucun',
            phase: 'rest',
            inversionOnReturn: false
        };

        this.headPosition = {
            rotation: { x: 0, y: 0, z: 0 },
            label: 'centre'
        };

        this.init();
    }

    init() {
        this.bindUI();
        this.updateSelectors();
        this.updateUI();
        this.updateSimulation(0, 'manoeuvre');
    }

    bindUI() {
        const canalButtons = document.querySelectorAll('#canalButtons .btn');
        canalButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                this.setCanal(btn.dataset.canal);
            });
        });

        const tabs = document.querySelectorAll('.tab');
        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });

        const affectedSide = document.getElementById('affectedSide');
        if (affectedSide) {
            affectedSide.addEventListener('change', (e) => {
                this.setAffectedSide(e.target.value);
            });
        }

        const horizontalVariant = document.getElementById('horizontalVariant');
        if (horizontalVariant) {
            horizontalVariant.addEventListener('change', (e) => {
                this.setHorizontalVariant(e.target.value);
            });
        }

        const manoeuvreSlider = document.getElementById('manoeuvreSlider');
        if (manoeuvreSlider) {
            manoeuvreSlider.addEventListener('input', (e) => {
                this.setMode('manoeuvre');
                this.pauseAnimation();
                this.updateManoeuvreProgress(parseFloat(e.target.value));
            });
        }

        const testSlider = document.getElementById('testSlider');
        if (testSlider) {
            testSlider.addEventListener('input', (e) => {
                this.setMode('test');
                this.pauseAnimation();
                this.updateTestProgress(parseFloat(e.target.value));
            });
        }

        const speedSlider = document.getElementById('speedSlider');
        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.updateSpeed(e.target.value);
            });
        }

        const playAnimationBtn = document.getElementById('playAnimationBtn');
        if (playAnimationBtn) {
            playAnimationBtn.addEventListener('click', () => {
                this.setMode('manoeuvre');
                this.playAnimation();
            });
        }

        const pauseAnimationBtn = document.getElementById('pauseAnimationBtn');
        if (pauseAnimationBtn) {
            pauseAnimationBtn.addEventListener('click', () => this.pauseAnimation());
        }

        const resetAnimationBtn = document.getElementById('resetAnimationBtn');
        if (resetAnimationBtn) {
            resetAnimationBtn.addEventListener('click', () => this.resetAnimation());
        }

        const playTestBtn = document.getElementById('playTestBtn');
        if (playTestBtn) {
            playTestBtn.addEventListener('click', () => {
                this.setMode('test');
                this.playAnimation();
            });
        }

        const pauseTestBtn = document.getElementById('pauseTestBtn');
        if (pauseTestBtn) {
            pauseTestBtn.addEventListener('click', () => this.pauseAnimation());
        }

        const resetTestBtn = document.getElementById('resetTestBtn');
        if (resetTestBtn) {
            resetTestBtn.addEventListener('click', () => this.resetTest());
        }

        const caseSelector = document.getElementById('caseSelector');
        if (caseSelector) {
            caseSelector.addEventListener('change', (e) => {
                this.loadClinicalCase(e.target.value);
            });
        }
    }

    setCanal(canal) {
        this.currentCanal = canal;
        this.currentManoeuvre = MANOEUVRES[canal][0];
        this.currentTest = TESTS[canal][0];
        this.animationProgress = 0;
        this.otoliths.trail = [];
        this.pauseAnimation();
        this.updateSelectors();
        this.updateUI();
        this.updateSimulation(0, this.activeMode);
    }

    setAffectedSide(side) {
        this.affectedSide = side;
        this.updateUI();
        this.updateSimulation(this.animationProgress, this.activeMode);
    }

    setHorizontalVariant(variant) {
        this.horizontalVariant = variant;
        this.updateUI();
        this.updateSimulation(this.animationProgress, this.activeMode);
    }

    setMode(mode) {
        this.activeMode = mode;
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));

        const targetContent = document.getElementById(tabName);
        const targetTab = document.querySelector(`.tab[data-tab="${tabName}"]`);

        if (targetContent) targetContent.classList.add('active');
        if (targetTab) targetTab.classList.add('active');
    }

    updateSelectors() {
        document.querySelectorAll('#canalButtons .btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.canal === this.currentCanal);
        });

        const affectedSide = document.getElementById('affectedSide');
        if (affectedSide) affectedSide.value = this.affectedSide;

        const horizontalVariant = document.getElementById('horizontalVariant');
        if (horizontalVariant) {
            horizontalVariant.value = this.horizontalVariant;
            horizontalVariant.disabled = this.currentCanal !== 'horiz';
        }

        this.renderManoeuvreButtons();
        this.renderTestButtons();
    }

    renderManoeuvreButtons() {
        const container = document.getElementById('manoeuvreButtons');
        if (!container) return;

        container.innerHTML = '';
        MANOEUVRES[this.currentCanal].forEach((m) => {
            const btn = document.createElement('button');
            btn.className = 'btn' + (this.currentManoeuvre && this.currentManoeuvre.id === m.id ? ' active' : '');
            btn.textContent = m.name;
            btn.addEventListener('click', () => {
                this.currentManoeuvre = m;
                this.setMode('manoeuvre');
                this.resetAnimation(false);
                this.renderManoeuvreButtons();
                this.updateUI();
            });
            container.appendChild(btn);
        });
    }

    renderTestButtons() {
        const container = document.getElementById('testButtons');
        if (!container) return;

        container.innerHTML = '';
        TESTS[this.currentCanal].forEach((t) => {
            const btn = document.createElement('button');
            btn.className = 'btn' + (this.currentTest && this.currentTest.id === t.id ? ' active' : '');
            btn.textContent = t.name;
            btn.addEventListener('click', () => {
                this.currentTest = t;
                this.setMode('test');
                this.resetTest(false);
                this.renderTestButtons();
                this.updateUI();
            });
            container.appendChild(btn);
        });
    }

    updateUI() {
        this.updateCanalInfo();
        this.updateManoeuvreInfo();
        this.updateTestInfo();
        this.updateClinicalInfo();
        this.updateHeadPositionIndicator();
        this.updateAnalysisStats();
    }

    updateCanalInfo() {
        const current = CANAL_INFO[this.currentCanal];
        const el = document.getElementById('canalInfo');
        if (!el) return;

        el.innerHTML = `
            <h4>${current.name}</h4>
            <p><strong>Fréquence :</strong> ${current.frequency}</p>
            <p><strong>Symptômes :</strong> ${current.symptoms}</p>
            <p><strong>Durée :</strong> ${current.duration}</p>
            <p><strong>Nystagmus attendu :</strong> ${current.nystagmus}</p>
            <p><strong>Test diagnostique :</strong> ${current.test}</p>
        `;
    }

    updateManoeuvreInfo() {
        const panel = document.getElementById('manoeuvreInfo');
        if (!panel || !this.currentManoeuvre) return;

        const sideTxt = this.affectedSide === 'right' ? 'droite' : 'gauche';
        const variantTxt = this.getHorizontalVariantLabel();

        const infos = {
            epley: {
                title: 'Manœuvre d’Epley',
                steps: [
                    `Position assise, tête tournée à 45° vers l’oreille atteinte (${sideTxt}).`,
                    'Passage en décubitus dorsal tête pendante.',
                    'Rotation de la tête vers le côté opposé.',
                    'Rotation tête + tronc vers le décubitus latéral.',
                    'Retour assis en conservant la séquence.'
                ],
                notes: 'Manœuvre de repositionnement du canal postérieur. Observer le nystagmus thérapeutique.'
            },
            semont: {
                title: 'Manœuvre de Sémont',
                steps: [
                    'Tête tournée du côté opposé au côté atteint.',
                    'Bascule rapide côté atteint.',
                    'Attente jusqu’à épuisement.',
                    'Transfert rapide vers le côté opposé.',
                    'Maintien puis retour assis sécurisé.'
                ],
                notes: 'Option utile si extension cervicale limitée.'
            },
            brandt: {
                title: 'Brandt & Daroff',
                steps: [
                    'Position assise initiale.',
                    'Décubitus latéral d’un côté.',
                    'Retour assis.',
                    'Décubitus latéral de l’autre côté.',
                    'Répétitions sériées.'
                ],
                notes: 'Exercices d’habituation, moins spécifiques qu’une manœuvre libératrice.'
            },
            lempert: {
                title: 'Barbecue (Lempert)',
                steps: [
                    'Décubitus dorsal tête fléchie.',
                    'Rotations successives par étapes.',
                    'Progression de 90° en 90°.',
                    'Passage éventuel ventral.',
                    'Retour assis progressif.'
                ],
                notes: `Principalement pour forme horizontale ${variantTxt}.`
            },
            gufoni3g: {
                title: 'Gufoni 3G',
                steps: [
                    'Patient assis jambes pendantes.',
                    'Bascule latérale rapide selon la logique géotropique.',
                    'Rotation de tête vers la table.',
                    'Maintien puis retour assis.',
                    'Observation du nystagmus thérapeutique.'
                ],
                notes: 'Indiquée surtout dans les formes géotropiques.'
            },
            gufoni3a: {
                title: 'Gufoni 3A',
                steps: [
                    'Patient assis jambes pendantes.',
                    'Bascule latérale rapide côté atteint.',
                    'Rotation de tête vers le haut.',
                    'Maintien puis retour assis.',
                    'Recontrôle par test diagnostique.'
                ],
                notes: 'Indiquée dans les formes agéotropiques / cupulolithiase.'
            },
            yacovino: {
                title: 'Manœuvre de Yacovino',
                steps: [
                    'Position assise tête droite.',
                    'Straight head hanging / deep head hanging.',
                    'Ramener menton-poitrine.',
                    'Retour assis en flexion.',
                    'Relever tête droite.'
                ],
                notes: 'Ne nécessite pas d’identifier au préalable le côté atteint.'
            },
            li: {
                title: 'Manœuvre de Li',
                steps: [
                    'Déclenchement en head hanging.',
                    'Bascule rapide en ventral.',
                    'Maintien prolongé.',
                    'Retour progressif.',
                    'Recontrôle clinique.'
                ],
                notes: 'Variante utile dans le canal antérieur.'
            },
            kim: {
                title: 'Manœuvre de Kim',
                steps: [
                    'Tête tournée vers le côté sain.',
                    'Passage couché avec hyperextension.',
                    'Redressement de la tête.',
                    'Retour assis menton vers le bas.',
                    'Recontrôle.'
                ],
                notes: 'Utilisée si latéralisation antérieure probable.'
            }
        };

        const info = infos[this.currentManoeuvre.id];
        panel.innerHTML = `
            <h4>${info.title}</h4>
            <p><strong>Étapes :</strong></p>
            <ol>
                ${info.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
            <p><strong>Notes :</strong> ${info.notes}</p>
        `;
    }

    updateTestInfo() {
        const panel = document.getElementById('testInfo');
        if (!panel || !this.currentTest) return;

        const infos = {
            dixhallpike: {
                title: 'Test de Dix-Hallpike',
                description: 'Test diagnostique de référence du canal postérieur.',
                procedure: [
                    'Patient assis.',
                    'Rotation tête 45° vers le côté testé.',
                    'Bascule rapide en décubitus dorsal tête pendante.',
                    'Observation de la latence, du paroxysme et de l’épuisement.',
                    'Observation de l’inversion au retour assis.'
                ]
            },
            sidelying: {
                title: 'Side-Lying Test',
                description: 'Alternative au Dix-Hallpike si extension cervicale limitée.',
                procedure: [
                    'Patient assis.',
                    'Tête tournée à 45° du côté opposé.',
                    'Bascule en décubitus latéral du côté testé.',
                    'Observation du nystagmus.',
                    'Retour assis avec recherche de l’inversion.'
                ]
            },
            bowlean: {
                title: 'Bow and Lean',
                description: 'Permet de distinguer canalolithiase et cupulolithiase du canal horizontal.',
                procedure: [
                    'Position tête fléchie (Bow).',
                    'Observation du sens du nystagmus.',
                    'Position tête en extension (Lean).',
                    'Observation de l’inversion.',
                    'Interprétation selon latence et persistance.'
                ]
            },
            supineroll: {
                title: 'Supine Roll Test',
                description: 'Test central dans les formes horizontales.',
                procedure: [
                    'Patient en décubitus dorsal, tête fléchie à 30°.',
                    'Rotation rapide à droite.',
                    'Observation du nystagmus.',
                    'Retour centre puis rotation à gauche.',
                    'Comparer intensité et direction.'
                ]
            },
            upright: {
                title: 'Upright Head Roll',
                description: 'Test de confirmation en position assise.',
                procedure: [
                    'Patient assis tête droite.',
                    'Inclinaison latérale d’un côté.',
                    'Observation du sens du nystagmus.',
                    'Inclinaison de l’autre côté.',
                    'Comparer avec la logique Bow-Lean / SRT.'
                ]
            },
            deepheading: {
                title: 'Deep Head Hanging',
                description: 'Test du canal antérieur.',
                procedure: [
                    'Patient assis tête droite.',
                    'Bascule en hyperextension cervicale.',
                    'Observation d’un vertical inférieur ± torsion.',
                    'Maintien puis retour assis.',
                    'Toujours penser au diagnostic différentiel central.'
                ]
            },
            dixhallpike_ant: {
                title: 'Dix-Hallpike antérieur',
                description: 'Peut aider à latéraliser le canal antérieur via la torsion.',
                procedure: [
                    'Dix-Hallpike réalisé comme pour le postérieur.',
                    'Observation d’une composante verticale inférieure.',
                    'Recherche d’une torsion associée.',
                    'Interprétation prudente du côté atteint.',
                    'Comparer au Deep Head Hanging.'
                ]
            }
        };

        const info = infos[this.currentTest.id];
        panel.innerHTML = `
            <h4>${info.title}</h4>
            <p>${info.description}</p>
            <p><strong>Procédure :</strong></p>
            <ol>
                ${info.procedure.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
    }

    updateClinicalInfo() {
        const panel = document.getElementById('clinicalInfo');
        if (!panel) return;

        const sideTxt = this.affectedSide === 'right' ? 'droite' : 'gauche';
        const variantTxt = this.getHorizontalVariantLabel();

        const data = {
            post: {
                title: `Canal postérieur ${sideTxt}`,
                differential: 'Vertige central positionnel, vertige sans nystagmus visible, compression vasculaire, déséquilibre non vestibulaire.',
                prognosis: 'Évolution souvent spontanément favorable mais les manœuvres libératrices accélèrent la résolution.',
                recurrence: 'Récidive possible.',
                keyPoints: [
                    'Latence puis paroxysme puis épuisement.',
                    'Nystagmus torsionnel géotropique vers l’oreille basse.',
                    'Inversion au retour assis attendue.',
                    'Epley ou Sémont selon le contexte clinique.'
                ]
            },
            horiz: {
                title: `Canal horizontal ${sideTxt} - ${variantTxt}`,
                differential: 'Pseudo-spontané horizontal, atteinte vestibulaire aiguë, confusion géotropique / agéotropique.',
                prognosis: 'Très dépendant du type de lithiase et des conversions.',
                recurrence: 'Récidive et conversions plus fréquentes que le postérieur.',
                keyPoints: [
                    'Latence importante pour distinguer canalolithiase / cupulolithiase.',
                    'Supine Roll Test = test majeur.',
                    'Géotropique : côté atteint = nystagmus le plus fort.',
                    'Agéotropique / cupulo : côté atteint souvent opposé au nystagmus le plus fort.'
                ]
            },
            ant: {
                title: `Canal antérieur ${sideTxt}`,
                differential: 'Toujours discuter une origine centrale devant un vertical inférieur.',
                prognosis: 'Diagnostic plus rare, parfois plus complexe.',
                recurrence: 'Possible, parfois conversions depuis les canaux verticaux.',
                keyPoints: [
                    'Vertical inférieur ± torsion.',
                    'Deep Head Hanging utile.',
                    'Yacovino ou Li selon contexte.',
                    'Prudence si discordance clinique ou signes neurologiques.'
                ]
            }
        };

        const current = data[this.currentCanal];
        panel.innerHTML = `
            <h3>${current.title}</h3>
            <p><strong>Diagnostics différentiels :</strong> ${current.differential}</p>
            <p><strong>Pronostic :</strong> ${current.prognosis}</p>
            <p><strong>Récidive :</strong> ${current.recurrence}</p>
            <p><strong>Points clés :</strong></p>
            <ul>
                ${current.keyPoints.map(point => `<li>${point}</li>`).join('')}
            </ul>
        `;
    }

    getHorizontalVariantLabel() {
        if (this.horizontalVariant === 'geotropic') return 'canalolithiase géotropique';
        if (this.horizontalVariant === 'ageotropic') return 'canalolithiase agéotropique';
        return 'cupulolithiase';
    }

    updateManoeuvreProgress(progress) {
        this.animationProgress = progress;
        const slider = document.getElementById('manoeuvreSlider');
        const display = document.getElementById('progressDisplay');
        if (slider) slider.value = progress;
        if (display) display.textContent = `${Math.round(progress)}%`;
        this.updateSimulation(progress, 'manoeuvre');
    }

    updateTestProgress(progress) {
        this.animationProgress = progress;
        const slider = document.getElementById('testSlider');
        const display = document.getElementById('testProgressDisplay');
        if (slider) slider.value = progress;
        if (display) display.textContent = `${Math.round(progress)}%`;
        this.updateSimulation(progress, 'test');
    }

    updateSimulation(progress, mode) {
        this.computeHeadPosition(progress, mode);
        this.computeOtoliths(progress, mode);
        this.computeFluidAndCupula(progress, mode);
        this.computeNystagmus(progress, mode);
        this.updateHeadPositionIndicator();
        this.updateAnalysisStats();

        if (window.visualization && typeof window.visualization.requestRender === 'function') {
            window.visualization.requestRender();
        }

        if (window.analyzer && typeof window.analyzer.renderAnalysis === 'function') {
            window.analyzer.renderAnalysis();
        }
    }

    computeHeadPosition(progress, mode) {
        const p = progress / 100;
        this.headPosition.rotation = { x: 0, y: 0, z: 0 };
        this.headPosition.label = 'centre';

        if (mode === 'test' && this.currentTest) {
            switch (this.currentTest.id) {
                case 'dixhallpike':
                case 'dixhallpike_ant':
                    this.headPosition.rotation.y = this.affectedSide === 'right' ? 45 : -45;
                    this.headPosition.rotation.x = p < 0.55 ? p * 110 : 110 - ((p - 0.55) / 0.45) * 110;
                    this.headPosition.label = this.affectedSide === 'right' ? 'droite' : 'gauche';
                    break;
                case 'sidelying':
                    this.headPosition.rotation.y = this.affectedSide === 'right' ? 45 : -45;
                    this.headPosition.rotation.z = this.affectedSide === 'right' ? 70 : -70;
                    this.headPosition.label = this.affectedSide === 'right' ? 'droite' : 'gauche';
                    break;
                case 'bowlean':
                    if (p < 0.5) {
                        this.headPosition.rotation.x = -40 * (p / 0.5);
                    } else {
                        this.headPosition.rotation.x = 35 * ((p - 0.5) / 0.5);
                    }
                    this.headPosition.label = 'centre';
                    break;
                case 'supineroll':
                    if (p < 0.33) {
                        this.headPosition.rotation.z = 0;
                        this.headPosition.label = 'centre';
                    } else if (p < 0.66) {
                        this.headPosition.rotation.z = this.affectedSide === 'right' ? 80 : -80;
                        this.headPosition.label = this.affectedSide === 'right' ? 'droite' : 'gauche';
                    } else {
                        this.headPosition.rotation.z = this.affectedSide === 'right' ? -80 : 80;
                        this.headPosition.label = this.affectedSide === 'right' ? 'gauche' : 'droite';
                    }
                    break;
                case 'upright':
                    this.headPosition.rotation.z = Math.sin(p * Math.PI * 2) * 45;
                    this.headPosition.label = this.headPosition.rotation.z > 10 ? 'droite' : this.headPosition.rotation.z < -10 ? 'gauche' : 'centre';
                    break;
                case 'deepheading':
                    this.headPosition.rotation.x = p < 0.65 ? 120 * (p / 0.65) : 120 - ((p - 0.65) / 0.35) * 100;
                    this.headPosition.label = 'centre';
                    break;
            }
        }

        if (mode === 'manoeuvre' && this.currentManoeuvre) {
            switch (this.currentManoeuvre.id) {
                case 'epley':
                    if (p < 0.25) {
                        this.headPosition.rotation.y = this.affectedSide === 'right' ? 45 : -45;
                        this.headPosition.rotation.x = 100;
                    } else if (p < 0.5) {
                        this.headPosition.rotation.y = this.affectedSide === 'right' ? -45 : 45;
                        this.headPosition.rotation.x = 100;
                    } else if (p < 0.75) {
                        this.headPosition.rotation.y = this.affectedSide === 'right' ? -100 : 100;
                        this.headPosition.rotation.x = 80;
                    } else {
                        this.headPosition.rotation.y = 0;
                        this.headPosition.rotation.x = 10;
                    }
                    this.headPosition.label = this.affectedSide === 'right' ? 'droite' : 'gauche';
                    break;
                case 'semont':
                    this.headPosition.rotation.y = this.affectedSide === 'right' ? -45 : 45;
                    this.headPosition.rotation.z = p < 0.5
                        ? (this.affectedSide === 'right' ? 90 : -90)
                        : (this.affectedSide === 'right' ? -90 : 90);
                    this.headPosition.label = p < 0.5
                        ? (this.affectedSide === 'right' ? 'droite' : 'gauche')
                        : (this.affectedSide === 'right' ? 'gauche' : 'droite');
                    break;
                case 'brandt':
                    this.headPosition.rotation.z = Math.sin(p * Math.PI * 2) * 80;
                    this.headPosition.label = this.headPosition.rotation.z > 10 ? 'droite' : this.headPosition.rotation.z < -10 ? 'gauche' : 'centre';
                    break;
                case 'lempert':
                    this.headPosition.rotation.z = (p * 360) - 180;
                    this.headPosition.label = this.headPosition.rotation.z > 45 ? 'droite' : this.headPosition.rotation.z < -45 ? 'gauche' : 'centre';
                    break;
                case 'gufoni3g':
                case 'gufoni3a':
                    this.headPosition.rotation.z = this.affectedSide === 'right' ? 90 : -90;
                    this.headPosition.rotation.y = this.currentManoeuvre.id === 'gufoni3g'
                        ? (this.affectedSide === 'right' ? -90 : 90)
                        : (this.affectedSide === 'right' ? 90 : -90);
                    this.headPosition.label = this.affectedSide === 'right' ? 'droite' : 'gauche';
                    break;
                case 'yacovino':
                case 'li':
                case 'kim':
                    this.headPosition.rotation.x = p < 0.45 ? 120 * (p / 0.45) : p < 0.75 ? 30 : 0;
                    this.headPosition.rotation.y = this.currentManoeuvre.id === 'kim'
                        ? (this.affectedSide === 'right' ? -45 : 45)
                        : 0;
                    this.headPosition.label = 'centre';
                    break;
            }
        }
    }

    computeOtoliths(progress, mode) {
        const p = progress / 100;

        let x = 0;
        let y = 0;
        let z = 0;

        if (this.currentCanal === 'post') {
            const side = this.affectedSide === 'right' ? 1 : -1;
            x = side * (20 + 55 * p);
            y = -55 + 70 * Math.sin(p * Math.PI * 0.9);
            z = 40 * Math.sin(p * Math.PI);
        } else if (this.currentCanal === 'horiz') {
            const side = this.affectedSide === 'right' ? 1 : -1;
            const directionFactor = this.horizontalVariant === 'geotropic' ? 1 : -1;
            x = side * Math.cos(p * Math.PI * 2) * 70;
            y = Math.sin(p * Math.PI * 2 * directionFactor) * 26;
            z = 0;
        } else if (this.currentCanal === 'ant') {
            const side = this.affectedSide === 'right' ? 1 : -1;
            x = side * (15 + 45 * Math.sin(p * Math.PI));
            y = 40 - 80 * p;
            z = 35 * Math.cos(p * Math.PI);
        }

        const prev = { ...this.otoliths.position };
        this.otoliths.position = { x, y, z };
        this.otoliths.velocity = {
            x: x - prev.x,
            y: y - prev.y,
            z: z - prev.z
        };

        this.otoliths.trail.push({ x, y, z });
        if (this.otoliths.trail.length > 90) {
            this.otoliths.trail.shift();
        }
    }

    computeFluidAndCupula(progress, mode) {
        const p = progress / 100;
        let flow = 0;

        if (this.currentCanal === 'post') {
            if (p < 0.18) flow = 0.1;
            else if (p < 0.32) flow = 0.9;
            else if (p < 0.6) flow = 0.6;
            else if (p < 0.82) flow = 0.25;
            else flow = -0.45;
        } else if (this.currentCanal === 'horiz') {
            if (this.horizontalVariant === 'cupulo') {
                flow = p < 0.5 ? 0.85 : -0.85;
            } else if (this.horizontalVariant === 'geotropic') {
                flow = Math.sin(p * Math.PI * 2) * 0.9;
            } else {
                flow = -Math.sin(p * Math.PI * 2) * 0.8;
            }
        } else if (this.currentCanal === 'ant') {
            flow = p < 0.4 ? -0.7 : p < 0.8 ? -0.35 : 0.2;
        }

        this.endolymph.flow = flow;
        this.endolymph.directionLabel = flow > 0.12 ? 'excitateur' : flow < -0.12 ? 'inhibiteur' : 'neutre';
        this.cupula.deflection = flow;
    }

    computeNystagmus(progress, mode) {
        const p = progress / 100;

        this.nystagmus = {
            latence: 0,
            direction: 'aucun',
            amplitude: 0,
            frequency: 0,
            type: 'aucun',
            geometric: 'aucun',
            phase: 'rest',
            inversionOnReturn: false
        };

        if (this.currentCanal === 'post') {
            this.nystagmus.type = 'torsionnel';
            this.nystagmus.geometric = 'géotropique';

            if (p < 0.18) {
                this.nystagmus.latence = Math.round((0.18 - p) * 30);
                this.nystagmus.phase = 'latence';
                this.nystagmus.direction = 'en attente';
            } else if (p < 0.45) {
                const q = (p - 0.18) / 0.27;
                this.nystagmus.phase = 'paroxysme';
                this.nystagmus.amplitude = 8 + q * 14;
                this.nystagmus.frequency = 1.5 + q * 1.4;
                this.nystagmus.direction = this.affectedSide === 'right'
                    ? 'torsionnel géotropique anti-horaire'
                    : 'torsionnel géotropique horaire';
            } else if (p < 0.82) {
                const q = 1 - ((p - 0.45) / 0.37);
                this.nystagmus.phase = 'épuisement';
                this.nystagmus.amplitude = 5 + q * 10;
                this.nystagmus.frequency = 0.8 + q * 1.2;
                this.nystagmus.direction = this.affectedSide === 'right'
                    ? 'torsionnel géotropique anti-horaire'
                    : 'torsionnel géotropique horaire';
            } else {
                const q = (p - 0.82) / 0.18;
                this.nystagmus.phase = 'inversion';
                this.nystagmus.amplitude = Math.max(1, 6 - q * 4);
                this.nystagmus.frequency = Math.max(0.5, 1.0 - q * 0.3);
                this.nystagmus.direction = this.affectedSide === 'right'
                    ? 'inversion horaire au retour assis'
                    : 'inversion anti-horaire au retour assis';
                this.nystagmus.inversionOnReturn = true;
            }
        }

        if (this.currentCanal === 'horiz') {
            this.nystagmus.type = 'horizontal';

            if (this.horizontalVariant === 'cupulo') {
                this.nystagmus.geometric = 'agéotropique';
                this.nystagmus.phase = 'persistant';
                this.nystagmus.latence = 0;
                this.nystagmus.amplitude = 12 + Math.abs(Math.sin(p * Math.PI * 2)) * 5;
                this.nystagmus.frequency = 1.2 + Math.abs(Math.sin(p * Math.PI * 2));
                this.nystagmus.direction = this.getHorizontalDirection(p, 'cupulo');
            } else if (this.horizontalVariant === 'geotropic') {
                this.nystagmus.geometric = 'géotropique';
                if (p < 0.16) {
                    this.nystagmus.latence = Math.round((0.16 - p) * 30);
                    this.nystagmus.phase = 'latence';
                    this.nystagmus.direction = 'en attente';
                } else {
                    this.nystagmus.phase = 'actif';
                    this.nystagmus.amplitude = 8 + Math.abs(Math.sin(p * Math.PI * 2)) * 6;
                    this.nystagmus.frequency = 1.0 + Math.abs(Math.sin(p * Math.PI * 2));
                    this.nystagmus.direction = this.getHorizontalDirection(p, 'geotropic');
                }
            } else {
                this.nystagmus.geometric = 'agéotropique';
                if (p < 0.12) {
                    this.nystagmus.latence = Math.round((0.12 - p) * 35);
                    this.nystagmus.phase = 'latence';
                    this.nystagmus.direction = 'en attente';
                } else {
                    this.nystagmus.phase = 'actif';
                    this.nystagmus.amplitude = 7 + Math.abs(Math.cos(p * Math.PI * 2)) * 5;
                    this.nystagmus.frequency = 1.0 + Math.abs(Math.cos(p * Math.PI * 2)) * 0.8;
                    this.nystagmus.direction = this.getHorizontalDirection(p, 'ageotropic');
                }
            }
        }

        if (this.currentCanal === 'ant') {
            this.nystagmus.type = 'vertical inférieur';
            this.nystagmus.geometric = 'non applicable';

            if (p < 0.12) {
                this.nystagmus.latence = Math.round((0.12 - p) * 30);
                this.nystagmus.phase = 'latence';
                this.nystagmus.direction = 'en attente';
            } else if (p < 0.7) {
                const q = (p - 0.12) / 0.58;
                this.nystagmus.phase = 'actif';
                this.nystagmus.amplitude = 6 + q * 10;
                this.nystagmus.frequency = 1.0 + q * 0.8;
                this.nystagmus.direction = this.affectedSide === 'right'
                    ? 'vertical inférieur + torsion anti-horaire possible'
                    : 'vertical inférieur + torsion horaire possible';
            } else {
                const q = (p - 0.7) / 0.3;
                this.nystagmus.phase = 'décroissance';
                this.nystagmus.amplitude = Math.max(1, 8 - q * 6);
                this.nystagmus.frequency = Math.max(0.5, 1.0 - q * 0.3);
                this.nystagmus.direction = 'vertical inférieur';
            }
        }
    }

    getHorizontalDirection(p, variant) {
        const side = this.affectedSide === 'right' ? 'droite' : 'gauche';
        const opposite = this.affectedSide === 'right' ? 'gauche' : 'droite';

        if (variant === 'geotropic') {
            if (p < 0.33) return 'horizontal centre';
            if (p < 0.66) return `géotropique battant vers ${side}`;
            return `géotropique battant vers ${opposite}`;
        }

        if (variant === 'ageotropic') {
            if (p < 0.33) return 'horizontal centre';
            if (p < 0.66) return `agéotropique plus fort côté ${opposite}`;
            return `agéotropique plus fort côté ${side}`;
        }

        if (p < 0.5) return `agéotropique persistant vers ${opposite}`;
        return `agéotropique persistant vers ${side}`;
    }

    updateHeadPositionIndicator() {
        const left = document.getElementById('pos-left');
        const center = document.getElementById('pos-center');
        const right = document.getElementById('pos-right');
        if (!left || !center || !right) return;

        left.classList.remove('active');
        center.classList.remove('active');
        right.classList.remove('active');

        if (this.headPosition.label === 'gauche') left.classList.add('active');
        else if (this.headPosition.label === 'droite') right.classList.add('active');
        else center.classList.add('active');
    }

    updateAnalysisStats() {
        const latenceEl = document.getElementById('latenceValue');
        const directionEl = document.getElementById('directionValue');
        const amplitudeEl = document.getElementById('amplitudeValue');
        const frequencyEl = document.getElementById('frequencyValue');

        if (latenceEl) latenceEl.textContent = this.nystagmus.latence > 0 ? `${this.nystagmus.latence}s` : '0s';
        if (directionEl) directionEl.textContent = this.nystagmus.direction || '-';
        if (amplitudeEl) amplitudeEl.textContent = `${Math.round(this.nystagmus.amplitude)}°`;
        if (frequencyEl) frequencyEl.textContent = `${this.nystagmus.frequency.toFixed(1)} Hz`;

        const pupil = document.getElementById('eyePupil');
        if (pupil) {
            let dx = 0;
            let dy = 0;
            const amp = Math.min(14, this.nystagmus.amplitude || 0);

            if (this.currentCanal === 'horiz') {
                dx = Math.sin(this.animationProgress / 100 * Math.PI * 4) * amp;
            } else if (this.currentCanal === 'post') {
                dx = Math.sin(this.animationProgress / 100 * Math.PI * 4) * amp * 0.75;
                dy = -Math.cos(this.animationProgress / 100 * Math.PI * 4) * amp * 0.55;
            } else {
                dy = Math.sin(this.animationProgress / 100 * Math.PI * 4) * amp * 0.9;
                dx = this.affectedSide === 'right' ? amp * 0.25 : -amp * 0.25;
            }

            pupil.style.left = `calc(50% + ${dx}px)`;
            pupil.style.top = `calc(50% + ${dy}px)`;
        }
    }

    updateSpeed(speed) {
        this.animationSpeed = parseFloat(speed);
        const display = document.getElementById('speedDisplay');
        if (display) display.textContent = `${speed}x`;
    }

    playAnimation() {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.lastTimestamp = null;
        this.animationFrameId = requestAnimationFrame((ts) => this.animate(ts));
    }

    animate(timestamp) {
        if (!this.isAnimating) return;

        if (!this.lastTimestamp) this.lastTimestamp = timestamp;
        const delta = timestamp - this.lastTimestamp;
        this.lastTimestamp = timestamp;

        const step = (delta / 16.666) * 0.45 * this.animationSpeed;
        this.animationProgress += step;

        if (this.animationProgress >= 100) {
            this.animationProgress = 100;
            this.isAnimating = false;
        }

        if (this.activeMode === 'manoeuvre') {
            this.updateManoeuvreProgress(this.animationProgress);
        } else {
            this.updateTestProgress(this.animationProgress);
        }

        if (this.isAnimating) {
            this.animationFrameId = requestAnimationFrame((ts) => this.animate(ts));
        }
    }

    pauseAnimation() {
        this.isAnimating = false;
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
        this.lastTimestamp = null;
    }

    resetAnimation(update = true) {
        this.pauseAnimation();
        this.animationProgress = 0;
        const slider = document.getElementById('manoeuvreSlider');
        const display = document.getElementById('progressDisplay');
        if (slider) slider.value = 0;
        if (display) display.textContent = '0%';
        this.otoliths.trail = [];
        if (update) this.updateSimulation(0, 'manoeuvre');
    }

    resetTest(update = true) {
        this.pauseAnimation();
        this.animationProgress = 0;
        const slider = document.getElementById('testSlider');
        const display = document.getElementById('testProgressDisplay');
        if (slider) slider.value = 0;
        if (display) display.textContent = '0%';
        this.otoliths.trail = [];
        if (update) this.updateSimulation(0, 'test');
    }

    loadClinicalCase(caseId) {
        const box = document.getElementById('clinicalCaseBox');
        if (!box) return;

        if (!caseId || !CLINICAL_CASES[caseId]) {
            box.innerHTML = `
                <h4>Cas clinique</h4>
                <p>Sélectionne un cas pour afficher l’énoncé, le diagnostic attendu et la manœuvre adaptée.</p>
            `;
            return;
        }

        const c = CLINICAL_CASES[caseId];
        this.currentCanal = c.canal;
        this.affectedSide = c.side;
        if (c.variant) this.horizontalVariant = c.variant;
        this.currentManoeuvre = MANOEUVRES[this.currentCanal][0];
        this.currentTest = TESTS[this.currentCanal][0];
        this.pauseAnimation();
        this.animationProgress = 0;
        this.otoliths.trail = [];
        this.updateSelectors();
        this.updateUI();
        this.updateSimulation(0, 'test');

        box.innerHTML = `
            <h4>${c.title}</h4>
            <p><strong>Énoncé :</strong> ${c.statement}</p>
            <p><strong>Diagnostic attendu :</strong> ${c.expected}</p>
            <p><strong>Manœuvre proposée :</strong> ${c.manoeuvre}</p>
            <p><strong>Repères :</strong> ${c.notes}</p>
        `;
    }
}

let simulator = null;

window.addEventListener('load', () => {
    simulator = new VPPBSimulator();
    window.simulator = simulator;
});
