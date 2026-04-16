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
   S1 — V3-01 HUB PRÉVENTION
════════════════════════════════════════════ */
function screenHub() {
  const p       = getProfile(window._ST.profileId);
  const diagDone = window._ST.diagCompleted;
  const levels  = getRiskLevels(p, diagDone ? window._ST.diagAnswers : {});
  const mainRisks = p.mainRisks;
  const otherRisks = Object.keys(RISKS).filter(r => !mainRisks.includes(r));
  const done    = window._ST.completedActions || [];
  const pts     = window._ST.points || 0;
  const allActions = getActionsForProfile(p, window._ST.diagAnswers);
  const todoCount  = allActions.filter(a => !done.includes(a.id)).length;

  /* Risk cards — top 3 main risks */
  const riskCards = mainRisks.slice(0, 3).map(rId => {
    const r  = RISKS[rId];
    const lv = levels[rId] || {};
    const li = lv.levelInfo || getRiskLevelInfo('modere');
    const isHigh = li.step >= 4;
    return `
      <div onclick="openRisk('${rId}')" style="background:var(--white);border:1.5px solid ${isHigh?li.bg:'var(--n150)'};border-radius:var(--r-md);padding:14px;cursor:pointer;position:relative;overflow:hidden">
        ${isHigh?`<div style="position:absolute;top:0;right:0;width:4px;height:100%;background:${li.hex}"></div>`:''}
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px">
          <div style="display:flex;align-items:center;gap:10px;flex:1;min-width:0">
            <div style="width:36px;height:36px;border-radius:var(--r-sm);background:${li.bg};display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0">${r.icon}</div>
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:700;color:var(--n900)">${r.label}</div>
              <div style="margin-top:5px">${levelBar(li.id)}</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0">
            ${levelChip(li.id,'sm')}
            ${lv.improved?`<span style="font-size:10px;color:var(--success);font-weight:600;display:flex;align-items:center;gap:2px">${sv(IC.down,'width:10px;height:10px;fill:var(--success)')}Amélioré</span>`:''}
          </div>
        </div>
        ${diagDone && lv.hasDiagnosticData
          ? `<div style="margin-top:8px;padding-top:8px;border-top:1px solid var(--n100);font-size:11px;color:var(--n500)">${r.explanation}</div>`
          : ''
        }
      </div>`;
  }).join('');

  /* Secondary risks (collapsed row) */
  const secondaryRisks = [...mainRisks.slice(3), ...otherRisks.slice(0, 3)].slice(0, 3).map(rId => {
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

  /* Diagnostic CTA or post-diag summary */
  const diagBlock = diagDone
    ? `
      <div style="background:var(--success-bg);border:1.5px solid var(--success-light);border-radius:var(--r-md);padding:14px 16px">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--success-light);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${sv(IC.check,'width:16px;height:16px;fill:var(--success)')}
          </div>
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--success)">Diagnostic complété</div>
            <div style="font-size:11px;color:var(--n500);margin-top:1px">Vos niveaux de risque ont été mis à jour</div>
          </div>
        </div>
        <button onclick="goTo(5)" style="width:100%;padding:11px;background:var(--success);color:white;border:none;border-radius:var(--r-sm);font-size:13px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px">
          Voir mon plan d'action
          ${sv(IC.arrow,'width:16px;height:16px;fill:white')}
        </button>
      </div>`
    : `
      <div style="background:var(--axa-xlight);border:1.5px solid var(--axa-light);border-radius:var(--r-md);padding:16px">
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:12px">
          <div style="width:32px;height:32px;border-radius:50%;background:var(--axa);display:flex;align-items:center;justify-content:center;flex-shrink:0">
            ${sv(IC.info,'width:16px;height:16px;fill:white')}
          </div>
          <div>
            <div style="font-size:13px;font-weight:700;color:var(--axa)">Affinez votre exposition</div>
            <p style="font-size:12px;color:var(--n600);margin-top:4px;line-height:1.5">Ces niveaux sont basés sur votre zone géographique. Le diagnostic prend en compte l'état réel de votre logement.</p>
          </div>
        </div>
        <button onclick="goTo(2)" style="width:100%;padding:12px;background:var(--axa);color:white;border:none;border-radius:var(--r-sm);font-size:14px;font-weight:600;font-family:var(--font);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px">
          ${sv(IC.shield,'width:16px;height:16px;fill:white')}
          Démarrer le diagnostic
        </button>
        <div style="display:flex;justify-content:center;gap:16px;margin-top:10px">
          <span style="font-size:11px;color:var(--n500);display:flex;align-items:center;gap:4px">${sv(IC.check,'width:11px;height:11px;fill:var(--success)')}${(window._ST.questions||[]).length || getQuestionsForProfile(p).length} questions</span>
          <span style="font-size:11px;color:var(--n500);display:flex;align-items:center;gap:4px">${sv(IC.check,'width:11px;height:11px;fill:var(--success)')}Résultats immédiats</span>
          <span style="font-size:11px;color:var(--n500);display:flex;align-items:center;gap:4px">${sv(IC.check,'width:11px;height:11px;fill:var(--success)')}Sans impact sur votre prime</span>
        </div>
      </div>`;

  /* Local context snippet */
  const lc = p.localContext || {};
  const ev = lc.recentEvent;
  const contextBlock = ev ? `
    <div style="background:var(--warn-bg);border:1px solid var(--warn-light);border-radius:var(--r-md);padding:12px 14px;display:flex;gap:10px;align-items:flex-start">
      <div style="font-size:18px;flex-shrink:0">⚠️</div>
      <div>
        <div style="font-size:11px;font-weight:700;color:var(--warn)">Événement récent · ${ev.year}</div>
        <div style="font-size:12px;color:var(--n700);margin-top:3px;line-height:1.4">${ev.label} — ${ev.detail}</div>
      </div>
    </div>` : '';

  /* Actions & points teaser */
  const actionsTeaser = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
      <div onclick="goTo(6)" style="background:var(--white);border:1.5px solid var(--n200);border-radius:var(--r-md);padding:14px;cursor:pointer">
        <div style="font-size:22px;margin-bottom:6px">⚡</div>
        <div style="font-size:12px;font-weight:700;color:var(--n900)">Actions & Défis</div>
        <div style="font-size:11px;color:var(--n500);margin-top:3px">${todoCount} action${todoCount>1?'s':''} disponible${todoCount>1?'s':''}</div>
      </div>
      <div onclick="goTo(8)" style="background:var(--white);border:1.5px solid var(--n200);border-radius:var(--r-md);padding:14px;cursor:pointer">
        <div style="font-size:22px;margin-bottom:6px">🎁</div>
        <div style="font-size:12px;font-weight:700;color:var(--n900)">Récompenses</div>
        <div style="font-size:11px;color:var(--n500);margin-top:3px">${pts > 0 ? pts + ' pts gagnés' : 'Réalisez des actions'}</div>
      </div>
    </div>`;

  return `
    <div style="background:var(--axa);padding:20px var(--sp5) 28px;position:relative;overflow:hidden">
      <div style="position:absolute;right:-20px;top:-20px;width:120px;height:120px;border-radius:50%;background:rgba(255,255,255,.04)"></div>
      <div style="position:absolute;right:40px;bottom:-40px;width:80px;height:80px;border-radius:50%;background:rgba(255,255,255,.03)"></div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
        <div style="width:40px;height:40px;border-radius:50%;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${p.avatar}</div>
        <div>
          <div style="font-size:11px;color:rgba(255,255,255,.55);font-weight:500">Coach Prévention MRH</div>
          <div style="font-size:15px;font-weight:700;color:white">${p.firstName}</div>
        </div>
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,.55);margin-bottom:4px;display:flex;align-items:center;gap:4px">
        ${sv(IC.pin,'width:11px;height:11px;fill:rgba(255,255,255,.55)')}${p.location} · ${p.propertyType}
      </div>
      <div style="font-size:11px;color:rgba(255,255,255,.4)">${p.contract.name} · ${p.contract.ref}</div>
      ${diagDone
        ? `<div style="margin-top:12px;display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.12);border-radius:99px;padding:5px 12px">
            ${sv(IC.check,'width:12px;height:12px;fill:var(--success-mid)')}
            <span style="font-size:11px;color:rgba(255,255,255,.8);font-weight:600">Diagnostic complété · Vue personnalisée</span>
           </div>`
        : `<div style="margin-top:12px;display:inline-flex;align-items:center;gap:6px;background:rgba(255,255,255,.1);border-radius:99px;padding:5px 12px">
            ${sv(IC.info,'width:12px;height:12px;fill:rgba(255,255,255,.6)')}
            <span style="font-size:11px;color:rgba(255,255,255,.7)">Vue de zone · Diagnostic recommandé</span>
           </div>`
      }
    </div>

    <div style="padding:20px var(--sp5);display:flex;flex-direction:column;gap:16px">

      <div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
          <div style="font-size:13px;font-weight:700;color:var(--n900)">Vos risques principaux</div>
          <span style="font-size:11px;color:var(--n400)">${diagDone?'Vue personnalisée':'Vue de zone'}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px">${riskCards}</div>
      </div>

      ${diagBlock}

      <div>
        <div style="font-size:12px;font-weight:700;color:var(--n600);margin-bottom:10px;text-transform:uppercase;letter-spacing:.5px">Autres risques</div>
        <div style="display:flex;gap:8px">${secondaryRisks}</div>
      </div>

      ${contextBlock ? `<div>${contextBlock}</div>` : ''}
      ${actionsTeaser}

    </div>
    <div style="height:24px"></div>`;
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
      <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${ans===o.v?'var(--axa)':'var(--n300)'};background:${ans===o.v?'var(--axa)':'transparent'};display:flex;align-items:center;justify-content:center;flex-shrink:0">
        ${ans===o.v?`<div style="width:6px;height:6px;border-radius:50%;background:white"></div>`:''}
      </div>
      <span style="font-size:14px;color:${ans===o.v?'var(--axa)':'var(--n800)'};font-weight:${ans===o.v?'600':'400'}">${o.l}</span>
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

      <button id="diagNextBtn" onclick="diagNext()" ${ans?'':'disabled'} style="width:100%;padding:14px;background:${ans?'var(--axa)':'var(--n200)'};color:${ans?'white':'var(--n400)'};border:none;border-radius:var(--r-md);font-size:15px;font-weight:600;font-family:var(--font);cursor:${ans?'pointer':'not-allowed'};display:flex;align-items:center;justify-content:center;gap:8px;opacity:${ans?1:.7};transition:all .2s">
        ${step < qs.length-1 ? `Question suivante ${sv(IC.arrow,'width:18px;height:18px;fill:currentColor')}` : `Voir mes résultats ${sv(IC.shield,'width:16px;height:16px;fill:currentColor')}`}
      </button>
    </div>
    <div style="height:20px"></div>`;
}
