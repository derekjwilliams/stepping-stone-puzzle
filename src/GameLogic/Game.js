import { GamePosition, Empty, Hut } from "./GamePosition";

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
 * Get all neighbors on the board, typically 8.  In the case of positions on the edge of the board a null
 * is returned for that position, because there are no positions beyoud the edge of the board
 * @param {GamePosition} position 
 * @returns {array} all Neigbors on the board in order topleft, top, topright, right, bottomright, bottom, bottomleft, left; null if not present
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
}

/**
 * Get the sum of all of the neighbor's piece values
 * @param {GamePosition} position 
 * @returns {number} the sum of all of the neighbor's piece values
 */
Game.prototype.getNeighborsSum = function (position) {
  return this.getNeighbors(position).filter(value => value != null).map(n => n.pieceValue).reduce((p, v) => p + v, 0);  
}

/**
 * @returns Number of postions that have huts
 */
Game.prototype.getHutCount = function () {
  return this.gamePositions.flat().filter(p => p.kind === Hut).length
}

/**
 * Place the piece if possible, returns false if a piece cannot be placed, the type of piece if it can be placed
 * @param {object} arrayIndices
 * @param {number} arrayIndices.row
 * @param {number} arrayIndices.column
 * @returns {(boolean|string)}
 */
Game.prototype.placePiece = function ({row, column}) {
  const position = this.gamePositions[row][column]
  const hutCount = this.getHutCount();
  if (position.placeHut()) {
    return true;
  }
  if (position.placeStep(this.stepValue)) {
      this.stepValue++;
      return true;
  }
  return false;
}

/**
 * @returns String representing information about the game
 */
Game.prototype.getInfo = function () {
  return `Size: ${this.gamePositions.length}, Huts: ${this.getHutCount()} placed out of ${this.hutLimit}`;
};

//TODO: memoize expensive functions as needed, see memoize-one library.  
// Profile to find the expensive functions first of course, the possible
// functions that may be expensive are getNeighborsSum and getHutCount
