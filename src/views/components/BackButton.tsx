import React, { FC, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'src/components/Button/Button';
import { BackIcon } from 'src/icons/Back/Back';
import { ViewContext } from 'src/views/Views';
import { VIEW } from 'src/views/constants';
import { getUrl } from 'src/utils';
import { StateContext } from 'src/state';

export const BackButton: FC = () => {
  const { current, previous } = useContext(ViewContext);
  const { finishWorkout } = useContext(StateContext);
  const navigate = useNavigate();
  const isDuringWorkout = current && (current === VIEW.STATISTICS || current.startsWith(VIEW.WORKOUT));
  const isAfterWorkout = current && previous && current === VIEW.LOCAL_SETTINGS && (
    previous === VIEW.STATISTICS || previous.startsWith(VIEW.WORKOUT) || previous === VIEW.GLOBAL_SETTINGS
  );
  const handleClick = useCallback(() => {
    if (isDuringWorkout) {
      finishWorkout();
      return navigate(getUrl(VIEW.LOCAL_SETTINGS));
    }

    if (isAfterWorkout) return navigate(getUrl(VIEW.START));

    return navigate(-1);
  }, [navigate, isDuringWorkout, isAfterWorkout, finishWorkout]);

  return (
    <Button onClick={handleClick}>
      <BackIcon />
    </Button>
  );
}
