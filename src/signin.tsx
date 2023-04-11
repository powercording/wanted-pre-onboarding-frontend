import React, { useState } from 'react';
import styled from 'styled-components';
import Inpuut from './components/Input.tsx';
import Button from './components/button.tsx';

const SigninContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SignIn() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <SigninContainer>
      <Form onSubmit={handleSubmit}>
        <Inpuut
          type="text"
          placeholder="아이디"
          label="아이디"
          value={id}
          onChange={handleInputId}
        />
        <Inpuut
          type="password"
          placeholder="비밀번호"
          label="비밀번호"
          value={password}
          onChange={handleInputPassword}
        />
        <Button type="submit">로그인</Button>
      </Form>
    </SigninContainer>
  );
}
