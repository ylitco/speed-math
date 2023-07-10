import { Touch } from 'react';
import { IEventMetaObject } from 'src/types';

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

export const getUrl = (view: string): string => `/${view}`;

export function getRandom(min: number, max: number) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);

  return Math.round(rand);
}

export function copyTouch({ identifier, pageX, pageY }: Touch) {
  return { identifier, pageX, pageY };
}
