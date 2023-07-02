import {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import cn from "classnames";
import { Content } from "src/components/Content/Content";
import { Input } from "src/components/Input/Input";
import Keyboard from "src/components/Keyboard/Keyboard";
import styles from "./BaseWorkout.module.scss";
import { Failure } from "./components/Failure/Failure";
import { Success } from "./components/Success/Success";
import { useSelector } from "react-redux";
import {
  getCurrentRep,
  getCurrentRepIndex,
  getInputMode,
  getWorkoutProgress,
  getWorkoutReps,
  nextRep,
  pushAnswer,
  useAppDispatch,
} from "src/state/Workout";
import { COMPLEXITY, INPUT_MODE } from "src/state/constants";
import { IEventMetaObject } from "src/types";
import { IBaseWorkout } from "./types";

export const BaseWorkoutContent: FC<IBaseWorkout> = memo(
  function BaseWorkoutContent(props) {
    const dispatch = useAppDispatch();
    const repIndex = useSelector(getCurrentRepIndex);
    const rep = useSelector(getCurrentRep);
    const inputMode = useSelector(getInputMode);
    const reps = useSelector(getWorkoutReps);

    const { onCheckStart, onCheckFinish } = props;

    const [answer, setAnswer] = useState<string | number | null>(null);
    const [result, setResult] = useState<boolean | null>(null);
    const progress = useSelector(getWorkoutProgress);
    const [isReady, setIsReady] = useState(rep.complexity !== COMPLEXITY.HARD);
    const handleReady = useCallback(() => {
      setIsReady(true);
    }, []);
    useLayoutEffect(() => {
      setIsReady(rep.complexity !== COMPLEXITY.HARD);
    }, [rep.secondFactor, rep.complexity]);

    const handleKeyboardClick = useCallback(
      (e: IEventMetaObject<string | number | null>) => {
        if (
          e.value &&
          e.value.toString().length >
            (rep.firstFactor * rep.secondFactor).toString().length
        )
          return;

        setAnswer(e.value);
      },
      [rep.firstFactor, rep.secondFactor]
    );
    const handleCheckClick = useCallback(() => {
      onCheckStart?.();

      const finalAnswer =
        inputMode === INPUT_MODE.LTR || answer === null
          ? answer
          : answer.toString().split("").reverse().join("");

      console.debug(">>>", finalAnswer, rep.firstFactor * rep.secondFactor);

      // @ts-expect-error
      setResult(+finalAnswer === rep.firstFactor * rep.secondFactor);
      dispatch(pushAnswer(finalAnswer as string | null));
    }, [
      rep.firstFactor,
      dispatch,
      onCheckStart,
      rep.secondFactor,
      inputMode,
      answer,
    ]);

    useEffect(() => {
      let _timer: ReturnType<typeof setTimeout>;
      if (result !== null) {
        _timer = setTimeout(() => {
          if (onCheckFinish) {
            onCheckFinish();
          }

          setResult(null);
          setAnswer(null);
          dispatch(nextRep());
        }, 500);
      }

      return () => {
        clearTimeout(_timer);
      };
    }, [result, onCheckFinish, dispatch, reps, repIndex]);
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
        {isReady && (
          <Input
            firstFactor={rep.firstFactor}
            secondFactor={rep.secondFactor}
            answer={answer}
          />
        )}
        <Keyboard
          className={cn(styles.keyboard, result !== null && styles.invisible)}
          key={rep.firstFactor * rep.secondFactor}
          result={rep.firstFactor * rep.secondFactor}
          complexity={rep.complexity}
          answer={answer}
          onClick={handleKeyboardClick}
          onCheck={handleCheckClick}
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
