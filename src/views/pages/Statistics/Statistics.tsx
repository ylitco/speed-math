import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Header } from '~/components/Header/Header';
import { BackButton } from '~/views/components/BackButton';
import Button, { BUTTON_TYPE } from '~/components/Button';
import { Content } from '~/components/Content/Content';
import { getUrl } from '~/utils';
import { VIEW } from '~/views/constants';
import { useStartWorkoutCallback } from '~/hooks/useStartWorkoutEffect';
import { Statistics as StatisticsIcon } from './components/Statistics/Statistics';
import styles from './Statistics.module.scss';
import { Repeat } from './icons/Repeat';
import { Burger } from './icons/Burger';
import { Tooltip } from 'react-tooltip';
import { useSelector } from 'react-redux';
import {
  finishSet,
  getCountingRate,
  getCurrentRepIndex,
  getRelativeStat,
  getSetStat,
  stopTimer,
  useAppDispatch,
} from '~/state/Workout';

export const Statistics: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const stat = useSelector(getSetStat);
  const repIndex = useSelector(getCurrentRepIndex);
  const percentage = useSelector(getRelativeStat);
  const countingRate = useSelector(getCountingRate);
  const { t } = useTranslation();
  const handleWorkoutRestart = useStartWorkoutCallback();
  const handleWorkoutFinish = useCallback(() => {
    navigate(getUrl(VIEW.START));
    dispatch(finishSet());
    dispatch(stopTimer());
  }, [navigate, dispatch]);

  return (
    <>
      <Header renderMinorAction={BackButton}>{t('statistics.title')}</Header>
      <Content className={styles.view}>
        <h2 className={styles.resultValue}>
          <span
            data-tooltip-id="counting-rate-unit"
            data-tooltip-content={t('statistics.countingRateUnit')}
            data-tooltip-place="bottom"
          >
            {`${countingRate} ${t('statistics.cru')}`}
          </span>
        </h2>
        <StatisticsIcon
          className={styles.pieChart}
          correct={stat.correct}
          total={repIndex}
          percentage={percentage}
        />
        <footer className={styles.actions}>
          <Button onClick={handleWorkoutRestart} type={BUTTON_TYPE.CIRCLE}>
            <Repeat />
          </Button>
          <Button onClick={handleWorkoutFinish}>
            <Burger />
          </Button>
        </footer>
        <Tooltip id="counting-rate-unit" />
      </Content>
    </>
  );
};
