import React, { FC } from 'react';
import cn from 'classnames';
import { IButtonProps, BUTTON_TYPE } from './types';
import styles from './Button.module.scss';

export const Button: FC<IButtonProps> = (props) => {
  const { type = BUTTON_TYPE.SQUARE } = props;

  return (
    <button data-name={props.name} className={cn(styles.button, styles[type])} onClick={props.onClick}>
      {props.children}
    </button>
  );
};
