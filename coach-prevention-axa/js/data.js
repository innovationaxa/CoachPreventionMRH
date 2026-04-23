/* ═══════════════════════════════════════════════════════
   DATA.JS v3 — Coach Prévention MRH
   Source : PRD v1.0 Avril 2026
   3 profils · 6 risques · 25 actions · 20 questions
   6 récompenses · 6 services
═══════════════════════════════════════════════════════ */

/* ── PROFILS ── */
const PROFILES = {
  'profil-a': {
    id: 'profil-a',
    firstName: 'Marie',
    avatar: '👩',
    propertyType: 'Maison individuelle',
    occupancyStatus: 'Propriétaire',
    location: 'Nantes (44)',
    zone: 'Zone orange inondation — Vents forts',
    scenario: 'seasonal',
    scenarioLabel: 'Saisonnalité',
    scenarioColor: 'warn',
    exposureScore: 78,
    preparationScore: 32,
    mainRisks: ['inondation','tempete','degat-eaux'],
    condition: 'maison_rdc',
    hasGarden: true,
    tagline: 'Automne-hiver · Risques élevés détectés',
    riskExposure: {
      'inondation': { zoneLevel:'tres_eleve', canImprove:true  },
      'tempete':    { zoneLevel:'eleve',      canImprove:true  },
      'degat-eaux': { zoneLevel:'modere',     canImprove:true  },
      'vol':        { zoneLevel:'faible',     canImprove:true  },
      'incendie':   { zoneLevel:'faible',     canImprove:true  },
      'rga':        { zoneLevel:'tres_faible',canImprove:false }
    },
    contract: { name: 'MRH AXA Confort', ref: 'MRH-2024-78432' },
    localContext: {
      georisquesZone: 'Zone orange inondation (PPRI Loire-Atlantique)',
      pcs: true,
      recentEvent: { year: '2023', label: 'Tempête Domingos', detail: '47 communes sinistrées · rafales > 110 km/h enregistrées à Nantes' },
      sinistresStats: {
        'inondation': { stat: '3 300 sinistres inondation/an en Loire-Atlantique', source: 'CCR 2023' },
        'tempete':    { stat: '18 000 sinistres tempête dans les Pays de la Loire en 2023', source: 'FFA 2023' },
        'degat-eaux': { stat: '1 logement sur 4 touché par un DDE chaque année en France', source: 'FFA 2023' }
      },
      testimonial: {
        situation: 'Maison individuelle · Nantes · octobre 2023',
        text: 'Suite aux crues de l\'Erdre, la cave a été inondée sur 60 cm. Parquet et électroménager détruits — 18 000 € de dégâts, 8 semaines de travaux.',
        source: 'Données sinistres AXA Loire-Atlantique'
      }
    },
    coverage: {
      'inondation': { status: 'covered', limit: '150 000 €', franchise: '380 €',   cgRef: 'Art. 3.6.3 + 3.4', note: 'Couvert — eaux de ruissellement et débordements (art. 3.6.3) et régime CatNat si arrêté publié (art. 3.4) — franchise légale 380 €' },
      'tempete':    { status: 'covered', limit: '150 000 €', franchise: '380 €',   cgRef: 'Art. 3.6.1',       note: 'Action directe du vent, grêle et neige couverts (art. 3.6.1) — condition : vent > 90 km/h ou dommages sur la commune — franchise légale 380 €' },
      'degat-eaux': { status: 'covered', limit: '80 000 €',  franchise: '150 €',   cgRef: 'Art. 3.5',         note: 'Garantie de base — fuites, ruptures, infiltrations et recherche de fuite incluse (art. 3.5) — exclusion : humidité, condensation, moisissures' },
      'vol':        { status: 'covered', limit: '5 000 €',   franchise: '300 €',   cgRef: 'Art. 4.1',         note: 'Option souscrite — vol par effraction, escalade ou fausses clés (art. 4.1) — conditions de protection (serrure + volets) obligatoires sous peine de réduction de 50 %' },
      'incendie':   { status: 'covered', limit: '150 000 €', franchise: '380 €',   cgRef: 'Art. 3.1',         note: 'Garantie de base — incendie, explosion, implosion, enfumage et foudre couverts (art. 3.1) — exclusion : moisissures' },
      'rga':        { status: 'partial', limit: null,        franchise: '1 520 €', cgRef: 'Art. 3.4',         note: 'Couvert uniquement via Catastrophes Naturelles (art. 3.4) — franchise légale spécifique 1 520 € — mise en jeu après arrêté interministériel publié au JO' }
    }
  },
  'profil-b': {
    id: 'profil-b',
    firstName: 'Thomas',
    avatar: '👨',
    propertyType: 'Appartement',
    occupancyStatus: 'Locataire',
    location: 'Paris 15e (75)',
    zone: 'Zone urbaine — Risque vol modéré',
    scenario: 'subscription',
    scenarioLabel: 'Souscription',
    scenarioColor: 'info',
    exposureScore: 55,
    preparationScore: 48,
    mainRisks: ['vol','degat-eaux','incendie'],
    condition: 'all',
    hasGarden: false,
    completedActions: ['incendie-detecteur-fumee'],
    tagline: 'Nouveau contrat · Plan de départ',
    riskExposure: {
      'vol':        { zoneLevel:'eleve',      canImprove:true  },
      'degat-eaux': { zoneLevel:'modere',     canImprove:true  },
      'incendie':   { zoneLevel:'modere',     canImprove:true  },
      'inondation': { zoneLevel:'faible',     canImprove:false },
      'tempete':    { zoneLevel:'tres_faible',canImprove:false },
      'rga':        { zoneLevel:'tres_faible',canImprove:false }
    },
    contract: { name: 'MRH AXA Essentiel', ref: 'MRH-2025-12089' },
    localContext: {
      georisquesZone: 'Zone urbaine dense — risque vol et DDE',
      pcs: false,
      recentEvent: { year: '2023', label: 'Vague de cambriolages Paris 15e', detail: '+14 % de cambriolages dans l\'arrondissement · pic sur octobre–décembre 2023' },
      sinistresStats: {
        'vol':        { stat: '1 cambriolage toutes les 45 min en Île-de-France', source: 'Ministère de l\'Intérieur 2023' },
        'degat-eaux': { stat: '1 logement sur 4 touché par un DDE chaque année en France', source: 'FFA 2023' },
        'incendie':   { stat: '70 000 incendies domestiques déclarés chaque année en France', source: 'DGSCGC 2023' }
      },
      testimonial: {
        situation: 'Appartement · Paris 15e · mars 2023',
        text: 'Une fuite sur une canalisation de cuisine, non détectée pendant 3 semaines. Parquet gonflé dans 2 pièces et plafond du voisin du dessous effondré — 6 000 € de dégâts, recours entre copropriétaires.',
        source: 'Données sinistres AXA Île-de-France'
      }
    },
    coverage: {
      'vol':        { status: 'partial',     limit: '3 000 €',   franchise: '300 €',   cgRef: 'Art. 4.1',         note: 'Option souscrite — vol par effraction garanti (art. 4.1) — objets de valeur couverts jusqu\'à 1 500 € (coffre-fort requis au-delà) — vols par locataires ou colocataires exclus' },
      'degat-eaux': { status: 'covered',     limit: '50 000 €',  franchise: '150 €',   cgRef: 'Art. 3.5',         note: 'Garantie de base — fuites, ruptures, infiltrations (art. 3.5) — recherche de fuite incluse — exclusion : humidité et condensation' },
      'incendie':   { status: 'covered',     limit: '100 000 €', franchise: '380 €',   cgRef: 'Art. 3.1',         note: 'Garantie de base — incendie, explosion, implosion, enfumage et foudre couverts (art. 3.1) — exclusion : champignons et moisissures' },
      'inondation': { status: 'covered',     limit: '50 000 €',  franchise: '380 €',   cgRef: 'Art. 3.6.3 + 3.4', note: 'Dommages intérieurs à l\'appartement couverts via Événements climatiques (art. 3.6.3) et CatNat (art. 3.4) — toiture couverte par la copropriété' },
      'tempete':    { status: 'covered',     limit: '50 000 €',  franchise: '380 €',   cgRef: 'Art. 3.6.1',       note: 'Dommages directs à votre appartement couverts (art. 3.6.1) — toiture et parties communes couvertes par le syndicat de copropriété' },
      'rga':        { status: 'not-covered', limit: null,        franchise: null,      cgRef: '—',                note: 'Non applicable — immeuble en béton non soumis aux mouvements de terrain argileux' }
    }
  },
  'profil-c': {
    id: 'profil-c',
    firstName: 'Sophie',
    avatar: '👩',
    propertyType: 'Maison individuelle',
    occupancyStatus: 'Propriétaire',
    location: 'Lyon 3e (69)',
    zone: 'Zone risque faible — Sol argileux (RGA)',
    scenario: 'subscription',
    scenarioLabel: 'Souscription',
    scenarioColor: 'info',
    exposureScore: 42,
    preparationScore: 61,
    mainRisks: ['incendie','degat-eaux','rga'],
    condition: 'maison',
    hasGarden: true,
    completedActions: ['incendie-detecteur-fumee','dde-goutieres'],
    tagline: 'Profil avancé · Risque RGA spécifique',
    riskExposure: {
      'rga':        { zoneLevel:'eleve',      canImprove:true  },
      'incendie':   { zoneLevel:'modere',     canImprove:true  },
      'degat-eaux': { zoneLevel:'modere',     canImprove:true  },
      'vol':        { zoneLevel:'faible',     canImprove:true  },
      'tempete':    { zoneLevel:'faible',     canImprove:false },
      'inondation': { zoneLevel:'tres_faible',canImprove:false }
    },
    contract: { name: 'MRH AXA Confort Plus', ref: 'MRH-2023-55214' },
    localContext: {
      georisquesZone: 'Zone argileuse (aléa fort à très fort) — secteur Lyon 3e',
      pcs: false,
      recentEvent: { year: '2022', label: 'Sécheresse Rhône-Alpes', detail: 'Vague de chaleur record · sol argileux desséché · +186 % de dossiers RGA ouverts en Auvergne-Rhône-Alpes' },
      sinistresStats: {
        'rga':        { stat: '+186 % de dossiers RGA en Auvergne-Rhône-Alpes après la sécheresse 2022', source: 'CCR 2023' },
        'incendie':   { stat: '70 000 incendies domestiques déclarés chaque année en France', source: 'DGSCGC 2023' },
        'degat-eaux': { stat: '1 logement sur 4 touché par un DDE chaque année en France', source: 'FFA 2023' }
      },
      testimonial: {
        situation: 'Maison individuelle · Lyon 3e · automne 2022',
        text: 'Après la sécheresse de l\'été, les fondations ont bougé. Fissures dans 3 murs porteurs, portes et fenêtres coincées — 23 000 € de travaux de reprise en sous-œuvre, instruction CatNat de 14 mois.',
        source: 'Données sinistres AXA Auvergne-Rhône-Alpes'
      }
    },
    coverage: {
      'incendie':   { status: 'covered', limit: '200 000 €', franchise: '380 €',   cgRef: 'Art. 3.1',         note: 'Garantie de base — incendie, explosion, implosion, enfumage et foudre (art. 3.1) — préconisation : ramoner cheminées 1x/an, entretenir chaudière annuellement' },
      'degat-eaux': { status: 'covered', limit: '100 000 €', franchise: '150 €',   cgRef: 'Art. 3.5',         note: 'Garantie de base — fuites, ruptures, infiltrations, recherche de fuite incluse (art. 3.5) — exclusion : humidité, condensation, moisissures' },
      'rga':        { status: 'partial', limit: null,        franchise: '1 520 €', cgRef: 'Art. 3.4',         note: 'Couvert uniquement via Catastrophes Naturelles (art. 3.4) — franchise spécifique 1 520 € — nécessite un arrêté interministériel — 55 % des communes lyonnaises sans PPR approuvé : franchise peut être modulée' },
      'vol':        { status: 'covered', limit: '8 000 €',   franchise: '300 €',   cgRef: 'Art. 4.1',         note: 'Option souscrite — vol par effraction, vandalisme inclus (art. 4.1) — conditions de protection (serrure + volets) obligatoires — réduction de 50 % si moyens non activés' },
      'tempete':    { status: 'covered', limit: '150 000 €', franchise: '380 €',   cgRef: 'Art. 3.6.1',       note: 'Action directe du vent, grêle et neige couverts (art. 3.6.1) — frais de déblaiement d\'arbres inclus — condition : vent > 90 km/h ou dommages sur communes avoisinantes' },
      'inondation': { status: 'covered', limit: '150 000 €', franchise: '380 €',   cgRef: 'Art. 3.6.3 + 3.4', note: 'Eaux de ruissellement et débordements couverts (art. 3.6.3) et régime CatNat si arrêté (art. 3.4) — exclusion : coulées de boues et glissements de terrain' }
    }
  },
  'profil-d': {
    id: 'profil-d',
    firstName: 'Lucas',
    avatar: '🧑',
    propertyType: 'Appartement en copropriété',
    occupancyStatus: 'Propriétaire',
    location: 'Bordeaux Centre (33)',
    zone: 'Copropriété — Risque DDE élevé · Zone urbaine',
    scenario: 'subscription',
    scenarioLabel: 'Souscription',
    scenarioColor: 'info',
    exposureScore: 58,
    preparationScore: 35,
    mainRisks: ['degat-eaux','vol','incendie'],
    condition: 'all',
    hasGarden: false,
    completedActions: [],
    tagline: 'Nouvel achat · Copropriété · Score faible',
    riskExposure: {
      'degat-eaux': { zoneLevel:'eleve',      canImprove:true  },
      'vol':        { zoneLevel:'modere',     canImprove:true  },
      'incendie':   { zoneLevel:'modere',     canImprove:true  },
      'tempete':    { zoneLevel:'modere',     canImprove:false },
      'inondation': { zoneLevel:'faible',     canImprove:false },
      'rga':        { zoneLevel:'tres_faible',canImprove:false }
    },
    contract: { name: 'MRH AXA Confort', ref: 'MRH-2025-33871' },
    localContext: {
      georisquesZone: 'Zone urbaine — copropriété ancienne · faible risque naturel',
      pcs: false,
      recentEvent: { year: '2023', label: 'Tempête Domingos · Bordeaux', detail: '8 000 interventions pompiers Gironde · nombreux dégâts sur toitures en copropriété ancienne' },
      sinistresStats: {
        'degat-eaux': { stat: '1 appartement sur 5 en copropriété ancienne subit un DDE chaque année à Bordeaux', source: 'FFA 2023' },
        'vol':        { stat: '1 cambriolage toutes les 90 min en Nouvelle-Aquitaine', source: 'Ministère de l\'Intérieur 2023' },
        'incendie':   { stat: '70 000 incendies domestiques déclarés chaque année en France', source: 'DGSCGC 2023' }
      },
      testimonial: {
        situation: 'Appartement en copropriété · Bordeaux Centre · janvier 2023',
        text: 'Rupture de canalisation dans l\'appartement du dessus : dégâts d\'eau sur 2 étages. Trois appartements touchés, procédure amiable entre copropriétaires pendant 6 mois — 12 000 € de dégâts côté sinistré.',
        source: 'Données sinistres AXA Nouvelle-Aquitaine'
      }
    },
    coverage: {
      'degat-eaux': { status: 'covered', limit: '80 000 €',  franchise: '150 €',  cgRef: 'Art. 3.5',         note: 'Garantie de base — fuites et ruptures de canalisations intérieures privatives (art. 3.5) — recherche de fuite incluse — copropriété couverte par son propre contrat' },
      'vol':        { status: 'covered', limit: '5 000 €',   franchise: '300 €',  cgRef: 'Art. 4.1',         note: 'Option souscrite — vol par effraction dans les parties privatives (art. 4.1) — vols dans parties communes exclus — conditions de protection (serrure + volets) obligatoires' },
      'incendie':   { status: 'covered', limit: '150 000 €', franchise: '380 €',  cgRef: 'Art. 3.1',         note: 'Garantie de base — incendie, explosion, implosion et foudre dans votre appartement (art. 3.1) — parties communes couvertes par le syndicat de copropriété' },
      'tempete':    { status: 'covered', limit: '80 000 €',  franchise: '380 €',  cgRef: 'Art. 3.6.1',       note: 'Dommages directs à votre appartement couverts (art. 3.6.1) — toiture et parties communes sous contrat de la copropriété — frais de déblaiement arbres inclus' },
      'inondation': { status: 'covered', limit: '80 000 €',  franchise: '380 €',  cgRef: 'Art. 3.6.3 + 3.4', note: 'Dommages intérieurs couverts via Événements climatiques (art. 3.6.3) et CatNat si arrêté (art. 3.4) — franchise légale 380 €' },
      'rga':        { status: 'not-covered', limit: null,    franchise: null,     cgRef: '—',                note: 'Non applicable — immeuble en béton armé non soumis aux mouvements de terrain différentiels' }
    }
  },
  'profil-e': {
    id: 'profil-e',
    firstName: 'Camille',
    avatar: '👩',
    propertyType: 'Maison individuelle',
    occupancyStatus: 'Propriétaire',
    location: 'Marseille 9e (13)',
    zone: 'Zone incendie PACA — Mistral — Sol argileux',
    scenario: 'seasonal',
    scenarioLabel: 'Saisonnalité',
    scenarioColor: 'warn',
    exposureScore: 72,
    preparationScore: 48,
    mainRisks: ['incendie','rga','tempete'],
    condition: 'maison',
    hasGarden: true,
    completedActions: ['incendie-detecteur-fumee'],
    tagline: 'Été · Risques feux et sécheresse',
    riskExposure: {
      'incendie':   { zoneLevel:'tres_eleve', canImprove:true  },
      'rga':        { zoneLevel:'eleve',      canImprove:true  },
      'tempete':    { zoneLevel:'eleve',      canImprove:true  },
      'degat-eaux': { zoneLevel:'modere',     canImprove:true  },
      'vol':        { zoneLevel:'faible',     canImprove:false },
      'inondation': { zoneLevel:'faible',     canImprove:false }
    },
    contract: { name: 'MRH AXA Confort Plus', ref: 'MRH-2024-90123' },
    localContext: {
      georisquesZone: 'Zone incendie PACA — feux de forêt · sol argileux (aléa fort)',
      pcs: true,
      recentEvent: { year: '2023', label: 'Incendies Marseille août 2023', detail: '1 200 ha brûlés dans les Bouches-du-Rhône · quartiers du 9e et 11e évacués · Mistral 80–100 km/h' },
      sinistresStats: {
        'incendie':   { stat: '5 000 ha brûlés en moyenne chaque année en PACA — 40 % des feux de forêt nationaux', source: 'SDIS 13 · 2023' },
        'rga':        { stat: '+230 % de dossiers RGA en PACA après les sécheresses 2022–2023', source: 'CCR 2023' },
        'tempete':    { stat: 'Le Mistral dépasse 100 km/h plus de 30 jours/an à Marseille', source: 'Météo-France 2023' }
      },
      testimonial: {
        situation: 'Maison individuelle · Marseille 9e · août 2023',
        text: 'Le feu s\'est approché à moins de 300 m. Garage détruit par propagation via la végétation du talus. Façade et fenêtres endommagées par la chaleur — 31 000 € de dégâts, relogement 6 semaines.',
        source: 'Données sinistres AXA PACA'
      }
    },
    coverage: {
      'incendie':   { status: 'covered', limit: '200 000 €', franchise: '380 €',   cgRef: 'Art. 3.1',         note: 'Garantie de base — incendie, explosion, implosion, enfumage et foudre (art. 3.1) — inclut les feux de végétation atteignant l\'habitation — débroussaillage recommandé' },
      'rga':        { status: 'partial', limit: null,        franchise: '1 520 €', cgRef: 'Art. 3.4',         note: 'Couvert uniquement via Catastrophes Naturelles (art. 3.4) — franchise spécifique 1 520 € — commune sans PPR : franchise modulée si récidive — nécessite arrêté interministériel' },
      'tempete':    { status: 'covered', limit: '150 000 €', franchise: '380 €',   cgRef: 'Art. 3.6.1',       note: 'Vents violents (mistral), grêle et neige couverts (art. 3.6.1) — frais déblaiement arbres inclus — condition : vent > 90 km/h ou dommages sur communes avoisinantes' },
      'vol':        { status: 'covered', limit: '8 000 €',   franchise: '300 €',   cgRef: 'Art. 4.1',         note: 'Option souscrite — vol par effraction, vandalisme inclus (art. 4.1) — conditions de protection obligatoires — réduction de 50 % si alarme non activée ou volets non fermés' },
      'degat-eaux': { status: 'covered', limit: '100 000 €', franchise: '150 €',   cgRef: 'Art. 3.5',         note: 'Garantie de base — fuites, ruptures, infiltrations, recherche de fuite incluse (art. 3.5) — exclusion : humidité, condensation, moisissures' },
      'inondation': { status: 'covered', limit: '150 000 €', franchise: '380 €',   cgRef: 'Art. 3.6.3 + 3.4', note: 'Eaux de ruissellement, débordements et nappes phréatiques couverts (art. 3.6.3) et CatNat si arrêté (art. 3.4) — exclusion : coulées de boue et glissements de terrain' }
    }
  }
};

