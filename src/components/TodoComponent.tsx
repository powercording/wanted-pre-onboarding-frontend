import React, { useState } from 'react';
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
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>(todo);

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

  const handleModifie = () => {
    setIsModifying(prev => !prev);
  };

  const handleSubmit = () => {
    const data = {
      todo: inputText,
      isCompleted,
    };
    mutate({ method: 'PUT', id, body: data });
    handleModifie();
  };

  const handleCancle = () => {
    setInputText(() => todo);
    setIsModifying(() => false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Row>
      <label htmlFor={id.toString()}>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={handleIsCompleted}
        />
        {isModifying ? (
          <input
            value={inputText}
            onChange={handleInputChange}
            data-testid="modify-input"
          />
        ) : (
          <span id={id.toString()}>{todo}</span>
        )}
      </label>
      <ButtonBox>
        <button
          type="button"
          data-testid={isModifying ? 'submit-button' : 'modify-button'}
          onClick={isModifying ? handleSubmit : handleModifie}
        >
          {isModifying ? '제출' : '수정'}
        </button>
        <button
          type="button"
          data-testid={isModifying ? 'cancel-button' : 'delete-button'}
          onClick={isModifying ? handleCancle : handleDelete}
        >
          {isModifying ? '취소' : '삭제'}
        </button>
      </ButtonBox>
    </Row>
  );
}
