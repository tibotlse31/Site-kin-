window.VPPBEngine = (() => {
  const state = window.VPPBState;
  const data = window.VPPBData;

  function unique(values) {
    return [...new Set(values)];
  }

  function getBiomechanicsOptions() {
    const s = state.biomechanics;
    const cases = data.biomechanicsCases;

    const canals = unique(cases.map(c => c.canal));

    const filteredByCanal = s.canal
      ? cases.filter(c => c.canal === s.canal)
      : [];

    const sides = s.canal
      ? unique(filteredByCanal.map(c => c.side))
      : [];

    const filteredBySide = s.side
      ? filteredByCanal.filter(c => c.side === s.side)
      : filteredByCanal;

    const mechanisms = s.canal
      ? unique(filteredBySide.map(c => c.mechanism))
      : [];

    const filteredByMechanism = s.mechanism
      ? filteredBySide.filter(c => c.mechanism === s.mechanism)
      : filteredBySide;

    const scenarios = s.canal
      ? unique(filteredByMechanism.map(c => c.scenario))
      : [];

    return { canals, sides, mechanisms, scenarios };
  }

  function getBiomechanicsCase() {
    const s = state.biomechanics;
    return data.biomechanicsCases.find(
      c =>
        c.canal === s.canal &&
        c.side === s.side &&
        c.mechanism === s.mechanism &&
        c.scenario === s.scenario
    ) || null;
  }

  function resetBiomechanicsAfter(level) {
    const s = state.biomechanics;

    if (level === 'canal') {
      s.side = '';
      s.mechanism = '';
      s.scenario = '';
    }

    if (level === 'side') {
      s.mechanism = '';
      s.scenario = '';
    }

    if (level === 'mechanism') {
      s.scenario = '';
    }
  }

  function getTestById(id) {
    return data.tests.find(t => t.id === id) || null;
  }

  function getManeuverById(id) {
    return data.maneuvers.find(m => m.id === id) || null;
  }

  function computeReasoningResult() {
    const r = state.reasoning;
    const exact = data.reasoningRules.find(rule =>
      rule.nystagmusFamily === r.nystagmusFamily &&
      rule.latency === r.latency &&
      rule.duration === r.duration &&
      rule.reversal === r.reversal &&
      rule.intensitySide === r.intensitySide
    );

    if (exact) {
      return {
        text: exact.result,
        level: 'high'
      };
    }

    if (!r.nystagmusFamily) {
      return {
        text: "Commence par choisir une famille de nystagmus ou de situation clinique.",
        level: 'empty'
      };
    }

    if (r.nystagmusFamily === 'downbeat') {
      return {
        text: "Le vertical inférieur doit toujours faire discuter une atteinte du canal antérieur, mais aussi une cause centrale si le tableau est atypique ou mal cohérent.",
        level: 'warning'
      };
    }

    if (r.nystagmusFamily === 'horizontal_geotropic') {
      return {
        text: "Le profil fait penser à un canal horizontal géotropique. Il faut encore préciser latence, durée et côté le plus intense.",
        level: 'medium'
      };
    }

    if (r.nystagmusFamily === 'horizontal_ageotropic') {
      return {
        text: "Le profil fait penser à une forme horizontale agéotropique. Il faut encore distinguer canalolithiase agéotropique et cupulolithiase.",
        level: 'medium'
      };
    }

    if (r.nystagmusFamily === 'torsion_upbeat') {
      return {
        text: "Le profil évoque d’abord un canal postérieur. La latence, la brièveté et l’inversion au retour assis renforcent la cohérence.",
        level: 'medium'
      };
    }

    return {
      text: "Le tableau reste incomplet. Continue le raisonnement avec les questions suivantes.",
      level: 'medium'
    };
  }

  function getClinicalCase() {
    return data.clinicalCases.find(c => c.id === state.reasoning.selectedCaseId) || null;
  }

  function labelCanal(value) {
    return {
      posterior: 'Canal postérieur',
      horizontal: 'Canal horizontal',
      anterior: 'Canal antérieur'
    }[value] || value;
  }

  function labelSide(value) {
    return {
      right: 'Droite',
      left: 'Gauche',
      indeterminate: 'Indéterminé'
    }[value] || value;
  }

  function labelMechanism(value) {
    return {
      canalolithiasis: 'Canalolithiase',
      canalolithiasis_geotropic: 'Canalolithiase géotropique',
      canalolithiasis_ageotropic: 'Canalolithiase agéotropique',
      cupulolithiasis: 'Cupulolithiase'
    }[value] || value;
  }

  function labelScenario(value) {
    return {
      dix_hallpike_right: 'Dix-Hallpike droit',
      dix_hallpike_left: 'Dix-Hallpike gauche',
      supine_roll_test: 'Supine Roll Test',
      bow_lean: 'Bow and Lean Test',
      deep_head_hanging: 'Deep Head Hanging'
    }[value] || value;
  }

  return {
    getBiomechanicsOptions,
    getBiomechanicsCase,
    resetBiomechanicsAfter,
    getTestById,
    getManeuverById,
    computeReasoningResult,
    getClinicalCase,
    labelCanal,
    labelSide,
    labelMechanism,
    labelScenario
  };
})();
