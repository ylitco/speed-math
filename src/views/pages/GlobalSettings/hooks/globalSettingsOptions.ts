import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { CHECKING_MODE, INPUT_MODE } from "src/state/constants";

export function useSettingsOptions() {
  const { t } = useTranslation();
  return [
    useMemo(
      () => ({
        [CHECKING_MODE.HAND]: t("globalSettings.checkingMode.manual"),
        [CHECKING_MODE.AUTO]: t("globalSettings.checkingMode.automatic"),
      }),
      [t]
    ),
    useMemo(
      () => ({
        [INPUT_MODE.LTR]: t("globalSettings.inputMode.ltr"),
        [INPUT_MODE.RTL]: t("globalSettings.inputMode.rtl"),
      }),
      [t]
    ),
  ];
}