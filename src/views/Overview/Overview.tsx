import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'src/components/Button/Button';
import { CloseIcon } from 'src/icons/Close/Close';

import { BUTTON_TYPE } from 'src/components/Button/types';

import styles from '../views.module.scss';
import localStyles from './Overview.module.scss';

export const Overview: FC = () => {
  const navigate = useNavigate();
  const handleClose = useCallback(_handleClose, [navigate]);

  return (
    <main className={styles.view}>
      <video className={localStyles.overview} />
      <Button className={localStyles.close} type={BUTTON_TYPE.LIMPID} onClick={handleClose}>
        <CloseIcon />
      </Button>
    </main>
  );

  function _handleClose() {
    navigate(-1);
  }
};
