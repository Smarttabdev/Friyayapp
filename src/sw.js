import {
  getNotifierInfo,
  actionToText,
  renderDetailInfo
} from './newRedux/database/notifications/util';

import { NOTIFICATION_TYPE_MENTIONS_IN_CHAT } from 'Lib/push_notification';

self.addEventListener('install', event => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('push', async function(event) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const promise = self.registration.pushManager
    .getSubscription()
    .then(subscription => {
      if (!subscription) {
        return;
      }

      const url = `${
        self.API_URL
      }/notifications/push_notifications?endpoint=${encodeURIComponent(
        subscription.endpoint
      )}`;
      return fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })
        .then(res => res.json())
        .then(data => {
          data.data.forEach(showNotification);
        });
    });

  event.waitUntil(promise);
});

function showNotification(notification) {
  const action = notification.attributes.action;
  const notifier = notification.relationships.notifier;
  const notifiable = notification.relationships.notifiable;

  const notifierInfo = getNotifierInfo(notifier);
  let actionDesc = actionToText(action, notifiable);
  const body = renderDetailInfo(action, notifiable);

  if (action === NOTIFICATION_TYPE_MENTIONS_IN_CHAT) {
    const chatName = notifiable.data.tip.data.title;
    actionDesc = chatName ? `${actionDesc}${chatName}` : `${actionDesc} chat`;
  }

  const title = notifierInfo + ' ' + actionDesc;

  self.registration.showNotification(title, {
    tag: notification.id,
    body,
    icon: '/images/logo.png',
    timestamp: new Date(notification.attributes.updated_at).getTime(),
    renotify: true,
    silent: false
  });
}
