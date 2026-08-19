import { motion } from 'framer-motion'
import BotonPixel from './BotonPixel.jsx'
import { pesos } from '../game/config.js'

// Interstitial entre días. Muestra el cierre (condicional a lo que hiciste),
// la SUBE que se descontó y el aviso de hambre si venís sin comer.
export default function Transicion({ transicion, diasSinComer, onContinuar }) {
  return (
    <div className="min-h-full flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md flex flex-col items-center text-center gap-5"
      >
        <div className="font-pixel text-verde text-sm">
          ✓ {transicion.finalizado} terminado
        </div>

        <p className="text-blanco/90 text-lg sm:text-xl leading-relaxed">
          {transicion.cierre}
        </p>

        {!transicion.comio && (
          <p className="font-pixel text-sm text-naranja leading-relaxed">
            ⚠ Hoy no comiste. Llevás {diasSinComer}{' '}
            {diasSinComer === 1 ? 'día' : 'días'} sin comer.
          </p>
        )}

        {transicion.boleto > 0 ? (
          <div className="borde-pixel border-celeste/60 bg-noche/60 px-4 py-2 text-base sm:text-lg text-celeste">
            🚌 Pagaste {pesos(transicion.boleto)} de SUBE para llegar mañana.
          </div>
        ) : (
          <div className="borde-pixel border-naranja/60 bg-noche/60 px-4 py-2 text-base sm:text-lg text-naranja">
            ✊ Mañana hay paro: no viajás, no gastás SUBE.
          </div>
        )}

        <div className="borde-pixel border-celeste bg-pizarra/70 shadow-pixel px-5 py-3">
          <div className="font-pixel text-xs text-celeste">Arranca</div>
          <div className="font-pixel text-lg text-blanco">{transicion.siguiente}</div>
        </div>

        <BotonPixel variante="primario" onClick={onContinuar}>
          ▶ Seguir
        </BotonPixel>
      </motion.div>
    </div>
  )
}
