import React, { FC, useContext } from 'react';
import styles from './Input.module.scss';
import { StateContext } from '../../state';
import { INPUT_MODE } from 'src/state/constants';

interface IInputProps {
  answer: number | null;
  firstFactor: number;
  secondFactor: number;
}

export const Input: FC<IInputProps> = ({ firstFactor, secondFactor, answer }) => {
  const result = (firstFactor * secondFactor).toString().split('');
  const _answer = answer !== null ? answer.toString().split('') : [];
  const { settings: { global: { inputMode } } } = useContext(StateContext);
  const view = inputMode === INPUT_MODE.LTR ?
    Array(result.length - _answer.length ).fill('').concat(_answer) :
    Array(result.length - _answer.length ).fill('').concat(_answer.reverse());

  return (
    <div className={styles.input}>
      {view.map((value, index) => {
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
