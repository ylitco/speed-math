import React, { FC, useCallback } from 'react';
import { Button } from 'src/components/Button/Button';
import { createEventMetaObject } from 'src/utils';
import { IKeyboardProps } from './types';
import styles from './Keyboard.module.scss';
import { Check } from './components/Check/Check';
import { Delete } from './components/Delete/Delete';
import { Calculator } from './components/Calculator/Calculator';
import cn from 'classnames';

export const Keyboard: FC<IKeyboardProps> = ({ onClick, answer, isReady, onReady, ...props }) => {
  const handleNumberClick = useCallback((number) => {
    onClick(createEventMetaObject(answer ? +`${answer}${number}` : number));
  }, [answer, onClick]);
  const handleBackspaceClick = useCallback(() => {
    const result = answer !== null && answer > 9 ? +(answer.toString().slice(0, -1)) : null
    onClick(createEventMetaObject(result));
  }, [answer, onClick]);

  if (!isReady) {
    return (
      <Calculator onClick={onReady} className={styles.calculator} />
    );
  }

  return (
    <div className={cn(props.className, styles.keyboard)}>
      {Array.from(Array(9).keys()).map((number) => {
        return (
          <Button onClick={() => handleNumberClick(number + 1)} key={number}>
            <span>{number + 1}</span>
          </Button>
        );
      })}
      <Button onClick={props.onCheck}><Check /></Button>
      <Button onClick={() => handleNumberClick(0)}><span>0</span></Button>
      <Button onClick={handleBackspaceClick}><Delete /></Button>
    </div>
  );
};
