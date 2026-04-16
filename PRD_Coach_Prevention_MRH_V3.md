
# PRD — Coach Prévention MRH · Version 3

**Document de référence produit**

*Version 3.0 · AXA France · Pôle Prévention & Services · Avril 2026*  
*Statut : Cadrage produit V3 à partir du prototype V2 et des arbitrages atelier*

---

## 1. Vue d’ensemble

### 1.1 Définition du produit

Le **Coach Prévention MRH V3** est une expérience digitale de prévention qui aide un assuré AXA MRH à :

1. **Comprendre son exposition aux risques** à son adresse de logement
2. **Enrichir cette lecture par un diagnostic logement** simple et contextualisé
3. **Obtenir une vue mise à jour de ses risques** et un plan d’actions associé
4. **Accéder à un univers distinct d’actions et de défis**
5. **Cumuler des points et débloquer des récompenses** uniquement via les actions réalisées

### 1.2 Pivot produit V3

La V3 acte un changement majeur par rapport à la V2 :

- la logique d’entrée n’est plus centrée sur un **score de prévention /100**
- le **carnet de bord prévention** devient le **point de départ**
- l’expérience est structurée en **2 univers distincts** :
  - **Comprendre mes risques**
  - **Agir / relever des défis**
- la **gamification** est déplacée dans l’univers des actions et ne structure plus la lecture du risque
- la progression principale côté risque n’est plus exprimée en points, mais par une **évolution de niveau d’exposition par risque** (ex. élevé → modéré)

### 1.3 Objectifs produit V3

| Objectif | Cible V3 |
| --- | --- |
| Clarifier immédiatement la valeur du service | Prioritaire |
| Rendre la lecture du risque compréhensible sans pédagogie additionnelle | Prioritaire |
| Décorréler compréhension du risque et mécanique de récompense | Prioritaire |
| Faire du diagnostic un levier de personnalisation, pas un tunnel opaque | Prioritaire |
| Donner à voir des contenus concrets, situés et crédibles | Prioritaire |
| Réintroduire la gamification de manière plus naturelle | Prioritaire |
| Préparer une base cohérente pour backend, CRM et personnalisation réelle | Prioritaire |

### 1.4 Problèmes V2 auxquels répond la V3

La V2 a démontré la valeur du triptyque **diagnostic → plan → récompense**, mais plusieurs fragilités ont été identifiées :

- le **score /100** était mal compris et méthodologiquement peu lisible
- l’expérience mélangeait dans un même flux :
  - lecture du risque
  - diagnostic
  - conseils
  - score
  - rewards
- l’écran de suivi n’était pas le vrai centre de gravité du produit
- des contenus pertinents (contexte local, situations similaires, carte, événements) étaient présents mais rangés dans un écran “score” peu naturel
- la gamification était trop précoce dans le parcours, avant que l’utilisateur comprenne sa situation

---

## 2. Vision produit V3

### 2.1 Promesse utilisateur

**“Comprenez les risques de votre logement, évaluez votre situation réelle, puis passez à l’action pour mieux protéger votre bien.”**

### 2.2 Principes directeurs

1. **Commencer par le concret** : montrer les risques réels de l’adresse avant de demander quoi que ce soit
2. **Simplifier la lecture** : remplacer le score abstrait par des niveaux de risque compréhensibles
3. **Débloquer la valeur progressivement** : le diagnostic ouvre une vue plus personnalisée
4. **Séparer comprendre et agir** : éviter de mélanger analyse et gamification
5. **Récompenser l’action, pas la simple consultation**
6. **Contextualiser fortement** : carte, événements locaux, situations comparables, verbatims
7. **Préserver la crédibilité assurantielle** : une logique de risque claire, sans promesse algorithmique opaque

### 2.3 Positionnement fonctionnel

La V3 s’organise autour de deux modules principaux :

