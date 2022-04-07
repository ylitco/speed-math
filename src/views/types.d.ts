import { FC } from 'react';
import { VIEW } from 'src/views/constants';

export type VIEWS = typeof VIEW[keyof typeof VIEW];

export interface IView {
  current: string | null;
  previous: string | null;
}

export interface IAction {
  Icon: FC;
  link: string;
}
