import actionTypes from './actionEnum';

export const setResults = (key, data) => ({
  type: actionTypes.setResults,
  payload: { key, data }
});
