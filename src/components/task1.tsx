import React, { useState } from 'react';

const Task1 = () => {
  const [tasks, setTasks] = useState([{ title: '' }]);
  const [inputValue, setInputValue] = useState('');

  return (
    <div>
      <div className="to-do-list">
        <input
          type="text"
          className="to-do-list__input"
          placeholder="Write your task here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="to-do-list__btn-add"
          onClick={() => { setTasks([...tasks, { title: inputValue }]); setInputValue(''); }}
        >
          Add
        </button>
        {tasks.map((item) => (
          <ul>
            <li>{item.title}</li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Task1;
