# PRD / Blueprint Produit — Coach Prévention MRH MVP

Ce document formalise la vision produit en **cahier des charges exploitable pour un outil de vibecoding**, à partir des parcours atelier souscription et saisonnalité, des besoins clients, des attentes d’expérience et de la stratégie Coach Prévention.

---

# 1. Product brief

## Nom du produit

**Coach Prévention MRH**

## Vision

Un service digital de prévention qui aide les clients MRH à **comprendre leurs risques, prioriser les bonnes actions et passer à l’action dans les moments de vie où cela devient concret**, avec un relais agent quand c’est utile.

## Problème

Les clients sont souvent conscients des risques, mais n’agissent pas faute de clarté, de priorisation, de simplicité d’exécution et de solutions activables immédiatement. Le vrai problème est donc le **passage à l’action**, pas la connaissance.

## Objectif MVP

Permettre à un client MRH :

1. de voir ses risques principaux,
2. de comprendre rapidement son niveau de préparation,
3. d’obtenir un plan d’action simple,
4. d’engager au moins **une action concrète** en moins de 7 jours.

---

# 2. Périmètre produit

## In scope MVP

- Marché **MRH particulier**
- Persona prioritaire : **propriétaire exposé**
- Deux moments de vie prioritaires :
    - **Souscription**
    - **Saisonnalité / anticipation risque**
- Trois piliers de l’expérience :
    - **Alerter**
    - **Coacher**
    - **Incentiver**

## Out of scope MVP

- Tarification dynamique réelle
- Marketplace complète transactionnelle
- Multi-produit complet
- IA conversationnelle avancée
- Upload / preuve documentaire complexe
- Orchestration CRM profonde / automatisations agent complètes
- Personnalisation temps réel omnicanale avancée

---

# 3. Personas

## Persona principal

### Katia — Propriétaire prudente mais passive

- Propriétaire ou nouvelle souscriptrice MRH
- Sensible aux risques habitation
- Veut comprendre vite
- Veut éviter les galères
- N’a pas envie de passer du temps
- Agit si :
    - le risque est concret,
    - l’effort est faible,
    - la prochaine action est claire,
    - le bénéfice est visible.

## Persona secondaire

### Agent AXA — Relais de crédibilité

- Peut introduire le sujet prévention
- A besoin de voir score, risques, actions
- Ne doit pas subir de charge opérationnelle lourde
- Intervient pour rassurer, prioriser, relancer.

---

# 4. Jobs to be done

## Client

- Comprendre son niveau d’exposition
- Savoir quoi faire concrètement
- Prioriser les actions
- Anticiper plutôt que subir
- Protéger logement et proches
- Maîtriser les coûts liés aux risques.

## Agent

- Disposer d’une vision synthétique
- Avoir un support de conseil simple
- Savoir quand contacter le client
- Renforcer son rôle de conseil.

---

# 5. Principes UX non négociables

- **Rapide** : la valeur doit être visible en moins de 2 minutes
- **Simple** : pas plus de 3 actions prioritaires
- **Contextuel** : activation au bon moment
- **Rassurant** : pas de ton culpabilisant
- **Actionnable** : toujours finir sur une action concrète
- **Progressif** : demander peu d’informations à la fois
- **Transparent** : expliciter l’usage des données
- **Motivant** : montrer progression et bénéfices.

---

# 6. North star & KPI

## North star metric

**% de clients MRH ayant engagé au moins une action prévention après activation du parcours**

## KPI MVP

### Activation

- taux d’ouverture de l’entrée prévention
- taux de clic vers diagnostic

### Compréhension

- taux de complétion du mini-diagnostic
- taux de consultation du score
- taux de consultation du plan d’action

### Action

- taux de clic sur une recommandation
- taux de planification d’action
- taux de demande de RDV / devis / service

### Engagement

- retour dans l’espace prévention
- évolution du score prévention
- nombre d’actions réalisées / déclarées

### Impact

- passage à l’action sous 7 jours
- % de clients actifs prévention.

# 7. Blueprint produit

Le produit est structuré en 6 épics, correspondant au parcours cible atelier.

---

# 8. Epic 1 — Entrée / Activation contextuelle

## But

Faire entrer le client dans l’expérience prévention au bon moment, avec une promesse claire et un faible effort perçu.

## User stories

- En tant que client, je veux comprendre pourquoi AXA me parle prévention maintenant.
- En tant que client, je veux une promesse simple avant de cliquer.
- En tant qu’agent, je veux pouvoir relayer le sujet prévention sans ralentir la vente.

