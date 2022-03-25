import React, { FC } from 'react';
import styles from '../views.module.scss'
import { Link } from 'react-router-dom';

export const Statistics: FC = () => {
  return (
    <main className={styles.view}>
      <h1>Statistics View</h1>
      <Link to="/game-settings">Try Again</Link>
    </main>
  );
};
