import { useCallback } from "react";
import i18n from "src/i18n";
import { Lang } from "src/state/Workout";
import { IEventMetaObject } from "src/types";

export function useLocale() {
  const handleLocaleChange = useCallback((e: IEventMetaObject<Lang>) => {
    return i18n.changeLanguage(e.value);
  }, []);

  return {
    locale: i18n.language,
    handleLocaleChange,
  };
}
