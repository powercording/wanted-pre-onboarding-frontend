import React, { useState } from 'react';
import useRedirect from './hooks/useRedirect.tsx';
import useTodoList from './hooks/useTodoList.tsx';
import Input from './components/Input.tsx';
import Button from './components/button.tsx';

export default function Todo() {
  const isLogin = localStorage.getItem('token');
  const [list, setList, mutate] = useTodoList();
  const [inputText, setInputText] = useState<string>('');
  // const [todobutton, settodobutton] = useState<string | null>(null);

  // if no loggedin redirect user to "signin" page
  useRedirect({ type: '!LOGIN', path: '/signin', isLogin });

  console.log(list);
  console.log(setList);
  console.log(mutate);

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
    <div>
      <h1>Todo</h1>
      <Input
        type="text"
        testId="new-todo-input"
        placeholder="plz let me know what to do"
        value={inputText}
        onChange={handleInputText}
      />
      <Button type="button" onClick={handleAddTodo}>
        TODO 추가
      </Button>
    </div>
  );
}
