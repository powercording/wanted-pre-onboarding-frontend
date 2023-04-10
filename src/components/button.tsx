import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 100%;
  height: 45px;
`;

interface BtnType {
  type: 'button' | 'submit' | 'reset';
  onClick: () => void;
  children: ReactNode;
}

export default function Button(props: BtnType) {
  const { type, onClick, children } = props;

  return (
    <Btn type={type} onClick={onClick}>
      {children}
    </Btn>
  );
}
