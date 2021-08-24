import actionTypes from './actionEnum';

const defaultState = {
  shiftKeyDown: false,
  priorityView: 'Vertical',
  active_design: {},
  editCardModalCardType: '',
  userLocation: JSON.parse(window.localStorage.getItem('userLocation'))
};
const tools = ['Vertical', 'Horizontal', 'HorizontalCardDetails'];

const getView = view => {
  const index = tools.findIndex(s => s === view);
  if (index + 1 > 2) {
    view = 0;
  } else {
    view = index + 1;
  }
  return view;
};
const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.setUtilityValue:
      return { ...state, ...action.payload };
    case actionTypes.changePriorityView:
      return { ...state, priorityView: tools[getView(state.priorityView)] };
    case actionTypes.setActiveDesign:
      return { ...state, active_design: action.payload.active_design };
    case actionTypes.setEditCardModalCardType:
      return { ...state, editCardModalCardType: action.payload };
    case actionTypes.setUserLocation:
      return { ...state, userLocation: action.payload };
    default:
      return state;
  }
};

export default reducer;
