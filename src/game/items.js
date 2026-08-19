// Catálogo de ítems del juego: comida (objetivo personal) y útiles (cursada).

// COMIDA: cada una da distinta energía y vale según eso.
export const COMIDA = [
  { id: 'agua', nombre: 'Botella de agua', emoji: '💧', costo: 1200, energia: 6 },
  { id: 'coca', nombre: 'Lata de Coca', emoji: '🥤', costo: 2500, energia: 12 },
  { id: 'alfajor', nombre: 'Alfajor Fulbito', emoji: '🍫', costo: 1800, energia: 14 },
  { id: 'cafe', nombre: 'Café con 2 medialunas', emoji: '☕', costo: 4500, energia: 30 },
  { id: 'menu', nombre: 'Menú estudiantil', emoji: '🍽️', costo: 7500, energia: 50 },
  { id: 'mcdonalds', nombre: 'Combo de McDonald’s', emoji: '🍔', costo: 19000, energia: 80 },
]

// ÚTILES de cursada. Rotan: cada día se pide uno distinto (ver dias.js).
export const UTILES = {
  cuaderno: { id: 'cuaderno', nombre: 'Cuaderno', emoji: '📔', costo: 3000 },
  lapicera: { id: 'lapicera', nombre: 'Lapicera Bic', emoji: '🖊️', costo: 1200 },
  cartuchera: { id: 'cartuchera', nombre: 'Cartuchera', emoji: '🎒', costo: 6500 },
  mochila: { id: 'mochila', nombre: 'Mochila', emoji: '🎒', costo: 12000 },
  resaltador: { id: 'resaltador', nombre: 'Resaltador', emoji: '🖍️', costo: 2500 },
}

export function getUtil(id) {
  return UTILES[id]
}

export function getComida(id) {
  return COMIDA.find((c) => c.id === id)
}
