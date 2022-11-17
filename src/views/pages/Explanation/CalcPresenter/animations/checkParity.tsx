import CalcPresenter from '../CalcPresenter';
import { createParityLabel, createSlot } from './const';
import styles from '../../Explanation.module.scss';

export function checkParity(this: CalcPresenter) {
  const isEven = this.inAttention % 2 === 0;

  const parityLabel = createParityLabel(isEven ? 'even' : 'odd');

  if (isEven) {
    console.info(`Отмечаем что число ${this.inAttention} чётное`);

    this.parity = 'even';

    this.mindArea.insertAdjacentElement('afterbegin', parityLabel);

    this.tl.from(parityLabel, { x: -100, opacity: 0 });
  } else {
    console.info(`Отмечаем что число ${this.inAttention} нечётное, нужно будет добавить 5`);

    this.parity = 'odd';

    const plusSlot = createSlot({ symbol: '+', slotId: 'plus', digitClass: [styles.secondary, styles.s], slotStyles: { marginLeft: '8px' } });
    const fiveSlot = createSlot({ symbol: 5, slotId: 'five', digitClass: [styles.secondary, styles.s] });

    this.mindArea.insertAdjacentElement('afterbegin', parityLabel);
    this.mindArea.insertAdjacentElement('beforeend', plusSlot);
    this.mindArea.insertAdjacentElement('beforeend', fiveSlot);

    this.tl.from(parityLabel, { x: -100, opacity: 0 })
      .from(fiveSlot, { x: 300, opacity: 0, width: 0 })
      .from(plusSlot, { yPercent: 100, opacity: 0, width: 0 });
  }

  this.afterStep(() => {
    this.tl.to(parityLabel, { x: -100, opacity: 0, width: 0 });
  });
}
