import { FC, useEffect } from "react";
import BaseWorkout from "src/views/pages/Workout/BaseWorkout";
import { VIEW } from "src/views/constants";
import { useNavigate } from "react-router-dom";
import { getUrl } from "src/utils";
import { useSelector } from "react-redux";
import {
  getSetTimerStatus,
  stopTimer,
  useAppDispatch,
} from "src/state/Workout";

export const TimeWorkout: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSetTimeOut = useSelector(getSetTimerStatus);

  useEffect(() => {
    if (isSetTimeOut) {
      dispatch(stopTimer());
      navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.STATISTICS}`));
    }
  }, [navigate, isSetTimeOut, dispatch]);

  return <BaseWorkout />;
};
