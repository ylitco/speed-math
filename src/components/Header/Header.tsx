import React, { FC } from 'react';
import { IHeaderProps } from './types';
import styles from './Header.module.scss';

export const Header: FC<IHeaderProps> = (props) => {

  return (
    <header className={styles.header}>
      <div className={styles.action}>{props.renderMinorAction && props.renderMinorAction()}</div>
      <h1 className={styles.title}>{props.children}</h1>
      <div className={styles.action}>{props.renderMajorAction && props.renderMajorAction()}</div>
    </header>
  );
};
