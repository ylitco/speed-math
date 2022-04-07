import React, { FC, useCallback, useState } from 'react';
import { Button } from 'src/components/Button/Button';
import { createEventMetaObject } from 'src/utils';
import { DIFFICULTIES } from 'src/state/constants';
import { IKeyboardProps } from './types';
import styles from './Keyboard.module.scss';

export const Keyboard: FC<IKeyboardProps> = ({ onClick, answer, ...props }) => {
  const [ready, setReady] = useState(props.complexity !== DIFFICULTIES.HARD);
  const handleKeyboardShow = useCallback(() => {
    setReady(true);
  }, []);
  const handleNumberClick = useCallback((number) => {
    onClick(createEventMetaObject(answer ? +`${answer}${number}` : number));
  }, [answer, onClick]);
  const handleBackspaceClick = useCallback(() => {
    const result = answer ? +(answer.toString().slice(0, -1)) : null
    onClick(createEventMetaObject(result));
  }, [answer, onClick]);

  if (props.complexity === DIFFICULTIES.HARD && !ready) {
    return (
      <Button onClick={handleKeyboardShow}>Show keyboard</Button>
    );
  }

  return (
    <div className={styles.keyboard}>
      {Array.from(Array(9).keys()).map((number) => {
        return (
          <Button onClick={() => handleNumberClick(number + 1)} key={number}>{number + 1}</Button>
        );
      })}
      <Button onClick={props.onCheck}>✓</Button>
      <Button onClick={() => handleNumberClick(0)}>0</Button>
      <Button onClick={handleBackspaceClick}>⌫</Button>
    </div>
  );
};
