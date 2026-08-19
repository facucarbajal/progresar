import { AnimatePresence, motion } from 'framer-motion'

// Cartel de evento aleatorio (o aviso del cobro del crédito) que baja de arriba.
export default function EventoCard({ evento, onCerrar }) {
  return (
    <AnimatePresence>
      {evento && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="fixed top-3 inset-x-3 z-[60] flex justify-center"
        >
          <div className="borde-pixel border-celeste bg-pizarra shadow-pixel-lg px-4 py-3 max-w-md w-full flex items-start gap-3">
            <span className="text-2xl leading-none">{evento.emoji}</span>
            <p className="flex-1 text-sm leading-snug text-blanco">{evento.texto}</p>
            <button
              type="button"
              onClick={onCerrar}
              className="font-pixel text-blanco/90 hover:text-blanco text-sm leading-none"
              aria-label="Cerrar"
            >
              ✕
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
