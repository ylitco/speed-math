import { memo, useCallback, FC } from "react";
import { IHeaderProps } from "./types";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import {
  ExerciseName,
  getCurrentRep,
  getWorkoutTitle,
  stopTimer,
  useAppDispatch,
} from "src/state/Workout";
import { BackButton } from "src/views/components/BackButton";
import { getUrl } from "src/utils";
import { Link } from "react-router-dom";
import { Button } from "src/components/Button/Button";
import { InfoIcon } from "src/icons/Info/Info";
import { BUTTON_TYPE } from "src/components/Button/types";
import { VIEW } from "src/views/constants";
import { EXERCISES } from "src/state/constants";

export const Header: FC<IHeaderProps> = memo(function Header(props) {
  return (
    <header className={styles.header}>
      <div className={styles.action}>
        {props.renderMinorAction && props.renderMinorAction()}
      </div>
      <h1 className={styles.title}>{props.children}</h1>
      <div className={styles.action}>
        {props.renderMajorAction && props.renderMajorAction()}
      </div>
    </header>
  );
});

export const WorkoutHeader: FC = memo(function WorkoutHeader() {
  const workoutTitle = useSelector(getWorkoutTitle);

  return (
    <Header renderMinorAction={BackButton} renderMajorAction={TutorialButton}>
      {workoutTitle}
    </Header>
  );
});

const TutorialButton: FC = () => {
  const dispatch = useAppDispatch();
  const rep = useSelector(getCurrentRep);
  const exercise =
    rep.firstFactor > 12
      ? EXERCISES.N
      : EXERCISES[`${rep.firstFactor}` as ExerciseName];

  const handleTutorialStart = useCallback(() => {
    dispatch(stopTimer());
  }, [dispatch]);

  if (exercise === EXERCISES.N) return null;

  return (
    <Link to={getUrl(`${VIEW.EXPLANATION}/${exercise}`)}>
      <Button type={BUTTON_TYPE.CIRCLE} onClick={handleTutorialStart}>
        <InfoIcon />
      </Button>
    </Link>
  );
};
