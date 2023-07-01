import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import styles from '../../Explanation.module.scss';
import { createSlot, createTwoDigitSlot, STEP_RESULT } from './const';

export function addFromMind(this: CalcPresenter) {
  if (this.inMind) {
    console.log(`Добавляю цифру в уме - ${this.inAttention} + ${this.inMind} = ${this.inAttention + this.inMind}`);

    const [unitInMindSlot, unitInMindDigit] = this.unitInMind;
    const [stepResultSlot] = this.stepResult;

    const unitInMindStartPosition = this.getElementPosition(unitInMindSlot);
    const stepResultStartPosition = this.getElementPosition(stepResultSlot);

    Object.assign(unitInMindSlot.style, { position: 'unset', top: 'unset', left: 'unset' });

    this.stepInstructionsArea.insertAdjacentElement('beforeend', unitInMindSlot);

    const unitInMindEndPosition = this.getElementPosition(unitInMindSlot);
    const stepResultEndPosition = this.getElementPosition(stepResultSlot);

    const unitInMindRelativeStartPosition = this.getDistanceBetweenPoints(unitInMindStartPosition, unitInMindEndPosition);
    const stepResultRelativeStartPosition = this.getDistanceBetweenPoints(stepResultStartPosition, stepResultEndPosition);

    unitInMindDigit.classList.remove(styles.borderNone);

    const tl = gsap.timeline({ callbackScope: this, onComplete: calculate });

    tl
      .fromTo(
        unitInMindSlot,
        { x: unitInMindRelativeStartPosition.x, y: unitInMindRelativeStartPosition.y },
        { x: 0, y: 0, paddingLeft: 10 },
      )
      .to(this.brainIcon, { opacity: 0 }, 0)
      .to(unitInMindDigit, { fontSize: 48 }, 0)
      .fromTo(
        stepResultSlot,
        { x: stepResultRelativeStartPosition.x, y: stepResultRelativeStartPosition.y },
        { x: 0, y: 0, paddingRight: 10 },
        0,
      );

    this.inAttention = this.inAttention + this.inMind;
    this.inMind = null;
  } else {
    this.skip();
  }
}

function calculate(this: CalcPresenter) {
  const [stepResultSlot] = this.stepResult;
  const [unitInMindSlot] = this.unitInMind;
  const plusElem = createSlot({
    symbol: '+',
    slotId: 'plus',
    slotStyles: {
      padding: '0 10px',
    },
  });

  stepResultSlot.insertAdjacentElement('afterend', plusElem);

  const tl = gsap.timeline({
    callbackScope: this,
    onComplete: showResult,
    defaults: {
      width: 0,
      opacity: 0,
      padding: 0,
    },
  });

  tl.from(plusElem, { yPercent: 100 })
    .addLabel('1')
    .to(plusElem, { onComplete: () => plusElem.remove() }, '1')
    .to(stepResultSlot, { onComplete: () => stepResultSlot.remove() }, '1')
    .to(unitInMindSlot, { onComplete: () => unitInMindSlot.remove() }, '1');

  this.tl.add(tl);
}

function showResult(this: CalcPresenter) {
  const result = this.inAttention + this.inMind!;
  const isFromTwoDigits = result > 9;
  const tl = gsap.timeline();

  const stepResult = isFromTwoDigits ?
    createTwoDigitSlot({ number: result, slotId: STEP_RESULT }) :
    createSlot({ symbol: result, slotId: STEP_RESULT });

  this.stepInstructionsArea.insertAdjacentElement('afterbegin', stepResult);

  tl.from('#step-result', { opacity: 0 });

  this.tl.add(tl);
}
