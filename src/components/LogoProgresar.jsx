// Wordmark satírico "PROGRE$AR". No usamos el logo oficial (el sitio del
// gobierno no lo expone como asset); esta versión con el $ deja en claro que
// es una parodia/protesta, no el sitio real.
export default function LogoProgresar({ size = 'md', className = '' }) {
  const tam = {
    sm: 'text-lg',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-5xl',
  }[size]

  return (
    <span
      className={`font-titulo tracking-tight lowercase inline-flex items-baseline ${tam} ${className}`}
    >
      <span className="text-celeste sombra-texto">progre</span>
      <span className="text-oro sombra-texto">$</span>
      <span className="text-celeste sombra-texto">ar</span>
      <span className="text-naranja align-super text-[0.5em] ml-0.5">+</span>
    </span>
  )
}
