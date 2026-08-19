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

## Deploy (Netlify)

Ya viene configurado en `netlify.toml` (build `npm run build`, publish `dist`).
Conectás el repo en Netlify y listo, o arrastrás la carpeta `dist`.

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
