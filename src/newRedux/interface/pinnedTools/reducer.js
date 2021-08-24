import actionTypes from './actionEnum';

const defaultState = {
  pinnedToolsBarWidth: null
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.setPinnedToolsBarWidth:
      return { ...state, pinnedToolsBarWidth: action.payload };
    default:
      return state;
  }
};
