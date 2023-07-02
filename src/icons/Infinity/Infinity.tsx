import { FC, HTMLAttributes } from 'react';
import cn from 'classnames';
import styles from './Infinity.module.scss';

export const InfinityIcon: FC<HTMLAttributes<HTMLOrSVGElement>> = (props) => {
  return (
    <svg
      className={cn(props.className, styles.container)}
      width="44"
      height="22"
      viewBox="0 0 44 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" className={styles.icon}>
        <path d="M10.5715 0C15.0358 0 19.8572 4.3243 22 6.49001C24.1429 4.3243 28.9643 0 33.4286 0C38.7957 0 42 3.20432 42 8.57143C42 13.9385 38.7957 17.1429 33.4286 17.1429C28.9643 17.1429 24.1429 12.8186 22 10.6528C19.8572 12.8186 15.0358 17.1429 10.5715 17.1429C5.20432 17.1429 2.00008 13.9385 2.00008 8.57143C2.00008 3.20432 5.2044 0 10.5715 0ZM33.4287 15.2857C37.2201 15.2857 40.143 12.3629 40.143 8.57143C40.143 4.77999 37.2201 1.85711 33.4287 1.85711C30.2858 1.85711 25.1144 6.39852 22.9601 8.57143C25.1101 10.7472 30.273 15.2857 33.4287 15.2857ZM10.5715 15.2857C13.7144 15.2857 18.8858 10.7443 21.0401 8.57143C18.8972 6.39718 13.7272 1.85711 10.5715 1.85711C6.78007 1.85711 3.85719 4.77999 3.85719 8.57143C3.85719 12.3629 6.78007 15.2857 10.5715 15.2857Z" />
      </g>
      <defs>
        <filter id="infinity_outer_shadow" x="0" y="0" width="44" height="21.1428" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1705_5876"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1705_5876" result="shape"/>
        </filter>
        <filter id="infinity_inner_shadow" x="2" y="0" width="41" height="19.1428" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.629306 0 0 0 0 0.65547 0 0 0 0 0.766667 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1706_5858"/>
        </filter>
      </defs>
    </svg>
  );
};
