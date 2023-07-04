import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import {LEFT_ZERO, STEP_RESULT} from './const';
import styles from '../../Tutorial.module.scss';

export function getDigit(this: CalcPresenter) {
  const digitElemId = this.currentDigitIndex < 0 ? LEFT_ZERO.selector : `#digit-${this.currentDigitIndex}`;
  const digitElem = this.canvas.querySelector<HTMLElement>(digitElemId);

  if (digitElem === null) throw new Error(`HTML element with ${digitElemId} id not found`);

  const slot = document.createElement('div');
  slot.classList.add(styles.slot);
  slot.setAttribute('id', STEP_RESULT);
  const digit = document.createElement('div');
  digit.innerHTML = this.digit.toString();
  digit.dataset.content = this.digit.toString();
  digit.classList.add(styles.digit)
  slot.appendChild(digit);
  this.stepInstructionsArea.insertAdjacentElement('afterbegin', slot);

  const focusedDigitElem = this.stepInstructionsArea.querySelector<HTMLElement>(`#${STEP_RESULT}`)!;
  const distance = this.getDistanceBetweenElements(digitElem, focusedDigitElem);

  const tl = gsap.timeline();

  tl.from(focusedDigitElem, { x: distance.x, y: distance.y })

  this.mainDigit = focusedDigitElem;

  this.tl.add(tl);

  this.inAttention = this.digit;
}
