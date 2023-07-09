import { memo, FC, PropsWithChildren, HTMLAttributes } from 'react';
import cn from 'classnames';
import { BUTTON_TYPE } from './';
import styles from './Button.module.scss';

export interface ButtonProps
  extends PropsWithChildren<HTMLAttributes<HTMLElement>> {
  type?: BUTTON_TYPE;
  name?: string;
}

export const Button: FC<ButtonProps> = memo(function Button(props) {
  const { type = BUTTON_TYPE.SQUARE } = props;

  return (
    <button
      className={cn(props.className, styles.button, styles[type])}
      data-name={props.name}
      onClick={props.onClick}
      onContextMenu={props.onClick}
    >
      {props.children}
    </button>
  );
});
