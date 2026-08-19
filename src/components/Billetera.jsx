import { motion, AnimatePresence } from 'framer-motion'
import { pesos } from '../game/config.js'

// Muestra las dos cuentas, bien grandes. La Beca Progresar es la protagonista;
// Mercado Pago va al lado, más chico pero legible.
export default function Billetera({ beca, mp }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Beca Progresar — ocupa 2/3 y manda */}
      <div className="col-span-2 borde-pixel border-oro bg-noche/80 shadow-pixel px-3 py-2">
        <div className="font-pixel text-sm sm:text-base text-oro/90 uppercase tracking-wide">
          💳 Beca Progresar
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={beca}
            initial={{ scale: 1.15, x: -3 }}
            animate={{ scale: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            className={`font-titulo tabular-nums leading-none mt-1
              text-3xl sm:text-5xl ${beca <= 0 ? 'text-rojo' : 'text-oro'}`}
          >
            {pesos(beca)}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mercado Pago */}
      <div className="col-span-1 borde-pixel border-cielo/60 bg-noche/60 px-2 py-2 flex flex-col justify-center">
        <div className="font-pixel text-xs sm:text-sm text-celeste/90 uppercase leading-tight">
          Mercado Pago
        </div>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={mp}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            className={`font-titulo tabular-nums text-xl sm:text-2xl mt-1 ${
              mp <= 0 ? 'text-rojo' : 'text-blanco/90'
            }`}
          >
            {pesos(mp)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
