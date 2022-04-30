import React, { useState } from 'react';

type TasksDetails = {
  title:string,
  isDone:boolean
  isBeingEdited:boolean
}

const Task4 = () => {
  const [tasks, setTasks] = useState<TasksDetails[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [newTaskList, setNewTaskList] = useState<TasksDetails[]>([]);

  const getChecked = (index:number) => {
    const newArray = [...newTaskList];
    newArray[index].isDone = !newArray[index].isDone;
    return newArray;
  };

  return (
    <div className="container">
      <div className="row center-xs">
        <div className="cold-xs-4">
          <div className="toDoList">
            <input
              type="text"
              className="task2input"
              placeholder="Write your task here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="toDoListbtn-add"
              onClick={() => {
                setTasks([...tasks, { title: inputValue, isDone: false, isBeingEdited: false }]);
                setNewTaskList([...newTaskList, { title: inputValue, isDone: false, isBeingEdited: false }]);
                setInputValue('');
              }}
            >
              Add
            </button>
            {tasks.map(({ isDone, title, isBeingEdited }, index) => (
              <div>
                <input
                  type="checkbox"
                  className="toDoListcheckbox"
                  onChange={() => { setTasks(getChecked(index)); }}
                  checked={isDone}
                />
                <span
                  className="task2list"
                  style={{ textDecoration: isDone ? 'line-through' : 'none' }}
                >
                  {title}
                </span>
                <button
                  className="toDoListbtn-close"
                  onClick={() => {
                    setNewTaskList(newTaskList.filter((_, i) => (i !== index)));
                    setTasks(tasks.filter((_, i) => (i !== index)));
                  }}
                >
                  x
                </button>
              </div>
            ))}
            {tasks.length > 0 && (
              <div key={Math.random()}>
                <button
                  className="toDoListbtn-add"
                  onClick={() => {
                    setTasks(newTaskList);
                  }}
                >
                  All
                </button>
                <button
                  className="toDoListbtn-add"
                  onClick={() => { setTasks(newTaskList.filter((item) => (!item.isDone))); }}
                >
                  In Progress
                </button>
                <button
                  className="toDoListbtn-add"
                  onClick={() => { setTasks(newTaskList.filter((item) => (item.isDone))); }}
                >
                  Completed
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Task4;
