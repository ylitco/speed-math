export interface IEventMetaObject<T> {
  value: T;
  name?: string;
  index?: number;
  errors?: TErrors | TErrorsMap;
  meta?: Record<string, any>;
}
