/* ═══════════════════════════════════════════════
   APP.JS v4 — Coach Prévention MRH
   State · Navigation · Interactions · Badges
═══════════════════════════════════════════════ */

/* ── GLOBAL STATE ── */
window._ST = {
  profileId:        'profil-a',
  diagStep:         0,
  diagAnswers:      {},
  questions:        [],
  diagCompleted:    false,
  completedActions: [],
  unlockedBadges:   [],
  activatedRewards: [],
  selectedAction:   null,
  selectedDefi:     null,
  selectedRisk:     null,
  proofUploaded:    {},
  hubTab:           'risques',
  diagHistory:      [],
  hubModalShown:    false,
  completedDefis:   []
};

function switchHubTab(tab) {
  if (tab === 'actions' && !window._ST.diagCompleted) {
    showToast('🔒 Terminez d\'abord votre diagnostic', 'warn');
    return;
  }
  window._ST.hubTab = tab;
  render(1);
}

/* ── RENDER ── */
function render(idx) {
  const app  = document.getElementById('app');
  const html = SCREENS['s' + idx]();
  const next = document.createElement('div');
  next.className  = 'screen';
  next.innerHTML  = html;
  app.appendChild(next);
  const prev = app.querySelector('.screen.active');
  if (prev) {
    prev.classList.add('exit');
    prev.classList.remove('active');
    setTimeout(() => prev.remove(), 310);
  }
  requestAnimationFrame(() => requestAnimationFrame(() => {
    next.classList.add('active');
    next.scrollTop = 0;
  }));
}

/* ── NAVIGATION ── */
function goTo(idx) {
  if (idx < 0 || idx > 9) return;
  if (idx === 2) {
    /* Reset diagnostic on entry */
    const p = getProfile(window._ST.profileId);
    window._ST.questions  = getQuestionsForProfile(p);
    window._ST.diagStep   = 0;
    window._ST.diagAnswers = {};
    window._ST.diagCompleted = false;
  }
  if (idx === 3) {
    showLoadingThen(() => {
      window._ST.diagCompleted = true;
      window._ST.hubTab = 'risques';
      if (!Array.isArray(window._ST.diagHistory)) window._ST.diagHistory = [];
      window._ST.diagHistory.push({
        date: new Date().toISOString(),
        answers: { ...window._ST.diagAnswers }
      });
      const newBadges = checkAndUnlockBadges();
      render(1); updateNav(1); updateTabBar(1);
      if (newBadges.length > 0) setTimeout(() => showBadgeUnlock(newBadges[0]), 500);
    });
    return;
  }
  render(idx); updateNav(idx); updateTabBar(idx);
  if (idx === 1 && !window._ST.diagCompleted && !window._ST.hubModalShown) {
    window._ST.hubModalShown = true;
    setTimeout(() => showDiagModal(), 380);
  }
}

/* ── TAB BAR ── */
const TAB_MAP = {
  1:'prevention', 2:'prevention', 3:'prevention',
  4:'prevention', 5:'prevention', 6:'prevention',
  7:'prevention', 8:'prevention', 9:'prevention'
};

function updateTabBar(idx) {
  const bar    = document.getElementById('tabBar');
  const device = document.querySelector('.device');
  if (!bar) return;
  if (idx === 0) {
    bar.style.display = 'none';
    device && device.classList.remove('has-tabbar');
    return;
  }
  bar.style.display = 'flex';
  device && device.classList.add('has-tabbar');
  const activeTab = TAB_MAP[idx] || null;
  bar.querySelectorAll('.tab-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === activeTab);
  });
}

function tabMock(name) {
  const existing = document.getElementById('tab-toast');
  if (existing) existing.remove();
  const t = document.createElement('div');
  t.id = 'tab-toast';
  t.textContent = name + ' — bientôt disponible';
  t.style.cssText = 'position:absolute;bottom:82px;left:50%;transform:translateX(-50%);background:rgba(10,10,30,0.82);color:#fff;padding:8px 16px;border-radius:20px;font-size:12px;font-family:var(--font);z-index:500;white-space:nowrap;pointer-events:none';
  document.querySelector('.device').appendChild(t);
  setTimeout(() => t.remove(), 2200);
}

