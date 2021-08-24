import actionTypes from './actionEnum';
import omit from 'lodash/omit';
import moment from 'moment';
import { returnRecordWithNewAttributes } from 'Lib/utilities';

const defaultState = {
  all_notif: {},
  isModalShown: false,
  showDesktopNotification: false,
  latestNotificationBody: {}
};

const showNotificationModal = (state, action) => {
  return Object.assign({}, state, {
    isModalShown: true
  });
};

const hideNotificationModal = (state, action) => {
  return Object.assign({}, state, {
    isModalShown: false
  });
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case actionTypes.add:
    case actionTypes.change:
      return Object.assign({}, state, {
        all_notif: { ...state.all_notif, ...action.payload }
      });

    case actionTypes.delete:
      return Object.assign({}, state, {
        all_notif: omit(state.all_notif, [action.payload])
      });

    case actionTypes.markAsRead: {
      const updateKeys = action.payload
        ? [action.payload]
        : Object.keys(state.all_notif);
      const updates = { ...state.all_notif };
      updateKeys.forEach(key => {
        updates[key] = returnRecordWithNewAttributes({
          record: updates[key],
          attributes: ['attributes.read_at'],
          values: [moment().format()]
        });
      });
      return Object.assign({}, state, {
        all_notif: updates
      });
    }

    case actionTypes.replace:
      return Object.assign({}, state, {
        all_notif: {
          ...omit(state.all_notif, [action.payload.replaceId]),
          ...action.payload.replacement
        }
      });

    case actionTypes.showNotificationModal:
      return showNotificationModal(state, action);

    case actionTypes.hideNotificationModal:
      return hideNotificationModal(state, action);

    case actionTypes.showDesktopNotification:
      return {
        ...state,
        showDesktopNotification: true,
        latestNotificationBody: action.payload.latestNotificationBody
      };
    case actionTypes.hideDesktopNotification:
      return {
        ...state,
        showDesktopNotification: false
      };

    default:
      return state;
  }
};
export default reducer;
