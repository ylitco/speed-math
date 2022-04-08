import React, { ChangeEvent, FC, useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { SettingsButton } from 'src/views/components/SettingsButton';
import { BackButton } from 'src/views/components/BackButton';
import { Button } from 'src/components/Button/Button';
import { Switch } from 'src/components/Switch/Switch';
import { InfoIcon } from 'src/icons/Info/Info';
import { TimerIcon } from 'src/icons/Timer/Timer';
import { QuantityIcon } from 'src/icons/Quantity/Quantity';
import { InfinityIcon } from 'src/icons/Infinity/Infinity';
import { PlayIcon } from 'src/icons/Play/Play';
import { StateContext } from 'src/state'
import { IEventMetaObject } from 'src/types';
import { TDifficulties, TExercises, TGameMode } from 'src/state/types';
import { EXERCISES, DIFFICULTIES, GAME_MODE } from 'src/state/constants'; // @todo rename
import { VIEW } from 'src/views/constants';
import { useStartWorkoutCallback } from 'src/hooks/useStartWorkoutEffect';
import { getUrl } from 'src/utils';
import styles from './LocalSettings.module.scss';

const WORKOUT_MODE_OPTIONS = {
  [GAME_MODE.TIME]: <TimerIcon />,
  [GAME_MODE.REPS]: <QuantityIcon />,
  [GAME_MODE.FREE]: <InfinityIcon />,
};

export const LocalSettings: FC = () => {
  const { settings: { local: { gameMode: workoutMode, exercises } }, setExerciseDifficulty: setExerciseComplexity, setGameMode: setWorkoutMode } = useContext(StateContext); // @todo rename
  const handleWorkoutModeChange = useCallback((e: IEventMetaObject<TGameMode>) => {
    setWorkoutMode(e.value);
  }, [setWorkoutMode]);
  const handleExerciseComplexityChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setExerciseComplexity({ [e.target.name]: e.target.value } as Record<TExercises, TDifficulties>);
  }, [setExerciseComplexity]);
  const handleWorkoutStart = useStartWorkoutCallback();

  return (
    <>
      <Header renderMajorAction={SettingsButton} renderMinorAction={BackButton}>Practice</Header>
      <Content className={styles.view}>
        <b className={styles.easy}>easy</b>
        <b className={styles.medium}>medium</b>
        <b className={styles.hard}>hard</b>
        {Object.keys(EXERCISES).map((mode) => {
          return (
            <div className={styles.row} key={mode}>
              <div className={styles.number}>
                ×{mode}
              </div>
              <div className={styles.easy}>
                <input
                  type='radio'
                  name={mode}
                  value="easy"
                  checked={exercises[mode as TExercises] === DIFFICULTIES.EASY}
                  onChange={handleExerciseComplexityChange}
                />
              </div>
              <div className={styles.medium}>
                <input
                  type='radio'
                  name={mode}
                  value="medium"
                  checked={exercises[mode as TExercises] === DIFFICULTIES.MEDIUM}
                  onChange={handleExerciseComplexityChange}
                />
              </div>
              <div className={styles.hard}>
                <input
                  type='radio'
                  name={mode}
                  value="hard"
                  checked={exercises[mode as TExercises] === DIFFICULTIES.HARD}
                  onChange={handleExerciseComplexityChange}
                />
              </div>
              <Link to={getUrl(`${VIEW.EXPLANATION}/${mode}`)}>
                <InfoIcon />
              </Link>
            </div>
          );
        })}
        <Switch
          className={styles.modes}
          options={WORKOUT_MODE_OPTIONS}
          value={workoutMode}
          onChange={handleWorkoutModeChange}
        />
        <Button className={styles.play} onClick={handleWorkoutStart}>
          <PlayIcon />
        </Button>
      </Content>
    </>
  );
};
