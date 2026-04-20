# PRD — Coach Prévention MRH V3 (As-Built)

**Version** 3.0 · **Date** 20 avril 2026 · **Statut** Prototype en ligne
**Commit référence** `95585a2` · **Auteur** Équipe Innovation AXA
**URL prod** https://coach-prevention-mrh.vercel.app/preview.html

> Ce document décrit **le prototype tel qu'implémenté et déployé**. Pour le document de cadrage amont, voir `PRD_Coach_Prevention_MRH_V3.md`.

---

## 1. Vision & pivot V3

**Pitch** — Un parcours prévention dans l'app AXA qui transforme la MRH d'un contrat passif en un compagnon actif : je comprends mes risques, je passe à l'action, je suis récompensé.

**Changements clés vs V2**
- Architecture refondée **autour du Hub** : deux onglets partagent le même header (« Mes risques » / « Mes Actions »)
- Écrans « Plan » (S5) et « Actions » (S6) **dépréciés** → redirigent vers le Hub onglet Actions
- Refonte S6 **inspirée d'ALAN** : 1 défi hero + quiz + catégories de risques + boosts de points
- **Points rééquilibrés** : actions de 20 à 150 pts (vs 3–12 en V2), quiz 5 pts
- **Bilan prévention téléchargeable** depuis Mes risques
- **Jauge points cumulés** déplacée dans l'écran Récompenses

---

## 2. Stack & architecture

| Couche | Choix |
|---|---|
| Runtime | Vanilla JS — pas de framework |
| Bundling | `build-preview.sh` → concatène CSS + HTML + JS dans `preview.html` (~266 Ko) |
| État global | `window._ST` (profileId, hubTab, diagAnswers, completedActions, points, selectedAction…) |
| Router | `render(idx)` dispatch sur `SCREENS['s' + idx]` |
| Persistence | Aucune (demo) — reset au refresh |
| Déploiement | Vercel, branche `main` auto-déploiement, duplication dans `coach-prevention-axa/` (rootDir du projet) |

**Arborescence**
```
/
├── index.html           ← version non-bundlée (dev local)
├── preview.html         ← bundle de démo (servi en prod)
├── css/                 ← tokens / base / components / screens / animations
├── js/
│   ├── data.js          (921 l.)  profils, risques, actions, récompenses, défis
│   ├── screens.js       (1 247 l.) 10 écrans + bottom sheets
│   └── app.js           (495 l.)   state, nav, handlers
├── assets/              images ALAN, logos, icônes SVG
└── coach-prevention-axa/  ← miroir synchronisé (contrainte Vercel rootDir)
```

---

## 3. Utilisateurs & profils démo

5 profils démonstratifs couvrent les grands archétypes MRH :

| ID | Prénom | Logement | Ville | Scénario | Risques principaux |
|---|---|---|---|---|---|
| `profil-a` | Marie 👩 | Maison propriétaire | Nantes (44) | Saisonnalité | Inondation · Tempête · DDE |
| `profil-b` | Thomas 👨 | Appart locataire | Paris 15e | Souscription | Vol · DDE · Incendie |
| `profil-c` | Sophie 👩 | Maison propriétaire | Lyon 3e | Souscription | Incendie · DDE · RGA |
| `profil-d` | Lucas 🧑 | Appart copro propriétaire | Bordeaux Centre | Souscription | DDE · Vol · Incendie |
| `profil-e` | Camille 👩 | Maison propriétaire | Marseille 9e | Saisonnalité | Incendie · RGA · Tempête |

Chaque profil expose :
- `exposureScore` / `preparationScore` 0–100
- `riskExposure` par risque : `zoneLevel` (1 des 5 niveaux) + `canImprove`
- `contract` : nom + référence MRH AXA
- `localContext` : zone Géorisques, PCS, événement récent + stats sinistres + témoignage terrain
- `coverage` : par risque, status (covered / partial / not-covered) + plafond + franchise + article CG + note explicative

---

## 4. Modèle de risques (5 niveaux)

```
tres_eleve → eleve → modere → faible → tres_faible
    5         4        3        2         1
```

6 risques documentés (icône · libellé · % évitable · saison) :

| ID | Libellé | Icône | % évitable | Saison |
|---|---|---|---|---|
| `inondation` | Inondation | 🌊 | 60 % | automne-hiver |
| `tempete` | Tempête | 🌪️ | 70 % | automne-hiver |
| `degat-eaux` | Dégât des eaux | 💧 | 75 % | — |
| `vol` | Vol | 🔐 | 65 % | — |
| `incendie` | Incendie | 🔥 | 80 % | été |
| `rga` | Retrait-gonflement argiles | 🏚️ | 55 % | été |

