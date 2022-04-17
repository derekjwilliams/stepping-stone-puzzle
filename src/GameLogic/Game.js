import { GamePosition } from "./GamePosition";

export default Game;

/** 
 * Represents an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 */
// @flow
// {size: number}
// {hutLimit: number}
export function Game({ size = 11, hutLimit = 2 }) {
  size = size % 2 === 0 ? size + 1 : size;
  this.hutLimit = hutLimit;
  this.gamePositions = [...new Array(size)].map(() => [...new Array(size)]).map((row, i, a) =>
    row.map((position, j) =>
      (new GamePosition('empty', [j - (size - 1) / 2, - (i - (size - 1) / 2)]))
    )
  );
}

Game.prototype.getHutCount = function() {
  return this.gamePositions.flat().filter(p => p.kind === 'hut').length
}

/**
 * Just hack the game logic, better implementation should use XState or equivilant
 * TODO: use a real finite state machine instead of hacking, e.g. hutCount should not be calculated, not st
 */
// @flow
// {x: number}
// {y: number}
Game.prototype.placePiece = function (x, y) {
  console.log(x, y)
  const row = (this.gamePositions.length - 1)/2 - y;
  const column = (this.gamePositions.length - 1)/2 + x;
  const position = this.gamePositions[row][column]
  const hutCount = this.getHutCount();
  if (hutCount <  this.hutLimit) {
    if (position.kind === 'empty') {
      position.addHut();
    }
    console.log(position);
    console.log('hutCount: ' + hutCount)
  }
}

Game.prototype.getInfo = function () {
  return `Size: ${this.gamePositions.length}, Huts: ${this.getHutCount()} placed out of ${this.hutLimit}`;
};

//TODO: Create boardPositions as needed for performance

