/**
 * ZenderBox WMS — Sidebar compartido multiagencia
 * Importar en cada módulo: <script src="../sidebar.js"></script>
 * El sidebar se inyecta automáticamente en #wms-sidebar
 */

const WMS_BASE = '/n8n/wms';

const WMS_NAV = [
  {
    section: 'OPERACIONES',
    items: [
      { icon: '🔍', label: 'Buscar Guía',      href: 'buscar.html',       id: 'buscar' },
      { icon: '📦', label: 'Consolidados',      href: 'consolidados.html', id: 'consolidados' },
      { icon: '📥', label: 'Cargar Manifiesto', href: 'manifiesto.html',   id: 'manifiesto' },
      { icon: '🚚', label: 'Despachos',         href: 'despachos.html',    id: 'despachos' },
      { icon: '💬', label: 'WhatsApp',          href: 'whatsapp.html',     id: 'whatsapp' },
      { icon: '🧾', label: 'Pre-liquidador',    href: 'preliquidador.html', id: 'preliquidador' },
    ]
  },
  {
    section: 'IA',
    collapsible: true,
    id: 'ia-section',
    items: [
      { icon: '📞', label: 'Llamadas',          href: 'ia/llamadas.html',  id: 'llamadas' },
      { icon: '💰', label: 'Cobros',            href: 'ia/cobros.html',    id: 'cobros',          coming: true },
      { icon: '🎁', label: 'Primer Paquete',    href: 'ia/primer.html',    id: 'primer-paquete',  coming: true },
    ]
  },
  {
    section: 'SISTEMA',
    items: [
      { icon: '⚙️', label: 'Settings',          href: 'settings.html',     id: 'settings',        coming: true },
    ]
  }
];

// Detectar página activa y profundidad de carpeta
function getActivePage() {
  const path = window.location.pathname;
  const file = path.split('/').pop().replace('.html', '');
  return file || 'index';
}

// Detectar si estamos en subcarpeta (ej: /wms/ia/)
function getBaseUrl() {
  const path = window.location.pathname;
  // Si path contiene /wms/ia/ u otra subcarpeta dentro de wms
  const wmsIdx = path.indexOf('/wms/');
  if (wmsIdx < 0) return '';
  const afterWms = path.substring(wmsIdx + 5); // después de /wms/
  const depth = afterWms.split('/').length - 1; // niveles de subcarpeta
  return depth > 0 ? '../'.repeat(depth) : '';
}

// Agencias disponibles
const WMS_AGENCIAS = [
  { id: 'CR', label: '🇨🇷 Costa Rica',  color: '#009CC9' },
  { id: 'COL', label: '🇨🇴 Colombia',   color: '#F5A623' },
];

// Estado global de agencia — persiste en sessionStorage
function getAgencia() {
  return sessionStorage.getItem('wms_agencia') || 'CR';
}
function setAgencia(id) {
  sessionStorage.setItem('wms_agencia', id);
  // Disparar evento para que cada módulo reaccione
  window.dispatchEvent(new CustomEvent('wms:agencia', { detail: { agencia: id } }));
  updateAgenciaUI(id);
}

function updateAgenciaUI(id) {
  document.querySelectorAll('.agency-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.id === id);
  });
  const lbl = WMS_AGENCIAS.find(a => a.id === id)?.label || id;
  const el = document.getElementById('wms-agencia-label');
  if (el) el.textContent = lbl;
}