/* ── NIVEAUX DE RISQUE V3 ── */
const RISK_LEVELS = [
  { id:'tres_eleve',  step:5, label:'Très élevé',  color:'danger',   hex:'#EF4444', bg:'#FEE2E2' },
  { id:'eleve',       step:4, label:'Élevé',        color:'warn',     hex:'#F59E0B', bg:'#FEF3C7' },
  { id:'modere',      step:3, label:'Modéré',       color:'info',     hex:'#3B82F6', bg:'#DBEAFE' },
  { id:'faible',      step:2, label:'Faible',        color:'success',  hex:'#10B981', bg:'#D1FAE5' },
  { id:'tres_faible', step:1, label:'Très faible',  color:'neutral',  hex:'#9CA3AF', bg:'#F3F4F6' }
];
const LEVEL_ORDER = ['tres_faible','faible','modere','eleve','tres_eleve'];

/* ── RISQUES ── */
const RISKS = {
  'inondation': {
    id: 'inondation', label: 'Inondation', icon: '🌊',
    level: 'high', levelLabel: 'Élevé',
    avoidablePercent: 60, season: 'automne-hiver',
    explanation: 'Votre zone est classée orange inondation. Les caves et RDC sont particulièrement exposés lors des crues.',
    damages: ['Cave inondée','Électroménager détruit','Parquet et murs dégradés','Produits chimiques pollués']
  },
  'tempete': {
    id: 'tempete', label: 'Tempête', icon: '🌪️',
    level: 'high', levelLabel: 'Élevé',
    avoidablePercent: 70, season: 'automne-hiver',
    explanation: 'La région nantaise est régulièrement touchée par des vents violents en automne-hiver.',
    damages: ['Toiture arrachée','Gouttières tordues','Fenêtres brisées','Arbres tombés sur la maison']
  },
  'degat-eaux': {
    id: 'degat-eaux', label: 'Dégât des eaux', icon: '💧',
    level: 'medium', levelLabel: 'Modéré',
    avoidablePercent: 75,
    explanation: 'Premier sinistre MRH en France. Souvent causé par une canalisation qui fuit silencieusement.',
    damages: ['Plancher gondolé','Plafond effondré','Moisissures','Court-circuit électrique']
  },
  'vol': {
    id: 'vol', label: 'Vol', icon: '🔐',
    level: 'medium', levelLabel: 'Modéré',
    avoidablePercent: 65,
    explanation: 'En zone urbaine dense, 65 % des cambriolages peuvent être évités avec des équipements adaptés.',
    damages: ['Bijoux et objets de valeur volés','Serrures fracturées','Sentiment d\'insécurité','Franchise non couverte']
  },
  'incendie': {
    id: 'incendie', label: 'Incendie', icon: '🔥',
    level: 'low', levelLabel: 'Faible',
    avoidablePercent: 80, season: 'été',
    explanation: '80 % des incendies domestiques sont évitables. Le détecteur de fumée est obligatoire.',
    damages: ['Destruction totale du bien','Intoxication au CO','Voisins affectés','Perte de documents']
  },
  'rga': {
    id: 'rga', label: 'Retrait Gonflement des Argiles', icon: '🏚️',
    level: 'medium', levelLabel: 'Modéré',
    avoidablePercent: 55, season: 'été',
    explanation: 'Le sol argileux se rétracte en période de sécheresse et gonfle lors des pluies, fragilisant progressivement les fondations.',
    damages: ['Fissures dans les murs porteurs','Déformation des ouvertures','Tassement différentiel','Fondations fragilisées']
  }
};

