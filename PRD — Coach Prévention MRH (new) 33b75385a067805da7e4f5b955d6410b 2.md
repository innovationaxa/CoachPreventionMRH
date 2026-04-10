# PRD — Coach Prévention MRH (new)

**Blueprint Produit — Rétrodocumentation du prototype fonctionnel**

> Version : 1.0 — Avril 2026
Prototype : Vite + React 18 + TypeScript + Tailwind CSS v3
Port de développement : 5174
Statut : MVP fonctionnel — 15 écrans — Données métier réelles AXA
> 

---

## Table des matières

1. [Résumé exécutif](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
2. [Personas & profils de test](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
3. [Architecture des données](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
4. [État global — AppContext](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
5. [Cinématique complète — 15 écrans](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
6. [Règles métier](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
7. [Design System](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
8. [Structure technique](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)
9. [Axes d'évolution](https://www.notion.so/PRD-Coach-Pr-vention-MRH-new-33b75385a067805da7e4f5b955d6410b?pvs=21)

---

## 1. Résumé exécutif

### Vision produit

**Coach Prévention MRH** est un outil digital d'accompagnement à la prévention des risques du logement, développé pour AXA France dans le cadre du produit MRH (Multirisques Habitation). Il guide les assurés dans l'évaluation de leur niveau de protection et la réalisation d'actions concrètes de prévention, en leur proposant en retour des récompenses tangibles financées par AXA.

### Problème résolu

Les assurés MRH ignorent souvent leur niveau d'exposition aux risques et les gestes simples qui pourraient éviter jusqu'à 60–80 % des sinistres. AXA dispose d'un référentiel métier de CONSEILS prévention mais ne l'active pas systématiquement dans la relation client.

### Proposition de valeur

| Pour le client | Pour AXA |
| --- | --- |
| Diagnostic personnalisé en 2 min | Réduction du taux de sinistralité |
| Plan d'action concret et priorisé | Meilleure relation conseiller–assuré |
| Récompenses débloquées par l'action | Différenciation produit MRH |
| Conseils officiels AXA intégrés | Valorisation du référentiel métier |

### Public cible

- **Client MRH** : assuré ou futur assuré — accès via application mobile ou web
- **Agent AXA** : conseiller qui utilise la vue agent pour préparer ses entretiens et valoriser la démarche prévention

### Deux parcours d'entrée

| Parcours | Déclencheur | Objectif |
| --- | --- | --- |
| **Souscription** | Nouveau contrat MRH | Engager l'assuré dès la signature — 1er diagnostic + plan structurant |
| **Saisonnalité** | Moment-clé annuel (automne, avant tempête, etc.) | Rappeler les gestes urgents à réaliser avant un risque imminent |

---

## 2. Personas & profils de test

Le prototype embarque 3 profils de démonstration sélectionnables à l'entrée de l'application.

### Profil A — Marie (Nantes)

| Attribut | Valeur |
| --- | --- |
| `id` | `profil-a` |
| Prénom | Marie |
| Type de bien | Maison individuelle |
| Statut | Propriétaire |
| Localisation | Nantes (44) |
| Zone | Zone orange inondation — Zone vents forts |
| Contexte actif | `seasonal` (Saisonnalité) |
| Score exposition | 78 / 100 |
| Score préparation initial | 32 / 100 |
| Risques principaux | Inondation · Tempête · Dégât des Eaux |
| Condition logement | `maison` |
| Jardin | Oui |
| Actions déjà réalisées | Aucune |

**Usage prototype** : Cas le plus exposé. Montre les actions urgentes saisonnières (batardeaux, calfeutrage, gouttières). Éligible aux récompenses batardeau co-financé et diagnostic offert.

---

### Profil B — Thomas (Paris)

| Attribut | Valeur |
| --- | --- |
| `id` | `profil-b` |
| Prénom | Thomas |
| Type de bien | Appartement |
| Statut | Locataire |
| Localisation | Paris 15e (75) |
| Zone | Zone urbaine — Risque vol modéré |
| Contexte actif | `subscription` (Souscription) |
| Score exposition | 55 / 100 |
| Score préparation initial | 48 / 100 |
| Risques principaux | Vol · Dégât des Eaux · Incendie |
| Condition logement | `all` |
| Jardin | Non |
| Actions déjà réalisées | `incendie-detecteur-fumee` |
| Dernière activité | Il y a 2 jours |

**Usage prototype** : Profil urbain locataire. Montre les actions de souscription vol+sécurité. Éligible aux récompenses LMQC et détecteur DDE.

---

### Profil C — Sophie (Lyon)

| Attribut | Valeur |
| --- | --- |
| `id` | `profil-c` |
| Prénom | Sophie |
| Type de bien | Maison individuelle |
| Statut | Propriétaire |
| Localisation | Lyon 3e (69) |
| Zone | Zone risque faible — Sol argileux |
| Contexte actif | `subscription` (Souscription) |
| Score exposition | 42 / 100 |
| Score préparation initial | 61 / 100 |
| Risques principaux | Incendie · Dégât des Eaux · RGA |
| Condition logement | `maison` |
| Jardin | Oui |
| Actions déjà réalisées | `incendie-detecteur-fumee` · `dde-goutieres` |
| Dernière activité | Aujourd'hui |

**Usage prototype** : Profil maison avec risque RGA (argile). Montre les actions structurelles spécifiques RGA. Score initial élevé — illustre un profil déjà bien avancé.

---

## 3. Architecture des données

### 3.1 Types (`src/types/index.ts`)

### Enums

```tsx
type RiskLevel = 'high' | 'medium' | 'low'
type ScoreLevel = 'weak' | 'average' | 'good'
type ActionType = 'geste' | 'verification' | 'equipement' | 'service'
type ActionEffort = 'low' | 'medium' | 'high'
type ActionStatus = 'pending' | 'in_progress' | 'done'
type TimeHorizon = 'now' | 'this_month'
type Scenario = 'subscription' | 'seasonal'
type MomentDeVie = 'subscription' | 'seasonal' | 'both'
type PropertyCondition = 'all' | 'maison' | 'maison_rdc' | 'jardin'
type RewardType = 'lmqc' | 'dispositif' | 'cheque_cadeau' | 'service_offert'
type RewardStatus = 'locked' | 'available' | 'teaser' | 'unlocked'
type ServiceCategory = 'artisan' | 'diagnostic' | 'surveillance' | 'devis' | 'conseil'
type ProfileId = 'profil-a' | 'profil-b' | 'profil-c'
```

### Interface `Risk`

```tsx
interface Risk {
  id: string
  label: string
  icon: string               // emoji
  level: RiskLevel
  explanation: string        // texte contextuel affiché dans le diagnostic
  possibleDamages: string[]  // liste de dommages potentiels
  avoidablePercent: number   // % de dommages évitables par la prévention
  season?: string            // ex: 'automne-hiver'
}
```

### Interface `Action`

```tsx
interface Action {
  id: string
  title: string
  type: ActionType
  effort: ActionEffort
  durationMinutes: number    // 0 = sur rendez-vous
  benefit: string
  timeHorizon: TimeHorizon   // 'now' | 'this_month'
  relatedRiskIds: string[]
  status: ActionStatus
  steps: string[]
  tips?: string
  scoreGain: number          // points ajoutés au score quand l'action est complétée
  momentDeVie: MomentDeVie   // filtre de scénario
  condition: PropertyCondition  // filtre de type de logement
  conseilText?: string       // texte officiel du conseil AXA
}
```

### Interface `DiagnosticQuestion`

```tsx
interface DiagnosticQuestion {
  id: string
  text: string
  riskId: string
  condition: PropertyCondition
  options: {
    value: 'yes' | 'partial' | 'no'
    label: string
    scoreImpact: number    // points de score affichés à la sélection
  }[]
}
```

### Interface `Reward`

```tsx
interface Reward {
  id: string
  title: string
  subtitle: string
  description: string
  type: RewardType
  priority: 1 | 2 | 3
  valueLabel: string          // ex: '~46 € offerts'
  icon: string
  minActionsRequired: number  // seuil pour déverrouiller
  eligibleScenarios: Scenario[]
  eligibleConditions: PropertyCondition[]
  relatedRiskIds: string[]    // [] = tous risques
  status: RewardStatus        // statut de base (peut être 'teaser')
  disclaimer?: string
}
```

### Interface `ClientProfile`

```tsx
interface ClientProfile {
  id: ProfileId
  firstName: string
  propertyType: string
  occupancyStatus: string
  location: string
  zone: string
  activeContext: Scenario
  exposureScore: number
  preparationScore: number    // score initial avant actions
  mainRiskIds: string[]
  recommendedActionIds: string[]
  completedActionIds: string[]
  lastActivity?: string
  propertyCondition: PropertyCondition
  hasGarden: boolean
}
```

---

### 3.2 Catalogue des risques (`src/data/risks.ts`)

| ID | Label | Icône | Niveau | % évitable | Saison |
| --- | --- | --- | --- | --- | --- |
| `inondation` | Inondation | 🌊 | `high` | 60 % | automne-hiver |
| `tempete` | Tempête | 🌪️ | `high` | 70 % | automne-hiver |
| `degat-eaux` | Dégât des eaux | 💧 | `medium` | 75 % | — |
| `vol` | Vol | 🔐 | `medium` | 65 % | — |
| `incendie` | Incendie | 🔥 | `low` | 80 % | — |
| `rga` | Retrait Gonflement des Argiles | 🏚️ | `medium` | 55 % | — |

**Note RGA** : Risque spécifique aux terrains argileux (cycles sécheresse/pluie) provoquant fissures dans les murs porteurs, déformations de structure et tassement différentiel.

---

### 3.3 Catalogue des actions (`src/data/actions.ts`)

25 actions issues du référentiel métier AXA, chacune taguée `momentDeVie` + `condition`.

### Inondation

| ID | Titre | MomentDeVie | Condition | Effort | Durée | ScoreGain |
| --- | --- | --- | --- | --- | --- | --- |
| `inondation-clapets` | Installer des clapets anti-retour | `subscription` | `maison_rdc` | high | Sur RDV | +12 |
| `inondation-circuit-electrique` | Réhausser le circuit électrique à 1,5 m | `subscription` | `maison_rdc` | high | Sur RDV | +10 |
| `inondation-zone-refuge` | Aménager une zone refuge en hauteur | `subscription` | `maison_rdc` | medium | 60 min | +6 |
| `inondation-batardeaux` | Installer des batardeaux sur les portes | `seasonal` | `maison_rdc` | medium | 30 min | +8 |
| `inondation-calfeutrer` | Calfeutrer toutes les ouvertures basses | `seasonal` | `maison_rdc` | low | 20 min | +6 |
| `inondation-produits-sensibles` | Mettre à l'abri les produits sensibles | `seasonal` | `maison_rdc` | low | 15 min | +4 |

### Dégât des Eaux

| ID | Titre | MomentDeVie | Condition | Effort | Durée | ScoreGain |
| --- | --- | --- | --- | --- | --- | --- |
| `dde-goutieres` | Nettoyer les gouttières et chéneaux | `both` | `maison` | low | 30 min | +5 |
| `dde-joints` | Entretenir les joints d'étanchéité | `subscription` | `all` | low | 20 min | +4 |
| `dde-couper-eau-vacances` | Couper l'arrivée d'eau avant une absence | `seasonal` | `all` | low | 5 min | +4 |

### Incendie

| ID | Titre | MomentDeVie | Condition | Effort | Durée | ScoreGain |
| --- | --- | --- | --- | --- | --- | --- |
| `incendie-detecteur-fumee` | Installer un détecteur de fumée à chaque étage | `subscription` | `all` | low | 15 min | +8 |
| `incendie-ramonage` | Faire ramoner les conduits de cheminée | `subscription` | `maison` | low | Sur RDV | +6 |
| `incendie-chaudiere` | Réviser la chaudière par un professionnel agréé | `subscription` | `all` | low | Sur RDV | +6 |
| `incendie-debrancher` | Débrancher les chargeurs et appareils en veille | `seasonal` | `all` | low | 5 min | +3 |
| `incendie-debroussaillage` | Débroussailler le jardin et le terrain | `seasonal` | `jardin` | medium | 120 min | +5 |

### Vol

| ID | Titre | MomentDeVie | Condition | Effort | Durée | ScoreGain |
| --- | --- | --- | --- | --- | --- | --- |
| `vol-inventaire` | Répertorier vos objets de valeur | `subscription` | `all` | medium | 60 min | +5 |
| `vol-serrure-3pts` | Installer une serrure 3 points | `subscription` | `all` | medium | Sur RDV | +8 |
| `vol-securiser-vacances` | Sécuriser le logement avant les vacances | `seasonal` | `all` | low | 15 min | +5 |
| `vol-ranger-exterieur` | Ranger les équipements extérieurs avant de partir | `seasonal` | `maison_rdc` | low | 10 min | +4 |

### RGA (Retrait Gonflement des Argiles)

| ID | Titre | MomentDeVie | Condition | Effort | Durée | ScoreGain |
| --- | --- | --- | --- | --- | --- | --- |
| `rga-trottoir` | Aménager un trottoir périphérique | `subscription` | `maison` | high | Sur RDV | +8 |
| `rga-vegetation` | Éloigner la végétation des façades | `subscription` | `maison` | medium | 60 min | +6 |
| `rga-goutieres` | Désencombrer et raccorder les gouttières (RGA) | `seasonal` | `maison` | low | 30 min | +4 |

---

### 3.4 Banque de questions diagnostiques (`src/data/diagnosticQuestions.ts`)

20 questions issues du référentiel métier AXA. Filtrées dynamiquement par `riskId` (selon `profile.mainRiskIds`) et `condition` (selon `profile.propertyCondition` + `hasGarden`). Maximum 2 questions par risque = 6 questions au total.

### Inondation (4 questions, condition : `maison_rdc`)

| ID | Question | Options (scoreImpact) |
| --- | --- | --- |
| `inondation-clapets` | Clapets anti-retours installés ? | Oui (+12) / Je ne sais pas (+3) / Non (+0) |
| `inondation-batardeaux` | Batardeaux pour calfeutrer les portes ? | Oui (+10) / Partiellement (+5) / Non (+0) |
| `inondation-obturateurs` | Systèmes pour autres ouvertures (soupiraux) ? | Oui (+8) / Pour certaines (+4) / Non (+0) |
| `inondation-electrique` | Circuit électrique relevé au-dessus de 1,5 m ? | Oui (+10) / En partie (+5) / Non (+0) |

### Dégât des Eaux (4 questions, condition : `maison` ou `all`)

| ID | Question | Options (scoreImpact) |
| --- | --- | --- |
| `dde-goutieres` | Nettoyage gouttières dans les 12 derniers mois ? | Oui (+8) / Il y a >1 an (+4) / Non (+0) |
| `dde-joints` | Joints d'étanchéité refaits dans les 5 dernières années ? | Oui (+6) / >5 ans (+3) / Non (+0) |
| `dde-detection-fuite` | Dispositif de détection de fuite ? | Oui (+8) / Je ne sais pas (+2) / Non (+0) |
| `dde-canalisation-tableau` | Canalisations à proximité du tableau électrique ? | Oui (+0) / Je ne sais pas (+2) / Non (+6) |

### Incendie (5 questions, condition : `all`, `maison`, ou `jardin`)

| ID | Question | Condition | Options (scoreImpact) |
| --- | --- | --- | --- |
| `incendie-ramonage` | Ramonage des conduits au moins 1 fois/an ? | `maison` | Oui (+6) / Pas tous les ans (+2) / Non/sans cheminée (+4) |
| `incendie-chaudiere` | Chaudière révisée annuellement ? | `all` | Oui/contrat (+6) / Pas systématiquement (+2) / Non (+3) |
| `incendie-detecteur-fumee` | Détecteur de fumée fonctionnel à chaque étage ? | `all` | Oui (+8) / Quelques pièces (+4) / Non (+0) |
| `incendie-extincteur` | Extincteur aux normes + formation ? | `all` | Oui + formé (+6) / Oui non formé (+3) / Non (+0) |
| `incendie-electricite` | Installation électrique refaite il y a <15 ans ? | `all` | Oui (+8) / Je ne sais pas (+3) / Non (+0) |
| `incendie-debroussaillage` | Jardin régulièrement débroussaillé ? | `jardin` | Oui (+5) / Parfois (+2) / Non (+0) |

### Vol (3 questions, condition : `all` ou `maison_rdc`)

| ID | Question | Condition | Options (scoreImpact) |
| --- | --- | --- | --- |
| `vol-telesurveillance` | Caméra de surveillance / télésurveillance ? | `all` | Système complet (+10) / Caméra simple (+5) / Non (+0) |
| `vol-serrure-3pts` | Serrure 3 points sur porte d'entrée ? | `all` | Oui (+8) / Je ne sais pas (+2) / Non (+0) |
| `vol-volets` | Volets fermés la nuit ? | `maison_rdc` | Oui systématiquement (+6) / Parfois (+3) / Non (+0) |

### RGA (2 questions, condition : `maison`)

| ID | Question | Options (scoreImpact) |
| --- | --- | --- |
| `rga-trottoir` | Trottoir périphérique autour de la maison ? | Oui (+8) / Partiellement (+4) / Non (+0) |
| `rga-vegetation` | Végétaux à moins de 5 m des façades ? | Oui/risque (+0) / À certains endroits (+3) / Non (+8) |

---

### 3.5 Catalogue des récompenses (`src/data/rewards.ts`)

6 récompenses du référentiel métier AXA, en 2 niveaux de priorité.

### Priorité 1 — Disponibles en production

| ID | Titre | Type | Valeur | Min actions | Scénarios | Condition | Risques liés |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `lmqc-mois` | 1 mois de garantie supplémentaire (LMQC) | `lmqc` | ~46 € offerts | 3 | subscription | all | — |
| `batardeau-offert` | Kit batardeaux co-financé par AXA | `dispositif` | Jusqu'à 150 € | 2 | subscription + seasonal | `maison_rdc` | inondation |
| `detecteur-dde-offert` | Détecteur de fuite d'eau offert | `dispositif` | ~50 € | 2 | subscription | all | degat-eaux |
| `diagnostic-offert` | 1er diagnostic prévention offert | `service_offert` | ~120 € | 1 | subscription | maison / maison_rdc | degat-eaux, tempete, inondation |

### Priorité 2 — Teasers (en cours d'étude)

| ID | Titre | Type | Valeur | Min actions | Scénarios | Condition |
| --- | --- | --- | --- | --- | --- | --- |
| `cheque-leroy-merlin` | Bon d'achat Leroy Merlin | `cheque_cadeau` | 20 € | 1 | subscription + seasonal | all |
| `taux-bonifie` | Taux bonifié sur crédit habitat AXA Banque | `cheque_cadeau` | -0,1 % | 5 | subscription | maison / maison_rdc |

> Les récompenses `teaser` sont affichées en état "En cours d'étude — Bientôt disponibles" dans l'UI, sans CTA d'activation.
> 

---

### 3.6 Catalogue des services (`src/data/services.ts`)

6 services partenaires AXA, accessibles depuis l'onglet "Services" de l'écran Solutions.

| ID | Titre | Catégorie | Coût indicatif | CTA principal |
| --- | --- | --- | --- | --- |
| `diagnostic-toiture` | Diagnostic toiture | `diagnostic` | Gratuit sur devis | Prendre rendez-vous |
| `diagnostic-etancheite` | Diagnostic étanchéité | `diagnostic` | À partir de 120 € | Demander un devis |
| `telesurveillance` | Télésurveillance AXA | `surveillance` | À partir de 19 €/mois | Voir les offres |
| `devis-equipement` | Devis équipement prévention | `devis` | Sur devis | Demander un devis |
| `artisan-partenaire` | Artisan partenaire RGE | `artisan` | Sur devis | Trouver un artisan |
| `conseiller-axa` | Accompagnement conseiller | `conseil` | Inclus dans le contrat | Prendre rendez-vous |

---

## 4. État global — AppContext

**Fichier** : `src/context/AppContext.tsx`**Pattern** : React Context + `useReducer`

### AppState

```tsx
interface AppState {
  scenario: Scenario | null           // 'subscription' | 'seasonal'
  profile: ClientProfile              // profil actif (défaut: profil-a)
  completedActionIds: string[]        // actions marquées comme réalisées
  currentScore: number                // score calculé dynamiquement
  selectedActionId: string | null     // action sélectionnée pour ActionDetail
  lastUnlockedRewardId: string | null // récompense fraîchement débloquée (pour le toast)
}
```

### Actions du reducer

| Action | Payload | Effet |
| --- | --- | --- |
| `SET_SCENARIO` | `Scenario` | Met à jour le scénario actif |
| `SET_PROFILE` | `ProfileId` | Change de profil, recalcule le score, réinitialise le toast |
| `COMPLETE_ACTION` | `string` (actionId) | Ajoute l'action aux complétées, recalcule le score, détecte une nouvelle récompense débloquée |
| `SET_SELECTED_ACTION` | `string \| null` | Pointe l'action à afficher dans ActionDetail |
| `CLEAR_REWARD_NOTIFICATION` | — | Efface le `lastUnlockedRewardId` (fermeture du toast) |

### Calcul du score

```
score = profile.preparationScore
      + Σ action.scoreGain  (pour chaque actionId dans completedActionIds
                             NON présent dans profile.completedActionIds)
score = min(score, 100)
```

### Seuils de scoreLevel

| Valeur | Niveau |
| --- | --- |
| score < 45 | `weak` |
| 45 ≤ score < 70 | `average` |
| score ≥ 70 | `good` |

### Computed values exposés par le contexte

| Propriété | Type | Description |
| --- | --- | --- |
| `scoreLevel` | `'weak' \| 'average' \| 'good'` | Niveau du score actuel |
| `eligibleRewards` | `(Reward & { computedStatus })[]` | Récompenses filtrées + statut calculé |
| `unlockedRewardsCount` | `number` | Nombre de récompenses au statut `unlocked` |
| `isActionDone(id)` | `(id: string) => boolean` | Test si une action est dans `completedActionIds` |

### Détection de récompense débloquée

Au moment de `COMPLETE_ACTION`, la fonction `findNewlyUnlockedReward` parcourt toutes les récompenses non-teaser et vérifie si `completedCount === reward.minActionsRequired` — c'est-à-dire si **cette action précise** vient d'atteindre le seuil. Si oui, `lastUnlockedRewardId` est mis à jour, déclenchant le toast dans `SuccessScreen`.

---

## 5. Cinématique complète — 15 écrans

### Vue d'ensemble des routes

```
/                      ScenarioSelection
/landing-subscription  LandingSubscription
/landing-seasonal      LandingSeasonal
/diagnostic            Diagnostic
/diagnostic-result     DiagnosticResult
/risks                 MyRisks
/projection            RiskProjection
/action-plan           ActionPlan
/action-detail         ActionDetail
/success               SuccessScreen
/solutions             Solutions
/my-progress           MyProgress
/prevention-report     PreventionReport
/agent-view            AgentView
/empty-state           EmptyState
```

### Diagramme de navigation

```
ScenarioSelection (/)
  ├── [subscription] → LandingSubscription
  │     ├── [CTA principal] → Diagnostic
  │     └── [Plus tard] → EmptyState
  ├── [seasonal] → LandingSeasonal
  │     ├── [CTA principal] → Diagnostic
  │     └── [secondaire] → MyRisks
  └── [lien] → AgentView

Diagnostic (/diagnostic)
  └── [dernier step] → DiagnosticResult

DiagnosticResult (/diagnostic-result)
  ├── [CTA principal] → MyRisks
  └── [secondaire] → ActionPlan

MyRisks (/risks)
  ├── [CTA principal] → RiskProjection
  └── [secondaire] → ActionPlan

RiskProjection (/projection)
  └── [CTA principal] → ActionPlan

ActionPlan (/action-plan)
  ├── [card récompense] → Solutions
  ├── [ActionCard → onViewDetail] → ActionDetail
  ├── [Nav] → MyProgress
  └── [Nav] → Solutions

ActionDetail (/action-detail)
  ├── [Je l'ai fait ✓] → SuccessScreen  (+ completeAction)
  ├── [Être aidé] → Solutions
  └── [← Plan d'action] → ActionPlan

SuccessScreen (/success)
  ├── [Voir mon suivi] → MyProgress
  ├── [Voir la prochaine action] → ActionPlan
  ├── [Activer mes récompenses] → Solutions
  └── [Continuer] → ActionPlan

Solutions (/solutions)
  └── (retour navigateur)

MyProgress (/my-progress)
  ├── [ActionCard dans kanban] → ActionDetail
  ├── [Voir mon bilan] → PreventionReport
  └── [Faire une autre action] → ActionPlan

PreventionReport (/prevention-report)
  ├── [Poursuivre ma prévention] → ActionPlan
  ├── [Partager avec mon conseiller] → AgentView
  └── [Retour à l'accueil] → ScenarioSelection

AgentView (/agent-view)
  └── [← Retour à l'accueil] → ScenarioSelection

EmptyState (/empty-state)
  ├── [si hasStarted] Reprendre → ActionPlan
  ├── [si hasStarted] Voir mes priorités → MyProgress
  ├── [si non démarré] Commencer → ScenarioSelection
  └── [si non démarré] Choisir un parcours → ScenarioSelection
```

---

### Écran 1 — ScenarioSelection (`/`)

**Rôle** : Point d'entrée unique — sélection du profil de démonstration et du parcours.

**Contenu** :

- Hero : logo AXA, titre "Coach Prévention MRH", description
- Sélecteur de parcours (cards radio) : Souscription 🏠 / Saisonnalité 🌧️
- Sélecteur de profil (liste) : Marie / Thomas / Sophie
- CTA "Commencer →" désactivé tant qu'aucun scénario n'est sélectionné
- Lien texte vers `/agent-view`

**État mis à jour** : `SET_PROFILE` + `SET_SCENARIO` → navigation conditionnelle

---

### Écran 2 — LandingSubscription (`/landing-subscription`)

**Rôle** : Page d'accueil du parcours Souscription — donner envie de commencer.

**Contenu** :

- Bannière bleue "Souscription" + score de protection
- Données déjà connues du profil (type de bien, zone)
- 3 promesses visuelles (diagnostic, plan, récompenses)
- CTA principal → `/diagnostic`
- Lien "Peut-être plus tard" → `/empty-state`

---

### Écran 3 — LandingSeasonal (`/landing-seasonal`)

**Rôle** : Page d'accueil du parcours Saisonnalité — contextualisation urgente.

**Contenu** :

- Bannière orange "Saisonnalité" + contexte local
- Alerte risque saison (ex: tempêtes automne-hiver)
- Zone géographique du profil
- CTA principal → `/diagnostic`
- CTA secondaire "Voir mes risques" → `/risks`

---

### Écran 4 — Diagnostic (`/diagnostic`)

**Rôle** : Questionnaire express personnalisé — 2 minutes — max 6 questions.

**Logique de filtrage** :

```
questions = getQuestionsForProfile(profile, maxPerRisk=2)
→ filtre par riskId ∈ profile.mainRiskIds
→ filtre par condition ∈ getEligibleConditions(profile)
→ max 2 questions par risque
```

**Contenu** :

- Header : "Diagnostic express" + badge "⏱ 2 min" + Stepper (X/N)
- Badge contexte risque (icône + label + 75 chars d'explication)
- Bloc "Déjà connu sur votre logement" (step 0 uniquement) : type de bien, statut, zone
- Question card : texte + radio-buttons (3 options)
    - Si option sélectionnée avec `scoreImpact > 0` → badge vert "+X pts"
- Sticky footer : "← Retour" + "Question suivante →" / "Voir mon résultat →"

**Navigation** :

- Back sur step 0 → `navigate(-1)`
- Back sur step > 0 → step précédent
- Last step → `/diagnostic-result`

---

### Écran 5 — DiagnosticResult (`/diagnostic-result`)

**Rôle** : Résultat du diagnostic — score initial + risques exposés.

**Contenu** :

- ScoreRing + score sur 100
- Message contextuel selon `scoreLevel` (weak / average / good)
- Liste des risques principaux avec `RiskBadge` (niveau de criticité)
- CTA principal "Voir mes risques →" → `/risks`
- CTA secondaire "Voir mon plan d'action" → `/action-plan`

---

### Écran 6 — MyRisks (`/risks`)

**Rôle** : Vue complète des risques du profil — éducation et contexte.

**Contenu** :

- Liste de `RiskCard` pour chaque `riskId` dans `profile.mainRiskIds`
- Chaque RiskCard : icône, label, niveau, explanation, possibleDamages, avoidablePercent
- CTA principal "Voir la projection →" → `/projection`
- CTA secondaire "Mon plan d'action" → `/action-plan`

---

### Écran 7 — RiskProjection (`/projection`)

**Rôle** : Impact chiffré du risque principal — donner conscience de l'enjeu.

**Contenu** :

- Risque principal du profil (icône + label + explanation)
- Statistiques : 1 logement sur 3 touché chaque année, `avoidablePercent`% évitable
- Liste des dommages potentiels évitables
- CTA "Créer mon plan de prévention →" → `/action-plan`

---

### Écran 8 — ActionPlan (`/action-plan`)

**Rôle** : Plan d'actions priorisées, personnalisé par scénario et type de logement.

**Filtrage** :

```
actions = getActionsForProfile({
  recommendedActionIds: profile.recommendedActionIds,
  scenario,
  propertyCondition: profile.propertyCondition,
  hasGarden: profile.hasGarden
})
```

**Contenu** :

- Header : titre + label scénario coloré (bleu=souscription, orange=saisonnalité) + ScoreRing
- Teaser récompense disponible (cliquable → `/solutions`) :
    - Affiche la meilleure récompense `available + priority=1` ou la première `unlocked`
    - Couleur verte si unlocked, bleue si available
- Section "À faire maintenant" (actions `timeHorizon === 'now'`) : badge rouge "Ce week-end"
- Section "À faire ce mois-ci" (actions `timeHorizon === 'this_month'`)
- Chaque `ActionCard` : titre, effort, durée, scoreGain, statut ✓ si done
    - `onViewDetail` → `setSelectedAction(id)` + navigate `/action-detail`
- Progress bar (done/total)
- Nav → `/my-progress`, `/solutions`

---

### Écran 9 — ActionDetail (`/action-detail`)

**Rôle** : Détail d'une action — mode d'emploi complet avec conseil officiel AXA.

**Contenu** :

- Titre + chips : effort (vert/orange/gris), durée, momentDeVie
- Chips risques associés (icône + label)
- **Bloc "Conseil AXA"** (bleu) : texte officiel `conseilText` en italique avec bouclier 🛡️
- Bloc "Pourquoi c'est utile" : `benefit`
- **Étapes numérotées** : `action.steps[]` avec pastilles bleues numérotées
- Bloc "Conseil pratique" (vert) : `action.tips` si présent
- Bloc bénéfice score : "+X pts"
- **Sticky footer** :
    - Si non réalisée : "Je l'ai fait ✓" → `completeAction(id)` + navigate `/success`
    - Si déjà réalisée : indicateur ✓ vert
    - Boutons secondaires : "Être aidé" → `/solutions` | "← Plan d'action" → `/action-plan`

---

### Écran 10 — SuccessScreen (`/success`)

**Rôle** : Célébration et feedback immédiat après une action réalisée.

**Contenu** :

- Icône ✅ célébration + titre "Bravo !"
- **Before/After ScoreRing** : score avant → score après + badge "+X pts"
- Card action réalisée (fond vert) : titre + `conseilText`
- **Section récompenses débloquées** (si applicable) : liste de `RewardCard` + CTA "Activer mes récompenses"
- Message motivationnel
- Card "Action suivante suggérée" (bleu) : prochaine action non complétée
- CTAs : "Voir mon suivi →", "Voir la prochaine action", "Continuer"
- **`RewardUnlockedToast`** (floating, coin bas-gauche) : si `lastUnlockedRewardId` → toast avec icône récompense, titre, valeur, bouton "Fermer"

---

### Écran 11 — Solutions (`/solutions`)

**Rôle** : Hub de ressources — récompenses à activer + services partenaires.

**Contenu** :

- Tabs "🏆 Récompenses" / "🔧 Services"
    - Tab Récompenses : badge count vert si `unlockedRewardsCount > 0`

**Tab Récompenses** :

- Section "Priorité 1 — Disponibles dès maintenant" : `RewardCard` pour chaque reward P1 eligible
    - Statuts visuels : locked (gris), available (bleu), unlocked (vert + CTA "Activer")
    - Feedback "✓ Demande envoyée — vous serez contacté sous 48h" après click
- Section "En cours d'étude — Bientôt disponibles" : rewards P2 teaser (chip "Bientôt")
- Guide "Comment ça marche" : 3 étapes numérotées

**Tab Services** :

- Section "Services recommandés" : 3 premiers services (ServiceCard)
- Section "Tutoriels et conseils" : 4 tutoriels mock (vidéo/PDF)
- Section "Aides et accompagnement" : services restants
- Card conseiller AXA : "Parler à un conseiller" / "Être rappelé"

---

### Écran 12 — MyProgress (`/my-progress`)

**Rôle** : Tableau de bord de progression — vue synthétique des actions.

**Contenu** :

- Card score : score numérique + ProgressBar + ScoreRing + delta "+X pts" depuis le départ
- Card progression actions : ratio fait/total + ProgressBar verte
- **Kanban 2 colonnes** :
    - "À faire" : cards cliquables → `setSelectedAction(id)` + `/action-detail`
    - "Fait ✓" : cards vertes
- **Timeline historique** : actions réalisées, chrono, points gagnés ("Aujourd'hui")
- Card rappel saisonnier (orange) : message "Prochain rappel utile"
- CTAs : "Voir mon bilan →" `/prevention-report` | "Faire une autre action" `/action-plan`

---

### Écran 13 — PreventionReport (`/prevention-report`)

**Rôle** : Bilan prévention synthétique — résumé partageable avec le conseiller.

**Contenu** :

- Before/After ScoreRing : score initial → score actuel + delta vert
- Card message contextuel selon `scoreLevel` (fond vert/orange/rouge)
- **Grille stats 3 colonnes** : Actions réalisées / Score actuel / Points gagnés
- **Couverture par risque** : pour chaque risque du profil, icône + label + `RiskBadge` + `ProgressBar` (40 % si high, 60 % si medium, 80 % si low)
- Card "Prochaine étape recommandée" : prochaine action non réalisée + CTA "Voir comment faire →"
- CTAs : "Poursuivre ma prévention →" `/action-plan` | "Partager avec mon conseiller" `/agent-view` | "Retour à l'accueil" `/`

---

### Écran 14 — AgentView (`/agent-view`)

**Rôle** : Vue miroir agent AXA — préparer un entretien conseiller.

**Contenu** :

- **Header client** (card dark `slate-800`) : prénom, scénario, type de bien, localisation, zone, ScoreRing
- Indicateur statut client : `engaged` (vert) ou `started` (orange) selon `completedActionIds.length`
- **Top 3 risques** : icône + label + `RiskBadge` par risque
- **Dernières actions réalisées** (3 max) : liste verte avec titre + score gagné
- **Script de prise de parole** (card bleue) : texte contextuel selon statut
    - `never` (non déclenché dans le proto) : "Vous n'avez pas encore fait votre diagnostic…"
    - `started` : "Vous avez commencé votre diagnostic…"
    - `engaged` : "Vous avez déjà engagé une première action — bravo…"
- **Contexte zone local** : texte de comparaison à la moyenne zone (55/100)
- **Récompenses débloquées** (si applicable) : `RewardCard` en mode compact
- Actions agent : "Préparer un appel" / "Envoyer un récapitulatif" / "Proposer un RDV" (mock — sans action)
- Retour à l'accueil → `/`

---

### Écran 15 — EmptyState (`/empty-state`)

**Rôle** : Écran de reprise ou de démarrage — pour les utilisateurs en attente.

**Comportement conditionnel** :

- `hasStarted = completedActionIds.length > 0 || scenario !== null`

**Si hasStarted** :

- Titre "Reprenez là où vous vous êtes arrêté"
- Card profil : prénom, localisation, nombre d'actions, score actuel
- CTAs : "Reprendre →" `/action-plan` | "Voir mes priorités" `/my-progress`

**Si non démarré** :

- Titre "Commencez votre prévention"
- CTAs : "Commencer →" `/` | "Choisir un parcours" `/`

**Tips communs** : ⚡ 2–5 min par action / 📊 Score évolue à chaque action / 🔔 Rappels saisonniers

---

## 6. Règles métier

### 6.1 Filtrage des actions

```tsx
function getActionsForProfile(opts: {
  recommendedActionIds: string[]
  scenario: 'subscription' | 'seasonal'
  propertyCondition: 'all' | 'maison' | 'maison_rdc' | 'jardin'
  hasGarden: boolean
}): Action[]

// Construction du tableau de conditions éligibles :
eligible = ['all']
if propertyCondition === 'maison'     → eligible += ['maison', 'maison_rdc']
if propertyCondition === 'maison_rdc' → eligible += ['maison_rdc']
if hasGarden                          → eligible += ['jardin']

// Filtre appliqué :
(action.momentDeVie === scenario || action.momentDeVie === 'both')
&& eligible.includes(action.condition)
```

### 6.2 Filtrage des questions diagnostiques

```tsx
function getQuestionsForProfile(
  profile: { propertyCondition, hasGarden, mainRiskIds },
  maxPerRisk = 2
): DiagnosticQuestion[]

// Pour chaque riskId dans profile.mainRiskIds :
//   → filtre questions par riskId + condition ∈ eligible
//   → slice(0, maxPerRisk)
// Total max : mainRiskIds.length × maxPerRisk (= 3 × 2 = 6)
```

### 6.3 Scoring

```
score_final = profile.preparationScore
            + Σ { action.scoreGain | action.id ∈ completedActionIds
                                   AND action.id ∉ profile.completedActionIds }
score_final = min(score_final, 100)

scoreLevel :
  score < 45  → 'weak'
  score < 70  → 'average'
  score ≥ 70  → 'good'
```

### 6.4 Calcul du statut des récompenses

```tsx
function computeRewardStatus(
  reward: Reward,
  completedActionCount: number,
  completedActionIds: string[],
  scenario: Scenario,
  propertyCondition: PropertyCondition
): 'locked' | 'available' | 'teaser' | 'unlocked'

// Règles (ordre de priorité) :
1. reward.status === 'teaser'                          → return 'teaser'
2. !reward.eligibleScenarios.includes(scenario)         → return 'locked'
3. !reward.eligibleConditions ∩ eligible               → return 'locked'
4. completedActionCount >= reward.minActionsRequired   → return 'unlocked'
5. sinon                                               → return 'available'
```

### 6.5 Détection de déclenchement du toast

```tsx
// Dans COMPLETE_ACTION reducer :
newlyUnlocked = reward où :
  reward.status !== 'teaser'
  && computedStatus === 'unlocked'
  && completedCount === reward.minActionsRequired  // exactement au seuil

→ lastUnlockedRewardId = reward.id
// → SuccessScreen affiche RewardUnlockedToast
// → clearRewardNotification() efface l'état après fermeture
```

### 6.6 Filtrage des récompenses éligibles

```tsx
// eligibleRewards (computed dans AppContext) :
rewards
  .filter(r => {
    okScenario  = r.eligibleScenarios.includes(scenario)
    okCondition = r.eligibleConditions ∩ eligible !== ∅
    okRisk      = r.relatedRiskIds.length === 0
                  || r.relatedRiskIds ∩ profile.mainRiskIds !== ∅
    return okScenario && okCondition && okRisk
  })
  .map(r => ({ ...r, computedStatus: computeRewardStatus(...) }))
```

---

## 7. Design System

### Palette de couleurs

| Token | Valeur | Usage |
| --- | --- | --- |
| `axa-blue` | `#00008F` | Couleur primaire AXA — boutons, accents, score ring |
| `axa-blue-muted` | bleu très clair (`#F0F0FF` approx.) | Fonds de cards d'information, blocs conseil |
| `green-500/600` | vert succès | Actions réalisées, récompenses débloquées, toast |
| `orange-400/600` | orange alerte | Scénario saisonnalité, urgence modérée |
| `red-500/600` | rouge danger | Risque high, urgence immédiate |
| `slate-800` | fond sombre | Header card AgentView |

### Composants UI (`src/components/ui/`)

| Composant | Variantes | Usage |
| --- | --- | --- |
| `Button` | `primary`, `secondary`, `ghost` · sizes: `sm`, `md`, `lg` · `fullWidth` | Tous les CTA |
| `Card` | `border`, `padding` (`sm`/`md`/`lg`), `hover`, `selected` | Conteneurs de contenu |
| `Badge` · `RiskBadge` | levels: `high`/`medium`/`low` · sizes: `sm`/`md` | Niveau de risque |
| `Chip` | variants: `green`, `orange`, `blue`, `default` | Tags métadonnées d'action |
| `ScoreRing` | sizes: `56`, `64`, `80` px | Visualisation score SVG |
| `ProgressBar` | `value`, `max`, `color`, `showPercent` | Barre de progression |
| `Stepper` | `current`, `total` | Progression du diagnostic |
| `ActionCard` | — | Card action avec effort, durée, score, status done |
| `RiskCard` | — | Card risque avec explication, dommages, % évitable |
| `ServiceCard` | — | Card service partenaire avec CTA |
| `RewardCard` | `compact` | Card récompense avec statut visuel et CTA activation |
| `RewardUnlockedToast` | — | Notification flottante bas de page au déverrouillage |
| `Banner` | `seasonal`, `subscription` | Bannière d'en-tête de landing pages |

### Layout

- **Mobile-first** : `max-w-lg mx-auto` centré, padding horizontal `px-4`
- **Header fixe** : `Layout` component avec titre + back button optionnel + flag `agentView`
- **Sticky footer** sur `Diagnostic`, `ActionDetail`, `SuccessScreen` (fixed bottom-0)
- **Fond** : blanc `bg-white`, gradient bleu sur `ScenarioSelection`
- **Typographie** : `font-sans` (Inter/system), hiérarchie : bold 2xl titres H1, sm/xs corps

---

## 8. Structure technique

### Arborescence du projet

```
user-prompt-doc/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── src/
│   ├── App.tsx                       # Routing (15 routes)
│   ├── main.tsx
│   ├── types/
│   │   └── index.ts                  # Tous les types TypeScript
│   ├── data/
│   │   ├── profiles.ts               # 3 profils mock
│   │   ├── risks.ts                  # 6 risques
│   │   ├── actions.ts                # ~25 actions + getActionsForProfile()
│   │   ├── diagnosticQuestions.ts    # 20 questions + getQuestionsForProfile()
│   │   ├── rewards.ts                # 6 récompenses + computeRewardStatus()
│   │   └── services.ts               # 6 services
│   ├── context/
│   │   └── AppContext.tsx            # State global useReducer + computed
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.tsx
│   │   │   └── Header.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx             # RiskBadge + Chip
│   │       ├── ScoreRing.tsx
│   │       ├── ProgressBar.tsx       # ProgressBar + Stepper
│   │       ├── ActionCard.tsx
│   │       ├── RiskCard.tsx
│   │       ├── ServiceCard.tsx
│   │       ├── RewardCard.tsx        # RewardCard + RewardUnlockedToast
│   │       └── Banner.tsx
│   └── screens/
│       ├── ScenarioSelection.tsx
│       ├── LandingSubscription.tsx
│       ├── LandingSeasonal.tsx
│       ├── Diagnostic.tsx
│       ├── DiagnosticResult.tsx
│       ├── MyRisks.tsx
│       ├── RiskProjection.tsx
│       ├── ActionPlan.tsx
│       ├── ActionDetail.tsx
│       ├── SuccessScreen.tsx
│       ├── Solutions.tsx
│       ├── MyProgress.tsx
│       ├── PreventionReport.tsx
│       ├── AgentView.tsx
│       └── EmptyState.tsx
```

### Stack technique

| Technologie | Version | Usage |
| --- | --- | --- |
| React | 18 | Framework UI |
| TypeScript | 5 | Typage statique |
| Vite | 5 | Build tool + dev server (port 5174) |
| React Router | 6 | SPA routing (15 routes) |
| Tailwind CSS | 3 | Utility-first styling |
| Path alias | `@/` → `src/` | Imports propres |

### Données et persistance

- **Toutes les données sont en mémoire** — aucune persistance entre sessions
- **Pas d'API** — toutes les données sont mockées en TypeScript
- **Pas d'authentification** — sélection du profil en démo à l'entrée
- **État réinitialisé** au rechargement de page

---

## 9. Axes d'évolution

### Fonctionnalités hors MVP

| Priorité | Fonctionnalité | Commentaire |
| --- | --- | --- |
| P0 | Authentification réelle | Connexion avec espace client AXA (SSO) |
| P0 | Persistance des actions | LocalStorage ou API back-end |
| P1 | Deep link espace client | Intégration dans l'app AXA existante |
| P1 | Notifications push saisonnières | Rappels automatiques avant automne-hiver |
| P1 | Workflow activation récompenses | Back-office agent pour validation et déclenchement |
| P1 | API géolocalisation risques | Contextualisation réelle par commune (Géorisques, BRGM) |
| P2 | Devis en ligne intégrés | Connexion API partenaires artisans |
| P2 | Score multi-risque détaillé | Détail par risque (ex: score inondation 40/100) |
| P2 | Historique temporel | Graphe d'évolution du score dans le temps |
| P2 | Mode agent avancé | CRM intégré, suivi portefeuille clients |
| P3 | Gamification avancée | Badges, paliers, tableau de bord collectif |
| P3 | Mode PDF / partage | Export du bilan prévention en PDF |

### Contraintes techniques identifiées

- Le filtrage des récompenses doit être centralisé côté serveur pour éviter la manipulation côté client
- Le `preparationScore` initial sera calculé par une API à partir du dossier client (données souscription)
- Les questions diagnostiques devront évoluer selon les données GEORISQUES en temps réel
- Le catalogue de CONSEILS AXA (`conseilText`) doit être versionné et maintenu par les équipes métier

---

*Ce document a été généré par rétrodocumentation du prototype fonctionnel Coach Prévention MRH.Prototype disponible sur [http://localhost:5174](http://localhost:5174/) — Vite + React + TypeScript*