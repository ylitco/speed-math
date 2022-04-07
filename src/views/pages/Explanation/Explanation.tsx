import React, { FC } from 'react';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { BackButton } from 'src/views/components/BackButton';

export const Explanation: FC = () => {
  return (
    <>
      <Header renderMinorAction={BackButton}>@TODO</Header>
      <Content>
        <h1>Explanation View</h1>
      </Content>
    </>
  );
};
