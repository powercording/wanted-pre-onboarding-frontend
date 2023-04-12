import React from 'react';
import { Todo, Mutate } from '../hooks/useTodoList.tsx';

interface TodoProps extends Todo {
  mutate: (args: Mutate) => Promise<void>;
}

export default function TodoComponent(props: TodoProps) {
  const { id, isCompleted, mutate, todo } = props;

  const handleIsCompleted = () => {
    const checked = !isCompleted;
    const data = {
      todo,
      isCompleted: checked,
    };

    mutate({ method: 'PUT', id, body: data });
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={isCompleted || false}
          onChange={handleIsCompleted}
        />
        <span>{todo}</span>
      </label>
    </li>
  );
}
