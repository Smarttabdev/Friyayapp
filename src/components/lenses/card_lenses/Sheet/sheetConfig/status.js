import React from 'react';
import Icon from 'Components/shared/Icon';
import moment from 'moment';

export const statusColor = ({ attributes }) => {
  if (attributes.completed_percentage === 100) {
    return '#6FCF97';
  } else if (moment() > moment(attributes.due_date)) {
    return '#EB5757';
  } else if (
    attributes.start_date &&
    attributes.due_date &&
    attributes.completed_percentage === 0
  ) {
    return '#F2C94C';
  } else {
    return '#C4C4C4';
  }
};

export default {
  cssModifier: 'status',
  display: 'Status',
  resizableProps: {
    minWidth: '200'
  },
  render(card) {
    return <Icon icon="access_time" color={statusColor(card)} />;
  },
  renderSummary: () => null
};
