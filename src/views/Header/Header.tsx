import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button/Button';
import { Back as BackIcon } from 'src/icons/Back/Back';

import { usePrevious } from 'src/hooks';

import { VIEWS } from 'src/views/types';
import { VIEW, SETTINGS } from 'src/views/constants';

import styles from './Header.module.scss';

export const Header: FC = () => {
  const location = useLocation();
  const view = location.pathname.slice(1) as VIEWS;
  const prevView = usePrevious(view);
  const navigate = useNavigate();
  const handleBackClick = useCallback(_handleBackClick, [navigate, view, prevView]);

  if (!view) return null;

  const { action } = SETTINGS[view];
  const title = _getTitle();

  return (
    <header className={styles.header}>
      <div className={styles.action}>
        {view !== VIEW.START && (
          <Button onClick={handleBackClick}>
            <BackIcon />
          </Button>
        )}
      </div>
      <h1 className={cn(styles.title, view === VIEW.START && styles.primary)}>{title}</h1>
      <div className={styles.action}>
        {action && (
          <Link to={action.link}>
            <Button>
              <action.Icon />
            </Button>
          </Link>
        )}
      </div>
    </header>
  );

  function _handleBackClick() {
    if (view === VIEW.STATISTICS) return navigate('/game-settings');

    if (view === VIEW.GAME_SETTINGS && prevView === VIEW.STATISTICS) return navigate('/start');

    return navigate(-1);
  }

  function _getTitle() {
    switch (view) {
      case VIEW.START:
        return 'Speed Math';
      case VIEW.OVERVIEW:
        return 'Overview';
      case VIEW.MAIN_SETTINGS:
        return 'Settings';
      case VIEW.ABOUT:
        return 'About';
      case VIEW.GAME_SETTINGS:
        return 'Practice';
      case VIEW.GAME:
        return '@TODO DYNAMIC TITLE';
      case VIEW.STATISTICS:
        return 'Result';
      case VIEW.EXPLANATION:
        return '@TODO DYNAMIC TITLE';
    }
  }
};