/* ── CATÉGORIES D'ACTIONS (config UI) ── */
const RISK_CATEGORY_CONFIG = {
  'inondation': { verb: "Prévenir l'inondation",    desc: 'Protégez portes et accès contre les crues',         emoji: '🌊', color: '#DBEAFE' },
  'degat-eaux': { verb: 'Surveiller les fuites',     desc: "Évitez les dégâts silencieux de l'eau",             emoji: '💧', color: '#CFFAFE' },
  'incendie':   { verb: 'Sécuriser contre le feu',   desc: 'Installez les bons équipements de sécurité',        emoji: '🔥', color: '#FEE2E2' },
  'vol':        { verb: 'Protéger du vol',            desc: 'Renforcez serrures et sécurité extérieure',         emoji: '🔐', color: '#F1F5F9' },
  'tempete':    { verb: 'Renforcer la toiture',       desc: 'Préparez toiture et gouttières avant les vents',    emoji: '🌪️', color: '#EDE9FE' },
  'rga':        { verb: 'Stabiliser les fondations',  desc: 'Protégez le sol argileux autour du bâti',           emoji: '🏚️', color: '#FEF3C7' },
};

/* ── QUESTIONS DIAGNOSTIQUES ── */
/* 3 options : yes (+max) / partial (+mid) / no (+0 ou +inverse) */
/* level 1 = Votre environnement (habitudes, entretien, sensibilisation)
   level 2 = Votre équipement (dispositifs installés, travaux réalisés) */
