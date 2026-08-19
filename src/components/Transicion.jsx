import { motion } from 'framer-motion'
import BotonPixel from './BotonPixel.jsx'
import Ticker from './Ticker.jsx'
import { pesos } from '../game/config.js'

// Interstitial entre días: cierre, resumen de compras, SUBE, contador grande y
// el ticker de noticias oficialista.
export default function Transicion({ transicion, diasSinComer, onContinuar }) {
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

        {!transicion.comio && (
          <p className="font-pixel text-sm text-naranja leading-relaxed">
            ⚠ Hoy no comiste. Llevás {diasSinComer}{' '}
            {diasSinComer === 1 ? 'día' : 'días'} sin comer.
          </p>
        )}

        {transicion.boleto > 0 ? (
          <div className="text-base text-celeste">
            🚌 Pagaste {pesos(transicion.boleto)} de SUBE para llegar mañana.
          </div>
        ) : (
          <div className="text-base text-naranja">
            🚫 Mañana hay paro: no viajás, no gastás SUBE.
          </div>
        )}

        {/* Contador de día grande */}
        <div className="w-full borde-pixel border-celeste bg-pizarra/70 shadow-pixel py-4">
          <div className="font-pixel text-xs text-celeste">DÍA {transicion.numeroSiguiente} de 5</div>
          <div className="font-titulo text-4xl sm:text-5xl text-blanco leading-none mt-1">
            {transicion.siguiente}
          </div>
        </div>

        <Ticker noticia={transicion.noticia} />

        <BotonPixel variante="primario" onClick={onContinuar}>
          ▶ Seguir
        </BotonPixel>
      </motion.div>
    </div>
  )
}
