import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { VIEW } from "~/views/constants";
import { getUrl } from "~/utils";
import { useSelector } from "react-redux";
import { getSetStatus } from "~/state/Workout";

export const Workout: FC = () => {
  const isSetActive = useSelector(getSetStatus);

  if (!isSetActive) {
    return <Navigate to={getUrl(VIEW.LOCAL_SETTINGS)} />;
  }

  return <Outlet />;
};