const ALL_QUESTIONS = [
  /* ── INONDATION — maison_rdc ── */
  { id:'inondation-batardeaux', riskId:'inondation', condition:'maison_rdc', level:1,
    text:'Disposez-vous de batardeaux pour protéger vos portes et accès ?',
    hint:'Plaques amovibles (plastique ou métal) que l\'on fixe devant les portes, fenêtres basses et soupiraux pour bloquer l\'eau en cas d\'inondation.',
    options:[{v:'yes',l:'Oui, prêts à poser',pts:10},{v:'partial',l:'Pour certaines ouvertures',pts:5},{v:'no',l:'Non',pts:0}] },
  { id:'inondation-electrique', riskId:'inondation', condition:'maison_rdc', level:1,
    text:'Votre tableau électrique et vos prises sont-ils situés à plus de 1,5 m du sol ?',
    hint:'En cas de crue, l\'eau peut atteindre 50 cm à 1 m. Un tableau électrique bas = risque de court-circuit et d\'électrocution.',
    options:[{v:'yes',l:'Oui',pts:10},{v:'partial',l:'En partie',pts:5},{v:'no',l:'Non / Je ne sais pas',pts:0}] },
  { id:'inondation-clapets', riskId:'inondation', condition:'maison_rdc', level:2,
    text:'Des clapets anti-retours sont-ils installés sur vos canalisations d\'eaux usées ?',
    hint:'Valves unidirectionnelles placées sur les canalisations pour empêcher les eaux d\'égout de refluer dans le logement lors d\'une crue.',
    options:[{v:'yes',l:'Oui, installés',pts:12},{v:'partial',l:'Je ne sais pas',pts:3},{v:'no',l:'Non, pas encore',pts:0}] },
  { id:'inondation-obturateurs', riskId:'inondation', condition:'maison_rdc', level:2,
    text:'Vos ouvertures basses (soupiraux, aérations de cave) sont-elles protégeables ?',
    hint:'Soupiraux, grilles de ventilation et aérations en sous-sol — points d\'entrée de l\'eau souvent oubliés lors des inondations.',
    options:[{v:'yes',l:'Oui, toutes protégeables',pts:8},{v:'partial',l:'Partiellement',pts:4},{v:'no',l:'Non',pts:0}] },

  /* ── TEMPÊTE — maison ── */
  { id:'tempete-toiture', riskId:'tempete', condition:'maison', level:1,
    text:'Votre toiture a-t-elle été contrôlée par un professionnel ces 3 dernières années ?',
    options:[{v:'yes',l:'Oui, contrôlée récemment',pts:8},{v:'partial',l:'Il y a plus de 3 ans',pts:3},{v:'no',l:'Non / Je ne sais pas',pts:0}] },
  { id:'tempete-goutieres', riskId:'tempete', condition:'maison', level:1,
    text:'Vos gouttières et chéneaux ont-ils été nettoyés dans les 12 derniers mois ?',
    hint:'Des gouttières obstruées causent des refoulements sous la toiture et des infiltrations — principal dégât tempête évitable.',
    options:[{v:'yes',l:'Oui, nettoyés',pts:8},{v:'partial',l:'Il y a plus d\'un an',pts:4},{v:'no',l:'Non',pts:0}] },
  { id:'tempete-jardin', riskId:'tempete', condition:'maison', level:1,
    text:'Avez-vous identifié les éléments extérieurs à sécuriser en cas d\'alerte tempête ?',
    hint:'Mobilier de jardin, barbecue, pots de fleurs, abris de jardin — projectiles potentiels par vents forts. Un plan simple suffit.',
    options:[{v:'yes',l:'Oui, j\'ai un plan',pts:5},{v:'partial',l:'En partie',pts:2},{v:'no',l:'Non',pts:0}] },
  { id:'tempete-volets', riskId:'tempete', condition:'maison', level:2,
    text:'Vos volets et fermetures résistent-ils à des vents de plus de 90 km/h ?',
    hint:'Volets roulants PVC ou alu, persiennes renforcées — la norme de résistance aux vents est souvent précisée dans les CGV de pose.',
    options:[{v:'yes',l:'Oui, renforcés',pts:8},{v:'partial',l:'Je ne sais pas',pts:3},{v:'no',l:'Non ou volets légers',pts:0}] },

  /* ── DÉGÂT DES EAUX — all ── */
  { id:'dde-robinet-arret', riskId:'degat-eaux', condition:'all', level:1,
    text:'Connaissez-vous l\'emplacement du robinet d\'arrêt général de l\'eau dans votre logement ?',
    hint:'Ce robinet permet de couper l\'eau en quelques secondes. Souvent sous l\'évier de cuisine ou dans la cave / gaine technique.',
    options:[{v:'yes',l:'Oui, je le connais',pts:5},{v:'partial',l:'Je l\'ai cherché mais je ne sais pas',pts:1},{v:'no',l:'Non, je ne sais pas où il est',pts:0}] },
  { id:'dde-joints', riskId:'degat-eaux', condition:'all', level:1,
    text:'Les joints de salle de bain, cuisine et WC ont-ils été refaits ces 5 dernières années ?',
    hint:'Joints décollés ou noircis = infiltration silencieuse. 1ère cause de dégât des eaux détectable visuellement.',
    options:[{v:'yes',l:'Oui, refaits',pts:6},{v:'partial',l:'Certains seulement',pts:3},{v:'no',l:'Non ou plus de 5 ans',pts:0}] },
  { id:'dde-detection-fuite', riskId:'degat-eaux', condition:'all', level:2,
    text:'Avez-vous un détecteur de fuite d\'eau (sonde ou capteur) ?',
    hint:'Petit dispositif placé sous les éviers ou derrière les machines — alerte dès les premières gouttes, avant que les dégâts s\'aggravent.',
    options:[{v:'yes',l:'Oui',pts:8},{v:'partial',l:'Je ne sais pas',pts:2},{v:'no',l:'Non',pts:0}] },
  { id:'dde-canalisation-tableau', riskId:'degat-eaux', condition:'all', level:2,
    text:'Des canalisations passent-elles à proximité immédiate de votre tableau électrique ?',
    hint:'Une fuite à proximité du tableau peut provoquer un court-circuit, voire un départ d\'incendie — risque double à surveiller.',
    options:[{v:'yes',l:'Oui',pts:0},{v:'partial',l:'Je ne sais pas',pts:2},{v:'no',l:'Non',pts:6}] },

  /* ── INCENDIE — all ── */
  { id:'incendie-detecteur-fumee', riskId:'incendie', condition:'all', level:1,
    text:'Avez-vous un détecteur de fumée fonctionnel à chaque niveau du logement ?',
    options:[{v:'yes',l:'Oui, à chaque étage',pts:8},{v:'partial',l:'Dans certaines pièces seulement',pts:4},{v:'no',l:'Non',pts:0}] },
  { id:'incendie-evacuation', riskId:'incendie', condition:'all', level:1,
    text:'Avez-vous un plan d\'évacuation connu de tous les membres de votre foyer ?',
    hint:'Itinéraire de sortie, point de rassemblement, numéros d\'urgence affichés — quelques minutes de préparation peuvent tout changer.',
    options:[{v:'yes',l:'Oui, on l\'a défini ensemble',pts:5},{v:'partial',l:'Partiellement',pts:2},{v:'no',l:'Non',pts:0}] },
  { id:'incendie-chaudiere', riskId:'incendie', condition:'all', level:1,
    text:'Votre chaudière bénéficie-t-elle d\'une révision annuelle par un professionnel ?',
    hint:'Obligatoire pour les chaudières gaz et fioul. Si votre logement est tout-électrique ou sans chaudière, choisissez la dernière option.',
    options:[{v:'yes',l:'Oui — contrat d\'entretien',pts:6},{v:'partial',l:'Pas chaque année',pts:2},{v:'no',l:'Non ou pas de chaudière',pts:3}] },
  { id:'incendie-extincteur', riskId:'incendie', condition:'all', level:2,
    text:'Avez-vous un extincteur et savez-vous l\'utiliser ?',
    options:[{v:'yes',l:'Oui, et je sais l\'utiliser',pts:6},{v:'partial',l:'Oui, mais sans formation',pts:3},{v:'no',l:'Non',pts:0}] },
  { id:'incendie-electricite', riskId:'incendie', condition:'all', level:2,
    text:'Votre installation électrique a-t-elle été refaite il y a moins de 15 ans ?',
    hint:'Une installation vieillissante (câbles, disjoncteurs usés) est la 2ème cause d\'incendie domestique en France.',
    options:[{v:'yes',l:'Oui',pts:8},{v:'partial',l:'Je ne sais pas',pts:3},{v:'no',l:'Non',pts:0}] },
  { id:'incendie-ramonage', riskId:'incendie', condition:'maison', level:2,
    text:'Faites-vous ramoner vos conduits de cheminée ou d\'insert chaque année ?',
    options:[{v:'yes',l:'Oui, chaque année',pts:6},{v:'partial',l:'Pas tous les ans',pts:2},{v:'no',l:'Non ou pas de cheminée',pts:4}] },

  /* ── VOL — all ── */
  { id:'vol-inventaire', riskId:'vol', condition:'all', level:1,
    text:'Avez-vous listé et photographié vos objets de valeur (mobilier, bijoux, électronique) ?',
    hint:'Un inventaire photo facilite grandement les démarches de déclaration de sinistre — et peut éviter des refus d\'indemnisation.',
    options:[{v:'yes',l:'Oui, inventaire à jour',pts:5},{v:'partial',l:'Partiellement',pts:2},{v:'no',l:'Non',pts:0}] },
  { id:'vol-serrure-3pts', riskId:'vol', condition:'all', level:2,
    text:'Votre porte d\'entrée est-elle équipée d\'une serrure 3 points (ou certifiée A2P) ?',
    hint:'Une serrure 3 points résiste 3× plus longtemps à l\'effraction. Obligatoire pour activer certaines garanties vol.',
    options:[{v:'yes',l:'Oui',pts:8},{v:'partial',l:'Je ne sais pas',pts:2},{v:'no',l:'Non, serrure simple',pts:0}] },
  { id:'vol-telesurveillance', riskId:'vol', condition:'all', level:2,
    text:'Disposez-vous d\'un système de surveillance ou d\'alarme pour votre logement ?',
    options:[{v:'yes',l:'Alarme + télésurveillance',pts:10},{v:'partial',l:'Caméra ou alarme seule',pts:5},{v:'no',l:'Aucun système',pts:0}] },
  { id:'vol-simulateur', riskId:'vol', condition:'all', level:2,
    text:'Utilisez-vous des minuteries ou simulateurs de présence lors de vos absences ?',
    hint:'Ampoules connectées ou prises à minuterie simulant une occupation — dissuadent efficacement les cambriolages d\'opportunité.',
    options:[{v:'yes',l:'Oui',pts:6},{v:'partial',l:'Parfois',pts:3},{v:'no',l:'Non',pts:0}] },
  { id:'vol-volets', riskId:'vol', condition:'maison_rdc', level:1,
    text:'Fermez-vous systématiquement vos volets la nuit et lors de vos absences ?',
    options:[{v:'yes',l:'Oui, systématiquement',pts:6},{v:'partial',l:'Parfois seulement',pts:3},{v:'no',l:'Non ou pas de volets',pts:0}] },

  /* ── RGA — maison ── */
  { id:'rga-vegetation', riskId:'rga', condition:'maison', level:1,
    text:'Y a-t-il des arbres ou grands arbustes à moins de 5 m de vos façades ?',
    hint:'Les arbres et haies absorbent l\'eau du sol — ils accentuent le retrait des argiles en été et les pressions sur les fondations en hiver.',
    options:[{v:'yes',l:'Oui, plusieurs',pts:0},{v:'partial',l:'Un ou deux',pts:3},{v:'no',l:'Non',pts:8}] },
  { id:'rga-trottoir', riskId:'rga', condition:'maison', level:2,
    text:'Y a-t-il un trottoir ou une dalle périphérique autour de votre maison ?',
    hint:'Dalle béton ou pavés longeant les façades — éloigne l\'eau de pluie des fondations et réduit les variations d\'humidité du sol argileux.',
    options:[{v:'yes',l:'Oui, complet',pts:8},{v:'partial',l:'Partiellement',pts:4},{v:'no',l:'Non',pts:0}] }
];

/* ── MAPPING QUESTION → ACTION ── */
/* Si l'utilisateur répond avec la valeur "triggerOnAnswer", l'action est considérée comme déjà réalisée */
const QUESTION_ACTION_MAP = {
  'inondation-clapets':       { actionId: 'inondation-clapets',           triggerOnAnswer: 'yes' },
  'inondation-batardeaux':    { actionId: 'inondation-batardeaux',        triggerOnAnswer: 'yes' },
  'tempete-goutieres':        { actionId: 'dde-goutieres',                triggerOnAnswer: 'yes' },
  'dde-joints':               { actionId: 'dde-joints',                   triggerOnAnswer: 'yes' },
  'incendie-detecteur-fumee': { actionId: 'incendie-detecteur-fumee',     triggerOnAnswer: 'yes' },
  'incendie-chaudiere':       { actionId: 'incendie-chaudiere',           triggerOnAnswer: 'yes' },
  'vol-serrure-3pts':         { actionId: 'vol-serrure-3pts',             triggerOnAnswer: 'yes' },
  'inondation-obturateurs':   { actionId: 'inondation-calfeutrer',        triggerOnAnswer: 'yes' },
  'inondation-electrique':    { actionId: 'inondation-circuit-electrique',triggerOnAnswer: 'yes' },
  'incendie-ramonage':        { actionId: 'incendie-ramonage',            triggerOnAnswer: 'yes' },
  'rga-trottoir':             { actionId: 'rga-trottoir',                 triggerOnAnswer: 'yes' },
  'rga-vegetation':           { actionId: 'rga-vegetation',               triggerOnAnswer: 'no'  }
};

