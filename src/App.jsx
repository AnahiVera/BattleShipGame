import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Board from './components/Board'

function App() {
  const [squares, setSquares] = useState(Array(10).fill(Array(10).fill(0)))

  return (
    <>
      <h1 className='tittle'>Battleship</h1>

      <h3>Player</h3>
      <Board squares={squares}/>

      <h3>CPU</h3>
      <Board squares={squares}/>
    </>
  )
}

export default App
