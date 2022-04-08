import { IEventMetaObject } from 'src/types';
import { TDifficulties, TExercises } from 'src/state/types';
import { DIFFICULTIES, EXERCISES } from 'src/state/constants';

export function createEventMetaObject<T>(
  value: T,
  params?: Omit<IEventMetaObject<T>, 'value'>,
): IEventMetaObject<T> {
  const { name, index, errors, meta } = params || {};
  const mixName = name ? { name } : {};
  const mixIndex = index !== undefined ? { index } : {};
  const mixErrors = errors !== undefined ? { errors } : {};
  const mixMeta = meta ? { meta } : {};

  return {
    value,
    ...mixName,
    ...mixIndex,
    ...mixErrors,
    ...mixMeta,
  };
}

export function copy(object: Record<string, any>) {
  return JSON.parse(JSON.stringify(object));
}

export class WorkoutNotStartedError extends Error {
  constructor(props: string) {
    super(props);

    this.name = 'WorkoutNotStarted';
  }
}

export const getUrl = (view: string): string => `/${view}`;


export function getFirstFactor(exercises: Record<TExercises, TDifficulties>): number {
  const activeExercises = Object.entries(exercises).filter(([, value]) => !!value).map(([key]) => key);
  const index = getRandom(0, activeExercises.length - 1);

  if (activeExercises[index] === EXERCISES.N) {
    return getFactor(exercises[EXERCISES.N], true);
  } else {
    return +activeExercises[index];
  }
}

export function getSecondFactor(firstFactor: number, exercises: Record<TExercises, TDifficulties>) {
  if (firstFactor > +EXERCISES[12]) {
    return getFactor(exercises.N, false);
  } else {
    return getFactor(exercises[`${firstFactor}` as TExercises], false);
  }
}

function getFactor (complexity: TDifficulties, isBase: boolean): number {
  switch (complexity) {
    case DIFFICULTIES.EASY:
      return isBase ? getRandom(13, 99) : getRandom(13, 99);
    case DIFFICULTIES.MEDIUM:
      return isBase ? getRandom(100, 999) : getRandom(100, 9999);
    case DIFFICULTIES.HARD:
      return isBase ? getRandom(13, 999) : getRandom(13, 9999);
  }

  return error('Unknown complexity');
}

export function getRandom(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
}

function error(message: string): never {
  throw new Error(message);
}
