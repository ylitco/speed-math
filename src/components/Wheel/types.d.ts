import { HTMLAttributes, ReactElement } from 'react';
import { IEventMetaObject } from 'src/types';

export interface IWheelProps extends HTMLAttributes<ReactElement>{
  options: Record<string, string>;
  value: string;
  onSelect: (e: IEventMetaObject<string>) => void;
}
