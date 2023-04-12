import React, { useState } from 'react';
import styled from 'styled-components';
import useRedirect from './hooks/useRedirect.tsx';
import useTodoList from './hooks/useTodoList.tsx';
import Input from './components/Input.tsx';
import Button from './components/button.tsx';
import TodoComponent from './components/TodoComponent.tsx';

const TodoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TodoInputRow = styled(TodoContainer)`
  gap: 5px;
`;

const TodoRow = styled(TodoContainer)`
  gap: 2px;
`;

export default function Todo() {
  const isLogin = localStorage.getItem('token');
  const [list, setList, mutate] = useTodoList();
  const [inputText, setInputText] = useState<string>('');

  // if no loggedin redirect user to "signin" page
  useRedirect({ type: '!LOGIN', path: '/signin', isLogin });

  console.log(list);
  console.log(setList);

  const cleanInputField = () => {
    setInputText('');
  };

  const handleInputText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleAddTodo = () => {
    cleanInputField();

    const data = new FormData();
    data.append('todo', inputText);
    mutate({ method: 'POST', body: data });
  };

  return (
    <TodoContainer>
      <h1>Todo</h1>
      <TodoInputRow>
        <Input
          type="text"
          testId="new-todo-input"
          placeholder="plz let me know what to do"
          value={inputText}
          onChange={handleInputText}
        />
        <Button
          type="button"
          testId="new-todo-add-button"
          onClick={handleAddTodo}
        >
          TODO 추가
        </Button>
      </TodoInputRow>
      <TodoRow>
        {list.map(todo => (
          <TodoComponent
            key={todo.id}
            id={todo.id}
            isCompleted={todo.isCompleted}
            mutate={mutate}
            todo={todo.todo}
          />
        ))}
      </TodoRow>
    </TodoContainer>
  );
}
