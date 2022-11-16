import CSS from 'csstype';
import styles from '../../Explanation.module.scss';
import { TENS } from './addSibling';

export const LEFT_ZERO = {
  id: 'left-zero',
  selector: '#left-zero',
};

export const RIGHT_ZERO = {
  id: 'right-zero',
  selector: '#right-zero',
};

interface createSlotParams {
  symbol: number | string;
  symbolId?: string;
  slotId: string;
  slotStyles?: CSS.Properties;
}

export const createSlot = ({ symbol, symbolId, slotId, slotStyles }: createSlotParams) => {
  const slot = document.createElement('div');
  slot.classList.add(styles.slot);
  slot.setAttribute('id', slotId);
  Object.assign(slot.style, slotStyles);
  const digit = document.createElement('div');
  symbolId && digit.setAttribute('id', symbolId);
  digit.innerHTML = symbol.toString();
  digit.dataset.content = symbol.toString();
  digit.classList.add(styles.digit)
  slot.appendChild(digit);
  return slot;
}

interface createDoubleDigitSlotParams {
  number: number;
  slotId: string;
}

export const createTwoDigitSlot = ({ number, slotId }: createDoubleDigitSlotParams) => {
  const tens = number.toString()[0];
  const units = number.toString()[1];
  const tensSlot = createSlot({ symbol: tens, slotId: TENS });
  const unitsSlot = createSlot({ symbol: units, slotId: 'units' });

  const slot = document.createElement('div');
  slot.classList.add(styles.twoDigitNumber);
  slot.setAttribute('id', slotId);
  slot.appendChild(tensSlot);
  slot.appendChild(unitsSlot);

  return slot;
}

export const createMind = () => {
  const mind = document.createElement('div');

  mind.setAttribute('id', 'brain');
  mind.classList.add('icon-brain');
  mind.classList.add(styles.brain);

  return mind;
}