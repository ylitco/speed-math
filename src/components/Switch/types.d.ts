import { HTMLAttributes, ReactElement } from 'react';

type TSwitchValue = string;
type TSwitchTitle = string | ReactElement;

export interface ISwitchProps extends HTMLAttributes<ReactElement> {
  options: Record<TSwitchValue, TSwitchTitle>;
  value: TSwitchValue;
  onChange: (TSwitchValue) => void;
  label?: string;
}
