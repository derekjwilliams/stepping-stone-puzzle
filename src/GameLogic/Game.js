import { GamePosition, EmptyPosition, Hut, Step } from "./GamePosition";

/** 
 * Represents an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 */

export function Game({ size = 21, hutLimit = 2 }) {
  size = size % 2 === 0 ? size + 1 : size;
  this.hutLimit = hutLimit;
  this.stepValue = 2;

  this.gamePositions = [...new Array(size)].map(() => [...new Array(size)]).map((row, i, a) =>
    row.map((position, j) =>
      (new GamePosition(EmptyPosition, [j - (size - 1) / 2, - (i - (size - 1) / 2)], this))
    )
  );
}

//TODO memoize, see memoize-one library
Game.prototype.getNeighbors = function (position) {
  const size = this.gamePositions.length;// assumes square game
  const row = (this.gamePositions.length - 1) / 2 - position.coordinates[1];
  const column = (this.gamePositions.length - 1) / 2 + position.coordinates[0];

  //topleft, top, topright, right, bottomright, bottom, bottomleft, left
  return [row > 0 && column > 0 ? this.gamePositions[row - 1][column - 1] : null,
    row > 0 ? this.gamePositions[row - 1][column] : null,
    row > 0 && column <= size ? this.gamePositions[row - 1][column + 1] : null,
    column <= size ? this.gamePositions[row][column + 1] : null,
    row <= size && column <= size ? this.gamePositions[row + 1][column + 1] : null,
    row <= size ? this.gamePositions[row + 1][column] : null,
    row <= size && column > 0 ? this.gamePositions[row + 1][column - 1] : null,
    column > 0 ? this.gamePositions[row][column - 1] : null]
   .filter(value => value != null);
}

//TODO memoize, see memoize-one library
Game.prototype.getNeighborsSum = function (position) {
  return this.getNeighbors(position).map(n => n.pieceValue).reduce((p, v) => p + v, 0);  
}

//TODO memoize, see memoize-one library
Game.prototype.getHutCount = function () {
  return this.gamePositions.flat().filter(p => p.kind === Hut).length
}

Game.prototype.placePiece = function (x, y) {
  // console.log(x, y)
  const row = (this.gamePositions.length - 1) / 2 - y;
  const column = (this.gamePositions.length - 1) / 2 + x;
  const position = this.gamePositions[row][column]
  const hutCount = this.getHutCount();
  if (hutCount < this.hutLimit) {
      position.addHut();
  }
}

Game.prototype.getInfo = function () {
  return `Size: ${this.gamePositions.length}, Huts: ${this.getHutCount()} placed out of ${this.hutLimit}`;
};