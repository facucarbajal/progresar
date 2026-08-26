import { useEffect, useState } from 'react'
import { AnimatePresence, m } from 'framer-motion'
import BotonPixel from '../components/BotonPixel.jsx'
import LogoProgresar from '../components/LogoProgresar.jsx'
import { pesos, BECA, BECA_ACTUALIZADA } from '../game/config.js'
import { DIAS } from '../game/dias.js'
import { disponible } from '../game/state.js'
import { textoFinal } from '../game/mensajes.js'
import { vibrar } from '../game/haptics.js'

const ENTERATE_URL = 'https://www.instagram.com/lacamporauniversidad/'

// Cuánto compraba la beca en 2015 vs 2026. La primera fila es el monto.
const COMPARACION = [
  { item: '💵 Monto', y2015: pesos(BECA_ACTUALIZADA), y2026: pesos(BECA), destacado: true },
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
          <m.div
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
          </m.div>
        ) : (
          // ---------- PASO 2: la bajada ----------
          <m.div
            key="paso2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl sm:max-w-3xl flex flex-col items-center text-center gap-5"
          >
            <div className="w-full max-w-xl borde-pixel border-blanco bg-pizarra/70 shadow-pixel p-4 sm:p-5 flex flex-col gap-4 text-left">
              <LogoProgresar size="md" className="justify-center" />

              <p className="text-[15px] leading-relaxed text-blanco">
                La <span className="font-pixel text-celeste">Beca Progresar</span> fue
                creada por Cristina Fernández de Kirchner para impulsar el estudio de pibes
                y pibas entre 18 y 24 años.
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

            {/* Comparador 2015 vs 2026, flanqueado por las figuras recortadas */}
            <div className="w-full borde-pixel border-celeste/60 bg-noche/60 p-3 sm:p-4 flex flex-col gap-3">
              <h2 className="font-titulo text-lg sm:text-xl text-blanco text-center leading-tight">
                ¿Para cuánto alcanza el Progresar?
              </h2>

              <div className="flex items-center justify-center gap-3">
                <img
                  src="/cfk.png"
                  alt="Cristina Fernández de Kirchner"
                  className="hidden sm:block w-32 shrink-0 select-none pointer-events-none"
                />

                <table className="flex-1 min-w-0 border-collapse">
                  <thead>
                  <tr>
                    <th className="w-1/3 pb-2 align-bottom font-titulo text-xs sm:text-base text-oro uppercase leading-tight">
                      Con Cristina
                      <img
                        src="/cfk.png"
                        alt=""
                        className="sm:hidden w-20 mx-auto mt-1 select-none pointer-events-none"
                      />
                    </th>
                    <th className="w-1/3" />
                    <th className="w-1/3 pb-2 align-bottom font-titulo text-xs sm:text-base text-naranja uppercase leading-tight">
                      Con Milei
                      <img
                        src="/milei.png"
                        alt=""
                        className="sm:hidden w-20 mx-auto mt-1 select-none pointer-events-none"
                      />
                    </th>
                  </tr>
                  <tr className="font-titulo text-xs sm:text-sm">
                    <th className="text-oro py-1 border border-blanco/15">2015</th>
                    <th className="text-blanco/60 py-1 border border-blanco/15" />
                    <th className="text-naranja py-1 border border-blanco/15">2026</th>
                  </tr>
                  </thead>
                  <tbody>
                  {COMPARACION.map((f) => (
                    <tr key={f.item} className="text-xs sm:text-sm">
                      <td
                        className={`font-titulo tabular-nums text-center py-1.5 border border-blanco/15 ${
                          f.destacado ? 'text-blanco text-sm sm:text-base' : 'text-oro'
                        }`}
                      >
                        {f.y2015}
                      </td>
                      <td className="text-blanco/90 text-center py-1.5 border border-blanco/15">
                        {f.item}
                      </td>
                      <td
                        className={`font-titulo tabular-nums text-center py-1.5 border border-blanco/15 ${
                          f.destacado ? 'text-blanco text-sm sm:text-base' : 'text-naranja'
                        }`}
                      >
                        {f.y2026}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>

                <img
                  src="/milei.png"
                  alt="Javier Milei"
                  className="hidden sm:block w-32 shrink-0 select-none pointer-events-none"
                />
              </div>
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
          </m.div>
        )}
      </AnimatePresence>
    </div>
  )
}
