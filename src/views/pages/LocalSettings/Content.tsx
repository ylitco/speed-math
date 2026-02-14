// @TODO: replace with clx
import cn from 'classnames';
import {
  Touch,
  FC,
  HTMLAttributes,
  TouchEventHandler,
  memo,
  useCallback,
  useState,
  ChangeEvent,
} from 'react';
import { Link } from 'react-router-dom';
import styles from './LocalSettings.module.scss';
import { Content } from '~/components/Content/Content';
import Button from '~/components/Button';
import { EXERCISES, COMPLEXITY, GAME_MODE } from '~/state/constants';
import { getUrl } from '~/utils';
import { VIEW } from '~/views/constants';
import { Switch } from '~/components/Switch/Switch';
import { useSelector } from 'react-redux';
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
} from '~/state/Workout';
import { IEventMetaObject } from '~/types';
import { useStartWorkoutCallback } from '~/hooks/useStartWorkoutEffect';

export function copyTouch({ identifier, pageX, pageY }: Touch) {
  return { identifier, pageX, pageY };
}

const Quantity: FC<HTMLAttributes<HTMLOrSVGElement>> = () => {
  const reps = useSelector(getWorkoutReps);

  return (
    <span
      className={cn(styles.quantity, 'inner-shadow-light opacity-50')}
      style={{ fontSize: 24, fontWeight: 500 }}
    >
      {reps}
    </span>
  );
};

const WORKOUT_MODE_OPTIONS = {
  [GAME_MODE.TIME]: (
    <i className="speed-math-timer text-icon-timer inner-shadow-light opacity-50" />
  ),
  [GAME_MODE.REPS]: <Quantity />,
  [GAME_MODE.FREE]: (
    <i className="speed-math-infinity text-icon-infinity inner-shadow-light opacity-50" />
  ),
};

interface SelectTouch extends Pick<Touch, 'identifier' | 'pageX' | 'pageY'> {
  exerciseName: ExerciseName;
  complexity: Complexity;
}

export const LocalSettingsContent = memo(function LocalSettingsContent() {
  const [ongoingTouches, setOngoingTouches] = useState<Array<SelectTouch>>([]);
  const dispatch = useAppDispatch();
  const type = useSelector(getType);
  const plan = useSelector(getPlan);
  const handleWorkoutTypeChange = useCallback(
    (e: IEventMetaObject<Type>) => {
      dispatch(setType(e.value));
    },
    [dispatch],
  );
  const handleExerciseComplexityChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changePlan({
          name: e.target.name,
          complexity: e.target.value,
        } as Exercise),
      );
    },
    [dispatch],
  );
  const ongoingTouchIndexById = useCallback<
    (id: Touch['identifier']) => number
  >(
    (idToFind) => {
      for (let i = 0; i < ongoingTouches.length; i++) {
        if (ongoingTouches[i].identifier === idToFind) {
          return i;
        }
      }
      return -1;
    },
    [ongoingTouches],
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
            }),
          );
        }

        setOngoingTouches([...ongoingTouches, newTouch]);
      }
    },
    [dispatch, ongoingTouches],
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
    [ongoingTouchIndexById, ongoingTouches],
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
            newTouch.pageY,
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
                }),
              );
            }
          }

          touches.splice(idx, 1, newTouch);

          setOngoingTouches(touches);
        }
      }
    },
    [dispatch, ongoingTouchIndexById, ongoingTouches],
  );

  return (
    <Content className={styles.view}>
      <section className={styles.body}>
        <div className={styles.column}>
          <div className="mb-[0.5em] min-h-[26.02px]" />
          {Object.keys(EXERCISES).map((mode) => (
            <div className={styles.number} key={mode}>
              ×{mode}
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <header className={styles.header}>
            <b className={cn(styles.th, styles.easy)}>
              <i className="speed-math-easy text-icon-difficulty inner-shadow-purple opacity-50" />
            </b>
            <b className={cn(styles.th, styles.medium)}>
              <i className="speed-math-medium text-icon-difficulty inner-shadow-purple opacity-50" />
            </b>
            <b className={cn(styles.th, styles.hard)}>
              <i className="speed-math-hard text-icon-difficulty inner-shadow-purple opacity-50" />
            </b>
          </header>
          {Object.keys(EXERCISES).map((mode) => (
            <div
              key={mode}
              className={styles.complexities}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              onTouchMove={handleTouchMove}
            >
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
            </div>
          ))}
        </div>
        <div className={styles.column}>
          <div className="mb-[0.5em] min-h-[26.02px]" />
          {Object.keys(EXERCISES).map((mode) => (
            <TutorialLink key={mode} mode={mode} />
          ))}
        </div>
      </section>
      <nav className={styles.footer}>
        <Switch
          className={styles.modes}
          optionClassName={styles.modeOption}
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
      <i className="speed-math-play text-icon-base inner-shadow-light ml-1.25 opacity-50" />
    </Button>
  );
});

const TutorialLink = memo(function TutorialLink({ mode }: { mode: string }) {
  return (
    <Link className={styles.info} to={getUrl(`${VIEW.EXPLANATION}/${mode}`)}>
      <i className="speed-math-info text-icon-info inner-shadow-purple opacity-50" />
    </Link>
  );
});
