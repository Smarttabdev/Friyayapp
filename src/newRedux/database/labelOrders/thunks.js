import api from './apiCalls';
import { addLabelOrders, changeLabelOrder, deleteLabelOrder } from './actions';
import { addLabelOrderIdToLabelOrderNewOrChangeConfirmed } from 'Src/newRedux/session/actions';
import { normalizeLabelOrder, normalizeLabelOrders } from './schema';
import { overwriteRecordWithAttributesAndRelationships } from 'Lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { failure } from 'Utils/toast';
import { setTopicOderSettings } from 'Src/newRedux/database/topics/thunks';
import { batchActions } from 'redux-batch-enhancer';
import { changeTopic } from 'Src/newRedux/database/topics/actions';
import { updateUserDefaultOrderForTopic } from 'Src/newRedux/database/user/thunks';
import selectors from './selectors';
import Ability from 'Lib/ability';
import { setDomainOderSettings } from '../domains/thunks';

export const createLabelOrder = ({ attributes, relationships }) => async (
  dispatch,
  getState
) => {
  try {
    const newLabelOrderName = `${
      stateMappings(getState()).user.attributes.first_name
    }'s Label Order`;
    const newLabelOrder = await api.postLabelOrder({
      attributes: { ...attributes, name: newLabelOrderName }
    });
    const normalizedOrder = normalizeLabelOrder(newLabelOrder).labelOrders;
    const newOrderId = Object.keys(normalizedOrder)[0];

    dispatch(
      batchActions([
        addLabelOrders(normalizedOrder),
        addLabelOrderIdToLabelOrderNewOrChangeConfirmed(newOrderId),
        selectLabelOrder(newOrderId)
      ])
    );

    return newLabelOrder;
  } catch (error) {
    failure('Unable to save new order');
    return null;
  }
};

export const getLabelOrders = () => async dispatch => {
  try {
    const labelOrdersData = await api.fetchLabelOrders();
    dispatch(addLabelOrders(normalizeLabelOrders(labelOrdersData).labelOrders));
    return labelOrdersData;
  } catch (error) {
    failure('Unable to load label orders');
  }
};

export const safelyRemoveLabelOrder = orderId => async (dispatch, getState) => {
  const selectedLabelOrder = selectors.getSelectedLabelOrder(getState());
  dispatch(deleteLabelOrder(orderId));
  if (selectedLabelOrder === orderId) {
    dispatch(setTopicOderSettings({ user_topic_label_order: '' }));
  }
  await api.deleteLabelOrder(orderId);
};

export const selectLabelOrder = labelOrderId => async (dispatch, getState) => {
  try {
    const sm = stateMappings(getState());
    const topicId = sm.page.topicId || '0';
    const userId = sm.user.id;
    const update = {
      topic_id: Number(topicId),
      user_id: Number(userId),
      label_order_id: Number(labelOrderId),
      type: `label_orders`
    };
    const defaultOrder = selectors.getDefaultLabelOrder(getState());
    const topic = sm.topics[topicId];
    dispatch(
      batchActions([
        updateUserDefaultOrderForTopic({
          order: 'user_topic_label_order',
          update
        }),
        topicId === '0'
          ? setDomainOderSettings({
              user_topic_label_order: labelOrderId
            })
          : setTopicOderSettings({
              user_topic_label_order: labelOrderId
            })
      ])
    );
    if (!defaultOrder && Ability.can('update', 'self', topic)) {
      const labelOrder = sm.labelOrders[labelOrderId];
      labelOrder.attributes.is_default.push(topicId);
      dispatch(updateLabelOrder(labelOrder));
    }
  } catch (error) {
    failure('Unable to select label order');
  }
};

export const updateLabelOrder = ({ id, attributes, relationships }) => async (
  dispatch,
  getState
) => {
  const sm = stateMappings(getState());
  const topicId = sm.page.topicId || '0';

  const existingRecord = sm.labelOrders[id];
  attributes['topic_id'] = topicId;
  try {
    const updatedOrder = overwriteRecordWithAttributesAndRelationships({
      existingRecord,
      attributes,
      relationships
    });
    dispatch(changeLabelOrder(updatedOrder));
    await api.patchLabelOrder({ id, attributes, relationships });
  } catch (err) {
    dispatch(changeLabelOrder(existingRecord));
    failure('Unable to save latest label order');
  }
};

export const updateOrdersofLabels = ({
  id,
  attributes,
  relationships
}) => async (dispatch, getState) => {
  const existingRecord = stateMappings(getState()).labelOrders[id];

  try {
    const updatedOrder = overwriteRecordWithAttributesAndRelationships({
      existingRecord,
      attributes,
      relationships
    });
    dispatch(changeLabelOrder(updatedOrder));
    await api.patchLabelOrder({ id, attributes, relationships });
  } catch (error) {
    failure('Unable to save latest label order');
    dispatch(changeLabelOrder(existingRecord));
  }
};
