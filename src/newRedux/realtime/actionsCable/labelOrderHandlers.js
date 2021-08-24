import { stateMappings } from 'Src/newRedux/stateMappings';
import {
  addLabelOrders,
  changeLabelOrder,
  deleteLabelOrder
} from 'Src/newRedux/database/labelOrders/actions';
import { normalizeLabelOrder } from 'Src/newRedux/database/labelOrders/schema';
import selectors from 'Src/newRedux/database/labelOrders/selectors';
import { setTopicOderSettings } from 'Src/newRedux/database/topics/thunks';
import { setDomainOderSettings } from 'Src/newRedux/database/domains/thunks';

export default (message, dispatch, getState) => ({
  label_order_created: () => {
    const { data: newLabelOrder } = message.data;
    dispatch(
      addLabelOrders(
        normalizeLabelOrder({
          data: {
            data: newLabelOrder
          }
        }).labelOrders
      )
    );
  },
  label_order_updated: () => {
    const { data: updatedLabelOrder } = message.data;
    dispatch(changeLabelOrder(updatedLabelOrder));
  },
  label_order_deleted: () => {
    const { label_order_id: labelOrderId } = message.data;
    const { topicId } = stateMappings(getState()).page;
    const selectedLabelOrder = selectors.getSelectedLabelOrder(getState());

    dispatch(deleteLabelOrder(labelOrderId));

    if (selectedLabelOrder === labelOrderId) {
      topicId
        ? dispatch(setTopicOderSettings({ user_topic_label_order: '' }))
        : setDomainOderSettings({ user_topic_label_order: '' });
    }
  }
});
