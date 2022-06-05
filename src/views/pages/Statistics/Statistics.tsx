import React, { FC, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from 'src/components/Header/Header';
import { BackButton } from 'src/views/components/BackButton';
import { Button } from 'src/components/Button/Button';
import { Content } from 'src/components/Content/Content';
import { StateContext } from 'src/state';
import { getUrl } from 'src/utils';
import { IFreeWorkout } from 'src/state/types';
import { VIEW } from 'src/views/constants';
import { useStartWorkoutCallback } from 'src/hooks/useStartWorkoutEffect';

export const Statistics: FC = () => {
  const navigate = useNavigate();
  const { workout, finishWorkout } = useContext(StateContext);
  const { t } = useTranslation();
  const { answers, startAt, finishAt } = workout as IFreeWorkout;
  const handleWorkoutRestart = useStartWorkoutCallback();
  const handleWorkoutFinish = useCallback(() => {
    navigate(getUrl(VIEW.START));
    finishWorkout();
  }, [navigate, finishWorkout]);

  return (
    <>
      <Header renderMinorAction={BackButton}>{t('statistics.title')}</Header>
      <Content>
        <h2>{printAbsoluteResult()}</h2>
        <h3>{printRelativeResult()}</h3>
        <h4>{printSpeedResult()}</h4>
        <Button onClick={handleWorkoutRestart}>Try Again</Button>
        <Button onClick={handleWorkoutFinish}>Go to main menu</Button>
      </Content>
    </>
  );

  function printAbsoluteResult() {
    return `${answers.correct}/${answers.correct + answers.wrong}`;
  }

  function printRelativeResult() {
    const total = answers.correct + answers.wrong;
    const percent = total !== 0 ? answers.correct / total * 100 : 0;

    return percent.toFixed() + '%';
  }

  function printSpeedResult() {
    const duration = new Date(finishAt - startAt).getTime() / 1000;
    const problems = answers.correct * 60 / duration;

    return `${problems.toFixed()} ${t('statistics.pm')}`;
  }
};
