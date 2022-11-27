import React, { FC, useCallback, useContext, useEffect } from 'react';
import Button from 'src/components/Button/Button';
import { createEventMetaObject } from 'src/utils';
import { IKeyboardProps } from './types';
import styles from './Keyboard.module.scss';
import { Check } from './components/Check/Check';
import Delete from './components/Delete/Delete';
import { Calculator } from './components/Calculator/Calculator';
import cn from 'classnames';
import { StateContext } from '../../state';
import { CHECKING_MODE } from '../../state/constants';

const Keyboard: FC<IKeyboardProps> = ({ onClick, answer, isReady, onReady, result, ...props }) => {
  const { settings: { global: { checkingMode } } } = useContext(StateContext);
  const handleNumberClick = useCallback((e) => {
    const number = +e.target.dataset.name;
    onClick(createEventMetaObject(answer ? +`${answer}${number}` : number));
  }, [answer, onClick]);
  const handleBackspaceClick = useCallback(() => {
    const result = answer !== null && answer > 9 ? +(answer.toString().slice(0, -1)) : null
    onClick(createEventMetaObject(result));
  }, [answer, onClick]);

  useEffect(() => {
    if (answer && answer.toString().length === result.toString().length && checkingMode === CHECKING_MODE.AUTO) {
      console.debug(answer, result, checkingMode);
      props.onCheck();
    }
  }, [answer]);

  if (!isReady) {
    return (
      <Calculator onClick={onReady} className={styles.calculator} />
    );
  }

  return (
    <div className={cn(props.className, styles.keyboard)}>
      {Array.from(Array(9).keys()).map((index) => {
        const number = (index + 1).toString();

        return (
          <Button name={number} onClick={handleNumberClick} key={number}>
            <span>{number}</span>
          </Button>
        );
      })}
      {checkingMode === CHECKING_MODE.HAND ? <Button onClick={props.onCheck}><Check /></Button> : <div />}
      <Button name="0" onClick={handleNumberClick}><span>0</span></Button>
      <Button onClick={handleBackspaceClick}><Delete /></Button>
    </div>
  );
};

export default React.memo(Keyboard);