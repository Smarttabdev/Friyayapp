import actionTypes from './actionEnum';

export const toggleUtilityValue = keyValue => ({
  type: actionTypes.setUtilityValue,
  payload: keyValue
});

export const togglePriorityView = () => ({
  type: actionTypes.changePriorityView
});

export const setActiveDesign = payload => ({
  type: actionTypes.setActiveDesign,
  payload
});

export const setEditModalCardType = payload => ({
  type: actionTypes.setEditCardModalCardType,
  payload
});

export const setUserLocation = payload => ({
  type: actionTypes.setUserLocation,
  payload
});
