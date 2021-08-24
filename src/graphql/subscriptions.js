import { cloneDeep } from 'lodash';
import { requestSubscription } from 'Lib/relay';
import { addNotifications } from 'Src/newRedux/database/notifications/actions';
import {
  normalizeNotification,
  normalizeNotifications
} from 'Src/newRedux/database/notifications/schema';
import reduxStore from 'Src/store/store';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { changeCard } from 'Src/newRedux/database/cards/actions';
import { prepareLogtimes } from 'Src/newRedux/database/logtimes/actions';

export const logTimeCreated = ({ tipId }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsLogTimeCreatedSubscription($tipId: ID!) {
        logTimeCreated(tipId: $tipId) {
          logTime {
            jsonApi
          }
        }
      }
    `,
    vars: {
      tipId: toGid('Tip', tipId)
    },
    onNext: data => {
      if (!data.logTimeCreated?.logTime?.jsonApi) return;
      let card = stateMappings(reduxStore.getState()).cards[toId(tipId)];
      if (!card) return;
      reduxStore.dispatch(
        changeCard({
          ...card,
          attributes: {
            ...card.attributes,
            log_times: card.attributes.log_times.concat(
              data.logTimeCreated.logTime.jsonApi
            )
          }
        })
      );
      const cards = stateMappings(reduxStore.getState()).cards;
      reduxStore.dispatch(prepareLogtimes(Object.values(cards)));
    }
  });

export const logTimeUpdated = ({ tipId }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsLogTimeUpdatedSubscription($tipId: ID!) {
        logTimeUpdated(tipId: $tipId) {
          logTime {
            jsonApi
          }
        }
      }
    `,
    vars: {
      tipId: toGid('Tip', tipId)
    },
    onNext: data => {
      const logTime = data.logTimeUpdated?.logTime?.jsonApi;
      if (!logTime) return;
      let card = stateMappings(reduxStore.getState()).cards[toId(tipId)];
      if (!card) return;
      reduxStore.dispatch(
        changeCard({
          ...card,
          attributes: {
            ...card.attributes,
            log_times: card.attributes.log_times.map(lt => {
              return lt.id === logTime.id ? logTime : lt;
            })
          }
        })
      );
      const cards = stateMappings(reduxStore.getState()).cards;
      reduxStore.dispatch(prepareLogtimes(Object.values(cards)));
    }
  });

export const logTimeDeleted = ({ tipId }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsLogTimeDeletedSubscription($tipId: ID!) {
        logTimeDeleted(tipId: $tipId) {
          logTime {
            id
          }
        }
      }
    `,
    vars: {
      tipId: toGid('Tip', tipId)
    },
    onNext: data => {
      const logTimeId = toId(data.logTimeDeleted?.logTime?.id);
      if (!logTimeId) return;
      let card = stateMappings(reduxStore.getState()).cards[toId(tipId)];
      if (!card) return;
      reduxStore.dispatch(
        changeCard({
          ...card,
          attributes: {
            ...card.attributes,
            log_times: card.attributes.log_times.filter(lt => {
              return lt.id !== logTimeId;
            })
          }
        })
      );
      const cards = stateMappings(reduxStore.getState()).cards;
      reduxStore.dispatch(prepareLogtimes(Object.values(cards)));
    }
  });

export const logTimeSubscriptions = ({ tipId }) => [
  logTimeCreated({ tipId }),
  logTimeUpdated({ tipId }),
  logTimeDeleted({ tipId })
];

export const activityCreated = ({
  action,
  notifierId,
  tipId,
  topicId,
  onNext
}) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsActivityCreatedSubscription(
        $action: ActivityEnum
        $notifierId: ID
        $reportableId: ID
      ) {
        activityCreated(
          action: $action
          notifierId: $notifierId
          reportableId: $reportableId
        ) {
          activity {
            action
            createdAt
            reportableType
            reportable {
              ... on Tip {
                id
                title
                slug
              }
              ... on Topic {
                id
                title
                slug
              }
            }
            object {
              ... on Label {
                name
                color
                kind
              }
            }
            notifier {
              id
              name
            }
          }
        }
      }
    `,
    vars: {
      action,
      notifierId: toGid('User', notifierId),
      reportableId: tipId
        ? toGid('Tip', tipId)
        : topicId
        ? toGid('Topic', topicId)
        : null
    },
    onNext
  });

