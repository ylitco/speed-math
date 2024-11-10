import { FC, useEffect } from "react";
import BaseWorkout from "~/views/pages/Workout/BaseWorkout";
import { VIEW } from "~/views/constants";
import { useNavigate } from "react-router-dom";
import { getUrl } from "~/utils";
import { useSelector } from "react-redux";
import {
  getSetTimerStatus,
  stopTimer,
  useAppDispatch,
} from "~/state/Workout";

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
