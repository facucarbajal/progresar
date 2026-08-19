import { motion } from 'framer-motion'
import { pesos } from '../game/config.js'
import BotonPixel from './BotonPixel.jsx'

// Tarjeta de un producto simple (útil o comida).
export function ProductoCard({
  emoji,
  nombre,
  costo,
  energia, // opcional (comida)
  requerido = false,
  comprado = false,
  alcanza = true,
  onComprar,
  textoBoton = 'Comprar',
}) {
  return (
    <motion.div
      layout
      className={`borde-pixel p-3 flex flex-col gap-2 bg-noche/60 ${
        comprado ? 'border-verde/70' : requerido ? 'border-oro/70' : 'border-blanco/40'
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-sm sm:text-base leading-tight">
            {emoji} {nombre}
          </span>
        </div>
        <span
          className={`font-pixel text-[11px] whitespace-nowrap ${
            alcanza || comprado ? 'text-oro' : 'text-rojo'
          }`}
        >
          {pesos(costo)}
        </span>
      </div>

      {comprado ? (
        <div className="font-pixel text-[10px] text-verde">✓ Comprado</div>
      ) : alcanza ? (
        <BotonPixel
          variante={requerido ? 'oro' : 'primario'}
          onClick={onComprar}
          className="w-full !py-2"
        >
          {textoBoton}
        </BotonPixel>
      ) : (
        <div className="font-pixel text-[9px] text-rojo/90">✗ No te alcanza</div>
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
