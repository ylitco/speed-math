import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "src/components/Header/Header";
import { SettingsButton } from "src/views/components/SettingsButton";
import { BackButton } from "src/views/components/BackButton";
import { LocalSettingsContent } from "./Content";

export const LocalSettings: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header renderMajorAction={SettingsButton} renderMinorAction={BackButton}>
        {t("localSettings.title")}
      </Header>
      <LocalSettingsContent />
    </>
  );
};
