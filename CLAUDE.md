# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ZenderBox WMS (Warehouse Management System) — a static, frontend-only operations panel for managing logistics, shipping, and warehouse operations across multiple geographic agencies (Colombia and Costa Rica). Built with vanilla HTML, CSS, and JavaScript with no build system, package manager, or testing framework.

## Running Locally

Serve with any static HTTP server:
```bash
python3 -m http.server
# or
npx serve
```
No build step, no dependencies to install.

## Architecture

### Page Structure
Each HTML page is self-contained with embedded CSS and minimal inline JS. Pages are organized by region and module:

- `/wms/` — Primary WMS modules (Colombia/General): buscar, consolidados, manifiesto, despachos, whatsapp, preliquidador, guias
- `/wms/ia/` — AI-powered features (llamadas/call management)
- `/wms/casillero/` — Mailbox/parcel storage (USA dispatches)
- `/CR/` — Costa Rica regional variants of core modules
- Root level — Landing page (`index.html`), tracking (`rastreo.html`), and mixed regional pages

### Shared Navigation (`/wms/sidebar.js`)
The only shared JavaScript file. It dynamically injects a sidebar navigation into any page that includes it. Key details:
- `WMS_NAV` defines the navigation structure with collapsible sections (IA, Casillero)
- `WMS_AGENCIAS` enables multi-agency switching (CR ↔ COL)
- Uses `sessionStorage` for persisting agency selection and collapse state
- Fires custom `wms:agencia` events for cross-module agency change communication
- Auto-highlights the current page in the nav
- Footer shows "WMS v2.0"

### Design System
- **Dark theme**: Navy backgrounds (`#081F3A`, `#040d18`) with lime (`#CCD32A`), cyan (`#009CC9`), and gold (`#F5A623` for CR) accents
- **Typography**: IBM Plex Mono (code/data), IBM Plex Sans (UI text) via Google Fonts
- **Layout**: Fixed 220px sidebar + main content area
- **UI language**: Spanish throughout
