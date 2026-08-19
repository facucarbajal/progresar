import { AnimatePresence, motion } from 'framer-motion'
import Billetera from '../components/Billetera.jsx'
import BarraEnergia from '../components/BarraEnergia.jsx'
import DialogBox from '../components/DialogBox.jsx'
import Tienda, { ProductoCard } from '../components/Tienda.jsx'
import BotonPixel from '../components/BotonPixel.jsx'
import Alerta from '../components/Alerta.jsx'
import EventoCard from '../components/EventoCard.jsx'
import { getCarrera } from '../game/carreras.js'
import { DIAS } from '../game/dias.js'
import { getUtil, COMIDA } from '../game/items.js'
import { disponible } from '../game/state.js'
import { pesos, CHANGA_MONTOS, CREDITOS } from '../game/config.js'

function sprite(energia) {
  if (energia <= 25) return '😩'
  if (energia <= 50) return '😕'
  return '🙂'
}

// Tarjeta especial del cuadernillo: original (seguro) vs impreso trucho (riesgo).
function CuadernilloCard({ material, comprado, plata, dispatch }) {
  return (
    <div
      className={`borde-pixel p-3 flex flex-col gap-2 bg-noche/60 ${
        comprado ? 'border-verde/70' : 'border-oro/70'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm sm:text-base leading-tight">
          📓 {material.nombre}
          <span className="block text-[11px] text-blanco/50">{material.materia}</span>
        </span>
      </div>

      {comprado ? (
        <div className="font-pixel text-[10px] text-verde">✓ Ya lo tenés</div>
      ) : (
        <div className="flex flex-col gap-2">
          <BotonPixel
            variante="oro"
            disabled={plata < material.original}
            onClick={() =>
              dispatch({
                tipo: 'COMPRAR_CUADERNILLO',
                version: 'original',
                costo: material.original,
                nombre: material.nombre,
              })
            }
            className="w-full !py-2"
          >
            Original · {pesos(material.original)}
          </BotonPixel>
          <BotonPixel
            variante="fantasma"
            disabled={plata < material.impreso}
            onClick={() =>
              dispatch({
                tipo: 'COMPRAR_CUADERNILLO',
                version: 'impreso',
                costo: material.impreso,
                nombre: material.nombre,
              })
            }
            className="w-full !py-2"
          >
            Imprimir trucho · {pesos(material.impreso)} <span className="text-naranja">⚠</span>
          </BotonPixel>
        </div>
      )}
    </div>
  )
}

export default function Juego({ estado, dispatch }) {
  const carrera = getCarrera(estado.carreraId)
  const diaDef = DIAS[estado.diaIndex]
  const material = carrera.materiales[estado.diaIndex]
  const { momentoIndex, slots, comprados, comioHoy, ultimoTrucho } = estado.dia
  const momentoTipo = diaDef.orden[momentoIndex]
  const plata = disponible(estado)

  // Útiles requeridos del día (los que no son el cuadernillo).
  const utilesRequeridos = diaDef.requeridosCursada
    .filter((s) => s !== 'cuadernillo')
    .map((id) => getUtil(id))
    .filter(Boolean)

  const esUltimoMomento = momentoIndex === diaDef.orden.length - 1
  const esParo = estado.paroDia === estado.diaIndex

  // Día de paro: no hay clase ni tienda. No se gasta un peso.
  if (esParo) {
    return (
      <div className="min-h-full flex justify-center p-3 sm:p-4">
        <EventoCard evento={estado.evento} onCerrar={() => dispatch({ tipo: 'LIMPIAR_EVENTO' })} />
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <span className="font-titulo text-xl sm:text-2xl text-celeste sombra-texto">
              {diaDef.nombre}
            </span>
            <span className="text-[11px] text-blanco/60">
              {carrera.emoji} {carrera.nombre}
            </span>
          </div>

          <Billetera beca={estado.beca} mp={estado.mp} movimiento={estado.ultimoMovimiento} />
          <BarraEnergia energia={estado.energia} />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="borde-pixel border-naranja bg-naranja/15 shadow-pixel-lg p-6 text-center flex flex-col gap-4"
          >
            <div className="text-5xl">🚫</div>
            <h2 className="font-titulo text-3xl sm:text-4xl text-naranja sombra-texto">
              PARO
            </h2>
            <p className="text-lg sm:text-xl text-blanco leading-relaxed">
              Tus profesores no cobran hace 3 meses y hoy no dan clase.
            </p>
          </motion.div>

          <BotonPixel
            variante="primario"
            onClick={() => dispatch({ tipo: 'TERMINAR_DIA' })}
            className="w-full"
          >
            Seguir ▶
          </BotonPixel>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-full flex justify-center p-3 sm:p-4">
      <Alerta
        mensaje={
          ultimoTrucho === 'fallo'
            ? 'El impreso no se lee un carajo. Plata tirada, probá de nuevo.'
            : null
        }
        onCerrar={() => dispatch({ tipo: 'LIMPIAR_ALERTA' })}
      />
      {!ultimoTrucho && (
        <EventoCard evento={estado.evento} onCerrar={() => dispatch({ tipo: 'LIMPIAR_EVENTO' })} />
      )}

      <div className="w-full max-w-2xl flex flex-col gap-3">
        {/* Header: día + sprite + billetera + energía */}
        <div className="flex items-center justify-between">
          <span className="font-titulo text-xl sm:text-2xl text-celeste sombra-texto">
            {diaDef.nombre}
          </span>
          <div className="flex items-center gap-3">
            <span className="text-2xl">{sprite(estado.energia)}</span>
            <span className="text-[11px] text-blanco/60">
              {carrera.emoji} {carrera.nombre}
            </span>
          </div>
        </div>

        <Billetera beca={estado.beca} mp={estado.mp} movimiento={estado.ultimoMovimiento} />
        <BarraEnergia energia={estado.energia} />

        {momentoIndex === 0 && (
          <AnimatePresence mode="wait">
            <DialogBox key={estado.diaIndex}>{diaDef.narrativa}</DialogBox>
          </AnimatePresence>
        )}

        {/* Contenido del momento activo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={momentoTipo + momentoIndex}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
          >
            {momentoTipo === 'cursada' ? (
              <Tienda titulo="🛒 Librería — materiales de cursada">
                <CuadernilloCard
                  material={material}
                  comprado={!!slots.cuadernillo}
                  plata={plata}
                  dispatch={dispatch}
                />
                {utilesRequeridos.map((u) => (
                  <ProductoCard
                    key={u.id}
                    emoji={u.emoji}
                    nombre={u.nombre}
                    costo={u.costo}
                    requerido
                    comprado={!!comprados[u.id]}
                    alcanza={plata >= u.costo}
                    onComprar={() =>
                      dispatch({ tipo: 'COMPRAR_UTIL', util: u, slotId: u.id })
                    }
                  />
                ))}
              </Tienda>
            ) : (
              <Tienda titulo="🥐 Kiosco — algo para recargar energía">
                {COMIDA.map((c) => (
                  <ProductoCard
                    key={c.id}
                    emoji={c.emoji}
                    nombre={c.nombre}
                    costo={c.costo}
                    alcanza={plata >= c.costo}
                    onComprar={() => dispatch({ tipo: 'COMER', comida: c })}
                  />
                ))}
              </Tienda>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Changas y crédito */}
        <div className="borde-pixel border-blanco/40 bg-noche/50 p-3 flex flex-col gap-2">
          <div className="font-pixel text-[11px] text-celeste/80 uppercase tracking-wide">
            🤝 ¿Necesitás plata?
          </div>
          <div className="grid sm:grid-cols-3 gap-2">
            <BotonPixel
              variante="comprar"
              disabled={estado.dia.changaHecha}
              onClick={() =>
                dispatch({
                  tipo: 'CHANGA',
                  monto: CHANGA_MONTOS[Math.floor(Math.random() * CHANGA_MONTOS.length)],
                })
              }
              className="!py-2"
            >
              {estado.dia.changaHecha ? 'Changa hecha ✓' : 'Changa (+$, −energía)'}
            </BotonPixel>
            {CREDITOS.map((cr) => (
              <BotonPixel
                key={cr.recibe}
                variante="fantasma"
                disabled={!!estado.deuda}
                onClick={() => dispatch({ tipo: 'CREDITO', recibe: cr.recibe, paga: cr.paga })}
                className="!py-2"
              >
                Crédito +{pesos(cr.recibe)} <span className="text-naranja">(debés {pesos(cr.paga)})</span>
              </BotonPixel>
            ))}
          </div>
          {estado.deuda && (
            <p className="text-[11px] text-naranja leading-relaxed">
              ⚠ Debés {pesos(estado.deuda.montoPagar)} del crédito. Te lo descuentan el{' '}
              {DIAS[estado.deuda.diaVence]?.nombre ?? 'finde'}.
            </p>
          )}
        </div>

        {/* Navegación entre momentos / fin de día */}
        <div className="flex items-center gap-2 pt-1">
          {momentoIndex > 0 && (
            <BotonPixel
              variante="fantasma"
              onClick={() => dispatch({ tipo: 'VOLVER_MOMENTO' })}
              className="!py-2"
            >
              ◄
            </BotonPixel>
          )}
          {esUltimoMomento ? (
            <BotonPixel
              variante="primario"
              onClick={() => dispatch({ tipo: 'TERMINAR_DIA' })}
              className="flex-1"
            >
              Terminar el día ▶
            </BotonPixel>
          ) : (
            <BotonPixel
              variante="primario"
              onClick={() => dispatch({ tipo: 'SIGUIENTE_MOMENTO' })}
              className="flex-1"
            >
              Siguiente ▶
            </BotonPixel>
          )}
        </div>
      </div>
    </div>
  )
}
