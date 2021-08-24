import actionTypes from './actionEnum';

const localStorageTagForExpand = 'expandRightFilterMenu';
const localStorageTagForShow = 'showRightFilterMenu';
const localStorageValueForShow = window.localStorage.getItem(
  localStorageTagForShow
);
const localStorageValueForExpand = window.localStorage.getItem(
  localStorageTagForExpand
);

const defaultState = {
  assigned: [],
  creator: [],
  label: [],
  priority: [],
  people: ['ALL'],
  card: 'ALL',
  topic_filter: ['ALL'],
  completed_start_date: null,
  completed_end_date: null,
  created_start_date: null,
  created_end_date: null,
  due_start_date: null,
  due_end_date: null,
  start_start_date: null,
  start_end_date: null,
  include_now_cards: false,
  pick_your_boards: false,
  include_archived_cards: false,
  include_subtopic_cards: false,
  include_nested_cards: false,
  include_completed_cards: true,
  include_uncompleted_cards: true,
  include_uncompleted_sorted_cards: false,
  active_tool_board_order: [],
  filter_states: {},
  showFilterPanel: false,
  keepOpen:
    localStorageValueForShow == true || localStorageValueForShow == 'true'
      ? true
      : false,
  keepOpenExpanded:
    localStorageValueForExpand == true || localStorageValueForExpand == 'true'
      ? true
      : false,
  defaultSubmenu: null,
  workSpaceHomeSearchQuery: ''
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.setFilterSettings:
      return { ...state, ...action.payload };
    case actionTypes.setShowFiltersPanel:
      return { ...state, showFilterPanel: action.payload };
    case actionTypes.setRightFiltersMenuOpen:
      return {
        ...state,
        keepOpen: action.payload
      };
    case actionTypes.setRightFiltersDefaultSubmenuState:
      return { ...state, defaultSubmenu: action.payload };
    case actionTypes.setRightFiltersMenuOpenExpanded:
      return { ...state, keepOpenExpanded: action.payload };
    case actionTypes.setWorkspaceHomeSearchQuery:
      return { ...state, workspaceHomeSearchQuery: action.payload };
    default:
      return state;
  }
};

export default reducer;