#### Module A — Suivi & Diagnostic
Objectif : comprendre son exposition et approfondir ses risques.

Contenus :
- risques identifiés à l’adresse
- niveau d’exposition par risque
- invitation au diagnostic
- résultats enrichis après diagnostic
- recommandations
- plan d’action
- carte et contexte local
- situations similaires / “people like you”
- informations de fond par risque

#### Module B — Actions & Défis
Objectif : faire agir le client et porter la mécanique d’engagement.

Contenus :
- actions en autonomie
- défis / challenges proposés par AXA
- points gagnés
- progression de points
- conversion en récompenses / bénéfices

---

## 3. Périmètre V3

### 3.1 In scope

- refonte de l’architecture de l’expérience
- suppression du score prévention /100 comme repère principal
- nouvel écran d’entrée fondé sur le carnet de bord prévention
- fusion d’éléments des écrans V2 “accueil”, “score” et “suivi”
- nouveau modèle de restitution des risques
- diagnostic comme mécanisme de déblocage
- nouveau découpage entre “Suivi des risques” et “Actions & défis”
- déplacement de la gamification dans l’univers d’action
- conservation et réintégration des contenus contextuels forts
- définition du nouveau wording produit et de la nouvelle logique de progression

### 3.2 Out of scope pour ce cadrage

- spécification détaillée backend
- intégration CRM réelle
- intégration Géorisques en API temps réel
- définition actuarielle détaillée des algorithmes d’évolution de niveau
- catalogue final de récompenses et business case
- design UI final haute fidélité
- politique de preuve / vérification des actions
- stratégie d’activation cross-canal complète

---

## 4. Architecture cible V3

## 4.1 Logique d’ensemble

La V3 remplace le flux V2 linéaire par une architecture plus modulaire :

### V2
Landing → Diagnostic → Score → Analyse / Plan → Action → Reward → Suivi

### V3
**Suivi des risques (hub)** → Diagnostic → Vue enrichie des risques →  
- soit approfondir un risque  
- soit basculer dans **Actions & Défis**

### 4.2 Les deux univers

| Univers | Rôle | KPI principal |
| --- | --- | --- |
| Suivi des risques | Compréhension, personnalisation, crédibilité | taux de complétion diagnostic, consultation des deep dives |
| Actions & défis | Engagement, répétition, conversion en bénéfices | taux d’action réalisée, participation aux défis, points gagnés |

### 4.3 Nouveau point d’entrée

Le **nouveau point d’entrée de l’expérience** est le **carnet de bord prévention**.

Ce nouvel écran fusionne des éléments précédemment dispersés :
- l’aperçu des risques (hérité de l’accueil V2)
- la profondeur contextuelle et la projection locale (héritées de l’écran score V2)
- la logique de dashboard et de continuité (héritée du suivi V2)

---

## 5. Modèle d’expérience V3

## 5.1 Avant diagnostic

À l’arrivée sur le service, l’utilisateur voit :

1. les **risques identifiés sur sa zone**
2. leur **niveau d’exposition**
3. une invitation claire à **réaliser un diagnostic**
4. la promesse de ce que le diagnostic va débloquer

### Restitution des risques avant diagnostic

- affichage de **3 risques minimum**
- affichage jusqu’à **6 risques maximum** selon la richesse des données disponibles
- chaque risque est restitué via un **niveau simple sur 5 crans**
- formulation à préciser en design/content, par exemple :
  - très élevé
  - élevé
  - modéré
  - faible
  - très faible / inexistant

### Objectif UX

L’utilisateur doit pouvoir comprendre dès le premier écran :

- “Quels sont les risques pertinents pour mon logement ?”
- “À quel niveau suis-je exposé ?”
- “Pourquoi cela mérite que j’aille plus loin ?”

## 5.2 Diagnostic

Le diagnostic n’est plus présenté comme un générateur de score, mais comme un moyen de :

