import cn from "classnames";
import {
  Touch,
  FC,
  HTMLAttributes,
  TouchEventHandler,
  memo,
  useCallback,
  useState,
  ChangeEvent,
} from "react";
import { Link } from "react-router-dom";
import styles from "./LocalSettings.module.scss";
import { Content } from "src/components/Content/Content";
import Button from "src/components/Button";
import { PlayIcon } from "src/icons/Play/Play";
import { EXERCISES, COMPLEXITY, GAME_MODE } from "src/state/constants";
import { copyTouch, getUrl } from "src/utils";
import { Easy } from "./components/Easy/Easy";
import { Medium } from "./components/Medium/Medium";
import { Hard } from "./components/Hard/Hard";
import { VIEW } from "src/views/constants";
import { Switch } from "src/components/Switch/Switch";
import { InfoIcon } from "src/icons/Info/Info";
import { TimerIcon } from "src/icons/Timer/Timer";
import { InfinityIcon } from "src/icons/Infinity/Infinity";
import { useSelector } from "react-redux";
import {
  Complexity,
  Exercise,
  ExerciseName,
  Type,
  changePlan,
  getPlan,
  getType,
  getWorkoutReps,
  setType,
  useAppDispatch,
} from "src/state/Workout";
import { IEventMetaObject } from "src/types";
import { useStartWorkoutCallback } from "src/hooks/useStartWorkoutEffect";

const Quantity: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  const reps = useSelector(getWorkoutReps);

  return <div className={cn(props.className, styles.fontTest)}>{reps}</div>;
};

const WORKOUT_MODE_OPTIONS = {
  [GAME_MODE.TIME]: TimerIcon,
  [GAME_MODE.REPS]: Quantity,
  [GAME_MODE.FREE]: InfinityIcon,
};

interface SelectTouch extends Pick<Touch, 'identifier' | 'pageX' | 'pageY'> {
  exerciseName: ExerciseName,
  complexity: Complexity,
};

export const LocalSettingsContent = memo(function LocalSettingsContent() {
  const [ongoingTouches, setOngoingTouches] = useState<Array<SelectTouch>>([]);
  const dispatch = useAppDispatch();
  const type = useSelector(getType);
  const plan = useSelector(getPlan);
  const handleWorkoutTypeChange = useCallback(
    (e: IEventMetaObject<Type>) => {
      dispatch(setType(e.value));
    },
    [dispatch]
  );
  const handleExerciseComplexityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changePlan({
          name: e.target.name,
          complexity: e.target.value,
        } as Exercise)
      );
    },
    [dispatch]
  );
  const ongoingTouchIndexById = useCallback<
    (id: Touch["identifier"]) => number
  >(
    (idToFind) => {
      for (let i = 0; i < ongoingTouches.length; i++) {
        if (ongoingTouches[i].identifier === idToFind) {
          return i;
        }
      }
      return -1;
    },
    [ongoingTouches]
  );
  const handleTouchStart = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const newTouch = copyTouch(e.changedTouches[i]) as SelectTouch;
        const elem = e.target as HTMLInputElement;

        if (elem instanceof HTMLInputElement) {
          newTouch.exerciseName = elem.name as ExerciseName;
          newTouch.complexity = elem.value as Complexity;

          dispatch(
            changePlan({
              name: newTouch.exerciseName,
              complexity: newTouch.complexity,
            })
          );
        }

        setOngoingTouches([...ongoingTouches, newTouch]);
      }
    },
    [dispatch, ongoingTouches]
  );
  const handleTouchEnd = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        let idx = ongoingTouchIndexById(e.changedTouches[i].identifier);

        if (idx >= 0) {
          const touches = [...ongoingTouches];

          touches.splice(idx, 1);

          setOngoingTouches(touches);
        }
      }
    },
    [ongoingTouchIndexById, ongoingTouches]
  );
  const handleTouchCancel = handleTouchEnd;
  const handleTouchMove = useCallback<TouchEventHandler<HTMLDivElement>>(
    (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const idx = ongoingTouchIndexById(e.changedTouches[i].identifier);

        if (idx >= 0) {
          const touches = [...ongoingTouches];
          const newTouch = copyTouch(e.changedTouches[i]) as SelectTouch;
          const elem = document.elementFromPoint(
            newTouch.pageX,
            newTouch.pageY
          );

          if (elem instanceof HTMLInputElement) {
            newTouch.exerciseName = elem.name as ExerciseName;
            newTouch.complexity = elem.value as Complexity;

            if (
              touches[idx].exerciseName !== newTouch.exerciseName ||
              touches[idx].complexity !== newTouch.complexity
            ) {
              dispatch(
                changePlan({
                  name: newTouch.exerciseName,
                  complexity: newTouch.complexity,
                })
              );
            }
          }

          touches.splice(idx, 1, newTouch);

          setOngoingTouches(touches);
        }
      }
    },
    [dispatch, ongoingTouchIndexById, ongoingTouches]
  );

  return (
    <Content className={styles.view}>
      <header className={styles.header}>
        <b className={cn(styles.th, styles.easy)}>
          <Easy />
        </b>
        <b className={cn(styles.th, styles.medium)}>
          <Medium />
        </b>
        <b className={cn(styles.th, styles.hard)}>
          <Hard />
        </b>
      </header>
      <section
        className={styles.body}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onTouchMove={handleTouchMove}
      >
        {Object.keys(EXERCISES).map((mode) => {
          return (
            <div className={styles.row} key={mode}>
              <div className={styles.number}>×{mode}</div>
              <div className={styles.easy}>
                <input
                  type="checkbox"
                  name={mode}
                  value="easy"
                  checked={plan[mode as ExerciseName] === COMPLEXITY.EASY}
                  onChange={handleExerciseComplexityChange}
                />
              </div>
              <div className={styles.medium}>
                <input
                  type="checkbox"
                  name={mode}
                  value="medium"
                  checked={plan[mode as ExerciseName] === COMPLEXITY.MEDIUM}
                  onChange={handleExerciseComplexityChange}
                />
              </div>
              <div className={styles.hard}>
                <input
                  type="checkbox"
                  name={mode}
                  value="hard"
                  checked={plan[mode as ExerciseName] === COMPLEXITY.HARD}
                  onChange={handleExerciseComplexityChange}
                />
              </div>
              <TutorialLink mode={mode} />
            </div>
          );
        })}
      </section>
      <nav className={styles.footer}>
        <Switch
          className={styles.modes}
          options={WORKOUT_MODE_OPTIONS}
          value={type}
          onChange={handleWorkoutTypeChange}
        />
        <PlayButton />
      </nav>
    </Content>
  );
});

const PlayButton = memo(function PlayButton() {
  const handleWorkoutStart = useStartWorkoutCallback();

  return (
    <Button className={styles.play} onClick={handleWorkoutStart}>
      <PlayIcon />
    </Button>
  );
});

const TutorialLink = memo(function TutorialLink({ mode }: { mode: string }) {
  return (
    <Link className={styles.info} to={getUrl(`${VIEW.EXPLANATION}/${mode}`)}>
      <InfoIcon color="purple" />
    </Link>
  );
});
