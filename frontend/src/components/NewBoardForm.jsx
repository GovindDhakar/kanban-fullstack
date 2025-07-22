import React, { useState } from 'react';

const NewBoardForm = ({ onCreate }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName('');
  };

  return (
    <>
      <input
        type="text"
        placeholder="New board name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit}>+ Create Board</button>
    </>
  );
};

export default NewBoardForm;
