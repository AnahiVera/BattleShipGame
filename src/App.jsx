import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import GameControls from './components/GameControls'

function App() {

  const initialBoard = Array(10).fill(Array(10).fill(0));

  const [squares, setSquares] = useState(initialBoard)
  const [status, setStatus] = useState("Waiting to start..")
  const [playerTurn, setPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false);


  // Define static ships with their positions
  const staticShips = [
    { coordinates: [[0, 0], [0, 1], [0, 2]], size: 3 }, // Ship at (0,0) horizontally
    { coordinates: [[2, 2], [3, 2], [4, 2]], size: 3 }, // Ship at (2,2) vertically
    { coordinates: [[5, 5], [5, 6]], size: 2 } // Ship at (5,5) horizontally
  ]

  const placeStaticShips = () => {
    const newSquares = squares.map(row => [...row])
    staticShips.forEach(ship => {
      ship.coordinates.forEach(([row, col]) => {
        newSquares[row][col] = 1; // Mark as part of a ship
      })
    })
    setSquares(newSquares);
  }

  const onRestart = () => {
    setSquares({ player: placeStaticShips(), cpu: placeStaticShips() })
    setStatus("Your turn")
    setPlayerTurn(true)
    setGameOver(false)
  }

  const handleTurn = () => { }

  const handleSquareClick = (rowIndex, colIndex) => {
    if (gameOver || squares[rowIndex][colIndex] !== 0) return; // Prevent clicking on already clicked squares

    const newSquares = [...squares];
    if (newSquares[rowIndex][colIndex] === 1) {
      newSquares[rowIndex][colIndex] = 2; // Mark as hit
    } else {
      newSquares[rowIndex][colIndex] = 3; // Mark as miss
    }

    setSquares(newSquares)
    checkGameOver(newSquares)
  }

  const checkGameOver = (newSquares) => {
    const allSunk = staticShips.every(ship =>
      ship.coordinates.every(([r, c]) => newSquares[r][c] === 2)
    );
    if (allSunk) {
      setGameOver(true);
      setStatus("Game Over! All ships have been sunk!");
    }
  }


  useEffect(() => {
    placeStaticShips();
  }, [])

  return (
    <>
      <h1 className='tittle'>Battleship</h1>
      <GameControls status={status} onRestart={onRestart} />

      <div className="container-fluid d-flex">
        <div className='row'>
          <div className='col-6 col-md-12'>
            <h3>Player</h3>
            <Board squares={squares} />
          </div>
          <div className='col-6 col-md-12'>
            <h3>CPU</h3>
            <Board squares={squares} onClick={handleSquareClick}/>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
