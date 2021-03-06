import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import filePicker from 'filepicker-js';

import lazyComponent from 'Components/lazy';

import NotSupported from './components/NotSupported';
import { Provider } from 'react-redux';
import store from './store/store';
import 'Lib/global_variables';

// import {
//   GET_APP_USER_REQUEST,
//   GET_APP_USER_FAILURE,
//   GET_APP_USER_SUCCESS,
//   SET_FOLLOWING_USER,
//   SET_UI_SETTINGS
// } from 'AppConstants';
// import { ApiRequest } from 'Lib/ApiRequest';

const AdminPage = lazyComponent(() =>
  import(/* webpackChunkName: "AdminPage" */ './admin/AdminPage')
);

const AppRoot = lazyComponent(() =>
  import(/* webpackChunkName: "AppRoot" */ './AppRoot')
);

window.vex.registerPlugin(require('vex-dialog'));

Pace.start();

const isJoin = window.location.pathname.includes('join');
const isLogin = window.location.pathname.includes('login');

// if (localStorage.getItem('user_id') !== null && !isJoin && !isLogin) {
//   store.dispatch({ type: GET_APP_USER_REQUEST });
//   ApiRequest.request({ url: 'me' })
//     .then(({ data: { data } }) => {
//       store.dispatch({ type: GET_APP_USER_SUCCESS, payload: data });
//       store.dispatch({
//         type: SET_UI_SETTINGS,
//         payload: data.relationships.user_profile.data.ui_settings
//       });
//       store.dispatch({
//         type: SET_FOLLOWING_USER,
//         payload: data.relationships.following_users.data.map(user => user.id)
//       });
//     })
//     .catch((error) => {
//       console.log('response', error);
//       if (response.status === 401) {
//         store.dispatch({ type: GET_APP_USER_FAILURE, payload: {
//           title: response.data.error
//         }});
//       }
//     });
// }

Messenger.options = { theme: 'flat' };

window.vex.defaultOptions = {
  content: '',
  showCloseButton: true,
  escapeButtonCloses: true,
  overlayClosesOnClick: true,
  appendLocation: 'body',
  className: 'vex-theme-plain',
  css: {},
  overlayClassName: '',
  contentClassName: '',
  contentCSS: {},
  closeClassName: '',
  closeCSS: {}
};

window.$document = $(document);

window.$document.ajaxSend(e => {
  if (this === e.target) {
    $.rails.disableFormElements($(this));
  }
});

window.$document.ajaxComplete(e => {
  if (this === e.target) {
    $.rails.enableFormElements($(this));
  }
});

filePicker.setKey(window.FILESTACK_API_KEY);

const ieVersionRegex = new RegExp('MSIE ([0-9]{1,}[\\.0-9]{0,})');

const isUnsupported =
  navigator.appName == 'Microsoft Internet Explorer' &&
  ieVersionRegex.exec(navigator.userAgent) !== null;

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('app-container');

const Root = () => {
  return isUnsupported ? (
    <NotSupported />
  ) : (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/" component={AppRoot} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Root />, MOUNT_NODE);

// ========================================================
// Developer Tools Setup
// ========================================================

// if (typeof __DEV__ !== 'undefined' && __DEV__) {
//   if (window.__REDUX_DEVTOOLS_EXTENSION__) {
//     typeof __REDUX_DEVTOOLS__ !== 'undefined' &&
//       __REDUX_DEVTOOLS__ &&
//       window.__REDUX_DEVTOOLS_EXTENSION__.open();
//   }
// }
