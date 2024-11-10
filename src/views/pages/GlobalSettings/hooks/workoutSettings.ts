import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  CheckMode,
  InputMode,
  Minutes,
  Seconds,
  getCheckMode,
  getInputMode,
  getMinutes,
  getSeconds,
  getWorkoutReps,
  setCheckMode,
  setInputMode,
  setMinutes,
  setReps,
  setSeconds,
  useAppDispatch,
} from "~/state/Workout";
import { REPS } from "~/state/constants";
import { IEventMetaObject } from "~/types";

type RepNames = typeof REPS[keyof typeof REPS];
type WokroutSettings = [
  [CheckMode, (e: IEventMetaObject<CheckMode>) => void],
  [InputMode, (e: IEventMetaObject<InputMode>) => void],
  [Minutes, (e: IEventMetaObject<Minutes>) => void],
  [Seconds, (e: IEventMetaObject<Seconds>) => void],
  [RepNames, (e: IEventMetaObject<RepNames>) => void],
];


export function useWorkoutSettings(): WokroutSettings {
  const dispatch = useAppDispatch();
  const checkMode = useSelector(getCheckMode);
  const handleCheckModeChange = useCallback(
    (e: IEventMetaObject<CheckMode>) => {
      dispatch(setCheckMode(e.value));
    },
    [dispatch]
  );
  const inputMode = useSelector(getInputMode);
  const handleInputModeChange = useCallback(
    (e: IEventMetaObject<InputMode>) => {
      dispatch(setInputMode(e.value));
    },
    [dispatch]
  );
  const minutes = useSelector(getMinutes);
  const handleMinutesChange = useCallback(
    (e: IEventMetaObject<Minutes>) => {
      dispatch(setMinutes(+e.value));
    },
    [dispatch]
  );
  const seconds = useSelector(getSeconds);
  const handleSecondsChange = useCallback(
    (e: IEventMetaObject<Seconds>) => {
      dispatch(setSeconds(+e.value));
    },
    [dispatch]
  );
  const reps = useSelector(getWorkoutReps).toString();
  const handleRepsChange = useCallback(
    (e: IEventMetaObject<RepNames>) => {
      dispatch(setReps(+e.value));
    },
    [dispatch]
  );

  return [
    [checkMode, handleCheckModeChange],
    [inputMode, handleInputModeChange],
    [minutes, handleMinutesChange],
    [seconds, handleSecondsChange],
    [reps, handleRepsChange],
  ];
}
