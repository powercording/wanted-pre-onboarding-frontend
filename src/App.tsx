import React from 'react';
import { Routes, Route, redirect } from 'react-router-dom';
import SignIn from './signin.tsx';
import SingUp from './signup.tsx';
import Todo from './todo.tsx';
import Home from './home.tsx';
import useRedirect from './hooks/useRedirect.tsx';

function App() {
  const lsLogin = useRedirect();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SingUp />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
