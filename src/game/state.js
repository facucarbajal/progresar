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
  EVENTO_PROB,
  CHANGA_ENERGIA,
  pesos,
} from './config.js'
import { DIAS } from './dias.js'
import { CARRERAS } from './carreras.js'
import { mensajeCierre } from './mensajes.js'
import { eventoAlAzar } from './eventos.js'
import { noticiaAlAzar } from './noticias.js'

// Progreso de un día recién arrancado.
function diaLimpio() {
  return {
    momentoIndex: 0,
    slots: {},
    comprados: {},
    comioHoy: false,
    changaHecha: false,
    ultimoTrucho: null,
    truchoIntentos: 0,
    compras: [], // [{ nombre, costo }] para el resumen del día
  }
}

export const estadoInicial = {
  pantalla: 'landing',
  carreraId: null,
  beca: BECA,
  mp: MP_INICIAL,
  energia: ENERGIA_INICIAL,
  diaIndex: 0,
  diasSinComer: 0,
  estudioAlguna: false,
  diasEstudiados: 0,
  changasTotal: 0,
  comprasTotal: 0,
  deuda: null, // { montoPagar, diaVence } del crédito de Mercado Pago
  deudaMonto: 0, // para el mensaje del final 'credito'
  evento: null, // evento aleatorio a mostrar (ya aplicado)
  ultimoMovimiento: { monto: 0, id: 0 }, // para animar la plata volando
  motivoFinal: null,
  paroDia: null,
  dia: diaLimpio(),
  transicion: null,
}

// ~40% de las partidas tienen un día de paro, martes o miércoles al azar.
function sortearParo() {
  if (Math.random() >= 0.4) return null
  return Math.random() < 0.5 ? 1 : 2
}

export function disponible(estado) {
  return estado.beca + estado.mp
}

function esParo(estado) {
  return estado.paroDia === estado.diaIndex
}

// Descuenta un monto: primero de la beca, después de Mercado Pago.
function gastar(estado, monto) {
  const deBeca = Math.min(estado.beca, monto)
  const restante = monto - deBeca
  return { beca: estado.beca - deBeca, mp: estado.mp - restante }
}

function nextMovId(estado) {
  return estado.ultimoMovimiento.id + 1
}

// Gasta y registra el movimiento (para la animación de plata volando).
function gastarMov(estado, monto) {
  return { ...gastar(estado, monto), ultimoMovimiento: { monto: -monto, id: nextMovId(estado) } }
}

// Ingreso de plata (va a Mercado Pago) + movimiento.
function ganarMov(estado, monto) {
  return { mp: estado.mp + monto, ultimoMovimiento: { monto, id: nextMovId(estado) } }
}

function nuevaPartida(carreraId) {
  return { ...estadoInicial, pantalla: 'juego', carreraId, paroDia: sortearParo() }
}

// Override de motivo: si changuearon mucho y estudiaron poco, dejaron la facu.
function resolverMotivo(estado, base) {
  if (estado.changasTotal >= 2 && estado.diasEstudiados <= 1) return 'changa'
  return base
}

