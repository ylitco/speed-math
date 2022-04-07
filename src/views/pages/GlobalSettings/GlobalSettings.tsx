import React, { FC, useCallback, useContext } from 'react';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { BackButton } from 'src/views/components/BackButton';
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
  TCheckingMode,
  TInputMode,
  TMinutes,
  TSeconds,
  TReps,
  TLang,
} from 'src/state/types'
import { IEventMetaObject } from 'src/types';

import styles from './GlobalSettings.module.scss';

const CHECKING_OPTIONS = {
  [CHECKING_MODE.HAND]: 'Manual',
  [CHECKING_MODE.AUTO]: 'Automatic',
};

const INPUT_OPTIONS = {
  [INPUT_MODE.LTR]: 'From left to right',
  [INPUT_MODE.RTL]: 'From right to left',
};

export const GlobalSettings: FC = () => {
  const state = useContext(StateContext);
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
    <>
      <Header renderMinorAction={BackButton}>Settings</Header>
      <Content className={styles.view}>
        <Switch
          className={styles.checkingModeSwitcher}
          label="Checking Mode"
          options={CHECKING_OPTIONS}
          value={checkingMode}
          onChange={handleCheckingModeChange}
        />
        <Switch
          className={styles.inputModeSwitcher}
          label="Input Mode"
          options={INPUT_OPTIONS}
          value={inputMode}
          onChange={handleInputModeChange}
        />
        <label className={styles.time}>
          <TimerIcon className={styles.label} />
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
        <label className={styles.reps}>
          <NIcon />
          <Wheel
            options={REPS}
            value={reps}
            onSelect={handleRepsChange}
          />
        </label>
        <label className={styles.lang}>
          <WorldIcon />
          <Wheel
            options={LANG}
            value={lang}
            onSelect={handleLangChange}
          />
        </label>
      </Content>
    </>
  );
};
