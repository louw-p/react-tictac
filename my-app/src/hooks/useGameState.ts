import { useEffect, useState } from 'react';
import { useSaveGame } from './useSaveGame';

export type SquareValue = "X" | "O" | null;

export type Player = {
  id: number;
  name: string;
  score: number;
}

const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

export function checkWinner(squares: SquareValue[]): { winner: SquareValue; winningLine: number[] | null } {
  for (let i = 0; i < WINNING_LINES.length; i++) {
    const [a, b, c] = WINNING_LINES[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: WINNING_LINES[i] };
    }
  }
  return { winner: null, winningLine: null };
}

export function useGameState() {
  const [history, setHistory] = useState<SquareValue[][]>([Array(9).fill(null)]);
  const [moveOrder, setMoveOrder] = useState<'ascending' | 'descending'>('ascending');
  const [currentMove, setCurrentMove] = useState(0);
  const [players, setPlayers] = useState<Player[] | null>(null);
  
  
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const { winner, winningLine } = checkWinner(currentSquares);
  const isDraw = !winner && currentSquares.every(square => square !== null);

  function handlePlay(nextSquares: SquareValue[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    // useSaveGame(nextHistory);
  }

  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }

  function toggleMoveOrder() {
    setMoveOrder(prevOrder => 
      prevOrder === 'ascending' ? 'descending' : 'ascending'
    );
  }

  const gameStatus = winner 
    ? `Winner: ${winner}` 
    : isDraw 
    ? "Game ended in a draw" 
    : `Next player: ${xIsNext ? "X" : "O"}`;
    
  const isGameOver = !!winner || isDraw;

  useEffect(() => {
    console.log(isGameOver)
    if (isGameOver) {
        useSaveGame(history);
      }
    }, [gameStatus]);
  return {
    history,
    currentMove,
    xIsNext,
    currentSquares,
    winner,
    winningLine,
    gameStatus,
    moveOrder,
    handlePlay,
    jumpTo,
    toggleMoveOrder
  };
}