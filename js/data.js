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
    tagline: 'Automne-hiver · Risques élevés détectés'
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
    tagline: 'Nouveau contrat · Plan de départ'
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
    tagline: 'Profil avancé · Risque RGA spécifique'
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
    tagline: 'Nouvel achat · Copropriété · Score faible'
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
    tagline: 'Été · Risques feux et sécheresse'
  }
};

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
    avoidablePercent: 80,
    explanation: '80 % des incendies domestiques sont évitables. Le détecteur de fumée est obligatoire.',
    damages: ['Destruction totale du bien','Intoxication au CO','Voisins affectés','Perte de documents']
  },
  'rga': {
    id: 'rga', label: 'Retrait Gonflement des Argiles', icon: '🏚️',
    level: 'medium', levelLabel: 'Modéré',
    avoidablePercent: 55,
    explanation: 'Le sol argileux lyonnais se rétracte en été et gonfle en hiver, fragilisant les fondations.',
    damages: ['Fissures dans les murs porteurs','Déformation des ouvertures','Tassement différentiel','Fondations fragilisées']
  }
};

/* ── QUESTIONS DIAGNOSTIQUES ── */
/* 3 options : yes (+max) / partial (+mid) / no (+0 ou +inverse) */
const ALL_QUESTIONS = [
  /* INONDATION — condition: maison_rdc */
  { id:'inondation-clapets', riskId:'inondation', condition:'maison_rdc',
    text:'Des clapets anti-retours sont-ils installés sur le réseau d\'eaux usées ?',
    options:[{v:'yes',l:'Oui, installés',pts:12},{v:'partial',l:'Je ne sais pas',pts:3},{v:'no',l:'Non',pts:0}] },
  { id:'inondation-batardeaux', riskId:'inondation', condition:'maison_rdc',
    text:'Disposez-vous de batardeaux pour calfeutrer vos portes ?',
    options:[{v:'yes',l:'Oui, prêts à poser',pts:10},{v:'partial',l:'Partiellement',pts:5},{v:'no',l:'Non',pts:0}] },
  /* TEMPÊTE — condition: maison */
  { id:'tempete-toiture', riskId:'tempete', condition:'maison',
    text:'Votre toiture a-t-elle été vérifiée dans les 3 dernières années ?',
    options:[{v:'yes',l:'Oui, vérifiée',pts:8},{v:'partial',l:'Il y a plus de 3 ans',pts:3},{v:'no',l:'Non / Je ne sais pas',pts:0}] },
  { id:'tempete-goutieres', riskId:'tempete', condition:'maison',
    text:'Vos gouttières et chéneaux ont-ils été nettoyés dans les 12 derniers mois ?',
    options:[{v:'yes',l:'Oui',pts:8},{v:'partial',l:'Il y a plus d\'un an',pts:4},{v:'no',l:'Non',pts:0}] },
  /* DÉGÂT DES EAUX — condition: all */
  { id:'dde-joints', riskId:'degat-eaux', condition:'all',
    text:'Vos joints d\'étanchéité ont-ils été refaits dans les 5 dernières années ?',
    options:[{v:'yes',l:'Oui',pts:6},{v:'partial',l:'Partiellement',pts:3},{v:'no',l:'Non / >5 ans',pts:0}] },
  { id:'dde-detection-fuite', riskId:'degat-eaux', condition:'all',
    text:'Disposez-vous d\'un dispositif de détection de fuite (sondes, capteurs) ?',
    options:[{v:'yes',l:'Oui',pts:8},{v:'partial',l:'Je ne sais pas',pts:2},{v:'no',l:'Non',pts:0}] },
  /* INCENDIE — condition: all */
  { id:'incendie-detecteur-fumee', riskId:'incendie', condition:'all',
    text:'Avez-vous un détecteur de fumée fonctionnel à chaque étage ?',
    options:[{v:'yes',l:'Oui, à chaque étage',pts:8},{v:'partial',l:'Dans certaines pièces',pts:4},{v:'no',l:'Non',pts:0}] },
  { id:'incendie-chaudiere', riskId:'incendie', condition:'all',
    text:'Votre chaudière est-elle révisée annuellement par un professionnel agréé ?',
    options:[{v:'yes',l:'Oui / contrat entretien',pts:6},{v:'partial',l:'Pas systématiquement',pts:2},{v:'no',l:'Non / Pas de chaudière',pts:3}] },
  /* VOL — condition: all */
  { id:'vol-telesurveillance', riskId:'vol', condition:'all',
    text:'Disposez-vous d\'une caméra de surveillance ou d\'un système de télésurveillance ?',
    options:[{v:'yes',l:'Système complet',pts:10},{v:'partial',l:'Caméra simple',pts:5},{v:'no',l:'Non',pts:0}] },
  { id:'vol-serrure-3pts', riskId:'vol', condition:'all',
    text:'Avez-vous une serrure 3 points sur votre porte d\'entrée ?',
    options:[{v:'yes',l:'Oui',pts:8},{v:'partial',l:'Je ne sais pas',pts:2},{v:'no',l:'Non',pts:0}] },
  /* INONDATION — questions supplémentaires */
  { id:'inondation-obturateurs', riskId:'inondation', condition:'maison_rdc',
    text:'Disposez-vous de systèmes pour calfeutrer vos ouvertures basses (soupiraux, aérations) ?',
    options:[{v:'yes',l:'Oui, pour toutes',pts:8},{v:'partial',l:'Pour certaines',pts:4},{v:'no',l:'Non',pts:0}] },
  { id:'inondation-electrique', riskId:'inondation', condition:'maison_rdc',
    text:'Votre circuit électrique est-il relevé au-dessus de 1,5 m du sol ?',
    options:[{v:'yes',l:'Oui',pts:10},{v:'partial',l:'En partie',pts:5},{v:'no',l:'Non / Je ne sais pas',pts:0}] },
  /* DÉGÂT DES EAUX — question supplémentaire */
  { id:'dde-canalisation-tableau', riskId:'degat-eaux', condition:'all',
    text:'Y a-t-il des canalisations qui passent à proximité de votre tableau électrique ?',
    options:[{v:'yes',l:'Oui',pts:0},{v:'partial',l:'Je ne sais pas',pts:2},{v:'no',l:'Non',pts:6}] },
  /* INCENDIE — questions supplémentaires */
  { id:'incendie-ramonage', riskId:'incendie', condition:'maison',
    text:'Faites-vous ramoner vos conduits de cheminée ou d\'insert au moins une fois par an ?',
    options:[{v:'yes',l:'Oui, chaque année',pts:6},{v:'partial',l:'Pas tous les ans',pts:2},{v:'no',l:'Non / Pas de cheminée',pts:4}] },
  { id:'incendie-extincteur', riskId:'incendie', condition:'all',
    text:'Disposez-vous d\'un extincteur aux normes et savez-vous vous en servir ?',
    options:[{v:'yes',l:'Oui, et je sais l\'utiliser',pts:6},{v:'partial',l:'Oui mais pas formé',pts:3},{v:'no',l:'Non',pts:0}] },
  { id:'incendie-electricite', riskId:'incendie', condition:'all',
    text:'Votre installation électrique a-t-elle été refaite il y a moins de 15 ans ?',
    options:[{v:'yes',l:'Oui',pts:8},{v:'partial',l:'Je ne sais pas',pts:3},{v:'no',l:'Non',pts:0}] },
  /* VOL — question supplémentaire */
  { id:'vol-volets', riskId:'vol', condition:'maison_rdc',
    text:'Fermez-vous systématiquement vos volets la nuit et lors de vos absences ?',
    options:[{v:'yes',l:'Oui, systématiquement',pts:6},{v:'partial',l:'Parfois',pts:3},{v:'no',l:'Non / Pas de volets',pts:0}] },
  /* RGA — condition: maison */
  { id:'rga-trottoir', riskId:'rga', condition:'maison',
    text:'Avez-vous un trottoir périphérique autour de votre maison ?',
    options:[{v:'yes',l:'Oui, complet',pts:8},{v:'partial',l:'Partiellement',pts:4},{v:'no',l:'Non',pts:0}] },
  { id:'rga-vegetation', riskId:'rga', condition:'maison',
    text:'Y a-t-il des végétaux à moins de 5 m des façades de votre maison ?',
    options:[{v:'yes',l:'Oui, plusieurs',pts:0},{v:'partial',l:'À certains endroits',pts:3},{v:'no',l:'Non',pts:8}] }
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
    pts:8, conseilText:'Installez des batardeaux sur les portes pour limiter les entrées d\'eau et de boue dans l\'habitation.',
    steps:['Sortir les batardeaux et vérifier l\'état des joints','Poser le batardeau sur la porte d\'entrée en commençant par l\'extérieur','Ajuster la hauteur pour assurer l\'étanchéité','Répéter pour chaque porte exposée aux entrées d\'eau'],
    tags:['Gratuit (déjà équipé)','30 min'] },
  { id:'inondation-calfeutrer', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'now', momentDeVie:'seasonal', condition:'maison_rdc',
    title:'Calfeutrer toutes les ouvertures basses', effort:'low', duration:'20 min',
    benefit:'Empêche l\'eau de pénétrer par les soupiraux, aérations et petites ouvertures.',
    pts:6, conseilText:'Calfeutrez les ouvertures (fenêtres, portes, soupiraux, aérations…) à l\'aide de barrières, sacs de sable ou tout moyen de les rendre étanches.',
    steps:['Identifier toutes les ouvertures basses (soupiraux, aérations, vide-sanitaires)','Préparer des sacs de sable ou des boudins anti-inondation','Bloquer chaque ouverture en commençant par les plus exposées','Vérifier l\'étanchéité en cherchant les courants d\'air'],
    tags:['Gratuit','20 min'] },
  { id:'inondation-clapets', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison_rdc',
    requiresOwner: true,
    title:'Installer des clapets anti-retour', effort:'high', duration:'Sur RDV',
    benefit:'Évite le reflux des eaux usées en cas d\'inondation — protège les caves et sous-sols.',
    pts:12, conseilText:'Installez des clapets anti-retour sur le réseau d\'eaux usées pour éviter le reflux des eaux en cas d\'inondation.',
    steps:['Repérer l\'emplacement du réseau d\'eaux usées en sous-sol','Contacter un plombier certifié pour l\'installation','Faire vérifier le bon fonctionnement du clapet','Tester le mécanisme une fois par an'],
    tags:['400–800 €','Plombier requis'] },
  /* TEMPÊTE */
  { id:'dde-goutieres', riskId:'degat-eaux', riskLabel:'Dégât des eaux', riskColor:'info',
    horizon:'now', momentDeVie:'both', condition:'maison',
    title:'Nettoyer les gouttières et chéneaux', effort:'low', duration:'30 min',
    benefit:'Évite les débordements et infiltrations en toiture lors des fortes pluies.',
    pts:5, conseilText:'Maintenez en bon état vos toitures, chéneaux et gouttières.',
    steps:['Munir d\'une échelle sécurisée et de gants de travail','Retirer les feuilles et débris à la main ou avec un crochet','Rincer avec un tuyau d\'arrosage de haut en bas','Vérifier l\'état des fixations et remplacer si besoin'],
    tags:['Gratuit','30 min'] },
  /* DÉGÂT DES EAUX */
  { id:'dde-joints', riskId:'degat-eaux', riskLabel:'Dégât des eaux', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Réviser les joints d\'étanchéité', effort:'low', duration:'20 min',
    benefit:'Un joint détérioré = fuite silencieuse pendant des semaines. Coût de réparation x10.',
    pts:4, conseilText:'Entretenez régulièrement les joints d\'étanchéité des installations sanitaires.',
    steps:['Inspecter les joints autour de la baignoire, douche, lavabo et WC','Vérifier l\'absence de moisissures noires (signe de joint poreux)','Retirer l\'ancien joint avec un cutter et du dissolvant','Appliquer le nouveau joint avec un pistolet silicone — laisser sécher 24h'],
    tags:['~10 €','20 min'] },
  { id:'dde-couper-eau-vacances', riskId:'degat-eaux', riskLabel:'Dégât des eaux', riskColor:'info',
    horizon:'now', momentDeVie:'seasonal', condition:'all',
    title:'Couper l\'arrivée d\'eau avant de partir', effort:'low', duration:'5 min',
    benefit:'La cause n° 1 de sinistre en vacances. 5 secondes qui évitent des semaines de travaux.',
    pts:4, conseilText:'Coupez l\'arrivée d\'eau en cas d\'absence prolongée.',
    steps:['Localiser le robinet d\'arrêt général (souvent sous l\'évier ou en cave)','Tourner le robinet en position fermée','Purger les robinets pour vider les tuyaux','Noter l\'emplacement dans votre carnet de logement'],
    tags:['Gratuit','5 min'] },
  /* INCENDIE */
  { id:'incendie-detecteur-fumee', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Installer un détecteur de fumée', effort:'low', duration:'15 min',
    benefit:'Obligatoire par la loi. Divise par 3 le risque de décès en cas d\'incendie nocturne.',
    pts:8, conseilText:'Installez un détecteur de fumée chez vous, et ce, à chaque étage.',
    steps:['Choisir un détecteur NF EN 14604 (norme européenne)','Fixer au plafond, au centre de la pièce, à 30 cm des murs','Tester le détecteur après installation (bouton test)','Remplacer la pile chaque année et le détecteur tous les 10 ans'],
    tags:['~20 €','15 min'] },
  { id:'incendie-chaudiere', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Réviser la chaudière annuellement', effort:'low', duration:'Sur RDV',
    benefit:'Obligatoire. Prévient les pannes, les fuites de gaz et les intoxications au CO.',
    pts:6, conseilText:'Faites réviser votre chaudière une fois par an par un plombier-chauffagiste agréé — c\'est obligatoire.',
    steps:['Contacter votre installateur ou signer un contrat d\'entretien annuel','Préparer les accès à la chaudière (dégager l\'espace)','Demander un compte-rendu d\'intervention écrit','Conserver le rapport dans le carnet d\'entretien du logement'],
    tags:['100–150 €','Sur RDV'] },
  { id:'incendie-debrancher', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'now', momentDeVie:'seasonal', condition:'all',
    title:'Débrancher les appareils en veille', effort:'low', duration:'5 min',
    benefit:'Un chargeur laissé branché peut déclencher un incendie. Réflexe à adopter avant de partir.',
    pts:3, conseilText:'Veillez à débrancher vos chargeurs dès que les batteries sont pleines.',
    steps:['Faire le tour de chaque pièce avant de partir','Débrancher les chargeurs de téléphone, tablette, enceintes','Éteindre la box Internet et les multiprises','Vérifier que le four, les plaques et la cafetière sont éteints'],
    tags:['Gratuit','5 min'] },
  /* VOL */
  { id:'vol-inventaire', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    title:'Répertorier vos objets de valeur', effort:'medium', duration:'60 min',
    benefit:'Indispensable pour le remboursement assurance. Sans inventaire, les preuves manquent.',
    pts:5, conseilText:'Répertoriez vos objets de valeur, notez leurs numéros de série et photographiez-les.',
    steps:['Lister tous les objets de valeur (bijoux, électronique, art)','Photographier chaque objet sous plusieurs angles','Relever les numéros de série et conserver les factures','Stocker la liste dans le cloud ou chez un proche (pas au domicile)'],
    tags:['Gratuit','60 min'] },
  { id:'vol-serrure-3pts', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'this_month', momentDeVie:'subscription', condition:'all',
    requiresOwner: true,
    title:'Installer une serrure 3 points', effort:'medium', duration:'Sur RDV',
    benefit:'Multiplie par 4 la résistance à l\'effraction. Norme A2P recommandée par les assureurs.',
    pts:8, conseilText:'Disposez d\'une serrure 3 points sur votre porte d\'entrée.',
    steps:['Faire appel à un serrurier certifié A2P (agrément assureur)','Choisir une serrure avec point de verrouillage haut, bas et central','Demander un devis comparatif (150–300 € main d\'œuvre incluse)','Conserver le certificat A2P pour votre dossier assurance'],
    tags:['150–300 €','Serrurier A2P'] },
  { id:'vol-securiser-vacances', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'now', momentDeVie:'seasonal', condition:'all',
    title:'Sécuriser avant les vacances', effort:'low', duration:'15 min',
    benefit:'65 % des cambriolages ont lieu en été. Quelques gestes simples font toute la différence.',
    pts:5, conseilText:'Si vous devez vous absenter, faites suivre votre courrier et demandez à un proche de surveiller.',
    steps:['S\'inscrire à "Opération Tranquillité Vacances" (police / gendarmerie)','Confier les clés à une personne de confiance','Mettre les objets de valeur en lieu sûr ou en coffre bancaire','Brancher des minuteries sur les lumières pour simuler une présence'],
    tags:['Gratuit','15 min'] },
  /* RGA */
  { id:'rga-trottoir', riskId:'rga', riskLabel:'RGA', riskColor:'warn',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison',
    requiresOwner: true,
    title:'Aménager un trottoir périphérique', effort:'high', duration:'Sur RDV',
    benefit:'Évacue les eaux de pluie loin des fondations et réduit les cycles humidité/sécheresse.',
    pts:8, conseilText:'Aménagez un trottoir périphérique autour de votre maison pour éloigner l\'eau des fondations.',
    steps:['Faire réaliser un diagnostic de sol par un géotechnicien','Définir le tracé avec un paysagiste ou maçon','Poser une dalle béton ou gravier stabilisé en pente vers l\'extérieur','Contrôler l\'état chaque printemps et reboucher les fissures'],
    tags:['500–2000 €','Pro requis'] },
  { id:'rga-vegetation', riskId:'rga', riskLabel:'RGA', riskColor:'warn',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison',
    title:'Éloigner la végétation des façades', effort:'medium', duration:'60 min',
    benefit:'Les racines profondes accentuent les cycles de rétraction du sol argileux.',
    pts:6, conseilText:'Évitez de planter des végétaux près des façades.',
    steps:['Identifier les arbres et haies à moins de 5 m des murs','Couper les branches surplombant la toiture','Pour les grands arbres : faire appel à un élagueur certifié','Ne pas replanter à moins de 5 m des fondations'],
    tags:['Variable','60 min ou Pro'] },
  { id:'rga-goutieres', riskId:'rga', riskLabel:'RGA', riskColor:'warn',
    horizon:'now', momentDeVie:'seasonal', condition:'maison',
    title:'Désencombrer les gouttières (RGA)', effort:'low', duration:'30 min',
    benefit:'Évite l\'accumulation d\'eau en pied de façade qui aggrave les cycles argile sèche/humide.',
    pts:4, conseilText:'Désencombrez vos gouttières et raccordez-les au réseau d\'évacuation pour éloigner l\'eau des fondations.',
    steps:['Vérifier l\'état des gouttières et descentes pluviales','Retirer les feuilles et débris accumulés','Raccorder les descentes vers l\'égout pluvial ou l\'infiltration','Vérifier qu\'aucune eau ne stagne en pied de mur'],
    tags:['Gratuit','30 min'] },
  /* INONDATION — actions supplémentaires */
  { id:'inondation-circuit-electrique', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison_rdc',
    requiresOwner: true,
    title:'Réhausser le circuit électrique à 1,5 m', effort:'high', duration:'Sur RDV',
    benefit:'Protège le tableau et les prises d\'un court-circuit en cas de montée des eaux.',
    pts:10, conseilText:'Réhaussez le circuit électrique (tableau, prises de courant) et les systèmes de chauffage au-dessus de 1,5 m du sol.',
    steps:['Faire réaliser un diagnostic électrique par un électricien certifié','Établir un plan de rehaussement du tableau et des prises basses','Réaliser les travaux hors période de risque inondation','Obtenir l\'attestation de conformité Consuel après travaux'],
    tags:['800–2000 €','Électricien requis'] },
  { id:'inondation-zone-refuge', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison_rdc',
    title:'Aménager une zone refuge en hauteur', effort:'medium', duration:'60 min',
    benefit:'Permet de se mettre en sécurité si la montée des eaux est trop rapide pour évacuer.',
    pts:6, conseilText:'Aménagez une zone refuge en hauteur, munie d\'un accès vers l\'extérieur (fenêtre de toit, balcon).',
    steps:['Identifier la pièce en hauteur la plus accessible (étage, grenier)','Y stocker eau, médicaments, lampe et radio à piles','Vérifier qu\'une fenêtre ou trappe permet d\'alerter les secours','Informer tous les occupants de l\'emplacement et du protocole'],
    tags:['Gratuit','60 min'] },
  { id:'inondation-produits-sensibles', riskId:'inondation', riskLabel:'Inondation', riskColor:'info',
    horizon:'now', momentDeVie:'seasonal', condition:'maison_rdc',
    title:'Mettre à l\'abri les produits sensibles', effort:'low', duration:'15 min',
    benefit:'Évite la pollution des eaux de crue par les produits chimiques et la perte de médicaments.',
    pts:4, conseilText:'Mettez à l\'abri les produits sensibles (médicaments, produits chimiques…) afin d\'éviter un risque de pollution important.',
    steps:['Rassembler médicaments, produits d\'entretien et chimiques','Les placer dans des sacs hermétiques ou boîtes étanches','Les monter à l\'étage ou dans un meuble en hauteur','Faire de même pour les documents importants et le matériel informatique'],
    tags:['Gratuit','15 min'] },
  /* INCENDIE — actions supplémentaires */
  { id:'incendie-ramonage', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'this_month', momentDeVie:'subscription', condition:'maison',
    title:'Faire ramoner les conduits de cheminée', effort:'low', duration:'Sur RDV',
    benefit:'Obligatoire 1 à 2 fois/an. Prévient le feu de cheminée et l\'intoxication au monoxyde de carbone.',
    pts:6, conseilText:'Faites ramoner vos conduits de cheminée, d\'inserts ou de poêles au moins une fois par an.',
    steps:['Contacter un ramoneur agréé (vérifier accréditation)','Prévoir la prestation avant l\'hiver (septembre–octobre)','Demander un certificat de ramonage pour votre assurance','Vérifier la ventilation de la pièce après le ramonage'],
    tags:['80–150 €','Ramoneur agréé'] },
  { id:'incendie-debroussaillage', riskId:'incendie', riskLabel:'Incendie', riskColor:'danger',
    horizon:'now', momentDeVie:'seasonal', condition:'maison',
    title:'Débroussailler le jardin et le terrain', effort:'medium', duration:'120 min',
    benefit:'Réduit le combustible disponible et ralentit la propagation d\'un feu de végétation.',
    pts:5, conseilText:'Si vous avez un jardin ou un terrain, débroussaillez-le régulièrement.',
    steps:['Couper les herbes hautes et végétaux secs dans un rayon de 50 m','Élaguer les branches basses des arbres jusqu\'à 2 m de hauteur','Ramasser et évacuer les déchets végétaux (ne pas brûler en période sèche)','Laisser un espace libre entre les arbres pour ne pas créer de continuité'],
    tags:['Gratuit ou Pro','120 min'] },
  /* VOL — actions supplémentaires */
  { id:'vol-ranger-exterieur', riskId:'vol', riskLabel:'Vol', riskColor:'neutral',
    horizon:'now', momentDeVie:'seasonal', condition:'maison_rdc',
    title:'Ranger les équipements extérieurs', effort:'low', duration:'10 min',
    benefit:'Les échelles et outils laissés dehors facilitent l\'intrusion — 1 cambrioleur sur 3 utilise ce qui est à portée.',
    pts:4, conseilText:'En extérieur, ne laissez rien qui puisse faciliter une intrusion : échelles, marchepieds ou outils pourraient être utilisés à mauvais escient.',
    steps:['Rentrer les échelles, escabeaux et marchepieds dans un local fermé','Verrouiller l\'abri de jardin et le garage','Ranger les outils de jardinage (pioches, barres)','Fermer et verrouiller le portail et la clôture'],
    tags:['Gratuit','10 min'] }
];

