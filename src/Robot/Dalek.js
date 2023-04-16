import { Game } from "../GameLogic/Game"
import _ from 'lodash';

  /**
   * Click handler, place the piece if possible
   * @param {Game} game
   */
export function Dalek(game) {

  this.game = game;

  Dalek.prototype.start = function () {
    const { result, lastPosition } = this.play(0); // TODO we will need a directed graph of games for each possible future sequence,
    return result;
  };
  // this.game = game
  // Dalek.prototype.start = function () {
  //   const lastIndex = this.play(0) // TODO we will need a directed graph of games for each possible future sequence, 
  //   return lastIndex
  // }
  Dalek.prototype.locateInitialHutPositions = function () {
    // iterate through the game positions to find all positions that meet the criteria that at least one initial step can be placed
    const game = this.game; //_.cloneDeep(this.game);
    const hutLimit = game.hutLimit
    const width = game.size
    const height = game.size
    game.placeOrRemovePiece({x: 1, y: 1})
    console.log(width)

    return 0

  }

  Dalek.prototype.play = function (startIndex) {
    this.locateInitialHutPositions()
    const availablePositions = game.getAvailablePositions();
    if (availablePositions.length > 0) {
      for (let i = startIndex; i < availablePositions.length; i++) {
        game.placeOrRemovePiece(availablePositions[i]);
        const { result } = this.play(i); // recursive, TODO a graph of possible huts with available positions would be "cheaper" than saving an entire grid
        return { result, lastPosition: availablePositions[i] };
      }
    }
    return { result: this.game, lastPosition: null };
  };

  // Dalek.prototype.play = function (startIndex) {
  //   const availablePositions = game.getAvailablePositions();
  //   if (availablePositions.length > 0) {
  //     for (let i = startIndex; i < availablePositions.length; i++) {
  //       game.placePiece(availablePositions[i]);
  //       const { result } = this.play(i); // recursive, TODO a graph of possible huts with available positions would be "cheaper" than saving an entire grid
  //       return { result, lastPosition: availablePositions[i] };
  //     }
  //   }
  //   return { result: this.game, lastPosition: null };
  // };
  // Dalek.prototype.play = function (startIndex) {
  //   const availablePositions = game.getAvailablePositions()
  //   if (availablePositions.length > 0) {
  //     // while(lastIndex < availablePositions.length) {
  //     for(let i = 0; i < availablePositions.length; i++) {
  //       const foundPosition = game.placePiece(availablePositions[i])
  //       debugger
  //       console.log('lastIndex: ', i, 'startIndex: ', startIndex)
  //       const result = this.play(i) // recursive, TODO a graph of possible huts with available positions would be "cheaper" than saving an entire grid
  //       return i
  //     }
  //   }
  //   console.log('lastIndex length not greater than zero: ', lastIndex)
  //   return -1;
  //   // return {result: this.game, lastPosition: null }
  // }
}

//shamelessly stolen from here https://stackoverflow.com/questions/30452263/is-there-a-mechanism-to-loop-x-times-in-es6-ecmascript-6-without-mutable-varia
// a better alternative *may be* fext http://glat.info/fext/

// const recur = (...args) =>
//   ({ type: recur, args })
  
// const loop = f =>
//   {
//     let acc = f ()
//     while (acc.type === recur)
//       acc = f (...acc.args)
//     return acc
//   }

// const repeat = $n => f => x =>
//   loop ((n = $n, acc = x) =>
//     n === 0
//       ? acc
//       : recur (n - 1, f (acc)))
      
// const inc = x =>
//   x + 1

// const fibonacci = $n =>
//   loop ((n = $n, a = 0, b = 1) =>
//     n === 0
//       ? a
//       : recur (n - 1, b, a + b))
      
// console.log (repeat (1e7) (inc) (0)) // 10000000
// console.log (fibonacci (100))        // 354224848179262000000