import { ReactNode, MouseEvent } from 'react';

export const enum BUTTON_TYPE {
  CIRCLE = 'circle',
  SQUARE = 'square'
}

export interface IButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  type?: BUTTON_TYPE;
  name?: string;
}
