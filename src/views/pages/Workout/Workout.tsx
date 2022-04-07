import React, { FC, useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { StateContext } from 'src/state';
import { VIEW } from 'src/views/constants';
import { getUrl } from 'src/utils';

export const Workout: FC = () => {
  const { workout } = useContext(StateContext);

  if (workout === null) {
    return <Navigate to={getUrl(VIEW.LOCAL_SETTINGS)} />
  }

  return (
    <Outlet />
  );
};
