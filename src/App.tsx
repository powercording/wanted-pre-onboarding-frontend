import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './signin.tsx';
import SingUp from './signup.tsx';
import Todo from './todo.tsx';

function App() {
  return (
    <Routes>
      <Route path="/siginin" element={<SignIn />} />
      <Route path="/siginup" element={<SingUp />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
}

export default App;
