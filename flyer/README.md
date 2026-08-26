# Flyers de lanzamiento

PNG listos para publicar:

- `progresar-flyer-1080x1350.png` — feed (Instagram / Twitter).
- `progresar-flyer-1080x1920.png` — story.

Los `.html` son la fuente: paleta del juego, todo el texto en Archivo Black
(embebida en base64, así renderiza sin internet) y la grilla + scanlines de
`.fondo-grilla`.

Para regenerar después de editar el HTML:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless --disable-gpu \
  --hide-scrollbars --window-size=1080,1350 \
  --screenshot=flyer/progresar-flyer-1080x1350.png "file://$PWD/flyer/flyer-feed.html"
```

(idem con `--window-size=1080,1920` y `flyer-story.html`)

Esta carpeta no entra al build: Vite sólo copia `public/`.
