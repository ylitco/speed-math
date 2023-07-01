import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppState, AppDispatch } from "./store";
import {
  COMPLEXITY,
  EXERCISES,
  FLEX_WORKOUT_PLAN,
  GAME_MODE,
  LANG,
  MINUTES,
  SECONDS,
} from "./constants";
import { useDispatch } from "react-redux";

export const createAppAsyncThunk =
  createAsyncThunk.withTypes<{
    state: AppState;
    dispatch: AppDispatch;
  }>();
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export type InputMode = "rtl" | "ltr";
export type CheckMode = "hand" | "auto";
export type Minutes = typeof MINUTES[keyof typeof MINUTES];
export type Seconds = typeof SECONDS[keyof typeof SECONDS];
export type Type = typeof GAME_MODE[keyof typeof GAME_MODE];
export type Complexity = typeof COMPLEXITY[keyof typeof COMPLEXITY];
export type ExerciseName = typeof EXERCISES[keyof typeof EXERCISES];
export type Exercise = { name: ExerciseName; complexity: Complexity };
export type Plan = Record<ExerciseName, Complexity>;
export type Lang = typeof LANG[keyof typeof LANG];
interface Rep {
  exerciseName: ExerciseName;
  firstFactor: number;
  secondFactor: number;
  complexity: Complexity;
}
interface Stat {
  correct: number;
  wrong: number;
  timer: number;
}
export interface Set {
  rep: Rep;
  repIndex: number;
  stat: Stat;
  startedAt: number;
}
interface Tutorial {
  firstFactor: number;
  secondFactor: number;
}
export interface Workout {
  inputMode: InputMode;
  checkMode: CheckMode;
  time: {
    minutes: number;
    seconds: number;
  };
  reps: number;
  type: Type;
  plan: Plan;
  set: Set | null;
  tutorial: Tutorial | null;
}

const initialState: Workout = {
  inputMode: "rtl",
  checkMode: "auto",
  time: {
    minutes: 5,
    seconds: 0,
  },
  reps: 20,
  type: GAME_MODE.REPS,
  plan: FLEX_WORKOUT_PLAN,
  set: null,
  tutorial: null,
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
    changePlan: (state, { payload: exercise }: PayloadAction<Exercise>) => {
      if (state.plan[exercise.name] === exercise.complexity) {
        delete state.plan[exercise.name];
      } else {
        state.plan[exercise.name] = exercise.complexity;
      }
    },
    startSet: (state) => {
      state.set = {
        rep: createRep(state.plan),
        repIndex: 1,
        stat: { correct: 0, wrong: 0, timer: 0 },
        startedAt: new Date().getTime(),
      };
    },
    finishSet: (state) => {
      state.set = null;
    },
    nextRep: (state) => {
      if (state.set === null) throw new Error("Set doesn't started");

      state.set.rep = createRep(state.plan);
      state.set.repIndex++;
    },
    pushAnswer: (
      state,
      { payload: userAnswer }: PayloadAction<string | null>
    ) => {
      if (state.set === null) throw new Error("Set doesn't started");

      if (userAnswer === null) {
        state.set.stat.wrong++;
        return;
      }

      const answer = state.set.rep.firstFactor * state.set.rep.secondFactor;
      console.debug(parseInt(userAnswer));

      parseInt(userAnswer) === answer
        ? state.set.stat.correct++
        : state.set.stat.wrong++;
    },
    tickTimer: (state) => {
      if (state.set === null) throw new Error("Set doesn't started");

      state.set.stat.timer++;
    },
    startTutorial: (
      state,
      {
        payload: { firstFactor, secondFactor },
      }: PayloadAction<{ firstFactor: number, secondFactor: number }>
    ) => {
      state.tutorial = {
        firstFactor,
        secondFactor,
      };
    },
    finishTutorial: (state) => {
      state.tutorial = null;
    },
  },
});

let timer: NodeJS.Timeout | null = null;

export const startTimer = createAppAsyncThunk(
  "workout/startTimer",
  (_, { dispatch }) => {
    timer = setInterval(() => dispatch(tickTimer()), 1000);
  }
);

export const stopTimer = createAppAsyncThunk("workout/stopTimer", () => {
  timer && clearInterval(timer);
});

