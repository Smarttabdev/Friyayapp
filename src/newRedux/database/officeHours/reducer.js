import actionTypes from './actionEnum';

const defaultState = {
  activeDateHours: [],
  selectedUsers: []
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.updateActiveDateOfficeHours:
      return {
        ...state,
        activeDateHours: action.payload
      };
    case actionTypes.setUsers:
      return {
        ...state,
        selectedUsers: action.payload
      };
    default:
      return state;
  }
};
