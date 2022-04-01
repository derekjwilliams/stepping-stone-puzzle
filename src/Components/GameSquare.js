function GameSquare(props) {
  const style = {
      border: '1px solid #eee',
      backgroundColor:  '#498589',
      color: '#000'
  }
  return <div className="game-board__square" style={style} onClick={() =>props.handleClick(props.row, props.column)}></div>
}

export default GameSquare;