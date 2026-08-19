// Constantes de balance del juego.
// Todo está calibrado para que la plata se agote entre el día 3 y 5 (Lun a Vie).
// NO se puede ganar: nunca se llega a fin de mes. Ese es el punto.

// Dos billeteras: la beca (el grueso) y lo poco propio que hay en Mercado Pago.
export const BECA = 28000
export const MP_INICIAL = 500 // simbólico: los pibes no tienen un peso

// Energía
export const ENERGIA_INICIAL = 60
export const ENERGIA_MAX = 100
export const DRENAJE_DIARIO = 12 // baja por cursar un día
export const PENALIDAD_NO_COMER = 10 // extra si no comés ese día
export const DIAS_SIN_COMER_LIMITE = 3 // 3 días sin comer = te desmayás

// Probabilidad de que el cuadernillo impreso "trucho" no se lea un carajo.
export const PROB_TRUCHO_FALLA = 0.45

// Costo de la SUBE por día (Lun a Vie). Aumenta en la semana (chiste inflación).
// Se descuenta automáticamente al arrancar cada día; si no te alcanza para el
// boleto de mañana, se termina el juego.
export const BOLETOS = [1200, 1200, 1500, 1700, 2000]

// El dato político que cierra el juego.
// $28.000 es la beca real; ~$153.000 sería el valor actualizado vs 2015.
export const BECA_ACTUALIZADA = 153000

// Formatea números como pesos argentinos: 28000 -> "$28.000"
export function pesos(n) {
  return '$' + Math.round(n).toLocaleString('es-AR')
}