/* ── ACTIONS ── */
const ALL_ACTIONS = [
  /* INONDATION */
  { id:'inondation-batardeaux', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'now', momentDeVie:'seasonal', condition:'maison_rdc',
    title:'Poser les batardeaux sur les portes', effort:'medium', duration:'30 min',
    benefit:'Réduit de 80 % les infiltrations d\'eau et de boue lors d\'une crue.',
    pts:60, conseilText:'Installez des batardeaux sur les portes pour limiter les entrées d\'eau et de boue dans l\'habitation.',
    steps:['Sortir les batardeaux et vérifier l\'état des joints','Poser le batardeau sur la porte d\'entrée en commençant par l\'extérieur','Ajuster la hauteur pour assurer l\'étanchéité','Répéter pour chaque porte exposée aux entrées d\'eau'],
    tags:['Gratuit (déjà équipé)','30 min'] },
  { id:'inondation-calfeutrer', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'now', momentDeVie:'seasonal', condition:'maison_rdc',
    title:'Calfeutrer toutes les ouvertures basses', effort:'low', duration:'20 min',
    benefit:'Empêche l\'eau de pénétrer par les soupiraux, aérations et petites ouvertures.',
    pts:40, conseilText:'Calfeutrez les ouvertures (fenêtres, portes, soupiraux, aérations…) à l\'aide de barrières, sacs de sable ou tout moyen de les rendre étanches.',
    steps:['Identifier toutes les ouvertures basses (soupiraux, aérations, vide-sanitaires)','Préparer des sacs de sable ou des boudins anti-inondation','Bloquer chaque ouverture en commençant par les plus exposées','Vérifier l\'étanchéité en cherchant les courants d\'air'],
    tags:['Gratuit','20 min'] },
  { id:'inondation-clapets', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison_rdc',
    requiresOwner: true,
    title:'Installer des clapets anti-retour', effort:'high', duration:'Sur RDV',
    benefit:'Évite le reflux des eaux usées en cas d\'inondation — protège les caves et sous-sols.',
    pts:150, conseilText:'Installez des clapets anti-retour sur le réseau d\'eaux usées pour éviter le reflux des eaux en cas d\'inondation.',
    proof: { type: 'certificate', label: 'Attestation d\'installation (plombier)' },
    steps:['Repérer l\'emplacement du réseau d\'eaux usées en sous-sol','Contacter un plombier certifié pour l\'installation','Faire vérifier le bon fonctionnement du clapet','Tester le mécanisme une fois par an'],
    tags:['400–800 €','Plombier requis'] },
  /* TEMPÊTE */
  { id:'dde-goutieres', riskId:'degat-eaux', riskLabel:'Dégât des eaux', riskColor:'info',
    horizon:'now', momentDeVie:'both', condition:'maison',
    title:'Nettoyer les gouttières et chéneaux', effort:'low', duration:'30 min',
    benefit:'Évite les débordements et infiltrations en toiture lors des fortes pluies.',
    pts:30, conseilText:'Maintenez en bon état vos toitures, chéneaux et gouttières.',
    steps:['Munir d\'une échelle sécurisée et de gants de travail','Retirer les feuilles et débris à la main ou avec un crochet','Rincer avec un tuyau d\'arrosage de haut en bas','Vérifier l\'état des fixations et remplacer si besoin'],
    tags:['Gratuit','30 min'] },
  /* DÉGÂT DES EAUX */
  { id:'dde-joints', riskId:'degat-eaux', riskLabel:'Dégât des eaux', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Réviser les joints d\'étanchéité', effort:'low', duration:'20 min',
    benefit:'Un joint détérioré = fuite silencieuse pendant des semaines. Coût de réparation x10.',
    pts:25, conseilText:'Entretenez régulièrement les joints d\'étanchéité des installations sanitaires.',
    steps:['Inspecter les joints autour de la baignoire, douche, lavabo et WC','Vérifier l\'absence de moisissures noires (signe de joint poreux)','Retirer l\'ancien joint avec un cutter et du dissolvant','Appliquer le nouveau joint avec un pistolet silicone — laisser sécher 24h'],
    tags:['~10 €','20 min'] },
  { id:'dde-detection-fuite', riskId:'degat-eaux', riskLabel:'Dégât des eaux', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Installer un détecteur de fuite d\'eau', effort:'low', duration:'15 min',
    benefit:'Alerte dès les premières gouttes — limite les dégâts avant qu\'une fuite silencieuse cause des milliers d\'euros de travaux.',
    pts:60, conseilText:'Placez un détecteur de fuite sous les éviers et derrière les appareils électroménagers.',
    proof: { type: 'photo', label: 'Photo du détecteur installé (sous évier ou machine à laver)' },
    steps:['Choisir un détecteur avec alarme sonore et/ou alerte smartphone','Placer sous l\'évier de cuisine, sous le lavabo, derrière le lave-linge et le lave-vaisselle','Tester le capteur en posant quelques gouttes d\'eau sur la sonde','Remplacer la pile selon les recommandations du fabricant (1–2 ans)'],
    tags:['~30–80 €','15 min'] },
  { id:'dde-couper-eau-vacances', riskId:'degat-eaux', riskLabel:'Dégât des eaux', riskColor:'info',
    horizon:'now', momentDeVie:'seasonal', condition:'all',
    title:'Couper l\'arrivée d\'eau avant de partir', effort:'low', duration:'5 min',
    benefit:'La cause n° 1 de sinistre en vacances. 5 secondes qui évitent des semaines de travaux.',
    pts:25, conseilText:'Coupez l\'arrivée d\'eau en cas d\'absence prolongée.',
    steps:['Localiser le robinet d\'arrêt général (souvent sous l\'évier ou en cave)','Tourner le robinet en position fermée','Purger les robinets pour vider les tuyaux','Noter l\'emplacement dans votre carnet de logement'],
    tags:['Gratuit','5 min'] },
  /* INCENDIE */
  { id:'incendie-detecteur-fumee', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Installer un détecteur de fumée', effort:'low', duration:'15 min',
    benefit:'Obligatoire par la loi. Divise par 3 le risque de décès en cas d\'incendie nocturne.',
    pts:60, conseilText:'Installez un détecteur de fumée chez vous, et ce, à chaque étage.',
    proof: { type: 'photo', label: 'Photo du détecteur installé (norme NF EN 14604)' },
    steps:['Choisir un détecteur NF EN 14604 (norme européenne)','Fixer au plafond, au centre de la pièce, à 30 cm des murs','Tester le détecteur après installation (bouton test)','Remplacer la pile chaque année et le détecteur tous les 10 ans'],
    tags:['~20 €','15 min'] },
  { id:'incendie-chaudiere', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Réviser la chaudière annuellement', effort:'low', duration:'Sur RDV',
    benefit:'Obligatoire. Prévient les pannes, les fuites de gaz et les intoxications au CO.',
    pts:40, conseilText:'Faites réviser votre chaudière une fois par an par un plombier-chauffagiste agréé — c\'est obligatoire.',
    proof: { type: 'certificate', label: 'Rapport d\'entretien annuel (technicien agréé)' },
    steps:['Contacter votre installateur ou signer un contrat d\'entretien annuel','Préparer les accès à la chaudière (dégager l\'espace)','Demander un compte-rendu d\'intervention écrit','Conserver le rapport dans le carnet d\'entretien du logement'],
    tags:['100–150 €','Sur RDV'] },
  { id:'incendie-debrancher', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'now', momentDeVie:'seasonal', condition:'all',
    title:'Débrancher les appareils en veille', effort:'low', duration:'5 min',
    benefit:'Un chargeur laissé branché peut déclencher un incendie. Réflexe à adopter avant de partir.',
    pts:20, conseilText:'Veillez à débrancher vos chargeurs dès que les batteries sont pleines.',
    steps:['Faire le tour de chaque pièce avant de partir','Débrancher les chargeurs de téléphone, tablette, enceintes','Éteindre la box Internet et les multiprises','Vérifier que le four, les plaques et la cafetière sont éteints'],
    tags:['Gratuit','5 min'] },
  /* VOL */
  { id:'vol-inventaire', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Répertorier vos objets de valeur', effort:'medium', duration:'60 min',
    benefit:'Indispensable pour le remboursement assurance. Sans inventaire, les preuves manquent.',
    pts:30, conseilText:'Répertoriez vos objets de valeur, notez leurs numéros de série et photographiez-les.',
    steps:['Lister tous les objets de valeur (bijoux, électronique, art)','Photographier chaque objet sous plusieurs angles','Relever les numéros de série et conserver les factures','Stocker la liste dans le cloud ou chez un proche (pas au domicile)'],
    tags:['Gratuit','60 min'] },
  { id:'vol-serrure-3pts', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    requiresOwner: true,
    title:'Installer une serrure 3 points', effort:'medium', duration:'Sur RDV',
    benefit:'Multiplie par 4 la résistance à l\'effraction. Norme A2P recommandée par les assureurs.',
    pts:60, conseilText:'Disposez d\'une serrure 3 points sur votre porte d\'entrée.',
    proof: { type: 'invoice', label: 'Facture serrurier certifié A2P' },
    steps:['Faire appel à un serrurier certifié A2P (agrément assureur)','Choisir une serrure avec point de verrouillage haut, bas et central','Demander un devis comparatif (150–300 € main d\'œuvre incluse)','Conserver le certificat A2P pour votre dossier assurance'],
    tags:['150–300 €','Serrurier A2P'] },
  { id:'vol-securiser-vacances', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'now', momentDeVie:'seasonal', condition:'all',
    title:'Sécuriser avant les vacances', effort:'low', duration:'15 min',
    benefit:'65 % des cambriolages ont lieu en été. Quelques gestes simples font toute la différence.',
    pts:30, conseilText:'Si vous devez vous absenter, faites suivre votre courrier et demandez à un proche de surveiller.',
    steps:['S\'inscrire à "Opération Tranquillité Vacances" (police / gendarmerie)','Confier les clés à une personne de confiance','Mettre les objets de valeur en lieu sûr ou en coffre bancaire','Brancher des minuteries sur les lumières pour simuler une présence'],
    tags:['Gratuit','15 min'] },
  /* RGA */
  { id:'rga-trottoir', riskId:'rga', riskLabel:'RGA', riskColor:'warn',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison',
    requiresOwner: true,
    title:'Aménager un trottoir périphérique', effort:'high', duration:'Sur RDV',
    benefit:'Évacue les eaux de pluie loin des fondations et réduit les cycles humidité/sécheresse.',
    pts:60, conseilText:'Aménagez un trottoir périphérique autour de votre maison pour éloigner l\'eau des fondations.',
    proof: { type: 'invoice', label: 'Facture de travaux (maçon ou paysagiste)' },
    steps:['Faire réaliser un diagnostic de sol par un géotechnicien','Définir le tracé avec un paysagiste ou maçon','Poser une dalle béton ou gravier stabilisé en pente vers l\'extérieur','Contrôler l\'état chaque printemps et reboucher les fissures'],
    tags:['500–2000 €','Pro requis'] },
  { id:'rga-vegetation', riskId:'rga', riskLabel:'RGA', riskColor:'warn',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison',
    title:'Éloigner la végétation des façades', effort:'medium', duration:'60 min',
    benefit:'Les racines profondes accentuent les cycles de rétraction du sol argileux.',
    pts:40, conseilText:'Évitez de planter des végétaux près des façades.',
    steps:['Identifier les arbres et haies à moins de 5 m des murs','Couper les branches surplombant la toiture','Pour les grands arbres : faire appel à un élagueur certifié','Ne pas replanter à moins de 5 m des fondations'],
    tags:['Variable','60 min ou Pro'] },
  { id:'rga-goutieres', riskId:'rga', riskLabel:'RGA', riskColor:'warn',
    horizon:'now', momentDeVie:'seasonal', condition:'maison',
    title:'Désencombrer les gouttières (RGA)', effort:'low', duration:'30 min',
    benefit:'Évite l\'accumulation d\'eau en pied de façade qui aggrave les cycles argile sèche/humide.',
    pts:25, conseilText:'Désencombrez vos gouttières et raccordez-les au réseau d\'évacuation pour éloigner l\'eau des fondations.',
    steps:['Vérifier l\'état des gouttières et descentes pluviales','Retirer les feuilles et débris accumulés','Raccorder les descentes vers l\'égout pluvial ou l\'infiltration','Vérifier qu\'aucune eau ne stagne en pied de mur'],
    tags:['Gratuit','30 min'] },
  /* INONDATION — actions supplémentaires */
  { id:'inondation-circuit-electrique', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison_rdc',
    requiresOwner: true,
    title:'Réhausser le circuit électrique à 1,5 m', effort:'high', duration:'Sur RDV',
    benefit:'Protège le tableau et les prises d\'un court-circuit en cas de montée des eaux.',
    pts:100, conseilText:'Réhaussez le circuit électrique (tableau, prises de courant) et les systèmes de chauffage au-dessus de 1,5 m du sol.',
    proof: { type: 'certificate', label: 'Attestation Consuel (conformité électrique)' },
    steps:['Faire réaliser un diagnostic électrique par un électricien certifié','Établir un plan de rehaussement du tableau et des prises basses','Réaliser les travaux hors période de risque inondation','Obtenir l\'attestation de conformité Consuel après travaux'],
    tags:['800–2000 €','Électricien requis'] },
  { id:'inondation-zone-refuge', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison_rdc',
    title:'Aménager une zone refuge en hauteur', effort:'medium', duration:'60 min',
    benefit:'Permet de se mettre en sécurité si la montée des eaux est trop rapide pour évacuer.',
    pts:40, conseilText:'Aménagez une zone refuge en hauteur, munie d\'un accès vers l\'extérieur (fenêtre de toit, balcon).',
    steps:['Identifier la pièce en hauteur la plus accessible (étage, grenier)','Y stocker eau, médicaments, lampe et radio à piles','Vérifier qu\'une fenêtre ou trappe permet d\'alerter les secours','Informer tous les occupants de l\'emplacement et du protocole'],
    tags:['Gratuit','60 min'] },
  { id:'inondation-produits-sensibles', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'now', momentDeVie:'seasonal', condition:'maison_rdc',
    title:'Mettre à l\'abri les produits sensibles', effort:'low', duration:'15 min',
    benefit:'Évite la pollution des eaux de crue par les produits chimiques et la perte de médicaments.',
    pts:25, conseilText:'Mettez à l\'abri les produits sensibles (médicaments, produits chimiques…) afin d\'éviter un risque de pollution important.',
    steps:['Rassembler médicaments, produits d\'entretien et chimiques','Les placer dans des sacs hermétiques ou boîtes étanches','Les monter à l\'étage ou dans un meuble en hauteur','Faire de même pour les documents importants et le matériel informatique'],
    tags:['Gratuit','15 min'] },
  /* INCENDIE — actions supplémentaires */
  { id:'incendie-ramonage', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison',
    title:'Faire ramoner les conduits de cheminée', effort:'low', duration:'Sur RDV',
    benefit:'Obligatoire 1 à 2 fois/an. Prévient le feu de cheminée et l\'intoxication au monoxyde de carbone.',
    pts:40, conseilText:'Faites ramoner vos conduits de cheminée, d\'inserts ou de poêles au moins une fois par an.',
    proof: { type: 'certificate', label: 'Certificat de ramonage (ramoneur agréé)' },
    steps:['Contacter un ramoneur agréé (vérifier accréditation)','Prévoir la prestation avant l\'hiver (septembre–octobre)','Demander un certificat de ramonage pour votre assurance','Vérifier la ventilation de la pièce après le ramonage'],
    tags:['80–150 €','Ramoneur agréé'] },
  { id:'incendie-debroussaillage', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'now', momentDeVie:'seasonal', condition:'maison',
    title:'Débroussailler le jardin et le terrain', effort:'medium', duration:'120 min',
    benefit:'Réduit le combustible disponible et ralentit la propagation d\'un feu de végétation.',
    pts:30, conseilText:'Si vous avez un jardin ou un terrain, débroussaillez-le régulièrement.',
    steps:['Couper les herbes hautes et végétaux secs dans un rayon de 50 m','Élaguer les branches basses des arbres jusqu\'à 2 m de hauteur','Ramasser et évacuer les déchets végétaux (ne pas brûler en période sèche)','Laisser un espace libre entre les arbres pour ne pas créer de continuité'],
    tags:['Gratuit ou Pro','120 min'] },
  /* VOL — actions supplémentaires */
  { id:'vol-ranger-exterieur', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'now', momentDeVie:'seasonal', condition:'maison_rdc',
    title:'Ranger les équipements extérieurs', effort:'low', duration:'10 min',
    benefit:'Les échelles et outils laissés dehors facilitent l\'intrusion — 1 cambrioleur sur 3 utilise ce qui est à portée.',
    pts:25, conseilText:'En extérieur, ne laissez rien qui puisse faciliter une intrusion : échelles, marchepieds ou outils pourraient être utilisés à mauvais escient.',
    steps:['Rentrer les échelles, escabeaux et marchepieds dans un local fermé','Verrouiller l\'abri de jardin et le garage','Ranger les outils de jardinage (pioches, barres)','Fermer et verrouiller le portail et la clôture'],
    tags:['Gratuit','10 min'] }
];

