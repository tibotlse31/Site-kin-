window.VESTIBULAR_DATA = {
  modules: [
    { id: 'bases', icon: '🧠', title: 'Bases vestibulaires', summary: 'RVO, nystagmus, compensation, substitution et logique sensorielle.', tags: ['micro-fiches', 'physio'] },
    { id: 'bilan', icon: '🧾', title: 'Bilan guidé', summary: 'Parcours clinique : interrogatoire, oculomotricité, VNS, posture, questionnaires.', tags: ['pas à pas', 'clinique'] },
    { id: 'tests', icon: '👁️', title: 'Tests cliniques', summary: 'Fiches standardisées : objectif, procédure, normal, pathologique, pièges.', tags: ['fiches', 'pratique'] },
    { id: 'drapeaux', icon: '🚨', title: 'Drapeaux rouges', summary: 'Centralité, signes neurologiques, HINTS et conduites à tenir.', tags: ['urgence', 'tri'] },
    { id: 'pathologies', icon: '🦠', title: 'Pathologies', summary: 'Périphérique, central, désorganisations neurosensorielles et diagnostics différentiels.', tags: ['comparatif', 'diagnostic'] },
    { id: 'reeducation', icon: '🛠️', title: 'Rééducation', summary: 'Techniques par objectifs : compensation, habituation, substitution, stabilisation.', tags: ['protocoles', 'outils'] },
    { id: 'cas', icon: '🧪', title: 'Cas cliniques', summary: 'Scénarios interactifs avec questions, réponses au clic et explications.', tags: ['interactif', 'raisonnement'] },
    { id: 'checklists', icon: '✅', title: 'Checklists', summary: 'Listes rapides pour bilan, centralité, tests, traitement et suivi.', tags: ['terrain', 'révision'] }
  ],

  bases: [
    {
      title: 'RVO — réflexe vestibulo-oculaire',
      badge: 'Stabilisation du regard',
      color: 'blue',
      short: 'Compense les rotations de la tête pour maintenir l’image stable sur la rétine.',
      key: ['Réflexe très rapide', 'Permet la stabilité visuelle pendant le mouvement', 'Exploré par HIT, vHIT, fauteuil, acuité dynamique'],
      clinical: 'Si le RVO est déficitaire, la tête embarque les yeux et le patient doit rattraper la cible par une saccade.'
    },
    {
      title: 'Nystagmus physiologique',
      badge: 'Normal si recentrage',
      color: 'green',
      short: 'Pendant une rotation, alternance de phase lente vestibulaire et phase rapide de recentrage.',
      key: ['Défini par le sens de la phase rapide', 'Physiologique si les yeux recentrent le regard', 'Post-rotatoire attendu après stimulation'],
      clinical: 'Après arrêt d’une rotation, le nystagmus post-rotatoire bat dans le sens opposé au déplacement d’endolymphe initial.'
    },
    {
      title: 'Nystagmus pathologique',
      badge: 'Signe à interpréter',
      color: 'orange',
      short: 'Peut révéler une asymétrie vestibulaire périphérique ou une atteinte centrale selon son contexte.',
      key: ['Périphérique : souvent unidirectionnel et inhibé par fixation', 'Central : vertical, multiple, disconjugué ou gaze nystagmus', 'Toujours recouper avec l’interrogatoire et les autres tests'],
      clinical: 'Un nystagmus vertical spontané ou multidirectionnel doit faire reconsidérer une hypothèse centrale.'
    },
    {
      title: 'Compensation vestibulaire',
      badge: 'Objectif thérapeutique',
      color: 'purple',
      short: 'Réorganisation centrale après déficit vestibulaire pour réduire vertige, nystagmus et déséquilibre.',
      key: ['Favorisée par le mouvement', 'Dépend de l’activité neuronale', 'Différente de la simple récupération périphérique'],
      clinical: 'Plus la prise en charge entretient l’activité sensorimotrice adaptée, plus la compensation est facilitée.'
    },
    {
      title: 'Substitution sensorielle',
      badge: 'Vision + proprioception',
      color: 'blue',
      short: 'Utiliser les entrées visuelles et somatosensorielles quand l’entrée vestibulaire est insuffisante.',
      key: ['Particulièrement utile en atteinte bilatérale', 'Développe des “béquilles” sensorielles', 'Attention aux stratégies trop dépendantes de la vision'],
      clinical: 'Une aréflexie bilatérale se rééduque surtout par amélioration des stratégies visuelles et proprioceptives.'
    },
    {
      title: 'Habituation',
      badge: 'Exposition progressive',
      color: 'green',
      short: 'Diminuer la réponse symptomatique à un stimulus répété, sans surstimuler.',
      key: ['Progressivité indispensable', 'Dose adaptée au seuil du patient', 'Risque d’hypersensibilisation si trop intense'],
      clinical: 'Utile pour PPPD, dépendance visuelle, migraine vestibulaire ou gêne aux flux optiques.'
    }
  ],

  bilanSteps: [
    {
      title: 'Interrogatoire',
      goal: 'Comprendre le symptôme avant de choisir les tests.',
      do: ['Date de début, évolution aiguë ou chronique', 'Nature : vertige rotatoire, instabilité, ébriété, oscillopsie, mal des transports', 'Durée réelle de la crise, fréquence, facteurs déclenchants', 'Signes associés : auditifs, neuro, céphalées, migraines, cervicalgies, trauma, contexte viral'],
      interpret: 'L’interrogatoire oriente le choix du bilan. Il évite de faire tous les tests à tous les patients.',
      traps: ['Ne pas confondre durée du vertige et durée de l’impact fonctionnel', 'Demander au patient de décrire son trouble avec un autre mot que “vertige”']
    },
    {
      title: 'Tri des drapeaux rouges',
      goal: 'Repérer une possible origine centrale ou une situation nécessitant un avis urgent.',
      do: ['Céphalée inhabituelle', 'Dysarthrie, paresthésies, déficit moteur ou sensitif', 'Troubles des nerfs crâniens', 'Marche impossible sans appui', 'Nystagmus vertical, multiple ou atypique'],
      interpret: 'Si signes centraux après vertige aigu : ne pas traiter comme une pathologie périphérique simple.',
      traps: ['Un vertige aigu isolé peut être trompeur', 'La cohérence globale prime sur un seul signe isolé']
    },
    {
      title: 'Capteurs sensoriels périphériques',
      goal: 'Identifier ce qui peut perturber l’équilibre en dehors du vestibule.',
      do: ['Vision : correction, champ visuel, DMLA, cataracte, convergence', 'Cochléo-vestibulaire : hypoacousie, acouphènes, appareillage', 'Somatosensoriel : proprioception, neuropathie, sensibilité profonde', 'Médicaments : bêtabloquants, traitements ototoxiques, traitements cardiaques'],
      interpret: 'Une plainte d’équilibre peut être plurifactorielle.',
      traps: ['Ne pas attribuer trop vite tout déséquilibre au vestibule', 'Conserver les corrections visuelles pendant les exercices']
    },
    {
      title: 'Oculomotricité',
      goal: 'Explorer les voies oculogyres centrales.',
      do: ['Saccades : hypermétrie, hypométrie, dysmétrie', 'Poursuite : lisse ou saccadée', 'Fixation excentrée : gaze nystagmus', 'Conjugaison des yeux', 'Skew deviation', 'Vergence'],
      interpret: 'Une anomalie oculomotrice franche oriente vers une atteinte centrale.',
      traps: ['Toujours regarder les deux yeux', 'Un trouble orthoptique peut mimer certaines anomalies']
    },
    {
      title: 'Examen sous VNS',
      goal: 'Rechercher et caractériser le nystagmus.',
      do: ['Nystagmus spontané', 'Nystagmus de position', 'Tests cinétiques : HST, HIT selon contexte', 'Comparer fixation et absence de fixation'],
      interpret: 'Périphérique typique : inhibition par fixation, unidirectionnel, loi d’Alexander. Atypique : reconsidérer.',
      traps: ['Attendre l’amortissement des stimulations précédentes', 'Tête parfaitement immobile pour le spontané']
    },
    {
      title: 'Épreuves vestibulo-spinales',
      goal: 'Observer la cohérence posturale et la latéralisation.',
      do: ['Romberg simple ou sensibilisé', 'Fukuda', 'Marche aveugle / Babinski-Weil', 'Possibilité de double tâche'],
      interpret: 'Déviation harmonieuse du même côté : plutôt périphérique. Résultats disharmonieux : prudence centrale.',
      traps: ['Un seul test isolé n’est pas suffisant', 'Chercher la cohérence entre les tests']
    },
    {
      title: 'Questionnaires et suivi',
      goal: 'Objectiver la gêne fonctionnelle et l’évolution.',
      do: ['DHI', 'EEV', 'EVA si pertinent', 'Comparaison pré/inter/post traitement'],
      interpret: 'Les scores complètent les tests instrumentaux et objectivent le progrès ressenti.',
      traps: ['Ne pas se limiter à l’impression clinique', 'Réorienter si l’évolution est défavorable']
    },
    {
      title: 'Organisation sensorielle',
      goal: 'Comprendre le poids relatif des entrées visuelle, proprioceptive et vestibulaire.',
      do: ['CTSIB / Dome and Foam', 'SOT si matériel disponible', 'Vision asservie, sol stable/instable', 'VR ou posturographie si disponible'],
      interpret: 'Permet d’identifier dépendance visuelle, sous-utilisation vestibulaire ou défaut de stratégie.',
      traps: ['Adapter au matériel disponible', 'Ne pas surinterpréter sans cohérence clinique']
    }
  ],

  tests: [
    { id: 'saccades', cat: 'Oculomotricité', title: 'Saccades', objective: 'Évaluer les mouvements oculaires volontaires rapides.', procedure: 'Deux cibles ou deux doigts devant le patient ; demander de passer vite de l’un à l’autre.', normal: 'Mouvement rapide, précis et symétrique.', patho: 'Hypermétrie, hypométrie ou dysmétrie.', traps: 'Fatigue, mauvaise compréhension, trouble visuel ou attentionnel.' },
    { id: 'poursuite', cat: 'Oculomotricité', title: 'Poursuite oculaire', objective: 'Tester la capacité à suivre une cible de manière fluide.', procedure: 'Faire suivre un objet ou un doigt lentement, en binoculaire puis si besoin monoculaire.', normal: 'Poursuite lisse et homogène.', patho: 'Poursuite saccadée : signe possible de centralité.', traps: 'Attention au patient âgé, à la fatigue visuelle et aux troubles de convergence.' },
    { id: 'skew', cat: 'Oculomotricité', title: 'Skew deviation', objective: 'Rechercher un désalignement vertical des yeux.', procedure: 'Cover test : cacher puis découvrir un œil, observer une correction verticale.', normal: 'Pas de correction verticale.', patho: 'Œil plus haut ou correction verticale : signe de centralité.', traps: 'Comparer les deux yeux, vérifier absence de trouble ophtalmologique connu.' },
    { id: 'spontane', cat: 'Nystagmus', title: 'Nystagmus spontané', objective: 'Identifier une asymétrie vestibulaire ou une anomalie centrale.', procedure: 'Patient assis, masque VNS, tête immobile, attendre l’amortissement.', normal: 'Absence de nystagmus spontané significatif.', patho: 'Périphérique : unidirectionnel, inhibé par fixation. Central : vertical, multiple, gaze nystagmus.', traps: 'Ne pas tester juste après mobilisation ou installation rapide.' },
    { id: 'position', cat: 'Nystagmus', title: 'Nystagmus de position', objective: 'Rechercher un VPPB ou un nystagmus positionnel non VPPB.', procedure: 'Manœuvres positionnelles selon contexte : Dix-Hallpike, roll test, etc.', normal: 'Pas de nystagmus positionnel pathologique.', patho: 'VPPB typique : latence, paroxystique, fatigable, reproductible, inversion à la verticalisation.', traps: 'Tout nystagmus de position ne justifie pas une manœuvre libératoire.' },
    { id: 'hst', cat: 'Tests dynamiques', title: 'Head Shaking Test — HST', objective: 'Révéler une asymétrie vestibulaire après stimulation horizontale.', procedure: 'Mouvements passifs horizontaux aller-retour environ 10 s à 2 Hz puis observation post-dynamique.', normal: 'Pas de nystagmus provoqué significatif.', patho: 'Nystagmus provoqué : côté battant souvent interprété comme côté le plus fort.', traps: 'Interpréter avec le spontané ; prudence si majoration d’un nystagmus central.' },
    { id: 'hit', cat: 'Tests dynamiques', title: 'Head Impulse Test — HIT', objective: 'Tester le RVO à haute vitesse.', procedure: 'Le patient fixe une cible ; impulsion brève, rapide, de faible amplitude.', normal: 'Les yeux restent fixés sur la cible.', patho: 'Overt/covert saccade de refixation du côté déficitaire.', traps: 'Difficile à voir à l’œil nu ; ne pas isoler du contexte HINTS.' },
    { id: 'romberg', cat: 'Vestibulo-spinal', title: 'Romberg', objective: 'Évaluer le poids de l’entrée visuelle sur l’équilibre.', procedure: 'Patient debout pieds joints, yeux ouverts puis fermés, éventuellement sensibilisé.', normal: 'Stabilité suffisante.', patho: 'Instabilité majorée yeux fermés.', traps: 'Sécuriser le patient ; ne pas conclure seul sur un diagnostic.' },
    { id: 'fukuda', cat: 'Vestibulo-spinal', title: 'Fukuda', objective: 'Rechercher une déviation latéralisée.', procedure: 'Yeux fermés, bras tendus, piétiner sur place environ 45 pas.', normal: 'Pas de rotation significative.', patho: 'Déviation du côté déficitaire dans un syndrome périphérique harmonieux.', traps: 'Sol, consignes, fatigue et double tâche modifient le résultat.' },
    { id: 'ctsib', cat: 'Organisation sensorielle', title: 'CTSIB / Dome and Foam', objective: 'Identifier la stratégie sensorielle dominante.', procedure: 'Combiner sol stable/instable et yeux ouverts/fermés/vision asservie.', normal: 'Adaptation selon les conditions.', patho: 'Chute ou instabilité spécifique selon l’entrée perturbée.', traps: 'Définir clairement la chute : bras décroisés, pas, appui, etc.' }
  ],

  redFlags: [
    { title: 'Céphalée inhabituelle', level: 'red', why: 'Association vertige + céphalée inhabituelle : suspicion centrale possible.' },
    { title: 'Signes neurologiques', level: 'red', why: 'Dysarthrie, paresthésies, déficit moteur/sensitif ou atteinte des nerfs crâniens.' },
    { title: 'Skew deviation', level: 'red', why: 'Désalignement vertical des yeux : signe fort de centralité dans le bon contexte.' },
    { title: 'Nystagmus vertical ou multiple', level: 'red', why: 'Profil atypique pour un déficit périphérique simple.' },
    { title: 'Poursuite saccadée / gaze nystagmus', level: 'orange', why: 'Oriente vers une atteinte oculomotrice centrale.' },
    { title: 'Tests posturaux disharmonieux', level: 'orange', why: 'Un tableau non latéralisé ou incohérent doit faire reconsidérer l’hypothèse.' }
  ],

  pathologies: [
    { name: 'Déficit périphérique aigu', family: 'Périphérique', temporal: 'Aigu prolongé', signs: 'Grand vertige rotatoire, nausées, pas de signe auditif/neuro typique.', tests: 'HIT, VNS, HST, épreuves vestibulo-spinales.', rehab: 'Compensation centrale, stimulation adaptée, conflit sensoriel progressif.' },
    { name: 'Maladie de Ménière', family: 'Périphérique fluctuant', temporal: 'Crises de plusieurs heures', signs: 'Triade : vertige, signes auditifs, plénitude/acouphènes.', tests: 'Suivi de la réflectivité, contexte ORL.', rehab: 'Pas en période critique ; hors crise, réharmonisation prudente.' },
    { name: 'Aréflexie vestibulaire bilatérale', family: 'Périphérique bilatéral', temporal: 'Chronique progressive', signs: 'Instabilité dans l’obscurité, oscillopsies, peu ou pas de vertige franc.', tests: 'vHIT, VNG, EVS instables, acuité dynamique.', rehab: 'Substitution sensorielle visuelle et proprioceptive.' },
    { name: 'Syndrome central', family: 'Central', temporal: 'Variable', signs: 'Signes neurologiques, nystagmus vertical/multiple, oculomotricité anormale.', tests: 'Oculomotricité, HINTS, VNS, EVS disharmonieuses.', rehab: 'Prudence, sédation, proprioception dosée, réorientation selon contexte.' },
    { name: 'Migraine vestibulaire', family: 'Central/fonctionnel', temporal: 'Épisodes', signs: 'Vertige sans surdité, aura ou antécédents migraineux.', tests: 'Diagnostic clinique, exclusion, sensibilité aux flux visuels.', rehab: 'Exposition progressive aux flux optiques, traitement médical associé.' },
    { name: 'PPPD / dépendance visuelle', family: 'Désorganisation neurosensorielle', temporal: 'Chronique', signs: 'Gêne en environnements visuels complexes, instabilité persistante.', tests: 'CTSIB/SOT, bilan organisation sensorielle, VR/optocinétique.', rehab: 'Habituation, exposition progressive, restabilisation posturale.' },
    { name: 'VPPB', family: 'Périphérique positionnel', temporal: 'Brefs épisodes positionnels', signs: 'Vertiges brefs au coucher/lever/rotation lit, nystagmus positionnel typique.', tests: 'Dix-Hallpike, roll test, lecture du nystagmus.', rehab: 'Déterminer canal, lithiase, siège puis manœuvre adaptée.' }
  ],

  rehab: [
    { objective: 'Stabiliser le regard', tools: ['Exercices de fixation dynamique', 'HIT/vHIT guidé', 'Acuité visuelle dynamique'], indications: 'Déficit RVO, oscillopsie, difficulté pendant mouvements de tête.', avoid: 'Symptômes excessifs non contrôlés.' },
    { objective: 'Favoriser la compensation centrale', tools: ['Stimulation vestibulaire dosée', 'Mouvement actif', 'Conflits sensoriels progressifs'], indications: 'Déficit périphérique aigu ou post-chirurgical.', avoid: 'Immobilisation excessive, auto-manœuvres VPPB non indiquées.' },
    { objective: 'Développer la substitution', tools: ['Vision', 'Proprioception', 'Supports instables', 'Travail postural'], indications: 'Atteinte bilatérale ou déficit sévère.', avoid: 'Dépendance visuelle exclusive non contrôlée.' },
    { objective: 'Réduire la dépendance visuelle', tools: ['Optocinétique', 'Réalité virtuelle', 'Exposition graduée aux flux'], indications: 'PPPD, cinétose visuelle, syndrome de défilement.', avoid: 'Surstimulation qui aggrave durablement les symptômes.' },
    { objective: 'Réharmoniser les réponses au fauteuil', tools: ['Fauteuil baguette', 'Fauteuil en fixation', 'Vection', 'Coriolis si indiqué'], indications: 'Prépondérances, Ménière hors crise, certains profils centraux stabilisés.', avoid: 'Ménière en crise, centralité non explorée, malaise neurovégétatif majeur.' },
    { objective: 'Travailler l’organisation sensorielle', tools: ['CTSIB', 'SOT', 'Dome and Foam', 'VR avec vision asservie'], indications: 'Sous-utilisation vestibulaire, prédominance visuelle, défaut de stratégie.', avoid: 'Progression trop rapide ou absence de sécurisation.' }
  ],

  cases: [
    {
      title: 'Vertige aigu prolongé',
      level: 'Intermédiaire',
      presentation: 'Patient avec grand vertige rotatoire depuis 24 h, nausées, pas de signe auditif évident. Il marche difficilement mais sans déficit neurologique apparent.',
      questions: [
        { q: 'Quel est le premier réflexe clinique ?', choices: ['Faire une manœuvre libératoire', 'Chercher des signes centraux', 'Commencer optocinétique'], correct: 1, explanation: 'Devant un vertige aigu, le tri central/périphérique est prioritaire avant toute logique de traitement.' },
        { q: 'Quel test est particulièrement utile dans HINTS ?', choices: ['HIT', 'Fukuda seul', 'DHI seul'], correct: 0, explanation: 'Le HIT teste le RVO à haute vitesse et aide à distinguer certains profils périphériques/centraux, toujours dans le contexte complet HINTS.' },
        { q: 'Si skew deviation ou nystagmus vertical apparaît ?', choices: ['Poursuite du traitement vestibulaire', 'Réorientation urgente', 'Auto-exercices à domicile'], correct: 1, explanation: 'Ces éléments sont des signes de centralité potentielle : réorientation médicale urgente selon contexte.' }
      ],
      takeaway: 'Vertige aigu = raisonner sécurité avant traitement.'
    },
    {
      title: 'Crises vertigineuses avec signes auditifs',
      level: 'Intermédiaire',
      presentation: 'Patiente avec crises de plusieurs heures, sensation de plénitude d’oreille, acouphènes fluctuants et instabilité entre les crises.',
      questions: [
        { q: 'Quelle hypothèse est prioritaire ?', choices: ['PPPD isolé', 'Maladie de Ménière', 'Aréflexie bilatérale'], correct: 1, explanation: 'La triade vertige + signes auditifs + plénitude/acouphènes oriente vers Ménière, sans poser trop vite un diagnostic définitif à la première crise.' },
        { q: 'Rééducation pendant la crise ?', choices: ['Oui, stimulation forte', 'Non, prudence', 'Manœuvre VPPB systématique'], correct: 1, explanation: 'La rééducation vestibulaire du Ménière n’est pas indiquée en période critique ; le travail se raisonne hors crise.' },
        { q: 'Hors crise, l’objectif kiné est plutôt ?', choices: ['Réharmoniser les réponses', 'Ignorer l’audition', 'Supprimer tous les flux visuels'], correct: 0, explanation: 'On cherche à adapter la technique à l’état de réflectivité et aux doléances persistantes.' }
      ],
      takeaway: 'Ménière = fluctuation, temporalité, signes auditifs et prudence thérapeutique.'
    },
    {
      title: 'Instabilité en supermarché',
      level: 'Débutant',
      presentation: 'Patient avec sensation d’instabilité chronique, majorée dans les grands magasins, les environnements visuels mobiles et les foules. Bilans ORL et neuro peu contributifs.',
      questions: [
        { q: 'Quelle famille évoquer ?', choices: ['Désorganisation neurosensorielle / PPPD', 'VPPB typique', 'Déficit aigu isolé'], correct: 0, explanation: 'La gêne en environnement visuel complexe évoque une dépendance visuelle, PPPD ou désorganisation neurosensorielle.' },
        { q: 'Quel bilan est pertinent ?', choices: ['CTSIB/SOT', 'Uniquement Dix-Hallpike', 'Uniquement EVA douleur'], correct: 0, explanation: 'Le bilan d’organisation sensorielle aide à identifier prédominance, sous-utilisation ou conflit sensoriel.' },
        { q: 'Quelle logique de traitement ?', choices: ['Exposition progressive aux flux', 'Repos strict prolongé', 'Manœuvres libératoires répétées'], correct: 0, explanation: 'Le traitement repose sur habituation, exposition graduée et transfert des poids sensoriels.' }
      ],
      takeaway: 'Gêne visuelle chronique = penser stratégie sensorielle, pas seulement vestibule périphérique.'
    }
  ],

  checklists: [
    {
      title: 'Interrogatoire vestibulaire',
      items: ['Date de début et mode d’installation', 'Nature exacte du trouble sans le mot “vertige”', 'Durée réelle des crises', 'Fréquence et facteurs déclenchants', 'Signes auditifs', 'Céphalées/migraine', 'Signes neurologiques', 'Trauma/contexte viral', 'Traitements en cours']
    },
    {
      title: 'Centralité — avant traitement',
      items: ['Céphalée inhabituelle recherchée', 'Dysarthrie ou paresthésies recherchées', 'Nerfs crâniens grossièrement vérifiés', 'Poursuite/saccades/fixation testées', 'Skew deviation testée', 'Type de nystagmus caractérisé', 'Cohérence vestibulo-spinale vérifiée', 'Réorientation si doute']
    },
    {
      title: 'Choix thérapeutique',
      items: ['Hypothèse principale formulée', 'Objectif de rééducation défini', 'Outil choisi selon objectif', 'Contre-indications ou précautions vérifiées', 'Dose adaptée au seuil du patient', 'Critère de progression défini', 'Critère d’arrêt ou réorientation défini']
    }
  ]
};
