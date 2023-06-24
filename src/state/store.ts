import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './Workout';

export const store = configureStore({
    reducer: {
        workout: workoutReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: {},
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;