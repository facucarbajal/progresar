// Dos pools separados. En la leyenda de cada día se cuela SIEMPRE una del
// gobierno y SIEMPRE una de la facu.

export const NOTICIAS_GOBIERNO = [
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
  'El gobierno eliminó el boleto estudiantil y lo reemplazó por "fe en el mercado".',
  'El ministro dijo que la pobreza "es una construcción zurda".',
  'Milei inauguró una estatua de la motosierra.',
  'El gobierno propuso arancelar la biblioteca.',
]

export const NOTICIAS_FACU = [
  'La fotocopiadora aumentó tres veces esta semana.',
  'El profesor titular renunció: se fue a manejar un Uber.',
  'El aula no tiene ni tiza, pero te piden el trabajo en PDF a color.',
  'Te anotaste en una materia que ya no existe.',
  'El apunte de la cátedra cuesta más que tu comida de la semana.',
  'El wifi de la facu anda peor que tu situación económica.',
  'Un compañero vende empanadas en el pasillo para pagar el cuatrimestre.',
  'El profe falta seguido: tiene otros dos laburos.',
  'Cerraron un baño de la facu "por ajuste".',
]

function alAzar(lista) {
  return lista[Math.floor(Math.random() * lista.length)]
}

export function noticiaGobierno() {
  return alAzar(NOTICIAS_GOBIERNO)
}

export function noticiaFacu() {
  return alAzar(NOTICIAS_FACU)
}
