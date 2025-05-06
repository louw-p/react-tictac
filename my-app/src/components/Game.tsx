import React from 'react';
import { Board } from './Board';
import { useGameState } from '../hooks/useGameState';
import { Players } from './Players';

export function Game() {
  const {
    history,
    currentMove,
    xIsNext,
    currentSquares,
    winningLine,
    gameStatus,
    moveOrder,
    handlePlay,
    jumpTo,
    toggleMoveOrder
  } = useGameState();

  // Create move history list
  const moves = history.map((squares, move) => {
    const description = move > 0 
      ? `Go to move #${move}` 
      : 'Go to game start';
    
    if (move === currentMove) {
      return (
        <li key={move}>
          <div>You are at move #{move}</div>
        </li>
      );
    }
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>
          {description}
        </button>
      </li>
    );
  });

  // Apply ordering based on moveOrder state
  const movesToDisplay = moveOrder === 'descending' ? [...moves].reverse() : moves;

  return (
    <div>
        <Players/>
        <div className="game">
            <div className="game-board">
                <Board 
                xIsNext={xIsNext} 
                squares={currentSquares} 
                onPlay={handlePlay}
                winningLine={winningLine}
                gameStatus={gameStatus}
                />
            </div>
            
            <div className="game-controls">
                <label htmlFor="move-order-toggle">
                <input 
                    id="move-order-toggle"
                    type="checkbox" 
                    checked={moveOrder === 'descending'} 
                    onChange={toggleMoveOrder} 
                    className="myToggle"
                    aria-label="Reverse move order"
                />
                Show moves in reverse order
                </label>
            </div>

            <div className="game-info">
                <ol>{movesToDisplay}</ol>
            </div>
        </div>
    </div>
    
  );
}