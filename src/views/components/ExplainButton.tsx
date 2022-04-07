import React, { FC, HTMLAttributes } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'src/components/Button/Button';
import { InfoIcon } from 'src/icons/Info/Info';
import { VIEW } from 'src/views/constants';
import { BUTTON_TYPE } from 'src/components/Button/types';
import { getUrl } from 'src/utils';

export const ExplainButton: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <Link to={getUrl(VIEW.EXPLANATION)}>
      <Button type={BUTTON_TYPE.CIRCLE} onClick={props?.onClick}>
        <InfoIcon />
      </Button>
    </Link>
  );
}
