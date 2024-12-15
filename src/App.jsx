import { useState, useEffect } from 'react'
import './App.css'
import Board from './components/Board'
import GameControls from './components/GameControls'
import Modal from './components/Modal'
import Instructions from './components/Instructions'

function App() {

  const initialBoard = Array(10).fill(null).map(() => Array(10).fill(0))
  const [squares, setSquares] = useState({
    player: initialBoard,
    cpu: initialBoard
  })
  const [status, setStatus] = useState("Player's turn")
  const [playerTurn, setPlayerTurn] = useState(true)
  const [gameOver, setGameOver] = useState(false)
  const [modalMessage, setModalMessage] = useState('')

  const shipSizes = [3, 3, 2]

  const countRemainingShips = (board) => {
    return board.flat().filter(cell => cell === 1).length;
  }


  const placeRandomShips = (board, sizes) => {
    const newBoard = board.map(row => [...row]);

    shipSizes.forEach(size => {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const horizontal = Math.random() < 0.5;

        if (horizontal) {
          if (col + size <= 10 && newBoard[row].slice(col, col + size).every(cell => cell === 0)) {
            for (let i = 0; i < size; i++) newBoard[row][col + i] = 1;
            placed = true;
          }
        } else {
          if (row + size <= 10 && newBoard.slice(row, row + size).every(r => r[col] === 0)) {
            for (let i = 0; i < size; i++) newBoard[row + i][col] = 1;
            placed = true;
          }
        }
      }
    });

    return newBoard;
  }


  const onRestart = () => {
    const newInitialBoard = Array(10).fill(null).map(() => Array(10).fill(0));
    setSquares({
      player: placeRandomShips(newInitialBoard, shipSizes),
      cpu: placeRandomShips(newInitialBoard, shipSizes),
    });
    setGameOver(false)
    setModalMessage('')
    setStatus("Player's turn")
    setPlayerTurn(true)
  }



  const checkGameOver = (updatedBoard, boardKey) => {
    const remainingShips = countRemainingShips(updatedBoard)

    if (remainingShips === 0) {
      setGameOver(true);
      setModalMessage(`${boardKey === 'cpu' ? 'Player' : 'CPU'} wins! Game Over!`)
      return true; // Indica que el juego ha terminado
    }
    return false;
  }

  const handleTurn = () => {
    if (gameOver) {
      console.log("Game over! No further moves allowed.");
      return;
    }

    console.log("CPU's turn initiated")

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
    /* console.log(`CPU attacking at: (${row}, ${col})`) // Log para verificar la jugada de la CPU */

    const newPlayerBoard = squares.player.map(row => [...row])
    newPlayerBoard[row][col] = newPlayerBoard[row][col] === 1 ? 2 : 3;

    const playerGameEnded = checkGameOver(newPlayerBoard, 'player');
    setSquares(prevSquares => ({ ...prevSquares, player: newPlayerBoard }));

    if (!playerGameEnded) {
      setPlayerTurn(true);
      setStatus("Your turn");
    }
  }

  const handleSquareClick = (board, rowIndex, colIndex) => {
    if (gameOver) {
      console.log("Game over! No further clicks allowed.");
      return;
    }

    const currentSquare = squares[board][rowIndex][colIndex];

    if (currentSquare === 2 || currentSquare === 3) return; // Prevenir clics en cuadrados ya clickeados(jugados)

    const newBoard = squares[board].map(row => [...row]);

    if (currentSquare === 1) {
      newBoard[rowIndex][colIndex] = 2; // Golpe

      setSquares(prevSquares => {
        const updatedSquares = { ...prevSquares, [board]: newBoard };
        if (checkGameOver(updatedSquares[board], board)) {
          return updatedSquares; // Detén el flujo si el juego terminó
        }
        return updatedSquares;
      });

      setPlayerTurn(false);
      setStatus("CPU's turn");

      setTimeout(() => {
        handleTurn();
      }, 1000);

    } else if (currentSquare === 0) {
      newBoard[rowIndex][colIndex] = 3; // Fallo
      setSquares(prevSquares => ({ ...prevSquares, [board]: newBoard }));

      setPlayerTurn(false);
      setStatus("CPU's turn");

      setTimeout(() => {
        handleTurn();
      }, 1000);
    }
  }


  useEffect(() => {
    const initializeBoards = () => {
      const playerBoard = placeRandomShips(initialBoard, shipSizes);
      const cpuBoard = placeRandomShips(initialBoard, shipSizes);

      console.log("Initialized Player Board:", playerBoard);
      console.log("Initialized CPU Board:", cpuBoard);

      setSquares({ player: playerBoard, cpu: cpuBoard })
    }
    initializeBoards()

  }, [])

  return (
    <>
      <h1 className='tittle'>Battleship</h1>

      <Instructions />


      <GameControls
        status={status}
        gameOver={gameOver}
        modalMessage={modalMessage}
        onRestart={onRestart}
      />



      <div className="container-fluid d-flex">
        <div className='row'>
          <div className='col-md-6 col-sm-12'>
            <h2>Player's Board</h2>
            <Board squares={squares.player} />
          </div>
          <div className='col-md-6 col-sm-12'>
            <h2>CPU's Board</h2>
            <Board squares={squares.cpu} onClick={(row, col) => handleSquareClick('cpu', row, col)} isCpu />
          </div>
        </div>
      </div>


    </>
  )
}

export default App
