import React, { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { VIEW } from 'src/views/constants';
import { getUrl } from 'src/utils';
import { useSelector } from 'react-redux';
import { getSetStatus } from 'src/state/Workout';

export const Workout: FC = () => {
  const isSetActive = useSelector(getSetStatus);

  if (!isSetActive) {
    return <Navigate to={getUrl(VIEW.LOCAL_SETTINGS)} />
  }

  return (
    <Outlet />
  );
};