- compléter la lecture du risque de zone
- intégrer l’état réel du logement
- personnaliser les recommandations
- actualiser les niveaux de risque

### Règles de diagnostic

- questionnaire de **3 à 5 questions par nature de risque**
- le diagnostic porte en priorité sur les risques mis en avant sur l’écran de suivi
- le diagnostic doit rester :
  - compréhensible
  - rapide
  - perçu comme utile
- la valeur du diagnostic doit être explicitée avant démarrage

### Promesse utilisateur

“Répondez à quelques questions sur votre logement pour obtenir une vision plus précise de vos risques et les meilleures actions à engager.”

## 5.3 Après diagnostic

Une fois le diagnostic complété, l’utilisateur débloque une version enrichie du suivi :

- vue mise à jour de ses risques
- recommandations personnalisées
- plan d’action
- contexte local enrichi
- situations comparables
- éléments de réassurance et d’explication

### Logique de progression après diagnostic

La V3 abandonne la logique :
- “j’ai 32/100 puis 57/100”

Au profit de la logique :
- “mon risque inondation était élevé, il est désormais modéré”
- “ma lecture du risque est plus précise”
- “je sais quelles actions prioriser”

Il s’agit donc d’une **progression par statut de risque**, et non d’un score global principal.

## 5.4 Univers Actions & Défis

Les actions sortent du module principal de compréhension du risque.

L’univers **Actions & Défis** devient l’espace dédié à :
- réaliser des actions
- relever des défis proposés par AXA
- gagner des points
- convertir ces points en bénéfices

### Deux catégories d’actions

#### 1. Actions en autonomie
Exemples :
- vérifier un équipement
- mettre en place une routine simple
- suivre une recommandation de prévention
- déclarer une action accomplie

#### 2. Défis / challenges AXA
Exemples :
- campagne saisonnière
- challenge lié à un risque local
- défi thématique sur une période donnée
- série d’actions à accomplir pour débloquer un bénéfice

### Règle produit clé

**Les points n’existent plus dans l’univers de lecture des risques.  
Les points existent uniquement dans l’univers des actions et défis.**

---

## 6. Information architecture V3

## 6.1 Écrans cibles

Proposition de structure fonctionnelle V3 :

| ID cible | Écran | Rôle |
| --- | --- | --- |
| V3-01 | Hub Prévention / Suivi des risques | point d’entrée principal |
| V3-02 | Diagnostic | questionnaire par risque |
| V3-03 | Vue enrichie post-diagnostic | restitution personnalisée |
| V3-04 | Deep dive risque | détail d’un risque donné |
| V3-05 | Plan d’action | recommandations priorisées |
| V3-06 | Actions & Défis | univers d’engagement |
| V3-07 | Détail action ou défi | détail, étapes, bénéfices |
| V3-08 | Récompenses | bénéfices disponibles / à débloquer |
| V3-09 | Historique & activité | continuité et mémoire des actions |

## 6.2 Navigation cible

### Entrée standard
Hub Prévention → Diagnostic → Vue enrichie → Deep dive / Plan d’action → Actions & Défis

### Entrée utilisateur déjà diagnostiqué
Hub Prévention enrichi → Deep dive → Plan d’action → Actions & Défis

### Entrée directe engagement
Hub Prévention → Actions & Défis

---

## 7. Description fonctionnelle par écran

## V3-01 — Hub Prévention / Suivi des risques

### Rôle
Écran principal d’entrée et de pilotage.

### Contenu
- résumé de l’exposition globale du logement
- top 3 risques minimum, jusqu’à 6
- niveau de risque par item
- CTA vers le diagnostic si non réalisé
- état du diagnostic si déjà réalisé
- accès aux deep dives par risque
- accès à l’univers Actions & Défis

### Composants attendus
- header prévention
- bloc “Vos risques à votre adresse”
- cartes de risques
- indicateurs de niveau
- bloc CTA diagnostic
- bloc résumé des actions disponibles
- entrée vers récompenses / bénéfices

