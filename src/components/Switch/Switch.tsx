import { memo, useLayoutEffect, useRef, useState } from "react";
import type { TouchEventHandler, MouseEventHandler, Touch } from "react";
import cn from "classnames";
import { gsap } from "gsap";

import { createEventMetaObject } from "~/utils";

import styles from "./Switch.module.scss";

import { SwitchProps } from "./types";

class AnimationAbrotError extends Error {
  constructor (message: string) {
    super();

    this.name = "AnimationAbortError";
    this.message = message;
  }
};

interface SwipeTouch
  extends Pick<
    Touch,
    "identifier" | "pageX" | "pageY" | "clientX" | "clientY"
  > {
  initialPageX: number;
  initialSwitcherXPercent: number;
  timeStart: number;
};

export const Switch = memo(function Switch(props: SwitchProps) {
  const { onChange, optionClassName } = props;
  const [ongoingSwipeTouch, setOngoingSwipeTouch] = useState<SwipeTouch>();
  const abortController = useRef<AbortController | null>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const switcherRef = useRef<HTMLLIElement>(null);
  const elem = {
    get list(): HTMLUListElement {
      if (!listRef.current) throw new Error("List hasn't been rendered");

      return listRef.current;
    },
    get switcher(): HTMLLIElement {
      if (!switcherRef.current)
        throw new Error("Switcher hasn't been rendered");

      return switcherRef.current;
    },
    get currActiveItemElem(): HTMLLIElement {
      return this.list.querySelector(`[data-id="${props.value}"]`) as HTMLLIElement;
    },
  };

  useLayoutEffect(() => {
    const options = Object.keys(props.options);

    gsap.set(switcherRef.current, {
      width: 100 / options.length + "%",
      xPercent: 100 * options.findIndex((option) => option === props.value),
    });
  }, [props.options, props.value]);

  const handleClick: MouseEventHandler<HTMLLIElement> = async (e) => {
    abortController.current?.abort();

    const nextActiveItemElem = e.currentTarget;
    const finalPosition = +(nextActiveItemElem.dataset.index ?? 0) * 100;

    try {
      if (elem.currActiveItemElem)
        elem.currActiveItemElem.dataset.active = "false";

      await moveSlider(finalPosition);

      nextActiveItemElem.dataset.active = "true";

      onChange(createEventMetaObject(nextActiveItemElem.dataset.id));
    } catch (err) {
      if (err instanceof AnimationAbrotError) {
        console.warn(err.message);
      } else {
        throw err;
      }
    }
  };
  const handleTouchStart: TouchEventHandler<HTMLUListElement> = async (e) => {
    if (
      !(
        e.changedTouches[0].target instanceof HTMLElement ||
        e.changedTouches[0].target instanceof SVGElement
      )
    )
      throw new Error("Touch target is not any markup language element");

    abortController.current?.abort();

    const newSwipeTouch = copyTouch(e.changedTouches[0]) as SwipeTouch;

    newSwipeTouch.timeStart = performance.now();
    newSwipeTouch.initialPageX = newSwipeTouch.pageX;
    newSwipeTouch.initialSwitcherXPercent = gsap.getProperty(
      elem.switcher,
      "xPercent"
    ) as number;

    setOngoingSwipeTouch(newSwipeTouch);

    const currentTarget = e.changedTouches[0].target.closest("li");

    if (currentTarget !== elem.switcher) return;

    const finalPosition = gsap.getProperty(elem.switcher, "xPercent") as number;

    try {
      if (elem.currActiveItemElem)
        elem.currActiveItemElem.dataset.active = "false";

      await moveSlider(finalPosition);
    } catch (err) {
      if (err instanceof AnimationAbrotError) {
        console.warn(err.message);
      } else {
        throw err;
      }
    }
  };
  const handleTouchEnd: TouchEventHandler<HTMLUListElement> = async (e) => {
    if (
      !(
        e.changedTouches[0].target instanceof HTMLElement ||
        e.changedTouches[0].target instanceof SVGElement
      )
    )
      throw new Error("Touch target is not any markup language element");

    e.preventDefault();

    if (!ongoingSwipeTouch) throw new Error("Switch hasn't been started");

    const currentTarget = e.changedTouches[0].target.closest("li");

    if (currentTarget === elem.switcher) {
      const offset = +gsap.getProperty(elem.switcher, "xPercent");
      const minLeftPos = 0;
      const maxRightPos = (Object.keys(props.options).length - 1) * 100;
      const leftPos = Math.floor(offset / 100) * 100;
      const rightPos = leftPos + 100;
      const deltaLeft = Math.abs(offset - leftPos);
      const deltaRight = Math.abs(offset - rightPos);
      const delta = e.changedTouches[0].pageX - ongoingSwipeTouch.initialPageX;
      const time = performance.now() - ongoingSwipeTouch.timeStart;
      const speedIndex = Math.round(delta / time);

      let finalPosition = (deltaLeft < deltaRight) ? leftPos : rightPos;
      finalPosition = finalPosition + speedIndex * 100;
      finalPosition =
        finalPosition < minLeftPos
          ? minLeftPos
          : finalPosition > maxRightPos
          ? maxRightPos
          : finalPosition;
      const nextItemIndex = finalPosition / 100;

      const nextActiveItemElem: HTMLLIElement = elem.list.querySelector(
        `[data-index="${nextItemIndex}"`
      ) as HTMLLIElement;

      try {
        if (elem.currActiveItemElem)
          elem.currActiveItemElem.dataset.active = "false";

        await moveSlider(finalPosition);

        nextActiveItemElem.dataset.active = "true";

        onChange(createEventMetaObject(nextActiveItemElem.dataset.id));
      } catch (err) {
        if (err instanceof AnimationAbrotError) {
          console.warn(err.message);
        } else {
          throw err;
        }
      }

      return;
    }

    const nextActiveItemElem = getTargetItemElem(
      ongoingSwipeTouch.clientX,
      ongoingSwipeTouch.clientY
    );

    if (!nextActiveItemElem) return;

    const finalPosition = +(nextActiveItemElem.dataset.index ?? 0) * 100;

    try {
      if (elem.currActiveItemElem)
        elem.currActiveItemElem.dataset.active = "false";

      await moveSlider(finalPosition);

      nextActiveItemElem.dataset.active = "true";

      onChange(createEventMetaObject(nextActiveItemElem.dataset.id));
    } catch (err) {
      if (err instanceof AnimationAbrotError) {
        console.warn(err.message);
      } else {
        throw err;
      }
    }
  };
  const handleTouchCancel = handleTouchEnd;
  const handleTouchMove: TouchEventHandler<HTMLUListElement> = async (e) => {
    if (
      !(
        e.changedTouches[0].target instanceof HTMLElement ||
        e.changedTouches[0].target instanceof SVGElement
      )
    )
      throw new Error("Touch target is not any markup language element");

    if (!ongoingSwipeTouch) throw new Error("Switch hasn't been started");

    const newSwipeTouch = copyTouch(e.changedTouches[0]) as SwipeTouch;

    newSwipeTouch.initialPageX = ongoingSwipeTouch.initialPageX;
    newSwipeTouch.initialSwitcherXPercent =
      ongoingSwipeTouch.initialSwitcherXPercent;
    newSwipeTouch.timeStart = ongoingSwipeTouch.timeStart;

    const currentTarget = e.changedTouches[0].target.closest("li");

    if (currentTarget === elem.switcher) {
      const deltaX = newSwipeTouch.pageX - ongoingSwipeTouch.initialPageX;
      const switcherWidth = elem.switcher.getBoundingClientRect().width;
      const deltaXPercent = (deltaX * 100) / switcherWidth;

      const xPercent =
        newSwipeTouch.initialSwitcherXPercent + deltaXPercent

      const min = 0;
      const max = (Object.keys(props.options).length - 1) * 100;

      try {
        await moveSlider(
          xPercent < min ? min : xPercent > max ? max : xPercent
        );
      } catch (err) {
        if (err instanceof AnimationAbrotError) {
          console.warn(err.message);
        } else {
          throw err;
        }
      }
    }

    setOngoingSwipeTouch(newSwipeTouch);
  };

  return (
    <div className={cn(props.className, styles.switch)}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <ul
        ref={listRef}
        className={styles.list}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onTouchMove={handleTouchMove}
      >
        <li
          ref={switcherRef}
          className={styles.switcher}
        />
        {Object.entries(props.options).map(([id, title], index) => {
          return (
            <li
              key={id}
              className={cn(
                styles.option,
                id === props.value && "active",
                optionClassName
              )}
              data-id={id}
              data-active={id === props.value}
              data-index={index}
              onClick={handleClick}
            >
              <p className={styles.optionContent}>
                {typeof title === "function" ? title({}) : title}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );

  function getTargetItemElem(
    clientX: number,
    clientY: number
  ): HTMLLIElement | null {
    let nextActiveItemElem: HTMLLIElement | null =
      document.elementFromPoint(clientX, clientY)?.closest("li") || null;

    if (!nextActiveItemElem || !elem.list.contains(nextActiveItemElem)) {
      return null;
    }

    if (nextActiveItemElem === elem.switcher) {
      elem.switcher.hidden = true;

      nextActiveItemElem =
        document.elementFromPoint(clientX, clientY)?.closest("li") || null;

      elem.switcher.hidden = false;
    }

    return nextActiveItemElem;
  }

  function moveSlider(position: number) {
    return new Promise((resolve, reject) => {
      if (abortController.current) abortController.current.abort();

      abortController.current = new AbortController();
      abortController.current.signal.addEventListener("abort", () => {
        reject(new AnimationAbrotError("Abort animation error"));
      });

      gsap
        .to(elem.switcher, {
          xPercent: position,
          duration: .3,
        })
        .then(() => {
          resolve(true);
        });
    });
  }
});

export function copyTouch({
  identifier,
  pageX,
  pageY,
  clientX,
  clientY,
}: Touch): SwipeTouch {
  return { identifier, pageX, pageY, clientX, clientY } as SwipeTouch;
}