function updateNav(idx) {
  document.querySelectorAll('.step-btn').forEach((btn, i) => {
    btn.classList.remove('active','done');
    if (i === idx) btn.classList.add('active');
    else if (i < idx) btn.classList.add('done');
    const num = btn.querySelector('.step-num');
    if (num) num.textContent = i < idx ? '✓' : i + 1;
    /* S9 (Historique) always accessible */
    if (i === 9) {
      btn.classList.remove('done');
      btn.classList.toggle('active', idx === 9);
    }
  });
}

/* ── LOADING SCREEN (V3 — analyse des risques) ── */
function showLoadingThen(cb) {
  const app = document.getElementById('app');
  const l   = document.createElement('div');
  l.className = 'screen active';
  l.style.cssText = 'background:var(--axa);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:0 32px';
  const msgs = ['Données de zone…','Analyse de vos réponses…','Mise à jour des niveaux…','Personnalisation du plan…'];
  l.innerHTML = `
    <div style="text-align:center">
      <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
        <svg style="width:26px;height:26px;fill:white" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
      </div>
      <div style="font-size:17px;font-weight:600;color:#fff;margin-bottom:5px;font-family:var(--font)">Analyse en cours…</div>
      <div id="lmsg" style="font-size:12px;color:rgba(255,255,255,.55);font-family:var(--font)">${msgs[0]}</div>
    </div>
    <div style="width:200px;height:4px;background:rgba(255,255,255,.15);border-radius:var(--r-pill);overflow:hidden">
      <div id="lbar" style="height:100%;width:0;background:var(--success-mid);border-radius:var(--r-pill);transition:width .08s linear"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:7px;width:200px">
      ${msgs.map((m,i)=>`<div id="ls${i}" style="display:flex;align-items:center;gap:8px;opacity:${i===0?1:.3};transition:opacity .3s"><div style="width:6px;height:6px;border-radius:50%;background:${i===0?'var(--success-mid)':'rgba(255,255,255,.25)'};transition:background .3s" id="ld${i}"></div><span style="font-size:11px;color:rgba(255,255,255,.6);font-family:var(--font)">${m}</span></div>`).join('')}
    </div>
  `;
  const tabBar = document.getElementById('tabBar');
  const device = document.querySelector('.device');
  if (tabBar) tabBar.style.display = 'none';
  if (device) device.classList.remove('has-tabbar');
  const prev = app.querySelector('.screen.active');
  if (prev) { prev.classList.add('exit'); prev.classList.remove('active'); setTimeout(() => prev.remove(), 310); }
  app.appendChild(l);

  let w = 0, step = 0;
  const iv = setInterval(() => {
    w += 2.5;
    const bar = l.querySelector('#lbar');
    if (bar) bar.style.width = Math.min(w, 97) + '%';
    const ns = Math.floor(w / 25);
    if (ns > step && ns < msgs.length) {
      const prev  = l.querySelector(`#ls${step}`),  prevD = l.querySelector(`#ld${step}`);
      const curr  = l.querySelector(`#ls${ns}`),   currD = l.querySelector(`#ld${ns}`);
      const lmsgEl = l.querySelector('#lmsg');
      if (prev)  prev.style.opacity  = '.5';
      if (prevD) prevD.style.background = 'rgba(255,255,255,.3)';
      if (curr)  curr.style.opacity  = '1';
      if (currD) currD.style.background = 'var(--success-mid)';
      if (lmsgEl) lmsgEl.textContent = msgs[ns];
      step = ns;
    }
    if (w >= 100) { clearInterval(iv); setTimeout(cb, 200); }
  }, 25);
}

