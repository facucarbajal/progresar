import {
  BECA,
  MP_INICIAL,
  ENERGIA_INICIAL,
  ENERGIA_MAX,
  DRENAJE_DIARIO,
  PENALIDAD_NO_COMER,
  DIAS_SIN_COMER_LIMITE,
  PROB_TRUCHO_FALLA,
  BOLETOS,
} from './config.js'
import { DIAS } from './dias.js'
import { CARRERAS } from './carreras.js'
import { mensajeCierre } from './mensajes.js'

// Progreso de un día recién arrancado.
function diaLimpio() {
  return {
    momentoIndex: 0, // 0 o 1, según el 'orden' del día
    slots: {}, // { cuadernillo:true, lapicera:true, ... } requisitos cumplidos
    comprados: {}, // ids ya comprados (para no re-comprar)
    comioHoy: false,
    ultimoTrucho: null, // null | 'ok' | 'fallo' — feedback del impreso trucho
    truchoIntentos: 0, // el 1er intento de trucho del día siempre falla
  }
}

export const estadoInicial = {
  pantalla: 'landing', // 'landing' | 'carrera' | 'juego' | 'transicion' | 'final'
  carreraId: null,
  beca: BECA,
  mp: MP_INICIAL,
  energia: ENERGIA_INICIAL,
  diaIndex: 0,
  diasSinComer: 0,
  estudioAlguna: false, // ¿compró algún cuadernillo en toda la partida?
  comprasTotal: 0, // cantidad de cosas efectivamente compradas
  motivoFinal: null, // 'hambre' | 'sin_plata' | 'academico' | 'fin_semana'
  paroDia: null, // índice del día de paro (1=Martes o 2=Miércoles), o null
  dia: diaLimpio(),
  transicion: null,
}

// ~40% de las partidas tienen un día de paro, martes o miércoles al azar.
function sortearParo() {
  if (Math.random() >= 0.4) return null
  return Math.random() < 0.5 ? 1 : 2
}

// Plata total disponible (beca + lo poco de MP).
export function disponible(estado) {
  return estado.beca + estado.mp
}

// ¿El día actual es de paro? Ese día no se gasta un peso.
function esParo(estado) {
  return estado.paroDia === estado.diaIndex
}

// Descuenta un monto: primero de la beca, después de Mercado Pago.
function gastar(estado, monto) {
  const deBeca = Math.min(estado.beca, monto)
  const restante = monto - deBeca
  return { beca: estado.beca - deBeca, mp: estado.mp - restante }
}

function nuevaPartida(carreraId) {
  // El lunes NO se cobra SUBE: con los $28.000 tenés que poder comprar el
  // material y la comida del primer día. El boleto pega a partir del martes.
  return { ...estadoInicial, pantalla: 'juego', carreraId, paroDia: sortearParo() }
}

