import { Plan } from "./Workout";

export const CHECKING_MODE = {
  HAND: 'hand',
  AUTO: 'auto',
} as const;

export const INPUT_MODE = {
  LTR: 'ltr',
  RTL: 'rtl',
} as const;

export const LANG = {
  ru: 'ru',
  en: 'en',
  hi: 'hi',
} as const;

export const GAME_MODE = {
  TIME: 'time',
  REPS: 'reps',
  FREE: 'free',
} as const;

export const COMPLEXITY = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export const EXERCISES = {
  '3': '3',
  '4': '4',
  '5': '5',
  '6': '6',
  '7': '7',
  '8': '8',
  '9': '9',
  '11': '11',
  '12': '12',
  'N': 'N',
} as const;

export const MINUTES = Object.fromEntries(Array.from(Array(61).keys()).map((m, i) => [i, `${i}`]));

export const SECONDS = Object.fromEntries(Array.from(Array(61).keys()).map((m, i) => [i, `${i}`]));

export const REPS = Object.fromEntries(Array.from(Array(20).keys()).map((m, i) => [i + 1, `${i + 1}`]));

export const FLEX_WORKOUT_PLAN = {} as Plan;