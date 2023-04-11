import React from 'react';
import useRedirect from './hooks/useRedirect.tsx';

export default function Todo() {
  const isLogin = localStorage.getItem('token');

  //if no loggedin
  useRedirect({ type: '!LOGIN', path: '/signin', isLogin });

  return <h1>todo</h1>;
}
