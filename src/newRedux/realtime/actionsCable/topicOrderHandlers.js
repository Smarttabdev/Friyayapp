import { normalizeTopicOrder } from 'Src/newRedux/database/topicOrders/schema';
import {
  addTopicOrders,
  changeTopicOrder,
  deleteTopicOrder
} from 'Src/newRedux/database/topicOrders/actions';

export default (message, dispatch, getState) => ({
  topic_order_created: () => {
    const { data: topicOrder } = message.data;
    dispatch(
      addTopicOrders(
        normalizeTopicOrder({
          data: {
            data: topicOrder
          }
        }).topicOrders
      )
    );
  },
  topic_order_updated: () => {
    const { data: topicOrder } = message.data;
    dispatch(changeTopicOrder(topicOrder));
  },
  topic_order_deleted: () => {
    const { topic_order_id: topicOrderId } = message.data;
    dispatch(deleteTopicOrder(topicOrderId));
  }
});
