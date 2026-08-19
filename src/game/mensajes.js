import { pesos } from './config.js'

// Mensaje de cierre del día, según si estudiaste (compraste el cuadernillo) y si
// comiste ese día. Se muestra en la pantalla de transición.
export function mensajeCierre({ estudio, comio, materia }) {
  if (estudio && comio) {
    return 'Cursaste, entendiste algo y hasta comiste. Un lujo que con esta beca no vas a poder repetir muchas veces.'
  }
  if (estudio && !comio) {
    return 'Te sabés de memoria los capítulos 1, 2 y 3, pero no podés ni caminar del hambre. Mañana será un nuevo día…'
  }
  if (!estudio && comio) {
    return 'Pegaste buena onda con el del comedor y te recomendó un par de cátedras. No leíste los capítulos del cuadernillo y te pasás toda la clase mirando la serie de Moria.'
  }
  return `Te dormís en ${materia}. Un compañero te da un mate y revivís. No tenés ni una lapicera en la mano y el profesor ya te tomó de punto.`
}

// Remates por carrera para el final "sin plata" (el del boleto). Rotan al azar.
const REMATES = {
  derecho: [
    '¿Litigar? Será en otra vida…',
    'Del Código Civil al código de barras del kiosco.',
  ],
  economia: [
    'Tanto estudiar el mercado para terminar atendiéndolo.',
    'Proyectaste todo, menos que no ibas a llegar a fin de mes.',
  ],
  artes: [
    'Tu obra maestra va a tener que esperar. Por ahora, dulces.',
    'La única muestra que vas a colgar es la del delantal del laburo.',
  ],
  biologia: [
    'La única célula que vas a mirar es la del molinete.',
    'Evolucionaste… a pluriempleado.',
  ],
  'cs-politica': [
    'Ibas a cambiar el sistema. El sistema te cambió a vos.',
    'Militaste toda la campaña y te ajustaron igual.',
  ],
  ingenieria: [
    'Ibas a construir puentes. Terminaste cruzando el mostrador.',
    'Calculaste todo menos la inflación.',
  ],
}

function remateAlAzar(carreraId) {
  const lista = REMATES[carreraId]
  if (!lista) return ''
  return lista[Math.floor(Math.random() * lista.length)]
}

// Texto del game over según el motivo.
// motivo: 'hambre' | 'sin_plata' | 'academico' | 'fin_semana' | 'credito' | 'changa'
export function textoFinal({
  motivo,
  diaNombre,
  carreraId,
  comprasTotal,
  diasCursados,
  plata,
  deudaMonto,
}) {
  const stats = `Compraste ${comprasTotal} ${comprasTotal === 1 ? 'cosa' : 'cosas'} en ${diasCursados} ${diasCursados === 1 ? 'día' : 'días'} de cursada.`

  switch (motivo) {
    case 'hambre':
      return {
        emoji: '😵',
        titulo: '¡Te desmayaste!',
        cuerpo: `No comés hace 3 días y te agarró un mareo en el pasillo de la facu. Te llevan a la enfermería y lo único que hay es una gaseosa vencida. Caíste el ${diaNombre}.`,
        stats,
      }
    case 'academico':
      return {
        emoji: '📉',
        titulo: 'Te llevaste todo a diciembre',
        cuerpo: `Querés imprimir las fotocopias de tus ${diasCursados} materias y no te queda un peso. Leés todo del celular y te estalla la cabeza. Te atrasás con la cursada, llega el primer parcial y no podés responder una sola consigna. ¿Y si mejor probás suerte con la ruleta?`,
        stats,
      }
    case 'credito':
      return {
        emoji: '📵',
        titulo: 'Te ahogó el crédito',
        cuerpo: `El crédito de Mercado Pago te comió. Debés ${pesos(
          deudaMonto ?? 0,
        )} y ni eso tenés. Te escribe un estudio de abogados.`,
        stats,
      }
    case 'changa':
      return {
        emoji: '🧉',
        titulo: 'Colgaste los libros',
        cuerpo: 'Hiciste tantas changas que dejaste la facu. En el kiosco te ascendieron a encargado. Progresar era esto, ¿no?',
        stats,
      }
    case 'fin_semana':
      return {
        emoji: '🥴',
        titulo: 'Llegaste al viernes… de arrastre',
        cuerpo: 'Sobreviviste la semana raspando, pero al fin de mes no llegás ni en pedo. Y arranca una nueva.',
        stats,
      }
    case 'sin_plata':
    default:
      return {
        emoji: '💸',
        titulo: 'Se te acabó la beca',
        cuerpo: `Es ${diaNombre}, aumentó el boleto y ya no te queda plata para la SUBE. Preferís jugarte los ${pesos(
          plata,
        )} que te quedaron a que gana Boca. Pensás en pedir un crédito en Mercado Pago, pero todavía estás pagando el anterior. Encontrás un laburo de 8hs en un kiosco por $350.000. ${remateAlAzar(
          carreraId,
        )}`,
        stats,
      }
  }
}
