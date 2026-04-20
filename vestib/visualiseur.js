if (window.APP && typeof window.APP.pageNav === 'function') {
  window.APP.pageNav('visualiseur.html');
}

const DM_CATALOG = {
  "diagnostic": {
    "post": [
      {
        "id": "diag_post_dixhallpike",
        "label": "Dix-Hallpike",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Test diagnostique principal du canal postérieur. Rotation de tête à 45° puis décubitus dorsal avec observation du nystagmus et de son inversion au retour assis.",
        "subtitle": "Canal postérieur : vertical supérieur torsionnel, inversion au retour assis.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ assis",
            "image": "diag_post_dixhallpike_1_depart_assis.png",
            "caption": "Patient assis, tête tournée à 45° du côté testé."
          },
          {
            "id": "provoked",
            "label": "Position déclenchante",
            "image": "diag_post_dixhallpike_2_position_declenchante.png",
            "caption": "Décubitus dorsal avec extension cervicale."
          },
          {
            "id": "return",
            "label": "Retour assis",
            "image": "diag_post_dixhallpike_3_retour_assis.png",
            "caption": "Retour assis pour vérifier l’inversion du nystagmus."
          }
        ]
      },
      {
        "id": "diag_post_sidelying",
        "label": "Side-Lying / Dix-Hallpike modifié",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Alternative si extension cervicale limitée. Tête orientée à 45° côté opposé au côté testé puis bascule tête-tronc du côté testé.",
        "subtitle": "Canal postérieur : même logique de lecture que le Dix-Hallpike.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ assis",
            "image": "diag_post_sidelying_1_depart_assis.png",
            "caption": "Patient assis, tête tournée à 45° vers le côté opposé au côté testé."
          },
          {
            "id": "provoked",
            "label": "Bascule latérale",
            "image": "diag_post_sidelying_2_bascule_laterale.png",
            "caption": "Bascule tête-tronc du côté testé."
          },
          {
            "id": "return",
            "label": "Retour assis",
            "image": "diag_post_sidelying_3_retour_assis.png",
            "caption": "Retour assis pour vérifier l’inversion du nystagmus."
          }
        ]
      }
    ],
    "horiz": [
      {
        "id": "diag_horiz_bowlean",
        "label": "Bow and Lean",
        "sideDependent": true,
        "mirrorLeft": false,
        "description": "Test utile pour distinguer canalolithiase et cupulolithiase du canal horizontal selon le sens du nystagmus en BOW puis en LEAN.",
        "subtitle": "Horizontal : BOW et LEAN s’inversent ; latence = canalo, persistance sans latence = cupulo.",
        "subtypes": [
          "canalolithiase",
          "cupulolithiase"
        ],
        "subtypeLabel": "Type horizontal",
        "steps": [
          {
            "id": "neutral",
            "label": "Tête droite",
            "image": "diag_horiz_bowlean_1_tete_droite.png",
            "caption": "Position assise tête droite pour la base de comparaison."
          },
          {
            "id": "bow",
            "label": "BOW",
            "image": "diag_horiz_bowlean_2_bow.png",
            "caption": "Flexion antérieure de tête."
          },
          {
            "id": "lean",
            "label": "LEAN",
            "image": "diag_horiz_bowlean_3_lean.png",
            "caption": "Extension de tête."
          }
        ]
      },
      {
        "id": "diag_horiz_supineroll",
        "label": "Supine Roll Test / McClure",
        "sideDependent": true,
        "mirrorLeft": false,
        "description": "Test de référence du canal horizontal pour préciser géotropique vs agéotropique et comparer l’intensité droite/gauche.",
        "subtitle": "Horizontal : géotropique = plus fort côté atteint ; agéotropique/cupulo = plus fort côté sain ; null point à rechercher en cupulolithiase.",
        "subtypes": [
          "geotropique",
          "ageotropique",
          "cupulolithiase"
        ],
        "subtypeLabel": "Forme horizontale",
        "steps": [
          {
            "id": "center",
            "label": "Position centrale",
            "image": "diag_horiz_supineroll_1_position_centrale.png",
            "caption": "Décubitus dorsal, tête fléchie à 30°."
          },
          {
            "id": "roll_right",
            "label": "Rotation droite",
            "image": "diag_horiz_supineroll_2_rotation_droite.png",
            "caption": "Rotation de tête à droite pour comparer le sens et l’intensité."
          },
          {
            "id": "roll_left",
            "label": "Rotation gauche",
            "image": "diag_horiz_supineroll_3_rotation_gauche.png",
            "caption": "Rotation de tête à gauche pour comparer au côté opposé."
          }
        ]
      },
      {
        "id": "diag_horiz_upright",
        "label": "Upright Head Roll",
        "sideDependent": true,
        "mirrorLeft": false,
        "description": "Test de confirmation en position assise par inclinaison latérale de tête dans le plan frontal.",
        "subtitle": "Horizontal : géotropique = même sens que l’inclinaison ; agéotropique/cupulo = sens opposé.",
        "subtypes": [
          "geotropique",
          "ageotropique"
        ],
        "subtypeLabel": "Forme horizontale",
        "steps": [
          {
            "id": "neutral",
            "label": "Tête droite",
            "image": "diag_horiz_upright_1_tete_droite.png",
            "caption": "Position assise de départ."
          },
          {
            "id": "tilt_right",
            "label": "Inclinaison droite",
            "image": "diag_horiz_upright_2_inclinaison_droite.png",
            "caption": "Inclinaison latérale à droite."
          },
          {
            "id": "tilt_left",
            "label": "Inclinaison gauche",
            "image": "diag_horiz_upright_3_inclinaison_gauche.png",
            "caption": "Inclinaison latérale à gauche."
          }
        ]
      }
    ],
    "ant": [
      {
        "id": "diag_ant_deephead",
        "label": "Deep Head Hanging / Straight Head Hanging",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Test diagnostique principal du canal antérieur si non latéralisé. Le côté peut rester indifférencié au straight head hanging pur.",
        "subtitle": "Canal antérieur : vertical inférieur, torsion éventuelle, inversion possible mais inconstante au retour assis.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ assis",
            "image": "diag_ant_deephead_1_depart_assis.png",
            "caption": "Patient assis, tête droite."
          },
          {
            "id": "hanging",
            "label": "Head hanging",
            "image": "diag_ant_deephead_2_head_hanging.png",
            "caption": "Décubitus dorsal avec hyperextension cervicale."
          },
          {
            "id": "return",
            "label": "Retour assis",
            "image": "diag_ant_deephead_3_retour_assis.png",
            "caption": "Retour assis pour rechercher une inversion éventuelle."
          }
        ]
      },
      {
        "id": "diag_ant_dixlat",
        "label": "Dix-Hallpike latéralisant",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Version latéralisante : oreille saine en bas pour identifier le côté atteint grâce à la composante torsionnelle.",
        "subtitle": "Canal antérieur : torsion utile à la latéralisation ; prudence devant tout downbeat atypique.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ assis",
            "image": "diag_ant_dixlat_1_depart_assis.png",
            "caption": "Départ assis, préparation du côté test avec oreille saine en bas."
          },
          {
            "id": "provoked",
            "label": "Position déclenchante",
            "image": "diag_ant_dixlat_2_position_declenchante.png",
            "caption": "Dix-Hallpike avec oreille saine en bas."
          },
          {
            "id": "return",
            "label": "Retour assis",
            "image": "diag_ant_dixlat_3_retour_assis.png",
            "caption": "Retour assis pour observer une inversion éventuelle."
          }
        ]
      }
    ]
  },
  "traitement": {
    "post": [
      {
        "id": "tx_post_semont",
        "label": "Manœuvre de Sémont",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Traitement du canal postérieur confirmé, utile notamment si mobilité cervicale limitée.",
        "subtitle": "Sémont : première bascule côté atteint puis bascule opposée tête vers le sol ; rechercher le nystagmus thérapeutique attendu.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Assis, tête tournée",
            "image": "tx_post_semont_1_assis_tete_rotation.png",
            "caption": "Position assise initiale, tête à 45° vers le côté opposé au côté atteint."
          },
          {
            "id": "affected_side",
            "label": "Bascule côté atteint",
            "image": "tx_post_semont_2_bascule_cote_atteint.png",
            "caption": "Déplacement rapide et contrôlé vers le côté atteint."
          },
          {
            "id": "opposite_side",
            "label": "Bascule opposée, tête vers le sol",
            "image": "tx_post_semont_3_bascule_opposee_tete_sol.png",
            "caption": "Bascule tête-tronc à 180° et tête orientée vers le sol."
          },
          {
            "id": "return",
            "label": "Retour assis",
            "image": "tx_post_semont_4_retour_assis.png",
            "caption": "Relever sécurisé après la pause."
          }
        ]
      },
      {
        "id": "tx_post_epley",
        "label": "Manœuvre d’Épley",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Traitement du canal postérieur confirmé avec séquence positionnelle progressive.",
        "subtitle": "Épley : 4 positions avec maintien ; nystagmus thérapeutique de même forme que le provocateur puis inversion au retour.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ en Dix-Hallpike",
            "image": "tx_post_epley_1_depart_dixhallpike.png",
            "caption": "Position déclenchante du côté atteint."
          },
          {
            "id": "turn_head",
            "label": "Rotation tête 90° côté opposé",
            "image": "tx_post_epley_2_rotation_tete_90_oppose.png",
            "caption": "Rotation de tête de 90° vers le côté opposé."
          },
          {
            "id": "roll_body",
            "label": "Décubitus latéral côté sain",
            "image": "tx_post_epley_3_decubitus_lateral_cote_sain.png",
            "caption": "Rotation tête-tronc vers le côté sain, tête face au sol."
          },
          {
            "id": "return",
            "label": "Retour assis",
            "image": "tx_post_epley_4_retour_assis.png",
            "caption": "Retour assis après maintien suffisant."
          }
        ]
      }
    ],
    "horiz": [
      {
        "id": "tx_horiz_lempert",
        "label": "Barbecue de Lempert",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Manœuvre de référence surtout pour les formes géotropiques du canal horizontal.",
        "subtitle": "Lempert : rotations successives avec pauses de 30 s ; nystagmus thérapeutique horizontal controlatéral à l’oreille affectée.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ DD tête à 30°",
            "image": "tx_horiz_lempert_1_depart_dd_30.png",
            "caption": "Décubitus dorsal, tête relevée de 30°."
          },
          {
            "id": "toward_affected",
            "label": "Rotation côté atteint",
            "image": "tx_horiz_lempert_2_rotation_cote_atteint.png",
            "caption": "Première rotation du côté atteint."
          },
          {
            "id": "toward_healthy",
            "label": "Rotation côté sain",
            "image": "tx_horiz_lempert_3_rotation_cote_sain.png",
            "caption": "Rotation vers le côté sain."
          },
          {
            "id": "dl_healthy",
            "label": "Décubitus latéral côté sain",
            "image": "tx_horiz_lempert_4_decubitus_lateral_cote_sain.png",
            "caption": "Passage en décubitus latéral côté sain."
          },
          {
            "id": "ventral",
            "label": "Décubitus ventral",
            "image": "tx_horiz_lempert_5_decubitus_ventral.png",
            "caption": "Passage en décubitus ventral en appui sur les avant-bras."
          },
          {
            "id": "return",
            "label": "Nez au zénith puis retour assis",
            "image": "tx_horiz_lempert_6_nez_zenith_retour_assis.png",
            "caption": "Fin de la rotation puis retour assis sécurisé."
          }
        ]
      },
      {
        "id": "tx_horiz_gufoni3g",
        "label": "Gufoni 3G",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Forme géotropique : Geotropic, Good ear, Ground.",
        "subtitle": "Gufoni 3G : décubitus latéral sur le côté sain puis tête vers la table ; nystagmus thérapeutique horizontal controlatéral à l’oreille affectée.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ assis",
            "image": "tx_horiz_gufoni3g_1_depart_assis.png",
            "caption": "Patient assis jambes pendantes."
          },
          {
            "id": "dl_good_ear",
            "label": "Décubitus latéral côté sain",
            "image": "tx_horiz_gufoni3g_2_decubitus_lateral_cote_sain.png",
            "caption": "Bascule rapide en décubitus latéral strict sur le côté sain."
          },
          {
            "id": "head_ground",
            "label": "Tête à 90° vers la table",
            "image": "tx_horiz_gufoni3g_3_tete_90_vers_table.png",
            "caption": "Rotation de tête à 90° vers la table."
          },
          {
            "id": "return",
            "label": "Relever rotation conservée",
            "image": "tx_horiz_gufoni3g_4_relever_rotation_conservee.png",
            "caption": "Relever en conservant la rotation de tête puis retour neutre."
          }
        ]
      },
      {
        "id": "tx_horiz_gufoni3a",
        "label": "Gufoni 3A",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Forme agéotropique ou cupulolithiase : Apogeotropic, Affected ear, Away.",
        "subtitle": "Gufoni 3A : décubitus latéral sur le côté atteint puis tête vers le haut ; nystagmus thérapeutique horizontal controlatéral à l’oreille affectée, conversion possible.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ assis",
            "image": "tx_horiz_gufoni3a_1_depart_assis.png",
            "caption": "Patient assis jambes pendantes."
          },
          {
            "id": "dl_affected",
            "label": "Décubitus latéral côté atteint",
            "image": "tx_horiz_gufoni3a_2_decubitus_lateral_cote_atteint.png",
            "caption": "Bascule rapide en décubitus latéral strict sur le côté atteint."
          },
          {
            "id": "head_up",
            "label": "Tête à 90° vers le haut",
            "image": "tx_horiz_gufoni3a_3_tete_90_vers_haut.png",
            "caption": "Rotation de tête à 90° vers le haut."
          },
          {
            "id": "return",
            "label": "Relever rotation conservée",
            "image": "tx_horiz_gufoni3a_4_relever_rotation_conservee.png",
            "caption": "Relever en conservant la rotation de tête puis retour neutre."
          }
        ]
      }
    ],
    "ant": [
      {
        "id": "tx_ant_yacovino",
        "label": "Manœuvre de Yacovino",
        "sideDependent": false,
        "mirrorLeft": false,
        "description": "Traitement du canal antérieur sans nécessité d’identifier le côté affecté.",
        "subtitle": "Yacovino : head hanging, menton poitrine puis retour assis ; nystagmus vertical inférieur tout au long de la manœuvre, inversion au retour.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Départ assis",
            "image": "tx_ant_yacovino_1_depart_assis.png",
            "caption": "Tête droite en position assise."
          },
          {
            "id": "hanging",
            "label": "Head hanging",
            "image": "tx_ant_yacovino_2_head_hanging.png",
            "caption": "Décubitus dorsal avec tête en hyperextension."
          },
          {
            "id": "chin_chest",
            "label": "Menton poitrine",
            "image": "tx_ant_yacovino_3_menton_poitrine.png",
            "caption": "Après épuisement du nystagmus, ramener menton sur la poitrine."
          },
          {
            "id": "return",
            "label": "Retour assis en flexion",
            "image": "tx_ant_yacovino_4_retour_assis_flexion.png",
            "caption": "Redresser le patient en flexion cervicale puis relever la tête droite."
          }
        ]
      },
      {
        "id": "tx_ant_li",
        "label": "Manœuvre de Li",
        "sideDependent": false,
        "mirrorLeft": false,
        "description": "Alternative pour le canal antérieur sans connaissance préalable du côté affecté.",
        "subtitle": "Li : après la position déclenchante, bascule rapide face contre la table puis maintien prolongé.",
        "subtypes": [],
        "steps": [
          {
            "id": "trigger",
            "label": "Position déclenchante",
            "image": "tx_ant_li_1_position_declenchante.png",
            "caption": "Straight head hanging déclenchant le tableau."
          },
          {
            "id": "ventral",
            "label": "Bascule ventrale",
            "image": "tx_ant_li_2_bascule_ventrale_face_table.png",
            "caption": "Bascule rapide face contre la table."
          },
          {
            "id": "maintain",
            "label": "Maintien prolongé",
            "image": "tx_ant_li_3_maintien_prolonge.png",
            "caption": "Maintien de la position ventrale."
          },
          {
            "id": "return",
            "label": "Retour vertical",
            "image": "tx_ant_li_4_retour_vertical.png",
            "caption": "Retour prudent à la verticale."
          }
        ]
      },
      {
        "id": "tx_ant_kim",
        "label": "Manœuvre de Kim",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Option si le canal antérieur est latéralisé au Dix-Hallpike.",
        "subtitle": "Kim : tête vers le côté sain, hyperextension, retour horizontal puis retour assis menton fléchi.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Assis, tête côté sain",
            "image": "tx_ant_kim_1_assis_tete_cote_sain.png",
            "caption": "Patient assis, tête tournée de 45° vers le côté sain."
          },
          {
            "id": "hanging",
            "label": "Couché en hyperextension",
            "image": "tx_ant_kim_2_couche_hyperextension.png",
            "caption": "Décubitus dorsal avec hyperextension cervicale."
          },
          {
            "id": "horizontal",
            "label": "Tête relevée horizontale",
            "image": "tx_ant_kim_3_tete_relevee_horizontale.png",
            "caption": "Tête relevée en position horizontale en gardant la rotation."
          },
          {
            "id": "return",
            "label": "Retour assis menton fléchi",
            "image": "tx_ant_kim_4_retour_assis_menton_flechi.png",
            "caption": "Retour assis avec menton penché vers le bas."
          }
        ]
      },
      {
        "id": "tx_ant_epley_inverse",
        "label": "Épley inversé",
        "sideDependent": true,
        "mirrorLeft": true,
        "description": "Alternative si le canal antérieur est latéralisé, selon la logique d’un postérieur controlatéral.",
        "subtitle": "Épley inversé : tête vers le côté sain, hyperextension, rotation vers le côté atteint, décubitus latéral puis retour assis.",
        "subtypes": [],
        "steps": [
          {
            "id": "start",
            "label": "Assis, tête côté sain",
            "image": "tx_ant_epley_inverse_1_assis_tete_cote_sain.png",
            "caption": "Patient assis, tête tournée à 45° vers le côté sain."
          },
          {
            "id": "hanging",
            "label": "Couché en hyperextension",
            "image": "tx_ant_epley_inverse_2_couche_hyperextension.png",
            "caption": "Décubitus dorsal avec tête en hyperextension, toujours orientée côté sain."
          },
          {
            "id": "turn_affected",
            "label": "Rotation vers côté atteint",
            "image": "tx_ant_epley_inverse_3_rotation_vers_cote_atteint.png",
            "caption": "Tête tournée vers le côté atteint."
          },
          {
            "id": "dl_affected",
            "label": "Décubitus latéral côté atteint",
            "image": "tx_ant_epley_inverse_4_decubitus_lateral_cote_atteint.png",
            "caption": "Décubitus latéral côté atteint, tête face au sol."
          },
          {
            "id": "return",
            "label": "Retour assis",
            "image": "tx_ant_epley_inverse_5_retour_assis.png",
            "caption": "Retour assis en sécurité."
          }
        ]
      }
    ]
  }
};
const DM_IMAGE_BASE = 'image vestib';

