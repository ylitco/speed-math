import { HTMLAttributes, ReactElement, FC } from 'react';

type TSwitchValue = string;
type TSwitchTitle = string | ReactElement | FC<HTMLAttributes<HTMLOrSVGElement>>;

export interface ISwitchProps extends HTMLAttributes<ReactElement> {
  options: Record<TSwitchValue, TSwitchTitle>;
  value: TSwitchValue;
  onChange: (TSwitchValue) => void;
  label?: string;
}
