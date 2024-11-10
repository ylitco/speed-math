import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Header } from "~/components/Header/Header";
import { Content } from "~/components/Content/Content";
import { SettingsButton } from "~/views/components/SettingsButton";
import { BackButton } from "~/views/components/BackButton";
import styles from "./About.module.scss";

/**
 * @todo
 *  1. Use Markdown in description
 */
export const About: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header renderMajorAction={SettingsButton} renderMinorAction={BackButton}>
        {t("about.title")}
      </Header>
      <Content className={styles.description}>
        <div className={styles.content}>{t("about.description")}</div>
      </Content>
    </>
  );
};
