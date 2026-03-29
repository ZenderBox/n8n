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
      { icon: '💬', label: 'WA Hub',            href: 'whatsapp-hub.html', id: 'whatsapp-hub' },
      { icon: '🧾', label: 'Pre-liquidador',    href: 'preliquidador.html', id: 'preliquidador' },
    ]
  },
  {
    section: 'IA',
    collapsible: true,
    id: 'ia-section',
    items: [
      { icon: '📞', label: 'Llamadas',          href: 'ia/llamadas.html',  id: 'llamadas' },
      { icon: '📧', label: 'Correos',           href: 'ia/correos.html',   id: 'correos' },
      { icon: '🎁', label: 'Primer Paquete',    href: 'ia/primer.html',    id: 'primer-paquete',  coming: true },
    ]
  },
  {
    section: 'COBROS',
    collapsible: true,
    id: 'cobros-section',
    items: [
      { icon: '💰', label: 'QuickBooks',        href: 'cobros/quickbooks.html', id: 'quickbooks' },
    ]
  },
  {
    section: 'CASILLERO',
    collapsible: true,
    id: 'casillero-section',
    items: [
      { icon: '✈️', label: 'Despachos USA',    href: 'casillero/despachos-usa.html', id: 'despachos-usa' },
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

// CSS del sidebar y agency buttons — hardcoded para funcionar en cualquier página
function injectSidebarStyles() {
  if (document.getElementById('wms-sidebar-styles')) return;
  const style = document.createElement('style');
  style.id = 'wms-sidebar-styles';
  style.textContent = `
    #wms-sidebar {
      width: 220px;
      min-height: 100vh;
      background: #081F3A;
      border-right: 1px solid #0f3058;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      position: fixed;
      left: 0; top: 0; bottom: 0;
      z-index: 100;
      overflow-y: auto;
      font-family: 'IBM Plex Sans', 'Space Mono', monospace;
    }
    #wms-sidebar .sidebar-logo { padding: 20px 20px 16px; border-bottom: 1px solid #0f3058; }
    #wms-sidebar .zb { font-size: 11px; font-weight: 600; color: #CCD32A; letter-spacing: 3px; text-transform: uppercase; display: block; margin-bottom: 2px; }
    #wms-sidebar .country { font-size: 10px; color: #5a7a9a; margin-top: 2px; display: block; }
    #wms-sidebar .nav-section { padding: 12px 12px 4px; }
    #wms-sidebar .nav-section-label { font-size: 9px; color: #5a7a9a; letter-spacing: 2px; text-transform: uppercase; padding: 0 8px; margin-bottom: 4px; display: flex; cursor: pointer; }
    #wms-sidebar .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 10px; border-radius: 6px; transition: all 0.15s; margin-bottom: 2px; border: 1px solid transparent; text-decoration: none; color: #8aaac8; }
    #wms-sidebar .nav-item:hover { background: #0d2748; }
    #wms-sidebar .nav-item.active { background: rgba(204,211,42,0.12); border-color: rgba(204,211,42,0.2); }
    #wms-sidebar .nav-item.active .nav-label { color: #CCD32A !important; }
    #wms-sidebar .nav-icon { font-size: 14px; flex-shrink: 0; }
    #wms-sidebar .nav-label { font-size: 13px; font-weight: 500; color: #8aaac8; }
    #wms-sidebar .nav-coming { font-size: 9px; color: #5a7a9a; padding: 2px 6px; background: #0d2748; border-radius: 3px; margin-left: auto; }
    #wms-sidebar .sidebar-footer { margin-top: auto; padding: 16px 20px; border-top: 1px solid #0f3058; }
    #wms-sidebar .version { font-size: 10px; color: #5a7a9a; }
    #wms-sidebar h2 { font-size: 15px; font-weight: 600; color: #e8f0f8; }
    .agency-opt {
      display: block; width: 100%; text-align: left;
      padding: 6px 10px; font-size: 11px;
      border: 1px solid #0f3058; border-radius: 4px;
      background: transparent; color: #5a7a9a;
      cursor: pointer; transition: all 0.15s; margin-bottom: 4px;
    }
    .agency-opt:hover { background: #0d2748; color: #e8f0f8; }
    .agency-opt.active { background: rgba(204,211,42,0.12); border-color: #CCD32A; color: #CCD32A; font-weight: 600; }
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
