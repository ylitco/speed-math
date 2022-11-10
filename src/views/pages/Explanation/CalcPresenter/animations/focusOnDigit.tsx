import CalcPresenter from '../CalcPresenter';
import digitStyles from '../../Digit/Digit.module.scss';

export function focusOnDigit(this: CalcPresenter) {
  const digitElems = this.factorArea.querySelectorAll<HTMLElement>('#number>div');
  const leftZero = this.factorArea.querySelector<HTMLElement>('#left-zero')!;
  const focusedDigit = this.currentDigitIndex < 0 ? leftZero : digitElems[this.currentDigitIndex];

  if (this.currentDigitIndex < 0) {
    this.tl.fromTo(leftZero, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 })
      .to(digitElems, { opacity: .25, onComplete() {
        leftZero.classList.remove(digitStyles.brained);
        leftZero.classList.add(digitStyles.focused);
      }});
  } else {
    this.tl.to(digitElems, {opacity: .25})
      .to(focusedDigit, {opacity: 1})
  }
}