function titleCase(value) {
  return String(value || '').charAt(0).toUpperCase() + String(value || '').slice(1);
}

function directionLabel(dir) {
  return dir === 'right' ? 'droite' : dir === 'left' ? 'gauche' : dir === 'up' ? 'haut' : 'bas';
}

function makeImagePath(filename) {
  return encodeURI(`${DM_IMAGE_BASE}/${filename}`);
}

function nystagmusNone(label = 'Aucun nystagmus attendu') {
  return { type:'none', summary: label, bubble:'Pas de nystagmus attendu ou base de comparaison.', details: [] };
}

function getPostTorsion(side, inverted=false) {
  if (side === 'right') return inverted ? 'horaire' : 'anti-horaire';
  return inverted ? 'anti-horaire' : 'horaire';
}

function getAntTorsion(side, inverted=false) {
  if (side === 'right') return inverted ? 'horaire' : 'anti-horaire';
  return inverted ? 'anti-horaire' : 'horaire';
}

function getHorizontalTherapeuticDirection(side) {
  return side === 'right' ? 'left' : 'right';
}

function getItemList(mode, canal) {
  return DM_CATALOG[mode][canal] || [];
}

function getCurrentItem(state) {
  return getItemList(state.mode, state.canal).find(item => item.id === state.itemId) || getItemList(state.mode, state.canal)[0];
}

