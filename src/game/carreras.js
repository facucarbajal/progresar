// Las 6 carreras jugables. Cada una define el cuadernillo/apunte que te piden
// cada día (Lunes a Viernes), siempre material IMPRIMIBLE para que tenga sentido
// la opción "original" vs "imprimir trucho".
//
// Cada materia trae dos versiones:
//   - original: caro, siempre se lee.
//   - impreso: "trucho", más barato, pero riesgo de que no se lea un carajo.
// El índice del array = día (0 = Lunes ... 4 = Viernes).

function mat(nombre, materia, original) {
  // El trucho sale ~55% del original.
  return { nombre, materia, original, impreso: Math.round((original * 0.55) / 100) * 100 }
}

export const CARRERAS = [
  {
    id: 'derecho',
    nombre: 'Derecho',
    emoji: '⚖️',
    materiales: [
      mat('Código Civil y Comercial', 'Civil y Comercial', 12000),
      mat('Fotocopias de Constitucional', 'Derecho Constitucional', 9000),
      mat('Apunte de Penal', 'Penal I', 15000),
      mat('Cuadernillo de Procesal', 'Procesal I', 10000),
      mat('Fotocopias de Derecho Romano', 'Derecho Romano', 13000),
    ],
  },
  {
    id: 'economia',
    nombre: 'Economía',
    emoji: '📈',
    materiales: [
      mat('Apunte de Microeconomía', 'Micro I', 13000),
      mat('Guía de Matemática Financiera', 'Mate Financiera', 9000),
      mat('Cuadernillo de Macroeconomía', 'Macro I', 12000),
      mat('Fotocopias de Estadística', 'Estadística I', 14000),
      mat('Apunte de Historia Económica', 'Historia Económica', 10000),
    ],
  },
  {
    id: 'artes',
    nombre: 'Artes',
    emoji: '🎨',
    materiales: [
      mat('Manual de Historia del Arte', 'Historia del Arte', 12000),
      mat('Apunte de Taller', 'Taller de Pintura', 11000),
      mat('Guía de Dibujo', 'Dibujo I', 10000),
      mat('Apunte de Estética', 'Estética', 13000),
      mat('Cuadernillo de Grabado', 'Grabado I', 9000),
    ],
  },
  {
    id: 'biologia',
    nombre: 'Biología',
    emoji: '🧬',
    materiales: [
      mat('Apunte de Biología Celular', 'Biología Celular', 13000),
      mat('Fotocopias de Anatomía', 'Anatomía', 12000),
      mat('Guía de Química Orgánica', 'Química Orgánica', 10000),
      mat('Cuadernillo de Genética', 'Genética', 13000),
      mat('Apunte de Botánica', 'Botánica', 9000),
    ],
  },
  {
    id: 'cs-politica',
    nombre: 'Ciencia Política',
    emoji: '🏛️',
    materiales: [
      mat('Cuadernillo de Teoría Política', 'Teoría Política', 12000),
      mat('Fotocopias de Sociología', 'Sociología', 9000),
      mat('Apunte de Relaciones Internacionales', 'RRII', 13000),
      mat('Guía de Historia Política', 'Historia Política', 10000),
      mat('Cuadernillo de Administración Pública', 'Administración Pública', 11000),
    ],
  },
  {
    id: 'ingenieria',
    nombre: 'Ingeniería',
    emoji: '⚙️',
    materiales: [
      mat('Cuadernillo de Análisis Matemático', 'Análisis Matemático I', 15000),
      mat('Guía de Sistemas de Representación', 'Sist. de Representación', 9000),
      mat('Apunte de Física', 'Física I', 12000),
      mat('Fotocopias de Álgebra', 'Álgebra', 11000),
      mat('Cuadernillo de Química', 'Química', 10000),
    ],
  },
]

export function getCarrera(id) {
  return CARRERAS.find((c) => c.id === id)
}
