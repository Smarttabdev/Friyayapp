import actionTypes from './actionEnum';

const initialState = {
  myResults: [],
  teamResults: [],
  projectResults: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.setResults:
      return { ...state, [action.payload.key]: action.payload.data };
    default:
      return state;
  }
};
