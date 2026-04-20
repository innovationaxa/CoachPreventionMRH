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
  const p        = getProfile(window._ST.profileId);
  const diagDone = window._ST.diagCompleted;
  const tab      = (window._ST.hubTab === 'actions' && diagDone) ? 'actions' : 'risques';
  const pts      = window._ST.points || 0;
  const done     = window._ST.completedActions || [];
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
          ${pts > 0 ? `<span style="position:absolute;top:-3px;right:-3px;background:var(--success-mid);color:white;border-radius:99px;padding:1px 5px;font-size:10px;font-weight:700;font-family:var(--font);min-width:16px;text-align:center;line-height:1.4">${pts}</span>` : ''}
        </button>
      </div>

      <div style="position:relative;margin-bottom:10px">
        <div style="font-size:11px;color:rgba(255,255,255,.55);display:flex;align-items:center;gap:4px">
          ${sv(IC.pin,'width:10px;height:10px;fill:rgba(255,255,255,.55)')}${p.location} · ${p.propertyType}
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,.35);margin-top:2px">${p.contract.name} · ${p.contract.ref}</div>
      </div>

      <div style="position:relative">
        <div style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,.11);border-radius:99px;padding:4px 11px">
          ${diagDone
            ? `${sv(IC.check,'width:11px;height:11px;fill:var(--success-mid)')}<span style="font-size:11px;color:rgba(255,255,255,.85);font-weight:600">Diagnostic complété · Vue personnalisée</span>`
            : `${sv(IC.info,'width:11px;height:11px;fill:rgba(255,255,255,.55)')}<span style="font-size:11px;color:rgba(255,255,255,.7)">Vue de zone · Diagnostic recommandé</span>`}
        </div>
      </div>
    </div>`;

  /* ── TABS (pills séparées) ── */
  const tabs = `
    <div style="padding:12px var(--sp5) 0">
      <div style="display:flex;background:var(--n100);border-radius:99px;padding:4px">
        <button onclick="switchHubTab('risques')" style="flex:1;padding:9px 14px;background:${tab==='risques'?'var(--white)':'transparent'};color:${tab==='risques'?'var(--axa)':'var(--n500)'};border:none;border-radius:99px;font-size:12px;font-weight:700;font-family:var(--font);cursor:pointer;box-shadow:${tab==='risques'?'0 1px 3px rgba(0,0,0,.08)':'none'};transition:all .2s">
          Mes risques
        </button>
        <button onclick="switchHubTab('actions')" style="flex:1;padding:9px 14px;background:${tab==='actions'?'var(--white)':'transparent'};color:${tab==='actions'?'var(--axa)':diagDone?'var(--n500)':'var(--n400)'};border:none;border-radius:99px;font-size:12px;font-weight:700;font-family:var(--font);cursor:${diagDone?'pointer':'not-allowed'};box-shadow:${tab==='actions'?'0 1px 3px rgba(0,0,0,.08)':'none'};display:flex;align-items:center;justify-content:center;gap:5px;transition:all .2s">
          Actions & Défis
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
  const now   = todo.filter(a => a.horizon === 'now');
  const month = todo.filter(a => a.horizon === 'this_month');
  const pts   = window._ST.points || 0;
  const ptsDispo = todo.reduce((s, a) => s + a.pts, 0);

  function actionRow(a) {
    const effortLabel = a.effort==='low' ? 'Facile' : a.effort==='medium' ? 'Moyen' : 'Avancé';
    return `
      <div onclick="openAction('${a.id}')" style="background:var(--white);border:1.5px solid var(--n150);border-radius:var(--r-md);padding:12px 14px;cursor:pointer;display:flex;align-items:center;gap:10px">
        <div style="width:34px;height:34px;border-radius:var(--r-sm);background:var(--axa-xlight);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${RISKS[a.riskId]?.icon||'⚡'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700;color:var(--n900);line-height:1.3">${a.title}</div>
          <div style="font-size:11px;color:var(--n500);margin-top:2px">${a.riskLabel} · ${effortLabel} · ${a.duration}</div>
        </div>
        <div style="flex-shrink:0;text-align:right">
          <div style="font-size:13px;font-weight:700;color:var(--axa)">+${a.pts}</div>
          <div style="font-size:10px;color:var(--n400)">pts</div>
        </div>
      </div>`;
  }

  return `
    <div style="padding:14px var(--sp5) 8px;display:flex;flex-direction:column;gap:16px">

      <div style="background:linear-gradient(135deg,var(--axa) 0%,#1a1466 100%);border-radius:var(--r-md);padding:14px 16px;color:white">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div>
            <div style="font-size:11px;opacity:.7">Points cumulés</div>
            <div style="font-size:22px;font-weight:800">${pts} pts</div>
          </div>
          <button onclick="goTo(8)" style="padding:7px 12px;background:rgba(255,255,255,.18);color:white;border:none;border-radius:99px;font-size:11px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;gap:5px">
            ${sv(IC.gift,'width:12px;height:12px;fill:white')} Récompenses
          </button>
        </div>
        <div style="height:5px;background:rgba(255,255,255,.15);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${Math.min(100, Math.round((doneA.length/Math.max(1, allA.length))*100))}%;background:var(--success-mid);border-radius:99px"></div>
        </div>
        <div style="font-size:10.5px;opacity:.7;margin-top:5px">${doneA.length} / ${allA.length} actions · ${ptsDispo} pts à gagner</div>
      </div>

      ${now.length ? `
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div style="width:8px;height:8px;border-radius:50%;background:var(--danger)"></div>
            <div style="font-size:13px;font-weight:700;color:var(--n900)">À faire maintenant</div>
            <span style="margin-left:auto;font-size:11px;color:var(--n400)">${now.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">${now.map(actionRow).join('')}</div>
        </div>` : ''}

      ${month.length ? `
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div style="width:8px;height:8px;border-radius:50%;background:var(--info-mid)"></div>
            <div style="font-size:13px;font-weight:700;color:var(--n900)">Ce mois-ci</div>
            <span style="margin-left:auto;font-size:11px;color:var(--n400)">${month.length}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">${month.map(actionRow).join('')}</div>
        </div>` : ''}

      ${!todo.length ? `
        <div style="text-align:center;padding:28px 16px;background:var(--success-bg);border-radius:var(--r-md)">
          <div style="font-size:36px;margin-bottom:10px">🏆</div>
          <div style="font-size:15px;font-weight:700;color:var(--success);margin-bottom:4px">Toutes les actions réalisées !</div>
          <div style="font-size:12px;color:var(--n500)">Consultez vos récompenses.</div>
        </div>` : ''}

      ${doneA.length > 0 ? `
        <div>
          <div style="font-size:11px;font-weight:700;color:var(--n500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Déjà réalisées (${doneA.length})</div>
          <div style="display:flex;flex-direction:column;gap:6px">
            ${doneA.map(a => `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--success-bg);border:1px solid var(--success-light);border-radius:var(--r-md);opacity:.85">
                <div style="width:20px;height:20px;border-radius:50%;background:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">${sv(IC.check,'width:11px;height:11px;fill:white')}</div>
                <div style="flex:1;font-size:12px;font-weight:600;color:var(--success)">${a.title}</div>
                <span style="font-size:11px;font-weight:700;color:var(--success)">+${a.pts} pts</span>
              </div>`).join('')}
          </div>
        </div>` : ''}
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
        <button onclick="goTo(5)" style="flex:2;padding:13px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:14px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
          ${sv(IC.bolt,'width:15px;height:15px;fill:white')} Mon plan d'action
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

      <button onclick="window._ST.hubTab='actions';goTo(1)" style="width:100%;padding:13px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
        ${sv(IC.bolt,'width:15px;height:15px;fill:white')} Voir mes actions recommandées
      </button>
    </div>
    <div style="height:24px"></div>`;
}

