import React, { useState } from 'react';
// import './Task.scss';

type TasksListsDetails = {
  title:string,
  isDone:boolean,
  isProgress: boolean,
  high: boolean,
  medium: boolean,
  low: boolean,
}

const Task6 = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasksLists, setTasksLists] = useState<TasksListsDetails[]>([
  ]);
  const [allTasksLists, setAllTasksLists] = useState([...tasksLists]);

  const completed = (index:number) => {
    const newTasksLists = [...allTasksLists];
    newTasksLists[index].isDone = !newTasksLists[index].isDone;
    return newTasksLists;
  };

  const Priority = (index:number) => {
    const newTasksLists = [...allTasksLists];
    newTasksLists[index].high = !newTasksLists[index].high;
    if (newTasksLists[index].high) {
      newTasksLists[index].medium = !newTasksLists[index].medium;
    }
    if (newTasksLists[index].medium) {
      newTasksLists[index].low = !newTasksLists[index].low;
    }
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
  const buttArrPriority = [{
    title: 'High Priority',
    action: () => {
      const highPriorityTask = allTasksLists.filter((item) => !item.medium);
      setTasksLists(highPriorityTask);
    },
  },
  {
    title: 'Medium Priority',
    action: () => {
      const mediumPriorityTask = allTasksLists.filter((item) => !item.high);
      setTasksLists(mediumPriorityTask);
    },
  },
  {
    title: 'Low Priority',
    action: () => {
      const lowPriorityTask = allTasksLists.filter((item) => item.low);
      setTasksLists(lowPriorityTask);
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
            setTasksLists([...tasksLists, {
              title: inputValue,
              isDone: false,
              isProgress: true,
              high: false,
              medium: false,
              low: false,
            }]);
            setAllTasksLists([...tasksLists, {
              title: inputValue,
              isDone: false,
              isProgress: true,
              high: false,
              medium: false,
              low: false,
            }]);
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
              onClick={() => setTasksLists(Priority(index))}
              className={`task__div ${el.isDone && 'line__through'}
              ${el.high && 'red'}
              ${el.medium && 'yellow'}
              ${el.low && 'green'}
              `}
              key={Math.random()}
            >
              <input
                type="checkbox"
                checked={el.isDone}
                onChange={() => setTasksLists(completed(index))}
              />
              {el.title}
              <div />
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
        <div>
          {buttArrPriority.map(({ title, action }) => (
            <button
              onClick={action}
              className="priority__btn"
            >
              {title}

            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Task6;
