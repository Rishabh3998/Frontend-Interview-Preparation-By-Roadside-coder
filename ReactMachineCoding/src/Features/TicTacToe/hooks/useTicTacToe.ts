/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const initialBoard = (size: number) => Array(size * size).fill(null);

const useTicTacToe = (boardSize: number) => {
  const [board, setBoard] = useState(initialBoard(boardSize));
  const [isXNext, setIsXNext] = useState(true);

  const generateWinningPatterns = () => {
    const patterns = [];

    for (let i = 0; i < boardSize; i++) {
      const horizontalPattern = [];
      const verticalPattern = [];
      for (let j = 0; j < boardSize; j++) {
        horizontalPattern.push(i * boardSize + j);
        verticalPattern.push(j * boardSize + i);
      }
      patterns.push(horizontalPattern, verticalPattern);
    }

    const diagonal1 = [];
    const diagonal2 = [];

    for (let i = 0; i < boardSize; i++) {
      diagonal1.push(i * (boardSize + 1));
    }

    for (let i = 0; i < boardSize; i++) {
      diagonal2.push((i + 1) * (boardSize - 1));
    }

    patterns.push(diagonal1, diagonal2);

    return patterns;
  };

  const WINNING_PATTERNS =
    boardSize === 3
      ? [
          // For 3 x 3 pattern
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ]
      : generateWinningPatterns();

  const calculateWinner = (board: any) => {
    for (let i = 0; i < WINNING_PATTERNS.length; i++) {
      // const [a, b, c] = WINNING_PATTERNS[i];
      const pattern = WINNING_PATTERNS[i];
      let countX = 0;
      let countO = 0;

      for (let j = 0; j < pattern.length; j++) {
        const cell = board[pattern[j]];
        if (cell === "X") {
          countX++;
        } else if (cell === "O") {
          countO++;
        }
      }

      if (countX === boardSize) {
        return "X";
      } else if (countO === boardSize) {
        return "O";
      }

      // if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      //   return board[a];
      // }
    }
    return null;
  };

  const handleClick = (index: number) => {
    // Firstly check for the winner if any winner is not present only then we can play the game
    const winner = calculateWinner(board);
    if (winner || board[index]) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext((prev) => !prev);
  };

  const getStatusMessage = () => {
    const winner = calculateWinner(board);
    if (winner) {
      return `Player ${winner} wins!`;
    }
    if (!board.includes(null)) {
      return "It is a draw!";
    }
    return `Player ${isXNext ? "X" : "O"} turn`;
  };

  const resetGame = () => {
    setBoard(initialBoard(boardSize));
    setIsXNext(true);
  };

  return {
    board,
    handleClick,
    calculateWinner,
    getStatusMessage,
    resetGame,
  };
};

export default useTicTacToe;
