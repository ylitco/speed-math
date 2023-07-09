import cn from "classnames";
import { ChangeEvent, FC, HTMLAttributes, memo, useCallback } from "react";
import { Link } from "react-router-dom";
import styles from "./LocalSettings.module.scss";
import { Content } from "src/components/Content/Content";
import Button from "src/components/Button";
import { PlayIcon } from "src/icons/Play/Play";
import { EXERCISES, COMPLEXITY, GAME_MODE } from "src/state/constants";
import { getUrl } from "src/utils";
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

export const LocalSettingsContent = memo(function LocalSettingsContent() {
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
      <section className={styles.body}>
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