// Render del sidebar
function renderSidebar() {
  const activePage = getActivePage();
  const agencia    = getAgencia();

  const agenciaBtns = WMS_AGENCIAS.map(a =>
    `<button class="agency-opt${a.id === agencia ? ' active' : ''}" data-id="${a.id}" onclick="setAgencia('${a.id}')">${a.label}</button>`
  ).join('');

  const navHtml = WMS_NAV.map(group => {
    const isCollapsible = group.collapsible;
    const sectionId     = group.id || group.section.toLowerCase();
    const isOpen        = sessionStorage.getItem('wms_nav_' + sectionId) !== 'closed';

    const itemsHtml = group.items.map(item => {
      const isActive = activePage === item.id || activePage.includes(item.id);
      return `<a class="nav-item${isActive ? ' active' : ''}${item.coming ? ' nav-coming-item' : ''}"
        href="${item.coming ? '#' : (getBaseUrl() + item.href)}"
        onclick="${item.coming ? 'return false' : ''}"
        style="${item.coming ? 'cursor:default;pointer-events:none;opacity:0.45' : ''}">
        <span class="nav-icon">${item.icon}</span>
        <span class="nav-label">${item.label}</span>
        ${item.coming ? '<span class="nav-coming">pronto</span>' : ''}
      </a>`;
    }).join('');

    if (isCollapsible) {
      return `
        <div class="nav-section">
          <div class="nav-section-label nav-collapsible" onclick="toggleNavSection('${sectionId}')" style="cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding-right:8px">
            <span>${group.section}</span>
            <span id="nav-arrow-${sectionId}" style="font-size:10px;transition:transform 0.2s;transform:rotate(${isOpen ? '90' : '0'}deg)">▶</span>
          </div>
          <div id="nav-items-${sectionId}" style="display:${isOpen ? 'block' : 'none'}">
            ${itemsHtml}
          </div>
        </div>`;
    }

    return `
      <div class="nav-section">
        <div class="nav-section-label">${group.section}</div>
        ${itemsHtml}
      </div>`;
  }).join('');

  const html = `
    <div class="sidebar-logo">
      <div class="zb">ZENDERBOX</div>
      <h2 style="font-size:15px;font-weight:600;color:var(--text)">WMS</h2>
      <div class="country" style="font-family:var(--mono);font-size:10px;color:var(--text-muted);margin-top:2px">
        <span id="wms-agencia-label">${WMS_AGENCIAS.find(a => a.id === agencia)?.label || agencia}</span>
      </div>
    </div>
    <div style="padding:10px 12px;border-bottom:1px solid var(--border)">
      <div style="font-family:var(--mono);font-size:9px;color:var(--text-muted);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">AGENCIA</div>
      <div style="display:flex;flex-direction:column;gap:4px">
        ${agenciaBtns}
      </div>
    </div>
    ${navHtml}
    <div class="sidebar-footer">
      <div class="version">v2.0 · WMS Multiagencia</div>
    </div>`;

  const container = document.getElementById('wms-sidebar');
  if (container) container.innerHTML = html;
}

function toggleNavSection(sectionId) {
  const items = document.getElementById('nav-items-' + sectionId);
  const arrow = document.getElementById('nav-arrow-' + sectionId);
  if (!items) return;
  const isOpen = items.style.display !== 'none';
  items.style.display = isOpen ? 'none' : 'block';
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(90deg)';
  sessionStorage.setItem('wms_nav_' + sectionId, isOpen ? 'closed' : 'open');
}

// CSS del sidebar y agency buttons
function injectSidebarStyles() {
  if (document.getElementById('wms-sidebar-styles')) return;
  const style = document.createElement('style');
  style.id = 'wms-sidebar-styles';
  style.textContent = `
    .agency-opt {
      display: block;
      width: 100%;
      text-align: left;
      padding: 6px 10px;
      font-family: var(--mono);
      font-size: 11px;
      border: 1px solid var(--border);
      border-radius: 4px;
      background: transparent;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.15s;
    }
    .agency-opt:hover { background: var(--surface2); color: var(--text); }
    .agency-opt.active {
      background: var(--accent-dim);
      border-color: var(--accent);
      color: var(--accent);
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);
}

// Init — funciona aunque el DOM ya haya cargado
function initSidebar() {
  injectSidebarStyles();
  renderSidebar();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}
