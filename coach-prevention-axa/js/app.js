/* ── STATE ── */
let currentScreen = 0;
const totalScreens = 5;
const checked = { r0: false, r1: false, r2: false };
const pts = { r0: 5, r1: 3, r2: 11 };
window._earnedPts = 120;

/* ── RENDER ── */
function render(idx) {
  const app = document.getElementById('app');
  const html = SCREENS['s' + idx]();

  // Create new screen div
  const next = document.createElement('div');
  next.className = 'screen';
  next.innerHTML = html;
  app.appendChild(next);

  // Animate out old screen
  const prev = app.querySelector('.screen.active');
  if (prev) {
    prev.classList.add('exit');
    prev.classList.remove('active');
    setTimeout(() => prev.remove(), 320);
  }

  // Animate in new screen
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      next.classList.add('active');
      next.scrollTop = 0;
    });
  });
}

/* ── NAVIGATION ── */
function goTo(idx) {
  if (idx < 0 || idx >= totalScreens) return;
  if (idx === 2) {
    // Loading interstitial before score
    showLoading(() => {
      currentScreen = idx;
      render(idx);
      updateNav(idx);
    });
    return;
  }
  currentScreen = idx;
  render(idx);
  updateNav(idx);
}

function updateNav(idx) {
  document.querySelectorAll('.step-pill').forEach((pill, i) => {
    pill.classList.remove('active', 'done');
    if (i === idx) pill.classList.add('active');
    else if (i < idx) pill.classList.add('done');
    const num = pill.querySelector('.pill-num');
    if (i < idx) num.textContent = '✓';
    else num.textContent = i + 1;
  });
}

/* ── LOADING INTERSTITIAL ── */
function showLoading(callback) {
  const app = document.getElementById('app');

  const loader = document.createElement('div');
  loader.className = 'screen active';
  loader.style.background = 'var(--blue-800)';
  loader.style.display = 'flex';
  loader.style.flexDirection = 'column';
  loader.style.alignItems = 'center';
  loader.style.justifyContent = 'center';
  loader.style.gap = '20px';

  loader.innerHTML = `
    <div style="text-align:center;">
      <div style="font-size:40px;margin-bottom:16px;">⚡</div>
      <div style="font-size:17px;font-weight:600;color:white;margin-bottom:6px;">Calcul en cours…</div>
      <div style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.5;">
        Analyse de votre exposition<br>aux risques climatiques
      </div>
    </div>
    <div style="width:200px;height:4px;background:rgba(255,255,255,0.15);border-radius:2px;overflow:hidden;">
      <div id="loaderBar" style="height:100%;width:0%;background:var(--green-300);border-radius:2px;transition:width 0.1s linear;"></div>
    </div>
    <div style="font-size:12px;color:rgba(255,255,255,0.4)" id="loaderMsg">Chargement des données Géorisques…</div>
  `;

  const prev = app.querySelector('.screen.active');
  if (prev) { prev.classList.add('exit'); prev.classList.remove('active'); setTimeout(() => prev.remove(), 320); }
  app.appendChild(loader);

  const msgs = [
    'Chargement des données Géorisques…',
    'Analyse de la zone à risque…',
    'Calcul du score d\'exposition…',
    'Personnalisation des recommandations…'
  ];
  let w = 0;
  let msgIdx = 0;
  const bar = loader.querySelector('#loaderBar');
  const msgEl = loader.querySelector('#loaderMsg');

  const interval = setInterval(() => {
    w += 3;
    if (bar) bar.style.width = Math.min(w, 96) + '%';
    if (w % 25 === 0 && msgIdx < msgs.length - 1) {
      msgIdx++;
      if (msgEl) msgEl.textContent = msgs[msgIdx];
    }
    if (w >= 100) {
      clearInterval(interval);
      setTimeout(callback, 200);
    }
  }, 30);
}

/* ── PILL SELECTION ── */
function selectPill(el) {
  const group = el.closest('.options-row');
  group.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}

/* ── RECO TOGGLE ── */
function toggleReco(id, ptVal) {
  const card = document.getElementById(id);
  const chk = card.querySelector('.check-circle');
  checked[id] = !checked[id];

  if (checked[id]) {
    card.classList.add('checked');
    chk.classList.add('just-checked');
    setTimeout(() => chk.classList.remove('just-checked'), 400);
    window._earnedPts += ptVal;
  } else {
    card.classList.remove('checked');
    window._earnedPts -= ptVal;
  }

  updateScoreDisplay();
}

function updateScoreDisplay() {
  const earnedFromRecos = Object.entries(checked)
    .filter(([, v]) => v)
    .reduce((sum, [k]) => sum + pts[k], 0);
  const newScore = 62 + earnedFromRecos;
  const remaining = 19 - earnedFromRecos;

  const scoreEl = document.getElementById('currentScore');
  const headerEl = document.getElementById('ptsHeader');

  if (scoreEl) {
    scoreEl.textContent = newScore + ' / 100';
    const su = document.getElementById('scoreUpdate');
    if (su) {
      su.style.background = newScore >= 75 ? 'var(--green-50)' : 'var(--blue-50)';
      su.querySelector('.s4-score-label').style.color = newScore >= 75 ? 'var(--green-800)' : 'var(--blue-800)';
      su.querySelector('.s4-score-val').style.color = newScore >= 75 ? 'var(--green-600)' : 'var(--blue-800)';
    }
  }
  if (headerEl) {
    headerEl.textContent = remaining > 0 ? '+' + remaining + ' pts disponibles' : '🎉 Toutes les actions complétées !';
  }
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  render(0);
  updateNav(0);
});
