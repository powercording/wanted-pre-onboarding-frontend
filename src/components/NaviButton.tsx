import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './button.tsx';

interface NaviButtonProps {
  hereLocation: 'HOME' | 'SIGNIN' | 'SIGNUP' | 'TODO';
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
`;

export default function NaviButton(props: NaviButtonProps) {
  const { hereLocation } = props;
  const navigate = useNavigate();

  const handleNavigateSignin = () => {
    if (hereLocation === 'SIGNIN') {
      return navigate('/');
    }
    return navigate('/signin');
  };
  const handleNavigateSignup = () => {
    if (hereLocation === 'SIGNUP') {
      return navigate('/');
    }
    return navigate('/signup');
  };
  const handleNavigateTodo = () => {
    if (hereLocation === 'TODO') {
      return navigate('/');
    }
    return navigate('/todo');
  };

  return (
    <ButtonContainer>
      <Button type="button" onClick={handleNavigateSignin}>
        {hereLocation === 'SIGNIN' ? '홈' : '로그인'}
      </Button>
      <Button type="button" onClick={handleNavigateSignup}>
        {hereLocation === 'SIGNUP' ? '홈' : '회원가입'}
      </Button>
      <Button type="button" onClick={handleNavigateTodo}>
        {hereLocation === 'TODO' ? '홈' : '투두리스트'}
      </Button>
    </ButtonContainer>
  );
}
