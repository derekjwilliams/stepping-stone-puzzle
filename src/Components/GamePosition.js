function GamePosition({row, column, onPositionClick}) {
  function handleClick() {
    onPositionClick(column, row);
  }

  const style = {
      border: '1px solid #eee',
      backgroundColor:  '#498589',
      color: '#000'
  };
  return <div className="game-board__square" style={style} onClick={handleClick}></div>;
}

export default GamePosition;