function currentSubtypeOptions(item) {
  return Array.isArray(item.subtypes) ? item.subtypes : [];
}

function describeSubtype(v) {
  return {
    canalolithiase: 'Canalolithiase',
    cupulolithiase: 'Cupulolithiase',
    geotropique: 'Géotropique',
    ageotropique: 'Agéotropique'
  }[v] || v;
}

function getNystagmus(state, item, step) {
  const side = state.side;
  const subtype = state.subtype;
  const contralateral = getHorizontalTherapeuticDirection(side);

  switch (item.id) {
    case 'diag_post_dixhallpike':
    case 'diag_post_sidelying': {
      if (step.id === 'provoked') return {
        type:'torsional-vertical', vertical:'up', torsion:getPostTorsion(side, false),
        summary:`Vertical supérieur torsionnel ${getPostTorsion(side, false)}`,
        bubble:'Canal postérieur : nystagmus vertical supérieur torsionnel du côté testé positif, avec inversion au retour assis.',
        details:['géotropique', `oreille atteinte : ${side === 'right' ? 'droite' : 'gauche'}`]
      };
      if (step.id === 'return') return {
        type:'torsional-vertical', vertical:'down', torsion:getPostTorsion(side, true),
        summary:`Inversion au retour assis`,
        bubble:'Le retour assis doit montrer une inversion du nystagmus.',
        details:['inversion', `torsion ${getPostTorsion(side, true)}`]
      };
      return nystagmusNone();
    }

    case 'diag_horiz_bowlean': {
      if (step.id === 'bow') {
        const dir = subtype === 'cupulolithiase' ? contralateral : side;
        return {
          type:'horizontal', dir,
          summary:`Horizontal vers ${directionLabel(dir)}`,
          bubble: subtype === 'cupulolithiase'
            ? 'BOW en cupulolithiase : nystagmus vers l’oreille saine, sans latence et persistant.'
            : 'BOW en canalolithiase : nystagmus vers l’oreille atteinte, avec latence.',
          details:[describeSubtype(subtype)]
        };
      }
      if (step.id === 'lean') {
        const dir = subtype === 'cupulolithiase' ? side : contralateral;
        return {
          type:'horizontal', dir,
          summary:`Horizontal vers ${directionLabel(dir)}`,
          bubble: subtype === 'cupulolithiase'
            ? 'LEAN en cupulolithiase : inversion, nystagmus vers l’oreille atteinte et persistant.'
            : 'LEAN en canalolithiase : inversion, nystagmus vers l’oreille saine.',
          details:[describeSubtype(subtype)]
        };
      }
      return nystagmusNone('Base de comparaison / pseudo-spontané possible');
    }

    case 'diag_horiz_supineroll': {
      if (step.id === 'roll_right') {
        const dir = subtype === 'geotropique' ? 'right' : 'left';
        return {
          type:'horizontal', dir,
          summary:`Horizontal ${subtype === 'geotropique' ? 'géotropique' : 'agéotropique'}`,
          bubble: subtype === 'geotropique'
            ? 'Rotation droite : le nystagmus bat vers l’oreille basse. Il est plus fort si le côté atteint est droit.'
            : 'Rotation droite : le nystagmus bat vers l’oreille haute. Il est plus fort si le côté sain est droit.',
          details:[describeSubtype(subtype), subtype === 'cupulolithiase' ? 'null point à rechercher' : `comparaison avec rotation gauche`]
        };
      }
      if (step.id === 'roll_left') {
        const dir = subtype === 'geotropique' ? 'left' : 'right';
        return {
          type:'horizontal', dir,
          summary:`Horizontal ${subtype === 'geotropique' ? 'géotropique' : 'agéotropique'}`,
          bubble: subtype === 'geotropique'
            ? 'Rotation gauche : le nystagmus bat vers l’oreille basse. Il est plus fort si le côté atteint est gauche.'
            : 'Rotation gauche : le nystagmus bat vers l’oreille haute. Il est plus fort si le côté sain est gauche.',
          details:[describeSubtype(subtype), subtype === 'cupulolithiase' ? 'null point à rechercher' : `comparaison avec rotation droite`]
        };
      }
      return nystagmusNone(subtype === 'cupulolithiase' ? 'Position centrale : base de comparaison, null point possible à rechercher' : 'Position centrale : base de comparaison');
    }

    case 'diag_horiz_upright': {
      if (step.id === 'tilt_right') {
        const dir = subtype === 'geotropique' ? 'right' : 'left';
        return {
          type:'horizontal', dir,
          summary:`Horizontal vers ${directionLabel(dir)}`,
          bubble: subtype === 'geotropique'
            ? 'Upright Head Roll : en forme géotropique, le nystagmus suit l’inclinaison.'
            : 'Upright Head Roll : en forme agéotropique / cupulaire, le nystagmus prend le sens opposé à l’inclinaison.',
          details:[describeSubtype(subtype)]
        };
      }
      if (step.id === 'tilt_left') {
        const dir = subtype === 'geotropique' ? 'left' : 'right';
        return {
          type:'horizontal', dir,
          summary:`Horizontal vers ${directionLabel(dir)}`,
          bubble: subtype === 'geotropique'
            ? 'Upright Head Roll : en forme géotropique, le nystagmus suit l’inclinaison.'
            : 'Upright Head Roll : en forme agéotropique / cupulaire, le nystagmus prend le sens opposé à l’inclinaison.',
          details:[describeSubtype(subtype)]
        };
      }
      return nystagmusNone('Tête droite : aucun ou pseudo-spontané éventuel');
    }

    case 'diag_ant_deephead': {
      if (step.id === 'hanging') return {
        type:'vertical', vertical:'down',
        summary:'Vertical inférieur',
        bubble:'Deep Head Hanging : nystagmus vertical inférieur ; la torsion peut être absente ou trop faible pour latéraliser.',
        details:['souvent non latéralisable']
      };
      if (step.id === 'return') return {
        type:'vertical-possible', vertical:'up',
        summary:'Inversion possible au retour',
        bubble:'Le retour assis peut montrer une inversion, mais elle est inconstante.',
        details:['possible', 'non constante']
      };
      return nystagmusNone();
    }

    case 'diag_ant_dixlat': {
      if (step.id === 'provoked') return {
        type:'torsional-vertical', vertical:'down', torsion:getAntTorsion(side, false),
        summary:'Vertical inférieur avec torsion',
        bubble:'Dix-Hallpike latéralisant : la composante torsionnelle aide à identifier le côté atteint.',
        details:[`canal antérieur ${side === 'right' ? 'droit' : 'gauche'}`, `torsion ${getAntTorsion(side, false)}`]
      };
      if (step.id === 'return') return {
        type:'vertical-possible', vertical:'up',
        summary:'Inversion éventuelle',
        bubble:'Le retour assis peut inverser le nystagmus, sans systématicité.',
        details:['prudence diagnostique']
      };
      return nystagmusNone();
    }

    case 'tx_post_semont': {
      if (step.id === 'affected_side') return {
        type:'torsional-vertical', vertical:'up', torsion:getPostTorsion(side, false),
        summary:'Torsionnel géotropique vers l’oreille basse',
        bubble:'Première bascule de Sémont : nystagmus torsionnel géotropique attendu vers l’oreille basse.',
        details:['position déclenchante']
      };
      if (step.id === 'opposite_side') return {
        type:'torsional-vertical', vertical:'up', torsion:getPostTorsion(side, true),
        summary:'Torsionnel agéotropique vers l’oreille haute',
        bubble:'Seconde bascule de Sémont : nystagmus thérapeutique torsionnel agéotropique vers l’oreille haute.',
        details:['thérapeutique']
      };
      if (step.id === 'return') return {
        type:'vertical-possible', vertical:'up',
        summary:'Retour assis, possible NVI',
        bubble:'Au relever, un nystagmus vertical inférieur peut être observé lors de la réintégration otolithique.',
        details:['possible', 'selon le cours']
      };
      return nystagmusNone();
    }

    case 'tx_post_epley': {
      if (step.id === 'start' || step.id === 'turn_head' || step.id === 'roll_body') return {
        type:'torsional-vertical', vertical:'up', torsion:getPostTorsion(side, false),
        summary:'Torsionnel vertical supérieur',
        bubble:'Épley : le nystagmus thérapeutique garde la logique du provocateur pendant la séquence.',
        details:['maintien ≥ 30 s']
      };
      if (step.id === 'return') return {
        type:'torsional-vertical', vertical:'down', torsion:getPostTorsion(side, true),
        summary:'Inversion au retour',
        bubble:'Retour assis : inversion attendue du nystagmus.',
        details:['relever sécurisé']
      };
      return nystagmusNone();
    }

    case 'tx_horiz_lempert':
    case 'tx_horiz_gufoni3g':
    case 'tx_horiz_gufoni3a': {
      if (step.id === 'start') return nystagmusNone();
      return {
        type:'horizontal', dir:contralateral,
        summary:`Horizontal thérapeutique vers ${directionLabel(contralateral)}`,
        bubble: item.id === 'tx_horiz_gufoni3a'
          ? 'Horizontal : nystagmus thérapeutique classiquement controlatéral à l’oreille affectée, avec conversion géotropique possible en 3A.'
          : 'Horizontal : nystagmus thérapeutique classiquement controlatéral à l’oreille affectée.',
        details:[item.label, `oreille atteinte : ${side === 'right' ? 'droite' : 'gauche'}`]
      };
    }

    case 'tx_ant_yacovino': {
      if (step.id === 'hanging' || step.id === 'chin_chest') return {
        type:'vertical', vertical:'down',
        summary:'Vertical inférieur thérapeutique',
        bubble:'Yacovino : observer le nystagmus vertical inférieur tout au long de la manœuvre.',
        details:['non latéralisé']
      };
      if (step.id === 'return') return {
        type:'vertical', vertical:'up',
        summary:'Inversion au retour assis',
        bubble:'Au retour assis en flexion, une inversion peut être observée.',
        details:['retour assis en flexion']
      };
      return nystagmusNone();
    }

    case 'tx_ant_li': {
      if (step.id === 'trigger') return {
        type:'vertical', vertical:'down',
        summary:'Vertical inférieur déclenché',
        bubble:'Li démarre par la position déclenchante du straight head hanging.',
        details:['déclenchement']
      };
      return nystagmusNone('Surveillance clinique pendant le repositionnement');
    }

    case 'tx_ant_kim':
    case 'tx_ant_epley_inverse': {
      if (step.id === 'start') return nystagmusNone();
      if (step.id === 'hanging' || step.id === 'horizontal' || step.id === 'turn_affected' || step.id === 'dl_affected') return {
        type:'torsional-vertical', vertical:'down', torsion:getAntTorsion(side, false),
        summary:'Vertical inférieur avec torsion',
        bubble:'Canal antérieur latéralisé : la logique thérapeutique suit le côté identifié au préalable.',
        details:[`torsion ${getAntTorsion(side, false)}`]
      };
      if (step.id === 'return') return {
        type:'vertical-possible', vertical:'up',
        summary:'Inversion possible',
        bubble:'Le retour assis peut s’accompagner d’une inversion, sans caractère constant.',
        details:['surveillance au contrôle']
      };
      return nystagmusNone();
    }
  }
  return nystagmusNone();
}

