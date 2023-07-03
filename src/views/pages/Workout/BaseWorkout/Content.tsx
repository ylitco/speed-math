import { FC, memo, useCallback, useLayoutEffect, useState } from "react";
import cn from "classnames";
import { Content } from "src/components/Content/Content";
import { Input } from "src/components/Input/Input";
import { Keyboard } from "src/components/Keyboard/Keyboard";
import styles from "./BaseWorkout.module.scss";
import { Failure } from "./components/Failure/Failure";
import { Success } from "./components/Success/Success";
import { useSelector } from "react-redux";
import {
  getCurrentRep,
  getRepStatus,
  getWorkoutProgress,
  inputUserAnswer,
  useAppDispatch,
} from "src/state/Workout";
import { COMPLEXITY } from "src/state/constants";
import { IEventMetaObject } from "src/types";
import { useNavigate } from "react-router-dom";
import { getUrl } from "src/utils";
import { VIEW } from "src/views/constants";

export const BaseWorkoutContent: FC = memo(
  function BaseWorkoutContent() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const rep = useSelector(getCurrentRep);
    const result = useSelector(getRepStatus);

    const progress = useSelector(getWorkoutProgress);
    const [isReady, setIsReady] = useState(rep.complexity !== COMPLEXITY.HARD);
    const handleReady = useCallback(() => {
      setIsReady(true);
    }, []);
    useLayoutEffect(() => {
      setIsReady(rep.complexity !== COMPLEXITY.HARD);
    }, [rep.secondFactor, rep.complexity]);

    const handleKeyboardClick = useCallback(
      async (e: IEventMetaObject<number>) => {
        const result = await dispatch(inputUserAnswer(e.value)).unwrap();

        console.debug(result);
        if (result === 'FINISH') {
          navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.STATISTICS}`));
        }
      },
      [dispatch, navigate],
    );

    return (
      <Content className={styles.view}>
        <div className={styles.progressbar}>
          <div
            className={styles.progressLine}
            style={{ width: `${progress || 0}%` }}
          />
        </div>
        <h1 className={styles.firstFactor}>×{rep.firstFactor}</h1>
        {((rep.complexity === COMPLEXITY.HARD && !isReady) ||
          rep.complexity !== COMPLEXITY.HARD) && (
          <h1 className={styles.secondFactor} data-content={rep.secondFactor}>
            {rep.secondFactor}
          </h1>
        )}
        {isReady && <Input />}
        <Keyboard
          className={cn(styles.keyboard, result !== null && styles.invisible)}
          key={rep.firstFactor * rep.secondFactor}
          onClick={handleKeyboardClick}
          isReady={isReady}
          onReady={handleReady}
        />
        {result !== null && (
          <div className={styles.result}>
            {result ? <Success /> : <Failure />}
          </div>
        )}
      </Content>
    );
  }
);
