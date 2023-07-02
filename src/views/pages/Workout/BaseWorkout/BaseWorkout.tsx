import { memo, FC } from "react";
import { WorkoutHeader } from "src/components/Header/Header";
import { IBaseWorkout } from "./types";
import { BaseWorkoutContent as WorkoutContent } from "./Content";

export const BaseWorkout: FC<IBaseWorkout> = memo(function BaseWorkout(props) {
  return (
    <>
      <WorkoutHeader />
      <WorkoutContent
        onCheckStart={props.onCheckStart}
        onCheckFinish={props.onCheckFinish}
      />
    </>
  );
});
