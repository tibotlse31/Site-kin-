class VPPBSimulator {
  constructor() {
    this.data = null;
    this.elements = {};
  }

  async initialize() {
    this.cacheElements();
    this.bindEvents();
    await this.loadData();
    this.populateFilters();
    this.renderInitialState();
  }

  cacheElements() {
    this.elements.canal = document.getElementById('canal');
    this.elements.side = document.getElementById('side');
    this.elements.mechanism = document.getElementById('mechanism');
    this.elements.variant = document.getElementById('variant');
    this.elements.test = document.getElementById('diagnostic_test');

    this.elements.resultTitle = document.getElementById('result-title');
    this.elements.resultSummary = document.getElementById('result-summary');
    this.elements.resultNystagmus = document.getElementById('result-nystagmus');
    this.elements.resultBiomechanics = document.getElementById('result-biomechanics');
    this.elements.resultManeuvers = document.getElementById('result-maneuvers');
    this.elements.resultAdvice = document.getElementById('result-advice');
    this.elements.resultPitfalls = document.getElementById('result-pitfalls');
    this.elements.resultRedFlags = document.getElementById('result-red-flags');
    this.elements.resultDebug = document.getElementById('result-debug');
  }

  bindEvents() {
    const filterIds = ['canal', 'side', 'mechanism', 'variant', 'diagnostic_test'];

    filterIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('change', () => this.renderMatchingCase());
      }
    });
  }

  async loadData() {
    try {
      const response = await fetch('data/vppb-data.json');

      if (!response.ok) {
        throw new Error(`Erreur HTTP ${response.status}`);
      }

      this.data = await response.json();
    } catch (error) {
      console.error('Impossible de charger data/vppb-data.json', error);
      this.showError(
        "Impossible de charger les donnees VPPB. Verifie que le fichier data/vppb-data.json existe bien."
      );
    }
  }

  populateFilters() {
    if (!this.data || !Array.isArray(this.data.cases)) return;

    this.fillSelect(this.elements.canal, this.getUniqueValues('canal'), 'Tous les canaux');
    this.fillSelect(this.elements.side, this.getUniqueValues('side'), 'Tous les cotes');
    this.fillSelect(this.elements.mechanism, this.getUniqueValues('mechanism'), 'Tous les mecanismes');
    this.fillSelect(this.elements.variant, this.getUniqueValues('variant'), 'Toutes les formes');
    this.fillSelect(this.elements.test, this.getUniqueValues('diagnostic_test'), 'Tous les tests');
  }

  fillSelect(selectElement, values, defaultLabel) {
    if (!selectElement) return;

    selectElement.innerHTML = '';

    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = defaultLabel;
    selectElement.appendChild(defaultOption);

    values.forEach((value) => {
      const option = document.createElement('option');
      option.value = value;
      option.textContent = this.formatValue(value);
      selectElement.appendChild(option);
    });
  }

  getUniqueValues(fieldName) {
    const values = this.data.cases
      .map((item) => item[fieldName])
      .filter((value) => value !== undefined && value !== null && value !== '');

    return [...new Set(values)];
  }

  renderInitialState() {
    this.setText(this.elements.resultTitle, 'Simulateur VPPB');
    this.setHTML(
      this.elements.resultSummary,
      '<p>Choisis un canal, un cote, un mecanisme, une forme ou un test diagnostique.</p>'
    );
    this.clearSection(this.elements.resultNystagmus);
    this.clearSection(this.elements.resultBiomechanics);
    this.clearSection(this.elements.resultManeuvers);
    this.clearSection(this.elements.resultAdvice);
    this.clearSection(this.elements.resultPitfalls);
    this.clearSection(this.elements.resultRedFlags);
    this.clearSection(this.elements.resultDebug);
  }

  renderMatchingCase() {
    if (!this.data || !Array.isArray(this.data.cases)) return;

    const filters = {
      canal: this.elements.canal?.value || '',
      side: this.elements.side?.value || '',
      mechanism: this.elements.mechanism?.value || '',
      variant: this.elements.variant?.value || '',
      diagnostic_test: this.elements.test?.value || ''
    };

    const matches = this.data.cases.filter((item) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        return item[key] === value;
      });
    });

    if (matches.length === 0) {
      this.renderNoMatch(filters);
      return;
    }

    if (matches.length === 1) {
      this.renderCase(matches[0], filters, matches.length);
      return;
    }

    this.renderMultipleMatches(matches, filters);
  }

  renderNoMatch(filters) {
    this.setText(this.elements.resultTitle, 'Aucun cas exact trouve');
    this.setHTML(
      this.elements.resultSummary,
      `<p>Aucun cas ne correspond exactement aux filtres selectionnes.</p>${this.renderFiltersSummary(filters)}`
    );
    this.clearSection(this.elements.resultNystagmus);
    this.clearSection(this.elements.resultBiomechanics);
    this.clearSection(this.elements.resultManeuvers);
    this.clearSection(this.elements.resultAdvice);
    this.clearSection(this.elements.resultPitfalls);
    this.clearSection(this.elements.resultRedFlags);
    this.clearSection(this.elements.resultDebug);
  }

  renderMultipleMatches(matches, filters) {
    this.setText(this.elements.resultTitle, `${matches.length} cas correspondants`);
    this.setHTML(
      this.elements.resultSummary,
      `<p>Plusieurs cas correspondent aux filtres selectionnes. Affine la recherche ou choisis parmi les cas ci-dessous.</p>${this.renderFiltersSummary(filters)}`
    );

    this.setHTML(
      this.elements.resultNystagmus,
      `<ul>${matches
        .map(
          (item) => `<li><strong>${this.escapeHtml(item.label)}</strong><br>${this.escapeHtml(item.diagnosis_text || '')}</li>`
        )
        .join('')}</ul>`
    );

    this.clearSection(this.elements.resultBiomechanics);
    this.clearSection(this.elements.resultManeuvers);
    this.clearSection(this.elements.resultAdvice);
    this.clearSection(this.elements.resultPitfalls);
    this.clearSection(this.elements.resultRedFlags);

    this.setHTML(
      this.elements.resultDebug,
      `<small>Filtres actifs : ${this.escapeHtml(JSON.stringify(filters))}</small>`
    );
  }

  renderCase(item, filters, matchCount) {
    this.setText(this.elements.resultTitle, item.label || 'Cas VPPB');

    const summaryParts = [];
    if (item.diagnosis_text) summaryParts.push(`<p><strong>Diagnostic :</strong> ${this.formatValue(item.diagnosis_text)}</p>`);
    if (item.canal) summaryParts.push(`<p><strong>Canal :</strong> ${this.formatValue(item.canal)}</p>`);
    if (item.side) summaryParts.push(`<p><strong>Cote :</strong> ${this.formatValue(item.side)}</p>`);
    if (item.mechanism) summaryParts.push(`<p><strong>Mecanisme :</strong> ${this.formatValue(item.mechanism)}</p>`);
    if (item.variant) summaryParts.push(`<p><strong>Forme :</strong> ${this.formatValue(item.variant)}</p>`);
    if (item.diagnostic_test) summaryParts.push(`<p><strong>Test :</strong> ${this.formatValue(item.diagnostic_test)}</p>`);

    this.setHTML(
      this.elements.resultSummary,
      summaryParts.join('') + this.renderFiltersSummary(filters)
    );

    this.setHTML(this.elements.resultNystagmus, this.renderNystagmus(item.nystagmus));
    this.setHTML(this.elements.resultBiomechanics, this.renderBiomechanics(item.biomechanics, item.bow_lean_expected));
    this.setHTML(this.elements.resultManeuvers, this.renderManeuvers(item.recommended_maneuvers));
    this.setHTML(this.elements.resultAdvice, this.renderListBlock('Consignes', item.post_manoeuvre_advice || item.management_notes));
    this.setHTML(this.elements.resultPitfalls, this.renderListBlock('Points de vigilance', item.pitfalls));
    this.setHTML(this.elements.resultRedFlags, this.renderListBlock('Red flags', item.red_flags));

    this.setHTML(
      this.elements.resultDebug,
      `<small>1 cas retenu sur ${matchCount}. ID : ${this.escapeHtml(item.id || '')}</small>`
    );
  }

  renderNystagmus(nystagmus) {
    if (!nystagmus) return '<p><strong>Nystagmus :</strong> non renseigne.</p>';

    const entries = Object.entries(nystagmus).map(([key, value]) => {
      return `<li><strong>${this.formatValue(key)} :</strong> ${this.formatComplexValue(value)}</li>`;
    });

    return `<h3>Nystagmus attendu</h3><ul>${entries.join('')}</ul>`;
  }

  renderBiomechanics(biomechanics, bowLeanExpected) {
    const parts = [];

    if (biomechanics && Object.keys(biomechanics).length > 0) {
      const entries = Object.entries(biomechanics).map(([key, value]) => {
        return `<li><strong>${this.formatValue(key)} :</strong> ${this.formatComplexValue(value)}</li>`;
      });
      parts.push(`<h3>Biomecanique</h3><ul>${entries.join('')}</ul>`);
    }

    if (bowLeanExpected && Object.keys(bowLeanExpected).length > 0) {
      const entries = Object.entries(bowLeanExpected).map(([key, value]) => {
        return `<li><strong>${this.formatValue(key)} :</strong> ${this.formatComplexValue(value)}</li>`;
      });
      parts.push(`<h3>Bow and Lean attendu</h3><ul>${entries.join('')}</ul>`);
    }

    return parts.join('') || '<p><strong>Biomecanique :</strong> non renseignee.</p>';
  }

  renderManeuvers(maneuverIds) {
    if (!Array.isArray(maneuverIds) || maneuverIds.length === 0) {
      return '<p><strong>Manoeuvres :</strong> non renseignees.</p>';
    }

    const maneuvers = maneuverIds
      .map((id) => this.data.maneuvers.find((m) => m.id === id))
      .filter(Boolean);

    if (maneuvers.length === 0) {
      return '<p><strong>Manoeuvres :</strong> non trouvees dans la base.</p>';
    }

    const items = maneuvers.map((m) => {
      const indications = Array.isArray(m.indications)
        ? `<div><strong>Indications :</strong> ${m.indications.map((x) => this.formatValue(x)).join(', ')}</div>`
        : '';

      const principle = m.principle
        ? `<div><strong>Principe :</strong> ${this.formatValue(m.principle)}</div>`
        : '';

      return `
        <li>
          <strong>${this.escapeHtml(m.name)}</strong>
          ${indications}
          ${principle}
        </li>
      `;
    });

    return `<h3>Manoeuvres recommandees</h3><ul>${items.join('')}</ul>`;
  }

  renderListBlock(title, items) {
    if (!Array.isArray(items) || items.length === 0) return '';

    return `
      <h3>${this.escapeHtml(title)}</h3>
      <ul>
        ${items.map((item) => `<li>${this.formatComplexValue(item)}</li>`).join('')}
      </ul>
    `;
  }

  renderFiltersSummary(filters) {
    const active = Object.entries(filters).filter(([, value]) => value);

    if (active.length === 0) return '';

    return `
      <p><strong>Filtres actifs :</strong> ${active
        .map(([key, value]) => `${this.formatValue(key)} = ${this.formatValue(value)}`)
        .join(' | ')}</p>
    `;
  }

  formatComplexValue(value) {
    if (Array.isArray(value)) {
      return value.map((item) => this.formatComplexValue(item)).join(', ');
    }

    if (value && typeof value === 'object') {
      const entries = Object.entries(value).map(([key, innerValue]) => {
        return `<div><strong>${this.formatValue(key)} :</strong> ${this.formatComplexValue(innerValue)}</div>`;
      });
      return entries.join('');
    }

    if (typeof value === 'boolean') {
      return value ? 'oui' : 'non';
    }

    return this.escapeHtml(this.formatValue(String(value)));
  }

  formatValue(value) {
    return String(value)
      .replaceAll('_', ' ')
      .replace(/\bpc\b/gi, 'PC')
      .replace(/\bhc\b/gi, 'HC')
      .replace(/\bac\b/gi, 'AC')
      .replace(/\bvppb\b/gi, 'VPPB')
      .replace(/\bdix hallpike\b/gi, 'Dix-Hallpike')
      .replace(/\bsupine roll test\b/gi, 'Supine Roll Test')
      .replace(/\bdeep head hanging\b/gi, 'Deep Head Hanging');
  }

  setText(element, text) {
    if (element) element.textContent = text;
  }

  setHTML(element, html) {
    if (element) element.innerHTML = html;
  }

  clearSection(element) {
    if (element) element.innerHTML = '';
  }

  showError(message) {
    this.setText(this.elements.resultTitle, 'Erreur');
    this.setHTML(this.elements.resultSummary, `<p>${this.escapeHtml(message)}</p>`);
  }

  escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const simulator = new VPPBSimulator();
  await simulator.initialize();
});
