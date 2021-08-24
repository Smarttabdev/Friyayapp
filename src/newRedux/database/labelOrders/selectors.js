import { createSelector } from 'reselect';
import { sortAlpha } from 'Lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import get from 'lodash/get';
import { getUserConfig } from 'Src/helpers/user_config';

export const getLabelOrders = createSelector(
  state => stateMappings(state).labelOrders,
  labelOrders => sortAlpha(Object.values(labelOrders), 'name')
);

export const getSelectedLabelOrder = createSelector(
  state => stateMappings(state).labelOrders,
  state => get(getUserConfig(state), 'orders.user_topic_label_order'),
  state => stateMappings(state).page.topicId,
  (labelOrders, topicLabelOrderId, topicId = 0) => {
    return topicLabelOrderId
      ? labelOrders[Number(topicLabelOrderId)]
      : Object.values(labelOrders).find(label =>
          label.attributes.is_default.includes(topicId)
        );
  }
);

export const getDefaultLabelOrder = createSelector(
  state => stateMappings(state).labelOrders,
  state => stateMappings(state).page.topicId,
  (labelOrders, topicId = '0') =>
    Object.values(labelOrders).find(label =>
      label.attributes.is_default.includes(topicId)
    )
);

export default {
  getDefaultLabelOrder,
  getLabelOrders,
  getSelectedLabelOrder
};
