import React, { FC, MouseEvent, useCallback, useState } from 'react';
import cn from 'classnames';
import { IWheelProps } from 'src/components/Wheel/types';
import { createEventMetaObject } from 'src/utils';
import styles from './Wheel.module.scss';
import _ from 'lodash';
import { Protector } from './components/Protector/Protector';

export const Wheel: FC<IWheelProps<any>> = (props) => {
  const { onSelect, options: _options, value, selectType = 'auto' } = props;
  const handleClick = useCallback(_handleClick, [onSelect, value]);
  const [activeValueIndex, setActiveValueIndex] = useState(Object.keys(_options).indexOf(value));
  const [touchIndex, setTouchIndex] = useState(0);
  const lastValueIndex = Object.keys(_options).length - 1;
  const options = Object.entries(_options);
  const active = options[activeValueIndex];
  const topLogicalIndex = activeValueIndex - 1;
  const topActualIndex = topLogicalIndex < 0 ? lastValueIndex : topLogicalIndex;
  const visibleTop = options[topActualIndex];
  const bottomLogicalIndex = activeValueIndex + 1;
  const bottomActualIndex = bottomLogicalIndex > lastValueIndex ? 0 : bottomLogicalIndex;
  const visibleBottom = options[bottomActualIndex];
  const frame = [visibleTop, active, visibleBottom];
  const handleWheel = useCallback(_.throttle((e: any) => {
    if (Math.abs(e.deltaY) < 100) return;

    const delta = Math.floor(e.deltaY / 100);

    let newActiveIndex = activeValueIndex - delta;

    if (newActiveIndex < 0) {
      newActiveIndex = lastValueIndex;
    } else if (newActiveIndex > lastValueIndex) {
      newActiveIndex = 0;
    }

    if (selectType === 'auto') {
      onSelect(createEventMetaObject(options[newActiveIndex][0]));
    }

    setActiveValueIndex(newActiveIndex);
  }, 100), [activeValueIndex, value]);
  const handleTouchMove = useCallback(_.throttle((e: any) => {
    const newTouchIndex = Math.ceil(e.targetTouches[0].clientY / 100);
    let delta = 0;

    if (newTouchIndex > touchIndex) {
      delta -= 1;
    } else {
      delta += 1;
    }

    setTouchIndex(newTouchIndex);

    let newActiveIndex = activeValueIndex - delta;

    if (newActiveIndex < 0) {
      newActiveIndex = lastValueIndex;
    } else if (newActiveIndex > lastValueIndex) {
      newActiveIndex = 0;
    }

    if (selectType === 'auto') {
      onSelect(createEventMetaObject(options[newActiveIndex][0]));
    }

    setActiveValueIndex(newActiveIndex);
  }, 300), [activeValueIndex]);

  return (
    <div
      className={cn(props.className, styles.wheel, styles[props.size])}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
    >
      <div className={cn(styles.border, styles.left)} />
      <div className={styles.list}>
        {renderItem(frame[0], 'prev')}
        {renderItem(frame[1], 'curr')}
        {renderItem(frame[2], 'next')}
      </div>
      <div className={cn(styles.border, styles.right)} />
    </div>
  );

  function renderItem([id , title]: [string , string], pos: 'prev' | 'curr' | 'next') {
    return (
      <>
        <Protector size={props.size} />
        <div className={cn(styles.itemOuterShadow, styles[pos])} onClick={handleClick} data-value={id}>
          <div className={styles.itemInnerShadow}>
            <div className={styles.item}>{title}</div>
          </div>
        </div>
        <Protector size={props.size} />
      </>
    );
  }

  function _handleClick(e: MouseEvent<HTMLDivElement>) {
    onSelect(createEventMetaObject(e.currentTarget.dataset['value']))
  }
};
