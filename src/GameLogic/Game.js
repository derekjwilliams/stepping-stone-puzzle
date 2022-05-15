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

  /**
   * @returns {number} Number of positions that have huts
   * @private
   */
  var getHutCount = function (gamePositions) {
    return gamePositions.flat().filter(p => p.kind === Hut).length
  }

  this.memoizedGetHutCount = memoizeOne(getHutCount)

  /**
   * Get all neighbor positions on the board, typically 8.  In the case of positions on the edge of the board a null
   * is returned for that position, because there are no positions beyoud the edge of the board
   * @param {number} size game size
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   * @private 
   * @returns {array} all Neigbor coordinates on the board in order: top, topright, right, bottomright, bottom, bottomleft, left, topleft; null if not present
  */
  var getNeighborCoordinates = function (size, x, y) {
    return [
      y > 0 ? [y - 1, x] : null,
      y > 0 && x < size - 1 ? [y - 1, x + 1] : null,
      x < size - 1 ? [y, x + 1] : null,
      y < size - 1 && x < size - 1 ? [y + 1, x + 1] : null,
      y < size - 1 ? [y + 1, x] : null,
      y < size - 1 && x > 0 ? [y + 1, x - 1] : null,
      x > 0 ? [y, x - 1] : null,
      y > 0 && x > 0 ? [y - 1, x - 1] : null]
  }

  this.memoizedGetNeighborCoordinates = memoizeOne(getNeighborCoordinates)

  // This creates a 2d array
  this.gamePositions = [...new Array(size)].map(() => [...new Array(size)]).map((row, i) =>
    row.map((_, j) =>
      (new GamePosition({ x: j, y: i, game: this }))
    )
  );
}

/**
 * Get the sum of all of the neighbor's piece values
 * @param {Array} array of row and column game position pairs
 * @returns 
 */
Game.prototype.calculateValue = function (position) {
  const coordinates = this.memoizedGetNeighborCoordinates(this.gamePositions.length, position.x, position.y)
  return coordinates.filter(value => value != null)
    .map(c => this.gamePositions[c[0]][c[1]].pieceValue)
    .reduce((p, v) => p + v, 0);
}

Game.prototype.memoizedCalculateValue = memoizeOne(Game.prototype.calculateValue)

/**
 * Place the piece if possible, returns false if a piece cannot be placed, the type of piece if it can be placed
 * @param {object} params
 * @param {number} params.x x coordinate
 * @param {number} params.y y coordinate
 * @returns {(boolean|string)}
 */
Game.prototype.placePiece = function ({ x, y }) {
  const hutCount = this.memoizedGetHutCount(this.gamePositions);
  if (this.gamePositions[y][x].placeHut(hutCount)) {
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
  return `Size: ${this.gamePositions.length}, Huts: ${this.memoizedGetHutCount(this.gamePositions)} placed out of ${this.hutLimit}`;
};