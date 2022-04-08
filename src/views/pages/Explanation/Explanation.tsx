import React, { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { BackButton } from 'src/views/components/BackButton';
import { StateContext } from 'src/state';
import { getRandom } from 'src/utils';

export const Explanation: FC = () => {
  const { workout } = useContext(StateContext);
  const { exercise } = useParams();
  const example = workout === null ? getRandom(100, 999) : workout.secondFactor;

  return (
    <>
      <Header renderMinorAction={BackButton}>×{exercise}</Header>
      <Content>
        <h1>{example}</h1>
      </Content>
    </>
  );
};
