import { FC } from 'react';
import { VIEW } from 'src/views/constants';

export type VIEWS = typeof VIEW[keyof typeof VIEW];

export type TViewSettings = {
  [key in VIEWS]: IViewSetting;
};

export interface IViewSetting {
  action: IAction | null;
}

export interface IAction {
  Icon: FC;
  link: string;
}