function renderEye(model) {
  const w = 280;
  const h = 220;

  const horizontalArrow = (() => {
    if (model.type !== 'horizontal') return '';
    // right/left remain clinical directions (patient). The eye is drawn front-facing.
    return model.dir === 'right'
      ? `<line x1="182" y1="104" x2="98" y2="104" stroke="#dc2626" stroke-width="4" stroke-linecap="round" marker-end="url(#arrowLine)"/>`
      : `<line x1="98" y1="104" x2="182" y2="104" stroke="#dc2626" stroke-width="4" stroke-linecap="round" marker-end="url(#arrowLine)"/>`;
  })();

  const verticalArrow = (() => {
    if (!['vertical', 'vertical-possible', 'torsional-vertical'].includes(model.type)) return '';
    const dash = model.type === 'vertical-possible' ? 'stroke-dasharray="6 6"' : '';
    return model.vertical === 'down'
      ? `<line x1="214" y1="76" x2="214" y2="136" stroke="#dc2626" stroke-width="4" stroke-linecap="round" ${dash} marker-end="url(#arrowLine)"/>`
      : `<line x1="214" y1="136" x2="214" y2="76" stroke="#dc2626" stroke-width="4" stroke-linecap="round" ${dash} marker-end="url(#arrowLine)"/>`;
  })();

  const torsion = (() => {
    if (model.type !== 'torsional-vertical') return '';
    if (model.torsion === 'horaire') {
      return `<path d="M 106 130 Q 84 104 106 78" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round" marker-end="url(#arrowCurve)"/>`;
    }
    return `<path d="M 174 130 Q 196 104 174 78" fill="none" stroke="#dc2626" stroke-width="4" stroke-linecap="round" marker-end="url(#arrowCurve)"/>`;
  })();

  return `
    <svg viewBox="0 0 ${w} ${h}" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" aria-label="Schéma du nystagmus">
      <defs>
        <marker id="arrowLine" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#dc2626"></path>
        </marker>
        <marker id="arrowCurve" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="userSpaceOnUse">
          <path d="M0,0 L6,3 L0,6 z" fill="#dc2626"></path>
        </marker>
      </defs>
      <rect x="0" y="0" width="${w}" height="${h}" rx="16" fill="#ffffff"/>
      <text x="140" y="24" text-anchor="middle" font-size="18" font-weight="700" fill="#16324f" font-family="inherit">Œil</text>
      <circle cx="140" cy="104" r="54" fill="#f8fbff" stroke="#9ab0c7" stroke-width="3"/>
      <circle cx="140" cy="104" r="16" fill="#1565c0"/>
      <circle cx="134" cy="98" r="4.5" fill="#fff"/>
      ${horizontalArrow}
      ${torsion}
      ${verticalArrow}
      <text x="140" y="212" text-anchor="middle" font-size="14" fill="#16324f" font-family="inherit">${model.summary || 'Aucun nystagmus attendu'}</text>
    </svg>
  `;
}

