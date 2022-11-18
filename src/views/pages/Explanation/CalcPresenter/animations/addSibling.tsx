import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { createSlot } from './const';
import { showResult } from './showStepResult';

export const STEP_KEEP_IN_MIND = 'step-keep-in-mind';
export const TENS = 'tens';

export function addSibling(this: CalcPresenter) {
  console.log(`Добавляем соседа: ${this.inAttention} + ${this.sibling} = ${this.inAttention + this.sibling}`);
  this.inAttention += this.siblingCalcRes === null ? this.sibling : this.siblingCalcRes;

  const [focusedDigitElem] = this.stepResult;
  const rightSiblingElem = this.stepInstructionsArea.querySelector<HTMLElement>('#right-sibling')!;

  const plusElem = createSlot({ symbol: '+', slotId: 'plus', slotStyles: { padding: '0 10px' } });

  focusedDigitElem.insertAdjacentElement('afterend', plusElem);

  const tl = gsap.timeline({ callbackScope: this, onComplete: showResult });

  const promise = tl.from(plusElem, { width: 0, opacity: 0, yPercent: 100, paddingLeft: 0, paddingRight: 0 })
    .addLabel('1')
    .to(focusedDigitElem, { opacity: 0, width: 0, padding: 0, onComplete: () => focusedDigitElem.remove() })
    .to(plusElem, { opacity: 0, width: 0, padding: 0, onComplete: () => plusElem.remove() }, '1')
    .to(rightSiblingElem, { opacity: 0, width: 0, padding: 0, onComplete: () => rightSiblingElem.remove() }, '1');

  this.tl.add(tl);

  return promise;
}
