import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { addSibling } from './addSibling';
import { createSlot } from './const';
import styles from '../../Tutorial.module.scss';

export async function addHalfOfSibling(this: CalcPresenter) {
    console.log(`Прибавляем половину соседа: ${this.inAttention} + ${Math.floor(this.sibling / 2)} = ${this.inAttention + Math.floor(this.sibling / 2)}`);
    const result = Math.floor(this.sibling / 2);

    const [stepResultSlot] = this.stepResult;
    const [siblingTwinSlot] = this.siblingTwin;
    const divisionSlot = createSlot({ symbol: '/', slotId: 'division' });
    const twoSlot = createSlot({ symbol: 2, slotId: 'two', digitClass: styles.secondary });

    this.stepInstructionsArea.insertAdjacentElement('beforeend', divisionSlot);
    this.stepInstructionsArea.insertAdjacentElement('beforeend', twoSlot);

    console.debug(stepResultSlot, siblingTwinSlot, divisionSlot, twoSlot);

    const tl = gsap.timeline();

    await tl.from(divisionSlot, { width: 0, opacity: 0, padding: 0 })
      .from(twoSlot, { width: 0, opacity: 0, padding: 0 }, 0)
      .addLabel('1')
      .to(siblingTwinSlot, { opacity: 0 })
      .to(divisionSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => divisionSlot.remove() }, '1')
      .to(twoSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => twoSlot.remove() }, '1');

    await showResult.bind(this)();

    this.siblingCalcRes = result;

    await addSibling.bind(this)();

    this.siblingCalcRes = null;

    this.tl.add(tl);
}

function showResult(this: CalcPresenter) {
    const [siblingTwinSlot, siblingTwinDigit] = this.siblingTwin;
    const result = Math.floor(this.sibling / 2).toString();

    siblingTwinDigit.innerText = result;
    siblingTwinDigit.dataset.content = result;

    const tl = gsap.timeline();

    tl.to(siblingTwinSlot, { opacity: 1 });

    this.tl.add(tl);

}