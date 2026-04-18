window.VPPBData = {
  basics: {
    anatomy: {
      title: 'Anatomie fonctionnelle',
      intro:
        "Le labyrinthe vestibulaire comprend les canaux semi-circulaires, l’utricule, le saccule et les ampoules. Les macules codent surtout les accélérations linéaires et la position par rapport à la gravité, tandis que les cupules codent les accélérations angulaires.",
      bullets: [
        "Canaux semi-circulaires : capteurs des accélérations angulaires",
        "Utricule et saccule : capteurs otolithiques",
        "Ampoule : siège de la crête ampullaire et de la cupule",
        "Macules : rôle majeur pour l’orientation et les accélérations linéaires"
      ],
      detail:
        "Les cours distinguent clairement système otolithique et système canalaire. Les macules utriculaires et sacculaires codent orientation et accélérations linéaires, tandis que les cupules des canaux semi-circulaires codent les accélérations angulaires."
    },

    orientation: {
      title: 'Orientation des canaux',
      intro:
        "Les canaux travaillent dans des plans différents. Le canal horizontal répond aux mouvements de rotation, tandis que les canaux verticaux antérieur et postérieur fonctionnent en diagonale et en paires fonctionnelles.",
      bullets: [
        "Canal horizontal : plan proche de l’horizontal clinique",
        "Canal postérieur : plan vertical oblique",
        "Canal antérieur : plan vertical oblique complémentaire",
        "Canaux verticaux : fonctionnement en couples diagonaux"
      ],
      detail:
        "Les plans et orientations des canaux sont indispensables pour comprendre pourquoi un test ou une manœuvre provoque un flux différent selon la position de tête."
    },

    ewald: {
      title: "Lois d’Ewald et lecture vestibulaire",
      intro:
        "La lecture clinique repose sur le sens de la phase lente et la règle différente entre canal horizontal et canaux verticaux.",
      bullets: [
        "Le nystagmus est défini par sa phase rapide",
        "La phase lente suit la logique vestibulaire",
        "Horizontal : ampullipète excitateur, ampullifuge inhibiteur",
        "Vertical : logique inverse"
      ],
      detail:
        "Dans les cours, la première loi rappelle que le nystagmus est nommé selon sa phase rapide. Les règles excitatrices diffèrent entre le canal horizontal et les canaux verticaux, ce qui structure toute l’interprétation des tests."
    },

    nystagmus: {
      title: 'Lire un nystagmus',
      intro:
        "La forme du nystagmus oriente d’abord vers une famille de canaux, puis le contexte, la latence, la durée et l’intensité affinent l’interprétation.",
      bullets: [
        "Horizontal : évoque surtout le canal horizontal",
        "Torsionnel + vertical supérieur : évoque le canal postérieur",
        "Vertical inférieur : évoque le canal antérieur mais impose prudence",
        "Géotropique / agéotropique : utile surtout pour le canal horizontal"
      ],
      detail:
        "Le nystagmus vertical inférieur n’est pas banal. Les cours insistent sur la prudence diagnostique devant un downbeat atypique ou mal corrélé au contexte clinique."
    }
  },

  biomechanicsCases: [
    {
      id: 'pc_right_dix',
      canal: 'posterior',
      side: 'right',
      mechanism: 'canalolithiasis',
      scenario: 'dix_hallpike_right',
      title: 'Canal postérieur droit – canalolithiase – Dix-Hallpike droit',
      summary:
        "Dans ce tableau typique, les débris du canal postérieur droit se déplacent lors du Dix-Hallpike droit et entraînent une réponse excitatrice compatible avec un nystagmus torsionnel et vertical supérieur.",
      flow: 'Ampullifuge',
      effect: 'Excitation du canal vertical concerné',
      expectedNystagmus: 'Torsionnel géotropique avec composante verticale supérieure, inversion au retour assis',
      conclusion:
        "Orientation très compatible avec un VPPB du canal postérieur droit. Une manœuvre d’Epley ou de Sémont est logique si le tableau est typique.",
      caution:
        "Si la forme, la durée ou la reproductibilité ne correspondent pas, il faut reconsidérer le diagnostic.",
      why:
        "Les cours décrivent pour le canal postérieur un nystagmus torsionnel géotropique, bref, paroxystique, épuisable, avec inversion au retour assis."
    },
    {
      id: 'pc_left_dix',
      canal: 'posterior',
      side: 'left',
      mechanism: 'canalolithiasis',
      scenario: 'dix_hallpike_left',
      title: 'Canal postérieur gauche – canalolithiase – Dix-Hallpike gauche',
      summary:
        "Le même raisonnement s’applique à gauche : mise en mouvement des débris dans le canal postérieur gauche, flux compatible avec l’excitation du canal, puis nystagmus typique du canal postérieur.",
      flow: 'Ampullifuge',
      effect: 'Excitation du canal vertical concerné',
      expectedNystagmus: 'Torsionnel géotropique avec composante verticale supérieure, inversion au retour assis',
      conclusion:
        "Orientation compatible avec un VPPB du canal postérieur gauche.",
      caution:
        "Une limitation cervicale peut amener à préférer un Side-Lying Test ou une manœuvre mieux tolérée.",
      why:
        "Le Side-Lying Test et le Dix-Hallpike sont donnés dans les supports comme tests utiles du canal postérieur."
    },
    {
      id: 'hc_left_geo_srt',
      canal: 'horizontal',
      side: 'left',
      mechanism: 'canalolithiasis_geotropic',
      scenario: 'supine_roll_test',
      title: 'Canal horizontal gauche – forme géotropique – Supine Roll Test',
      summary:
        "Dans une forme géotropique du canal horizontal, les débris libres situés dans le bras long donnent un nystagmus horizontal géotropique, en général plus intense du côté atteint.",
      flow: 'Flux variable selon la rotation ; lecture clinique centrée sur l’intensité comparative',
      effect: 'Réponse compatible avec une canalolithiase horizontale géotropique',
      expectedNystagmus: 'Horizontal géotropique en rotation droite et gauche, plus intense du côté atteint',
      conclusion:
        "Si le nystagmus est plus fort à gauche, l’oreille gauche est la plus probable.",
      caution:
        "Toujours intégrer latence, durée et cohérence entre Bow and Lean et Supine Roll Test.",
      why:
        "Les cours précisent que, dans les formes géotropiques, le nystagmus bat vers l’oreille basse et plus fortement du côté affecté."
    },
    {
      id: 'hc_left_ageo_srt',
      canal: 'horizontal',
      side: 'left',
      mechanism: 'canalolithiasis_ageotropic',
      scenario: 'supine_roll_test',
      title: 'Canal horizontal gauche – forme agéotropique – Supine Roll Test',
      summary:
        "Dans une forme agéotropique, l’intensité maximale se lit à l’opposé du côté atteint. Le nystagmus horizontal bat vers l’oreille haute.",
      flow: 'Lecture clinique indirecte, avec repérage du côté sain comme côté le plus intense',
      effect: 'Réponse compatible avec une forme agéotropique',
      expectedNystagmus: 'Horizontal agéotropique en rotation droite et gauche, plus intense côté sain',
      conclusion:
        "Si le nystagmus agéotropique est plus intense à droite, l’oreille atteinte est plutôt gauche.",
      caution:
        "Toujours distinguer canalolithiase agéotropique et cupulolithiase par la latence et la persistance.",
      why:
        "Les cours indiquent que les formes agéotropiques sont plus intenses côté sain."
    },
    {
      id: 'hc_left_bowlean_cupulo',
      canal: 'horizontal',
      side: 'left',
      mechanism: 'cupulolithiasis',
      scenario: 'bow_lean',
      title: 'Canal horizontal gauche – cupulolithiase – Bow and Lean',
      summary:
        "En cupulolithiase horizontale, l’absence de latence et la persistance du nystagmus sont des éléments majeurs. Le sens s’inverse entre BOW et LEAN.",
      flow: 'Déformation cupulaire sans cinétique libre typique d’une canalolithiase',
      effect: 'Réponse compatible avec une cupulolithiase du canal horizontal',
      expectedNystagmus: 'Horizontal persistant, sans latence ; en BOW battant côté sain, puis inversion en LEAN',
      conclusion:
        "Le test oriente vers une cupulolithiase horizontale si le tableau est persistant et sans latence.",
      caution:
        "Ce profil doit être confronté au Supine Roll Test et à l’ensemble du contexte.",
      why:
        "Les supports distinguent clairement : canalolithiase avec latence, cupulolithiase sans latence et plus persistante."
    },
    {
      id: 'ac_indiff_dhh',
      canal: 'anterior',
      side: 'indeterminate',
      mechanism: 'canalolithiasis',
      scenario: 'deep_head_hanging',
      title: 'Canal antérieur – Deep Head Hanging',
      summary:
        "Le Deep Head Hanging peut déclencher un nystagmus vertical inférieur compatible avec un canal antérieur, mais la latéralisation est souvent plus difficile qu’au canal postérieur.",
      flow: 'Logique de canal vertical ; interprétation prudente',
      effect: 'Compatible avec une atteinte du canal antérieur',
      expectedNystagmus: 'Vertical inférieur, parfois avec composante torsionnelle peu évidente',
      conclusion:
        "Le tableau peut justifier une manœuvre de Yacovino ou de Li selon le contexte.",
      caution:
        "Un nystagmus vertical inférieur atypique ou mal cohérent impose de penser à une origine centrale.",
      why:
        "Les cours insistent sur la rareté, la difficulté diagnostique et la prudence devant un nystagmus vertical inférieur."
    }
  ],

  tests: [
    {
      id: 'dix_hallpike',
      name: 'Dix-Hallpike',
      family: 'posterior',
      selectableSides: true,
      quick:
        "Test diagnostique principal du canal postérieur. Une positivité typique oriente vers un VPPB postérieur du côté testé.",
      expected:
        "Nystagmus torsionnel géotropique avec composante verticale supérieure, bref, paroxystique, avec inversion au retour assis.",
      likely:
        "Canal postérieur du côté testé si la positivité est typique.",
      pitfalls: [
        "Atypie de forme ou de durée",
        "Discordance nette entre souffrance et signes",
        "Négativité bilatérale malgré histoire très typique : reconsidérer le test, la technique et les diagnostics alternatifs"
      ],
      why:
        "Le test reproduit le mouvement des débris dans le plan du canal postérieur. La réponse attendue est un nystagmus compatible avec cette excitation."
    },
    {
      id: 'side_lying',
      name: 'Side-Lying Test',
      family: 'posterior',
      selectableSides: true,
      quick:
        "Alternative utile quand l’extension cervicale est difficile ou mal tolérée.",
      expected:
        "Réponse proche de celle attendue au Dix-Hallpike si le canal postérieur est en cause.",
      likely:
        "Canal postérieur du côté testé dans un contexte compatible.",
      pitfalls: [
        "Mauvaise orientation de tête",
        "Bascule insuffisamment franche",
        "Confusion avec un test latéralisé sur le mauvais côté"
      ],
      why:
        "Les checklists de cours l’intègrent comme test du canal postérieur."
    },
    {
      id: 'bow_lean',
      name: 'Bow and Lean Test',
      family: 'horizontal',
      selectableSides: false,
      quick:
        "Test utile pour orienter entre canalolithiase et cupulolithiase du canal horizontal.",
      expected:
        "Canalolithiase : BOW vers l’oreille atteinte, LEAN vers l’oreille saine. Cupulolithiase : logique inverse, sans latence et plus persistant.",
      likely:
        "Horizontal, avec intérêt majeur pour le mécanisme.",
      pitfalls: [
        "Ne pas oublier la latence",
        "Ne pas lire le test isolément sans Supine Roll Test",
        "Persistance > 1 min : penser cupulolithiase ou atypie"
      ],
      why:
        "Les cours utilisent Bow and Lean comme test pivot pour différencier le mécanisme."
    },
    {
      id: 'supine_roll_test',
      name: 'Supine Roll Test / McClure',
      family: 'horizontal',
      selectableSides: false,
      quick:
        "Test majeur du canal horizontal. Il aide à reconnaître forme géotropique ou agéotropique et à en déduire le côté.",
      expected:
        "Géotropique : plus intense côté atteint. Agéotropique : plus intense côté sain.",
      likely:
        "Canal horizontal avec latéralisation selon l’intensité comparative.",
      pitfalls: [
        "Confondre côté du nystagmus et côté atteint",
        "Oublier la latence et la durée",
        "Ne pas confronter les résultats avec Bow and Lean"
      ],
      why:
        "Le Supine Roll Test est central dans l’analyse des formes horizontales."
    },
    {
      id: 'deep_head_hanging',
      name: 'Deep Head Hanging / Straight Head Hanging',
      family: 'anterior',
      selectableSides: false,
      quick:
        "Test majeur du canal antérieur quand on recherche un nystagmus vertical inférieur.",
      expected:
        "Nystagmus vertical inférieur, parfois avec composante torsionnelle discrète.",
      likely:
        "Canal antérieur, mais la latéralisation est souvent délicate.",
      pitfalls: [
        "Vertical inférieur atypique = prudence diagnostique",
        "Ne pas oublier les causes centrales",
        "Ne pas sur-latéraliser un tableau peu net"
      ],
      why:
        "Les cours soulignent la rareté du canal antérieur et la prudence devant ce type de nystagmus."
    }
  ],

  maneuvers: [
    {
      id: 'epley',
      name: 'Epley',
      family: 'posterior',
      selectableSides: true,
      indication: 'Canal postérieur typique',
      goal:
        "Ramener progressivement les débris du canal postérieur vers l’utricule par une séquence positionnelle logique.",
      steps: [
        "Position initiale compatible avec le côté atteint",
        "Mise en décubitus avec position provocatrice",
        "Rotation progressive de la tête",
        "Rotation tête + tronc",
        "Retour assis contrôlé"
      ],
      expected:
        "Nystagmus thérapeutique compatible avec la logique de vidange du canal postérieur.",
      precautions: [
        "Respecter la séquence et les temps",
        "Pause après la manœuvre",
        "Consignes post-manœuvre selon le contexte"
      ]
    },
    {
      id: 'semont',
      name: 'Sémont',
      family: 'posterior',
      selectableSides: true,
      indication: 'Canal postérieur typique, notamment si certaines contraintes cervicales limitent',
      goal:
        "Utiliser un basculement rapide contrôlé pour mobiliser puis évacuer les débris du canal postérieur.",
      steps: [
        "Rotation de tête vers le côté opposé au côté atteint",
        "Bascule rapide vers le côté atteint",
        "Repositionnement strict en décubitus latéral",
        "Bascule à 180° vers l’autre côté",
        "Retour assis sécurisé"
      ],
      expected:
        "Le déroulé cherche à faire migrer les débris jusqu’au vestibule.",
      precautions: [
        "Sécuriser le patient",
        "Respecter le plan du canal",
        "Contrôler après un délai adapté"
      ]
    },
    {
      id: 'lempert',
      name: 'Lempert / BBQ',
      family: 'horizontal',
      selectableSides: true,
      indication: 'Canal horizontal géotropique',
      goal:
        "Faire progresser les débris le long du canal horizontal jusqu’à l’utricule par rotations successives.",
      steps: [
        "Départ en décubitus dorsal tête fléchie",
        "Rotations successives par étapes",
        "Progression jusqu’au côté sain",
        "Poursuite de la séquence jusqu’au retour"
      ],
      expected:
        "Nystagmus thérapeutique d’inversion possible selon le déplacement des débris.",
      precautions: [
        "Bien identifier la forme géotropique",
        "Éviter les rotations imprécises",
        "Réévaluer après la manœuvre"
      ]
    },
    {
      id: 'gufoni_3g',
      name: 'Gufoni 3G',
      family: 'horizontal',
      selectableSides: true,
      indication: 'Canal horizontal géotropique',
      goal:
        "Utiliser une logique de bascule latérale et de rotation de tête adaptée à la forme géotropique.",
      steps: [
        "Bascule en décubitus latéral strict",
        "Rotation de tête vers le sol",
        "Maintien",
        "Retour assis en gardant le contrôle"
      ],
      expected:
        "Réponse compatible avec une migration vers l’utricule.",
      precautions: [
        "Bien respecter la forme géotropique",
        "Conserver la cohérence côté / séquence"
      ]
    },
    {
      id: 'gufoni_3a',
      name: 'Gufoni 3A',
      family: 'horizontal',
      selectableSides: true,
      indication: 'Canal horizontal agéotropique ou cupulolithiase',
      goal:
        "Adapter la direction de tête à la logique agéotropique afin de détacher ou faire progresser les débris.",
      steps: [
        "Bascule en décubitus latéral strict",
        "Rotation de tête vers le haut",
        "Maintien",
        "Retour assis contrôlé"
      ],
      expected:
        "Peut transformer ou résoudre une forme agéotropique selon le mécanisme.",
      precautions: [
        "Confronter avec le mécanisme suspecté",
        "Réévaluer après la manœuvre"
      ]
    },
    {
      id: 'yacovino',
      name: 'Yacovino',
      family: 'anterior',
      selectableSides: false,
      indication: 'Canal antérieur, surtout si le côté n’est pas clairement identifié',
      goal:
        "Traiter une atteinte du canal antérieur sans nécessiter forcément une latéralisation préalable.",
      steps: [
        "Départ tête droite en position assise",
        "Passage en Deep Head Hanging",
        "Après épuisement, menton poitrine",
        "Retour assis contrôlé"
      ],
      expected:
        "Logique de recentrage des débris depuis le canal antérieur.",
      precautions: [
        "Prudence si vertical inférieur atypique",
        "Toujours relier au tableau clinique global"
      ]
    },
    {
      id: 'li',
      name: 'Li',
      family: 'anterior',
      selectableSides: false,
      indication: 'Canal antérieur',
      goal:
        "Prolonger la logique du Deep Head Hanging par un passage ventral favorisant la progression des débris.",
      steps: [
        "Déclenchement en position provocatrice",
        "Bascule rapide vers l’avant",
        "Maintien en position ventrale",
        "Retour contrôlé"
      ],
      expected:
        "Alternative utile au Yacovino selon le contexte.",
      precautions: [
        "Sécuriser la cervicale et les appuis",
        "Rester prudent sur la latéralisation"
      ]
    }
  ],

  reasoningRules: [
    {
      nystagmusFamily: 'torsion_upbeat',
      latency: 'present',
      duration: 'short',
      reversal: 'present',
      intensitySide: 'tested_side',
      result:
        "Profil très compatible avec un VPPB du canal postérieur du côté testé. La manœuvre logique est Epley ou Sémont si le tableau est typique."
    },
    {
      nystagmusFamily: 'horizontal_geotropic',
      latency: 'present',
      duration: 'short',
      reversal: 'variable',
      intensitySide: 'stronger_side_affected',
      result:
        "Profil compatible avec une canalolithiase horizontale géotropique. Le côté où le nystagmus est le plus intense est le plus probable. Lempert ou Gufoni 3G deviennent logiques."
    },
    {
      nystagmusFamily: 'horizontal_ageotropic',
      latency: 'none_or_minimal',
      duration: 'persistent',
      reversal: 'variable',
      intensitySide: 'stronger_side_healthy',
      result:
        "Profil compatible avec une forme agéotropique horizontale, souvent cupulolithiase ou canalolithiase agéotropique. Le côté atteint est plutôt opposé au côté le plus intense."
    },
    {
      nystagmusFamily: 'downbeat',
      latency: 'variable',
      duration: 'variable',
      reversal: 'variable',
      intensitySide: 'uncertain',
      result:
        "Peut évoquer un canal antérieur, mais la prudence est indispensable. Il faut toujours garder à l’esprit une cause centrale devant un vertical inférieur atypique."
    }
  ],

  clinicalCases: [
    {
      id: 'case_1',
      title: 'Cas 1 — canal postérieur droit typique',
      stem:
        "Patient de 62 ans, vertiges brefs au lever du lit, déclenchés quand il se couche côté droit. Dix-Hallpike droit : nystagmus torsionnel anti-horaire géotropique de courte durée.",
      answer:
        "Orientation vers un VPPB du canal postérieur droit. Une manœuvre d’Epley ou de Sémont est logique. Consigne habituelle : dormir côté sain selon le contexte clinique."
    },
    {
      id: 'case_10',
      title: 'Cas 10 — horizontal agéotropique',
      stem:
        "Au Supine Roll Test, le nystagmus est agéotropique plus marqué à droite.",
      answer:
        "Le côté atteint est plutôt gauche. Un Bow and Lean aide à confirmer le mécanisme et la latéralisation. Une stratégie de Gufoni 3A côté atteint devient cohérente."
    },
    {
      id: 'case_14',
      title: 'Cas 14 — vertical inférieur pur',
      stem:
        "Le patient présente un nystagmus vertical inférieur pur lors d’un Deep Head Hanging.",
      answer:
        "Hypothèse de canal antérieur, souvent difficile à latéraliser. Une manœuvre de Yacovino est logique, mais la prudence diagnostique reste importante."
    }
  ],

  redFlags: [
    "Nystagmus vertical inférieur atypique ou mal corrélé au contexte",
    "Tableau non paroxystique ou trop prolongé",
    "Changement anormal de direction, de forme ou de durée",
    "Discordance marquée entre souffrance et signes objectifs",
    "Suspicion centrale ou autre diagnostic alternatif",
    "Absence de cohérence entre test, latence, durée et réponse attendue"
  ]
};