/* ════════════════════════════════════════════
   S5 — V3-05 PLAN D'ACTION
════════════════════════════════════════════ */
function screenPlan() {
  const p     = getProfile(window._ST.profileId);
  const done  = window._ST.completedActions || [];
  const allA  = getActionsForProfile(p, window._ST.diagAnswers);
  const now   = allA.filter(a => a.horizon==='now'   && !done.includes(a.id));
  const month = allA.filter(a => a.horizon==='this_month' && !done.includes(a.id));
  const doneA = allA.filter(a => done.includes(a.id));

  function actionRow(a) {
    const effortColor = a.effort==='low'?'var(--success)':a.effort==='medium'?'var(--warn)':'var(--danger)';
    const effortLabel = a.effort==='low'?'Facile':a.effort==='medium'?'Moyen':'Avancé';
    return `
      <div onclick="openAction('${a.id}')" style="background:var(--white);border:1.5px solid var(--n150);border-radius:var(--r-md);padding:13px 14px;cursor:pointer;display:flex;align-items:flex-start;gap:10px">
        <div style="width:36px;height:36px;border-radius:var(--r-sm);background:var(--n100);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${RISKS[a.riskId]?.icon||'⚡'}</div>
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:700;color:var(--n900);line-height:1.3">${a.title}</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:5px;flex-wrap:wrap">
            <span style="font-size:11px;color:var(--n500)">${a.riskLabel}</span>
            <span style="font-size:11px;color:${effortColor};font-weight:600">${effortLabel}</span>
            <span style="font-size:11px;color:var(--n400)">${a.duration}</span>
          </div>
          <div style="font-size:11px;color:var(--n600);margin-top:4px;line-height:1.4">${a.benefit}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
          <span style="font-size:12px;font-weight:700;color:var(--axa)">${a.pts} pts</span>
          ${sv(IC.arrow,'width:14px;height:14px;fill:var(--n300)')}
        </div>
      </div>`;
  }

  function doneRow(a) {
    return `
      <div style="background:var(--success-bg);border:1px solid var(--success-light);border-radius:var(--r-sm);padding:10px 12px;display:flex;align-items:center;gap:10px">
        <div style="width:24px;height:24px;border-radius:50%;background:var(--success);display:flex;align-items:center;justify-content:center;flex-shrink:0">
          ${sv(IC.check,'width:12px;height:12px;fill:white')}
        </div>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:600;color:var(--success)">${a.title}</div>
          <div style="font-size:11px;color:var(--success);opacity:.7">+${a.pts} pts gagnés</div>
        </div>
      </div>`;
  }

  const pts = window._ST.points || 0;

  return `
    <div style="background:var(--axa);padding:16px var(--sp5) 22px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <button onclick="goTo(${window._ST.diagCompleted?3:1})" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
          ${sv(IC.back,'width:18px;height:18px;fill:white')}
        </button>
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,.55)">Prévention</div>
          <div style="font-size:17px;font-weight:700;color:white">Mon plan d'action</div>
        </div>
        <div style="margin-left:auto;text-align:right;flex-shrink:0">
          <div style="font-size:18px;font-weight:700;color:white">${pts}</div>
          <div style="font-size:10px;color:rgba(255,255,255,.55)">pts gagnés</div>
        </div>
      </div>
      <div style="display:flex;gap:10px">
        <div style="flex:1;background:rgba(255,255,255,.12);border-radius:var(--r-sm);padding:10px;text-align:center">
          <div style="font-size:16px;font-weight:700;color:white">${doneA.length}</div>
          <div style="font-size:10px;color:rgba(255,255,255,.55)">réalisée${doneA.length>1?'s':''}</div>
        </div>
        <div style="flex:1;background:rgba(255,255,255,.12);border-radius:var(--r-sm);padding:10px;text-align:center">
          <div style="font-size:16px;font-weight:700;color:white">${now.length+month.length}</div>
          <div style="font-size:10px;color:rgba(255,255,255,.55)">à faire</div>
        </div>
        <div style="flex:1;background:rgba(255,255,255,.12);border-radius:var(--r-sm);padding:10px;text-align:center">
          <div style="font-size:16px;font-weight:700;color:white">${allA.reduce((s,a)=>s+a.pts,0)}</div>
          <div style="font-size:10px;color:rgba(255,255,255,.55)">pts disponibles</div>
        </div>
      </div>
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:16px">

      ${now.length ? `
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <div style="width:8px;height:8px;border-radius:50%;background:var(--danger)"></div>
            <div style="font-size:13px;font-weight:700;color:var(--n900)">À faire maintenant</div>
            <span style="margin-left:auto;font-size:11px;color:var(--n400)">${now.length} action${now.length>1?'s':''}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">${now.slice(0,3).map(actionRow).join('')}</div>
        </div>` : ''}

      ${month.length ? `
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px">
            <div style="width:8px;height:8px;border-radius:50%;background:var(--info-mid)"></div>
            <div style="font-size:13px;font-weight:700;color:var(--n900)">Ce mois-ci</div>
            <span style="margin-left:auto;font-size:11px;color:var(--n400)">${month.length} action${month.length>1?'s':''}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">${month.slice(0,3).map(actionRow).join('')}</div>
        </div>` : ''}

      ${doneA.length ? `
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--n500);text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">Déjà réalisées ✓</div>
          <div style="display:flex;flex-direction:column;gap:6px">${doneA.slice(0,3).map(doneRow).join('')}</div>
        </div>` : ''}

      ${!now.length && !month.length ? `
        <div style="text-align:center;padding:32px 16px">
          <div style="font-size:40px;margin-bottom:12px">🎉</div>
          <div style="font-size:16px;font-weight:700;color:var(--n900);margin-bottom:6px">Plan d'action complété !</div>
          <div style="font-size:13px;color:var(--n500)">Toutes les actions ont été réalisées. Consultez vos récompenses.</div>
        </div>` : ''}

      <button onclick="goTo(6)" style="width:100%;padding:13px;background:var(--n100);color:var(--n700);border:none;border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
        ${sv(IC.bolt,'width:15px;height:15px;fill:var(--n700)')} Voir Actions & Défis
      </button>
    </div>
    <div style="height:24px"></div>`;
}

