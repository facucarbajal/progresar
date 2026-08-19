import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BotonPixel from '../components/BotonPixel.jsx'
import LogoProgresar from '../components/LogoProgresar.jsx'
import { pesos, BECA, BECA_ACTUALIZADA } from '../game/config.js'
import { DIAS } from '../game/dias.js'
import { disponible } from '../game/state.js'
import { textoFinal } from '../game/mensajes.js'
import { vibrar } from '../game/haptics.js'

const ENTERATE_URL = 'https://www.argentina.gob.ar/educacion/progresar'

// Cuánto compraba la beca en 2015 vs 2026.
const COMPARACION = [
  { item: '🧉 Yerba', y2015: '36 kg', y2026: '6 kg' },
  { item: '🚌 Colectivo', y2015: '300 viajes', y2026: '35 viajes' },
  { item: '🍽️ Almuerzos', y2015: '22', y2026: '5' },
  { item: '📄 Fotocopias', y2015: '1.531', y2026: '350' },
]

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
    deudaMonto: estado.deudaMonto,
  })

  // Vibración al llegar al game over.
  useEffect(() => {
    vibrar([90, 50, 90])
  }, [])

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

              <p className="text-[15px] leading-relaxed text-blanco">
                En 2014, una beca Progresar alcanzaba para{' '}
                <span className="font-pixel text-oro">34 kilos de yerba</span>. Hoy solo
                alcanza para <span className="font-pixel text-oro">6 kilos</span>.
              </p>

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

            {/* Comparador 2015 vs 2026 */}
            <div className="w-full borde-pixel border-celeste/60 bg-noche/60 p-4">
              <div className="font-pixel text-[11px] text-celeste/80 uppercase tracking-wide mb-3 text-center">
                Lo que compraba la beca
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="font-pixel text-xs">
                    <th className="text-oro py-1 border border-blanco/15">2015</th>
                    <th className="text-blanco/60 py-1 border border-blanco/15" />
                    <th className="text-naranja py-1 border border-blanco/15">2026</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARACION.map((f) => (
                    <tr key={f.item} className="text-sm">
                      <td className="font-pixel text-oro tabular-nums text-center py-1.5 border border-blanco/15">
                        {f.y2015}
                      </td>
                      <td className="text-blanco/90 text-center py-1.5 border border-blanco/15">
                        {f.item}
                      </td>
                      <td className="font-pixel text-naranja tabular-nums text-center py-1.5 border border-blanco/15">
                        {f.y2026}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <BotonPixel variante="primario">Compartir en X</BotonPixel>
              </a>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <BotonPixel variante="comprar">WhatsApp</BotonPixel>
              </a>
              <a href={ENTERATE_URL} target="_blank" rel="noopener noreferrer">
                <BotonPixel variante="oro">Enterate más</BotonPixel>
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
