export function GamePosition(row, column, game) {
  this.kind = Empty;
  this.row = row;
  this.column = column;
  this.pieceValue = 0;
  this.game = game;
}

GamePosition.prototype.addHut = function () {
  if (this.kind === Empty) {
    this.kind = Hut;
    this.pieceValue = 1;
  }
};

GamePosition.prototype.addStep = function (stepValue) {
  if (this.kind === Empty) {
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

export const Empty = 'empty';
export const Hut = 'hut';
export const Step = 'step';