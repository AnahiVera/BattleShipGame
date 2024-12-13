import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import GameControls from './components/GameControls'

function App() {
  const [squares, setSquares] = useState(Array(10).fill(Array(10).fill(0)))
  const [status, setStatus] = useState("Waiting to start..")
  const [playerTurn, setPlayerTurn] = useState(true)

  const onRestart = () => {
    setPlayerTurn(true)

  }
  const handleTurn = () => { }
  const handleClick = () => { }
  const winner = () => { }




  return (
    <>
      <h1 className='tittle'>Battleship</h1>
      <GameControls status={status} onRestart={onRestart} />

      <div className="container-fluid d-flex">
        <div className='row'>
          <div className='col-6'>
            <h3>Player</h3>
            <Board squares={squares} />
            </div>
          <div className='col-6'>
            <h3>CPU</h3>
            <Board squares={squares} />
            </div>
        </div>
      </div>


    </>
  )
}

export default App
