import { memo, useCallback, FC } from "react";
import { IHeaderProps } from "./types";
import styles from "./Header.module.scss";
import { useSelector } from "react-redux";
import {
  getRepExerciseName,
  getWorkoutTitle,
  stopTimer,
  useAppDispatch,
} from "~/state/Workout";
import { BackButton } from "~/views/components/BackButton";
import { getUrl } from "~/utils";
import { useNavigate } from "react-router-dom";
import Button, { BUTTON_TYPE } from "~/components/Button";
import { InfoIcon } from "~/icons/Info/Info";
import { VIEW } from "~/views/constants";
import { EXERCISES } from "~/state/constants";

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
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const exerciseName = useSelector(getRepExerciseName);
  const handleClick = useCallback(() => {
    navigate(getUrl(`${VIEW.EXPLANATION}/${exerciseName}`));
    dispatch(stopTimer());
  }, [exerciseName, navigate, dispatch]);

  if (exerciseName === EXERCISES.N) return null;

  return (
    <Button type={BUTTON_TYPE.CIRCLE} onClick={handleClick}>
      <InfoIcon />
    </Button>
  );
};