export const notificationList = () =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsNotificationListSubscription {
        notificationList {
          notifications {
            id
            jsonApi
          }
        }
      }
    `,
    updater: store => {
      const rootField = store.getRootField('notificationList');
      if (!rootField) return;
      const notifications = rootField.getLinkedRecords('notifications');
      if (!notifications) return;
      const list = notifications.map(n =>
        cloneDeep(n.getValue('jsonApi').data)
      );
      const normalized = normalizeNotifications({ data: { data: list } });
      reduxStore.dispatch(addNotifications(normalized.notifications));
    }
  });

export const notificationCreated = () =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsNotificationCreatedSubscription {
        notificationCreated {
          notification {
            id
            jsonApi
          }
        }
      }
    `,
    updater: store => {
      const rootField = store.getRootField('notificationCreated');
      if (!rootField) return;
      const notification = rootField.getLinkedRecord('notification');
      if (!notification) return;
      const data = cloneDeep(notification.getValue('jsonApi'));
      const normalized = normalizeNotification({ data });
      reduxStore.dispatch(addNotifications(normalized.notifications));

      // ** push notifications are handled by sw.js
      // const first = Object.values(normalized.notifications)[0];
      // reduxStore.dispatch(
      //   pushNotification(first.relationships.user.data.id, { data: first })
      // );
    }
  });

export const customOrdersUpdated = ({ orderType, onNext }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsCustomOrdersUpdatedSubscription(
        $orderType: CustomOrderEnum!
      ) {
        customOrdersUpdated(orderType: $orderType) {
          id
        }
      }
    `,
    vars: { orderType },
    onNext
  });

export const pinnedLensesOrdersUpdated = ({ onNext }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsPinnedLensesOrdersUpdatedSubscription {
        pinnedLensesOrdersUpdated {
          id
        }
      }
    `,
    onNext
  });

export const blockCreated = ({ ownerId, ...rest }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsBlockCreatedSubscription($ownerId: ID!) {
        blockCreated(ownerId: $ownerId) {
          block {
            id
            type
            position
            config
          }
        }
      }
    `,
    vars: { ownerId },
    ...rest
  });

export const blockUpdated = ({ id, ...rest }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsBlockUpdatedSubscription($id: ID!) {
        blockUpdated(id: $id) {
          block {
            id
            position
            config
          }
        }
      }
    `,
    vars: { id },
    ...rest
  });

export const unreadChatsUpdated = () =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsUnreadChatsUpdatedSubscription {
        chatUnreadCountUpdated {
          chatUnreadCount {
            id
            count
          }
        }
      }
    `
  });

export const chatMessageUpdated = ({ tipId }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsChatMessageUpdatedSubscription($tipId: ID!) {
        chatMessageUpdated(tipId: $tipId) {
          chatMessage {
            id
            body
            unread
          }
        }
      }
    `,
    vars: { tipId: toGid('Tip', tipId) }
  });

export const chatMessageDeleted = ({ tipId, ...rest }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsChatMessageDeletedSubscription($tipId: ID!) {
        chatMessageDeleted(tipId: $tipId) {
          id
        }
      }
    `,
    vars: { tipId: toGid('Tip', tipId) },
    ...rest
  });

export const channelFlagUpdated = ({ channel, flag, onNext }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsChannelFlagUpdatedSubscription(
        $channel: String!
        $flag: String!
      ) {
        channelFlagUpdated(channel: $channel, flag: $flag) {
          channelFlag {
            id
            channel
            users {
              id
            }
          }
        }
      }
    `,
    vars: { channel, flag },
    onNext
  });

export const customFieldUpdated = ({ id }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsCustomFieldUpdatedSubscription($id: ID!) {
        customFieldUpdated(id: $id) {
          customField {
            id
            name
            fieldType
          }
        }
      }
    `,
    vars: { id }
  });

export const customFieldValueUpdated = ({ id }) =>
  requestSubscription({
    subscription: graphql`
      subscription subscriptionsFieldValueUpdatedSubscription($id: ID!) {
        customFieldValueUpdated(id: $id) {
          customFieldValue {
            id
            value
          }
        }
      }
    `,
    vars: { id }
  });
