/* ═══════════════════════════════════════════════
   APP.JS v3 — Coach Prévention MRH
   State · Navigation · Interactions
═══════════════════════════════════════════════ */

/* ── GLOBAL STATE ── */
window._ST = {
  profileId:        'profil-a',
  scenario:         null,
  diagStep:         0,
  diagAnswers:      {},
  questions:        [],
  completedActions: [],
  currentScore:     null,
  scoreBefore:      null,
  selectedAction:   null,
  lastCompletedAction: null
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
  if (idx < 0 || idx > 8) return;
  if (idx === 2) {
    // Reset diagnostic on entry
    window._ST.diagStep = 0;
    window._ST.diagAnswers = {};
  }
  if (idx === 3) showLoadingThen(() => { render(3); updateNav(3); });
  else { render(idx); updateNav(idx); }
}

function updateNav(idx) {
  document.querySelectorAll('.step-btn').forEach((btn, i) => {
    btn.classList.remove('active','done');
    if (i === idx) btn.classList.add('active');
    else if (i < idx) btn.classList.add('done');
    const num = btn.querySelector('.step-num');
    if (num) num.textContent = i < idx ? '✓' : i + 1;
  });
}

/* ── LOADING SCREEN ── */
function showLoadingThen(cb) {
  const app = document.getElementById('app');
  const l   = document.createElement('div');
  l.className = 'screen active';
  l.style.cssText = 'background:var(--axa);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:20px;padding:0 32px';
  const msgs = ['Données Géorisques…','Analyse des risques…','Calcul du score…','Personnalisation…'];
  l.innerHTML = `
    <div style="text-align:center">
      <div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.12);display:flex;align-items:center;justify-content:center;margin:0 auto 16px">
        <svg style="width:26px;height:26px;fill:white" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg>
      </div>
      <div style="font-size:17px;font-weight:600;color:#fff;margin-bottom:5px;font-family:var(--font)">Calcul en cours…</div>
      <div id="lmsg" style="font-size:12px;color:rgba(255,255,255,.55);font-family:var(--font)">${msgs[0]}</div>
    </div>
    <div style="width:200px;height:4px;background:rgba(255,255,255,.15);border-radius:var(--r-pill);overflow:hidden">
      <div id="lbar" style="height:100%;width:0;background:var(--success-mid);border-radius:var(--r-pill);transition:width .08s linear"></div>
    </div>
    <div style="display:flex;flex-direction:column;gap:7px;width:200px">
      ${msgs.map((m,i)=>`<div id="ls${i}" style="display:flex;align-items:center;gap:8px;opacity:${i===0?1:.3};transition:opacity .3s"><div style="width:6px;height:6px;border-radius:50%;background:${i===0?'var(--success-mid)':'rgba(255,255,255,.25)'};transition:background .3s" id="ld${i}"></div><span style="font-size:11px;color:rgba(255,255,255,.6);font-family:var(--font)">${m}</span></div>`).join('')}
    </div>
  `;
  const prev = app.querySelector('.screen.active');
  if (prev) { prev.classList.add('exit'); prev.classList.remove('active'); setTimeout(() => prev.remove(), 310); }
  app.appendChild(l);

  /* Calculate score from diagnostic answers */
  let scoreGain = 0;
  (window._ST.questions || []).forEach(q => {
    const ans = (window._ST.diagAnswers || {})[q.id];
    const opt = q.options.find(o => o.v === ans);
    if (opt) scoreGain += opt.pts;
  });
  const p = getProfile(window._ST.profileId);
  window._ST.currentScore = Math.min(p.preparationScore + Math.round(scoreGain * .35), 100);

  let w = 0, step = 0;
  const iv = setInterval(() => {
    w += 2.5;
    const bar = l.querySelector('#lbar');
    if (bar) bar.style.width = Math.min(w, 97) + '%';
    const ns = Math.floor(w / 25);
    if (ns > step && ns < msgs.length) {
      const prev = l.querySelector(`#ls${step}`), prevD = l.querySelector(`#ld${step}`);
      const curr = l.querySelector(`#ls${ns}`),  currD = l.querySelector(`#ld${ns}`);
      const lmsg = l.querySelector('#lmsg');
      if (prev) prev.style.opacity = '.5';
      if (prevD) prevD.style.background = 'rgba(255,255,255,.3)';
      if (curr) curr.style.opacity = '1';
      if (currD) currD.style.background = 'var(--success-mid)';
      if (lmsg) lmsg.textContent = msgs[ns];
      step = ns;
    }
    if (w >= 100) { clearInterval(iv); setTimeout(cb, 200); }
  }, 25);
}

/* ── SELECTION SCREEN ── */
function selectProfile(id) {
  window._ST.profileId = id;
  window._ST.currentScore = null;
  window._ST.completedActions = [];
  window._ST.diagAnswers = {};
  window._ST.diagStep = 0;
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
  // Update UI immediately
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
    goTo(3);
  }
}

function diagBack() {
  if (window._ST.diagStep > 0) {
    window._ST.diagStep--;
    render(2);
  } else {
    goTo(1);
  }
}

/* ── ACTIONS ── */
function openAction(id) {
  window._ST.selectedAction = id;
  goTo(6);
}

function completeAction(id) {
  if (!window._ST.completedActions) window._ST.completedActions = [];
  if (window._ST.completedActions.includes(id)) return;
  const a = ALL_ACTIONS.find(x => x.id === id);
  if (!a) return;
  window._ST.scoreBefore = window._ST.currentScore || getProfile(window._ST.profileId).preparationScore;
  window._ST.completedActions.push(id);
  window._ST.currentScore = computeScore(getProfile(window._ST.profileId), window._ST.completedActions);
  window._ST.lastCompletedAction = id;
  goTo(7);
}

/* ── SCORE BAR (live) ── */
function updateScoreBar() {
  const p   = getProfile(window._ST.profileId);
  const s   = window._ST.currentScore || p.preparationScore;
  const done= window._ST.completedActions || [];
  const actions = getActionsForProfile(p);
  const rem = actions.filter(a => !done.includes(a.id)).reduce((sum,a)=>sum+a.pts,0);
  const el  = document.getElementById('currentScore');
  const hd  = document.getElementById('ptsHeader');
  const bar = document.getElementById('scoreBar');
  if (el)  el.textContent  = `${s} / 100`;
  if (hd)  hd.textContent  = rem > 0 ? `+${rem} pts disponibles` : '🎉 Plan complété !';
  if (bar) bar.classList.toggle('ok', s >= 70);
}

/* ── REWARDS ── */
function activateRewards() {
  const done = window._ST.completedActions || [];
  if (!done.length) { alert('Réalisez au moins une action pour activer vos rewards.'); return; }
  alert(`✓ Vos rewards sont en cours d'activation.\n\n${done.length} action${done.length>1?'s':''} validée${done.length>1?'s':''}.\nVous serez contacté(e) sous 48h par AXA Prévention.`);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  render(0);
  updateNav(0);
});