/* ── BADGES V4 ── */
const BADGES = [
  /* — Progression — */
  {
    id: 'diagnostic-complete',
    label: 'Diagnostic complété',
    desc: 'Vous avez évalué vos risques et personnalisé votre Coach.',
    icon: '🔍', tier: 'bronze',
    condition: { type: 'diag_done' },
    unlocksRewardId: 'netatmo-detecteur'
  },
  {
    id: 'premiers-reflexes',
    label: 'Premiers réflexes',
    desc: 'Vous avez réalisé votre première action de prévention.',
    icon: '🛡️', tier: 'bronze',
    condition: { type: 'action_count', value: 1 },
    unlocksRewardId: 'leroy-merlin-15'
  },
  {
    id: 'trio-actions',
    label: '3 actions réalisées',
    desc: 'Votre logement est déjà mieux protégé qu\'avant.',
    icon: '⚡', tier: 'silver',
    condition: { type: 'action_count', value: 3 },
    unlocksRewardId: 'verisure-alarme'
  },
  {
    id: 'maison-preparee',
    label: 'Maison préparée',
    desc: 'Vous avez sécurisé votre logement sur plusieurs fronts.',
    icon: '🏠', tier: 'silver',
    condition: { type: 'action_count', value: 5 },
    unlocksRewardId: 'somfy-domotique'
  },
  /* — Par risque — */
  {
    id: 'risque-inondation-maitrise',
    label: 'Risque inondation maîtrisé',
    desc: 'Toutes les actions inondation de votre profil sont réalisées.',
    icon: '🌊', tier: 'gold',
    condition: { type: 'risk_complete', riskId: 'inondation' },
    unlocksRewardId: 'capeb-artisan'
  },
  {
    id: 'risque-incendie-maitrise',
    label: 'Risque incendie maîtrisé',
    desc: 'Votre logement est protégé contre les départs de feu.',
    icon: '🔥', tier: 'gold',
    condition: { type: 'risk_complete', riskId: 'incendie' },
    unlocksRewardId: 'capeb-artisan'
  },
  {
    id: 'risque-dde-maitrise',
    label: 'Risque DDE maîtrisé',
    desc: 'Les fuites silencieuses n\'ont plus de prise sur vous.',
    icon: '💧', tier: 'gold',
    condition: { type: 'risk_complete', riskId: 'degat-eaux' },
    unlocksRewardId: 'capeb-artisan'
  },
  {
    id: 'risque-vol-maitrise',
    label: 'Risque vol maîtrisé',
    desc: 'Vos accès sont sécurisés et votre logement dissuasif.',
    icon: '🔐', tier: 'gold',
    condition: { type: 'risk_complete', riskId: 'vol' },
    unlocksRewardId: 'capeb-artisan'
  },
  {
    id: 'risque-tempete-maitrise',
    label: 'Risque tempête maîtrisé',
    desc: 'Toiture, gouttières et ouvertures sont préparées.',
    icon: '🌪️', tier: 'gold',
    condition: { type: 'risk_complete', riskId: 'tempete' },
    unlocksRewardId: 'capeb-artisan'
  },
  {
    id: 'risque-rga-maitrise',
    label: 'Risque RGA maîtrisé',
    desc: 'Vos fondations sont protégées contre les argiles.',
    icon: '🏚️', tier: 'gold',
    condition: { type: 'risk_complete', riskId: 'rga' },
    unlocksRewardId: 'capeb-artisan'
  },
  /* — Spéciaux — */
  {
    id: 'defi-releve',
    label: 'Défi relevé',
    desc: 'Vous avez complété un défi du moment AXA.',
    icon: '🏆', tier: 'bronze',
    condition: { type: 'defi_done' },
    unlocksRewardId: null
  },
  {
    id: 'expert-prevention',
    label: 'Expert prévention',
    desc: 'Vous maîtrisez tous les risques de votre profil. Chapeau.',
    icon: '🎓', tier: 'gold',
    condition: { type: 'all_risks_complete' },
    unlocksRewardId: 'axa-expert-diagnostic'
  }
];

