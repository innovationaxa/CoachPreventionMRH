/* ── SVG ICONS ── */
const IC = {
  home:   `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  arrow:  `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`,
  back:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
  check:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  shield: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`,
  lock:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>`,
  warn:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
  info:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
  star:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`,
  pin:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
};

function sv(ic, extraStyle) {
  if (!extraStyle) return ic;
  return ic.replace('<svg ', '<svg style="' + extraStyle + '" ');
}

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
      <div style="font-size:32px;margin-bottom:10px" class="rv rv2">${sv(IC.shield, 'width:36px;height:36px;fill:rgba(255,255,255,0.9)')}</div>
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

  const benefitsHtml = [
    { icon: '🔍', label: 'Comprendre vos risques réels' },
    { icon: '🎯', label: 'Un plan d\'action priorisé' },
    { icon: '🛠️', label: 'Savoir quoi faire en premier' },
    { icon: '🎁', label: 'Des avantages concrets à débloquer' },
  ].map(b => `
    <div class="promise-item">
      <div class="promise-icon">${b.icon}</div>
      <div class="promise-label">${b.label}</div>
    </div>
  `).join('');

  const riskPreviewHtml = p.mainRisks.map(rId => {
    const r = RISKS[rId];
    if (!r) return '';
    const tagCls = r.level === 'high' ? 'tag-danger' : r.level === 'medium' ? 'tag-warn' : 'tag-success';
    return `
      <div class="risk-preview-card">
        <div class="risk-preview-icon">${r.icon}</div>
        <div class="risk-preview-info">
          <div class="risk-preview-label">${r.label}</div>
          <div class="risk-preview-pct">${r.avoidablePercent}% des dommages évitables</div>
        </div>
        <span class="tag ${tagCls}">${r.levelLabel}</span>
      </div>
    `;
  }).join('');

  return `
    <div class="landing-banner ${isSeasonal ? 'seasonal' : 'subscription'}">
      <div class="landing-scenario-badge rv rv1">
        ${isSeasonal ? '🌧️ Saisonnalité automne-hiver' : '🏠 Nouveau contrat MRH'}
      </div>
      <h1 class="landing-h1 rv rv2">
        ${isSeasonal
          ? `${p.firstName}, protégez votre logement avant la saison à risque`
          : `${p.firstName}, découvrez comment mieux protéger votre logement`}
      </h1>
      <p class="landing-sub rv rv3">
        ${isSeasonal
          ? `Diagnostic en 2 min · Actions à réaliser ce week-end · Avantages AXA`
          : `Diagnostic en 2 min · Plan d'action personnalisé · Avantages AXA`}
      </p>
      <div class="landing-profile-row rv rv4">
        <div class="landing-profile-avatar">${p.avatar}</div>
        <div>
          <div class="landing-profile-name">${p.firstName} · ${p.propertyType}</div>
          <div class="landing-profile-detail">${sv(IC.pin, 'width:11px;height:11px;vertical-align:middle')} ${p.location} · ${p.zone}</div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="section-title rv rv1">Vos risques identifiés sur votre zone</div>
      <div class="risk-preview-list rv rv2">${riskPreviewHtml}</div>

      ${isSeasonal ? `
        <div class="alert-box rv rv3">
          <div class="alert-box-icon">⚠️</div>
          <div class="alert-box-text"><strong>Actions urgentes disponibles</strong> — des gestes simples peuvent éviter l'essentiel des dégâts avant que la saison à risque arrive.</div>
        </div>
      ` : ''}

      <div class="diag-value-card rv rv3">
        <div class="diag-value-eyebrow">Diagnostic express · 2 min</div>
        <div class="diag-value-title">Votre score,<br>vraiment<br>personnalisé.</div>
        <p class="diag-value-body">Votre zone de risque est déjà connue. Ce diagnostic affine votre score selon l'état réel de votre logement — pour des recommandations qui vous correspondent vraiment, pas un profil générique.</p>
        <div class="diag-value-checklist">
          <div class="diag-value-check"><span class="diag-check-icon">✓</span>Un score adapté à votre logement, pas votre adresse seule</div>
          <div class="diag-value-check"><span class="diag-check-icon">✓</span>Actions priorisées selon votre situation réelle</div>
          <div class="diag-value-check"><span class="diag-check-icon">✓</span>Avantages AXA à débloquer dès la 1ère action</div>
        </div>
        <button class="btn btn-primary" onclick="goTo(2)" style="margin-top:var(--sp4);width:100%">
          Démarrer mon diagnostic
          <svg class="btn-icon">${sv(IC.arrow)}</svg>
        </button>
      </div>
      <div class="diag-skip-wrap rv rv4">
        <button class="diag-skip-btn" onclick="goTo(9)">
          Passer le diagnostic pour l'instant
          <span class="diag-skip-note">Accéder au suivi · score moins précis</span>
        </button>
      </div>
      <div style="text-align:center;padding-bottom:var(--sp3)">
        <button class="btn btn-ghost" style="font-size:11px;color:var(--n300)" onclick="goTo(0)">Changer de profil</button>
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
  const optionsHtml = q.options.map((opt) => {
    const sel = window._ST.diagAnswers && window._ST.diagAnswers[q.id] === opt.v;
    return `
      <div class="opt-item ${sel ? 'sel' : ''}" onclick="selectDiagOpt('${q.id}','${opt.v}',this)">
        ${opt.l}
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
        <div class="q-card-risk-banner" style="${riskStyle(q.riskId === 'incendie' ? 'danger' : q.riskId === 'degat-eaux' || q.riskId === 'inondation' ? 'info' : q.riskId === 'vol' ? 'neutral' : 'warn')}">
          <span style="font-size:16px">${risk?.icon}</span>
          <div>
            <div style="font-weight:600;font-size:13px">${risk?.label}</div>
            <div style="font-size:11px;opacity:.75">${risk?.explanation}</div>
          </div>
        </div>
        <div class="q-card-text">${q.text}</div>
        <div class="option-list">${optionsHtml}</div>
      </div>
    </div>
    <div class="diag-nav">
      <button class="diag-nav-back" onclick="diagBack()" aria-label="Question précédente">${sv(IC.back)}</button>
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
  const actions = getActionsForProfile(p, window._ST.diagAnswers);
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
    const comment   = r.level === 'high'
      ? 'Préparation insuffisante — des actions urgentes sont recommandées.'
      : r.level === 'medium'
      ? 'Quelques actions simples réduiraient significativement votre exposition.'
      : 'Bonne maîtrise de ce risque. Maintenez vos équipements à jour.';
    return `
      <div class="risk-bar-row">
        <div class="risk-bar-header">
          <span class="risk-bar-label">${r.icon} ${r.label}</span>
          <span class="tag ${tagClass}">${r.levelLabel}</span>
        </div>
        <div class="risk-track"><div class="risk-fill ${fillClass}" style="width:${barScore}%"></div></div>
        <div class="risk-score-meta">
          <span class="risk-score-pts">${barScore}/100</span>
          <span class="risk-score-comment">${comment}</span>
        </div>
      </div>
    `;
  }).join('');

  /* ── Risk map ── */
  const RISK_ZONE_POS = [[160,96],[184,70],[134,114],[196,106]];
  const RISK_ZONE_RGB = {'inondation':'59,130,246','tempete':'245,158,11','incendie':'239,68,68','degat-eaux':'20,184,166','vol':'139,92,246','rga':'217,119,6'};
  const RISK_DOT_COL  = {'inondation':'#3B82F6','tempete':'#F59E0B','incendie':'#EF4444','degat-eaux':'#14B8A6','vol':'#8B5CF6','rga':'#D97706'};
  const riskZoneSvg = p.mainRisks.map((rId, i) => {
    const [cx,cy] = RISK_ZONE_POS[i] || [160,96];
    const rgb = RISK_ZONE_RGB[rId] || '100,100,100';
    const r = 54 - i * 8;
    return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="rgba(${rgb},0.18)" stroke="rgba(${rgb},0.4)" stroke-width="1.2" stroke-dasharray="5 3"/>`;
  }).join('');
  const riskLegendHtml = p.mainRisks.map(rId => {
    const r = RISKS[rId];
    if (!r) return '';
    const dot = RISK_DOT_COL[rId] || '#888';
    const tc  = r.level === 'high' ? 'tag-danger' : r.level === 'medium' ? 'tag-warn' : 'tag-success';
    return `<div class="risk-map-legend-row"><div class="risk-map-legend-dot" style="background:${dot}"></div><span>${r.icon} ${r.label}</span><span class="tag ${tc}" style="font-size:9px;padding:2px 6px;margin-left:auto">${r.levelLabel}</span></div>`;
  }).join('');
  const mapPinSvg = sv(IC.pin, 'width:10px;height:10px;vertical-align:middle');
  const riskMapHtml = `
    <div class="risk-map-card rv rv1">
      <div class="risk-map-wrap">
        <div class="risk-map-bg"></div>
        <svg class="risk-map-overlay-svg" viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
          ${riskZoneSvg}
          <circle cx="160" cy="96" r="17" fill="rgba(0,0,143,0.15)">
            <animate attributeName="r" values="17;27;17" dur="2.5s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.55;0;0.55" dur="2.5s" repeatCount="indefinite"/>
          </circle>
          <circle cx="160" cy="96" r="8" fill="#00008F" stroke="white" stroke-width="2.5"/>
          <circle cx="160" cy="96" r="3" fill="white"/>
        </svg>
        <div class="risk-map-location">${mapPinSvg} ${p.location}</div>
        <div class="risk-map-source">AXA × Géorisques</div>
      </div>
      <div class="risk-map-legend">${riskLegendHtml}</div>
    </div>
  `;

  const diagGain = score - p.preparationScore;

  return `
    <div class="score-hero">
      <div class="score-hero-label rv rv1">Votre score de prévention</div>
      <div class="score-ring-wrap rv-scale" style="margin-bottom:var(--sp3)">
        <svg viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="10"/>
          <circle cx="70" cy="70" r="56" fill="none" stroke="var(--success-mid)" stroke-width="10"
            stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" class="ring-arc"/>
        </svg>
        <div class="score-ring-center">
          <div class="score-num">${score}</div>
          <div class="score-denom">/100</div>
        </div>
      </div>
      <div class="score-badge rv rv3">
        ${sv(IC.shield, 'width:12px;height:12px;vertical-align:middle')}
        ${sl.label} · ${sl.level === 'weak' ? 'Bronze' : sl.level === 'average' ? 'Argent' : 'Or'}
      </div>
      <p class="score-tagline rv rv3">${p.mainRisks.length} risques analysés · ${actions.length} actions disponibles</p>
      <div class="score-potential rv rv4">
        <span>Avec toutes vos actions</span>
        <span class="score-potential-arrow">→ ${potential}/100</span>
      </div>
    </div>
    <div class="progress-bar"><div class="progress-fill" style="width:55%"></div></div>
    <div class="body-sm">

      <div class="section-title rv rv1">Exposition géographique</div>
      ${riskMapHtml}

      <div class="section-title rv rv2">Exposition par risque</div>
      <div class="risk-bars rv rv2">${riskBarsHtml}</div>

      <div class="score-cta-card rv rv3">
        <div class="score-cta-eyebrow">Votre potentiel d'amélioration</div>
        <div class="score-cta-title">+${Math.min(totalGain, 100 - score)} pts<br>vous attendent.</div>
        <div class="score-cta-chips">
          <span class="score-cta-chip">Score actuel <strong>${score}</strong></span>
          ${diagGain > 0 ? `<span class="score-cta-chip scc-green">Diagnostic <strong>+${diagGain}</strong></span>` : ''}
          <span class="score-cta-chip scc-blue">Actions <strong>+${totalGain}</strong></span>
        </div>
        <div class="score-cta-scale">Faible &lt; 45 · Modéré 45–69 · Bon 70+</div>
        <button class="btn btn-primary" onclick="goTo(4)" style="width:100%;margin-top:var(--sp4)">
          Voir l'impact sur mes risques
          <svg class="btn-icon">${sv(IC.arrow)}</svg>
        </button>
      </div>
      <div style="text-align:center;padding-bottom:var(--sp4)">
        <button class="diag-skip-btn" onclick="goTo(9)">
          Accéder à mon tableau de bord prévention
          <span class="diag-skip-note">Suivi · actions réalisées · récompenses</span>
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
  const riskIdx = window._ST.projectionRiskIdx || 0;
  const activeRiskId = p.mainRisks[riskIdx];
  const mainRisk = RISKS[activeRiskId];
  if (!mainRisk) return '<div class="body"><p>Données manquantes</p></div>';

  // Tab bar across all mainRisks
  const tabsHtml = p.mainRisks.map((rId, i) => {
    const r = RISKS[rId];
    if (!r) return '';
    const active = i === riskIdx;
    return `<button class="proj-tab${active ? ' active' : ''}" onclick="window._ST.projectionRiskIdx=${i};render(4);updateNav(4)" aria-label="${r.label}">
      <span class="proj-tab-icon">${r.icon}</span>
      <span class="proj-tab-label">${r.label}</span>
    </button>`;
  }).join('');

  const damagesHtml = mainRisk.damages.map(d =>
    `<div class="damage-item rv rv2"><div class="damage-dot"></div>${d}</div>`
  ).join('');

  return `
    <div class="projection-hero">
      <div class="progress-bar" style="position:relative;margin-bottom:var(--sp4)"><div class="progress-fill" style="width:67%"></div></div>
      <div class="topbar" style="position:relative;padding-left:0;background:transparent">
        <button class="topbar-back" onclick="goTo(9)" style="background:rgba(255,255,255,.15)" aria-label="Retour">${sv(IC.back)}</button>
        <div class="topbar-info">
          <div class="topbar-title" style="color:#fff">Risques identifiés</div>
          <div class="topbar-sub">Impact potentiel sur votre logement</div>
        </div>
      </div>
      <div class="proj-tabs-wrap">
        <div class="proj-tabs">${tabsHtml}</div>
      </div>
      <div style="margin-top:var(--sp3)">
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
        Voir les actions recommandées
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
  const allActions = getActionsForProfile(p, window._ST.diagAnswers);
  const isLocataire = p.occupancyStatus === 'Locataire';
  const done = window._ST.completedActions || [];
  const totalPts = allActions.reduce((s, a) => s + a.pts, 0);
  const showAll = window._ST.showAllActions === true;
  const TOP_N = 3;
  const displayedActions = showAll ? allActions : allActions.slice(0, TOP_N);
  const hidden = allActions.length - TOP_N;

  function actionCard(a, i) {
    const effortDot = a.effort === 'low' ? '🟢' : a.effort === 'medium' ? '🟡' : '🔴';
    const ownerTag = isLocataire && a.requiresOwner
      ? `<span class="meta-tag meta-tag-amber" style="font-size:10px">⚠️ Accord propriétaire requis</span>`
      : '';
    return `
      <div class="reco-card rv rv${i+1}" onclick="openAction('${a.id}')">
        <div class="reco-card-top">
          <span class="reco-risk-badge" style="${riskStyle(a.riskColor)}">${a.riskLabel}</span>
          <span class="meta-tag meta-tag-blue">+${a.pts} pts</span>
        </div>
        <div class="reco-title">${a.title}</div>
        <div class="reco-tags">
          <span class="meta-tag">${effortDot} ${a.effort === 'low' ? 'Effort faible' : a.effort === 'medium' ? 'Effort moyen' : 'Effort élevé'}</span>
          ${a.tags.map((t, ti) => `<span class="meta-tag ${ti===0&&t.includes('Gratuit')?'meta-tag-green':ti===0&&t.includes('€')?'meta-tag-amber':''}">${t}</span>`).join('')}
          ${ownerTag}
        </div>
        <div class="reco-benefit">${a.benefit}</div>
      </div>
    `;
  }

  const rewards = getRewardsForProfile(p, done.length);
  const nextReward = rewards.find(r => r.computedStatus === 'available');
  const score = window._ST.currentScore || p.preparationScore;
  const sl = scoreLevel(score);
  const remaining = allActions.filter(a => !done.includes(a.id)).length;

  return `
    <div class="actions-header">
      <div class="ah-toprow">
        <button class="topbar-back" style="background:rgba(255,255,255,.12);flex-shrink:0" onclick="goTo(9)" aria-label="Retour">${sv(IC.back)}</button>
        <div class="ah-eyebrow">COACH PRÉVENTION · ${p.firstName.toUpperCase()}</div>
        <div class="score-badge" style="font-size:11px;padding:5px 13px;flex-shrink:0">
          ${sv(IC.shield, 'width:11px;height:11px;vertical-align:middle')}
          ${sl.level === 'weak' ? 'Bronze' : sl.level === 'average' ? 'Argent' : 'Or'}
        </div>
      </div>
      <div class="ah-score-row">
        <span class="ah-score-num">${score}</span><span class="ah-score-denom">/100</span>
      </div>
      <div class="ah-subtitle">${done.length} action${done.length !== 1 ? 's' : ''} réalisée${done.length !== 1 ? 's' : ''} · ${remaining} restante${remaining !== 1 ? 's' : ''} · ${p.propertyType}</div>
      <div class="ah-progress-wrap">
        <div class="ah-progress-track">
          <div class="ah-progress-fill" style="width:${Math.min(Math.round(score / 70 * 100), 100)}%"></div>
        </div>
        <div class="ah-progress-labels">
          <span>Bronze · 0</span>
          <span>Or · 70+</span>
        </div>
      </div>
    </div>
    <div class="body-sm">

      <div class="section-title" style="margin-top:var(--sp3)">
        ${allActions[0]?.horizon === 'now' ? '⚡ Actions prioritaires' : '📋 Actions recommandées'}
      </div>
      ${displayedActions.map((a, i) => actionCard(a, i)).join('')}

      ${!showAll && hidden > 0 ? `
        <button class="btn-expand-actions rv rv4" onclick="window._ST.showAllActions=true;render(5);updateNav(5)">
          Voir ${hidden} autre${hidden > 1 ? 's' : ''} action${hidden > 1 ? 's' : ''} disponible${hidden > 1 ? 's' : ''} →
        </button>
      ` : ''}
      ${showAll && allActions.length > TOP_N ? `
        <button class="btn-expand-actions" onclick="window._ST.showAllActions=false;render(5);updateNav(5)">
          Réduire ↑
        </button>
      ` : ''}

      <div style="margin-top:var(--sp5)" class="rv rv5">
        <button class="btn btn-ghost" onclick="goTo(9)" style="width:100%;justify-content:center">
          ${sv(IC.home, 'width:16px;height:16px')} Mon suivi de progression
        </button>
      </div>

      <div style="margin-top:var(--sp3)" class="rv rv6">
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
  const p = getProfile(window._ST.profileId);
  const isLocataire = p.occupancyStatus === 'Locataire';

  const stepsHtml = a.steps.map((s, i) => `
    <div class="step-item rv rv${i+2}">
      <div class="step-num-badge">${i+1}</div>
      <div class="step-text">${s}</div>
    </div>
  `).join('');

  /* ── SERVICES ── */
  const allServices  = (SERVICES_BY_RISK[a.riskId] || []);
  const mainServices = allServices.filter(s => s.type !== 'aide');
  const aideServices = allServices.filter(s => s.type === 'aide');
  const serviceCount = a.effort === 'high' ? 3 : a.effort === 'medium' ? 2 : 0;
  const shownServices = mainServices.slice(0, serviceCount);

  const tutoTypeIcon = { video:'▶', pdf:'📄', article:'📖' };
  const tutoTypeLabel = { video:'Vidéo', pdf:'PDF', article:'Article' };

  const servicesHtml = shownServices.length ? `
    <div class="section-title" style="margin-top:var(--sp5)">Services recommandés</div>
    <div class="services-list">
      ${shownServices.map(s => `
        <div class="service-card rv">
          <div class="service-logo">${s.logo}</div>
          <div class="service-info">
            <div class="service-label">${s.label}</div>
            <div class="service-tag">${s.tag}</div>
          </div>
          <button class="service-cta">${s.cta}</button>
        </div>
      `).join('')}
    </div>
  ` : '';

  /* ── TUTORIELS ── */
  const tutorials = (TUTORIALS_BY_RISK[a.riskId] || []);
  const tutosHtml = tutorials.length ? `
    <div class="section-title" style="margin-top:var(--sp5)">Tutoriels et conseils</div>
    <div class="tutos-list">
      ${tutorials.map(t => `
        <div class="tuto-card rv">
          <div class="tuto-type-pill tuto-type-${t.type}">${tutoTypeIcon[t.type]} ${tutoTypeLabel[t.type]}</div>
          <div class="tuto-info">
            <div class="tuto-title">${t.title}</div>
            <div class="tuto-meta">${t.duration} · ${t.source}</div>
          </div>
          <div class="tuto-arrow">›</div>
        </div>
      `).join('')}
    </div>
  ` : '';

  /* ── AIDES & ACCOMPAGNEMENT (uniquement effort high) ── */
  const aidesHtml = (a.effort === 'high' && aideServices.length) ? `
    <div class="section-title" style="margin-top:var(--sp5)">Aides et accompagnement</div>
    <div class="services-list">
      ${aideServices.map(s => `
        <div class="service-card service-card-aide rv">
          <div class="service-logo">${s.logo}</div>
          <div class="service-info">
            <div class="service-label">${s.label}</div>
            <div class="service-tag">${s.tag}</div>
          </div>
          <button class="service-cta service-cta-aide">${s.cta}</button>
        </div>
      `).join('')}
    </div>
  ` : '';

  /* ── CONSEILLER AXA ── */
  const conseillerHtml = `
    <div class="conseiller-card rv" style="margin-top:var(--sp5)">
      <div class="conseiller-top">
        <div class="conseiller-avatar">👨‍💼</div>
        <div class="conseiller-info">
          <div class="conseiller-title">Parler à un conseiller AXA</div>
          <div class="conseiller-sub">Disponible lun–ven · 9h à 18h</div>
        </div>
      </div>
      <div class="conseiller-actions">
        <button class="btn-rappel">📞 Être rappelé</button>
        <button class="btn-chat">💬 Chat AXA</button>
      </div>
    </div>
  `;

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
      ${isLocataire && a.requiresOwner ? `
        <div class="locataire-notice rv rv1">
          <span style="font-size:16px">⚠️</span>
          <div>
            <div style="font-weight:600;font-size:13px;color:var(--warn)">Accord propriétaire requis</div>
            <div style="font-size:12px;color:var(--n500);margin-top:2px">Cette action nécessite l'autorisation de votre bailleur avant toute intervention.</div>
          </div>
        </div>
      ` : ''}
      <div class="conseil-axa-box rv rv1">
        <span class="conseil-axa-icon">${sv(IC.shield)}</span>
        <div class="conseil-axa-text">« ${a.conseilText} »</div>
      </div>
      <div class="section-title">Comment faire</div>
      <div class="steps-list">${stepsHtml}</div>
      <div class="benefit-box rv rv${a.steps.length+3}">
        ${sv(IC.check, 'width:15px;height:15px;fill:var(--success)')}
        <div class="benefit-text">${a.benefit}</div>
      </div>
      <div class="pts-gain-banner rv rv${a.steps.length+4}">
        <span class="pts-gain-label">Points gagnés si réalisé</span>
        <span class="pts-gain-val">+${a.pts} pts</span>
      </div>
      ${servicesHtml}
      ${tutosHtml}
      ${aidesHtml}
      ${conseillerHtml}
    </div>
    <div class="detail-sticky">
      ${done ? `
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;color:var(--success);font-size:14px;font-weight:600;padding:10px">
          ${sv(IC.check, 'width:18px;height:18px;fill:var(--success)')} Action déjà réalisée ✓
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
  const nextAction  = getActionsForProfile(p, window._ST.diagAnswers).find(x => !done.includes(x.id));

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
            <div class="action-done-check">${sv(IC.check, 'width:11px;height:11px;fill:white')}</div>
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

  const unlocked     = rewards.filter(r => r.computedStatus === 'unlocked');
  const nextAvail    = rewards.find(r => r.computedStatus === 'available');
  const tierLabel    = scoreLevel(score).level === 'good' ? 'Or' : scoreLevel(score).level === 'average' ? 'Argent' : 'Bronze';

  const heroEyebrow  = done.length === 0
    ? 'Aucune action réalisée pour l\'instant'
    : `${done.length} action${done.length > 1 ? 's' : ''} réalisée${done.length > 1 ? 's' : ''}`;

  const heroTitle    = unlocked.length > 0
    ? `${unlocked.length} avantage${unlocked.length > 1 ? 's' : ''}\ndébloqué${unlocked.length > 1 ? 's' : ''}.`
    : 'Vos avantages\nprévention.';

  const heroSub      = nextAvail
    ? `Encore ${nextAvail.minActions - done.length} action${nextAvail.minActions - done.length > 1 ? 's' : ''} pour débloquer : <strong>${nextAvail.title}</strong>`
    : unlocked.length > 0
      ? 'Tous vos avantages disponibles sont actifs.'
      : 'Réalisez votre première action pour commencer.';

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
      <div class="rewards-hero-topbar">
        <button class="topbar-back" onclick="goTo(9)" style="background:rgba(255,255,255,.15)" aria-label="Retour">${sv(IC.back)}</button>
        <span class="rewards-hero-label">REWARDS AXA · ${p.firstName.toUpperCase()}</span>
        <span class="tag tag-white">${sv(IC.shield, 'width:11px;height:11px;vertical-align:middle')} ${tierLabel}</span>
      </div>
      <div class="rewards-hero-body rv rv1">
        <div class="rh-eyebrow">${heroEyebrow}</div>
        <div class="rh-title">${heroTitle}</div>
        <div class="rh-sub">${heroSub}</div>
      </div>
    </div>
    <div class="body-sm">

      <div class="rewards-philosophy rv rv1">
        ${sv(IC.shield, 'width:14px;height:14px;fill:var(--axa);flex-shrink:0')}
        <p>Ces avantages récompensent votre engagement en prévention. <strong>Ils ne modifient pas votre prime.</strong></p>
      </div>

      <div class="section-title" style="margin-top:var(--sp2)">Avantages disponibles dès maintenant</div>
      ${p1.map((r, i) => rewardCard(r, i)).join('')}
      ${p2.length ? `<div class="section-title" style="margin-top:var(--sp4)">En cours d'étude — Bientôt disponibles</div>` : ''}
      ${p2.map((r, i) => rewardCard(r, i + p1.length)).join('')}

      <div style="margin-top:var(--sp4)" class="rv rv5">
        ${done.length > 0 ? `
          <button class="btn btn-success" onclick="activateRewards()">
            Recevoir mes avantages
            <svg class="btn-icon">${sv(IC.check)}</svg>
          </button>
        ` : `
          <div class="reassure blue" style="margin-bottom:var(--sp3)">
            <span class="reassure-icon">${sv(IC.info)}</span>
            <span>Réalisez au moins une action de prévention pour débloquer vos avantages.</span>
          </div>
          <button class="btn btn-primary" onclick="goTo(5)">
            Voir mon plan d'action
            <svg class="btn-icon">${sv(IC.arrow)}</svg>
          </button>
        `}
      </div>
      <p class="footer-fine">Avantages activés au prochain renouvellement de votre contrat MRH. Sans engagement. Aucun impact tarifaire.</p>
    </div>
    <div class="bottom-safe"></div>
  `;
}

/* ════════════════════════════
   S9 — MON SUIVI
════════════════════════════ */
function screenMonSuivi() {
  const p       = getProfile(window._ST.profileId);
  const done    = window._ST.completedActions || [];
  const score   = window._ST.currentScore || p.preparationScore;
  const sl      = scoreLevel(score);
  const allA    = getActionsForProfile(p, window._ST.diagAnswers);
  const rewards = getRewardsForProfile(p, done.length);
  const unlocked = rewards.filter(r => r.computedStatus === 'unlocked');
  const available = rewards.filter(r => r.computedStatus === 'available');
  const nextAction = allA[0];

  const totalGain = allA.reduce((s, a) => s + a.pts, 0);
  const potential = Math.min(score + totalGain, 100);
  const remaining = allA.filter(a => !done.includes(a.id));
  const actionsText = done.length > 0
    ? `${done.length} réalisée${done.length > 1 ? 's' : ''} · ${remaining.length} disponible${remaining.length !== 1 ? 's' : ''}`
    : `${allA.length} action${allA.length !== 1 ? 's' : ''} disponibles`;
  const circ   = 352;
  const offset = Math.round(circ * (1 - score / 100));

  const completedCardsHtml = done.length > 0
    ? done.map(id => {
        const a = ALL_ACTIONS.find(x => x.id === id);
        if (!a) return '';
        return `
          <div class="suivi-done-item">
            <div class="suivi-done-check">${sv(IC.check, 'width:10px;height:10px;fill:white')}</div>
            <div class="suivi-done-text">
              <div class="suivi-done-title">${a.title}</div>
              <div class="suivi-done-risk">${a.riskLabel} · +${a.pts} pts</div>
            </div>
          </div>
        `;
      }).join('')
    : `<div style="color:var(--n400);font-size:13px;padding:var(--sp3) 0">Aucune action réalisée pour l'instant.</div>`;

  return `
    <div class="suivi-hero">
      <div class="suivi-hero-profile-line rv rv1">${p.firstName} · ${p.propertyType}</div>
      <div class="score-hero-label rv rv1">Votre score de prévention</div>
      <div class="score-ring-wrap rv-scale">
        <svg viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="56" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="10"/>
          <circle cx="70" cy="70" r="56" fill="none" stroke="var(--success-mid)" stroke-width="10"
            stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" class="ring-arc"/>
        </svg>
        <div class="score-ring-center">
          <div class="score-num">${score}</div>
          <div class="score-denom">/100</div>
        </div>
      </div>
      <div class="suivi-hero-badges rv rv2">
        <div class="score-badge">
          ${sv(IC.shield, 'width:11px;height:11px;vertical-align:middle')}
          Risque ${sl.label}
        </div>
        <div class="score-badge score-badge-tier">
          🏅 ${sl.level === 'weak' ? 'Bronze' : sl.level === 'average' ? 'Argent' : 'Or'}
        </div>
      </div>
      <p class="score-tagline rv rv3">${actionsText}</p>
      <div style="height:56px"></div>
    </div>
    <div class="suivi-hero-arch"></div>

    <div class="suivi-quick-grid">
      <button class="suivi-quick-card rv rv1" onclick="goTo(4)">
        <div class="suivi-quick-icon" style="background:#FEF3C7">⚠️</div>
        <div class="suivi-quick-label">Consulter mes risques</div>
      </button>
      <button class="suivi-quick-card rv rv2" onclick="goTo(5)">
        <div class="suivi-quick-icon" style="background:#DBEAFE">📋</div>
        <div class="suivi-quick-label">Mes actions recommandées</div>
      </button>
      <button class="suivi-quick-card rv rv3" onclick="goTo(8)">
        <div class="suivi-quick-icon" style="background:#EDE9FE">🎁</div>
        <div class="suivi-quick-label">Voir mes récompenses</div>
      </button>
    </div>

    <div class="suivi-diag-cta-wrap rv rv4">
      <button class="suivi-diag-cta" onclick="goTo(2)">
        <div class="suivi-diag-cta-text">
          <div class="suivi-diag-cta-label">Faire un nouveau diagnostic</div>
          <div class="suivi-diag-cta-sub">Réévaluer votre exposition aux risques</div>
        </div>
        <div class="suivi-diag-cta-visual">
          <div class="suivi-diag-cta-card">🔍</div>
        </div>
      </button>
    </div>

    <div class="body-sm">

      ${nextAction ? `
        <div class="suivi-potential-banner rv rv1">
          <span>Avec toutes vos actions</span>
          <span class="score-potential-arrow">→ ${potential}/100</span>
        </div>
        <div class="section-title rv rv1" style="margin-top:var(--sp3)">Prochaine action recommandée</div>
        <div class="next-action-card rv rv1" onclick="openAction('${nextAction.id}')">
          <span style="font-size:20px">${RISKS[nextAction.riskId]?.icon || '📋'}</span>
          <div>
            <div class="next-action-label">${nextAction.riskLabel} · ${nextAction.effort === 'low' ? '🟢 Effort faible' : nextAction.effort === 'medium' ? '🟡 Effort moyen' : '🔴 Effort élevé'}</div>
            <div class="next-action-title">${nextAction.title}</div>
            <div style="font-size:11px;color:var(--n400);margin-top:2px">⏱ ${nextAction.duration} · +${nextAction.pts} pts</div>
          </div>
          <span class="next-action-arrow">→</span>
        </div>
      ` : `
        <div class="reassure green rv rv1">
          <span class="reassure-icon">🎉</span>
          <span>Toutes les actions de votre plan sont réalisées !</span>
        </div>
      `}

      ${unlocked.length > 0 ? `
        <div class="section-title rv rv2" style="margin-top:var(--sp4)">Avantages débloqués</div>
        ${unlocked.map(r => `
          <div class="suivi-reward-item rv rv2">
            <div class="reward-icon" style="background:${r.iconBg};width:36px;height:36px;border-radius:var(--r-md)">${r.icon}</div>
            <div>
              <div style="font-size:13px;font-weight:600">${r.title}</div>
              <div style="font-size:11px;color:var(--n500)">${r.subtitle}</div>
            </div>
            <span class="tag tag-success" style="flex-shrink:0">Actif</span>
          </div>
        `).join('')}
      ` : available.length > 0 ? `
        <div class="section-title rv rv2" style="margin-top:var(--sp4)">Prochain avantage à débloquer</div>
        <div class="suivi-reward-item rv rv2">
          <div class="reward-icon" style="background:${available[0].iconBg};width:36px;height:36px;border-radius:var(--r-md)">${available[0].icon}</div>
          <div>
            <div style="font-size:13px;font-weight:600">${available[0].title}</div>
            <div style="font-size:11px;color:var(--n500)">${available[0].minActions - done.length} action${available[0].minActions - done.length > 1 ? 's' : ''} de plus à réaliser</div>
          </div>
        </div>
      ` : ''}

      <div class="section-title rv rv3" style="margin-top:var(--sp4)">Actions réalisées</div>
      <div class="suivi-done-list rv rv3">${completedCardsHtml}</div>

    </div>
    <div class="bottom-safe"></div>
  `;
}

const SCREENS = { s0:screenSelection, s1:screenLanding, s2:screenDiagnostic, s3:screenScore, s4:screenProjection, s5:screenActionPlan, s6:screenActionDetail, s7:screenSuccess, s8:screenRewards, s9:screenMonSuivi };
