import React, { FC, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { BackButton } from 'src/views/components/BackButton';
import { ExplainButton } from 'src/views/components/ExplainButton';
import { Button } from 'src/components/Button/Button';
import { Content } from 'src/components/Content/Content';
import { StateContext } from 'src/state';
import { getUrl } from 'src/utils';
import { VIEW } from 'src/views/constants';
import { useStartWorkoutCallback } from 'src/hooks/useStartWorkoutEffect';

export const Statistics: FC = () => {
  const navigate = useNavigate();
  const { finishWorkout } = useContext(StateContext);
  const handleWorkoutRestart = useStartWorkoutCallback();
  const handleWorkoutFinish = useCallback(() => {
    navigate(getUrl(VIEW.START));
    finishWorkout();
  }, [navigate, finishWorkout]);

  return (
    <>
      <Header renderMajorAction={ExplainButton} renderMinorAction={BackButton}>Result</Header>
      <Content>
        <h1>Statistics View</h1>
        <Button onClick={handleWorkoutRestart}>Try Again</Button>
        <Button onClick={handleWorkoutFinish}>Go to main menu</Button>
      </Content>
    </>
  );
};
