import React from 'react';
import styled from 'styled-components';
import Inpuut from './components/Input.tsx';
import Button from './components/button.tsx';

const SigninContainer = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SignIn() {
  const handleClick = () => {};
  return (
    <SigninContainer>
      <Form>
        <Inpuut type="text" placeholder="아이디" label="아이디" />
        <Inpuut type="password" placeholder="비밀번호" label="비밀번호" />
        <Button type="submit" onClick={handleClick}>
          버튼
        </Button>
      </Form>
    </SigninContainer>
  );
}
