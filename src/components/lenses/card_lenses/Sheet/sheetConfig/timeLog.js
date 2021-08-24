import orderBy from 'lodash/orderBy';
import moment from 'moment';
import React from 'react';
import TimeLogLink from './../../../../shared/cards/elements/TimeLogLink';

export default {
  cssModifier: 'time-log',
  display: 'Timelog',
  resizableProps: {
    minWidth: '180'
  },
  render(card, stateValue = null, onChange, onUpdate) {
    const { log_times } = card.attributes;
    const totalLoggedTime = log_times.reduce((totalTime, currentLog) => {
      let { start_time, end_time } = currentLog;
      const duration = moment.duration(
        moment(end_time).diff(moment(start_time))
      );
      const hours = duration.asHours().toFixed(2);
      return totalTime + Number(hours);
    }, 0);
    return (
      <TimeLogLink
        card={card}
        displayValue={`${totalLoggedTime.toFixed(2)} hrs`}
      ></TimeLogLink>
    );
  },
  renderSummary: cards => {
    const totalLog = cards.reduce((sum, card) => {
      const totalLoggedTime = card.attributes.log_times.reduce(
        (totalTime, currentLog) => {
          let { start_time, end_time } = currentLog;
          const duration = moment.duration(
            moment(end_time).diff(moment(start_time))
          );
          const hours = duration.asHours().toFixed(2);
          return totalTime + Number(hours);
        },
        0
      );
      return sum + Number(totalLoggedTime);
    }, 0);
    return `${totalLog.toFixed(2)} hrs`;
  },
  sort(cards, order) {
    return cards;
  }
};
