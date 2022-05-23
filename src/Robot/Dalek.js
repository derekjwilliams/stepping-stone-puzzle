import { Game } from '../GameLogic/Game'
export function Dalek(game) {
  this.game = game
  const availablePositions = game.getAvailablePositions()
  console.log(availablePositions[0])
  // board.handlePositionClicked({x: availablePositions[0].x, y: availablePositions[0].y})
  game.placePiece(availablePositions[0])
  // const c = game.memoizedGetNeighborCoordinates(19, 2,2)
  // console.log(c)
  Dalek.prototype.play = function () {
    return this.game
  }
}
  