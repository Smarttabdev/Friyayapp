import actionTypes from './actionEnum';

export const addColumnOrder = columnData => ({
  type: actionTypes.add,
  payload: columnData
});
