import React, { FC, HTMLAttributes, useMemo, useReducer } from 'react';
import {
  IAction,
  IPausedOnTime,
  IRepsWorkout,
  IState,
  ITimeWorkout,
  TCheckingMode,
  TDifficulties,
  TExercises,
  TGameMode,
  TInputMode,
  TMinutes,
  TPausedOnReps,
  TReps,
  TSeconds,
  TTrainingPlan,
} from 'src/state/types';
import { copy, getFirstFactor, getSecondFactor, WorkoutNotStartedError } from 'src/utils';
import { ACTIONS } from './actions';
import {
  CHECKING_MODE,
  DIFFICULTIES,
  EXERCISES,
  GAME_MODE,
  INPUT_MODE,
  MINUTES,
  REPS,
  SECONDS,
} from './constants';

const INITIAL_STATE = {
  settings: {
    global: {
      checkingMode: CHECKING_MODE.AUTO,
      inputMode: INPUT_MODE.RTL,
      minutes: MINUTES[0],
      seconds: SECONDS[5],
      reps: REPS[2],
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
  workout: null,
} as IState;

const reducer = (state: IState, action: IAction) => {
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
      const newState = copy(state);

      newState.settings.global.reps = action.data.reps;

      return newState;
    case ACTIONS.SET_GAME_MODE:
      state.settings.local.gameMode = action.data.mode;

      return copy(state);
    case ACTIONS.SET_EXERCISES_DIFFICULTIES:
      state.settings.local.exercises = {
        ...state.settings.local.exercises,
        ...action.data.exercise,
      };

      return copy(state);
    case ACTIONS.SET_GAME:
      state.workout = action.data.workout;

      return copy(state);
    case ACTIONS.START_GAME: {
      const newState = copy(state);
      const reps = createReps(state.settings.local.exercises);

      newState.workout = { ...reps, answers: { correct: 0, wrong: 0 }, startAt: new Date().getTime() };

      return newState;
    }
    case ACTIONS.CREATE_REP: {
      if (state.workout === null) {
        throw new WorkoutNotStartedError('Create reps when workout is not started');
      }

      const reps = createReps(state.settings.local.exercises);

      state.workout = { ...state.workout, ...reps };

      return copy(state);
    }
    case ACTIONS.PUSH_ANSWER: {
      const newState = copy(state);

      if (newState.workout === null) {
        throw new WorkoutNotStartedError('Push answer when workout is not started');
      }

      if (action.data.answer) {
        newState.workout.answers.correct += 1
      } else {
        newState.workout.answers.wrong += 1;
      }

      return newState;
    }
    case ACTIONS.PAUSE_GAME:
      if (selectWorkoutMode() === GAME_MODE.TIME) {
        const workout = state.workout as ITimeWorkout;

        workout.pausedOn = action.data.pausedOn;
      }
      if (selectWorkoutMode() === GAME_MODE.REPS) {
        const workout = state.workout as IRepsWorkout;

        workout.pausedOn = action.data.pausedOn;
      }
      if (selectWorkoutMode() === GAME_MODE.FREE) {
        // @todo pause free mode
      }
      return copy(state);
    case ACTIONS.STOP_WORKOUT: {
      const newState = copy(state);

      newState.workout.finishAt = new Date().getTime();

      return newState;
    }
    default:
      return state;
  }

  function selectWorkoutMode(): TGameMode {
    return state.settings.local.gameMode; // @todo rename -> workoutMode
  }
};

function createReps(trainingPlan: TTrainingPlan) {
  const firstFactor = getFirstFactor(trainingPlan);
  const exercise = `${firstFactor}` as TExercises;
  const secondFactor = getSecondFactor(firstFactor, trainingPlan);
  const complexity = trainingPlan[exercise] || trainingPlan[EXERCISES.N];

  return {
    firstFactor,
    secondFactor,
    complexity,
  };
}

export const StateContext = React.createContext<IState>(INITIAL_STATE);

export const StateProvider: FC<HTMLAttributes<HTMLElement>> = (props) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const store = useMemo(() => {
    return {
      settings: state.settings,
      workout: state.workout,
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
      setReps: (reps: TReps) => {
        dispatch({ type: ACTIONS.SET_REPS, data: { reps } });
      },
      setGameMode: (mode: TGameMode) => {
        dispatch({ type: ACTIONS.SET_GAME_MODE, data: { mode }});
      },
      setExerciseDifficulty: (exercise: Record<TExercises, TDifficulties>) => {
        dispatch({ type: ACTIONS.SET_EXERCISES_DIFFICULTIES, data: { exercise }});
      },
      startWorkout: () => {
        dispatch({ type: ACTIONS.START_GAME, data: {} });
      },
      nextReps: () => {
        dispatch({ type: ACTIONS.CREATE_REP, data: {} });
      },
      pushAnswer: (answer: boolean) => {
        dispatch({ type: ACTIONS.PUSH_ANSWER, data: { answer }});
      },
      pauseWorkout: (pausedOn: IPausedOnTime | TPausedOnReps) => {
        dispatch({ type: ACTIONS.PAUSE_GAME, data: { pausedOn } });
      },
      stopWorkout: () => {
        dispatch({ type: ACTIONS.STOP_WORKOUT, data: {} });
      },
      finishWorkout: () => {
        dispatch({ type: ACTIONS.SET_GAME, data: { workout: null } });
      },
    } as IState;
  }, [state]);

  return (
    <StateContext.Provider value={store}>
      {props.children}
    </StateContext.Provider>
  );
};
