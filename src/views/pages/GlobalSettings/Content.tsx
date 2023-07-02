import { memo } from "react";
import { Content } from "src/components/Content/Content";
import { Switch } from "src/components/Switch/Switch";
import { Wheel } from "src/components/Wheel/Wheel";
import { TimerIcon } from "src/icons/Timer/ComplexTimer";
import { WorldIcon } from "src/icons/World/World";
import { NIcon } from "src/icons/N/N";
import { MINUTES, SECONDS, REPS, LANG } from "src/state/constants";

import styles from "./GlobalSettings.module.scss";
import { useLocale, useSettingsOptions, useWorkoutSettings } from "./hooks";
import { t } from "i18next";

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
        label={t("globalSettings.checkingMode.label")}
        options={CHECK_OPTIONS}
        value={checkMode}
        onChange={handleCheckModeChange}
      />
      <Switch
        className={styles.inputModeSwitcher}
        label={t("globalSettings.inputMode.label")}
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
          <p className={styles.units}>{t("globalSettings.minutes.label")}</p>
          <p className={styles.units}>{t("globalSettings.seconds.label")}</p>
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
  );
});