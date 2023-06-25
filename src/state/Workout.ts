import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';
import { GAME_MODE } from './constants';

export type InputMode = 'rtl' | 'ltr';
export type CheckMode = 'hand' | 'auto';
export type Type = typeof GAME_MODE[keyof typeof GAME_MODE];

export interface Workout {
  inputMode: InputMode;
  checkMode: CheckMode;
  time: {
    minutes: number;
    seconds: number;
  },
  reps: number;
  type: Type;
};

const initialState: Workout = {
  inputMode: "rtl",
  checkMode: "auto",
  time: {
    minutes: 5,
    seconds: 0,
  },
  reps: 20,
  type: GAME_MODE.REPS,
};

export const WorkoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {
    setInputMode: (state, { payload: inputMode }: PayloadAction<InputMode>) => {
      state.inputMode = inputMode;
    },
    setCheckMode: (state, { payload: checkMode }: PayloadAction<CheckMode>) => {
      state.checkMode = checkMode;
    },
    setMinutes: (state, { payload: minutes }: PayloadAction<number>) => {
      state.time.minutes = minutes;
    },
    setSeconds: (state, { payload: seconds }: PayloadAction<number>) => {
      state.time.seconds = seconds;
    },
    setReps: (state, { payload: reps }: PayloadAction<number>) => {
      state.reps = reps;
    },
    setType: (state, { payload: type }: PayloadAction<Type>) => {
      state.type = type;
    },
  },
});

export const getInputMode = (state: AppState) => state.workout.inputMode;
export const getCheckMode = (state: AppState) => state.workout.checkMode;
export const getMinutes = (state: AppState) =>
  state.workout.time.minutes.toString();
export const getSeconds = (state: AppState) =>
  state.workout.time.seconds.toString();
export const getReps = (state: AppState) => state.workout.reps.toString();
export const getType = (state: AppState) => state.workout.type;

export const {
  setInputMode,
  setCheckMode,
  setMinutes,
  setSeconds,
  setReps,
  setType,
} = WorkoutSlice.actions;
export default WorkoutSlice.reducer;