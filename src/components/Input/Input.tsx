import React, { FC } from 'react';

interface IInputProps {
  answer: number | null;
  firstFactor: number;
  secondFactor: number;
}

export const Input: FC<IInputProps> = (props) => {
  return (
    <input value={!props.answer ? '' : props.answer} onChange={() => {}} />
  );
};
