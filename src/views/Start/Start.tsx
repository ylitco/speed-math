import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Wheel } from 'src/components/Wheel/Wheel';

import { VIEW } from 'src/views/constants';

import { IEventMetaObject } from 'src/types';

import styles from '../views.module.scss';
import localStyles from './Start.module.scss';

const OPTIONS = {
  [VIEW.GAME_SETTINGS]: 'Take exercise',
  [VIEW.ABOUT]: 'About',
  [VIEW.OVERVIEW]: 'Overview',
};
const DEFAULT_OPTION = VIEW.OVERVIEW;

export const Start: FC = () => {
  const navigate = useNavigate();
  const handleSelect = useCallback(_handleSelect, [navigate]);

  return (
    <main className={styles.view}>
      <Wheel className={localStyles.menu} options={OPTIONS} value={DEFAULT_OPTION} onSelect={handleSelect} />
      <h2 className={localStyles.hint}>Scroll to select</h2>
    </main>
  );

  function _handleSelect(e: IEventMetaObject<string>) {
    navigate(`/${e.value}`);
  }
};
