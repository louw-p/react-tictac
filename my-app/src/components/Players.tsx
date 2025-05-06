import React from 'react';
import { useGameState } from '../hooks/useGameState';
import type { Players } from '../hooks/useGameState';

interface PlayersProps {
  players: Players;
  changePlayerXName: (e: React.ChangeEvent<HTMLInputElement>) => void;
  changePlayerOName: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Players({ players, changePlayerXName, changePlayerOName }: PlayersProps) {
  return (
    <> 
        <input 
            type="text"
            name="playerX"
            value={players.playerX.name}
            onChange={changePlayerXName}
            className="playerInput"
        />
        <input 
            type="text"
            name="playerO"
            value={players.playerO.name}
            onChange={changePlayerOName}
            className="playerInput"
        />
    </>
  );
}