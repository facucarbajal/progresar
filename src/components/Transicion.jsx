import { motion } from 'framer-motion'
import BotonPixel from './BotonPixel.jsx'
import { pesos } from '../game/config.js'

// Interstitial entre días: leyenda de cierre, resumen de compras, SUBE y el
// contador grande del día siguiente.
export default function Transicion({ transicion, onContinuar }) {
  const { compras = [], totalGastado = 0 } = transicion

  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md flex flex-col items-center text-center gap-4"
      >
        <div className="font-pixel text-sm text-verde">
          ✓ {transicion.finalizado} terminado
        </div>

        <p className="text-blanco/90 text-lg sm:text-xl leading-relaxed">
          {transicion.cierre}
        </p>

        {/* Resumen de compras del día */}
        <div className="w-full borde-pixel border-blanco/40 bg-noche/60 p-3 text-left">
          <div className="font-pixel text-[11px] text-celeste/80 uppercase tracking-wide mb-2">
            Lo que gastaste hoy
          </div>
          {compras.length === 0 ? (
            <p className="text-sm text-blanco/60">No gastaste un peso.</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {compras.map((c, i) => (
                <li key={i} className="flex justify-between gap-3 text-sm">
                  <span className="text-blanco/85">{c.nombre}</span>
                  <span className="font-pixel text-oro tabular-nums whitespace-nowrap">
                    {pesos(c.costo)}
                  </span>
                </li>
              ))}
              <li className="flex justify-between gap-3 text-sm border-t border-blanco/20 mt-1 pt-1">
                <span className="font-pixel text-blanco">TOTAL</span>
                <span className="font-pixel text-rojo tabular-nums">{pesos(totalGastado)}</span>
              </li>
            </ul>
          )}
        </div>

        {transicion.boleto > 0 && (
          <div className="text-base text-celeste">
            🚌 Pagaste {pesos(transicion.boleto)} de SUBE para llegar mañana.
          </div>
        )}

        {/* Contador de día grande */}
        <div className="w-full borde-pixel border-celeste bg-pizarra/70 shadow-pixel py-4">
          <div className="font-pixel text-xs text-celeste">DÍA {transicion.numeroSiguiente} de 5</div>
          <div className="font-titulo text-4xl sm:text-5xl text-blanco leading-none mt-1">
            {transicion.siguiente}
          </div>
        </div>

        <BotonPixel variante="primario" onClick={onContinuar}>
          ▶ Seguir
        </BotonPixel>
      </motion.div>
    </div>
  )
}
