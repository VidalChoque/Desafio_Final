// ─── SHARED NAVIGATION ───────────────────────────────────────────────
function buildNav(activeId) {
  const inIndex = activeId === 'index';
  const scenarioPath = file => inIndex ? `escenarios/${file}` : file;
  const conclusionsHref = inIndex ? 'escenarios/conclusiones.html' : 'conclusiones.html';
  const scenarios = [
    { id: 'index', label: 'Inicio', href: inIndex ? 'index.html' : '../index.html' },
    { id: 'a', label: 'A: Abastecimiento', href: scenarioPath('escenario-a.html') },
    { id: 'b', label: 'B: Reservas', href: scenarioPath('escenario-b.html') },
    { id: 'c', label: 'C: Precios', href: scenarioPath('escenario-c.html') },
    { id: 'd', label: 'D: Gasto Familiar', href: scenarioPath('escenario-d.html') },
    { id: 'e', label: 'E: Umbrales', href: scenarioPath('escenario-e.html') },
    { id: 'f', label: 'F: Rumores', href: scenarioPath('escenario-f.html') },
    { id: 'g', label: 'G: Conflicto Social', href: scenarioPath('escenario-g.html') },
    { id: 'conclusiones', label: 'Conclusiones', href: conclusionsHref },
  ];
  const nav = document.getElementById('nav-links');
  if (!nav) return;
  nav.innerHTML = scenarios.map(s => `
    <li><a href="${s.href}" class="${s.id === activeId ? 'active' : ''}">${s.label}</a></li>
  `).join('');
}

// ─── TAB SYSTEM ──────────────────────────────────────────────────────
function initTabs() {
  document.querySelectorAll('.tabs').forEach(tabGroup => {
    tabGroup.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        const container = btn.closest('.section-body, .page-container');
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        container.querySelector(`#${target}`).classList.add('active');
      });
    });
  });
}

// ─── HELPERS ─────────────────────────────────────────────────────────
function fmt(n, d = 6) {
  if (typeof n !== 'number' || isNaN(n)) return '—';
  return n.toFixed(d);
}

function fmtBs(n) {
  return `Bs ${n.toFixed(2)}`;
}

function showResult(id, html) {
  const el = document.getElementById(id);
  if (el) { el.innerHTML = html; el.classList.add('fadeInUp'); }
}

function buildTable(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
        <tbody>${rows.map(r => `<tr>${r.map((c, i) => `<td class="${i === 0 ? '' : ''}">${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
    </div>`;
}

function defaultChartOptions(title = '') {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { labels: { color: '#8892b0', font: { family: 'Space Mono', size: 11 } } },
      title: title ? { display: true, text: title, color: '#e8eaf6', font: { family: 'Syne', size: 14, weight: '700' } } : { display: false }
    },
    scales: {
      x: { ticks: { color: '#8892b0', font: { family: 'Space Mono', size: 10 } }, grid: { color: 'rgba(42,58,92,0.5)' } },
      y: { ticks: { color: '#8892b0', font: { family: 'Space Mono', size: 10 } }, grid: { color: 'rgba(42,58,92,0.5)' } }
    }
  };
}

// Chart registry to destroy before recreate
const chartRegistry = {};
function getOrCreateChart(canvasId, config) {
  if (chartRegistry[canvasId]) {
    chartRegistry[canvasId].destroy();
  }
  const ctx = document.getElementById(canvasId).getContext('2d');
  chartRegistry[canvasId] = new Chart(ctx, config);
  return chartRegistry[canvasId];
}
