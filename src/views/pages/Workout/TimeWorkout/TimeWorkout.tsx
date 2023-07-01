import React, { FC, useCallback, useEffect, useState } from 'react';
import { BaseWorkout } from 'src/views/pages/Workout/BaseWorkout/BaseWorkout';
import { VIEW } from 'src/views/constants';
import { useNavigate } from 'react-router-dom';
import { getUrl } from 'src/utils';
import { useSelector } from 'react-redux';
import { getSetTimerStatus, stopTimer, useAppDispatch } from 'src/state/Workout';

export const TimeWorkout: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCheck, setIsCheck] = useState(false);
  const isSetTimeOut = useSelector(getSetTimerStatus);
  const handleCheckStart = useCallback(() => {
    setIsCheck(true);
  }, []);
  const handleCheckFinish = useCallback(() => {
    setIsCheck(false);
  }, []);

  useEffect(() => {
    let _timer: ReturnType<typeof setTimeout>

    isSetTimeOut && finish();

    function finish() {
      if (isCheck) {
        _timer = setTimeout(finish);
      } else {
        dispatch(stopTimer());
        navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.STATISTICS}`));
      }
    }

    return () => {
      clearTimeout(_timer);
    }
  }, [isCheck, navigate, isSetTimeOut, dispatch]);

  return (
    <BaseWorkout
      onCheckStart={handleCheckStart}
      onCheckFinish={handleCheckFinish}
    />
  );
};
