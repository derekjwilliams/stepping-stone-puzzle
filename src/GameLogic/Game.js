import { GamePosition, Hut, Empty, Step } from "./GamePosition.js";
import memoize from 'fast-memoize';

/**
 *
 * Represents an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 *
 * @param {object} params
 * @param {number} params.size
 * @param {number} params.hutLimit
 */
export function Game({ size, hutLimit }) {
  this.hutLimit = hutLimit;
  this.stepValue = 2;
  this.size = size;
  this.gamePositions = [...new Array(size)].map(() => [...new Array(size)]).map((row, i) =>
    row.map((_, j) =>
      (new GamePosition({ x: j, y: i, game: this }))
    )
  );
}

Game.prototype = {
  /**
   * Get all neighbor positions on the board, typically 8.  In the case of positions on the edge of the board a null
   * is returned for that position, because there are no positions beyoud the edge of the board
   * @param {number} size game size
   * @param {number} x x coordinate
   * @param {number} y y coordinate
   * @private 
   * @returns {array} all Neigbor coordinates on the board in order: top, topright, right, bottomright, bottom, bottomleft, left, topleft; null if not present
  */
  getNeighborCoordinates: function (x, y, size) {
    return [
      y > 0 ? [y - 1, x] : null,
      y > 0 && x < size - 1 ? [y - 1, x + 1] : null,
      x < size - 1 ? [y, x + 1] : null,
      y < size - 1 && x < size - 1 ? [y + 1, x + 1] : null,
      y < size - 1 ? [y + 1, x] : null,
      y < size - 1 && x > 0 ? [y + 1, x - 1] : null,
      x > 0 ? [y, x - 1] : null,
      y > 0 && x > 0 ? [y - 1, x - 1] : null]
  },
  /**
   * @returns {number} Number of positions that have huts
   */
  getHutCount: function () {
    const result = this.gamePositions.flat().filter(p => p.kind === Hut).length
    return result;
  },

  /**
   * Place the piece if possible, returns false if a piece cannot be placed, the type of piece if it can be placed
   * @param {object} params
   * @param {number} params.x x coordinate
   * @param {number} params.y y coordinate
   * @returns {void}
   */
  placeOrRemovePiece: function ({ x, y }) {
    const hutCount = this.getHutCount();
    const newHutCount = this.gamePositions[y][x].placeOrRemoveHut(hutCount)
    if (newHutCount != hutCount) {
      return;
    }
    this.gamePositions[y][x].placeStep(this.stepValue)
  },
  /**
   * Get the sum of all of the neighbor's piece values
   * @param {GamePosition} position of row and column game position pairs
   * @returns 
   */
  calculateValue: function (position) {
    const coordinates = this.getNeighborCoordinates(position.x, position.y, this.size)
    const positions = coordinates.filter(value => value != null)
      // @ts-ignore
      .map(c => this.gamePositions[c[0]][c[1]])

    const validPositions = positions.filter(position => true)
    const values = validPositions.map(validPosition => validPosition.pieceValue)
    return values.reduce((p, v) => p + v, 0)
  },
  /**
   * Get the sum of all of the neighbor's piece values
   * @param {Array<GamePosition>} array of row and column game position pairs
   * @returns 
   */
  stepNeighbors: memoize(function (position) {
    const coordinates = this.getNeighborCoordinates(position.x, position.y, this.size)

    const positions = coordinates.filter(value => value != null)
      // @ts-ignore
      .map(c => this.gamePositions[c[0]][c[1]])
    const postionsThatAreSteps = positions.filter(position => position.kind === Step)
    return postionsThatAreSteps
  }),
  /**
   * @returns {Array<GamePosition>} array of available game positions
   */
  getAvailablePositions: function () {
    const ss = this.stepValue;
    const game = this;
    const v = function (row) {
      const result = []
      row.forEach(position => {
        if (game.calculateValue(position) === ss && position.kind === Empty) {
          result.push(position)
        }
      })
      return result
    }
    const result = [];
    this.gamePositions.forEach((row) => {
      const foundPositions = v(row)
      foundPositions.forEach(p => result.push(p))
    })
    console.log("Found positions: ", result)
    return result;
  }
}
export default Game;
