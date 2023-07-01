import { memo, FC, MouseEvent, useCallback, useState } from 'react';
import type { Touch, TouchEvent, TouchEventHandler } from 'react';
import cn from 'classnames';
import { IWheelProps } from 'src/components/Wheel/types';
import { createEventMetaObject } from 'src/utils';
import styles from './Wheel.module.scss';
import _ from 'lodash';
import { Protector } from './components/Protector/Protector';

interface RelativeTouch extends Pick<Touch, 'identifier' | 'pageX' | 'pageY'> {
  initialYpoint: number;
  deltaY: number;
};

export const Wheel: FC<IWheelProps<any>> = memo(function Wheel(props) {
  const { onSelect, options: _options, value, selectType = 'auto' } = props;
  const handleClick = useCallback(_handleClick, [onSelect, value]);
  const [activeValueIndex, setActiveValueIndex] = useState(Object.keys(_options).indexOf(value));
  const [ongoingTouches, setOngoingTouches] = useState<Array<RelativeTouch>>([]);
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

    const newActiveIndex = calcNewActiveIndex(activeValueIndex, delta);

    if (selectType === 'auto') {
      onSelect(createEventMetaObject(options[newActiveIndex][0]));
    }

    setActiveValueIndex(newActiveIndex);
  }, 100), [activeValueIndex, value]);
  const calcNewActiveIndex = useCallback((index: number, delta: number) => {
    let newIndex = index - delta;

    if (newIndex < 0) {
      newIndex = lastValueIndex;
    } else if (newIndex > lastValueIndex) {
      newIndex = 0;
    }

    return newIndex;
  }, [lastValueIndex]);
  const ongoingTouchIndexById = useCallback((idToFind) => {
    for (let i = 0; i < ongoingTouches.length; i++) {
      if (ongoingTouches[i].identifier === idToFind) {
        return i;
      }
    }
    return -1;
  }, [ongoingTouches]);
  const handleTouchStart = useCallback((e: TouchEvent) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const newTouch = copyTouch(e.changedTouches[i]) as RelativeTouch;

      newTouch.initialYpoint = newTouch.pageY;
      newTouch.deltaY = 0;

      setOngoingTouches([...ongoingTouches, newTouch]);
    }
  }, [ongoingTouches]);
  const handleTouchEnd = useCallback<TouchEventHandler<HTMLDivElement>>((e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      let idx = ongoingTouchIndexById(e.changedTouches[i].identifier);

      if (idx >= 0) {
        const touches = [...ongoingTouches];

        touches.splice(idx, 1);

        setOngoingTouches(touches);
      }
    }
  }, [ongoingTouches]);
  const handleTouchCancel = handleTouchEnd;
  const handleTouchMove = useCallback<TouchEventHandler<HTMLDivElement>>((e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const idx = ongoingTouchIndexById(e.changedTouches[i].identifier);

      if (idx >= 0) {
        const touches = [...ongoingTouches];
        const newTouch = copyTouch(e.changedTouches[i]) as RelativeTouch;

        newTouch.initialYpoint = touches[idx].initialYpoint;
        newTouch.deltaY = Math.round((newTouch.initialYpoint - newTouch.pageY) / 75);

        if (touches[idx].deltaY !== newTouch.deltaY) {
          const delta = touches[idx].deltaY - newTouch.deltaY;

          const newActiveIndex = calcNewActiveIndex(activeValueIndex, delta);

          if (selectType === 'auto') {
            onSelect(createEventMetaObject(options[newActiveIndex][0]));
          }

          setActiveValueIndex(newActiveIndex);
        }

        touches.splice(idx, 1, newTouch);

        setOngoingTouches(touches);
      }
    }
  }, [activeValueIndex, lastValueIndex, onSelect, options, selectType, touchIndex]);

  return (
    <div
      className={cn(props.className, styles.wheel, styles[props.size])}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
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

  function renderItem([id, title]: [string, string], pos: 'prev' | 'curr' | 'next') {
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
});

function copyTouch({ identifier, pageX, pageY }: Touch) {
  return { identifier, pageX, pageY };
}