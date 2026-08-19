// Ticker de noticias tipo canal oficialista (violeta). Scrollea el titular.
export default function Ticker({ noticia }) {
  if (!noticia) return null
  // Repetimos el texto para que el loop del marquee sea continuo.
  const texto = `${noticia}     ★     `
  return (
    <div className="w-full borde-pixel border-violeta bg-violeta/90 shadow-pixel overflow-hidden">
      <div className="flex items-stretch">
        <div className="shrink-0 bg-violeta px-2 py-1 font-pixel text-[10px] text-blanco flex items-center gap-1 border-r-2 border-blanco/40">
          📺 CADENA OFICIAL
        </div>
        <div className="relative flex-1 overflow-hidden py-1">
          <div className="whitespace-nowrap animate-marquee text-sm text-blanco font-pixel">
            <span className="px-2">{texto}</span>
            <span className="px-2">{texto}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
