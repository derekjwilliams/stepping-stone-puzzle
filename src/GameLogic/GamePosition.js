import { Game } from "./Game";

export function GamePosition(kind = EmptyPosition, coordinates = [0, 0], game) {
  this.kind = kind;
  this.coordinates = coordinates;
  this.pieceValue = 0;
  this.game = game;
}

GamePosition.prototype.addHut = function () {
  if (this.kind === EmptyPosition) {
    this.kind = Hut;
    this.pieceValue = 1;
  }
};

GamePosition.prototype.addStep = function (stepValue) {
  if (this.kind === EmptyPosition) {
    const neigborsSum = this.game.getNeighborsSum(this);
    if (stepValue === neigborsSum) {
      this.kind = Step;
      this.pieceValue = stepValue;
      return true
    }
    return false;
  }
  return false;
};

export const EmptyPosition = 'empty';
export const Hut = 'hut';
export const Step = 'step';