### Logique d’affichage
- **sans diagnostic** : vue de zone + promesse de personnalisation
- **avec diagnostic** : vue enrichie + niveau ajusté + recommandations visibles

### Critère de succès
L’utilisateur comprend en moins de quelques secondes :
- où il en est
- quels risques le concernent
- quoi faire ensuite

## V3-02 — Diagnostic

### Rôle
Qualifier la situation réelle du logement.

### Fonctionnalités
- questions regroupées par risque
- 3 à 5 questions par risque
- progression visible
- explication du bénéfice obtenu en sortie
- possibilité de quitter et reprendre plus tard à terme

### Sortie
Déblocage de la vue enrichie et du plan d’action.

## V3-03 — Vue enrichie post-diagnostic

### Rôle
Restituer les résultats enrichis et personnalisés.

### Contenu
- niveaux de risque mis à jour
- éventuelle évolution de niveau
- recommandations initiales
- accès au plan d’action
- accès aux contenus contextuels

### Différence vs V2
Cet écran remplace le rôle émotionnel et analytique de l’ancien écran score, sans afficher de score /100.

## V3-04 — Deep dive risque

### Rôle
Permettre d’explorer un risque spécifique.

### Contenu
- niveau du risque concerné
- explication pédagogique
- facteurs de risque identifiés
- éléments liés au logement
- recommandations clés
- liens vers actions correspondantes

### Contenus contextuels potentiels
- carte locale
- exposition dans la région
- événements passés
- verbatims
- situations comparables / “people like you”

## V3-05 — Plan d’action

### Rôle
Lister les actions pertinentes pour réduire ou mieux gérer les risques.

### Contenu
- actions priorisées par risque
- catégorisation simple
- bénéfice attendu
- effort estimé
- éventuel niveau de complexité
- CTA vers réalisation de l’action

### Positionnement
Le plan d’action reste rattaché à la logique de prévention, mais la mécanique de points n’est pas portée ici en tant que structure principale.

## V3-06 — Actions & Défis

### Rôle
Univers séparé dédié à l’engagement.

### Contenu
- liste des actions réalisables
- liste des défis en cours
- nombre de points gagnables
- progression de points
- accès aux récompenses

### Principes
- vocabulaire plus engageant
- logique de campagne / animation possible
- temporalité explicite pour les défis

## V3-07 — Détail action ou défi

### Rôle
Donner toutes les informations nécessaires à la réalisation.

### Contenu
- objectif
- étapes
- durée estimée
- points gagnés
- éventuelle preuve
- bénéfice / récompense associée
- lien retour vers Actions & Défis

## V3-08 — Récompenses

### Rôle
Rendre visibles les bénéfices concrets liés aux points.

### Contenu
- récompenses débloquées
- récompenses atteignables
- conditions d’obtention
- règles de conversion des points

## V3-09 — Historique & activité

### Rôle
Donner une mémoire de l’expérience et soutenir l’engagement.

### Contenu
- diagnostic réalisé
- risques consultés
- actions réalisées
- défis complétés
- points cumulés
- récompenses obtenues

---

## 8. Évolution du modèle de données

## 8.1 Objets principaux

### RiskExposure
Représente le niveau de risque d’un logement pour un aléa donné.

Champs cibles :
- `riskId`
- `riskLabel`
- `zoneLevel`
- `homeAdjustedLevel`
- `confidenceLevel`
- `lastUpdatedAt`
- `hasDiagnosticData`

### Diagnostic
Représente les réponses fournies par le client.

Champs cibles :
- `diagnosticId`
- `riskId`
- `questionId`
- `answer`
- `updatedAt`

### Recommendation
Représente une recommandation issue du diagnostic et/ou de l’exposition.

Champs cibles :
- `recommendationId`
- `riskId`
- `title`
- `description`
- `priority`
- `effort`
- `type` (action simple, équipement, accompagnement, contenu)

