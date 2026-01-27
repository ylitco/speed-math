import cn from "classnames";
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Header } from "~/components/Header/Header";
import { Content } from "~/components/Content/Content";
import { SettingsButton } from "~/views/components/SettingsButton";
import { Wheel } from "~/components/Wheel/Wheel";
import { VIEW } from "~/views/constants";
import { IEventMetaObject } from "~/types";
import localStyles from "./Start.module.scss";

const DEFAULT_OPTION = VIEW.ABOUT;

export const Start: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleSelect = useCallback(
    (e: IEventMetaObject<string>) => {
      navigate(`/${e.value}`);
    },
    [navigate]
  );
  const OPTIONS = useMemo(() => {
    return {
      [VIEW.LOCAL_SETTINGS]: t("start.workoutSettings"),
      [VIEW.ABOUT]: t("start.about"),
    };
  }, [t]);

  return (
    <>
      <Header renderMajorAction={SettingsButton}>
        <b>Speed Math</b>
      </Header>
      <Content>
        <Wheel
          className={cn(localStyles.menu, 'my-auto')}
          options={OPTIONS}
          value={DEFAULT_OPTION}
          onSelect={handleSelect}
          selectType="click"
          size="L"
        />
        <h2 className={cn(localStyles.hint, 'my-auto')}>{t("start.placeholder")}</h2>
      </Content>
    </>
  );
};
