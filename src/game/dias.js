// Definición de los 5 días (Lunes a Viernes).
// Cada día se divide en 2 momentos (cursada y personal) que se presentan en el
// orden indicado. El cuadernillo de cada día sale de la carrera elegida.
//
// requeridosCursada: slots que arma el checklist de cursada del día.
//   'cuadernillo' es el estudio real (original o impreso trucho); el resto son
//   útiles (ver UTILES en items.js). Ya no gatillan game over: sólo son guía.

export const DIAS = [
  {
    nombre: 'Lunes',
    narrativa:
      'Primer día de cursada. El profe ya te pide el cuadernillo y una lapicera para arrancar. Cursás a la tarde, así que en algún momento vas a tener que merendar algo.',
    orden: ['cursada', 'personal'],
    requeridosCursada: ['cuadernillo', 'cuaderno'],
  },
  {
    nombre: 'Martes',
    narrativa:
      'Antes de entrar pasás por el kiosco: tenés hambre y todavía te falta el material de hoy. La plata ya no es la de ayer.',
    orden: ['personal', 'cursada'],
    requeridosCursada: ['cuadernillo', 'lapicera'],
  },
  {
    nombre: 'Miércoles',
    narrativa:
      'Hoy hay práctica y te piden el material más una cartuchera como la gente. Encima seguís sin comer bien. Ojo con la energía.',
    orden: ['cursada', 'personal'],
    requeridosCursada: ['cuadernillo', 'cartuchera'],
  },
  {
    nombre: 'Jueves',
    narrativa:
      'Venís arrastrándote. Comprás algo para aguantar y a ver si te alcanza para el material de hoy y una mochila para llevar todo.',
    orden: ['personal', 'cursada'],
    requeridosCursada: ['cuadernillo', 'mochila'],
  },
  {
    nombre: 'Viernes',
    narrativa:
      'Último empujón de la semana. El profe pide el material de la última materia y un resaltador. Spoiler: de la beca ya no queda nada.',
    orden: ['cursada', 'personal'],
    requeridosCursada: ['cuadernillo', 'resaltador'],
  },
]
