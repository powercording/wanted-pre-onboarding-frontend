import React from 'react';
import styled from 'styled-components';
import { Todo, Mutate } from '../hooks/useTodoList.tsx';

const Row = styled.li`
  display: flex;
  align-items: center;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  gap: 5px;
`;

type MutateProps = Mutate;
interface TodoProps extends Todo {
  mutate: (args: MutateProps) => Promise<void>;
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

  const handleDelete = () => {
    mutate({ method: 'DELETE', id });
  };

  return (
    <Row>
      <label htmlFor={id.toString()}>
        <input
          type="checkbox"
          checked={isCompleted || false}
          onChange={handleIsCompleted}
        />
        <span id={id.toString()}>{todo}</span>
      </label>
      <ButtonBox>
        <button type="button">수정</button>
        <button type="button" onClick={handleDelete}>
          삭제
        </button>
      </ButtonBox>
    </Row>
  );
}
