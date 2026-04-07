/* ── SVG ICONS ── */
const IC = {
  home:   `<svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  arrow:  `<svg viewBox="0 0 24 24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`,
  back:   `<svg viewBox="0 0 24 24"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
  check:  `<svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  shield: `<svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`,
  lock:   `<svg viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`,
  warn:   `<svg viewBox="0 0 24 24"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
  info:   `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
  star:   `<svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`,
  pin:    `<svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
};

function sv(ic) { return ic; }

function riskStyle(color) {
  const m = {
    danger:  'background:var(--danger-light);color:var(--danger)',
    info:    'background:var(--info-light);color:var(--info)',
    warn:    'background:var(--warn-light);color:var(--warn)',
    success: 'background:var(--success-light);color:var(--success)',
    neutral: 'background:var(--n150);color:var(--n600)',
  };
  return m[color] || m.neutral;
}

/* ════════════════════════════
   S0 — SCENARIO SELECTION
════════════════════════════ */
function screenSelection() {
  const pEntries = Object.values(PROFILES);
  const cur = window._ST.profileId;
  const scen = window._ST.scenario;

  const profileCards = pEntries.map(p => {
    const sel = cur === p.id;
    const scCol = p.scenario === 'seasonal' ? 'var(--warn)' : 'var(--info)';
    return `
      <div class="profile-card ${sel ? 'selected' : ''}" onclick="selectProfile('${p.id}')">
        <div class="profile-avatar">${p.avatar}</div>
        <div style="flex:1;min-width:0">
          <div class="profile-name">${p.firstName}</div>
          <div class="profile-loc">${p.location} · ${p.propertyType}</div>
          <div class="profile-tagline" style="color:${scCol}">${p.tagline}</div>
        </div>
        <div class="profile-check">${sel ? sv(IC.check) : ''}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="sel-hero">
      <div class="sel-logo rv rv1">AXA France</div>
      <div style="font-size:32px;margin-bottom:10px" class="rv rv2">${sv(IC.shield).replace('<svg','<svg style="width:36px;height:36px;fill:rgba(255,255,255,0.9)"')}</div>
      <div class="sel-title rv rv3">Coach Prévention MRH</div>
      <p class="sel-sub rv rv4">Sélectionnez un profil pour démarrer la démonstration</p>
    </div>
    <div class="body">
      <div class="sel-section rv rv1">
        <div class="sel-section-label">Profil de démonstration</div>
        <div class="profile-list">${profileCards}</div>
      </div>
      <div class="rv rv2">
        <button class="btn btn-primary" id="startBtn" onclick="startFromSelection()" ${cur ? '' : 'disabled style="opacity:.5"'}>
          Commencer le parcours
          <svg class="btn-icon">${sv(IC.arrow).replace('<svg','<svg').replace('viewBox','viewBox')}</svg>
        </button>
        <a href="#" onclick="goTo(8);return false;" style="display:block;text-align:center;font-size:12px;color:var(--n400);margin-top:10px;text-decoration:none">
          Vue agent AXA →
        </a>
      </div>
    </div>
    <div class="bottom-safe"></div>
  `;
}

/* ════════════════════════════
   S1 — LANDING
════════════════════════════ */
function screenLanding() {
  const p = getProfile(window._ST.profileId);
  const isSeasonal = p.scenario === 'seasonal';

  const promisesHtml = [
    { icon: '🔍', label: 'Diagnostic personnalisé' },
    { icon: '📋', label: 'Plan d\'action ciblé' },
    { icon: '🎁', label: 'Rewards à débloquer' },
  ].map(pr => `
    <div class="promise-item">
      <div class="promise-icon">${pr.icon}</div>
      <div class="promise-label">${pr.label}</div>
    </div>
  `).join('');

  return `
    <div class="landing-banner ${isSeasonal ? 'seasonal' : 'subscription'}">
      <div class="landing-scenario-badge rv rv1">
        ${isSeasonal ? '🌧️ Saisonnalité' : '🏠 Souscription'}
      </div>
      <h1 class="landing-h1 rv rv2">
        ${isSeasonal
          ? `${p.firstName}, préparez-vous avant l'automne-hiver`
          : `${p.firstName}, votre plan de prévention commence ici`}
      </h1>
      <p class="landing-sub rv rv3">
        ${isSeasonal
          ? `Votre zone ${p.location} est exposée. Quelques gestes simples peuvent éviter l'essentiel des dégâts.`
          : `Bienvenue chez AXA. En 2 minutes, obtenez votre bilan de protection et vos premières récompenses.`}
      </p>
      <div class="landing-profile-row rv rv4">
        <div class="landing-profile-avatar">${p.avatar}</div>
        <div>
          <div class="landing-profile-name">${p.firstName} · ${p.propertyType}</div>
          <div class="landing-profile-detail">${p.location} · ${p.zone}</div>
        </div>
      </div>
    </div>
    <div class="body">
      ${isSeasonal ? `
        <div class="alert-box rv rv1">
          <div class="alert-box-icon">⚠️</div>
          <div class="alert-box-text"><strong>Risques élevés détectés</strong> sur votre zone : ${p.mainRisks.slice(0,2).map(r => RISKS[r]?.label).join(' et ')}. Des actions urgentes sont disponibles.</div>
        </div>
      ` : ''}
      <div class="section-title rv rv2">Ce que vous allez obtenir</div>
      <div class="promises rv rv2">${promisesHtml}</div>
      <div class="rv rv3">
        <button class="btn btn-primary" onclick="goTo(2)">
          Démarrer mon diagnostic
          <svg class="btn-icon">${sv(IC.arrow)}</svg>
        </button>
        <button class="btn btn-ghost" onclick="goTo(0)">Changer de profil</button>
      </div>
    </div>
    <div class="bottom-safe"></div>
  `;
}

/* ════════════════════════════
   S2 — DIAGNOSTIC
════════════════════════════ */
function screenDiagnostic() {
  const p = getProfile(window._ST.profileId);
  const qs = getQuestionsForProfile(p);
  window._ST.questions = qs;
  if (window._ST.diagStep === undefined) window._ST.diagStep = 0;
  const step = window._ST.diagStep;
  const q = qs[step];
  const total = qs.length;

  const stepperHtml = qs.map((_, i) => {
    const cls = i < step ? 'done' : i === step ? 'current' : '';
    const lineClass = i < step ? 'done' : '';
    return `
      <div class="diag-step-dot ${cls}"></div>
      ${i < total - 1 ? `<div class="diag-step-line ${lineClass}"></div>` : ''}
    `;
  }).join('');

  const risk = RISKS[q.riskId];
  const optionsHtml = q.options.map((opt, i) => {
    const sel = window._ST.diagAnswers && window._ST.diagAnswers[q.id] === opt.v;
    const ptsLabel = opt.pts > 0
      ? `<span class="opt-pts">+${opt.pts} pts</span>`
      : `<span class="opt-pts zero">0 pt</span>`;
    return `
      <div class="opt-item ${sel ? 'sel' : ''}" onclick="selectDiagOpt('${q.id}','${opt.v}',this)">
        ${opt.l}
        ${ptsLabel}
      </div>
    `;
  }).join('');

  const isLast = step === total - 1;
  const hasAnswer = window._ST.diagAnswers && window._ST.diagAnswers[q.id];

  return `
    <div class="progress-bar"><div class="progress-fill" style="width:${Math.round((step/total)*100)}%"></div></div>
    <div class="topbar">
      <button class="topbar-back" onclick="diagBack()" aria-label="Retour">${sv(IC.back)}</button>
      <div class="topbar-info">
        <div class="topbar-title">Diagnostic express</div>
        <div class="topbar-sub">Question ${step+1} sur ${total}</div>
      </div>
      <span class="tag tag-neutral" style="flex-shrink:0">⏱ 2 min</span>
    </div>
    <div class="body-sm">
      <div class="diag-stepper" style="margin-bottom:var(--sp4)">${stepperHtml}</div>

      <div class="q-card rv rv1">
        <div class="q-card-num">
          <span style="${riskStyle(q.riskId === 'incendie' ? 'danger' : q.riskId === 'degat-eaux' || q.riskId === 'inondation' ? 'info' : q.riskId === 'vol' ? 'neutral' : 'warn')};padding:2px 8px;border-radius:var(--r-pill)">${risk?.icon} ${risk?.label}</span>
        </div>
        <div class="q-card-text">${q.text}</div>
        <div class="option-list">${optionsHtml}</div>
      </div>

      ${step === 0 ? `
        <div class="reassure green rv rv2" style="margin-top:0">
          <span class="reassure-icon">${sv(IC.check)}</span>
          <span>Vos réponses personnalisent votre plan. Aucun impact sur votre prime.</span>
        </div>
      ` : ''}
    </div>
    <div class="diag-nav">
      <button class="diag-nav-back" onclick="diagBack()">${sv(IC.back)}</button>
      <button class="btn btn-primary diag-nav-next" onclick="diagNext()" ${hasAnswer ? '' : 'disabled style="opacity:.5"'} id="diagNextBtn">
        ${isLast ? 'Voir mon score' : 'Question suivante'}
        <svg class="btn-icon">${sv(IC.arrow)}</svg>
      </button>
    </div>
  `;
}

/* ════════════════════════════
   S3 — SCORE
════════════════════════════ */
function screenScore() {
  const p = getProfile(window._ST.profileId);
  const score = window._ST.currentScore || p.preparationScore;
  const sl = scoreLevel(score);
  const actions = getActionsForProfile(p);
  const totalGain = actions.reduce((s, a) => s + a.pts, 0);
  const potential = Math.min(score + totalGain, 100);
  const circ = 352;
  const offset = Math.round(circ * (1 - score / 100));

  const riskBarsHtml = p.mainRisks.map(rId => {
    const r = RISKS[rId];
    if (!r) return '';
    const barScore = r.level === 'high' ? 35 : r.level === 'medium' ? 55 : 78;
    const fillClass = r.level === 'high' ? 'risk-fill-danger' : r.level === 'medium' ? 'risk-fill-warn' : 'risk-fill-success';
    const tagClass  = r.level === 'high' ? 'tag-danger' : r.level === 'medium' ? 'tag-warn' : 'tag-success';
    return `
      <div class="risk-bar-row">
        <div class="risk-bar-header">
          <span class="risk-bar-label">${r.icon} ${r.label}</span>
          <span class="tag ${tagClass}">${r.levelLabel}</span>
        </div>
        <div class="risk-track"><div class="risk-fill ${fillClass}" style="width:${barScore}%"></div></div>
      </div>
    `;
  }).join('');

  return `
    <div class="score-hero">
      <div class="score-hero-label rv rv1">Votre score de prévention</div>
      <div class="score-ring-wrap rv-scale" style="margin-bottom:var(--sp3)">
        <svg viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="10"/>
          <circle cx="70" cy="70" r="56" fill="none" stroke="var(--success-mid)" stroke-width="10"
            stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" class="ring-arc"/>
        </svg>
        <div class="score-ring-center">
          <div class="score-num">${score}</div>
          <div class="score-denom">/100</div>
        </div>
      </div>
      <div class="score-badge rv rv3">
        ${sv(IC.shield).replace('<svg','<svg style="width:12px;height:12px;fill:currentColor;vertical-align:middle"')}
        ${sl.label} · ${sl.level === 'weak' ? 'Bronze' : sl.level === 'average' ? 'Argent' : 'Or'}
      </div>
      <p class="score-tagline rv rv3">${p.mainRisks.length} risques analysés · ${actions.length} actions disponibles</p>
      <div class="score-potential rv rv4">
        <span>Score potentiel avec les actions recommandées</span>
        <span class="score-potential-arrow">→ ${potential}/100</span>
      </div>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:55%"></div></div>
    <div class="body-sm">
      <div class="section-title rv rv1">Score par risque</div>
      <div class="risk-bars rv rv2">${riskBarsHtml}</div>
      <div class="cta-box rv rv3">
        <p class="cta-text">
          <strong>+${Math.min(totalGain, potential - score)} pts possibles</strong> avec vos actions personnalisées — débloquez vos premières récompenses AXA.
        </p>
        <button class="btn btn-primary" onclick="goTo(4)">
          Comprendre mes risques
          <svg class="btn-icon">${sv(IC.arrow)}</svg>
        </button>
      </div>
    </div>
    <div class="bottom-safe"></div>
  `;
}

/* ════════════════════════════
   S4 — RISK PROJECTION
════════════════════════════ */
function screenProjection() {
  const p = getProfile(window._ST.profileId);
  const mainRisk = RISKS[p.mainRisks[0]];
  if (!mainRisk) return '<div class="body"><p>Données manquantes</p></div>';

  const damagesHtml = mainRisk.damages.map(d =>
    `<div class="damage-item rv rv2"><div class="damage-dot"></div>${d}</div>`
  ).join('');

  return `
    <div class="projection-hero">
      <div class="progress-bar" style="position:relative;margin-bottom:var(--sp4)"><div class="progress-fill" style="width:67%"></div></div>
      <div class="topbar" style="position:relative;padding-left:0;background:transparent">
        <button class="topbar-back" onclick="goTo(3)" style="background:rgba(255,255,255,.15)" aria-label="Retour">${sv(IC.back)}</button>
        <div class="topbar-info">
          <div class="topbar-title" style="color:#fff">Projection de risque</div>
          <div class="topbar-sub">Impact potentiel sur votre logement</div>
        </div>
      </div>
      <div style="margin-top:var(--sp4)">
        <div class="projection-risk-icon rv rv1">${mainRisk.icon}</div>
        <div class="projection-risk-name rv rv2">${mainRisk.label}</div>
        <div class="projection-tagline rv rv3">${mainRisk.explanation}</div>
      </div>
    </div>
    <div class="body-sm">
      <div class="stat-cards rv rv1">
        <div class="stat-card">
          <div class="stat-num">1/3</div>
          <div class="stat-label">logements touchés chaque année</div>
        </div>
        <div class="stat-card">
          <div class="stat-num" style="color:var(--success)">${mainRisk.avoidablePercent}%</div>
          <div class="stat-label">des dommages sont évitables</div>
        </div>
      </div>
      <div class="section-title">Dommages évitables</div>
      <div class="damage-list">${damagesHtml}</div>
      <div class="reassure blue rv rv3" style="margin-bottom:var(--sp4)">
        <span class="reassure-icon">${sv(IC.info)}</span>
        <span>Avec les bons gestes, <strong>${mainRisk.avoidablePercent} % des dégâts</strong> peuvent être évités avant même qu'un sinistre survienne.</span>
      </div>
      <button class="btn btn-primary rv rv4" onclick="goTo(5)">
        Voir mon plan d'action
        <svg class="btn-icon">${sv(IC.arrow)}</svg>
      </button>
    </div>
    <div class="bottom-safe"></div>
  `;
}

/* ════════════════════════════
   S5 — ACTION PLAN
════════════════════════════ */
function screenActionPlan() {
  const p = getProfile(window._ST.profileId);
  const actions = getActionsForProfile(p);
  const done = window._ST.completedActions || [];
  const totalPts = actions.filter(a => !done.includes(a.id)).reduce((s, a) => s + a.pts, 0);

  const horizons = ['now','this_month'];
  const labels   = { now:'Ce week-end — actions rapides', this_month:'Ce mois-ci — investissements ciblés' };

  const cardsHtml = horizons.map(h => {
    const items = actions.filter(a => a.horizon === h && !done.includes(a.id));
    if (!items.length) return '';
    const cards = items.map((a, i) => `
      <div class="reco-card rv rv${i+1}" id="ac_${a.id}" onclick="openAction('${a.id}')">
        <span class="reco-risk-badge" style="${riskStyle(a.riskColor)}">${a.riskLabel}</span>
        <div class="reco-top">
          <div class="reco-check" id="chk_${a.id}">
            <svg viewBox="0 0 24 24" style="width:11px;height:11px;fill:${done.includes(a.id)?'white':'transparent'}">${sv(IC.check).replace('<svg viewBox="0 0 24 24">','')}</svg>
          </div>
          <div class="reco-title">${a.title}</div>
        </div>
        <div class="reco-tags">
          ${a.tags.map((t,ti) => `<span class="meta-tag ${ti===0&&t.includes('Gratuit')?'meta-tag-green':ti===0&&t.includes('€')?'meta-tag-amber':''}">${t}</span>`).join('')}
          <span class="meta-tag meta-tag-blue">+${a.pts} pts</span>
        </div>
      </div>
    `).join('');
    return `<div class="horizon-label">${labels[h]}</div>${cards}`;
  }).join('');

  const rewards = getRewardsForProfile(p, done.length);
  const nextReward = rewards.find(r => r.computedStatus === 'available');

  return `
    <div class="progress-bar"><div class="progress-fill" style="width:84%"></div></div>
    <div class="actions-header">
      <div class="actions-title">Mon plan d'action</div>
      <div class="actions-sub">${actions.length} actions · <span class="actions-pts" id="ptsHeader">+${totalPts} pts disponibles</span></div>
    </div>
    <div class="body-sm">
      ${nextReward ? `
        <div class="reward-unlock-cta rv rv1">
          <svg>${sv(IC.star).replace('<svg','<svg')}</svg>
          <span>Réalisez <strong>${nextReward.minActions - done.length} action${nextReward.minActions - done.length > 1 ? 's' : ''}</strong> pour débloquer : <strong>${nextReward.title}</strong></span>
        </div>
      ` : ''}
      ${cardsHtml}
      <div class="score-bar rv rv5" id="scoreBar">
        <span class="score-bar-label">Score de préparation</span>
        <span class="score-bar-val" id="currentScore">${window._ST.currentScore || p.preparationScore} / 100</span>
      </div>
      <div style="margin-top:var(--sp4)" class="rv rv6">
        <button class="btn btn-primary" onclick="goTo(8)">
          Voir mes rewards
          <svg class="btn-icon">${sv(IC.arrow)}</svg>
        </button>
      </div>
    </div>
    <div class="bottom-safe"></div>
  `;
}

/* ════════════════════════════
   S6 — ACTION DETAIL
════════════════════════════ */
function screenActionDetail() {
  const id = window._ST.selectedAction;
  const a  = ALL_ACTIONS.find(x => x.id === id);
  if (!a) return `<div class="body"><p style="color:var(--n500)">Sélectionnez une action depuis le plan.</p><button class="btn btn-ghost" onclick="goTo(5)">← Retour</button></div>`;
  const done = (window._ST.completedActions || []).includes(a.id);

  const stepsHtml = a.steps.map((s, i) => `
    <div class="step-item rv rv${i+2}">
      <div class="step-num-badge">${i+1}</div>
      <div class="step-text">${s}</div>
    </div>
  `).join('');

  return `
    <div class="detail-header">
      <div class="topbar" style="position:relative;padding:0;background:transparent;margin-bottom:var(--sp3)">
        <button class="topbar-back" style="background:rgba(255,255,255,.15)" onclick="goTo(5)" aria-label="Retour">${sv(IC.back)}</button>
      </div>
      <span class="detail-risk-badge rv rv1" style="${riskStyle(a.riskColor)}">${a.riskLabel}</span>
      <h1 class="detail-title rv rv2">${a.title}</h1>
      <div class="detail-chips rv rv3">
        <span class="detail-chip">${a.effort === 'low' ? '🟢 Effort faible' : a.effort === 'medium' ? '🟡 Effort moyen' : '🔴 Effort élevé'}</span>
        <span class="detail-chip">⏱ ${a.duration}</span>
        <span class="detail-chip">+${a.pts} pts</span>
      </div>
    </div>
    <div class="body-sm">
      <div class="conseil-axa-box rv rv1">
        <span class="conseil-axa-icon">${sv(IC.shield).replace('<svg','<svg style="width:16px;height:16px;fill:var(--axa)"')}</span>
        <div class="conseil-axa-text">« ${a.conseilText} »</div>
      </div>
      <div class="section-title">Comment faire</div>
      <div class="steps-list">${stepsHtml}</div>
      <div class="benefit-box rv rv${a.steps.length+3}">
        ${sv(IC.check).replace('<svg','<svg style="width:15px;height:15px;fill:var(--success)"')}
        <div class="benefit-text">${a.benefit}</div>
      </div>
      <div class="pts-gain-banner rv rv${a.steps.length+4}">
        <span class="pts-gain-label">Points gagnés si réalisé</span>
        <span class="pts-gain-val">+${a.pts} pts</span>
      </div>
    </div>
    <div class="detail-sticky">
      ${done ? `
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;color:var(--success);font-size:14px;font-weight:600;padding:10px">
          ${sv(IC.check).replace('<svg','<svg style="width:18px;height:18px;fill:var(--success)"')} Action déjà réalisée ✓
        </div>
      ` : `
        <button class="btn btn-success" onclick="completeAction('${a.id}')">
          Je l'ai fait ✓
          <svg class="btn-icon">${sv(IC.check)}</svg>
        </button>
      `}
    </div>
  `;
}

/* ════════════════════════════
   S7 — SUCCESS SCREEN
════════════════════════════ */
function screenSuccess() {
  const id     = window._ST.lastCompletedAction;
  const a      = ALL_ACTIONS.find(x => x.id === id);
  const p      = getProfile(window._ST.profileId);
  const before = window._ST.scoreBefore || p.preparationScore;
  const after  = window._ST.currentScore || p.preparationScore;
  const delta  = after - before;
  const done   = window._ST.completedActions || [];
  const rewards = getRewardsForProfile(p, done.length);
  const newUnlocked = rewards.filter(r => r.computedStatus === 'unlocked' && r.minActions === done.length);
  const nextAction  = getActionsForProfile(p).find(x => !done.includes(x.id));

  return `
    <div class="success-hero">
      <div class="success-icon">✅</div>
      <div class="success-title">Bravo !</div>
      <div class="success-sub">${a ? a.title : 'Action réalisée'}</div>
    </div>
    <div class="body">
      <div class="score-before-after rv rv1">
        <div class="score-ba-block">
          <div class="score-ba-num score-ba-before">${before}</div>
          <div class="score-ba-label" style="color:var(--n400)">Avant</div>
        </div>
        <div class="score-ba-arrow">→</div>
        <div class="score-ba-block">
          <div class="score-ba-num score-ba-after">${after}</div>
          <div class="score-ba-label" style="color:var(--success)">Après</div>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:var(--sp4)">
        <span class="score-delta">+${delta} pts gagnés</span>
      </div>
      ${a ? `
        <div class="action-done-card rv rv2">
          <div class="action-done-header">
            <div class="action-done-check">${sv(IC.check).replace('<svg','<svg style="width:11px;height:11px;fill:white"')}</div>
            <div class="action-done-title">${a.title}</div>
          </div>
          <div class="action-done-conseil">${a.conseilText}</div>
        </div>
      ` : ''}
      ${newUnlocked.length > 0 ? newUnlocked.map(r => `
        <div class="toast-reward rv rv3">
          <div class="toast-icon">${r.icon}</div>
          <div>
            <div class="toast-title">🎉 Reward débloqué !</div>
            <div class="toast-title" style="font-size:12px;margin-top:1px">${r.title}</div>
            <div class="toast-sub">${r.subtitle}</div>
          </div>
        </div>
      `).join('') : ''}
      ${nextAction ? `
        <div style="margin-bottom:var(--sp2)"><div class="section-title">Action suivante suggérée</div></div>
        <div class="next-action-card rv rv4" onclick="openAction('${nextAction.id}')">
          <span style="font-size:18px">${RISKS[nextAction.riskId]?.icon || '📋'}</span>
          <div>
            <div class="next-action-label">${nextAction.riskLabel}</div>
            <div class="next-action-title">${nextAction.title}</div>
          </div>
          <span class="next-action-arrow">→</span>
        </div>
      ` : ''}
      <div style="margin-top:var(--sp4)" class="rv rv5">
        <button class="btn btn-primary" onclick="goTo(8)">
          Voir mes rewards
          <svg class="btn-icon">${sv(IC.arrow)}</svg>
        </button>
        <button class="btn btn-ghost" onclick="goTo(5)">Continuer mon plan</button>
      </div>
    </div>
    <div class="bottom-safe"></div>
  `;
}

/* ════════════════════════════
   S8 — REWARDS
════════════════════════════ */
function screenRewards() {
  const p       = getProfile(window._ST.profileId);
  const done    = window._ST.completedActions || [];
  const score   = window._ST.currentScore || p.preparationScore;
  const rewards = getRewardsForProfile(p, done.length);
  const pct     = Math.min((score / 100) * 100, 100);

  function rewardCard(r, i) {
    const statusHtml =
      r.computedStatus === 'unlocked' ? `<span class="tag tag-success">Actif</span>` :
      r.computedStatus === 'teaser'   ? `<span class="tag tag-neutral">${r.teaser}</span>` :
      r.computedStatus === 'available'? `<span class="tag tag-primary">${r.minActions - done.length} action${r.minActions - done.length > 1 ? 's' : ''}</span>` :
      `<span class="tag tag-neutral">Verrouillé</span>`;
    return `
      <div class="reward-card ${r.computedStatus === 'locked' || r.computedStatus === 'teaser' ? 'locked' : ''} rv rv${i+1}">
        <div class="reward-icon" style="background:${r.iconBg}">${r.icon}</div>
        <div class="reward-info">
          <div class="reward-name">${r.title}</div>
          <div class="reward-desc">${r.subtitle} · ${r.desc.substring(0,45)}…</div>
        </div>
        <div class="reward-right">${statusHtml}</div>
      </div>
    `;
  }

  const p1 = rewards.filter(r => r.priority === 1);
  const p2 = rewards.filter(r => r.priority === 2);

  return `
    <div class="rewards-hero">
      <div class="rewards-hero-top">
        <span class="rewards-hero-label">Rewards AXA · ${p.firstName}</span>
        <span class="tag tag-white">${sv(IC.shield).replace('<svg','<svg style="width:11px;height:11px;fill:currentColor;vertical-align:middle"')} ${scoreLevel(score).level === 'good' ? 'Or' : scoreLevel(score).level === 'average' ? 'Argent' : 'Bronze'}</span>
      </div>
      <div class="rv rv1">
        <div><span class="pts-big">${score}</span><span class="pts-unit">/100</span></div>
        <p class="pts-sub">${done.length} action${done.length > 1 ? 's' : ''} réalisée${done.length > 1 ? 's' : ''} · profil ${p.propertyType}</p>
      </div>
      <div class="rv rv2">
        <div class="pts-track"><div class="pts-fill" style="width:${pct}%"></div></div>
        <div class="pts-track-labels"><span>Bronze · 0</span><span>Or · 70+</span></div>
      </div>
    </div>
    <div class="body-sm">
      <div class="reward-section-title">Priorité 1 — Disponibles dès maintenant</div>
      ${p1.map((r, i) => rewardCard(r, i)).join('')}
      ${p2.length ? `<div class="reward-section-title">En cours d'étude — Bientôt</div>` : ''}
      ${p2.map((r, i) => rewardCard(r, i + p1.length)).join('')}
      <div style="margin-top:var(--sp4)" class="rv rv5">
        <button class="btn btn-success" onclick="activateRewards()">
          Activer mes rewards
          <svg class="btn-icon">${sv(IC.check)}</svg>
        </button>
      </div>
      <p class="footer-fine">Rewards activés au prochain renouvellement de votre contrat MRH.</p>
    </div>
    <div class="bottom-safe"></div>
  `;
}

const SCREENS = { s0:screenSelection, s1:screenLanding, s2:screenDiagnostic, s3:screenScore, s4:screenProjection, s5:screenActionPlan, s6:screenActionDetail, s7:screenSuccess, s8:screenRewards };
