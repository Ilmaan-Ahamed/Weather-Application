import { useState } from 'react'
import Weather from './components/weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Weather/>
    </div>
  )
}

export default App
