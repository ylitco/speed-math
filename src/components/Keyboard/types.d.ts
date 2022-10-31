import { TDifficulties } from 'src/state/types'; // @todo rename
import { IEventMetaObject } from 'src/types';
import { HTMLAttributes } from 'react';

export interface IKeyboardProps extends Pick<HTMLAttributes<HTMLDivElement>, className> {
  complexity: TDifficulties; // @todo rename
  onCheck: () => void;
  onClick: (e: IEventMetaObject<number | null>) => void;
  answer: number | null;
}
