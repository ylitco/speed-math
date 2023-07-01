import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUrl } from 'src/utils';
import { GAME_MODE } from 'src/state/constants';
import { VIEW } from 'src/views/constants';
import { useDispatch, useSelector } from 'react-redux';
import { getType, startSet, startTimer } from 'src/state/Workout';
import { AppDispatch } from 'src/state/store';

export const useStartWorkoutCallback = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const type = useSelector(getType);

  return useCallback(() => {
    if (type === GAME_MODE.TIME)
      navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.TIME_WORKOUT}`));

    if (type === GAME_MODE.REPS)
      navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.REPS_WORKOUT}`));

    if (type === GAME_MODE.FREE)
      navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.FREE_WORKOUT}`));

    dispatch(startSet());
    dispatch(startTimer());
  }, [type, navigate, dispatch]);
}
