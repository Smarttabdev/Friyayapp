import wrapper from 'Lib/trello_client';
import jQuery from 'jquery';
import { ApiRequest } from 'lib/ApiRequest';
import { success, failure } from 'Utils/toast';
import store from '../../store/store';
import TrelloApi from 'trello';
import { TRELLO_BOARDS_SUCCESS } from './trello_right_panel_actions';
import AppDispatcher from '../../dispatchers/app_dispatcher';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';

export const CONNECT_TRELLO_FAIL = 'CONNECT_TRELLO_FAIL';
export const CONNECT_TRELLO_SUCCESS = 'CONNECT_TRELLO_SUCCESS';
export const CONNECTING_TRELLO = 'CONNECTING_TRELLO';
export const DISCONNECT_TRELLO = 'DISCONNECT_TRELLO';

export function loadTrello() {
  var opts = {
    version: 1,
    apiEndpoint: 'https://api.trello.com',
    authEndpoint: 'https://trello.com',
    intentEndpoint: 'https://trello.com',
    key: window.TRELLO_PUBLIC_KEY
  };

  wrapper(window, jQuery, opts);
}

export function connectTrello() {
  Trello.authorize({
    name: 'Friyay',
    type: 'popup',
    interactive: true,
    expiration: 'never',
    success: onSuccess,
    error: onFailure,
    scope: { write: true, read: true }
  });
}

function onSuccess() {
  // Post token to back-end
  const id = store.getState().appUser.id;
  const params = {
    data: {
      attributes: {
        user_attributes: { id }
      },
      integration_tokens: {
        trello_token: Trello.token()
      }
    }
  };

  ApiRequest.post(`users/${id}/user_profile`, params)
    .then(postConnect)
    .catch(error => console.log(error));
}

function postConnect() {
  localStorage.trello_token = Trello.token();
  success('Trello connected');
  const api = new TrelloApi(
    window.TRELLO_PUBLIC_KEY,
    localStorage.trello_token
  );
  store.dispatch({
    type: CONNECT_TRELLO_SUCCESS,
    payload: api
  });
  api.getBoards('me').then(response => {
    store.dispatch({
      type: TRELLO_BOARDS_SUCCESS,
      payload: response
    });
  });
}

function onFailure() {
  failure('Unable to connect Trello');
}

export function disconnect() {
  AppDispatcher.dispatch({ type: 'CLOSE_ACTION_BAR' });
  const params = {
    data: {
      attributes: {
        user_attributes: {
          id: store.getState().appUser.id
        }
      },
      integration_tokens: {
        trello_token: null
      }
    }
  };

  return dispatch => {
    ApiRequest.post(`users/${store.getState().appUser.id}/user_profile`, params)
      .then(response => {
        localStorage.removeItem('trello_token');
        dispatch({ type: DISCONNECT_TRELLO });
        dispatch(setRightMenuOpenForMenu('Integrations'));
      })
      .catch(error => console.log(error));
  };
}
