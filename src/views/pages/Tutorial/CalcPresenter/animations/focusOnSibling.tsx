import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';

/**
 * Предыдущее состояние:
 *  - В секции множителя существует число с одной цифрой в фокусе
 *
 *  Анимация:
 *  - Цифра результата вычислений шага из секции инструкций смещается в секцию результата
 *  - Цифры результатов вычислений предыдущих шагов, смещаются на новые позиции
 */

export function focusOnSibling(this: CalcPresenter) {
  const [, rightSiblingDigit] = this.rightSibling;
  const tl = gsap.timeline();

  if (!this.isRightSiblingExist) tl.fromTo(rightSiblingDigit, { xPercent: 100 }, { xPercent: 0 });

  tl.to(rightSiblingDigit, { opacity: .6 }, 0);

  if (!this.isRightSiblingExist) tl.to(rightSiblingDigit, { color: '#7920d0' });

  this.tl.add(tl);
}