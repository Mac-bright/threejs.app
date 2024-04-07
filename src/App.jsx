import Canvas  from "./canvas/CanvasModel"
import Customizer from "./pages/Customizer"
import Home from "./pages/Home"

function App() {


  return (
    
    <main className="app transition-all ease-in bg-slate-400">
      <Home/>
      <Canvas/>
      <Customizer/>
    </main>
  )
}

export default App
