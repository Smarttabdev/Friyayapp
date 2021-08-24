import { merge } from 'lodash';

import actionTypes from './actionEnum';

const defaultState = {
  channels: {}
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.updatePresences: {
      return merge({}, state, action.payload);
    }
    case actionTypes.clearPresences:
      return defaultState;
    default:
      return state;
  }
};

export default reducer;
