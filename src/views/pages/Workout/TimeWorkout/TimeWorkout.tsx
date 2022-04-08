import React, { FC, useCallback, useContext, useEffect, useState } from 'react';
import { BaseWorkout } from 'src/views/pages/Workout/BaseWorkout/BaseWorkout';
import { StateContext } from 'src/state';
import { ITimeWorkout } from 'src/state/types';
import { VIEW } from 'src/views/constants';
import { useNavigate } from 'react-router-dom';
import { getUrl } from 'src/utils';

export const TimeWorkout: FC = () => {
  const navigate = useNavigate();
  const state = useContext(StateContext)
  const { workout, settings: { global: { minutes: totalMinutes, seconds: totalSeconds } } } = state;
  const { pausedOn } = workout as ITimeWorkout;
  const [timer, setTimer] = useState<{ minutes: number, seconds: number }>({ minutes: getMinutes(), seconds: getSeconds() });
  const stopWorkout = useCallback(state.stopWorkout, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let _timer = setTimeout(tick, 1000);
    function tick() {
      if (timer.minutes === 0 && timer.seconds === 1) {
        setTimeout(() => {
          stopWorkout();
          navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.STATISTICS}`));
        }, 1000);
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
    <BaseWorkout title={`${printMinutes()}:${printSeconds()}`} />
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