/* ── RÉCOMPENSES V4 — Marketplace partenaires ── */
const ALL_REWARDS = [
  {
    id: 'netatmo-detecteur',
    partner: 'Netatmo',
    partnerLogo: '💧',
    partnerColor: '#0EA5E9',
    icon: '💧', iconBg: '#CFFAFE',
    title: 'Détecteur de fuite connecté',
    offer: '−25 % tarif partenaire',
    code: 'AXA-NETATMO25',
    codeLink: '#',
    desc: 'Le détecteur Netatmo Smart Water Leak Sensor alerté dès les premières gouttes, compatible Apple Home & Google Home.',
    requiredBadgeId: 'diagnostic-complete',
    scenarios: ['subscription', 'seasonal'],
    conditions: ['all', 'maison', 'maison_rdc']
  },
  {
    id: 'leroy-merlin-15',
    partner: 'Leroy Merlin',
    partnerLogo: '🏗️',
    partnerColor: '#22C55E',
    icon: '🛒', iconBg: '#F0FAF5',
    title: 'Équipements prévention',
    offer: '−15 % en magasin et en ligne',
    code: 'AXA-LM15',
    codeLink: '#',
    desc: 'Valable sur toute la gamme prévention : détecteurs, serrures, batardeaux, matériaux d\'entretien.',
    requiredBadgeId: 'premiers-reflexes',
    scenarios: ['subscription', 'seasonal'],
    conditions: ['all', 'maison', 'maison_rdc']
  },
  {
    id: 'verisure-alarme',
    partner: 'Verisure',
    partnerLogo: '🔐',
    partnerColor: '#6366F1',
    icon: '🔐', iconBg: '#EDE9FE',
    title: 'Alarme télésurveillée',
    offer: '3 mois de surveillance offerts',
    code: 'AXA-VERISURE3M',
    codeLink: '#',
    desc: 'Offre réservée aux assurés AXA : installation offerte + 3 mois de télésurveillance 24h/24 sans engagement.',
    requiredBadgeId: 'trio-actions',
    scenarios: ['subscription', 'seasonal'],
    conditions: ['all', 'maison', 'maison_rdc']
  },
  {
    id: 'somfy-domotique',
    partner: 'Somfy',
    partnerLogo: '🏠',
    partnerColor: '#F59E0B',
    icon: '🏠', iconBg: '#FEF3C7',
    title: 'Volets & domotique connectée',
    offer: '−10 % tarif partenaire',
    code: 'AXA-SOMFY10',
    codeLink: '#',
    desc: 'Volets roulants connectés, détecteurs d\'ouverture et automatisations — sécurisez et pilotez votre maison à distance.',
    requiredBadgeId: 'maison-preparee',
    scenarios: ['subscription', 'seasonal'],
    conditions: ['maison', 'maison_rdc']
  },
  {
    id: 'capeb-artisan',
    partner: 'CAPEB',
    partnerLogo: '🔧',
    partnerColor: '#DC2626',
    icon: '🔧', iconBg: '#FEE2E2',
    title: 'Artisan certifié garanti 48h',
    offer: 'Devis prioritaire sous 48h',
    code: null,
    codeLink: '#',
    desc: 'Accès au réseau CAPEB d\'artisans certifiés (plombiers, couvreurs, serruriers, électriciens) avec devis garanti sous 48h et tarif négocié AXA.',
    requiredBadgeId: 'risque-inondation-maitrise',
    scenarios: ['subscription', 'seasonal'],
    conditions: ['all', 'maison', 'maison_rdc']
  },
  {
    id: 'axa-expert-diagnostic',
    partner: 'AXA Prévention',
    partnerLogo: '🎓',
    partnerColor: '#00008F',
    icon: '🎓', iconBg: '#E8E8F8',
    title: 'Diagnostic habitat à domicile',
    offer: 'Offert — valeur 120 €',
    code: null,
    codeLink: '#',
    desc: 'Un expert AXA Prévention se déplace pour un audit complet de votre logement et vous remet un rapport personnalisé avec plan d\'action chiffré.',
    requiredBadgeId: 'expert-prevention',
    scenarios: ['subscription', 'seasonal'],
    conditions: ['maison', 'maison_rdc']
  }
];

/* ── SERVICES PAR RISQUE ── */
const SERVICES_BY_RISK = {
  'inondation': [
    { type:'artisan',      label:'Plombier-chauffagiste certifié', tag:'Réseau eaux usées',          logo:'🔧', cta:'Demander un devis' },
    { type:'organisme',    label:'Prévenirisk',                    tag:'Diagnostic inondation',       logo:'🌊', cta:'Prendre RDV' },
    { type:'collectivite', label:'Eaux & Territoires',             tag:'Info PPRI gratuite',          logo:'💧', cta:'Consulter' },
    { type:'aide',         label:'Fonds Barnier',                  tag:'Jusqu\'à 40 % des travaux',   logo:'🏛️', cta:'Vérifier éligibilité' }
  ],
  'tempete': [
    { type:'artisan',      label:'Couvreur RGE certifié',          tag:'Toiture & charpente',         logo:'🏠', cta:'Demander un devis' },
    { type:'organisme',    label:'Météo-France Vigilance',         tag:'Alertes météo gratuites',     logo:'🌬️', cta:'Activer les alertes' },
    { type:'collectivite', label:'ANAH',                           tag:'Aide rénovation toiture',     logo:'🏛️', cta:'Vérifier éligibilité' },
    { type:'aide',         label:'MaPrimeRénov\'',                 tag:'Jusqu\'à 50 % des travaux',   logo:'💰', cta:'Déposer un dossier' }
  ],
  'incendie': [
    { type:'artisan',      label:'Ramoneur certifié QUALIFEU',     tag:'Conduits & chaudière',        logo:'🔥', cta:'Prendre RDV' },
    { type:'organisme',    label:'SDIS — Sécurité incendie',       tag:'Conseils prévention gratuits',logo:'🚒', cta:'Consulter' },
    { type:'collectivite', label:'ADEME',                          tag:'Audit énergie & sécurité',   logo:'🌿', cta:'En savoir plus' },
    { type:'aide',         label:'Aide débroussaillage DETR',      tag:'Obligatoire zone feux forêts',logo:'🏛️', cta:'Vérifier éligibilité' }
  ],
  'degat-eaux': [
    { type:'artisan',      label:'Plombier qualifié PGN',          tag:'Joints & installations',      logo:'🔧', cta:'Demander un devis' },
    { type:'organisme',    label:'Promotelec',                     tag:'Contrôle électrique',         logo:'⚡', cta:'Prendre RDV' },
    { type:'collectivite', label:'CAPEB — Artisans du bâtiment',   tag:'Annuaire artisans certifiés', logo:'🏗️', cta:'Trouver un artisan' },
    { type:'aide',         label:'Éco-PTZ travaux eau',            tag:'Taux 0 % disponible',         logo:'💶', cta:'Simuler' }
  ],
  'vol': [
    { type:'artisan',      label:'Serrurier A2P certifié',         tag:'Serrures & blindage porte',   logo:'🔐', cta:'Demander un devis' },
    { type:'organisme',    label:'CNPP — Référentiel A2P',         tag:'Matériels certifiés anti-eff.',logo:'🛡️', cta:'Consulter' },
    { type:'collectivite', label:'Voisins Vigilants',              tag:'Réseau de voisinage local',   logo:'👮', cta:'Rejoindre' },
    { type:'aide',         label:'Crédit d\'impôt sécurité',       tag:'Sous conditions de ressources',logo:'🏛️', cta:'Vérifier éligibilité' }
  ],
  'rga': [
    { type:'artisan',      label:'Expert géotechnique G5',         tag:'Diagnostic sol argileux',     logo:'🏗️', cta:'Demander un devis' },
    { type:'organisme',    label:'BRGM Géorisques',                tag:'Cartographie RGA gratuite',   logo:'🗺️', cta:'Consulter' },
    { type:'collectivite', label:'ANAH — Habitat dégradé',         tag:'Travaux de confortement',     logo:'🏛️', cta:'Vérifier éligibilité' },
    { type:'aide',         label:'Indemnisation Cat-Nat AXA',      tag:'Procédure simplifiée',        logo:'📋', cta:'En savoir plus' }
  ]
};

/* ── TUTORIELS PAR RISQUE ── */
const TUTORIALS_BY_RISK = {
  'inondation': [
    { type:'video',   title:'Poser un batardeau en 4 étapes',           duration:'4 min',  source:'AXA Prévention' },
    { type:'video',   title:'Préparer son logement avant une crue',      duration:'7 min',  source:'Vigicrues' },
    { type:'pdf',     title:'Guide DGPR — Prévention inondations',       duration:'12 min', source:'Ministère Écologie' },
    { type:'article', title:'Que faire en cas d\'alerte Vigicrues ?',    duration:'3 min',  source:'AXA Prévention' }
  ],
  'tempete': [
    { type:'video',   title:'Sécuriser sa toiture avant une tempête',    duration:'5 min',  source:'AXA Prévention' },
    { type:'video',   title:'Les bons gestes en vigilance orange',        duration:'6 min',  source:'Météo-France' },
    { type:'pdf',     title:'Guide ANAH — Entretien de toiture',          duration:'8 min',  source:'ANAH' },
    { type:'article', title:'Vents violents : protéger son jardin',       duration:'4 min',  source:'AXA Prévention' }
  ],
  'incendie': [
    { type:'video',   title:'Poser un détecteur de fumée correctement',   duration:'3 min',  source:'AXA Prévention' },
    { type:'video',   title:'Plan d\'évacuation familiale : le préparer', duration:'5 min',  source:'SDIS' },
    { type:'pdf',     title:'Guide DGSCGC — Sécurité incendie domicile',  duration:'10 min', source:'Ministère Intérieur' },
    { type:'article', title:'Débroussaillage : obligations PACA & Corse', duration:'4 min',  source:'AXA Prévention' }
  ],
  'degat-eaux': [
    { type:'video',   title:'Couper l\'eau en urgence : mode d\'emploi',  duration:'2 min',  source:'AXA Prévention' },
    { type:'video',   title:'Repérer une fuite avant qu\'elle s\'aggrave',duration:'4 min',  source:'Promotelec' },
    { type:'pdf',     title:'Guide entretien plomberie maison',            duration:'8 min',  source:'CAPEB' },
    { type:'article', title:'Dégât des eaux : les bons réflexes dès J+1', duration:'3 min',  source:'AXA Prévention' }
  ],
  'vol': [
    { type:'video',   title:'Choisir une serrure certifiée A2P',          duration:'4 min',  source:'AXA Prévention' },
    { type:'video',   title:'Sécuriser portes et fenêtres : les clés',    duration:'6 min',  source:'FFSA' },
    { type:'pdf',     title:'Référentiel A2P — Produits certifiés',       duration:'5 min',  source:'CNPP' },
    { type:'article', title:'Simuler une présence : astuces anti-cambriolage', duration:'3 min', source:'AXA Prévention' }
  ],
  'rga': [
    { type:'video',   title:'Comprendre le retrait-gonflement des argiles',duration:'5 min', source:'BRGM' },
    { type:'video',   title:'Gérer la végétation près des fondations',     duration:'4 min',  source:'AXA Prévention' },
    { type:'pdf',     title:'Guide BRGM — Prévention RGA',                duration:'15 min', source:'BRGM / Ministère' },
    { type:'article', title:'Sécheresse et fissures : quand agir ?',      duration:'3 min',  source:'AXA Prévention' }
  ]
};

