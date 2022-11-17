import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { createSlot, createTwoDigitSlot, STEP_RESULT } from './const';

export const STEP_KEEP_IN_MIND = 'step-keep-in-mind';
export const TENS = 'tens';

export function addSibling(this: CalcPresenter) {
  console.log(`Добавляем соседа: ${this.inAttention} + ${this.sibling} = ${this.inAttention + this.sibling}`);
  this.inAttention += this.sibling;

  const [focusedDigitElem] = this.stepResult;
  const rightSiblingElem = this.stepInstructionsArea.querySelector<HTMLElement>('#right-sibling')!;

  const plusElem = createSlot({ symbol: '+', slotId: 'plus', slotStyles: { padding: '0 10px' } });

  focusedDigitElem.insertAdjacentElement('afterend', plusElem);

  const centerPosition = this.getElementPosition(plusElem);
  const focusedDigitStartPosition = this.getElementPosition(focusedDigitElem);
  const rightSiblingStartPosition = this.getElementPosition(rightSiblingElem);
  const focusedDigitRelativeEndPosition = this.getDistanceBetweenPoints(centerPosition, focusedDigitStartPosition);
  const rightSiblingRelativeEndPosition = this.getDistanceBetweenPoints(centerPosition, rightSiblingStartPosition);

  const tl = gsap.timeline({ callbackScope: this, onComplete: showResult });

  tl.addLabel('0')
    .from(plusElem, { width: 0, opacity: 0, yPercent: 100, paddingLeft: 0, paddingRight: 0 }, '0')
    .addLabel('1')
    .to(focusedDigitElem, { opacity: 0, x: focusedDigitRelativeEndPosition.x, y: focusedDigitRelativeEndPosition.y, onComplete: () => focusedDigitElem.remove() }, '1')
    .to(plusElem, { opacity: 0, onComplete: () => plusElem.remove() }, '1')
    .to(rightSiblingElem, { opacity: 0, x: rightSiblingRelativeEndPosition.x, y: rightSiblingRelativeEndPosition.y, onComplete: () => rightSiblingElem.remove() }, '1');

  this.tl.add(tl);
}

function showResult(this: CalcPresenter) {
  const isFromTwoDigits = this.inAttention > 9;
  const stepResult = isFromTwoDigits ?
    createTwoDigitSlot({ number: this.inAttention, slotId: STEP_RESULT }) :
    createSlot({ symbol: this.inAttention, slotId: STEP_RESULT });

  this.stepInstructionsArea.insertAdjacentElement('afterbegin', stepResult);

  const tl = gsap.timeline();

  tl.from(`#${STEP_RESULT}`, { opacity: 0 });

  this.tl.add(tl);
}
