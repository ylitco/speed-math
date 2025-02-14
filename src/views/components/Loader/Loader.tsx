import { FC } from 'react';
import { Mind } from '~/icons/World/Mind';
import styles from './Loader.module.scss';

export const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <Mind />
    </div>
  );
};
