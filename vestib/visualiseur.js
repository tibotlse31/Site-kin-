(function(){
  if (window.APP && typeof window.APP.pageNav === 'function') {
    window.APP.pageNav('visualiseur.html');
  }

  const TEMPLATES = {
  "horiz-right": {
    "utricle": {
      "cx": 178,
      "cy": 278,
      "rx": 72,
      "ry": 52
    },
    "ampulla": {
      "cx": 294,
      "cy": 260,
      "r": 30
    },
    "cupula": {
      "x1": 280,
      "y1": 232,
      "x2": 280,
      "y2": 288
    },
    "path_start": [
      309,
      233
    ],
    "path_curves": [
      [
        [
          432,
          144
        ],
        [
          601,
          158
        ],
        [
          689,
          252
        ]
      ],
      [
        [
          762,
          329
        ],
        [
          745,
          428
        ],
        [
          632,
          483
        ]
      ],
      [
        [
          516,
          540
        ],
        [
          361,
          503
        ],
        [
          309,
          289
        ]
      ]
    ],
    "ut_branch_top": [
      [
        264,
        248
      ],
      [
        226,
        248
      ]
    ],
    "ut_branch_low": [
      [
        264,
        285
      ],
      [
        226,
        290
      ]
    ],
    "labels": {
      "utricle": [
        178,
        350
      ],
      "ampulla": [
        294,
        205
      ],
      "cupula": [
        338,
        258
      ],
      "short": [
        235,
        318
      ],
      "long": [
        620,
        444
      ]
    },
    "anchors": {
      "cluster_long": [
        603,
        456
      ],
      "cluster_short": [
        235,
        314
      ],
      "cluster_cupula": [
        294,
        260
      ],
      "flow_toward_ampulla": [
        [
          624,
          430
        ],
        [
          350,
          305
        ]
      ],
      "flow_away_ampulla": [
        [
          350,
          305
        ],
        [
          624,
          430
        ]
      ],
      "short_toward_ampulla": [
        [
          230,
          314
        ],
        [
          292,
          272
        ]
      ],
      "short_away_ampulla": [
        [
          292,
          272
        ],
        [
          230,
          314
        ]
      ],
      "cupula_toward_canal": [
        [
          292,
          260
        ],
        [
          355,
          260
        ]
      ],
      "cupula_toward_utricule": [
        [
          292,
          260
        ],
        [
          220,
          260
        ]
      ],
      "null_point": [
        476,
        118
      ]
    }
  },
  "horiz-left": {
    "utricle": {
      "cx": 702,
      "cy": 278,
      "rx": 72,
      "ry": 52
    },
    "ampulla": {
      "cx": 586,
      "cy": 260,
      "r": 30
    },
    "cupula": {
      "x1": 600,
      "y1": 232,
      "x2": 600,
      "y2": 288
    },
    "path_start": [
      571,
      233
    ],
    "path_curves": [
      [
        [
          448,
          144
        ],
        [
          279,
          158
        ],
        [
          191,
          252
        ]
      ],
      [
        [
          118,
          329
        ],
        [
          135,
          428
        ],
        [
          248,
          483
        ]
      ],
      [
        [
          364,
          540
        ],
        [
          519,
          503
        ],
        [
          571,
          289
        ]
      ]
    ],
    "ut_branch_top": [
      [
        616,
        248
      ],
      [
        654,
        248
      ]
    ],
    "ut_branch_low": [
      [
        616,
        285
      ],
      [
        654,
        290
      ]
    ],
    "labels": {
      "utricle": [
        702,
        350
      ],
      "ampulla": [
        586,
        205
      ],
      "cupula": [
        542,
        258
      ],
      "short": [
        645,
        318
      ],
      "long": [
        260,
        444
      ]
    },
    "anchors": {
      "cluster_long": [
        277,
        456
      ],
      "cluster_short": [
        645,
        314
      ],
      "cluster_cupula": [
        586,
        260
      ],
      "flow_toward_ampulla": [
        [
          256,
          430
        ],
        [
          530,
          305
        ]
      ],
      "flow_away_ampulla": [
        [
          530,
          305
        ],
        [
          256,
          430
        ]
      ],
      "short_toward_ampulla": [
        [
          650,
          314
        ],
        [
          588,
          272
        ]
      ],
      "short_away_ampulla": [
        [
          588,
          272
        ],
        [
          650,
          314
        ]
      ],
      "cupula_toward_canal": [
        [
          588,
          260
        ],
        [
          525,
          260
        ]
      ],
      "cupula_toward_utricule": [
        [
          588,
          260
        ],
        [
          660,
          260
        ]
      ],
      "null_point": [
        404,
        118
      ]
    }
  },
  "post-right": {
    "utricle": {
      "cx": 190,
      "cy": 260,
      "rx": 72,
      "ry": 54
    },
    "ampulla": {
      "cx": 300,
      "cy": 334,
      "r": 28
    },
    "cupula": {
      "x": 292,
      "y": 312,
      "w": 16,
      "h": 46,
      "rot": -28
    },
    "path_start": [
      322,
      142
    ],
    "path_curves": [
      [
        [
          430,
          72
        ],
        [
          592,
          70
        ],
        [
          677,
          176
        ]
      ],
      [
        [
          746,
          260
        ],
        [
          718,
          401
        ],
        [
          584,
          462
        ]
      ],
      [
        [
          450,
          522
        ],
        [
          339,
          472
        ],
        [
          310,
          360
        ]
      ]
    ],
    "common_branch": [
      [
        284,
        186
      ],
      [
        240,
        210
      ]
    ],
    "amp_branch": [
      [
        279,
        316
      ],
      [
        240,
        304
      ]
    ],
    "labels": {
      "utricle": [
        190,
        344
      ],
      "ampulla": [
        300,
        390
      ],
      "cupula": [
        350,
        334
      ],
      "common": [
        364,
        96
      ],
      "long": [
        628,
        420
      ]
    },
    "anchors": {
      "cluster_rest": [
        540,
        450
      ],
      "cluster_provoked": [
        472,
        120
      ],
      "cluster_return": [
        392,
        248
      ],
      "flow_provoked": [
        [
          520,
          430
        ],
        [
          355,
          180
        ]
      ],
      "flow_return": [
        [
          360,
          188
        ],
        [
          495,
          360
        ]
      ]
    }
  },
  "post-left": {
    "utricle": {
      "cx": 690,
      "cy": 260,
      "rx": 72,
      "ry": 54
    },
    "ampulla": {
      "cx": 580,
      "cy": 334,
      "r": 28
    },
    "cupula": {
      "x": 588,
      "y": 312,
      "w": 16,
      "h": 46,
      "rot": 28
    },
    "path_start": [
      558,
      142
    ],
    "path_curves": [
      [
        [
          450,
          72
        ],
        [
          288,
          70
        ],
        [
          203,
          176
        ]
      ],
      [
        [
          134,
          260
        ],
        [
          162,
          401
        ],
        [
          296,
          462
        ]
      ],
      [
        [
          430,
          522
        ],
        [
          541,
          472
        ],
        [
          570,
          360
        ]
      ]
    ],
    "common_branch": [
      [
        596,
        186
      ],
      [
        640,
        210
      ]
    ],
    "amp_branch": [
      [
        601,
        316
      ],
      [
        640,
        304
      ]
    ],
    "labels": {
      "utricle": [
        690,
        344
      ],
      "ampulla": [
        580,
        390
      ],
      "cupula": [
        530,
        334
      ],
      "common": [
        516,
        96
      ],
      "long": [
        252,
        420
      ]
    },
    "anchors": {
      "cluster_rest": [
        340,
        450
      ],
      "cluster_provoked": [
        408,
        120
      ],
      "cluster_return": [
        488,
        248
      ],
      "flow_provoked": [
        [
          360,
          430
        ],
        [
          525,
          180
        ]
      ],
      "flow_return": [
        [
          520,
          188
        ],
        [
          385,
          360
        ]
      ]
    }
  },
  "ant-right": {
    "utricle": {
      "cx": 190,
      "cy": 258,
      "rx": 72,
      "ry": 54
    },
    "ampulla": {
      "cx": 300,
      "cy": 244,
      "r": 28
    },
    "cupula": {
      "x": 292,
      "y": 223,
      "w": 16,
      "h": 44,
      "rot": 24
    },
    "path_start": [
      322,
      142
    ],
    "path_curves": [
      [
        [
          420,
          24
        ],
        [
          593,
          28
        ],
        [
          676,
          152
        ]
      ],
      [
        [
          742,
          248
        ],
        [
          680,
          402
        ],
        [
          520,
          426
        ]
      ],
      [
        [
          396,
          442
        ],
        [
          330,
          344
        ],
        [
          309,
          270
        ]
      ]
    ],
    "common_branch": [
      [
        286,
        182
      ],
      [
        242,
        208
      ]
    ],
    "amp_branch": [
      [
        280,
        244
      ],
      [
        242,
        244
      ]
    ],
    "labels": {
      "utricle": [
        190,
        342
      ],
      "ampulla": [
        300,
        188
      ],
      "cupula": [
        350,
        244
      ],
      "common": [
        368,
        96
      ],
      "long": [
        610,
        154
      ]
    },
    "anchors": {
      "cluster_rest": [
        430,
        382
      ],
      "cluster_provoked": [
        488,
        108
      ],
      "cluster_return": [
        380,
        220
      ],
      "flow_provoked": [
        [
          400,
          344
        ],
        [
          468,
          134
        ]
      ],
      "flow_return": [
        [
          454,
          140
        ],
        [
          360,
          246
        ]
      ]
    }
  },
  "ant-left": {
    "utricle": {
      "cx": 690,
      "cy": 258,
      "rx": 72,
      "ry": 54
    },
    "ampulla": {
      "cx": 580,
      "cy": 244,
      "r": 28
    },
    "cupula": {
      "x": 588,
      "y": 223,
      "w": 16,
      "h": 44,
      "rot": -24
    },
    "path_start": [
      558,
      142
    ],
    "path_curves": [
      [
        [
          460,
          24
        ],
        [
          287,
          28
        ],
        [
          204,
          152
        ]
      ],
      [
        [
          138,
          248
        ],
        [
          200,
          402
        ],
        [
          360,
          426
        ]
      ],
      [
        [
          484,
          442
        ],
        [
          550,
          344
        ],
        [
          571,
          270
        ]
      ]
    ],
    "common_branch": [
      [
        594,
        182
      ],
      [
        638,
        208
      ]
    ],
    "amp_branch": [
      [
        600,
        244
      ],
      [
        638,
        244
      ]
    ],
    "labels": {
      "utricle": [
        690,
        342
      ],
      "ampulla": [
        580,
        188
      ],
      "cupula": [
        530,
        244
      ],
      "common": [
        512,
        96
      ],
      "long": [
        270,
        154
      ]
    },
    "anchors": {
      "cluster_rest": [
        450,
        382
      ],
      "cluster_provoked": [
        392,
        108
      ],
      "cluster_return": [
        500,
        220
      ],
      "flow_provoked": [
        [
          480,
          344
        ],
        [
          412,
          134
        ]
      ],
      "flow_return": [
        [
          426,
          140
        ],
        [
          520,
          246
        ]
      ]
    }
  }
};

  const TESTS = {
    post: {
      dixhallpike: {
        name: 'Dix-Hallpike',
        variants: [],
        steps: ['Assis', 'Décubitus tête pendante', 'Retour assis']
      },
      sidelying: {
        name: 'Side-Lying',
        variants: [],
        steps: ['Assis', 'Décubitus latéral test', 'Retour assis']
      }
    },
    horiz: {
      bowlean: {
        name: 'Bow and Lean',
        variants: [
          { value:'canalo', label:'Canalolithiase' },
          { value:'cupulo', label:'Cupulolithiase' }
        ],
        steps: ['Tête droite', 'Bow', 'Lean']
      },
      supineroll: {
        name: 'Supine Roll Test',
        variants: [
          { value:'geotropic', label:'Géotropique — bras long' },
          { value:'ageotropic', label:'Agéotropique — bras court' },
          { value:'cupulo', label:'Cupulolithiase' }
        ],
        steps: ['Position centrale', 'Rotation droite', 'Rotation gauche', 'Null point']
      },
      upright: {
        name: 'Upright Head Roll',
        variants: [
          { value:'geotropic', label:'Géotropique — bras long' },
          { value:'ageotropic', label:'Agéotropique — bras court' },
          { value:'cupulo', label:'Cupulolithiase' }
        ],
        steps: ['Tête droite', 'Inclinaison droite', 'Inclinaison gauche']
      }
    },
    ant: {
      deephead: {
        name: 'Deep Head Hanging',
        variants: [],
        steps: ['Assis', 'Head hanging', 'Retour assis']
      },
      dixlat: {
        name: 'Dix-Hallpike latéralisant',
        variants: [],
        steps: ['Assis', 'Position latéralisante', 'Retour assis']
      }
    }
  };

  const state = {
    channel: 'horiz',
    test: 'supineroll',
    side: 'right',
    variant: 'geotropic',
    step: 0
  };

  const els = {};

  function init(){
    els.channel = document.getElementById('channelSelect');
    els.test = document.getElementById('testSelect');
    els.side = document.getElementById('sideSelect');
    els.variant = document.getElementById('variantSelect');
    els.variantWrap = document.getElementById('variantWrap');
    els.anatomyHost = document.getElementById('anatomyHost');
    els.stepButtons = document.getElementById('stepButtons');
    els.infoBox = document.getElementById('infoBox');
    els.eyeHost = document.getElementById('eyeHost');
    els.eyeCaption = document.getElementById('eyeCaption');

    fillChannels();
    bind();
    render();
  }

  function bind(){
    els.channel.addEventListener('change', (e) => {
      state.channel = e.target.value;
      state.step = 0;
      fillTests();
      render();
    });
    els.test.addEventListener('change', (e) => {
      state.test = e.target.value;
      state.step = 0;
      fillVariants();
      render();
    });
    els.side.addEventListener('change', (e) => {
      state.side = e.target.value;
      state.step = 0;
      render();
    });
    els.variant.addEventListener('change', (e) => {
      state.variant = e.target.value;
      state.step = 0;
      render();
    });
  }

  function fillChannels(){
    const entries = [
      ['post', 'Canal postérieur'],
      ['horiz', 'Canal horizontal'],
      ['ant', 'Canal antérieur']
    ];
    els.channel.innerHTML = entries.map(([value, label]) => `<option value="${value}">${label}</option>`).join('');
    els.channel.value = state.channel;
    fillTests();
  }

  function fillTests(){
    const tests = TESTS[state.channel];
    els.test.innerHTML = Object.entries(tests)
      .map(([value, test]) => `<option value="${value}">${test.name}</option>`)
      .join('');
    if (!tests[state.test]) {
      state.test = Object.keys(tests)[0];
    }
    els.test.value = state.test;
    fillVariants();
  }

  function fillVariants(){
    const test = TESTS[state.channel][state.test];
    const variants = test.variants || [];
    if (!variants.length) {
      els.variantWrap.style.display = 'none';
      state.variant = '';
      return;
    }
    els.variantWrap.style.display = 'block';
    els.variant.innerHTML = variants.map(v => `<option value="${v.value}">${v.label}</option>`).join('');
    if (!variants.some(v => v.value === state.variant)) {
      state.variant = variants[0].value;
    }
    els.variant.value = state.variant;
  }

  function getTemplate(){
    return TEMPLATES[`${state.channel}-${state.side}`];
  }

  function getTest(){
    return TESTS[state.channel][state.test];
  }

  function getVisibleSteps(){
    const steps = getTest().steps.slice();
    if (!(state.channel === 'horiz' && state.test === 'supineroll' && state.variant === 'cupulo')) {
      return steps.filter(label => label !== 'Null point');
    }
    return steps;
  }

  function render(){
    const steps = getVisibleSteps();
    if (state.step > steps.length - 1) state.step = 0;
    renderStepButtons(steps);
    els.anatomyHost.innerHTML = buildAnatomySVG();
    renderInfo();
    renderEye();
  }

  function renderStepButtons(steps){
    els.stepButtons.innerHTML = steps.map((label, index) => {
      const cls = index === state.step ? 'step-btn active' : 'step-btn';
      return `<button class="${cls}" data-step="${index}">${label}</button>`;
    }).join('');
    els.stepButtons.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        state.step = Number(btn.dataset.step);
        render();
      });
    });
  }

  function buildAnatomySVG(){
    const template = getTemplate();
    const title = getStageTitle();
    return `
      <svg viewBox="0 0 880 560" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Gabarit anatomique">
        <defs>
          <linearGradient id="canalFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#63d3cd"/>
            <stop offset="100%" stop-color="#3bbab4"/>
          </linearGradient>
          <linearGradient id="utFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff"/>
            <stop offset="100%" stop-color="#dbe6ff"/>
          </linearGradient>
          <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#0f4f9f"/>
          </marker>
        </defs>

        <rect x="0" y="0" width="880" height="560" fill="#f8fbff"/>
        <rect x="24" y="24" width="832" height="512" rx="22" fill="#eef5fc" stroke="#d8e5f2"/>
        <text x="44" y="58" font-size="18" fill="#3f5e82" font-family="Inter, Arial, sans-serif">Gabarit fixe</text>
        <text x="440" y="58" text-anchor="middle" font-size="18" font-weight="700" fill="#16324f" font-family="Inter, Arial, sans-serif">${escapeHtml(title)}</text>
        <text x="440" y="82" text-anchor="middle" font-size="13" fill="#61758d" font-family="Inter, Arial, sans-serif">${escapeHtml(getSubTitle())}</text>

        ${baseAnatomy(template)}
        ${overlayAnatomy(template)}
      </svg>
    `;
  }

  function baseAnatomy(template){
    if (state.channel === 'horiz') return drawHorizontalBase(template);
    return drawVerticalBase(template);
  }

  function drawHorizontalBase(t){
    const p = svgPath(t.path_start, t.path_curves);
    return `
      <path d="${p}" fill="none" stroke="url(#canalFill)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="${t.ut_branch_top[0][0]}" y1="${t.ut_branch_top[0][1]}" x2="${t.ut_branch_top[1][0]}" y2="${t.ut_branch_top[1][1]}" stroke="url(#canalFill)" stroke-width="16" stroke-linecap="round"/>
      <line x1="${t.ut_branch_low[0][0]}" y1="${t.ut_branch_low[0][1]}" x2="${t.ut_branch_low[1][0]}" y2="${t.ut_branch_low[1][1]}" stroke="url(#canalFill)" stroke-width="16" stroke-linecap="round"/>
      <ellipse cx="${t.utricle.cx}" cy="${t.utricle.cy}" rx="${t.utricle.rx}" ry="${t.utricle.ry}" fill="url(#utFill)" stroke="#6f85f3" stroke-width="3"/>
      <circle cx="${t.ampulla.cx}" cy="${t.ampulla.cy}" r="${t.ampulla.r}" fill="#e9d5ff" stroke="#a855f7" stroke-width="3"/>
      <line x1="${t.cupula.x1}" y1="${t.cupula.y1}" x2="${t.cupula.x2}" y2="${t.cupula.y2}" stroke="#0f766e" stroke-width="8" stroke-linecap="round"/>
      ${
        label(t.labels.utricle, 'Utricule') +
        label(t.labels.ampulla, 'Ampoule') +
        label(t.labels.cupula, 'Cupule') +
        label(t.labels.short, 'Bras court') +
        label(t.labels.long, 'Bras long')
      }
    `;
  }

  function drawVerticalBase(t){
    const p = svgPath(t.path_start, t.path_curves);
    return `
      <path d="${p}" fill="none" stroke="url(#canalFill)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
      <line x1="${t.common_branch[0][0]}" y1="${t.common_branch[0][1]}" x2="${t.common_branch[1][0]}" y2="${t.common_branch[1][1]}" stroke="url(#canalFill)" stroke-width="16" stroke-linecap="round"/>
      <line x1="${t.amp_branch[0][0]}" y1="${t.amp_branch[0][1]}" x2="${t.amp_branch[1][0]}" y2="${t.amp_branch[1][1]}" stroke="url(#canalFill)" stroke-width="16" stroke-linecap="round"/>
      <ellipse cx="${t.utricle.cx}" cy="${t.utricle.cy}" rx="${t.utricle.rx}" ry="${t.utricle.ry}" fill="url(#utFill)" stroke="#6f85f3" stroke-width="3"/>
      <circle cx="${t.ampulla.cx}" cy="${t.ampulla.cy}" r="${t.ampulla.r}" fill="#e9d5ff" stroke="#a855f7" stroke-width="3"/>
      <rect x="${t.cupula.x}" y="${t.cupula.y}" width="${t.cupula.w}" height="${t.cupula.h}" rx="8" fill="#8ee2d5" transform="rotate(${t.cupula.rot} ${t.ampulla.cx} ${t.ampulla.cy})"/>
      ${
        label(t.labels.utricle, 'Utricule') +
        label(t.labels.ampulla, 'Ampoule') +
        label(t.labels.cupula, 'Cupule') +
        label(t.labels.common, 'Bras commun') +
        label(t.labels.long, 'Lumière canalaire')
      }
    `;
  }

  function overlayAnatomy(t){
    if (state.channel === 'horiz') return overlayHorizontal(t);
    if (state.channel === 'post') return overlayPosterior(t);
    return overlayAnterior(t);
  }

  function overlayHorizontal(t){
    const steps = getVisibleSteps();
    const current = steps[state.step];
    let cluster = '';
    let arrow = '';
    let note = '';

    if (state.test === 'bowlean') {
      if (state.variant === 'canalo') {
        cluster = otoconia(t.anchors.cluster_long);
        if (current === 'Bow') arrow = flowLine(t.anchors.flow_toward_ampulla);
        if (current === 'Lean') arrow = flowLine(t.anchors.flow_away_ampulla);
      } else {
        cluster = otoconia(t.anchors.cluster_cupula);
        if (current === 'Bow') arrow = flowLine(t.anchors.cupula_toward_canal);
        if (current === 'Lean') arrow = flowLine(t.anchors.cupula_toward_utricule);
      }
    }

    if (state.test === 'supineroll') {
      if (state.variant === 'geotropic') {
        cluster = otoconia(t.anchors.cluster_long);
        if (current === 'Rotation droite' || current === 'Rotation gauche') {
          const toward = (current === 'Rotation droite' && state.side === 'right') || (current === 'Rotation gauche' && state.side === 'left');
          arrow = flowLine(toward ? t.anchors.flow_toward_ampulla : t.anchors.flow_away_ampulla);
        }
      } else if (state.variant === 'ageotropic') {
        cluster = otoconia(t.anchors.cluster_short);
        if (current === 'Rotation droite' || current === 'Rotation gauche') {
          const toward = (current === 'Rotation droite' && state.side === 'left') || (current === 'Rotation gauche' && state.side === 'right');
          arrow = flowLine(toward ? t.anchors.short_toward_ampulla : t.anchors.short_away_ampulla);
        }
      } else {
        cluster = otoconia(t.anchors.cluster_cupula);
        if (current === 'Rotation droite' || current === 'Rotation gauche') {
          const affectedRotation = (current === 'Rotation droite' && state.side === 'right') || (current === 'Rotation gauche' && state.side === 'left');
          arrow = flowLine(affectedRotation ? t.anchors.cupula_toward_canal : t.anchors.cupula_toward_utricule);
        }
        if (current === 'Null point') {
          note = `
            <circle cx="${t.anchors.null_point[0]}" cy="${t.anchors.null_point[1]}" r="10" fill="#fff" stroke="#0f4f9f" stroke-width="3"/>
            <text x="${t.anchors.null_point[0]}" y="${t.anchors.null_point[1] - 18}" text-anchor="middle" font-size="13" font-weight="700" fill="#0f4f9f" font-family="Inter, Arial, sans-serif">Null point</text>
            <text x="${t.anchors.null_point[0]}" y="${t.anchors.null_point[1] + 28}" text-anchor="middle" font-size="12" fill="#61758d" font-family="Inter, Arial, sans-serif">rotation limitée 30–40°</text>
          `;
        }
      }
    }

    if (state.test === 'upright') {
      if (state.variant === 'geotropic') {
        cluster = otoconia(t.anchors.cluster_long);
        if (current === 'Inclinaison droite' || current === 'Inclinaison gauche') {
          const toward = (current === 'Inclinaison droite' && state.side === 'right') || (current === 'Inclinaison gauche' && state.side === 'left');
          arrow = flowLine(toward ? t.anchors.flow_toward_ampulla : t.anchors.flow_away_ampulla);
        }
      } else if (state.variant === 'ageotropic') {
        cluster = otoconia(t.anchors.cluster_short);
        if (current === 'Inclinaison droite' || current === 'Inclinaison gauche') {
          const toward = (current === 'Inclinaison droite' && state.side === 'left') || (current === 'Inclinaison gauche' && state.side === 'right');
          arrow = flowLine(toward ? t.anchors.short_toward_ampulla : t.anchors.short_away_ampulla);
        }
      } else {
        cluster = otoconia(t.anchors.cluster_cupula);
        if (current === 'Inclinaison droite' || current === 'Inclinaison gauche') {
          const affectedTilt = (current === 'Inclinaison droite' && state.side === 'right') || (current === 'Inclinaison gauche' && state.side === 'left');
          arrow = flowLine(affectedTilt ? t.anchors.cupula_toward_canal : t.anchors.cupula_toward_utricule);
        }
      }
    }

    return cluster + arrow + note;
  }

  function overlayPosterior(t){
    const steps = getVisibleSteps();
    const current = steps[state.step];
    if (current === 'Assis') return otoconia(t.anchors.cluster_rest);
    if (current === 'Décubitus tête pendante' || current === 'Décubitus latéral test') {
      return otoconia(t.anchors.cluster_provoked) + flowLine(t.anchors.flow_provoked);
    }
    return otoconia(t.anchors.cluster_return) + flowLine(t.anchors.flow_return);
  }

  function overlayAnterior(t){
    const steps = getVisibleSteps();
    const current = steps[state.step];
    if (current === 'Assis') return otoconia(t.anchors.cluster_rest);
    if (current === 'Head hanging' || current === 'Position latéralisante') {
      return otoconia(t.anchors.cluster_provoked) + flowLine(t.anchors.flow_provoked);
    }
    return otoconia(t.anchors.cluster_return) + flowLine(t.anchors.flow_return);
  }

  function otoconia([cx, cy]){
    const dots = [
      [cx - 10, cy - 8, 6],
      [cx + 10, cy - 6, 5],
      [cx - 2, cy + 10, 5],
      [cx + 14, cy + 10, 6]
    ];
    return dots.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ef4444" stroke="rgba(255,255,255,.9)" stroke-width="2"/>`).join('');
  }

  function flowLine([[x1, y1], [x2, y2]]){
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#0f4f9f" stroke-width="5" stroke-linecap="round" marker-end="url(#arrowBlue)"/>`;
  }

  function label([x, y], text){
    return `<text x="${x}" y="${y}" text-anchor="middle" font-size="14" fill="#35516d" font-family="Inter, Arial, sans-serif">${escapeHtml(text)}</text>`;
  }

  function svgPath(start, curves){
    let value = `M ${start[0]} ${start[1]}`;
    curves.forEach(curve => {
      value += ` C ${curve[0][0]} ${curve[0][1]}, ${curve[1][0]} ${curve[1][1]}, ${curve[2][0]} ${curve[2][1]}`;
    });
    return value;
  }

  function getStageTitle(){
    const sideLabel = state.side === 'right' ? 'droite' : 'gauche';
    const channelLabel = state.channel === 'post' ? 'Canal postérieur' : state.channel === 'horiz' ? 'Canal horizontal' : 'Canal antérieur';
    return `${channelLabel} — oreille ${sideLabel}`;
  }

  function getSubTitle(){
    if (state.channel === 'post') {
      return 'Repères fixes : utricule médial, ampoule médiale, bras commun supérieur.';
    }
    if (state.channel === 'ant') {
      return 'Repères fixes : bras commun supérieur, ampoule au versant ampullaire proche de l’utricule.';
    }
    return 'Repères fixes : bras long, bras court, cupule et utricule dans le même cadrage.';
  }

  function renderInfo(){
    const stepData = getInfoData();
    els.infoBox.innerHTML = [
      card('Étape', stepData.step),
      card('Mécanique attendue', stepData.mechanics),
      card('Nystagmus attendu', stepData.nystagmus),
      card('Repère utile', stepData.rule)
    ].join('');
  }

  function card(title, text){
    return `<div class="mini-card"><strong>${escapeHtml(title)}</strong><span>${escapeHtml(text)}</span></div>`;
  }

  function getInfoData(){
    const steps = getVisibleSteps();
    const current = steps[state.step];
    const affected = state.side === 'right' ? 'droite' : 'gauche';
    const healthy = state.side === 'right' ? 'gauche' : 'droite';

    if (state.channel === 'post') {
      const testName = state.test === 'dixhallpike' ? 'Dix-Hallpike' : 'Side-Lying';
      const base = state.side === 'right'
        ? 'torsion anti-horaire avec composante verticale supérieure'
        : 'torsion horaire avec composante verticale supérieure';
      if (current === 'Assis') {
        return {
          step: `${testName} de l’oreille ${affected} : position de départ.`,
          mechanics: 'Otoconies en position déclive dans la lumière canalaire ; pas de flux significatif au repos.',
          nystagmus: 'Aucun nystagmus attendu au repos.',
          rule: 'Au test positif, le côté testé correspond au côté atteint.'
        };
      }
      if (current === 'Décubitus tête pendante' || current === 'Décubitus latéral test') {
        return {
          step: `${testName} du côté atteint : bascule provocatrice.`,
          mechanics: 'Déplacement ampullifuge des débris vers le bras commun dans un canal vertical.',
          nystagmus: `${base}, géotropique, s’épuisant si la position est maintenue.`,
          rule: 'Dans les canaux verticaux, la logique clinique repose sur un flux ampullifuge excitateur.'
        };
      }
      return {
        step: 'Retour assis.',
        mechanics: 'Migration inverse des débris vers le versant ampullaire.',
        nystagmus: 'Inversion du nystagmus au redressement.',
        rule: 'L’inversion au retour assis est un repère majeur du cours.'
      };
    }

    if (state.channel === 'ant') {
      const torsion = state.side === 'right' ? 'torsion anti-horaire' : 'torsion horaire';
      if (state.test === 'deephead') {
        if (current === 'Assis') {
          return {
            step: 'Départ assis tête droite.',
            mechanics: 'Pas de déplacement significatif attendu au repos.',
            nystagmus: 'Aucun nystagmus au départ.',
            rule: 'Le Deep Head Hanging appelle le canal antérieur mais ne latéralise pas toujours.'
          };
        }
        if (current === 'Head hanging') {
          return {
            step: 'Hyperextension cervicale en tête pendante.',
            mechanics: 'Déplacement des débris dans le canal antérieur avec réponse verticale inférieure ; composante torsionnelle inconstante.',
            nystagmus: `Vertical inférieur ; composante torsionnelle possible (${
              torsion
            }) si elle est visible.`,
            rule: 'Un downbeat impose toujours de garder en tête le diagnostic différentiel central.'
          };
        }
        return {
          step: 'Retour assis.',
          mechanics: 'Flux inverse ; la réponse peut s’inverser mais ce n’est pas constant.',
          nystagmus: 'Possible inversion au retour assis, moins constante que pour le postérieur.',
          rule: 'Si non latéralisable, la logique thérapeutique du cours privilégie Yacovino ou Li.'
        };
      }

      const testedSide = state.side === 'right' ? 'gauche' : 'droite';
      if (current === 'Assis') {
        return {
          step: `Préparation du Dix-Hallpike latéralisant : tête tournée vers ${testedSide}.`,
          mechanics: 'Recherche de la position où l’oreille saine est en bas pour faire apparaître la torsion utile.',
          nystagmus: 'Aucun nystagmus attendu au départ.',
          rule: 'Le côté latéralisant est opposé à l’oreille atteinte.'
        };
      }
      if (current === 'Position latéralisante') {
        return {
          step: `Dix-Hallpike du côté ${testedSide} pour une atteinte ${affected}.`,
          mechanics: 'Position latéralisante avec lecture privilégiée de la composante torsionnelle.',
          nystagmus: `Vertical inférieur avec ${torsion}.`,
          rule: 'Canal antérieur droit = torsion anti-horaire ; canal antérieur gauche = torsion horaire.'
        };
      }
      return {
        step: 'Retour assis.',
        mechanics: 'Retour du matériel otoconial vers le versant ampullaire.',
        nystagmus: 'Possible inversion ; interprétation plus prudente que pour le postérieur.',
        rule: 'Le cours insiste sur la difficulté de latéralisation si la torsion est pauvre.'
      };
    }

    if (state.test === 'bowlean') {
      if (state.variant === 'canalo') {
        if (current === 'Tête droite') {
          return {
            step: 'Observation de base assis tête droite.',
            mechanics: 'Comparer avec un éventuel pseudo-spontané avant toute inclinaison.',
            nystagmus: 'Aucun ou pseudo-spontané horizontal.',
            rule: 'La latence oriente vers une canalolithiase.'
          };
        }
        if (current === 'Bow') {
          return {
            step: 'Bow.',
            mechanics: 'Déplacement ampullipète excitateur dans le canal horizontal atteint.',
            nystagmus: `Horizontal battant vers l’oreille atteinte (${affected}).`,
            rule: 'Bow canalo = vers l’oreille atteinte.'
          };
        }
        return {
          step: 'Lean.',
          mechanics: 'Déplacement ampullifuge inhibiteur dans le canal horizontal atteint.',
          nystagmus: `Horizontal battant vers l’oreille saine (${healthy}).`,
          rule: 'Lean canalo = inversion du sens observé en Bow.'
        };
      }

      if (current === 'Tête droite') {
        return {
          step: 'Observation de base assis tête droite.',
          mechanics: 'Cupule chargée ; nystagmus attendu sans latence et plus persistant.',
          nystagmus: 'Aucun ou pseudo-spontané horizontal.',
          rule: 'L’absence de latence oriente vers la cupulolithiase.'
        };
      }
      if (current === 'Bow') {
        return {
          step: 'Bow.',
          mechanics: 'Déformation cupulaire vers le canal avec inhibition du canal atteint.',
          nystagmus: `Horizontal battant vers l’oreille saine (${healthy}), persistant.`,
          rule: 'Bow cupulo = vers l’oreille saine.'
        };
      }
      return {
        step: 'Lean.',
        mechanics: 'Déformation cupulaire vers l’utricule avec excitation du canal atteint.',
        nystagmus: `Horizontal battant vers l’oreille atteinte (${affected}), persistant.`,
        rule: 'Lean cupulo = inversion du Bow.'
      };
    }

    if (state.test === 'supineroll') {
      if (current === 'Position centrale') {
        return {
          step: 'Décubitus dorsal, tête fléchie à 30°.',
          mechanics: 'Position centrale de référence avant rotation droite puis gauche.',
          nystagmus: 'Comparer l’intensité éventuelle de base.',
          rule: state.variant === 'cupulo'
            ? 'En cupulolithiase, ajouter la recherche du null point.'
            : 'Comparer systématiquement droite et gauche.'
        };
      }
      if (current === 'Null point') {
        return {
          step: 'Recherche du null point.',
          mechanics: 'Rotation limitée à 30–40° pour verticaliser la cupule et annuler la réponse.',
          nystagmus: 'Arrêt transitoire du nystagmus du côté du null point.',
          rule: `Le null point aide à identifier le côté atteint ; ici, oreille ${affected} sélectionnée.`
        };
      }
      const rotateRight = current === 'Rotation droite';
      const rotSide = rotateRight ? 'droite' : 'gauche';
      const isAffectedRotation = rotSide === affected;

      if (state.variant === 'geotropic') {
        return {
          step: `Rotation ${rotSide}.`,
          mechanics: isAffectedRotation
            ? 'Forme géotropique du bras long : déplacement ampullipète excitateur.'
            : 'Forme géotropique du bras long : déplacement ampullifuge inhibiteur.',
          nystagmus: `Horizontal géotropique battant vers l’oreille basse (${
            rotSide
          })${isAffectedRotation ? ', plus intense car côté atteint.' : '.'}`,
          rule: 'Au SRT géotropique, le côté le plus intense est le côté atteint.'
        };
      }

      if (state.variant === 'ageotropic') {
        return {
          step: `Rotation ${rotSide}.`,
          mechanics: isAffectedRotation
            ? 'Forme agéotropique du bras court : réponse ampullifuge du côté atteint.'
            : 'Forme agéotropique du bras court : réponse ampullipète du côté atteint.',
          nystagmus: `Horizontal agéotropique battant vers l’oreille haute (${
            rotateRight ? 'gauche' : 'droite'
          })${isAffectedRotation ? '.' : ', plus intense car côté sain roulé.'}`,
          rule: 'Au SRT agéotropique, le côté le plus intense est le côté sain.'
        };
      }

      return {
        step: `Rotation ${rotSide}.`,
        mechanics: isAffectedRotation
          ? 'Cupule chargée : déformation vers le canal.'
          : 'Cupule chargée : déformation vers l’utricule.',
        nystagmus: `Horizontal agéotropique battant vers l’oreille haute (${
          rotateRight ? 'gauche' : 'droite'
        }), souvent persistant.`,
        rule: 'Cupulolithiase : forme agéotropique et null point à rechercher.'
      };
    }

    if (current === 'Tête droite') {
      return {
        step: 'Observation assise tête droite.',
        mechanics: 'Position de référence avant inclinaison latérale.',
        nystagmus: 'Aucun ou pseudo-spontané horizontal.',
        rule: state.variant === 'geotropic'
          ? 'Le nystagmus suit l’inclinaison dans les formes géotropiques.'
          : 'Le nystagmus est opposé à l’inclinaison dans les formes agéotropiques / cupulo.'
      };
    }

    const tiltRight = current === 'Inclinaison droite';
    const tiltSide = tiltRight ? 'droite' : 'gauche';
    if (state.variant === 'geotropic') {
      return {
        step: `Inclinaison latérale ${tiltSide}.`,
        mechanics: tiltSide === affected
          ? 'Inclinaison du côté atteint avec réponse concordante.'
          : 'Inclinaison opposée avec inversion du sens du nystagmus.',
        nystagmus: `Horizontal battant vers ${tiltSide}.`,
        rule: 'Upright géotropique : le sens suit l’inclinaison.'
      };
    }
    return {
      step: `Inclinaison latérale ${tiltSide}.`,
      mechanics: tiltSide === affected
        ? 'Réponse agéotropique liée au bras court ou à la cupule.'
        : 'Inversion au changement d’inclinaison.',
      nystagmus: `Horizontal battant vers ${tiltRight ? 'gauche' : 'droite'}.`,
      rule: state.variant === 'cupulo'
        ? 'Cupulolithiase : même logique agéotropique, mais nystagmus plus persistant.'
        : 'Upright agéotropique : le sens est opposé à l’inclinaison.'
    };
  }

  function renderEye(){
    const eye = getEyeModel();
    els.eyeHost.innerHTML = buildEyeSVG(eye);
    els.eyeCaption.textContent = eye.caption;
  }

  function getEyeModel(){
    const steps = getVisibleSteps();
    const current = steps[state.step];

    if (state.channel === 'post') {
      if (current === 'Assis') return { type:'none', caption:'Repos : pas de nystagmus attendu.' };
      const provoked = current !== 'Retour assis';
      const torsion = state.side === 'right'
        ? (provoked ? 'ccw' : 'cw')
        : (provoked ? 'cw' : 'ccw');
      return {
        type:'mixed',
        vertical: provoked ? 'up' : 'down',
        torsion,
        caption: provoked
          ? 'Canal postérieur : phase rapide torsionnelle avec composante verticale supérieure.'
          : 'Retour assis : inversion du nystagmus.'
      };
    }

    if (state.channel === 'ant') {
      if (current === 'Assis') return { type:'none', caption:'Repos : pas de nystagmus attendu.' };
      if (state.test === 'deephead') {
        return {
          type: current === 'Head hanging' ? 'vertical' : 'vertical',
          vertical: current === 'Head hanging' ? 'down' : 'up',
          caption: current === 'Head hanging'
            ? 'Canal antérieur : nystagmus vertical inférieur ; torsion parfois absente ou discrète.'
            : 'Retour assis : inversion possible mais inconstante.'
        };
      }
      const provoked = current !== 'Retour assis';
      const torsion = state.side === 'right'
        ? (provoked ? 'ccw' : 'cw')
        : (provoked ? 'cw' : 'ccw');
      return {
        type:'mixed',
        vertical: provoked ? 'down' : 'up',
        torsion,
        caption: provoked
          ? 'Dix-Hallpike latéralisant : downbeat avec torsion utile au côté.'
          : 'Retour assis : inversion possible, moins constante que pour le postérieur.'
      };
    }

    if ((state.test === 'bowlean' || state.test === 'upright') && (current === 'Tête droite')) {
      return { type:'none', caption:'Position de référence.' };
    }
    if (state.test === 'supineroll' && current === 'Position centrale') {
      return { type:'none', caption:'Position centrale avant comparaison droite / gauche.' };
    }
    if (state.test === 'supineroll' && current === 'Null point') {
      return { type:'none', caption:'Null point : arrêt du nystagmus recherché en cupulolithiase.' };
    }

    let dir = 'right';
    if (state.test === 'bowlean') {
      if (state.variant === 'canalo') {
        dir = current === 'Bow'
          ? (state.side === 'right' ? 'right' : 'left')
          : (state.side === 'right' ? 'left' : 'right');
      } else {
        dir = current === 'Bow'
          ? (state.side === 'right' ? 'left' : 'right')
          : (state.side === 'right' ? 'right' : 'left');
      }
    }

    if (state.test === 'supineroll') {
      if (state.variant === 'geotropic') {
        dir = current === 'Rotation droite' ? 'right' : 'left';
      } else {
        dir = current === 'Rotation droite' ? 'left' : 'right';
      }
    }

    if (state.test === 'upright') {
      if (state.variant === 'geotropic') {
        dir = current === 'Inclinaison droite' ? 'right' : 'left';
      } else {
        dir = current === 'Inclinaison droite' ? 'left' : 'right';
      }
    }

    return {
      type:'horizontal',
      horizontal: dir,
      caption:'Canal horizontal : lecture par la phase rapide.'
    };
  }

  function buildEyeSVG(model){
    const w = 250;
    const h = 240;
    const cx = 125;
    const cy = 110;
    let pupilX = cx;
    let pupilY = cy;
    let arrows = '';
    let torsionText = '';

    if (model.type === 'horizontal') {
      pupilX += model.horizontal === 'right' ? 16 : -16;
      arrows = model.horizontal === 'right'
        ? `<line x1="${cx - 32}" y1="${cy}" x2="${cx + 40}" y2="${cy}" stroke="#e11d48" stroke-width="6" stroke-linecap="round" marker-end="url(#eyeArrow)"/>`
        : `<line x1="${cx + 32}" y1="${cy}" x2="${cx - 40}" y2="${cy}" stroke="#e11d48" stroke-width="6" stroke-linecap="round" marker-end="url(#eyeArrow)"/>`;
    }

    if (model.type === 'vertical') {
      pupilY += model.vertical === 'down' ? 16 : -16;
      arrows = model.vertical === 'down'
        ? `<line x1="${cx}" y1="${cy - 32}" x2="${cx}" y2="${cy + 40}" stroke="#e11d48" stroke-width="6" stroke-linecap="round" marker-end="url(#eyeArrow)"/>`
        : `<line x1="${cx}" y1="${cy + 32}" x2="${cx}" y2="${cy - 40}" stroke="#e11d48" stroke-width="6" stroke-linecap="round" marker-end="url(#eyeArrow)"/>`;
    }

    if (model.type === 'mixed') {
      pupilY += model.vertical === 'down' ? 10 : -10;
      arrows = (model.vertical === 'down'
        ? `<line x1="${cx + 58}" y1="${cy - 16}" x2="${cx + 58}" y2="${cy + 32}" stroke="#f97316" stroke-width="5" stroke-linecap="round" marker-end="url(#eyeArrowOrange)"/>`
        : `<line x1="${cx + 58}" y1="${cy + 16}" x2="${cx + 58}" y2="${cy - 32}" stroke="#f97316" stroke-width="5" stroke-linecap="round" marker-end="url(#eyeArrowOrange)"/>`) +
        torsionArc(cx, cy, model.torsion);
      torsionText = model.torsion === 'ccw' ? 'anti-horaire' : 'horaire';
    }

    return `
      <svg viewBox="0 0 ${w} ${h}" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Sens du nystagmus">
        <defs>
          <marker id="eyeArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#e11d48"/>
          </marker>
          <marker id="eyeArrowOrange" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
            <path d="M0,0 L10,5 L0,10 Z" fill="#f97316"/>
          </marker>
        </defs>
        <text x="125" y="26" text-anchor="middle" font-size="18" font-weight="700" fill="#16324f" font-family="Inter, Arial, sans-serif">Œil</text>
        <circle cx="${cx}" cy="${cy}" r="64" fill="#fff" stroke="#9ab0c7" stroke-width="3"/>
        <circle cx="${pupilX}" cy="${pupilY}" r="24" fill="#1565c0"/>
        <circle cx="${pupilX - 7}" cy="${pupilY - 7}" r="7" fill="#fff"/>
        ${arrows}
        ${
          model.type === 'none'
            ? `<text x="125" y="198" text-anchor="middle" font-size="15" fill="#61758d" font-family="Inter, Arial, sans-serif">pas de nystagmus</text>`
            : ''
        }
        ${
          model.type === 'mixed'
            ? `<text x="125" y="200" text-anchor="middle" font-size="14" fill="#e11d48" font-family="Inter, Arial, sans-serif">torsion ${torsionText}</text>`
            : ''
        }
      </svg>
    `;
  }

  function torsionArc(cx, cy, dir){
    const ccw = dir === 'ccw';
    const start = ccw ? 0.2 * Math.PI : 0.82 * Math.PI;
    const end = ccw ? 1.34 * Math.PI : -0.34 * Math.PI;
    const r = 44;
    const x1 = cx + Math.cos(start) * r;
    const y1 = cy + Math.sin(start) * r;
    const x2 = cx + Math.cos(end) * r;
    const y2 = cy + Math.sin(end) * r;
    const largeArc = 1;
    const sweep = ccw ? 1 : 0;
    const tailX = x2 + (ccw ? 10 : -10);
    return `
      <path d="M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} ${sweep} ${x2} ${y2}" fill="none" stroke="#e11d48" stroke-width="6"/>
      <line x1="${tailX}" y1="${y2}" x2="${x2}" y2="${y2}" stroke="#e11d48" stroke-width="6" stroke-linecap="round" marker-end="url(#eyeArrow)"/>
    `;
  }

  function escapeHtml(value){
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  window.addEventListener('DOMContentLoaded', init);
})();
