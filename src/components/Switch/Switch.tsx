import { memo, useCallback, MouseEvent } from "react";
import cn from "classnames";
import { gsap } from "gsap";

import { createEventMetaObject } from "src/utils";

import styles from "./Switch.module.scss";
import { ISwitchProps } from "./types";

const DURATION = .3;

export const Switch = memo(function Switch(props: ISwitchProps) {
  const { onChange, optionClassName } = props;
  const handleClick = useCallback((e: MouseEvent<HTMLLIElement>) => {
    const currentItemElem = e.currentTarget;
    const { id } = currentItemElem.dataset;
    const listElem = currentItemElem.parentElement;

    if (!listElem) return;

    const activeItemElem = listElem.querySelector("[data-active=true]");

    if (!activeItemElem) return;

    if (currentItemElem === activeItemElem) return;

    const slider = activeItemElem.cloneNode(true) as HTMLLIElement;
    const activeItemRect = activeItemElem.getBoundingClientRect();
    const currentItemRect = currentItemElem.getBoundingClientRect();
    slider.classList.add(styles.slider);
    slider.style.position = "absolute";
    slider.style.width = `${activeItemRect.width}px`;
    slider.style.left = `${activeItemRect.left - 5}px`;
    slider.innerText = "";
    listElem.insertAdjacentElement('afterbegin', slider);
    activeItemElem.classList.remove('active');

    gsap.to(`.${styles.slider}`, {
      left: currentItemRect.left - 5,
      duration: DURATION,
    }).then(() => {
      onChange(createEventMetaObject(id));
      slider.remove();
    });
  }, [onChange]);

  return (
    <div className={cn(props.className, styles.switch)}>
      {props.label && <label className={styles.label}>{props.label}</label>}
      <ul className={styles.list}>
        {Object.entries(props.options).map(([id, title]) => {
          return (
            <li
              key={id}
              className={cn(
                styles.item,
                id === props.value && "active",
                optionClassName
              )}
              data-id={id}
              data-active={id === props.value}
              onClick={handleClick}
            >
              {typeof title === "function" ? title({}) : title}
            </li>
          );
        })}
      </ul>
    </div>
  );
});
