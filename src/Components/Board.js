import BoardPosition from './BoardPosition';
import { Game } from '../GameLogic/Game';
import React, { useState} from 'react';
import _ from 'lodash';

function Board({size, hutLimit}) {
  const boardVisualizationSize = 1000;
  // layout the css grid according to size, size is always odd so that the center is always 0,0 and the maximum X and Y value is always (size-1)/2
  // So for a size of 11 the maximum X and Y is 5 and 5, and the minimum X and Y is -5, -5.
  const style = {
    display: 'grid',
    margin: '0px',
    width: '90vh',
    height: '90vh',
    gridGap: '1px',
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr`,
    padding: '1.5em'
  };

  const [game, setGame] = useState(new Game({ size, hutLimit }) );

  game.gamePositions[(size - 1)/2][(size - 1)/2].addHut();

  function handlePositionClicked(row, column) {
    game.placePiece(row, column);
    const nextGame = _.cloneDeep(game)
    setGame(nextGame)
  }

  return <div>
    <div style={style}>
    {game.gamePositions.map((row, i) =>
      row.map((square, j) => {
        return <BoardPosition pieceValue={square.pieceValue} 
                             kind={square.kind} 
                             row={i} 
                             column={j} key={'' + i * 10 + j} 
                             handleClick={handlePositionClicked}></BoardPosition>
      })
    )
    }
    </div>
  </div>;
}

export default Board;