export function reducer(estado, accion) {
  switch (accion.tipo) {
    case 'IR_CARRERA':
      return { ...estado, pantalla: 'carrera' }

    case 'ELEGIR_CARRERA':
      return nuevaPartida(accion.carreraId)

    case 'COMPRAR_UTIL': {
      const { util, slotId } = accion
      if (esParo(estado)) return estado
      if (estado.dia.comprados[util.id]) return estado
      if (disponible(estado) < util.costo) return estado
      return {
        ...estado,
        ...gastarMov(estado, util.costo),
        comprasTotal: estado.comprasTotal + 1,
        dia: {
          ...estado.dia,
          comprados: { ...estado.dia.comprados, [util.id]: true },
          slots: slotId ? { ...estado.dia.slots, [slotId]: true } : estado.dia.slots,
          compras: [...estado.dia.compras, { nombre: util.nombre, costo: util.costo }],
        },
      }
    }

    case 'COMPRAR_CUADERNILLO': {
      if (esParo(estado)) return estado
      if (estado.dia.slots.cuadernillo) return estado
      if (disponible(estado) < accion.costo) return estado
      const wallets = gastarMov(estado, accion.costo)
      const nombre = accion.nombre ?? 'Material'

      if (accion.version === 'impreso') {
        const forzado = estado.dia.truchoIntentos === 0
        const falla = forzado || Math.random() < PROB_TRUCHO_FALLA
        return {
          ...estado,
          ...wallets,
          comprasTotal: estado.comprasTotal + (falla ? 0 : 1),
          estudioAlguna: estado.estudioAlguna || !falla,
          diasEstudiados: estado.diasEstudiados + (falla ? 0 : 1),
          dia: {
            ...estado.dia,
            truchoIntentos: estado.dia.truchoIntentos + 1,
            slots: falla ? estado.dia.slots : { ...estado.dia.slots, cuadernillo: true },
            ultimoTrucho: falla ? 'fallo' : 'ok',
            compras: [
              ...estado.dia.compras,
              { nombre: `${nombre} (impreso${falla ? ', no se leyó' : ''})`, costo: accion.costo },
            ],
          },
        }
      }

      return {
        ...estado,
        ...wallets,
        comprasTotal: estado.comprasTotal + 1,
        estudioAlguna: true,
        diasEstudiados: estado.diasEstudiados + 1,
        dia: {
          ...estado.dia,
          slots: { ...estado.dia.slots, cuadernillo: true },
          ultimoTrucho: null,
          compras: [...estado.dia.compras, { nombre, costo: accion.costo }],
        },
      }
    }

    case 'COMER': {
      const { comida } = accion
      if (esParo(estado)) return estado
      if (disponible(estado) < comida.costo) return estado
      return {
        ...estado,
        ...gastarMov(estado, comida.costo),
        comprasTotal: estado.comprasTotal + 1,
        energia: Math.min(ENERGIA_MAX, estado.energia + comida.energia),
        dia: {
          ...estado.dia,
          comioHoy: true,
          compras: [...estado.dia.compras, { nombre: comida.nombre, costo: comida.costo }],
        },
      }
    }

    // Changa: ganás plata a cambio de energía. Una por día.
    case 'CHANGA': {
      if (esParo(estado)) return estado
      if (estado.dia.changaHecha) return estado
      return {
        ...estado,
        ...ganarMov(estado, accion.monto),
        changasTotal: estado.changasTotal + 1,
        energia: Math.max(0, estado.energia - CHANGA_ENERGIA),
        dia: { ...estado.dia, changaHecha: true },
      }
    }

    // Crédito de Mercado Pago: plata ya, deuda en 2 días. Uno por vez.
    case 'CREDITO': {
      if (esParo(estado)) return estado
      if (estado.deuda) return estado
      return {
        ...estado,
        ...ganarMov(estado, accion.recibe),
        deuda: { montoPagar: accion.paga, diaVence: estado.diaIndex + 2 },
      }
    }

    case 'LIMPIAR_ALERTA':
      return { ...estado, dia: { ...estado.dia, ultimoTrucho: null } }

    case 'LIMPIAR_EVENTO':
      return { ...estado, evento: null }

    case 'SIGUIENTE_MOMENTO':
      return { ...estado, dia: { ...estado.dia, momentoIndex: 1 } }

    case 'VOLVER_MOMENTO':
      return { ...estado, dia: { ...estado.dia, momentoIndex: 0 } }

    case 'TERMINAR_DIA': {
      const diaDef = DIAS[estado.diaIndex]
      const materia = CARRERAS.find((c) => c.id === estado.carreraId)
        .materiales[estado.diaIndex].materia
      const estudio = !!estado.dia.slots.cuadernillo
      const comio = estado.dia.comioHoy
      const esParoHoy = esParo(estado)
      const compras = estado.dia.compras
      const totalGastado = compras.reduce((a, c) => a + c.costo, 0)

      // 1) Hambre (sólo en días normales).
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

      // 2) Sobreviviste la semana.
      if (siguiente >= DIAS.length) {
        return {
          ...estado,
          energia,
          diasSinComer,
          pantalla: 'final',
          motivoFinal: resolverMotivo(estado, estado.estudioAlguna ? 'fin_semana' : 'academico'),
        }
      }

      // 3) SUBE de mañana (gratis si mañana es paro).
      const boleto = siguiente === estado.paroDia ? 0 : BOLETOS[siguiente]
      if (disponible(estado) < boleto) {
        return {
          ...estado,
          energia,
          diasSinComer,
          pantalla: 'final',
          motivoFinal: resolverMotivo(estado, estado.estudioAlguna ? 'sin_plata' : 'academico'),
        }
      }

      // 4) Pagás la SUBE y arranca el día siguiente.
      const wallets = boleto > 0 ? gastarMov(estado, boleto) : {}
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
          numeroSiguiente: siguiente + 1,
          cierre: esParoHoy
            ? `Hoy no hubo clases por el paro. ${noticiaAlAzar()}`
            : mensajeCierre({ estudio, comio, materia, noticia: noticiaAlAzar() }),
          boleto,
          compras,
          totalGastado,
        },
      }
    }

    case 'CONTINUAR': {
      let s = { ...estado, pantalla: 'juego', transicion: null, evento: null }

      // 1) Cobro del crédito si venció.
      if (s.deuda && s.diaIndex >= s.deuda.diaVence) {
        const monto = s.deuda.montoPagar
        if (disponible(s) < monto) {
          return { ...s, deuda: null, deudaMonto: monto, pantalla: 'final', motivoFinal: 'credito' }
        }
        s = {
          ...s,
          ...gastarMov(s, monto),
          deuda: null,
          evento: { emoji: '📵', texto: `Mercado Pago te descontó ${pesos(monto)} del crédito.` },
        }
      }

      // 2) Evento aleatorio (si no cayó el del crédito y no es paro).
      if (!s.evento && !esParo(s) && Math.random() < EVENTO_PROB) {
        const ev = eventoAlAzar()
        if (ev.dinero) {
          s = ev.dinero >= 0 ? { ...s, ...ganarMov(s, ev.dinero) } : { ...s, ...gastarMov(s, -ev.dinero) }
        }
        if (ev.energia) {
          s = { ...s, energia: Math.max(0, Math.min(ENERGIA_MAX, s.energia + ev.energia)) }
        }
        s = { ...s, evento: ev }
      }

      return s
    }

    case 'REINICIAR':
      return { ...estadoInicial, pantalla: 'carrera' }

    case 'VOLVER_LANDING':
      return { ...estadoInicial }

    default:
      return estado
  }
}
