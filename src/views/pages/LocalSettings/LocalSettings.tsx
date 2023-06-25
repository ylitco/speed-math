import React, { ChangeEvent, FC, HTMLAttributes, useCallback, useContext } from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { SettingsButton } from 'src/views/components/SettingsButton';
import { BackButton } from 'src/views/components/BackButton';
import { Button } from 'src/components/Button/Button';
import { Switch } from 'src/components/Switch/Switch';
import { InfoIcon } from 'src/icons/Info/Info';
import { TimerIcon } from 'src/icons/Timer/Timer';
import { InfinityIcon } from 'src/icons/Infinity/Infinity';
import { PlayIcon } from 'src/icons/Play/Play';
import { StateContext } from 'src/state'
import { IEventMetaObject } from 'src/types';
import { TDifficulties, TExercises } from 'src/state/types';
import { EXERCISES, DIFFICULTIES, GAME_MODE } from 'src/state/constants'; // @todo rename
import { VIEW } from 'src/views/constants';
import { useStartWorkoutCallback } from 'src/hooks/useStartWorkoutEffect';
import { getUrl } from 'src/utils';
import styles from './LocalSettings.module.scss';
import {Easy} from "./components/Easy/Easy";
import {Medium} from "./components/Medium/Medium";
import {Hard} from "./components/Hard/Hard";
import { useDispatch, useSelector } from 'react-redux';
import { Type, getReps, getType, setType } from 'src/state/Workout';

const Quantity: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  const reps = useSelector(getReps);

  return <div className={cn(props.className, styles.fontTest)}>{reps}</div>;
}

const WORKOUT_MODE_OPTIONS = {
  [GAME_MODE.TIME]: TimerIcon,
  [GAME_MODE.REPS]: Quantity,
  [GAME_MODE.FREE]: InfinityIcon,
};

export const LocalSettings: FC = () => {
  const { settings: { local: { exercises } }, setExerciseDifficulty: setExerciseComplexity, setGameMode: setWorkoutMode } = useContext(StateContext); // @todo rename
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const type = useSelector(getType);
  const handleWorkoutModeChange = useCallback((e: IEventMetaObject<Type>) => {
    dispatch(setType(e.value));
  }, [dispatch]);
  const handleExerciseComplexityChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setExerciseComplexity({
      [e.target.name]: exercises[e.target.name as TExercises] === e.target.value ? null : e.target.value,
    } as Record<TExercises, TDifficulties>);
  }, [setExerciseComplexity]);
  const handleWorkoutStart = useStartWorkoutCallback();

  return (
    <>
      <Header renderMajorAction={SettingsButton} renderMinorAction={BackButton}>{t('localSettings.title')}</Header>
      <Content className={styles.view}>
        <header className={styles.header}>
          <b className={cn(styles.th, styles.easy)}><Easy /></b>
          <b className={cn(styles.th, styles.medium)}><Medium /></b>
          <b className={cn(styles.th, styles.hard)}><Hard /></b>
        </header>
        <section className={styles.body}>
          {Object.keys(EXERCISES).map((mode) => {
            return (
              <div className={styles.row} key={mode}>
                <div className={styles.number}>
                  ×{mode}
                </div>
                <div className={styles.easy}>
                  <input
                    type='checkbox'
                    name={mode}
                    value="easy"
                    checked={exercises[mode as TExercises] === DIFFICULTIES.EASY}
                    onChange={handleExerciseComplexityChange}
                  />
                </div>
                <div className={styles.medium}>
                  <input
                    type='checkbox'
                    name={mode}
                    value="medium"
                    checked={exercises[mode as TExercises] === DIFFICULTIES.MEDIUM}
                    onChange={handleExerciseComplexityChange}
                  />
                </div>
                <div className={styles.hard}>
                  <input
                    type='checkbox'
                    name={mode}
                    value="hard"
                    checked={exercises[mode as TExercises] === DIFFICULTIES.HARD}
                    onChange={handleExerciseComplexityChange}
                  />
                </div>
                <Link className={styles.info} to={getUrl(`${VIEW.EXPLANATION}/${mode}`)}>
                  <InfoIcon color="purple" />
                </Link>
              </div>
            );
          })}
        </section>
        <nav className={styles.footer}>
          <Switch
            className={styles.modes}
            options={WORKOUT_MODE_OPTIONS}
            value={type}
            onChange={handleWorkoutModeChange}
          />
          <Button className={styles.play} onClick={handleWorkoutStart}>
            <PlayIcon />
          </Button>
        </nav>
      </Content>
    </>
  );
};
