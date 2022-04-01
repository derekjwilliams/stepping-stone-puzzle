import GameSquare from './GameSquare'

function Board(props) {
  const boardSquares = [...new Array(props.size)].map(() => [...new Array(props.size)]) //each row has a column of values
  const style = {
    display: 'grid',
    margin: '0 auto',
    gridGap: 0,
    gridTemplateColumns: `repeat(${props.size}, ${500/props.size}px)`,
    gridTemplateRows: `repeat(${props.size}, ${500/props.size}px) ${500/props.size}px`,
    padding: '1.5em',
  }

  function handleClick(row, column) {
    console.log('clicked', 'row: ' + row, 'column: ' + column)
    // update game state here
  }

  return <div style={style}>
    {boardSquares.map((row, i) => 
      row.map((square, j) => 
        <GameSquare row={- (i - (props.size - 1)/2)} column={j - (props.size - 1)/2} key={'' + i * 10 + j} handleClick={handleClick}></GameSquare>)
    )
    }
  </div>
}

export default Board;