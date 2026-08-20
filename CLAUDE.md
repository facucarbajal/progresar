# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev        # Vite dev server en http://localhost:5173
npm run build      # build de producción a /dist
npm run preview    # sirve /dist localmente
```

No hay tests, linter ni type-checking configurados. La verificación es manual: `npm run dev` y jugar la partida.

Deploy: Netlify (`netlify.toml`, build `npm run build`, publish `dist`, redirect SPA a `/index.html`).

## Qué es

Juego satírico de un solo jugador sobre la Beca Progresar argentina. Es una web app estática, sin backend, sin persistencia (refrescar = partida nueva). Todo el estado vive en memoria en un `useReducer`.

**El juego está diseñado para que siempre pierdas.** No existe estado "ganaste": el mejor final posible (`fin_semana`) también es un game over. Cualquier cambio de balance tiene que preservar eso — la beca ($28.000) no puede alcanzar para la semana.

El contenido es intencionalmente político y satírico (noticias sobre el gobierno, remates por carrera). Está en español rioplatense con voseo y lunfardo; mantené ese registro al escribir textos nuevos.

## Arquitectura

**Todo el estado en un reducer.** `src/game/state.js` tiene `estadoInicial` + `reducer`. Los componentes no tienen estado de juego propio (solo UI local, como el paso 1/2 de `Final.jsx`). `App.jsx` hace `useReducer` y despacha por `estado.pantalla`: `landing → carrera → juego → transicion → final`.

**Separación datos / lógica / UI:**
- `src/game/` — datos puros y lógica. Sin JSX, sin React.
- `src/screens/` — una pantalla por valor de `estado.pantalla`.
- `src/components/` — piezas de UI presentacionales que reciben props.

**Estructura de un día.** Hay 5 días (Lun–Vie) definidos en `dias.js`. Cada día se divide en 2 *momentos* (`cursada` = librería, `personal` = kiosco) cuyo orden alterna día a día (`orden`). El jugador navega entre momentos con `SIGUIENTE_MOMENTO`/`VOLVER_MOMENTO` y cierra con `TERMINAR_DIA`.

**`TERMINAR_DIA` es donde se resuelve todo.** En orden: hambre y energía → ¿sobrevivió la semana? → ¿alcanza para la SUBE de mañana? → cobra el boleto y arma la pantalla de transición. Cada chequeo puede cortar a `pantalla: 'final'` con un `motivoFinal` distinto. `CONTINUAR` (al salir de la transición) cobra la deuda del crédito vencido y tira el evento aleatorio del día.

**Dos billeteras.** `beca` y `mp` (Mercado Pago). Se gasta siempre primero de la beca (`gastar()`); `disponible(estado)` es la suma. Nunca modifiques `beca`/`mp` a mano en el reducer: usá `gastarMov()` / `ganarMov()`, que además incrementan `ultimoMovimiento` (`{ monto, id }`) — el `id` monótono es lo que dispara la animación de plata volando en `Billetera.jsx`.

**Aleatoriedad.** El juego llama `Math.random()` en varios lugares y no hay seed: paro (`sortearParo`, ~40%), `hayOferta` (30% de las partidas tienen changa/crédito), fallo del cuadernillo impreso (`PROB_TRUCHO_FALLA`), evento diario (`EVENTO_PROB`), y la elección de noticias/remates. Para reproducir un bug puede convenir forzar temporalmente esos valores.

**Días de paro.** Si `estado.paroDia === estado.diaIndex`, `Juego.jsx` renderiza una pantalla aparte sin tienda, y todas las acciones de gasto del reducer devuelven el estado sin cambios (`esParo()`). No se cobra boleto ni se cuenta el hambre ese día.

## Balance y contenido

Todos los números viven en `src/game/config.js` (beca, energía, boletos por día, probabilidades, changas, créditos). Los precios de los materiales están en `carreras.js` — el helper `mat()` deriva el precio del "impreso trucho" como ~55% del original. Comida y útiles en `items.js`.

Para agregar una carrera: una entrada en `CARRERAS` con exactamente 5 materiales (uno por día) y un remate en `REMATES` de `mensajes.js` con la misma clave `id`.

`mensajes.js` arma el texto de cierre de cada día (4 combinaciones de estudió/comió) y los textos de los 6 finales (`hambre`, `sin_plata`, `academico`, `fin_semana`, `credito`, `changa`). `noticias.js` tiene dos pools separados — siempre se cuela una del gobierno y una de la facu en cada cierre de día.

## Estilo visual

Tailwind con paleta y utilidades custom. La estética es retro/CRT pero **no** pixel-art tipográfico: `font-pixel` y `font-titulo` son alias de Archivo Black; el cuerpo es Nunito. Usá los colores nombrados del tema (`noche`, `celeste`, `oro`, `verde`, `naranja`, `rojo`…) en vez de valores sueltos, y las utilidades de `index.css` (`borde-pixel`, `sombra-texto`, `fondo-grilla`) en vez de reinventar bordes y sombras. Los botones van siempre por `BotonPixel` con su `variante`.

Archivo Black (`font-pixel`/`font-titulo`) es para **labels cortos y títulos**, nunca para texto corrido ni para botones: en párrafos y en tamaños chicos se vuelve ilegible. Para eso va Nunito (`font-sans` con `font-semibold`/`font-extrabold`).

Las scanlines de CRT viven dentro de `.fondo-grilla`, como capa de `background-image` del contenedor raíz. Antes eran un overlay `position: fixed` encima de todo y arruinaban la lectura sobre superficies claras (botones oro/naranja, carteles) — no las devuelvas a un overlay.

Las figuras recortadas de `public/` (`cfk.png`, `milei.png`, en el comparador del final) son PNG con alfa, pixelado mínimo y trazo blanco. `img { image-rendering: pixelated }` es global, así que escalan sin suavizarse.

Mobile-first: el layout se prueba a ancho de teléfono primero (`max-w-2xl`, breakpoints `sm:`). `vibrar()` de `haptics.js` para feedback háptico en momentos fuertes.
