import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RandomFactFetcher from './components/RandomFactFetcher'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <RandomFactFetcher/>
    </>
  )
}

export default App
