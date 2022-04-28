import { GamePosition, Empty, Hut } from "./GamePosition";


//TODO memoize expensive functions as needed, see memoize-one library.  
// Profile to find the expensive functions first of course, the possible
// functions that may be expensive are getNeighborsSum and getHutCount

/**
 *
 * Represents an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 *
 * @param {number, number}
 */
export function Game({ size = 21, hutLimit = 2 }) {
  size = size % 2 === 0 ? size + 1 : size;
  this.hutLimit = hutLimit;
  this.stepValue = 2;

  this.gamePositions = [...new Array(size)].map(() => [...new Array(size)]).map((row, i, a) =>
    row.map((position, j) =>
      (new GamePosition(i, j, this))
    )
  );
}

/**
 * Get all neighbors on the board, typically 8.  In the case of positions on the edge of the board fewer 
 * than 8 positions are returned, because there are no positions beyoud the edge of the board
 * @param {GamePosition} position 
 * @returns all Neigbors on the board
 */
Game.prototype.getNeighbors = function (position) {
  const size = this.gamePositions.length;// assumes square game
  const row = position.row;
  const column = position.column;

  //Order in array: topleft, top, topright, right, bottomright, bottom, bottomleft, left
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

/**
 * 
 * @param {GamePosition} position 
 * @returns 
 */
Game.prototype.getNeighborsSum = function (position) {
  return this.getNeighbors(position).map(n => n.pieceValue).reduce((p, v) => p + v, 0);  
}

/**
 * @returns Number of postions that have huts
 */
Game.prototype.getHutCount = function () {
  return this.gamePositions.flat().filter(p => p.kind === Hut).length
}

Game.prototype.placePiece = function ({row, column}) {
  const position = this.gamePositions[row][column]
  const hutCount = this.getHutCount();
  if (hutCount <  this.hutLimit) {
    position.addHut();
  }
  else {
    if (position.addStep(this.stepValue)) {
      this.stepValue = this.stepValue + 1;
    }
  }
}

Game.prototype.getInfo = function () {
  return `Size: ${this.gamePositions.length}, Huts: ${this.getHutCount()} placed out of ${this.hutLimit}`;
};