/* ── PROFILE SELECTION ── */
function selectProfile(id) {
  window._ST.profileId      = id;
  window._ST.diagAnswers    = {};
  window._ST.diagStep       = 0;
  window._ST.diagCompleted  = false;
  window._ST.completedActions = [];
  window._ST.points         = 0;
  window._ST.proofUploaded  = {};
  window._ST.selectedRisk   = null;
  window._ST.selectedAction = null;
  window._ST.hubTab         = 'risques';
  window._ST.diagHistory    = [];
  window._ST.hubModalShown  = false;
  render(0);
  updateNav(0);
}

function restartDiagnostic() {
  const p = getProfile(window._ST.profileId);
  window._ST.questions   = getQuestionsForProfile(p);
  window._ST.diagStep    = 0;
  window._ST.diagAnswers = {};
  render(2);
  updateNav(2);
  updateTabBar(2);
}

function startFromSelection() {
  if (!window._ST.profileId) return;
  goTo(1);
}

/* ── DIAGNOSTIC ── */
function selectDiagOpt(qid, val, el) {
  if (!window._ST.diagAnswers) window._ST.diagAnswers = {};
  if (window._ST._diagAdvancing) return;
  window._ST.diagAnswers[qid] = val;
  const opts = el.closest('.option-list');
  if (opts) {
    opts.querySelectorAll('.opt-item').forEach(o => {
      o.classList.remove('sel');
      o.style.background = 'var(--white)';
      o.style.borderColor = 'var(--n200)';
      const rb = o.querySelector('.radio-btn');
      if (rb) { rb.style.background = 'transparent'; rb.style.borderColor = 'var(--n300)'; rb.innerHTML = ''; }
      const lb = o.querySelector('.opt-label');
      if (lb) { lb.style.color = 'var(--n800)'; lb.style.fontWeight = '400'; }
    });
  }
  el.classList.add('sel');
  el.style.background = 'var(--axa-xlight)';
  el.style.borderColor = 'var(--axa)';
  const rb = el.querySelector('.radio-btn');
  if (rb) { rb.style.background = 'var(--axa)'; rb.style.borderColor = 'var(--axa)'; rb.innerHTML = '<div style="width:6px;height:6px;border-radius:50%;background:white"></div>'; }
  const lb = el.querySelector('.opt-label');
  if (lb) { lb.style.color = 'var(--axa)'; lb.style.fontWeight = '600'; }
  window._ST._diagAdvancing = true;
  setTimeout(() => {
    window._ST._diagAdvancing = false;
    diagNext();
  }, 320);
}

function diagNext() {
  const qs   = window._ST.questions;
  const step = window._ST.diagStep;
  const q    = qs[step];
  if (!window._ST.diagAnswers[q.id]) return;
  if (step < qs.length - 1) {
    window._ST.diagStep++;
    render(2);
  } else {
    goTo(3); /* → loading → vue enrichie */
  }
}

function diagBack() {
  if (window._ST.diagStep > 0) {
    window._ST.diagStep--;
    render(2);
  } else {
    goTo(1); /* back to Hub */
  }
}

/* ── DEEP DIVE ── */
function openRisk(riskId) {
  window._ST.selectedRisk = riskId;
  goTo(4);
}

/* ── ACTIONS ── */
function openAction(id) {
  window._ST.selectedAction = id;
  window._ST.selectedDefi = null;
  goTo(7);
}

function completeAction(id) {
  if (!window._ST.completedActions) window._ST.completedActions = [];
  if (window._ST.completedActions.includes(id)) return;
  const a = ALL_ACTIONS.find(x => x.id === id);
  if (!a) return;
  window._ST.completedActions.push(id);
  const newBadges = checkAndUnlockBadges();
  if (newBadges.length > 0) {
    setTimeout(() => showBadgeUnlock(newBadges[0]), 400);
  } else {
    showToast('✓ Action réalisée !', 'success');
    setTimeout(() => { window._ST.hubTab = 'actions'; goTo(1); }, 600);
  }
}