## MVP

### Fonctionnalités

- Entry point prévention dans le parcours de souscription
- Entry point prévention dans l’espace client
- Notification / email saisonnier simple
- Message de promesse type :
    - “Découvrez votre niveau de protection en 2 minutes”
    - “La saison des fortes pluies arrive : 3 actions pour protéger votre maison”
- Page d’atterrissage contextualisée par moment de vie
- Paramètre de contexte d’entrée :
    - `subscription`
    - `seasonal_risk`

### Critères d’acceptation

- le client comprend immédiatement :
    - pourquoi il voit ce contenu
    - combien de temps cela prend
    - quel bénéfice il va obtenir
- aucun tunnel complexe avant la première valeur

## Next

- Push notification app
- SMS contextualisé
- Entrée J+5 post-souscription
- One-pager contrat + risques + lien vers coach

## Later

- Orchestration omnicanale intelligente
- Capping et optimisation des campagnes
- Déclenchement basé météo / géoloc fine / signaux CRM

---

# 9. Epic 2 — Diagnostic express

## But

Donner une lecture simple de la situation du client, sans friction.

## User stories

- En tant que client, je veux voir rapidement mes principaux risques.
- En tant que client, je veux répondre à peu de questions.
- En tant que client, je veux un résultat immédiat.
- En tant que client, je veux savoir que mes données ne servent pas à me pénaliser.

## MVP

### Fonctionnalités

- Diagnostic prérempli à partir de données mockées / connues :
    - type de bien
    - localisation
    - statut propriétaire / locataire
- Mini questionnaire complémentaire de 3 à 5 questions max
- Restitution d’un :
    - score d’exposition
    - score de préparation
- Affichage top 3 risques
- Texte de transparence sur l’usage de la donnée
- Résultat immédiat sans rechargement complexe

### Données MVP

Pour vibecoding, prévoir des données JSON simulées :

```
{
  "housing_type":"house",
  "location_risk_zone":"medium_flood_high_storm",
  "ownership_status":"owner",
  "main_risks": ["Inondation","Tempête","Dégât des eaux"],
  "readiness_score":54,
  "risk_score":68
}
```

### Critères d’acceptation

- diagnostic faisable en moins de 2 minutes
- score visible en une vue
- top 3 risques compréhensible sans jargon

## Next

- Préremplissage plus riche
- Diagnostic par risque
- Historisation des réponses
- Reprise du diagnostic commencé

## Later

- Diagnostic auto-enrichi par données externes
- Photo / vidéo scan du domicile
- Ajustement dynamique du score à partir d’équipements déclarés

---

# 10. Epic 3 — Mise en conscience

## But

Rendre le risque concret, crédible et actionnable.

## User stories

- En tant que client, je veux comprendre ce qui pourrait m’arriver réellement.
- En tant que client, je veux me situer sans qu’on me fasse peur.
- En tant que client, je veux voir des exemples concrets proches de ma situation.

## MVP

### Fonctionnalités

- Carte ou bloc local simple : “Votre zone est exposée à…”
- Bloc “ce qui peut arriver”
- Bloc “ce qui est évitable”
- Exemples concrets type “maisons comme la vôtre”
- Phrase de comparaison simple :
    - “Votre niveau de préparation est moyen”
- Synthèse en langage naturel

### Contenus MVP

- 2 à 3 insights contextuels maximum
- ton factuel, non anxiogène
- wording rassurant

### Critères d’acceptation

- le client comprend pourquoi agir
- le client ne sort pas de la page sans avoir compris ses priorités
- le contenu reste court

## Next

- Visualisation locale plus détaillée
- Comparaison à un groupe de référence
- Cas réels de sinistres dans la zone

## Later

- Visualisations interactives avancées
- Personnalisation narrative selon profil client
- Timeline risque / saison / historique

---

# 11. Epic 4 — Recommandations priorisées

## But

Transformer la compréhension en plan d’action concret.

## User stories

- En tant que client, je veux savoir quoi faire maintenant.
- En tant que client, je veux que ce soit priorisé.
- En tant que client, je veux connaître l’effort et le bénéfice.

## MVP

### Fonctionnalités

- Plan d’action personnalisé avec **3 actions max**
- Organisation des actions par horizon :
    - À faire maintenant
    - À faire ce mois-ci
- Chaque action affiche :
    - titre
    - description courte
    - temps estimé
    - effort estimé
    - bénéfice attendu
