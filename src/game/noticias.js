// Titulares bizarros de la "cadena oficialista" que pasan en el ticker al
// terminar el día. Tono simpatizante del gobierno (violeta).
export const NOTICIAS = [
  'El ministro de Economía inauguró una heladería en Palermo.',
  'Milei viajó a Estados Unidos a una fiesta de disfraces.',
  'Milei clonó a su perro y lo llamó Superávit.',
  'Vocero oficial: “La universidad es un privilegio, no un derecho”.',
  'El Presidente felicitó a un influencer por bancar el ajuste.',
  'El dólar bajó 2 pesos y lo anunciaron 40 minutos en cadena nacional.',
  'Recortaron el comedor universitario pero regalaron gorras.',
  'Milei tuiteó 47 veces entre las 3 y las 5 de la mañana.',
  'El ministro dijo que si no te alcanza la beca, “que emprendas”.',
  'Cerraron una facultad pero abrieron un casino online.',
  'El asesor estrella recomendó “comer menos y trabajar más”.',
  'Nuevo récord: la motosierra fue tapa de una revista extranjera.',
  'Oficial: “El que quiere estudiar, que se pague un profesor particular”.',
]

export function noticiaAlAzar() {
  return NOTICIAS[Math.floor(Math.random() * NOTICIAS.length)]
}