class DiagnosticsManoeuvresUI {
  constructor() {
    this.state = { mode:'diagnostic', canal:'post', itemId:'', side:'right', subtype:'', stepIndex:0 };
    this.bind();
    this.renderModeButtons();
    this.fillCanals();
    this.refreshItems(true);
    this.render();
  }

  bind() {
    document.getElementById('canalSelect').addEventListener('change', e => {
      this.state.canal = e.target.value;
      this.refreshItems(true);
      this.render();
    });
    document.getElementById('itemSelect').addEventListener('change', e => {
      this.state.itemId = e.target.value;
      this.state.stepIndex = 0;
      this.refreshSubtype();
      this.render();
    });
    document.getElementById('sideSelect').addEventListener('change', e => {
      this.state.side = e.target.value;
      this.render();
    });
    document.getElementById('subtypeSelect').addEventListener('change', e => {
      this.state.subtype = e.target.value;
      this.render();
    });
  }

  renderModeButtons() {
    const root = document.getElementById('modeButtons');
    const modes = [
      ['diagnostic','Accès diagnostic'],
      ['traitement','Accès manœuvres de traitement']
    ];
    root.innerHTML = '';
    modes.forEach(([id,label]) => {
      const btn = document.createElement('button');
      btn.className = `btn ${this.state.mode === id ? 'primary' : 'ghost'}`;
      btn.textContent = label;
      btn.addEventListener('click', () => {
        this.state.mode = id;
        this.state.canal = id === 'diagnostic' ? 'post' : 'post';
        this.refreshItems(true);
        this.renderModeButtons();
        this.render();
      });
      root.appendChild(btn);
    });
  }

