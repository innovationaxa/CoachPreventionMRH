/* ═══════════════════════════════════════════════════════
   SCREENS.JS v3 — Coach Prévention MRH
   10 écrans : S0 (démo) + V3-01 à V3-09
═══════════════════════════════════════════════════════ */

/* ── SVG ICONS ── */
const IC = {
  home:    `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`,
  arrow:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>`,
  back:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>`,
  check:   `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`,
  shield:  `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>`,
  warn:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/></svg>`,
  info:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`,
  star:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>`,
  pin:     `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`,
  bolt:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 2v11h3v9l7-12h-4l4-8z"/></svg>`,
  history: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/></svg>`,
  gift:    `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.07-.31.18-.62.18-.94C18 3.36 16.64 2 15.06 2c-.87 0-1.6.4-2.13 1.01L12 4.3l-.93-1.29C10.54 2.4 9.81 2 8.94 2 7.36 2 6 3.36 6 4.94c0 .32.11.63.18.94H4c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/><path d="M11 14H4v6c0 1.1.9 2 2 2h5v-8zm2 0v8h5c1.1 0 2-.9 2-2v-6h-7z"/></svg>`,
  up:      `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14l5-5 5 5z"/></svg>`,
  down:    `<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10l5 5 5-5z"/></svg>`,
  download:`<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`,
};

function sv(ic, style) {
  if (!style) return ic;
  return ic.replace('<svg ', '<svg style="' + style + '" ');
}

/* ── RISK LEVEL CHIP ── */
function levelChip(levelId, size) {
  const li = getRiskLevelInfo(levelId);
  const fs = size === 'sm' ? '10px' : '11px';
  const px = size === 'sm' ? '5px 9px' : '4px 10px';
  return `<span style="display:inline-flex;align-items:center;gap:4px;background:${li.bg};color:${li.hex};font-size:${fs};font-weight:700;padding:${px};border-radius:99px;white-space:nowrap">${li.label}</span>`;
}

/* ── LEVEL BAR (5 dots) ── */
function levelBar(levelId) {
  const li = getRiskLevelInfo(levelId);
  const step = li.step;
  const dots = [1,2,3,4,5].map(i =>
    `<div style="width:6px;height:6px;border-radius:50%;background:${i<=step ? li.hex : 'var(--n200)'}"></div>`
  ).join('');
  return `<div style="display:flex;gap:3px;align-items:center">${dots}</div>`;
}

/* ════════════════════════════════════════════
   S0 — SÉLECTION PROFIL (démo)
════════════════════════════════════════════ */
function screenSelection() {
  const pEntries = Object.values(PROFILES);
  const cur = window._ST.profileId;

  const cards = pEntries.map(p => {
    const sel = cur === p.id;
    const topRiskId = p.mainRisks[0];
    const topLi = getRiskLevelInfo((p.riskExposure[topRiskId] || {}).zoneLevel || 'modere');
    return `
      <div style="display:flex;align-items:center;gap:12px;padding:13px 14px;background:${sel?'var(--axa-xlight)':'var(--white)'};border:1.5px solid ${sel?'var(--axa)':'var(--n200)'};border-radius:var(--r-md);cursor:pointer;transition:all .15s" onclick="selectProfile('${p.id}')">
        <div style="width:40px;height:40px;border-radius:50%;background:${sel?'var(--axa)':'var(--n150)'};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${p.avatar}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:700;color:${sel?'var(--axa)':'var(--n900)'}">${p.firstName}</div>
          <div style="font-size:11px;color:var(--n500);margin-top:1px">${p.location} · ${p.propertyType}</div>
          <div style="margin-top:4px;display:flex;align-items:center;gap:6px">
            ${levelChip(topLi.id,'sm')}
            <span style="font-size:10px;color:var(--n400)">${RISKS[topRiskId]?.label}</span>
          </div>
        </div>
        <div style="width:20px;height:20px;border-radius:50%;border:1.5px solid ${sel?'var(--axa)':'var(--n300)'};background:${sel?'var(--axa)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
          ${sel?`<svg width="11" height="11" viewBox="0 0 24 24" fill="white"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>`:''}
        </div>
      </div>`;
  }).join('');

  return `
    <div style="background:var(--axa);padding:28px var(--sp5) 24px;position:relative;overflow:hidden">
      <div style="position:absolute;right:-30px;top:-30px;width:140px;height:140px;border-radius:50%;background:rgba(255,255,255,.04)"></div>
      <div style="width:44px;height:44px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;margin-bottom:14px">
        ${sv(IC.shield,'width:22px;height:22px;fill:white')}
      </div>
      <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:6px">Prototype V3</div>
      <div style="font-size:21px;font-weight:700;color:white;line-height:1.2;margin-bottom:6px">Coach Prévention MRH</div>
      <p style="font-size:12px;color:rgba(255,255,255,.65);line-height:1.5">Sélectionnez un profil pour démarrer la démonstration V3</p>
    </div>
    <div style="padding:20px var(--sp5) 0">
      <div style="font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--n400);margin-bottom:12px">Profil de démonstration</div>
      <div style="display:flex;flex-direction:column;gap:10px">${cards}</div>
    </div>
    <div style="padding:20px var(--sp5)">
      <button style="width:100%;padding:14px;background:${cur?'var(--axa)':'var(--n200)'};color:${cur?'white':'var(--n400)'};border:none;border-radius:var(--r-md);font-size:15px;font-weight:600;font-family:var(--font);cursor:${cur?'pointer':'not-allowed'};display:flex;align-items:center;justify-content:center;gap:8px" onclick="startFromSelection()" ${cur?'':'disabled'}>
        Commencer le parcours
        ${sv(IC.arrow,'width:18px;height:18px;fill:currentColor')}
      </button>
    </div>
    <div style="height:20px"></div>`;
}

