import { TViewSettings } from 'src/views/types';
import { Settings as SettingsIcon } from 'src/icons/Settings/Settings';
import { Info as InfoIcon } from 'src/icons/Info/Info';

export const VIEW = {
  START: 'start',
  OVERVIEW: 'overview',
  MAIN_SETTINGS: 'main-settings',
  ABOUT: 'about',
  GAME_SETTINGS: 'game-settings',
  GAME: 'game',
  STATISTICS: 'statistics',
  EXPLANATION: 'explanation',
} as const;

export const SETTINGS = {
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
