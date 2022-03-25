import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../views.module.scss';

export const Game: FC = () => {
  return (
    <main className={styles.view}>
      <h1>Game View</h1>
      <Link to="/statistics">Statistics</Link>
    </main>
  );
};
