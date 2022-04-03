/** 
 * Represents an infinite stepping stone game, @see {@link https://www.youtube.com/watch?v=m4Uth-EaTZ8}
 */
// @flow
// {kind: string}
// {coordinates: Array<number>}
export function GamePosition(kind = 'empty', coordinates = [0,0]) {
  this.kind = kind;
  this.coordinates = coordinates;
}
/**
 * 
 * @returns string representation of the object for debugging
 */
GamePosition.prototype.info = function() {
  return `kind: ${this.kind}, coordinates: ${this.coordinates}`;
};

//TODO add separate prototypes for hut and step
GamePosition.prototype.addHut = function() {
  this.kind = 'hut';
  this.value = 1;
};

GamePosition.prototype.addStep = function(stepValue) {
  //TODO check to see if valid, e.g. the math works: not occupied and stepValue is the sum of all neighbors
  this.kind = 'step';
  this.value = stepValue;
};