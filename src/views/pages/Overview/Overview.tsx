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
  const handleVideoFinish = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Content>
      <video
        className={styles.overview}
        src="/about.mp4"
        autoPlay={true}
        onEnded={handleVideoFinish}
      >
        <source src="/about.mp4" type="video/mp4"></source>
        Sorry, your browser doesn't support videos. Write to the developer of
        this app, and in any way, very soon this overview will be uploaded on
        video hostings web sites
      </video>

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
