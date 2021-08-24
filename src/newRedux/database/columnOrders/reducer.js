import actionTypes from './actionEnum';

const defaultState = {
  activeColumnOrder: null
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.add:
      return { ...state, activeColumnOrder: action.payload };

    default:
      return state;
  }
};

export default reducer;
