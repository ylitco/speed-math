import React, { FC, useCallback, useState } from 'react';
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

const MODES = [3, 4, 5, 6, 7, 8, 9, 11, 12, 'N'];

export const GameSettings: FC = () => {
  const [mode, setMode] = useState('time');
  const [practice, setPractice] = useState<Record<string, string>>({});
  const handleModeChange = useCallback(_handleModeChange, []);
  const handleDifficultyChange = useCallback(_handleDifficultyChange, []);
  const handlePlayClick = useCallback(_handlePlayClick, [mode, practice]);

  return (
    <main className={cn(styles.view, localStyles.view)}>
      <b className={localStyles.easy}>easy</b>
      <b className={localStyles.medium}>medium</b>
      <b className={localStyles.hard}>hard</b>
      {MODES.map((_mode: string | number) => {
        const mode = _mode.toString();
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
                checked={practice[mode] === 'easy'}
                onChange={(e) => handleDifficultyChange(e.target.value, mode)}
              />
            </div>
            <div className={localStyles.medium}>
              <input
                type='radio'
                name={mode}
                value="medium"
                checked={practice[mode] === 'medium'}
                onChange={(e) => handleDifficultyChange(e.target.value, mode)}
              />
            </div>
            <div className={localStyles.hard}>
              <input
                type='radio'
                name={mode}
                value="hard"
                checked={practice[mode] === 'hard'}
                onChange={(e) => handleDifficultyChange(e.target.value, mode)}
              />
            </div>
            <InfoIcon />
          </div>
        );
      })}
      <Switch
        className={localStyles.modes}
        options={{
          time: <TimerIcon />,
          quantity: <QuantityIcon />,
          unlimited: <InfinityIcon />,
        }}
        value={mode}
        onChange={handleModeChange}
      />
      <Button className={localStyles.play} onClick={handlePlayClick}>
        <PlayIcon />
      </Button>
    </main>
  );

  function _handleModeChange(e: IEventMetaObject<string>) {
    setMode(e.value);
  }

  function _handleDifficultyChange(value: string, mode: string) {
    setPractice((prevPractice) => {
      return { ...prevPractice, [mode]: value };
    });
  }

  function _handlePlayClick() {
    console.log(
      mode,
      practice,
    );
  }
};