### ActionItem
Représente une action actionnable dans l’univers Actions & Défis.

Champs cibles :
- `actionId`
- `riskId`
- `category` (autonomie, défi)
- `title`
- `description`
- `points`
- `status`
- `startAt`
- `endAt`
- `proofPolicy`

### Reward
Représente un bénéfice accessible via les points.

Champs cibles :
- `rewardId`
- `title`
- `type`
- `pointsRequired`
- `status`

## 8.2 Données à déprécier ou repositionner

### À déprécier comme objet central
- `currentScore`
- `scoreBefore`
- `preparationScore`
- niveau global /100 comme repère principal

### À conserver mais repositionner
- questions diagnostiques
- actions
- rewards
- contexte local
- services
- tutoriels

---

## 9. Règles métier V3

## 9.1 Règle de restitution du risque

Avant diagnostic :
- le niveau affiché repose principalement sur les données de zone / adresse

Après diagnostic :
- le niveau affiché peut être ajusté selon les réponses du client
- l’ajustement ne se traduit pas par un score, mais par un **niveau mis à jour**

## 9.2 Règle de progression

### Progression “risque”
- basée sur l’évolution du niveau d’exposition par risque

### Progression “engagement”
- basée sur les points gagnés dans Actions & Défis

Les deux progressions doivent rester distinctes dans le produit et dans les wording.

## 9.3 Règle de gamification

- pas de points pour la simple consultation du suivi
- pas de score gamifié dans le hub de risque
- points accordés pour :
  - actions réalisées
  - défis complétés
  - éventuellement certaines lectures actives si cela est explicitement assumé plus tard

## 9.4 Règle de déblocage

Le diagnostic débloque :
- une vue plus précise des risques
- des recommandations plus pertinentes
- l’accès à certains contenus enrichis
- un plan d’action plus personnalisé

## 9.5 Règle de contenu contextuel

Les contenus suivants ne doivent plus être isolés dans un écran “score” :
- carte locale
- événements passés
- cas comparables
- verbatims
- informations de contexte territorial

Ils doivent être rattachés à l’expérience de suivi / deep dive du risque.

---

## 10. Exigences UX & contenu

## 10.1 Exigences UX

- compréhension immédiate de la situation
- vocabulaire non technique
- distinction nette entre “je comprends mes risques” et “je gagne des points”
- diagnostic perçu comme court et utile
- hiérarchie d’information très lisible
- possibilité de naviguer par risque sans effort

## 10.2 Exigences de contenu

Le produit doit expliciter :
- d’où vient l’évaluation initiale
- ce que le diagnostic apporte en plus
- pourquoi un niveau peut évoluer
- comment les points sont gagnés
- comment les récompenses sont obtenues

## 10.3 Exigences de crédibilité

Le service doit éviter :
- les formulations trop abstraites
- les chiffres non explicables
- les promesses de précision excessive
- toute confusion entre lecture du risque et impact tarifaire, sauf décision explicite future

---

## 11. Impacts sur le prototype V2

## 11.1 Ce qui disparaît

- score prévention /100 comme repère principal du produit
- écran score tel qu’il existe en V2
- logique de progression générale unique
- articulation trop linéaire du parcours V2

## 11.2 Ce qui est fusionné

Dans le nouveau Hub Prévention sont fusionnés :
- éléments de l’accueil V2
- éléments du score V2
- éléments du suivi V2

## 11.3 Ce qui est conservé

- logique de diagnostic
- richesse des contenus locaux
- logique de recommandations
- logique d’actions
- logique de rewards
- idée de carnet de bord / continuité

## 11.4 Ce qui change de place

- gamification → déplacée vers Actions & Défis
- points → déplacés vers l’univers d’action
- contextualisation locale → réintégrée dans le suivi / deep dives

---

## 12. KPIs de succès V3

