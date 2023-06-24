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
import { Statistics as StatisticsIcon } from './components/Statistics/Statistics';
import styles from './Statistics.module.scss';
import { BUTTON_TYPE } from 'src/components/Button/types';
import { Repeat } from './icons/Repeat';
import { Burger } from './icons/Burger';

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
      <Content className={styles.view}>
        <h2 className={styles.resultValue}>{printSpeedResult()}</h2>
        <StatisticsIcon
          className={styles.pieChart}
          correct={answers.correct}
          total={answers.correct + answers.wrong}
          percentage={getPercentage()}
        />
        <footer className={styles.actions}>
          <Button onClick={handleWorkoutRestart} type={BUTTON_TYPE.CIRCLE}>
            <Repeat />
          </Button>
          <Button onClick={handleWorkoutFinish}>
            <Burger />
          </Button>
        </footer>
      </Content>
    </>
  );

  function getPercentage() {
    const total = answers.correct + answers.wrong;
    const percent = total !== 0 ? answers.correct / total * 100 : 0;

    return +percent.toFixed();
  }

  function printSpeedResult() {
    const duration = new Date(finishAt - startAt).getTime() / 1000;
    const problems = answers.correct * 60 / duration;

    return `${problems.toFixed()} ${t('statistics.cru')}`;
  }
};
