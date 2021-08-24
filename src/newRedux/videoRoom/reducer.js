import actionTypes from './actionEnum';

const defaultState = {
  callStartedMap: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.setJitsiApi: {
      return {
        ...state,
        callStartedMap: {
          ...state.callStartedMap,
          [action.payload.key]: action.payload.callStarted
        }
      };
    }
    default:
      return state;
  }
};

export default reducer;