Ajustement dynamique post-diagnostic : `getRiskLevels()` → si ≥ 2 réponses « oui », le niveau s'améliore d'un cran ; si ≥ 2 « non », il se dégrade.

---

## 5. Catalogue d'actions

**22 actions** dans `ALL_ACTIONS` réparties sur les 6 risques.

Chaque action : `riskId`, `horizon` (`now` | `this_month`), `momentDeVie` (`seasonal` | `subscription` | `both`), `condition` (`all` | `maison` | `maison_rdc`), `effort` (`low` | `medium` | `high`), `duration`, `benefit`, `pts`, `steps[]`, `tags[]`, `proof` optionnel, `requiresOwner` optionnel.

**Barème de points** (V3 rééquilibré) :
- Geste simple / gratuit : 20–30 pts
- Contrôle annuel / petit achat : 40 pts
- Équipement installé (détecteur, joints) : 60 pts
- Travaux significatifs (électrique réhaussé) : 100 pts
- Gros œuvre (clapets anti-retour, réseau) : 150 pts

**Filtrage** `getActionsForProfile()` :
1. Match profil.mainRisks
2. Match condition logement (all/maison/maison_rdc)
3. Match momentDeVie (scenario) ou `both`
4. Non déjà faites (`completedActions` + déduites du diagnostic via `QUESTION_ACTION_MAP`)
5. Tri : pour locataires, `requiresOwner` en fin ; sinon `horizon=now` d'abord, puis `pts` décroissant

---

## 6. Catalogue récompenses (7)

| ID | Récompense | Valeur | minActions | Status initial |
|---|---|---|---|---|
| `lmqc-mois` | 1 mois MRH offert | ~46 € | 3 | available |
| `batardeau-offert` | Kit batardeaux co-financé | ≤150 € | 2 | available |
| `detecteur-dde` | Détecteur fuite offert | ~50 € | 2 | available |
| `diagnostic-offert` | 1er diagnostic expert offert | ~120 € | 1 | available |
| `cheque-leroy-merlin` | Bon Leroy Merlin | 20 € | 1 | teaser |
| `taux-bonifie` | Taux bonifié crédit travaux | –0,1 % | 5 | teaser |
| `kit-prevention-saisonnier` | Kit saisonnier offert | ~80 € | 2 | available |

`getRewardsForProfile()` filtre par `scenario` et `condition`, puis passe de `available` → `unlocked` dès que `completedCount >= minActions`.

---

## 7. Défi du moment

Format gamifié mensuel inspiré d'ALAN. Un seul défi actif à la fois.

**Actuel (avril 2026)**
- **Titre** : Photographiez 3 pièces de votre logement
- **Sous-titre** : En cas de sinistre, ça vaut de l'or
- **Points** : 150
- **Lot** : « Lots exclusifs à gagner » (générique)
- **Expire** : 01/05/2026
- **Preuve** : Upload de 3 photos (salon, cuisine, chambre)

Rendu dans le Hub Actions en carte hero gradient doré, countdown dynamique, titre « 🔥 Défi du moment · Avril 2026 ». Tap → S7 en mode défi (header doré + bloc lot).

---

## 8. Diagnostic

**20 questions** organisées en `ALL_QUESTIONS`, filtrées par risque × condition logement. `getQuestionsForProfile()` sélectionne 2 questions par risque du profil.

