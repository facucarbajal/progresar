import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { pesos } from '../game/config.js'
import { vibrar } from '../game/haptics.js'

// Muestra las dos cuentas, bien grandes, y anima la plata que entra/sale.
export default function Billetera({ beca, mp, movimiento }) {
  const [floaters, setFloaters] = useState([])

  // Cada movimiento nuevo (id) escupe un "-$X" / "+$X" que sube y se desvanece.
  useEffect(() => {
    if (!movimiento || !movimiento.id || movimiento.monto === 0) return
    setFloaters((f) => [...f, { ...movimiento }])
    vibrar(movimiento.monto < 0 ? 12 : [8, 30, 8])
    const t = setTimeout(() => {
      setFloaters((f) => f.filter((x) => x.id !== movimiento.id))
    }, 1100)
    return () => clearTimeout(t)
  }, [movimiento?.id])

  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Beca Progresar */}
      <div className="relative col-span-2 borde-pixel border-oro bg-noche/80 shadow-pixel px-3 py-2">
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

        {/* Plata volando */}
        <AnimatePresence>
          {floaters.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -34 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className={`pointer-events-none absolute right-3 top-2 font-titulo text-lg sm:text-2xl ${
                f.monto < 0 ? 'text-rojo' : 'text-verde'
              }`}
            >
              {f.monto < 0 ? '-' : '+'}
              {pesos(Math.abs(f.monto))}
            </motion.div>
          ))}
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
