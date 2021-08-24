import React, { Component } from 'react';
import { orderTypes } from './data';
import OrdersSectionValue from './OrdersSectionValue';

class OrdersSection extends Component {
  render() {
    return (
      <div className="right-submenu_item option hasChildren">
        <div className="title">Orders</div>
        {orderTypes.map((type, i) => (
          <div key={i} className="right-submenu_item option">
            <div className="title">{type.title}</div>
            <OrdersSectionValue type={type} />
          </div>
        ))}
      </div>
    );
  }
}

export default OrdersSection;