/* ── BADGE UNLOCK LOGIC ── */
function checkAndUnlockBadges() {
  const st  = window._ST;
  const p   = getProfile(st.profileId);
  const prev = st.unlockedBadges || [];
  const current = getUnlockedBadgeIds(p, st.diagAnswers, st.completedActions, st.completedDefis);
  const newOnes = current.filter(id => !prev.includes(id));
  st.unlockedBadges = current;
  return newOnes.map(id => getBadgeById(id)).filter(Boolean);
}

function showBadgeUnlock(badge) {
  const device = document.querySelector('.device');
  if (!device) return;
  const tierColors = { bronze: '#C47A27', silver: '#6B7280', gold: '#D97706' };
  const tierBg     = { bronze: '#FDF3E3', silver: '#F3F4F6', gold: '#FFFBEB' };
  const color = tierColors[badge.tier] || '#00008F';
  const bg    = tierBg[badge.tier]    || '#F8F8F8';
  const el = document.createElement('div');
  el.id = 'badge-unlock-overlay';
  el.style.cssText = `position:absolute;inset:0;z-index:600;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.6);padding:24px`;
  el.innerHTML = `
    <div style="background:white;border-radius:20px;padding:28px 24px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,0.3);width:100%;animation:badgePop .35s cubic-bezier(0.34,1.56,0.64,1)">
      <div style="font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:1.2px;color:${color};margin-bottom:16px">🎉 Félicitations !</div>
      <div style="background:${bg};border:2px solid ${color};width:80px;height:80px;border-radius:20px;display:flex;align-items:center;justify-content:center;font-size:44px;margin:0 auto 16px">
        ${badge.icon}
      </div>
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:${color};margin-bottom:6px">Badge débloqué !</div>
      <div style="font-size:17px;font-weight:700;color:#111118;margin-bottom:8px">${badge.label}</div>
      <div style="font-size:12px;color:#6B6B85;line-height:1.55;margin-bottom:22px">${badge.desc}</div>
      <button onclick="document.getElementById('badge-unlock-overlay').remove();window._ST.hubTab='actions';goTo(1);"
              style="width:100%;padding:13px;background:${color};color:white;border:none;border-radius:12px;font-size:14px;font-weight:700;font-family:var(--font);cursor:pointer">
        Super ! 🎊
      </button>
    </div>`;
  if (!document.getElementById('badge-anim-style')) {
    const s = document.createElement('style');
    s.id = 'badge-anim-style';
    s.textContent = '@keyframes badgePop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:scale(1)}}';
    document.head.appendChild(s);
  }
  device.appendChild(el);
}

function activateReward(rewardId) {
  if (!window._ST.activatedRewards) window._ST.activatedRewards = [];
  if (!window._ST.activatedRewards.includes(rewardId)) {
    window._ST.activatedRewards.push(rewardId);
  }
  render(8); updateNav(8); updateTabBar(8);
}

/* ── BILAN PRÉVENTION (mocked) ── */
function downloadBilan() {
  showToast('📄 Génération du bilan prévention… (démo)', 'info');
  setTimeout(() => showToast('✓ Bilan prévention prêt — téléchargement simulé', 'success'), 1200);
}

/* ── PROOF UPLOAD (mocked) ── */
function mockUploadProof(actionId, fromScreen) {
  if (!window._ST.proofUploaded) window._ST.proofUploaded = {};
  window._ST.proofUploaded[actionId] = true;
  showToast('📎 Preuve ajoutée à votre dossier', 'info');
  if (fromScreen !== undefined) { render(fromScreen); updateNav(fromScreen); }
}

/* ── TOAST ── */
function showToast(text, type) {
  const device = document.querySelector('.device');
  if (!device) return;
  const existing = device.querySelector('#app-toast');
  if (existing) existing.remove();
  const bg = type === 'success' ? 'var(--success)' : type === 'info' ? 'var(--axa)' : 'var(--warn)';
  const t = document.createElement('div');
  t.id = 'app-toast';
  t.innerHTML = text;
  t.style.cssText = `position:absolute;bottom:90px;left:50%;transform:translateX(-50%);background:${bg};color:#fff;padding:9px 18px;border-radius:20px;font-size:12px;font-weight:600;font-family:var(--font);z-index:500;white-space:nowrap;pointer-events:none`;
  device.appendChild(t);
  setTimeout(() => t.remove(), 2400);
}

