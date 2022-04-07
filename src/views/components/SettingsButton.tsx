import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/Button/Button';
import { SettingsIcon } from 'src/icons/Settings/Settings';
import { VIEW } from 'src/views/constants';
import { getUrl } from 'src/utils';

export const SettingsButton: FC = () => {
  return (
    <Link to={getUrl(VIEW.GLOBAL_SETTINGS)}>
      <Button>
        <SettingsIcon />
      </Button>
    </Link>
  );
}
