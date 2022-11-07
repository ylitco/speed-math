import CalcPresenter from '../CalcPresenter';
import styles from '../../Explanation.module.scss';

export function remember(this: CalcPresenter) {
  this.stepInstructionsArea.classList.remove(styles.hidden);
  this.mindArea.classList.remove(styles.hidden);
  this.resultArea.classList.remove(styles.hidden);
}