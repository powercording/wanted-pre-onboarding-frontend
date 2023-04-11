import React, { useState } from 'react';
import styled from 'styled-components';
import Inpuut from './components/Input.tsx';
import Button from './components/button.tsx';
import useSignup from './hooks/useSignup.tsx';

const SigninContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SingUp() {
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [signupFn, signupData, singupError] = useSignup(
    'https://www.pre-onboarding-selection-task.shop/auth/signup',
  );

  const isValidEmail = (inputId: string) => {
    return inputId.includes('@');
  };

  const isValidPassword = (inputPassword: string) => {
    return inputPassword.length >= 8;
  };

  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('submit!');

    if (id && password) {
      const formData = new FormData();
      formData.append('email', id);
      formData.append('password', password);

      signupFn(formData, 'POST');
    }
  };

  console.log(signupData);
  console.log(singupError);

  return (
    <SigninContainer>
      <Form onSubmit={handleSubmit}>
        <Inpuut
          type="text"
          placeholder="아이디"
          label="아이디"
          testId="email-input"
          value={id}
          onChange={handleInputId}
        />
        <Inpuut
          type="password"
          placeholder="비밀번호"
          label="비밀번호"
          testId="password-input"
          value={password}
          onChange={handleInputPassword}
        />
        <Button
          type="submit"
          testId="signin-button"
          disabled={isValidEmail(id) && isValidPassword(password)}
        >
          로그인
        </Button>
      </Form>
    </SigninContainer>
  );
}
