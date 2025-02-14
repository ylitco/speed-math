import { FC } from 'react';

export const BackIcon: FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" filter="url(#filter0_i_1223_5219)">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.27748 12.7682C2.90751 12.3439 2.90751 11.6561 3.27748 11.2318L9.30649 4.31819C9.67646 3.89394 10.2763 3.89394 10.6463 4.31819C11.0162 4.74245 11.0162 5.4303 10.6463 5.85455L6.23452 10.9136H21V13.0864H6.23452L10.6463 18.1454C11.0162 18.5697 11.0162 19.2576 10.6463 19.6818C10.2763 20.1061 9.67646 20.1061 9.30649 19.6818L3.27748 12.7682Z" fill="#999999"/>
      </g>
      <defs>
        <filter id="filter0_i_1223_5219" x="3" y="4" width="19" height="18" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend in2="shape" result="effect1_innerShadow_1223_5219"/>
        </filter>
      </defs>
    </svg>
  );
};
