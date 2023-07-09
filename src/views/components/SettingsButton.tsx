import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'src/components/Button';
import { SettingsIcon } from 'src/icons/Settings/Settings';
import { VIEW } from 'src/views/constants';
import { getUrl } from 'src/utils';

export const SettingsButton: FC = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(getUrl(VIEW.GLOBAL_SETTINGS))
  }, [navigate]);

  return (
    <Button onClick={handleClick}>
      <SettingsIcon />
    </Button>
  );
}
