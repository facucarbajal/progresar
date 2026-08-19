import { useReducer } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { estadoInicial, reducer } from './game/state.js'
import Landing from './screens/Landing.jsx'
import SeleccionCarrera from './screens/SeleccionCarrera.jsx'
import Juego from './screens/Juego.jsx'
import Final from './screens/Final.jsx'
import Transicion from './components/Transicion.jsx'

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
    <div className="min-h-full fondo-grilla scanlines">
      <AnimatePresence mode="wait">
        <motion.div
          key={estado.pantalla + '-' + estado.diaIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="min-h-screen"
        >
          {pantalla}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