## 12.1 Compréhension

- taux d’utilisateurs comprenant leurs 3 risques principaux
- taux d’utilisateurs comprenant l’intérêt du diagnostic
- compréhension spontanée de la différence entre niveau de risque et points

## 12.2 Engagement

- taux de démarrage du diagnostic depuis le hub
- taux de complétion du diagnostic
- taux de consultation d’un deep dive risque
- taux de passage vers Actions & Défis

## 12.3 Activation

- taux d’action commencée
- taux d’action terminée
- taux de participation aux défis
- points moyens gagnés par utilisateur actif

## 12.4 Valeur perçue

- utilité perçue du suivi des risques
- crédibilité perçue de la vue post-diagnostic
- attractivité perçue des récompenses
- intention de revisite

---

## 13. Open questions à arbitrer

1. Quelle nomenclature exacte des **5 niveaux de risque** ?
2. Affiche-t-on un **niveau global** du logement, ou uniquement des niveaux par risque ?
3. Quel niveau de précision accepte-t-on pour l’évolution du risque après diagnostic ?
4. Tous les contenus “people like you” doivent-ils être visibles après diagnostic uniquement, ou certains dès l’entrée ?
5. Quel équilibre entre :
   - actions libres
   - défis temporisés par AXA ?
6. Les points sont-ils attribués seulement aux actions déclarées réalisées, ou aussi à certaines interactions pédagogiques ?
7. La vue “plan d’action” reste-t-elle dans le module Suivi, ou doit-elle basculer entièrement dans Actions & Défis ?
8. Quelle articulation future avec contrat, garanties et analyse de couverture ?
9. Quel wording de réassurance sur l’usage des données de diagnostic ?
10. Quelle politique de preuve pour les actions à forte valeur ?

---

## 14. Recommandations de delivery

## 14.1 Priorité de conception

### Lot 1 — Refonte structurelle
- nouveau hub
- nouveau modèle de risque
- nouveau diagnostic
- nouvelle vue enrichie

### Lot 2 — Séparation engagement
- univers Actions & Défis
- points
- rewards
- historique d’activité

### Lot 3 — Personnalisation avancée
- contexte local plus riche
- people like you
- événements comparables
- animation des défis

## 14.2 Recommandations produit

- valider vite les wording de niveaux de risque
- prototyper le nouveau hub avant toute optimisation de rewards
- tester en priorité :
  - compréhension
  - clarté
  - valeur perçue du diagnostic
- ne pas réintroduire de score global caché dans l’UX principale

---

## 15. Synthèse exécutive

La V3 du Coach Prévention MRH transforme le prototype en une expérience plus claire, plus crédible et plus actionnable :

- **on n’entre plus par un score, on entre par les risques**
- **le diagnostic n’alimente plus une note, il enrichit la compréhension**
- **la progression de risque se lit par niveau**
- **la gamification est déplacée dans un univers dédié d’actions et de défis**
- **le carnet de bord devient le vrai cœur du produit**

Cette version prépare un produit plus compréhensible pour les clients, plus défendable côté UX, et plus robuste comme base de cadrage MVP.

---

## 16. Sources de cadrage utilisées

Ce PRD V3 s’appuie sur :
- le **PRD V2** qui décrit en détail l’architecture, les objets de données, les écrans et les limites de la version précédente fileciteturn1file0
- le support de prévention qui matérialise la logique antérieure “impact parcours / diagnostic / coach / contribution” et l’usage du score prévention dans le coach v1 fileciteturn0file1
- les travaux de cadrage plus larges sur la prévention digitale AXA, notamment la structuration en **Alerter / Coacher / Incentiver** et la nécessité de clarifier l’expérience cible fileciteturn0file3
- les synthèses atelier qui rappellent les ambitions initiales du coach, les briques fonctionnelles et les principes MVP 2027 fileciteturn0file2 fileciteturn0file4

