import React from 'react';
import useRedirect from './hooks/useRedirect.tsx';
import useTodoList from './hooks/useTodoList.tsx';

export default function Todo() {
  const isLogin = localStorage.getItem('token');
  const [list, setList, listError] = useTodoList();

  // if no loggedin redirect user to "signin" page
  useRedirect({ type: '!LOGIN', path: '/signin', isLogin });

  console.log(list);

  return <h1>todo</h1>;
}
