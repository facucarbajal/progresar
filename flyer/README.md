# Flyers de lanzamiento

## Para imprimir y volantear

Van en **blanco y negro**, pensados para fotocopiadora: fondo blanco, tinta negra,
sin las scanlines del CRT (en láser se empastan y se comen el tóner). Lo que sí
queda es la trama cuadriculada — la grilla de cuaderno (fina cada 24 px, gruesa
cada 96) más una cenefa de damero arriba y abajo —, porque en B/N el fondo liso
queda chato. Un velo blanco con máscara radial la desvanece detrás del texto para
no comerle legibilidad. Los únicos bloques de tinta plena son el cartel del
objetivo (invertido) y el damero.

- `progresar-volante-A4-2up.pdf` — **el que se manda a imprimir**: A4 apaisado
  (297×210 mm) con dos volantes A5 iguales y una guía de corte punteada al medio.
  Imprimir a tamaño real (*escala 100%*, no "ajustar a la página") y cortar por la línea.
- `progresar-volante-A5.pdf` / `.png` — un volante suelto, A5 (148,5×210 mm) a 300 dpi.

Los flyers de redes siguen a color; el que cambia de paleta es sólo `flyer-a5.html`.

## Para redes

- `progresar-flyer-1080x1350.png` — feed (Instagram / Twitter).
- `progresar-flyer-1080x1920.png` — story.

## Fuente

Los `.html` son la fuente de cada tamaño: paleta del juego, todo el texto en
Archivo Black (embebida en base64, así renderiza sin internet), el wordmark
`progre$ar+` con el celeste pasado a blanco, la grilla + scanlines de
`.fondo-grilla` y el QR inline.

`qr-progresar.png` (oro/noche, para redes) y `qr-progresar-bn.png` (negro sobre
blanco, para el impreso) apuntan a https://progresar.pages.dev, con nivel de
corrección Q y zona de silencio de 4 módulos. Si cambia el dominio hay que
regenerarlos:

```bash
python3 -c "import segno; segno.make('https://TU-DOMINIO', error='q').save('flyer/qr-progresar.png', scale=24, border=4, dark='#1a1c2c', light='#ffcd75')"
```

y volver a embeberlo en los HTML (van como `data:image/png;base64,…`).

Para regenerar los PNG después de editar un HTML:

```bash
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
"$CHROME" --headless --disable-gpu --hide-scrollbars --window-size=1080,1350 \
  --screenshot=flyer/progresar-flyer-1080x1350.png "file://$PWD/flyer/flyer-feed.html"
# A5: la mitad en px CSS y el doble de escala => 1754×2480 = 300 dpi exactos
"$CHROME" --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=2 \
  --window-size=877,1240 --screenshot=flyer/progresar-volante-A5.png "file://$PWD/flyer/flyer-a5.html"
```

El PDF 2-up se arma pegando el A5 dos veces con PIL y guardando a `resolution=300`.

Esta carpeta no entra al build: Vite sólo copia `public/`.
