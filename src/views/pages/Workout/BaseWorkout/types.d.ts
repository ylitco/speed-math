export interface IBaseWorkout {
  title: string;
  onExplain?: () => void;
  onCheckStart?: () => void;
  onCheckFinish?: () => void;
}
