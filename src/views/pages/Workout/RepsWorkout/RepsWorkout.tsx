import React, { FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseWorkout } from 'src/views/pages/Workout/BaseWorkout/BaseWorkout';
import { StateContext } from 'src/state';
import { IRepsWorkout } from 'src/state/types';
import { REPS } from 'src/state/constants';
import { VIEW } from 'src/views/constants';
import { getUrl } from 'src/utils';

export const RepsWorkout: FC = () => {
  const state = useContext(StateContext);
  const { workout, pauseWorkout, settings: { global: { reps: totalReps } } } = state;
  const { pausedOn } = workout as IRepsWorkout;
  const navigate = useNavigate();
  const initReps = pausedOn ? +pausedOn : +REPS[1];
  const [reps, setReps] = useState<number>(initReps);
  const stopWorkout = useCallback(state.stopWorkout, []); // eslint-disable-line react-hooks/exhaustive-deps
  const handleExplain = useCallback(() => {
    pauseWorkout(reps);
  }, [pauseWorkout, reps]);

  const handleCheckFinish = useCallback(() => {
    if (reps === +totalReps) {
      stopWorkout();
      return navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.STATISTICS}`));
    }
    setReps((prevReps) => {
      return prevReps + 1;
    });
  },[reps, totalReps, stopWorkout, navigate]);

  return (
    <BaseWorkout title={`${reps} - ${totalReps}`} onCheckFinish={handleCheckFinish} onExplain={handleExplain} />
  );
};
