import api from './apiCalls';

import { addTopicIdToTopicOrderNewOrChangeConfirmed } from 'Src/newRedux/session/actions';
import { addTopicOrders, changeTopicOrder, deleteTopicOrder } from './actions';
import { batchActions } from 'redux-batch-enhancer';
import { getTopicOrdersByTopic } from './selectors';
import { normalizeTopicOrder, normalizeTopicOrders } from './schema';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { failure } from 'Utils/toast';
import { updateUserDefaultOrder } from 'Src/newRedux/database/user/thunks';
import { setTopicOderSettings } from 'Src/newRedux/database/topics/thunks';
import { getRelevantTopicOrderForTopic } from 'Src/newRedux/database/topicOrders/selectors';
import { setDomainOderSettings } from '../domains/thunks';

export const createTopicOrder = ({
  cardOrder,
  isDefault = false,
  subtopicOrder,
  sheetViewColumnOrder,
  topicId
}) => async (dispatch, getState) => {
  const name = `${
    stateMappings(getState()).user.attributes.first_name
  }'s order`;
  const userId = stateMappings(getState()).user.id;
  const activeTopicOrder = getRelevantTopicOrderForTopic(getState(), topicId);
  const topicOrder = {
    attributes: {
      name,
      is_default: isDefault,
      subtopic_order: subtopicOrder,
      tip_order: cardOrder,
      sheet_view_column_order:
        sheetViewColumnOrder ||
        activeTopicOrder?.attributes?.sheet_view_column_order,
      sheet_view_column_width:
        activeTopicOrder?.attributes?.sheet_view_column_width,
      topic_id: topicId || '0',
      user_id: userId
    }
  };

  try {
    const newTopicOrder = await api.postTopicOrder(topicOrder);

    dispatch(
      batchActions([
        addTopicOrders(normalizeTopicOrder(newTopicOrder).topicOrders),
        selectTopicOrder({ topicId, topicOrderId: newTopicOrder.data.data.id }),
        addTopicIdToTopicOrderNewOrChangeConfirmed(topicId)
      ])
    );

    return newTopicOrder;
  } catch (error) {
    failure('Unable to create new order');
  }
};

export const getTopicOrders = ({ topicId }) => async dispatch => {
  try {
    const topicOrdersData = await api.fetchTopicOrders(topicId);
    const normalizedTopicOrders = normalizeTopicOrders(topicOrdersData)
      .topicOrders;
    dispatch(addTopicOrders(normalizedTopicOrders));
    return topicOrdersData;
  } catch (error) {
    failure('Unable to load Board orders');
    return null;
  }
};

export const removeTopicOrder = topicOrderId => async (dispatch, getState) => {
  dispatch(deleteTopicOrder(topicOrderId));
  try {
    api.deleteTopicOrder(topicOrderId);
  } catch (error) {
    failure('Unable to remove order from the server');
  }
};

export const selectTopicOrder = ({
  topicId,
  topicOrder,
  topicOrderId
}) => async (dispatch, getState) => {
  const thisTopicOrderId = topicOrderId || topicOrder.id;
  const sm = stateMappings(getState());
  const userDefaultTopicOrders = sm.user.relationships.topic_orders.data;
  const thisTopicId =
    topicId || sm.topicOrders[thisTopicOrderId].attributes.topic_id || '0';
  const thisTopicsTopicOrders = (
    getTopicOrdersByTopic(getState())[thisTopicId] || []
  ).map(order => order.id);

  const updatedTopicOrders = [
    ...userDefaultTopicOrders.filter(id => !thisTopicsTopicOrders.includes(id)),
    thisTopicOrderId
  ];
  dispatch(
    batchActions([
      updateUserDefaultOrder({
        orderType: 'topic_orders',
        orderValue: updatedTopicOrders
      }),
      thisTopicId === '0'
        ? setDomainOderSettings({ topic_order: thisTopicOrderId })
        : setTopicOderSettings({
            topic_order: thisTopicOrderId
          })
    ])
  );
};

export const updateTopicOrder = ({ attributes, id, relationships }) => async (
  dispatch,
  getState
) => {
  const prevVersion = { ...getState()._newReduxTree.database.topicOrders[id] };
  const newVersion = {
    ...prevVersion,
    attributes: {
      ...prevVersion.attributes,
      ...attributes
    },
    relationships: {
      ...prevVersion.relationships,
      ...relationships
    }
  };
  dispatch(changeTopicOrder(newVersion));

  try {
    await api.patchTopicOrder(newVersion);
  } catch (error) {
    failure('Unable to save changes');
    dispatch(changeTopicOrder(prevVersion));
  }
};
