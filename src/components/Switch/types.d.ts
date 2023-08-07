import { HTMLAttributes, ReactElement, FC } from "react";

type SwitchValue = string;
type SwitchTitle =
  | string
  | ReactElement
  | FC<HTMLAttributes<HTMLOrSVGElement>>;

export interface SwitchProps extends HTMLAttributes<ReactElement> {
  optionClassName?: string;
  options: Record<SwitchValue, SwitchTitle>;
  value: SwitchValue;
  onChange: (TSwitchValue) => void;
  label?: string;
}
