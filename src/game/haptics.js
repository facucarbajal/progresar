// Vibración en el celular (si el browser lo soporta). No hace nada en desktop.
export function vibrar(patron) {
  if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
    navigator.vibrate(patron)
  }
}
