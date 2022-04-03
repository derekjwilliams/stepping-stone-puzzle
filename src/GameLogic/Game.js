import { GamePosition } from "./GamePosition";

export default Game;

/** 
 * Represents an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 */
// @flow
// {size: number}
export function Game({ size = 11 }) {
  size = size % 2 === 0 ? size + 1 : size;
  this.boardPositions = [...new Array(size)].map(() => [...new Array(size)]).map((row, i, a) =>
    row.map((position, j) =>
      (new GamePosition('empty', [- (i - (size - 1) / 2), j - (size - 1) / 2]))
    )
  );
}

Game.prototype.info = function () {
  return `Size: ${this.boardPositions.length}, Positions: todo`;
};

//TODO: Create boardPositions as needed for performance

