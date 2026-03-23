# ZenderBox WMS — CLAUDE.md
**Guía para Claude Code al trabajar en este repositorio**

## Quién soy
Juan Acuña, dueño de ZenderBox (ACUNA & CARO INVESTMENTS LLC) — empresa de casilleros virtuales y logística internacional en Costa Rica, Colombia y Panamá.

## Stack
- **Automatización**: n8n Cloud · zenderbox.app.n8n.cloud
- **Base de datos actual**: Google Sheets (migrando a PostgreSQL)
- **WMS actual**: .NET en AWS EC2 · store1.zenderbox.com
- **Frontend prototipo**: GitHub Pages · zenderbox.github.io/n8n/wms/
- **Frontend futuro**: Angular + MUI · zenderhubapp.com
- **WhatsApp**: Twilio · línea CR: +17869461834 · línea COL: +17864423800
- **Pagos**: ePayco
- **IA Llamadas**: Dapta · api.dapta.ai
- **Courier CR**: SmartQuick
- **Courier Colombia**: TCC

## Arquitectura del repo

### Estructura de carpetas
- `/wms/` — Módulos principales del WMS multiagencia
- `/wms/ia/` — Módulos de IA (llamadas, cobros, etc.)
- `/wms/casillero/` — Módulos de casillero (despachos USA, etc.)
- `/CR/` — Variantes regionales Costa Rica
- Root — rastreo.html, index.html

### Sidebar compartido (`/wms/sidebar.js`)
- Único archivo JS compartido — inyecta navegación en todas las páginas
- Multiagencia CR/Colombia via sessionStorage
- Dispara evento `wms:agencia` al cambiar agencia
- Módulos en `/wms/` usan `sidebar.js`
- Módulos en `/wms/ia/` y `/wms/casillero/` usan `../sidebar.js`
- SIEMPRE usar colores hardcoded (#081F3A, #CCD32A, etc.) — no variables CSS

## Design System
- **Colores**: Navy `#081F3A` · Cyan `#009CC9` · Lima `#CCD32A`
- **Tipografía**: IBM Plex Mono (datos) + IBM Plex Sans (UI)
- **Tema**: Oscuro — fondo `#040d18`, superficie `#081F3A`
- **Layout**: Sidebar fijo 220px + contenido principal
- **Idioma UI**: Español

## Webhooks n8n producción
- Base: `https://zenderbox.app.n8n.cloud/webhook/`
- CR Consolidados: `/cr-consolidados-data`
- CR Despachos: `/cr-despachos`
- CR WhatsApp: `/cr-enviar-whatsapp`
- COL WhatsApp: `/col-enviar-whatsapp`
- CR Templates Twilio: `/cr-templates-twilio`
- Llamadas Data: `/llamadas-data`
- Pre-liquidador: `/preliquidador`
- Rastreo CR: `/rastreo-cr`
- Despachos USA Preview: `/wms-despachos-preview`
- Despachos USA Ejecutar: `/wms-despachos-ejecutar`

## Google Sheets
- CR Despachos: `1CYJsc8KaOjuigYP5MKtWPh5Gt9V07lpKKslh9ksWjRY`
- Total Casilleros: `1h2AcJ1wRdE9MvvKbB8XzzyEtRQLqqJjoDVWK0C21RQw`

## Módulos activos
| Módulo | Archivo | Estado |
|---|---|---|
| Dashboard | `wms/index.html` | ✅ |
| Buscar Guía | `wms/buscar.html` | ✅ |
| Consolidados | `wms/consolidados.html` | ✅ CR |
| Manifiesto | `wms/manifiesto.html` | ✅ CR + COL |
| Despachos | `wms/despachos.html` | ✅ CR + COL |
| WhatsApp | `wms/whatsapp.html` | ✅ CR + COL |
| Pre-liquidador | `wms/preliquidador.html` | ✅ COL |
| Llamadas IA | `wms/ia/llamadas.html` | ✅ CR + COL |
| Despachos USA | `wms/casillero/despachos-usa.html` | 🔄 Validación |

## Convenciones
- n8n: siempre `alwaysOutputData: true` en nodos Leer
- Webhooks prod: `/webhook/...` · Test: `/webhook-test/...`
- PIN ambiente test: `1234`
- Patrón guía CR: `/^[A-Z]{3}\d{10}$/`
- Teléfono CR: 8 dígitos → agregar `+506`
- Teléfono COL: 10 dígitos → agregar `+57`
- Sin tildes ni ñ en nombres de columnas de Google Sheets

## Cómo correr localmente
```bash
cd ~/n8n
python3 -m http.server 8080
# Abrir http://localhost:8080/wms/
```
