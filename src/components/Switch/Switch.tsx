import { memo, FC, useCallback, MouseEvent } from 'react';
import cn from 'classnames';

import { ISwitchProps } from 'src/components/Switch/types';

import { createEventMetaObject } from 'src/utils';

import styles from './Switch.module.scss';

export const Switch: FC<ISwitchProps> = memo(function Switch(props) {
  const { onChange } = props;
  const handleClick = useCallback(_handleClick, [onChange]);

  return (
    <div className={cn(props.className, styles.switch)}>
      {props.label && (
        <label className={styles.label}>{props.label}</label>
      )}
      <ul className={styles.list}>
        {Object.entries(props.options).map(([id, title]) => {
          return (
            <li
              key={id}
              className={cn(styles.item, id === props.value && styles.active)}
              data-id={id}
              onClick={handleClick}
            >
              {typeof title === 'function' ? title({
                className: id === props.value ? 'sm-active' : '',
              }) : title}
            </li>
          )
        })}
      </ul>
    </div>
  );

  function _handleClick(e: MouseEvent<HTMLLIElement>) {
    const { id } = e.currentTarget.dataset;

    onChange(createEventMetaObject(id));
  }
});
