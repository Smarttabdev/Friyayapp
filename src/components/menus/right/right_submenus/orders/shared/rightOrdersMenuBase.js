import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import OrdersMenuRow from '../../elements/OrdersMenuRow';
import { getCustomLensId } from 'Src/helpers/user_config';
import createOrderQueryContainer from './orderQueryContainer';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { getToolDefaultFilters } from 'Lib/utilities';

const createRightOrdersMenuComponent = ({
  orderType,
  orderName,
  menuTitle
}) => {
  const RightColumnOrdersMenu = ({
    user,
    topicId,
    lenseId,
    lenseKey,
    setRightMenuOpenForMenu,
    query,
    relay
  }) => {
    useEffect(() => {
      const disposer = subscriptions.customOrdersUpdated({
        orderType,
        onNext: () => relay.refetch(vars => vars)
      });
      return () => disposer.dispose();
    }, []);

    const handleCreateOrder = async () => {
      await mutations.createCustomOrder({
        orderType,
        name: `${user.attributes.first_name}'s ${orderName}`,
        topicId,
        lenseId,
        lenseKey,
        defaultFilters:
          orderType === 'filters' && !query?.activeCustomOrder?.id
            ? getToolDefaultFilters(lenseKey)
            : null,
        copyFrom: orderType === 'filters' ? query?.activeCustomOrder?.id : null
      });
      relay.refetch(vars => vars);
    };

    const handleCopyOrder = sourceOrder => async () => {
      await mutations.createCustomOrder({
        orderType,
        name: `${sourceOrder.name} Copy`,
        topicId,
        lenseId,
        lenseKey,
        order: sourceOrder.order
      });
      relay.refetch(vars => vars);
    };

    return (
      <div className="right-submenu">
        <div className="right-submenu_header">
          <IconButton
            fontAwesome
            icon="caret-left"
            onClick={() => setRightMenuOpenForMenu('Orders')}
          />
          <span className="ml5">{menuTitle}</span>
        </div>
        {query.customOrders.map(order => (
          <OrdersMenuRow
            key={order.id}
            order={order}
            orderType={orderType}
            topicId={topicId}
            lenseId={lenseId}
            lenseKey={lenseKey}
            isSelected={order.id == query?.activeCustomOrder?.id}
            isDefault={order.id == query?.defaultCustomOrder?.id}
            onCopyOrder={handleCopyOrder(order)}
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

  RightColumnOrdersMenu.propTypes = {
    setRightMenuOpenForMenu: PropTypes.func.isRequired
  };

  return RightColumnOrdersMenu;
};

const mapState = state => {
  const {
    user,
    page: { topicId }
  } = stateMappings(state);
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  return {
    user,
    topicId,
    lenseId,
    lenseKey
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu
};

const createRightOrdersMenu = ({ orderType, orderName, menuTitle, scope }) => {
  return connect(
    mapState,
    mapDispatch
  )(
    createOrderQueryContainer(
      createRightOrdersMenuComponent({ orderType, orderName, menuTitle }),
      orderType,
      scope
    )
  );
};

export default createRightOrdersMenu;
