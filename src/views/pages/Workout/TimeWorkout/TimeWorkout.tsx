import React, { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { BaseWorkout } from 'src/views/pages/Workout/BaseWorkout/BaseWorkout';
import { StateContext } from 'src/state';
import { ITimeWorkout } from 'src/state/types';
import { VIEW } from 'src/views/constants';
import { useNavigate } from 'react-router-dom';
import { getUrl } from 'src/utils';

export const TimeWorkout: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext)
  const { workout, pauseWorkout, settings: { global: { minutes: totalMinutes, seconds: totalSeconds } } } = state;
  const { pausedOn } = workout as ITimeWorkout;
  const [timer, setTimer] = useState<{ minutes: number, seconds: number }>({ minutes: getMinutes(), seconds: getSeconds() });
  const [isCheck, setIsCheck] = useState(false);
  const [timerOut, setTimerOut] = useState(false);
  const stopWorkout = useCallback(state.stopWorkout, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleExplain = useCallback(() => {
    pauseWorkout(timer);
  }, [pauseWorkout, timer]);
  const handleCheckStart = useCallback(() => {
    setIsCheck(true);
  }, []);
  const handleCheckFinish = useCallback(() => {
    setIsCheck(false);
  }, []);
  const progress = useMemo(() => {
    const total = +totalMinutes * 60 + +totalSeconds;
    const current = timer.minutes * 60 + timer.seconds;
    return 100 - current * 100 / total;
  }, [timer]);

  useEffect(() => {
    let _timer: ReturnType<typeof setTimeout>

    if (timerOut) finish();

    function finish() {
      if (isCheck) {
        _timer = setTimeout(finish);
      } else {
        stopWorkout();
        navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.STATISTICS}`));
      }
    }

    return () => {
      clearTimeout(_timer);
    }
  }, [isCheck, timerOut, navigate, stopWorkout]);

  useEffect(() => {
    let _timer = setTimeout(tick, 1000);
    function tick() {
      if (timer.minutes === 0 && timer.seconds === 0) {
        setTimerOut(true);

        return;
      }

      setTimer((prevTimer) => {
        let minutes;
        let seconds;

        if (prevTimer.seconds === 0) {
          minutes = prevTimer.minutes - 1;
          seconds = 59;
        } else {
          minutes = prevTimer.minutes;
          seconds = prevTimer.seconds - 1;
        }
        return { minutes, seconds };
      });
    }
    return () => {
      clearTimeout(_timer);
    }
  }, [navigate, stopWorkout, timer.minutes, timer.seconds]);

  return (
    <BaseWorkout
      title={`${printMinutes()}:${printSeconds()}`}
      onExplain={handleExplain}
      onCheckStart={handleCheckStart}
      onCheckFinish={handleCheckFinish}
      progress={progress}
    />
  );

  function printMinutes() {
    return timer.minutes;
  }

  function printSeconds() {
    return timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds;
  }

  function getMinutes(): number {
    return pausedOn ? pausedOn.minutes : +totalMinutes;
  }

  function getSeconds(): number {
    return pausedOn ? pausedOn.seconds : +totalSeconds;
  }
};
