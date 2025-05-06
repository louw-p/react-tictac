import React, { useState } from 'react';
import './App.css';
import { Game } from './components/Game';

function App() {
  const [newGame, setNewGame] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toe</h1>
      </header>
      <main>
        <Game key={newGame}/>
        <button onClick={() => { setNewGame(prev => prev + 1) }}>New Game</button>
      </main>
    </div>
  );
}

export default App;