- Tag par type d’action :
    - geste simple
    - vérification
    - équipement
    - service
- CTA par action :
    - “Je le fais”
    - “Voir comment faire”
    - “Être aidé”

### Exemple de structure

```
[
  {
    "title":"Nettoyer les gouttières",
    "type":"geste_simple",
    "effort":"faible",
    "time_estimate":"20 min",
    "benefit":"Réduit le risque d’infiltration",
    "time_horizon":"now"
  }
]
```

### Critères d’acceptation

- pas plus de 3 recommandations visibles
- une prochaine action évidente
- effort perçu faible sur au moins une action

## Next

- Recommandations par risque
- Personnalisation par saison / type de logement
- Checklists avancées
- Tutos intégrés

## Later

- Recommandation adaptative par comportement utilisateur
- Moteur de décision avec pondération coût / impact / urgence
- Recommandations multiproduits

---

# 12. Epic 5 — Services & exécution

## But

Réduire la friction entre intention et réalisation.

## User stories

- En tant que client, je veux être aidé à agir.
- En tant que client, je veux trouver facilement une solution fiable.
- En tant que client, je veux savoir combien ça coûte ou où aller.

## MVP

### Fonctionnalités

- Page “solutions pour agir”
- Liens simples vers :
    - tutoriels
    - prise de contact
    - demande d’aide
    - service partenaire mocké
- CTA service :
    - “Demander un devis”
    - “Parler à un conseiller”
    - “Voir les solutions”
- Simuler un catalogue léger de solutions par risque
- Bloc aides / financement simple (informatif seulement dans MVP)

### Critères d’acceptation

- le client peut aller plus loin immédiatement
- au moins un CTA de passage à l’action à chaque recommandation
- pas d’impasse dans le parcours

## Next

- RDV intégré
- Demande de devis intégrée
- Offres packagées
- Partenaires par catégorie de risque
- Crédit travaux informatif

## Later

- Marketplace transactionnelle
- Achat d’équipement dans le flux
- Matching artisan local
- Aides financières calculées automatiquement

---

# 13. Epic 6 — Score, suivi et engagement

## But

Créer de la récurrence et valoriser la progression.

## User stories

- En tant que client, je veux voir que mes actions comptent.
- En tant que client, je veux suivre ma progression.
- En tant que client, je veux être relancé au bon moment.
- En tant que client, je veux être valorisé pour mes efforts.

## MVP

### Fonctionnalités

- Score prévention affiché sur dashboard
- Liste des actions :
    - à faire
    - en cours
    - réalisées
- Action déclarative :
    - “Je l’ai fait”
- Mise à jour simple du score
- Feedback positif après action
- Relance simple :
    - rappel manuel / local
    - ou planifiée en logique front mockée
- Écran “bilan prévention”

### Gamification MVP

- points prévention simples
- palier visuel
- badge ou message de progression
- pas de mécanique financière réelle en MVP

### Critères d’acceptation

- le client voit sa progression
- une action réalisée modifie visiblement l’état du système
- le produit donne envie de revenir

## Next

- Rewards simples
- Incentives par palier
- Rappels saisonniers intelligents
- Réengagement contextuel

## Later

- Récompenses réelles
- Conversion en avantages
- Lien fidélité / prévention
- Historique long terme
- Scoring sophistiqué par risque

# 14. Epic 7 — Vue agent légère

## But

Donner à l’agent une vue miroir minimale pour relayer le coach.

## User stories

- En tant qu’agent, je veux voir le score prévention du client.
- En tant qu’agent, je veux voir ses risques principaux.
- En tant qu’agent, je veux savoir quelle action lui recommander.
- En tant qu’agent, je veux savoir quand le contacter.

## MVP

### Fonctionnalités

- Vue simple agent avec :
    - identité client
    - moment de vie actif
    - top 3 risques
    - score prévention
    - dernière action ou statut
    - recommandation de contact
- Script d’accroche simple

### Critères d’acceptation

- vue lisible en moins de 30 secondes
- aucune saisie obligatoire complexe
- l’agent peut reprendre la même logique que le client

## Next

- Notes de contact
- Liste priorisée des clients à appeler
- Fiche synthèse pré-RDV

## Later

- CRM auto-alimenté
- Copilote agent
- Scripts dynamiques
- Détection proactive des moments de contact

---

# 15. Structure d’information recommandée pour le MVP

## Arborescence

