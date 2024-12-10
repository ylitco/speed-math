import { memo, FC, MouseEvent, useCallback, useState, useRef } from "react";
import type { PointerEventHandler, Touch, WheelEventHandler } from "react";
import cn from "classnames";
import { IWheelProps } from "~/components/Wheel/types";
import { copyTouch, createEventMetaObject } from "~/utils";
import styles from "./Wheel.module.scss";
import { Protector } from "./components/Protector/Protector";

interface RelativeTouch extends Pick<Touch, "identifier" | "pageX" | "pageY"> {
  initialYpoint: number;
  deltaY: number;
}

export const Wheel: FC<IWheelProps<any>> = memo(function Wheel(props) {
  const [mark, setMark] = useState(0);
  const { onSelect, options: _options, value, selectType = "auto" } = props;
  const [innerValue, setInnerValue] = useState(value);
  const handleClick = useCallback(_handleClick, [onSelect]);
  const activeValueIndexRef = useRef<number>(
    Object.keys(_options).indexOf(innerValue)
  );
  const lastValueIndex = Object.keys(_options).length - 1;
  const options = Object.entries(_options);
  const active = options[activeValueIndexRef.current];
  const topLogicalIndex = activeValueIndexRef.current - 1;
  const topActualIndex = topLogicalIndex < 0 ? lastValueIndex : topLogicalIndex;
  const visibleTop = options[topActualIndex];
  const bottomLogicalIndex = activeValueIndexRef.current + 1;
  const bottomActualIndex =
    bottomLogicalIndex > lastValueIndex ? 0 : bottomLogicalIndex;
  const visibleBottom = options[bottomActualIndex];
  const frame = [visibleTop, active, visibleBottom];
  const activePointerRef = useRef<RelativeTouch | null>(null);
  const calcNewActiveIndex = useCallback(
    (index: number, delta: number) => {
      let newIndex = index - delta;

      if (newIndex < 0) {
        newIndex = lastValueIndex;
      } else if (newIndex > lastValueIndex) {
        newIndex = 0;
      }

      return newIndex;
    },
    [lastValueIndex]
  );
  const handleWheel = useCallback<WheelEventHandler>(
    (e) => {
      const totalMark = (options.length - 1) * 100;
      let newMark = mark + e.deltaY;

      if (newMark > totalMark) {
        newMark = newMark - totalMark;
      } else if (newMark < 0) {
        newMark = totalMark + newMark;
      }

      setMark(newMark);

      const newActiveIndex = Math.round(newMark / 100);

      setInnerValue(options[newActiveIndex][0]);

      if (selectType === "auto") {
        onSelect(createEventMetaObject(options[newActiveIndex][0]));
      }

      activeValueIndexRef.current = newActiveIndex;
    },
    [onSelect, options, selectType]
  );

  const handlePointerDown = useCallback<PointerEventHandler>((e) => {
    const newTouch = {
      identifier: e.pointerId,
      pageX: e.pageX,
      pageY: e.pageY,
    } as RelativeTouch;

    newTouch.initialYpoint = newTouch.pageY;
    newTouch.deltaY = 0;

    activePointerRef.current = newTouch;

    document.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("pointerup", handlePointerUp);
    document.addEventListener("pointercancel", handlePointerCancel);
  }, []);
  const handlePointerUp = useCallback(() => {
    activePointerRef.current = null;

    document.removeEventListener("pointermove", handlePointerMove);
    document.removeEventListener("pointerup", handlePointerUp);
    document.removeEventListener("pointercancel", handlePointerUp);
  }, []);
  const handlePointerCancel = handlePointerUp;
  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const newTouch = copyTouch(e) as RelativeTouch;

      newTouch.initialYpoint = activePointerRef.current!.initialYpoint;
      newTouch.deltaY = Math.round(
        (newTouch.initialYpoint - newTouch.pageY) / 75
      );

      if (activePointerRef.current!.deltaY !== newTouch.deltaY) {
        const delta = activePointerRef.current!.deltaY - newTouch.deltaY;

        const newActiveIndex = calcNewActiveIndex(
          activeValueIndexRef.current!,
          delta
        );

        setInnerValue(options[newActiveIndex][0]);

        if (selectType === "auto") {
          onSelect(createEventMetaObject(options[newActiveIndex][0]));
        }

        activeValueIndexRef.current = newActiveIndex;
      }

      activePointerRef.current = newTouch;
    },
    [
      calcNewActiveIndex,
      onSelect,
      options,
      selectType,
    ]
  );

  return (
    <div
      className={cn(props.className, styles.wheel, styles[props.size])}
      onWheel={handleWheel}
      onPointerDown={handlePointerDown}
    >
      <div className={cn(styles.border, styles.left)} />
      <div className={styles.list}>
        {renderItem(frame[0], "prev")}
        {renderItem(frame[1], "curr")}
        {renderItem(frame[2], "next")}
      </div>
      <div className={cn(styles.border, styles.right)} />
    </div>
  );

  function renderItem(
    [id, title]: [string, string],
    pos: "prev" | "curr" | "next"
  ) {
    return (
      <>
        <Protector size={props.size} />
        <div
          className={cn(styles.itemOuterShadow, styles[pos])}
          onClick={handleClick}
          data-value={id}
        >
          <div className={styles.itemInnerShadow}>
            <div className={styles.item}>{title}</div>
          </div>
        </div>
        <Protector size={props.size} />
      </>
    );
  }

  function _handleClick(e: MouseEvent<HTMLDivElement>) {
    onSelect(createEventMetaObject(e.currentTarget.dataset["value"]));
  }
});
