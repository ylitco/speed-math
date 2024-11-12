import { HTMLAttributes, ReactElement } from "react";
import { IEventMetaObject } from "src/types";

type WheelTitle = string | ReactElement | FC<HTMLAttributes<HTMLOrSVGElement>>;

export interface IWheelProps<T = any> extends HTMLAttributes<ReactElement> {
  options: Record<T, WheelTitle>;
  value: T;
  onSelect: (e: IEventMetaObject<T>) => void;
  scale?: number;
  size: "L" | "M" | "S";
  selectType?: "auto" | "click";
}
