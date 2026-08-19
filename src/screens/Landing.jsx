import { motion } from 'framer-motion'
import BotonPixel from '../components/BotonPixel.jsx'

// Pantalla de inicio con el copy del pedido y el botón "Jugar".
export default function Landing({ onJugar }) {
  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-2xl flex flex-col items-center text-center gap-6"
      >
        <div className="text-6xl sm:text-7xl">🎓</div>

        <h1 className="font-titulo text-2xl sm:text-4xl leading-tight text-oro sombra-texto">
          ¡Felicitaciones!
          <br />
          Entraste a la facultad.
        </h1>

        <p className="text-sm sm:text-base leading-relaxed text-blanco/90 max-w-xl">
          Primer día de cursada, te pidieron un millón de materiales y
          cuadernillos, no tenés un peso y olvidate de pedirle a tus viejos. Por
          suerte, el gobierno te da una{' '}
          <span className="font-pixel text-celeste">Beca Progresar</span> para que
          puedas comprarte todo lo que necesitás.
        </p>

        <p className="text-sm italic text-blanco/50">O eso creés…</p>

        <motion.div
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="borde-pixel border-blanco bg-naranja shadow-pixel px-5 py-3"
        >
          <p className="font-pixel text-xs sm:text-sm text-blanco">
            Objetivo: sobrevivir al primer mes de clases
          </p>
        </motion.div>

        <div className="mt-2">
          <BotonPixel variante="oro" onClick={onJugar} className="text-base px-8 py-4">
            ▶ JUGAR
          </BotonPixel>
        </div>
      </motion.div>
    </div>
  )
}
