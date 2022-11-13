import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';
import { RIGHT_ZERO } from './const';
import styles from '../../Explanation.module.scss';

/**
 * Предыдущее состояние:
 *  - В секции множителя существует число с одной цифрой в фокусе
 *
 *  Анимация:
 *  - Цифра результата вычислений шага из секции инструкций смещается в секцию результата
 *  - Цифры результатов вычислений предыдущих шагов, смещаются на новые позиции
 */

export function focusOnSibling(this: CalcPresenter) {
  const isSiblingExist = this.secondFactor[this.currentDigitIndex + 1] !== undefined;

  if (isSiblingExist) {
    const rightDigitSlot = this.getRightSibling();

    gsap.to(rightDigitSlot, { opacity: 0.6 });
    console.log(`Дополнительно фокусируемся на соседе - ${this.sibling}`);
    return;
  }

  const rightDigitSlot = this.canvas.querySelector(RIGHT_ZERO.selector) as HTMLElement;
  const tl = gsap.timeline();

  tl.fromTo(
    rightDigitSlot,
    {
      xPercent: 100,
      opacity: 0,
    },
    {
      xPercent: 0,
      opacity: .6,
      onComplete: () => {
        const rightDigitElem = rightDigitSlot.querySelector<HTMLElement>(`.${styles.digit}`)!;
        rightDigitElem.classList.remove(styles.secondary);
        rightDigitElem.classList.add(styles.sibling);
      },
    },
  );
  console.log(`Справа представляем ${this.sibling} и фокусируемся на нём`);

  this.tl.add(tl);
}