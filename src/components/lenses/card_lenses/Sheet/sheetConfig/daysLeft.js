import orderBy from 'lodash/orderBy';
import moment from 'moment';
import React from 'react';

export default {
  cssModifier: 'days-left',
  display: 'Days Left',
  resizableProps: {
    minWidth: '180'
  },
  render(card, stateValue = null, onChange, onUpdate) {
    const { due_date } = card.attributes;
    return due_date ? (
      <div>
        {moment(due_date)
          .startOf('day')
          .diff(moment(new Date()).startOf('day'), 'days')}
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
