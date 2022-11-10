import CalcPresenter from '../CalcPresenter';
import ReactDOM from "react-dom";
import { gsap } from "gsap";
import styles from '../../Explanation.module.scss';
import {Digit} from "../../Digit/Digit";
import digitStyles from "../../Digit/Digit.module.scss";
import React from "react";

export function calculate(this: CalcPresenter, [operator, number]: Array<string>) {
  if (!this.mainDigit) throw new Error();

  const result = eval(this.inAttention + operator + number).toString(); // eslint-disable-line no-eval
  console.info(`Вычисляем ${this.inAttention} ${operator} ${number} = ${result}`);

  const firstFactor = this.inAttention.toString();

  const EXPRESSION_ELEM_ID = 'do-calculation';
  const FIRST_FACTOR_ELEM_ID = 'first-factor';
  const OPERATOR_ELEM_ID = 'operator';
  const SECOND_FACTOR_ELEM_ID = 'second-factor';
  const RESULT_ID = 'result';

  ReactDOM.unmountComponentAtNode(this.stepInstructionsArea);
  ReactDOM.render(
    <div id={EXPRESSION_ELEM_ID} className={styles.tenMinusDigit}>
      {firstFactor.length === 2 && (
        <div id={FIRST_FACTOR_ELEM_ID} className={styles.ten}>
          <Digit className={digitStyles.focused}>{firstFactor[0]}</Digit>
          <Digit className={digitStyles.focused}>{firstFactor[1]}</Digit>
        </div>
      )}
      {firstFactor.length === 1 && (
        <Digit id={FIRST_FACTOR_ELEM_ID} className={digitStyles.focused}>{firstFactor}</Digit>
      )}
      <Digit id={OPERATOR_ELEM_ID} className={digitStyles.focused}>{operator}</Digit>
      <Digit id={SECOND_FACTOR_ELEM_ID} className={digitStyles.brained}>{number}</Digit>
    </div>,
    this.stepInstructionsArea,
  );

  const firstFactorElem = this.stepInstructionsArea.querySelector(`#${FIRST_FACTOR_ELEM_ID}`)!;
  const operatorElem = this.clone(this.stepInstructionsArea.querySelector(`#${OPERATOR_ELEM_ID}`)!);
  const secondFactorElem = this.clone(this.stepInstructionsArea.querySelector(`#${SECOND_FACTOR_ELEM_ID}`)!);

  const mainOperandPosition = this.getElementPosition(firstFactorElem);

  ReactDOM.unmountComponentAtNode(this.stepInstructionsArea);

  const tl = gsap.timeline();

  const CALCULATION_LABEL = 'calculation';

  tl.to(this.mainDigit, { left: mainOperandPosition.x, top: mainOperandPosition.y })
    .fromTo(secondFactorElem, { xPercent: 100, opacity: 0 }, { xPercent: 0, opacity: 1 }, 0)
    .from(operatorElem, { yPercent: -100, opacity: 0 })
    .addLabel(CALCULATION_LABEL);

  ReactDOM.render(
    result.length === 2 ? (
      <div id={RESULT_ID} className={styles.tenMinusDigitResult}>
        <Digit className={digitStyles.focused}>{result[0]}</Digit>
        <Digit className={digitStyles.focused}>{result[1]}</Digit>
      </div>
    ) : (
      <Digit id={RESULT_ID} className={digitStyles.focused}>{result}</Digit>
    ),
    this.stepInstructionsArea,
  );

  const resultElem = this.stepInstructionsArea.querySelector<HTMLElement>('#' + RESULT_ID)!;
  const centerPosition = this.getElementPosition(resultElem);
  const resultCloneElem = this.clone(resultElem);

  ReactDOM.unmountComponentAtNode(this.stepInstructionsArea);

  tl.to(secondFactorElem, { left: centerPosition.x, opacity: 0 }, CALCULATION_LABEL)
    .to(operatorElem, { left: centerPosition.x, opacity: 0 }, CALCULATION_LABEL)
    .to(this.mainDigit, { left: centerPosition.x, opacity: 0 }, CALCULATION_LABEL)
    .from(resultCloneElem, {
      opacity: 0,
      onComplete: () => {
        secondFactorElem.remove();
        operatorElem.remove();
      },
    });

  this.mainDigit = resultCloneElem;

  this.inAttention = result;
}
