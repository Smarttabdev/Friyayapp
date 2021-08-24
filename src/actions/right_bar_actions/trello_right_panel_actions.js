export const EXPAND_TRELLO_RIGHT_PANEL = 'EXPAND_TRELLO_RIGHT_PANEL';
export const COLLAPSE_TRELLO_RIGHT_PANEL = 'COLLAPSE_TRELLO_RIGHT_PANEL';
export const TRELLO_FETCH_REQUEST = 'TRELLO_FETCH_REQUEST';
export const TRELLO_LISTS_SUCCESS = 'TRELLO_LISTS_SUCCESS';
export const TRELLO_CARDS_SUCCESS = 'TRELLO_CARDS_SUCCESS';
export const TRELLO_HOME_CLICK = 'TRELLO_HOME_CLICK';
export const TRELLO_BOARDS_SUCCESS = 'TRELLO_BOARDS_SUCCESS';
export const TRELLO_UPDATE_FILTER_TERM = 'TRELLO_UPDATE_FILTER_TERM';
export const TRELLO_CLEAR_FILTER_TERM = 'TRELLO_CLEAR_FILTER_TERM';
import AppDispatcher from '../../dispatchers/app_dispatcher';

export function expandTrelloRightPanel() {
  AppDispatcher.dispatch({ type: 'EXPAND_ACTION_BAR' });
  return {
    type: 'EXPAND_TRELLO_RIGHT_PANEL'
  };
}

export function collapseTrelloRightPanel() {
  AppDispatcher.dispatch({ type: 'CLOSE_ACTION_BAR' });
  return {
    type: COLLAPSE_TRELLO_RIGHT_PANEL
  };
}

export function fetchLists(api, boardId) {
  return dispatch => {
    dispatch({ type: TRELLO_FETCH_REQUEST });
    api.getListsOnBoard(boardId).then(response => {
      dispatch({
        type: TRELLO_LISTS_SUCCESS,
        payload: response
      });
      dispatch({
        type: TRELLO_CLEAR_FILTER_TERM
      });
    });
  };
}

export function fetchCards(api, listId) {
  return dispatch => {
    dispatch({ type: TRELLO_FETCH_REQUEST });
    api.getCardsOnList(listId).then(response => {
      dispatch({
        type: TRELLO_CARDS_SUCCESS,
        payload: response
      });
      dispatch({
        type: TRELLO_CLEAR_FILTER_TERM
      });
    });
  };
}

export function fetchBoards(api) {
  return dispatch => {
    dispatch({ type: TRELLO_FETCH_REQUEST });
    api.getBoards('me').then(response => {
      dispatch({
        type: TRELLO_BOARDS_SUCCESS,
        payload: response
      });
      dispatch({
        type: TRELLO_CLEAR_FILTER_TERM
      });
    });
  };
}

export function updateFilterTerm(term) {
  return {
    type: TRELLO_UPDATE_FILTER_TERM,
    payload: term
  };
}

export function homeClick() {
  return {
    type: TRELLO_HOME_CLICK
  };
}
