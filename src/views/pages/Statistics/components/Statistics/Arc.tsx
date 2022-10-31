import React, { FC } from "react";

export const Arc: FC<{ percent: number, cx: number, cy: number, r: number, width: number }> = ({ percent, cx, cy, r, width }) => {
  const centerPoint = {
    x: cx,
    y: cy,
  };
  const startPoint = {
    x: centerPoint.x,
    y: centerPoint.y - r,
  };

  return (
    <>
      <path
        d={drawArc(startPoint, centerPoint, percent, true, r, width)}
        stroke="none"
        fillRule="evenodd"
        fill="url(#success)"
      />
      <path
        d={drawArc(startPoint, centerPoint, percent, false, r, width)}
        stroke="none"
        fillRule="evenodd"
        fill="url(#failure)"
      />
      <defs>
        <linearGradient id="success">
          <stop stopColor="#41E2C5" />
          <stop offset="1" stopColor="#42EC95" />
        </linearGradient>
        <linearGradient id="failure">
          <stop stopColor="#FF7898" />
          <stop offset="1" stopColor="#FF85BF" />
        </linearGradient>
      </defs>
    </>
  );
};

function getArcEndPoint(c: { x: number, y: number }, r: number, p: number) {
  return {
    x: getX(c.x, r, getRadians(p)),
    y: getY(c.y, r, getRadians(p)),
  };
}

function getRadians(percent: number) {
  return (percent * 360 / 100 - 90) * Math.PI / 180;
}

function getX(cx: number, r: number, rad: number) {
  return cx + r * Math.cos(rad);
}

function getY(cy: number, r: number, rad: number) {
  return cy + r * Math.sin(rad);
}

function getArc(start: { x: number, y: number }, r: number, end: { x: number, y: number }, percent: number, clockwise: boolean = true, longArc: number) {
  let _longArc;
  if (longArc === 0) {
    _longArc = percent > 50 ? 1 : 0;
  } else {
    _longArc = 100 - percent > 50 ? 1 : 0;
  }

  return `A ${r} ${r} 0 ${_longArc} ${clockwise ? 1 : 0} ${end.x} ${end.y}`;
}

export function drawArc(startPoint: { x: number, y: number }, centerPoint: { x: number, y: number }, percent: number, clockwise: boolean = true, r: number, width: number) {
  const _percent = percent === 100 && 99.999 || percent === 0 && 0.001 || percent;
  const rOuter = r;
  const rInner = r - width;
  const longArc = clockwise ? 0 : 1;
  return `
    M ${startPoint.x} ${startPoint.y}
    L ${startPoint.x} ${startPoint.y + width}
    ${getArc({ x: startPoint.x, y: startPoint.y + width }, rInner, getArcEndPoint(centerPoint, rInner, _percent), _percent, clockwise, longArc)}
    L ${getArcEndPoint(centerPoint, rOuter, _percent).x} ${getArcEndPoint(centerPoint, rOuter, _percent).y}
    ${getArc(startPoint, rOuter, startPoint, _percent, !clockwise, longArc)}
  `
}
