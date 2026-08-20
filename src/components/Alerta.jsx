import { AnimatePresence, m } from 'framer-motion'

// Cartel de alerta que baja desde arriba (ej: el impreso trucho no se leyó).
export default function Alerta({ mensaje, onCerrar }) {
  return (
    <AnimatePresence>
      {mensaje && (
        <m.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed top-3 inset-x-3 z-[60] flex justify-center"
        >
          <div className="borde-pixel border-rojo bg-rojo/95 shadow-pixel-lg px-4 py-3 max-w-md w-full flex items-start gap-3">
            <span className="text-xl leading-none">😩</span>
            <p className="flex-1 text-sm leading-snug text-blanco">{mensaje}</p>
            <button
              type="button"
              onClick={onCerrar}
              className="font-pixel text-blanco/90 hover:text-blanco text-sm leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
