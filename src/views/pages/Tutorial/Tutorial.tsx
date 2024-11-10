import { FC, useEffect, useRef, memo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "~/components/Header/Header";
import { Content } from "~/components/Content/Content";
import { BackButton } from "~/views/components/BackButton";
import CalcPresenter, {
  createCalcPresenter,
} from "./CalcPresenter/CalcPresenter";
import { useSelector } from "react-redux";
import {
  ExerciseName,
  getRandom,
  getRepSecondFactor,
  useAppDispatch,
} from "~/state/Workout";
import styles from "./Tutorial.module.scss";
import { startTutorial } from "~/state/Tutorial";

type TutorialParameters = {
  exercise: ExerciseName;
}

export const Tutorial: FC = memo(function TutorialPage() {
  const exerciseName = useParams<TutorialParameters>().exercise;

  if (!exerciseName) throw new Error("CalcPresenter factor not specified");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const canvas = useRef<HTMLDivElement>(null);
  const explanation = useRef<CalcPresenter | null>(null);

  const firstFactor = isNaN(parseInt(exerciseName))
    ? getRandom(13, 999)
    : parseInt(exerciseName);
  const secondFactor = useSelector(getRepSecondFactor) || getRandom(100, 999);

  useEffect(() => {
    dispatch(startTutorial({ firstFactor, secondFactor }));
  });

  const handleClick = useCallback(() => {
    if (explanation.current === null) return;
    explanation.current.nextStep();
  }, []);

  useEffect(() => {
    explanation.current = createCalcPresenter(
      firstFactor,
      secondFactor,
      canvas,
      {
        onFinish: () => {
          navigate(-1);
        },
      }
    );
    explanation.current.start();
  }, [firstFactor, secondFactor, navigate]);

  return (
    <>
      <Header renderMinorAction={BackButton}>×{exerciseName}</Header>
      <Content>
        <div
          className={styles.explanation}
          ref={canvas}
          onClick={handleClick}
        />
      </Content>
    </>
  );
});
