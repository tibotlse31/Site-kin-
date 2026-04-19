window.COURSE_DATA = {
  channels: {
    post: {
      id: 'post',
      name: 'Canal postérieur',
      icon: '🌀',
      freq: 'Le plus fréquent',
      summary: 'Vertige rotatoire bref provoqué par certaines positions de tête, typiquement au coucher, au lever ou en se retournant dans le lit.',
      symptoms: [
        'Durée brève, souvent 20 à 30 secondes.',
        'Épuisable si la position est conservée.',
        'Reproductible, souvent déclenché au coucher ou au lever.',
        'Latence d’apparition en faveur d’une canalolithiase.'
      ],
      diagnostic: {
        tests: ['Dix-Hallpike', 'Side-Lying / Dix-Hallpike modifié si extension cervicale limitée'],
        latency: 'Présence d’une latence en faveur d’une canalolithiase.',
        nystagmus: 'Nystagmus vertical supérieur torsionnel, géotropique, avec inversion au retour assis.',
        sideRule: 'Le côté testé positif correspond au côté atteint.',
        conclusion: 'Si le test est typique, on traite par Sémont ou Épley.'
      },
      treatmentLink: ['Sémont', 'Épley'],
      restrictions: [
        'Dormir côté sain si atteinte unilatérale.',
        'Dormir demi-assis si atteinte bilatérale.',
        'Éviter les mouvements tête-corps dans le plan antéro-postérieur en position érigée.',
        'Éviter le côté atteint en position couchée.'
      ],
      redFlags: [
        'Vertige positionnel atypique sans nystagmus typique.',
        'Discordance entre intensité des symptômes et pauvreté des signes.',
        'Modification anormale de la direction, forme, fréquence ou durée du nystagmus.',
        'Ne pas multiplier les manœuvres sans réévaluation.'
      ]
    },

    horiz: {
      id: 'horiz',
      name: 'Canal horizontal',
      icon: '↔️',
      freq: 'Moins fréquent',
      summary: 'Vertiges positionnels avec nystagmus purement horizontal. Il faut déterminer la latence, la forme géotropique ou agéotropique et l’oreille atteinte.',
      symptoms: [
        'Canalolithiase : latence, nystagmus paroxystique, symptômes < 1 minute.',
        'Cupulolithiase : pas de latence, nystagmus persistant, symptômes > 1 minute tant que la position est maintenue.',
        'Forme géotropique : le nystagmus est plus intense du côté atteint.',
        'Forme agéotropique : le nystagmus est plus intense du côté sain.'
      ],
      diagnostic: {
        tests: ['Bow and Lean Test', 'Supine Roll Test', 'Upright Head Roll Test'],
        latency: 'La latence aide à distinguer canalolithiase et cupulolithiase.',
        nystagmus: 'Nystagmus horizontal géotropique ou agéotropique selon la position des otolithes. En cupulolithiase, rechercher aussi un null point.',
        sideRule: 'Géotropique : plus intense côté atteint. Agéotropique : plus intense côté sain. En cupulolithiase, le null point aide à préciser le côté atteint.',
        conclusion: 'Choisir Lempert surtout pour les formes géotropiques, Gufoni 3G pour le géotropique et Gufoni 3A pour l’agéotropique ou la cupulolithiase.'
      },
      treatmentLink: ['Lempert', 'Gufoni 3G', 'Gufoni 3A'],
      restrictions: [
        'Dormir côté sain ou sur le dos selon la stratégie choisie.',
        'Après Lempert, éviter de se pencher en avant visage parallèle au sol.',
        'Après Gufoni, dormir du côté prescrit et limiter les mouvements déclencheurs.'
      ],
      redFlags: [
        'Confondre nystagmus spontané horizontal vrai et pseudo-spontané.',
        'Oublier de rechercher un null point en cas de cupulolithiase.',
        'Choisir la manœuvre sans avoir clarifié géotropique versus agéotropique.',
        'Ne pas conclure trop vite sans comparer l’intensité droite/gauche.'
      ]
    },

    ant: {
      id: 'ant',
      name: 'Canal antérieur',
      icon: '⬇️',
      freq: 'Rare',
      summary: 'Forme plus rare, souvent dominée par un nystagmus vertical inférieur. La latéralisation peut être difficile.',
      symptoms: [
        'Ébriété ou vertige moins franc en position érigée.',
        'Amélioration possible en position couchée.',
        'Le nystagmus vertical inférieur doit toujours faire discuter un diagnostic différentiel central.'
      ],
      diagnostic: {
        tests: ['Deep Head Hanging / Straight Head Hanging', 'Dix-Hallpike avec oreille saine en bas pour latéraliser'],
        latency: 'Peut être sans latence et parfois persistant.',
        nystagmus: 'Nystagmus vertical inférieur, parfois avec composante torsionnelle utile à la latéralisation. L’inversion au retour assis est possible mais inconstante.',
        sideRule: 'Au Dix-Hallpike, la composante torsionnelle aide à identifier le côté. Au Deep Head Hanging pur, le côté peut rester non latéralisable.',
        conclusion: 'Yacovino ou Li si non latéralisable ; Kim ou Épley inversé si latéralisation claire.'
      },
      treatmentLink: ['Yacovino', 'Li', 'Kim / Épley inversé'],
      restrictions: [
        'Prudence si fragilité cervicale.',
        'Vérifier que le tableau n’évoque pas plutôt une atteinte centrale.',
        'Maintenir les temps de position sans précipitation.'
      ],
      redFlags: [
        'Downbeat nystagmus souvent plus évocateur d’une cause centrale que périphérique.',
        'Malformation de la jonction crânio-cervicale ou autre cause neurologique à éliminer.',
        'Ne pas traiter comme un canal postérieur par simple automatisme.'
      ]
    }
  },

  treatments: [
    {
      id: 'semont',
      canal: 'post',
      name: 'Manœuvre de Sémont',
      indication: 'VPPB du canal postérieur confirmé, utile notamment si mobilité cervicale limitée.',
      expected: 'Nystagmus thérapeutique torsionnel agéotropique lors de la bascule opposée, vers l’oreille haute.',
      steps: [
        'Position assise initiale, tête tournée à 45° vers le côté opposé au côté atteint.',
        'Bascule rapide et contrôlée vers le côté atteint.',
        'Après stabilisation, bascule tête et tronc à 180° vers le côté opposé avec tête orientée vers le sol.',
        'Pause de 5 à 10 minutes avant le relever sécurisé.'
      ],
      mistakes: [
        'Tête mal orientée au départ.',
        'Bascule trop lente, non libératrice.',
        'Oublier le nystagmus thérapeutique lors de la seconde position.'
      ],
      aftercare: [
        'Dormir côté sain.',
        'Limiter les mouvements du plan pitch.',
        'Relever prudemment.'
      ]
    },

    {
      id: 'epley',
      canal: 'post',
      name: 'Manœuvre d’Épley',
      indication: 'VPPB du canal postérieur confirmé.',
      expected: 'Nystagmus thérapeutique de même forme que celui de la manœuvre provocatrice, puis inversion au retour.',
      steps: [
        'Départ en position de Dix-Hallpike du côté atteint.',
        'Rotation de tête de 90° vers le côté opposé.',
        'Rotation tête et tronc encore de 90° vers le côté sain jusqu’au décubitus latéral.',
        'Retour assis en sécurité après maintien suffisant dans chaque position.'
      ],
      mistakes: [
        'Transitions trop rapides sans maintien.',
        'Mauvais ordre des positions.',
        'Répéter la manœuvre sans réévaluation.'
      ],
      aftercare: [
        'Dormir côté sain.',
        'Éviter le plan antéro-postérieur.',
        'Respecter une pause après la manœuvre.'
      ]
    },

    {
      id: 'lempert',
      canal: 'horiz',
      name: 'Barbecue de Lempert',
      indication: 'Canal horizontal surtout en forme géotropique.',
      expected: 'Inversion du nystagmus horizontal obtenu au test diagnostique.',
      steps: [
        'Décubitus dorsal, tête relevée de 30°.',
        'Rotation progressive de la tête puis du corps vers le côté sain avec pauses de 30 secondes.',
        'Passage en décubitus ventral en appui sur les avant-bras.',
        'Poursuite de la rotation jusqu’au retour assis.'
      ],
      mistakes: [
        'Tourner du mauvais côté.',
        'Oublier les pauses de maintien.',
        'Négliger la sécurité au retour assis.'
      ],
      aftercare: [
        'Dormir côté sain ou sur le dos.',
        'Relever le bord latéral de l’oreiller côté VPPB si demandé.',
        'Éviter de se pencher en avant visage parallèle au sol.'
      ]
    },

    {
      id: 'gufoni3g',
      canal: 'horiz',
      name: 'Gufoni 3G',
      indication: 'Canal horizontal géotropique : Geotropic, Good ear, Ground.',
      expected: 'Nystagmus thérapeutique inverse du nystagmus diagnostique.',
      steps: [
        'Départ assis jambes pendantes.',
        'Bascule rapide en décubitus latéral strict sur le côté sain.',
        'Rotation de tête à 90° vers la table.',
        'Maintien puis relever en conservant la rotation, avant retour tête dans l’axe.'
      ],
      mistakes: [
        'Se tromper de côté de bascule.',
        'Appui sur la caméra si équipement vidéo.',
        'Rotation de tête insuffisante.'
      ],
      aftercare: [
        'Dormir du côté prescrit après Gufoni.',
        'Éviter de se pencher en avant.'
      ]
    },

    {
      id: 'gufoni3a',
      canal: 'horiz',
      name: 'Gufoni 3A',
      indication: 'Canal horizontal agéotropique ou cupulolithiase : Apogeotropic, Affected ear, Away.',
      expected: 'Inversion du nystagmus diagnostique, parfois conversion vers une forme géotropique avant résolution.',
      steps: [
        'Départ assis.',
        'Bascule rapide en décubitus latéral strict sur le côté atteint.',
        'Rotation de tête à 90° vers le haut.',
        'Maintien puis relever en conservant la rotation avant retour neutre.'
      ],
      mistakes: [
        'Prendre le côté sain au lieu du côté atteint.',
        'Ne pas reconnaître une conversion canalaire.',
        'Confondre forme agéotropique et géotropique.'
      ],
      aftercare: [
        'Dormir du côté indiqué.',
        'Réévaluer si le nystagmus change de direction après manœuvre.'
      ]
    },

    {
      id: 'yacovino',
      canal: 'ant',
      name: 'Manœuvre de Yacovino',
      indication: 'Canal antérieur non latéralisé ou diagnostiqué au Deep Head Hanging.',
      expected: 'Nystagmus vertical inférieur avec inversion possible selon la séquence, mais non constante.',
      steps: [
        'Départ assis tête droite.',
        'Passage en straight head hanging avec hyperextension cervicale.',
        'Après épuisement du nystagmus, menton contre poitrine.',
        'Retour assis en maintenant la flexion avant redressement de tête.'
      ],
      mistakes: [
        'Aller trop vite entre les positions.',
        'Ignorer une contre-indication cervicale.',
        'Oublier que le côté n’a pas besoin d’être identifié.'
      ],
      aftercare: [
        'Surveillance clinique.',
        'Réévaluer si downbeat atypique ou persistant.'
      ]
    },

    {
      id: 'li',
      canal: 'ant',
      name: 'Manœuvre de Li',
      indication: 'Alternative pour canal antérieur sans latéralisation préalable.',
      expected: 'Poursuite de la logique de repositionnement après la position déclenchante.',
      steps: [
        'Déclenchement par straight head hanging.',
        'Bascule rapide vers un décubitus ventral face contre la table.',
        'Maintien prolongé de la position.',
        'Retour prudent à la verticale.'
      ],
      mistakes: [
        'Négliger la sécurité cervicale.',
        'Durée de maintien insuffisante.'
      ],
      aftercare: [
        'Contrôle clinique secondaire.'
      ]
    },

    {
      id: 'kim',
      canal: 'ant',
      name: 'Kim / Épley inversé',
      indication: 'Canal antérieur latéralisé au Dix-Hallpike.',
      expected: 'Séquence orientée selon le côté atteint, avec logique inverse d’un postérieur controlatéral.',
      steps: [
        'Tête orientée vers le côté sain ou selon la variante choisie.',
        'Passage couché avec hyperextension cervicale.',
        'Relevé vers position horizontale puis retour assis menton fléchi.'
      ],
      mistakes: [
        'Latéralisation erronée.',
        'Confusion avec un traitement de canal postérieur standard.'
      ],
      aftercare: [
        'Réévaluation du nystagmus de contrôle.'
      ]
    }
  ],

  checklists: {
    post: {
      diagnostic: [
        'Vérifier l’absence de nystagmus spontané au repos.',
        'Installation correcte du patient.',
        'Dix-Hallpike : rotation de tête à 45° et extension cervicale correcte.',
        'Observer la forme torsionnelle géotropique.',
        'Vérifier l’inversion au retour assis.',
        'Side-Lying / test diagnostique de Sémont si extension cervicale limitée.'
      ],
      therapeutic: [
        'Confirmer le diagnostic avant de traiter.',
        'Sémont : respecter la séquence complète et rechercher le nystagmus thérapeutique attendu.',
        'Épley : respecter les 4 positions et maintenir chaque position au moins 30 secondes.',
        'Prévoir une pause de 5 à 10 minutes avant le relever.',
        'Rappeler les consignes de sommeil et de restriction.'
      ]
    },

    horiz: {
      diagnostic: [
        'Différencier nystagmus spontané vrai et pseudo-spontané.',
        'Préciser latence et durée pour distinguer canalolithiase et cupulolithiase.',
        'Au Supine Roll Test : préciser géotropique ou agéotropique.',
        'Comparer l’intensité droite/gauche.',
        'En cupulolithiase, rechercher un null point.',
        'Utiliser Bow and Lean et Upright Head Roll si besoin pour confirmer le côté.'
      ],
      therapeutic: [
        'Choisir Lempert surtout si forme géotropique.',
        'Choisir Gufoni 3G ou 3A selon la forme.',
        'Respecter les pauses de maintien.',
        'Observer l’inversion du nystagmus thérapeutique.',
        'Donner les consignes post-manœuvre adaptées.'
      ]
    },

    ant: {
      diagnostic: [
        'Confirmer l’ébriété plus que le vertige en position érigée.',
        'Rechercher un nystagmus vertical inférieur.',
        'Utiliser la torsion éventuelle pour latéraliser.',
        'Prévoir une alternative en cas de fragilité cervicale.',
        'Rester vigilant au diagnostic différentiel central.'
      ],
      therapeutic: [
        'Choisir Yacovino ou Li si non latéralisable.',
        'Choisir Kim / Épley inversé si latéralisation claire.',
        'Respecter les temps de maintien.',
        'Sécuriser la région cervicale.'
      ]
    }
  },

  redFlags: [
    'Ne pas faire de manœuvre si le vertige positionnel est atypique et non confirmé.',
    'Ne pas multiplier les manœuvres si le résultat n’est pas satisfaisant sans réévaluation.',
    'Downbeat nystagmus : toujours penser aux causes centrales avant de conclure trop vite à un canal antérieur.',
    'Souffrance majeure avec peu de signes : rester prudent et reconsidérer le diagnostic.',
    'Ne pas encourager les auto-manœuvres comme stratégie pédagogique principale.',
    'Se méfier d’une mauvaise utilisation vidéo.',
    'Ne pas parler trop vite de fatigabilité ; penser aussi à la dispersion de l’amalgame.',
    'Penser aux faux positifs et aux vertiges au changement de position d’origine vasculaire possible.'
  ],

  cases: [
    {
      id: 'post1',
      canal: 'post',
      title: 'Cas 1 — canal postérieur droit',
      stem: 'Patient de 62 ans, vertiges rotatoires brefs au lever du lit, déclenchés quand il se couche côté droit. Dix-Hallpike droit : nystagmus torsionnel anti-horaire géotropique de courte durée.',
      prompt: 'Quel est le diagnostic ? Quelle manœuvre proposer ? Quelles consignes ?',
      answer: 'VPPB du canal vertical postérieur droit. Manœuvre d’Épley ou de Sémont à droite. Consignes : limiter les mouvements du plan pitch et dormir à gauche, donc côté sain.',
      reasoning: [
        'Vertige bref et positionnel.',
        'Dix-Hallpike positif du côté droit.',
        'Nystagmus torsionnel géotropique typique d’un postérieur.'
      ]
    },
    {
      id: 'post4',
      canal: 'post',
      title: 'Cas 4 — bilatéral à prédominance droite',
      stem: 'Patient de 68 ans, vertiges brefs déclenchés à gauche et à droite lors du coucher. Dix-Hallpike positif des deux côtés, plus marqué à droite.',
      prompt: 'Quel est le diagnostic précis ? Quelle priorité thérapeutique ? Comment gérer l’autre côté ?',
      answer: 'VPPB bilatéral à prédominance droite. Traiter d’abord le côté droit par Sémont ou Épley. Contrôler ensuite ; si le côté gauche reste positif, le traiter secondairement, classiquement une semaine plus tard. Sommeil demi-assis recommandé.',
      reasoning: [
        'Positivité bilatérale.',
        'Intensité plus marquée à droite = priorité à droite.',
        'Le côté controlatéral se gère après contrôle du premier côté.'
      ]
    },
    {
      id: 'horiz9',
      canal: 'horiz',
      title: 'Cas 9 — géotropique gauche',
      stem: 'Lors du Supine Roll Test, le nystagmus est géotropique, plus intense à gauche.',
      prompt: 'Quelle oreille est atteinte ? Quelle manœuvre réalisez-vous ?',
      answer: 'Oreille gauche atteinte. Forme géotropique du canal horizontal gauche. Traitement par Gufoni côté sain, donc droite, ou Barbecue de Lempert vers la droite.',
      reasoning: [
        'Géotropique = le côté le plus intense est le côté atteint.',
        'Plus intense à gauche = gauche atteinte.'
      ]
    },
    {
      id: 'horiz10',
      canal: 'horiz',
      title: 'Cas 10 — agéotropique gauche',
      stem: 'Un patient présente un nystagmus agéotropique plus marqué à droite au Supine Roll Test.',
      prompt: 'Quel test complémentaire envisager ? Quelle oreille est atteinte ? Quelle stratégie thérapeutique ?',
      answer: 'Ajouter un Bow and Lean complémentaire. En agéotropique, le côté le plus fort est le côté sain, donc oreille gauche atteinte. Choisir Gufoni 3A à gauche.',
      reasoning: [
        'Agéotropique = côté le plus intense = côté sain.',
        'Plus fort à droite = côté sain droit, donc oreille gauche atteinte.'
      ]
    },
    {
      id: 'ant13',
      canal: 'ant',
      title: 'Cas 13 — antérieur droit',
      stem: 'Lors d’un Dix-Hallpike à gauche, le nystagmus est vertical inférieur et légèrement torsionnel anti-horaire.',
      prompt: 'Quel canal est en cause ? Quelle manœuvre réalisez-vous ?',
      answer: 'Canal antérieur droit. On peut réaliser une manœuvre de Kim ou un Épley inversé adapté.',
      reasoning: [
        'Vertical inférieur = orientation vers canal antérieur.',
        'La torsion aide ici à latéraliser.'
      ]
    },
    {
      id: 'ant15',
      canal: 'ant',
      title: 'Cas 15 — conversion canalaire',
      stem: 'Après une manœuvre d’Épley pour suspicion de canal postérieur, apparition d’un nystagmus vertical inférieur au contrôle.',
      prompt: 'Quelle conversion suspectez-vous et avec quelle manœuvre corrigez-vous ?',
      answer: 'Conversion classique vers un canal antérieur de la même oreille. Corriger par Deep Head Hanging poursuivi en Yacovino modifié, tête tournée côté sain selon le corrigé fourni.',
      reasoning: [
        'Le downbeat secondaire après Épley évoque une conversion antérieure.',
        'Il faut changer de logique thérapeutique.'
      ]
    }
  ],

  visualizer: {
    post: {
      tests: {
        dixhallpike: {
          name: 'Dix-Hallpike',
          steps: [
            {
              title: 'Départ assis',
              text: 'Tête tournée à 45° vers le côté testé. Pas de nystagmus attendu au repos.',
              nystagmus: 'Aucun nystagmus',
              shape: 'neutral'
            },
            {
              title: 'Passage couché',
              text: 'Extension cervicale. Déclenchement d’un nystagmus torsionnel vertical supérieur du côté testé s’il est atteint.',
              nystagmus: 'Torsionnel géotropique',
              shape: 'post-provoked'
            },
            {
              title: 'Retour assis',
              text: 'Inversion du nystagmus au redressement.',
              nystagmus: 'Inversion du nystagmus',
              shape: 'post-return'
            }
          ],
          interpretation: 'Test clé du canal postérieur. Le côté testé positif correspond au côté atteint.'
        }
      }
    },

    horiz: {
      tests: {
        bowlean: {
          name: 'Bow and Lean',
          steps: [
            {
              title: 'Tête droite assise',
              text: 'Observer un éventuel pseudo-spontané avant le test.',
              nystagmus: 'Base de comparaison',
              shape: 'neutral'
            },
            {
              title: 'Bow',
              text: 'Canalolithiase : le nystagmus bat vers l’oreille atteinte. Cupulolithiase : vers l’oreille saine.',
              nystagmus: 'Horizontal',
              shape: 'bow'
            },
            {
              title: 'Lean',
              text: 'Le sens s’inverse : canalolithiase vers l’oreille saine, cupulolithiase vers l’oreille atteinte.',
              nystagmus: 'Horizontal inversé',
              shape: 'lean'
            }
          ],
          interpretation: 'Sert surtout à distinguer canalolithiase et cupulolithiase et à orienter le côté atteint.'
        },
        supineroll: {
          name: 'Supine Roll Test',
          steps: [
            {
              title: 'Position centrale',
              text: 'Décubitus dorsal tête à 30° de flexion. Observation de base.',
              nystagmus: 'Base de comparaison',
              shape: 'neutral'
            },
            {
              title: 'Rotation droite',
              text: 'Comparer l’intensité et le sens du nystagmus.',
              nystagmus: 'Horizontal géotropique ou agéotropique',
              shape: 'roll-right'
            },
            {
              title: 'Rotation gauche',
              text: 'Comparer au côté opposé pour déterminer le côté atteint.',
              nystagmus: 'Horizontal géotropique ou agéotropique',
              shape: 'roll-left'
            }
          ],
          interpretation: 'Géotropique : plus intense côté atteint. Agéotropique : plus intense côté sain. En cupulolithiase, rechercher un null point.'
        },
        upright: {
          name: 'Upright Head Roll',
          steps: [
            {
              title: 'Tête droite',
              text: 'Position assise de départ.',
              nystagmus: 'Aucun ou pseudo-spontané',
              shape: 'neutral'
            },
            {
              title: 'Inclinaison latérale',
              text: 'Géotropique : le nystagmus suit l’inclinaison du côté atteint. Agéotropique : il va en sens opposé.',
              nystagmus: 'Horizontal',
              shape: 'upright'
            }
          ],
          interpretation: 'Test de confirmation utile pour préciser le côté atteint.'
        }
      }
    },

    ant: {
      tests: {
        deephead: {
          name: 'Deep Head Hanging',
          steps: [
            {
              title: 'Départ assis',
              text: 'Tête droite avant la bascule.',
              nystagmus: 'Aucun nystagmus',
              shape: 'neutral'
            },
            {
              title: 'Head hanging',
              text: 'Nystagmus vertical inférieur, parfois pur, parfois accompagné d’une faible torsion.',
              nystagmus: 'Vertical inférieur',
              shape: 'ant-provoked'
            },
            {
              title: 'Retour assis',
              text: 'Une inversion peut être observée mais elle n’est pas constante.',
              nystagmus: 'Possible inversion',
              shape: 'ant-return'
            }
          ],
          interpretation: 'Bon test d’appel du canal antérieur, mais un downbeat doit toujours faire discuter une cause centrale.'
        }
      }
    }
  }
};
