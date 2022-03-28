import React, { FC } from 'react';
import cn from 'classnames';
import { IButtonProps, BUTTON_TYPE } from './types';
import styles from './Button.module.scss';

export const Button: FC<IButtonProps> = (props) => {
  const { type = BUTTON_TYPE.SQUARE } = props;

  return (
    <button
      className={cn(props.className, styles.button, styles[type])}
      data-name={props.name}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
