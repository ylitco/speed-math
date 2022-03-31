import React, { FC, HTMLAttributes } from 'react';

export const TimerIcon: FC<HTMLAttributes<HTMLElement>> = (props) => {
  return (
    <svg
      className={props.className}
      width="63"
      height="26"
      viewBox="0 0 63 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.5" filter="url(#filter0_i_1293_5857)">
        <path fillRule="evenodd" clipRule="evenodd" d="M0 12H15.5342V13.75H1.72603V26H0V12ZM61.274 13.75H46.6027V12H63V26H61.274V13.75Z" fill="#C9CDE1"/>
      </g>
      <g opacity="0.5" filter="url(#filter1_i_1293_5857)">
        <path d="M28.6364 1.875H34.3636C34.8908 1.875 35.3182 1.45528 35.3182 0.9375C35.3182 0.419719 34.8908 0 34.3636 0H28.6364C28.1092 0 27.6818 0.419719 27.6818 0.9375C27.6818 1.45528 28.1092 1.875 28.6364 1.875Z" fill="#C9CDE1"/>
        <path d="M34.2 9.71003L30.8252 13.0246C30.4524 13.3907 30.4524 13.9842 30.8252 14.3504C31.1981 14.7166 31.8024 14.7164 32.1751 14.3504L35.5499 11.0358C35.9227 10.6697 35.9228 10.0762 35.55 9.71003C35.1772 9.34394 34.5729 9.34398 34.2 9.71003Z" fill="#C9CDE1"/>
        <path d="M31.5 3.375C25.697 3.375 21 7.98731 21 13.6875C21 19.3869 25.6961 24 31.5 24C37.3032 24 42 19.3876 42 13.6875C42 7.98811 37.3038 3.375 31.5 3.375ZM31.5 22.125C26.763 22.125 22.9091 18.3399 22.9091 13.6875C22.9091 9.03506 26.763 5.25 31.5 5.25C36.237 5.25 40.0909 9.03506 40.0909 13.6875C40.0909 18.3399 36.237 22.125 31.5 22.125Z" fill="#C9CDE1"/>
      </g>
      <defs>
        <filter id="filter0_i_1293_5857" x="0" y="12" width="64" height="16" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.629306 0 0 0 0 0.65547 0 0 0 0 0.766667 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1293_5857"/>
        </filter>
        <filter id="filter1_i_1293_5857" x="21" y="0" width="22" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.629306 0 0 0 0 0.65547 0 0 0 0 0.766667 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1293_5857"/>
        </filter>
      </defs>
    </svg>
  );
};
