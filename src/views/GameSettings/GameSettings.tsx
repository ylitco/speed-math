import React, { ChangeEvent, FC, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import styles from '../views.module.scss';
import localStyles from './GameSettings.module.scss';
import { Button } from 'src/components/Button/Button';
import { Switch } from 'src/components/Switch/Switch';
import { InfoIcon } from 'src/icons/Info/Info';
import { TimerIcon } from 'src/icons/Timer/Timer';
import { QuantityIcon } from 'src/icons/Quantity/Quantity';
import { InfinityIcon } from 'src/icons/Infinity/Infinity';
import { IEventMetaObject } from 'src/types';
import { PlayIcon } from 'src/icons/Play/Play';
import { StateContext } from 'src/state'
import { IState, TExercises, TGameMode } from 'src/state/types';
import { EXERCISES, DIFFICULTIES, GAME_MODE } from 'src/state/constants';

const GAME_MODE_OPTIONS = {
  [GAME_MODE.TIME]: <TimerIcon />,
  [GAME_MODE.REPS]: <QuantityIcon />,
  [GAME_MODE.FREE]: <InfinityIcon />,
};

export const GameSettings: FC = () => {
  const state = useContext<IState | null>(StateContext) as IState;
  const navigate = useNavigate();
  const { gameMode, exercises } = state.settings.local;
  const { setExerciseDifficulty, setGameMode } = state;
  const handleGameModeChange = useCallback((e: IEventMetaObject<TGameMode>) => {
    setGameMode(e.value);
  }, [setGameMode]);
  const handleExerciseDifficultyChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setExerciseDifficulty({ [e.target.name]: e.target.value });
  }, [setExerciseDifficulty]);
  const handlePlayClick = useCallback(() => {
    navigate('/game');
    console.log(
      gameMode,
      exercises,
    );
  }, [gameMode, exercises, navigate]);

  return (
    <main className={cn(styles.view, localStyles.view)}>
      <b className={localStyles.easy}>easy</b>
      <b className={localStyles.medium}>medium</b>
      <b className={localStyles.hard}>hard</b>
      {Object.keys(EXERCISES).map((mode: TExercises) => {
        return (
          <div className={localStyles.row} key={mode}>
            <div className={localStyles.number}>
              ×{mode}
            </div>
            <div className={localStyles.easy}>
              <input
                type='radio'
                name={mode}
                value="easy"
                checked={exercises[mode] === DIFFICULTIES.EASY}
                onChange={handleExerciseDifficultyChange}
              />
            </div>
            <div className={localStyles.medium}>
              <input
                type='radio'
                name={mode}
                value="medium"
                checked={exercises[mode] === DIFFICULTIES.MEDIUM}
                onChange={handleExerciseDifficultyChange}
              />
            </div>
            <div className={localStyles.hard}>
              <input
                type='radio'
                name={mode}
                value="hard"
                checked={exercises[mode] === DIFFICULTIES.HARD}
                onChange={handleExerciseDifficultyChange}
              />
            </div>
            <InfoIcon />
          </div>
        );
      })}
      <Switch
        className={localStyles.modes}
        options={GAME_MODE_OPTIONS}
        value={gameMode}
        onChange={handleGameModeChange}
      />
      <Button className={localStyles.play} onClick={handlePlayClick}>
        <PlayIcon />
      </Button>
    </main>
  );
};
