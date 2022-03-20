# stepping-stone-puzzle
Fun with the stepping stone puzzle (see Ladoucear and Rebenstock).

Inspired by the [Numberphile Video](https://www.youtube.com/watch?v=m4Uth-EaTZ8)

Code Sandbox [here](https://codesandbox.io/s/fancy-river-grtdzw)

## Goals

Create a simple stepping stone game that can be played in the browser, the game must enforce the rule that the placed stone (step) value must equal the sum of the adjacent stones (e.g. step and huts). 

Bonus points, in no order:

- Undo 
- Redo
- Save Game
- Suggested Move
- Suggested Future Moves
- Inform player that their move blocks maximum (can only be done for huts, starting stones, of 1 through 6, above that the maximum value is not known)
- Multiplayer
- Automated play

## Technology Candidates

### Rendering
[D3.js](https://d3js.org) is really nice.  Using simple CSS Grid is also an option and *may* have the lowest learning curve for less experienced JavaScript developers.

### State

Manange the state of the game, should include easy ability to undo and the ability to read a previous game.

Will likely start with [Recoil](https://recoiljs.org) since it seems to provide what we need.  However, [XState](https://xstate.js.org) definitely has some strengths, including the fact that it uses the [SCXML notation](https://www.w3.org/TR/scxml/).  It may be worth doing a version of each to compare and contrast the developer experience.

For now we will use D3 and Recoil, if these don't easily provide the functionality needed then we may switch gears.
