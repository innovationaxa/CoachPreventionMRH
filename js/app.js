/* ═══════════════════════════════════════════════
   APP.JS v3 — Coach Prévention MRH
   State · Navigation · Interactions
═══════════════════════════════════════════════ */

/* ── GLOBAL STATE ── */
window._ST = {
  profileId:        'profil-a',
  diagStep:         0,
  diagAnswers:      {},
  questions:        [],
  diagCompleted:    false,
  completedActions: [],
  points:           0,
  selectedAction:   null,
  selectedRisk:     null,
  proofUploaded:    {}
};

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
      render(3); updateNav(3); updateTabBar(3);
    });
    return;
  }
  render(idx); updateNav(idx); updateTabBar(idx);
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
  render(0);
  updateNav(0);
}

function startFromSelection() {
  if (!window._ST.profileId) return;
  goTo(1);
}

/* ── DIAGNOSTIC ── */
function selectDiagOpt(qid, val, el) {
  if (!window._ST.diagAnswers) window._ST.diagAnswers = {};
  window._ST.diagAnswers[qid] = val;
  const opts = el.closest('.option-list');
  if (opts) opts.querySelectorAll('.opt-item').forEach(o => o.classList.remove('sel'));
  el.classList.add('sel');
  const nextBtn = document.getElementById('diagNextBtn');
  if (nextBtn) { nextBtn.disabled = false; nextBtn.style.opacity = '1'; }
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
  goTo(7);
}

function completeAction(id) {
  if (!window._ST.completedActions) window._ST.completedActions = [];
  if (window._ST.completedActions.includes(id)) return;
  const a = ALL_ACTIONS.find(x => x.id === id);
  if (!a) return;
  window._ST.completedActions.push(id);
  window._ST.points = (window._ST.points || 0) + a.pts;
  showToast(`+${a.pts} pts gagnés !`, 'success');
  setTimeout(() => goTo(8), 600);
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

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  render(0);
  updateNav(0);
  updateTabBar(0);
});
