import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { SettingsButton } from 'src/views/components/SettingsButton';
import { Wheel } from 'src/components/Wheel/Wheel';
import { VIEW } from 'src/views/constants';
import { IEventMetaObject } from 'src/types';
import localStyles from './Start.module.scss';

const OPTIONS = {
  [VIEW.LOCAL_SETTINGS]: 'Take exercise',
  [VIEW.ABOUT]: 'About',
  [VIEW.OVERVIEW]: 'Overview',
};
const DEFAULT_OPTION = VIEW.OVERVIEW;

export const Start: FC = () => {
  const navigate = useNavigate();
  const handleSelect = useCallback((e: IEventMetaObject<string>) => {
    navigate(`/${e.value}`);
  }, [navigate]);

  return (
    <>
      <Header renderMajorAction={SettingsButton}><b>Speed Math</b></Header>
      <Content>
        <Wheel className={localStyles.menu} options={OPTIONS} value={DEFAULT_OPTION} onSelect={handleSelect} />
        <h2 className={localStyles.hint}>Scroll to select</h2>
      </Content>
    </>
  );
};
