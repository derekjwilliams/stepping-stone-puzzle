
/**
 * Represents a Game Position in an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 * @param {number} row 
 * @param {number} column 
 * @param {Game} game the game that contains this position
 */
export function GamePosition(row, column, game) {
  this.kind = Empty;
  this.row = row;
  this.column = column;
  this.pieceValue = 0;
  this.game = game;
}

/**
 * place a Hut if possible
 * @returns {boolean} true if hut was placed
 */
GamePosition.prototype.placeHut = function () {
  const hutCount = this.game.getHutCount();
  if (hutCount <  this.game.hutLimit && this.kind === Empty) {
    this.kind = Hut;
    this.pieceValue = 1;
    return true;
  }
  return false;
};

/**
 * place a Step if possible
 * @param {number} value value of the step
 * @returns {boolean} true if step was placed
 */
GamePosition.prototype.placeStep = function (value) {
  if (this.kind === Empty) {
    const neigborsSum = this.game.getNeighborsSum(this);
    if (value === neigborsSum) {
      this.kind = Step;
      this.pieceValue = value;
      return true;
    }
    return false;
  }
  return false;
};

export const Empty = 'empty';
export const Hut = 'hut';
const Step = 'step';