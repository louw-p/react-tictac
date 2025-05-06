import React from 'react';
import { SquareValue } from '../hooks/useGameState';

interface SquareProps {
  value: SquareValue;
  onSquareClick: () => void;
  winningSquare?: boolean;
}

export function Players() {
  return (
    <> 
        <input 
            type="text" 
            className="playerInput"
        />
        <input 
            type="text" 
            className="playerInput"
        />
        {/* <button 
            className="square" 
            onClick={onSquareClick}
            style={{ backgroundColor: winningSquare ? 'green' : '' }}
            aria-label={value ? `Square with ${value}` : 'Empty square'}
            >
            {value}
        </button> */}
    </>

  );
}