import React, { useState } from 'react';

type TasksListsDetails = {
  title:string,
  isDone:boolean,
  isProgress: boolean,
  high: boolean,
  medium: boolean,
  low: boolean,
  edit: boolean,
}

const Task6 = () => {
  const [inputValue, setInputValue] = useState('');
  const [tasksLists, setTasksLists] = useState<TasksListsDetails[]>([
  ]);
  const [allTasksLists, setAllTasksLists] = useState([...tasksLists]);
  const [isEditing, setIsEditing] = useState(false);
  const [editInputValue, setEditInputValue] = useState('');

  const completed = (index: number) => {
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

  const edit = (index:number) => {
    const edited = [...tasksLists];
    edited[index].edit = false;
    edited[index].title = editInputValue;
    return edited;
  };

  const sortedHigh = () => {
    const newTasksLists = [...allTasksLists];
    const highArr = newTasksLists.filter((el) => el.high === true && el.medium === false);
    const medArr = newTasksLists.filter((el) => el.medium === true && el.high === false);
    const lowArr = newTasksLists.filter((el) => el.low);
    const sortedTasks = [...highArr, ...medArr, ...lowArr];

    return setTasksLists(sortedTasks);
  };

  const sortedLow = () => {
    const newTasksLists = [...allTasksLists];
    const highArr = newTasksLists.filter((el) => el.high === true && el.medium === false);
    const medArr = newTasksLists.filter((el) => el.medium === true && el.high === false);
    const lowArr = newTasksLists.filter((el) => el.low);
    const sortedTasks = [...lowArr, ...medArr, ...highArr];
    return setTasksLists(sortedTasks);
  };

  return (
    <div className="container">
      <div>
        <div className="planner">
          <input
            type="text"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="write your task here"
          />
          <div className="priority__select">
            Priority
            <select onChange={(event) => {
              if (event.target.value === 'High') {
                sortedHigh();
              }
              if (event.target.value === 'Low') {
                sortedLow();
              }
            }}
            >
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </div>
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
                edit: false,
              }]);
              setAllTasksLists([...tasksLists, {
                title: inputValue,
                isDone: false,
                isProgress: true,
                high: false,
                medium: false,
                low: false,
                edit: false,
              }]);
              setInputValue('');
            }}
          >
            Add
          </button>
        </div>
      </div>
      <div className="progress__bar">
        {tasksLists.map((taskList) => (taskList.isDone
          ? <div style={{ order: '1' }} className="progress__done" />
          : <div className="progress__none" />))}
      </div>
      <div>
        <ul>
          {tasksLists.map((el, index) => (
            isEditing ? (
              <div className="tasks">
                <input
                  className="edit__input"
                  type="text"
                  placeholder="edit task"
                  value={editInputValue}
                  onChange={(event) => setEditInputValue(event.target.value)}
                />
                <button onClick={() => {
                  setTasksLists(edit(index));
                  setIsEditing(false);
                }}
                >
                  Save
                </button>
                <button onClick={() => { setIsEditing(false); }}>Cancel</button>
              </div>
            ) : (
              <div
                onClick={() => setTasksLists(Priority(index))}
                className={`task__div
              ${el.high && 'red'}
              ${el.medium && 'yellow'}
              ${el.low && 'green'}
              `}
                key={Math.random()}
              >
                <div>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={el.isDone}
                    onChange={() => setTasksLists(completed(index))}
                    onClick={(e) => { e.stopPropagation(); }}
                  />
                  <span
                    className="task__entry"
                    style={{ textDecoration: el.isDone ? 'line-through' : 'none' }}
                  >
                    {el.title}

                  </span>
                </div>
                <div />
                <div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      (setIsEditing(!isEditing));
                      setEditInputValue('');
                    }}
                    className="edit__button"
                  >
                    Edit

                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTasksLists(tasksLists.filter((_, i) => i !== index));
                      setAllTasksLists(allTasksLists.filter((_, i) => i !== index));
                    }}
                    className="close__button"
                  >
                    Close

                  </button>
                </div>
              </div>
            )
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
