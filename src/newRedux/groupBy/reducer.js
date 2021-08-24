import actionTypes from './actionEnum';

const defaultState = {
  selectedOptions: [],
  isDropdownOpen: false,
  subBoardOptions: ['SHEET', 'ACTION_PLAN', 'TODO', 'PROJECT_PLAN'],
  topicId: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.toggleGroupByDropdown:
      return {
        ...state,
        isDropdownOpen:
          state.topicId == action.payload ? !state.isDropdownOpen : true,
        topicId: action.payload
      };
    case actionTypes.setGroupBySelectedOption:
      return { ...state, selectedOptions: action.payload };
    case actionTypes.setGroupBySubBoards:
      return { ...state, subBoardOptions: action.payload };
    default:
      return state;
  }
};

export default reducer;
