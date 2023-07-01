import React, { FC, useRef, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Start } from 'src/views/pages/Start/Start';
import { Overview } from 'src/views/pages/Overview/Overview';
import { About } from 'src/views/pages/About/About';
import { LocalSettings } from 'src/views/pages/LocalSettings/LocalSettings';
import { GlobalSettings } from 'src/views/pages/GlobalSettings/GlobalSettings';
import { Workout } from './pages/Workout/Workout';
import { TimeWorkout } from 'src/views/pages/Workout/TimeWorkout/TimeWorkout';
import { RepsWorkout } from './pages/Workout/RepsWorkout/RepsWorkout';
import { FreeWorkout } from './pages/Workout/FreeWorkout/FreeWorkout';
import { Tutorial } from 'src/views/pages/Tutorial/Tutorial';
import { Statistics } from 'src/views/pages/Statistics/Statistics';
import { IView } from './types';
import { VIEW } from './constants';

export const ViewContext = React.createContext<IView>({
  current: null,
  previous: null,
});

export const Views: FC = () => {
  const current = useLocation().pathname.slice(1);
  const previous = usePrevious(current);

  return (
    <ViewContext.Provider value={{ current, previous }}>
      <Routes>
        <Route path={VIEW.START} element={<Start />} />
        <Route path={VIEW.OVERVIEW} element={<Overview />} />
        <Route path={VIEW.GLOBAL_SETTINGS} element={<GlobalSettings />} />
        <Route path={VIEW.ABOUT} element={<About />} />
        <Route path={VIEW.LOCAL_SETTINGS} element={<LocalSettings />} />
        <Route path={VIEW.WORKOUT} element={<Workout />}>
          <Route path={VIEW.TIME_WORKOUT} element={<TimeWorkout />} />
          <Route path={VIEW.REPS_WORKOUT} element={<RepsWorkout />} />
          <Route path={VIEW.FREE_WORKOUT} element={<FreeWorkout />} />
          <Route path={VIEW.STATISTICS} element={<Statistics />} />
        </Route>
        <Route
          path={`${VIEW.EXPLANATION}/:exercise`}
          element={<Tutorial />}
        />
        <Route path="*" element={<Navigate to={VIEW.START} replace />} />
      </Routes>
    </ViewContext.Provider>
  );
};

function usePrevious (value: any) {
  const ref = useRef<any>();

  const current = ref.current;

  useEffect(() => {
    ref.current = value;
  });

  return current;
}
