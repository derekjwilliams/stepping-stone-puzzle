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

## Notes

[Flow](https://flow.org/en/docs/) is optional, feel free to add types to clarify code

Feel free to use [ESDoc](https://jsdoc.app/) tags if desired

# Code Documentation

*Note: Generated using jsdoc-to-markdown*

<a name="Game"></a>

## Game(params)
Represents an infinite stepping stone game, @see [https://www.youtube.com/watch?v=m4Uth-EaTZ8](https://www.youtube.com/watch?v=m4Uth-EaTZ8)

**Kind**: global function  

| Param | Type |
| --- | --- |
| params | <code>object</code> | 
| params.size | <code>number</code> | 
| params.hutLimit | <code>number</code> |  


* [Game(arrayIndices)](#Game)
    * [.getNeighbors(position)](#Game+getNeighbors) ⇒ <code>array</code>
    * [.getNeighborsSum(position)](#Game+getNeighborsSum) ⇒ <code>number</code>
    * [.getHutCount()](#Game+getHutCount) ⇒ <code>number</code>
    * [.placePiece(arrayIndices)](#Game+placePiece) ⇒ <code>boolean</code> \| <code>string</code>
    * [.getInfo()](#Game+getInfo) ⇒ <code>string</code>

<a name="Game+getNeighbors"></a>

### game.getNeighbors(position) ⇒ <code>array</code>
Get all neighbors on the board, typically 8.  In the case of positions on the edge of the board a null
is returned for that position, because there are no positions beyoud the edge of the board

**Kind**: instance method of [<code>Game</code>](#Game)  
**Returns**: <code>array</code> - all Neigbors on the board in order topleft, top, topright, right, bottomright, bottom, bottomleft, left; null if not present  

| Param | Type |
| --- | --- |
| position | <code>GamePosition</code> | 

<a name="Game+getNeighborsSum"></a>

### game.getNeighborsSum(position) ⇒ <code>number</code>
Get the sum of all of the neighbor's piece values

**Kind**: instance method of [<code>Game</code>](#Game)  
**Returns**: <code>number</code> - the sum of all of the neighbor's piece values  

| Param | Type |
| --- | --- |
| position | <code>GamePosition</code> | 

<a name="Game+getHutCount"></a>

### game.getHutCount() ⇒ <code>number</code>
**Kind**: instance method of [<code>Game</code>](#Game)  
**Returns**: <code>number</code> - Number of postions that have huts  
<a name="Game+placePiece"></a>

### game.placePiece(arrayIndices) ⇒ <code>boolean</code> \| <code>string</code>
Place the piece if possible, returns false if a piece cannot be placed, the type of piece if it can be placed

**Kind**: instance method of [<code>Game</code>](#Game)  

| Param | Type |
| --- | --- |
| arrayIndices | <code>object</code> | 
| arrayIndices.row | <code>number</code> | 
| arrayIndices.column | <code>number</code> | 

<a name="Game+getInfo"></a>

### game.getInfo() ⇒ <code>string</code>
**Kind**: instance method of [<code>Game</code>](#Game)  
**Returns**: <code>string</code> - String representing information about the game

<a name="GamePosition"></a>

## GamePosition(row, column, game)
Represents a Game Position in an infinite stepping stone game, @see [https://www.youtube.com/watch?v=m4Uth-EaTZ8](https://www.youtube.com/watch?v=m4Uth-EaTZ8)

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>number</code> |  |
| column | <code>number</code> |  |
| game | <code>Game</code> | the game that contains this position |


* [GamePosition(row, column, game)](#GamePosition)
    * [.placeHut()](#GamePosition+placeHut) ⇒ <code>boolean</code>
    * [.placeStep(value)](#GamePosition+placeStep) ⇒ <code>boolean</code>

<a name="GamePosition+placeHut"></a>

### gamePosition.placeHut() ⇒ <code>boolean</code>
place a Hut if possible

**Kind**: instance method of [<code>GamePosition</code>](#GamePosition)  
**Returns**: <code>boolean</code> - true if hut was placed  
<a name="GamePosition+placeStep"></a>

### gamePosition.placeStep(value) ⇒ <code>boolean</code>
place a Step if possible

**Kind**: instance method of [<code>GamePosition</code>](#GamePosition)  
**Returns**: <code>boolean</code> - true if step was placed  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | value of the step |



