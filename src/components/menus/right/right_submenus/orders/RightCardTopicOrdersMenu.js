import React from 'react';
import { connect } from 'react-redux';
import { array, func } from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getTopicOrdersByTopic } from 'Src/newRedux/database/topicOrders/selectors';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import {
  createTopicOrder,
  selectTopicOrder
} from 'Src/newRedux/database/topicOrders/thunks';
import IconButton from 'Components/shared/buttons/IconButton';
import OrdersMenuRow from '../elements/OrdersMenuRow';
import get from 'lodash/get';
import { getUserConfig } from 'Src/helpers/user_config';

const RightCardTopicOrdersMenu = ({
  createTopicOrder,
  selectedTopicOrder,
  setRightMenuOpenForMenu,
  topicId,
  topicOrders,
  ...props
}) => {
  const handleSelectDefaultOrder = defaultOrder => {
    for (let index = 0; index < topicOrders.length; index++) {
      const element = topicOrders[index];
      if (defaultOrder.id !== element.id) {
        element.attributes.is_default = false;
      }
    }
  };

  const handleCreateOrder = () => {
    createTopicOrder({ cardOrder: [], subtopicOrder: [], topicId });
  };

  const selectTopicOrder = order => () => {
    props.selectTopicOrder({ topicId, topicOrder: order });
    setRightMenuOpenForMenu(false);
  };

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => setRightMenuOpenForMenu('Orders')}
        />
        <span className="ml5">Card &amp; Board Orders</span>
      </div>
      {topicOrders.map(topicOrder => (
        <OrdersMenuRow
          isDefault={topicOrder.attributes.is_default}
          isSelected={Number(selectedTopicOrder) == Number(topicOrder.id)}
          key={topicOrder.id}
          order={topicOrder}
          orderType="topic"
          topicId={topicId}
          handleSelectDefaultOrder={handleSelectDefaultOrder}
        />
      ))}
      <div className="right-submenu_item option" key={'0'}>
        <a
          className={`right-submenu_item ${selectedTopicOrder == '0' &&
            'active bold'}`}
          onClick={selectTopicOrder('0')}
        >
          <span className="ml5">Most Recent First</span>
        </a>
      </div>
      <div className="right-submenu_item option" key={'NEW'}>
        <a className={'right-submenu_item'} onClick={handleCreateOrder}>
          <span className="ml5">Create New Order</span>
        </a>
      </div>
    </div>
  );
};

RightCardTopicOrdersMenu.propTypes = {
  setRightMenuOpenForMenu: func.isRequired,
  topicOrders: array.isRequired
};

const mapState = state => {
  const {
    page: { topicId },
    topics
  } = stateMappings(state);
  const { orders } = getUserConfig(state);
  const topicOrders = getTopicOrdersByTopic(state)[topicId || 0] || [];
  return {
    topicId: topicId || '0',
    topicOrders,
    selectedTopicOrder: topicOrders.find(
      topicOrder => Number(topicOrder.id) === Number(orders.topic_order)
    )
      ? orders.topic_order
      : get(
          topicOrders.find(topicOrder => topicOrder.attributes.is_default),
          'id'
        )
  };
};

const mapDispatch = {
  createTopicOrder,
  setRightMenuOpenForMenu,
  selectTopicOrder
};

export default connect(mapState, mapDispatch)(RightCardTopicOrdersMenu);
