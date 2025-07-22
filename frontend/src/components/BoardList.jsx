import React from 'react';

const BoardList = ({ boards, setSelectedBoardId, onDelete }) => {
  return (
    <>
      <h3>Boards</h3>
      <p>All boards</p>
      <ul>
        {boards.map(board => (
          <li key={board.id}>
            <button onClick={() => setSelectedBoardId(board.id)}>{board.name}</button>
            {' '}
            <button onClick={() => onDelete(board.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default BoardList;
