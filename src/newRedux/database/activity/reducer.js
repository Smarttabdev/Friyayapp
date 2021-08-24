import actionTypes from './actionEnum';

const defaultState = {
  activities: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.addActivities:
      return { ...state, activities: action.payload };
    default:
      return state;
  }
};
