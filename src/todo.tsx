import React, { useEffect } from 'react';
import useRedirect from './hooks/useRedirect.tsx';

export default function Todo() {
  const isLogin = localStorage.getItem('token');

  useEffect(() => {}, []);

  // if no loggedin redirect user to "signin" page
  useRedirect({ type: '!LOGIN', path: '/signin', isLogin });

  return <h1>todo</h1>;
}
