import { memo, FC } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "~/components/Header/Header";
import { BackButton } from "~/views/components/BackButton";
import { GlobalSettingsContent } from "./Content";

export const GlobalSettings: FC = memo(function GlobalSettings() {
  const { t } = useTranslation();
  return (
    <>
      <Header renderMinorAction={BackButton}>
        {t("globalSettings.title")}
      </Header>
      <GlobalSettingsContent />
    </>
  );
});
