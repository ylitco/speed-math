import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '~/components/Button';
import { SettingsIcon } from '~/icons/Settings/Settings';
import { VIEW } from '~/views/constants';
import { getUrl } from '~/utils';

export const SettingsButton: FC = () => {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(getUrl(VIEW.GLOBAL_SETTINGS));
  }, [navigate]);

  return (
    <Button onClick={handleClick}>
      <SettingsIcon />
    </Button>
  );
};
