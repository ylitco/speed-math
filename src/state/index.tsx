import React, { FC, HTMLAttributes, useMemo, useReducer } from 'react';
import {
  iAction,
  IState,
  TCheckingMode,
  TDifficulties,
  TExercises,
  TGameMode,
  TInputMode,
  TLang,
  TMinutes,
  TReps,
  TSeconds,
} from 'src/state/types';
import { copy } from 'src/utils';
import {
  CHECKING_MODE,
  DIFFICULTIES,
  EXERCISES,
  GAME_MODE,
  INPUT_MODE,
  LANG,
  MINUTES,
  REPS,
  SECONDS,
} from './constants';

const INITIAL_STATE = {
  settings: {
    global: {
      checkingMode: CHECKING_MODE.AUTO,
      inputMode: INPUT_MODE.RTL,
      minutes: MINUTES[5],
      seconds: SECONDS[0],
      reps: REPS[20],
      lang: LANG.EN,
    },
    local: {
      gameMode: GAME_MODE.TIME,
      exercises: {
        [EXERCISES[3]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[4]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[5]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[6]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[7]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[8]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[9]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[11]]: DIFFICULTIES.MEDIUM,
        [EXERCISES[12]]: DIFFICULTIES.MEDIUM,
        [EXERCISES.N]: DIFFICULTIES.MEDIUM,
      },
    },
  },
} as IState;

const ACTIONS = {
  SET_CHECKING_MODE: 'SET_CHECKING_MODE',
  SET_INPUT_MODE: 'SET_INPUT_MODE',
  SET_MINUTES: 'SET_MINUTES',
  SET_SECONDS: 'SET_SECONDS',
  SET_REPS: 'SET_REPS',
  SET_LANG: 'SET_LANG',
  SET_GAME_MODE: 'SET_GAME_MODE',
  SET_EXERCISES_DIFFICULTIES: 'SET_EXERCISES_DIFFICULTIES',
};

const reducer = (state: typeof INITIAL_STATE, action: iAction) => {
  switch (action.type) {
    case ACTIONS.SET_CHECKING_MODE:
      state.settings.global.checkingMode = action.data.mode;
      return copy(state);
    case ACTIONS.SET_INPUT_MODE:
      state.settings.global.inputMode = action.data.mode;
      return copy(state);
    case ACTIONS.SET_MINUTES:
      state.settings.global.minutes = action.data.minutes;
      return copy(state);
    case ACTIONS.SET_SECONDS:
      state.settings.global.seconds = action.data.seconds;
      return copy(state);
    case ACTIONS.SET_REPS:
      state.settings.global.reps = action.data.reps;
      return copy(state);
    case ACTIONS.SET_LANG:
      state.settings.global.lang = action.data.lang;
      return copy(state);
    case ACTIONS.SET_GAME_MODE:
      state.settings.local.gameMode = action.data.mode;
      return copy(state);
    case ACTIONS.SET_EXERCISES_DIFFICULTIES:
      state.settings.local.exercises = {
        ...state.settings.local.exercises,
        ...action.data.exercise,
      };
      return copy(state);
    default:
      return state;
  }
};

export const StateContext = React.createContext<IState | null>(null);

export const StateProvider: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const store = useMemo(() => {
    return {
      settings: state.settings,
      setCheckingMode: (mode: TCheckingMode) => {
        dispatch({ type: ACTIONS.SET_CHECKING_MODE, data: { mode } });
      },
      setInputMode: (mode: TInputMode) => {
        dispatch({ type: ACTIONS.SET_INPUT_MODE, data: { mode } });
      },
      setMinutes: (minutes: TMinutes) => {
        dispatch({ type: ACTIONS.SET_MINUTES, data: { minutes } });
      },
      setSeconds: (seconds: TSeconds) => {
        dispatch({ type: ACTIONS.SET_SECONDS, data: { seconds } });
      },
      setReps: (number: TReps) => {
        dispatch({ type: ACTIONS.SET_REPS, data: { number } });
      },
      setLang: (lang: TLang) => {
        dispatch({ type: ACTIONS.SET_LANG, data: { lang } });
      },
      setGameMode: (mode: TGameMode) => {
        dispatch({ type: ACTIONS.SET_GAME_MODE, data: { mode }});
      },
      setExerciseDifficulty: (exercise: Record<TExercises, TDifficulties>) => {
        dispatch({ type: ACTIONS.SET_EXERCISES_DIFFICULTIES, data: { exercise }});
      },
    } as IState;
  }, [state]);

  return (
    <StateContext.Provider value={store}>
      {props.children}
    </StateContext.Provider>
  );
};
