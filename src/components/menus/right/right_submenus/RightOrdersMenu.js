import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { stateMappings } from 'Src/newRedux/stateMappings';

import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import RightCardTopicOrdersMenu from './orders/RightCardTopicOrdersMenu';
import RightLabelOrdersMenu from './orders/RightLabelOrdersMenu';
import RightPeopleOrdersMenu from './orders/RightPeopleOrdersMenu';
import RightPinnedLensesOrdersMenu from './orders/RightPinnedLensesOrdersMenu';
import RightBoardOrdersMenu from './orders/RightBoardOrdersMenu';
import RightColumnOrdersMenu from './orders/RightColumnOrdersMenu';
import RightFiltersOrdersMenu from './orders/RightFiltersOrdersMenu';

const orders = [
  'Cards & Boards',
  'Columns',
  'Labels',
  'People',
  'Pinned Tools',
  'Tool Boards',
  'Filters'
];

const RightOrdersMenu = ({ displaySubmenu, setOpenMenu }) => (
  <div className="right-submenu">
    <div className="right-submenu_header">
      <IconButton
        fontAwesome
        icon="caret-left"
        onClick={() => setOpenMenu(true)}
      />
      <span className="ml5">Orders</span>
    </div>
    {orders.map(filter => (
      <a
        className="right-submenu_item option"
        key={filter}
        onClick={() => setOpenMenu(`${displaySubmenu}_${filter}`)}
      >
        <span>{filter}</span>
      </a>
    ))}
    <div
      className={`${
        typeof displaySubmenu == 'string' &&
        displaySubmenu.startsWith('Orders_')
          ? 'right-submenu_option-container presented'
          : 'right-submenu_option-container'
      }`}
    >
      {displaySubmenu == 'Orders_Cards & Boards' && (
        <RightCardTopicOrdersMenu />
      )}
      {displaySubmenu == 'Orders_Labels' && <RightLabelOrdersMenu />}
      {displaySubmenu == 'Orders_People' && <RightPeopleOrdersMenu />}
      {displaySubmenu == 'Orders_Pinned Tools' && (
        <RightPinnedLensesOrdersMenu />
      )}
      {displaySubmenu == 'Orders_Tool Boards' && <RightBoardOrdersMenu />}
      {displaySubmenu == 'Orders_Columns' && <RightColumnOrdersMenu />}
      {displaySubmenu == 'Orders_Filters' && <RightFiltersOrdersMenu />}
    </div>
  </div>
);

RightOrdersMenu.propTypes = {
  displaySubmenu: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
    .isRequired,
  setOpenMenu: PropTypes.func.isRequired
};

const mapState = state => {
  const sm = stateMappings(state);
  return { displaySubmenu: sm.menus.displayRightSubMenuForMenu };
};

const mapDispatch = { setOpenMenu: setRightMenuOpenForMenu };

export default connect(mapState, mapDispatch)(RightOrdersMenu);
