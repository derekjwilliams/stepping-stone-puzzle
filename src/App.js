import './App.css';
import Board from './Components/Board';

function App() {
  return (
    <div className="App">
      <Board size={11} hutLimit={2}></Board>
    </div>
  );
}

export default App;