import React, { FC, useContext } from 'react';
import styles from './Input.module.scss';
import { StateContext } from '../../state';
import { INPUT_MODE } from 'src/state/constants';

interface IInputProps {
  answer: string | number | null;
  firstFactor: number;
  secondFactor: number;
}

export const Input: FC<IInputProps> = ({ firstFactor, secondFactor, answer }) => {
  const result = (firstFactor * secondFactor).toString().split('');
  const _answer = answer !== null ? answer.toString() : '';
  const { settings: { global: { inputMode } } } = useContext(StateContext);

  let _view;

  if (inputMode === INPUT_MODE.LTR) {
    _view = _answer.padEnd(result.length, ' ').split('');
  } else {
    _view = _answer.split('').reverse().join('').padStart(result.length, ' ').split('');
  }

  return (
    <div className={styles.input}>
      {_view.map((value, index) => {
        return (
          <div key={index + value} className={styles.inputCell}>
            <p className={styles.outerShadow}>{value}</p>
            <p className={styles.stroke}>{value}</p>
            <p className={styles.innerGradient}>{value}</p>
          </div>
        )
      })}
    </div>
  );
};
