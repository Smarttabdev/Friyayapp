import actionTypes from './actionEnum';

export const toggleGroupByDropdown = topicId => ({
  type: actionTypes.toggleGroupByDropdown,
  payload: topicId
});
export const setGroupBySelectedOption = selectedOptions => ({
  type: actionTypes.setGroupBySelectedOption,
  payload: selectedOptions
});
export const setGroupBySubBoards = selectedOptions => ({
  type: actionTypes.setGroupBySubBoards,
  payload: selectedOptions
});
