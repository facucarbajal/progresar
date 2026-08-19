import { useReducer } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { estadoInicial, reducer } from './game/state.js'
import Landing from './screens/Landing.jsx'
import SeleccionCarrera from './screens/SeleccionCarrera.jsx'
import Juego from './screens/Juego.jsx'
import Final from './screens/Final.jsx'
import Transicion from './components/Transicion.jsx'
import LogoProgresar from './components/LogoProgresar.jsx'

export default function App() {
  const [estado, dispatch] = useReducer(reducer, estadoInicial)

  let pantalla
  switch (estado.pantalla) {
    case 'carrera':
      pantalla = (
        <SeleccionCarrera
          onElegir={(carreraId) => dispatch({ tipo: 'ELEGIR_CARRERA', carreraId })}
        />
      )
      break
    case 'juego':
      pantalla = <Juego estado={estado} dispatch={dispatch} />
      break
    case 'transicion':
      pantalla = (
        <Transicion
          transicion={estado.transicion}
          diasSinComer={estado.diasSinComer}
          onContinuar={() => dispatch({ tipo: 'CONTINUAR' })}
        />
      )
      break
    case 'final':
      pantalla = <Final estado={estado} dispatch={dispatch} />
      break
    case 'landing':
    default:
      pantalla = <Landing onJugar={() => dispatch({ tipo: 'IR_CARRERA' })} />
  }

  return (
    <div className="min-h-screen flex flex-col fondo-grilla scanlines">
      {/* Título de Progresar siempre arriba de todo */}
      <header className="sticky top-0 z-40 flex justify-center py-3 border-b border-blanco/10 bg-noche/80 backdrop-blur">
        <LogoProgresar size="sm" />
      </header>

      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={estado.pantalla + '-' + estado.diaIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {pantalla}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
