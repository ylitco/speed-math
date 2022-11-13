import styles from '../../Explanation.module.scss';
import CSS from 'csstype';

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