/* ── BILAN EXPORT ── */
function generateBilan() {
  const p     = getProfile(window._ST.profileId);
  const done  = window._ST.completedActions || [];
  const pts   = window._ST.points || 0;
  const levels = getRiskLevels(p, window._ST.diagAnswers);
  const today = new Date().toLocaleDateString('fr-FR', { day:'2-digit', month:'long', year:'numeric' });

  const risksHtml = p.mainRisks.map(rId => {
    const r   = RISKS[rId];
    const lv  = levels[rId] || {};
    const li  = lv.levelInfo || {};
    const cov = (p.coverage || {})[rId] || {};
    const covIcon  = cov.status === 'covered' ? '✓' : cov.status === 'partial' ? '◑' : '✗';
    const covLabel = cov.status === 'covered' ? 'Couvert' : cov.status === 'partial' ? 'Couverture partielle' : 'Non couvert';
    const covDetail = [cov.limit ? `Plafond ${cov.limit}` : null, cov.franchise ? `Franchise ${cov.franchise}` : null, cov.cgRef && cov.cgRef !== '—' ? cov.cgRef : null].filter(Boolean).join(' · ');
    return `
      <tr>
        <td style="padding:9px 10px 9px 0;border-bottom:1px solid #f0f2f5;width:26px;font-size:18px;vertical-align:top">${r.icon}</td>
        <td style="padding:9px 0;border-bottom:1px solid #f0f2f5;vertical-align:top">
          <div style="font-size:12.5px;font-weight:700;color:${li.hex || '#1a1a2e'}">${r.label} — Niveau ${li.label || '—'}</div>
          <div style="font-size:11px;color:#555;margin-top:2px;line-height:1.4">${r.explanation}</div>
          ${cov.status ? `<div style="margin-top:5px;font-size:10.5px;background:#f0f3ff;border-left:3px solid #00008F;padding:4px 8px;border-radius:0 4px 4px 0">
            <strong style="color:#00008F">${covIcon} ${covLabel}</strong>${covDetail ? ' · ' + covDetail : ''}
          </div>` : ''}
        </td>
      </tr>`;
  }).join('');

  const allA    = getActionsForProfile(p, window._ST.diagAnswers);
  const actionsHtml = allA.slice(0, 8).map(a => {
    const isDone = done.includes(a.id);
    return `
      <tr>
        <td style="padding:7px 8px 7px 0;border-bottom:1px solid #f0f2f5;width:20px;vertical-align:top">
          <div style="width:16px;height:16px;border-radius:50%;background:${isDone?'#16a34a':'#e5e7eb'};display:inline-flex;align-items:center;justify-content:center;font-size:9px;color:${isDone?'white':'#9ca3af'}">${isDone?'✓':'○'}</div>
        </td>
        <td style="padding:7px 0;border-bottom:1px solid #f0f2f5;vertical-align:top">
          <div style="font-size:12px;font-weight:600;color:${isDone?'#16a34a':'#1a1a2e'}">${a.title}</div>
          <div style="font-size:10px;color:#888;margin-top:1px">${a.riskLabel} · ${a.duration}</div>
        </td>
        <td style="padding:7px 0 7px 8px;border-bottom:1px solid #f0f2f5;text-align:right;font-size:10px;font-weight:700;color:#00008F;vertical-align:top">${a.pts} pts</td>
      </tr>`;
  }).join('');

  const html = `<!DOCTYPE html><html lang="fr"><head>
    <meta charset="UTF-8"><title>Bilan Prévention MRH — ${p.firstName}</title>
    <style>
      @page { size:A4; margin:18mm 16mm; }
      *{box-sizing:border-box;margin:0;padding:0;}
      body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a2e;font-size:12px;line-height:1.5;}
      .header{display:flex;align-items:flex-start;justify-content:space-between;border-bottom:3px solid #00008F;padding-bottom:12px;margin-bottom:18px;}
      .logo{font-size:24px;font-weight:900;color:#00008F;letter-spacing:-0.5px;font-style:italic;}
      .doc-meta{font-size:10px;color:#888;text-align:right;line-height:1.6;}
      .profile-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;background:#f0f2ff;border-radius:8px;padding:14px 16px;margin-bottom:20px;}
      .label{font-size:10px;color:#666;font-weight:500;margin-bottom:2px;text-transform:uppercase;letter-spacing:0.04em;}
      .value{font-size:12.5px;font-weight:700;}
      .section{margin-bottom:20px;page-break-inside:avoid;}
      .section-title{font-size:10.5px;font-weight:800;letter-spacing:0.09em;text-transform:uppercase;color:#00008F;border-bottom:1.5px solid #e0e4f0;padding-bottom:5px;margin-bottom:10px;}
      table{width:100%;border-collapse:collapse;}
      .footer{border-top:1px solid #e0e4f0;margin-top:20px;padding-top:8px;display:flex;justify-content:space-between;color:#aaa;font-size:9.5px;}
      @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact;}}
    </style>
  </head><body>
    <div class="header">
      <div><div class="logo">AXA</div><div style="font-size:16px;font-weight:700;color:#00008F;margin-top:2px">Bilan de Prévention MRH</div></div>
      <div class="doc-meta"><div>Généré le ${today}</div><div>${p.contract.ref}</div></div>
    </div>
    <div class="profile-grid">
      <div><div class="label">Assuré(e)</div><div class="value">${p.firstName} · ${p.propertyType}</div></div>
      <div><div class="label">Localisation</div><div class="value">${p.location}</div></div>
      <div><div class="label">Contrat</div><div class="value">${p.contract.name}</div></div>
      <div><div class="label">Points prévention</div><div class="value">${pts} pts gagnés</div></div>
    </div>
    <div class="section"><div class="section-title">Exposition aux risques</div><table>${risksHtml}</table></div>
    <div class="section"><div class="section-title">Plan d'actions prioritaires</div><table>${actionsHtml}</table></div>
    <div class="footer"><div>AXA Prévention — Coach MRH V3</div><div>${p.contract.ref} · ${today}</div><div>confidentiel · usage personnel</div></div>
  </body></html>`;

  const w = window.open('', '_blank', 'width=820,height=960');
  if (!w) { alert('Veuillez autoriser les pop-ups pour télécharger votre bilan.'); return; }
  w.document.write(html);
  w.document.close();
  setTimeout(() => { w.focus(); w.print(); }, 450);
}

