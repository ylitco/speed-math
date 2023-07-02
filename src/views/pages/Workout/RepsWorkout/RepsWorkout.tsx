import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import BaseWorkout from "src/views/pages/Workout/BaseWorkout";
import { VIEW } from "src/views/constants";
import { getUrl } from "src/utils";
import { useSelector } from "react-redux";
import {
  getCurrentRepIndex,
  getWorkoutReps,
  stopTimer,
  useAppDispatch,
} from "src/state/Workout";

export const RepsWorkout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const repIndex = useSelector(getCurrentRepIndex);
  const reps = useSelector(getWorkoutReps);

  const handleCheckFinish = useCallback(() => {
    if (repIndex === reps) {
      dispatch(stopTimer());
      return navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.STATISTICS}`));
    }
  }, [repIndex, reps, navigate, dispatch]);

  return <BaseWorkout onCheckFinish={handleCheckFinish} />;
};
