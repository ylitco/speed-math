import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUrl } from 'src/utils';
import { GAME_MODE } from 'src/state/constants';
import { VIEW } from 'src/views/constants';
import { StateContext } from 'src/state';

export const useStartWorkoutCallback = () => {
  const navigate = useNavigate();
  const { settings: { local: { gameMode } }, startWorkout } = useContext(StateContext);

  return useCallback(() => {
    if (gameMode === GAME_MODE.TIME) navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.TIME_WORKOUT}`));

    if (gameMode === GAME_MODE.REPS) navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.REPS_WORKOUT}`));

    if (gameMode === GAME_MODE.FREE) navigate(getUrl(`${VIEW.WORKOUT}/${VIEW.FREE_WORKOUT}`));

    startWorkout();
  }, [gameMode, navigate, startWorkout]);
}
