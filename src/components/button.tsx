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
  children: ReactNode;
  disabled: boolean;
  testId?: string;
  onClick?: () => void;
}

export default function Button(props: BtnType) {
  const { type, onClick, children, disabled, testId } = props;

  return (
    <Btn
      type={type}
      onClick={onClick}
      data-testid={testId}
      disabled={!disabled}
    >
      {children}
    </Btn>
  );
}

Button.defaultProps = {
  onClick: undefined,
  testId: null,
};
