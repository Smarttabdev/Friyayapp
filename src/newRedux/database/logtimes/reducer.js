import actionTypes from './actionEnum.js';
import { ammendPositionInfo } from './conflictLogtimeUtil.js';
import moment from 'moment';
import groupBy from 'lodash/groupBy';
import get from 'lodash/get';
import flatMap from 'lodash/flatMap';
import keyBy from 'lodash/keyBy';

const initialState = {
  topicId: undefined,
  data: {}
};

const prepareLogtimes = ({ cards = [] }) => {
  const flatCards = flatMap(cards, card => {
    return card.attributes.log_times.map(logTime => ({
      cardId: card.id,
      logtimeId: logTime.id,
      title: card.attributes.title,
      startTime: moment(logTime.start_time),
      endTime: moment(logTime.end_time)
    }));
  });
  const groupedCard = groupBy(flatCards, card =>
    moment(card.startTime).format('DD_MM_YYYY')
  );
  Object.keys(groupedCard).forEach(dayGroup => {
    groupedCard[dayGroup] = ammendPositionInfo(groupedCard[dayGroup]);
  });
  groupedCard.allLogtimes = keyBy(flatCards, 'logtimeId');
  return groupedCard;
};

const updateLogtime = (currentState, { logtimeId, startTime, endTime }) => {
  const newData = {};
  const oldLogtime = get(currentState, `data.allLogtimes.${logtimeId}`);
  const oldDayKey = oldLogtime.startTime.format('DD_MM_YYYY');
  const dayKey = startTime.format('DD_MM_YYYY');
  let newDayLogtimes = get(currentState, `data.${dayKey}`, []);
  if (dayKey !== oldDayKey) {
    // remove from the old day column
    const oldDayLogtimes = get(currentState, `data.${oldDayKey}`, []).filter(
      lt => lt.logtimeId !== logtimeId
    );
    newData[oldDayKey] = ammendPositionInfo(oldDayLogtimes);

    newDayLogtimes = [...newDayLogtimes, { ...oldLogtime, startTime, endTime }];

    newData.allLogtimes = {
      ...get(currentState, 'data.allLogtimes'),
      [oldLogtime.logtimeId]: { ...oldLogtime, startTime, endTime }
    };
  } else {
    newDayLogtimes = newDayLogtimes.map(lt =>
      lt.logtimeId === logtimeId ? { ...lt, startTime, endTime } : lt
    );
  }
  newData[dayKey] = ammendPositionInfo(newDayLogtimes);
  return {
    ...currentState,
    data: {
      ...currentState.data,
      ...newData
    }
  };
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.prepareLogtimes:
      return { ...state, data: prepareLogtimes(payload) };
    case actionTypes.updateLogtime:
      return updateLogtime(state, payload);
    default:
      return state;
  }
};
