// import { useState } from 'react';
import { Player, SquareValue } from './useGameState';


export function useSaveGame(history: SquareValue[][], players: Player[] | null) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history })
    };
    console.log(requestOptions.body);
    fetch('https://localhost:32771/GameData/SaveGame', requestOptions)
        .then(response => response.json())
        .then(response => console.log('Game saved:', response))
        .catch(error => console.error('Error:', error));

  
}