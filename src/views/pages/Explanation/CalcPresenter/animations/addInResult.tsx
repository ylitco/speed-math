import { gsap } from 'gsap';
import CalcPresenter from '../CalcPresenter';

export const STEP_RESULT = 'step-result';

/**
 * Предыдущее состояние:
 *  - Существует цифра результата в секции описания инструкций вычислений `instructions`
 *  - Могут существовать цифры результатов предыдущих вычислений
 *
 *  Анимация:
 *  - Цифра результата вычислений шага из секции инструкций смещается в секцию результата
 *  - Цифры результатов вычислений предыдущих шагов, смещаются на новые позиции
 */
export function addInResult(this: CalcPresenter) {
  console.info(`Добавляем в результат ${this.inAttention}`);

  this.answer.unshift(this.inAttention);
  this._inAttention = null;
  this.currentDigitIndex -= 1;

  const stepResultElem = this.stepInstructionsArea.querySelector<HTMLElement>(`#${STEP_RESULT}`)!;
  const { width } = stepResultElem.getBoundingClientRect();

  if (!stepResultElem) throw new Error('Цифра результата отсутствует в секции инструкций вычислений');

  const tl = gsap.timeline();

  const stepResultStartPosition = this.getElementPosition(stepResultElem);

  const slot = document.createElement('div');

  this.resultArea.insertAdjacentElement('afterbegin', slot);

  tl.to(
    slot,
    {
      width,
      onComplete: () => {
        slot.insertAdjacentElement('afterbegin', stepResultElem);

        const stepResultEndPosition = this.getElementPosition(stepResultElem);
        const { x, y } = this.getDistanceBetweenPoints(stepResultStartPosition, stepResultEndPosition);

        tl.from(stepResultElem, { x, y, onComplete: () => stepResultElem.removeAttribute('id') });
      },
    },
  );

  this.tl.add(tl);
}
