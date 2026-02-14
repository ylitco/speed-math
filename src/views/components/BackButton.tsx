import { FC, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { ViewContext } from '~/views/Views';
import { VIEW } from '~/views/constants';
import { getUrl } from '~/utils';
import {
  finishSet,
  getSetStatus,
  startTimer,
  stopTimer,
  useAppDispatch,
} from '~/state/Workout';
import { useSelector } from 'react-redux';
import { finishTutorial } from '~/state/Tutorial';

export const BackButton: FC = () => {
  const { current, previous } = useContext(ViewContext);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSetActive = useSelector(getSetStatus);
  const isDuringWorkout =
    current &&
    (current === VIEW.STATISTICS || current.startsWith(VIEW.WORKOUT));
  const isAfterWorkout =
    current &&
    previous &&
    current === VIEW.LOCAL_SETTINGS &&
    (previous === VIEW.STATISTICS ||
      previous.startsWith(VIEW.WORKOUT) ||
      previous === VIEW.GLOBAL_SETTINGS);
  const isTutorial = current && current.startsWith(VIEW.EXPLANATION);
  const handleClick = useCallback(() => {
    if (isDuringWorkout) {
      dispatch(finishSet());
      dispatch(stopTimer());
      return navigate(getUrl(VIEW.LOCAL_SETTINGS));
    }

    if (isAfterWorkout) return navigate(getUrl(VIEW.START));

    if (isTutorial) {
      dispatch(finishTutorial());
      if (isSetActive) dispatch(startTimer());
    }

    return navigate(-1);
  }, [
    navigate,
    isDuringWorkout,
    isAfterWorkout,
    dispatch,
    isTutorial,
    isSetActive,
  ]);

  return (
    <Button onClick={handleClick}>
      <i className="speed-math-back text-icon-xs inner-shadow-dark" />
    </Button>
  );
};
