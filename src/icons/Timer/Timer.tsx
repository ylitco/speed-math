import { FC, HTMLAttributes } from 'react';
import cn from 'classnames'
import styles from './Timer.module.scss';

export const TimerIcon: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      className={cn(props.className, styles.container)}
      width="28"
      height="32"
      viewBox="0 0 28 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" className={styles.icon}>
        <path d="M10.7273 2.1875H17.2727C17.8752 2.1875 18.3636 1.69783 18.3636 1.09375C18.3636 0.489672 17.8752 0 17.2727 0H10.7273C10.1248 0 9.63636 0.489672 9.63636 1.09375C9.63636 1.69783 10.1248 2.1875 10.7273 2.1875Z" />
        <path d="M17.0857 11.3284L13.2288 15.1953C12.8028 15.6224 12.8027 16.3149 13.2288 16.7421C13.6549 17.1693 14.3456 17.1692 14.7716 16.7421L18.6285 12.8751C19.0546 12.448 19.0546 11.7555 18.6286 11.3284C18.2025 10.9013 17.5118 10.9013 17.0857 11.3284Z" />
        <path d="M14 3.9375C7.36798 3.9375 2 9.31853 2 15.9687C2 22.618 7.367 28 14 28C20.6322 28 26 22.6189 26 15.9687C26 9.31946 20.6329 3.9375 14 3.9375ZM14 25.8125C8.58625 25.8125 4.18182 21.3966 4.18182 15.9687C4.18182 10.5409 8.58625 6.125 14 6.125C19.4137 6.125 23.8182 10.5409 23.8182 15.9687C23.8182 21.3966 19.4137 25.8125 14 25.8125Z" />
      </g>
      <defs>
        <filter id="inner_shadow" x="2" y="0" width="25" height="30" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.629306 0 0 0 0 0.65547 0 0 0 0 0.766667 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1701_5874"/>
        </filter>
        <filter id="outer_shadow" x="0" y="0" width="28" height="32" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1701_5875"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1701_5875" result="shape"/>
        </filter>
      </defs>
    </svg>
  );
};
