import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { Header } from 'src/components/Header/Header';
import { BackButton } from 'src/views/components/BackButton';
import { Content } from 'src/components/Content/Content';
import { Input } from 'src/components/Input/Input';
import { Keyboard } from 'src/components/Keyboard/Keyboard';
import { ExplainButton } from 'src/views/components/ExplainButton';
import { StateContext } from 'src/state';
import { IEventMetaObject } from 'src/types';
import { IBaseWorkout } from './types';
import { WorkoutNotStartedError } from 'src/utils';

export const BaseWorkout: FC<IBaseWorkout> = (props) => {
  const { onCheck } = props;
  const { workout, nextReps } = useContext(StateContext);

  if (workout === null) {
    throw new WorkoutNotStartedError('Game is not started');
  }

  const { firstFactor, secondFactor, complexity } = workout;
  const [answer, setAnswer] = useState<number | null>(null);
  const [result, setResult] = useState<boolean | null>(null);

  const handleKeyboardClick = useCallback((e: IEventMetaObject<number | null>) => {
    setAnswer(e.value);
  }, []);
  const handleCheckClick = useCallback(() => {
    setResult(answer === firstFactor * secondFactor);
    setAnswer(null);

  }, [answer, firstFactor, secondFactor]);

  useEffect(() => {
    let _timer: ReturnType<typeof setTimeout>;
    if (result !== null) {
      _timer = setTimeout(() => {
        setResult(null);
        nextReps();

        if (onCheck) {
          onCheck();
        }
      }, 500);
    }

    return () => {
      clearTimeout(_timer);
    }
  }, [result, nextReps, onCheck]);

  return (
    <>
      <Header renderMajorAction={renderExplainButton} renderMinorAction={BackButton}>{props.title}</Header>
      <Content>
        <h1>×{firstFactor}</h1>
        <h1>{secondFactor}</h1>
        <Input firstFactor={firstFactor} secondFactor={secondFactor} answer={answer} />
        {result === null && (
          <Keyboard key={firstFactor * secondFactor} complexity={complexity} answer={answer} onClick={handleKeyboardClick} onCheck={handleCheckClick} />
        )}
        {result === true && (
          <div>Well Done!!!</div>
        )}
        {result === false && (
          <div>Try Again!!!</div>
        )}
      </Content>
    </>
  );

  function renderExplainButton() {
    return (
      <ExplainButton onClick={props.onExplain} />
    );
  }
};
