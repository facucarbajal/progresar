import { m } from 'framer-motion'

// Caja de diálogo estilo RPG: borde grueso, fondo oscuro y triangulito parpadeante.
export default function DialogBox({ children, className = '' }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`relative borde-pixel border-blanco bg-pizarra/90 shadow-pixel-lg
        p-4 sm:p-5 pr-8 font-sans font-semibold text-[15px] sm:text-base leading-relaxed
        ${className}`}
    >
      {children}
      {/* Triangulito de "continuar" */}
      <span className="absolute bottom-2 right-3 text-celeste animate-blink">▼</span>
    </m.div>
  )
}