function mockSendBilan() {
  showToast('✉️ Bilan envoyé ! Vérifiez votre messagerie.', 'info');
}

/* ── MODAL : explication calcul niveaux de risque ── */
function showZoneInfoModal() {
  const device = document.querySelector('.device');
  if (!device || device.querySelector('#zone-info-modal')) return;
  const overlay = document.createElement('div');
  overlay.id = 'zone-info-modal';
  overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:400;display:flex;align-items:flex-end';
  const sheet = document.createElement('div');
  sheet.style.cssText = 'width:100%;background:var(--white);border-radius:16px 16px 0 0;padding:20px 20px 28px;transform:translateY(100%);transition:transform .35s cubic-bezier(.22,.61,.36,1)';
  sheet.innerHTML = `
    <div style="width:36px;height:4px;border-radius:99px;background:var(--n200);margin:0 auto 18px"></div>
    <div style="font-size:16px;font-weight:700;color:var(--n900);margin-bottom:14px">Comment est-ce calculé ?</div>
    <div style="display:flex;flex-direction:column;gap:12px;font-size:13px;color:var(--n700);line-height:1.55">
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:18px;flex-shrink:0">📍</span>
        <div><strong>Avant le diagnostic — estimation géographique</strong><br>Les niveaux sont calculés à partir des données de votre secteur : zonage PPRI, historique météo, statistiques de sinistres locaux. C'est une estimation de zone, pas une analyse de votre logement.</div>
      </div>
      <div style="display:flex;gap:10px;align-items:flex-start">
        <span style="font-size:18px;flex-shrink:0">🏠</span>
        <div><strong>Après le diagnostic — vue personnalisée</strong><br>Le diagnostic prend en compte les caractéristiques réelles de votre logement : équipements de protection, type de construction, ancienneté, environnement immédiat. Les niveaux peuvent s'améliorer ou se confirmer.</div>
      </div>
    </div>
    <button id="zone-modal-close" style="width:100%;padding:13px;background:var(--axa);color:white;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:var(--font);cursor:pointer;margin-top:20px">Compris</button>`;
  overlay.appendChild(sheet);
  device.appendChild(overlay);
  requestAnimationFrame(() => requestAnimationFrame(() => { sheet.style.transform = 'translateY(0)'; }));
  function close() { sheet.style.transform = 'translateY(100%)'; setTimeout(() => overlay.remove(), 350); }
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  sheet.querySelector('#zone-modal-close').addEventListener('click', close);
}

