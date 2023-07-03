import { memo, FC } from "react";
import { WorkoutHeader } from "src/components/Header/Header";
import { BaseWorkoutContent as WorkoutContent } from "./Content";

export const BaseWorkout: FC = memo(function BaseWorkout() {
  return (
    <>
      <WorkoutHeader />
      <WorkoutContent />
    </>
  );
});
