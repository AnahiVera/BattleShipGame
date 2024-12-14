import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import GameControls from './components/GameControls'

function App() {

  const initialBoard = Array(10).fill(null).map(() => Array(10).fill(0))

  const [squares, setSquares] = useState({
    player: initialBoard,
    cpu: initialBoard
  })
  const [status, setStatus] = useState("Player's turn")
  const [playerTurn, setPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)


  // Defines static ships with their positions change to random for player and cpu
  const staticShips = [
    { coordinates: [[7, 6], [7, 7], [7, 8]], size: 3 }, // Ship at (7,6) horizontally
    { coordinates: [[2, 2], [3, 2], [4, 2]], size: 3 }, // Ship at (2,2) vertically
    { coordinates: [[5, 5], [5, 6]], size: 2 } // Ship at (5,5) horizontally
  ]

  const placeStaticShips = (board) => {
    const newBoard = squares[board].map(row => [...row]) // Create a copy of the board
    staticShips.forEach(ship => {
      ship.coordinates.forEach(([row, col]) => {
        newBoard[row][col] = 1; // Mark as part of a ship
      })
    })
    setSquares({ ...squares, [board]: newBoard }) // Update the specific board
  }

  const onRestart = () => {
    const newInitialBoard = Array(10).fill(null).map(() => Array(10).fill(0))
    setSquares({
      player: newInitialBoard,
      cpu: newInitialBoard,
    })
    setGameOver(false)
    setStatus("Player's turn")
    setPlayerTurn(true)

    setTimeout(() => {
      const playerBoard = newInitialBoard.map(row => [...row])
      const cpuBoard = newInitialBoard.map(row => [...row])

      staticShips.forEach(ship => {
        ship.coordinates.forEach(([row, col]) => {
          playerBoard[row][col] = 1;
          cpuBoard[row][col] = 1;
        })
      })

      setSquares({ player: playerBoard, cpu: cpuBoard })
    }, 0)
  }

  const handleTurn = () => {
    console.log("CPU's turn initiated") // Log para verificar que la CPU está jugando

    const availableMoves = []
    squares.player.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell !== 2 && cell !== 3) {
                availableMoves.push([rowIndex, colIndex])
            }
        })
    })

    if (availableMoves.length === 0) {
        console.log("No available moves for CPU");
        return; // Si no hay movimientos disponibles, salir
    }

    const [row, col] = availableMoves[Math.floor(Math.random() * availableMoves.length)]
    console.log(`CPU attacking at: (${row}, ${col})`) // Log para verificar la jugada de la CPU

    const newPlayerBoard = squares.player.map(row => [...row])
    newPlayerBoard[row][col] = newPlayerBoard[row][col] === 1 ? 2 : 3;

    setSquares(prevSquares => {
        const updatedSquares = { ...prevSquares, player: newPlayerBoard }
        checkGameOver(updatedSquares.player, 'player')
        return updatedSquares;
    })

    setPlayerTurn(true) 
    setStatus("Your turn")
}

const checkGameOver = (updatedBoard, boardKey) => {
  const allSunk = staticShips.every(ship =>
      ship.coordinates.every(([row, col]) => updatedBoard[row][col] === 2)
  )

  if (allSunk) {
      setGameOver(true);
      setStatus(`${boardKey === 'cpu' ? 'Player' : 'CPU'} wins! Game Over!`)
      return true; // Indica que el juego ha terminado
  }
  return false;
}

const handleSquareClick = (board, rowIndex, colIndex) => {
  if (gameOver) return; // Prevenir interacciones si el juego ha terminado

  const currentSquare = squares[board][rowIndex][colIndex]
  if (currentSquare === 2 || currentSquare === 3) return; // Prevenir clics en cuadrados ya golpeados o fallidos

  const newBoard = squares[board].map(row => [...row])

  if (currentSquare === 1) {
      newBoard[rowIndex][colIndex] = 2; // Golpe
      setSquares(prevSquares => {
          const updatedSquares = { ...prevSquares, [board]: newBoard }
          checkGameOver(updatedSquares[board], board);
          return updatedSquares;
      })
  } else if (currentSquare === 0) {
      newBoard[rowIndex][colIndex] = 3; // Fallo
      setSquares(prevSquares => ({ ...prevSquares, [board]: newBoard }))
  }

  
      setPlayerTurn(false)
      setStatus("CPU's turn")
      setTimeout(() => {
          handleTurn()
      }, 1000)
}




  useEffect(() => {
    const initializeBoards = () => {
      const playerBoard = initialBoard.map(row => [...row])
      const cpuBoard = initialBoard.map(row => [...row])

      staticShips.forEach(ship => {
        ship.coordinates.forEach(([row, col]) => {
          playerBoard[row][col] = 1;
          cpuBoard[row][col] = 1;
        })
      })

      setSquares({ player: playerBoard, cpu: cpuBoard })
    }
    initializeBoards()

  }, [])

  return (
    <>
      <h1 className='tittle'>Battleship</h1>
      <GameControls status={status} onRestart={onRestart} />

      <div className="container-fluid d-flex">
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <h3>Player</h3>
            <Board squares={squares.player} />
          </div>
          <div className='col-md-6 col-sm-12'>
            <h3>CPU</h3>
            <Board squares={squares.cpu} onClick={(row, col) => handleSquareClick('cpu', row, col)} isCpu />
          </div>
        </div>
      </div>


    </>
  )
}

export default App
