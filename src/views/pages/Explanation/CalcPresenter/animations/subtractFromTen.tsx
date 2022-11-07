import React from 'react';
import ReactDOM from 'react-dom';
import cn from 'classnames';
import { gsap } from 'gsap';
import { Digit } from '../../Digit/Digit';
import CalcPresenter from '../CalcPresenter';
import styles from '../../Explanation.module.scss';
import digitStyles from '../../Digit/Digit.module.scss';

export function subtractFromTen(this: CalcPresenter) {
  if (typeof this._doAfter === 'function') this._doAfter();

  const msg = `Вычитаем ${this.inAttention} из 10: 10 - ${this.inAttention} = ${10 - this.inAttention}`;

  ReactDOM.render(
    <>
      <div id="ten" className={styles.ten}>
        <Digit className={digitStyles.brained}>1</Digit>
        <Digit className={digitStyles.brained}>0</Digit>
      </div>
      <Digit id="minus" className={cn(digitStyles.focused, styles.minus)}>-</Digit>
    </>,
    this.stepInstructionsArea,
  );

  const activeClone = this.canvas.querySelector('#active-clone') as HTMLElement;
  const activeCloneBoxBefore = this._getBoxStartPoint(activeClone);
  const activeCloneOffset = this._calcOffset(activeClone, this.stepInstructionsArea, 'beforeend')

  const ten = this.stepInstructionsArea.querySelector('#ten') as HTMLElement;
  const minus = this.stepInstructionsArea.querySelector('#minus') as HTMLElement;
  const tenStartPointBefore = this._getBoxStartPoint(ten);
  const minusStartPointBefore = this._getBoxStartPoint(minus);

  const tempActiveClone = activeClone.cloneNode(true) as HTMLElement;
  tempActiveClone.removeAttribute('style');
  this.stepInstructionsArea.insertAdjacentElement('beforeend', tempActiveClone)

  const tenStartPointAfter = this._getBoxStartPoint(ten);
  const minusStartPointAfter = this._getBoxStartPoint(minus);

  tempActiveClone.remove();

  const tenOffset = -1 * (tenStartPointBefore.left - tenStartPointAfter.left);
  const minusOffset = -1 * (minusStartPointBefore.left - minusStartPointAfter.left);

  const tl = gsap.timeline();

  gsap.to(activeClone, { left: activeCloneOffset.left });
  tl.fromTo(ten, { xPercent: -100, opacity: 0 }, { xPercent: 0, x: tenOffset, opacity: 1 });
  // gsap.fromTo(activeClone, { xPercent: 100 }, { xPercent: 0, left: activeCloneOffset.left });
  tl.fromTo(minus, { yPercent: 100, opacity: 0 }, { yPercent: 0, x: minusOffset, opacity: 1, onComplete: () => {
      gsap.fromTo(ten, { xPercent: 0, x: tenOffset, opacity: 1}, { xPercent: 100, opacity: 0 });
      gsap.fromTo(minus, { x: minusOffset, opacity: 1 }, { x: 0, opacity: 0 });
      gsap.fromTo(activeClone, { left: activeCloneOffset.left, opacity: 1 }, { left: activeCloneBoxBefore.left, opacity: 0 });
    } });
  // gsap.to(ten, { x: tenOffset });


  this.inAttention = 10 - this.inAttention;
}