/* ════════════════════════════════════════════
   S6 — V3-06 ACTIONS & DÉFIS
════════════════════════════════════════════ */
function screenActions() {
  const p     = getProfile(window._ST.profileId);
  const done  = window._ST.completedActions || [];
  const pts   = window._ST.points || 0;
  const allA  = getActionsForProfile(p, window._ST.diagAnswers);
  const todo  = allA.filter(a => !done.includes(a.id));
  const doneA = allA.filter(a => done.includes(a.id));

  /* Defis saisonniers — tirés des actions seasonales */
  const defis = todo.filter(a => a.momentDeVie === 'seasonal').slice(0, 3);
  /* Actions autonomie */
  const autonomie = todo.filter(a => a.momentDeVie !== 'seasonal' || !defis.includes(a)).slice(0, 5);

  /* Points total disponibles */
  const ptsDisponibles = todo.reduce((s, a) => s + a.pts, 0);
  const ptsDone        = doneA.reduce((s, a) => s + a.pts, 0);
  const ptsTotal       = allA.reduce((s, a) => s + a.pts, 0);
  const pctProgress    = ptsTotal > 0 ? Math.round((ptsDone / ptsTotal) * 100) : 0;

  function actionCard(a) {
    const effortColor = a.effort==='low' ? 'var(--success)' : a.effort==='medium' ? 'var(--warn)' : 'var(--danger)';
    const effortLabel = a.effort==='low' ? 'Facile' : a.effort==='medium' ? 'Moyen' : 'Avancé';
    const tags = a.tags || [];
    return `
      <div onclick="openAction('${a.id}')" style="background:var(--white);border:1.5px solid var(--n150);border-radius:var(--r-md);padding:13px 14px;cursor:pointer">
        <div style="display:flex;align-items:flex-start;gap:10px">
          <div style="width:36px;height:36px;border-radius:var(--r-sm);background:var(--axa-xlight);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${RISKS[a.riskId]?.icon || '⚡'}</div>
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:700;color:var(--n900);line-height:1.3">${a.title}</div>
            <div style="font-size:11px;color:var(--n500);margin-top:3px">${a.riskLabel} · ${effortLabel} · ${a.duration}</div>
          </div>
          <div style="flex-shrink:0;text-align:right">
            <div style="font-size:14px;font-weight:700;color:var(--axa)">+${a.pts}</div>
            <div style="font-size:10px;color:var(--n400)">pts</div>
          </div>
        </div>
        ${tags.length ? `<div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
          ${tags.map(t=>`<span style="font-size:10px;color:var(--n500);background:var(--n100);padding:3px 8px;border-radius:99px">${t}</span>`).join('')}
        </div>` : ''}
      </div>`;
  }

  function defiCard(a) {
    return `
      <div onclick="openAction('${a.id}')" style="background:linear-gradient(135deg,var(--axa-xlight),var(--white));border:1.5px solid var(--axa-light);border-radius:var(--r-md);padding:14px;cursor:pointer;position:relative;overflow:hidden">
        <div style="position:absolute;top:-10px;right:-10px;font-size:40px;opacity:.08">${RISKS[a.riskId]?.icon || '⚡'}</div>
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
          <div style="flex:1;min-width:0">
            <div style="font-size:10px;font-weight:700;color:var(--axa);text-transform:uppercase;letter-spacing:.5px;margin-bottom:5px">Défi · ${a.riskLabel}</div>
            <div style="font-size:13px;font-weight:700;color:var(--n900);line-height:1.3">${a.title}</div>
            <div style="font-size:12px;color:var(--n600);margin-top:4px;line-height:1.4">${a.benefit}</div>
          </div>
          <div style="background:var(--axa);color:white;border-radius:var(--r-sm);padding:8px 10px;text-align:center;flex-shrink:0">
            <div style="font-size:16px;font-weight:700">+${a.pts}</div>
            <div style="font-size:9px;opacity:.8">pts</div>
          </div>
        </div>
      </div>`;
  }

  return `
    <div style="background:var(--axa);padding:18px var(--sp5) 22px;position:relative;overflow:hidden">
      <div style="position:absolute;right:-20px;top:-20px;width:100px;height:100px;border-radius:50%;background:rgba(255,255,255,.05)"></div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <button onclick="goTo(1)" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
          ${sv(IC.back,'width:18px;height:18px;fill:white')}
        </button>
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,.55)">Engagement</div>
          <div style="font-size:17px;font-weight:700;color:white">Actions & Défis</div>
        </div>
        <div style="margin-left:auto;flex-shrink:0" onclick="goTo(8)" style="cursor:pointer">
          <div style="background:rgba(255,255,255,.15);border-radius:var(--r-sm);padding:8px 12px;text-align:center;cursor:pointer" onclick="goTo(8)">
            <div style="font-size:18px;font-weight:700;color:white">${pts}</div>
            <div style="font-size:9px;color:rgba(255,255,255,.6)">pts</div>
          </div>
        </div>
      </div>

      <div style="background:rgba(255,255,255,.1);border-radius:var(--r-sm);padding:10px 12px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:11px;color:rgba(255,255,255,.7)">${ptsDone} pts gagnés</span>
          <span style="font-size:11px;color:rgba(255,255,255,.5)">${ptsDisponibles} pts disponibles</span>
        </div>
        <div style="height:6px;background:rgba(255,255,255,.15);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${pctProgress}%;background:var(--success-mid);border-radius:99px;transition:width .4s ease"></div>
        </div>
        <div style="font-size:10px;color:rgba(255,255,255,.45);margin-top:5px;text-align:center">${doneA.length} action${doneA.length>1?'s':''} réalisée${doneA.length>1?'s':''} · ${todo.length} restante${todo.length>1?'s':''}</div>
      </div>
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:16px">

      ${defis.length ? `
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
            <div style="font-size:13px;font-weight:700;color:var(--n900)">Défis en cours</div>
            <span style="font-size:11px;color:var(--axa);background:var(--axa-xlight);padding:2px 8px;border-radius:99px;font-weight:600">${defis.length} actif${defis.length>1?'s':''}</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">${defis.map(defiCard).join('')}</div>
        </div>` : ''}

      ${autonomie.length ? `
        <div>
          <div style="font-size:13px;font-weight:700;color:var(--n900);margin-bottom:10px">Actions en autonomie</div>
          <div style="display:flex;flex-direction:column;gap:8px">${autonomie.map(actionCard).join('')}</div>
        </div>` : ''}

      ${!todo.length ? `
        <div style="text-align:center;padding:32px 16px">
          <div style="font-size:40px;margin-bottom:12px">🏆</div>
          <div style="font-size:16px;font-weight:700;color:var(--n900);margin-bottom:6px">Toutes les actions réalisées !</div>
          <p style="font-size:13px;color:var(--n500)">Consultez vos récompenses disponibles.</p>
        </div>` : ''}

      <button onclick="goTo(8)" style="width:100%;padding:13px;background:var(--n100);color:var(--n700);border:none;border-radius:var(--r-md);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
        ${sv(IC.gift,'width:15px;height:15px;fill:var(--n700)')} Voir mes récompenses
        ${pts > 0 ? `<span style="background:var(--axa);color:white;border-radius:99px;padding:1px 8px;font-size:11px">${pts} pts</span>` : ''}
      </button>
    </div>
    <div style="height:24px"></div>`;
}

