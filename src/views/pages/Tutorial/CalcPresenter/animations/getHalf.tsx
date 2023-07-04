import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { showResult } from './showStepResult';
import { createSlot } from './const';
import styles from '../../Tutorial.module.scss'

export async function getHalf(this: CalcPresenter) {
  console.log(`Находим половину от ${this.inAttention}: ${Math.floor(this.inAttention / 2)}`)
  this.inAttention = Math.floor(this.inAttention / 2);

  const [stepResultSlot] = this.stepResult;
  const divisionSlot = createSlot({ symbol: '/', slotId: 'division', slotStyles: { padding: '0 10px' } });
  const twoSlot = createSlot({ symbol: 2, slotId: 'two', digitClass: styles.secondary, slotStyles: { paddingLeft: '10px' } });

  this.stepInstructionsArea.insertAdjacentElement('beforeend', divisionSlot);
  this.stepInstructionsArea.insertAdjacentElement('beforeend', twoSlot);

  const tl = gsap.timeline({ callbackScope: this, onComplete: showResult });

  tl.to(stepResultSlot, { paddingRight: 10 })
    .from(divisionSlot, { width: 0, opacity: 0, padding: 0 }, 0)
    .from(twoSlot, { width: 0, opacity: 0, padding: 0 }, 0)
    .addLabel('1')
    .to(stepResultSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => stepResultSlot.remove() })
    .to(divisionSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => divisionSlot.remove() }, '1')
    .to(twoSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => twoSlot.remove() }, '1');

  this.tl.add(tl);
}
