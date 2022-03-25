import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../views.module.scss';

export const Start: FC = () => {
  return (
    <main className={styles.view}>
      <h1>Start View</h1>
      <Link to="/game-settings">Take exercise</Link>
      <Link to="/about">About</Link>
      <Link to="/overview">Overview</Link>
    </main>
  );
};
