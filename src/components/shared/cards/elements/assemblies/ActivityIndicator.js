import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Tooltip from 'Components/shared/Tooltip';

const ActivityIndicator = ({ updatedAt, renderSpace }) => {
  const lastUpdate = moment(updatedAt);
  const now = moment();
  const backgroundColor = (() => {
    if (now.diff(lastUpdate, 'minutes') <= 60) return '#EB5757';
    if (now.diff(lastUpdate, 'hours') <= 24) return '#F2994A';
    if (now.diff(lastUpdate, 'hours') <= 48) return '#F2C94C';
    if (now.diff(lastUpdate, 'days') <= 7) return '#56CCF2';
    return null;
  })();
  if (!backgroundColor)
    return renderSpace ? <div style={{ marginLeft: '15px' }}></div> : null;
  const tooltipText = 'Updated: ' + lastUpdate.format('h:mmA - DD MMM YY');
  const forId = Math.ceil(Math.random() * 100000, 6);
  return (
    <div
      className="activity-indicator"
      style={{ backgroundColor }}
      data-tip={tooltipText}
      data-for={forId}
    >
      <Tooltip place="bottom" id={forId} />
    </div>
  );
};

ActivityIndicator.propTypes = { updatedAt: PropTypes.any };

export default ActivityIndicator;
