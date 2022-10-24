import { HTMLAttributes, ReactElement } from 'react';
import { IEventMetaObject } from 'src/types';

export interface IWheelProps<T> extends HTMLAttributes<ReactElement> {
  options: Record<T, string>;
  value: T;
  onSelect: (e: IEventMetaObject<T>) => void;
  scale?: number;
  size: 'L' | 'M' | 'S';
  selectType?: 'auto' | 'click';
}
