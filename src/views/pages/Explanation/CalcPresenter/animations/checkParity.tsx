import React from 'react';
import ReactDOM from 'react-dom';
import { gsap } from 'gsap';
import { Digit } from '../../Digit/Digit';
import CalcPresenter from '../CalcPresenter';
import styles from '../../Explanation.module.scss';
import digitStyles from '../../Digit/Digit.module.scss';

const PARITY_ID = 'parity-label';
const ADD_FIVE_ID = 'remember-add-five-if-odd';

export function checkParity(this: CalcPresenter) {
  ReactDOM.unmountComponentAtNode(this.mindArea);

  const isEven = this.inAttention % 2 === 0;

  if (isEven) {
    console.info(`Отмечаем что число ${this.inAttention} чётное`);

    this.parity = 'even';

    ReactDOM.render(
      <div id={PARITY_ID} className={styles.parityLabel}>even</div>,
      this.mindArea,
    );

    const parityElem = this.canvas.querySelector<HTMLElement>('#' + PARITY_ID)!;

    this.tl.from(parityElem, { xPercent: -300, opacity: 0 });
  } else {
    console.info(`Отмечаем что число ${this.inAttention} нечётное, нужно будет добавить 5`);

    this.parity = 'odd';

    ReactDOM.render(
      <>
        <div id={PARITY_ID} className={styles.parityLabel}>odd</div>
        <div id={ADD_FIVE_ID} className={styles.addToResult}>
          <Digit id="plus" className={digitStyles.evenodd}>+</Digit>
          <Digit id="five" className={digitStyles.evenodd}>5</Digit>
        </div>
      </>,
      this.mindArea,
    );

    const parityElem = this.canvas.querySelector<HTMLElement>('#' + PARITY_ID)!;
    const addFiveElem = this.mindArea.querySelector<HTMLElement>('#' + ADD_FIVE_ID)!;
    const plusElem = addFiveElem.querySelector<HTMLElement>('#plus')!;
    const fiveElem = addFiveElem.querySelector<HTMLElement>('#five')!;

    this.tl.from(parityElem, { xPercent: -300, opacity: 0 })
      .from(fiveElem, { x: 300, opacity: 0, width: 0 })
      .from(plusElem, { yPercent: 100, opacity: 0, width: 0 });
  }

  this.afterStep(() => {
    const tl = gsap.timeline()
    const parityElem = this.mindArea.querySelector<HTMLElement>('#' + PARITY_ID)!;

    tl.to(parityElem, { xPercent: -300, opacity: 0 });

    if (!isEven) {
      const addFiveElem = this.mindArea.querySelector<HTMLElement>('#' + ADD_FIVE_ID)!;

      parityElem.style.display = 'none';

      const addFiveElemStartPoint = this.getElementPosition(addFiveElem);

      parityElem.style.display = 'block';

      const addFiveElemEndPoint = this.getElementPosition(addFiveElem);

      tl.to(addFiveElem, { x: addFiveElemStartPoint.x - addFiveElemEndPoint.x }, 0);
    }

    this.tl.add(tl);
  });
}
