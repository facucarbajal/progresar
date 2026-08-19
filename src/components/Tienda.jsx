import { motion } from 'framer-motion'
import { pesos } from '../game/config.js'
import BotonPixel from './BotonPixel.jsx'

// Tarjeta de un producto simple (útil o comida).
// El botón de comprar SIEMPRE aparece; si no te alcanza queda deshabilitado y
// con menos opacidad. El precio va al lado del "Comprar".
export function ProductoCard({
  emoji,
  nombre,
  costo,
  requerido = false,
  comprado = false,
  alcanza = true,
  onComprar,
}) {
  return (
    <motion.div
      layout
      className={`borde-pixel p-3 flex flex-col gap-2 bg-noche/60 ${
        comprado ? 'border-verde/70' : requerido ? 'border-oro/70' : 'border-blanco/40'
      }`}
    >
      <span className="text-sm sm:text-base leading-tight">
        {emoji} {nombre}
      </span>

      {comprado ? (
        <div className="font-pixel text-[11px] text-verde">✓ Comprado</div>
      ) : (
        <BotonPixel
          variante="comprar"
          onClick={onComprar}
          disabled={!alcanza}
          className="w-full !py-2 flex items-center justify-center gap-2"
        >
          Comprar <span className="opacity-90">·</span> {pesos(costo)}
        </BotonPixel>
      )}
    </motion.div>
  )
}

// Grilla contenedora.
export default function Tienda({ titulo, children }) {
  return (
    <div className="flex flex-col gap-2">
      {titulo && (
        <div className="font-pixel text-[10px] text-celeste/80 uppercase tracking-wide">
          {titulo}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
    </div>
  )
}
