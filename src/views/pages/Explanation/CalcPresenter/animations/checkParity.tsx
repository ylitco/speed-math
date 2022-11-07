import React from 'react';
import ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import { Digit } from '../../Digit/Digit';
import CalcPresenter from '../CalcPresenter';
import styles from '../../Explanation.module.scss';
import digitStyles from '../../Digit/Digit.module.scss';

export function checkParity(this: CalcPresenter) {
  let msg;
  if (this.inAttention % 2 === 0) {
    ReactDOM.render(
      <div id="parityLabel" className={styles.parityLabel}>even</div>,
      this.mindArea,
    );

    const parityLabel = this.canvas.querySelector('#parityLabel') as HTMLElement;

    gsap.from(parityLabel, { x: -300, opacity: 0 });

    msg = `Отмечаем что число ${this.inAttention} чётное`;

    this.parity = 'even';
  } else {
    ReactDOM.render(
      <>
        <div id="parityLabel" className={styles.parityLabel}>odd</div>
        <div className={styles.addToResult}>
          <Digit id="plus" className={digitStyles.evenodd}>+</Digit>
          <Digit id="five" className={digitStyles.evenodd}>5</Digit>
        </div>
      </>,
      this.mindArea,
    );

    const parityLabel = this.canvas.querySelector('#parityLabel') as HTMLElement;
    const plus = this.canvas.querySelector('#plus') as HTMLElement;
    const five = this.canvas.querySelector('#five') as HTMLElement;

    const tl = gsap.timeline();

    tl.from(parityLabel, { x: -300, opacity: 0 });
    tl.from(five, { x: 300, opacity: 0, width: 0 });
    tl.from(plus, { yPercent: 100, opacity: 0, width: 0 });

    msg = `Отмечаем что число ${this.inAttention} нечётное, нужно будет добавить 5`;
    this.parity = 'odd';
  }

  const parityLabel = this.canvas.querySelector('#parityLabel') as HTMLElement;

  this._doAfter = () => {
    gsap.to(parityLabel, { x: -300, opacity: 0 });

    this._doAfter = null;
  };
}
