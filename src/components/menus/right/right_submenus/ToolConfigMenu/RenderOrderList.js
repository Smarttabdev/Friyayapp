import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { getTopicOrdersByTopic } from 'Src/newRedux/database/topicOrders/selectors';
import { getUserConfig } from 'Src/helpers/user_config';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { getSelectedLabelOrder } from 'Src/newRedux/database/labelOrders/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { selectLabelOrder } from 'Src/newRedux/database/labelOrders/thunks';
import { selectTopicOrder } from 'Src/newRedux/database/topicOrders/thunks';

const orderTypesNotFromQuery = ['cards_and_boards', 'labels'];
const orderTypesFromQuery = [
  'column_order',
  'people',
  'filters',
  'pinned_tools',
  'tool_boards'
];

const RenderList = ({
  list,
  type,
  selectedTopicOrder,
  selectedLabelOrder,
  activeCustomOrderId,
  topicId,
  lenseId,
  lenseKey
}) => {
  const [arrangedList, setArrangedList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({
    value: '',
    label: 'Select'
  });

  useEffect(() => {
    arrangeList();
  }, [list]);

  useEffect(() => {
    setSelectedOrder(arrangedList.find(item => item.isSelected));
  }, [arrangedList]);

  const arrangeList = () => {
    let updated = [];
    if (orderTypesNotFromQuery.includes(type.orderType)) {
      list.forEach(item => {
        updated.push({
          value: item.id,
          label: item.attributes.name,
          isSelected:
            type.orderType == orderTypesNotFromQuery[0]
              ? Number(selectedTopicOrder) == Number(item.id)
              : selectedLabelOrder == item,
          order: item
        });
      });
    } else if (orderTypesFromQuery.includes(type.orderType)) {
      list.forEach(item => {
        updated.push({
          value: toId(item.id),
          label: item.name,
          isSelected: item.id == activeCustomOrderId,
          order: item
        });
      });
    }
    setArrangedList(updated);
  };

  const handleSelectOrder = selected => {
    const { order } = selected;
    const { orderType } = type;

    orderType == 'cards_and_boards' &&
      selectTopicOrder({ topicId, topicOrder: order });
    orderType == 'labels' && selectLabelOrder(order.id);
    ['column_order', 'filters', 'people'].includes(orderType) &&
      mutations.selectCustomOrder({
        id: order.id,
        topicId,
        lenseId,
        lenseKey,
        orderType
      });
    if (orderType == 'pinned_tools') {
      mutations.selectPinnedLensesOrder({ id: order.id, topicId });
    }

    let updatedList = [];
    arrangedList.forEach(item => {
      updatedList.push({ ...item, isSelected: item.id == selected.value });
    });
    setArrangedList(updatedList);
  };

  return (
    <div className="value">
      <Select
        value={selectedOrder}
        options={arrangedList}
        onChange={handleSelectOrder}
      />
    </div>
  );
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);

  const { orders } = getUserConfig(state);
  const topicOrders = getTopicOrdersByTopic(state)[topicId || 0] || [];

  return {
    selectedTopicOrder: topicOrders.find(
      topicOrder => Number(topicOrder.id) === Number(orders.topic_order)
    )
      ? orders.topic_order
      : get(
          topicOrders.find(topicOrder => topicOrder.attributes.is_default),
          'id'
        ),
    selectedLabelOrder: getSelectedLabelOrder(state),
    topicId,
    lenseId: getCustomLensId(state),
    lenseKey: getRelevantViewForPage(state)
  };
};

const mapDispatch = {
  selectLabelOrder,
  selectTopicOrder
};

export default connect(mapState, mapDispatch)(RenderList);
