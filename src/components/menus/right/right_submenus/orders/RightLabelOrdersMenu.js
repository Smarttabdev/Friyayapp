import React from 'react';
import { connect } from 'react-redux';
import { array, func, object } from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createLabelOrder } from 'Src/newRedux/database/labelOrders/thunks';
import {
  getLabelOrders,
  getSelectedLabelOrder,
  getDefaultLabelOrder
} from 'Src/newRedux/database/labelOrders/selectors';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import OrdersMenuRow from '../elements/OrdersMenuRow';
import { updateLabelOrder } from 'Src/newRedux/database/labelOrders/thunks';

const RightLabelOrdersMenu = ({
  createLabelOrder,
  labelOrders,
  selectedLabelOrder,
  setRightMenuOpenForMenu,
  topicId,
  defaultLabelOrder,
  updateLabelOrder
}) => {
  const handleCreateOrder = () => {
    createLabelOrder({});
  };

  const handleSelectDefaultOrder = () => {
    if (defaultLabelOrder) {
      defaultLabelOrder.attributes.is_default = defaultLabelOrder.attributes.is_default.filter(
        topic => topic != topicId
      );
      updateLabelOrder(defaultLabelOrder);
    }
  };

  return (
    <div className="right-submenu">
      <div className="right-submenu_header">
        <IconButton
          fontAwesome
          icon="caret-left"
          onClick={() => setRightMenuOpenForMenu('Orders')}
        />
        <span className="ml5">Label Orders</span>
      </div>
      {labelOrders.map(labelOrder => (
        <OrdersMenuRow
          isDefault={labelOrder.attributes.is_default.includes(topicId)}
          isSelected={selectedLabelOrder == labelOrder}
          key={labelOrder.id}
          order={labelOrder}
          orderType="label"
          topicId={topicId}
          handleSelectDefaultOrder={handleSelectDefaultOrder}
        />
      ))}

      <div className="right-submenu_item option" key={'NEW'}>
        <a className="right-submenu_item" onClick={handleCreateOrder}>
          <span className="ml5">Create New Order</span>
        </a>
      </div>
    </div>
  );
};

RightLabelOrdersMenu.propTypes = {
  setRightMenuOpenForMenu: func.isRequired,
  labelOrders: array.isRequired,
  selectedLabelOrder: object,
  createLabelOrder: func
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  return {
    topicId,
    labelOrders: getLabelOrders(state),
    selectedLabelOrder: getSelectedLabelOrder(state),
    defaultLabelOrder: getDefaultLabelOrder(state)
  };
};

const mapDispatch = {
  createLabelOrder,
  setRightMenuOpenForMenu,
  updateLabelOrder
};

export default connect(mapState, mapDispatch)(RightLabelOrdersMenu);
