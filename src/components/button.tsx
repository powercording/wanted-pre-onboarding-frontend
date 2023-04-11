import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Btn = styled.button`
  width: 100%;
  height: 35px;
  border-radius: 5px;
  border: 1px solid grey;
  :hover {
    background-color: lightgrey;
    cursor: pointer;
  }
`;

interface BtnType {
  type: 'button' | 'submit' | 'reset';
  onClick?: () => void;
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

Button.defaultProps = {
  onClick: undefined,
};
