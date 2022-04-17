import GamePosition from './GamePosition';
import { Game } from '../GameLogic/Game';

function Board(props) {
  const boardSquares = [...new Array(props.size)].map(() => [...new Array(props.size)]);
  const boardVisualizationSize = 500;
  // layout the css grid according to size, size is always odd so that the center is always 0,0 and the maximum X and Y value is always (size-1)/2
  // So for a size of 11 the maximum X and Y is 5 and 5, and the minimum X and Y is -5, -5.
  const style = {
    display: 'grid',
    margin: '0 auto',
    gridGap: 0,
    gridTemplateColumns: `repeat(${props.size}, ${boardVisualizationSize / props.size}px)`,
    gridTemplateRows: `repeat(${props.size}, ${boardVisualizationSize / props.size}px) ${boardVisualizationSize / props.size}px`,
    padding: '1.5em',
  };

  // Represents the state of the game for an empty, new Game, no huts, no steps
  const game = new Game({ size: props.size, hutLimit: props.hutLimit }) 

  function squareClicked(x, y) {
    console.log(`x: ${x}, y: ${y}`);
    game.placePiece(x, y);
    console.log(game.getInfo())
  }

  return <div style={style}>
    {game.gamePositions.map((row, i) =>
      row.map((square, j) =>
        <GamePosition row={- (i - (props.size - 1) / 2)} column={j - (props.size - 1) / 2} key={'' + i * 10 + j} onPositionClick={squareClicked}></GamePosition>)
    )
    }
  </div>;
}

export default Board;