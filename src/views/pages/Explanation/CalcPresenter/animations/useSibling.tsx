import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { STEP_RESULT } from './const';

export function useSibling(this: CalcPresenter) {
    console.log(`Забываем про ${this.inAttention} и дальше работаем с соседом ${this.sibling}`);
    this.inAttention = this.sibling;

    const [stepResultSlot] = this.stepResult;
    const [siblingTwinSlot, siblingTwinDigit] = this.siblingTwin;

    const tl = gsap.timeline();

    tl.to(stepResultSlot, { width: 0, opacity: 0, padding: 0, onComplete: () => stepResultSlot.remove() })
      .to(siblingTwinDigit, { opacity: 1, paddingLeft: 3, onComplete: () => siblingTwinSlot.setAttribute('id', STEP_RESULT) });

    this.tl.add(tl);
}
