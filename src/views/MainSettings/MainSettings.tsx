import React, { FC, useCallback, useState } from 'react';
import cn from 'classnames';

import { Switch } from 'src/components/Switch/Switch';
import { Wheel } from 'src/components/Wheel/Wheel';
import { TimerIcon } from 'src/icons/Timer/ComplexTimer';
import { WorldIcon } from 'src/icons/World/World';
import { NIcon } from 'src/icons/N/N';

import { TWheelValue } from 'src/components/Wheel/types';
import { IEventMetaObject } from 'src/types';

import styles from '../views.module.scss';
import localStyles from './MainSettings.module.scss';

const VERIFICATION_MODE = {
  HAND: 'hand',
  AUTO: 'auto',
};

const INPUT_MODE = {
  LTR: 'ltr',
  RTL: 'rtl',
};

const DEFAULT_VERIFICATION_MODE = VERIFICATION_MODE.AUTO;

const DEFAULT_INPUT_MODE = INPUT_MODE.RTL;

const VERIFICATION = {
  [VERIFICATION_MODE.HAND]: 'Manual',
  [VERIFICATION_MODE.AUTO]: 'Automatic',
};

const INPUT = {
  [INPUT_MODE.LTR]: 'From left to right',
  [INPUT_MODE.RTL]: 'From right to left',
};

const MINUTES = Object.fromEntries(Array.from(Array(61).keys()).map((m, i) => [i, i]));
const DEFAULT_MINUTES = 5;
const SECONDS = Object.fromEntries(Array.from(Array(61).keys()).map((m, i) => [i, i]));
const DEFAULT_SECONDS = 0;
const QUANTITY = Object.fromEntries(Array.from(Array(20).keys()).map((m, i) => [i + 1, i + 1]));
const DEFAULT_QUANTITY = 20;
const LANGUAGE = {
  RU: 'ru',
  EN: 'en',
  HI: 'hi',
};
const DEFAULT_LANGUAGE = LANGUAGE.EN;
const LANGUAGES = {
  [LANGUAGE.RU]: 'RU',
  [LANGUAGE.EN]: 'EN',
  [LANGUAGE.HI]: 'HI',
};

export const MainSettings: FC = () => {
  const [verificationMode, setVerificationMode] = useState(DEFAULT_VERIFICATION_MODE);
  const [inputMode, setInputMode] = useState(DEFAULT_INPUT_MODE);
  const [minutes, setMinutes] = useState(DEFAULT_MINUTES);
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [quantity, setQuantity] = useState(DEFAULT_QUANTITY);
  const [language, setLanguage] = useState(DEFAULT_LANGUAGE);
  const handleVerificationModeChange = useCallback(_handleVerificationModeChange, []);
  const handleInputModeChange = useCallback(_handleInputModeChange, []);
  return (
    <main className={cn(styles.view, localStyles.view)}>
      <Switch
        className={localStyles.verification}
        label="Verification Mode"
        options={VERIFICATION}
        value={verificationMode}
        onChange={handleVerificationModeChange}
      />
      <Switch
        className={localStyles.input}
        label="Input Mode"
        options={INPUT}
        value={inputMode}
        onChange={handleInputModeChange}
      />
      <label className={localStyles.time}>
        <TimerIcon className={localStyles.label} />
        <Wheel
          className={localStyles.minutes}
          options={MINUTES}
          value={minutes}
          onSelect={(e: IEventMetaObject<TWheelValue>) => setMinutes(e.value as number)}
        />
        <Wheel
          className={localStyles.seconds}
          options={SECONDS}
          value={seconds}
          onSelect={(e: IEventMetaObject<TWheelValue>) => setSeconds(e.value as number)}
        />
      </label>
      <label className={localStyles.quantity}>
        <NIcon />
        <Wheel options={QUANTITY} value={quantity} onSelect={(e: IEventMetaObject<TWheelValue>) => setQuantity(e.value as number)} />
      </label>
      <label className={localStyles.language}>
        <WorldIcon />
        <Wheel
          options={LANGUAGES}
          value={language}
          onSelect={(e: IEventMetaObject<TWheelValue>) => setLanguage(e.value as string)}
        />
      </label>
    </main>
  );

  function _handleVerificationModeChange(e: IEventMetaObject<string>) {
    setVerificationMode(e.value);
  }

  function _handleInputModeChange(e: IEventMetaObject<string>) {
    setInputMode(e.value);
  }
};
