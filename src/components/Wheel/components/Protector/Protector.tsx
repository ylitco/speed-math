import { memo, FC } from "react";
import cn from "classnames";
import styles from "./Protector.module.scss";
import { IWheelProps } from "../../types";

type ProtectorProps = Pick<IWheelProps, "size">;

export const Protector: FC<ProtectorProps> = memo(function Protector(props) {
  const protectorLinesAmount = props.size === "L" ? 3 : 2;

  return (
    <div className={cn(styles.protector, styles[props.size])}>
      {Array.from(Array(protectorLinesAmount).keys()).map((key) => {
        return <div className={styles.line} key={key} />;
      })}
    </div>
  );
});
