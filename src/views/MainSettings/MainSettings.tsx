import React, { FC, useCallback, useContext } from 'react';
import cn from 'classnames';

import { Switch } from 'src/components/Switch/Switch';
import { Wheel } from 'src/components/Wheel/Wheel';
import { TimerIcon } from 'src/icons/Timer/ComplexTimer';
import { WorldIcon } from 'src/icons/World/World';
import { NIcon } from 'src/icons/N/N';

import { StateContext } from 'src/state';
import {
  INPUT_MODE,
  CHECKING_MODE,
  MINUTES,
  SECONDS,
  REPS,
  LANG,
} from 'src/state/constants';
import {
  IState,
  TCheckingMode,
  TInputMode,
  TMinutes,
  TSeconds,
  TReps,
  TLang,
} from 'src/state/types'
import { IEventMetaObject } from 'src/types';

import styles from '../views.module.scss';
import localStyles from './MainSettings.module.scss';

const CHECKING_OPTIONS = {
  [CHECKING_MODE.HAND]: 'Manual',
  [CHECKING_MODE.AUTO]: 'Automatic',
};

const INPUT_OPTIONS = {
  [INPUT_MODE.LTR]: 'From left to right',
  [INPUT_MODE.RTL]: 'From right to left',
};

export const MainSettings: FC = () => {
  const state = useContext<IState | null>(StateContext) as IState;
  const { checkingMode, inputMode, minutes, seconds, reps, lang } = state.settings.global;
  const { setCheckingMode, setInputMode, setMinutes, setSeconds, setReps, setLang } = state;
  const handleCheckingModeChange = useCallback((e: IEventMetaObject<TCheckingMode>) => {
    setCheckingMode(e.value);
  }, [setCheckingMode]);
  const handleInputModeChange = useCallback((e: IEventMetaObject<TInputMode>) => {
    setInputMode(e.value);
  }, [setInputMode]);
  const handleMinutesChange = useCallback((e: IEventMetaObject<TMinutes>) => {
    setMinutes(e.value);
  }, [setMinutes]);
  const handleSecondsChange = useCallback((e: IEventMetaObject<TSeconds>) => {
    setSeconds(e.value);
  }, [setSeconds]);
  const handleRepsChange = useCallback((e: IEventMetaObject<TReps>) => {
    setReps(e.value);
  }, [setReps]);
  const handleLangChange = useCallback((e: IEventMetaObject<TLang>) => {
    setLang(e.value);
  }, [setLang]);

  return (
    <main className={cn(styles.view, localStyles.view)}>
      <Switch
        className={localStyles.checkingModeSwitcher}
        label="Checking Mode"
        options={CHECKING_OPTIONS}
        value={checkingMode}
        onChange={handleCheckingModeChange}
      />
      <Switch
        className={localStyles.inputModeSwitcher}
        label="Input Mode"
        options={INPUT_OPTIONS}
        value={inputMode}
        onChange={handleInputModeChange}
      />
      <label className={localStyles.time}>
        <TimerIcon className={localStyles.label} />
        <Wheel
          options={MINUTES}
          value={minutes}
          onSelect={handleMinutesChange}
        />
        <Wheel
          options={SECONDS}
          value={seconds}
          onSelect={handleSecondsChange}
        />
      </label>
      <label className={localStyles.reps}>
        <NIcon />
        <Wheel
          options={REPS}
          value={reps}
          onSelect={handleRepsChange}
        />
      </label>
      <label className={localStyles.lang}>
        <WorldIcon />
        <Wheel
          options={LANG}
          value={lang}
          onSelect={handleLangChange}
        />
      </label>
    </main>
  );
};