const getWorkout = (state: AppState) => state.workout;
export const getInputMode = (state: AppState) => state.workout.inputMode;
export const getCheckMode = (state: AppState) => state.workout.checkMode;
export const getMinutes = (state: AppState) =>
  state.workout.time.minutes.toString();
export const getSeconds = (state: AppState) =>
  state.workout.time.seconds.toString();
export const getWorkoutReps = (state: AppState) => state.workout.reps;
export const getType = (state: AppState) => state.workout.type;
export const getPlan = (state: AppState) => state.workout.plan;
export const getSet = (state: AppState) => state.workout.set as Set;
export const getSetStatus = (state: AppState) => !!state.workout.set;
export const getSetStat = createSelector(getSet, (set) => set.stat);
export const getSetTimerStatus = createSelector(
  getWorkout,
  getSetStat,
  (workout, stat) =>
    workout.time.minutes * 60 + workout.time.seconds <= stat.timer
);
export const getWorkoutTitle = createSelector(
  getWorkout,
  getSet,
  (workout, set) => {
    switch (workout.type) {
      case "free":
        return "∞";
      case "reps":
        return workout.reps;
      case "time":
        const time =
          workout.time.minutes * 60 + workout.time.seconds - set.stat.timer;
        return `${Math.floor(time / 60)}:${(time % 60)
          .toString()
          .padStart(2, "0")}`;
    }
  }
);
export const getWorkoutProgress = createSelector(
  getWorkout,
  getSet,
  (workout, set) => {
    switch (workout.type) {
      case "reps":
        return (set.repIndex / workout.reps) * 100;
      case "time":
        return (
          (set.stat.timer /
            (workout.time.minutes * 60 + workout.time.seconds)) *
          100
        );
      default:
        return 0;
    }
  }
);
export const getRelativeStat = createSelector(
  getWorkoutReps,
  getSet,
  (reps, set) => {
    return +((set.stat.correct / reps) * 100).toFixed();
  }
);
export const getCountingRate = createSelector(getSetStat, (setStat) => {
  return +((setStat.correct * 60) / setStat.timer).toFixed();
});
export const getCurrentRepIndex = createSelector(getSet, (set) => {
  return set.repIndex;
});
export const getCurrentRep = createSelector(getSet, (set) => {
  return set.rep;
});
export const getRepSecondFactor = (state: AppState) => state.workout.set?.rep.secondFactor;

export const {
  setInputMode,
  setCheckMode,
  setMinutes,
  setSeconds,
  setReps,
  setType,
  changePlan,
  startSet,
  finishSet,
  nextRep,
  pushAnswer,
  tickTimer,
  startTutorial,
  finishTutorial,
} = WorkoutSlice.actions;
export default WorkoutSlice.reducer;

function createRep(plan: Plan = FLEX_WORKOUT_PLAN) {
  const [exerciseName, firstFactor] = getFirstFactor(plan);
  const secondFactor = getSecondFactor(exerciseName, plan);
  const complexity = plan[exerciseName] || plan[EXERCISES.N];

  return {
    exerciseName,
    firstFactor,
    secondFactor,
    complexity,
  };
}

function getFirstFactor(plan: Plan): [ExerciseName, number] {
  const activeExercises = Object.keys(plan) as Array<ExerciseName>;
  const index = getRandom(0, activeExercises.length - 1);

  return activeExercises[index] === EXERCISES.N || !activeExercises[index]
    ? [EXERCISES.N, getFactor(plan[EXERCISES.N], true)]
    : [activeExercises[index], +activeExercises[index]];
}

function getSecondFactor(exerciseName: ExerciseName, plan: Plan) {
  return EXERCISES[exerciseName]
    ? getFactor(plan[exerciseName], false)
    : getFactor(plan.N, false);
}

function getFactor(complexity: Complexity, isBase: boolean): number {
  switch (complexity) {
    case COMPLEXITY.EASY:
      return isBase ? getRandom(13, 99) : getRandom(13, 99);
    case COMPLEXITY.MEDIUM:
      return isBase ? getRandom(100, 999) : getRandom(100, 9999);
    case COMPLEXITY.HARD:
    default:
      return isBase ? getRandom(13, 999) : getRandom(13, 9999);
  }
}

export function getRandom(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
}
