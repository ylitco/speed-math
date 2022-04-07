import React, { FC, useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BaseWorkout } from 'src/views/pages/Workout/BaseWorkout/BaseWorkout';
import { StateContext } from 'src/state';
import { IRepsWorkout } from 'src/state/types';
import { REPS } from 'src/state/constants';
import { VIEW } from 'src/views/constants';
import { getUrl } from 'src/utils';

export const RepsWorkout: FC = () => {
  const { workout, settings: { global: { reps: totalReps } } } = useContext(StateContext);
  const { pausedOn } = workout as IRepsWorkout;
  const navigate = useNavigate();
  const initReps = pausedOn ? +pausedOn : +REPS[1];
  const [reps, setReps] = useState<number>(initReps);

  const handleCheck = useCallback(() => {
    if (reps === +totalReps) {
      return navigate(getUrl(VIEW.STATISTICS));
    }
    setReps((prevReps) => {
      return prevReps + 1;
    });
  },[reps, totalReps, navigate]);

  return (
    <BaseWorkout title={`${reps} - ${totalReps}`} onCheck={handleCheck} />
  );
};
