export interface IBaseWorkout {
  title: string;
  progress?: number;
  onExplain?: () => void;
  onCheckStart?: () => void;
  onCheckFinish?: () => void;
}
