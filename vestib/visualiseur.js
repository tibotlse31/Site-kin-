(function(){
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const VIEWBOX = [0, 0, 900, 520];
  const MIRROR_X = 450;

  function deepClone(obj){
    return JSON.parse(JSON.stringify(obj));
  }

  function mirrorNumber(x){
    return 2 * MIRROR_X - x;
  }

  function mirrorCommandList(commands){
    return commands.map(cmd => {
      const out = [cmd[0]];
      for(let i = 1; i < cmd.length; i += 2){
        out.push(mirrorNumber(cmd[i]), cmd[i + 1]);
      }
      return out;
    });
  }

  function mirrorPoint(pt){
    return { ...pt, x: mirrorNumber(pt.x) };
  }

  function mirrorLine(line){
    return {
      ...line,
      x1: mirrorNumber(line.x1),
      x2: mirrorNumber(line.x2)
    };
  }

  function mirrorMap(obj){
    const out = {};
    Object.entries(obj).forEach(([key, value]) => {
      if(Array.isArray(value)){
        if(value.length && typeof value[0] === 'number'){
          out[key] = [mirrorNumber(value[0]), value[1], mirrorNumber(value[2]), value[3]];
        } else {
          out[key] = value;
        }
      } else if(value && typeof value === 'object'){
        if('x' in value){
          out[key] = mirrorPoint(value);
        } else if('x1' in value){
          out[key] = mirrorLine(value);
        } else {
          out[key] = mirrorMap(value);
        }
      } else {
        out[key] = value;
      }
    });
    return out;
  }

  function commandsToPath(commands){
    return commands.map(cmd => `${cmd[0]} ${cmd.slice(1).join(' ')}`).join(' ');
  }

  const BASE_RIGHT = {
    post: {
      id: 'post-right',
      channel: 'post',
      side: 'right',
      title: 'Canal postérieur droit',
      note: 'Schéma fixe du canal vertical postérieur droit. Le bras commun est rendu visible en supérieur ; l’ampoule est voisine de l’utricule.',
      canalCommands: [
        ['M', 545, 120],
        ['C', 430, 145, 330, 250, 332, 380],
        ['C', 336, 456, 420, 496, 532, 468],
        ['C', 604, 448, 652, 382, 664, 308]
      ],
      commonLink: { x1: 545, y1: 120, x2: 736, y2: 286 },
      ampullaryLink: { x1: 664, y1: 308, x2: 732, y2: 342 },
      utricle: { x: 760, y: 320, rx: 36, ry: 28 },
      ampulla: { x: 664, y: 308, r: 20 },
      cupula: { x1: 645, y1: 289, x2: 650, y2: 326 },
      labels: {
        utricle: { x: 760, y: 366, text: 'Utricule' },
        ampulla: { x: 700, y: 280, text: 'Ampoule' },
        common: { x: 522, y: 96, text: 'Bras commun' }
      },
      slots: {
        rest: { x: 706, y: 336 },
        active: { x: 455, y: 240 },
        return: { x: 575, y: 390 }
      },
      flows: {
        ampullifuge: { x1: 646, y1: 322, x2: 468, y2: 244, label: 'ampullifuge' },
        ampullipete: { x1: 468, y1: 244, x2: 646, y2: 322, label: 'ampullipète' }
      }
    },

    ant: {
      id: 'ant-right',
      channel: 'ant',
      side: 'right',
      title: 'Canal antérieur droit',
      note: 'Schéma fixe du canal vertical antérieur droit. Le bras commun est supérieur ; l’ampoule est au voisinage de l’utricule.',
      canalCommands: [
        ['M', 545, 120],
        ['C', 430, 92, 318, 128, 300, 225],
        ['C', 286, 300, 344, 360, 450, 358],
        ['C', 560, 354, 636, 332, 664, 288]
      ],
      commonLink: { x1: 545, y1: 120, x2: 738, y2: 278 },
      ampullaryLink: { x1: 664, y1: 288, x2: 734, y2: 318 },
      utricle: { x: 760, y: 300, rx: 36, ry: 28 },
      ampulla: { x: 664, y: 288, r: 20 },
      cupula: { x1: 644, y1: 272, x2: 651, y2: 307 },
      labels: {
        utricle: { x: 760, y: 346, text: 'Utricule' },
        ampulla: { x: 700, y: 260, text: 'Ampoule' },
        common: { x: 522, y: 96, text: 'Bras commun' }
      },
      slots: {
        rest: { x: 706, y: 308 },
        active: { x: 430, y: 166 },
        return: { x: 560, y: 305 }
      },
      flows: {
        ampullifuge: { x1: 646, y1: 300, x2: 446, y2: 176, label: 'ampullifuge' },
        ampullipete: { x1: 446, y1: 176, x2: 646, y2: 300, label: 'ampullipète' }
      }
    },

    horiz: {
      id: 'horiz-right',
      channel: 'horiz',
      side: 'right',
      title: 'Canal horizontal droit',
      note: 'Schéma fixe du canal horizontal droit. Le bras long occupe la grande boucle ; le bras court est voisin de l’ampoule ; la cupule est matérialisée au versant ampullaire.',
      canalCommands: [
        ['M', 680, 235],
        ['C', 640, 152, 540, 112, 420, 122],
        ['C', 282, 134, 190, 216, 190, 260],
        ['C', 190, 320, 290, 398, 438, 398],
        ['C', 550, 398, 640, 354, 680, 286]
      ],
      utricleTopLink: { x1: 680, y1: 235, x2: 742, y2: 238 },
      utricleBottomLink: { x1: 680, y1: 286, x2: 742, y2: 282 },
      utricle: { x: 770, y: 260, rx: 32, ry: 24 },
      ampulla: { x: 692, y: 260, r: 20 },
      cupula: { x1: 674, y1: 232, x2: 674, y2: 288 },
      labels: {
        utricle: { x: 770, y: 302, text: 'Utricule' },
        ampulla: { x: 734, y: 220, text: 'Ampoule' },
        longArm: { x: 330, y: 106, text: 'Bras long' },
        shortArm: { x: 642, y: 330, text: 'Bras court' }
      },
      slots: {
        rest: { x: 716, y: 294 },
        longFar: { x: 246, y: 260 },
        longMid: { x: 396, y: 138 },
        longNear: { x: 575, y: 154 },
        short: { x: 632, y: 326 },
        cupula: { x: 676, y: 260 }
      },
      nullPoint: {
        cx: 660,
        cy: 260,
        rx: 44,
        ry: 76,
        label: { x: 590, y: 375, text: 'Null point 30–40°' }
      },
      flows: {
        longTowardAmpulla: { x1: 250, y1: 300, x2: 664, y2: 266, label: 'ampullipète' },
        longAwayAmpulla: { x1: 664, y1: 266, x2: 250, y2: 300, label: 'ampullifuge' },
        shortTowardAmpulla: { x1: 620, y1: 334, x2: 676, y2: 274, label: 'ampullipète' },
        shortAwayAmpulla: { x1: 676, y1: 274, x2: 620, y2: 334, label: 'ampullifuge' },
        cupulaTowardCanal: { x1: 720, y1: 260, x2: 640, y2: 228, label: 'déflexion vers le canal' },
        cupulaTowardUtricle: { x1: 640, y1: 292, x2: 720, y2: 260, label: 'déflexion vers l’utricule' }
      }
    }
  };

  function mirrorTemplate(base){
    const tpl = deepClone(base);
    tpl.id = `${base.channel}-left`;
    tpl.side = 'left';
    tpl.title = tpl.title.replace('droit', 'gauche');
    tpl.canalCommands = mirrorCommandList(base.canalCommands);
    ['commonLink', 'ampullaryLink', 'utricleTopLink', 'utricleBottomLink', 'cupula'].forEach(key => {
      if(base[key]) tpl[key] = mirrorLine(base[key]);
    });
    tpl.utricle = mirrorPoint(base.utricle);
    tpl.ampulla = mirrorPoint(base.ampulla);
    tpl.labels = mirrorMap(base.labels);
    tpl.slots = mirrorMap(base.slots);
    tpl.flows = mirrorMap(base.flows);
    if(base.nullPoint) tpl.nullPoint = mirrorMap(base.nullPoint);
    return tpl;
  }

  const TEMPLATES = {
    'post-right': BASE_RIGHT.post,
    'post-left': mirrorTemplate(BASE_RIGHT.post),
    'ant-right': BASE_RIGHT.ant,
    'ant-left': mirrorTemplate(BASE_RIGHT.ant),
    'horiz-right': BASE_RIGHT.horiz,
    'horiz-left': mirrorTemplate(BASE_RIGHT.horiz)
  };

  const TESTS = {
    post: {
      dixhallpike: {
        id: 'dixhallpike',
        label: 'Dix-Hallpike',
        caption: 'Test clé du canal postérieur. Le côté testé positif correspond au côté atteint.',
        variantOptions: [],
        buildSteps(side){
          return [
            {
              title: 'Position initiale',
              nystagmus: 'Aucun nystagmus attendu au repos.',
              text: 'Patient assis. Tête tournée à 45° vers le côté testé.',
              particle: 'rest',
              flow: null,
              eye: { type: 'none' }
            },
            {
              title: 'Passage couché',
              nystagmus: `Nystagmus vertical supérieur torsionnel ${side === 'right' ? 'anti-horaire' : 'horaire'}, géotropique.`,
              text: 'Extension cervicale avec maintien de la tête à 45°. Dans un canal postérieur atteint, la logique attendue est ampullifuge.',
              particle: 'active',
              flow: 'ampullifuge',
              eye: { type: 'torsion', dir: side === 'right' ? 'ccw' : 'cw', vertical: 'up' }
            },
            {
              title: 'Retour assis',
              nystagmus: 'Inversion du nystagmus au redressement.',
              text: 'Le retour inverse la migration. On attend une réponse opposée à la phase déclenchante.',
              particle: 'return',
              flow: 'ampullipete',
              eye: { type: 'torsion', dir: side === 'right' ? 'cw' : 'ccw', vertical: 'down' }
            }
          ];
        },
        interpretation(side){
          return {
            title: 'Lecture clinique',
            body: `Dans le canal postérieur ${side === 'right' ? 'droit' : 'gauche'}, la provocation typique associe latence, nystagmus torsionnel géotropique et inversion au retour assis.`,
            notes: [
              'Ampoule au voisinage de l’utricule.',
              'Bras commun visible en supérieur.',
              'Logique excitatrice des canaux verticaux : ampullifuge.'
            ]
          };
        }
      },

      sidelying: {
        id: 'sidelying',
        label: 'Side-Lying / Dix-Hallpike modifié',
        caption: 'Alternative utile si l’extension cervicale est limitée.',
        variantOptions: [],
        buildSteps(side){
          return [
            {
              title: 'Position initiale',
              nystagmus: 'Aucun nystagmus attendu au repos.',
              text: 'Patient assis. Tête tournée à 45° du côté opposé au côté testé.',
              particle: 'rest',
              flow: null,
              eye: { type: 'none' }
            },
            {
              title: 'Bascule en décubitus latéral',
              nystagmus: `Réponse attendue identique au Dix-Hallpike : vertical supérieur torsionnel ${side === 'right' ? 'anti-horaire' : 'horaire'} si le côté est atteint.`,
              text: 'La logique canal postérieur reste la même, mais la prise de position est moins exigeante pour le rachis cervical.',
              particle: 'active',
              flow: 'ampullifuge',
              eye: { type: 'torsion', dir: side === 'right' ? 'ccw' : 'cw', vertical: 'up' }
            },
            {
              title: 'Retour assis',
              nystagmus: 'Inversion du nystagmus.',
              text: 'Le redressement refait migrer l’amalgame en sens opposé.',
              particle: 'return',
              flow: 'ampullipete',
              eye: { type: 'torsion', dir: side === 'right' ? 'cw' : 'ccw', vertical: 'down' }
            }
          ];
        },
        interpretation(side){
          return {
            title: 'Lecture clinique',
            body: `Même logique que le Dix-Hallpike pour un canal postérieur ${side === 'right' ? 'droit' : 'gauche'}, mais avec une contrainte cervicale moindre.`,
            notes: [
              'Tête à 45° opposée au côté testé avant la bascule.',
              'Nystagmus attendu de même forme que le Dix-Hallpike.',
              'L’inversion au retour assis reste recherchée.'
            ]
          };
        }
      }
    },

    horiz: {
      bowlean: {
        id: 'bowlean',
        label: 'Bow and Lean',
        caption: 'Test surtout utile pour distinguer canalolithiase et cupulolithiase, puis orienter le côté atteint.',
        variantOptions: [
          { id: 'canalo', label: 'Canalolithiase' },
          { id: 'cupulo', label: 'Cupulolithiase' }
        ],
        buildSteps(side, variant){
          const affected = side === 'right' ? 'droite' : 'gauche';
          const healthy = side === 'right' ? 'gauche' : 'droite';
          if(variant === 'cupulo'){
            return [
              {
                title: 'Tête droite',
                nystagmus: 'Chercher un pseudo-spontané, sans conclure trop vite.',
                text: 'Position assise de référence.',
                particle: 'cupula',
                flow: null,
                eye: { type: 'none' }
              },
              {
                title: 'Bow',
                nystagmus: `Cupulolithiase : battement vers l’oreille saine (${healthy}).`,
                text: 'La cupule alourdie se déforme vers le canal ; il n’y a pas de latence attendue et la réponse peut persister.',
                particle: 'cupula',
                flow: 'cupulaTowardCanal',
                eye: { type: 'horizontal', dir: side === 'right' ? 'left' : 'right' }
              },
              {
                title: 'Lean',
                nystagmus: `Inversion : battement vers l’oreille atteinte (${affected}).`,
                text: 'La déflexion cupulaire s’inverse vers l’utricule.',
                particle: 'cupula',
                flow: 'cupulaTowardUtricle',
                eye: { type: 'horizontal', dir: side === 'right' ? 'right' : 'left' }
              }
            ];
          }

          return [
            {
              title: 'Tête droite',
              nystagmus: 'Chercher un pseudo-spontané puis comparer avec Bow et Lean.',
              text: 'Position assise de référence.',
              particle: 'rest',
              flow: null,
              eye: { type: 'none' }
            },
            {
              title: 'Bow',
              nystagmus: `Canalolithiase : battement vers l’oreille atteinte (${affected}).`,
              text: 'Logique clinique du cours : la flexion déclenche un flux ampullipète excitateur dans l’horizontal atteint.',
              particle: 'longMid',
              flow: 'longTowardAmpulla',
              eye: { type: 'horizontal', dir: side === 'right' ? 'right' : 'left' }
            },
            {
              title: 'Lean',
              nystagmus: `Inversion : battement vers l’oreille saine (${healthy}).`,
              text: 'La logique s’inverse en extension.',
              particle: 'longFar',
              flow: 'longAwayAmpulla',
              eye: { type: 'horizontal', dir: side === 'right' ? 'left' : 'right' }
            }
          ];
        },
        interpretation(side, variant){
          return {
            title: 'Lecture clinique',
            body: variant === 'cupulo'
              ? `En cupulolithiase du canal horizontal ${side === 'right' ? 'droit' : 'gauche'}, le Bow bat vers l’oreille saine et le Lean s’inverse vers l’oreille atteinte.`
              : `En canalolithiase horizontale ${side === 'right' ? 'droite' : 'gauche'}, le Bow bat vers l’oreille atteinte et le Lean vers l’oreille saine.`,
            notes: [
              'Horizontal : logique excitatrice ampullipète.',
              'La latence aide à distinguer canalolithiase et cupulolithiase.',
              'En cas d’agéotropique ou de doute, confirmer par Supine Roll Test et Upright Head Roll.'
            ]
          };
        }
      },

      supineroll: {
        id: 'supineroll',
        label: 'Supine Roll Test',
        caption: 'Le SRT précise la forme géotropique / agéotropique et la règle de côté.',
        variantOptions: [
          { id: 'geotropic', label: 'Géotropique — bras long' },
          { id: 'ageotropic', label: 'Agéotropique — bras court' },
          { id: 'cupulo', label: 'Cupulolithiase' }
        ],
        buildSteps(side, variant){
          const towardRight = variant === 'geotropic' ? 'right' : 'left';
          const towardLeft = variant === 'geotropic' ? 'left' : 'right';
          const rightStrong = (variant === 'geotropic' && side === 'right') || (variant !== 'geotropic' && side === 'left');
          const leftStrong = (variant === 'geotropic' && side === 'left') || (variant !== 'geotropic' && side === 'right');

          return [
            {
              title: 'Décubitus dorsal, tête à 30°',
              nystagmus: variant === 'cupulo'
                ? 'Chercher aussi le null point en limitant la rotation à 30–40°.'
                : 'Position de référence avant roulis droit puis gauche.',
              text: 'La lecture compare sens et intensité droite / gauche.',
              particle: variant === 'cupulo' ? 'cupula' : 'rest',
              flow: null,
              showNullPoint: variant === 'cupulo',
              eye: { type: 'none' }
            },
            {
              title: 'Rotation à droite',
              nystagmus: `${variant === 'geotropic' ? 'Géotropique' : 'Agéotropique'} : battement ${towardRight === 'right' ? 'vers la droite' : 'vers la gauche'}${rightStrong ? ' — plus intense' : ''}.`,
              text: variant === 'geotropic'
                ? (side === 'right'
                    ? 'Rotation du côté atteint : flux ampullipète, réponse plus forte.'
                    : 'Rotation du côté opposé : flux ampullifuge, réponse plus faible.')
                : (side === 'right'
                    ? 'Forme agéotropique droite : rotation droite avec logique ampullifuge.'
                    : 'Forme agéotropique gauche : rotation droite avec logique ampullipète.'),
              particle: variant === 'geotropic' ? (side === 'right' ? 'longNear' : 'longFar') : (variant === 'ageotropic' ? 'short' : 'cupula'),
              flow: variant === 'geotropic'
                ? (side === 'right' ? 'longTowardAmpulla' : 'longAwayAmpulla')
                : (variant === 'ageotropic'
                    ? (side === 'right' ? 'shortAwayAmpulla' : 'shortTowardAmpulla')
                    : (side === 'right' ? 'cupulaTowardCanal' : 'cupulaTowardUtricle')),
              eye: { type: 'horizontal', dir: towardRight }
            },
            {
              title: 'Rotation à gauche',
              nystagmus: `${variant === 'geotropic' ? 'Géotropique' : 'Agéotropique'} : battement ${towardLeft === 'left' ? 'vers la gauche' : 'vers la droite'}${leftStrong ? ' — plus intense' : ''}.`,
              text: variant === 'geotropic'
                ? (side === 'left'
                    ? 'Rotation du côté atteint : flux ampullipète, réponse plus forte.'
                    : 'Rotation du côté opposé : flux ampullifuge, réponse plus faible.')
                : (side === 'left'
                    ? 'Forme agéotropique gauche : rotation gauche avec logique ampullifuge.'
                    : 'Forme agéotropique droite : rotation gauche avec logique ampullipète.'),
              particle: variant === 'geotropic' ? (side === 'left' ? 'longNear' : 'longFar') : (variant === 'ageotropic' ? 'short' : 'cupula'),
              flow: variant === 'geotropic'
                ? (side === 'left' ? 'longTowardAmpulla' : 'longAwayAmpulla')
                : (variant === 'ageotropic'
                    ? (side === 'left' ? 'shortAwayAmpulla' : 'shortTowardAmpulla')
                    : (side === 'left' ? 'cupulaTowardCanal' : 'cupulaTowardUtricle')),
              eye: { type: 'horizontal', dir: towardLeft }
            }
          ];
        },
        interpretation(side, variant){
          const form = variant === 'geotropic'
            ? 'Géotropique = le côté du nystagmus le plus intense est le côté atteint.'
            : 'Agéotropique = le côté du nystagmus le plus intense est le côté sain.';
          return {
            title: 'Lecture clinique',
            body: `${form} Ici, l’oreille retenue est la ${side === 'right' ? 'droite' : 'gauche'}.`,
            notes: [
              variant === 'geotropic' ? 'Otoconies dans le bras long du canal.' : (variant === 'ageotropic' ? 'Otoconies libres dans le bras court.' : 'Cupulolithiase : particules adhérentes à la cupule.'),
              'Le null point est conservé en cupulolithiase.',
              'Horizontal : ampullipète excitateur, ampullifuge inhibiteur.'
            ]
          };
        }
      },

      upright: {
        id: 'upright',
        label: 'Upright Head Roll',
        caption: 'Test assis utile pour confirmer la latéralisation.',
        variantOptions: [
          { id: 'geotropic', label: 'Géotropique — bras long' },
          { id: 'ageotropic', label: 'Agéotropique — bras court' },
          { id: 'cupulo', label: 'Cupulolithiase' }
        ],
        buildSteps(side, variant){
          const tiltAffected = side;
          const tiltHealthy = side === 'right' ? 'left' : 'right';
          const affectedWord = side === 'right' ? 'droite' : 'gauche';
          const healthyWord = side === 'right' ? 'gauche' : 'droite';
          const geotropic = variant === 'geotropic';

          return [
            {
              title: 'Tête droite',
              nystagmus: 'Comparer à la position de repos.',
              text: 'Position assise neutre.',
              particle: variant === 'cupulo' ? 'cupula' : 'rest',
              flow: null,
              eye: { type: 'none' }
            },
            {
              title: `Inclinaison ${tiltAffected === 'right' ? 'droite' : 'gauche'}`,
              nystagmus: geotropic
                ? `Dans le géotropique, l’inclinaison du côté atteint (${affectedWord}) déclenche un battement du même côté.`
                : `Dans l’agéotropique, l’inclinaison du côté atteint (${affectedWord}) déclenche un battement côté sain (${healthyWord}).`,
              text: geotropic
                ? 'Le nystagmus suit l’inclinaison du côté atteint.'
                : 'Le nystagmus s’oppose à l’inclinaison du côté atteint.',
              particle: variant === 'geotropic' ? 'longNear' : (variant === 'ageotropic' ? 'short' : 'cupula'),
              flow: geotropic ? 'longTowardAmpulla' : (variant === 'ageotropic' ? 'shortAwayAmpulla' : 'cupulaTowardCanal'),
              eye: { type: 'horizontal', dir: geotropic ? tiltAffected : tiltHealthy }
            },
            {
              title: `Inclinaison ${tiltHealthy === 'right' ? 'droite' : 'gauche'}`,
              nystagmus: geotropic
                ? `En inclinaison opposée, le battement s’inverse vers le côté sain (${healthyWord}).`
                : `En inclinaison opposée, le battement s’inverse vers l’oreille atteinte (${affectedWord}).`,
              text: 'Toujours comparer les deux inclinaisons.',
              particle: variant === 'geotropic' ? 'longFar' : (variant === 'ageotropic' ? 'short' : 'cupula'),
              flow: geotropic ? 'longAwayAmpulla' : (variant === 'ageotropic' ? 'shortTowardAmpulla' : 'cupulaTowardUtricle'),
              eye: { type: 'horizontal', dir: geotropic ? tiltHealthy : tiltAffected }
            }
          ];
        },
        interpretation(side, variant){
          return {
            title: 'Lecture clinique',
            body: variant === 'geotropic'
              ? `Dans le géotropique ${side === 'right' ? 'droit' : 'gauche'}, le nystagmus suit l’inclinaison du côté atteint et s’inverse côté opposé.`
              : `Dans l’agéotropique / cupulaire ${side === 'right' ? 'droit' : 'gauche'}, le nystagmus est de sens opposé à l’inclinaison du côté atteint.`,
            notes: [
              'Test de confirmation, pas de remplacement du SRT.',
              'Comparer systématiquement les deux inclinaisons.',
              'En cupulolithiase, intégrer aussi le null point.'
            ]
          };
        }
      }
    },

    ant: {
      deephead: {
        id: 'deephead',
        label: 'Deep Head Hanging',
        caption: 'Test d’appel du canal antérieur. Un downbeat impose toujours une vigilance différentielle centrale.',
        variantOptions: [],
        buildSteps(side){
          return [
            {
              title: 'Position initiale',
              nystagmus: 'Aucun nystagmus attendu au repos.',
              text: 'Patient assis, tête droite.',
              particle: 'rest',
              flow: null,
              eye: { type: 'none' }
            },
            {
              title: 'Head hanging',
              nystagmus: `Nystagmus vertical inférieur, avec torsion ${side === 'right' ? 'anti-horaire' : 'horaire'} possible mais parfois discrète.`,
              text: 'Le côté peut rester non latéralisable en l’absence de torsion exploitable.',
              particle: 'active',
              flow: 'ampullifuge',
              eye: { type: 'verticalTorsion', dir: side === 'right' ? 'ccw' : 'cw', vertical: 'down' }
            },
            {
              title: 'Retour assis',
              nystagmus: 'Inversion possible, non constante.',
              text: 'Le retour peut s’accompagner d’une inversion, mais elle est moins régulière que dans le postérieur.',
              particle: 'return',
              flow: 'ampullipete',
              eye: { type: 'verticalMaybe', vertical: 'up' }
            }
          ];
        },
        interpretation(side){
          return {
            title: 'Lecture clinique',
            body: `Le canal antérieur ${side === 'right' ? 'droit' : 'gauche'} donne surtout un vertical inférieur ; la torsion éventuelle aide à la latéralisation.`,
            notes: [
              'Canal antérieur : la composante torsionnelle peut manquer.',
              'Un downbeat doit toujours faire discuter une cause centrale.',
              'Quand le côté reste indéterminé, la logique thérapeutique de Yacovino / Li reste utile.'
            ]
          };
        }
      },

      dixhallpike: {
        id: 'dixhallpike',
        label: 'Dix-Hallpike latéralisant',
        caption: 'Pour latéraliser, on place l’oreille saine en bas.',
        variantOptions: [],
        buildSteps(side){
          const tested = side === 'right' ? 'gauche' : 'droite';
          return [
            {
              title: 'Position initiale',
              nystagmus: 'Aucun nystagmus attendu au repos.',
              text: 'Patient assis. La position de provocation sera faite oreille saine en bas.',
              particle: 'rest',
              flow: null,
              eye: { type: 'none' }
            },
            {
              title: `Dix-Hallpike ${tested}`,
              nystagmus: `Nystagmus vertical inférieur avec torsion ${side === 'right' ? 'anti-horaire' : 'horaire'} du côté atteint.`,
              text: `Pour un canal antérieur ${side === 'right' ? 'droit' : 'gauche'}, la position latéralisante place l’oreille saine en bas.`,
              particle: 'active',
              flow: 'ampullifuge',
              eye: { type: 'verticalTorsion', dir: side === 'right' ? 'ccw' : 'cw', vertical: 'down' }
            },
            {
              title: 'Retour assis',
              nystagmus: 'Inversion possible, non systématique.',
              text: 'Le retour assis n’est pas aussi stéréotypé que pour le canal postérieur.',
              particle: 'return',
              flow: 'ampullipete',
              eye: { type: 'verticalMaybe', vertical: 'up' }
            }
          ];
        },
        interpretation(side){
          return {
            title: 'Lecture clinique',
            body: `Pour latéraliser un canal antérieur ${side === 'right' ? 'droit' : 'gauche'}, la position provocatrice se fait avec l’oreille saine en bas.`,
            notes: [
              'Composante verticale inférieure dominante.',
              'La torsion anti-horaire évoque l’antérieur droit ; horaire, l’antérieur gauche.',
              'Si la latéralisation reste incertaine, Deep Head Hanging puis Yacovino / Li restent préférables.'
            ]
          };
        }
      }
    }
  };

  class VestibVisualizer {
    constructor(){
      this.channel = 'post';
      this.side = 'right';
      this.testId = 'dixhallpike';
      this.variant = 'geotropic';
      this.stepIndex = 0;
      this.timer = null;

      this.host = document.getElementById('vizSvgHost');
      this.caption = document.getElementById('vizCaption');
      this.channelSelect = document.getElementById('channelSelect');
      this.testSelect = document.getElementById('testSelect');
      this.sideSelect = document.getElementById('sideSelect');
      this.variantSelect = document.getElementById('variantSelect');
      this.variantBlock = document.getElementById('variantBlock');
      this.stepButtons = document.getElementById('stepButtons');

      this.bind();
      this.initNav();
      this.populateChannels();
      this.populateTests();
      this.render();
    }

    initNav(){
      if(window.APP && typeof window.APP.pageNav === 'function'){
        window.APP.pageNav('visualiseur.html');
      }
    }

    bind(){
      this.channelSelect.addEventListener('change', e => {
        this.channel = e.target.value;
        this.stepIndex = 0;
        this.populateTests();
        this.render();
      });

      this.testSelect.addEventListener('change', e => {
        this.testId = e.target.value;
        this.stepIndex = 0;
        this.populateVariants();
        this.render();
      });

      this.sideSelect.addEventListener('change', e => {
        this.side = e.target.value;
        this.stepIndex = 0;
        this.render();
      });

      this.variantSelect.addEventListener('change', e => {
        this.variant = e.target.value;
        this.stepIndex = 0;
        this.render();
      });

      document.getElementById('prevBtn').addEventListener('click', () => {
        this.stop();
        this.stepIndex = Math.max(0, this.stepIndex - 1);
        this.render();
      });

      document.getElementById('nextBtn').addEventListener('click', () => {
        this.stop();
        this.stepIndex = Math.min(this.steps().length - 1, this.stepIndex + 1);
        this.render();
      });

      document.getElementById('playBtn').addEventListener('click', () => this.togglePlay());
      window.addEventListener('resize', () => this.render());
    }

    populateChannels(){
      this.channelSelect.innerHTML = `
        <option value="post">Canal postérieur</option>
        <option value="horiz">Canal horizontal</option>
        <option value="ant">Canal antérieur</option>
      `;
      this.channelSelect.value = this.channel;
    }

    populateTests(){
      const tests = TESTS[this.channel];
      const entries = Object.values(tests);
      this.testSelect.innerHTML = entries.map(test => `<option value="${test.id}">${test.label}</option>`).join('');
      this.testId = entries[0].id;
      this.testSelect.value = this.testId;
      this.populateVariants();
    }

    populateVariants(){
      const test = this.currentTest();
      const options = test.variantOptions || [];
      if(!options.length){
        this.variantBlock.style.display = 'none';
        this.variant = '';
        return;
      }
      this.variantBlock.style.display = 'block';
      this.variantSelect.innerHTML = options.map(opt => `<option value="${opt.id}">${opt.label}</option>`).join('');
      if(!options.find(opt => opt.id === this.variant)){
        this.variant = options[0].id;
      }
      this.variantSelect.value = this.variant;
    }

    currentTest(){
      return TESTS[this.channel][this.testId];
    }

    template(){
      return TEMPLATES[`${this.channel}-${this.side}`];
    }

    steps(){
      const test = this.currentTest();
      return test.buildSteps(this.side, this.variant);
    }

    interpretation(){
      return this.currentTest().interpretation(this.side, this.variant);
    }

    currentStep(){
      const steps = this.steps();
      return steps[Math.max(0, Math.min(this.stepIndex, steps.length - 1))];
    }

    togglePlay(){
      if(this.timer){
        this.stop();
        return;
      }
      const playBtn = document.getElementById('playBtn');
      playBtn.textContent = 'Stop';
      this.stepIndex = 0;
      this.render();
      this.timer = setInterval(() => {
        if(this.stepIndex >= this.steps().length - 1){
          this.stop();
          return;
        }
        this.stepIndex += 1;
        this.render();
      }, 2000);
    }

    stop(){
      if(this.timer){
        clearInterval(this.timer);
        this.timer = null;
      }
      document.getElementById('playBtn').textContent = 'Lire la séquence';
    }

    render(){
      const step = this.currentStep();
      const test = this.currentTest();
      const tpl = this.template();
      const interp = this.interpretation();

      this.renderStepButtons();

      this.caption.textContent = test.caption;
      this.host.innerHTML = this.buildSvg(tpl, step);

      document.getElementById('stepBox').innerHTML = `
        <span class="badge success">Étape ${this.stepIndex + 1} / ${this.steps().length}</span>
        <h2 class="h2" style="margin-top:12px">${step.title}</h2>
        <p class="lead">${step.text}</p>
        <div class="info-list" style="margin-top:12px">
          <div class="info-item"><strong>Nystagmus attendu</strong>${step.nystagmus}</div>
          <div class="info-item"><strong>Oreille atteinte</strong>${this.side === 'right' ? 'Droite' : 'Gauche'}</div>
          ${this.channel === 'horiz' && this.variant ? `<div class="info-item"><strong>Variante</strong>${this.variantLabel()}</div>` : ''}
        </div>
      `;

      document.getElementById('interpretBox').innerHTML = `
        <h2 class="h2">${interp.title}</h2>
        <p class="lead">${interp.body}</p>
        ${window.APP ? window.APP.renderList(interp.notes) : this.renderList(interp.notes)}
        <div class="note info" style="margin-top:14px"><strong>Repère anatomique</strong> ${tpl.note}</div>
      `;
    }

    variantLabel(){
      const map = {
        geotropic: 'Géotropique — bras long',
        ageotropic: 'Agéotropique — bras court',
        cupulo: 'Cupulolithiase',
        canalo: 'Canalolithiase'
      };
      return map[this.variant] || '';
    }

    renderStepButtons(){
      const steps = this.steps();
      this.stepButtons.innerHTML = steps.map((step, idx) => `
        <button class="step-chip ${idx === this.stepIndex ? 'active' : ''}" data-step="${idx}">${idx + 1}. ${step.title}</button>
      `).join('');
      this.stepButtons.querySelectorAll('[data-step]').forEach(btn => {
        btn.addEventListener('click', () => {
          this.stop();
          this.stepIndex = Number(btn.getAttribute('data-step'));
          this.render();
        });
      });
    }

    renderList(items){
      return `<ul class="plain-list">${items.map(item => `<li>${this.escape(item)}</li>`).join('')}</ul>`;
    }

    buildSvg(tpl, step){
      const path = commandsToPath(tpl.canalCommands);
      const particleMarkup = this.drawParticles(tpl, step);
      const flowMarkup = step.flow ? this.drawFlow(tpl.flows[step.flow]) : '';
      const nullPointMarkup = step.showNullPoint && tpl.nullPoint ? this.drawNullPoint(tpl.nullPoint) : '';
      const eyeMarkup = this.drawEyes(step.eye);

      return `
        <svg viewBox="${VIEWBOX.join(' ')}" width="100%" height="100%" xmlns="${SVG_NS}" aria-label="Visualiseur VPPB">
          <defs>
            <linearGradient id="canalFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#73d6cf"/>
              <stop offset="100%" stop-color="#29b7b2"/>
            </linearGradient>
            <linearGradient id="vestibFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#eef4ff"/>
              <stop offset="100%" stop-color="#d9e6ff"/>
            </linearGradient>
            <marker id="flowArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#0ea5a4"></path>
            </marker>
            <marker id="nysArrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill="#dc2626"></path>
            </marker>
            <style>
              .svg-label{font-family:Inter, "Segoe UI", Arial, sans-serif}
              .otoconia{animation:pulseDot 1.35s ease-in-out infinite}
              .flow{stroke-dasharray:9 7; animation:flowDash 2.8s linear infinite}
              @keyframes flowDash{to{stroke-dashoffset:-32}}
              @keyframes pulseDot{
                0%,100%{opacity:1}
                50%{opacity:.55}
              }
            </style>
          </defs>

          <rect x="0" y="0" width="900" height="520" fill="#f8fbff"></rect>

          <text class="svg-label" x="40" y="42" font-size="25" font-weight="800" fill="#16324f">${this.escape(tpl.title)} — ${this.escape(this.currentTest().label)}</text>
          <text class="svg-label" x="40" y="68" font-size="14" fill="#5f7288">${this.escape(step.title)}</text>

          <rect x="30" y="92" width="540" height="390" rx="22" fill="#eef5fc" stroke="#d8e5f2"></rect>
          <text class="svg-label" x="50" y="118" font-size="13" fill="#60758c">Anatomie fixe</text>

          <path d="${path}" fill="none" stroke="url(#canalFill)" stroke-width="18" stroke-linecap="round"></path>

          ${tpl.commonLink ? `<line x1="${tpl.commonLink.x1}" y1="${tpl.commonLink.y1}" x2="${tpl.commonLink.x2}" y2="${tpl.commonLink.y2}" stroke="url(#canalFill)" stroke-width="12" stroke-linecap="round"></line>` : ''}
          ${tpl.ampullaryLink ? `<line x1="${tpl.ampullaryLink.x1}" y1="${tpl.ampullaryLink.y1}" x2="${tpl.ampullaryLink.x2}" y2="${tpl.ampullaryLink.y2}" stroke="url(#canalFill)" stroke-width="12" stroke-linecap="round"></line>` : ''}
          ${tpl.utricleTopLink ? `<line x1="${tpl.utricleTopLink.x1}" y1="${tpl.utricleTopLink.y1}" x2="${tpl.utricleTopLink.x2}" y2="${tpl.utricleTopLink.y2}" stroke="url(#canalFill)" stroke-width="12" stroke-linecap="round"></line>` : ''}
          ${tpl.utricleBottomLink ? `<line x1="${tpl.utricleBottomLink.x1}" y1="${tpl.utricleBottomLink.y1}" x2="${tpl.utricleBottomLink.x2}" y2="${tpl.utricleBottomLink.y2}" stroke="url(#canalFill)" stroke-width="12" stroke-linecap="round"></line>` : ''}

          <ellipse cx="${tpl.utricle.x}" cy="${tpl.utricle.y}" rx="${tpl.utricle.rx}" ry="${tpl.utricle.ry}" fill="url(#vestibFill)" stroke="#7f90f6" stroke-width="2"></ellipse>
          <circle cx="${tpl.ampulla.x}" cy="${tpl.ampulla.y}" r="${tpl.ampulla.r}" fill="#ecd9ff" stroke="#9e5af0" stroke-width="2"></circle>
          <line x1="${tpl.cupula.x1}" y1="${tpl.cupula.y1}" x2="${tpl.cupula.x2}" y2="${tpl.cupula.y2}" stroke="#8ddfce" stroke-width="8" stroke-linecap="round"></line>

          ${Object.values(tpl.labels).map(label => `
            <text class="svg-label" x="${label.x}" y="${label.y}" text-anchor="middle" font-size="13" fill="#5f7288">${this.escape(label.text)}</text>
          `).join('')}

          ${nullPointMarkup}
          ${flowMarkup}
          ${particleMarkup}

          <rect x="600" y="92" width="270" height="390" rx="22" fill="#ffffff" stroke="#d8e5f2"></rect>
          <text class="svg-label" x="620" y="118" font-size="13" fill="#60758c">Sens du nystagmus</text>
          ${eyeMarkup}
        </svg>
      `;
    }

    drawNullPoint(np){
      return `
        <ellipse cx="${np.cx}" cy="${np.cy}" rx="${np.rx}" ry="${np.ry}" fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6 6"></ellipse>
        <text class="svg-label" x="${np.label.x}" y="${np.label.y}" font-size="12" fill="#64748b">${this.escape(np.label.text)}</text>
      `;
    }

    drawFlow(flow){
      if(!flow) return '';
      const midX = (flow.x1 + flow.x2) / 2;
      const midY = (flow.y1 + flow.y2) / 2 - 10;
      return `
        <line class="flow" x1="${flow.x1}" y1="${flow.y1}" x2="${flow.x2}" y2="${flow.y2}" stroke="#0ea5a4" stroke-width="4" stroke-linecap="round" marker-end="url(#flowArrow)"></line>
        <text class="svg-label" x="${midX}" y="${midY}" text-anchor="middle" font-size="12" font-weight="700" fill="#0f766e">${this.escape(flow.label)}</text>
      `;
    }

    drawParticles(tpl, step){
      const slot = tpl.slots[step.particle];
      if(!slot) return '';
      const dots = step.particle === 'cupula'
        ? [[0, -8, 5], [0, 8, 5], [10, 0, 4.5]]
        : [[-8, -4, 5], [7, -3, 4.5], [-2, 8, 4.5], [9, 8, 5]];
      return dots.map(([dx, dy, r]) => `
        <circle class="otoconia" cx="${slot.x + dx}" cy="${slot.y + dy}" r="${r}" fill="#dc2626" stroke="rgba(255,255,255,.9)" stroke-width="1.2"></circle>
      `).join('');
    }

    drawEyes(eye){
      const baseX = 735;
      const baseY = 244;

      if(!eye || eye.type === 'none'){
        return `
          ${this.eyeShell(baseX, baseY)}
          <text class="svg-label" x="${baseX}" y="${baseY + 115}" text-anchor="middle" font-size="14" fill="#5f7288">Pas de sens à illustrer ici</text>
        `;
      }

      if(eye.type === 'horizontal'){
        const dir = eye.dir === 'right' ? 1 : -1;
        return `
          ${this.eyeShell(baseX, baseY, dir * 18, 0)}
          ${this.arrow(baseX - dir * 70, baseY + 2, baseX + dir * 70, baseY + 2)}
          <text class="svg-label" x="${baseX}" y="${baseY + 115}" text-anchor="middle" font-size="14" fill="#5f7288">Phase rapide horizontale ${eye.dir === 'right' ? 'droite' : 'gauche'}</text>
        `;
      }

      if(eye.type === 'torsion'){
        return `
          ${this.eyeShell(baseX, baseY)}
          ${this.torsion(baseX, baseY, eye.dir)}
          ${eye.vertical ? `<text class="svg-label" x="${baseX}" y="${baseY + 92}" text-anchor="middle" font-size="13" fill="#dc2626">${eye.vertical === 'up' ? 'composante verticale supérieure' : 'composante verticale inverse'}</text>` : ''}
          <text class="svg-label" x="${baseX}" y="${baseY + 115}" text-anchor="middle" font-size="14" fill="#5f7288">Phase rapide torsionnelle ${eye.dir === 'ccw' ? 'anti-horaire' : 'horaire'}</text>
        `;
      }

      if(eye.type === 'verticalTorsion'){
        return `
          ${this.eyeShell(baseX, baseY, 0, eye.vertical === 'down' ? 16 : -16)}
          ${this.arrow(baseX, baseY - 72, baseX, baseY + 72)}
          ${this.torsion(baseX, baseY, eye.dir, 24)}
          <text class="svg-label" x="${baseX}" y="${baseY + 115}" text-anchor="middle" font-size="14" fill="#5f7288">Downbeat avec torsion ${eye.dir === 'ccw' ? 'anti-horaire' : 'horaire'}</text>
        `;
      }

      if(eye.type === 'verticalMaybe'){
        return `
          ${this.eyeShell(baseX, baseY, 0, -10)}
          <line x1="${baseX}" y1="${baseY + 58}" x2="${baseX}" y2="${baseY - 58}" stroke="#dc2626" stroke-width="4" stroke-dasharray="8 6" marker-end="url(#nysArrow)"></line>
          <text class="svg-label" x="${baseX}" y="${baseY + 115}" text-anchor="middle" font-size="14" fill="#5f7288">Inversion possible au retour assis</text>
        `;
      }

      return '';
    }

    eyeShell(x, y, pupilDx = 0, pupilDy = 0){
      return `
        <circle cx="${x}" cy="${y}" r="62" fill="#ffffff" stroke="#9ab0c7" stroke-width="2.4"></circle>
        <circle cx="${x + pupilDx}" cy="${y + pupilDy}" r="20" fill="#1565c0"></circle>
        <circle cx="${x + pupilDx - 5}" cy="${y + pupilDy - 5}" r="6" fill="#ffffff"></circle>
        <text class="svg-label" x="${x}" y="${y - 92}" text-anchor="middle" font-size="18" font-weight="700" fill="#16324f">Œil</text>
      `;
    }

    arrow(x1, y1, x2, y2){
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#dc2626" stroke-width="5" stroke-linecap="round" marker-end="url(#nysArrow)"></line>`;
    }

    torsion(x, y, dir, radius = 34){
      const ccw = dir === 'ccw';
      const start = ccw ? 0.18 * Math.PI : 0.82 * Math.PI;
      const end = ccw ? 1.34 * Math.PI : -0.34 * Math.PI;
      const x1 = x + Math.cos(start) * radius;
      const y1 = y + Math.sin(start) * radius;
      const x2 = x + Math.cos(end) * radius;
      const y2 = y + Math.sin(end) * radius;
      return `
        <path d="M ${x1} ${y1} A ${radius} ${radius} 0 1 ${ccw ? 1 : 0} ${x2} ${y2}" fill="none" stroke="#dc2626" stroke-width="5"></path>
        ${ccw ? this.arrow(x2 + 12, y2, x2, y2) : this.arrow(x2 - 12, y2, x2, y2)}
      `;
    }

    escape(value){
      return String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new VestibVisualizer();
  });
})();
