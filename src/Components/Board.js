import BoardPosition from './BoardPosition';
import { Game } from '../GameLogic/Game';
import React, { useState } from 'react';
import _ from 'lodash';
import { Empty, AllowedStep } from '../GameLogic/GamePosition';

function Board({ size, hutLimit }) {
  // layout the css grid according to size, size is always odd, the maximum row and column value is always (size-1)
  // So for a size of 11 the maximum row and colum is 10 and 10, and the minimum row and column is 0, 0.
  const style = {
    display: 'grid',
    width: 'calc(100vmin - 4em)',
    height: 'calc(100vmin - 4em)',
    paddingRight: '-4em',
    margin: '0em 2em 2em 2em',
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gridTemplateRows: `repeat(${size}, 1fr)`
  };
  const controlPanelStyle = {
    margin: '10px',
  }
  const resetButtonStyle = {
    margin: '10px',
    fontFamily: 'Helvetica',
    fontSize: '1rem'
  }

  const [game, setGame] = useState(new Game({ size, hutLimit }));

  game.gamePositions[Math.floor((size) / 2)][Math.floor((size) / 2)].placeHut();

  /**
   * Click handler, place the piece if possible
   * @param {object} arrayIndices
   * @param {number} arrayIndices.x
   * @param {number} arrayIndices.y
   */
  function handlePositionClicked({ x, y }) {
    if (game.placePiece({ x, y })) {
      const nextGame = _.cloneDeep(game);
      setGame(nextGame);
    }
  }

  function handleReset() {
    const newGame = new Game({ size, hutLimit })
    newGame.gamePositions[Math.floor((size) / 2)][Math.floor((size) / 2)].placeHut();
    setGame(newGame);
  }

  const hutCount = game.getHutCount()

  return <div>
    <span style={controlPanelStyle} className="control-panel">
      <button style={resetButtonStyle} onClick={() => handleReset()}>New Game</button>
    </span>
    <div style={style}>
      {game.gamePositions.map((row, i, array) =>
        row.map((square, j) => {
          const possibleValue = game.memoizedCalculateValue(array[i][j]);
          let kind = square.kind;
          if (square.kind === Empty) {
            if (possibleValue === game.stepValue) {
              if (hutCount < game.hutLimit) {
                kind = square.kind
              }
              else {
                kind = AllowedStep
              }
            }
          }
          return <BoardPosition size={size}
            pieceValue={square.pieceValue}
            kind={kind}
            y={i}
            x={j}
            key={'' + i * 10 + j}
            possibleValue={possibleValue}
            handleClick={handlePositionClicked}></BoardPosition>
        })
      )
      }
    </div>
  </div>;
}

export default Board;