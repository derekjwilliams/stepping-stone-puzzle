import { Game } from "../GameLogic/Game.js"
/**
 * Represents a Game Position in an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 * @param {object} params
 * @param {number} params.x
 * @param {number} params.y 
 * @param {Game} params.game the game that contains this position
 */
export function GamePosition({ x, y, game }) {
  this.kind = Empty;
  this.x = x;
  this.y = y;
  this.pieceValue = 0;
  this.game = game;
}

GamePosition.prototype = {
  /**
   * place a Hut if possible, if this is already a hut then remove it
   */
  placeOrRemoveHut: function (hutCount) {
    if (hutCount < this.game.hutLimit && this.kind === Empty) {
      this.kind = Hut;
      this.pieceValue = 1;
      return hutCount + 1;
    }
    if (this.kind === Hut &&
      this.game.stepNeighbors(this).length === 0 ||
      this.game.calculateValue(this) === 0) {
      this.kind = Empty;
      this.pieceValue = 0;
    }
    return hutCount;
  },
  /**
 * place a Step if possible
 * @param {number} value value of the step
 * @returns {boolean} true if step was placed
 */
  placeStep: function (value) {
    if (this.kind === Empty) {
      const neigborsSum = this.game.calculateValue(this);
      if (value === neigborsSum) {
        this.kind = Step;
        this.pieceValue = value;
        this.game.stepValue++;
        return true;
      }
      return false;
    }
    else if (this.kind === Step) { // remove last step
      if (this.pieceValue === this.game.stepValue - 1) {
        this.kind = Empty;
        this.pieceValue = 0;
        this.game.stepValue--;
        return true;
      }
    }
    return false;
  }
};

export const Empty = 'empty';
export const Hut = 'hut';
export const AllowedStep = 'allowedStep'
export const Step = 'step';