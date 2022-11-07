import React, {
  FC,
  useContext,
  useEffect,
  useRef,
  memo,
  useCallback,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { BackButton } from 'src/views/components/BackButton';
import { StateContext } from 'src/state';
import { getRandom } from 'src/utils';
import styles from './Explanation.module.scss';
import CalcPresenter, { createCalcPresenter } from './CalcPresenter/CalcPresenter';

export const Explanation: FC = memo(() => {
  const navigate = useNavigate();
  const { workout } = useContext(StateContext);
  const exercise = useParams().exercise;
  if (!exercise) throw new Error('CalcPresenter factor not specified'); // @todo customize error object
  const example = useExample(workout?.secondFactor);
  const canvas = useRef<HTMLDivElement>(null);
  const explanation = useRef<CalcPresenter | null>(null);
  const handleClick = useCallback(() => {
    if (explanation.current === null) return;
    explanation.current.nextStep();
  }, []);

  useEffect(() => {
    explanation.current = createCalcPresenter(+exercise, example, canvas, { onFinish: () => { navigate(-1) } });
    explanation.current.start();
  }, [example, exercise, navigate]);

  return (
    <>
      <Header renderMinorAction={BackButton}>×{exercise}</Header>
      <Content>
        <div className={styles.explanation} ref={canvas} onClick={handleClick} />
      </Content>
    </>
  );
});

function useExample(factor: number | undefined) {
  const example = useRef(!factor ? getRandom(100, 999) : factor);

  return example.current;
}
