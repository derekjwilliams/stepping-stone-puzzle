import { GamePosition, Hut } from "./GamePosition";
import memoizeOne from 'memoize-one';

/**
 *
 * Represents an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 *
 * @param {object} params
 * @param {number} params.size
 * @param {number} params.hutLimit
 */
export function Game({ size = 21, hutLimit = 2 }) {
  this.hutLimit = hutLimit;
  this.stepValue = 2;

  // Don't worry be happy, this creates a 2d array
  this.gamePositions = [...new Array(size)].map(() => [...new Array(size)]).map((row, i) =>
    row.map((_, j) =>
      (new GamePosition({x: j, y: i, game: this}))
    )
  );
}

/**
 * Get all neighbor positions on the board, typically 8.  In the case of positions on the edge of the board a null
 * is returned for that position, because there are no positions beyoud the edge of the board
 * @param {GamePosition} position 
 * @returns {array} all Neigbors on the board in order: top, topright, right, bottomright, bottom, bottomleft, left, topleft; null if not present
 */

Game.prototype.getNeighborPositions = function({size, x, y}) {
  return [
    y > 0 ? [y - 1, x] : null,
    y > 0 && x < size -1 ? [y - 1, x + 1] : null,
    x < size - 1 ? [y, x + 1] : null,
    y < size - 1 && x < size -1 ? [y + 1, x + 1] : null,
    y < size - 1 ? [y + 1, x] : null,
    y < size - 1 && x > 0 ? [y + 1, x - 1] : null,
    x > 0 ? [y, x - 1] : null,
    y > 0 && x > 0 ? [y - 1, x - 1] : null]
}

Game.prototype.memoizedGetNeighborPositions = memoizeOne(Game.prototype.getNeighborPositions)

/**
 * Get the sum of all of the neighbor's piece values
 * @param {number} size board size
 * @param {GamePosition} position 
 * @returns {number} the sum of all of the neighbor's piece values
 */
Game.prototype.getNeighborsSum = function (position) {
  const positions = this.memoizedGetNeighborPositions({size:this.gamePositions.length, x:position.x, y:position.y})
  return positions.filter(value => value != null)
                                    .map(c => this.gamePositions[c[0]][c[1]].pieceValue)
                                    .reduce((p, v) => p + v, 0);  

}

//TODO this will always return hutLimit once all huts have been placed
/**
 * @returns {number} Number of positions that have huts
 */
Game.prototype.getHutCount = function () {
  return this.gamePositions.flat()
                           .filter(p => p.kind === Hut).length
}

/**
 * Place the piece if possible, returns false if a piece cannot be placed, the type of piece if it can be placed
 * @param {number} arrayIndices.y
 * @param {number} arrayIndices.x
 * @returns {(boolean|string)}
 */
Game.prototype.placePiece = function ({x, y}) {
  if (this.gamePositions[y][x].placeHut()) {
    return true;
  }
  if (this.gamePositions[y][x].placeStep(this.stepValue)) {
    return true;
  }
  return false;
}

/**
 * @returns {string} String representing information about the game
 */
Game.prototype.getInfo = function () {
  return `Size: ${this.gamePositions.length}, Huts: ${this.getHutCount()} placed out of ${this.hutLimit}`;
};