export function reducer(estado, accion) {
  switch (accion.tipo) {
    case 'IR_CARRERA':
      return { ...estado, pantalla: 'carrera' }

    case 'ELEGIR_CARRERA':
      return nuevaPartida(accion.carreraId)

    // Compra un útil de cursada. slotId opcional (si es requerido).
    case 'COMPRAR_UTIL': {
      const { util, slotId } = accion
      if (esParo(estado)) return estado
      if (estado.dia.comprados[util.id]) return estado
      if (disponible(estado) < util.costo) return estado
      const wallets = gastar(estado, util.costo)
      return {
        ...estado,
        ...wallets,
        comprasTotal: estado.comprasTotal + 1,
        dia: {
          ...estado.dia,
          comprados: { ...estado.dia.comprados, [util.id]: true },
          slots: slotId ? { ...estado.dia.slots, [slotId]: true } : estado.dia.slots,
        },
      }
    }

    // Compra el cuadernillo del día. version: 'original' | 'impreso'.
    case 'COMPRAR_CUADERNILLO': {
      if (esParo(estado)) return estado
      if (estado.dia.slots.cuadernillo) return estado // ya lo tenés
      if (disponible(estado) < accion.costo) return estado
      const wallets = gastar(estado, accion.costo)

      if (accion.version === 'impreso') {
        // El 1er intento de trucho del día siempre falla; los reintentos, 45%.
        const forzado = estado.dia.truchoIntentos === 0
        const falla = forzado || Math.random() < PROB_TRUCHO_FALLA
        return {
          ...estado,
          ...wallets,
          comprasTotal: estado.comprasTotal + (falla ? 0 : 1),
          estudioAlguna: estado.estudioAlguna || !falla,
          dia: {
            ...estado.dia,
            truchoIntentos: estado.dia.truchoIntentos + 1,
            slots: falla ? estado.dia.slots : { ...estado.dia.slots, cuadernillo: true },
            ultimoTrucho: falla ? 'fallo' : 'ok',
          },
        }
      }

      // Original: siempre sirve.
      return {
        ...estado,
        ...wallets,
        comprasTotal: estado.comprasTotal + 1,
        estudioAlguna: true,
        dia: {
          ...estado.dia,
          slots: { ...estado.dia.slots, cuadernillo: true },
          ultimoTrucho: null,
        },
      }
    }

    // Comprar comida (objetivo personal). Se puede comer varias veces.
    case 'COMER': {
      const { comida } = accion
      if (esParo(estado)) return estado
      if (disponible(estado) < comida.costo) return estado
      const wallets = gastar(estado, comida.costo)
      return {
        ...estado,
        ...wallets,
        comprasTotal: estado.comprasTotal + 1,
        energia: Math.min(ENERGIA_MAX, estado.energia + comida.energia),
        dia: { ...estado.dia, comioHoy: true },
      }
    }

    case 'LIMPIAR_ALERTA':
      return { ...estado, dia: { ...estado.dia, ultimoTrucho: null } }

    case 'SIGUIENTE_MOMENTO':
      return { ...estado, dia: { ...estado.dia, momentoIndex: 1 } }

    case 'VOLVER_MOMENTO':
      return { ...estado, dia: { ...estado.dia, momentoIndex: 0 } }

    // Cierre del día: única evaluación de derrota (hambre / sin plata).
    case 'TERMINAR_DIA': {
      const diaDef = DIAS[estado.diaIndex]
      const materia = CARRERAS.find((c) => c.id === estado.carreraId)
        .materiales[estado.diaIndex].materia
      const estudio = !!estado.dia.slots.cuadernillo
      const comio = estado.dia.comioHoy
      const esParoHoy = estado.paroDia === estado.diaIndex

      // 1) Hambre: sólo cuenta en días normales. En el paro descansás en casa.
      let diasSinComer = estado.diasSinComer
      let energia = estado.energia
      if (!esParoHoy) {
        diasSinComer = comio ? 0 : estado.diasSinComer + 1
        energia = Math.max(
          0,
          estado.energia - DRENAJE_DIARIO - (comio ? 0 : PENALIDAD_NO_COMER),
        )
        if (diasSinComer >= DIAS_SIN_COMER_LIMITE || energia <= 0) {
          return { ...estado, energia, diasSinComer, pantalla: 'final', motivoFinal: 'hambre' }
        }
      }

      const siguiente = estado.diaIndex + 1

      // 2) Sobreviviste la semana entera.
      if (siguiente >= DIAS.length) {
        return {
          ...estado,
          energia,
          diasSinComer,
          pantalla: 'final',
          motivoFinal: estado.estudioAlguna ? 'fin_semana' : 'academico',
        }
      }

      // 3) SUBE de mañana (gratis si mañana es paro: no viajás).
      const boleto = siguiente === estado.paroDia ? 0 : BOLETOS[siguiente]
      if (disponible(estado) < boleto) {
        return {
          ...estado,
          energia,
          diasSinComer,
          pantalla: 'final',
          motivoFinal: estado.estudioAlguna ? 'sin_plata' : 'academico',
        }
      }

      // 4) Pagás la SUBE y arranca el día siguiente (pantalla de transición).
      const wallets = gastar(estado, boleto)
      return {
        ...estado,
        ...wallets,
        energia,
        diasSinComer,
        diaIndex: siguiente,
        dia: diaLimpio(),
        pantalla: 'transicion',
        transicion: {
          finalizado: diaDef.nombre,
          siguiente: DIAS[siguiente].nombre,
          cierre: esParoHoy
            ? 'Hoy no hubo clases por el paro. Por lo menos no gastaste un peso.'
            : mensajeCierre({ estudio, comio, materia }),
          comio: esParoHoy ? true : comio,
          boleto,
        },
      }
    }

    case 'CONTINUAR':
      return { ...estado, pantalla: 'juego', transicion: null }

    case 'REINICIAR':
      return { ...estadoInicial, pantalla: 'carrera' }

    case 'VOLVER_LANDING':
      return { ...estadoInicial }

    default:
      return estado
  }
}
