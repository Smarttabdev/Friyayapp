import { uniq } from 'lodash';
import actionTypes from './actionEnum';

const defaultState = {
  pendingEmails: []
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.setPendingEmails:
      return {
        ...state,
        pendingEmails: action.payload
      };
    case actionTypes.mergePendingEmails:
      return {
        ...state,
        pendingEmails: uniq(state.pendingEmails.concat(action.payload))
      };
    default:
      return state;
  }
};

export default reducer;
