import React, { ChangeEvent, FC, MouseEvent, useCallback } from 'react';
import cn from 'classnames';
import { IWheelProps } from 'src/components/Wheel/types';
import { createEventMetaObject } from 'src/utils';
import styles from './Wheel.module.scss';

export const Wheel: FC<IWheelProps<any>> = (props) => {
  const { onSelect, options, value } = props;
  const handleChange = useCallback(_handleChange, [onSelect]);
  const handleClick = useCallback(_handleClick, [onSelect, value]);

  return (
    <div className={cn(props.className, styles.wheel)}>
      <select className={styles.list} value={value} onChange={handleChange}>
        {Object.entries(options).map(([id, title]) => {
          return (
            <option key={id} value={id} data-id={id} onClick={handleClick}>{title}</option>
          );
        })}
      </select>
    </div>
  );

  function _handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onSelect(createEventMetaObject(e.target.value));
  }

  function _handleClick(e: MouseEvent<HTMLOptionElement>) {
    if (e.currentTarget.value === value) {
      onSelect(createEventMetaObject(e.currentTarget.value));
    }
  }
};
