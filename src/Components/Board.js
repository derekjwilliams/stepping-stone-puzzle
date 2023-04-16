import BoardPosition from './BoardPosition';
import { Game } from '../GameLogic/Game.js';
import React, { useState } from 'react';
import _ from 'lodash';
import { Empty, AllowedStep, Hut } from '../GameLogic/GamePosition';
import {Dalek} from '../Robot/Dalek'

function Board({ size, hutLimit}) {
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
    margin: '0px',
  }

  const hutLimitControlStyle = {
    margin: '10px'
  }
  const hutLimitButtonStyle = {
    marginLeft: '10px',
    width: '30px',
    fontFamily: 'Helvetica',
    fontSize: '1rem'
  }
  const resetButtonStyle = {
    margin: '10px',
    fontFamily: 'Helvetica',
    fontSize: '1rem'
  }
  const labelStyle = {
    margin: '10px',
    fontFamily: 'Helvetica',
    fontSize: '1rem'
  }

  const [startHutCount, setStartHutCount] = useState(hutLimit);
  const [game, setGame] = useState(new Game({size, hutLimit: 2}));
  
  //const [gamePositions, setGamePositions] = useState(game.gamePositions);
  //game.gamePositions[Math.floor((size) / 2)][Math.floor((size) / 2)].placeOrRemoveHut();

  /**
   * Click handler, place the piece if possible
   * @param {object} arrayIndices
   * @param {number} arrayIndices.x
   * @param {number} arrayIndices.y
   */
  function handlePositionClicked({ x, y }) {
    game.placeOrRemovePiece({ x, y })
      const newgame = _.cloneDeep(game)
      setGame(newgame);
    
  }

  function handleReset() {
    const newGame = new Game({size, hutLimit: startHutCount})
    newGame.gamePositions[Math.floor((size) / 2)][Math.floor((size) / 2)].placeOrRemoveHut();
    setGame(newGame);
  }

  function handleAutoplay() {

    const dalek = new Dalek(game);
    const g = dalek.start();
    console.log(g);
    const nextGame = _.cloneDeep(g);
    setGame(nextGame);
  }

  function handleIncrement() {
    setStartHutCount(startHutCount + 1)
    const newGame = new Game({ size, hutLimit: startHutCount + 1 })
    // newGame.gamePositions[Math.floor((size) / 2)][Math.floor((size) / 2)].this.hutLimitReached();
    setGame(newGame);
  }

  function handleDecrement() {
    if (startHutCount >= 3) {
      setStartHutCount(startHutCount - 1)
      const newGame = new Game({ size, hutLimit: startHutCount - 1 })
      // newGame.gamePositions[Math.floor((size) / 2)][Math.floor((size) / 2)].hutLimitReached();
      setGame(newGame);
    }
  }
  const hutCount = game.gamePositions.flat().filter(p => p.kind === Hut).length

  return <div>
    <span style={controlPanelStyle} className="control-panel">
      <button style={resetButtonStyle} onClick={() => handleReset()}>New Game</button>
    </span>
    <span style={controlPanelStyle} className="control-panel">
      <button style={resetButtonStyle} onClick={() => handleAutoplay()}>Autoplay</button>
    </span>
    <span style={hutLimitControlStyle}>
      <span style={labelStyle}>Number of Initial Huts: </span>
      <span>{startHutCount}</span>
      <span>
        <button style={hutLimitButtonStyle} onClick={() => handleDecrement()}>-</button>
      </span>
      <span>
        <button style={hutLimitButtonStyle} onClick={() => handleIncrement()}>+</button>
      </span>
      <span style={labelStyle}>Huts Placed: {hutCount}</span>
    </span>

    <div style={style}>
      {game.gamePositions.map((row, i, array) =>
        row.map((square, j) => {
          let kind = square.kind;
          if (square.kind === Empty) {
            if (game.calculateValue(array[i][j]) === game.stepValue) {
                kind = AllowedStep
            }
          }
          return <BoardPosition size={size}
            pieceValue={square.pieceValue}
            kind={kind}
            y={i}
            x={j}
            key={'' + i * 10 + j}
            handleClick={handlePositionClicked} />
        })
      )
      }
    </div>
  </div>;
}

export default Board;