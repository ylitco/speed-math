import CalcPresenter from '../CalcPresenter';
import { LEFT_ZERO } from './const';
import styles from '../../Explanation.module.scss';

export function focusOnDigit(this: CalcPresenter) {
  const digitElems = this.factorArea.querySelectorAll<HTMLElement>('#number>div');
  const leftZeroSlot = this.factorArea.querySelector<HTMLElement>(LEFT_ZERO.selector)!;
  const focusedDigit = this.currentDigitIndex < 0 ? leftZeroSlot : digitElems[this.currentDigitIndex];

  if (this.currentDigitIndex < 0) {
    this.tl.fromTo(leftZeroSlot, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 })
      .to(digitElems, { opacity: .25, onComplete() {
        const leftZeroDigit = leftZeroSlot.querySelector<HTMLElement>(`.${styles.digit}`)!;

        leftZeroDigit.classList.remove(styles.secondary);
      }});
  } else {
    this.tl.to(digitElems, {opacity: .25})
      .to(focusedDigit, {opacity: 1})
  }
}