/* ════════════════════════════════════════════
   S1 — V3-01 HUB PRÉVENTION (navigation interne : Risques / Actions)
════════════════════════════════════════════ */
function screenHub() {
  const p          = getProfile(window._ST.profileId);
  const diagDone   = window._ST.diagCompleted;
  const tab        = (window._ST.hubTab === 'actions' && diagDone) ? 'actions' : 'risques';
  const done       = window._ST.completedActions || [];
  const unlockedBadges = window._ST.unlockedBadges || [];
  const badgeCount = unlockedBadges.length;
  const allActions = diagDone ? getActionsForProfile(p, window._ST.diagAnswers) : [];
  const todoCount  = allActions.filter(a => !done.includes(a.id)).length;

  /* ── HEADER ── */
  const header = `
    <div style="background:var(--axa);padding:18px var(--sp5) 22px;position:relative;overflow:hidden">
      <div style="position:absolute;right:-20px;top:-20px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.04)"></div>
      <div style="position:absolute;left:-30px;bottom:20px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,.03)"></div>

      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;margin-bottom:10px;position:relative">
        <div style="min-width:0">
          <div style="font-size:10px;font-weight:600;color:rgba(255,255,255,.5);letter-spacing:.8px;text-transform:uppercase;margin-bottom:5px">Coach Prévention</div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
            <div style="font-size:16px;font-weight:700;color:white">${p.firstName}</div>
            <div style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.25);border-radius:99px;padding:3px 10px 3px 7px">
              <span style="font-size:13px;line-height:1">🏠</span>
              <span style="font-size:11px;font-weight:700;color:white;letter-spacing:.3px">Habitation</span>
            </div>
          </div>
        </div>
        <button onclick="${diagDone?`goTo(8)`:`showToast('🔒 Terminez d\\'abord votre diagnostic','warn')`}" aria-label="Mes récompenses" style="position:relative;width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.15);border:none;display:flex;align-items:center;justify-content:center;cursor:${diagDone?'pointer':'not-allowed'};opacity:${diagDone?1:.5};flex-shrink:0;margin-top:2px">
          ${sv(IC.gift,'width:18px;height:18px;fill:white')}
          ${badgeCount > 0 ? `<span style="position:absolute;top:-3px;right:-3px;background:#D97706;color:white;border-radius:99px;padding:1px 5px;font-size:10px;font-weight:700;font-family:var(--font);min-width:16px;text-align:center;line-height:1.4">${badgeCount}</span>` : ''}
        </button>
      </div>

      <div style="position:relative;margin-bottom:10px">
        <div style="font-size:11px;color:rgba(255,255,255,.55);display:flex;align-items:center;gap:4px">
          ${sv(IC.pin,'width:10px;height:10px;fill:rgba(255,255,255,.55)')}${p.location} · ${p.propertyType}
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:2px">${p.contract.name} · ${p.contract.ref}</div>
      </div>

      <div style="position:relative;display:flex;align-items:center;gap:8px">
        <div style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.11);border-radius:99px;padding:4px 11px">
          ${diagDone
            ? `${sv(IC.check,'width:11px;height:11px;fill:var(--success-mid)')}<span style="font-size:11px;color:rgba(255,255,255,.85);font-weight:600">Diagnostic complété · Vue personnalisée</span>`
            : `${sv(IC.info,'width:11px;height:11px;fill:rgba(255,255,255,.55)')}<span style="font-size:11px;color:rgba(255,255,255,.7)">Vue de zone · Diagnostic recommandé</span>`}
        </div>
        ${badgeCount > 0 ? `<div style="display:inline-flex;align-items:center;gap:4px;background:rgba(217,119,6,.25);border:1px solid rgba(251,191,36,.35);border-radius:99px;padding:4px 10px"><span style="font-size:12px">🏅</span><span style="font-size:11px;font-weight:700;color:#fbbf24">${badgeCount} badge${badgeCount>1?'s':''}</span></div>` : ''}
      </div>
    </div>`;

  /* ── TABS (pills séparées) ── */
  const tabs = `
    <div style="padding:12px var(--sp5) 0">
      <div style="display:flex;background:var(--n100);border-radius:99px;padding:4px">
        <button onclick="switchHubTab('risques')" style="flex:1;padding:9px 14px;background:${tab==='risques'?'var(--white)':'transparent'};color:${tab==='risques'?'var(--axa)':'var(--n500)'};border:none;border-radius:99px;font-size:12px;font-weight:700;font-family:var(--font);cursor:pointer;box-shadow:${tab==='risques'?'0 1px 3px rgba(0,0,0,.08)':'none'};transition:all .2s">
          Mes risques
        </button>
        <button onclick="switchHubTab('actions')" style="flex:1;padding:9px 14px;background:${tab==='actions'?'var(--white)':'transparent'};color:${tab==='actions'?'var(--axa)':(diagDone?'var(--n500)':'var(--n400)')};border:none;border-radius:99px;font-size:12px;font-weight:700;font-family:var(--font);cursor:${diagDone?'pointer':'not-allowed'};display:flex;align-items:center;justify-content:center;gap:5px;box-shadow:${tab==='actions'?'0 1px 3px rgba(0,0,0,.08)':'none'};transition:all .2s">
          Mes Actions
          ${!diagDone ? `<span style="font-size:11px">🔒</span>` : todoCount > 0 ? `<span style="background:var(--axa);color:white;font-size:10px;padding:1px 6px;border-radius:99px;font-weight:700">${todoCount}</span>` : ''}
        </button>
      </div>
    </div>`;

  const body = tab === 'risques' ? hubRisquesTab(p, diagDone) : hubActionsTab(p, diagDone);

  return header + tabs + body + `<div style="height:24px"></div>`;
}

/* ── HUB · Tab Risques ── */
function hubRisquesTab(p, diagDone) {
  const levels     = getRiskLevels(p, diagDone ? window._ST.diagAnswers : {});
  const zoneLevels = getRiskLevels(p, {});  /* toujours les niveaux zone pour la comparaison */
  const mainRisks  = p.mainRisks;
  const otherRisks = Object.keys(RISKS).filter(r => !mainRisks.includes(r));
  const nQ = (window._ST.questions||[]).length || getQuestionsForProfile(p).length;

  /* ─ Calcul impact diagnostic ─ */
  const improvedList = diagDone ? mainRisks.filter(r => (levels[r]||{}).improved) : [];
  const degradedList = diagDone ? mainRisks.filter(r => (levels[r]||{}).degraded) : [];
  const actionsCount = diagDone ? getActionsForProfile(p, window._ST.diagAnswers).length : 0;

  /* ─ Carte diagnostic (compact, pre / post) ─ */
  const diagCard = diagDone
    ? `<div style="background:var(--white);border:1.5px solid var(--n200);border-radius:var(--r-md);padding:13px 14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:var(--r-sm);background:var(--axa-xlight);display:flex;align-items:center;justify-content:center;flex-shrink:0">${sv(IC.history,'width:16px;height:16px;fill:var(--axa)')}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:700;color:var(--n900)">Mettre à jour le diagnostic</div>
            <div style="font-size:11px;color:var(--n500);margin-top:1px">Réévaluez votre exposition avec vos dernières infos.</div>
          </div>
          <button onclick="restartDiagnostic()" style="padding:7px 12px;background:var(--n100);color:var(--n700);border:none;border-radius:99px;font-size:11px;font-weight:600;font-family:var(--font);cursor:pointer;flex-shrink:0">Relancer</button>
        </div>
      </div>`
    : `<div style="background:var(--white);border:1.5px solid var(--axa-light);border-radius:var(--r-md);padding:13px 14px">
        <div style="display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:var(--r-sm);background:var(--axa);display:flex;align-items:center;justify-content:center;flex-shrink:0">${sv(IC.shield,'width:16px;height:16px;fill:white')}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:12px;font-weight:700;color:var(--n900)">Démarrer le diagnostic</div>
            <div style="font-size:11px;color:var(--n500);margin-top:1px">${nQ} questions · 2 min · sans impact sur la prime</div>
          </div>
          <button onclick="goTo(2)" style="padding:7px 12px;background:var(--axa);color:white;border:none;border-radius:99px;font-size:11px;font-weight:600;font-family:var(--font);cursor:pointer;flex-shrink:0">Démarrer</button>
        </div>
      </div>`;

  /* ─ Phrase discrète post-diagnostic ─ */
  const impactNote = diagDone
    ? (improvedList.length > 0
        ? `<span style="font-size:11px;color:var(--success);font-weight:600">↓ ${improvedList.length} indicateur${improvedList.length>1?'s réduits':' réduit'} grâce aux équipements déclarés</span>`
        : `<span style="font-size:11px;color:var(--n500)">✓ Niveaux de zone confirmés par votre diagnostic</span>`)
    : '';

  /* ─ Cartes risques principaux ─ */
  const riskCards = mainRisks.slice(0, 3).map(rId => {
    const r       = RISKS[rId];
    const lv      = levels[rId] || {};
    const li      = lv.levelInfo || getRiskLevelInfo('modere');
    const zoneLv  = zoneLevels[rId] || {};
    const zoneLi  = zoneLv.levelInfo || getRiskLevelInfo('modere');
    const evolved = diagDone && lv.zoneLevel !== lv.homeAdjustedLevel;
    const isHigh  = li.step >= 4;

    return `
      <div onclick="openRisk('${rId}')" style="background:var(--white);border:1.5px solid ${!diagDone?'var(--n150)':isHigh?li.bg:'var(--n150)'};border-radius:var(--r-md);padding:14px;cursor:pointer;position:relative;overflow:hidden;${!diagDone?'opacity:.92':''}">
        ${diagDone && isHigh ? `<div style="position:absolute;top:0;right:0;width:4px;height:100%;background:${li.hex}"></div>` : ''}
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
            <div style="width:36px;height:36px;border-radius:var(--r-sm);background:${diagDone?li.bg:'var(--n100)'};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${r.icon}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:700;color:var(--n900)">${r.label}</div>
              <div style="margin-top:5px">${levelBar(li.id)}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
            ${levelChip(li.id,'sm')}
            ${!diagDone ? `<span style="font-size:10px;color:var(--n400);font-weight:500;margin-top:1px">Zone</span>` : ''}
            ${diagDone && lv.improved ? `<span style="font-size:10px;color:var(--success);font-weight:700">↓ Réduit</span>` : ''}
            ${diagDone && lv.degraded ? `<span style="font-size:10px;color:var(--danger);font-weight:700">↑ Aggravé</span>` : ''}
          </div>
        </div>
        ${diagDone && evolved ? `
          <div style="margin-top:10px;padding:8px 10px;background:${lv.improved?'var(--success-bg)':'var(--danger-bg)'};border-radius:var(--r-sm);display:flex;align-items:center;gap:8px">
            <span style="font-size:11px;color:var(--n500);text-decoration:line-through">${zoneLi.label}</span>
            <span style="font-size:11px;color:var(--n400)">→</span>
            <span style="font-size:11px;font-weight:700;color:${li.hex}">${li.label}</span>
            <span style="font-size:10px;color:var(--n500);margin-left:2px">· personnalisé</span>
          </div>` : ''}
        ${diagDone && !evolved ? `
          <div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--n100);font-size:11px;color:var(--n500);display:flex;align-items:center;gap:5px">
            ${sv(IC.check,'width:10px;height:10px;fill:var(--n400)')} Confirmé par votre diagnostic
          </div>` : ''}
      </div>`;
  }).join('');

  /* ─ Risques secondaires ─ */
  const secondaryRisks = [...mainRisks.slice(3), ...otherRisks].slice(0, 3).map(rId => {
    const r  = RISKS[rId];
    const lv = levels[rId] || {};
    const li = lv.levelInfo || getRiskLevelInfo('faible');
    return `
      <div style="flex:1;background:var(--white);border:1px solid var(--n150);border-radius:var(--r-sm);padding:10px 8px;text-align:center;cursor:pointer" onclick="openRisk('${rId}')">
        <div style="font-size:20px;margin-bottom:4px">${r.icon}</div>
        <div style="font-size:10px;font-weight:600;color:var(--n700);margin-bottom:4px">${r.label}</div>
        ${levelChip(li.id,'sm')}
      </div>`;
  }).join('');

  /* ─ Bannière CTA actions post-diag ─ */
  const actionsCTA = diagDone ? `
    <button onclick="switchHubTab('actions')" style="width:100%;padding:13px 16px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:space-between">
      <span style="display:flex;align-items:center;gap:8px">
        ${sv(IC.bolt,'width:14px;height:14px;fill:white')}
        Voir mes ${actionsCount} actions recommandées
      </span>
      ${sv(IC.arrow,'width:16px;height:16px;fill:white')}
    </button>` : '';

  /* ─ Événement local ─ */
  const lc = p.localContext || {};
  const ev = lc.recentEvent;
  const contextBlock = ev ? `
    <div style="background:var(--warn-bg);border:1px solid var(--warn-light);border-radius:var(--r-md);padding:12px 14px;display:flex;gap:10px;align-items:flex-start">
      <span style="font-size:18px;flex-shrink:0">⚠️</span>
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--warn)">Événement récent · ${ev.year}</div>
        <div style="font-size:12px;color:var(--n700);margin-top:3px;line-height:1.4">${ev.label} — ${ev.detail}</div>
      </div>
    </div>` : '';

  return `
    <div style="padding:14px var(--sp5) 8px;display:flex;flex-direction:column;gap:14px">
      ${diagCard}
      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <div style="font-size:13px;font-weight:700;color:var(--n900)">Vos risques principaux</div>
          ${!diagDone
            ? `<button onclick="showZoneInfoModal()" style="display:flex;align-items:center;gap:4px;background:none;border:none;padding:2px 0;cursor:pointer;font-family:var(--font)">${sv(IC.info,'width:12px;height:12px;fill:var(--n400)')}<span style="font-size:11px;color:var(--n500)">Comment est-ce calculé ?</span></button>`
            : ''}
        </div>
        ${impactNote ? `<div style="margin-bottom:10px">${impactNote}</div>` : `<div style="margin-bottom:10px"></div>`}
        <div style="display:flex;flex-direction:column;gap:8px">${riskCards}</div>
      </div>
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--n500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Autres risques</div>
        <div style="display:flex;gap:8px">${secondaryRisks}</div>
      </div>
      ${contextBlock}
      ${actionsCTA}
      ${diagDone ? `
        <button onclick="downloadBilan()" style="width:100%;padding:12px 14px;background:var(--white);border:1.5px solid var(--n200);color:var(--n700);border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
          ${sv(IC.download,'width:15px;height:15px;fill:var(--n700)')} Télécharger mon bilan prévention
        </button>` : ''}
    </div>`;
}

/* ── HUB · Tab Actions ── */
function hubActionsTab(p, diagDone) {
  if (!diagDone) {
    return `
      <div style="padding:16px var(--sp5);display:flex;flex-direction:column;gap:16px">
        <div style="background:var(--n50);border:1.5px dashed var(--n300);border-radius:var(--r-md);padding:28px 20px;text-align:center">
          <div style="font-size:36px;margin-bottom:10px;opacity:.6">🔒</div>
          <div style="font-size:15px;font-weight:700;color:var(--n700);margin-bottom:6px">Actions, défis & récompenses verrouillés</div>
          <p style="font-size:12.5px;color:var(--n500);line-height:1.5;margin-bottom:14px">Complétez votre diagnostic pour débloquer vos recommandations personnalisées, défis saisonniers et récompenses.</p>
          <button onclick="switchHubTab('risques')" style="padding:10px 18px;background:var(--axa);color:white;border:none;border-radius:var(--r-sm);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer">
            Démarrer le diagnostic
          </button>
        </div>
      </div>`;
  }

  const done  = window._ST.completedActions || [];
  const allA  = getActionsForProfile(p, window._ST.diagAnswers);
  const todo  = allA.filter(a => !done.includes(a.id));
  const doneA = allA.filter(a => done.includes(a.id));
  const unlockedBadges = window._ST.unlockedBadges || [];
  const badgeCount     = unlockedBadges.length;

  /* Actions groupées par risque principal (todo uniquement pour les cartes ouvrables) */
  const actionsByRisk = {};
  p.mainRisks.forEach(r => actionsByRisk[r] = []);
  todo.forEach(a => { if (actionsByRisk[a.riskId] !== undefined) actionsByRisk[a.riskId].push(a); });

  /* Défi du moment actif */
  const today = new Date().toISOString().slice(0,10);
  const activeDefi = (typeof DEFIS_DU_MOMENT !== 'undefined')
    ? DEFIS_DU_MOMENT.find(d => d.expiresAt > today && !(window._ST.completedDefis||[]).includes(d.id))
    : null;

  function categoryCard(riskId) {
    const risk  = RISKS[riskId] || {};
    const cv    = (typeof RISK_CATEGORY_VERBS !== 'undefined' && RISK_CATEGORY_VERBS[riskId]) || { verb: 'Agir', phrase: '' };
    const acts  = actionsByRisk[riskId] || [];
    const isDone = acts.length === 0;
    const levelColor = risk.level==='high' ? 'var(--danger)' : risk.level==='medium' ? 'var(--warn)' : 'var(--success)';
    const linkedBadge = (typeof BADGES !== 'undefined')
      ? BADGES.find(b => b.condition && b.condition.type === 'risk_complete' && b.condition.riskId === riskId)
      : null;
    const badgeEarned = linkedBadge && unlockedBadges.includes(linkedBadge.id);
    return `
      <div onclick="${isDone ? '' : `openCategoryModal('${riskId}')`}"
           style="background:var(--white);border:1.5px solid ${isDone?'var(--success-light, #d4f4e1)':'var(--n150)'};border-radius:var(--r-md);padding:14px;cursor:${isDone?'default':'pointer'};position:relative">
        <div style="display:flex;align-items:flex-start;gap:10px">
          <div style="width:40px;height:40px;border-radius:10px;background:${isDone?'var(--success-light, #d4f4e1)':'var(--axa-xlight)'};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${risk.icon || '⚡'}</div>
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
              <div style="font-size:12px;font-weight:700;color:${isDone?'var(--success)':'var(--n900)'}">${cv.verb} — ${risk.label || riskId}</div>
              ${isDone ? '<span style="font-size:10px;background:var(--success);color:white;border-radius:99px;padding:1px 7px">✓ Fait</span>' : `<div style="width:7px;height:7px;border-radius:50%;background:${levelColor};flex-shrink:0"></div>`}
            </div>
            <div style="font-size:11px;color:var(--n500);line-height:1.4">${cv.phrase}</div>
            ${isDone
              ? `<div style="font-size:10px;color:var(--success);margin-top:4px;font-weight:600">Toutes les actions réalisées 🎉${badgeEarned ? ' · 🏅 Badge débloqué !' : ''}</div>`
              : `<div style="display:flex;align-items:center;gap:5px;margin-top:5px">${linkedBadge ? `<span style="font-size:10px;color:#92400E;background:#FEF3C7;padding:1px 7px;border-radius:99px">${linkedBadge.icon} ${linkedBadge.label}</span>` : ''}<span style="font-size:10px;color:var(--n400)">${acts.length} action${acts.length>1?'s':''}</span></div>`}
          </div>
          ${!isDone ? '<div style="color:var(--n300);font-size:20px;align-self:center">›</div>' : ''}
        </div>
      </div>`;
  }

  function defiHeroCard(d) {
    const daysLeft = Math.max(0, Math.round((new Date(d.expiresAt)-new Date())/(1000*60*60*24)));
    return `
      <div onclick="openDefiModal('${d.id}')"
           style="background:linear-gradient(135deg,#00008F,#1a1aaa);border:1.5px solid #d4a017;border-radius:var(--r-md);padding:12px 14px;cursor:pointer;position:relative;overflow:hidden">
        <div style="position:absolute;right:-8px;top:-8px;font-size:44px;opacity:.1">${d.icon}</div>
        <div style="display:flex;align-items:center;gap:10px;position:relative">
          <div style="width:40px;height:40px;border-radius:10px;background:rgba(251,191,36,.18);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${d.icon}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:9px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:.7px;margin-bottom:2px">🔥 Défi · ${d.period}</div>
            <div style="font-size:13px;font-weight:700;color:white;line-height:1.25">${d.title}</div>
            <div style="font-size:10.5px;color:rgba(255,255,255,.55);margin-top:3px">${d.lotIcon} ${d.lot} · 🕐 ${daysLeft}j</div>
          </div>
          <div style="background:rgba(251,191,36,.2);border-radius:var(--r-sm);padding:5px 9px;font-size:18px;flex-shrink:0">🏅</div>
        </div>
      </div>`;
  }

  const boosts = [
    { icon:'🔄', title:'Refaire mon diagnostic', sub:'Contribue aux badges de progression', onclick:'goTo(2)' },
    { icon:'📸', title:'Ajouter une photo de mon logement', sub:'Inventaire visuel pour l\'assureur', onclick:"showToast('Bientôt disponible','info')" },
    { icon:'👥', title:'Inviter un proche', sub:'Partagez votre Coach Prévention', onclick:"showToast('Bientôt disponible','info')" },
    { icon:'📝', title:'Compléter mon profil', sub:'Ajoutez les détails de votre logement', onclick:'goTo(0)' }
  ];

  function boostRow(b) {
    return `
      <div onclick="${b.onclick}" style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--n100);cursor:pointer">
        <div style="width:38px;height:38px;border-radius:50%;background:var(--axa-xlight);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${b.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--n900)">${b.title}</div>
          <div style="font-size:11px;color:var(--n500);margin-top:1px">${b.sub}</div>
        </div>
        <div style="color:var(--n300);font-size:16px">›</div>
      </div>`;
  }

  return `
    <div style="padding:14px var(--sp5) 8px;display:flex;flex-direction:column;gap:20px">

      <!-- SECTION 1 : Défis du moment (éphémère — en premier) -->
      <div>
        <div style="margin-bottom:12px">
          <div style="font-size:14px;font-weight:700;color:var(--n900);margin-bottom:3px">🔥 Défis du moment</div>
          <div style="font-size:11px;color:var(--n500)">Animations saisonnières · ponctuelles · engageantes</div>
        </div>

        ${activeDefi
          ? defiHeroCard(activeDefi)
          : `<div style="background:var(--n50);border:1.5px dashed var(--n200);border-radius:var(--r-md);padding:20px;text-align:center;margin-bottom:10px">
               <div style="font-size:28px;opacity:.35;margin-bottom:8px">🏆</div>
               <div style="font-size:13px;font-weight:600;color:var(--n500);margin-bottom:3px">Aucun défi actif ce mois-ci</div>
               <div style="font-size:11px;color:var(--n400)">Revenez bientôt pour relever un nouveau défi saisonnier</div>
             </div>`}

        <div onclick="openQuizModal()"
             style="background:linear-gradient(135deg,#6b21a8,#7c3aed);border-radius:var(--r-md);padding:14px 16px;cursor:pointer;display:flex;align-items:center;gap:12px;margin-top:10px">
          <div style="font-size:28px">🧠</div>
          <div style="flex:1">
            <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px">
              <div style="font-size:13px;font-weight:700;color:white">Quiz de la semaine</div>
              <span style="font-size:9px;background:#fbbf24;color:#1a1a00;border-radius:99px;padding:1px 6px;font-weight:700">NOUVEAU</span>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,.7)">Les bons gestes anti-cambriolage · 5 questions · 2 min</div>
          </div>
          <div style="font-size:22px;flex-shrink:0">▶</div>
        </div>
      </div>

      <div style="border-top:2px solid var(--n100)"></div>

      <!-- SECTION 2 : Plan d'actions personnalisé (permanent) -->
      <div>
        <div style="margin-bottom:12px">
          <div style="font-size:14px;font-weight:700;color:var(--n900);margin-bottom:3px">📋 Mes actions recommandées</div>
          <div style="font-size:11px;color:var(--n500)">Permanent · personnalisé pour votre profil et vos risques</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">
          ${p.mainRisks.map(categoryCard).join('')}
        </div>
      </div>

      <div style="border-top:2px solid var(--n100)"></div>

      ${doneA.length > 0 ? `
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--n500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Déjà réalisées (${doneA.length})</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${doneA.map(a => `
              <div onclick="openAction('${a.id}')" style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--success-bg);border:1px solid var(--success-light);border-radius:var(--r-md);cursor:pointer">
                <div style="width:22px;height:22px;border-radius:50%;background:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">${sv(IC.check,'width:12px;height:12px;fill:white')}</div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:12.5px;font-weight:600;color:var(--success);line-height:1.3">${a.title}</div>
                  <div style="font-size:10.5px;color:var(--n500);margin-top:1px">${a.riskLabel}</div>
                </div>
                <span style="font-size:16px;flex-shrink:0">✓</span>
              </div>`).join('')}
          </div>
        </div>` : ''}

      <button onclick="goTo(8)" style="width:100%;padding:13px;background:var(--n100);color:var(--n700);border:none;border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
        ${sv(IC.gift,'width:15px;height:15px;fill:var(--n700)')} Voir mes récompenses
        ${badgeCount > 0 ? `<span style="background:#D97706;color:white;border-radius:99px;padding:1px 8px;font-size:11px">🏅 ${badgeCount}</span>` : ''}
      </button>
    </div>`;
}

/* ════════════════════════════════════════════
   S2 — V3-02 DIAGNOSTIC
════════════════════════════════════════════ */
function screenDiagnostic() {
  const p    = getProfile(window._ST.profileId);
  if (!window._ST.questions || !window._ST.questions.length) {
    window._ST.questions = getQuestionsForProfile(p);
  }
  const qs   = window._ST.questions;
  const step = window._ST.diagStep || 0;
  const q    = qs[step];
  const ans  = (window._ST.diagAnswers || {})[q.id];
  const pct  = Math.round(((step + 1) / qs.length) * 100);
  const risk = RISKS[q.riskId] || {};
  const li   = getRiskLevelInfo((p.riskExposure[q.riskId] || {}).zoneLevel || 'modere');

  const options = q.options.map(o =>
    `<div class="opt-item${ans===o.v?' sel':''}" onclick="selectDiagOpt('${q.id}','${o.v}',this)" style="padding:13px 16px;border:1.5px solid ${ans===o.v?'var(--axa)':'var(--n200)'};border-radius:var(--r-md);background:${ans===o.v?'var(--axa-xlight)':'var(--white)'};cursor:pointer;display:flex;align-items:center;gap:10px;transition:all .15s">
      <div class="radio-btn" style="width:18px;height:18px;border-radius:50%;border:2px solid ${ans===o.v?'var(--axa)':'var(--n300)'};background:${ans===o.v?'var(--axa)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
        ${ans===o.v?`<div style="width:6px;height:6px;border-radius:50%;background:white"></div>`:''}
      </div>
      <span class="opt-label" style="font-size:14px;color:${ans===o.v?'var(--axa)':'var(--n800)'};font-weight:${ans===o.v?'600':'400'}">${o.l}</span>
    </div>`
  ).join('');

  return `
    <div style="background:var(--axa);padding:16px var(--sp5) 20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <button onclick="diagBack()" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:white;flex-shrink:0">
          ${sv(IC.back,'width:18px;height:18px;fill:white')}
        </button>
        <div style="flex:1">
          <div style="font-size:11px;color:rgba(255,255,255,.55)">Diagnostic logement</div>
          <div style="font-size:14px;font-weight:600;color:white">Question ${step+1} sur ${qs.length}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-shrink:0">
          <span style="font-size:20px">${risk.icon || '?'}</span>
          ${levelChip(li.id,'sm')}
        </div>
      </div>
      <div style="background:rgba(255,255,255,.15);border-radius:99px;height:4px;overflow:hidden">
        <div style="height:100%;width:${pct}%;background:var(--success-mid);border-radius:99px;transition:width .3s ease"></div>
      </div>
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:16px">
      <div>
        <div style="font-size:11px;font-weight:700;color:${li.hex};text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">${risk.label}</div>
        <div style="font-size:16px;font-weight:700;color:var(--n900);line-height:1.4">${q.text}</div>
      </div>

      ${q.hint ? `
        <div style="background:var(--info-bg);border-left:3px solid var(--info-mid);border-radius:0 var(--r-sm) var(--r-sm) 0;padding:10px 12px;display:flex;gap:8px;align-items:flex-start">
          ${sv(IC.info,'width:14px;height:14px;fill:var(--info);flex-shrink:0;margin-top:1px')}
          <p style="font-size:12px;color:var(--n700);line-height:1.5;margin:0">${q.hint}</p>
        </div>` : ''}

      <div class="option-list" style="display:flex;flex-direction:column;gap:8px">${options}</div>

      <div style="display:flex;align-items:center;justify-content:center;gap:6px;padding:10px 0 4px;font-size:12px;color:var(--n500)">
        ${sv(IC.info,'width:12px;height:12px;fill:var(--n400)')}
        <span>Sélectionnez une réponse pour continuer${step === qs.length-1 ? ' — dernière question' : ''}</span>
      </div>
    </div>
    <div style="height:20px"></div>`;
}

/* ════════════════════════════════════════════
   S3 — V3-03 VUE ENRICHIE POST-DIAGNOSTIC
════════════════════════════════════════════ */
function screenRisques() {
  const p      = getProfile(window._ST.profileId);
  const levels = getRiskLevels(p, window._ST.diagAnswers);
  const mainRisks = p.mainRisks;
  const improved = mainRisks.filter(r => (levels[r]||{}).improved);
  const degraded = mainRisks.filter(r => (levels[r]||{}).degraded);

  const riskRows = mainRisks.map(rId => {
    const r  = RISKS[rId];
    const lv = levels[rId] || {};
    const li = lv.levelInfo || getRiskLevelInfo('modere');
    const zoneLi = getRiskLevelInfo(lv.zoneLevel || li.id);
    const changed = lv.improved || lv.degraded;
    return `
      <div onclick="openRisk('${rId}')" style="background:var(--white);border:1.5px solid var(--n150);border-radius:var(--r-md);padding:14px 16px;cursor:pointer;display:flex;align-items:center;gap:12px">
        <div style="width:40px;height:40px;border-radius:var(--r-sm);background:${li.bg};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${r.icon}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700;color:var(--n900)">${r.label}</div>
          <div style="margin-top:5px">${levelBar(li.id)}</div>
          ${changed ? `
            <div style="margin-top:5px;display:flex;align-items:center;gap:5px">
              <span style="font-size:10px;color:var(--n400);text-decoration:line-through">${zoneLi.label}</span>
              <span style="font-size:10px;color:var(--n400)">→</span>
              ${levelChip(li.id,'sm')}
              ${lv.improved ? `<span style="font-size:10px;color:var(--success);font-weight:600">↓ Amélioré</span>` : `<span style="font-size:10px;color:var(--danger);font-weight:600">↑ Attention</span>`}
            </div>` : `<div style="margin-top:5px">${levelChip(li.id,'sm')}</div>`
          }
        </div>
        <div style="flex-shrink:0;color:var(--n300)">
          ${sv(IC.arrow,'width:16px;height:16px;fill:var(--n300)')}
        </div>
      </div>`;
  }).join('');

  /* Summary banner */
  const totalImproved = improved.length;
  const summaryBanner = totalImproved > 0
    ? `<div style="background:var(--success-bg);border:1.5px solid var(--success-light);border-radius:var(--r-md);padding:12px 14px;display:flex;gap:10px;align-items:flex-start">
        ${sv(IC.check,'width:16px;height:16px;fill:var(--success);flex-shrink:0;margin-top:1px')}
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--success)">Votre diagnostic a amélioré ${totalImproved} risque${totalImproved>1?'s':''}</div>
          <div style="font-size:12px;color:var(--n600);margin-top:3px;line-height:1.5">Grâce à vos équipements et habitudes, votre exposition réelle est plus faible qu'estimée initialement.</div>
        </div>
       </div>`
    : `<div style="background:var(--info-bg);border:1px solid var(--info-light);border-radius:var(--r-md);padding:12px 14px;display:flex;gap:10px;align-items:flex-start">
        ${sv(IC.info,'width:16px;height:16px;fill:var(--info);flex-shrink:0;margin-top:1px')}
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--info)">Vue mise à jour</div>
          <div style="font-size:12px;color:var(--n600);margin-top:3px;line-height:1.5">Vos niveaux ont été affinés selon vos réponses. Consultez le plan d'action pour réduire vos risques.</div>
        </div>
       </div>`;

  /* Diag answers recap (top 3) */
  const answeredQs = Object.keys(window._ST.diagAnswers||{}).slice(0,3).map(qid => {
    const q   = (window._ST.questions||[]).find(x=>x.id===qid);
    const val = window._ST.diagAnswers[qid];
    if (!q) return '';
    const opt = q.options.find(o=>o.v===val);
    const dot = val==='yes'?'var(--success)':val==='no'?'var(--danger-mid)':'var(--warn-mid)';
    return `<div style="display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--n100)">
      <div style="width:7px;height:7px;border-radius:50%;background:${dot};flex-shrink:0"></div>
      <div style="flex:1;font-size:12px;color:var(--n700)">${q.text.replace(/\s\?.*$/,'')}</div>
      <span style="font-size:11px;font-weight:600;color:var(--n600);flex-shrink:0">${opt?opt.l:val}</span>
    </div>`;
  }).join('');

  return `
    <div style="background:var(--axa);padding:16px var(--sp5) 20px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <button onclick="goTo(1)" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
          ${sv(IC.back,'width:18px;height:18px;fill:white')}
        </button>
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,.55)">Résultats</div>
          <div style="font-size:17px;font-weight:700;color:white">Vos risques mis à jour</div>
        </div>
      </div>
      <div style="font-size:12px;color:rgba(255,255,255,.6);margin-top:4px">${p.location} · Diagnostic complété</div>
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:14px">
      ${summaryBanner}

      <div>
        <div style="font-size:12px;font-weight:700;color:var(--n600);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Exposition par risque</div>
        <div style="display:flex;flex-direction:column;gap:8px">${riskRows}</div>
      </div>

      ${answeredQs ? `
        <div style="background:var(--n50);border-radius:var(--r-md);padding:12px 14px">
          <div style="font-size:11px;font-weight:700;color:var(--n500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Vos réponses clés</div>
          ${answeredQs}
          <div style="font-size:11px;color:var(--n400);margin-top:8px;text-align:center">${Object.keys(window._ST.diagAnswers||{}).length} questions répondues</div>
        </div>` : ''}

      <div style="display:flex;gap:10px">
        <button onclick="window._ST.hubTab='actions';goTo(1)" style="flex:2;padding:13px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:14px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
          ${sv(IC.bolt,'width:15px;height:15px;fill:white')} Mes Actions
        </button>
        <button onclick="goTo(1)" style="flex:1;padding:13px;background:var(--n100);color:var(--n700);border:none;border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer">
          Retour
        </button>
      </div>
    </div>
    <div style="height:24px"></div>`;
}

/* ════════════════════════════════════════════
   S4 — V3-04 DEEP DIVE RISQUE
════════════════════════════════════════════ */
function screenDeepDive() {
  const p      = getProfile(window._ST.profileId);
  const riskId = window._ST.selectedRisk || p.mainRisks[0];
  const r      = RISKS[riskId] || {};
  const levels = getRiskLevels(p, window._ST.diagCompleted ? window._ST.diagAnswers : {});
  const lv     = levels[riskId] || {};
  const li     = lv.levelInfo || getRiskLevelInfo('modere');
  const cov    = (p.coverage||{})[riskId] || {};
  const lc     = p.localContext || {};
  const stats  = (lc.sinistresStats||{})[riskId];
  const testi  = lc.testimonial;

  const covIcon  = cov.status==='covered'?'✓':cov.status==='partial'?'◑':'✗';
  const covLabel = cov.status==='covered'?'Couvert':cov.status==='partial'?'Couverture partielle':'Non applicable';
  const covColor = cov.status==='covered'?'var(--success)':cov.status==='partial'?'var(--warn)':'var(--n500)';

  return `
    <div style="background:var(--axa);padding:18px var(--sp5) 22px;position:relative;overflow:hidden">
      <div style="position:absolute;right:-20px;top:-20px;width:130px;height:130px;border-radius:50%;background:rgba(255,255,255,.04)"></div>

      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:14px;position:relative">
        <button onclick="goTo(1)" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;margin-top:2px">
          ${sv(IC.back,'width:18px;height:18px;fill:white')}
        </button>
        <div>
          <div style="font-size:10px;font-weight:600;color:rgba(255,255,255,.5);letter-spacing:.8px;text-transform:uppercase;margin-bottom:5px">Coach Prévention</div>
          <div style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.25);border-radius:99px;padding:3px 10px 3px 7px">
            <span style="font-size:13px;line-height:1">🏠</span>
            <span style="font-size:11px;font-weight:700;color:white;letter-spacing:.3px">Habitation</span>
          </div>
        </div>
      </div>

      <div style="display:flex;align-items:center;gap:14px;position:relative">
        <div style="width:52px;height:52px;border-radius:var(--r-md);background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:26px;flex-shrink:0">${r.icon}</div>
        <div>
          <div style="font-size:19px;font-weight:700;color:white;line-height:1.2">${r.label}</div>
          <div style="margin-top:6px;display:flex;align-items:center;gap:8px">
            ${levelChip(li.id)}
            ${levelBar(li.id)}
          </div>
        </div>
      </div>
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:20px">

      <div>
        <div style="font-size:13px;font-weight:700;color:var(--n900);margin-bottom:10px">Pourquoi ce niveau ?</div>
        <div style="background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);padding:14px">
          <p style="font-size:13px;color:var(--n700);line-height:1.55;margin:0">${r.explanation}</p>
          ${stats ? `<div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--n100);font-size:12px;color:var(--n600);display:flex;gap:6px;align-items:flex-start">
            ${sv(IC.info,'width:13px;height:13px;fill:var(--n400);flex-shrink:0;margin-top:1px')}
            <span>${stats.stat} <span style="color:var(--n400)">(${stats.source})</span></span>
          </div>` : ''}
        </div>
      </div>

      ${testi ? `
        <div style="background:var(--warn-bg);border-left:3px solid var(--warn-mid);border-radius:0 var(--r-md) var(--r-md) 0;padding:12px 14px">
          <div style="font-size:10px;font-weight:700;color:var(--warn);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px">Cas similaire · ${testi.situation}</div>
          <p style="font-size:12px;color:var(--n700);line-height:1.55;font-style:italic;margin:0">"${testi.text}"</p>
          <div style="font-size:10px;color:var(--n400);margin-top:6px">${testi.source}</div>
        </div>` : ''}

      ${cov.status ? `
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--n900);margin-bottom:10px">Votre couverture AXA</div>
          <div style="background:var(--white);border:2px solid ${covColor};border-radius:var(--r-md);padding:16px;box-shadow:0 2px 10px rgba(0,0,0,.07)">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:${cov.franchise||cov.note?'12px':'0'}">
              <div style="width:40px;height:40px;border-radius:50%;background:${cov.status==='covered'?'var(--success-bg)':cov.status==='partial'?'var(--warn-bg)':'var(--n100)'};display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:700;color:${covColor};flex-shrink:0">${covIcon}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:15px;font-weight:700;color:${covColor}">${covLabel}</div>
                ${cov.limit ? `<div style="font-size:12px;color:var(--n500);margin-top:2px">Plafond ${cov.limit}</div>` : ''}
              </div>
            </div>
            ${cov.franchise ? `<div style="padding-top:10px;border-top:1px solid var(--n100);font-size:12px;color:var(--n600)">Franchise : <strong>${cov.franchise}</strong></div>` : ''}
            ${cov.note ? `<div style="margin-top:8px;font-size:11px;color:var(--n500);line-height:1.5;${cov.franchise?'':'padding-top:10px;border-top:1px solid var(--n100)'}">${cov.note}</div>` : ''}
          </div>
        </div>` : ''}

      <button onclick="openCategoryModal('${riskId}')" style="width:100%;padding:13px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
        ${sv(IC.bolt,'width:15px;height:15px;fill:white')} Voir mes actions pour ce risque
      </button>
    </div>
    <div style="height:24px"></div>`;
}

/* ════════════════════════════════════════════
   S5 — V3-05 PLAN D'ACTION
════════════════════════════════════════════ */
function screenPlan() {
  window._ST.hubTab = 'actions';
  setTimeout(() => goTo(1), 0);
  return `<div style="padding:24px;text-align:center;color:var(--n500);font-size:13px">Redirection vers Mes Actions…</div>`;
}

/* ════════════════════════════════════════════
   S6 — V3-06 ACTIONS & DÉFIS
════════════════════════════════════════════ */
function openCategoryModal(riskId) {
  const p    = getProfile(window._ST.profileId);
  const done = window._ST.completedActions || [];
  const allA = getActionsForProfile(p, window._ST.diagAnswers);
  const todo = allA.filter(a => !done.includes(a.id) && a.riskId === riskId);
  const risk = RISKS[riskId] || {};
  const cv   = RISK_CATEGORY_VERBS[riskId] || { verb: 'Agir', phrase: '' };

  function modalActionRow(a) {
    const effortColor = a.effort==='low' ? 'var(--success)' : a.effort==='medium' ? 'var(--warn)' : 'var(--danger)';
    const effortLabel = a.effort==='low' ? 'Facile' : a.effort==='medium' ? 'Moyen' : 'Avancé';
    return `
      <div onclick="document.getElementById('cat-modal-bd').remove();openAction('${a.id}')"
           style="display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid var(--n100);cursor:pointer">
        <div style="width:8px;height:8px;border-radius:50%;background:${effortColor};flex-shrink:0"></div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--n900);line-height:1.3">${a.title}</div>
          <div style="font-size:11px;color:var(--n500);margin-top:2px">${effortLabel} · ${a.duration}</div>
        </div>
        <div style="color:var(--n300);font-size:16px">›</div>
      </div>`;
  }

  const emptyState = todo.length === 0
    ? `<div style="text-align:center;padding:32px 0">
         <div style="font-size:36px;margin-bottom:8px">✅</div>
         <div style="font-size:14px;font-weight:700;color:var(--success)">Toutes les actions réalisées !</div>
       </div>`
    : todo.map(modalActionRow).join('');

  const device = document.querySelector('.device') || document.body;
  const bd = document.createElement('div');
  bd.id = 'cat-modal-bd';
  bd.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:400;display:flex;align-items:flex-end;justify-content:center';
  bd.innerHTML = `
    <div id="cat-modal-sheet" style="background:white;width:100%;border-radius:20px 20px 0 0;padding:0 0 24px;max-height:85%;overflow-y:auto;transform:translateY(100%);transition:transform .3s cubic-bezier(.4,0,.2,1)">
      <div style="display:flex;justify-content:center;padding:10px 0 4px">
        <div style="width:36px;height:4px;border-radius:99px;background:var(--n200)"></div>
      </div>
      <div style="padding:14px 20px 16px;border-bottom:1px solid var(--n100)">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:6px">
          <div style="width:46px;height:46px;border-radius:12px;background:var(--axa-xlight);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${risk.icon || '⚡'}</div>
          <div>
            <div style="font-size:11px;font-weight:700;color:var(--axa);text-transform:uppercase;letter-spacing:.5px">${cv.verb}</div>
            <div style="font-size:16px;font-weight:700;color:var(--n900)">${risk.label || riskId}</div>
            <div style="font-size:12px;color:var(--n500);margin-top:1px">${cv.phrase}</div>
          </div>
          <button onclick="document.getElementById('cat-modal-bd').remove()" style="margin-left:auto;width:30px;height:30px;border-radius:50%;background:var(--n100);border:none;font-size:16px;cursor:pointer;flex-shrink:0">✕</button>
        </div>
        ${todo.length > 0 ? `<div style="font-size:11px;color:var(--n500)">${todo.length} action${todo.length>1?'s':''} à réaliser</div>` : ''}
      </div>
      <div style="padding:0 20px">${emptyState}</div>
    </div>`;

  bd.addEventListener('click', e => { if (e.target === bd) bd.remove(); });
  device.appendChild(bd);
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.getElementById('cat-modal-sheet').style.transform = 'translateY(0)';
    });
  });
}

function openDefi(id) {
  window._ST.selectedDefi = id;
  window._ST.selectedAction = null;
  goTo(7);
}

function openDefiModal(id) {
  const device = document.querySelector('.device') || document.body;
  const d = (typeof DEFIS_DU_MOMENT !== 'undefined' ? DEFIS_DU_MOMENT : []).find(x => x.id === id);
  if (!d) return;
  const daysLeft = Math.max(0, Math.round((new Date(d.expiresAt) - new Date()) / (1000*60*60*24)));
  const done = window._ST.completedActions || [];
  const actionIds = d.actionIds || [];
  const completedCount = actionIds.filter(aid => done.includes(aid)).length;
  const allDone = completedCount === actionIds.length && actionIds.length > 0;
  const defiActions = (typeof ALL_ACTIONS !== 'undefined' ? ALL_ACTIONS : []).filter(a => actionIds.includes(a.id));

  const actionsHtml = defiActions.map(a => {
    const isDone = done.includes(a.id);
    const effortLabel = a.effort === 'low' ? 'Facile' : a.effort === 'medium' ? 'Moyen' : 'Avancé';
    return `<div onclick="${isDone ? '' : `document.getElementById('defi-modal-overlay').remove();openAction('${a.id}')`}"
         style="display:flex;align-items:center;gap:12px;padding:13px 14px;background:${isDone ? 'var(--success-bg)' : 'var(--white)'};border:1.5px solid ${isDone ? 'var(--success-light)' : 'var(--n150)'};border-radius:var(--r-md);cursor:${isDone ? 'default' : 'pointer'}">
      <div style="width:30px;height:30px;border-radius:50%;background:${isDone ? 'var(--success)' : 'var(--n100)'};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:${isDone ? '14px' : '16px'}">
        ${isDone ? '<span style="color:white">✓</span>' : (a.icon || '💧')}
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:600;color:${isDone ? 'var(--success)' : 'var(--n900)'};line-height:1.3">${a.title}</div>
        <div style="font-size:11px;color:var(--n500);margin-top:2px">${a.duration} · ${effortLabel}</div>
      </div>
      ${!isDone ? '<span style="color:var(--n300);font-size:20px;flex-shrink:0">›</span>' : ''}
    </div>`;
  }).join('');

  const el = document.createElement('div');
  el.id = 'defi-modal-overlay';
  el.style.cssText = 'position:absolute;inset:0;z-index:700;overflow-y:auto;-webkit-overflow-scrolling:touch';
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#00008F,#1a1aaa);padding:20px var(--sp5) 24px;position:relative;overflow:hidden">
      <div style="position:absolute;right:-16px;top:-16px;font-size:100px;opacity:.06">${d.icon}</div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <button onclick="document.getElementById('defi-modal-overlay').remove()"
                style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.15);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:18px;color:white">←</button>
        <div style="font-size:11px;color:rgba(255,255,255,.6)">Défi du moment</div>
      </div>
      <div style="font-size:10px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px">🔥 ${d.period}</div>
      <div style="font-size:20px;font-weight:700;color:white;line-height:1.3;margin-bottom:6px">${d.icon} ${d.title}</div>
      <div style="font-size:13px;color:rgba(255,255,255,.7);line-height:1.5;margin-bottom:16px">${d.subtitle}</div>
      <div style="display:flex;align-items:center;gap:10px;background:rgba(251,191,36,.15);border:1px solid rgba(212,160,23,.4);border-radius:var(--r-sm);padding:10px 12px;margin-bottom:12px">
        <span style="font-size:22px">${d.lotIcon}</span>
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,.5);margin-bottom:1px">Récompense</div>
          <div style="font-size:13px;font-weight:700;color:#fbbf24">${d.lot}</div>
        </div>
      </div>
      <div style="font-size:12px;color:rgba(255,255,255,.65);display:flex;align-items:center;gap:6px">
        ⏰ Plus que <strong style="color:white;margin:0 2px">${daysLeft} jour${daysLeft > 1 ? 's' : ''}</strong> pour relever ce défi
      </div>
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:16px">

      <div style="background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);padding:14px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">
          <div style="font-size:12px;font-weight:700;color:var(--n700)">Votre progression</div>
          <div style="font-size:12px;font-weight:700;color:var(--axa)">${completedCount} / ${actionIds.length} actions</div>
        </div>
        <div style="height:6px;background:var(--n100);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${Math.round(completedCount / Math.max(actionIds.length, 1) * 100)}%;background:var(--axa);border-radius:99px"></div>
        </div>
      </div>

      <div>
        <div style="font-size:11px;font-weight:700;color:var(--n600);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">${actionIds.length} actions pour compléter ce défi</div>
        <div style="display:flex;flex-direction:column;gap:8px">${actionsHtml}</div>
      </div>

      ${d.proof ? `
      <div style="background:var(--n50);border:1px dashed var(--n300);border-radius:var(--r-md);padding:14px">
        <div style="font-size:12px;font-weight:700;color:var(--n700);margin-bottom:4px">Justificatif requis</div>
        <div style="font-size:12px;color:var(--n500);margin-bottom:10px">${d.proof}</div>
        <button onclick="showToast('Upload disponible bientôt','info')"
                style="padding:9px 16px;background:var(--n700);color:white;border:none;border-radius:var(--r-sm);font-size:12px;font-weight:600;font-family:var(--font);cursor:pointer">
          📎 Ajouter la preuve
        </button>
      </div>` : ''}

      ${allDone
        ? `<div style="background:var(--success-bg);border:1.5px solid var(--success-light);border-radius:var(--r-md);padding:18px;text-align:center">
             <div style="font-size:28px;margin-bottom:8px">🏆</div>
             <div style="font-size:15px;font-weight:700;color:var(--success)">Défi complété !</div>
             <div style="font-size:12px;color:var(--n600);margin-top:4px">Toutes les actions ont été réalisées</div>
           </div>`
        : `<button onclick="document.getElementById('defi-modal-overlay').remove();openAction('${defiActions.find(a => !done.includes(a.id))?.id || defiActions[0]?.id}')"
                  style="width:100%;padding:14px;background:linear-gradient(135deg,#00008F,#1a1aaa);color:white;border:none;border-radius:var(--r-md);font-size:14px;font-weight:700;font-family:var(--font);cursor:pointer">
             Commencer — ${d.icon} ${d.title}
           </button>`}

      <div style="height:12px"></div>
    </div>`;
  device.appendChild(el);
}

