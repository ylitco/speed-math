import { memo, FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Content.module.scss';

export const Content: FC<HTMLAttributes<HTMLElement>> = memo(function Content(props) {
  return (
    <main className={cn(styles.content, props.className)}>
      {props.children}
    </main>
  );
});
