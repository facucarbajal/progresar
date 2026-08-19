// Eventos aleatorios que pueden pasar al arrancar un día (no en paro).
// dinero: + suma / − resta.  energia: + suma / − resta.  emoji para el cartel.
export const EVENTOS = [
  { id: 'mate_cuaderno', emoji: '🧉', texto: 'Se te mojó el cuaderno con el mate. A comprar otro.', dinero: -3000 },
  { id: 'plata_500', emoji: '💵', texto: 'Encontraste $500 en la calle. ¡Zafaste!', dinero: 500 },
  { id: 'plata_200', emoji: '🪙', texto: 'Encontraste $200 tirados en el pasillo.', dinero: 200 },
  { id: 'plata_100', emoji: '🪙', texto: 'Encontraste $100 en el bolsillo del pantalón.', dinero: 100 },
  { id: 'calculadora', emoji: '🧮', texto: 'Se te rompió la calculadora. Otro gasto.', dinero: -4000 },
  { id: 'lapicera', emoji: '🖊️', texto: 'Perdiste la lapicera. Clásico.', dinero: -1200 },
  { id: 'bondi_caro', emoji: '🚌', texto: 'El bondi te cobró de más y no te devolvió.', dinero: -500 },
  { id: 'tarde_transporte', emoji: '⏰', texto: 'Llegaste tarde: había paro de transporte.', energia: -8 },
  { id: 'fuiste_al_pedo', emoji: '🚫', texto: 'Fuiste a la facu y no te enteraste que había paro. Viaje al pedo.', energia: -6 },
  { id: 'mate_compa', emoji: '🧉', texto: 'Un compañero te convidó unos mates. Gratis, por suerte.', energia: 6 },
  { id: 'fotocopiadora', emoji: '🖨️', texto: 'La fotocopiadora de la facu estaba rota todo el día.', energia: -4 },
]

export function eventoAlAzar() {
  return EVENTOS[Math.floor(Math.random() * EVENTOS.length)]
}
