import React from 'react';
import styled from 'styled-components';
import Inpuut from './components/Input.tsx';

const SigninContainer = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function SignIn() {
  return (
    <SigninContainer>
      <Form>
        <Inpuut type="text" placeholder="아이디" label="아이디" />
        <Inpuut type="password" placeholder="비밀번호" label="비밀번호" />
      </Form>
    </SigninContainer>
  );
}
