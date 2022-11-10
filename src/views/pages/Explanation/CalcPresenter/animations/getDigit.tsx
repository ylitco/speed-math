import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import ReactDOM from "react-dom";
import {Digit} from "../../Digit/Digit";
import digitStyles from '../../Digit/Digit.module.scss';

export function getDigit(this: CalcPresenter) {
  const digitElemId = this.currentDigitIndex < 0 ? '#left' : `#digit-${this.currentDigitIndex}`;
  const digitElem = this.canvas.querySelector<HTMLElement>(digitElemId);

  if (digitElem === null) throw new Error(`HTML element with ${digitElemId} id not found`);

  ReactDOM.render(
    <div id="focused-digit">
      <Digit className={digitStyles.focused}>{this.digit}</Digit>
    </div>,
    this.stepInstructionsArea,
  )

  const focusedDigitElem = this.stepInstructionsArea.querySelector<HTMLElement>('#focused-digit')!;
  const distance = this.getDistanceBetweenElements(digitElem, focusedDigitElem);

  const tl = gsap.timeline();

  tl.from(focusedDigitElem, { x: distance.x, y: distance.y })

  this.mainDigit = focusedDigitElem;

  this.tl.add(tl);

  this.inAttention = this.digit;
}
