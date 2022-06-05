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
} from 'src/state/constants';
import { ACTIONS } from 'src/state/actions';

export type TCheckingMode = typeof CHECKING_MODE[keyof typeof CHECKING_MODE];
export type TInputMode = typeof INPUT_MODE[keyof typeof INPUT_MODE];
export type TMinutes = typeof MINUTES[keyof typeof MINUTES];
export type TSeconds = typeof SECONDS[keyof typeof SECONDS];
export type TReps = typeof REPS[keyof typeof REPS];
export type TLang = typeof LANG[keyof typeof LANG];
export type TGameMode = typeof GAME_MODE[keyof typeof GAME_MODE];
export type TDifficulties = typeof DIFFICULTIES[keyof typeof DIFFICULTIES];
export type TExercises = typeof EXERCISES[keyof typeof EXERCISES];
export type TTrainingPlan = Record<TExercises, TDifficulties>; // @todo rename

export interface IFreeWorkout {
  complexity: TDifficulties;
  firstFactor: number;
  secondFactor: number;
  answers: {
    correct: number;
    wrong: number;
  };
  startAt: number;
  finishAt: number;
}

export interface IPausedOnTime {
  minutes: number;
  seconds: number;
}

export type TPausedOnReps = TReps

export interface ITimeWorkout extends IFreeWorkout {
  pausedOn: null | IPausedOnTime;
}

export interface IRepsWorkout extends IFreeWorkout {
  pausedOn: null | TPausedOnReps;
}

export interface IState {
  settings: {
    global: {
      checkingMode: TCheckingMode;
      inputMode: TInputMode;
      minutes: TMinutes;
      seconds: TSeconds;
      reps: TReps;
    };
    local: {
      gameMode: TGameMode;
      exercises: TTrainingPlan;
    };
  };
  workout: null | IFreeWorkout | IRepsWorkout | ITimeWorkout;
  setCheckingMode: (mode: TCheckingMode) => void;
  setInputMode: (mode: TInputMode) => void;
  setMinutes: (minutes: TMinutes) => void;
  setSeconds: (seconds: TSeconds) => void;
  setReps: (reps: TReps) => void;
  setGameMode: (mode: TGameMode) => void;
  setExerciseDifficulty: (exerciseDifficulty: Record<TExercises, TDifficulties>) => void;
  startWorkout: () => void;
  nextReps: () => void;
  pushAnswer: (answer: boolean) => void;
  pauseWorkout: (pausedOn: IPausedOnTime | IPausedOnReps) => void;
  stopWorkout: () => void;
  finishWorkout: () => void;
}

export interface IAction {
  type: typeof ACTIONS[keyof typeof ACTIONS];
  data: Record<string, any>;
}
