/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        // 'pixel' se mantiene como nombre de clase pero ahora renderiza una
        // display legible (Archivo Black), no pixel-art. 'titulo' es su alias.
        pixel: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        titulo: ['"Archivo Black"', 'system-ui', 'sans-serif'],
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Paleta retro contrastada
        noche: '#1a1c2c',      // fondo oscuro
        pizarra: '#29366f',    // azul pizarra
        cielo: '#3b5dc9',      // azul cielo
        celeste: '#41a6f6',    // celeste argento
        blanco: '#f4f4f4',
        crema: '#fdf6d3',
        oro: '#ffcd75',        // plata / dinero
        verde: '#38b764',      // energía ok
        naranja: '#ef7d57',    // alerta
        rojo: '#b13e53',       // peligro / game over
        magenta: '#a54bd6',
      },
      boxShadow: {
        // Sombra dura escalonada estilo caja RPG
        pixel: '0 4px 0 0 rgba(0,0,0,0.35)',
        'pixel-lg': '0 6px 0 0 rgba(0,0,0,0.4)',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [],
}