function screenActions() {
  window._ST.hubTab = 'actions';
  setTimeout(() => goTo(1), 0);
  return `<div style="padding:24px;text-align:center;color:var(--n500);font-size:13px">Redirection vers Mes Actions…</div>`;
}

/* ════════════════════════════════════════════
   S7 — V3-07 DÉTAIL ACTION
════════════════════════════════════════════ */
function screenDetailAction() {
  const p    = getProfile(window._ST.profileId);
  const done = window._ST.completedActions || [];

  /* ── Mode défi du moment ── */
  const dId = window._ST.selectedDefi;
  if (dId && typeof DEFIS_DU_MOMENT !== 'undefined') {
    const d = DEFIS_DU_MOMENT.find(x => x.id === dId);
    if (d) {
      const daysLeft = Math.max(0, Math.round((new Date(d.expiresAt)-new Date())/(1000*60*60*24)));
      const stepsHtml = (d.steps||[]).map((s,i) =>
        `<div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;${i<d.steps.length-1?'border-bottom:1px solid var(--n100)':''}">
          <div style="width:22px;height:22px;border-radius:50%;background:#d4a017;color:white;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div>
          <div style="font-size:13px;color:var(--n700);line-height:1.5;padding-top:2px">${s}</div>
        </div>`
      ).join('');
      return `
        <div style="background:linear-gradient(135deg,#00008F,#1a1aaa);padding:16px var(--sp5) 22px;position:relative;overflow:hidden">
          <div style="position:absolute;right:-16px;top:-16px;font-size:80px;opacity:.08">${d.icon}</div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
            <button onclick="window._ST.hubTab='actions';goTo(1)" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
              ${sv(IC.back,'width:18px;height:18px;fill:white')}
            </button>
            <div style="font-size:11px;color:rgba(255,255,255,.6)">Défi du moment</div>
          </div>
          <div style="font-size:10px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:.8px;margin-bottom:8px">🔥 ${d.period}</div>
          <div style="font-size:18px;font-weight:700;color:white;line-height:1.3;margin-bottom:14px">${d.icon} ${d.title}</div>
          <div style="font-size:13px;color:rgba(255,255,255,.7);margin-bottom:14px">${d.subtitle}</div>
          <div style="display:flex;align-items:center;gap:8px;background:rgba(251,191,36,.15);border:1px solid rgba(212,160,23,.4);border-radius:var(--r-sm);padding:10px 12px">
            <span style="font-size:20px">${d.lotIcon}</span>
            <div>
              <div style="font-size:11px;color:rgba(255,255,255,.5);margin-bottom:1px">Récompense</div>
              <div style="font-size:13px;font-weight:700;color:#fbbf24">${d.lot}</div>
            </div>
            <div style="margin-left:auto;background:rgba(251,191,36,.2);border-radius:var(--r-sm);padding:6px 10px;font-size:22px">🏅</div>
          </div>
        </div>
        <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:14px">
          <div style="background:var(--n50);border-radius:var(--r-sm);padding:8px 12px;font-size:12px;color:var(--n600);text-align:center">
            🕐 Plus que ${daysLeft} jour${daysLeft>1?'s':''} pour relever ce défi
          </div>
          ${stepsHtml ? `
            <div style="background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);padding:14px">
              <div style="font-size:12px;font-weight:700;color:var(--n600);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Comment participer ?</div>
              ${stepsHtml}
            </div>` : ''}
          ${d.proof ? `
            <div style="background:var(--n50);border:1px dashed var(--n300);border-radius:var(--r-md);padding:14px">
              <div style="font-size:12px;font-weight:700;color:var(--n700);margin-bottom:4px">Justificatif requis</div>
              <div style="font-size:12px;color:var(--n500);margin-bottom:10px">${d.proof}</div>
              <button onclick="showToast('Upload disponible bientôt','info')" style="padding:9px 16px;background:#d4a017;color:white;border:none;border-radius:var(--r-sm);font-size:12px;font-weight:600;font-family:var(--font);cursor:pointer">📎 Ajouter la preuve</button>
            </div>` : ''}
          <button onclick="showToast('Défi relevé ! Badge 🏅 Défi relevé débloqué','success')" style="width:100%;padding:14px;background:linear-gradient(135deg,#d4a017,#fbbf24);color:#1a1a00;border:none;border-radius:var(--r-md);font-size:14px;font-weight:700;font-family:var(--font);cursor:pointer">
            Relever le défi — débloquer le badge 🏅
          </button>
        </div>
        <div style="height:24px"></div>`;
    }
  }

  /* ── Mode action standard ── */
  const aId  = window._ST.selectedAction;
  const a    = ALL_ACTIONS.find(x => x.id === aId);

  if (!a) return `<div style="padding:40px;text-align:center;color:var(--n500)">Action introuvable.</div>`;

  const isDone    = done.includes(a.id);
  const hasProof  = a.proof;
  const proofDone = (window._ST.proofUploaded||{})[a.id];
  const effortColor = a.effort==='low' ? 'var(--success)' : a.effort==='medium' ? 'var(--warn)' : 'var(--danger)';
  const effortLabel = a.effort==='low' ? 'Facile' : a.effort==='medium' ? 'Moyen' : 'Avancé';
  const risk = RISKS[a.riskId] || {};
  const backAction = "window._ST.hubTab='actions';goTo(1)";

  const stepsHtml = (a.steps||[]).map((s,i) =>
    `<div style="display:flex;align-items:flex-start;gap:10px;padding:8px 0;${i<a.steps.length-1?'border-bottom:1px solid var(--n100)':''}">
      <div style="width:22px;height:22px;border-radius:50%;background:var(--axa);color:white;font-size:11px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px">${i+1}</div>
      <div style="font-size:13px;color:var(--n700);line-height:1.5;padding-top:2px">${s}</div>
    </div>`
  ).join('');

  const tags = (a.tags||[]).map(t =>
    `<span style="font-size:11px;color:var(--n600);background:var(--n100);padding:4px 10px;border-radius:99px">${t}</span>`
  ).join('');

  const tuto = (TUTORIALS_BY_RISK[a.riskId]||[]).find(t => t.type==='video');
  const svcs = (SERVICES_BY_RISK[a.riskId]||[]).slice(0,2);

  const _ub = window._ST.unlockedBadges || [];
  const _riskBadge = (typeof BADGES !== 'undefined')
    ? BADGES.find(b => b.condition && b.condition.type === 'risk_complete' && b.condition.riskId === a.riskId)
    : null;
  const _nextCountBadge = (typeof BADGES !== 'undefined')
    ? BADGES.filter(b => b.condition && b.condition.type === 'action_count' && !_ub.includes(b.id))
            .sort((x,y) => x.condition.value - y.condition.value)[0]
    : null;
  const contributingBadge = !isDone ? (_riskBadge || _nextCountBadge) : null;

  return `
    <div style="background:${isDone?'var(--success)':'var(--axa)'};padding:16px var(--sp5) 22px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <button onclick="${backAction}" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
          ${sv(IC.back,'width:18px;height:18px;fill:white')}
        </button>
        <div style="font-size:11px;color:rgba(255,255,255,.6)">Détail de l'action</div>
        ${isDone ? `<span style="margin-left:auto;font-size:11px;font-weight:700;color:white;background:rgba(255,255,255,.2);padding:4px 10px;border-radius:99px">✓ Réalisée</span>` : ''}
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:48px;height:48px;border-radius:var(--r-md);background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">${risk.icon||'⚡'}</div>
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px">${a.riskLabel}</div>
          <div style="font-size:17px;font-weight:700;color:white;line-height:1.3">${a.title}</div>
        </div>
      </div>
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:14px">

      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <span style="font-size:12px;color:${effortColor};background:${effortColor==='var(--success)'?'var(--success-light)':effortColor==='var(--warn)'?'var(--warn-light)':'var(--danger-light)'};padding:5px 12px;border-radius:99px;font-weight:600">${effortLabel}</span>
        <span style="font-size:12px;color:var(--n600);background:var(--n100);padding:5px 12px;border-radius:99px">${a.duration}</span>
        ${tags}
      </div>

      ${contributingBadge ? `
        <div style="background:#FFFBEB;border:1px solid #FDE68A;border-radius:var(--r-sm);padding:10px 12px;display:flex;align-items:center;gap:8px">
          <span style="font-size:18px">${contributingBadge.icon}</span>
          <div>
            <div style="font-size:10px;font-weight:700;color:#92400E;text-transform:uppercase;letter-spacing:.3px">Contribue au badge</div>
            <div style="font-size:12px;font-weight:600;color:#78350F">${contributingBadge.label}</div>
          </div>
        </div>` : ''}

      <div style="background:var(--success-bg);border-left:3px solid var(--success);border-radius:0 var(--r-sm) var(--r-sm) 0;padding:10px 12px">
        <div style="font-size:11px;font-weight:700;color:var(--success);margin-bottom:3px">Bénéfice</div>
        <div style="font-size:13px;color:var(--n700);line-height:1.5">${a.benefit}</div>
      </div>

      ${stepsHtml ? `
        <div style="background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);padding:14px">
          <div style="font-size:12px;font-weight:700;color:var(--n600);text-transform:uppercase;letter-spacing:.5px;margin-bottom:10px">Étapes</div>
          ${stepsHtml}
        </div>` : ''}

      ${tuto ? `
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--n900);margin-bottom:10px">Vidéo tuto</div>
          <div style="background:var(--n900);border-radius:var(--r-md);overflow:hidden;cursor:pointer;position:relative" onclick="showToast('▶ Lecture de la vidéo (démo)','info')">
            <div style="height:140px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#1a1a2e,#16213e)">
              <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center">
                <div style="width:0;height:0;border-style:solid;border-width:10px 0 10px 18px;border-color:transparent transparent transparent white;margin-left:3px"></div>
              </div>
              <div style="position:absolute;bottom:0;left:0;right:0;padding:10px 12px;background:linear-gradient(transparent,rgba(0,0,0,.7))">
                <div style="font-size:12px;font-weight:600;color:white;line-height:1.3">${tuto.title}</div>
                <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:3px">${tuto.duration} · ${tuto.source}</div>
              </div>
            </div>
          </div>
        </div>` : ''}

      ${svcs.length ? `
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--n900);margin-bottom:10px">Services utiles</div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${svcs.map(s=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 12px;background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);cursor:pointer" onclick="showToast('${s.cta} — ${s.label} (démo)','info')">
              <div style="font-size:20px;flex-shrink:0">${s.logo}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600;color:var(--n900)">${s.label}</div>
                <div style="font-size:10px;color:var(--n500)">${s.tag}</div>
              </div>
              <span style="font-size:11px;color:var(--axa);font-weight:600;flex-shrink:0">${s.cta}</span>
            </div>`).join('')}
          </div>
        </div>` : ''}

      ${hasProof && !isDone ? `
        <div style="background:var(--n50);border:1px dashed var(--n300);border-radius:var(--r-md);padding:14px">
          <div style="font-size:12px;font-weight:700;color:var(--n700);margin-bottom:4px">Justificatif demandé</div>
          <div style="font-size:12px;color:var(--n500);margin-bottom:10px">${a.proof.label}</div>
          <button onclick="mockUploadProof('${a.id}', 7)" style="padding:9px 16px;background:${proofDone?'var(--success)':'var(--n700)'};color:white;border:none;border-radius:var(--r-sm);font-size:12px;font-weight:600;font-family:var(--font);cursor:pointer">
            ${proofDone ? '✓ Preuve ajoutée' : '📎 Ajouter la preuve'}
          </button>
        </div>` : ''}

      ${isDone
        ? `<div style="background:var(--success-bg);border:1.5px solid var(--success-light);border-radius:var(--r-md);padding:16px;text-align:center">
            <div style="font-size:28px;margin-bottom:8px">✅</div>
            <div style="font-size:15px;font-weight:700;color:var(--success)">Action réalisée !</div>
            <div style="font-size:12px;color:var(--n600);margin-top:4px">Progression badges mise à jour</div>
           </div>`
        : `<button onclick="completeAction('${a.id}')" style="width:100%;padding:14px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:15px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
            ${sv(IC.check,'width:18px;height:18px;fill:white')} Marquer comme réalisée
           </button>`
      }

      <button onclick="${backAction}" style="width:100%;padding:12px;background:var(--n100);color:var(--n700);border:none;border-radius:var(--r-md);font-size:13px;font-weight:500;font-family:var(--font);cursor:pointer">
        ← Mes Actions
      </button>
    </div>
    <div style="height:24px"></div>`;
}

/* ── Quiz de la semaine ───────────────────────────────────────────────── */
const QUIZ_CONTENT = {
  title: 'Les bons gestes anti-cambriolage',
  questions: [
    {
      q: 'À quelle heure ont lieu la majorité des cambriolages en France ?',
      options: ['La nuit (22h – 5h)', 'En journée (14h – 18h)', 'Le matin (7h – 9h)'],
      correct: 1,
      explication: '70 % des cambriolages surviennent de jour, quand les logements sont vides. Les cambrioleurs évitent la confrontation et agissent rapidement.'
    },
    {
      q: 'Quel équipement est le plus dissuasif contre les cambrioleurs ?',
      options: ["Un autocollant d'alarme seul", 'Une alarme visible avec détecteur de mouvement', 'Un verrou de sécurité basique'],
      correct: 1,
      explication: "60 % des cambrioleurs renoncent face à une alarme visible. La combinaison alarme + détecteur de mouvement est l'équipement le plus efficace pour dissuader."
    },
    {
      q: 'Combien de temps dure en moyenne un cambriolage ?',
      options: ['Moins de 5 minutes', 'Entre 15 et 30 minutes', "Plus d'une heure"],
      correct: 0,
      explication: "La majorité des cambriolages durent moins de 5 minutes. Chaque obstacle supplémentaire — serrure renforcée, volet, alarme — décourage l'intrusion."
    },
    {
      q: 'Quelle est la meilleure précaution avant de partir en vacances ?',
      options: ['Laisser une lumière allumée 24h/24', 'Demander à un voisin de relever le courrier et simuler des présences', 'Fermer tous les volets plusieurs jours avant'],
      correct: 1,
      explication: "Un courrier qui s'accumule est le signal d'absence le plus visible. Un voisin qui passe régulièrement simule l'activité du logement bien mieux qu'une lumière fixe."
    },
    {
      q: 'Par où les cambrioleurs s\'introduisent-ils le plus souvent ?',
      options: ["La porte d'entrée principale", 'Les fenêtres et portes-fenêtres de plain-pied', 'La porte de service ou de cave'],
      correct: 1,
      explication: "44 % des entrées par effraction se font par des fenêtres ou portes-fenêtres. Un volet verrouillé ou une vitrerie feuilletée change radicalement votre niveau de risque."
    }
  ]
};

function openQuizModal() {
  const device = document.querySelector('.device') || document.body;
  window._quizST = { step: 0, selected: null, score: 0 };
  const total = QUIZ_CONTENT.questions.length;
  const el = document.createElement('div');
  el.id = 'quiz-modal';
  el.style.cssText = 'position:absolute;inset:0;z-index:700;background:white;overflow-y:auto;-webkit-overflow-scrolling:touch';
  el.innerHTML = `
    <div style="background:linear-gradient(135deg,#6b21a8,#7c3aed);padding:20px var(--sp5) 22px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <button onclick="document.getElementById('quiz-modal').remove()"
                style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;font-size:18px;color:white">←</button>
        <div>
          <div style="font-size:10px;color:rgba(255,255,255,.6);text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px">Quiz · 5 questions · 2 min</div>
          <div style="font-size:17px;font-weight:700;color:white">${QUIZ_CONTENT.title}</div>
        </div>
      </div>
      <div style="height:4px;background:rgba(255,255,255,.2);border-radius:99px;overflow:hidden">
        <div id="quiz-progress-bar" style="height:100%;width:0%;background:#fbbf24;border-radius:99px;transition:width .35s"></div>
      </div>
      <div id="quiz-progress-label" style="font-size:10px;color:rgba(255,255,255,.5);margin-top:6px">Question 1 sur ${total}</div>
    </div>
    <div id="quiz-step-content" style="padding:20px var(--sp5) 32px"></div>`;
  device.appendChild(el);
  renderQuizStep();
}

function renderQuizStep() {
  const st = window._quizST;
  const quiz = QUIZ_CONTENT;
  const total = quiz.questions.length;
  const container = document.getElementById('quiz-step-content');
  const progressBar = document.getElementById('quiz-progress-bar');
  const progressLabel = document.getElementById('quiz-progress-label');
  if (!container) return;

  if (st.step >= total) {
    if (progressBar) progressBar.style.width = '100%';
    if (progressLabel) progressLabel.textContent = 'Terminé !';
    const msg = st.score === total ? 'Expert !' : st.score >= 3 ? 'Très bien !' : 'Bonne initiative !';
    const emoji = st.score === total ? '🏆' : st.score >= 3 ? '🎯' : '📚';
    container.innerHTML = `
      <div style="text-align:center;padding:16px 0 24px">
        <div style="font-size:52px;margin-bottom:12px">${emoji}</div>
        <div style="font-size:24px;font-weight:800;color:#111118;margin-bottom:4px">${st.score}/${total}</div>
        <div style="font-size:15px;font-weight:700;color:#6b21a8;margin-bottom:10px">${msg}</div>
        <div style="font-size:12px;color:var(--n500);line-height:1.65;margin-bottom:24px">En appliquant ces conseils, vous réduisez significativement le risque de cambriolage dans votre logement.</div>
        <div style="background:#F5F3FF;border:1.5px solid #DDD6FE;border-radius:var(--r-md);padding:14px;margin-bottom:20px;text-align:left">
          <div style="font-size:11px;font-weight:700;color:#6b21a8;margin-bottom:4px">🔐 Passez à l'action</div>
          <div style="font-size:12px;color:var(--n700);line-height:1.5">Retrouvez les actions concrètes de sécurisation dans votre plan de prévention personnalisé.</div>
        </div>
        <button onclick="document.getElementById('quiz-modal').remove();window._ST.hubTab='actions';goTo(1)"
                style="width:100%;padding:13px;background:linear-gradient(135deg,#6b21a8,#7c3aed);color:white;border:none;border-radius:var(--r-md);font-size:14px;font-weight:700;font-family:var(--font);cursor:pointer">
          Retour à mes actions
        </button>
      </div>`;
    return;
  }

  if (progressBar) progressBar.style.width = Math.round(st.step / total * 100) + '%';
  if (progressLabel) progressLabel.textContent = `Question ${st.step + 1} sur ${total}`;

  const q = quiz.questions[st.step];
  const answered = st.selected !== null;

  const optionsHtml = q.options.map((opt, i) => {
    let bg = 'var(--white)', border = 'var(--n200)', color = 'var(--n800)', prefix = '';
    if (answered) {
      if (i === q.correct)        { bg = '#F0FDF4'; border = '#86EFAC'; color = '#166534'; prefix = '✓ '; }
      else if (i === st.selected) { bg = '#FEF2F2'; border = '#FECACA'; color = '#991B1B'; prefix = '✗ '; }
      else                        { bg = 'var(--n50)'; border = 'var(--n150)'; color = 'var(--n400)'; }
    }
    return `<button onclick="${answered ? '' : `selectQuizAnswer(${i})`}"
       style="width:100%;padding:13px 14px;background:${bg};border:1.5px solid ${border};color:${color};border-radius:var(--r-md);text-align:left;font-size:13px;font-weight:500;font-family:var(--font);cursor:${answered ? 'default' : 'pointer'};line-height:1.4;display:block;margin-bottom:8px">
      ${prefix}${opt}
    </button>`;
  }).join('');

  const explanationHtml = answered ? `
    <div style="background:${st.selected === q.correct ? '#F0FDF4' : '#FFFBEB'};border-left:3px solid ${st.selected === q.correct ? '#22C55E' : '#F59E0B'};border-radius:0 var(--r-sm) var(--r-sm) 0;padding:12px 14px;margin-bottom:16px">
      <div style="font-size:11px;font-weight:700;color:${st.selected === q.correct ? '#166534' : '#92400E'};margin-bottom:5px">${st.selected === q.correct ? '✓ Bonne réponse !' : '💡 Le saviez-vous ?'}</div>
      <div style="font-size:12px;color:var(--n700);line-height:1.6">${q.explication}</div>
    </div>
    <button onclick="nextQuizStep()"
            style="width:100%;padding:13px;background:linear-gradient(135deg,#6b21a8,#7c3aed);color:white;border:none;border-radius:var(--r-md);font-size:14px;font-weight:700;font-family:var(--font);cursor:pointer">
      ${st.step < total - 1 ? 'Question suivante →' : 'Voir mon score →'}
    </button>` : '';

  container.innerHTML = `
    <div style="font-size:16px;font-weight:700;color:#111118;line-height:1.45;margin-bottom:20px">${q.q}</div>
    ${optionsHtml}
    ${explanationHtml}`;
}

function selectQuizAnswer(idx) {
  if (window._quizST.selected !== null) return;
  const q = QUIZ_CONTENT.questions[window._quizST.step];
  window._quizST.selected = idx;
  if (idx === q.correct) window._quizST.score++;
  renderQuizStep();
}

function nextQuizStep() {
  window._quizST.step++;
  window._quizST.selected = null;
  renderQuizStep();
}

/* ── Modal : tous les badges ──────────────────────────────────────────── */
function openBadgesModal() {
  const device      = document.querySelector('.device') || document.body;
  const unlockedIds = window._ST.unlockedBadges || [];
  const allBadges   = typeof BADGES !== 'undefined' ? BADGES : [];
  const tierColors  = { bronze: '#C47A27', silver: '#6B7280', gold: '#D97706' };
  const tierBg      = { bronze: '#FDF3E3', silver: '#F3F4F6', gold: '#FFFBEB' };
  const tierLabel   = { bronze: 'Bronze', silver: 'Argent', gold: 'Or' };

  function cardHtml(badge) {
    const unlocked = unlockedIds.includes(badge.id);
    const color = tierColors[badge.tier] || '#6B7280';
    const bg    = tierBg[badge.tier]    || '#F3F4F6';
    const lbl   = tierLabel[badge.tier] || '';
    if (unlocked) {
      return `<div style="background:${bg};border:1.5px solid ${color};border-radius:12px;padding:14px 10px;text-align:center;position:relative">
        <div style="position:absolute;top:6px;right:6px;font-size:9px;font-weight:700;color:${color};background:white;border:1px solid ${color};border-radius:99px;padding:1px 5px">${lbl}</div>
        <div style="font-size:30px;margin-bottom:6px">${badge.icon}</div>
        <div style="font-size:11px;font-weight:700;color:#111118;line-height:1.3">${badge.label}</div>
        <div style="font-size:10px;color:var(--n500);line-height:1.3;margin-top:3px">${badge.desc}</div>
        <div style="margin-top:7px;font-size:10px;color:${color};font-weight:700">✓ Débloqué</div>
      </div>`;
    }
    return `<div style="background:#F9FAFB;border:1.5px solid #E5E7EB;border-radius:12px;padding:14px 10px;text-align:center">
      <div style="font-size:30px;margin-bottom:6px;opacity:.18">${badge.icon}</div>
      <div style="font-size:11px;font-weight:600;color:#9CA3AF;line-height:1.3">${badge.label}</div>
      <div style="margin-top:7px;font-size:10px;color:#9CA3AF">🔒 À débloquer</div>
    </div>`;
  }

  const el = document.createElement('div');
  el.id = 'badges-all-modal';
  el.style.cssText = 'position:absolute;inset:0;z-index:700;background:white;overflow-y:auto;-webkit-overflow-scrolling:touch';
  el.innerHTML = `
    <div style="position:sticky;top:0;background:white;border-bottom:1px solid #F3F4F6;padding:16px 20px 14px;display:flex;align-items:center;gap:12px;z-index:1">
      <button onclick="document.getElementById('badges-all-modal').remove()"
              style="width:34px;height:34px;border-radius:50%;background:#F3F4F6;border:none;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">←</button>
      <div>
        <div style="font-size:16px;font-weight:700;color:#111118">Tous mes badges</div>
        <div style="font-size:11px;color:#6B7280">${unlockedIds.length} débloqué${unlockedIds.length !== 1 ? 's' : ''} sur ${allBadges.length}</div>
      </div>
    </div>
    <div style="padding:16px 20px 32px;display:grid;grid-template-columns:1fr 1fr;gap:10px">
      ${allBadges.map(cardHtml).join('')}
    </div>`;
  device.appendChild(el);
}

/* ── S8 — Récompenses ─────────────────────────────────────────────────── */
function screenRewards() {
  const st = window._ST;
  const profile = getProfile(st.profileId);
  const unlockedBadgeIds = st.unlockedBadges || [];
  const activatedRewards = st.activatedRewards || [];
  const rewards = getRewardsForProfile(profile, unlockedBadgeIds);
  const badgeCount  = unlockedBadgeIds.length;
  const actionCount = (st.completedActions || []).length;

  const readyList     = rewards.filter(r => r.badgeUnlocked && !activatedRewards.includes(r.id));
  const activatedList = rewards.filter(r => activatedRewards.includes(r.id));
  const lockedList    = rewards.filter(r => !r.badgeUnlocked);

  function badgeCarouselItem(badge) {
    const isUnlocked  = unlockedBadgeIds.includes(badge.id);
    const tierColors  = { bronze: '#C47A27', silver: '#6B7280', gold: '#D97706' };
    const tierBg      = { bronze: '#FEF3C7', silver: '#F3F4F6', gold: '#FEF9C3' };
    const color    = isUnlocked ? (tierColors[badge.tier] || '#6B7280') : '#D1D5DB';
    const circleBg = isUnlocked ? (tierBg[badge.tier]    || '#F3F4F6') : '#F3F4F6';
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:6px;flex-shrink:0;width:78px">
      <div style="width:62px;height:62px;border-radius:50%;background:${circleBg};border:2px solid ${color};display:flex;align-items:center;justify-content:center;position:relative">
        <span style="font-size:27px;${isUnlocked ? '' : 'filter:grayscale(1);opacity:.25'}">${badge.icon}</span>
        ${isUnlocked ? `<div style="position:absolute;bottom:-2px;right:-2px;width:18px;height:18px;border-radius:50%;background:${color};border:2px solid white;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:white">✓</div>` : ''}
      </div>
      <div style="font-size:9.5px;font-weight:${isUnlocked ? '700' : '500'};color:${isUnlocked ? '#111118' : '#9CA3AF'};text-align:center;line-height:1.3;width:78px">${badge.label}</div>
    </div>`;
  }

  function rewardCard(r, state) {
    const isActivated = state === 'activated';
    const isReady     = state === 'ready';
    const badge       = r.requiredBadge;

    return `<div style="background:var(--white);border:1.5px solid ${isActivated?'var(--success-light)':isReady?'#FCD34D':'var(--n150)'};border-radius:var(--r-md);padding:14px;${state==='locked'?'opacity:.72':''}">
      <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:10px">
        <div style="flex:1;min-width:0">
          <div style="font-size:10px;font-weight:700;color:${r.partnerColor};text-transform:uppercase;letter-spacing:.5px;margin-bottom:2px">${r.partner}</div>
          <div style="font-size:14px;font-weight:700;color:var(--n900);line-height:1.3">${r.title}</div>
        </div>
        ${isActivated ? `<span style="font-size:10px;font-weight:700;color:var(--success);background:var(--success-light);padding:3px 9px;border-radius:99px;white-space:nowrap;flex-shrink:0">✓ Activé</span>` : ''}
        ${isReady ? `<span style="font-size:10px;font-weight:700;color:#92400E;background:#FEF3C7;padding:3px 9px;border-radius:99px;white-space:nowrap;flex-shrink:0">🏅 Prêt !</span>` : ''}
        ${state==='locked' ? `<span style="font-size:10px;color:var(--n400);background:var(--n100);padding:3px 9px;border-radius:99px;white-space:nowrap;flex-shrink:0">🔒 Verrouillé</span>` : ''}
      </div>
      <div style="background:${isActivated?'var(--success-bg)':isReady?'#FFFBEB':'var(--n50)'};border-radius:var(--r-sm);padding:9px 12px;margin-bottom:10px">
        <div style="font-size:13px;font-weight:700;color:${isActivated?'var(--success)':isReady?'#B45309':'var(--n400)'}">${r.offer}</div>
        ${isActivated && r.code ? `<div style="font-size:11px;color:var(--n600);margin-top:4px">Code : <strong style="font-family:monospace;background:var(--n100);padding:2px 6px;border-radius:4px;font-size:12px;letter-spacing:.5px">${r.code}</strong></div>` : ''}
        ${isActivated && !r.code ? `<div style="font-size:11px;color:var(--n600);margin-top:4px">Votre conseiller AXA vous contactera sous 48h.</div>` : ''}
      </div>
      ${badge ? `<div style="display:flex;align-items:center;gap:6px;margin-bottom:${isReady?'10px':'0'}">
        <span style="font-size:15px">${badge.icon}</span>
        <span style="font-size:11px;color:var(--n600)">Badge requis : <strong>${badge.label}</strong></span>
        ${isActivated||isReady ? `<span style="font-size:11px;color:var(--success);font-weight:700">✓</span>` : ''}
      </div>` : ''}
      ${isReady ? `<button onclick="activateReward('${r.id}')" style="width:100%;padding:10px;background:linear-gradient(135deg,#D97706,#fbbf24);color:#1a1a00;border:none;border-radius:var(--r-sm);font-size:13px;font-weight:700;font-family:var(--font);cursor:pointer">
        Activer mon avantage${r.code ? ' & obtenir mon code' : ''}
      </button>` : ''}
    </div>`;
  }

  return `<div class="screen-header" style="background:linear-gradient(135deg,var(--axa) 0%,#1a1466 100%);padding:18px var(--sp5) 20px;color:white">
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
      <button onclick="window._ST.hubTab='actions';goTo(1)" aria-label="Retour" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.15);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
        ${sv(IC.back,'width:18px;height:18px;fill:white')}
      </button>
      <div>
        <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;opacity:.7">Avantages Partenaires</div>
        <div style="font-size:20px;font-weight:700">Mes Récompenses</div>
      </div>
    </div>
    <div style="display:flex;align-items:center;gap:10px;background:rgba(255,255,255,.12);border-radius:var(--r-sm);padding:10px 12px">
      <div style="font-size:24px">🏅</div>
      <div style="flex:1">
        <div style="font-size:13px;font-weight:700;color:white">${badgeCount} badge${badgeCount!==1?'s':''} débloqué${badgeCount!==1?'s':''}</div>
        <div style="font-size:11px;color:rgba(255,255,255,.65)">${actionCount} action${actionCount!==1?'s':''} réalisée${actionCount!==1?'s':''} · ${profile.firstName}</div>
      </div>
      ${readyList.length > 0 ? `<span style="background:#fbbf24;color:#1a1a00;border-radius:99px;padding:4px 10px;font-size:11px;font-weight:700;flex-shrink:0">${readyList.length} à activer</span>` : ''}
    </div>
  </div>

  <div style="padding:16px var(--sp5);display:flex;flex-direction:column;gap:16px">

    <!-- Badge carousel -->
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--n900)">🏅 Mes Badges</div>
          <div style="font-size:11px;color:var(--n500);margin-top:1px">${unlockedBadgeIds.length} débloqué${unlockedBadgeIds.length !== 1 ? 's' : ''} sur ${typeof BADGES !== 'undefined' ? BADGES.length : 0}</div>
        </div>
        <button onclick="openBadgesModal()" style="font-size:12px;font-weight:600;color:var(--axa);background:none;border:none;cursor:pointer;font-family:var(--font);padding:4px 0;white-space:nowrap">Voir tout →</button>
      </div>
      <div style="display:flex;gap:14px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding-bottom:6px;scrollbar-width:none;-ms-overflow-style:none">
        ${(typeof BADGES !== 'undefined' ? BADGES : []).map(badgeCarouselItem).join('')}
      </div>
    </div>

    ${readyList.length > 0 ? `
      <div>
        <div style="font-size:11px;font-weight:700;color:#D97706;text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">🏅 Prêt à activer (${readyList.length})</div>
        <div style="display:flex;flex-direction:column;gap:8px">${readyList.map(r=>rewardCard(r,'ready')).join('')}</div>
      </div>` : ''}

    ${activatedList.length > 0 ? `
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--success);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">✓ Activés (${activatedList.length})</div>
        <div style="display:flex;flex-direction:column;gap:8px">${activatedList.map(r=>rewardCard(r,'activated')).join('')}</div>
      </div>` : ''}

    ${lockedList.length > 0 ? `
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--n500);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">À débloquer (${lockedList.length})</div>
        <div style="display:flex;flex-direction:column;gap:8px">${lockedList.map(r=>rewardCard(r,'locked')).join('')}</div>
      </div>` : ''}

    ${readyList.length === 0 && activatedList.length === 0 ? `
      <div style="background:var(--n50);border:1.5px dashed var(--n200);border-radius:var(--r-md);padding:28px 20px;text-align:center">
        <div style="font-size:36px;margin-bottom:10px">🏅</div>
        <div style="font-size:15px;font-weight:700;color:var(--n700);margin-bottom:6px">Complétez des actions pour débloquer vos avantages</div>
        <p style="font-size:12px;color:var(--n500);line-height:1.5;margin-bottom:16px">Chaque badge débloqué vous donne accès à un avantage partenaire exclusif : remises Leroy Merlin, alarme Verisure, détecteur Netatmo…</p>
        <button onclick="window._ST.hubTab='actions';goTo(1)" style="padding:10px 20px;background:var(--axa);color:white;border:none;border-radius:var(--r-sm);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer">Voir mes actions</button>
      </div>` : ''}

    <div style="height:12px"></div>
  </div>`;
}

