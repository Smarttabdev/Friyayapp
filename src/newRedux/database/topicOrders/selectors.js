import { createSelector } from 'reselect';
import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  reduceArrayToMappedObjectForAttribute,
  sortAlpha
} from 'Lib/utilities';
import get from 'lodash/get';
import mapValues from 'lodash/mapValues';
import { getUserConfig } from 'Src/helpers/user_config';
import { getCurrentDomain } from 'Src/newRedux/database/domains/selectors';
import { getCardArray } from 'Src/newRedux/database/cards/selectors';

export const getRelevantTopicOrderForTopic = createSelector(
  (state, topicId) => topicId || '0',
  state => getTopicOrdersByTopic(state),
  state => get(getUserConfig(state), 'orders.topic_order'),
  (topicId = '0', topicOrdersByTopic, currentTopicOrder) => {
    if (topicOrdersByTopic[topicId]) {
      const defaultOrder = topicOrdersByTopic[topicId].find(
        topicOrder => topicOrder.attributes.is_default
      );
      const topicOrder =
        (currentTopicOrder &&
          topicOrdersByTopic[topicId].find(
            topicOrder => Number(currentTopicOrder) === Number(topicOrder.id)
          )) ||
        defaultOrder;
      return topicOrder;
    }
    return null;
  }
);

export const getRelevantTopicOrderByTopic = createSelector(
  state => getTopicOrdersByTopic(state),
  state => get(getUserConfig(state), 'orders.topic_order'),
  (topicOrdersByTopic, currentTopicOrder) =>
    mapValues(
      topicOrdersByTopic,
      arrayOfTopicOrders =>
        arrayOfTopicOrders.find(
          topicOrder => currentTopicOrder == topicOrder.id
        ) ||
        arrayOfTopicOrders.find(
          topicOrder => topicOrder.attributes.is_default
        ) ||
        null
    )
);

const getTopicOrders = createSelector(
  state => stateMappings(state).topicOrders,
  topicOrders => sortAlpha(Object.values(topicOrders), 'name')
);

export const getTopicOrdersByTopic = createSelector(
  state => getTopicOrders(state),
  topicOrders =>
    reduceArrayToMappedObjectForAttribute(topicOrders, 'attributes.topic_id')
);

//TODO: replace consumers of this with getBYtopic and remove this as it adds no value:
export const getTopicOrdersForTopic = createSelector(
  (state, topicId) => getTopicOrdersByTopic(state),
  (state, topicId) => topicId,
  (topicOrdersByTopic, topicId) => topicOrdersByTopic[topicId]
);

export const getCardsByCreator = createSelector(
  state => getCardArray(state),
  cards =>
    cards.reduce((a, b) => {
      const cardCreatorId = get(b, 'attributes.creator.id', '0');
      a[cardCreatorId] = a[cardCreatorId] ? [...a[cardCreatorId], b] : [b];
      return a;
    }, {})
);

export const getDomainTopicOrder = createSelector(
  getTopicOrdersByTopic,
  getCurrentDomain,
  (topicOrders, domain) => {
    topicOrders = topicOrders[0] || [];
    return (
      topicOrders.find(
        topicOrder =>
          topicOrder.id ==
          get(
            domain,
            'attributes.user_configuration.data.attributes.orders.topic_order'
          )
      ) ||
      topicOrders.find(topicOrder => topicOrder.attributes.is_default) ||
      null
    );
  }
);
