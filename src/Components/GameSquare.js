function GameSquare({row, column, onChildClick}) {
  function handleClick() {
    onChildClick(row, column);
  }

  const style = {
      border: '1px solid #eee',
      backgroundColor:  '#498589',
      color: '#000'
  };
  return <div className="game-board__square" style={style} onClick={handleClick}></div>;
}

export default GameSquare;