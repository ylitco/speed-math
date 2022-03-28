import { ReactNode, MouseEvent, HTMLAttributes } from 'react';

export const enum BUTTON_TYPE {
  CIRCLE = 'circle',
  SQUARE = 'square',
  LIMPID = 'limpid',
}

export interface IButtonProps extends HTMLAttributes<HTMLElement>{
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: BUTTON_TYPE;
  name?: string;
}
