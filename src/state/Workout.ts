import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AppState } from './store';

export type InputMode = 'rtl' | 'ltr';
export type CheckMode = 'hand' | 'auto';

export interface Workspace {
  inputMode: InputMode;
  checkMode: CheckMode;
};

const initialState: Workspace = {
  inputMode: "rtl",
  checkMode: "auto",
};

export const WorkspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setInputMode: (state, { payload: inputMode }: PayloadAction<InputMode>) => {
      state.inputMode = inputMode;
    },
    setCheckMode: (state, { payload: checkMode }: PayloadAction<CheckMode>) => {
      state.checkMode = checkMode;
    },
  },
});

export const getInputMode = (state: AppState) => state.workout.inputMode;
export const getCheckMode = (state: AppState) => state.workout.checkMode;

export const { setInputMode, setCheckMode } = WorkspaceSlice.actions;
export default WorkspaceSlice.reducer;