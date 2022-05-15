const BoardPosition = ({ size, kind, pieceValue, y, x, handleClick }) => {
  const stlyes = {
    empty: {
      backgroundColor: '#498589',
      border: '1px solid white',
    },
    hut: {
      backgroundColor: '#aa7070',
      borderRadius: '50%',
      border: '1px solid white',
      display: 'grid',
      placeItems: 'center'
    },
    step: {
      backgroundColor: '#ccc',
      border: '1px solid white',
      borderRadius: '50%',
      display: 'grid',
      placeItems: 'center'
    }
  }
  const valueStyle = {
    cursor: 'default',
    fontSize: `calc(${50/size}vmin)`
  }

  return <div className="game-board__square" style={stlyes[kind]} onClick={() => handleClick({ x, y })}>
    <div style={valueStyle}>{pieceValue !== 0 ? pieceValue : ''}</div>
  </div>;
}


export default BoardPosition;
