const BoardPosition = ({kind, pieceValue, row, column, handleClick }) => {
  const stlyes = {
  empty : {
    backgroundColor: '#498589',
    border: '1px solid white',
  },
  hut : {
    backgroundColor: '#aa7070',
    borderRadius: '50%',
    border: '1px solid white',
    display: 'grid',
    placeItems: 'center'
  },
  step : {
    backgroundColor: '#ccc',
    border: '1px solid white',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center'
  }
}

  return <div className="game-board__square" style={stlyes[kind]} onClick={() => handleClick({row, column})}>
           <div>{pieceValue !== 0? pieceValue : ''}</div>
         </div>;
}


export default BoardPosition;
