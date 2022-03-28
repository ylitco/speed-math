import { HTMLAttributes, ReactElement } from 'react';
import { IEventMetaObject } from 'src/types';

// @todo wheel value type should rely on actual props value structure [TS]
export type TWheelValue = string | number;

export interface IWheelProps extends HTMLAttributes<ReactElement>{
  options: Record<string, TWheelValue>;
  value: TWheelValue;
  onSelect: (e: IEventMetaObject<TWheelValue>) => void;
}
