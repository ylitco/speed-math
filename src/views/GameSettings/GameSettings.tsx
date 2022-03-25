import React, { FC } from 'react';
import styles from '../views.module.scss';
import { Link } from 'react-router-dom';

export const GameSettings: FC = () => {
  return (
    <main className={styles.view}>
      <h1>Game Settings View</h1>
      <Link to="/game">Game</Link>
      <Link to="/explanation">Explanation</Link>
    </main>
  );
};
