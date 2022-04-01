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
} from 'src/state/index';

export type TCheckingMode = typeof CHECKING_MODE[keyof typeof CHECKING_MODE];
export type TInputMode = typeof INPUT_MODE[keyof typeof INPUT_MODE];
export type TMinutes = typeof MINUTES[keyof typeof MINUTES];
export type TSeconds = typeof SECONDS[keyof typeof SECONDS];
export type TReps = typeof REPS[keyof typeof REPS];
export type TLang = typeof LANG[keyof typeof LANG];
export type TGameMode = typeof GAME_MODE[keyof typeof GAME_MODE];
export type TDifficulties = typeof DIFFICULTIES[keyof typeof DIFFICULTIES];
export type TExercises = typeof EXERCISES[keyof typeof EXERCISES];
export interface IState {
  settings: {
    global: {
      checkingMode: TCheckingMode;
      inputMode: TInputMode;
      minutes: TMinutes;
      seconds: TSeconds;
      reps: TReps;
      lang: TLang;
    };
    local: {
      gameMode: TGameMode;
      exercises: Record<TExercises, TDifficulties>;
    };
  };
  setCheckingMode: (mode: TCheckingMode) => void;
  setInputMode: (mode: TInputMode) => void;
  setMinutes: (minutes: TMinutes) => void;
  setSeconds: (seconds: TSeconds) => void;
  setReps: (reps: TReps) => void;
  setLang: (lang: TLang) => void;
  setGameMode: (mode: TGameMode) => void;
  setExerciseDifficulty: (exerciseDifficulty: Record<TExercises, TDifficulties>) => void;
}
export interface iAction {
  type: typeof actions[keyof typeof actions];
  data: Record<string, any>;
}