/* ── RÉCOMPENSES ── */
const ALL_REWARDS = [
  { id:'lmqc-mois', icon:'🎁', iconBg:'#E6F5ED',
    title:'1 mois d\'assurance complémentaire offert', subtitle:'~46 € offerts',
    desc:'Un mois de garantie MRH supplémentaire sur votre contrat — offert par AXA en récompense de vos actions de prévention.',
    type:'lmqc', priority:1, minActions:3,
    scenarios:['subscription'], conditions:['all','maison','maison_rdc'],
    status:'available', disclaimer:'Activé au prochain renouvellement.' },
  { id:'batardeau-offert', icon:'🛡️', iconBg:'#DBEAFE',
    title:'Kit batardeaux co-financé AXA', subtitle:'Jusqu\'à 150 €',
    desc:'AXA co-finance l\'achat de batardeaux pour votre logement exposé.',
    type:'dispositif', priority:1, minActions:2,
    scenarios:['subscription','seasonal'], conditions:['maison_rdc'],
    status:'available', disclaimer:'Sur devis validé par AXA Prévention.' },
  { id:'detecteur-dde', icon:'💧', iconBg:'#CFFAFE',
    title:'Détecteur de fuite offert', subtitle:'~50 €',
    desc:'AXA vous offre un détecteur de fuite d\'eau connecté.',
    type:'dispositif', priority:1, minActions:2,
    scenarios:['subscription'], conditions:['all','maison','maison_rdc'],
    status:'available', disclaimer:'Livraison sous 10 jours ouvrés.' },
  { id:'diagnostic-offert', icon:'🔍', iconBg:'#EDE9FE',
    title:'1er diagnostic prévention offert', subtitle:'~120 €',
    desc:'Un expert AXA se déplace pour un diagnostic complet de votre logement.',
    type:'service_offert', priority:1, minActions:1,
    scenarios:['subscription'], conditions:['maison','maison_rdc'],
    status:'available', disclaimer:'Sur rendez-vous — délai 2 semaines.' },
  { id:'cheque-leroy-merlin', icon:'🛒', iconBg:'#FEF3C7',
    title:'Bon d\'achat Leroy Merlin', subtitle:'20 €',
    desc:'À valoir sur tout équipement de prévention en magasin ou en ligne.',
    type:'cheque_cadeau', priority:2, minActions:1,
    scenarios:['subscription','seasonal'], conditions:['all','maison','maison_rdc'],
    status:'teaser', teaser:'Bientôt disponible' },
  { id:'taux-bonifie', icon:'🏦', iconBg:'#EDE9FE',
    title:'Taux bonifié crédit travaux', subtitle:'-0,1 %',
    desc:'Conditions préférentielles sur votre crédit habitat AXA Banque pour travaux de prévention.',
    type:'cheque_cadeau', priority:2, minActions:5,
    scenarios:['subscription'], conditions:['maison','maison_rdc'],
    status:'teaser', teaser:'En cours d\'étude' },
  { id:'kit-prevention-saisonnier', icon:'🌿', iconBg:'#FEF3C7',
    title:'Kit prévention saisonnière offert', subtitle:'~80 €',
    desc:'Bâche de protection, produit ignifuge pour végétation et guide de débroussaillage — co-financé par AXA.',
    type:'dispositif', priority:1, minActions:2,
    scenarios:['seasonal'], conditions:['maison','maison_rdc'],
    status:'available', disclaimer:'Livraison sous 10 jours ouvrés.' }
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
    (byRisk[r] || []).slice(0, 2).forEach(q => result.push(q));
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

function getRewardsForProfile(profile, completedCount) {
  const eligible = ['all'];
  if (profile.condition === 'maison' || profile.condition === 'maison_rdc') {
    eligible.push('maison');
    if (profile.condition === 'maison_rdc') eligible.push('maison_rdc');
  }

  return ALL_REWARDS.map(r => {
    const okScenario  = r.scenarios.includes(profile.scenario);
    const okCondition = r.conditions.some(c => eligible.includes(c));
    if (!okScenario || !okCondition) return { ...r, computedStatus: 'locked' };
    if (r.status === 'teaser') return { ...r, computedStatus: 'teaser' };
    if (completedCount >= r.minActions) return { ...r, computedStatus: 'unlocked' };
    return { ...r, computedStatus: 'available' };
  }).filter(r => {
    const okScenario  = r.scenarios.includes(profile.scenario);
    const okCondition = r.conditions.some(c => eligible.includes(c));
    return okScenario && okCondition;
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
