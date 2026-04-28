window.VESTIB_DATA = {
  nav: [
    { id:'demarche', icon:'🧭', label:'Démarche + algorithmes' },
    { id:'bases', icon:'🧠', label:'Bases' },
    { id:'tests', icon:'👁️', label:'Tests' },
    { id:'pathologies', icon:'🧩', label:'Pathologies' },
    { id:'reeducation', icon:'🛠️', label:'Rééducation' },
    { id:'cas', icon:'🧪', label:'Cas cliniques' },
    { id:'checklists', icon:'✅', label:'Checklists' }
  ],

  demarcheIntro: {
    title: 'Démarche clinique + algorithmes',
    text: 'Une carte de raisonnement rapide : quoi chercher, dans quel ordre, et quels tests ouvrir ensuite. Le but n’est pas de tout faire, mais de choisir ce qui est cohérent avec le tableau clinique.'
  },

  demarcheCore: [
    { title:'1. Sécurité / centralité', text:'Toujours commencer par chercher ce qui ferait sortir du champ “rééducation simple” : signes neurologiques, céphalée inhabituelle, diplopie, dysarthrie, dysphagie, ataxie majeure, skew, nystagmus vertical ou multidirectionnel.' },
    { title:'2. Interrogatoire', text:'Début, durée réelle de la crise, fréquence, facteur déclenchant, signes auditifs, migraine, cervicalgies, contexte viral/traumatique, traitements. C’est cette étape qui conditionne le bilan.' },
    { title:'3. Capteurs et terrain', text:'Vision, cochléo-vestibulaire, somatosensoriel, cognition/attention. Ces éléments peuvent expliquer l’équilibre et conditionnent les exercices.' },
    { title:'4. Tests orientés', text:'HINTS seulement si syndrome vestibulaire aigu compatible. Positionnel si vertige bref au lit. EVS si instabilité. HIT/vHIT si oscillopsie ou RVO. CTSIB/SOT si organisation sensorielle.' },
    { title:'5. Orientation prudente', text:'Formuler : compatible avec, oriente vers, à confirmer, réorientation si doute. Les tests ne remplacent pas le diagnostic médical.' },
    { title:'6. Suivi', text:'Comparer pré/per/post : symptômes, DHI/EEV/EVA, nystagmus, prépondérance, EVS, CTSIB/SOT, tolérance neurovégétative.' }
  ],

  systematic: [
    { title:'À faire très souvent', items:['Interrogatoire structuré','Recherche de red flags neurologiques','Observation oculomotrice minimale si vertige/instabilité','Lecture du nystagmus si présent ou VNS disponible','Évaluation de la marche/équilibre si plainte d’instabilité'] },
    { title:'À faire selon contexte', items:['HINTS : seulement vertige aigu continu compatible','HIT seul : RVO, oscillopsie, déficit ou aréflexie','Romberg/Fukuda/Babinski-Weil : instabilité, déséquilibre, latéralisation','CTSIB/SOT : dépendance visuelle, DNS, instabilité chronique','Tests positionnels : vertige bref déclenché par lit/position'] },
    { title:'À éviter', items:['Tout tester sans hypothèse','Utiliser HINTS pour VPPB, migraine chronique ou PPPD','Conclure sur un seul EVS isolé','Faire une manœuvre devant tout nystagmus positionnel','Ignorer signes centraux parce que le tableau ressemble à un périphérique'] }
  ],

  algorithms: [
    { title:'Vertige aigu continu / syndrome vestibulaire aigu', color:'danger', steps:[
      ['Contexte','Vertige continu, symptômes persistants, souvent nystagmus spontané.'],
      ['Sécurité','Chercher signes neuro : céphalée, diplopie, dysarthrie, dysphagie, paresthésies, ataxie, marche impossible.'],
      ['HINTS complet','HIT + type de nystagmus + test of skew, interprétés ensemble.'],
      ['Central suspect','HIT normal, nystagmus direction-changeant/vertical/multiple, skew positif ou signes neuro → réorientation.'],
      ['Périphérique compatible','HIT anormal du côté déficitaire + nystagmus unidirectionnel compatible + skew négatif + pas de signe neuro.']
    ]},
    { title:'Vertige positionnel bref', color:'warn', steps:[
      ['Interrogatoire','Secondes, coucher/lever/rotation dans le lit, déclenchement positionnel.'],
      ['Tests positionnels','Dix-Hallpike / Roll test selon canal suspecté.'],
      ['Lecture','Latence, paroxysme, fatigabilité, reproductibilité, direction, inversion à la verticalisation.'],
      ['Suite','Compatible VPPB → plateforme VPPB. Atypique/non fatigable/signes neuro → reconsidérer.']
    ]},
    { title:'Instabilité chronique / EVS', color:'info', steps:[
      ['Profil','Déséquilibre, ébriété, gêne à l’obscurité, fatigue, chutes ou évitement.'],
      ['Capteurs','Vision, proprioception, audition, cognition, médicaments.'],
      ['EVS','Romberg, Fukuda, Babinski-Weil : chercher cohérence, pas un résultat isolé.'],
      ['Harmonieux','Déviations répétées du même côté → orientation périphérique possible.'],
      ['Disharmonieux','Discordance, instabilité majeure ou signes neuro → central/mixte/non vestibulaire à reconsidérer.']
    ]},
    { title:'Oscillopsie / flou aux mouvements de tête', color:'info', steps:[
      ['Symptôme','Flou visuel pendant marche ou rotation de tête.'],
      ['RVO','HIT/vHIT et acuité visuelle dynamique.'],
      ['Bilatéral ?','Instabilité dans l’obscurité, EVS très instables, HIT bilatéral positif possible.'],
      ['Axe rééducatif','Stabilisation du regard + substitution visuelle/proprioceptive.']
    ]},
    { title:'Dépendance visuelle / PPPD / DNS', color:'success', steps:[
      ['Déclencheurs','Supermarché, foule, route, grands espaces, flux visuels, environnement mobile.'],
      ['Organisation','CTSIB/SOT, recherche de préférence visuelle ou sous-utilisation vestibulaire.'],
      ['Technique','Optocinétique, VR, leurres sensoriels, supports instables, exposition progressive.'],
      ['Suivi','Tolérance neurovégétative, DHI/EEV, progression graduée.']
    ]},
    { title:'Signes auditifs fluctuants', color:'warn', steps:[
      ['Triade','Vertige + acouphènes/plénitude + hypoacousie fluctuante.'],
      ['Temporalité','Crises de plusieurs heures, retour relatif entre crises.'],
      ['Prudence','Pas de rééducation vestibulaire en période critique.'],
      ['Hors crise','Travail selon réflectivité et doléances persistantes, avis ORL.']
    ]}
  ],

  bases: [
    { title:'RVO — réflexe vestibulo-oculaire', key:'Stabilise le regard pendant les mouvements de tête.', detail:'C’est le socle du HIT, du vHIT, de l’acuité visuelle dynamique et d’une grande partie du travail de stabilisation du regard.' },
    { title:'RVC — réflexe vestibulo-cervical', key:'Participe au contrôle tête-cou.', detail:'Il fait le lien avec les adaptations cervicales, les mouvements de tête et certaines plaintes cervico-vestibulaires.' },
    { title:'ROC / optocinétique', key:'Interaction vision-mouvement-environnement.', detail:'Utile pour comprendre flux optiques, dépendance visuelle, PPPD, syndrome de l’autoroute, optocinétique et réalité virtuelle.' },
    { title:'Nystagmus physiologique', key:'Réponse réflexe de recentrage du regard.', detail:'Le sens est défini par la phase rapide. L’interprétation dépend du contexte, du regard, de la fixation et de la stimulation.' },
    { title:'Nystagmus périphérique typique', key:'Souvent unidirectionnel et inhibé par fixation.', detail:'Il peut être renforcé dans le regard orienté du côté de la phase rapide : loi d’Alexander.' },
    { title:'Nystagmus central suspect', key:'Vertical, multidirectionnel, gaze nystagmus ou non inhibé.', detail:'À croiser avec oculomotricité, skew, signes neurologiques, EVS disharmonieuses et contexte clinique.' },
    { title:'Lois d’Ewald', key:'Permettent de raisonner canal, côté et direction.', detail:'Indispensables pour les VPPB et l’interprétation des nystagmus canalaires, même si le détail pratique reste dans la plateforme VPPB.' },
    { title:'Compensation vestibulaire', key:'Réorganisation centrale après déficit.', detail:'Objectif majeur des déficits périphériques : réduire vertige, nystagmus, biais induit et améliorer stabilité du regard/posture.' },
    { title:'Substitution sensorielle', key:'Utiliser vision et proprioception quand le vestibule manque.', detail:'Prioritaire notamment dans l’aréflexie vestibulaire bilatérale.' },
    { title:'Habituation', key:'Exposition progressive à un stimulus symptomatique.', detail:'Utile dans dépendance visuelle, PPPD, cinétoses et certaines hypersensibilités ; nécessite dosage pour éviter la surstimulation.' },
    { title:'Organisation sensorielle', key:'Choisir la bonne stratégie au bon moment.', detail:'Vision, vestibule, proprioception et cognition doivent être pondérés selon l’environnement ; CTSIB/SOT aide à l’objectiver.' }
  ],

  testCategories: ['Tous','Protocole','HINTS','Oculomotricité','Nystagmus','RVO','EVS','Organisation sensorielle','Questionnaires','Rééducation'],
  tests: [
    { id:'hints', cat:'Protocole', title:'HINTS — protocole complet', tags:['HINTS','Vertige aigu continu','Centralité'], short:'Séquence contextuelle : Head Impulse + Nystagmus + Test of Skew.', indication:'Seulement si syndrome vestibulaire aigu compatible : vertige aigu continu, symptômes persistants, souvent nystagmus spontané. À ne pas utiliser pour un VPPB typique, une PPPD chronique ou une migraine hors contexte aigu.', procedure:'Interpréter ensemble : 1) HIT, 2) direction/type du nystagmus, 3) test of skew. Puis croiser avec signes neurologiques et oculomotricité.', normal:'Profil périphérique compatible uniquement si l’ensemble est cohérent : HIT anormal du côté déficitaire, nystagmus unidirectionnel compatible, skew négatif, pas de signe neuro.', abnormal:'Central suspect si HIT normal dans vertige aigu continu, nystagmus vertical/multidirectionnel/changeant de direction, skew positif, ou autre signe neurologique.', traps:'Un composant isolé ne suffit pas. HINTS est un raisonnement de contexte, pas une checklist universelle.', interpretation:[
      ['Head Impulse','Saccade de rattrapage = déficit RVO périphérique possible. HIT normal dans vertige aigu continu = alerte centrale.'],
      ['Nystagmus','Unidirectionnel et inhibé par fixation = plutôt périphérique. Direction changeante, vertical, multiple ou gaze nystagmus = central suspect.'],
      ['Test of Skew','Pas de correction verticale = rassurant dans l’ensemble. Skew positif = centralité possible.']
    ]},
    { id:'hit', cat:'RVO', title:'HIT / Head Impulse Test', tags:['HINTS','RVO','Haute vitesse'], short:'Test du RVO à haute vitesse par impulsion brève de tête.', indication:'Dans HINTS si syndrome vestibulaire aigu compatible ; hors HINTS pour oscillopsie, déficit RVO, aréflexie bilatérale, vHIT ou suivi haute vitesse.', procedure:'Patient fixe une cible. Impulsion passive rapide, brève, de faible amplitude. Observer les saccades de refixation.', normal:'Pas de saccade visible ; regard stable.', abnormal:'Saccade de rattrapage du côté stimulé : déficit du RVO du côté de l’impulsion.', traps:'HIT positif n’a pas la même signification selon contexte ; HIT normal peut être inquiétant dans un vertige aigu continu.' },
    { id:'nystagmus_spontane', cat:'Nystagmus', title:'Nystagmus spontané', tags:['HINTS','VNS','Central/périphérique'], short:'Recherche en première intention sous VNS ou à l’œil selon matériel.', indication:'Vertige aigu, déficit vestibulaire, HINTS, suivi de compensation, suspicion centrale.', procedure:'Patient assis, tête immobile, attendre l’amortissement des stimulations antérieures. Observer direction, fixation, degré, loi d’Alexander.', normal:'Absence de nystagmus spontané ou extinction selon récupération.', abnormal:'Périphérique typique : unidirectionnel, inhibé par fixation, renforcé du côté de la phase rapide. Central suspect : vertical, multidirectionnel, gaze nystagmus, non inhibé.', traps:'Un nystagmus observé ne justifie pas automatiquement une manœuvre.' },
    { id:'skew', cat:'Oculomotricité', title:'Test of Skew', tags:['HINTS','Centralité'], short:'Recherche d’un désalignement vertical par cover test.', indication:'Composant de HINTS en vertige aigu continu ; signe de centralité possible hors HINTS selon contexte.', procedure:'Couvrir/découvrir alternativement les yeux et observer une correction verticale.', normal:'Pas de correction verticale.', abnormal:'Correction verticale : skew positif, centralité possible.', traps:'À interpréter avec le reste de l’examen ; ne pas isoler du contexte.' },
    { id:'saccades_index', cat:'Oculomotricité', title:'Test des index / saccades aux deux doigts', tags:['Centralité','Index'], short:'Version pratique du test des saccades : passer vite d’un index à l’autre.', indication:'Recherche d’hypermétrie, hypométrie, dysmétrie, lenteur ou trouble oculomoteur central.', procedure:'Placer deux doigts/index devant le patient et lui demander de passer rapidement du droit au gauche. Observer précision, vitesse et homogénéité.', normal:'Saccades rapides, précises, symétriques.', abnormal:'Dysmétrie, hypermétrie, hypométrie ou mouvements irréguliers.', traps:'Ce n’est pas le même objectif qu’un doigt-nez cérébelleux, même si les deux explorent la centralité.' },
    { id:'doigt_nez', cat:'Oculomotricité', title:'Doigt-nez / index — complément neurologique', tags:['Centralité','Cérébelleux'], short:'Complément utile pour dysmétrie cérébelleuse, non détaillé comme test vestibulaire principal dans le cours.', indication:'Si suspicion cérébelleuse : dysmétrie, hypermétrie, ataxie, incohérence importante.', procedure:'Demander au patient de toucher son nez puis une cible. Observer tremblement intentionnel, dysmétrie, correction.', normal:'Trajet précis et coordonné.', abnormal:'Dysmétrie, tremblement intentionnel, hypermétrie.', traps:'À considérer comme débrouillage neurologique, pas comme test vestibulaire isolé.' },
    { id:'poursuite', cat:'Oculomotricité', title:'Poursuite oculaire', tags:['Centralité'], short:'Suivi lent d’une cible mobile.', indication:'Bilan oculomoteur central.', procedure:'Faire suivre un doigt ou objet lentement horizontalement et verticalement.', normal:'Poursuite lisse et homogène.', abnormal:'Poursuite saccadée, asymétrique ou interrompue.', traps:'Âge, attention et troubles visuels peuvent influencer.' },
    { id:'fixation', cat:'Oculomotricité', title:'Fixation / gaze nystagmus', tags:['Centralité'], short:'Recherche de stabilité du regard excentré.', indication:'Suspicion centrale, VNS, bilan oculomoteur.', procedure:'Faire fixer un point central puis excentré.', normal:'Fixation stable.', abnormal:'Nystagmus du regard excentré ou fixation impossible.', traps:'Distinguer gaze nystagmus central et renforcement périphérique par loi d’Alexander.' },
    { id:'conjugaison', cat:'Oculomotricité', title:'Conjugaison des yeux', tags:['SEP','Centralité'], short:'Vérifie que les deux yeux bougent ensemble.', indication:'Recherche d’ophtalmoplégie internucléaire ou atteinte centrale.', procedure:'Observer les deux yeux pendant les mouvements horizontaux/verticaux.', normal:'Mouvements conjugués et symétriques.', abnormal:'Disconjugaison, nystagmus différent entre les yeux, limitation.', traps:'Filmer les deux yeux si possible, pas un seul.' },
    { id:'vergence', cat:'Oculomotricité', title:'Vergence / convergence', tags:['Vision'], short:'Vérifie la capacité à converger.', indication:'Trouble visuel, céphalées, gêne écran, bilan des capteurs.', procedure:'Rapprocher un crayon du nez et observer convergence/symptômes.', normal:'Convergence symétrique et tolérée.', abnormal:'Insuffisance de convergence, diplopie, inconfort.', traps:'Peut relever d’un bilan orthoptique.' },
    { id:'ifo', cat:'Oculomotricité', title:'Indice de fixation oculaire', tags:['Centralité'], short:'Analyse l’effet de la fixation sur le nystagmus.', indication:'Différencier inhibition par fixation et signe central.', procedure:'Comparer nystagmus avec et sans fixation selon matériel.', normal:'Fixation inhibe ou diminue un nystagmus périphérique.', abnormal:'Absence d’inhibition par fixation : centralité possible.', traps:'Dépend du matériel et du contexte.' },
    { id:'nystagmus_position', cat:'Nystagmus', title:'Nystagmus de position', tags:['VPPB','Positionnel'], short:'Recherche d’un nystagmus provoqué par changement de position.', indication:'Vertiges brefs au coucher, lever ou rotation dans le lit.', procedure:'Tests positionnels adaptés au canal suspecté ; observer latence, direction, durée, fatigabilité, inversion.', normal:'Pas de nystagmus positionnel pathologique.', abnormal:'VPPB typique : latence, paroxysme, fatigabilité, reproductibilité, direction compatible.', traps:'Tout nystagmus de position n’est pas un VPPB.' },
    { id:'hst', cat:'RVO', title:'Head Shaking Test', tags:['Asymétrie','Post-dynamique'], short:'Stimulation horizontale répétée puis observation du nystagmus post-dynamique.', indication:'Recherche d’asymétrie vestibulaire et stockage de l’intégrateur.', procedure:'Mouvements passifs horizontaux pendant 10 s à environ 2 Hz, puis observation.', normal:'Pas ou peu de nystagmus durable.', abnormal:'Nystagmus provoqué post-dynamique : asymétrie, côté fort selon direction observée.', traps:'Doser selon tolérance neurovégétative.' },
    { id:'romberg', cat:'EVS', title:'Romberg simple / sensibilisé', tags:['EVS','Harmonie'], short:'Évalue l’équilibre debout et le poids de l’entrée visuelle.', indication:'Instabilité, déséquilibre, orientation vestibulo-spinale.', procedure:'Debout pieds joints, yeux ouverts puis fermés. Sensibiliser par mouvements de tête si pertinent.', normal:'Stabilité correcte, majoration limitée yeux fermés.', abnormal:'Instabilité ou chute ; à interpréter avec les autres EVS.', traps:'Ne pas conclure sur Romberg seul.' },
    { id:'fukuda', cat:'EVS', title:'Fukuda simple / double tâche', tags:['EVS','Harmonie'], short:'Piétinement yeux fermés pour chercher rotation/déviation.', indication:'Latéralisation vestibulo-spinale, harmonie périphérique.', procedure:'Bras tendus, yeux fermés, 45 pas sur place. Ajouter tâche cognitive si besoin.', normal:'Peu de rotation/déviation.', abnormal:'Déviation répétée du côté déficitaire possible si périphérique.', traps:'Comparer avec Romberg et Babinski-Weil.' },
    { id:'babinski_weil', cat:'EVS', title:'Marche aveugle / Babinski-Weil', tags:['EVS','Harmonie'], short:'Marche avant/arrière yeux fermés pour rechercher spin ou marche en étoile.', indication:'Compléter Romberg/Fukuda dans l’analyse harmonieuse/disharmonieuse.', procedure:'3 pas avant, 3 pas arrière, plusieurs cycles, yeux fermés.', normal:'Trajet relativement stable.', abnormal:'Spin ou déviation, souvent du côté déficitaire si périphérique.', traps:'Discordance avec autres EVS = reconsidérer.' },
    { id:'ctsib', cat:'Organisation sensorielle', title:'CTSIB / Dome and Foam', tags:['Capteurs','DNS'], short:'Test d’organisation sensorielle clinique.', indication:'Instabilité chronique, dépendance visuelle, DNS, suivi postural.', procedure:'Comparer sol stable/instable, yeux ouverts/fermés, vision asservie selon matériel.', normal:'Adaptation aux conditions.', abnormal:'Chute ou dépendance marquée à une entrée sensorielle.', traps:'Toujours interpréter selon vision, proprioception et cognition.' },
    { id:'dhi_eev_eva', cat:'Questionnaires', title:'DHI / EEV / EVA', tags:['Suivi'], short:'Mesure du retentissement fonctionnel et de l’évolution.', indication:'Bilan initial, suivi, objectivation des progrès.', procedure:'Utiliser l’outil adapté : DHI, EEV, EVA selon objectif.', normal:'Amélioration attendue au suivi.', abnormal:'Stagnation ou aggravation malgré prise en charge.', traps:'Ne remplace pas les tests objectifs.' }
  ],

  pathologies: [
    { name:'VPPB', family:'Périphérique positionnel', temporalite:'Bref, secondes, déclenché par position', signes:'Nystagmus positionnel avec latence, paroxysme, fatigabilité, reproductibilité', tests:'Tests positionnels, lecture canal/côté/lithiase', prise:'Renvoi plateforme VPPB : canal, côté, manœuvre adaptée', color:'warn' },
    { name:'Déficit périphérique aigu / névrite', family:'Périphérique aigu', temporalite:'Grand vertige continu, jours, régression progressive', signes:'Nausées, nystagmus spontané périphérique, pas de signe auditif/neuro typique', tests:'Sécurité, HINTS si contexte, nystagmus, HIT, EVS', prise:'Compensation centrale, stabilisation regard, conflit sensoriel progressif', color:'info' },
    { name:'Ménière', family:'Cochléo-vestibulaire fluctuant', temporalite:'Crises de plusieurs heures', signes:'Triade : vertige, plénitude/acouphènes, surdité fluctuante', tests:'Interrogatoire auditif, ORL, suivi fluctuation', prise:'Pas en période critique ; hors crise selon réflectivité', color:'warn' },
    { name:'Aréflexie vestibulaire bilatérale', family:'Périphérique bilatéral', temporalite:'Chronique, instabilité/oscillopsie', signes:'Oscillopsie, gêne obscurité, EVS très instables, HIT bilatéral possible', tests:'HIT/vHIT, acuité visuelle dynamique, EVS, VNG', prise:'Substitution visuelle/proprioceptive, stabilisation regard', color:'info' },
    { name:'Atteinte centrale', family:'Central', temporalite:'Variable, aiguë ou chronique', signes:'Oculomotricité anormale, nystagmus vertical/multiple, signes neuro, EVS disharmonieuses', tests:'Red flags, oculomotricité, HINTS si aigu continu, neuro', prise:'Réorientation si aigu/suspect ; rééducation prudente et dosée si cadre établi', color:'danger' },
    { name:'Migraine vestibulaire', family:'Central/fonctionnel', temporalite:'Crises, terrain migraineux', signes:'Vertige sans surdité, aura ou signes migraineux, antécédents personnels/familiaux', tests:'Interrogatoire, exclusion red flags, sensibilité visuelle', prise:'Traitement médical + exposition progressive flux si indiqué', color:'purple' },
    { name:'PPPD / dépendance visuelle', family:'DNS', temporalite:'Chronique, environnements complexes', signes:'Supermarchés, foule, grands espaces, route, gêne visuelle', tests:'CTSIB/SOT, DHI/EEV, optocinétique/VR selon tolérance', prise:'Habituation progressive, optocinétique, VR, travail multisensoriel', color:'success' },
    { name:'Syndrome de l’autoroute', family:'DNS / flux visuel', temporalite:'Situationnel, conduite', signes:'Gêne vitesse/voies rapides, flux optique radial, ralentissement important', tests:'Interrogatoire spécifique, dépendance visuelle, CTSIB/SOT', prise:'Exposition graduée, optocinétique/VR, stratégie multisensorielle', color:'success' },
    { name:'SEP', family:'Central', temporalite:'Variable, sujet souvent jeune', signes:'Ophtalmoplégie internucléaire, nystagmus disconjugué, troubles équilibre', tests:'Oculomotricité, conjugaison, neuro, IRM médicale', prise:'Rééducation adaptée au cadre neurologique', color:'danger' },
    { name:'Wallenberg / AVC postérieur', family:'Central urgent', temporalite:'Aigu', signes:'Vertige violent, vomissements, hoquets, signes bulbaires/cérébelleux', tests:'Red flags, neuro, HINTS si contexte', prise:'Urgence / réorientation', color:'danger' }
  ],

  reeducation: [
    { title:'Compensation centrale', when:'Déficit périphérique aigu ou asymétrie périphérique.', how:['Symétriser les réponses','Stabiliser le regard','Mise en conflit visuelle/proprioceptive progressive','Contrôle pré/per/post si possible'], avoid:'Démarrer fort sans sécurité ni tolérance.' },
    { title:'Fauteuil basse vitesse / fixation', when:'Sédation, travail sous seuil, Ménière hors crise selon réflectivité, central prudent.', how:['Fixation baguette/cible','Vitesse basse','Objectif stabilité du regard','Progression selon symptômes'], avoid:'Période critique de Ménière ou signes centraux non explorés.' },
    { title:'Fauteuil haute vitesse / vection', when:'Travail post-rotatoire, diminution d’hypersensibilité, réponses instrumentées.', how:['Fixation ou vection selon objectif','Chronométrage stabilité ou sensation','Dosage progressif','Respect tolérance neurovégétative'], avoid:'Surstimulation et malaise durable.' },
    { title:'Optocinétique', when:'Dépendance visuelle, PPPD, gêne flux visuel, prépondérance isolée sans déficit canalaire.', how:['Début basse intensité','Temps courts','Augmentation progressive vitesse/durée','Suivi symptômes'], avoid:'Utilisation abusive si nystagmus trop intense ou hypersensibilisation.' },
    { title:'Réalité virtuelle', when:'Conflits sensoriels, environnements mobiles, route, grands espaces, hauteur.', how:['Exposition graduée','Contrôle dosage','Objectif habituation/désensibilisation','Retour au réel progressif'], avoid:'Scénarios trop difficiles trop tôt.' },
    { title:'Stabilisation du regard', when:'Oscillopsie, déficit RVO, difficulté pendant mouvements de tête.', how:['Fixation cible','Mouvements tête horizontaux/verticaux','Vitesse/amplitude progressives','Exercices courts répétés'], avoid:'Exercices longs qui déclenchent malaise persistant.' },
    { title:'Substitution sensorielle', when:'Aréflexie bilatérale ou entrée vestibulaire peu exploitable.', how:['Renforcer vision/proprioception','Travail postural','Stratégies de sécurité','Progression terrain réel'], avoid:'Dépendance excessive à une seule entrée.' },
    { title:'ETP / domicile', when:'Pathologies chroniques, autonomie, observance.', how:['Expliquer la pathologie','Objectifs simples','Exercices personnalisés','Critères d’arrêt/recontact'], avoid:'Auto-manœuvres VPPB non indiquées ou consignes floues.' }
  ],

  cases: [
    { title:'Vertige aigu continu', source:'inspire', presentation:'Grand vertige rotatoire depuis 24 h, nausées, nystagmus spontané, pas de signe auditif évident.', questions:[
      ['Étape prioritaire ?', ['Faire une manœuvre','Sécurité + HINTS si contexte compatible','Optocinétique'], 1, 'Vertige aigu continu = tri central/périphérique avant traitement.'],
      ['Quel résultat HINTS inquiète ?', ['HIT normal + nystagmus direction-changeant + skew positif','HIT anormal + nystagmus unidirectionnel + skew négatif','Fatigabilité positionnelle'], 0, 'Un seul signe central dans ce contexte impose prudence/réorientation.']
    ], takeaway:'HINTS est un protocole contextuel.' },
    { title:'EVS harmonieux', source:'entrainement', presentation:'Instabilité depuis quelques semaines. Romberg, Fukuda et Babinski-Weil dévient de façon répétée du même côté.', questions:[
      ['Lecture principale ?', ['Syndrome périphérique harmonieux possible','Central certain','VPPB typique'], 0, 'La cohérence des EVS oriente vers une latéralisation périphérique possible.'],
      ['Piège ?', ['Conclure avec un seul test isolé','Comparer les tests','Chercher les capteurs'], 0, 'Le cours insiste sur la cohérence, pas sur un test isolé.']
    ], takeaway:'Romberg/Fukuda/Babinski-Weil se lisent ensemble.' },
    { title:'Crises avec signes auditifs', source:'inspire', presentation:'Crises de vertige de plusieurs heures, plénitude d’oreille, acouphènes fluctuants et hypoacousie ressentie.', questions:[
      ['Orientation ?', ['Ménière','Aréflexie bilatérale','PPPD isolé'], 0, 'La triade oriente Ménière.'],
      ['Pendant période critique ?', ['Rééducation intense','Prudence, pas de rééducation vestibulaire en crise','Manœuvre systématique'], 1, 'La rééducation se raisonne hors crise.']
    ], takeaway:'Ménière = fluctuation + audition + temporalité.' },
    { title:'Pour aller plus loin — supermarché', source:'plus', presentation:'Gêne chronique en supermarché, foule, grands espaces. Examens ORL/neuro peu contributifs.', questions:[
      ['Famille probable ?', ['DNS / PPPD / dépendance visuelle','VPPB typique','Névrite aiguë'], 0, 'Le déclenchement par flux/environnement visuel oriente organisation sensorielle.'],
      ['Bilan utile ?', ['CTSIB/SOT + questionnaires','HINTS systématique','Dix-Hallpike uniquement'], 0, 'Il faut objectiver les poids sensoriels et le retentissement.']
    ], takeaway:'Penser stratégie sensorielle, pas seulement oreille interne.' },
    { title:'Pour aller plus loin — oscillopsie', source:'plus', presentation:'Flou visuel quand le patient marche ou tourne la tête, surtout dans l’obscurité.', questions:[
      ['Tests prioritaires ?', ['HIT/vHIT + acuité visuelle dynamique','Skew seul','Questionnaire seul'], 0, 'Le symptôme évoque un trouble du RVO.'],
      ['Axe rééducatif ?', ['Stabilisation du regard + substitution','Manœuvre VPPB systématique','Repos strict'], 0, 'Oscillopsie et aréflexie nécessitent regard/substitution.']
    ], takeaway:'Oscillopsie = explorer le RVO.' },
    { title:'Pour aller plus loin — faux VPPB', source:'plus', presentation:'Vertige positionnel, mais nystagmus non fatigable, atypique, avec céphalée inhabituelle.', questions:[
      ['Conduite ?', ['Répéter les manœuvres','Reconsidérer centralité','Ignorer céphalée'], 1, 'Tout nystagmus positionnel n’est pas un VPPB.'],
      ['Indice important ?', ['Atypie + céphalée','Latence + fatigabilité','Déclenchement lit seul'], 0, 'Les atypies changent le raisonnement.']
    ], takeaway:'Positionnel ne veut pas dire automatiquement VPPB.' }
  ],

  checklists: [
    { title:'Sécurité / red flags', goal:'Avant toute logique de traitement.', items:['Céphalée inhabituelle','Diplopie, dysarthrie, dysphagie','Paresthésies ou déficit moteur/sensitif','Ataxie majeure ou marche impossible','Nystagmus vertical, multidirectionnel ou gaze nystagmus','Skew positif','Oculomotricité franchement anormale','Réorientation si doute'] },
    { title:'Interrogatoire vestibulaire', goal:'Choisir les tests utiles.', items:['Début et évolution aiguë/chronique','Nature du trouble avec autre mot que vertige','Durée réelle de la crise','Fréquence des épisodes','Circonstances : position, effort, stress, grands espaces','Signes auditifs','Migraine/céphalées/cervicalgies','Trauma ou contexte viral','Traitements ototoxiques ou cardiovasculaires'] },
    { title:'HINTS — vertige aigu continu', goal:'Ne pas confondre protocole et tests isolés.', items:['Contexte compatible : vertige continu + symptômes persistants','Head Impulse Test','Nystagmus : direction, verticalité, changement de direction','Test of Skew','Chercher signes neuro associés','Interpréter l’ensemble, pas chaque item seul'] },
    { title:'EVS / harmonie', goal:'Lire Romberg, Fukuda et Babinski-Weil ensemble.', items:['Romberg simple puis sensibilisé si besoin','Fukuda simple / double tâche','Marche aveugle Babinski-Weil','Comparer sens des déviations','Cohérence du même côté = harmonieux possible','Discordance/instabilité majeure = reconsidérer central/mixte'] },
    { title:'Bilan des capteurs', goal:'Ne pas attribuer toute instabilité au vestibule.', items:['Vision : correction, cataracte, glaucome, DMLA, champ visuel','Convergence / trouble oculomoteur','Auditif : hypoacousie, acouphènes, plénitude, appareillage','Somatosensoriel : proprioception, neuropathies, ROT','Cognition/attention : double tâche, compréhension, anxiété'] },
    { title:'Positionnel / VPPB', goal:'Identifier le compatible et l’atypique.', items:['Vertige bref déclenché par position','Latence','Paroxysme','Fatigabilité','Reproductibilité','Inversion à la verticalisation','Direction compatible canal/côté','Atypies = reconsidérer'] },
    { title:'Suivi / re-bilan', goal:'Objectiver l’évolution.', items:['DHI / EEV / EVA','Nystagmus spontané et évolution','Prépondérance directionnelle si mesurable','Romberg/Fukuda/Babinski-Weil','CTSIB/SOT','Tolérance neurovégétative','Comparaison pré/per/post','Avis ORL/neuro si stagnation ou aggravation'] }
  ]
};
