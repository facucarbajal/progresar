import { m } from 'framer-motion'
import { ENERGIA_MAX } from '../game/config.js'

// Barra de energía estilo videojuego: se llena/vacía con animación y cambia de
// color según qué tan mal venís.
export default function BarraEnergia({ energia }) {
  const pct = Math.max(0, Math.min(100, (energia / ENERGIA_MAX) * 100))

  let color = 'bg-verde'
  if (pct <= 25) color = 'bg-rojo'
  else if (pct <= 50) color = 'bg-naranja'

  return (
    <div className="flex items-center gap-2">
      <span className="font-pixel text-xs text-oro" aria-hidden>
        ⚡
      </span>
      <div className="relative h-4 w-32 sm:w-40 borde-pixel border-blanco bg-noche overflow-hidden">
        <m.div
          className={`h-full ${color}`}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
        />
      </div>
      <span className="font-pixel text-[9px] text-blanco/80 tabular-nums">
        {Math.round(energia)}
      </span>
    </div>
  )
}
