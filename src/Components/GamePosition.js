import { withTheme } from "styled-components";

const GamePosition = ({ kind, pieceValue, row, column, handleClick }) => {
  const stlyes = {
  empty : {
    backgroundColor: '#498589',
    border: '1px solid white',

  },
  hut : {
    margin: '0.1em',
    backgroundColor: '#aa7070',
    // color: '#000',
    borderRadius: '50%',
    border: '1px solid white',
    display: 'grid',
    placeItems: 'center'
  },
  step : {
    margin: '0.1em',
    backgroundColor: '#ccc',
    // color: '#000',
    borderRadius: '50%',
    display: 'grid',
    placeItems: 'center'
  }
}

  return <div className="game-board__square" style={stlyes[kind]} onClick={() => handleClick(column, row)}>
    <div>{pieceValue !== 0? pieceValue : ''}</div></div>;
}


export default GamePosition;
