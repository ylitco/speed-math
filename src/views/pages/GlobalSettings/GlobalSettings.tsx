import React, { FC, useCallback, useContext, useMemo } from 'react';
import i18n from 'i18next';
import { useTranslation } from 'react-i18next';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { BackButton } from 'src/views/components/BackButton';
import { Switch } from 'src/components/Switch/Switch';
import { Wheel } from 'src/components/Wheel/Wheel';
import { TimerIcon } from 'src/icons/Timer/ComplexTimer';
import { WorldIcon } from 'src/icons/World/World';
import { NIcon } from 'src/icons/N/N';
import LocaleContext from 'src/LocaleContext';
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

export const GlobalSettings: FC = () => {
  const state = useContext(StateContext);
  const { locale } = useContext(LocaleContext);
  const { t } = useTranslation();
  const { checkingMode, inputMode, minutes, seconds, reps } = state.settings.global;
  const { setCheckingMode, setInputMode, setMinutes, setSeconds, setReps } = state;
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
    if (locale !== e.value) {
      i18n.changeLanguage(e.value);
    }
  }, [locale]);
  const CHECKING_OPTIONS = useMemo(() => {
    return {
      [CHECKING_MODE.HAND]: t('globalSettings.checkingMode.manual'),
      [CHECKING_MODE.AUTO]: t('globalSettings.checkingMode.automatic'),
    };
  }, [t]);
  const INPUT_OPTIONS = useMemo(() => {
    return {
      [INPUT_MODE.LTR]: t('globalSettings.inputMode.ltr'),
      [INPUT_MODE.RTL]: t('globalSettings.inputMode.rtl'),
    };
  }, [t]);

  return (
    <>
      <Header renderMinorAction={BackButton}>{t('globalSettings.title')}</Header>
      <Content className={styles.view}>
        <Switch
          className={styles.checkingModeSwitcher}
          label={t('globalSettings.checkingMode.label')}
          options={CHECKING_OPTIONS}
          value={checkingMode}
          onChange={handleCheckingModeChange}
        />
        <Switch
          className={styles.inputModeSwitcher}
          label={t('globalSettings.inputMode.label')}
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
            value={locale}
            onSelect={handleLangChange}
          />
        </label>
      </Content>
    </>
  );
};
