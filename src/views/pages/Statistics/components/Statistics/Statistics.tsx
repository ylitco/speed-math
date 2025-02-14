import { FC, HTMLAttributes } from 'react';
import { Arc, drawArc } from './Arc';
import styles from './Statistics.module.scss';

interface Props extends HTMLAttributes<HTMLOrSVGElement> {
  correct: number,
  total: number,
  percentage: number,
}

export const Statistics: FC<Props> = ({ correct, total, percentage, className }) => {
  const cx = 314 / 2;
  const cy = 314 / 2;
  const percent = percentage;

  return (
    <svg
      className={className}
      width="314"
      height="314"
      viewBox="0 0 314 314"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#outerCircleOuterShadow)">
        <circle cx={cx} cy={cy} r={134} fill="#ECEFFF" />
        <circle cx={cx} cy={cy} r={134} fill="#ECEFFF" />
        <circle cx={cx} cy={cy} r={129} stroke="#F2F9FF" strokeWidth={10} />
      </g>
      <Arc cx={cx} cy={cy} percent={percent} r={124} width={62} />
      <g filter="url(#innerCircleShadow)">
        <circle cx={cx} cy={cy} r={62} fill="#EFF2FF" />
        <circle cx={cx} cy={cy} r={62} fill="url(#innerCircleGradient)" />
        <circle cx={cx} cy={cy} r={58} stroke="white" strokeOpacity="0.5" strokeWidth="8" />
      </g>
      <path
        filter="url(#outerCircleInnerShadow)"
        d={drawArc(
          { x: cx, y: cy - 124 },
          { x: cx, y: cy },
          100,
          true,
          124,
          62,
        )}
        fill="#C4C4C4"
        fillOpacity="0.01"
        fillRule="evenodd"
      />
      <text
        className={styles.text}
        filter="url(#textFilter)"
        x={cx}
        y={cy - 15}
        textAnchor="middle"
      >
        {percent}%
      </text>
      <text
        className={styles.text}
        filter="url(#textFilter)"
        x={cx}
        y={cy + 15}
        textAnchor="middle"
      >
        {correct}/{total}
      </text>
      <defs>
        <linearGradient id="innerCircleGradient">
          <stop stopColor="#DFE3F7" />
          <stop offset="1" stopColor="#EFF2FF" stopOpacity="0" />
        </linearGradient>
        <filter
          id="innerCircleShadow"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="4" dy="4" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="shadow_effect_1" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-4" dy="-4" />
          <feGaussianBlur stdDeviation="10" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="shadow_effect_1" result="shadow_effect_2" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow_effect_2" result="shape" />
        </filter>
        <filter
          id="outerCircleOuterShadow"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="10" dy="10" />
          <feGaussianBlur stdDeviation="7.5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.764706 0 0 0 0 0.803922 0 0 0 0 0.909804 0 0 0 0.5 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="shadow_effect_1" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-5" dy="-5" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0" />
          <feBlend mode="normal" in2="shadow_effect_1" result="shadow_effect_2" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow_effect_2" result="shape" />
        </filter>
        <filter id="textFilter" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="5" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.862917 0 0 0 0 0.872 0 0 0 0 0.908333 0 0 0 1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="shadow_effect" />
          <feBlend mode="normal" in="SourceGraphic" in2="shadow_effect" result="shape" />
        </filter>
        <filter
          id="outerCircleInnerShadow"
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
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.0125 0 0 0 0 0.0125 0 0 0 0 0.0125 0 0 0 0.15 0" />
          <feBlend mode="normal" in2="shape" result="shadow_effect" />
        </filter>
      </defs>
    </svg>
  );
};