Chaque question :
- 3 options : `yes` (pts max) / `partial` (pts intermédiaires) / `no` (0 ou inversé si la question est négative)
- `hint` optionnel (bulle d'aide)

**QUESTION_ACTION_MAP** : 12 questions sont liées à une action du catalogue. Si l'utilisateur répond avec la valeur `triggerOnAnswer`, l'action correspondante est marquée comme déjà faite et retirée du TODO.

---

## 9. Inventaire des écrans

| # | Fonction | Rôle | Notes |
|---|---|---|---|
| **S0** | `screenSelection` | Choix de profil (5 cartes) | Point d'entrée |
| **S1** | `screenHub` | Hub avec 2 onglets partagés | header AXA bleu + badge points |
| **S2** | `screenDiagnostic` | Parcours question par question | ~6–8 questions selon profil |
| **S3** | `screenRisques` | Synthèse post-diag | réutilise `hubRisquesTab` |
| **S4** | `screenDeepDive` | Détail d'un risque + couverture | CTA « Voir mes actions » → `openCategoryModal` |
| **S5** | `screenPlan` | ⚠️ **Déprécié** | stub qui redirige vers S1 onglet Actions |
| **S6** | `screenActions` | ⚠️ **Déprécié** | idem |
| **S7** | `screenDetailAction` | Détail action OU défi | auto-branche sur `selectedDefi` vs `selectedAction` |
| **S8** | `screenRewards` | Récompenses + jauge points cumulés | bouton retour |
| **S9** | `screenHistorique` | Historique des diagnostics | horodatage des passages |

### 9.1 Hub (S1)
- Header AXA bleu avec avatar profil, points, icône 🎁 vers S8
- Switch d'onglets `Mes risques` / `Mes Actions` (lock 🔒 tant que diagnostic non fait)
- Onglet sélectionné stocké dans `_ST.hubTab`

### 9.2 Onglet « Mes risques » (`hubRisquesTab`)
- Score de préparation (jauge circulaire)
- Note d'impact post-diag discrète
- Liste des risques du profil avec niveau coloré
- Bouton « Télécharger mon bilan prévention » si diagCompleted
- Modal « Comment est-ce calculé ? »

### 9.3 Onglet « Mes Actions » (`hubActionsTab`)
Ordre vertical :
1. **🔥 Défi du moment — Avril 2026** (titre + carte hero doré)
2. **🧠 Quiz de la semaine** (+5 pts, mock)
3. **🎯 Actions par catégorie** : 2–3 cartes selon `profile.mainRisks`. Chacune affiche `verb + phrase + nb actions + pts à gagner`. Tap → bottom sheet catégorie (`openCategoryModal`)
4. **⚡ Gagner plus de points** : Faire/Refaire mon diagnostic, Ajouter une photo, Inviter un proche, Compléter mon profil
5. **✓ Actions faites** : liste cliquable (revoir le détail)
6. CTA « Voir mes récompenses »

### 9.4 Bottom sheet catégorie (`openCategoryModal`)
- Slide-up depuis le bas, contenu à l'intérieur du `.device` (position:absolute, z-index:400)
- Header : icône XL + verbe + phrase + sous-titre (nb actions · pts total)
- Liste `actionCard()` filtrée par risque
- Tap item → ferme la sheet + `openAction(id)` → S7

### 9.5 Détail S7
- Deux modes auto-détectés :
  - **Action standard** : header AXA bleu, bénéfice, étapes, tutos + services
  - **Défi** : header gradient doré, bloc lot, countdown `expiresAt`, steps spécifiques
- Bouton retour « ← Mes Actions » (revient au Hub tab actions, pas à l'écran plan déprécié)
- CTA principal « Marquer comme fait » → `completeAction()` → toast + retour Hub Actions + points crédités

### 9.6 Récompenses S8
- Bouton retour en header
- **Carte jauge gradient AXA** : Points cumulés · Actions réalisées · Barre de progression vers la prochaine récompense
- Liste des récompenses (unlocked / available avec minActions / teaser)

---

## 10. Navigation & états

```
            ┌─────────────┐
            │  S0 Profil  │
            └──────┬──────┘
                   ▼
         ┌─────────────────────┐
         │    S1 HUB           │
         │  [Risques][Actions] │───► S8 Récompenses (header 🎁)
         └───┬─────┬────┬──────┘
             │     │    │
             ▼     ▼    ▼
           S2    (tab   (tab
         Diag  Risques  Actions)
           │    │        │
           ▼    ▼        ▼
          S3   S4     bottomsheet
                │      catégorie
                ▼        │
              S4 Deep    ▼
                dive    S7 Détail
                        action/défi
                           │
                           ▼
                    completeAction → retour S1 tab Actions
```

**État `_ST` clé**
```js
{
  profileId, hubTab: 'risques'|'actions',
  diagCompleted, diagAnswers, diagHistory,
  completedActions: [actionId...], points,
  selectedAction, selectedDefi, selectedRisk,
  completedDefis, hubModalShown
}
```

---

## 11. Services & tutoriels

### Services par risque (`SERVICES_BY_RISK`)
4 entrées par risque : artisan · organisme · collectivité · aide financière.
Exemples : Plombier PGN, Couvreur RGE, Ramoneur QUALIFEU, Serrurier A2P, Expert G5, MaPrimeRénov', Fonds Barnier, BRGM Géorisques, Voisins Vigilants.

### Tutoriels par risque (`TUTORIALS_BY_RISK`)
4 entrées par risque : 2 vidéos + 1 PDF + 1 article.
Sources : AXA Prévention, Vigicrues, Météo-France, BRGM, Ministère Écologie, SDIS, ANAH, CAPEB, FFSA, CNPP.

Affichés tous deux dans S7 sous les étapes de l'action.

---

## 12. Gamification

**Cycle** Diagnostic → Actions priorisées → Action marquée faite → Points crédités → Récompense déverrouillée à partir de X actions.

**Règles**
- Points = `pts` de l'action (20–150)
- Une action réalisée reste visible dans « Actions faites » (cliquable)
- Récompenses : status `unlocked` dès que `completedActions.length >= minActions`
- Le quiz semaine (+5 pts) et les boosts (diag refait, photo, proche invité, profil complété) sont des mocks UI V3 (alert)

---

## 13. Tab bar & chrome AXA

- Tab bar AXA 4 items (Accueil · Contrats · Prévention · Mon Compte) + bouton flottant Angel (IA)
- « Prévention » est l'onglet actif sur tous les écrans V3 (S1–S9)
- Status bar iOS mock en tête (9:41, signal, battery)
- Barre d'étapes en bas hors device pour debug (P1 … P10)

---

## 14. Intégrations & données

### Données statiques V3
Tout est embarqué dans `js/data.js` — pas d'API externe. Le prototype cite les sources réelles dans les stats sinistres (CCR, FFA, DGSCGC, Ministère Intérieur, Météo-France, SDIS 13) mais n'appelle aucun endpoint.

### Mock features
- `downloadBilan()` → toast de génération + toast de succès (PDF simulé)
- `mockUploadProof()` → simule un upload de preuve 2,5 s
- `mockSendBilan()` → simule un envoi email
- `tabMock(name)` → alert explicite "hors périmètre prototype"

---

## 15. Déploiement

| Élément | Valeur |
|---|---|
| Vercel project | `coach-prevention-mrh` (team `innovationaxas-projects`) |
| Branche suivie | `main` (auto-deploy) |
| URL stable prod | https://coach-prevention-mrh.vercel.app |
| Point d'entrée utilisable | `/preview.html` (bundle complet) |
| Root Directory Vercel | `coach-prevention-axa/` (fichiers dupliqués depuis racine) |
| Protection | Vercel Authentication **activée** — nécessite bypass token ou désactivation dashboard pour accès public |

**Build** `mkdir -p dist && cp preview.html index.html dist/ && cp -r css js assets dist/` (défini dans `vercel.json` racine, ignoré par Vercel qui utilise le rootdir).

---

## 16. Écarts vs cadrage V3 initial

Par rapport au PRD de cadrage (`PRD_Coach_Prevention_MRH_V3.md`) :

| Dans le cadrage | Statut as-built |
|---|---|
| 4 profils | **5 profils** (ajout Lucas copro Bordeaux) |
| 25 actions | **22 actions** |
| 6 récompenses | **7 récompenses** (ajout kit saisonnier) |
| Écran Plan (S5) | **Déprécié** → redirect vers Hub Actions |
| Écran Actions autonome (S6) | **Déprécié** → onglet Hub |
| Barème pts 3–12 | **Rééchelonné 20–150** |
| Points cumulés dans S6 | **Déplacés dans S8** (carte gauge) |
| Défi du moment | **Implémenté** (1 défi actif monthly) |

---

## 17. Pistes post-V3 identifiées

- Bibliothèque « Défis passés » une fois le défi courant terminé
- Vrai PDF de bilan (génération serveur)
- Persistence state (localStorage ou compte)
- Brancher le quiz semaine sur un vrai mini-game
- Notifications saisonnières contextualisées (push)
- Déverrouiller les teasers récompenses (Leroy Merlin, taux bonifié)
- Fix déploiement Vercel : désactiver Vercel Authentication sur production, unifier rootDir, éliminer le dossier `coach-prevention-axa/` dupliqué

---

## 18. Contacts & ressources

- **Repo** https://github.com/innovationaxa/CoachPreventionMRH
- **Branche active** `claude/import-project-docs-FKTVu` (features) → merged dans `main`
- **Dashboard Vercel** https://vercel.com/innovationaxas-projects/coach-prevention-mrh
- **Inspiration ALAN** captures dans `assets/ALAN_deefi*.jpeg`

---

*Fin du PRD V3 implementation — 20/04/2026*
