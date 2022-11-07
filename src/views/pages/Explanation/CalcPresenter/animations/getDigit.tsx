import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';

export function getDigit(this: CalcPresenter) {
  const digitElemId = this.currentDigitIndex < 0 ? '#left' : `#digit-${this.currentDigitIndex}`;
  const digitElem = this.canvas.querySelector<HTMLElement>(digitElemId);

  if (digitElem === null) throw new Error(`HTML element with ${digitElemId} id not found`);

  const clone = this._clone(digitElem);

  const destPoint = this._calcOffset(clone, this.stepInstructionsArea, 'afterbegin');

  // gsap.to(clone, { duration: .5, x: destPoint.left, y: destPoint.top });
  gsap.to(clone, { duration: .5, left: destPoint.left, top: destPoint.top });

  const msg = `Берём ${this.digit} во внимание`;

  this.inAttention = this.digit;
}
