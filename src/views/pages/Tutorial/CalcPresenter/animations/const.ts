import type { CSSProperties } from 'react';
import styles from '../../Tutorial.module.scss';
import { TENS } from './addSibling';

export const STEP_RESULT = 'step-result';

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
  slotStyles?: CSSProperties;
  digitClass?: string | Array<string>;
}

export const createSlot = ({ symbol, symbolId, slotId, slotStyles, digitClass }: createSlotParams) => {
  const slot = document.createElement('div');
  slot.classList.add(styles.slot);
  slot.setAttribute('id', slotId);
  Object.assign(slot.style, slotStyles);
  const digit = document.createElement('div');
  symbolId && digit.setAttribute('id', symbolId);
  digitClass && (isClassArray(digitClass) ? digit.classList.add(...digitClass) : digit.classList.add(digitClass));
  digit.innerHTML = symbol.toString();
  digit.dataset.content = symbol.toString();
  digit.classList.add(styles.digit)
  slot.appendChild(digit);
  return slot;
}

function isClassArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === 'string');
}

interface createDoubleDigitSlotParams {
  number: number;
  slotId: string;
  digitClass?: string;
  slotStyles?: CSSProperties;
}

export const createTwoDigitSlot = ({ number, slotId, digitClass, slotStyles }: createDoubleDigitSlotParams) => {
  const tens = number.toString()[0];
  const units = number.toString()[1];
  const tensSlot = createSlot({ symbol: tens, slotId: TENS, digitClass });
  const unitsSlot = createSlot({ symbol: units, slotId: 'units', digitClass });

  const slot = document.createElement('div');
  slot.classList.add(styles.twoDigitNumber);
  slotStyles && Object.assign(slot.style, slotStyles);
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

const PARITY_ID = 'parity-label';

export const createParityLabel = (parity: 'even' | 'odd') => {
  const parityLabel = document.createElement('div');
  parityLabel.innerHTML = parity;
  parityLabel.setAttribute('id', PARITY_ID);
  parityLabel.classList.add(styles.parityLabel);

  return parityLabel;
}
