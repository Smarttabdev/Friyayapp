import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bool, func, object } from 'prop-types';

import {
  updateLabelOrder,
  safelyRemoveLabelOrder,
  selectLabelOrder
} from 'Src/newRedux/database/labelOrders/thunks';
import {
  updateTopicOrder,
  removeTopicOrder,
  selectTopicOrder
} from 'Src/newRedux/database/topicOrders/thunks';
import { updateTopic } from 'Src/newRedux/database/topics/thunks';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';

import DefaultBadge from 'Components/shared/badges/DefaultBadge';
import Input from 'Components/shared/forms/Input';
import OrdersMenuDropDown from './OrdersMenuDropDown';

const customOrderTypes = ['topics', 'column_order', 'filters', 'people'];

class OrdersMenuRow extends PureComponent {
  static propTypes = {
    isSelected: bool,
    isDefault: bool,
    order: object.isRequired,
    safelyRemoveLabelOrder: func.isRequired,
    removeTopicOrder: func.isRequired,
    setRightMenuOpenForMenu: func.isRequired,
    updateLabelOrder: func.isRequired,
    updateTopicOrder: func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      inEditMode: false,
      orderName: props.order?.attributes?.name || props.order.name
    };
  }

  handleChangeName = e => {
    this.setState({ orderName: e.target.value });
  };

  handleKeyDown = e => {
    (e.key == 'Escape' || e.keyCode == 27) && this.handleToggleEditMode();
  };

  handleRemoveOrder = async () => {
    const {
      order,
      orderType,
      topicId,
      lenseId,
      lenseKey,
      safelyRemoveLabelOrder,
      removeTopicOrder
    } = this.props;
    orderType == 'label' && safelyRemoveLabelOrder(order.id);
    orderType == 'topic' && removeTopicOrder(order.id);
    customOrderTypes.includes(orderType) &&
      mutations.deleteCustomOrder({
        id: order.id,
        orderType,
        topicId,
        lenseId,
        lenseKey
      });
    if (orderType == 'pinnedLens') {
      mutations.deletePinnedLensesOrder({ id: order.id });
    }
  };

  handleSelectOrder = () => {
    const {
      order,
      orderType,
      setRightMenuOpenForMenu,
      topicId,
      lenseId,
      lenseKey,
      selectTopicOrder,
      selectLabelOrder
    } = this.props;
    orderType == 'label' && selectLabelOrder(order.id);
    orderType == 'topic' && selectTopicOrder({ topicId, topicOrder: order });
    customOrderTypes.includes(orderType) &&
      mutations.selectCustomOrder({
        id: order.id,
        topicId,
        lenseId,
        lenseKey,
        orderType
      });
    if (orderType == 'pinnedLens') {
      mutations.selectPinnedLensesOrder({ id: order.id, topicId });
    }
    setRightMenuOpenForMenu(false);
  };

  handleSetAsDefaultForTopic = () => {
    const {
      order,
      orderType,
      topicId,
      lenseId,
      lenseKey,
      isDefault
    } = this.props;
    if (!isDefault) {
      if (customOrderTypes.includes(orderType)) {
        mutations.setDefaultCustomOrder({
          id: order.id,
          topicId,
          lenseId,
          lenseKey
        });
      } else if (orderType == 'pinnedLens') {
        mutations.setDefaultPinnedLensesOrder({ id: order.id, topicId });
      } else {
        let defaultOrder = { ...order };
        if (orderType === 'topic') {
          defaultOrder.attributes.is_default = true;
        } else {
          defaultOrder.attributes.is_default.push(topicId);
          defaultOrder.attributes.is_default = [
            ...new Set(defaultOrder.attributes.is_default)
          ];
        }
        this.props.handleSelectDefaultOrder(defaultOrder);
        orderType == 'topic' && this.props.updateTopicOrder(defaultOrder);
        orderType == 'label' && this.props.updateLabelOrder(defaultOrder);
      }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    const { order, orderType, updateLabelOrder, updateTopicOrder } = this.props;
    orderType == 'label' &&
      updateLabelOrder({
        id: order.id,
        attributes: { name: this.state.orderName }
      });
    orderType == 'topic' &&
      updateTopicOrder({
        id: order.id,
        attributes: { name: this.state.orderName }
      });
    customOrderTypes.includes(orderType) &&
      mutations.updateCustomOrder({
        id: order.id,
        name: this.state.orderName
      });
    if (orderType == 'pinnedLens') {
      mutations.updatePinnedLensesOrder({
        id: order.id,
        name: this.state.orderName
      });
    }
    this.handleToggleEditMode();
  };

  handleToggleEditMode = () => {
    this.state.inEditMode
      ? window.removeEventListener('keydown', this.handleKeyDown, true)
      : window.addEventListener('keydown', this.handleKeyDown, true);
    this.setState(state => ({ inEditMode: !state.inEditMode }));
  };

  render() {
    const { isSelected, orderType, order, topicId, onCopyOrder } = this.props;
    let { isDefault } = this.props;
    const { inEditMode, orderName } = this.state;

    return (
      <div className="right-submenu_item option" key={order.id}>
        {inEditMode ? (
          <form onSubmit={this.handleSubmit}>
            <Input defaultValue={orderName} onChange={this.handleChangeName} />
          </form>
        ) : (
          <a
            className={`right-submenu_item ${isSelected && 'active bold'}`}
            onClick={this.handleSelectOrder}
          >
            <span className="ml5">{order?.attributes?.name || order.name}</span>
            {isDefault && <DefaultBadge />}
          </a>
        )}
        <OrdersMenuDropDown
          order={order}
          onConfirmDelete={this.handleRemoveOrder}
          onSetAsDefaultForTopic={this.handleSetAsDefaultForTopic}
          onEditNameClick={this.handleToggleEditMode}
          onCopyClick={onCopyOrder}
        />
      </div>
    );
  }
}

const mapDispatch = {
  safelyRemoveLabelOrder,
  removeTopicOrder,
  setRightMenuOpenForMenu,
  updateLabelOrder,
  updateTopic,
  updateTopicOrder,
  selectTopicOrder,
  selectLabelOrder
};

export default connect(undefined, mapDispatch)(OrdersMenuRow);
