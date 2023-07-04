import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { STEP_KEEP_IN_MIND, TENS } from './addSibling';
import {createMind} from "./const";
import styles from '../../Tutorial.module.scss';

export function keepInMind(this: CalcPresenter) {
  if (this.inAttention > 9) {
    const tensElem = this.stepInstructionsArea.querySelector<HTMLElement>(`#${TENS}`)!;
    const removeTens = () => tensElem.remove();
    const tensElemPosition = this.getElementPosition(tensElem);
    const tensTwin = this.cloneTo(tensElem, 'beforeend', this.leftSibling, STEP_KEEP_IN_MIND) as HTMLElement;
    tensElem.style.opacity = '0';
    const tensTwinDigit = tensTwin.querySelector<HTMLElement>(`.${styles.digit}`)!;
    // tensTwinDigit.classList.add(styles.secondary);
    Object.assign(tensTwin.style, {
      position: 'absolute',
      top: '-91%',
      left: '-23%',
    });
    tensTwinDigit.classList.add(styles.borderNone);
    const tensTwinPosition = this.getElementPosition(tensTwin);
    const tensTwinRelativeStartPosition = this.getDistanceBetweenPoints(tensElemPosition, tensTwinPosition);
    const mindElem = createMind();

    this.leftSibling.insertAdjacentElement('beforeend', mindElem);

    const tl = gsap.timeline()
    tl.to(tensElem, { opacity: 0, width: 0, padding: 0, onComplete: () => {
        const slot = tensElem.parentElement!;
        removeTens();
        slot.classList.remove(styles.twoDigitNumber);
        // slot.classList.add(styles.slot);
      }})
      .from(mindElem, { opacity: 0 }, 0)
      .to(tensTwinDigit, { fontSize: '16px', color: '#d9ddee' }, 0)
      .from(tensTwin, { x: tensTwinRelativeStartPosition.x, y: tensTwinRelativeStartPosition.y }, 0);

    const number = this.inAttention.toString().split('') as Array<string>;
    this.inMind = +(number.shift() as string);
    this.inAttention = +number.join();
    console.log(`Запоминаю ${this.inMind}`)
    this.tl.add(tl);
  } else {
    this.skip();
  }
}
