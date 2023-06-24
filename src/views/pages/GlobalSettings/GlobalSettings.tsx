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
import {
  INPUT_MODE,
  CHECKING_MODE,
  MINUTES,
  SECONDS,
  REPS,
  LANG,
} from 'src/state/constants';
import { TMinutes, TSeconds, TReps, TLang } from 'src/state/types';
import { IEventMetaObject } from 'src/types';
import { useSelector, useDispatch } from 'react-redux';
import styles from './GlobalSettings.module.scss';
import type { CheckMode, InputMode } from 'src/state/Workout';
import {
  getCheckMode,
  getInputMode,
  getMinutes,
  getSeconds,
  getReps,
  setCheckMode,
  setInputMode,
  setMinutes,
  setSeconds,
  setReps,
} from 'src/state/Workout';

export const GlobalSettings: FC = () => {
  const { t } = useTranslation();
  const { locale, handleLocaleChange } = useLocale();
  const {
    checkMode,
    handleCheckModeChange,
    inputMode,
    handleInputModeChange,
    minutes,
    handleMinutesChange,
    seconds,
    handleSecondsChange,
    reps,
    handleRepsChange,
  } = useWorkoutSettings();
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
      <Header renderMinorAction={BackButton}>
        {t('globalSettings.title')}
      </Header>
      <Content className={styles.view}>
        <Switch
          className={styles.checkingModeSwitcher}
          label={t('globalSettings.checkingMode.label')}
          options={CHECKING_OPTIONS}
          value={checkMode}
          onChange={handleCheckModeChange}
        />
        <Switch
          className={styles.inputModeSwitcher}
          label={t('globalSettings.inputMode.label')}
          options={INPUT_OPTIONS}
          value={inputMode}
          onChange={handleInputModeChange}
        />
        <div className={styles.wheels}>
          <label className={styles.time}>
            <TimerIcon className={styles.label} />
            <Wheel
              options={MINUTES}
              value={minutes}
              onSelect={handleMinutesChange}
              size="M"
            />
            <Wheel
              options={SECONDS}
              value={seconds}
              onSelect={handleSecondsChange}
              size="M"
            />
            <p className={styles.units}>м</p>
            <p className={styles.units}>с</p>
          </label>
          <label className={styles.reps}>
            <NIcon />
            <Wheel
              options={REPS}
              value={reps}
              onSelect={handleRepsChange}
              size="M"
            />
          </label>
          <label className={styles.lang}>
            <WorldIcon />
            <Wheel
              options={LANG}
              value={locale}
              onSelect={handleLocaleChange}
              size="M"
            />
          </label>
        </div>
      </Content>
    </>
  );
};

function useLocale() {
  const { locale } = useContext(LocaleContext);
  const handleLocaleChange = useCallback((e: IEventMetaObject<TLang>) => {
    return i18n.changeLanguage(e.value);
  }, []);

  return {
    locale,
    handleLocaleChange,
  };
}

function useWorkoutSettings() {
  const dispatch = useDispatch();
  const checkMode = useSelector(getCheckMode);
  const handleCheckModeChange = useCallback(
    (e: IEventMetaObject<CheckMode>) => {
      dispatch(setCheckMode(e.value));
    },
    [dispatch]
  );
  const inputMode = useSelector(getInputMode);
  const handleInputModeChange = useCallback(
    (e: IEventMetaObject<InputMode>) => {
      dispatch(setInputMode(e.value));
    },
    [dispatch]
  );
  const minutes = useSelector(getMinutes);
  const handleMinutesChange = useCallback(
    (e: IEventMetaObject<TMinutes>) => {
      dispatch(setMinutes(+e.value));
    },
    [dispatch]
  );
  const seconds = useSelector(getSeconds);
  const handleSecondsChange = useCallback(
    (e: IEventMetaObject<TSeconds>) => {
      dispatch(setSeconds(+e.value));
    },
    [dispatch]
  );
  const reps = useSelector(getReps);
  const handleRepsChange = useCallback(
    (e: IEventMetaObject<TReps>) => {
      dispatch(setReps(+e.value));
    },
    [dispatch]
  );

  return {
    checkMode,
    handleCheckModeChange,
    inputMode,
    handleInputModeChange,
    minutes,
    handleMinutesChange,
    seconds,
    handleSecondsChange,
    reps,
    handleRepsChange,
  };
}
