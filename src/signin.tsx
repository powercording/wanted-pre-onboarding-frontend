import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Inpuut from './components/Input.tsx';
import Button from './components/button.tsx';
import CONST from './lib/CONSTANT.ts';
import useSignin from './hooks/useSignin.tsx';

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
  const navigate = useNavigate();
  const [signinFn, signinResult, signinError] = useSignin(
    `${CONST.API}${CONST.SIGNIN}`,
  );

  useEffect(() => {
    if (signinResult === 200) {
      navigate('/todo');
    }
  }, [signinResult, navigate]);

  useEffect(() => {
    if (signinError) {
      alert(signinError);
    }
  }, [signinError]);

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

      signinFn(formData, 'POST');
    }
  };

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
