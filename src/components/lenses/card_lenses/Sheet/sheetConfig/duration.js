import orderBy from 'lodash/orderBy';
import moment from 'moment';
import React from 'react';

export default {
  cssModifier: 'duration',
  display: 'Duration',
  resizableProps: {
    minWidth: '300'
  },
  render(card, stateValue = null, onChange, onUpdate) {
    const { start_date } = card.attributes;
    let durationDays = null;
    let durationHours = null;
    if (start_date) {
      durationDays = moment(new Date()).diff(moment(start_date), 'days');
      durationHours = moment(new Date()).diff(moment(start_date), 'hours');
    }
    return start_date ? (
      <div>
        {durationDays > 0 ? `${durationDays} days` : `${durationHours} hrs`}
      </div>
    ) : (
      <div>--</div>
    );
  },
  renderSummary: () => null,
  sort(cards, order) {
    return cards;
  }
};
