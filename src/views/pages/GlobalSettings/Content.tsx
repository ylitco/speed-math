import { memo } from 'react';
import { Content } from '~/components/Content/Content';
import { Switch } from '~/components/Switch/Switch';
import { Wheel } from '~/components/Wheel/Wheel';
import { MINUTES, SECONDS, REPS, LANG } from '~/state/constants';

import styles from './GlobalSettings.module.scss';
import { useLocale, useSettingsOptions, useWorkoutSettings } from './hooks';
import { t } from 'i18next';

export const GlobalSettingsContent = memo(function GlobalSettingsContent() {
  const { locale, handleLocaleChange } = useLocale();
  const [
    [checkMode, handleCheckModeChange],
    [inputMode, handleInputModeChange],
    [minutes, handleMinutesChange],
    [seconds, handleSecondsChange],
    [reps, handleRepsChange],
  ] = useWorkoutSettings();
  const [CHECK_OPTIONS, INPUT_OPTIONS] = useSettingsOptions();

  return (
    <Content className={styles.view}>
      <Switch
        className={styles.checkingModeSwitcher}
        label={t('globalSettings.checkingMode.label')}
        options={CHECK_OPTIONS}
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
          <div className="col-span-2 flex items-end gap-1.5">
            <i className="speed-math-minutes-sholder text-icon-xs inner-shadow-light inline-block text-center opacity-50" />
            <i className="speed-math-timer text-icon-timer inner-shadow-light mb-0.5 inline-block text-center opacity-50" />
            <i className="speed-math-seconds-sholder text-icon-xs inner-shadow-light inline-block text-center opacity-50" />
          </div>
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
          <p className={styles.units}>{t('globalSettings.minutes.label')}</p>
          <p className={styles.units}>{t('globalSettings.seconds.label')}</p>
        </label>
        <label className={styles.reps}>
          <i className="speed-math-n text-icon-n inner-shadow-light text-center opacity-50" />
          <Wheel
            options={REPS}
            value={reps}
            onSelect={handleRepsChange}
            size="M"
          />
        </label>
        <label className={styles.lang}>
          <i className="speed-math-world text-icon-world inner-shadow-light text-center opacity-50" />
          <Wheel
            options={LANG}
            value={locale}
            onSelect={handleLocaleChange}
            size="M"
          />
        </label>
      </div>
    </Content>
  );
});
