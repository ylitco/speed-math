import { TDifficulties } from 'src/state/types'; // @todo rename
import { IEventMetaObject } from 'src/types';

export interface IKeyboardProps {
  complexity: TDifficulties; // @todo rename
  onCheck: () => void;
  onClick: (e: IEventMetaObject<number | null>) => void;
  answer: number | null;
}
