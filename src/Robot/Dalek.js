export function Dalek(game) {
  this.game = game
  Dalek.prototype.start = function () {
    const {result, lastPosition} = this.play(0) // TODO we will need a directed graph of games for each possible future sequence, 
    return result
  }
  Dalek.prototype.play = function (startIndex) {
    const availablePositions = game.getAvailablePositions()
    if (availablePositions.length > 0) {
      for(let i = startIndex; i < availablePositions.length; i++) {
        game.placePiece(availablePositions[i])
        const {result} = this.play(i) // recursive, TODO a graph of possible huts with available positions would be "cheaper" than saving an entire grid
        return { result, lastPosition: availablePositions[i] }
      }
    }
    return {result: this.game, lastPosition: null }
  }
}
  