```
Accueil Coach Prévention
├── Pourquoi maintenant ?
├── Mon score
├── Mes 3 risques principaux
├── Mon diagnostic express
├── Mon plan d’action
│   ├── À faire maintenant
│   └── À faire ce mois-ci
├── Solutions pour agir
├── Mon suivi
└── Mon bilan prévention
```

## Écrans minimum à générer

1. Landing contextuelle
2. Diagnostic express
3. Résultats / score
4. Mise en conscience / synthèse
5. Plan d’action
6. Détail d’une recommandation
7. Solutions / services
8. Dashboard suivi
9. Bilan prévention
10. Vue agent légère

---

# 16. Spécification MVP pour vibecoding

## Type d’application recommandé

- Web app responsive
- Structure single-page ou multi-step simple
- Front prioritaire
- Backend léger mocké ou JSON local

## Stack logique recommandée

- Front : React / Next / Vite
- State : local state ou store simple
- Data : JSON mockés
- No auth complexe pour prototype
- Routing léger

## Modules techniques à générer

### A. Context engine mock

Entrées :

- type de moment de vie
- profil client
- zone de risque

Sorties :

- message d’entrée
- risques principaux
- niveau de préparation
- plan d’action

### B. Score engine mock

Règles simples :

- score initial basé sur profil
- 
    - points si action déclarée
- badge / statut par palier

### C. Recommendation engine mock

Règles simples :

- map risque → recommandations
- map moment de vie → ton / ordre / urgence

### D. UI system

- cartes
- stepper
- score ring / progress bar
- checklists
- CTA cards
- timeline simple

---

# 17. Backlog par horizon

## MVP

- Entrée contextuelle souscription
- Entrée contextuelle saisonnalité
- Diagnostic express
- Score prévention simple
- Top 3 risques
- Synthèse pédagogique
- Plan d’action 3 recommandations
- Détail recommandations
- Dashboard de suivi
- Déclaration d’action réalisée
- Vue agent légère
- Données mockées

## Next

- One-pager post-souscription
- Notifications simulées / push
- J+5 onboarding
- Services / devis / RDV plus poussés
- Rewards simples
- Recommandations plus fines
- Historisation
- Tutos
- Bilan prévention enrichi

## Later

- Partenaires transactionnels
- Intégration CRM
- Déclenchement temps réel
- Météo / géodata temps réel
- Marketplace
- Rewards réels
- Pricing / franchise / fidélité
- Copilote agent IA
- Multiproduit

---

# 18. Definition of done du MVP

Le MVP est réussi si un testeur peut :

1. entrer par un contexte lisible,
2. compléter un diagnostic en moins de 2 minutes,
3. comprendre ses 3 risques principaux,
4. voir son score et ce qu’il signifie,
5. obtenir 3 actions prioritaires,
6. engager au moins une action,
7. voir que son score progresse,
8. comprendre qu’AXA l’aide à agir, pas seulement à s’informer.

---

# 19. Prompt-ready summary pour outil de vibecoding

## Brief condensé

Créer une web app responsive appelée **Coach Prévention MRH** pour clients habitation AXA. L’app doit couvrir deux moments de vie : **souscription** et **saisonnalité / risque saisonnier**. L’expérience comporte 6 étapes : entrée contextuelle, diagnostic express, mise en conscience, recommandations priorisées, services pour agir, suivi avec score évolutif. L’objectif est de faire engager au client au moins une action prévention. Le ton doit être simple, rassurant, concret, non culpabilisant. Le diagnostic doit prendre moins de 2 minutes. L’interface doit montrer un score, 3 risques principaux, 3 actions prioritaires maximum, et un suivi des actions. Ajouter aussi une vue agent légère miroir. Utiliser des données mockées et un moteur simple de règles pour générer score, recommandations et messages selon le contexte.

---

# 20. Annexes de contenu à prévoir dans le prototype

## Exemples de risques MVP

- Inondation
- Tempête
- Dégât des eaux
- Vol
- Incendie

## Exemples d’actions MVP

- Nettoyer les gouttières
- Vérifier l’étanchéité
- Contrôler les évacuations
- Vérifier les volets / fermetures
- Prendre RDV pour un contrôle
- Demander un devis pour un équipement

## Exemples de messages

### Souscription

- “Votre logement est exposé à 3 risques majeurs”
- “Découvrez votre niveau de protection en 2 minutes”
- “3 actions simples pour mieux protéger votre logement”

### Saisonnalité

- “La saison des fortes pluies arrive dans votre région”
- “Quelques actions simples peuvent éviter une partie des dégâts”
- “À faire ce week-end / ce mois-ci”