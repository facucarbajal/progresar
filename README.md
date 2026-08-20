# Progresar 🎓

Un juego satírico sobre lo que dura la **Beca Progresar**. Entrás a la facultad
con la beca como única plata y tenés que sobrevivir al primer mes de clases.
Spoiler: no llegás ni a mitad de semana. Ese es el punto — la beca ($28.000) no
se actualiza hace 2 años y no alcanza para nada.

Inspirado en [conladeadorni](https://conladeadorni.netlify.app/) con mecánica de
juego tipo [copero](https://copero.com.ar/) / [potrerofutbol](https://www.potrerofutbol.ar/).

## Stack

- React + Vite
- Tailwind CSS (estética pixel-art / retro)
- framer-motion (animaciones)

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build de producción

```bash
npm run build    # genera /dist
npm run preview  # sirve /dist localmente
```

## Deploy (Cloudflare Pages)

El sitio vive en **https://progresar.pages.dev**. Cloudflare Pages está conectado
a este repo: cada push a `main` dispara el build (`npm run build`, salida `dist`)
y publica solo.

La config de Pages son dos archivos en `public/`, que Vite copia tal cual a
`dist/`:

- `_headers` — headers de seguridad (CSP, `X-Frame-Options`, etc.). La CSP es
  una lista blanca de los dominios que el sitio usa de verdad: si agregás un
  script, una fuente o una API de otro dominio, hay que declararlo ahí o el
  navegador lo bloquea.
- `_redirects` — fallback de SPA: cualquier ruta cae en `index.html`.

## Cómo está armado

```
src/
  App.jsx              Máquina de estados: landing → carrera → juego → final
  game/
    config.js          Balance (beca, energía, costos)
    carreras.js        Las 6 carreras y sus materiales por día
    dias.js            Marco narrativo y objetivos personales de cada día
    state.js           Estado + reducer del juego
  screens/             Landing, SeleccionCarrera, Juego, Final
  components/          HUD, BarraEnergia, DialogBox, CartelObjetivo, BotonPixel
```

Para ajustar la dificultad, tocá los costos en `game/carreras.js` y
`game/dias.js`. El juego está calibrado para perder siempre entre el día 1 y 3.