/* ── DIAGNOSTIC MODAL (bottom sheet, 1ère visite Hub) ── */
function showDiagModal() {
  const device = document.querySelector('.device');
  if (!device || device.querySelector('#diag-modal')) return;

  const overlay = document.createElement('div');
  overlay.id = 'diag-modal';
  overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.45);z-index:400;display:flex;align-items:flex-end';

  const sheet = document.createElement('div');
  sheet.style.cssText = 'width:100%;background:var(--white);border-radius:16px 16px 0 0;padding:20px 20px 28px;transform:translateY(100%);transition:transform .38s cubic-bezier(.22,.61,.36,1)';
  sheet.innerHTML = `
    <div style="width:36px;height:4px;border-radius:99px;background:var(--n200);margin:0 auto 18px"></div>
    <div style="width:44px;height:44px;border-radius:12px;background:var(--axa);display:flex;align-items:center;justify-content:center;margin-bottom:14px">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
    </div>
    <div style="font-size:18px;font-weight:700;color:var(--n900);line-height:1.3;margin-bottom:8px">Affinez votre exposition aux risques</div>
    <p style="font-size:13px;color:var(--n600);line-height:1.55;margin-bottom:16px">En répondant à quelques questions sur votre logement, nous personnalisons votre diagnostic, vos recommandations — et débloquons vos récompenses.</p>
    <div style="display:flex;gap:16px;margin-bottom:18px">
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--n500)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>2 minutes
      </div>
      <div style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--n500)">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--success)"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>Sans impact sur la prime
      </div>
    </div>
    <button id="diag-modal-start" style="width:100%;padding:14px;background:var(--axa);color:white;border:none;border-radius:10px;font-size:15px;font-weight:600;font-family:var(--font);cursor:pointer;margin-bottom:10px">
      Démarrer le diagnostic
    </button>
    <button id="diag-modal-later" style="width:100%;padding:11px;background:transparent;color:var(--n500);border:none;font-size:13px;font-weight:500;font-family:var(--font);cursor:pointer">
      Plus tard
    </button>`;

  overlay.appendChild(sheet);
  device.appendChild(overlay);

  requestAnimationFrame(() => requestAnimationFrame(() => { sheet.style.transform = 'translateY(0)'; }));

  function closeModal() { sheet.style.transform = 'translateY(100%)'; setTimeout(() => overlay.remove(), 380); }
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  sheet.querySelector('#diag-modal-start').addEventListener('click', () => { closeModal(); setTimeout(() => goTo(2), 380); });
  sheet.querySelector('#diag-modal-later').addEventListener('click', closeModal);
}

/* ── EXPOSE GLOBALS V4 ── */
window.checkAndUnlockBadges = checkAndUnlockBadges;
window.showBadgeUnlock      = showBadgeUnlock;
window.activateReward       = activateReward;

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  render(0);
  updateNav(0);
  updateTabBar(0);
});
