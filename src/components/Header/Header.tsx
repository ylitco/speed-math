import React, { FC, useCallback, useRef, useEffect } from 'react';
import cn from 'classnames';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button/Button';
import { Settings as SettingsIcon } from 'src/icons/Settings/Settings';
import { Back as BackIcon } from 'src/icons/Back/Back';
import { Info as InfoIcon } from 'src/icons/Info/Info';
import styles from './Header.module.scss';

// @todo move to view constants file
const VIEW = {
  START: 'start',
  OVERVIEW: 'overview',
  MAIN_SETTINGS: 'main-settings',
  ABOUT: 'about',
  GAME_SETTINGS: 'game-settings',
  GAME: 'game',
  STATISTICS: 'statistics',
  EXPLANATION: 'explanation',
} as const;


type VIEW_VALUE = typeof VIEW[keyof typeof VIEW];

type TViewSettings = {
  [key in VIEW_VALUE]: IViewSetting;
}

interface IViewSetting {
  action: IAction | null;
}

interface IAction {
  Icon: FC,
  link: string,
}

const SETTINGS = {
  [VIEW.START]: {
    action: {
      Icon: SettingsIcon,
      link: '/' + VIEW.MAIN_SETTINGS,
    }
  },
  [VIEW.OVERVIEW]: {
    action: null,
  },
  [VIEW.MAIN_SETTINGS]: {
    action: null,
  },
  [VIEW.ABOUT]: {
    action: {
      Icon: SettingsIcon,
      link: '/' + VIEW.MAIN_SETTINGS,
    }
  },
  [VIEW.GAME_SETTINGS]: {
    action: {
      Icon: SettingsIcon,
      link: '/' + VIEW.MAIN_SETTINGS,
    }
  },
  [VIEW.GAME]: {
    action: {
      Icon: InfoIcon,
      link: '/' + VIEW.EXPLANATION,
    }
  },
  [VIEW.STATISTICS]: {
    action: {
      Icon: InfoIcon,
      link: '/' + VIEW.EXPLANATION
    }
  },
  [VIEW.EXPLANATION]: {
    action: null,
  },
} as TViewSettings;

// @todo move to hooks file
function usePreviousLocation(location: string) {
  const ref = useRef<string>();

  const current = ref.current;

  useEffect(() => {
    ref.current = location;
  });

  return current;
}

export const Header: FC = () => {
  const location = useLocation();
  const view = location.pathname.slice(1) as VIEW_VALUE;
  const prevView = usePreviousLocation(view);
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
