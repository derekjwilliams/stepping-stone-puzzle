import './App.css';
import Board from './Components/Board';
import React from 'react';
function App() {
  return (
    <div className="App">
      <Board size={13} hutLimit={2}></Board>
    </div>
  );
}

export default App;