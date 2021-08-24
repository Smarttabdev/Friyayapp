import actions from './actionEnum';
import get from 'lodash/get';
import set from 'lodash/set';

const initialState = {};

const updateLens = (state, payload) => {
  let attributes = get(state[payload.id], 'attributes');
  attributes = { ...attributes, ...payload.attributes };
  const tool = set(state[payload.id], 'attributes', attributes);
  return tool;
};

const Tools = (state = initialState, action) => {
  switch (action.type) {
    case actions.fetchAll:
      return { ...action.payload };
    case actions.add:
      return { ...state, [action.payload.id]: action.payload };
    case actions.delete: {
      const tempState = { ...state };
      delete tempState[action.payload];
      return { ...tempState };
    }
    case actions.update:
      return {
        ...state,
        [action.payload.id]: updateLens(state, action.payload)
      };
    default:
      return state;
  }
};

export default Tools;
