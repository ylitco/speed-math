import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Content } from "src/components/Content/Content";
import { Button } from "src/components/Button/Button";
import { CloseIcon } from "src/icons/Close/Close";
import { BUTTON_TYPE } from "src/components/Button/types";
import styles from "./Overview.module.scss";

export const Overview: FC = () => {
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Content>
      <video className={styles.overview} />
      <Button
        className={styles.close}
        type={BUTTON_TYPE.LIMPID}
        onClick={handleClose}
      >
        <CloseIcon />
      </Button>
    </Content>
  );
};
