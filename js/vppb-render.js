window.VPPBRender = (() => {
  const state = window.VPPBState;
  const data = window.VPPBData;
  const engine = window.VPPBEngine;
  const ui = window.VPPBUI;

  function render() {
    const app = document.getElementById('app');
    if (!app) return;

    syncNav();

    const html = {
      home: renderHome(),
      basics: renderBasics(),
      biomechanics: renderBiomechanics(),
      interpret: renderInterpret(),
      reasoning: renderReasoning()
    }[state.activeModule] || renderHome();

    app.innerHTML = html;
  }

  function syncNav() {
    document.querySelectorAll('.nav-pill').forEach(button => {
      button.classList.toggle(
        'is-active',
        button.dataset.module === state.activeModule
      );
    });
  }

  function renderHome() {
    return `
      <section class="page-grid">
        <div class="home-grid-4">
          ${ui.card({
            icon: '①',
            title: 'Réviser les bases',
            text: 'Anatomie, orientation des canaux, lois d’Ewald, lecture du nystagmus.',
            action: { type: 'go-module', payload: { module: 'basics' } }
          })}
          ${ui.card({
            icon: '②',
            title: 'Comprendre la biomécanique',
            text: 'Parcours guidé pour relier canal, lithiase, flux et nystagmus attendu.',
            action: { type: 'go-module', payload: { module: 'biomechanics' } }
          })}
          ${ui.card({
            icon: '③',
            title: 'Interpréter un test ou une manœuvre',
            text: 'Ce qu’on attend, ce que cela oriente, et quelle suite logique en découle.',
            action: { type: 'go-module', payload: { module: 'interpret' } }
          })}
          ${ui.card({
            icon: '④',
            title: 'Raisonnement clinique',
            text: 'Arbre décisionnel, cas cliniques et drapeaux rouges.',
            action: { type: 'go-module', payload: { module: 'reasoning' } }
          })}
        </div>
      </section>
    `;
  }

  function renderBasics() {
    const topic = data.basics[state.basicsTopic];

    return `
      <section class="page-grid">
        <div class="card">
          <h2>Réviser les bases</h2>
          <p>Revoir les fondamentaux utiles avant la biomécanique et l’interprétation clinique.</p>
        </div>

        <div class="subnav">
          <button class="${state.basicsTopic === 'anatomy' ? 'is-active' : ''}" data-action="set-basics-topic" data-topic="anatomy">Anatomie fonctionnelle</button>
          <button class="${state.basicsTopic === 'orientation' ? 'is-active' : ''}" data-action="set-basics-topic" data-topic="orientation">Orientation des canaux</button>
          <button class="${state.basicsTopic === 'ewald' ? 'is-active' : ''}" data-action="set-basics-topic" data-topic="ewald">Lois d’Ewald</button>
          <button class="${state.basicsTopic === 'nystagmus' ? 'is-active' : ''}" data-action="set-basics-topic" data-topic="nystagmus">Lire un nystagmus</button>
        </div>

        <div class="layout-2">
          <div class="card soft">
            <h3>${ui.escapeHtml(topic.title)}</h3>
            <p>${ui.escapeHtml(topic.intro)}</p>

            <div class="result-list">
              ${topic.bullets
                .map(
                  item => `
                    <div class="result-item">
                      <strong>Point clé</strong>
                      <span>${ui.escapeHtml(item)}</span>
                    </div>
                  `
                )
                .join('')}
            </div>

            ${ui.detailsBlock('Voir plus', `<p>${ui.escapeHtml(topic.detail)}</p>`)}
          </div>

          <div class="card">
            <h3>Illustration à ajouter</h3>
            <div class="image-slot">
              <div>
                <strong>Zone prévue pour une image</strong>
                <p>Tu pourras ici insérer un schéma de cours, une capture PDF, ou une image web sélectionnée.</p>
              </div>
            </div>
            <p class="note">Pas de schéma généré automatiquement dans cette version.</p>
          </div>
        </div>
      </section>
    `;
  }

  function renderBiomechanics() {
    const options = engine.getBiomechanicsOptions();
    const outcome = engine.getBiomechanicsCase();
    const s = state.biomechanics;

    return `
      <section class="page-grid">
        <div class="card">
          <div class="section-header">
            <div>
              <h2>Comprendre la biomécanique</h2>
              <p>Choisis progressivement une configuration clinique cohérente. Seules les options compatibles sont proposées.</p>
            </div>
            <div class="tag-row">
              <span class="tag">Parcours guidé</span>
              <span class="tag">Sans schéma maison</span>
            </div>
          </div>
        </div>

        <div class="layout-3">
          <aside class="compact-stack">
            <div class="card soft">
              <div class="choice-group">
                <div class="choice-label">1. Canal</div>
                ${ui.choiceButtons({
                  items: options.canals,
                  selectedValue: s.canal,
                  action: 'set-bio-canal',
                  formatter: engine.labelCanal
                })}
              </div>
            </div>

            <div class="card soft">
              <div class="choice-group">
                <div class="choice-label">2. Côté</div>
                ${
                  s.canal
                    ? ui.choiceButtons({
                        items: options.sides,
                        selectedValue: s.side,
                        action: 'set-bio-side',
                        formatter: engine.labelSide
                      })
                    : `<div class="choice-help">Choisis d’abord un canal.</div>`
                }
              </div>
            </div>

            <div class="card soft">
              <div class="choice-group">
                <div class="choice-label">3. Mécanisme</div>
                ${
                  s.side
                    ? ui.choiceButtons({
                        items: options.mechanisms,
                        selectedValue: s.mechanism,
                        action: 'set-bio-mechanism',
                        formatter: engine.labelMechanism
                      })
                    : `<div class="choice-help">Le mécanisme devient disponible après le côté.</div>`
                }
              </div>
            </div>

            <div class="card soft">
              <div class="choice-group">
                <div class="choice-label">4. Situation / test</div>
                ${
                  s.mechanism
                    ? ui.choiceButtons({
                        items: options.scenarios,
                        selectedValue: s.scenario,
                        action: 'set-bio-scenario',
                        formatter: engine.labelScenario
                      })
                    : `<div class="choice-help">Choisis d’abord un mécanisme.</div>`
                }
              </div>
            </div>
          </aside>

          <section class="stack">
            <div class="card">
              <h3>Lecture simple</h3>
              ${
                outcome
                  ? `
                    <div class="summary-box">
                      <p>${ui.escapeHtml(outcome.summary)}</p>
                    </div>
                  `
                  : `<div class="empty-state">Le résumé pédagogique s’affichera quand les 4 choix seront complétés.</div>`
              }
            </div>

            <div class="card">
              <h3>Illustration à ajouter</h3>
              <div class="image-slot">
                <div>
                  <strong>Emplacement image / capture</strong>
                  <p>Tu pourras ajouter ici une image web ou une capture de cours pour le cas sélectionné.</p>
                </div>
              </div>
            </div>
          </section>

          <aside class="compact-stack">
            <div class="card">
              <h3>Résultat pédagogique</h3>
              ${
                outcome
                  ? `
                    <div class="kv">
                      <div class="kv-row">
                        <div class="kv-key">Déplacement attendu</div>
                        <div>${ui.escapeHtml(outcome.flow)}</div>
                      </div>
                      <div class="kv-row">
                        <div class="kv-key">Excitation / inhibition</div>
                        <div>${ui.escapeHtml(outcome.effect)}</div>
                      </div>
                      <div class="kv-row">
                        <div class="kv-key">Nystagmus attendu</div>
                        <div>${ui.escapeHtml(outcome.expectedNystagmus)}</div>
                      </div>
                      <div class="kv-row">
                        <div class="kv-key">Conclusion pédagogique</div>
                        <div>${ui.escapeHtml(outcome.conclusion)}</div>
                      </div>
                    </div>

                    ${ui.detailsBlock('Voir plus : détail biomécanique', `<p>${ui.escapeHtml(outcome.why)}</p>`)}
                    <div class="warning-box" style="margin-top:12px;">
                      <strong>Prudence</strong>
                      <p style="margin-top:8px;">${ui.escapeHtml(outcome.caution)}</p>
                    </div>
                  `
                  : `<div class="empty-state">Le panneau de résultat se remplit à mesure que le parcours devient cohérent.</div>`
              }
            </div>
          </aside>
        </div>
      </section>
    `;
  }

  function renderInterpret() {
    const tab = state.interpret.tab;
    const test = engine.getTestById(state.interpret.selectedTest);
    const maneuver = engine.getManeuverById(state.interpret.selectedManeuver);

    return `
      <section class="page-grid">
        <div class="card">
          <h2>Interpréter un test ou une manœuvre</h2>
          <p>Partir d’un geste clinique et montrer ce qu’on attend, comment l’interpréter, et quelle conduite logique en découle.</p>
        </div>

        <div class="subnav">
          <button class="${tab === 'tests' ? 'is-active' : ''}" data-action="set-interpret-tab" data-tab="tests">Tests diagnostiques</button>
          <button class="${tab === 'maneuvers' ? 'is-active' : ''}" data-action="set-interpret-tab" data-tab="maneuvers">Manœuvres thérapeutiques</button>
        </div>

        ${tab === 'tests' ? renderInterpretTests(test) : renderInterpretManeuvers(maneuver)}
      </section>
    `;
  }

  function renderInterpretTests(test) {
    return `
      <div class="layout-3">
        <aside class="compact-stack">
          <div class="card soft">
            <div class="choice-label">Choix du test</div>
            <div class="choice-grid">
              ${data.tests
                .map(
                  item => `
                    <button class="choice-button ${item.id === state.interpret.selectedTest ? 'is-active' : ''}"
                      data-action="set-test"
                      data-id="${item.id}">
                      ${ui.escapeHtml(item.name)}
                    </button>
                  `
                )
                .join('')}
            </div>
          </div>

          <div class="card soft">
            <div class="choice-label">Côté testé</div>
            ${
              test && test.selectableSides
                ? `
                  <div class="choice-grid">
                    <button class="choice-button ${state.interpret.selectedTestSide === 'right' ? 'is-active' : ''}" data-action="set-test-side" data-side="right">Droite</button>
                    <button class="choice-button ${state.interpret.selectedTestSide === 'left' ? 'is-active' : ''}" data-action="set-test-side" data-side="left">Gauche</button>
                  </div>
                `
                : `<div class="choice-help">Ce test n’est pas présenté ici avec un choix latéralisé obligatoire.</div>`
            }
          </div>
        </aside>

        <section class="stack">
          <div class="card">
            <h3>Lecture simple</h3>
            <div class="summary-box">
              <p>${ui.escapeHtml(test.quick)}</p>
            </div>
          </div>

          <div class="card">
            <h3>Illustration à ajouter</h3>
            <div class="image-slot">
              <div>
                <strong>Zone prévue pour une image du test</strong>
                <p>Tu pourras insérer ici une photo, un schéma de cours ou une capture vidéo du test.</p>
              </div>
            </div>
          </div>
        </section>

        <aside class="compact-stack">
          <div class="card">
            <h3>Ce qu’on attend si positif</h3>
            <div class="result-list">
              <div class="result-item">
                <strong>Nystagmus attendu</strong>
                <span>${ui.escapeHtml(test.expected)}</span>
              </div>
              <div class="result-item">
                <strong>Canal probable</strong>
                <span>${ui.escapeHtml(test.likely)}</span>
              </div>
            </div>

            ${ui.detailsBlock('Voir plus : pourquoi ?', `<p>${ui.escapeHtml(test.why)}</p>`)}
            ${ui.detailsBlock(
              'Voir plus : pièges',
              `<ul class="steps">${test.pitfalls.map(x => `<li>${ui.escapeHtml(x)}</li>`).join('')}</ul>`
            )}
          </div>
        </aside>
      </div>
    `;
  }

  function renderInterpretManeuvers(maneuver) {
    return `
      <div class="layout-3">
        <aside class="compact-stack">
          <div class="card soft">
            <div class="choice-label">Choix de la manœuvre</div>
            <div class="choice-grid">
              ${data.maneuvers
                .map(
                  item => `
                    <button class="choice-button ${item.id === state.interpret.selectedManeuver ? 'is-active' : ''}"
                      data-action="set-maneuver"
                      data-id="${item.id}">
                      ${ui.escapeHtml(item.name)}
                    </button>
                  `
                )
                .join('')}
            </div>
          </div>

          <div class="card soft">
            <div class="choice-label">Côté</div>
            ${
              maneuver && maneuver.selectableSides
                ? `
                  <div class="choice-grid">
                    <button class="choice-button ${state.interpret.selectedManeuverSide === 'right' ? 'is-active' : ''}" data-action="set-maneuver-side" data-side="right">Droite</button>
                    <button class="choice-button ${state.interpret.selectedManeuverSide === 'left' ? 'is-active' : ''}" data-action="set-maneuver-side" data-side="left">Gauche</button>
                  </div>
                `
                : `<div class="choice-help">Cette manœuvre peut être présentée sans latéralisation obligatoire dans cette V1.</div>`
            }
          </div>
        </aside>

        <section class="stack">
          <div class="card">
            <h3>Objectif biomécanique</h3>
            <div class="summary-box">
              <p>${ui.escapeHtml(maneuver.goal)}</p>
            </div>
          </div>

          <div class="card">
            <h3>Illustration à ajouter</h3>
            <div class="image-slot">
              <div>
                <strong>Zone prévue pour une image de la manœuvre</strong>
                <p>Tu pourras insérer ici une planche étape par étape, une photo ou un schéma choisi.</p>
              </div>
            </div>
          </div>
        </section>

        <aside class="compact-stack">
          <div class="card">
            <h3>Étapes et interprétation</h3>
            <div class="result-item">
              <strong>Indication clinique</strong>
              <span>${ui.escapeHtml(maneuver.indication)}</span>
            </div>

            <div class="result-item" style="margin-top:10px;">
              <strong>Étapes successives</strong>
              <ol class="steps">
                ${maneuver.steps.map(step => `<li>${ui.escapeHtml(step)}</li>`).join('')}
              </ol>
            </div>

            ${ui.detailsBlock('Voir plus : ce qu’on est censé observer', `<p>${ui.escapeHtml(maneuver.expected)}</p>`)}
            ${ui.detailsBlock(
              'Voir plus : précautions',
              `<ul class="steps">${maneuver.precautions.map(x => `<li>${ui.escapeHtml(x)}</li>`).join('')}</ul>`
            )}
          </div>
        </aside>
      </div>
    `;
  }

  function renderReasoning() {
    const result = engine.computeReasoningResult();
    const clinicalCase = engine.getClinicalCase();

    return `
      <section class="page-grid">
        <div class="card">
          <h2>Raisonnement clinique</h2>
          <p>Transformer les connaissances en raisonnement progressif et en vigilance diagnostique.</p>
        </div>

        <div class="split-cards">
          <div class="card">
            <h3>Arbre décisionnel simplifié</h3>

            <div class="stack">
              <div class="choice-group">
                <div class="choice-label">Quel nystagmus ou quelle situation observes-tu ?</div>
                <div class="choice-grid">
                  <button class="choice-button ${state.reasoning.nystagmusFamily === 'torsion_upbeat' ? 'is-active' : ''}" data-action="set-reasoning" data-key="nystagmusFamily" data-value="torsion_upbeat">Torsionnel + vertical supérieur</button>
                  <button class="choice-button ${state.reasoning.nystagmusFamily === 'horizontal_geotropic' ? 'is-active' : ''}" data-action="set-reasoning" data-key="nystagmusFamily" data-value="horizontal_geotropic">Horizontal géotropique</button>
                  <button class="choice-button ${state.reasoning.nystagmusFamily === 'horizontal_ageotropic' ? 'is-active' : ''}" data-action="set-reasoning" data-key="nystagmusFamily" data-value="horizontal_ageotropic">Horizontal agéotropique</button>
                  <button class="choice-button ${state.reasoning.nystagmusFamily === 'downbeat' ? 'is-active' : ''}" data-action="set-reasoning" data-key="nystagmusFamily" data-value="downbeat">Vertical inférieur</button>
                </div>
              </div>

              <div class="choice-group">
                <div class="choice-label">Latence ?</div>
                <div class="choice-grid">
                  <button class="choice-button ${state.reasoning.latency === 'present' ? 'is-active' : ''}" data-action="set-reasoning" data-key="latency" data-value="present">Présente</button>
                  <button class="choice-button ${state.reasoning.latency === 'none_or_minimal' ? 'is-active' : ''}" data-action="set-reasoning" data-key="latency" data-value="none_or_minimal">Absente ou minime</button>
                  <button class="choice-button ${state.reasoning.latency === 'variable' ? 'is-active' : ''}" data-action="set-reasoning" data-key="latency" data-value="variable">Variable</button>
                </div>
              </div>

              <div class="choice-group">
                <div class="choice-label">Durée ?</div>
                <div class="choice-grid">
                  <button class="choice-button ${state.reasoning.duration === 'short' ? 'is-active' : ''}" data-action="set-reasoning" data-key="duration" data-value="short">Brève</button>
                  <button class="choice-button ${state.reasoning.duration === 'persistent' ? 'is-active' : ''}" data-action="set-reasoning" data-key="duration" data-value="persistent">Persistante</button>
                  <button class="choice-button ${state.reasoning.duration === 'variable' ? 'is-active' : ''}" data-action="set-reasoning" data-key="duration" data-value="variable">Variable</button>
                </div>
              </div>

              <div class="choice-group">
                <div class="choice-label">Inversion au retour assis ?</div>
                <div class="choice-grid">
                  <button class="choice-button ${state.reasoning.reversal === 'present' ? 'is-active' : ''}" data-action="set-reasoning" data-key="reversal" data-value="present">Oui</button>
                  <button class="choice-button ${state.reasoning.reversal === 'variable' ? 'is-active' : ''}" data-action="set-reasoning" data-key="reversal" data-value="variable">Variable / non utile</button>
                </div>
              </div>

              <div class="choice-group">
                <div class="choice-label">Côté le plus intense ?</div>
                <div class="choice-grid">
                  <button class="choice-button ${state.reasoning.intensitySide === 'tested_side' ? 'is-active' : ''}" data-action="set-reasoning" data-key="intensitySide" data-value="tested_side">Côté testé</button>
                  <button class="choice-button ${state.reasoning.intensitySide === 'stronger_side_affected' ? 'is-active' : ''}" data-action="set-reasoning" data-key="intensitySide" data-value="stronger_side_affected">Le plus fort = côté atteint</button>
                  <button class="choice-button ${state.reasoning.intensitySide === 'stronger_side_healthy' ? 'is-active' : ''}" data-action="set-reasoning" data-key="intensitySide" data-value="stronger_side_healthy">Le plus fort = côté sain</button>
                  <button class="choice-button ${state.reasoning.intensitySide === 'uncertain' ? 'is-active' : ''}" data-action="set-reasoning" data-key="intensitySide" data-value="uncertain">Incertain</button>
                </div>
              </div>
            </div>

            <div class="${result.level === 'warning' ? 'warning-box' : result.level === 'empty' ? 'empty-state' : 'summary-box'}" style="margin-top:16px;">
              <strong>Conclusion</strong>
              <p style="margin-top:8px;">${ui.escapeHtml(result.text)}</p>
            </div>
          </div>

          <div class="card">
            <h3>Cas cliniques</h3>

            <div class="choice-grid" style="margin-bottom:14px;">
              ${data.clinicalCases
                .map(
                  c => `
                    <button class="choice-button ${state.reasoning.selectedCaseId === c.id ? 'is-active' : ''}"
                      data-action="set-case"
                      data-id="${c.id}">
                      ${ui.escapeHtml(c.title)}
                    </button>
                  `
                )
                .join('')}
            </div>

            <div class="case-card">
              <strong>${ui.escapeHtml(clinicalCase.title)}</strong>
              <p style="margin-top:10px;">${ui.escapeHtml(clinicalCase.stem)}</p>
              ${ui.detailsBlock('Voir plus : correction', `<p>${ui.escapeHtml(clinicalCase.answer)}</p>`)}
            </div>
          </div>
        </div>

        <div class="card">
          <h3>Drapeaux rouges</h3>
          <div class="danger-box">
            <ul class="steps">
              ${data.redFlags.map(item => `<li>${ui.escapeHtml(item)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  return { render };
})();
