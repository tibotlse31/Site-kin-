window.VESTIB_DATA = {
  "meta": {
    "version": "meilleure-version",
    "principle": "Contenu hiérarchisé : essentiel visible, cours détaillé au clic, entraînement séparé."
  },
  "acronyms": {
    "RVO": "Réflexe vestibulo-oculaire : stabilise le regard pendant les mouvements de tête.",
    "RVC": "Réflexe vestibulo-cervical : contribution vestibulaire au contrôle tête-cou.",
    "RVS": "Réflexe vestibulo-spinal : contribution vestibulaire à la posture et à l’équilibre.",
    "ROC": "Réflexe optocinétique : réponse oculomotrice liée au défilement visuel.",
    "NOC": "Nystagmus optocinétique.",
    "VNS": "Vidéonystagmoscopie : observation vidéo des mouvements oculaires, souvent sous masque.",
    "VNG": "Vidéonystagmographie : enregistrement quantifié des mouvements oculaires.",
    "VPPB": "Vertige positionnel paroxystique bénin.",
    "DPA": "Déficit périphérique aigu.",
    "HINTS": "Head Impulse, Nystagmus, Test of Skew : séquence clinique du syndrome vestibulaire aigu continu.",
    "HIT": "Head Impulse Test : test du RVO à haute vitesse.",
    "vHIT": "Video Head Impulse Test : version instrumentée du HIT.",
    "HST": "Head Shaking Test : test après secousses rapides de tête.",
    "ERI": "Épreuve de rotation impulsionnelle.",
    "EVS": "Épreuves vestibulo-spinales : Romberg, Fukuda, marche aveugle/Babinski-Weil.",
    "DHI": "Dizziness Handicap Inventory : questionnaire de gêne fonctionnelle.",
    "EEV": "European Evaluation of Vertigo : évaluation fonctionnelle du vertige.",
    "EVA": "Échelle visuelle analogique.",
    "CTSIB": "Clinical Test of Sensory Interaction and Balance.",
    "SOT": "Sensory Organization Test.",
    "VVS": "Verticale visuelle subjective.",
    "DNS": "Désorganisation neurosensorielle.",
    "PPPD": "Persistent Perceptual Postural Dizziness : vertige perceptif postural persistant.",
    "AVC": "Accident vasculaire cérébral.",
    "AIT": "Accident ischémique transitoire.",
    "SEP": "Sclérose en plaques.",
    "IRM": "Imagerie par résonance magnétique.",
    "ORL": "Oto-rhino-laryngologiste.",
    "MK": "Masseur-kinésithérapeute.",
    "ETP": "Éducation thérapeutique du patient.",
    "VEMP": "Vestibular Evoked Myogenic Potentials : potentiels évoqués vestibulaires myogéniques.",
    "oVEMP": "Potentiels évoqués vestibulaires myogéniques oculaires.",
    "cVEMP": "Potentiels évoqués vestibulaires myogéniques cervicaux.",
    "SAOS": "Syndrome d’apnées obstructives du sommeil.",
    "CBH": "Claude Bernard-Horner."
  },
  "nav": [
    {
      "id": "overview",
      "icon": "🧭",
      "label": "Vue d’ensemble"
    },
    {
      "id": "fundamentals",
      "icon": "📚",
      "label": "Fondamentaux"
    },
    {
      "id": "assessment",
      "icon": "🔎",
      "label": "Bilan"
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
      "id": "rehab",
      "icon": "🛠️",
      "label": "Rééducation"
    },
    {
      "id": "cases",
      "icon": "🧪",
      "label": "Cas cliniques"
    }
  ],
  "overview": {
    "title": "Vue d’ensemble",
    "intro": "L’outil reprend la logique du cours : physiologie → bilan → tests ciblés → familles de pathologies → objectifs de rééducation → cas cliniques.",
    "cards": [
      {
        "title": "1. Comprendre",
        "text": "Le vestibule participe à la stabilisation du regard, à la posture, à la représentation du droit devant et à l’adaptation aux changements de position.",
        "tags": [
          "RVO",
          "RVS",
          "nystagmus"
        ]
      },
      {
        "title": "2. Trier",
        "text": "La priorité du bilan est de distinguer ce qui peut être pris en charge en rééducation de ce qui impose une réorientation, surtout en cas de centralité.",
        "tags": [
          "red flags",
          "HINTS",
          "oculomotricité"
        ]
      },
      {
        "title": "3. Objectiver",
        "text": "Le bilan pré, per et post-rééducatif mesure la gêne, les signes cliniques, la prépondérance, les EVS et l’organisation sensorielle.",
        "tags": [
          "DHI",
          "EEV",
          "CTSIB"
        ]
      },
      {
        "title": "4. Traiter",
        "text": "La rééducation n’est pas standard : elle dépend du bilan, de la pathologie, de la tolérance neurovégétative et de l’évolution.",
        "tags": [
          "compensation",
          "substitution",
          "habituation"
        ]
      }
    ],
    "reasoning": [
      [
        "Plainte",
        "Nature exacte du trouble, durée réelle de la crise, déclencheurs, signes associés."
      ],
      [
        "Sécurité",
        "Recherche des signes neurologiques, des nystagmus centraux et des tableaux atypiques."
      ],
      [
        "Hypothèse",
        "Périphérique, central, DNS, trouble mixte ou non vestibulaire."
      ],
      [
        "Tests ciblés",
        "On ne fait pas tous les tests : l’interrogatoire et l’examen clinique guident le bilan."
      ],
      [
        "Rééducation",
        "Objectif thérapeutique clair : compenser, substituer, habituer, stabiliser, sédater ou réorganiser."
      ],
      [
        "Suivi",
        "Comparer les résultats et réorienter si évolution défavorable ou prépondérance persistante."
      ]
    ],
    "families": [
      {
        "name": "Périphérique",
        "text": "Atteinte du capteur ou du labyrinthe : VPPB, DPA, Ménière, aréflexie bilatérale, vestibulotoxicité.",
        "tone": "blue"
      },
      {
        "name": "Central",
        "text": "Atteinte du tronc cérébral, cervelet, voies oculomotrices ou intégration centrale : AVC, Wallenberg, SEP, migraine vestibulaire.",
        "tone": "red"
      },
      {
        "name": "Désorganisation neurosensorielle",
        "text": "Conflit, préférence, sous-utilisation ou défaut d’intégration : PPPD, cinétoses, syndrome de l’autoroute, dépendance visuelle.",
        "tone": "green"
      }
    ],
    "usage": [
      "Commencer par Vue d’ensemble et Fondamentaux pour apprendre.",
      "Utiliser Bilan et Tests comme structure de révision clinique.",
      "Utiliser Pathologies et Rééducation pour relier signes → hypothèse → prise en charge.",
      "Terminer par les cas cliniques pour vérifier le raisonnement."
    ]
  },
  "fundamentals": [
    {
      "id": "referentials",
      "title": "Référentiels, équilibre et droit devant",
      "essential": [
        "Le système vestibulaire sert de référentiel géocentré : il renseigne la verticale réelle.",
        "L’équilibre dépend d’une pondération entre vestibule, vision, proprioception et cognition.",
        "Le droit devant dépend de la complémentarité droite/gauche et du référentiel égocentré."
      ],
      "why": "Cette base évite de tout réduire à une oreille interne : une plainte peut venir d’un capteur, d’une intégration centrale ou d’une stratégie sensorielle inadaptée.",
      "clinical": "Un patient qui chute surtout dans le noir peut manquer de repères vestibulaires/proprioceptifs ou dépendre excessivement de la vision.",
      "details": [
        "Deux systèmes en push-pull : un déficit unilatéral entraîne une asymétrie droite/gauche.",
        "Le droit devant peut être dévié vers le côté déficitaire.",
        "Les informations vestibulaires, visuelles et somesthésiques doivent être cohérentes pour maintenir posture et orientation."
      ]
    },
    {
      "id": "reflexes",
      "title": "RVO, RVC, réflexes vestibulo-spinaux",
      "essential": [
        "Le RVO stabilise le regard pendant les mouvements rapides de tête.",
        "Les réflexes vestibulo-spinaux participent à la posture et à l’équilibre.",
        "Le RVC participe à la relation tête-cou et aux adaptations cervicales."
      ],
      "why": "Ces réflexes expliquent le HIT, le vHIT, l’acuité visuelle dynamique, l’oscillopsie et les exercices de stabilisation du regard.",
      "clinical": "Dans un déficit du RVO droit, une impulsion rapide de tête vers la droite peut provoquer une saccade de rattrapage.",
      "details": [
        "RVO : stabilise l’image sur la rétine malgré les mouvements de tête.",
        "RVS : contribue aux ajustements posturaux automatiques.",
        "RVC : peut être impliqué dans les plaintes cervico-vestibulaires ou les stratégies de compensation."
      ]
    },
    {
      "id": "nystagmus",
      "title": "Nystagmus : lecture clinique",
      "essential": [
        "Le nystagmus est défini par sa phase rapide.",
        "La phase lente traduit la dérive vestibulaire ou le biais pathologique.",
        "Un nystagmus périphérique typique est souvent unidirectionnel et inhibé par fixation."
      ],
      "why": "La lecture du nystagmus est centrale pour distinguer périphérique/central, suivre la compensation et raisonner les VPPB.",
      "clinical": "Nystagmus gauche, inhibé par fixation, renforcé regard gauche : profil compatible avec périphérique, à croiser avec le contexte.",
      "details": [
        "Loi d’Alexander : un nystagmus périphérique augmente quand le regard va du côté de la phase rapide.",
        "Degré 1 : nystagmus visible seulement dans le regard du côté de la phase rapide.",
        "Degré 2 : visible aussi en regard médian.",
        "Degré 3 : visible même dans le regard opposé.",
        "Vertical, multidirectionnel, gaze nystagmus ou non inhibé par fixation : centralité à suspecter."
      ]
    },
    {
      "id": "ewald",
      "title": "Lois d’Ewald et VPPB",
      "essential": [
        "Les lois d’Ewald relient canal stimulé, courant endolymphatique et direction du nystagmus.",
        "Elles sont indispensables pour interpréter les nystagmus canalaires.",
        "Elles évitent de faire une manœuvre sans diagnostic précis."
      ],
      "why": "Le cours insiste sur le fait qu’un traitement VPPB adapté doit partir du canal affecté, du type de lithiase et du siège exact.",
      "clinical": "Un nystagmus positionnel torsionnel avec latence et fatigabilité ne suffit pas : il faut déterminer canal, côté et mécanisme.",
      "details": [
        "Canaux latéraux/horizontaux : courant ampullipète excitateur.",
        "Canaux verticaux : courant ampullofuge excitateur.",
        "La latence, l’intensité, la fatigabilité et le sens du nystagmus orientent canalo- ou cupulolithiase.",
        "Tout nystagmus positionnel ne justifie pas une manœuvre."
      ]
    },
    {
      "id": "compensation",
      "title": "Compensation vestibulaire",
      "essential": [
        "Objectif : réduire vertige, nystagmus, biais induit et instabilité.",
        "La réorganisation centrale dépend de l’activité et de la non-restriction sensorielle.",
        "Plus la prise en charge est retardée, moins la rééducation est facile."
      ],
      "why": "La rééducation vise la plasticité : restauration, recalibration, substitution ou habituation selon le bilan.",
      "clinical": "Après une névrite, l’objectif prioritaire est d’obtenir une compensation centrale du déficit vestibulaire périphérique.",
      "details": [
        "Stratégies : restauration fonctionnelle, adaptation/recalibration, substitution sensorielle, habituation.",
        "Pas de traitement standard : le choix dépend du bilan et de l’observation.",
        "Éviter les sollicitations contradictoires dans une même séance.",
        "Objectiver l’évolution par les signes, les mesures et les questionnaires."
      ]
    },
    {
      "id": "sensory",
      "title": "Organisation sensorielle",
      "essential": [
        "Le sujet doit choisir instantanément la stratégie sensorielle adaptée.",
        "Une DNS correspond à un conflit, une préférence, une sous-utilisation ou un défaut d’intégration.",
        "Le CTSIB ou le SOT aident à objectiver les poids sensoriels."
      ],
      "why": "Cette partie explique les tableaux de PPPD, dépendance visuelle, cinétoses, syndrome de l’autoroute et presbyataxie.",
      "clinical": "Un patient très gêné en supermarché ou dans les grands espaces peut avoir une dépendance visuelle ou une DNS.",
      "details": [
        "Discordance visio-vestibulaire : mal des transports ou cinétose visuellement induite.",
        "Discordance visio-somesthésique : vertige des hauteurs, environnement pauvre en repères proches.",
        "Préférence sensorielle : stratégie unique devenue inadaptée.",
        "Rééducation : multisensorielle, personnalisée et progressive."
      ]
    }
  ],
  "assessment": {
    "title": "Bilan vestibulaire",
    "intro": "Le bilan sert à analyser le problème, quantifier les troubles, identifier une centralité, formuler l’hypothèse kinésithérapique, orienter le traitement et objectiver les résultats.",
    "sections": [
      {
        "letter": "A",
        "title": "Interrogatoire",
        "goal": "Comprendre le trouble et choisir la suite du bilan.",
        "look": "Début, évolution, nature du trouble, durée réelle, fréquence, déclencheurs, signes associés, terrain, traitements.",
        "orient": "VPPB, DPA, Ménière, migraine, DNS, centralité ou cause non vestibulaire.",
        "details": [
          "Demander : “décrivez-moi votre trouble avec un autre mot que vertige”.",
          "Différencier durée réelle de la crise et durée du retentissement.",
          "Rechercher signes auditifs, céphalées, migraines, cervicalgies, paresthésies, contexte viral/traumatique.",
          "Rechercher traitements cardiovasculaires ou ototoxiques."
        ]
      },
      {
        "letter": "B",
        "title": "Capteurs sensoriels périphériques",
        "goal": "Repérer ce qui influence l’équilibre en dehors du vestibule.",
        "look": "Vision, oculomotricité, audition, proprioception, neuropathies, ROT, cognition.",
        "orient": "Trouble mixte, substitution nécessaire, dépendance visuelle, risque de chute.",
        "details": [
          "Vision : cataracte, glaucome, DMLA, cécité, champ visuel, correction.",
          "Cochléo-vestibulaire : hypoacousie, acouphènes, cophose, appareillage.",
          "Somatosensoriel : proprioception, sensibilité profonde, neuropathies, ROT."
        ]
      },
      {
        "letter": "C",
        "title": "Oculomotricité",
        "goal": "Débrouiller les voies centrales oculogyres.",
        "look": "Saccades, poursuite, fixation, conjugaison, skew, IFO, vergence.",
        "orient": "Centralité possible si perturbations des voies oculomotrices.",
        "details": [
          "Poursuite saccadée : signe central possible.",
          "Gaze nystagmus : fixation excentrée instable.",
          "Disconjugaison : attention à l’ophtalmoplégie internucléaire.",
          "Skew positif : désalignement vertical, signe central possible."
        ]
      },
      {
        "letter": "D",
        "title": "VNS",
        "goal": "Observer nystagmus spontané, positionnel et réponses cinétiques.",
        "look": "Direction, fixation, loi d’Alexander, degrés, nystagmus positionnel, HST, HIT.",
        "orient": "Périphérique, central, VPPB, compensation ou asymétrie.",
        "details": [
          "Attendre l’amortissement des stimulations antérieures.",
          "Tête parfaitement immobile pour le spontané.",
          "Périphérique typique : inhibé par fixation, unidirectionnel, renforcé du côté de la phase rapide.",
          "Tout nystagmus positionnel ne justifie pas une manœuvre."
        ]
      },
      {
        "letter": "E",
        "title": "EVS",
        "goal": "Évaluer posture, latéralisation et cohérence des réponses.",
        "look": "Romberg, Fukuda, marche aveugle/Babinski-Weil.",
        "orient": "Syndrome harmonieux périphérique ou disharmonie centrale/mixte.",
        "details": [
          "Fukuda : 45 pas sur place, yeux fermés, bras tendus ; possible double tâche.",
          "Marche aveugle : déviation dynamique.",
          "Un seul test isolé n’est pas significatif.",
          "Une déviation cohérente du même côté évoque une latéralisation."
        ]
      },
      {
        "letter": "F",
        "title": "Épreuves rotatoires / fauteuil",
        "goal": "Mesurer et travailler les réponses vestibulaires selon vitesse et contexte.",
        "look": "Fixation, vection, réponses post-rotatoires, prépondérance, tolérance.",
        "orient": "Asymétrie, compensation, hypersensibilité, choix rééducatif.",
        "details": [
          "Fixation : ouvrir les yeux et fixer une cible après rotation.",
          "Vection : garder les yeux fermés et mesurer la sensation de tournis.",
          "Respecter la tolérance neurovégétative."
        ]
      },
      {
        "letter": "G",
        "title": "Questionnaires",
        "goal": "Objectiver la gêne fonctionnelle et la qualité de vie.",
        "look": "DHI, EEV, EVA selon contexte.",
        "orient": "Retentissement, suivi, preuve d’évolution.",
        "details": [
          "DHI : 25 situations de la vie quotidienne, score sur 100.",
          "EEV : retentissement fonctionnel.",
          "EVA : utile selon ressenti, mais moins adaptée si peu de douleur."
        ]
      },
      {
        "letter": "H",
        "title": "Posturographie / organisation sensorielle",
        "goal": "Étudier les poids sensoriels et suivre l’équilibre statique/dynamique.",
        "look": "CTSIB, SOT, VVS, vision asservie, sol stable/instable.",
        "orient": "DNS, dépendance visuelle, sous-utilisation vestibulaire, stratégie posturale.",
        "details": [
          "CTSIB : test clinique avec sol stable/instable, yeux ouverts/fermés, vision asservie.",
          "SOT : six conditions, dont les conditions yeux fermés sur sol instable ciblent fortement l’entrée vestibulaire.",
          "Dès que le patient décroise les bras ou fait un écart, cela peut être compté comme une chute selon protocole."
        ]
      }
    ],
    "redFlags": [
      "Céphalée inhabituelle ou brutale.",
      "Diplopie, dysarthrie, dysphagie.",
      "Paresthésies, déficit moteur ou sensitif.",
      "Ataxie majeure ou marche impossible sans aide.",
      "Nystagmus vertical, multidirectionnel, gaze nystagmus ou non inhibé par fixation.",
      "Skew positif dans un contexte compatible.",
      "Signes des paires crâniennes, syndrome cérébelleux, syndrome extra-pyramidal ou CBH.",
      "Évolution défavorable ou incohérente malgré une prise en charge correcte."
    ],
    "tracking": [
      "Symptômes et fréquence des crises.",
      "DHI / EEV / EVA.",
      "Nystagmus spontané et positionnel.",
      "Prépondérance directionnelle si mesurable.",
      "EVS et marche.",
      "CTSIB / SOT / VVS selon besoin.",
      "Tolérance neurovégétative.",
      "Autonomie et exercices à domicile."
    ]
  },
  "tests": [
    {
      "cat": "Oculomotricité",
      "name": "Saccades / test des index",
      "purpose": "Repérer dysmétrie, hypermétrie, hypométrie ou trouble oculomoteur central.",
      "procedure": "Deux index devant le patient ; demander de passer rapidement du regard de droite à gauche.",
      "normal": "Saccades rapides, précises, symétriques.",
      "alert": "Dysmétrie, lenteur, hypométrie/hypermétrie, irrégularité.",
      "trap": "Ne pas conclure seul ; intégrer au reste de l’examen neurologique."
    },
    {
      "cat": "Oculomotricité",
      "name": "Poursuite oculaire",
      "purpose": "Explorer la poursuite binoculaire et monoculaire.",
      "procedure": "Faire suivre un doigt ou objet lentement, horizontalement puis verticalement.",
      "normal": "Poursuite lisse et homogène.",
      "alert": "Poursuite saccadée ou asymétrique : centralité possible.",
      "trap": "Âge, attention, vision et fatigue influencent."
    },
    {
      "cat": "Oculomotricité",
      "name": "Fixation / gaze nystagmus",
      "purpose": "Rechercher la stabilité du regard excentré.",
      "procedure": "Fixation d’un point central puis excentré, éventuellement sous VNS.",
      "normal": "Fixation stable.",
      "alert": "Nystagmus du regard excentré ou fixation impossible.",
      "trap": "Distinguer gaze nystagmus central et loi d’Alexander périphérique."
    },
    {
      "cat": "Oculomotricité",
      "name": "Conjugaison des yeux",
      "purpose": "Vérifier que les deux yeux bougent ensemble.",
      "procedure": "Observer les deux yeux pendant mouvements horizontaux et verticaux.",
      "normal": "Mouvements conjugués et symétriques.",
      "alert": "Disconjugaison, nystagmus différent entre les yeux, ophtalmoplégie internucléaire.",
      "trap": "Filmer les deux yeux si possible, pas seulement un œil."
    },
    {
      "cat": "Oculomotricité",
      "name": "Skew deviation",
      "purpose": "Rechercher un désalignement vertical des pupilles.",
      "procedure": "Cover test alterné : cacher/découvrir les yeux.",
      "normal": "Pas de correction verticale.",
      "alert": "Correction verticale : centralité possible.",
      "trap": "À interpréter avec HINTS et le contexte clinique."
    },
    {
      "cat": "Oculomotricité",
      "name": "IFO",
      "purpose": "Tester l’effet inhibiteur de la fixation sur le nystagmus.",
      "procedure": "Comparer nystagmus avec et sans fixation selon matériel.",
      "normal": "La fixation diminue un nystagmus périphérique.",
      "alert": "Absence d’inhibition par fixation : signe central possible.",
      "trap": "Dépend fortement du contexte et du matériel."
    },
    {
      "cat": "Oculomotricité",
      "name": "Vergence / convergence",
      "purpose": "Repérer un trouble de convergence ou besoin d’avis orthoptique.",
      "procedure": "Rapprocher un crayon du nez et observer convergence/symptômes.",
      "normal": "Convergence symétrique et tolérée.",
      "alert": "Diplopie, insuffisance, gêne importante.",
      "trap": "Peut expliquer une partie des symptômes sans être un trouble vestibulaire primaire."
    },
    {
      "cat": "VNS / nystagmus",
      "name": "Nystagmus spontané",
      "purpose": "Repérer asymétrie vestibulaire ou signe central.",
      "procedure": "Patient assis, masque, tête immobile, attendre amortissement des stimulations.",
      "normal": "Absence ou diminution selon récupération.",
      "alert": "Vertical, multidirectionnel, gaze nystagmus, non inhibé par fixation.",
      "trap": "Noter degré et effet de la fixation."
    },
    {
      "cat": "VNS / nystagmus",
      "name": "Nystagmus positionnel",
      "purpose": "Rechercher VPPB ou nystagmus positionnel atypique.",
      "procedure": "Tests positionnels adaptés au canal suspecté.",
      "normal": "Latence, paroxysme, fatigabilité, reproductibilité, inversion à la verticalisation.",
      "alert": "Non fatigable, prolongé, direction incohérente ou signes neurologiques.",
      "trap": "Tout nystagmus positionnel n’est pas un VPPB."
    },
    {
      "cat": "VNS / nystagmus",
      "name": "Loi d’Alexander",
      "purpose": "Interpréter un nystagmus périphérique spontané.",
      "procedure": "Observer le nystagmus regard centre, regard droit, regard gauche.",
      "normal": "Renforcement dans le regard du côté de la phase rapide.",
      "alert": "Changement de direction selon le regard.",
      "trap": "Ne pas confondre renforcement périphérique et nystagmus central direction-changeant."
    },
    {
      "cat": "VNS / nystagmus",
      "name": "Degrés du nystagmus",
      "purpose": "Coter l’intensité du nystagmus spontané.",
      "procedure": "Observer selon orientation du regard.",
      "normal": "Diminution au fil de la compensation.",
      "alert": "Persistance ou aggravation.",
      "trap": "Toujours comparer avec symptômes et évolution."
    },
    {
      "cat": "Tests cinétiques",
      "name": "ERI",
      "purpose": "Mesurer une prépondérance directionnelle en fréquence.",
      "procedure": "Rotation horaire/antihoraire, comptage pré/post-rotatoire, répétition 2-3 fois.",
      "normal": "Symétrie à 1 ou 2 secousses près.",
      "alert": "Nombre très élevé ou asymétrie importante.",
      "trap": "Ne donne pas la vitesse de phase lente ; test moins utilisé."
    },
    {
      "cat": "Tests cinétiques",
      "name": "Rotation sinusoïdale",
      "purpose": "Objectiver une prépondérance directionnelle en vitesse.",
      "procedure": "Test sinusoïdal à moyenne fréquence sous logiciel, analyse de la cumulée.",
      "normal": "Cumulée horizontale.",
      "alert": "Cumulée nettement orientée.",
      "trap": "La phase lente est opposée au sens du nystagmus défini par la saccade."
    },
    {
      "cat": "Tests cinétiques",
      "name": "HST",
      "purpose": "Révéler une asymétrie après stimulation rapide.",
      "procedure": "Mouvements horizontaux de tête environ 10 secondes à 2 Hz puis observation.",
      "normal": "Pas de nystagmus post-dynamique significatif.",
      "alert": "Nystagmus provoqué net.",
      "trap": "Lire avec le nystagmus spontané et le contexte central/périphérique."
    },
    {
      "cat": "Tests cinétiques",
      "name": "HIT",
      "purpose": "Tester le RVO à haute vitesse.",
      "procedure": "Impulsion passive rapide, faible amplitude, patient fixe une cible.",
      "normal": "Pas de saccade de rattrapage.",
      "alert": "Overt saccade ou covert saccade du côté stimulé.",
      "trap": "HIT normal dans un vertige aigu continu peut être central."
    },
    {
      "cat": "Tests cinétiques",
      "name": "vHIT",
      "purpose": "Quantifier le gain du RVO et les saccades de refixation.",
      "procedure": "Impulsions rapides avec caméra et logiciel.",
      "normal": "Gain conservé, pas de saccades pathologiques.",
      "alert": "Gain diminué, overt/covert saccades.",
      "trap": "Très utile pour objectiver la compensation à haute vitesse."
    },
    {
      "cat": "Tests cinétiques",
      "name": "Acuité visuelle dynamique",
      "purpose": "Mesurer la lecture pendant mouvements de tête.",
      "procedure": "Lecture de lettres avec mouvements rapides de tête, en 2D ou écran.",
      "normal": "Faible perte par rapport à l’acuité statique.",
      "alert": "Perte directionnelle ou globale importante.",
      "trap": "Vision, attention et fatigue influencent."
    },
    {
      "cat": "EVS",
      "name": "Romberg",
      "purpose": "Évaluer équilibre statique et poids de l’entrée visuelle.",
      "procedure": "Debout pieds joints, yeux ouverts puis fermés ; sensibilisation possible par mouvements de tête.",
      "normal": "Stabilité maintenue.",
      "alert": "Chute ou oscillations majeures.",
      "trap": "Un Romberg seul ne localise pas."
    },
    {
      "cat": "EVS",
      "name": "Fukuda",
      "purpose": "Rechercher une latéralisation vestibulo-spinale.",
      "procedure": "45 pas sur place, yeux fermés, bras tendus ; double tâche possible.",
      "normal": "Déviation faible.",
      "alert": "Déviation répétée ≥ 30° ou cohérente avec les autres EVS.",
      "trap": "Ne pas conclure sur un test isolé."
    },
    {
      "cat": "EVS",
      "name": "Marche aveugle / Babinski-Weil",
      "purpose": "Analyser la marche sans repère visuel.",
      "procedure": "3 pas avant, 3 pas arrière, répéter, yeux fermés.",
      "normal": "Trajectoire stable.",
      "alert": "Déviation ou marche en étoile.",
      "trap": "L’harmonie ou disharmonie avec les autres EVS compte plus que le test isolé."
    },
    {
      "cat": "Organisation sensorielle",
      "name": "CTSIB",
      "purpose": "Identifier la stratégie sensorielle en clinique.",
      "procedure": "Sol stable/instable, yeux ouverts/fermés, vision asservie selon matériel.",
      "normal": "Adaptation aux conditions.",
      "alert": "Échec dans conditions isolant une entrée sensorielle.",
      "trap": "Utile et peu coûteux, mais doit être relié au tableau."
    },
    {
      "cat": "Organisation sensorielle",
      "name": "SOT",
      "purpose": "Objectiver l’organisation sensorielle sur plateforme.",
      "procedure": "6 conditions : sol stable/instable, yeux ouverts/fermés, vision asservie.",
      "normal": "Adaptation cohérente.",
      "alert": "Dépendance visuelle, sous-utilisation vestibulaire, stratégie inadaptée.",
      "trap": "Les conditions yeux fermés sur sol instable ciblent fortement le vestibule."
    },
    {
      "cat": "Organisation sensorielle",
      "name": "VVS",
      "purpose": "Étudier la perception de la verticale.",
      "procedure": "Réglage subjectif d’une ligne verticale.",
      "normal": "Verticale proche de la verticale réelle.",
      "alert": "Déviation significative.",
      "trap": "À relier aux données otolithiques ou centrales."
    },
    {
      "cat": "Questionnaires",
      "name": "DHI",
      "purpose": "Mesurer la gêne fonctionnelle.",
      "procedure": "25 situations d’activités de la vie quotidienne, score sur 100.",
      "normal": "Score faible ou amélioration.",
      "alert": "Score élevé ou stagnation.",
      "trap": "Subjectif, mais indispensable pour objectiver le vécu."
    },
    {
      "cat": "Questionnaires",
      "name": "EEV / EVA",
      "purpose": "Suivre retentissement et intensité ressentie.",
      "procedure": "Questionnaire ou échelle selon contexte.",
      "normal": "Diminution au fil de la prise en charge.",
      "alert": "Aggravation malgré rééducation.",
      "trap": "Toujours croiser avec signes cliniques."
    }
  ],
  "pathologies": {
    "families": [
      {
        "id": "peripheral",
        "name": "Atteintes périphériques",
        "tone": "blue",
        "text": "Capteur/labyrinthe : déficit aigu, fluctuation, bilatéralité, VPPB, vestibulotoxicité."
      },
      {
        "id": "central",
        "name": "Atteintes centrales",
        "tone": "red",
        "text": "Tronc cérébral, cervelet, voies oculomotrices : sécurité, centralité, réorientation."
      },
      {
        "id": "dns",
        "name": "Désorganisations neurosensorielles",
        "tone": "green",
        "text": "Conflits sensoriels, préférences, sous-utilisation, défaut d’intégration."
      }
    ],
    "items": [
      {
        "family": "Périphérique",
        "name": "VPPB",
        "definition": "Vertige positionnel paroxystique bénin lié à un trouble otolithique.",
        "time": "Secondes, déclenché par coucher, lever, rotation dans le lit.",
        "signs": "Nystagmus avec latence, paroxysme, fatigabilité, reproductibilité, inversion à la verticalisation.",
        "assessment": "Tests positionnels + lecture canal/côté/type de lithiase.",
        "rehab": "Déterminer le canal incriminé et vidanger complètement.",
        "avoid": "Manœuvre systématique devant n’importe quel nystagmus positionnel."
      },
      {
        "family": "Périphérique",
        "name": "DPA / névrite vestibulaire",
        "definition": "Syndrome vestibulaire brutal par interruption unilatérale des influx vestibulaires.",
        "time": "Grand vertige rotatoire aigu, nausées/vomissements, puis régression progressive.",
        "signs": "Pas de signe auditif/neuro typique, HIT déficitaire possible, prépondérance directionnelle.",
        "assessment": "Sécurité, HINTS si contexte, VNS/VNG, HIT, HST, EVS.",
        "rehab": "Compensation centrale du déficit vestibulaire périphérique.",
        "avoid": "Traiter sans exclure centralité."
      },
      {
        "family": "Périphérique",
        "name": "Ménière",
        "definition": "Maladie fluctuante par crises de plusieurs heures avec triade : vertige, signes auditifs, surdité fluctuante.",
        "time": "Crises longues, périodes intercritiques ; évolution imprévisible.",
        "signs": "Acouphènes, plénitude, hypoacousie fluctuante, vertige de plusieurs heures.",
        "assessment": "ORL, suivi de la fluctuation, état de réflectivité, VNS/VNG selon contexte.",
        "rehab": "Hors crise, selon réflectivité et séquelles ; travail au fauteuil selon bilan.",
        "avoid": "Rééducation vestibulaire en période critique."
      },
      {
        "family": "Périphérique",
        "name": "Aréflexie vestibulaire bilatérale",
        "definition": "Désafférentation bilatérale progressive, souvent toxique, touchant les vestibules.",
        "time": "Instabilité chronique, surtout obscurité/yeux fermés ; souvent pas de vertige.",
        "signs": "Oscillopsie, EVS très instables, HIT bilatéral, forte hypo/aréflexie VNG.",
        "assessment": "VNS/VNG, vHIT, acuité dynamique, EVS, gammes de vitesse exploitables.",
        "rehab": "Développer substitution visuelle et proprioceptive, sécurité, prévention chute.",
        "avoid": "Faire comme si un RVO efficace était récupérable sans bilan."
      },
      {
        "family": "Périphérique",
        "name": "Vestibulotoxicité",
        "definition": "Atteinte toxique, notamment par certains aminoglycosides, avec risque bilatéral.",
        "time": "Progressive, parfois irréversible.",
        "signs": "Instabilité, oscillopsie, atteinte bilatérale, troubles auditifs possibles.",
        "assessment": "Interrogatoire thérapeutique, VNG/vHIT, acuité dynamique.",
        "rehab": "Substitution et prévention, coordination médicale.",
        "avoid": "Oublier l’interrogatoire médicamenteux."
      },
      {
        "family": "Central",
        "name": "SEP",
        "definition": "Atteinte démyélinisante pouvant toucher voies vestibulaires/oculomotrices.",
        "time": "Variable, sujet souvent jeune ; vertige rarement inaugural mais possible.",
        "signs": "Nystagmus disconjugué, ophtalmoplégie internucléaire, troubles équilibre.",
        "assessment": "Oculomotricité, conjugaison, VNS, orientation neurologique/IRM.",
        "rehab": "Adapter au tableau neurologique et au contrôle de fixation.",
        "avoid": "Banaliser un vertige inexpliqué sans surdité chez adulte jeune."
      },
      {
        "family": "Central",
        "name": "AVC / Wallenberg",
        "definition": "Atteinte vasculaire centrale, souvent circulation postérieure ou bulbe latéral.",
        "time": "Aiguë, parfois vertige violent.",
        "signs": "Céphalée, vomissements, hoquets, signes cérébelleux, CBH, atteintes IX/X/XI, troubles sensitifs.",
        "assessment": "Red flags, HINTS si contexte, examen neurologique, urgence.",
        "rehab": "Réorientation médicale immédiate ; rééducation spécialisée ensuite si indiquée.",
        "avoid": "Traiter comme une névrite sans tri neurologique."
      },
      {
        "family": "Central",
        "name": "Insuffisance vertébro-basilaire",
        "definition": "Épisodes ischémiques transitoires de la circulation postérieure.",
        "time": "Transitoire, répété.",
        "signs": "Vertige jamais isolé : troubles visuels, dysarthrie, troubles pyramidaux, drop attack.",
        "assessment": "Interrogatoire précis des signes transitoires, réorientation médicale.",
        "rehab": "Pas de rééducation avant clarification médicale.",
        "avoid": "Conclure sur un vertige isolé."
      },
      {
        "family": "Central / fonctionnel",
        "name": "Migraine vestibulaire",
        "definition": "Crises vertigineuses associées à terrain migraineux ou aura.",
        "time": "Crises variables, parfois sans céphalée nette.",
        "signs": "Vertige sans surdité, photophobie/phonophobie, aura, antécédents migraineux.",
        "assessment": "Interrogatoire, exclusion red flags, sensibilité visuelle, facteurs déclenchants.",
        "rehab": "Traitement médical associé, exposition progressive aux flux optiques si indiqué, travail cervical si associé.",
        "avoid": "La confondre systématiquement avec Ménière."
      },
      {
        "family": "Central / mixte",
        "name": "Commotion cérébrale",
        "definition": "Troubles vestibulaires centraux et/ou périphériques après traumatisme crânien.",
        "time": "Après choc, évolution variable.",
        "signs": "Vertiges, troubles oculomoteurs, céphalées, intolérance visuelle, équilibre perturbé.",
        "assessment": "Oculomotricité, RVO, symptômes, red flags, progression tolérée.",
        "rehab": "Traiter les dysfonctions centrales et périphériques associées, progressivité stricte.",
        "avoid": "Rééducation trop intense trop tôt."
      },
      {
        "family": "DNS",
        "name": "PPPD / dépendance visuelle",
        "definition": "Vertige perceptif postural persistant et préférence visuelle inadaptée.",
        "time": "Chronique, souvent environnement-dépendant.",
        "signs": "Gêne en foule, supermarché, grands espaces, flux visuels, évitement.",
        "assessment": "CTSIB/SOT, questionnaires, identification du stimulus nociceptif.",
        "rehab": "Habituation par exposition progressive, optocinétique/VR, transfert du poids sensoriel.",
        "avoid": "Surstimulation entraînant hypersensibilisation."
      },
      {
        "family": "DNS",
        "name": "Cinétoses",
        "definition": "Malaise par conflit sensoriel visio-vestibulaire, intra-vestibulaire ou visio-somesthésique.",
        "time": "Déclenchée par transport, écrans, VR, attractions, hauteur.",
        "signs": "Nausées, malaise, vertige, intolérance aux mouvements ou flux.",
        "assessment": "Identifier le type de conflit sensoriel.",
        "rehab": "Habituation aux stimuli cinétogènes et augmentation du seuil de tolérance.",
        "avoid": "Exposition trop forte dès le départ."
      },
      {
        "family": "DNS",
        "name": "Syndrome de l’autoroute",
        "definition": "Anomalie d’intégration des flux optiques radiaux, souvent champs visuels temporaux.",
        "time": "Situationnel : autoroute, tunnel, lignes droites, vitesse visuelle.",
        "signs": "Panique ou incapacité de conduite, ralentissement, incapacité à regarder droit.",
        "assessment": "Interrogatoire spécifique, dépendance visuelle, optocinétique/VR.",
        "rehab": "Exposition graduée aux flux optiques, rééducation visuelle dynamique.",
        "avoid": "Réduire le tableau à une anxiété isolée."
      },
      {
        "family": "DNS",
        "name": "Presbyataxie",
        "definition": "Déséquilibre du sujet âgé par baisse globale des afférences ou défaut d’intégration.",
        "time": "Chronique progressive.",
        "signs": "Instabilité, explorations parfois normales ou peu contributives.",
        "assessment": "Capteurs, CTSIB/SOT, risque de chute, marche.",
        "rehab": "Sollicitation multisensorielle et prévention des chutes.",
        "avoid": "Chercher uniquement une lésion vestibulaire unique."
      },
      {
        "family": "DNS / otolithique",
        "name": "Désordres otolithiques",
        "definition": "Troubles liés au système maculaire/otolithique.",
        "time": "Variable selon atteinte.",
        "signs": "Désorientation, trouble de verticalité, symptômes selon mouvements ou gravité.",
        "assessment": "Interrogatoire, VVS, oVEMP/cVEMP si bilans ORL disponibles.",
        "rehab": "Solliciter préférentiellement le système maculaire en cause selon bilan.",
        "avoid": "Assimiler automatiquement à VPPB."
      }
    ]
  },
  "rehab": {
    "objectives": [
      {
        "name": "Compensation centrale",
        "when": "DPA, déficit unilatéral périphérique, suite de névrite.",
        "why": "Réduire biais vestibulaire, vertige, nystagmus et instabilité.",
        "tools": "Mouvements actifs, fauteuil selon bilan, stabilisation du regard, mise en conflit progressive.",
        "progression": "Augmenter vitesse, durée, amplitude, complexité sensorielle et tâche.",
        "measure": "Nystagmus, prépondérance, EVS, DHI/EEV, tolérance neurovégétative.",
        "pitfalls": "Attendre trop longtemps ; surstimuler ; mélanger des sollicitations contradictoires."
      },
      {
        "name": "Symétrisation / baisse de prépondérance",
        "when": "Prépondérance directionnelle nystagmique ou asymétrie mesurée.",
        "why": "Réharmoniser les réponses droite/gauche.",
        "tools": "Fauteuil, fixation, vection, stimulation orientée selon bilan.",
        "progression": "Adapter au résultat immédiat et au seuil de tolérance.",
        "measure": "VNS/VNG, cumulée, temps de réponse, questionnaires.",
        "pitfalls": "Poursuivre sans réévaluer ; si prépondérance ne se réduit jamais, demander avis ORL."
      },
      {
        "name": "Substitution sensorielle",
        "when": "Aréflexie bilatérale ou entrée vestibulaire peu exploitable.",
        "why": "Utiliser vision et proprioception comme béquilles fonctionnelles.",
        "tools": "Travail postural, repères visuels, supports variés, stratégies de marche, prévention chute.",
        "progression": "Du stable vers l’instable, du simple vers le complexe, sécurité prioritaire.",
        "measure": "EVS, marche, acuité dynamique, chutes, autonomie.",
        "pitfalls": "Retirer trop vite les aides ou les repères."
      },
      {
        "name": "Habituation",
        "when": "Cinétoses, PPPD, dépendance visuelle, hypersensibilité aux mouvements.",
        "why": "Augmenter le seuil de tolérance vestibulaire et neurovégétatif.",
        "tools": "Exposition graduée, optocinétique, VR, mouvements répétés.",
        "progression": "Intensité faible, durée courte, augmentation lente.",
        "measure": "Tolérance pendant/après séance, DHI/EEV, exposition fonctionnelle.",
        "pitfalls": "Transformer habituation en hypersensibilisation par surdosage."
      },
      {
        "name": "Stabilisation du regard",
        "when": "Oscillopsie, déficit du RVO, difficulté visuelle aux mouvements de tête.",
        "why": "Améliorer la fixation pendant mouvements.",
        "tools": "Cible fixe/mobile, laser, acuité dynamique, vHIT si disponible.",
        "progression": "Vitesse, durée, plans de mouvement, posture, double tâche.",
        "measure": "Acuité dynamique, saccades, gêne fonctionnelle, lecture en mouvement.",
        "pitfalls": "Confondre vitesse et qualité ; provoquer céphalées ou malaise durable."
      },
      {
        "name": "Rééducation multisensorielle",
        "when": "DNS, dépendance visuelle, sous-utilisation vestibulaire, conflit sensoriel.",
        "why": "Réapprendre à choisir la stratégie sensorielle appropriée.",
        "tools": "CTSIB/SOT, supports instables, vision asservie, leurres sensoriels, optocinétique, VR.",
        "progression": "Identifier le conflit puis exposer progressivement.",
        "measure": "Organisation sensorielle, équilibre, tolérance aux environnements complexes.",
        "pitfalls": "Tout traiter pareil sans identifier le type de DNS."
      },
      {
        "name": "Sédation / prudence centrale",
        "when": "Atteintes centrales, hyperfréquence, nystagmus central, levée d’inhibition.",
        "why": "Diminuer l’intensité des réponses sans aggraver.",
        "tools": "Fauteuil baguette basse vitesse, stimulation sous seuil, proprioception prudente, position d’inhibition.",
        "progression": "Très progressive, selon symptômes et signes neuro.",
        "measure": "Nystagmus, fixation, équilibre, symptômes.",
        "pitfalls": "Optocinétique abusive ou vitesse excessive si nystagmus trop intense."
      },
      {
        "name": "ETP / domicile",
        "when": "Toutes prises en charge, surtout chroniques.",
        "why": "Renforcer autonomie, observance, compréhension et qualité de vie.",
        "tools": "Explications, objectifs simples, carnet, programme personnalisé, critères d’arrêt.",
        "progression": "Adapter à l’évolution ; contrôle régulier.",
        "measure": "Autonomie, observance, questionnaires, retentissement.",
        "pitfalls": "Auto-manœuvres VPPB non indiquées ; consignes floues."
      }
    ],
    "matrix": [
      [
        "DPA / névrite",
        "Compensation centrale + stabilisation du regard."
      ],
      [
        "Ménière",
        "Hors crise : technique selon réflectivité ; éviter période critique."
      ],
      [
        "Aréflexie bilatérale",
        "Substitution sensorielle + prévention chute + stabilisation si possible."
      ],
      [
        "Central",
        "Prudence, sédation, proprioception dosée, éviter surstimulation."
      ],
      [
        "Migraine vestibulaire",
        "Traitement médical associé + exposition progressive aux flux si indiqué."
      ],
      [
        "PPPD / dépendance visuelle",
        "Habituation + optocinétique/VR + réorganisation sensorielle."
      ],
      [
        "DNS",
        "Identifier conflit/prédominance/sous-utilisation puis rééducation multisensorielle."
      ],
      [
        "VPPB",
        "Déterminer canal/côté/type puis manœuvre adaptée si tableau typique."
      ]
    ],
    "criteria": [
      "Mesurer la prépondérance directionnelle nystagmique sur le RVO.",
      "Vérifier l’amélioration vestibulo-spinale.",
      "Étudier les poids respectifs des entrées sensorielles et corriger les défauts de stratégie.",
      "Utiliser plusieurs tests pour vérifier reproductibilité et crédibilité.",
      "Mesurer la gêne fonctionnelle ressentie par le patient.",
      "Demander un nouvel avis ORL si une prépondérance ne se réduit jamais malgré une physiothérapie bien conduite."
    ]
  },
  "cases": [
    {
      "title": "Vertige bref au lit",
      "level": "Base",
      "presentation": "Vertige de quelques secondes au coucher et lors des rotations dans le lit.",
      "steps": [
        [
          "Hypothèse",
          "VPPB possible."
        ],
        [
          "Questions utiles",
          "Durée réelle ? Latence ? Position déclenchante ? Retentissement ou crise elle-même ?"
        ],
        [
          "Tests",
          "Tests positionnels adaptés au canal suspecté."
        ],
        [
          "Interprétation",
          "Chercher latence, paroxysme, fatigabilité, reproductibilité, inversion à la verticalisation."
        ],
        [
          "Décision",
          "Si typique : déterminer canal/côté/type puis manœuvre adaptée. Si atypique : reconsidérer."
        ]
      ],
      "trap": "Positionnel ne veut pas automatiquement dire VPPB."
    },
    {
      "title": "Vertige aigu continu",
      "level": "Sécurité",
      "presentation": "Grand vertige rotatoire continu depuis 18 heures, nausées, marche difficile.",
      "steps": [
        [
          "Hypothèse",
          "Syndrome vestibulaire aigu : périphérique ou central."
        ],
        [
          "Sécurité",
          "Chercher céphalée, diplopie, dysarthrie, dysphagie, ataxie, signes neurologiques."
        ],
        [
          "Tests",
          "HINTS complet seulement si contexte compatible."
        ],
        [
          "Interprétation",
          "HIT normal, nystagmus vertical/direction-changeant ou skew positif : central suspect."
        ],
        [
          "Décision",
          "Réorienter en urgence si centralité possible."
        ]
      ],
      "trap": "HINTS n’est pas une checklist universelle."
    },
    {
      "title": "Gêne en supermarché",
      "level": "DNS",
      "presentation": "Instabilité chronique, gêne dans les rayons, foule, grands espaces et environnements mobiles.",
      "steps": [
        [
          "Hypothèse",
          "PPPD / dépendance visuelle / DNS."
        ],
        [
          "Bilan",
          "CTSIB/SOT, questionnaires, identification du stimulus nociceptif."
        ],
        [
          "Interprétation",
          "Préférence visuelle, conflit ou défaut d’intégration sensorielle."
        ],
        [
          "Rééducation",
          "Exposition graduée, optocinétique ou VR, transfert du poids sensoriel."
        ],
        [
          "Suivi",
          "Tolérance neurovégétative + DHI/EEV + situations réelles."
        ]
      ],
      "trap": "Ne pas surstimuler."
    },
    {
      "title": "Oscillopsie dans l’obscurité",
      "level": "RVO",
      "presentation": "Flou visuel à la marche, surtout en tournant la tête et dans l’obscurité.",
      "steps": [
        [
          "Hypothèse",
          "Déficit RVO, possiblement bilatéral si obscurité très gênante."
        ],
        [
          "Tests",
          "HIT/vHIT, acuité visuelle dynamique, EVS."
        ],
        [
          "Interprétation",
          "Saccades de rattrapage, gain diminué, forte dépendance visuelle."
        ],
        [
          "Rééducation",
          "Stabilisation du regard + substitution sensorielle."
        ],
        [
          "Sécurité",
          "Prévention chute et stratégies fonctionnelles."
        ]
      ],
      "trap": "Ne pas chercher uniquement un VPPB."
    },
    {
      "title": "Crises avec signes auditifs",
      "level": "Pathologie",
      "presentation": "Crises de plusieurs heures avec plénitude d’oreille, acouphènes et hypoacousie fluctuante.",
      "steps": [
        [
          "Hypothèse",
          "Ménière possible."
        ],
        [
          "Bilan",
          "Suivi ORL, caractère fluctuant, état de réflectivité."
        ],
        [
          "Prudence",
          "Pas de rééducation vestibulaire en période critique."
        ],
        [
          "Rééducation",
          "Hors crise, selon séquelles et bilan."
        ],
        [
          "Suivi",
          "Fréquence des crises, signes auditifs, instabilité résiduelle."
        ]
      ],
      "trap": "Ne pas poser un diagnostic définitif dès la première crise."
    },
    {
      "title": "Vertige inexpliqué chez adulte jeune",
      "level": "Central",
      "presentation": "Vertiges sans surdité, troubles visuels intermittents, fatigue, sujet jeune.",
      "steps": [
        [
          "Hypothèse",
          "Central à exclure, dont SEP selon contexte."
        ],
        [
          "Tests",
          "Oculomotricité, conjugaison, VNS, skew, fixation."
        ],
        [
          "Signes",
          "Nystagmus disconjugué ou ophtalmoplégie internucléaire."
        ],
        [
          "Décision",
          "Réorientation médicale si suspicion."
        ],
        [
          "Rééducation",
          "Seulement après clarification et selon cadre neurologique."
        ]
      ],
      "trap": "Ne pas rassurer uniquement parce qu’il n’y a pas de surdité."
    },
    {
      "title": "Autoroute / tunnel",
      "level": "DNS",
      "presentation": "Perte de confiance en conduite sur autoroute, tunnels et lignes rapides ; ralentissement important.",
      "steps": [
        [
          "Hypothèse",
          "Syndrome de l’autoroute / sensibilité au flux optique radial."
        ],
        [
          "Bilan",
          "Déclencheurs visuels, dépendance visuelle, organisation sensorielle."
        ],
        [
          "Rééducation",
          "Optocinétique/VR, exposition progressive, retour fonctionnel gradué."
        ],
        [
          "Suivi",
          "Tolérance, capacité de conduite progressive, évitement."
        ],
        [
          "Prudence",
          "Doser pour éviter hypersensibilisation."
        ]
      ],
      "trap": "Ne pas réduire à une anxiété pure."
    },
    {
      "title": "Fukuda isolé positif",
      "level": "Piège",
      "presentation": "Le patient dévie au Fukuda, mais Romberg et marche aveugle sont peu cohérents.",
      "steps": [
        [
          "Hypothèse",
          "Résultat isolé non concluant."
        ],
        [
          "Bilan",
          "Comparer les EVS et le contexte."
        ],
        [
          "Interprétation",
          "Harmonieux si plusieurs tests dévient du même côté ; disharmonieux si discordant."
        ],
        [
          "Décision",
          "Reprendre interrogatoire, capteurs et signes centraux."
        ],
        [
          "Suivi",
          "Ne pas fonder la rééducation sur un seul test."
        ]
      ],
      "trap": "Le cours insiste sur la cohérence, pas sur un test isolé."
    }
  ]
};
