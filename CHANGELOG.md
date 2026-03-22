# CHANGELOG — ZenderBox WMS

Historial de módulos construidos para el sistema WMS de ZenderBox.

---

## 2026-03-22

### Correos IA (`/wms/ia/correos.html`)
- Módulo de monitoreo de emails procesados por agente IA
- Datos desde Google Sheets (hoja EmailLog)
- Stats cards: Total, Enviados, Fallidos, Pendientes
- Filtros por estado + búsqueda por destinatario/asunto/casillero
- Panel lateral de detalle con contenido del email
- Botón "Ejecutar Agente Ahora" (webhook n8n)
- Botón "Actualizar" para recargar datos del Sheet
- Selector de agencia (CR / COL) integrado con sidebar

### Sidebar (`/wms/sidebar.js`)
- Agregado enlace 📧 Correos en sección IA

---

## 2026-03-21

### Casillero — Despachos USA (`/wms/casillero/despachos-usa.html`)
- Módulo de despachos desde casilleros en USA
- Integrado a la sección Casillero del sidebar

### CLAUDE.md
- Agregado archivo de guía para Claude Code con documentación del proyecto

---

## 2026-03-20

### Llamadas IA (`/wms/ia/llamadas.html`)
- Módulo de monitoreo de llamadas IA (Agente Dapta)
- Stats: Total casilleros, Llamados, Contestaron, No contestaron, Sin llamada
- Tabla con casillero, nombre, teléfono, ciudad, perfil, estado llamada, sentimiento
- Panel de detalle con info completa + grabación
- Envío de WhatsApp desde detalle (templates Twilio)
- Filtros por estado de llamada + búsqueda
- Selector de agencia CR / COL

---

## 2026-03-15

### Sidebar Compartido (`/wms/sidebar.js`)
- Navegación dinámica inyectada en todas las páginas
- Secciones colapsibles: IA, Casillero
- Selector de agencia multiagencia (CR ↔ COL) con `sessionStorage`
- Evento custom `wms:agencia` para comunicación entre módulos
- Auto-highlight de página activa

### WMS Index (`/wms/index.html`)
- Página principal del WMS con acceso a todos los módulos

### Despachos (`/wms/despachos.html`)
- Panel de gestión de despachos y envíos

### Manifiesto (`/wms/manifiesto.html`)
- Carga y gestión de manifiestos de importación

### Buscar Guía (`/wms/buscar.html`)
- Búsqueda de guías por número, cliente o tracking

### Consolidados (`/wms/consolidados.html`)
- Panel de consolidados con estado de paquetes y vuelos

### WhatsApp (`/wms/whatsapp.html`)
- Envío de mensajes WhatsApp vía templates Twilio

### Pre-liquidador (`/wms/preliquidador.html`)
- Cálculo de preliquidación de envíos

### Guías (`/wms/guias.html`)
- Gestión y consulta de guías de envío

---

## 2026-03-14

### Costa Rica — Módulos regionales (`/CR/`)
- `index.html` — Landing del WMS Costa Rica
- `buscar.html` — Búsqueda de guías CR
- `consolidados.html` — Consolidados CR
- `consolidados-wms.html` — Vista alternativa de consolidados CR
- `despachos-panel.html` — Panel de despachos CR
- `whatsapp.html` — WhatsApp CR

### Páginas raíz regionales
- `cr-index.html` — Index Costa Rica (raíz)
- `cr-buscar.html` — Buscar guías CR (raíz)
- `cr-consolidados.html` — Consolidados CR (raíz)

---

## 2026-03-12

### Rastreo (`/rastreo.html`)
- Página pública de rastreo de paquetes para clientes

---

## 2026-03-08

### Despachos Panel (`/despachos-panel.html`)
- Panel inicial de despachos (versión raíz, previo al WMS)

---

## 2026-03-05

### Landing Page (`/index.html`)
- Página de inicio de ZenderBox

### Pre-liquidador (`/preliquidador.html`)
- Versión inicial del preliquidador (raíz, previo al WMS)

---

## 2026-02-26

### Consolidados Panel (`/ZenderBox_Consolidados_Panel.html`)
- Primera versión del panel de consolidados ZenderBox
