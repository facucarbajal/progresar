import { motion } from 'framer-motion'
import { CARRERAS } from '../game/carreras.js'
import { pesos, BECA } from '../game/config.js'

// Grilla pixel para elegir la carrera.
export default function SeleccionCarrera({ onElegir }) {
  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <div className="w-full max-w-3xl flex flex-col items-center gap-6">
        <h2 className="font-titulo text-xl sm:text-2xl text-celeste sombra-texto text-center">
          ¿Qué vas a estudiar?
        </h2>
        <p className="text-sm text-blanco/70 text-center">
          Arrancás con tu Beca Progresar:{' '}
          <span className="font-pixel text-oro">{pesos(BECA)}</span>.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
          {CARRERAS.map((c, i) => (
            <motion.button
              key={c.id}
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              whileTap={{ y: 1 }}
              onClick={() => onElegir(c.id)}
              className="borde-pixel border-blanco bg-pizarra/80 shadow-pixel
                p-4 flex flex-col items-center gap-3 hover:bg-cielo/80 transition-colors"
            >
              <span className="text-3xl sm:text-4xl">{c.emoji}</span>
              <span className="font-pixel text-[9px] sm:text-[11px] text-blanco text-center leading-relaxed">
                {c.nombre}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
