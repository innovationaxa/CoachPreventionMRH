/* ── SCREEN TEMPLATES ── */

const SCREENS = {

  /* ═══════════════════════════
     SCREEN 0 — ENTRÉE
  ═══════════════════════════ */
  s0: () => `
    <div class="s1-hero">
      <div class="s1-logo reveal reveal-1">AXA Prévention</div>
      <div class="s1-avatar reveal reveal-2">🏠</div>
      <h1 class="s1-headline reveal reveal-3">Découvrez votre niveau de protection</h1>
      <p class="s1-sub reveal reveal-4">Un bilan personnalisé, basé sur votre adresse et votre contrat. Gratuit.</p>
    </div>

    <div class="s1-body">
      <div class="s1-time-chip reveal reveal-1">
        <div class="s1-time-dot"></div>
        Moins de 2 minutes
      </div>

      <div class="s1-data-card reveal reveal-2">
        <div class="icon-box icon-box-blue">📍</div>
        <div class="s1-card-content">
          <div class="s1-card-label">Votre logement</div>
          <div class="s1-card-value">18 rue de la Paix, Paris 2e<br>Appartement T3 — 3e étage</div>
        </div>
      </div>

      <div class="s1-data-card reveal reveal-3">
        <div class="icon-box icon-box-blue">📋</div>
        <div class="s1-card-content">
          <div class="s1-card-label">Votre contrat</div>
          <div class="s1-card-value">MRH Confort — Souscrit le 12 mars 2024</div>
        </div>
      </div>

      <div style="margin-top: 18px;" class="reveal reveal-4">
        <button class="btn btn-primary btn-arrow" onclick="goTo(1)">
          Voir mon bilan de protection <span class="arr">→</span>
        </button>
        <button class="btn btn-secondary" onclick="goTo(1)">Me le rappeler plus tard</button>
      </div>

      <div class="s1-reassure reveal reveal-5">
        🔒 Ces données ne modifient pas votre prime
      </div>
    </div>
    <div class="pad-bottom"></div>
  `,

  /* ═══════════════════════════
     SCREEN 1 — SITUATION
  ═══════════════════════════ */
  s1: () => `
    <div class="progress-track"><div class="progress-fill" style="width:40%"></div></div>
    <div class="s2-topbar">
      <button class="back-btn" onclick="goTo(0)">←</button>
      <div class="topbar-info">
        <div class="topbar-title">Votre situation</div>
        <div class="topbar-step">Étape 1 sur 2</div>
      </div>
    </div>

    <div class="s2-body">
      <p class="s2-intro reveal reveal-1">
        Nous avons prérempli les informations de votre contrat.<br>
        <strong>Vérifiez et complétez si besoin.</strong>
      </p>

      <div class="reveal reveal-2">
        <div class="field-row">
          <div class="field-label">Type de bien</div>
          <div class="field-value">Appartement — 72 m² <span class="badge-prefill">Prérempli</span></div>
        </div>
        <div class="field-row">
          <div class="field-label">Étage</div>
          <div class="field-value">3e étage <span class="badge-prefill">Prérempli</span></div>
        </div>
        <div class="field-row">
          <div class="field-label">Commune</div>
          <div class="field-value">Paris 2e — Zone B1 <span class="badge-prefill">Prérempli</span></div>
        </div>
      </div>

      <div class="divider reveal reveal-3">2 questions rapides</div>

      <div class="s2-question reveal reveal-4">
        <div class="s2-q-text">Avez-vous une cave ou un sous-sol ?</div>
        <div class="options-row" data-group="cave">
          <button class="opt-pill selected" onclick="selectPill(this)">Oui, une cave</button>
          <button class="opt-pill" onclick="selectPill(this)">Non</button>
          <button class="opt-pill" onclick="selectPill(this)">Je ne sais pas</button>
        </div>
      </div>

      <div class="s2-question reveal reveal-5">
        <div class="s2-q-text">La toiture est-elle accessible ?</div>
        <div class="options-row" data-group="toiture">
          <button class="opt-pill" onclick="selectPill(this)">Oui, accès direct</button>
          <button class="opt-pill selected" onclick="selectPill(this)">Non, via syndic</button>
        </div>
      </div>

      <div class="reassure-box green reveal reveal-6">
        <span class="reassure-icon">✓</span>
        <span>Vos réponses servent uniquement à personnaliser votre plan de prévention. Aucun impact sur votre contrat.</span>
      </div>

      <div style="margin-top: 8px;" class="reveal reveal-7">
        <button class="btn btn-primary btn-arrow" onclick="goTo(2)">
          Calculer mon score <span class="arr">→</span>
        </button>
      </div>
    </div>
    <div class="pad-bottom"></div>
  `,

  /* ═══════════════════════════
     SCREEN 2 — SCORE
  ═══════════════════════════ */
  s2: () => `
    <div class="s3-hero">
      <div class="s3-hero-title reveal reveal-1">Votre score de prévention</div>

      <div class="score-ring-wrap reveal-scale" style="animation-delay:0.1s">
        <svg viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="54"
            fill="none"
            stroke="rgba(255,255,255,0.12)"
            stroke-width="10"/>
          <circle cx="65" cy="65" r="54"
            fill="none"
            stroke="#5DCAA5"
            stroke-width="10"
            stroke-linecap="round"
            stroke-dasharray="339"
            stroke-dashoffset="129"
            class="ring-animated"/>
        </svg>
        <div class="score-center">
          <div class="score-num">62</div>
          <div class="score-denom">/100</div>
        </div>
      </div>

      <div class="s3-level-badge reveal reveal-3">🥈 Niveau Argent</div>
      <p class="s3-tagline reveal reveal-4">Protection modérée — 3 risques à réduire</p>
    </div>
    <div class="progress-track"><div class="progress-fill" style="width:65%"></div></div>

    <div class="s3-body">
      <div class="s3-section-title reveal reveal-1">Vos risques principaux</div>

      <div class="reveal reveal-2">
        <div class="risk-row">
          <div class="icon-box icon-box-red">💧</div>
          <div>
            <div class="risk-name">Inondation</div>
            <div class="risk-sub">Cave exposée — zone à risque</div>
          </div>
          <span class="badge badge-red">Élevé</span>
        </div>
        <div class="risk-row">
          <div class="icon-box icon-box-amber">🌬️</div>
          <div>
            <div class="risk-name">Tempête</div>
            <div class="risk-sub">Toiture accessible via syndic</div>
          </div>
          <span class="badge badge-amber">Modéré</span>
        </div>
        <div class="risk-row">
          <div class="icon-box icon-box-green">🔥</div>
          <div>
            <div class="risk-name">Incendie</div>
            <div class="risk-sub">Zone urbaine dense</div>
          </div>
          <span class="badge badge-green">Faible</span>
        </div>
      </div>

      <div class="s3-cta-box reveal reveal-3">
        <p class="s3-cta-headline">
          3 actions simples peuvent faire passer votre score à
          <strong>81/100</strong> et vous faire économiser
          <strong style="color:var(--green-600)">54 € / an</strong> sur votre prime.
        </p>
        <button class="btn btn-primary btn-arrow" onclick="goTo(3)">
          Voir mon plan d'action <span class="arr">→</span>
        </button>
      </div>
    </div>
    <div class="pad-bottom"></div>
  `,

  /* ═══════════════════════════
     SCREEN 3 — ACTIONS
  ═══════════════════════════ */
  s3: () => `
    <div class="progress-track"><div class="progress-fill" style="width:85%"></div></div>
    <div class="s4-topbar">
      <div class="s4-title">Mon plan d'action</div>
      <div class="s4-subtitle">3 actions · <span class="pts-inline" id="ptsHeader">+19 pts disponibles</span></div>
    </div>

    <div class="s4-body">
      <div class="s4-horizon-label">Ce week-end</div>

      <div class="reco-card reveal reveal-1" id="r0" onclick="toggleReco('r0', 5)">
        <div class="reco-top">
          <div class="check-circle" id="chk0">✓</div>
          <div class="reco-name">Vérifier les évacuations</div>
        </div>
        <p class="reco-desc">Cave et siphons de sol bouchés = dégât des eaux assuré. 30 min suffisent pour vérifier et déboucher.</p>
        <div class="reco-tags">
          <span class="reco-tag">⏱ 30 min</span>
          <span class="reco-tag green">Gratuit</span>
          <span class="reco-tag pts">+5 pts</span>
        </div>
      </div>

      <div class="reco-card reveal reveal-2" id="r1" onclick="toggleReco('r1', 3)">
        <div class="reco-top">
          <div class="check-circle" id="chk1">✓</div>
          <div class="reco-name">Localiser le coupe-eau principal</div>
        </div>
        <p class="reco-desc">En cas de rupture de canalisation, chaque minute compte. Savez-vous où il se trouve ?</p>
        <div class="reco-tags">
          <span class="reco-tag">⏱ 5 min</span>
          <span class="reco-tag green">Gratuit</span>
          <span class="reco-tag pts">+3 pts</span>
        </div>
      </div>

      <div class="s4-horizon-label">Ce mois-ci</div>

      <div class="reco-card reveal reveal-3" id="r2" onclick="toggleReco('r2', 11)">
        <div class="reco-top">
          <div class="check-circle" id="chk2">✓</div>
          <div class="reco-name">Installer des batardeaux anti-inondation</div>
        </div>
        <p class="reco-desc">Votre cave est en zone exposée. Un kit batardeau adapté réduit fortement le risque d'infiltration.</p>
        <div class="reco-tags">
          <span class="reco-tag">Pro conseillé</span>
          <span class="reco-tag">200 – 400 €</span>
          <span class="reco-tag pts">+11 pts</span>
        </div>
      </div>

      <div class="s4-score-update reveal reveal-4" id="scoreUpdate">
        <span class="s4-score-label">Score actuel</span>
        <span class="s4-score-val" id="currentScore">62 / 100</span>
      </div>

      <div style="margin-top:14px" class="reveal reveal-5">
        <button class="btn btn-primary btn-arrow" onclick="goTo(4)">
          Voir mes récompenses <span class="arr">→</span>
        </button>
      </div>
    </div>
    <div class="pad-bottom"></div>
  `,

  /* ═══════════════════════════
     SCREEN 4 — REWARDS
  ═══════════════════════════ */
  s4: () => `
    <div class="s5-hero">
      <div class="s5-hero-top">
        <span class="s5-hero-label">Mes points prévention</span>
        <span class="badge badge-white">🥈 Argent</span>
      </div>
      <div class="reveal reveal-1">
        <div>
          <span class="s5-pts-large" id="ptsDisplay">${window._earnedPts || 120}</span>
          <span class="s5-pts-unit">pts</span>
        </div>
        <p class="s5-pts-sub">Il vous manque ${200 - (window._earnedPts || 120)} pts pour le niveau Or</p>
      </div>
      <div class="reveal reveal-2">
        <div class="pts-bar-track">
          <div class="pts-bar-fill" style="width:${Math.min(((window._earnedPts||120)/200)*100,100)}%"></div>
        </div>
        <div class="s5-bar-labels">
          <span>Argent · 0 pts</span>
          <span>Or · 200 pts</span>
        </div>
      </div>
    </div>

    <div class="s5-body">
      <div class="s5-section-title">Déjà débloqué</div>

      <div class="reward-card reveal reveal-1">
        <div class="icon-box icon-box-lg icon-box-green">💚</div>
        <div class="reward-info">
          <div class="reward-name">–1% sur votre prime annuelle</div>
          <div class="reward-desc">Soit 18 € économisés cette année</div>
        </div>
        <div class="reward-right">
          <span class="badge badge-green">Actif</span>
        </div>
      </div>

      <div class="reward-card reveal reveal-2">
        <div class="icon-box icon-box-lg icon-box-blue2">🛡️</div>
        <div class="reward-info">
          <div class="reward-name">Bilan prévention offert</div>
          <div class="reward-desc">Diagnostic toiture par un expert AXA</div>
        </div>
        <div class="reward-right">
          <span class="badge badge-green">Actif</span>
        </div>
      </div>

      <div class="s5-section-title">À débloquer — Niveau Or</div>

      <div class="reward-card locked reveal reveal-3">
        <div class="icon-box icon-box-lg icon-box-amber">💰</div>
        <div class="reward-info">
          <div class="reward-name">–3% sur votre prime</div>
          <div class="reward-desc">Soit 54 € économisés par an</div>
        </div>
        <div class="reward-right">
          <span style="font-size:12px; color:var(--gray-300); font-weight:600;">${200 - (window._earnedPts||120)} pts</span>
        </div>
      </div>

      <div class="reward-card locked reveal reveal-4">
        <div class="icon-box icon-box-lg icon-box-gray">🔧</div>
        <div class="reward-info">
          <div class="reward-name">30 € remboursés équipement</div>
          <div class="reward-desc">Sur tout achat marketplace AXA</div>
        </div>
        <div class="reward-right">
          <span style="font-size:12px; color:var(--gray-300); font-weight:600;">${200 - (window._earnedPts||120)} pts</span>
        </div>
      </div>

      <div style="margin-top:14px" class="reveal reveal-5">
        <button class="btn btn-success" onclick="alert('Vos avantages seront activés lors du prochain renouvellement.')">
          Activer mes avantages
        </button>
      </div>
      <p class="s5-fine">Réduction appliquée au prochain renouvellement de votre contrat MRH.</p>
    </div>
    <div class="pad-bottom"></div>
  `
};
