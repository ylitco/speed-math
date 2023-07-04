import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { createSlot } from './const';
import { showResult } from './showStepResult';
import styles from '../../Tutorial.module.scss';

export function subtractFromNine(this: CalcPresenter) {
  console.debug(`Вычитаем ${this.inAttention} из 9: 9 - ${this.inAttention} = ${9 - this.inAttention}`);
  this.inAttention = 9 - this.inAttention;

  const [stepResultSlot] = this.stepResult;
  const nineSlot = createSlot({
    symbol: 9,
    slotId: 'nine',
    digitClass: styles.secondary,
    slotStyles: { paddingRight: '10px' },
  });
  const minusSlot = createSlot({
    symbol: '-',
    slotId: 'minus',
    slotStyles: { padding: '0 10px' },
  });

  this.stepInstructionsArea.insertAdjacentElement('afterbegin', minusSlot);
  this.stepInstructionsArea.insertAdjacentElement('afterbegin', nineSlot);

  const tl = gsap.timeline({
    callbackScope: this,
    onComplete: showResult,
  });

  tl.to(stepResultSlot, { paddingLeft: 10 })
    .from(nineSlot, { width: 0, opacity: 0, padding: 0 }, 0)
    .from(minusSlot, { width: 0, opacity: 0, padding: 0, yPercent: -100 })
    .addLabel('1')
    .to(nineSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => nineSlot.remove() })
    .to(minusSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => minusSlot.remove() }, '1')
    .to(stepResultSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => stepResultSlot.remove() }, '1');

  this.tl.add(tl);
}
