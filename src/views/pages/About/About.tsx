import React, { FC } from 'react';
import { Header } from 'src/components/Header/Header';
import { Content } from 'src/components/Content/Content';
import { SettingsButton } from 'src/views/components/SettingsButton';
import { BackButton } from 'src/views/components/BackButton';
import { TEXT } from 'src/views/pages/About/constants';
import styles from './About.module.scss';

/**
 * @todo
 *  1. Use Markdown in description
 *  2. Use internationalization
 */

export const About: FC = () => {
  return (
    <>
      <Header renderMajorAction={SettingsButton} renderMinorAction={BackButton}>About</Header>
      <Content className={styles.description}>
        <div className={styles.content}>{TEXT}</div>
      </Content>
    </>
  );
};
