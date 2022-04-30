import React, { useState } from 'react';
// import './Task.scss';

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
  // const [currentTask, setCurrentTask] = useState({});

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
      <div>
        <ul>
          {tasksLists.map((el, index) => (
            isEditing ? (
              <div key={el.title}>
                <input
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
                  onClick={(e) => { e.stopPropagation(); }}
                />
                {el.title}
                <div />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    (setIsEditing(!isEditing));
                    setEditInputValue('');
                  }}
                  className="edit__button"
                >
                  E

                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setTasksLists(tasksLists.filter((_, i) => i !== index));
                    setAllTasksLists(allTasksLists.filter((_, i) => i !== index));
                  }}
                  className="close__button"
                >
                  X

                </button>
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
