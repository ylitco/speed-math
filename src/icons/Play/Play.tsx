import React, { FC } from 'react';

export const PlayIcon: FC = () => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.5" filter="url(#filter0_i_1281_5865)">
        <path d="M21 12.3923L3 22.7846L3 2L21 12.3923Z" fill="#C9CDE1"/>
      </g>
      <defs>
        <filter id="filter0_i_1281_5865" x="3" y="2" width="19" height="22.7847" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.629306 0 0 0 0 0.65547 0 0 0 0 0.766667 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1281_5865"/>
        </filter>
      </defs>
    </svg>
  );
};
