import GamePosition from './GamePosition';
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

  function handlePositionClicked(x, y) {
    const row = (game.gamePositions.length - 1)/2 - y;
    const column = (game.gamePositions.length - 1)/2 + x;
    const position = game.gamePositions[row][column]
    const hutCount = game.getHutCount();
    if (hutCount <  game.hutLimit) {
      position.addHut();
    }
    else {
      if (position.addStep(game.stepValue)) {
        game.stepValue = game.stepValue + 1;
      }
    }
    const nextGame = _.cloneDeep(game)
    setGame(nextGame)
  }

  return <div>
    <div style={style}>
    {game.gamePositions.map((row, i) =>
      row.map((square, j) => {
        return <GamePosition pieceValue={square.pieceValue} 
                             kind={square.kind} 
                             row={- (i - (size - 1) / 2)} 
                             column={j - (size - 1) / 2} key={'' + i * 10 + j} 
                             handleClick={handlePositionClicked}></GamePosition>
      })
    )
    }
    </div>
  </div>;
}

export default Board;