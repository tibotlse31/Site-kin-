// ========================================
// VPPB SIMULATOR - Analysis Module
// ========================================

class NystagmusAnalyzer {
    analyzeCurrent() {
        if (!window.simulator) return null;

        const n = simulator.nystagmus;
        return {
            canal: simulator.currentCanal,
            side: simulator.affectedSide,
            variant: simulator.horizontalVariant,
            type: n.type,
            latence: n.latence,
            amplitude: n.amplitude,
            frequency: n.frequency,
            direction: n.direction,
            phase: n.phase,
            interpretation: this.interpret(simulator.currentCanal),
            recommendations: this.getRecommendations(simulator.currentCanal)
        };
    }

    interpret(canal) {
        const side = simulator.affectedSide === 'right' ? 'droit' : 'gauche';
        const horizVariant =
            simulator.horizontalVariant === 'cupulo'
                ? 'cupulolithiase'
                : simulator.horizontalVariant === 'ageotropic'
                    ? 'canalolithiase agéotropique'
                    : 'canalolithiase géotropique';

        const data = {
            post: {
                diagnosis: `VPPB du canal postérieur ${side}`,
                confidence: 'forte si latence + paroxysme + épuisement + inversion au retour assis',
                properties: [
                    'Nystagmus torsionnel géotropique vers l’oreille basse',
                    'Latence habituelle de quelques secondes',
                    'Paroxysme puis décroissance si la position est maintenue',
                    'Inversion attendue au retour assis'
                ],
                notes: [
                    'Le test diagnostique et le nystagmus thérapeutique doivent rester cohérents.',
                    'Un changement de forme, de direction ou de durée impose de reconsidérer le diagnostic.',
                    'Epley ou Sémont selon le contexte mécanique et clinique.'
                ]
            },
            horiz: {
                diagnosis: `VPPB du canal horizontal ${side} – ${horizVariant}`,
                confidence: 'bonne si cohérence Bow-Lean / Supine Roll / Upright Head Roll',
                properties: [
                    'La latence oriente vers une canalolithiase',
                    'Sans latence et persistant : argument pour une cupulolithiase',
                    'Forme géotropique : nystagmus plus fort du côté atteint',
                    'Forme agéotropique : nystagmus plus fort du côté sain'
                ],
                notes: [
                    'Le sens du nystagmus doit rester logique avec les lois d’Ewald.',
                    'Le nystagmus thérapeutique attendu est souvent une inversion de sens.',
                    'Gufoni 3G, Gufoni 3A ou Lempert selon la forme.'
                ]
            },
            ant: {
                diagnosis: `Suspicion de VPPB du canal antérieur ${side}`,
                confidence: 'modérée ; toujours discuter un diagnostic différentiel central',
                properties: [
                    'Nystagmus vertical inférieur ± torsion',
                    'Profil souvent moins stéréotypé que le canal postérieur',
                    'Deep Head Hanging souvent utile',
                    'Yacovino ou Li si tableau compatible'
                ],
                notes: [
                    'Le vertical inférieur pur doit toujours faire réfléchir.',
                    'La clinique globale et les red flags restent prioritaires.',
                    'Une conversion canalaire après manœuvre est possible.'
                ]
            }
        };

        return data[canal] || data.post;
    }

    getRecommendations(canal) {
        const side = simulator.affectedSide === 'right' ? 'droit' : 'gauche';
        const variant = simulator.horizontalVariant;

        const horizTherapy =
            variant === 'cupulo' || variant === 'ageotropic'
                ? [
                    'Gufoni 3A',
                    'Réévaluer après éventuelle conversion vers une forme géotropique',
                    'Lempert si conversion confirmée'
                ]
                : [
                    'Lempert / BBQ',
                    'Gufoni 3G',
                    'Contrôler l’inversion du nystagmus thérapeutique'
                ];

        return {
            post: {
                therapeutic: [
                    'Manœuvre d’Epley',
                    'Manœuvre de Sémont',
                    'Brandt & Daroff comme exercice d’habituation secondaire'
                ],
                precautions: [
                    'Dormir côté sain ou demi-assis',
                    'Éviter les grands mouvements dans le plan antéro-postérieur juste après la manœuvre',
                    'Pause de 5 à 10 minutes après la manœuvre'
                ],
                redflags: [
                    'Pas d’inversion au retour assis',
                    'Nystagmus atypique',
                    'Souffrance importante avec peu de signes visibles',
                    'Contexte neurologique ou antécédent préoccupant'
                ]
            },
            horiz: {
                therapeutic: horizTherapy,
                precautions: [
                    `Côté simulé : ${side}`,
                    'Dormir côté sain ou sur le dos selon le protocole',
                    'Éviter de se pencher en avant visage vers le sol',
                    'Toujours recontrôler Bow-Lean et Supine Roll Test'
                ],
                redflags: [
                    'Incohérence entre les tests',
                    'Persistance inhabituelle sans logique cupulaire',
                    'Modification brutale du sens du nystagmus',
                    'Signes neurologiques associés'
                ]
            },
            ant: {
                therapeutic: [
                    'Manœuvre de Yacovino',
                    'Manœuvre de Li',
                    'Dix-Hallpike latéralisant si composante torsionnelle visible'
                ],
                precautions: [
                    'Toujours vérifier les drapeaux rouges centraux',
                    'Surveiller une conversion après Epley ou Sémont',
                    'Adapter si fragilité cervicale'
                ],
                redflags: [
                    'Nystagmus vertical inférieur pur inexpliqué',
                    'Signes cérébelleux ou neurologiques',
                    'Discordance clinique majeure',
                    'Persistance sans profil périphérique crédible'
                ]
            }
        }[canal];
    }

    renderAnalysis() {
        const analysis = this.analyzeCurrent();
        if (!analysis) return;

        const rec = analysis.recommendations;
        const interp = analysis.interpretation;
        const panel = document.getElementById('analysisInterpretation');
        if (!panel) return;

        panel.innerHTML = `
            <h4>${interp.diagnosis}</h4>
            <p><strong>Niveau de confiance pédagogique :</strong> ${interp.confidence}</p>

            <p style="margin-top:0.6rem;"><strong>Repères cliniques :</strong></p>
            <ul style="margin-left:1.5rem;">
                ${interp.properties.map((p) => `<li>${p}</li>`).join('')}
            </ul>

            <p style="margin-top:0.6rem;"><strong>Lecture du scénario :</strong></p>
            <ul style="margin-left:1.5rem;">
                ${interp.notes.map((n) => `<li>${n}</li>`).join('')}
            </ul>

            <p style="margin-top:0.6rem;"><strong>Manœuvres / conduite :</strong></p>
            <ul style="margin-left:1.5rem;">
                ${rec.therapeutic.map((t) => `<li>${t}</li>`).join('')}
            </ul>

            <p style="margin-top:0.6rem;"><strong>Précautions :</strong></p>
            <ul style="margin-left:1.5rem;">
                ${rec.precautions.map((p) => `<li>${p}</li>`).join('')}
            </ul>

            <p style="margin-top:0.6rem;"><strong style="color:#dc2626;">Points d’alerte :</strong></p>
            <ul style="margin-left:1.5rem;">
                ${rec.redflags.map((f) => `<li style="color:#dc2626;">${f}</li>`).join('')}
            </ul>
        `;
    }
}

window.addEventListener('load', () => {
    window.analyzer = new NystagmusAnalyzer();
    window.analyzer.renderAnalysis();
});
