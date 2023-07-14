import { memo } from "react";
import type { FC, PropsWithChildren } from "react";
import cn from "classnames";
import { BUTTON_TYPE } from "./";
import styles from "./Button.module.scss";

export interface ButtonProps extends PropsWithChildren {
  className?: string;
  type?: BUTTON_TYPE;
  name?: string;
  onClick?: (name: void | string) => void;
}

const Button: FC<ButtonProps> = (props) => {
  const { type = BUTTON_TYPE.SQUARE, onClick, name  } = props;

  return (
    <button
      className={cn(props.className, styles.button, styles[type])}
      data-name={props.name}
      onClick={() => onClick?.(name)}
      onTouchStart={e => e.currentTarget.classList.add(styles.active)}
      onTouchEnd={(e) => {
        e.currentTarget.classList.remove(styles.active);

        if (e.target !== e.currentTarget) return;

        e.preventDefault();
        onClick?.(name);
      }}
      onTouchCancel={e => e.currentTarget.classList.remove(styles.active)}
    >
      {props.children}
    </button>
  );
};

export default memo(Button);
