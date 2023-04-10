import React from 'react';
import styled from 'styled-components';

const InputRow = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 300px;
`;

const InputTag = styled.input`
  width: 200px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid grey;
`;

const Label = styled.label``;

interface InputType {
  type: string;
  placeholder: string;
  label: string;
  testId?: string;
}

Input.defaultProps = {
  testId: null,
};

export default function Input(props: InputType) {
  const { type, placeholder, label, testId } = props;

  if (label) {
    return (
      <InputRow>
        <Label htmlFor={label}>{label}</Label>
        <InputTag
          type={type}
          placeholder={placeholder}
          id={label}
          data-testid={testId}
        />
      </InputRow>
    );
  }

  return <InputTag type={type} placeholder={placeholder} />;
}
