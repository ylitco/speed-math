import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './Workout';
import tutorialReducer from './Tutorial';

export const store = configureStore({
  reducer: {
    workout: workoutReducer,
    tutorial: tutorialReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  preloadedState: {},
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;