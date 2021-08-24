import React from 'react';

const RadialProgress = ({
  maxValue,
  value,
  diameter,
  color,
  bgColor,
  borderWidth,
  borderGap,
  borderColor,
  style,
  ...props
}) => {
  const d = 10;
  const r = 5;
  const border = (borderWidth / diameter) * d;
  const gap = (borderGap / diameter) * d;
  const rInner = r - gap - border;
  const percent = value / maxValue;
  const dInner = (3.14 * 2 * rInner) / 2;
  const dashArray = `${dInner * percent} ${dInner - dInner * percent}`;
  return (
    <svg
      width={diameter}
      height={diameter}
      viewBox="0 0 10 10"
      style={{ display: 'block', ...style }}
      {...props}
    >
      <circle
        r={r - border / 2}
        cx="5"
        cy="5"
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={border}
      />
      <circle
        r={rInner / 2}
        cx="5"
        cy="5"
        fill="transparent"
        stroke={color}
        strokeWidth={rInner}
        strokeDasharray={dashArray}
        transform="rotate(-90 5 5)"
      />
    </svg>
  );
};

RadialProgress.defaultProps = {
  diameter: 28,
  bgColor: 'transparent',
  color: 'black',
  borderWidth: 2,
  borderGap: 2,
  borderColor: 'black',
  style: {}
};

export default RadialProgress;
