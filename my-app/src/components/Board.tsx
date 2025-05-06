import React from 'react';
import { Square } from './Square';
import { SquareValue, checkWinner } from '../hooks/useGameState';

interface BoardProps {
  xIsNext: boolean;
  squares: SquareValue[];
  onPlay: (nextSquares: SquareValue[]) => void;
  winningLine: number[] | null;
  gameStatus: string;
}

export function Board({ xIsNext, squares, onPlay, winningLine, gameStatus }: BoardProps) {
  function handleClick(i: number) {
    // Don't allow clicks on filled squares or after game is won
    if (squares[i] || checkWinner(squares).winner) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";

    onPlay(nextSquares);
  }

  return (
    <>
      <div className="status">{gameStatus}</div>
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {[...Array(3)].map((_, colIndex) => {
            const index = rowIndex * 3 + colIndex;
            return (
              <Square
                key={index}
                value={squares[index]}
                winningSquare={!!(winningLine && winningLine.includes(index))}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}