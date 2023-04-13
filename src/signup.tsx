import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Inpuut from './components/Input.tsx';
import Button from './components/button.tsx';
import useSignApi from './hooks/useSignApi.tsx';
import useRedirect from './hooks/useRedirect.tsx';
import CONST from './lib/CONSTANT.ts';
import NaviButton from './components/NaviButton.tsx';

const SigninContainer = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SingUp() {
  const isLogin = localStorage.getItem('token');
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const [signupFn, signupResult] = useSignApi(`${CONST.API}${CONST.SIGNUP}`);

  // if loggedin redirect user to "todo" page
  useRedirect({ type: 'LOGIN', path: '/todo', isLogin });

  useEffect(() => {
    if (signupResult === 201) {
      navigate('/signin');
    }
  }, [signupResult, navigate]);

  const isValidEmail = (inputId: string) => {
    return inputId.includes(CONST.VALIDEMAIL);
  };

  const isValidPassword = (inputPassword: string) => {
    return inputPassword.length >= CONST.VALIDPASSWORD;
  };

  const handleInputId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (id && password) {
      const formData = new FormData();
      formData.append('email', id);
      formData.append('password', password);

      signupFn(formData, 'POST');
    }
  };

  return (
    <SigninContainer>
      <h1>Singup</h1>
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
          testId="signup-button"
          disabled={isValidEmail(id) && isValidPassword(password)}
        >
          회원가입
        </Button>
      </Form>
      <NaviButton hereLocation="SIGNUP" />
    </SigninContainer>
  );
}
