# Guía de trabajo — ZenderBox WMS

> Para Mone (UX/Frontend) y Leo (Dev Lead).
> Todo desde VS Code — sin necesidad de usar la terminal.

---

## Acceso inicial (solo la primera vez)

### 1. Clonar el repositorio en tu computadora

1. Abrí **VS Code**
2. `Ctrl+Shift+P` (Windows) o `Cmd+Shift+P` (Mac) → escribí `Git: Clone`
3. Pegá la URL del repo: `https://github.com/zenderhub/ZenderBox-2026-WMS-NEW`
4. Elegí la carpeta donde querés guardarlo (ej: `Documentos/ZenderBox/wms`)
5. VS Code pregunta "¿Abrir repositorio clonado?" → **Abrir**

Listo. Ya tenés el código en tu máquina.

---

## Flujo de trabajo diario

### NUNCA trabajar directo en `main`

`main` es producción. Siempre creás tu propia rama, trabajás ahí, y Leo revisa antes de que entre a `main`.

---

### Paso a paso para Mone (UX / Frontend)

#### Antes de empezar cualquier cambio → sincronizá

1. En VS Code, fijate abajo a la izquierda que diga `main`
2. Hacé clic en el ícono ↓↑ (Sync Changes) — esto baja los últimos cambios
3. Ya tenés la versión más actualizada

#### Crear tu rama para el cambio

1. Clic en `main` (abajo a la izquierda) → **Create new branch**
2. Nombre de la rama — seguí este formato:
   - `feature/mone-nombre-del-cambio` → para cosas nuevas
   - `fix/mone-nombre-del-bug` → para correcciones
   - Ejemplos: `feature/mone-buscar-guia-rediseno`, `fix/mone-sidebar-mobile`
3. Enter → ya estás en tu nueva rama (lo ves abajo a la izquierda)

#### Trabajar — hacer cambios

- Editá los archivos normalmente
- VS Code muestra en azul cuántos archivos modificaste (ícono de rama izquierda)

#### Guardar tus cambios en GitHub (commit + push)

1. Clic en el ícono de **Source Control** (lado izquierdo, ícono de ramitas)
2. Se ven todos los archivos que cambiaste
3. Escribí un mensaje corto en el campo de texto: `rediseño sección buscar guía`
4. Clic en **Commit** (o `Cmd+Enter`)
5. Clic en **Publish Branch** o **Sync Changes** (↑) para subir a GitHub

#### Abrir un Pull Request (pedir revisión a Leo)

1. VS Code te va a mostrar una notificación "Create Pull Request" → clic ahí
   - *Si no aparece:* abrí `github.com/zenderhub/ZenderBox-2026-WMS-NEW` en el navegador
2. Título claro: `[Mone] Rediseño sección Buscar Guía`
3. Descripción breve: qué cambiaste y por qué
4. **Assign to:** Leo
5. Clic **Create Pull Request**

Leo recibe notificación por email, revisa, y si está bien hace el merge a `main`.

---

### Paso a paso para Leo (Dev Lead / Revisor)

#### Revisar un PR de Mone

1. Recibís email de GitHub con el PR
2. Abrís el PR en GitHub → pestaña **Files changed** para ver exactamente qué cambió
3. Si todo bien → clic **Merge pull request** → **Confirm merge**
4. Si hay algo para corregir → dejás comentario en la línea específica → **Request changes**

#### Hacer cambios directos tú (hotfixes o features grandes)

Mismo flujo que Mone: rama propia → commit → PR hacia `main`.
Para hotfixes críticos en producción podés hacer merge directo si sos el único reviewer.

---

## Reglas del repo

| Regla | Por qué |
|---|---|
| Nunca pushear directo a `main` | `main` se auto-despliega al servidor |
| Un PR = un cambio o feature | Más fácil de revisar y revertir si algo rompe |
| Nombre de rama con tu nombre | Sabemos quién está trabajando en qué |
| Commit message en español, claro | El historial es memoria del equipo |

---

## Estructura de carpetas

```
hub/              ← frontend (HTML, JS, CSS) — Mone trabaja aquí
  buscar.html
  despachos.html
  sidebar.js
  ...
docker-compose.yml ← infra — solo Leo
nginx/             ← servidor — solo Leo
n8n-workflows/     ← automatizaciones — solo Juanse + Leo
```

---

## ¿Algo rompió?

1. No entres en pánico — git guarda TODO el historial
2. Avisale a Leo por WhatsApp con screenshot del error
3. Leo puede revertir cualquier cambio en 2 minutos

---

## Contacto

| Persona | Rol | GitHub |
|---|---|---|
| Juanse | Owner / Backend | @juanse-zenderbox |
| Leo | Dev Lead | *(agregar user)* |
| Mone | UX / Frontend | *(agregar user)* |

---

*Última actualización: 2026-05-07*
