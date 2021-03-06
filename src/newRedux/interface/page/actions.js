import actionTypes from './actionEnum';

export const setPageDetails = pageDetails => dispatch => {
  dispatch({
    type: actionTypes.setPageDetails,
    payload: pageDetails
  });
};

export const setCardEditMode = cardEditMode => ({
  type: actionTypes.setCardEditMode,
  payload: cardEditMode
});

export const setBoardTabsIsOpen = bool => ({
  type: actionTypes.setBoardTabsIsOpen,
  payload: bool
});
