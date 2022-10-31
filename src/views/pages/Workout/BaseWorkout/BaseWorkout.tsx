import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { BackButton } from 'src/views/components/BackButton';
import { Content } from 'src/components/Content/Content';
import { Input } from 'src/components/Input/Input';
import { Keyboard } from 'src/components/Keyboard/Keyboard';
import { Button } from 'src/components/Button/Button';
import { InfoIcon } from 'src/icons/Info/Info';
import { StateContext } from 'src/state';
import { IEventMetaObject } from 'src/types';
import { IBaseWorkout } from './types';
import { TExercises } from 'src/state/types';
import { BUTTON_TYPE } from 'src/components/Button/types';
import { getUrl, WorkoutNotStartedError } from 'src/utils';
import { EXERCISES, INPUT_MODE } from 'src/state/constants';
import { VIEW } from 'src/views/constants';
import styles from './BaseWorkout.module.scss';
import { Failure } from './components/Failure/Failure';
import { Success } from './components/Success/Success';

export const BaseWorkout: FC<IBaseWorkout> = (props) => {
  const { onCheckStart, onCheckFinish } = props;
  const { workout, nextReps, pushAnswer, settings: { global: { inputMode } } } = useContext(StateContext);

  if (workout === null) {
    throw new WorkoutNotStartedError('Open workout page when workout is not started');
  }

  const { firstFactor, secondFactor, complexity } = workout;
  const [answer, setAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);
  const exercise = firstFactor > 12 ? EXERCISES.N : EXERCISES[`${firstFactor}` as TExercises];

  const handleKeyboardClick = useCallback((e: IEventMetaObject<number | null>) => {
    if (e.value && e.value.toString().length > (firstFactor * secondFactor).toString().length) return;

    setAnswer(e.value);
  }, [answer]);
  const handleCheckClick = useCallback(() => {
    if (onCheckStart) {
      onCheckStart();
    }

    const finalAnswer = inputMode === INPUT_MODE.LTR || answer === null ?
      answer :
      +answer.toString().split('').reverse().join('');

    setResult(finalAnswer === firstFactor * secondFactor);
    pushAnswer(finalAnswer === firstFactor * secondFactor);
    setAnswer(null);
  }, [answer, firstFactor, onCheckStart, pushAnswer, secondFactor]);

  useEffect(() => {
    let _timer: ReturnType<typeof setTimeout>;
    if (result !== null) {
      _timer = setTimeout(() => {
        if (onCheckFinish) {
          onCheckFinish();
        }

        setResult(null);
        nextReps();
      }, 500);
    }

    return () => {
      clearTimeout(_timer);
    }
  }, [result, nextReps, onCheckFinish]);

  return (
    <>
      <Header renderMajorAction={renderExplainButton} renderMinorAction={BackButton}>{props.title}</Header>
      <Content className={styles.view}>
        <div className={styles.progressbar}>
          <div className={styles.progressLine} style={{ width: `${props.progress}%` }} />
        </div>
        <h1 className={styles.firstFactor}>×{firstFactor}</h1>
        <h1 className={styles.secondFactor} data-content={secondFactor}>{secondFactor}</h1>
        <Input firstFactor={firstFactor} secondFactor={secondFactor} answer={answer} />
        {result === null ? (
          <Keyboard
            className={styles.keyboard}
            key={firstFactor * secondFactor}
            complexity={complexity}
            answer={answer}
            onClick={handleKeyboardClick}
            onCheck={handleCheckClick}
          />
        ) : (
          <div className={styles.result}>
            {result ? (
              <Success />
            ) : (
              <Failure />
            )}
          </div>
        )}
      </Content>
    </>
  );

  function renderExplainButton() {
    return (
      <Link to={getUrl(`${VIEW.EXPLANATION}/${exercise}`)}>
        <Button type={BUTTON_TYPE.CIRCLE} onClick={props?.onExplain}>
          <InfoIcon />
        </Button>
      </Link>
    );
  }
};