  fillCanals() {
    const select = document.getElementById('canalSelect');
    const options = [
      ['post','Canal postérieur'],
      ['horiz','Canal horizontal'],
      ['ant','Canal antérieur']
    ];
    select.innerHTML = options.map(([v,l]) => `<option value="${v}">${l}</option>`).join('');
    select.value = this.state.canal;
  }

  refreshItems(reset=false) {
    const list = getItemList(this.state.mode, this.state.canal);
    const itemSelect = document.getElementById('itemSelect');
    itemSelect.innerHTML = list.map(item => `<option value="${item.id}">${item.label}</option>`).join('');
    if (reset || !list.some(item => item.id === this.state.itemId)) {
      this.state.itemId = list[0]?.id || '';
      this.state.stepIndex = 0;
    }
    itemSelect.value = this.state.itemId;
    this.refreshSubtype();
  }

  refreshSubtype() {
    const item = getCurrentItem(this.state);
    const subtypeWrap = document.getElementById('subtypeWrap');
    const subtypeSelect = document.getElementById('subtypeSelect');
    const subtypeOptions = currentSubtypeOptions(item);
    const sideSelect = document.getElementById('sideSelect');
    sideSelect.parentElement.style.display = item.sideDependent === false ? 'none' : 'block';
    if (!item.sideDependent) this.state.side = 'right';
    if (!subtypeOptions.length) {
      subtypeWrap.style.display = 'none';
      this.state.subtype = '';
      return;
    }
    subtypeWrap.style.display = 'block';
    subtypeWrap.querySelector('label').textContent = item.subtypeLabel || 'Variante';
    subtypeSelect.innerHTML = subtypeOptions.map(v => `<option value="${v}">${describeSubtype(v)}</option>`).join('');
    if (!subtypeOptions.includes(this.state.subtype)) this.state.subtype = subtypeOptions[0];
    subtypeSelect.value = this.state.subtype;
  }

