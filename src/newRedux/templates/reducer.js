import actionTypes from './actionEnum';

const defaultState = {
  friyayTemplates: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.addFriyayTemplates:
      console.log('the payload', action.payload);
      return { ...state, friyayTemplates: action.payload };
    default:
      return state;
  }
};

export default reducer;
