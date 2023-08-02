import { memo, useRef, useState } from "react";
import type { TouchEventHandler, MouseEventHandler } from "react";
import cn from "classnames";
import { gsap } from "gsap";

import { copyTouch, createEventMetaObject } from "src/utils";

import styles from "./Switch.module.scss";
import { ISwitchProps } from "./types";

class AnimationAbrotError extends Error {
  constructor (message: string) {
    super();

    this.name = "AnimationAbortError";
    this.message = message;
  }
};

interface SwipeTouch extends Pick<Touch, 'identifier' | 'pageX' | 'pageY'> {
  offset: number;
  delta: number;
};

export const Switch = memo(function Switch(props: ISwitchProps) {
  const { onChange, optionClassName } = props;
  const [ongoingSwipeTouch, setOngoingSwipeTouch] = useState<SwipeTouch>();
  const [sliderId, setSliderId] = useState<string | null>(null);
  const [state, setState] = useState<'tapping' | 'swiping' | null>(null);
  const abortController = useRef<AbortController | null>(null);
  const optionWidth = 100 / Object.keys(props.options).length;
  let position = 0;
  let index = 1;
  const anchors = [{ position, index }];

  do {
    position += optionWidth;
    index++;
    anchors.push({ position, index });
  } while (position < 100);

  const handleClick: MouseEventHandler<HTMLLIElement> = async (e) => {
    /**
     * 1. Прервать предыдущую анимацию если она была запущена
     * 2. Создать элемент слайдера
     * 3. Поместить элемент слайдера в начальную позицию
     * 4. Вычислить конечную позицию слайдера
     * 5. Запустить анимацию перемещения слайдера в конечную поизцию
     */
    abortController.current?.abort();

    const { listElem, currActiveItemElem, nextActiveItemElem } = selectElems(
      e.target
    );

    if (nextActiveItemElem === currActiveItemElem) return;

    setState("tapping");
    tapSwipe(currActiveItemElem, nextActiveItemElem, listElem);
  };
  const handleTouchStart: TouchEventHandler<HTMLUListElement> = async (e) => {
    /**
     * 1. Прервать предыдущую анимацию если она была запущена
     * 2. Создать элемент слайдера
     * 3. Поместить элемент слайдера в начальную позицию
     */
    abortController.current?.abort();

    const { listElem, currActiveItemElem, nextActiveItemElem } = selectElems(
      e.target
    );

    if (nextActiveItemElem === currActiveItemElem) {
      setState("swiping");
      const newSwipeTouch = copyTouch(e.changedTouches[0]) as SwipeTouch;
      const listWidth = listElem.getBoundingClientRect().width;
      newSwipeTouch.delta =
        newSwipeTouch.pageX -
        // listElem.offsetLeft -
        currActiveItemElem.offsetLeft + 1;
      newSwipeTouch.offset = (listWidth - (listWidth * (optionWidth / 100))) * 100 / listWidth;

      const [slider, id] = createSlider(currActiveItemElem, {
        offset:
          ((currActiveItemElem.offsetLeft + 1) * 100) /
          listElem.getBoundingClientRect().width,
        width: optionWidth,
      });

      setSliderId(id);

      listElem.insertAdjacentElement("afterbegin", slider);

      currActiveItemElem.classList.remove("active");

      setOngoingSwipeTouch(newSwipeTouch);

      return;
    }

    setState("tapping");
    tapSwipe(currActiveItemElem, nextActiveItemElem, listElem);
  };
  const handleTouchEnd: TouchEventHandler<HTMLUListElement> = (e) => {
    /**
     * 1. Прервать предыдущую анимацию если она была запущена
     * 2. Вычислить конечную позицию слайдера
     * 2.
     */
    e.preventDefault();

    if (state === "tapping") {
      setState(null);
      return;
    }

    setState(null);

    const newSwipeTouch = copyTouch(e.changedTouches[0]) as SwipeTouch;
    newSwipeTouch.delta = ongoingSwipeTouch!.delta;
    const { listElem } = selectElems(e.changedTouches[0].target);
    const offset =
      ((newSwipeTouch.pageX - newSwipeTouch.delta) * 100) /
      listElem.getBoundingClientRect().width;

    const closestAnchor = {
      delta: Math.abs(offset - anchors[0].position),
      left: anchors[0].position,
      elem: listElem.children[anchors[0].index] as HTMLLIElement,
    };

    for (let anchor of anchors) {
      const delta = Math.abs(offset - anchor.position);

      if (delta < closestAnchor.delta) {
        closestAnchor.delta = delta;
        closestAnchor.left = anchor.position;
        closestAnchor.elem = listElem.children[anchor.index] as HTMLLIElement;
      }
    }

    gsap.to(`#${sliderId}`, {
      left: closestAnchor.left + "%",
      duration: 0.3,
    }).then(() => {
      setOngoingSwipeTouch(undefined);
      setSliderId(null);

      if (props.value === closestAnchor.elem.dataset.id) {
        closestAnchor.elem.classList.add("active");
      }

      onChange(createEventMetaObject(closestAnchor.elem.dataset.id));
      document.getElementById(sliderId as string)?.remove();
    });
  };
  const handleTouchCancel = handleTouchEnd;
  const handleTouchMove: TouchEventHandler<HTMLUListElement> = (e) => {
    const { listElem } = selectElems(e.changedTouches[0].target);
    const newSwipeTouch = copyTouch(e.changedTouches[0]) as SwipeTouch;
    newSwipeTouch.delta = ongoingSwipeTouch!.delta;
    newSwipeTouch.offset = ongoingSwipeTouch!.offset;
    const offset =
      ((newSwipeTouch.pageX - newSwipeTouch.delta) * 100) /
      listElem.getBoundingClientRect().width;

    const left =
      offset < 0
        ? 0
        : offset > newSwipeTouch.offset
        ? newSwipeTouch.offset
        : offset;

    gsap.to(`#${sliderId}`, {
      left: left + "%",
      duration: 0.3,
    });

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

      const [slider, id] = createSlider(from, {
        offset: from.offsetLeft * 100 / listBoxWidth,
        width: optionWidth,
      });

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

function createSlider(
  activeOptionElem: HTMLLIElement,
  options: {
    offset: number;
    width: number;
  },
): [HTMLLIElement, string] {
  const slider = activeOptionElem.cloneNode(true) as HTMLLIElement;
  const sliderContent = slider.querySelector<HTMLParagraphElement>(
    `.${styles.optionContent}`
  );

  if (sliderContent) sliderContent.innerText = "";

  const id = `id-${new Date().getTime().toString()}`;

  slider.setAttribute("id", id);
  slider.classList.add(styles.optionSlider);

  slider.style.position = "absolute";
  slider.style.width = `${options.width}%`;
  slider.style.left = `${options.offset}%`;

  return [slider, id];
}
