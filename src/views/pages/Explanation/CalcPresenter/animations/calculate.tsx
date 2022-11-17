import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import styles from '../../Explanation.module.scss';
import { createSlot } from './const';
import { showResult } from './showStepResult';

export function calculate(this: CalcPresenter, [operator, number]: Array<string>) {
  const result = eval(this.inAttention + operator + number).toString(); // eslint-disable-line no-eval
  console.debug(`Вычисляем ${this.inAttention} ${operator} ${number} = ${result}`);
  this.inAttention = +result;

  const [stepResultSlot] = this.stepResult;
  const operatorSlot = createSlot({ symbol: operator, slotId: 'operator', slotStyles: { padding: '0 10px' } });
  const factorSlot = createSlot({ symbol: number, slotId: 'factor', slotStyles: { paddingLeft: '10px' }, digitClass: styles.secondary });

  this.stepInstructionsArea.insertAdjacentElement('beforeend', operatorSlot);
  this.stepInstructionsArea.insertAdjacentElement('beforeend', factorSlot);

  const tl = gsap.timeline({
    callbackScope: this,
    onComplete: showResult,
  });

  tl.to(stepResultSlot, { paddingRight: 10 })
    .from(factorSlot, { width: 0, opacity: 0, padding: 0 }, 0)
    .from(operatorSlot, { width: 0, opacity: 0, padding: 0, yPercent: -100 })
    .addLabel('1')
    .to(stepResultSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => stepResultSlot.remove() })
    .to(factorSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => factorSlot.remove() }, '1')
    .to(operatorSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => operatorSlot.remove() }, '1');

  this.tl.add(tl);
}
