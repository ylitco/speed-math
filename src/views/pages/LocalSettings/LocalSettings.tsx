import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "~/components/Header/Header";
import { SettingsButton } from "~/views/components/SettingsButton";
import { BackButton } from "~/views/components/BackButton";
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
