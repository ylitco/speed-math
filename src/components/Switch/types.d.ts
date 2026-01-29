import { HTMLAttributes, ReactElement, ReactNode } from "react";

type SwitchValue = string;
type SwitchTitle = ReactNode;

export interface SwitchProps extends HTMLAttributes<ReactElement> {
  optionClassName?: string;
  options: Record<SwitchValue, SwitchTitle>;
  value: SwitchValue;
  onChange: (TSwitchValue) => void;
  label?: string;
}
