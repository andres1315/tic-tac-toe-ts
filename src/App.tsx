import { useState } from 'react'
import confetti from 'canvas-confetti'
const TURNS = {
  X: 'x',
  O: 'O'
}

const Square = ({ children, updateBoard, index, isSelected = false }: PropsSquere) => {
  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div onClick={handleClick} className={`square ${isSelected ? 'is-selected' : ''}`}>
      {children}
    </div>
  )
}

const winner_combinations = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // left diagonal
  [2, 4, 6] // right diagonal

]
function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkWinner = (boardToCheck) => {
    for (const combination of winner_combinations) {
      const [a, b, c] = combination
      if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a]
      }
    }
    return null
  }

  const updateBoard = (index: number): void => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti(2)
      setWinner(newWinner)
    } else {
      const isBoardFull = newBoard.every((square) => square !== null)
      if (isBoardFull) {
        setWinner(false)
      }
    }
  }
  return (
    <>
    <main className='board'>
      <h1>Tic-tac-toe</h1>
      <button onClick={resetGame}>reset game</button>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>{board[index]}</Square>
          )
        })}
      </section>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      {
        winner !== null &&
        <section className='winner'>
          <div className='text'>
            <h2>{winner === false ? 'Empate' : 'Gano:'}</h2>
            <header className='win'>
              {winner && <Square>{winner}</Square>}
            </header>
            <footer>
              <button onClick={ resetGame }>Reiniciar</button>
            </footer>
          </div>
        </section>
      }
    </main>
    </>
  )
}

interface PropsSquere {
  children?: React.ReactNode
  updateBoard: () => void
  index?: number
  isSelected?: boolean

}

export default App
