(() => {
  const state = window.VPPBState;
  const engine = window.VPPBEngine;
  const render = window.VPPBRender.render;

  function init() {
    bindEvents();
    render();
  }

  function bindEvents() {
    document.addEventListener('click', handleClick);
  }

  function handleClick(event) {
    const target = event.target.closest('[data-action]');
    if (!target) return;

    const action = target.dataset.action;

    if (action === 'go-module') {
      state.activeModule = target.dataset.module;
      render();
      return;
    }

    if (action === 'set-basics-topic') {
      state.basicsTopic = target.dataset.topic;
      render();
      return;
    }

    if (action === 'set-bio-canal') {
      state.biomechanics.canal = target.dataset.value;
      engine.resetBiomechanicsAfter('canal');
      render();
      return;
    }

    if (action === 'set-bio-side') {
      state.biomechanics.side = target.dataset.value;
      engine.resetBiomechanicsAfter('side');
      render();
      return;
    }

    if (action === 'set-bio-mechanism') {
      state.biomechanics.mechanism = target.dataset.value;
      engine.resetBiomechanicsAfter('mechanism');
      render();
      return;
    }

    if (action === 'set-bio-scenario') {
      state.biomechanics.scenario = target.dataset.value;
      render();
      return;
    }

    if (action === 'set-interpret-tab') {
      state.interpret.tab = target.dataset.tab;
      render();
      return;
    }

    if (action === 'set-test') {
      state.interpret.selectedTest = target.dataset.id;
      render();
      return;
    }

    if (action === 'set-test-side') {
      state.interpret.selectedTestSide = target.dataset.side;
      render();
      return;
    }

    if (action === 'set-maneuver') {
      state.interpret.selectedManeuver = target.dataset.id;
      render();
      return;
    }

    if (action === 'set-maneuver-side') {
      state.interpret.selectedManeuverSide = target.dataset.side;
      render();
      return;
    }

    if (action === 'set-reasoning') {
      const key = target.dataset.key;
      const value = target.dataset.value;
      state.reasoning[key] = value;
      render();
      return;
    }

    if (action === 'set-case') {
      state.reasoning.selectedCaseId = target.dataset.id;
      render();
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
