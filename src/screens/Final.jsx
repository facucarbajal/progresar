import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BotonPixel from '../components/BotonPixel.jsx'
import LogoProgresar from '../components/LogoProgresar.jsx'
import { pesos, BECA, BECA_ACTUALIZADA } from '../game/config.js'
import { DIAS } from '../game/dias.js'
import { disponible } from '../game/state.js'
import { textoFinal } from '../game/mensajes.js'

// Pantalla de game over, dividida en dos pasos:
//   1) el desenlace de TU partida (game over + stats)
//   2) la bajada política (por qué pasa esto en serio)
export default function Final({ estado, dispatch }) {
  const [paso, setPaso] = useState(1)
  const diaNombre = DIAS[estado.diaIndex]?.nombre ?? 'el primer día'

  const t = textoFinal({
    motivo: estado.motivoFinal,
    diaNombre,
    carreraId: estado.carreraId,
    comprasTotal: estado.comprasTotal,
    diasCursados: estado.diaIndex + 1,
    plata: disponible(estado),
  })

  const textoCompartir = `Jugué a Progre$ar y me fundí el ${diaNombre}. La Beca Progresar es de ${pesos(
    BECA,
  )} y no se actualiza hace 2 años. Jugá vos:`
  const url = typeof window !== 'undefined' ? window.location.href : ''
  const twitter = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    textoCompartir,
  )}&url=${encodeURIComponent(url)}`
  const whatsapp = `https://wa.me/?text=${encodeURIComponent(textoCompartir + ' ' + url)}`

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {paso === 1 ? (
          // ---------- PASO 1: tu partida ----------
          <motion.div
            key="paso1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl flex flex-col items-center text-center gap-5"
          >
            <div className="text-5xl sm:text-6xl">{t.emoji}</div>
            <h1 className="font-titulo text-3xl sm:text-4xl text-rojo sombra-texto">
              GAME OVER
            </h1>
            <p className="font-titulo text-lg text-oro leading-tight">{t.titulo}</p>
            <p className="text-[15px] text-blanco/85 leading-relaxed">{t.cuerpo}</p>
            <p className="font-pixel text-[11px] text-celeste/80">{t.stats}</p>

            <BotonPixel variante="primario" onClick={() => setPaso(2)}>
              ▶ Seguir
            </BotonPixel>
          </motion.div>
        ) : (
          // ---------- PASO 2: la bajada ----------
          <motion.div
            key="paso2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl flex flex-col items-center text-center gap-5"
          >
            <div className="borde-pixel border-blanco bg-pizarra/70 shadow-pixel p-4 sm:p-5 flex flex-col gap-4 text-left">
              <LogoProgresar size="md" className="justify-center" />

              <p className="text-[15px] leading-relaxed text-blanco">
                La <span className="font-pixel text-celeste">Beca Progresar</span> fue
                creada por Cristina Fernández de Kirchner para impulsar el estudio de pibes
                y pibas entre 18 y 24 años.
              </p>

              <div className="flex flex-col gap-2">
                <p className="text-[15px] leading-relaxed text-blanco">
                  En 2014, una beca Progresar alcanzaba para{' '}
                  <span className="font-pixel text-oro">34 kilos de yerba</span>:
                </p>
                <div className="text-xl sm:text-2xl leading-relaxed tracking-wide">
                  🧉🧉🧉🧉🧉🧉🧉🧉🧉🧉🧉
                </div>
                <p className="text-[15px] leading-relaxed text-blanco">
                  Hoy solo alcanza para <span className="font-pixel text-oro">6 kilos</span>:
                </p>
                <div className="text-xl sm:text-2xl leading-relaxed tracking-wide">
                  🧉🧉 <span className="align-middle">📉</span>
                </div>
              </div>

              <p className="text-[15px] leading-relaxed text-blanco">
                Hay una ley que obliga a Milei a duplicar la plata que ofrece el Progresar.
                El presidente no la cumple. Es la misma ley que aumenta el sueldo de los
                docentes universitarios.
              </p>

              <p className="text-[15px] leading-relaxed text-blanco">
                Comparada con 2015, la beca debería ser de{' '}
                <span className="font-pixel text-oro">{pesos(BECA_ACTUALIZADA)}</span>.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <BotonPixel variante="primario">Compartir en X</BotonPixel>
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <BotonPixel variante="oro">WhatsApp</BotonPixel>
              </a>
            </div>

            <div className="flex items-center gap-3">
              <BotonPixel variante="fantasma" onClick={() => setPaso(1)}>
                ◄ Volver
              </BotonPixel>
              <BotonPixel variante="fantasma" onClick={() => dispatch({ tipo: 'REINICIAR' })}>
                ↺ Volver a intentar
              </BotonPixel>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
