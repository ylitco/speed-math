import React from 'react';
import ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import { Digit } from '../../Digit/Digit';
import CalcPresenter from '../CalcPresenter';
import styles from '../../Explanation.module.scss';
import digitStyles from '../../Digit/Digit.module.scss';

const EXPRESSION_ID = 'expression';
const TEN_ID = 'ten';
const MINUS_ID = 'minus';
const PREV_RESULT_ID = 'pref-result';
const RESULT_ID = 'result';

export function subtractFromTen(this: CalcPresenter) {
  if (!this.mainDigit) throw new Error();

  this.mainDigit = this.clone(this.mainDigit);

  const tl = gsap.timeline();

  console.info(`Вычитаем ${this.inAttention} из 10: 10 - ${this.inAttention} = ${10 - this.inAttention}`);

  ReactDOM.unmountComponentAtNode(this.stepInstructionsArea);

  ReactDOM.render(
    <div id={EXPRESSION_ID} className={styles.tenMinusDigit}>
      <div id={TEN_ID} className={styles.ten}>
        <Digit className={digitStyles.brained}>1</Digit>
        <Digit className={digitStyles.brained}>0</Digit>
      </div>
      <Digit id={MINUS_ID} className={digitStyles.focused}>-</Digit>
      <Digit id={PREV_RESULT_ID} className={digitStyles.focused}>n</Digit>
    </div>,
    this.stepInstructionsArea,
  );

  const focusedDigitEndPosition = this.getElementPosition(this.stepInstructionsArea.querySelector('#' + PREV_RESULT_ID)!);
  const tenElem = this.clone(this.stepInstructionsArea.querySelector('#' + TEN_ID)!);
  const minusElem = this.clone(this.stepInstructionsArea.querySelector('#' + MINUS_ID)!);

  ReactDOM.unmountComponentAtNode(this.stepInstructionsArea);

  const CALCULATION_LABEL = 'calculation';

  tl.fromTo(tenElem, { xPercent: -100, opacity: 0 }, { xPercent: 0, opacity: 1 })
    .to(this.mainDigit, { left: focusedDigitEndPosition.x, top: focusedDigitEndPosition.y }, 0)
    .from(minusElem, { yPercent: 100, opacity: 0 })
    .addLabel(CALCULATION_LABEL);

  ReactDOM.render(
    this.inAttention === 0 ? (
     <div id={RESULT_ID} className={styles.tenMinusDigitResult}>
       <Digit className={digitStyles.focused}>1</Digit>
       <Digit className={digitStyles.focused}>0</Digit>
     </div>
    ) : (
      <Digit id={RESULT_ID} className={digitStyles.focused}>{10 - this.inAttention}</Digit>
    ),
    this.stepInstructionsArea,
  );

  const resultElem = this.stepInstructionsArea.querySelector<HTMLElement>('#' + RESULT_ID)!;
  const centerPosition = this.getElementPosition(resultElem);
  const resultCloneElem = this.clone(resultElem);

  ReactDOM.unmountComponentAtNode(this.stepInstructionsArea);

  tl.to(tenElem, { left: centerPosition.x, opacity: 0 }, CALCULATION_LABEL)
    .to(minusElem, { left: centerPosition.x, opacity: 0 }, CALCULATION_LABEL)
    .to(this.mainDigit, { left: centerPosition.x, opacity: 0 }, CALCULATION_LABEL)
    .from(resultCloneElem, {
      opacity: 0,
      onComplete: () => {
        tenElem.remove();
        minusElem.remove();
      },
    });

  this.mainDigit = resultCloneElem;

  this.inAttention = 10 - this.inAttention;

  this.tl.add(tl);
}
