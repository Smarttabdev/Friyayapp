import { normalizeNotification, normalizeNotifications } from './schema';
import {
  addNotifications,
  changeNotification,
  markAsRead,
  notificationModalHide,
  notificationModalShow,
  showDesktopNotification
} from './actions';
import { setLiveNotification } from 'Src/newRedux/bot/actions';
import { success, failure } from 'Utils/toast';
import api from './apiCalls';
import {
  makeDesktopNotificationBody,
  getNotifierInfo,
  actionToText,
  renderDetailInfo
} from './util';
import get from 'lodash/get';
import { NOTIFICATION_TYPE_MENTIONS_IN_CHAT } from 'Lib/push_notification';
import { stateMappings } from 'Src/newRedux/stateMappings';

export const getNotifications = () => async (dispatch, getState) => {
  try {
    const notificationsData = await api.fetchNotifications();

    dispatch(
      addNotifications(normalizeNotifications(notificationsData).notifications)
    );
    return notificationsData;
  } catch (error) {
    failure('Unable to load notifications');
    return null;
  }
};

export const pushNotification = (userId = null, notification = null) => async (
  dispatch,
  getState
) => {
  if (notification.live_notification) {
    return dispatch(setLiveNotification(notification));
  }

  if (userId && notification && notification.data) {
    const {
      data: { relationships }
    } = notification;
    const {
      user: {
        data: { id }
      }
    } = relationships;
    if (
      !relationships ||
      !relationships.user ||
      !relationships.user.data ||
      userId.toString() !== id.toString()
    )
      return false;
    dispatch(addNotifications({ [notification.data.id]: notification.data }));

    // show desktop notification here

    const action = get(notification, 'data.attributes.action');
    const notifier = get(notification, 'data.relationships.notifier');
    const notifiable = get(notification, 'data.relationships.notifiable');

    const notifierInfo = getNotifierInfo(notifier);
    let actionDesc = actionToText(action, notifiable);
    const body = renderDetailInfo(action, notifiable);

    // console.log(notifierInfo, actionDesc, body);

    if (action === NOTIFICATION_TYPE_MENTIONS_IN_CHAT) {
      const chatID = get(notifiable, 'data.tip_id');
      let chatName = get(
        stateMappings(getState()).cards,
        `${chatID}.attributes.title`,
        ''
      );

      actionDesc = chatName ? `${actionDesc}${chatName}` : `${actionDesc} chat`;
    }

    dispatch(
      showDesktopNotification(
        makeDesktopNotificationBody({
          tag: get(notification, 'data.id'),
          title: notifierInfo + ' ' + actionDesc,
          body: body
        })
      )
    );
  }
};

export const markNotificationsAsRead = ({ id } = {}) => async (
  dispatch,
  getState
) => {
  try {
    dispatch(markAsRead(id));
    await api.markNotificationAsRead(id);
  } catch (error) {
    failure('There was a problem');
    return null;
  }
};

export const hideNotificationModal = () => {
  return (dispatch, getState) => {
    dispatch(notificationModalHide());
  };
};

export const showNotificationModal = () => {
  return (dispatch, getState) => {
    dispatch(notificationModalShow());
  };
};
