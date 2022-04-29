import React, { useState } from 'react';
// import './Task.scss';

type TasksListsDetails = {
    title:string,
    isDone:boolean,
    isProgress: boolean,
}

const TaskThree = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasksLists, setTasksLists] = useState<TasksListsDetails[]>([
  ]);
  const [allTasksLists, setAllTasksLists] = useState([...tasksLists]);

  const completed = (index:number) => {
    const newTasksLists = [...allTasksLists];
    newTasksLists[index].isDone = !newTasksLists[index].isDone;
    return newTasksLists;
  };

  const buttArr = [{
    title: 'All',
    action: () => {
      setTasksLists(allTasksLists);
    },
  },
  {
    title: 'In progress',
    action: () => {
      const newNotDoneTasks = allTasksLists.filter((item) => !item.isDone);
      setTasksLists(newNotDoneTasks);
    },
  },
  {
    title: 'Completed',
    action: () => {
      const isDoneTasks = allTasksLists.filter((item) => item.isDone);
      setTasksLists(isDoneTasks);
    },
  },
  ];

  return (
    <div className="container">
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder="write your task here"
        />
        <button
          className="plannerbtn"
          onClick={() => {
            setTasksLists([...tasksLists, { title: inputValue, isDone: false, isProgress: true }]);
            setAllTasksLists([...tasksLists, { title: inputValue, isDone: false, isProgress: true }]);
            setInputValue('');
          }}
        >
          Add
        </button>
      </div>
      <div>
        <ul>
          {tasksLists.map((el, index) => (
            <div
              className={`${el.isDone && 'line__through'}`}
              key={Math.random()}
            >
              <input
                type="checkbox"
                checked={el.isDone}
                onChange={() => setTasksLists(completed(index))}
              />
              {el.title}
              <button
                onClick={() => setTasksLists(tasksLists.filter((_, i) => i !== index))}
                className="x__button"
              >
                X

              </button>
            </div>
          ))}
        </ul>
        <div>
          {buttArr.map(({ title, action }) => (
            <button
              onClick={action}
              className="planner__btn"
            >
              {title}

            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TaskThree;
