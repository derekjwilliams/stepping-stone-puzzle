import BoardPosition from './BoardPosition';
import { Game } from '../GameLogic/Game';
import React, { useState} from 'react';
import _ from 'lodash';

function Board({size, hutLimit}) {
  const boardVisualizationSize = 1000;
  // layout the css grid according to size, size is always odd, the maximum row and column value is always (size-1)
  // So for a size of 11 the maximum row and colum is 10 and 10, and the minimum row and column is 0, 0.
  const style = {
    display: 'grid',
    width: 'calc(100vmin - 1em)',
    height: 'calc(100vmin - 1em)',
    margin: '0.5em',
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`,
    fontSize: 'calc(2vmin)'
  };

  const [game, setGame] = useState(new Game({ size, hutLimit }) );

  game.gamePositions[(size - 1)/2][(size - 1)/2].placeHut();

  /**
   * Click handler, place the piece if possible
   * @param {object} arrayIndices
   * @param {number} arrayIndices.row
   * @param {number} arrayIndices.column
   */
  function handlePositionClicked({row, column}) {
    if (game.placePiece({row, column})) {
      const nextGame = _.cloneDeep(game);
      setGame(nextGame);
    }
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