/* ── S9 — Historique & Activité ───────────────────────────────────────── */
function screenHistorique() {
  const st = window._ST;
  const profile = getProfile(st.profileId);
  const completedIds = st.completedActions;
  const pts = st.points;

  const doneActions = ALL_ACTIONS.filter(a => completedIds.includes(a.id));
  const levels = getRiskLevels(profile, st.diagAnswers);

  const riskIds = Object.keys(RISKS);
  const risksWithLevels = riskIds.map(riskId => {
    const risk = RISKS[riskId];
    const lvl  = (levels[riskId] && levels[riskId].levelInfo) || getRiskLevelInfo('modere');
    return { riskId, risk, lvl };
  }).sort((a,b) => b.lvl.step - a.lvl.step);

  const diagDate   = st.diagCompleted ? 'Aujourd\'hui' : null;
  const startScore = profile.preparationScore || 40;

  function actionRow(a, idx) {
    const risk = RISKS[a.riskId];
    const riskLabel = risk ? risk.label : '';
    const days = idx * 2;
    const dateStr = days === 0 ? 'Aujourd\'hui' : days <= 2 ? 'Hier' : `Il y a ${days} jours`;
    return `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--n100)">
      <div style="width:32px;height:32px;background:var(--success-bg);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${a.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:600;color:var(--n800);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.title}</div>
        <div style="font-size:11px;color:var(--n400)">${riskLabel} · ${dateStr}</div>
      </div>
      <span style="font-size:11px;font-weight:700;color:var(--axa);background:var(--axa-xlight);padding:3px 8px;border-radius:99px;flex-shrink:0">+${a.pts} pts</span>
    </div>`;
  }

  const actionsHtml = doneActions.length > 0
    ? doneActions.map((a, i) => actionRow(a, i)).join('')
    : `<div style="padding:24px;text-align:center;color:var(--n400);font-size:13px">Aucune action réalisée pour l'instant</div>`;

  return `<div class="screen-header" style="background:var(--white);border-bottom:1px solid var(--n150);padding:20px var(--sp5) 16px">
    <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;color:var(--n400);margin-bottom:4px">Mon Bilan</div>
    <div style="font-size:20px;font-weight:700;color:var(--n800)">Historique & Activité</div>
    <div style="font-size:12px;color:var(--n500);margin-top:2px">${profile.firstName} · ${profile.location}</div>
  </div>

  <div style="padding:16px var(--sp5);display:flex;flex-direction:column;gap:16px">

    <!-- KPI row -->
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
      <div style="background:var(--axa-xlight);border-radius:var(--r-md);padding:12px 8px;text-align:center">
        <div style="font-size:22px;font-weight:800;color:var(--axa)">${pts}</div>
        <div style="font-size:10px;color:var(--n500);margin-top:1px">pts</div>
      </div>
      <div style="background:var(--success-bg);border-radius:var(--r-md);padding:12px 8px;text-align:center">
        <div style="font-size:22px;font-weight:800;color:var(--success)">${doneActions.length}</div>
        <div style="font-size:10px;color:var(--n500);margin-top:1px">action${doneActions.length!==1?'s':''}</div>
      </div>
      <div style="background:var(--n100);border-radius:var(--r-md);padding:12px 8px;text-align:center">
        <div style="font-size:22px;font-weight:800;color:var(--n700)">${diagDate ? '1' : '0'}</div>
        <div style="font-size:10px;color:var(--n500);margin-top:1px">diag.</div>
      </div>
    </div>

    <!-- Risk summary -->
    <div style="background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);padding:14px">
      <div style="font-size:12px;font-weight:700;color:var(--n700);margin-bottom:10px">Niveaux de risque actuels</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${risksWithLevels.map(({riskId, risk, lvl}) => `
          <div style="display:flex;align-items:center;gap:8px">
            <span style="font-size:11px;color:var(--n700);width:80px;flex-shrink:0">${risk.label}</span>
            <div style="flex:1;height:6px;background:var(--n100);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${Math.round(lvl.step/5*100)}%;background:${lvl.hex};border-radius:99px"></div>
            </div>
            <span style="font-size:10px;font-weight:700;color:${lvl.hex};width:60px;flex-shrink:0;text-align:right">${lvl.label}</span>
          </div>`).join('')}
      </div>
    </div>

    <!-- Action history -->
    <div style="background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);padding:14px">
      <div style="font-size:12px;font-weight:700;color:var(--n700);margin-bottom:4px">Actions réalisées</div>
      ${actionsHtml}
    </div>

    <!-- Export -->
    <div style="display:flex;flex-direction:column;gap:8px">
      <button onclick="generateBilan()" style="width:100%;padding:13px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:14px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
        ${sv(IC.download,'width:16px;height:16px;fill:white')} Télécharger mon bilan PDF
      </button>
      <button onclick="mockSendBilan()" style="width:100%;padding:13px;background:var(--n100);color:var(--n700);border:none;border-radius:var(--r-md);font-size:13px;font-weight:500;font-family:var(--font);cursor:pointer">
        Envoyer par e-mail
      </button>
    </div>

    <div style="height:16px"></div>
  </div>`;
}

/* ── SCREENS registry ─────────────────────────────────────────────────── */
const SCREENS = {
  s0: screenSelection,
  s1: screenHub,
  s2: screenDiagnostic,
  s3: screenRisques,
  s4: screenDeepDive,
  s5: screenPlan,
  s6: screenActions,
  s7: screenDetailAction,
  s8: screenRewards,
  s9: screenHistorique
};
