import { FC } from 'react';

export const Burger: FC = () => {
  return (
    <svg width="26" height="23" viewBox="0 0 26 23" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" filter="url(#filter0_i_1782_3144)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M26 3H13H0V0H26V3ZM26 13H13H0V10H26V13ZM26 23H0V20H26V23Z"
          fill="#999999"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_1782_3144"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1782_3144" />
        </filter>
      </defs>
    </svg>
  );
};
