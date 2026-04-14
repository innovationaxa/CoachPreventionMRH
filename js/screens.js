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
  const seasons = p.mainRisks.map(r => (RISKS[r] || {}).season).filter(Boolean);
  const seasonBadge = seasons.includes('été') ? '☀️ Saisonnalité été' : '🌧️ Saisonnalité automne-hiver';

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
        ${isSeasonal ? seasonBadge : '🏠 Nouveau contrat MRH'}
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
      <div class="angel-or-sep rv rv4">
        <div class="angel-or-line"></div>
        <span class="angel-or-label">ou</span>
        <div class="angel-or-line"></div>
      </div>

      <div class="angel-entry-card rv rv4" role="button" tabindex="0" onclick="tabMock('Angel — IA AXA')">
        <div class="angel-entry-head">
          <div class="angel-entry-circle">
            <img src="assets/Vector.svg" alt="" class="angel-entry-icon">
          </div>
          <div class="angel-entry-text">
            <div class="angel-entry-eyebrow">ANGEL · VOTRE ASSISTANT IA</div>
            <div class="angel-entry-title">Besoin d'un diagnostic plus personnalisé ?</div>
          </div>
        </div>
        <p class="angel-entry-desc">Angel échange avec vous pour affiner votre niveau de risque et vous proposer des recommandations adaptées à votre situation.</p>
        <button class="angel-entry-cta" onclick="event.stopPropagation();tabMock('Angel — IA AXA')">
          Commencer avec Angel
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      <div class="diag-skip-wrap rv rv5">
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
        ${q.hint ? `<div class="q-hint"><span class="q-hint-icon">ℹ</span>${q.hint}</div>` : ''}
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
  const lc = p.localContext || null;

  /* ── Diagnostic impact per risk ── */
  const diagPtsPerRisk = {};
  (window._ST.questions || []).forEach(q => {
    const ans = (window._ST.diagAnswers || {})[q.id];
    const opt = q.options.find(o => o.v === ans);
    if (opt && opt.pts > 0) diagPtsPerRisk[q.riskId] = (diagPtsPerRisk[q.riskId] || 0) + opt.pts;
  });
  const nRisksImproved = p.mainRisks.filter(rId => (diagPtsPerRisk[rId] || 0) > 0).length;

  const riskBarsHtml = p.mainRisks.map(rId => {
    const r = RISKS[rId];
    if (!r) return '';
    const diagPts   = diagPtsPerRisk[rId] || 0;
    const baseScore = r.level === 'high' ? 30 : r.level === 'medium' ? 50 : 76;
    const barScore  = Math.min(baseScore + Math.round(diagPts * 0.65), 88);
    const effLevel  = barScore < 45 ? 'high' : barScore < 68 ? 'medium' : 'low';
    const fillClass = effLevel === 'high' ? 'risk-fill-danger' : effLevel === 'medium' ? 'risk-fill-warn' : 'risk-fill-success';
    const tagClass  = effLevel === 'high' ? 'tag-danger' : effLevel === 'medium' ? 'tag-warn' : 'tag-success';
    const tagLabel  = effLevel === 'high' ? 'Élevé' : effLevel === 'medium' ? 'Modéré' : 'Bien maîtrisé';
    const comment   = effLevel === 'high'
      ? 'Préparation insuffisante — des actions urgentes sont recommandées.'
      : effLevel === 'medium'
      ? 'Quelques actions réduiraient significativement votre exposition.'
      : 'Bonne maîtrise de ce risque. Maintenez vos équipements à jour.';
    const levelChanged = effLevel !== r.level;
    const impactHtml = diagPts > 0 ? `
      <div class="risk-diag-impact">
        ${levelChanged
          ? `<span class="risk-level-old">${r.levelLabel}</span><span class="risk-level-arrow">→</span><span class="risk-level-new">${tagLabel}</span>`
          : `<span class="risk-level-improved">↗ Exposition réduite</span>`}
        <span class="risk-diag-pts">+${diagPts} pts diagnostic</span>
      </div>` : '';
    return `
      <div class="risk-bar-row">
        <div class="risk-bar-header">
          <span class="risk-bar-label">${r.icon} ${r.label}</span>
          <span class="tag ${tagClass}">${tagLabel}</span>
        </div>
        <div class="risk-track"><div class="risk-fill ${fillClass}" style="width:${barScore}%"></div></div>
        <div class="risk-score-meta">
          <span class="risk-score-pts">${barScore}/100</span>
          <span class="risk-score-comment">${comment}</span>
        </div>
        ${impactHtml}
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
  /* ── Local context zone + PCS badge ── */
  const geoZoneHtml = lc && lc.georisquesZone
    ? `<div class="geo-zone-row"><span class="geo-zone-icon">🗺️</span><span class="geo-zone-label">${lc.georisquesZone}</span></div>`
    : '';
  const pcsBadgeHtml = lc && lc.pcs
    ? `<div class="pcs-badge">✔ Plan Communal de Sauvegarde actif</div>`
    : '';
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
      ${geoZoneHtml}
      ${pcsBadgeHtml}
    </div>
  `;

  /* ── Recent event banner ── */
  const recentEventHtml = lc && lc.recentEvent ? `
    <div class="local-event-banner rv rv2">
      <div class="local-event-year">${lc.recentEvent.year}</div>
      <div class="local-event-body">
        <div class="local-event-label">${lc.recentEvent.label}</div>
        <div class="local-event-detail">${lc.recentEvent.detail}</div>
      </div>
    </div>
  ` : '';

  /* ── Testimonial card ── */
  const testimonialHtml = lc && lc.testimonial ? `
    <div class="testimonial-card rv rv3">
      <div class="testimonial-eyebrow">Situation similaire à la vôtre</div>
      <div class="testimonial-situation">${lc.testimonial.situation}</div>
      <div class="testimonial-text">"${lc.testimonial.text}"</div>
      <div class="testimonial-source">${lc.testimonial.source}</div>
    </div>
  ` : '';

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
      ${recentEventHtml}

      <div class="section-title rv rv2">Exposition par risque</div>
      ${diagGain > 0 ? `
        <div class="diag-impact-banner rv rv2">
          <div class="diag-impact-icon">📊</div>
          <div class="diag-impact-body">
            <div class="diag-impact-title">Votre diagnostic a eu un impact</div>
            <div class="diag-impact-sub">+${diagGain} pts · ${nRisksImproved} risque${nRisksImproved > 1 ? 's' : ''} amélioré${nRisksImproved > 1 ? 's' : ''} grâce à vos réponses</div>
          </div>
        </div>` : ''}
      <div class="risk-bars rv rv2">${riskBarsHtml}</div>

      ${testimonialHtml}

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

  // Coverage card
  const cov = (p.coverage || {})[activeRiskId];
  let coverageHtml = '';
  if (cov && p.contract) {
    const statusConfig = {
      'covered':     { label: 'Couvert',        cls: 'covered',     icon: '✓' },
      'partial':     { label: 'Partiel',        cls: 'partial',     icon: '⚡' },
      'not-covered': { label: 'Non couvert',    cls: 'not-covered', icon: '✕' }
    };
    const sc = statusConfig[cov.status] || statusConfig['not-covered'];

    // Details row: capital + franchise, or franchise only (RGA case)
    let detailsHtml = '';
    if (cov.limit || cov.franchise) {
      const limitCol = cov.limit ? `
        <div class="coverage-detail-item">
          <div class="coverage-detail-label">Capital garanti</div>
          <div class="coverage-detail-value">${cov.limit}</div>
        </div>
        <div class="coverage-detail-sep"></div>` : '';
      const franchiseCol = cov.franchise ? `
        <div class="coverage-detail-item">
          <div class="coverage-detail-label">Franchise</div>
          <div class="coverage-detail-value">${cov.franchise}</div>
        </div>` : '';
      if (limitCol || franchiseCol) {
        detailsHtml = `<div class="coverage-details">${limitCol}${franchiseCol}</div>`;
      }
    }

    const cgRefHtml = cov.cgRef && cov.cgRef !== '—'
      ? `<div class="coverage-cg-ref">${sv(IC.info, 'width:11px;height:11px;vertical-align:-1px')} Conditions Générales — ${cov.cgRef}</div>`
      : '';

    const bridgeMsg = cov.status === 'covered'
      ? `La prévention vous aide à <strong>éviter de mobiliser votre franchise</strong> (${cov.franchise}) et limite les démarches de déclaration de sinistre.`
      : cov.status === 'partial'
      ? `Votre couverture est partielle ou conditionnelle. La prévention réduit de <strong>${mainRisk.avoidablePercent}%</strong> les dommages qui resteraient à votre charge.`
      : `Ce risque n'est pas couvert par votre contrat. La prévention est votre <strong>seule protection</strong> — elle évite <strong>${mainRisk.avoidablePercent}%</strong> des dommages.`;

    coverageHtml = `
      <div class="section-title" style="margin-top:var(--sp5)">Votre couverture AXA</div>
      <div class="coverage-card rv rv2">
        <div class="coverage-card-top">
          <div class="coverage-contract-info">
            <div class="coverage-contract-icon">${sv(IC.shield, 'width:16px;height:16px')}</div>
            <div>
              <div class="coverage-contract-name">${p.contract.name}</div>
              <div class="coverage-contract-ref">Réf. ${p.contract.ref}</div>
            </div>
          </div>
          <div class="coverage-status-badge coverage-status-${sc.cls}">${sc.icon} ${sc.label}</div>
        </div>
        ${detailsHtml}
        <div class="coverage-note">${cov.note}</div>
        ${cgRefHtml}
        <div class="coverage-prevention-nudge">
          <div class="coverage-prevention-icon">${sv(IC.shield, 'width:13px;height:13px')}</div>
          <div class="coverage-prevention-text">${bridgeMsg}</div>
        </div>
      </div>
      <div class="angel-entry-card rv rv3" role="button" onclick="tabMock('Angel — IA AXA')" style="margin-bottom:var(--sp2)">
        <div class="angel-entry-head">
          <div class="angel-entry-circle"><img src="assets/Vector.svg" class="angel-entry-icon" alt="Angel"></div>
          <div class="angel-entry-text">
            <div class="angel-entry-eyebrow">ANGEL · VOTRE ASSISTANT AXA</div>
            <div class="angel-entry-title">Une question sur cette garantie ?</div>
          </div>
        </div>
        <p class="angel-entry-desc">Angel analyse votre contrat et vous explique précisément ce qui est couvert, les exclusions applicables et vos obligations de prévention pour ce risque.</p>
        <button class="angel-entry-cta" onclick="event.stopPropagation();tabMock('Angel — IA AXA')">
          Poser une question à Angel
          ${sv(IC.arrow, 'width:16px;height:16px')}
        </button>
      </div>`;
  }

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
      <div class="section-title">Dommages potentiels</div>
      <div class="damage-list">${damagesHtml}</div>
      ${coverageHtml}
      <div style="margin-top:var(--sp5)">
        <button class="btn btn-primary rv rv4" onclick="goTo(5)">
          Voir les actions recommandées
          ${sv(IC.arrow, 'width:18px;height:18px')}
        </button>
      </div>
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
  const done = window._ST.completedActions || [];
  const score = window._ST.currentScore || p.preparationScore;
  const sl = scoreLevel(score);
  const isLocataire = p.occupancyStatus === 'Locataire';

  // Split done / todo — sort todo by pts desc (most impactful first)
  const todo     = allActions.filter(a => !done.includes(a.id)).sort((a, b) => b.pts - a.pts);
  const doneList = allActions.filter(a =>  done.includes(a.id));
  const nowGroup   = todo.filter(a => a.horizon === 'now');
  const monthGroup = todo.filter(a => a.horizon === 'this_month');

  const MAX = 3;
  const showMoreNow   = window._ST.expandNow   === true;
  const showMoreMonth = window._ST.expandMonth === true;
  const remaining  = todo.length;
  const totalPts   = todo.reduce((s, a) => s + a.pts, 0);

  const RISK_ICON_BG = { inondation:'#DBEAFE', tempete:'#FEF3C7', incendie:'#FEE2E2', 'degat-eaux':'#CCFBF1', vol:'#EDE9FE', rga:'#FEF9C3' };

  function actionCard(a) {
    const riskIcon   = RISKS[a.riskId]?.icon || '📋';
    const iconBg     = RISK_ICON_BG[a.riskId] || '#f3f4f6';
    const effortDot  = a.effort === 'low' ? '🟢' : a.effort === 'medium' ? '🟡' : '🔴';
    const effortTxt  = a.effort === 'low' ? 'Faible' : a.effort === 'medium' ? 'Moyen' : 'Élevé';
    const costTag    = a.tags[0] || '';
    const timeTag    = a.tags[1] && a.tags[1] !== costTag ? a.tags[1] : '';
    const ownerBadge = isLocataire && a.requiresOwner
      ? `<span class="plan-owner-badge">⚠️ Propriétaire</span>` : '';
    return `
      <div class="plan-card rv rv1" onclick="openAction('${a.id}')">
        <div class="plan-card-icon" style="background:${iconBg}">${riskIcon}</div>
        <div class="plan-card-body">
          <div class="plan-card-risk">${a.riskLabel}</div>
          <div class="plan-card-title">${a.title}</div>
          <div class="plan-card-tags">
            <span class="plan-tag">${effortDot} ${effortTxt}</span>
            <span class="plan-tag">${costTag}</span>
            ${timeTag ? `<span class="plan-tag">${timeTag}</span>` : ''}
            ${ownerBadge}
          </div>
        </div>
        <div class="plan-pts-col">
          <div class="plan-pts-num">+${a.pts}</div>
          <div class="plan-pts-lbl">pts</div>
        </div>
        <svg class="plan-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M9 18l6-6-6-6"/></svg>
      </div>
    `;
  }

  function renderGroup(label, icon, bgColor, actions, showMore, stateKey) {
    if (!actions.length) return '';
    const visible = showMore ? actions : actions.slice(0, MAX);
    const hiddenN = actions.length - MAX;
    const grpPts  = actions.reduce((s, a) => s + a.pts, 0);
    return `
      <div class="plan-group rv rv1">
        <div class="plan-group-hd">
          <div class="plan-group-badge" style="background:${bgColor}">${icon}</div>
          <div class="plan-group-info">
            <div class="plan-group-title">${label}</div>
            <div class="plan-group-sub">${actions.length} action${actions.length > 1 ? 's' : ''} · +${grpPts} pts disponibles</div>
          </div>
        </div>
        ${visible.map(a => actionCard(a)).join('')}
        ${!showMore && hiddenN > 0
          ? `<button class="plan-more-btn" onclick="window._ST.${stateKey}=true;render(5);updateNav(5)">${hiddenN} action${hiddenN > 1 ? 's' : ''} de plus →</button>`
          : showMore && actions.length > MAX
          ? `<button class="plan-more-btn" onclick="window._ST.${stateKey}=false;render(5);updateNav(5)">Réduire ↑</button>`
          : ''}
      </div>
    `;
  }

  const doneHtml = doneList.length > 0 ? `
    <div class="plan-done-section">
      <div class="plan-done-hd">✓ Déjà réalisées · ${doneList.length} action${doneList.length > 1 ? 's' : ''}</div>
      ${doneList.map(a => `
        <div class="plan-done-item">
          <span class="plan-done-ck">✓</span>
          <span class="plan-done-icon">${RISKS[a.riskId]?.icon || ''}</span>
          <span class="plan-done-name">${a.riskLabel} — ${a.title}</span>
          <span class="plan-done-pts">+${a.pts}</span>
        </div>
      `).join('')}
    </div>
  ` : '';

  const rewards = getRewardsForProfile(p, done.length);
  const nextReward = rewards.find(r => r.computedStatus === 'available');

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
      <div class="ah-subtitle">${remaining} action${remaining !== 1 ? 's' : ''} · +${totalPts} pts · ${p.propertyType}</div>
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

      ${renderGroup('À faire maintenant', '⚡', 'rgba(239,68,68,0.10)', nowGroup, showMoreNow, 'expandNow')}
      ${renderGroup('Ce mois-ci', '📋', 'rgba(0,0,143,0.07)', monthGroup, showMoreMonth, 'expandMonth')}
      ${doneHtml}

      ${nextReward ? `
        <div class="plan-reward-teaser rv rv2" onclick="goTo(8)">
          <div class="plan-reward-icon">${nextReward.icon}</div>
          <div class="plan-reward-body">
            <div class="plan-reward-label">Prochain avantage</div>
            <div class="plan-reward-title">${nextReward.title}</div>
            <div class="plan-reward-sub">${Math.max(0, nextReward.minActions - done.length)} action${nextReward.minActions - done.length > 1 ? 's' : ''} de plus pour débloquer</div>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" style="width:16px;height:16px;flex-shrink:0;color:var(--n400)"><path d="M9 18l6-6-6-6"/></svg>
        </div>
      ` : ''}

      <div style="margin-top:var(--sp4);padding-bottom:var(--sp4)" class="rv rv5">
        <button class="btn btn-ghost" onclick="goTo(9)" style="width:100%;justify-content:center">
          ${sv(IC.home, 'width:16px;height:16px')} Mon tableau de bord
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
      ${(() => {
        if (!a.proof) return '';
        const proofUploaded = !!(window._ST.proofUploaded || {})[a.id];
        const typeConfig = {
          certificate: { icon: '📜', label: 'Certificat ou attestation' },
          invoice:     { icon: '🧾', label: 'Facture ou bon d\'intervention' },
          photo:       { icon: '📷', label: 'Photo de l\'installation' }
        };
        const tc = typeConfig[a.proof.type] || typeConfig.photo;
        if (proofUploaded) {
          return `
            <div class="proof-section proof-section-done rv">
              <div class="proof-section-row">
                <div class="proof-done-icon">${sv(IC.check, 'width:13px;height:13px;fill:var(--success)')}</div>
                <div class="proof-done-info">
                  <div class="proof-done-label">Preuve déposée</div>
                  <div class="proof-done-sub">${a.proof.label}</div>
                </div>
                <span class="proof-done-badge">Dossier renforcé</span>
              </div>
            </div>`;
        }
        const uploadSection = done ? `
          <button class="proof-upload-btn" onclick="mockUploadProof('${a.id}', 6)">
            ${sv(IC.check, 'width:13px;height:13px')} Ajouter ma preuve
          </button>` : `
          <div class="proof-pending-hint">Conservez ce document — vous pourrez l'ajouter une fois l'action réalisée.</div>`;
        return `
          <div class="proof-section rv">
            <div class="proof-section-row">
              <div class="proof-type-icon">${tc.icon}</div>
              <div class="proof-section-info">
                <div class="proof-section-title">Preuve recommandée <span class="proof-optional-tag">Optionnel</span></div>
                <div class="proof-section-sub">${a.proof.label}</div>
              </div>
            </div>
            ${uploadSection}
          </div>`;
      })()}
      ${servicesHtml}
      ${tutosHtml}
      ${aidesHtml}

      <div class="angel-entry-card rv" style="margin-top:var(--sp5)" role="button" tabindex="0" onclick="tabMock('Angel — IA AXA')">
        <div class="angel-entry-head">
          <div class="angel-entry-circle">
            <img src="assets/Vector.svg" alt="" class="angel-entry-icon">
          </div>
          <div class="angel-entry-text">
            <div class="angel-entry-eyebrow">ANGEL · VOTRE ASSISTANT IA</div>
            <div class="angel-entry-title">Je vous aide à passer à l'action ?</div>
          </div>
        </div>
        <p class="angel-entry-desc">Angel vous guide étape par étape, vous aide à choisir la bonne solution et peut vous orienter vers le bon interlocuteur si besoin.</p>
        <button class="angel-entry-cta" onclick="event.stopPropagation();tabMock('Angel — IA AXA')">
          Être guidé par Angel
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>

      ${conseillerHtml}
    </div>
    <div class="detail-sticky">
      ${done ? `
        <div style="display:flex;align-items:center;justify-content:center;gap:8px;color:var(--success);font-size:14px;font-weight:600;padding:10px">
          ${sv(IC.check, 'width:18px;height:18px;fill:var(--success)')} Action déjà réalisée ✓
        </div>
      ` : `
        <button class="btn btn-success" onclick="completeAction('${a.id}')">
          Je l'ai fait
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
      ${a && a.proof && !(window._ST.proofUploaded || {})[a.id] ? `
        <div class="proof-nudge-card rv rv3">
          <div class="proof-nudge-row">
            <div class="proof-nudge-icon-wrap">📎</div>
            <div class="proof-nudge-content">
              <div class="proof-nudge-title">Renforcez votre dossier</div>
              <div class="proof-nudge-desc">Ajoutez votre ${a.proof.type === 'certificate' ? 'certificat' : a.proof.type === 'invoice' ? 'facture' : 'photo'} pour attester cette action auprès d'AXA.</div>
              <div class="proof-nudge-label">${a.proof.label}</div>
            </div>
          </div>
          <div class="proof-nudge-actions">
            <button class="proof-nudge-cta" onclick="mockUploadProof('${a.id}', 7)">Ajouter maintenant</button>
            <button class="proof-nudge-skip" onclick="this.closest('.proof-nudge-card').style.display='none'">Plus tard</button>
          </div>
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
        <div class="suivi-potential-card rv rv1" onclick="goTo(5)">
          <div class="suivi-potential-card-body">
            <div class="suivi-potential-eyebrow">Si vous réalisez toutes vos actions</div>
            <div class="suivi-potential-main">
              <span class="suivi-potential-num">${potential}</span><span class="suivi-potential-denom">/100</span>
              <span class="suivi-potential-gain">+${potential - score} pts</span>
            </div>
            <div class="suivi-potential-hint">${remaining.length} action${remaining.length !== 1 ? 's' : ''} restante${remaining.length !== 1 ? 's' : ''} dans votre plan — commencez maintenant</div>
          </div>
          <svg class="next-action-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </div>
        <div class="section-title rv rv1" style="margin-top:var(--sp4)">Prochaine action recommandée</div>
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

      <div class="section-title rv rv4" style="margin-top:var(--sp4)">Bilan de prévention</div>
      <div class="bilan-export-card rv rv4">
        <div class="bilan-export-header">
          <div class="bilan-export-doc-icon">📄</div>
          <div class="bilan-export-info">
            <div class="bilan-export-title">Synthèse personnalisée</div>
            <div class="bilan-export-sub">Risques · Actions prioritaires · Couverture contractuelle</div>
          </div>
        </div>
        <div class="bilan-export-chips">
          <span class="bilan-chip">${p.mainRisks.length} risques analysés</span>
          <span class="bilan-chip">${done.length} action${done.length !== 1 ? 's' : ''} réalisée${done.length !== 1 ? 's' : ''}</span>
          <span class="bilan-chip">Score ${score}/100</span>
        </div>
        <div class="bilan-export-actions">
          <button class="bilan-btn-primary" onclick="generateBilan()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Télécharger en PDF
          </button>
          <button class="bilan-btn-secondary" onclick="mockSendBilan()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            Envoyer par email
          </button>
        </div>
      </div>

    </div>
    <div class="bottom-safe"></div>
  `;
}

const SCREENS = { s0:screenSelection, s1:screenLanding, s2:screenDiagnostic, s3:screenScore, s4:screenProjection, s5:screenActionPlan, s6:screenActionDetail, s7:screenSuccess, s8:screenRewards, s9:screenMonSuivi };
