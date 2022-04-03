import GameSquare from './GameSquare';
import { Game } from '../GameLogic/Game';

function Board(props) {
  const boardSquares = [...new Array(props.size)].map(() => [...new Array(props.size)]);
  const style = {
    display: 'grid',
    margin: '0 auto',
    gridGap: 0,
    gridTemplateColumns: `repeat(${props.size}, ${500 / props.size}px)`,
    gridTemplateRows: `repeat(${props.size}, ${500 / props.size}px) ${500 / props.size}px`,
    padding: '1.5em',
  };
  const game = new Game({ size: props.size });

  function squareClicked(x, y) {
    console.log(`x: ${x}, y: ${y}`);
    // update game state here using the game object
  }

  return <div style={style}>
    {boardSquares.map((row, i) =>
      row.map((square, j) =>
        <GameSquare row={- (i - (props.size - 1) / 2)} column={j - (props.size - 1) / 2} key={'' + i * 10 + j} onChildClick={squareClicked}></GameSquare>)
    )
    }
  </div>;
}

export default Board;