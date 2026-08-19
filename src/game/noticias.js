// Titulares bizarros del gobierno que se cuelan en la leyenda de cierre del día.
// Redactados para leerse bien en el medio de un párrafo.
export const NOTICIAS = [
  'El gobierno cerró la facultad de Medicina pero abrió un casino online.',
  'El ministro de Economía inauguró una heladería en Palermo.',
  'Milei viajó a Estados Unidos a una fiesta de disfraces.',
  'Milei clonó a su perro y lo llamó Superávit.',
  'El gobierno recortó el comedor universitario pero regaló gorras.',
  'El vocero aclaró que la universidad es un privilegio, no un derecho.',
  'Milei tuiteó 47 veces entre las 3 y las 5 de la mañana.',
  'El ministro recomendó que si no te alcanza la beca, emprendas.',
  'El dólar bajó 2 pesos y lo anunciaron 40 minutos en cadena nacional.',
  'Un asesor estrella sugirió comer menos y trabajar más.',
  'El gobierno cerró un instituto pero abrió una casa de apuestas deportivas.',
  'Milei felicitó a un influencer por bancar el ajuste.',
]

export function noticiaAlAzar() {
  return NOTICIAS[Math.floor(Math.random() * NOTICIAS.length)]
}