/* ════════════════════════════════════════════
   S7 — V3-07 DÉTAIL ACTION
════════════════════════════════════════════ */
function screenDetailAction() {
  const p    = getProfile(window._ST.profileId);
  const done = window._ST.completedActions || [];
  const aId  = window._ST.selectedAction;
  const a    = ALL_ACTIONS.find(x => x.id === aId);

  if (!a) return `<div style="padding:40px;text-align:center;color:var(--n500)">Action introuvable.</div>`;

  const isDone    = done.includes(a.id);
  const hasProof  = a.proof;
  const proofDone = (window._ST.proofUploaded||{})[a.id];
  const effortColor = a.effort==='low' ? 'var(--success)' : a.effort==='medium' ? 'var(--warn)' : 'var(--danger)';
  const effortLabel = a.effort==='low' ? 'Facile' : a.effort==='medium' ? 'Moyen' : 'Avancé';
  const risk = RISKS[a.riskId] || {};
  const fromScreen = window._ST.diagCompleted ? 5 : 6;

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

  return `
    <div style="background:${isDone?'var(--success)':'var(--axa)'};padding:16px var(--sp5) 22px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">
        <button onclick="goTo(${fromScreen})" style="width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.14);border:none;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0">
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
        <span style="font-size:12px;font-weight:700;color:var(--axa);background:var(--axa-xlight);padding:5px 12px;border-radius:99px">+${a.pts} pts</span>
        <span style="font-size:12px;color:${effortColor};background:${effortColor==='var(--success)'?'var(--success-light)':effortColor==='var(--warn)'?'var(--warn-light)':'var(--danger-light)'};padding:5px 12px;border-radius:99px;font-weight:600">${effortLabel}</span>
        <span style="font-size:12px;color:var(--n600);background:var(--n100);padding:5px 12px;border-radius:99px">${a.duration}</span>
        ${tags}
      </div>

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
            <div style="font-size:12px;color:var(--n600);margin-top:4px">+${a.pts} pts ajoutés à votre compteur</div>
           </div>`
        : `<button onclick="completeAction('${a.id}')" style="width:100%;padding:14px;background:var(--axa);color:white;border:none;border-radius:var(--r-md);font-size:15px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
            ${sv(IC.check,'width:18px;height:18px;fill:white')} Marquer comme réalisée
            <span style="background:rgba(255,255,255,.2);border-radius:99px;padding:2px 8px;font-size:12px">+${a.pts} pts</span>
           </button>`
      }

      <button onclick="goTo(${fromScreen})" style="width:100%;padding:12px;background:var(--n100);color:var(--n700);border:none;border-radius:var(--r-md);font-size:13px;font-weight:500;font-family:var(--font);cursor:pointer">
        Retour au plan
      </button>
    </div>
    <div style="height:24px"></div>`;
}

/* ── S8 — Récompenses ─────────────────────────────────────────────────── */
function screenRewards() {
  const st = window._ST;
  const profile = getProfile(st.profileId);
  const completedCount = st.completedActions.length;
  const rewards = getRewardsForProfile(profile, completedCount);
  const pts = st.points;

  const unlocked = rewards.filter(r => r.computedStatus === 'unlocked');
  const available = rewards.filter(r => r.computedStatus === 'available');
  const teaser = rewards.filter(r => r.computedStatus === 'teaser');

  function rewardCard(r) {
    const isUnlocked = r.computedStatus === 'unlocked';
    const isTeaser   = r.computedStatus === 'teaser';
    const statusLabel = isUnlocked ? '✓ Débloqué' : isTeaser ? r.teaser : `${r.minActions} action${r.minActions>1?'s':''} requise${r.minActions>1?'s':''}`;
    const statusColor = isUnlocked ? 'var(--success)' : isTeaser ? 'var(--warn)' : 'var(--n400)';
    const statusBg    = isUnlocked ? 'var(--success-bg)' : isTeaser ? 'var(--warn-light)' : 'var(--n100)';

    return `<div style="background:var(--white);border:1.5px solid ${isUnlocked?'var(--success-light)':'var(--n150)'};border-radius:var(--r-md);padding:14px;display:flex;gap:12px;align-items:flex-start;${isTeaser?'opacity:.7':''}">
      <div style="width:44px;height:44px;border-radius:var(--r-sm);background:${r.iconBg};display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">${r.icon}</div>
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:3px">
          <span style="font-size:13px;font-weight:700;color:var(--n800)">${r.title}</span>
          <span style="font-size:11px;font-weight:700;color:var(--axa);background:var(--axa-xlight);padding:2px 7px;border-radius:99px">${r.subtitle}</span>
        </div>
        <div style="font-size:11px;color:var(--n500);line-height:1.45;margin-bottom:8px">${r.desc}</div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
          <span style="font-size:11px;font-weight:600;color:${statusColor};background:${statusBg};padding:3px 9px;border-radius:99px">${statusLabel}</span>
          ${isUnlocked ? `<button onclick="tabMock('Activer : ${r.title}')" style="padding:7px 12px;background:var(--success);color:white;border:none;border-radius:var(--r-sm);font-size:11px;font-weight:600;font-family:var(--font);cursor:pointer">Activer</button>` : ''}
        </div>
        ${isUnlocked && r.disclaimer ? `<div style="font-size:10px;color:var(--n400);margin-top:5px">${r.disclaimer}</div>` : ''}
      </div>
    </div>`;
  }

  const nextTarget = available.length > 0 ? available.sort((a,b)=>a.minActions-b.minActions)[0] : null;
  const ptsToNext  = nextTarget ? Math.max(0, nextTarget.minActions - completedCount) : 0;

  return `<div class="screen-header" style="background:linear-gradient(135deg,var(--axa) 0%,#1a1466 100%);padding:24px var(--sp5) 20px;color:white">
    <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.8px;opacity:.7;margin-bottom:4px">Module Récompenses</div>
    <div style="font-size:20px;font-weight:700">Vos avantages</div>
    <div style="font-size:12px;opacity:.8;margin-top:2px">${profile.firstName} — ${completedCount} action${completedCount!==1?'s':''} réalisée${completedCount!==1?'s':''}</div>
  </div>

  <div style="padding:16px var(--sp5);display:flex;flex-direction:column;gap:16px">

    <!-- Points counter -->
    <div style="background:var(--white);border:1px solid var(--n150);border-radius:var(--r-md);padding:16px;text-align:center">
      <div style="font-size:32px;font-weight:800;color:var(--axa);line-height:1">${pts}</div>
      <div style="font-size:12px;color:var(--n500);margin-top:2px">points de prévention</div>
      ${nextTarget ? `
        <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--n100)">
          <div style="font-size:11px;color:var(--n500);margin-bottom:6px">
            Encore <strong style="color:var(--axa)">${ptsToNext} action${ptsToNext>1?'s':''}</strong> pour débloquer <em>${nextTarget.title}</em>
          </div>
          <div style="height:6px;background:var(--n100);border-radius:99px;overflow:hidden">
            <div style="height:100%;width:${Math.min(100,Math.round(completedCount/nextTarget.minActions*100))}%;background:var(--axa);border-radius:99px;transition:width .4s"></div>
          </div>
        </div>` : `<div style="margin-top:8px;font-size:11px;color:var(--success);font-weight:600">🎉 Toutes les récompenses disponibles sont débloquées !</div>`}
    </div>

    ${unlocked.length > 0 ? `
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--success);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">✓ Débloquées (${unlocked.length})</div>
        <div style="display:flex;flex-direction:column;gap:8px">${unlocked.map(rewardCard).join('')}</div>
      </div>` : ''}

    ${available.length > 0 ? `
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--n500);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">À débloquer (${available.length})</div>
        <div style="display:flex;flex-direction:column;gap:8px">${available.map(rewardCard).join('')}</div>
      </div>` : ''}

    ${teaser.length > 0 ? `
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--warn);text-transform:uppercase;letter-spacing:.6px;margin-bottom:8px">Bientôt disponible (${teaser.length})</div>
        <div style="display:flex;flex-direction:column;gap:8px">${teaser.map(rewardCard).join('')}</div>
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
