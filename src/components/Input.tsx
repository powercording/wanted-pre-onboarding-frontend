import React from 'react';
import styled from 'styled-components';

const InputRow = styled.div`
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
  type: 'text' | 'password' | 'number';
  label: string;
  placeholder?: string;
  testId?: string;
  value?: string | number | readonly string[] | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: InputType) {
  const { type, placeholder, label, testId, value, onChange } = props;

  return (
    <InputRow>
      {label && <Label htmlFor={label}>{label}</Label>}
      <InputTag
        type={type}
        placeholder={placeholder}
        id={label}
        data-testid={testId}
        value={value}
        onChange={onChange}
      />
    </InputRow>
  );
}

Input.defaultProps = {
  placeholder: '',
  testId: null,
  value: null,
  onChange: undefined,
};
