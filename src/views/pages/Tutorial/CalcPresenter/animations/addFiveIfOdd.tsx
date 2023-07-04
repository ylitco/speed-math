import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { showResult } from './showStepResult';
import styles from '../../Tutorial.module.scss';

export function addFiveIfOdd(this: CalcPresenter) {
  if (this.parity === 'even') {
    this.skip();

    return;
  }

  console.debug(`Нечётное число, прибавляем 5: ${this.inAttention} + 5 = ${this.inAttention + 5}`)
  this.inAttention += 5;

  const [stepResultSlot] = this.stepResult;
  const [parityPlusSlot, parityPlusSymbol] = this.parityPlus;
  const [parityFiveSlot, parityFiveDigit] = this.parityFive;

  const stepResultStartPosition = this.getElementPosition(stepResultSlot);
  const parityPlusStartPosition = this.getElementPosition(parityPlusSlot);
  const parityFiveStartPosition = this.getElementPosition(parityFiveSlot);

  this.stepInstructionsArea.insertAdjacentElement('beforeend', parityPlusSlot);
  this.stepInstructionsArea.insertAdjacentElement('beforeend', parityFiveSlot);

  const stepResultEndPosition = this.getElementPosition(stepResultSlot);
  const parityPlusEndPosition = this.getElementPosition(parityPlusSlot);
  const parityFiveEndPosition = this.getElementPosition(parityFiveSlot);

  const stepResultRelativeStartPosition = this.getDistanceBetweenPoints(stepResultStartPosition, stepResultEndPosition);
  const parityPlusRelativeStartPosition = this.getDistanceBetweenPoints(parityPlusStartPosition, parityPlusEndPosition);
  const parityFiveRelativeStartPosition = this.getDistanceBetweenPoints(parityFiveStartPosition, parityFiveEndPosition);

  parityPlusSymbol.classList.remove(styles.s);
  parityFiveDigit.classList.remove(styles.s);

  const tl = gsap.timeline({
    callbackScope: this,
    onComplete: showResult,
  });

  tl.fromTo(stepResultSlot, { x: stepResultRelativeStartPosition.x, y: stepResultRelativeStartPosition.y, paddingRight: 0 }, { x: 0, y: 0, paddingRight: 10 }, 0)
    .fromTo(parityPlusSlot, { x: parityPlusRelativeStartPosition.x, y: parityPlusRelativeStartPosition.y, paddingLeft: 0, paddingRight: 0 }, { x: 0, y: 0, paddingLeft: 10, paddingRight: 10 }, 0)
    .to(parityPlusSymbol, { color: '#7920d0' }, 0)
    .fromTo(parityFiveSlot, { x: parityFiveRelativeStartPosition.x, y: parityFiveRelativeStartPosition.y, paddingLeft: 0}, { x: 0, y: 0, paddingLeft: 10 }, 0)
    .addLabel('1')
    .to(stepResultSlot, { width: 0, opacity: 0, paddingRight: 0, onComplete: () => stepResultSlot.remove() }, '1')
    .to(parityPlusSlot, { width: 0, opacity: 0, paddingLeft: 0, paddingRight: 0, onComplete: () => parityPlusSlot.remove() }, '1')
    .to(parityFiveSlot, { width: 0, opacity: 0, paddingLeft: 0, onComplete: () => parityFiveSlot.remove() }, '1');

  this.tl.add(tl);
}
