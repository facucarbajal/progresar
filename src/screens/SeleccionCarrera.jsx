import { motion } from 'framer-motion'
import { CARRERAS } from '../game/carreras.js'
import { pesos, BECA } from '../game/config.js'

// Color de acento por carrera (sólo decorativo, por eso vive acá y no en el
// módulo de datos).
const ACENTOS = {
  derecho: { barra: 'bg-oro', halo: 'group-hover:border-oro' },
  economia: { barra: 'bg-verde', halo: 'group-hover:border-verde' },
  artes: { barra: 'bg-magenta', halo: 'group-hover:border-magenta' },
  biologia: { barra: 'bg-celeste', halo: 'group-hover:border-celeste' },
  'cs-politica': { barra: 'bg-naranja', halo: 'group-hover:border-naranja' },
  ingenieria: { barra: 'bg-blanco', halo: 'group-hover:border-blanco' },
}

// Grilla para elegir la carrera.
export default function SeleccionCarrera({ onElegir }) {
  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-3xl flex flex-col items-center gap-5">
        <div className="flex flex-col items-center gap-2 text-center">
          <h2 className="font-titulo text-2xl sm:text-3xl text-celeste sombra-texto">
            ¿Qué vas a estudiar?
          </h2>
          <p className="text-sm text-blanco/60">
            Elegí la carrera. Cada una te pide sus propios materiales.
          </p>
        </div>

        {/* Cartelito con la plata con la que arrancás */}
        <div className="borde-pixel border-oro/70 bg-oro/10 px-4 py-2 flex items-center gap-2">
          <span className="text-xl">💸</span>
          <span className="text-sm text-blanco/80">
            Arrancás con{' '}
            <span className="font-titulo text-oro tabular-nums">{pesos(BECA)}</span> de beca
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {CARRERAS.map((c, i) => {
            const acento = ACENTOS[c.id] ?? ACENTOS.ingenieria
            return (
              <motion.button
                key={c.id}
                type="button"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.25 }}
                whileHover={{ y: -4 }}
                whileTap={{ y: 1 }}
                onClick={() => onElegir(c.id)}
                className={`group borde-pixel border-blanco/80 bg-pizarra/80 shadow-pixel
                  overflow-hidden flex flex-col text-center transition-colors
                  hover:bg-cielo/70 ${acento.halo}`}
              >
                {/* Franja de color de la carrera */}
                <span className={`h-1.5 w-full ${acento.barra}`} />

                <span className="flex flex-col items-center gap-2 px-3 py-4">
                  <span className="text-4xl sm:text-5xl drop-shadow-[0_3px_0_rgba(0,0,0,0.4)]">
                    {c.emoji}
                  </span>
                  <span className="font-sans font-extrabold text-sm sm:text-base text-blanco leading-tight">
                    {c.nombre}
                  </span>
                  <span className="text-[11px] text-blanco/50 leading-tight">
                    Lunes: {c.materiales[0].materia}
                  </span>
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
