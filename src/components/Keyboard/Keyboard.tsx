import { memo, FC, useCallback } from "react";
import Button from "src/components/Button";
import { createEventMetaObject } from "src/utils";
import { IKeyboardProps } from "./types";
import styles from "./Keyboard.module.scss";
import { Check } from "./components/Check/Check";
import Delete from "./components/Delete/Delete";
import { Calculator } from "./components/Calculator/Calculator";
import cn from "classnames";
import { CHECKING_MODE } from "../../state/constants";
import { getCheckMode } from "src/state/Workout";
import { useSelector } from "react-redux";

export const REMOVE_KEY = -1;
export const VERIFY_KEY = -2;

export const Keyboard: FC<IKeyboardProps> = memo(function Keyboard({
  onClick,
  isReady,
  onReady,
  ...props
}) {
  const checkMode = useSelector(getCheckMode);
  const handleButtonClick = useCallback(
    (name: string | void) => {
      name !== undefined && onClick(createEventMetaObject(+name));
    },
    [onClick]
  );

  if (!isReady) {
    return <Calculator onClick={onReady} className={styles.calculator} />;
  }

  return (
    <div className={cn(props.className, styles.keyboard)}>
      {Array.from(Array(9).keys()).map((index) => {
        const number = (index + 1).toString();

        return (
          <Button name={number} onClick={handleButtonClick} key={number}>
            <span>{number}</span>
          </Button>
        );
      })}
      {checkMode === CHECKING_MODE.HAND ? (
        <Button name={`${VERIFY_KEY}`} onClick={handleButtonClick}>
          <Check />
        </Button>
      ) : (
        <div />
      )}
      <Button name="0" onClick={handleButtonClick}>
        <span>0</span>
      </Button>
      <Button name={`${REMOVE_KEY}`} onClick={handleButtonClick}>
        <Delete />
      </Button>
    </div>
  );
});
