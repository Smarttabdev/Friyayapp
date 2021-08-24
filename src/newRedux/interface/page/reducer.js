import actionTypes from './actionEnum';

const defaultState = {
  domainId: null,
  groupId: null,
  page: 'cards',
  personId: null,
  rootUrl: '/',
  topicId: null,
  topicSlug: null,
  cardEditMode: false,
  boardTabsIsOpen: false
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.setPageDetails:
      return { ...state, ...action.payload };

    case actionTypes.setCardEditMode:
      return { ...state, cardEditMode: action.payload };

    case actionTypes.setBoardTabsIsOpen:
      return { ...state, boardTabsIsOpen: action.payload };

    default:
      return state;
  }
};

export default reducer;
