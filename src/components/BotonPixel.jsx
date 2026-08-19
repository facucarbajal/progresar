import { motion } from 'framer-motion'

const VARIANTES = {
  primario: 'bg-celeste text-noche border-blanco hover:bg-celeste/90',
  oro: 'bg-oro text-noche border-blanco hover:bg-oro/90',
  peligro: 'bg-rojo text-blanco border-blanco hover:bg-rojo/90',
  fantasma: 'bg-transparent text-blanco border-blanco hover:bg-blanco/10',
}

// Botón con estética de consola: borde grueso, sombra dura y "click" físico.
export default function BotonPixel({
  children,
  onClick,
  variante = 'primario',
  disabled = false,
  className = '',
  ...props
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { y: -2 }}
      whileTap={disabled ? {} : { y: 2 }}
      className={`borde-pixel font-pixel text-[10px] sm:text-xs leading-relaxed
        px-4 py-3 shadow-pixel select-none transition-colors
        disabled:opacity-40 disabled:cursor-not-allowed
        ${VARIANTES[variante]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  )
}
