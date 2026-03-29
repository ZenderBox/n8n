/**
 * ZenderBox — hub/sidebar.js
 * Sidebar de navegación para hub.zenderbox.com
 * Versión: 1.0 — Marzo 2026
 */

(function () {
  // ─── Colores corporativos (hardcoded — no usar CSS variables) ───
  var C = {
    navy:    '#081F3A',
    lime:    '#CCD32A',
    white:   '#FFFFFF',
    gray:    '#F5F5F5',
    navyHov: '#0d2d56',
    text:    '#FFFFFF',
    muted:   'rgba(255,255,255,0.5)',
    divider: 'rgba(255,255,255,0.08)',
  };

  // ─── Módulos de navegación ───────────────────────────────────────
  var NAV = [
    {
      section: 'Principal',
      items: [
        { label: 'Dashboard',     icon: '⊞', path: 'index.html',       depth: 0 },
        { label: 'Buscar Guía',   icon: '🔍', path: 'buscar.html',      depth: 0 },
      ],
    },
    {
      section: 'Comunicaciones',
      items: [
        { label: 'WhatsApp Hub',  icon: '💬', path: 'comunicaciones/whatsapp-hub.html',  depth: 0 },
        { label: 'WhatsApp WMS',  icon: '📱', path: 'comunicaciones/whatsapp.html',       depth: 0 },
      ],
    },
    {
      section: 'Operaciones',
      items: [
        { label: 'Despachos',     icon: '📦', path: 'operaciones/despachos.html',        depth: 0 },
        { label: 'Consolidados',  icon: '🗂',  path: 'operaciones/consolidados.html',     depth: 0 },
        { label: 'Manifiesto',    icon: '📋', path: 'operaciones/manifiesto.html',       depth: 0 },
        { label: 'Guías',         icon: '🏷',  path: 'operaciones/guias.html',            depth: 0 },
        { label: 'Pre-liquidador',icon: '⚖️', path: 'operaciones/preliquidador.html',   depth: 0 },
      ],
    },
    {
      section: 'Casillero',
      items: [
        { label: 'Despachos USA', icon: '✈️', path: 'casillero/despachos-usa.html',     depth: 0 },
      ],
    },
    {
      section: 'Contabilidad',
      items: [
        { label: 'QuickBooks',    icon: '💰', path: 'contabilidad/quickbooks.html',     depth: 0 },
      ],
    },
    {
      section: 'Inteligencia Artificial',
      items: [
        { label: 'Llamadas IA',   icon: '📞', path: 'ia/llamadas.html',                 depth: 0 },
        { label: 'Correos IA',    icon: '✉️', path: 'ia/correos.html',                  depth: 0 },
      ],
    },
    {
      section: 'Growth',
      items: [
        { label: 'Campañas',      icon: '📣', path: 'growth/campanias.html',            depth: 0, badge: 'Próximo' },
      ],
    },
  ];

  // ─── Detectar profundidad del archivo actual ─────────────────────
  function getBase() {
    var path = window.location.pathname;
    // Contar segmentos después de /hub/
    var hubIdx = path.indexOf('/hub/');
    if (hubIdx === -1) return './';
    var after = path.slice(hubIdx + 5); // quita "/hub/"
    var depth = (after.match(/\//g) || []).length;
    var base = '';
    for (var i = 0; i < depth; i++) base += '../';
    return base || './';
  }

  // ─── Detectar ítem activo ────────────────────────────────────────
  function isActive(itemPath, base) {
    var current = window.location.pathname;
    // Resolver path absoluto del ítem
    var resolved = base + itemPath;
    return current.indexOf(itemPath.replace('index.html', '').replace(/\.html$/, '')) !== -1
      && itemPath !== 'buscar.html'; // evitar falso positivo en paths que contengan partes comunes
  }

  function isActivePath(itemPath) {
    var current = window.location.pathname;
    var file = itemPath.split('/').pop().replace('.html', '');
    if (file === 'index') {
      return current.endsWith('/hub/') || current.endsWith('/hub/index.html');
    }
    return current.indexOf(file) !== -1;
  }

  // ─── Inyectar CSS ────────────────────────────────────────────────
  function injectCSS() {
    var css = [
      '* { box-sizing: border-box; margin: 0; padding: 0; }',
      'body { display: flex; min-height: 100vh; font-family: "Exo 2", "Segoe UI", sans-serif; background: ' + C.gray + '; }',
      '@import url("https://fonts.googleapis.com/css2?family=Exo+2:wght@300;400;500;600;700&display=swap");',

      /* ── Sidebar ── */
      '#zb-sidebar {',
      '  width: 240px; min-width: 240px; height: 100vh;',
      '  background: ' + C.navy + ';',
      '  display: flex; flex-direction: column;',
      '  position: fixed; left: 0; top: 0; z-index: 100;',
      '  overflow-y: auto; overflow-x: hidden;',
      '  transition: width 0.25s ease;',
      '}',
      '#zb-sidebar::-webkit-scrollbar { width: 4px; }',
      '#zb-sidebar::-webkit-scrollbar-track { background: transparent; }',
      '#zb-sidebar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }',

      /* ── Logo ── */
      '#zb-sidebar .zb-logo {',
      '  padding: 20px 16px 16px;',
      '  border-bottom: 1px solid ' + C.divider + ';',
      '  display: flex; align-items: center; gap: 10px;',
      '  text-decoration: none;',
      '}',
      '#zb-sidebar .zb-logo-mark {',
      '  width: 32px; height: 32px; border-radius: 6px;',
      '  background: ' + C.lime + ';',
      '  display: flex; align-items: center; justify-content: center;',
      '  font-weight: 700; font-size: 14px; color: ' + C.navy + '; flex-shrink: 0;',
      '}',
      '#zb-sidebar .zb-logo-text {',
      '  display: flex; flex-direction: column; line-height: 1.1;',
      '}',
      '#zb-sidebar .zb-logo-name {',
      '  font-size: 14px; font-weight: 700; color: ' + C.white + '; letter-spacing: 0.5px;',
      '}',
      '#zb-sidebar .zb-logo-sub {',
      '  font-size: 10px; font-weight: 400; color: ' + C.muted + '; letter-spacing: 1px; text-transform: uppercase;',
      '}',

      /* ── Nav ── */
      '#zb-sidebar nav { padding: 8px 0; flex: 1; }',

      '#zb-sidebar .zb-section {',
      '  padding: 16px 16px 4px;',
      '  font-size: 10px; font-weight: 600; letter-spacing: 1.5px;',
      '  text-transform: uppercase; color: ' + C.muted + ';',
      '}',

      '#zb-sidebar a.zb-item {',
      '  display: flex; align-items: center; gap: 10px;',
      '  padding: 9px 16px;',
      '  color: rgba(255,255,255,0.75);',
      '  text-decoration: none;',
      '  font-size: 13px; font-weight: 400;',
      '  border-left: 3px solid transparent;',
      '  transition: all 0.15s ease;',
      '  position: relative;',
      '}',
      '#zb-sidebar a.zb-item:hover {',
      '  background: ' + C.navyHov + ';',
      '  color: ' + C.white + ';',
      '  border-left-color: rgba(204,211,42,0.4);',
      '}',
      '#zb-sidebar a.zb-item.active {',
      '  background: rgba(204,211,42,0.1);',
      '  color: ' + C.lime + ';',
      '  border-left-color: ' + C.lime + ';',
      '  font-weight: 600;',
      '}',
      '#zb-sidebar a.zb-item .zb-icon {',
      '  font-size: 15px; width: 20px; text-align: center; flex-shrink: 0;',
      '}',
      '#zb-sidebar a.zb-item .zb-badge {',
      '  margin-left: auto; font-size: 9px; font-weight: 600;',
      '  padding: 2px 6px; border-radius: 10px;',
      '  background: rgba(255,255,255,0.1); color: ' + C.muted + ';',
      '  letter-spacing: 0.5px;',
      '}',

      /* ── Footer ── */
      '#zb-sidebar .zb-footer {',
      '  padding: 12px 16px;',
      '  border-top: 1px solid ' + C.divider + ';',
      '  font-size: 11px; color: ' + C.muted + ';',
      '  display: flex; align-items: center; gap: 8px;',
      '}',
      '#zb-sidebar .zb-env {',
      '  display: inline-flex; align-items: center; gap: 4px;',
      '  font-size: 10px; font-weight: 600; letter-spacing: 0.5px;',
      '  padding: 2px 8px; border-radius: 10px;',
      '  background: rgba(204,211,42,0.15); color: ' + C.lime + ';',
      '}',
      '#zb-sidebar .zb-env::before { content: "●"; font-size: 8px; }',

      /* ── Main content wrapper ── */
      '#zb-main {',
      '  margin-left: 240px;',
      '  flex: 1;',
      '  min-height: 100vh;',
      '  display: flex; flex-direction: column;',
      '}',

      /* ── Responsive ── */
      '@media (max-width: 768px) {',
      '  #zb-sidebar { width: 60px; }',
      '  #zb-sidebar .zb-logo-text, #zb-sidebar .zb-section,',
      '  #zb-sidebar a.zb-item span.zb-label, #zb-sidebar a.zb-item .zb-badge,',
      '  #zb-sidebar .zb-footer span { display: none; }',
      '  #zb-sidebar a.zb-item { padding: 12px; justify-content: center; }',
      '  #zb-main { margin-left: 60px; }',
      '}',
    ].join('\n');

    var style = document.createElement('style');
    style.textContent = css;
    document.head.insertBefore(style, document.head.firstChild);
  }

  // ─── Construir HTML del sidebar ──────────────────────────────────
  function buildSidebar() {
    var base = getBase();
    var html = [];

    // Logo
    html.push('<a href="' + base + 'index.html" class="zb-logo">');
    html.push('  <div class="zb-logo-mark">ZB</div>');
    html.push('  <div class="zb-logo-text">');
    html.push('    <span class="zb-logo-name">ZenderBox</span>');
    html.push('    <span class="zb-logo-sub">Hub WMS</span>');
    html.push('  </div>');
    html.push('</a>');

    // Nav
    html.push('<nav>');
    NAV.forEach(function (group) {
      html.push('<div class="zb-section">' + group.section + '</div>');
      group.items.forEach(function (item) {
        var href = base + item.path;
        var active = isActivePath(item.path) ? ' active' : '';
        html.push('<a href="' + href + '" class="zb-item' + active + '">');
        html.push('  <span class="zb-icon">' + item.icon + '</span>');
        html.push('  <span class="zb-label">' + item.label + '</span>');
        if (item.badge) {
          html.push('  <span class="zb-badge">' + item.badge + '</span>');
        }
        html.push('</a>');
      });
    });
    html.push('</nav>');

    // Footer
    html.push('<div class="zb-footer">');
    html.push('  <span class="zb-env">PRD</span>');
    html.push('  <span>hub.zenderbox.com</span>');
    html.push('</div>');

    return html.join('\n');
  }

  // ─── Init ────────────────────────────────────────────────────────
  function init() {
    injectCSS();

    // Crear sidebar
    var sidebar = document.createElement('div');
    sidebar.id = 'zb-sidebar';
    sidebar.innerHTML = buildSidebar();

    // Wrap content existente en #zb-main
    var main = document.createElement('div');
    main.id = 'zb-main';
    while (document.body.firstChild) {
      main.appendChild(document.body.firstChild);
    }

    document.body.appendChild(sidebar);
    document.body.appendChild(main);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
