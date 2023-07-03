import { HTMLAttributes } from "react";
import { IEventMetaObject } from "src/types";

export interface IKeyboardProps
  extends Pick<HTMLAttributes<HTMLDivElement>, className> {
  onClick: (e: IEventMetaObject<number>) => void;
}
