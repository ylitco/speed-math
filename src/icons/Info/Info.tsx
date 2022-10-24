import React, { FC } from 'react';

const colors = {
  gray: '#999999',
  purple: '#CF94FE',
};

export const InfoIcon: FC<{ color?: 'gray' | 'purple' }> = ({ color = 'gray' }) => {
  return (
    <svg width="9" height="20" viewBox="0 0 9 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g opacity="0.6" filter={`url(#${color}_inner_shadow)`}>
        <path
          d="M8.35547 17.3242L8.09766 18.3789C7.32422 18.6836 6.70703 18.9141 6.24609 19.0703C5.78516 19.2344 5.25 19.3164 4.64062 19.3164C3.70312 19.3164 2.97266 19.0898 2.44922 18.6367C1.93359 18.1758 1.67578 17.5938 1.67578 16.8906C1.67578 16.6172 1.69531 16.3398 1.73438 16.0586C1.77344 15.7695 1.83594 15.4453 1.92188 15.0859L2.88281 11.6641C2.96875 11.3359 3.03906 11.0273 3.09375 10.7383C3.15625 10.4414 3.1875 10.1719 3.1875 9.92969C3.1875 9.49219 3.09766 9.1875 2.91797 9.01562C2.73828 8.84375 2.39453 8.75781 1.88672 8.75781C1.63672 8.75781 1.37891 8.79688 1.11328 8.875C0.855469 8.95312 0.632812 9.02734 0.445312 9.09766L0.703125 8.04297C1.33594 7.78516 1.94141 7.56641 2.51953 7.38672C3.09766 7.19922 3.64453 7.10547 4.16016 7.10547C5.08984 7.10547 5.80469 7.33203 6.30469 7.78516C6.8125 8.23047 7.06641 8.8125 7.06641 9.53125C7.06641 9.67969 7.04688 9.94141 7.00781 10.3164C6.97656 10.6914 6.91406 11.0352 6.82031 11.3477L5.85938 14.7578C5.78125 15.0312 5.71094 15.3438 5.64844 15.6953C5.58594 16.0469 5.55469 16.3125 5.55469 16.4922C5.55469 16.9453 5.65625 17.2539 5.85938 17.418C6.0625 17.582 6.41406 17.6641 6.91406 17.6641C7.14844 17.6641 7.41406 17.625 7.71094 17.5469C8.00781 17.4609 8.22266 17.3867 8.35547 17.3242ZM8.60156 3.01562C8.60156 3.60938 8.375 4.11719 7.92188 4.53906C7.47656 4.95312 6.9375 5.16016 6.30469 5.16016C5.67188 5.16016 5.12891 4.95312 4.67578 4.53906C4.22266 4.11719 3.99609 3.60938 3.99609 3.01562C3.99609 2.42187 4.22266 1.91406 4.67578 1.49219C5.12891 1.07031 5.67188 0.859375 6.30469 0.859375C6.9375 0.859375 7.47656 1.07031 7.92188 1.49219C8.375 1.91406 8.60156 2.42187 8.60156 3.01562Z"
          fill={colors[color]}
        />
      </g>
      <defs>
        <filter id="gray_inner_shadow" x="0.445312" y="0.859375" width="9.15625" height="20.457" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_1667_2938"/>
        </filter>
        <filter id="purple_inner_shadow" x="0.445312" y="0.859375" width="9.15625" height="20.457" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1" dy="2"/>
          <feGaussianBlur stdDeviation="1"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0.610964 0 0 0 0 0.410104 0 0 0 0 0.775 0 0 0 1 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_282_134"/>
        </filter>
      </defs>
    </svg>
  );
};
