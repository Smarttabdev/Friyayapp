import React, { Fragment } from 'react';
import cn from 'classnames';
import { camelize } from 'inflection';

const colorMap = {
  low: 'red',
  medium: 'orange',
  high: 'green',
  over: 'purple'
};

export const valueColor = (value, max) => {
  let rank;

  if (typeof value === 'string') {
    value = value.toLowerCase();
    if (value === 'low') {
      rank = 'low';
    } else if (value === 'normal') {
      rank = 'medium';
    } else if (value === 'high') {
      rank = 'high';
    }
  } else {
    const ratio = value / max;
    rank =
      ratio < 0.5
        ? 'low'
        : ratio < 0.8
        ? 'medium'
        : ratio <= 1
        ? 'high'
        : 'over';
  }
  return colorMap[rank];
};

const Completion = ({ value }) => (
  <div className={cn('completion', valueColor(value, 100))}>
    {value == 100 && (
      <i className="material-icons-outlined done_outline">done_outline</i>
    )}
    {value > 100 && (
      <Fragment>
        <div className="relative">
          <i className="material-icons-outlined done_outline">done_outline</i>
          <span className="check-value">{value}%</span>
        </div>
      </Fragment>
    )}
    {value < 100 && `${value}%`}
  </div>
);

const Points = ({ value }) => (
  <div className={cn('points', valueColor(value, 1000))}>{value}</div>
);

const Cactii = ({ value }) => (
  <div className={cn('cactii', valueColor(value, 1000))}>{value}</div>
);

const LoggedHours = ({ value }) => (
  <div className={cn('logged-hours', valueColor(value, 40))}>{value}</div>
);

const Activity = ({ value }) => (
  <div
    className={cn('activity', {
      blue: value === 'Low',
      green: value === 'Normal',
      purple: value === 'High'
    })}
  >
    {value}
  </div>
);

const cellComponents = {
  Completion,
  Points,
  Cactii,
  LoggedHours,
  Activity
};

const CellRenderer = ({ value, row }) => {
  const componentName = camelize(row.original.stat, false);
  const Component = cellComponents[componentName];
  return Component ? <Component value={value} /> : <div>{value}</div>;
};

export default CellRenderer;