/* ── DÉFIS DU MOMENT ── */
const DEFIS_DU_MOMENT = [
  {
    id: 'defi-202604-fuites',
    title: 'Fuyez les fuites',
    subtitle: '3 actions pour réduire votre risque dégât des eaux n°1 en MRH',
    riskId: 'degat-eaux',
    icon: '💧',
    pts: 120,
    lot: 'Lots à gagner',
    lotIcon: '🎁',
    lotLink: 'https://www.axa.fr/conseils-prevention.html',
    period: 'Avril 2026',
    expiresAt: '2026-05-31',
    steps: [
      'Réviser les joints de salle de bain et cuisine',
      'Installer un détecteur de fuite sous l\'évier ou derrière le lave-linge',
      'Repérer et noter l\'emplacement de votre robinet d\'arrêt général'
    ],
    proof: 'Photo du détecteur installé',
    actionIds: ['dde-joints', 'dde-detection-fuite', 'dde-couper-eau-vacances']
  }
];

/* ── LIBELLÉS CATÉGORIES RISQUE ── */
const RISK_CATEGORY_VERBS = {
  'inondation': { verb: 'Anticiper', phrase: 'Protégez votre RDC avant les crues' },
  'tempete':    { verb: 'Renforcer', phrase: 'Sécurisez toiture et fenêtres' },
  'degat-eaux': { verb: 'Surveiller', phrase: 'Évitez la fuite invisible n°1 en MRH' },
  'vol':        { verb: 'Sécuriser', phrase: 'Verrouillez vos accès, dissuadez les intrusions' },
  'incendie':   { verb: 'Détecter', phrase: 'Détecteur, extincteur, gestes simples' },
  'rga':        { verb: 'Stabiliser', phrase: 'Surveillez fissures et sécheresse' }
};

/* ── HELPERS ── */

function getProfile(id) {
  return PROFILES[id] || PROFILES['profil-a'];
}

function getQuestionsForProfile(profile) {
  const eligible = ['all'];
  if (profile.condition === 'maison' || profile.condition === 'maison_rdc') {
    eligible.push('maison');
    if (profile.condition === 'maison_rdc') eligible.push('maison_rdc');
  }
  if (profile.hasGarden) eligible.push('jardin');

  const byRisk = {};
  profile.mainRisks.forEach(r => { byRisk[r] = []; });

  ALL_QUESTIONS.forEach(q => {
    if (byRisk[q.riskId] !== undefined && eligible.includes(q.condition)) {
      byRisk[q.riskId].push(q);
    }
  });

  const result = [];
  profile.mainRisks.forEach(r => {
    /* Trier L1 avant L2, puis prendre au max 4 par risque */
    const sorted = (byRisk[r] || []).sort((a, b) => (a.level || 1) - (b.level || 1));
    sorted.slice(0, 4).forEach(q => result.push(q));
  });
  return result;
}

function getActionsForProfile(profile, diagAnswers) {
  diagAnswers = diagAnswers || {};

  const eligible = ['all'];
  if (profile.condition === 'maison' || profile.condition === 'maison_rdc') {
    eligible.push('maison');
    if (profile.condition === 'maison_rdc') eligible.push('maison_rdc');
  }
  if (profile.hasGarden) eligible.push('jardin');

  /* Actions déjà couvertes par les réponses positives au diagnostic */
  const doneByDiag = [];
  Object.keys(diagAnswers).forEach(function(qid) {
    const ans = diagAnswers[qid];
    const mapping = QUESTION_ACTION_MAP[qid];
    if (mapping && ans === mapping.triggerOnAnswer) {
      doneByDiag.push(mapping.actionId);
    }
  });

  const done = (profile.completedActions || []).concat(doneByDiag);
  const isLocataire = profile.occupancyStatus === 'Locataire';

  return ALL_ACTIONS.filter(a => {
    const riskMatch = profile.mainRisks.includes(a.riskId);
    const condMatch = eligible.includes(a.condition);
    const scenMatch = a.momentDeVie === profile.scenario || a.momentDeVie === 'both';
    const notDone   = !done.includes(a.id);
    return riskMatch && condMatch && scenMatch && notDone;
  }).sort((a, b) => {
    /* Pour les locataires : actions propriétaire requises reléguées en fin de liste */
    if (isLocataire) {
      if (a.requiresOwner && !b.requiresOwner) return 1;
      if (!a.requiresOwner && b.requiresOwner) return -1;
    }
    /* Actions immédiates d'abord, puis tri par pts décroissant */
    if (a.horizon !== b.horizon) return a.horizon === 'now' ? -1 : 1;
    return b.pts - a.pts;
  });
}

/* ── HELPERS BADGES V4 ── */

function checkBadgeCondition(badge, profile, diagAnswers, completedActionIds, completedDefis) {
  const c = badge.condition;
  const allProfileActions = getActionsForProfile(profile, diagAnswers || {});
  switch (c.type) {
    case 'diag_done':
      return Object.keys(diagAnswers || {}).length > 0;
    case 'action_count':
      return completedActionIds.length >= c.value;
    case 'risk_complete': {
      const riskActions = allProfileActions.filter(a => a.riskId === c.riskId);
      return riskActions.length > 0 && riskActions.every(a => completedActionIds.includes(a.id));
    }
    case 'all_risks_complete':
      return profile.mainRisks.every(rId => {
        const ra = allProfileActions.filter(a => a.riskId === rId);
        return ra.length > 0 && ra.every(a => completedActionIds.includes(a.id));
      });
    case 'defi_done':
      return (completedDefis || []).length > 0;
    default:
      return false;
  }
}

function getUnlockedBadgeIds(profile, diagAnswers, completedActionIds, completedDefis) {
  return BADGES
    .filter(b => checkBadgeCondition(b, profile, diagAnswers, completedActionIds, completedDefis))
    .map(b => b.id);
}

function getBadgeById(id) {
  return BADGES.find(b => b.id === id);
}

function getRewardsForProfile(profile, unlockedBadgeIds) {
  const eligible = ['all'];
  if (profile.condition === 'maison' || profile.condition === 'maison_rdc') {
    eligible.push('maison');
    if (profile.condition === 'maison_rdc') eligible.push('maison_rdc');
  }
  return ALL_REWARDS
    .filter(r => r.scenarios.includes(profile.scenario) && r.conditions.some(c => eligible.includes(c)))
    .map(r => {
      const badgeUnlocked = (unlockedBadgeIds || []).includes(r.requiredBadgeId);
      const requiredBadge = getBadgeById(r.requiredBadgeId);
      return { ...r, badgeUnlocked, requiredBadge };
    });
}

function computeScore(profile, completedIds) {
  const done = profile.completedActions || [];
  const newlyDone = completedIds.filter(id => !done.includes(id));
  const gain = ALL_ACTIONS
    .filter(a => newlyDone.includes(a.id))
    .reduce((s, a) => s + a.pts, 0);
  return Math.min(profile.preparationScore + gain, 100);
}

function scoreLevel(score) {
  if (score < 45)  return { level: 'weak',    label: 'Faible',   color: 'danger' };
  if (score < 70)  return { level: 'average',  label: 'Modéré',   color: 'warn' };
  return               { level: 'good',    label: 'Bon',      color: 'success' };
}

/* ── HELPERS V3 ── */

function getRiskLevelInfo(levelId) {
  return RISK_LEVELS.find(l => l.id === levelId) || RISK_LEVELS[2];
}

function getRiskLevels(profile, diagAnswers) {
  diagAnswers = diagAnswers || {};
  const hasDiag = Object.keys(diagAnswers).length > 0;
  const result = {};

  Object.keys(RISKS).forEach(function(riskId) {
    const base = (profile.riskExposure || {})[riskId] || { zoneLevel:'modere', canImprove:false };
    let idx = LEVEL_ORDER.indexOf(base.zoneLevel);

    if (hasDiag && base.canImprove) {
      const relatedQs = ALL_QUESTIONS.filter(function(q) { return q.riskId === riskId; });
      const yesCount  = relatedQs.filter(function(q) { return diagAnswers[q.id] === 'yes'; }).length;
      const noCount   = relatedQs.filter(function(q) { return diagAnswers[q.id] === 'no'; }).length;
      if (yesCount >= 2) idx = Math.max(0, idx - 1);
      if (noCount  >= 2) idx = Math.min(4, idx + 1);
    }

    const adjLevel = LEVEL_ORDER[idx];
    result[riskId] = {
      riskId,
      zoneLevel:         base.zoneLevel,
      homeAdjustedLevel: adjLevel,
      improved:  hasDiag && idx < LEVEL_ORDER.indexOf(base.zoneLevel),
      degraded:  hasDiag && idx > LEVEL_ORDER.indexOf(base.zoneLevel),
      hasDiagnosticData: hasDiag,
      levelInfo: getRiskLevelInfo(adjLevel)
    };
  });
  return result;
}

function computePoints(profile, completedIds) {
  const done = profile.completedActions || [];
  const newlyDone = (completedIds || []).filter(function(id) { return !done.includes(id); });
  return ALL_ACTIONS
    .filter(function(a) { return newlyDone.includes(a.id); })
    .reduce(function(s, a) { return s + a.pts; }, 0);
}
