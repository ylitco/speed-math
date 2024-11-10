import { memo, FC } from "react";
import { useSelector } from "react-redux";
import { getUserInput } from "~/state/Workout";
import styles from "./Input.module.scss";

export const Input: FC = memo(function Input() {
  const userInput = useSelector(getUserInput);

  return (
    <div className={styles.input}>
      {userInput.map((value, index) => {
        return (
          <div key={index + value} className={styles.inputCell}>
            <p className={styles.outerShadow}>{value}</p>
            <p className={styles.stroke}>{value}</p>
            <p className={styles.innerGradient}>{value}</p>
          </div>
        );
      })}
    </div>
  );
});
