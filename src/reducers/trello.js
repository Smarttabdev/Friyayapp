import {
  CONNECT_TRELLO_SUCCESS,
  DISCONNECT_TRELLO
} from '../actions/right_bar_actions/connect_trello';
import {
  EXPAND_TRELLO_RIGHT_PANEL,
  COLLAPSE_TRELLO_RIGHT_PANEL,
  TRELLO_FETCH_REQUEST,
  TRELLO_LISTS_SUCCESS,
  TRELLO_CARDS_SUCCESS,
  TRELLO_BOARDS_SUCCESS,
  TRELLO_HOME_CLICK,
  TRELLO_UPDATE_FILTER_TERM,
  TRELLO_CLEAR_FILTER_TERM
} from '../actions/right_bar_actions/trello_right_panel_actions';
import {
  BOARD_VIEW,
  LIST_VIEW,
  CARD_VIEW
} from '../components/menus/right/right_submenus/integrations/RightTrelloIntegrationMenu';
import { TRELLO_TOPICS_SUCCESS } from '../actions/right_bar_actions/trello_sync_panel_actions';

import TrelloApi from 'trello';

const trelloApi = new TrelloApi(
  window.TRELLO_PUBLIC_KEY,
  localStorage.trello_token
);

const INITIAL_STATE = {
  connected: !!localStorage.trello_token,
  rightPanelExpanded: false,
  loading: false,
  api: trelloApi,
  view: BOARD_VIEW,
  loadingView: false,
  boards: [],
  lists: [],
  cards: [],
  topics: {},
  filterTerm: ''
};

export default function trelloConnected(state = INITIAL_STATE, action) {
  switch (action.type) {
    case CONNECT_TRELLO_SUCCESS:
      return { ...state, connected: true, api: action.payload };
    case DISCONNECT_TRELLO:
      return { ...INITIAL_STATE, connected: false };
    case EXPAND_TRELLO_RIGHT_PANEL:
      return { ...state, rightPanelExpanded: true };
    case COLLAPSE_TRELLO_RIGHT_PANEL:
      return { ...state, rightPanelExpanded: false };
    case TRELLO_FETCH_REQUEST:
      return { ...state, loadingView: true };
    case TRELLO_LISTS_SUCCESS:
      return {
        ...state,
        loadingView: false,
        lists: action.payload,
        view: LIST_VIEW
      };
    case TRELLO_CARDS_SUCCESS:
      return {
        ...state,
        loadingView: false,
        cards: action.payload,
        view: CARD_VIEW
      };
    case TRELLO_BOARDS_SUCCESS:
      return {
        ...state,
        loadingView: false,
        boards: action.payload
      };
    case TRELLO_HOME_CLICK:
      return { ...state, view: BOARD_VIEW };

    case TRELLO_TOPICS_SUCCESS: {
      const { parentId, data } = action.payload;
      const topics = { ...state.topics };
      topics[parentId] = data;
      return { ...state, topics };
    }

    case TRELLO_UPDATE_FILTER_TERM:
      return { ...state, filterTerm: action.payload };

    case TRELLO_CLEAR_FILTER_TERM:
      return { ...state, filterTerm: '' };
  }
  return state;
}
