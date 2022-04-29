import { type } from 'os';
import React, { FC } from 'react';

type NewTaskProps = {
  title: string,
  done: boolean,
}

const NewTask: FC<NewTaskProps> = ({ title, done }) => (
  <ul>
    <li>
      {title}
      {done}
    </li>
  </ul>
);

export default NewTask;
