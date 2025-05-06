import React from 'react';
import { SquareValue } from '../hooks/useGameState';

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
  winningSquare?: boolean;
}

export function Square({ value, onSquareClick, winningSquare }: SquareProps) {
  return (
    <button 
      className="square" 
      onClick={onSquareClick}
      style={{ backgroundColor: winningSquare ? 'green' : '' }}
      aria-label={value ? `Square with ${value}` : 'Empty square'}
    >
      {value}
    </button>
  );
}