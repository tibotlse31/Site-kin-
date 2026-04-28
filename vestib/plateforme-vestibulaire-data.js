window.VESTIB_DATA = {
  "meta": {
    "title": "Plateforme vestibulaire — version finale fidèle aux cours",
    "subtitle": "Outil de raisonnement, de révision et d'entraînement construit pour rester au plus près des deux cours fournis.",
    "principles": [
      "Le cours reste la source principale : les formulations cliniques sont volontairement prudentes.",
      "L’outil n’est pas un protocole automatique : l’interrogatoire et l’examen clinique conditionnent le bilan.",
      "L’objectif pédagogique est de transformer les notions en raisonnement : hypothèse → test utile → interprétation → décision → suivi."
    ]
  },
  "nav": [
    {
      "id": "demarche",
      "icon": "🧭",
      "label": "Démarche"
    },
    {
      "id": "bilan",
      "icon": "📝",
      "label": "Bilan"
    },
    {
      "id": "bases",
      "icon": "🧠",
      "label": "Bases"
    },
    {
      "id": "tests",
      "icon": "👁️",
      "label": "Tests"
    },
    {
      "id": "pathologies",
      "icon": "🧩",
      "label": "Pathologies"
    },
    {
      "id": "reeducation",
      "icon": "🛠️",
      "label": "Rééducation"
    },
    {
      "id": "cas",
      "icon": "🧪",
      "label": "Cas"
    },
    {
      "id": "checklists",
      "icon": "✅",
      "label": "Checklists"
    }
  ],
  "safety": {
    "title": "STOP clinique : avant de rééduquer",
    "text": "Le premier tri est la sécurité. En cas de vertige aigu ou de tableau atypique, chercher les signes centraux avant toute logique de traitement.",
    "items": [
      "Céphalée inhabituelle ou douleur neurologique associée.",
      "Diplopie, dysarthrie, dysphagie, paresthésie, déficit moteur ou sensitif.",
      "Ataxie majeure, marche impossible sans appui, syndrome cérébelleux.",
      "Nystagmus vertical, multidirectionnel, gaze nystagmus ou non inhibé par fixation.",
      "Skew positif, disconjugaison oculaire, fixation impossible après stimulation.",
      "Épreuves vestibulo-spinales très disharmonieuses ou incohérentes avec le reste du tableau.",
      "Doute clinique persistant : réorientation médicale / urgence selon contexte."
    ]
  },
  "demarcheCore": [
    {
      "title": "1. Sécurité / centralité",
      "text": "Chercher ce qui sort du champ d’une rééducation simple : signes neurologiques, oculomotricité centrale, nystagmus atypique, skew, marche impossible."
    },
    {
      "title": "2. Interrogatoire",
      "text": "Identifier la nature exacte du trouble, la durée réelle de la crise, la fréquence, les déclencheurs, les signes auditifs, le contexte migraineux, viral, traumatique et les traitements."
    },
    {
      "title": "3. Capteurs et terrain",
      "text": "Ne pas tout attribuer au vestibule : vision, cochléo-vestibulaire, somatosensoriel, cognition, attention, traitements et terrain conditionnent le bilan et les exercices."
    },
    {
      "title": "4. Tests orientés",
      "text": "Choisir les tests selon l’hypothèse : HINTS seulement en syndrome vestibulaire aigu compatible, positionnel si vertige bref au lit, EVS si instabilité, RVO si oscillopsie."
    },
    {
      "title": "5. Décision prudente",
      "text": "Formuler : compatible avec, oriente vers, à confirmer, à réorienter. Éviter les conclusions catégoriques sur un seul test."
    },
    {
      "title": "6. Traitement + suivi",
      "text": "Adapter la rééducation au bilan et objectiver l’évolution : symptômes, DHI/EEV/EVA, nystagmus, prépondérance, EVS, CTSIB/SOT, tolérance neurovégétative."
    }
  ],
  "routes": [
    {
      "title": "Vertige aigu continu",
      "color": "danger",
      "goal": "Distinguer périphérique compatible et central suspect.",
      "steps": [
        [
          "Contexte",
          "Vertige continu, symptômes persistants, souvent nystagmus spontané, nausées/vomissements possibles."
        ],
        [
          "Sécurité",
          "Chercher signes neuro, céphalée inhabituelle, ataxie, oculomotricité centrale."
        ],
        [
          "HINTS complet",
          "Head Impulse + type de nystagmus + Test of Skew, interprétés ensemble."
        ],
        [
          "Central suspect",
          "HIT normal dans ce contexte, nystagmus vertical/multidirectionnel/changeant, skew positif ou signe neuro."
        ],
        [
          "Périphérique compatible",
          "HIT anormal du côté déficitaire, nystagmus unidirectionnel inhibé par fixation, skew négatif, pas de signe neuro."
        ],
        [
          "Suivi",
          "Objectiver la compensation : regard, posture, prépondérance, DHI/EEV, tolérance."
        ]
      ]
    },
    {
      "title": "Vertige positionnel bref",
      "color": "warn",
      "goal": "Identifier un VPPB typique sans manœuvrer un nystagmus atypique.",
      "steps": [
        [
          "Interrogatoire",
          "Secondes, déclenché par coucher/lever/rotation dans le lit, latence possible."
        ],
        [
          "Tests positionnels",
          "Dix-Hallpike ou Roll Test selon canal suspecté."
        ],
        [
          "Lecture VPPB",
          "Latence, paroxysme, fatigabilité, reproductibilité, inversion à la verticalisation."
        ],
        [
          "Lecture canal/côté",
          "Utiliser direction du nystagmus et lois d’Ewald : canal affecté, canalo/cupulolithiase, siège."
        ],
        [
          "Atypique",
          "Nystagmus non fatigable, persistant, vertical pur, signes neuro ou céphalée : reconsidérer centralité."
        ],
        [
          "Traitement",
          "Manœuvre adaptée uniquement si tableau compatible et diagnostic positionnel précis."
        ]
      ]
    },
    {
      "title": "Instabilité chronique / déséquilibre",
      "color": "info",
      "goal": "Lire les capteurs et l’organisation sensorielle.",
      "steps": [
        [
          "Profil",
          "Instabilité, ébriété, gêne à l’obscurité, fatigue, chutes, évitement."
        ],
        [
          "Capteurs",
          "Vision, proprioception, audition, cognition, médicaments, terrain anxieux ou neurologique."
        ],
        [
          "EVS",
          "Romberg, Fukuda, Babinski-Weil : chercher cohérence et latéralisation, pas un résultat isolé."
        ],
        [
          "Organisation",
          "CTSIB/SOT si dépendance visuelle, déficit de stratégie ou conflit sensoriel."
        ],
        [
          "Traitement",
          "Multisensoriel, substitution, conflit progressif, prévention des chutes selon profil."
        ],
        [
          "Suivi",
          "Mesurer l’amélioration vestibulo-spinale et la gêne fonctionnelle."
        ]
      ]
    },
    {
      "title": "Oscillopsie / flou aux mouvements de tête",
      "color": "info",
      "goal": "Explorer le RVO et choisir stabilisation/substitution.",
      "steps": [
        [
          "Symptôme",
          "Flou visuel à la marche ou lors des rotations rapides de tête, souvent majoré dans l’obscurité."
        ],
        [
          "Tests",
          "HIT/vHIT, acuité visuelle dynamique, EVS, recherche d’aréflexie bilatérale."
        ],
        [
          "Interprétation",
          "Saccades de rattrapage ou gain altéré = atteinte du RVO du côté testé."
        ],
        [
          "Traitement",
          "Stabilisation du regard, exercices courts répétés, substitution visuelle/proprioceptive."
        ],
        [
          "Progression",
          "Vitesse, amplitude, durée, environnement réel selon tolérance."
        ],
        [
          "Sécurité",
          "Prévenir risque de chute, surtout obscurité et terrain instable."
        ]
      ]
    },
    {
      "title": "Dépendance visuelle / PPPD / DNS",
      "color": "success",
      "goal": "Traiter le conflit sensoriel et la stratégie inadaptée.",
      "steps": [
        [
          "Déclencheurs",
          "Supermarché, foule, grands espaces, route, flux optiques, environnements mobiles."
        ],
        [
          "Bilan",
          "CTSIB/SOT : discordance sensorielle, défaut d’intégration ou prédominance sensorielle."
        ],
        [
          "Technique",
          "Optocinétique, réalité virtuelle, supports instables, leurres sensoriels, exposition graduée."
        ],
        [
          "Dosage",
          "Débuter bas, temps courts, progresser sans hypersensibiliser."
        ],
        [
          "Objectif",
          "Réhabiliter la capacité à choisir instantanément la stratégie sensorielle adaptée."
        ],
        [
          "Suivi",
          "DHI/EEV, tolérance neurovégétative, retour aux situations réelles."
        ]
      ]
    },
    {
      "title": "Signes auditifs fluctuants",
      "color": "warn",
      "goal": "Ne pas confondre crise cochléovestibulaire et rééducation standard.",
      "steps": [
        [
          "Triade",
          "Vertige de plusieurs heures + acouphènes/plénitude + hypoacousie fluctuante."
        ],
        [
          "Temporalité",
          "Crises et retour relatif entre les crises ; évolution fluctuante."
        ],
        [
          "Prudence",
          "Pas de rééducation vestibulaire en période critique."
        ],
        [
          "Hors crise",
          "Travailler selon réflectivité, séquelles d’instabilité et avis ORL."
        ],
        [
          "Suivi",
          "Fréquence des crises, état pressionnel, audition, doléances à distance."
        ],
        [
          "Éducation",
          "Informer sur fluctuation, hygiène de vie et conduite à tenir médicale."
        ]
      ]
    }
  ],
  "systematic": [
    {
      "title": "À faire très souvent",
      "items": [
        "Interrogatoire structuré.",
        "Recherche de red flags neurologiques.",
        "Observation oculomotrice minimale si vertige/instabilité.",
        "Lecture du nystagmus si présent ou VNS disponible.",
        "Évaluation de l’équilibre et de la marche si plainte d’instabilité.",
        "Mesure fonctionnelle de départ : DHI/EEV/EVA selon contexte."
      ]
    },
    {
      "title": "À faire selon contexte",
      "items": [
        "HINTS : seulement en syndrome vestibulaire aigu continu compatible.",
        "Tests positionnels : vertige bref déclenché par changements de position.",
        "HIT/vHIT : RVO, oscillopsie, déficit ou aréflexie.",
        "Romberg/Fukuda/Babinski-Weil : instabilité, latéralisation, EVS.",
        "CTSIB/SOT : dépendance visuelle, DNS, instabilité chronique.",
        "Fauteuil, optocinétique, VR : selon bilan, objectif et tolérance."
      ]
    },
    {
      "title": "À éviter",
      "items": [
        "Tout tester sans hypothèse.",
        "Utiliser HINTS pour un VPPB typique ou une plainte chronique isolée.",
        "Conclure sur un Fukuda isolé.",
        "Faire une manœuvre devant tout nystagmus positionnel.",
        "Multiplier des stimulations contradictoires dans la même séance.",
        "Surstimuler un patient très neurovégétatif."
      ]
    }
  ],
  "bilanStages": [
    {
      "title": "Bilan initial",
      "items": [
        "Identifier le problème principal du patient.",
        "Chercher une centralité ou un motif de réorientation.",
        "Formuler une hypothèse kinésithérapique prudente.",
        "Choisir les tests utiles, pas tous les tests.",
        "Quantifier le trouble de départ : symptômes, fonction, nystagmus, EVS, capteurs.",
        "Définir un objectif de traitement mesurable."
      ]
    },
    {
      "title": "Bilan intermédiaire",
      "items": [
        "Comparer symptômes et tolérance neurovégétative.",
        "Vérifier l’évolution du nystagmus ou de la prépondérance si mesurable.",
        "Reprendre les EVS et/ou CTSIB/SOT selon plainte.",
        "Adapter le dosage : intensité, durée, fréquence, environnement.",
        "Repérer stagnation, aggravation, incohérence ou apparition de signes atypiques."
      ]
    },
    {
      "title": "Bilan final / sortie",
      "items": [
        "Objectiver le progrès : DHI/EEV/EVA, équilibre, regard, tolérance, autonomie.",
        "Valider le retour aux situations problématiques.",
        "Donner consignes domicile et critères de recontact.",
        "Réorienter si prépondérance persistante, évolution défavorable ou doute diagnostique."
      ]
    }
  ],
  "bilanBlocks": [
    {
      "title": "A. Interrogatoire",
      "items": [
        "Date de début, antécédents et évolution aiguë/chronique.",
        "Nature : vertige rotatoire vrai, déséquilibre, instabilité, ébriété, oscillopsie, mal des transports.",
        "Demander : “décrivez-moi votre trouble avec un autre mot que vertige”.",
        "Circonstances : spontané, positionnel, effort/hyperpression, stress, grands espaces, fatigue.",
        "Durée réelle de la crise, distincte du retentissement sur la journée.",
        "Fréquence : crise inaugurale, itérative, calendrier possible.",
        "Signes associés : auditifs, neurovégétatifs, céphalées, migraine, cervicalgies, paresthésies, contexte viral/infectieux/traumatique.",
        "Traitements : cardiovasculaires, bêtabloquants, Cordarone, ototoxiques, traitements oncologiques."
      ],
      "tag": "fondamental"
    },
    {
      "title": "B. Capteurs sensoriels périphériques",
      "items": [
        "Visuel : cataracte, glaucome, DMLA, cécité, champ visuel, correction.",
        "Oculomoteur/orthoptique : convergence, paralysie oculomotrice, strabisme.",
        "Cochléo-vestibulaire : hypo/hyperacousie, acouphènes, cophose, appareillage, aréflexie connue.",
        "Somatosensoriel : proprioception, sensibilité profonde, neuropathies, ROT, troubles sensori-moteurs.",
        "Cognitif/attention : compréhension, double tâche, fatigabilité, stratégie."
      ],
      "tag": "terrain"
    },
    {
      "title": "C. Oculomotricité / voies centrales",
      "items": [
        "Saccades : dysmétrie, hypermétrie, hypométrie.",
        "Poursuite : doit rester lisse et homogène ; poursuite saccadée = signe central possible.",
        "Fixation excentrée : gaze nystagmus si fixation impossible.",
        "Conjugaison : les deux yeux doivent bouger ensemble ; attention à filmer les deux yeux.",
        "Skew deviation : correction verticale au cover test = signe de centralité possible.",
        "Indice de fixation oculaire : absence d’inhibition par fixation = centralité possible.",
        "Vergence : rechercher simple trouble de convergence / problème orthoptique."
      ],
      "tag": "centralité"
    },
    {
      "title": "D. VNS / nystagmus / cinétique",
      "items": [
        "Recherche d’un nystagmus spontané en première intention.",
        "Nystagmus périphérique typique : inhibé par fixation, unidirectionnel, renforcé du côté de la phase rapide.",
        "Loi d’Alexander : renforcement dans le regard orienté vers la phase rapide.",
        "Cotation degré 1/2/3 selon extension au regard médian et opposé.",
        "Positionnel : ne pas manœuvrer tout nystagmus ; chercher les critères de VPPB.",
        "ERI historique, test rotatoire sinusoïdal, HST et HIT selon matériel et objectif."
      ],
      "tag": "VNS"
    },
    {
      "title": "E. Épreuves vestibulo-spinales",
      "items": [
        "Romberg simple/sensibilisé : poids de l’entrée visuelle.",
        "Fukuda : 45 pas, yeux fermés, bras tendus ; déviation possible côté déficitaire.",
        "Babinski-Weil / marche en étoile : déviation en avançant/reculant.",
        "Lire les tests ensemble : un seul test n’est pas significatif.",
        "Harmonieux = orientation périphérique possible ; disharmonieux = reconsidérer central/mixte.",
        "Seuil indicatif : environ 30° de déviation ou cohérence de plusieurs tests du même côté."
      ],
      "tag": "EVS"
    },
    {
      "title": "F-H. Questionnaires et organisation sensorielle",
      "items": [
        "DHI : retentissement dans les activités de vie quotidienne.",
        "EEV : évaluation européenne du vertige / retentissement fonctionnel.",
        "EVA : possible mais moins adaptée car douleur souvent absente.",
        "Posturographie : objectiver équilibre statique/dynamique et suivre l’évolution.",
        "CTSIB : faible coût, sol stable/instable, yeux ouverts/fermés/vision asservie.",
        "SOT : six conditions pour isoler les entrées ; conditions 5-6 ciblent davantage le vestibulaire."
      ],
      "tag": "mesure"
    }
  ],
  "bases": [
    {
      "title": "Référentiel géocentré",
      "key": "Le système vestibulaire donne la verticale réelle et participe à la représentation spatiale.",
      "detail": "Il aide à positionner une référence égocentrée, anticiper les actions, contrôler le tonus, apprendre des tâches et s’adapter aux changements de position."
    },
    {
      "title": "RVO — réflexe vestibulo-oculaire",
      "key": "Stabilise le regard pendant les mouvements de tête.",
      "detail": "C’est la base du HIT, du vHIT, de l’acuité visuelle dynamique et des exercices de stabilisation du regard."
    },
    {
      "title": "RVC / RVS",
      "key": "Le vestibule ne contrôle pas seulement les yeux.",
      "detail": "Il influence aussi le cou et la posture via les réflexes vestibulo-cervical et vestibulo-spinal."
    },
    {
      "title": "ROC / optocinétique",
      "key": "La vision du mouvement complète le vestibule.",
      "detail": "Flux optiques, optocinétique, dépendance visuelle, PPPD, cinétoses et réalité virtuelle reposent sur cette interaction vision-mouvement."
    },
    {
      "title": "Nystagmus physiologique",
      "key": "Mouvement réflexe de recentrage du regard.",
      "detail": "Son sens est défini par la phase rapide ; il peut apparaître après rotation, puis s’inverser selon l’arrêt et la stimulation."
    },
    {
      "title": "Nystagmus pathologique",
      "key": "Il traduit une asymétrie ou une atteinte, mais se lit toujours dans le contexte.",
      "detail": "Périphérique typique : unidirectionnel, inhibé par fixation, renforcé dans le regard de la phase rapide. Central suspect : vertical, multidirectionnel, non inhibé ou gaze nystagmus."
    },
    {
      "title": "Lois d’Ewald",
      "key": "Elles relient canal, courant endolymphatique et réponse nystagmique.",
      "detail": "Elles sont indispensables pour raisonner les VPPB : canal atteint, type de lithiase et localisation du dépôt."
    },
    {
      "title": "Vertige vs dizziness",
      "key": "Le vertige vrai est rotatoire, la dizziness est plus large.",
      "detail": "Instabilité, ébriété, flottement, déséquilibre, problème de trajectoire ou perte d’équilibre ne décrivent pas toujours un vertige rotatoire."
    },
    {
      "title": "Compensation vestibulaire",
      "key": "Réorganisation centrale après déficit périphérique.",
      "detail": "La rééducation vise à réduire vertige, nystagmus, biais induit et à stabiliser regard/posture."
    },
    {
      "title": "Substitution",
      "key": "Quand le vestibule manque, on augmente l’usage vision/proprioception.",
      "detail": "Prioritaire dans l’aréflexie bilatérale et les atteintes où l’entrée vestibulaire est peu exploitable."
    },
    {
      "title": "Habituation",
      "key": "Exposition progressive à un stimulus déclenchant.",
      "detail": "Utile dans dépendance visuelle, cinétoses, PPPD et hypersensibilités, avec dosage strict pour éviter l’aggravation."
    },
    {
      "title": "Organisation sensorielle",
      "key": "Le patient doit choisir la bonne entrée sensorielle au bon moment.",
      "detail": "Le CTSIB/SOT aide à identifier prédominance, discordance ou défaut d’intégration sensorielle."
    }
  ],
  "testCategories": [
    "Tous",
    "Protocole",
    "Oculomotricité",
    "Nystagmus",
    "RVO",
    "EVS",
    "Organisation sensorielle",
    "Questionnaires",
    "Fauteuil / cinétique"
  ],
  "tests": [
    {
      "id": "hints",
      "cat": "Protocole",
      "title": "HINTS — protocole complet",
      "tags": [
        "HINTS",
        "Vertige aigu continu",
        "Centralité"
      ],
      "short": "Head Impulse + Nystagmus + Test of Skew, uniquement en syndrome vestibulaire aigu compatible.",
      "indication": "Vertige aigu continu avec symptômes persistants. À ne pas utiliser comme checklist universelle pour VPPB typique, PPPD chronique ou migraine hors contexte aigu.",
      "procedure": "Réaliser et interpréter ensemble : HIT, type de nystagmus, skew. Croiser avec signes neurologiques et oculomotricité.",
      "normal": "Profil périphérique compatible si HIT anormal du côté déficitaire, nystagmus unidirectionnel compatible, skew négatif, pas de signe neuro.",
      "abnormal": "Central suspect si HIT normal dans ce contexte, nystagmus vertical/multidirectionnel/changeant, skew positif ou signe neuro.",
      "traps": "Un composant isolé ne suffit pas ; le contexte fait la valeur du protocole.",
      "source": "Cours 2 — HINTS / syndrome aigu"
    },
    {
      "id": "saccades",
      "cat": "Oculomotricité",
      "title": "Saccades / test des deux doigts",
      "tags": [
        "Centralité"
      ],
      "short": "Recherche dysmétrie, hypermétrie, hypométrie ou lenteur des mouvements oculaires volontaires.",
      "indication": "Débrouillage central, vertige/instabilité, suspicion cérébelleuse ou voies oculogyres centrales.",
      "procedure": "Deux doigts devant le patient ; demander de passer très vite d’un côté à l’autre. Observer précision, vitesse, homogénéité.",
      "normal": "Saccades rapides, précises, symétriques.",
      "abnormal": "Dysmétrie, hyper/hypométrie, ralentissement ou irrégularité.",
      "traps": "Ne pas confondre avec un test vestibulaire périphérique ; c’est un signe central possible."
    },
    {
      "id": "poursuite",
      "cat": "Oculomotricité",
      "title": "Poursuite oculaire",
      "tags": [
        "Centralité"
      ],
      "short": "Suivi lent d’une cible.",
      "indication": "Bilan des voies centrales vestibulaires/oculomotrices.",
      "procedure": "Faire suivre un doigt ou objet horizontalement et verticalement, lentement.",
      "normal": "Poursuite lisse et homogène.",
      "abnormal": "Poursuite saccadée, asymétrique ou impossible.",
      "traps": "Âge, attention, troubles visuels et compréhension peuvent influencer."
    },
    {
      "id": "fixation",
      "cat": "Oculomotricité",
      "title": "Fixation excentrée / gaze nystagmus",
      "tags": [
        "Centralité",
        "Nystagmus"
      ],
      "short": "Recherche de stabilité du regard excentré.",
      "indication": "Suspicion centrale, bilan VNS, HINTS élargi.",
      "procedure": "Faire fixer un point central puis excentré, si possible sous VNS.",
      "normal": "Fixation stable, pas de nystagmus du regard excentré.",
      "abnormal": "Gaze nystagmus ou fixation impossible = centralité possible.",
      "traps": "Distinguer gaze nystagmus central et loi d’Alexander périphérique."
    },
    {
      "id": "conjugaison",
      "cat": "Oculomotricité",
      "title": "Conjugaison des yeux",
      "tags": [
        "SEP",
        "Centralité"
      ],
      "short": "Vérifie que les deux yeux bougent ensemble.",
      "indication": "Recherche d’ophtalmoplégie internucléaire, SEP, atteinte centrale.",
      "procedure": "Observer les deux yeux pendant mouvements horizontaux et verticaux ; filmer les deux yeux si possible.",
      "normal": "Mouvements conjugués et symétriques.",
      "abnormal": "Disconjugaison, nystagmus différent entre les yeux, limitation.",
      "traps": "Ne pas filmer un seul œil si la question porte sur la conjugaison."
    },
    {
      "id": "skew",
      "cat": "Oculomotricité",
      "title": "Test of Skew",
      "tags": [
        "HINTS",
        "Centralité"
      ],
      "short": "Recherche un désalignement vertical par cover test.",
      "indication": "Composant de HINTS en vertige aigu continu ; signe central possible selon contexte.",
      "procedure": "Couvrir/découvrir alternativement les yeux et observer une correction verticale.",
      "normal": "Pas de correction verticale.",
      "abnormal": "Correction verticale = skew positif, centralité possible.",
      "traps": "Interpréter avec tout le contexte, jamais seul."
    },
    {
      "id": "ifo",
      "cat": "Oculomotricité",
      "title": "Indice de fixation oculaire",
      "tags": [
        "Centralité",
        "VNS"
      ],
      "short": "Analyse l’effet de la fixation sur le nystagmus.",
      "indication": "Différencier inhibition par fixation et signe central.",
      "procedure": "Comparer le nystagmus avec et sans fixation selon matériel.",
      "normal": "La fixation diminue directement un nystagmus périphérique.",
      "abnormal": "Absence d’inhibition centrale par la fixation = signe central possible.",
      "traps": "Dépend du matériel ; à croiser avec VNS et oculomotricité."
    },
    {
      "id": "vergence",
      "cat": "Oculomotricité",
      "title": "Vergence / convergence",
      "tags": [
        "Vision"
      ],
      "short": "Vérifie la capacité à converger.",
      "indication": "Gêne visuelle, écrans, céphalées, doute orthoptique.",
      "procedure": "Rapprocher un crayon du nez et observer convergence/symptômes.",
      "normal": "Convergence symétrique et tolérée.",
      "abnormal": "Diplopie, rupture de convergence, inconfort important.",
      "traps": "Peut relever d’un bilan orthoptique, pas d’une atteinte vestibulaire directe."
    },
    {
      "id": "nyst-spont",
      "cat": "Nystagmus",
      "title": "Nystagmus spontané",
      "tags": [
        "VNS",
        "HINTS"
      ],
      "short": "Recherche en première intention sous VNS ou à l’œil selon matériel.",
      "indication": "Vertige aigu, déficit périphérique, suspicion centrale, suivi de compensation.",
      "procedure": "Patient assis, tête immobile, attendre l’amortissement des stimulations antérieures. Observer direction, fixation, degré, loi d’Alexander.",
      "normal": "Absence ou extinction selon récupération.",
      "abnormal": "Périphérique typique : unidirectionnel, inhibé par fixation, renforcé côté phase rapide. Central suspect : vertical, multidirectionnel, gaze, non inhibé.",
      "traps": "Tout nystagmus observé ne justifie pas une manœuvre."
    },
    {
      "id": "nyst-pos",
      "cat": "Nystagmus",
      "title": "Nystagmus de position / VPPB",
      "tags": [
        "VPPB",
        "Positionnel"
      ],
      "short": "Cherche latence, paroxysme, fatigabilité, reproductibilité, inversion.",
      "indication": "Vertige bref en se couchant, se levant ou se tournant dans le lit.",
      "procedure": "Tests positionnels selon canal suspecté ; observer direction et évolution du nystagmus.",
      "normal": "Pas de nystagmus positionnel pathologique.",
      "abnormal": "Compatible VPPB si torsionnel/géotropique selon canal, latence, paroxysme, fatigabilité, inversion à la verticalisation, reproductibilité.",
      "traps": "Positionnel ne veut pas dire automatiquement VPPB ; atypies = reconsidérer."
    },
    {
      "id": "eri",
      "cat": "Fauteuil / cinétique",
      "title": "Épreuve rotatoire impulsionnelle / sinusoïdale",
      "tags": [
        "Prépondérance",
        "VNS"
      ],
      "short": "Mesure l’asymétrie nystagmique, historiquement en fréquence, plus souvent via logiciel dédié.",
      "indication": "Bilan instrumental et suivi de prépondérance directionnelle.",
      "procedure": "Rotation/stimulation, arrêt, comptage ou mesure des phases lentes ; répétitions pour lever l’inhibition centrale.",
      "normal": "Symétrie relative droite/gauche ; cumulée horizontale en sinusoïdal.",
      "abnormal": "Prépondérance directionnelle importante, asymétrie persistante, excès de secousses à interpréter avec prudence.",
      "traps": "L’ERI seule ne donne pas la vitesse de phase lente ; méthode dépendante du matériel."
    },
    {
      "id": "hst",
      "cat": "RVO",
      "title": "Head Shaking Test — HST",
      "tags": [
        "HST",
        "Asymétrie"
      ],
      "short": "Stimulation horizontale 10 s à environ 2 Hz puis observation du nystagmus post-dynamique.",
      "indication": "Après nystagmus spontané et test moyen, pour interroger l’asymétrie de stockage/intégrateur.",
      "procedure": "Mouvements passifs horizontaux aller-retour ; observer le nystagmus provoqué à l’arrêt.",
      "normal": "Pas de nystagmus post-dynamique significatif ou réponse symétrique.",
      "abnormal": "Nystagmus provoqué indiquant une asymétrie ; le côté battant est le côté le plus fort selon convention du cours.",
      "traps": "Ne pas utiliser en cas de contre-indication cervicale ou tolérance insuffisante."
    },
    {
      "id": "hit",
      "cat": "RVO",
      "title": "HIT / Head Impulse Test",
      "tags": [
        "HINTS",
        "Haute vitesse",
        "RVO"
      ],
      "short": "Test du RVO à haute vitesse par impulsion brève de tête.",
      "indication": "Dans HINTS si syndrome aigu compatible ; hors HINTS pour oscillopsie, déficit RVO, aréflexie, suivi haute vitesse.",
      "procedure": "Patient fixe une cible ; impulsion passive rapide, faible amplitude, 100–300°/s ; observer les saccades de refixation.",
      "normal": "Regard stable sans saccade visible.",
      "abnormal": "Saccade de rattrapage du côté stimulé = altération du RVO du côté de l’impulsion.",
      "traps": "HIT positif et HIT normal ne se lisent pas pareil selon contexte aigu/chronique."
    },
    {
      "id": "romberg",
      "cat": "EVS",
      "title": "Romberg simple / sensibilisé",
      "tags": [
        "EVS",
        "Vision"
      ],
      "short": "Évalue la stabilité debout yeux fermés et le poids de l’entrée visuelle.",
      "indication": "Instabilité, déséquilibre, suspicion d’atteinte périphérique ou sensorielle.",
      "procedure": "Patient debout pieds joints, yeux fermés ; sensibilisation possible par mouvements de tête.",
      "normal": "Stabilité acceptable.",
      "abnormal": "Chute, oscillations importantes, dépendance visuelle marquée.",
      "traps": "À lire avec les autres EVS, pas isolément."
    },
    {
      "id": "fukuda",
      "cat": "EVS",
      "title": "Fukuda simple / double tâche",
      "tags": [
        "EVS",
        "Latéralisation"
      ],
      "short": "Piétinement yeux fermés, souvent 45 pas, pour chercher une déviation.",
      "indication": "Instabilité, latéralisation périphérique possible.",
      "procedure": "Yeux fermés, bras tendus, piétiner sur place ; mesurer rotation. Double tâche possible.",
      "normal": "Peu ou pas de rotation.",
      "abnormal": "Déviation répétée du même côté, souvent côté déficitaire en périphérique.",
      "traps": "Un Fukuda isolé ne conclut pas."
    },
    {
      "id": "babinski",
      "cat": "EVS",
      "title": "Babinski-Weil / marche en étoile",
      "tags": [
        "EVS",
        "Latéralisation"
      ],
      "short": "Marche aveugle avant/arrière pour observer une déviation.",
      "indication": "Instabilité, syndrome harmonieux/disharmonieux.",
      "procedure": "3 pas avant, 3 pas arrière, répétés, yeux fermés ; observer le spin/déviation.",
      "normal": "Trajet relativement stable.",
      "abnormal": "Déviation cohérente du même côté avec autres EVS = périphérique possible ; discordance = prudence.",
      "traps": "Sécuriser le patient contre les chutes."
    },
    {
      "id": "fauteuil-vitesse",
      "cat": "Fauteuil / cinétique",
      "title": "Épreuves rotatoires à vitesse élevée",
      "tags": [
        "Fixation",
        "Vection"
      ],
      "short": "Bilans et rééducation avec chronométrage de stabilité visuelle ou fin de sensation de tournis.",
      "indication": "Bilan/rééducation instrumentée, post-rotatoire, suivi de réponses.",
      "procedure": "En fixation : ouvrir les yeux, fixer cible, chronométrer stabilité. En vection : yeux fermés, chronométrer fin de sensation de tournis.",
      "normal": "Temps symétriques ou améliorés avec récupération.",
      "abnormal": "Réponse trop longue/courte selon côté et déficit, asymétrie persistante.",
      "traps": "Respecter tolérance neurovégétative et contre-indications."
    },
    {
      "id": "dhi-eev",
      "cat": "Questionnaires",
      "title": "DHI / EEV / EVA",
      "tags": [
        "Suivi",
        "Fonction"
      ],
      "short": "Objectiver la gêne fonctionnelle et l’évolution.",
      "indication": "Bilan initial, intermédiaire, final ; suivi qualité de vie/gêne.",
      "procedure": "DHI : 25 situations des AVQ ; EEV : retentissement fonctionnel ; EVA selon plainte.",
      "normal": "Diminution du retentissement avec amélioration.",
      "abnormal": "Score élevé ou stagnation malgré traitement bien conduit.",
      "traps": "Ne remplace pas les tests objectifs."
    },
    {
      "id": "ctsib",
      "cat": "Organisation sensorielle",
      "title": "CTSIB / SOT",
      "tags": [
        "DNS",
        "Posturographie"
      ],
      "short": "Explore les poids sensoriels et l’organisation de l’équilibre.",
      "indication": "Dépendance visuelle, PPPD, instabilité chronique, stratégies sensorielles.",
      "procedure": "Sol stable/instable ; yeux ouverts, fermés, vision asservie. SOT = version instrumentée en six conditions.",
      "normal": "Adaptation correcte aux conditions.",
      "abnormal": "Prédominance, discordance, défaut d’intégration ou dépendance marquée.",
      "traps": "Les conditions yeux fermés + sol instable ciblent fortement l’entrée vestibulaire."
    },
    {
      "id": "avd",
      "cat": "RVO",
      "title": "Acuité visuelle dynamique",
      "tags": [
        "RVO",
        "Oscillopsie"
      ],
      "short": "Mesure la capacité à lire/stabiliser le regard lors des mouvements de tête.",
      "indication": "Oscillopsie, aréflexie bilatérale, déficit RVO, suivi de stabilisation du regard.",
      "procedure": "Lecture ou cible pendant mouvements rapides de tête, souvent en 2D/3D selon matériel.",
      "normal": "Stabilité visuelle suffisante pendant mouvement.",
      "abnormal": "Perte d’acuité dynamique, difficultés directionnelles ou canalaires.",
      "traps": "Fatigue, compréhension et vision corrigée influencent."
    }
  ],
  "pathologies": [
    {
      "name": "VPPB",
      "family": "Périphérique positionnel",
      "temporalite": "Bref, secondes, déclenché par position",
      "signes": "Latence, paroxysme, fatigabilité, reproductibilité, inversion à la verticalisation",
      "tests": "Dix-Hallpike/Roll Test, lecture canal-côté-lithiase",
      "prise": "Manœuvre adaptée après exclusion centralité et diagnostic positionnel précis",
      "color": "warn"
    },
    {
      "name": "Déficit périphérique aigu / névrite",
      "family": "Périphérique aigu",
      "temporalite": "Grand vertige continu, jours, récupération progressive",
      "signes": "Nausées/vomissements, pas de signe auditif/neuro typique, nystagmus périphérique",
      "tests": "Sécurité, HINTS si contexte, VNS, HIT, EVS, prépondérance",
      "prise": "Compensation centrale, stabilisation regard, conflit sensoriel progressif",
      "color": "info"
    },
    {
      "name": "Dysfonctionnement vestibulaire unilatéral",
      "family": "Périphérique fluctuant",
      "temporalite": "Variable selon état pressionnel / réflectivité",
      "signes": "Réponses fluctuantes, instabilité, doléances selon phases",
      "tests": "Interrogatoire, VNS, fauteuil, suivi réponses",
      "prise": "Connaître l’état pressionnel du labyrinthe et adapter la technique",
      "color": "info"
    },
    {
      "name": "Maladie de Ménière",
      "family": "Cochléo-vestibulaire",
      "temporalite": "Crises de plusieurs heures, fluctuation",
      "signes": "Triade : vertige, plénitude/acouphènes, surdité neurosensorielle fluctuante",
      "tests": "Interrogatoire auditif, suivi fluctuation, ORL",
      "prise": "Pas de KV en période critique ; hors crise selon réflectivité et séquelles",
      "color": "warn"
    },
    {
      "name": "Aréflexie vestibulaire bilatérale",
      "family": "Périphérique bilatéral",
      "temporalite": "Chronique",
      "signes": "Oscillopsie, instabilité dans l’obscurité, gêne marche, HIT bilatéral possible",
      "tests": "HIT/vHIT, acuité visuelle dynamique, EVS, VNG",
      "prise": "Substitution visuelle/proprioceptive, stabilisation du regard, sécurité chute",
      "color": "info"
    },
    {
      "name": "Atteinte centrale",
      "family": "Central",
      "temporalite": "Aiguë ou chronique",
      "signes": "Oculomotricité anormale, nystagmus vertical/multiple, signes neuro, EVS disharmonieuses",
      "tests": "Red flags, oculomotricité, HINTS si aigu continu, examen neuro",
      "prise": "Réorientation si aigu/suspect ; rééducation prudente si cadre établi",
      "color": "danger"
    },
    {
      "name": "Wallenberg / AVC postérieur",
      "family": "Central urgent",
      "temporalite": "Aigu",
      "signes": "Vertige violent, vomissements, marche impossible, signes bulbaires/cérébelleux",
      "tests": "Red flags, HINTS si contexte, urgence médicale",
      "prise": "Urgence / réorientation",
      "color": "danger"
    },
    {
      "name": "SEP",
      "family": "Central",
      "temporalite": "Variable",
      "signes": "Ophtalmoplégie internucléaire, disconjugaison, troubles équilibre",
      "tests": "Oculomotricité, conjugaison, neuro, avis médical",
      "prise": "Rééducation adaptée au cadre neurologique",
      "color": "danger"
    },
    {
      "name": "Migraine vestibulaire",
      "family": "Central/fonctionnel",
      "temporalite": "Crises, terrain migraineux",
      "signes": "Vertige sans surdité fluctuante typique, signes migraineux, antécédents",
      "tests": "Interrogatoire, exclusion red flags, sensibilité visuelle",
      "prise": "Médication anti-migraineuse + exposition progressive flux si indiqué",
      "color": "purple"
    },
    {
      "name": "PPPD / dépendance visuelle",
      "family": "Désorganisation neurosensorielle",
      "temporalite": "Chronique, environnements complexes",
      "signes": "Supermarché, foule, grands espaces, route, flux visuels",
      "tests": "CTSIB/SOT, questionnaires, tolérance optocinétique/VR",
      "prise": "Habituation, exposition progressive, restabilisation posturale",
      "color": "success"
    },
    {
      "name": "Cinétoses / syndrome de l’autoroute",
      "family": "DNS / flux visuel",
      "temporalite": "Situationnel",
      "signes": "Mal des transports, gêne vitesse/route, flux optique radial",
      "tests": "Interrogatoire spécifique, dépendance visuelle, CTSIB/SOT",
      "prise": "Exposition graduée, optocinétique/VR, stratégie multisensorielle",
      "color": "success"
    },
    {
      "name": "Presbyataxie",
      "family": "Baisse globale des afférences",
      "temporalite": "Progressive",
      "signes": "Instabilité multifactorielle, chute, baisse vision/proprioception/vestibule",
      "tests": "Capteurs, EVS, CTSIB, risque de chute",
      "prise": "Sollicitation multisensorielle et prévention des chutes",
      "color": "info"
    },
    {
      "name": "Désordres otolithiques",
      "family": "Otolithique",
      "temporalite": "Variable",
      "signes": "Plaintes liées verticalité/translation selon interrogatoire et bilans",
      "tests": "VVS, oVEMP/cVEMP si ORL, organisation sensorielle",
      "prise": "Solliciter préférentiellement le système maculaire en cause",
      "color": "info"
    },
    {
      "name": "Vertiges toxiques / iatrogènes",
      "family": "Terrain / traitement",
      "temporalite": "Selon exposition",
      "signes": "Troubles équilibre liés médicaments ou ototoxicité possible",
      "tests": "Interrogatoire thérapeutique, capteurs, avis médical",
      "prise": "Ne pas traiter comme simple vestibulaire sans analyse du traitement",
      "color": "warn"
    },
    {
      "name": "Commotion / traumatique",
      "family": "Post-traumatique",
      "temporalite": "Après choc / trauma",
      "signes": "Vertige, instabilité, céphalées, troubles visuels/cervicaux possibles",
      "tests": "Sécurité, oculomotricité, capteurs, cervical, évolution",
      "prise": "Progression prudente, coordination médicale si signes persistants",
      "color": "warn"
    }
  ],
  "rehabPrinciples": [
    {
      "title": "Précocité raisonnée",
      "text": "Les réorganisations cérébrales dépendent de l’activité neuronale et du temps. Plus on attend, moins la rééducation est favorable, mais il faut respecter sécurité et tolérance."
    },
    {
      "title": "Pas de standard",
      "text": "Il n’existe pas une séance-type valable pour tous : l’adaptation part de l’observation, de la vidéo si disponible, de l’hypothèse et de la réponse du patient."
    },
    {
      "title": "Pas de contradiction inutile",
      "text": "Éviter de mélanger dans la même séance des sollicitations qui s’annulent ou se contredisent, par exemple fixation et absence de fixation sans objectif clair."
    },
    {
      "title": "Dosage neurovégétatif",
      "text": "Le bon exercice doit provoquer une adaptation sans laisser une aggravation durable. La tolérance guide durée, vitesse, amplitude et fréquence."
    },
    {
      "title": "Objectivation",
      "text": "La progression doit se voir sur symptômes, fonctions, prépondérance, EVS, organisation sensorielle et gêne ressentie."
    }
  ],
  "reeducation": [
    {
      "title": "Compensation centrale",
      "when": "Déficit périphérique aigu ou asymétrie périphérique.",
      "goal": "Obtenir une compensation centrale pour stabiliser regard et posture.",
      "how": [
        "Symétriser les réponses vestibulaires si possible avec contrôle pré/post.",
        "Puis interroger l’entrée vestibulaire par conflit visuel/proprioceptif progressif.",
        "Augmenter activité et mouvements selon tolérance.",
        "Suivre nystagmus, EVS et gêne fonctionnelle."
      ],
      "progress": "Du simple au fonctionnel : assis → debout → marche → environnement réel.",
      "avoid": "Repos prolongé, restriction sensorielle inutile, progression trop lente ou trop forte."
    },
    {
      "title": "Adaptation / recalibrage / plasticité",
      "when": "Déficit RVO, instabilité après lésion périphérique, besoin de remodelage du SNC.",
      "goal": "Réduire l’erreur sensorimotrice et améliorer les réponses automatiques.",
      "how": [
        "Répéter des tâches qui créent une erreur contrôlée.",
        "Stabilisation du regard et mouvements de tête gradués.",
        "Varier contexte, vitesse et support.",
        "Renforcer la qualité du mouvement et l’autonomie."
      ],
      "progress": "Augmenter progressivement vitesse, amplitude, complexité visuelle et double tâche.",
      "avoid": "Exercices trop faciles qui ne créent pas d’apprentissage, ou trop difficiles qui bloquent l’adaptation."
    },
    {
      "title": "Substitution sensorielle",
      "when": "Aréflexie bilatérale ou entrée vestibulaire peu fiable.",
      "goal": "Développer vision et proprioception comme systèmes de compensation.",
      "how": [
        "Renforcer stratégies visuelles et somatosensorielles.",
        "Travail postural sur supports variés.",
        "Apprendre repères environnementaux et sécurisation.",
        "Prévention des chutes, surtout obscurité et terrains instables."
      ],
      "progress": "Passer de situations sécurisées à situations réelles contrôlées.",
      "avoid": "Créer une dépendance excessive à une seule entrée sensorielle."
    },
    {
      "title": "Habituation",
      "when": "PPPD, dépendance visuelle, cinétoses, gêne flux visuels, hypersensibilité.",
      "goal": "Diminuer progressivement la réponse au stimulus déclencheur.",
      "how": [
        "Identifier stimulus nociceptif ou conflit sensoriel.",
        "Exposition brève et répétée.",
        "Progression lente : intensité, durée, vitesse, complexité.",
        "Retour aux situations réelles : foule, supermarché, route, grands espaces."
      ],
      "progress": "Symptôme léger/modéré puis retour au calme ; pas de malaise durable.",
      "avoid": "Surstimulation, exposition trop longue, accumulation de stimulations."
    },
    {
      "title": "Fauteuil rotatoire — basse vitesse / fixation",
      "when": "Sédation, travail sous seuil, Ménière hors crise selon réflectivité, atteintes centrales prudentes.",
      "goal": "Travailler la stabilisation du regard et les réponses sans déclencher fort.",
      "how": [
        "Fixation d’une baguette ou cible.",
        "Vitesse lente.",
        "Observer réponses, symptômes, temps de récupération.",
        "Rester cohérent avec l’objectif de séance."
      ],
      "progress": "Augmenter très progressivement vitesse/durée selon tolérance.",
      "avoid": "Période critique de Ménière, signes centraux non explorés, malaise durable."
    },
    {
      "title": "Fauteuil rotatoire — haute vitesse / vection",
      "when": "Travail post-rotatoire, bilans/rééducation instrumentés, hypersensibilité selon protocole.",
      "goal": "Mesurer et modifier les temps de réponse en fixation ou vection.",
      "how": [
        "Fixation : tourner, ouvrir les yeux, fixer cible, chronométrer stabilité.",
        "Vection : garder yeux fermés, chronométrer fin de sensation de tournis.",
        "Utiliser le côté et la durée selon déficit et objectif.",
        "Comparer pré/per/post."
      ],
      "progress": "Répétitions limitées, augmentation contrôlée, arrêt si symptômes excessifs.",
      "avoid": "Surstimulation, absence de chronométrage, absence d’objectif clair."
    },
    {
      "title": "Optocinétique",
      "when": "Dépendance visuelle, PPPD, prépondérance isolée sans déficit canalaire, syndrome de l’autoroute.",
      "goal": "Désensibiliser aux flux visuels et rééquilibrer l’usage vision/vestibule/proprioception.",
      "how": [
        "Début basse intensité, vitesse lente, temps courts.",
        "Flux linéaires, circulaires ou radiaux selon plainte.",
        "Travail debout ou assis selon sécurité.",
        "Suivi symptômes et retour à la stabilité."
      ],
      "progress": "Augmenter vitesse, durée, champ visuel, position, support et tâches.",
      "avoid": "Optocinétique trop intense qui hypersensibilise."
    },
    {
      "title": "Réalité virtuelle",
      "when": "Conflits sensoriels, environnements mobiles, hauteur, route, grands espaces.",
      "goal": "Créer des situations contrôlées proches du réel.",
      "how": [
        "Choisir un environnement lié à la plainte.",
        "Exposition graduée.",
        "Associer posture/marche si nécessaire.",
        "Revenir progressivement au réel."
      ],
      "progress": "Scénarios simples → complexes, stable → instable, statique → dynamique.",
      "avoid": "Commencer par un scénario trop difficile."
    },
    {
      "title": "Stabilisation du regard",
      "when": "Oscillopsie, déficit RVO, difficulté pendant mouvements de tête.",
      "goal": "Maintenir une cible nette malgré le mouvement de tête.",
      "how": [
        "Fixer une cible.",
        "Mouvements de tête horizontaux/verticaux.",
        "Séries courtes répétées.",
        "Ajouter posture, marche, environnement visuel selon progrès."
      ],
      "progress": "Vitesse, amplitude, distance, fond visuel et double tâche.",
      "avoid": "Exercices longs qui provoquent malaise ou flou durable."
    },
    {
      "title": "Cawthorne & Cooksey / vestibulo-oculo-cervical",
      "when": "Travail global tête-yeux-corps, contrôle moteur et réharmonisation.",
      "goal": "Lutter contre oscillopsie et réharmoniser mouvements conjugués tête/yeux.",
      "how": [
        "Exercices progressifs yeux-tête-corps.",
        "Changer positions : assis, debout, marche.",
        "Respecter symptômes et fatigue.",
        "Intégrer à domicile si compris."
      ],
      "progress": "Augmenter complexité, vitesse et environnement.",
      "avoid": "Programme générique non adapté au bilan."
    },
    {
      "title": "Laser / barre oculomotrice / tracking",
      "when": "Travail actif saccades-poursuites, coordination tête-yeux, suivi de cible.",
      "goal": "Améliorer précision, anticipation et stabilité du regard.",
      "how": [
        "Cibles fixes ou mobiles.",
        "Mouvements tête/cible coordonnés ou dissociés.",
        "Feedback visuel du laser ou de la VR.",
        "Séries courtes avec contrôle qualité."
      ],
      "progress": "Amplitude, vitesse, nombre de cibles, arrière-plan, posture.",
      "avoid": "Confondre entraînement oculomoteur et diagnostic central."
    },
    {
      "title": "Éducation thérapeutique / domicile",
      "when": "Toutes situations chroniques ou nécessitant autonomie.",
      "goal": "Compréhension, observance, sécurité et progression entre séances.",
      "how": [
        "Expliquer la pathologie avec mots simples.",
        "Donner exercices personnalisés, courts, fréquents.",
        "Préciser critères d’arrêt et de recontact.",
        "Éviter auto-manœuvres VPPB non indiquées."
      ],
      "progress": "Réévaluer et modifier les exercices selon réponse.",
      "avoid": "Consignes floues ou trop nombreuses."
    }
  ],
  "criteria": [
    "Prépondérance directionnelle nystagmique réduite ou mieux contrôlée si elle était mesurable.",
    "Amélioration des performances vestibulo-spinales.",
    "Meilleure organisation sensorielle : moins de dépendance ou meilleure stratégie.",
    "Tests reproductibles, crédibles et cohérents entre eux.",
    "Gêne fonctionnelle ressentie objectivée par DHI/EEV/EVA ou équivalent.",
    "Tolérance neurovégétative améliorée.",
    "Si prépondérance ne se réduit jamais malgré rééducation bien conduite : nouvel avis ORL."
  ],
  "cases": [
    {
      "title": "1. Grand vertige continu depuis 24 h",
      "badge": "Cours",
      "presentation": "Grand vertige rotatoire, nausées, nystagmus spontané, pas de signe auditif évident.",
      "questions": [
        [
          "Étape prioritaire ?",
          [
            "Faire une manœuvre positionnelle",
            "Sécurité + HINTS si contexte compatible",
            "Optocinétique d’emblée"
          ],
          1,
          "Vertige aigu continu = tri central/périphérique avant rééducation."
        ],
        [
          "Résultat inquiétant ?",
          [
            "HIT anormal + nystagmus unidirectionnel + skew négatif",
            "HIT normal + nystagmus direction-changeant + skew positif",
            "Nystagmus fatigable avec latence"
          ],
          1,
          "Dans un syndrome aigu, ce profil est central suspect."
        ]
      ],
      "takeaway": "HINTS est contextuel, pas universel."
    },
    {
      "title": "2. Vertige au lit de quelques secondes",
      "badge": "Cours",
      "presentation": "Vertige bref au coucher et à la rotation dans le lit, pas de signe neuro.",
      "questions": [
        [
          "Hypothèse première ?",
          [
            "VPPB possible",
            "Ménière en crise",
            "Aréflexie bilatérale"
          ],
          0,
          "La temporalité brève et positionnelle oriente vers VPPB."
        ],
        [
          "Critère compatible ?",
          [
            "Nystagmus non fatigable",
            "Latence + paroxysme + fatigabilité",
            "Skew positif"
          ],
          1,
          "Ces critères signent un VPPB typique selon le cours."
        ]
      ],
      "takeaway": "Positionnel bref : tester précisément, puis manœuvrer seulement si compatible."
    },
    {
      "title": "3. Faux VPPB",
      "badge": "Piège",
      "presentation": "Vertige positionnel, mais nystagmus persistant non fatigable et céphalée inhabituelle.",
      "questions": [
        [
          "Conduite ?",
          [
            "Répéter les manœuvres",
            "Reconsidérer centralité / réorientation",
            "Donner auto-manœuvres"
          ],
          1,
          "Tout nystagmus positionnel n’est pas un VPPB."
        ],
        [
          "Indice déterminant ?",
          [
            "Atypie + céphalée",
            "Déclenchement au lit seul",
            "Durée de quelques secondes seulement"
          ],
          0,
          "L’atypie change la décision."
        ]
      ],
      "takeaway": "Le test positionnel ne doit pas devenir un automatisme thérapeutique."
    },
    {
      "title": "4. EVS harmonieux",
      "badge": "Cours",
      "presentation": "Romberg, Fukuda et Babinski-Weil dévient répétitivement du même côté.",
      "questions": [
        [
          "Lecture principale ?",
          [
            "Central certain",
            "Syndrome périphérique harmonieux possible",
            "PPPD isolée certaine"
          ],
          1,
          "La cohérence des EVS peut orienter vers une latéralisation périphérique."
        ],
        [
          "Piège ?",
          [
            "Lire les tests ensemble",
            "Conclure sur un seul Fukuda",
            "Vérifier les capteurs"
          ],
          1,
          "Un seul test n’est pas significatif."
        ]
      ],
      "takeaway": "EVS = cohérence, latéralisation, prudence."
    },
    {
      "title": "5. Oscillopsie à la marche",
      "badge": "Cours",
      "presentation": "Flou visuel quand le patient marche ou tourne la tête, majoré dans l’obscurité.",
      "questions": [
        [
          "Tests prioritaires ?",
          [
            "HIT/vHIT + acuité visuelle dynamique",
            "Dix-Hallpike seulement",
            "Skew seul"
          ],
          0,
          "Le symptôme évoque un problème de RVO."
        ],
        [
          "Axe rééducatif ?",
          [
            "Stabilisation du regard + substitution",
            "Manœuvre VPPB systématique",
            "Repos strict"
          ],
          0,
          "Oscillopsie et aréflexie nécessitent regard/substitution."
        ]
      ],
      "takeaway": "Oscillopsie = explorer et entraîner le RVO."
    },
    {
      "title": "6. Crises avec signes auditifs",
      "badge": "Cours",
      "presentation": "Crises de plusieurs heures avec plénitude, acouphènes et hypoacousie fluctuante.",
      "questions": [
        [
          "Orientation ?",
          [
            "Ménière possible",
            "VPPB typique",
            "Fukuda isolé"
          ],
          0,
          "La triade et la durée orientent vers Ménière."
        ],
        [
          "Pendant période critique ?",
          [
            "KV intense",
            "Pas de rééducation vestibulaire en crise",
            "Optocinétique forte"
          ],
          1,
          "Le cours indique la prudence en période critique."
        ]
      ],
      "takeaway": "Ménière = fluctuation + audition + temporalité."
    },
    {
      "title": "7. Supermarché et foule",
      "badge": "Cours",
      "presentation": "Gêne chronique en supermarché, foule, grands espaces ; examens peu contributifs.",
      "questions": [
        [
          "Famille probable ?",
          [
            "Désorganisation neurosensorielle / PPPD",
            "Névrite aiguë",
            "VPPB canal postérieur"
          ],
          0,
          "Les flux visuels et environnements complexes orientent DNS/PPPD."
        ],
        [
          "Bilan utile ?",
          [
            "CTSIB/SOT + questionnaires",
            "HINTS systématique",
            "Manœuvre libératoire"
          ],
          0,
          "Il faut objectiver l’organisation sensorielle et le retentissement."
        ]
      ],
      "takeaway": "Penser stratégie sensorielle, pas seulement oreille interne."
    },
    {
      "title": "8. Route et vitesse",
      "badge": "Entraînement",
      "presentation": "Gêne surtout en voiture sur voies rapides, ralentissement, flux visuel radial.",
      "questions": [
        [
          "Hypothèse ?",
          [
            "Syndrome de l’autoroute / dépendance visuelle",
            "Ménière en crise",
            "Wallenberg"
          ],
          0,
          "Le déclenchement par flux optique radial oriente dépendance visuelle/syndrome de l’autoroute."
        ],
        [
          "Traitement pédagogique ?",
          [
            "Exposition graduée optocinétique/VR",
            "Repos complet",
            "Fauteuil haute vitesse sans bilan"
          ],
          0,
          "Le traitement doit être progressif et ciblé sur le conflit sensoriel."
        ]
      ],
      "takeaway": "Le stimulus déclenchant guide la rééducation."
    },
    {
      "title": "9. Patient âgé instable",
      "badge": "Entraînement",
      "presentation": "Instabilité progressive, vision diminuée, proprioception altérée, peur de tomber.",
      "questions": [
        [
          "Lecture ?",
          [
            "Presbyataxie / baisse globale des afférences possible",
            "VPPB certain",
            "Ménière certaine"
          ],
          0,
          "Le tableau est multifactoriel sensoriel."
        ],
        [
          "Priorité ?",
          [
            "Multisensoriel + prévention chute",
            "Optocinétique forte",
            "Auto-manœuvres"
          ],
          0,
          "Objectif : sollicitation multisensorielle et sécurité."
        ]
      ],
      "takeaway": "Chez le sujet âgé, le vestibule n’est qu’une partie de l’équilibre."
    },
    {
      "title": "10. Médicaments et équilibre",
      "badge": "Piège",
      "presentation": "Déséquilibre récent après modification de traitement cardiovasculaire.",
      "questions": [
        [
          "Réflexe clinique ?",
          [
            "Analyser traitements / avis médical",
            "Conclure à névrite",
            "Faire fauteuil fort"
          ],
          0,
          "Certains traitements perturbent l’équilibre ou les ROT."
        ],
        [
          "Erreur ?",
          [
            "Inclure le terrain",
            "Attribuer automatiquement au vestibule",
            "Vérifier les capteurs"
          ],
          1,
          "Le bilan doit inclure le traitement médical."
        ]
      ],
      "takeaway": "L’interrogatoire médicamenteux est une donnée clinique."
    },
    {
      "title": "11. HIT bilatéral positif",
      "badge": "Cours",
      "presentation": "Oscillopsie, instabilité dans l’obscurité, HIT suspect des deux côtés.",
      "questions": [
        [
          "Orientation ?",
          [
            "Aréflexie bilatérale possible",
            "VPPB typique",
            "Ménière en crise seule"
          ],
          0,
          "Le profil évoque atteinte vestibulaire bilatérale."
        ],
        [
          "Rééducation ?",
          [
            "Substitution + stabilisation + sécurité",
            "Habituation optocinétique seule",
            "Aucune adaptation"
          ],
          0,
          "Il faut développer les systèmes de substitution."
        ]
      ],
      "takeaway": "Bilatéral = substitution et sécurité."
    },
    {
      "title": "12. Prépondérance persistante",
      "badge": "Suivi",
      "presentation": "Après rééducation bien conduite, la prépondérance ne se réduit jamais totalement.",
      "questions": [
        [
          "Conduite ?",
          [
            "Continuer pareil indéfiniment",
            "Nouvel avis ORL",
            "Arrêter tout suivi"
          ],
          1,
          "Le cours demande un nouvel avis ORL si la prépondérance persiste malgré physiothérapie bien conduite."
        ],
        [
          "Critère de qualité ?",
          [
            "Gêne fonctionnelle objectivée",
            "Ressenti du thérapeute seul",
            "Un test isolé"
          ],
          0,
          "Les progrès doivent être mesurés."
        ]
      ],
      "takeaway": "Le suivi objectivé sécurise la prise en charge."
    }
  ],
  "checklists": [
    {
      "title": "Sécurité / red flags",
      "goal": "Avant toute logique de traitement.",
      "items": [
        "Céphalée inhabituelle.",
        "Diplopie, dysarthrie, dysphagie.",
        "Paresthésie, déficit moteur/sensitif.",
        "Ataxie majeure ou marche impossible.",
        "Nystagmus vertical, multidirectionnel, gaze nystagmus.",
        "Skew positif.",
        "Oculomotricité franchement anormale.",
        "Réorientation si doute."
      ]
    },
    {
      "title": "Interrogatoire",
      "goal": "Choisir les tests utiles.",
      "items": [
        "Début et évolution aiguë/chronique.",
        "Nature du trouble sans le mot vertige.",
        "Durée réelle de la crise.",
        "Fréquence et calendrier.",
        "Circonstances : position, effort, stress, grands espaces, fatigue.",
        "Signes auditifs.",
        "Migraine/céphalées/cervicalgies.",
        "Trauma ou contexte viral.",
        "Traitements ototoxiques/cardiovasculaires."
      ]
    },
    {
      "title": "HINTS",
      "goal": "Seulement vertige aigu continu compatible.",
      "items": [
        "Contexte compatible.",
        "Head Impulse Test.",
        "Nystagmus : direction, verticalité, changement de direction.",
        "Test of Skew.",
        "Signes neuro associés.",
        "Interprétation globale, pas item isolé."
      ]
    },
    {
      "title": "VPPB compatible",
      "goal": "Identifier typique vs atypique.",
      "items": [
        "Vertige bref positionnel.",
        "Latence.",
        "Paroxysme.",
        "Fatigabilité.",
        "Reproductibilité.",
        "Inversion à la verticalisation.",
        "Direction compatible canal/côté.",
        "Atypie = reconsidérer centralité."
      ]
    },
    {
      "title": "EVS",
      "goal": "Lire la cohérence.",
      "items": [
        "Romberg simple/sensibilisé.",
        "Fukuda simple/double tâche.",
        "Babinski-Weil.",
        "Comparer sens des déviations.",
        "Cohérent même côté = harmonieux possible.",
        "Discordance/instabilité majeure = prudence."
      ]
    },
    {
      "title": "Capteurs",
      "goal": "Ne pas attribuer tout au vestibule.",
      "items": [
        "Vision et correction.",
        "Convergence / trouble oculomoteur.",
        "Audition, acouphènes, plénitude.",
        "Proprioception, neuropathies, ROT.",
        "Cognition/attention et double tâche."
      ]
    },
    {
      "title": "Rééducation bien conduite",
      "goal": "Objectiver l’efficacité.",
      "items": [
        "Prépondérance réduite ou expliquée.",
        "EVS améliorées.",
        "Organisation sensorielle améliorée.",
        "DHI/EEV/EVA améliorés.",
        "Tolérance neurovégétative meilleure.",
        "Retour aux situations réelles.",
        "Avis ORL si stagnation malgré traitement adapté."
      ]
    },
    {
      "title": "Séance",
      "goal": "Dosage et cohérence.",
      "items": [
        "Objectif unique ou clairement hiérarchisé.",
        "Exercice lié au bilan.",
        "Progression graduée.",
        "Pas de sollicitations contradictoires inutiles.",
        "Critère d’arrêt défini.",
        "Consigne domicile personnalisée."
      ]
    }
  ]
};