  render() {
    document.getElementById('canalSelect').value = this.state.canal;
    this.renderModeButtons();
    const item = getCurrentItem(this.state);
    if (!item) return;
    const step = item.steps[this.state.stepIndex] || item.steps[0];
    const model = getNystagmus(this.state, item, step);

    document.getElementById('badgeRow').innerHTML = [
      `<span class="badge success">${this.state.mode === 'diagnostic' ? '🧭 Diagnostic' : '🎯 Traitement'}</span>`,
      `<span class="badge warning">${this.state.canal === 'post' ? '🌀 Canal postérieur' : this.state.canal === 'horiz' ? '↔️ Canal horizontal' : '⬇️ Canal antérieur'}</span>`,
      item.sideDependent === false ? `<span class="badge">Sans latéralisation préalable</span>` : `<span class="badge">Oreille atteinte : ${this.state.side === 'right' ? 'droite' : 'gauche'}</span>`,
      this.state.subtype ? `<span class="badge">${describeSubtype(this.state.subtype)}</span>` : ''
    ].filter(Boolean).join('');

    document.getElementById('sequenceTitle').textContent = item.label;

    const stepButtons = document.getElementById('stepButtons');
    stepButtons.innerHTML = '';
    item.steps.forEach((s, idx) => {
      const btn = document.createElement('button');
      btn.className = `dm-step-btn ${idx === this.state.stepIndex ? 'active' : ''}`;
      btn.textContent = `${idx + 1}. ${s.label}`;
      btn.addEventListener('click', () => { this.state.stepIndex = idx; this.render(); });
      stepButtons.appendChild(btn);
    });

    const img = document.getElementById('stepImage');
    const placeholder = document.getElementById('imagePlaceholder');
    const imagePath = makeImagePath(step.image);
    img.className = item.mirrorLeft && this.state.side === 'left' ? 'mirror' : '';
    img.alt = `${item.label} — ${step.label}`;
    img.onload = () => { placeholder.style.display = 'none'; };
    img.onerror = () => {
      placeholder.style.display = 'flex';
      placeholder.innerHTML = `<div><strong>Image manquante</strong><br/><br/>Ajoute l’image dans le dossier <code>${DM_IMAGE_BASE}</code>.</div>`;
    };
    placeholder.style.display = 'none';
    img.src = imagePath;

    document.getElementById('eyeBox').innerHTML = renderEye(model);
    document.getElementById('infoBubble').innerHTML = model.bubble;
  }
}

window.addEventListener('DOMContentLoaded', () => {
  new DiagnosticsManoeuvresUI();
});
