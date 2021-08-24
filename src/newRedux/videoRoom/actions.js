import actionTypes from './actionEnum';

export const setCallStarted = (key, callStarted) => ({
  type: actionTypes.setJitsiApi,
  payload: { key, callStarted }
});
