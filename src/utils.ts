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
