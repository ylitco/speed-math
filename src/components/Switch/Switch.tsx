import { memo, useRef, useState } from "react";
import type { TouchEventHandler, MouseEventHandler } from "react";
import cn from "classnames";
import { gsap } from "gsap";

import { createEventMetaObject } from "src/utils";

import styles from "./Switch.module.scss";
import { ISwitchProps } from "./types";

class AnimationAbrotError extends Error {
  constructor (message: string) {
    super();

    this.name = "AnimationAbortError";
    this.message = message;
  }
}

export const Switch = memo(function Switch(props: ISwitchProps) {
  const { onChange, optionClassName } = props;
  const [_, setOngoingSwipeTouch] = useState<Touch>();
  const abortController = useRef<AbortController | null>(null);
  const optionWidth = 100 / Object.keys(props.options).length;

  const handleClick: MouseEventHandler<HTMLLIElement> = async (e) => {
    abortController.current?.abort();

    const { listElem, currActiveItemElem, nextActiveItemElem } = selectElems(
      e.target
    );

    if (nextActiveItemElem === currActiveItemElem) return;

    tapSwipe(currActiveItemElem, nextActiveItemElem, listElem);
  };
  const handleTouchStart: TouchEventHandler<HTMLUListElement> = async (e) => {
    abortController.current?.abort();

    const { listElem, currActiveItemElem, nextActiveItemElem } = selectElems(
      e.target
    );

    if (nextActiveItemElem === currActiveItemElem) {
      const newSwipeTouch = { ...e.changedTouches[0] } as Touch;

      alert("Swipe switch started");

      setOngoingSwipeTouch(newSwipeTouch);

      return;
    }

    tapSwipe(currActiveItemElem, nextActiveItemElem, listElem);
  };
  const handleTouchEnd: TouchEventHandler<HTMLUListElement> = (e) => {
    e.preventDefault();
    setOngoingSwipeTouch(undefined);
  };
  const handleTouchCancel = handleTouchEnd;
  const handleTouchMove: TouchEventHandler<HTMLUListElement> = (e) => {
    const newSwipeTouch = { ...e.changedTouches[0] } as Touch;

    setOngoingSwipeTouch(newSwipeTouch);
  };

  return (
    <div className={cn(props.className, styles.switch)}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <ul
        className={styles.list}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
        onTouchMove={handleTouchMove}
      >
        {Object.entries(props.options).map(([id, title]) => {
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

  function selectElems(elem: EventTarget) {
    if (!(elem instanceof HTMLElement || elem instanceof SVGElement))
      throw new Error();

    const nextActiveItemElem = elem.closest("li");

    if (!nextActiveItemElem) throw new Error();

    const listElem = elem.closest("ul");

    if (!listElem) throw new Error();

    const currActiveItemElem =
      listElem.querySelector<HTMLLIElement>("[data-active=true]");

    if (!currActiveItemElem) throw new Error();

    return { listElem, currActiveItemElem, nextActiveItemElem };
  }

  async function tapSwipe(
    from: HTMLLIElement,
    to: HTMLLIElement,
    inside: HTMLUListElement
  ) {
    try {
      await swipe(from, to, inside);

      if (from.dataset.id === to.dataset.id) {
        to.classList.add("active");
      }

      onChange(createEventMetaObject(to.dataset.id));
    } catch (err) {
      if (err instanceof AnimationAbrotError) {
        console.warn(err.message);
      } else {
        throw err;
      }
    }
  }

  function swipe(
    from: HTMLLIElement,
    to: HTMLLIElement,
    inside: HTMLUListElement
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (abortController.current) {
        abortController.current.abort();
      }

      abortController.current = new AbortController();
      abortController.current.signal.addEventListener("abort", () => {
        reject(new AnimationAbrotError("Abort animation error"));
      });

      const listBoxWidth = inside.getBoundingClientRect().width;

      const slider: HTMLLIElement = from.cloneNode(true) as HTMLLIElement;
      const sliderContent = slider.querySelector<HTMLParagraphElement>(
        `.${styles.optionContent}`
      );

      if (sliderContent) sliderContent.innerText = "";

      const id = `id-${new Date().getTime().toString()}`;

      slider.setAttribute("id", id);
      slider.classList.add(styles.optionSlider);

      slider.style.position = "absolute";
      slider.style.width = `${optionWidth}%`;
      slider.style.left = `${(from.offsetLeft * 100) / listBoxWidth}%`;

      inside.insertAdjacentElement("afterbegin", slider);

      from.classList.remove("active");

      gsap
        .to(`#${id}`, {
          left: (to.offsetLeft * 100) / listBoxWidth + "%",
          duration: .3,
        })
        .then(() => {
          resolve(true);

          slider.remove();
        });
    });
  }
});
