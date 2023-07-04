import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import styles from '../../Tutorial.module.scss';
import { createSlot, createTwoDigitSlot } from './const';
import { showResult } from './showStepResult';

export function subtractFromTen(this: CalcPresenter) {
  console.debug(`Вычитаем ${this.inAttention} из 10: 10 - ${this.inAttention} = ${10 - this.inAttention}`);
  this.inAttention = 10 - this.inAttention;

  const [focusedTwinSlot] = this.stepResult;
  const tenElemSlot = createTwoDigitSlot({
    number: 10,
    slotId: 'ten',
    slotStyles: {
      paddingRight: '10px',
    },
    digitClass: styles.secondary,
  });
  const minusElem = createSlot({
    symbol: '-',
    slotId: 'minus',
    slotStyles: {
      padding: '0 10px',
    },
  });

  this.stepInstructionsArea.insertAdjacentElement('afterbegin', minusElem);
  this.stepInstructionsArea.insertAdjacentElement('afterbegin', tenElemSlot);

  const tl = gsap.timeline({
    callbackScope: this,
    onComplete: showResult,
  });

  tl.from(tenElemSlot, { width: 0, opacity: 0, padding: 0 })
    .to(focusedTwinSlot, { paddingLeft: 10 }, 0)
    .from(minusElem, { width: 0, opacity: 0, padding: 0, yPercent: -100 })
    .addLabel('1')
    .to(tenElemSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => tenElemSlot.remove() }, '1')
    .to(minusElem, { width: 0, opacity: 0, padding: 0, onComplete: () => minusElem.remove() }, '1')
    .to(focusedTwinSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => focusedTwinSlot.remove() }, '1');

  this.tl.add(tl);
}
