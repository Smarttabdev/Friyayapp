import actionTypes from './actionEnum';

export const prepareLogtimes = cards => ({
  type: actionTypes.prepareLogtimes,
  payload: { cards }
});

export const updateLogTimeCard = (logtimeId, startTime, endTime) => ({
  type: actionTypes.updateLogtime,
  payload: {
    logtimeId,
    startTime,
    endTime
  }
});
