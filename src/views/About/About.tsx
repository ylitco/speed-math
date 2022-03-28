import React, { FC } from 'react';
import cn from 'classnames';

import { TEXT } from 'src/views/About/constants';

import styles from '../views.module.scss';
import localStyles from './About.module.scss';

/**
 * @todo
 *  1. Use Markdown in description
 *  2. Use internationalization
 */

export const About: FC = () => {
  return (
    <main className={cn(styles.view, localStyles.description)}>
      <div className={localStyles.content}>{TEXT}</div>
    </main>
  );
};
