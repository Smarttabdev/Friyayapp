import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import {
  toggleGroupByDropdown,
  setGroupBySelectedOption
} from 'Src/newRedux/groupBy/actions';
import IconButton from 'Components/shared/buttons/IconButton';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { stateMappings } from 'Src/newRedux/stateMappings';

class QuickRightBarActions extends Component {
  static defaultProps = {
    groupBy: true
  };

  handleMenuButtonClick = () => {
    const { displaySubmenu, setRightMenuOpenForMenu } = this.props;
    setRightMenuOpenForMenu(!displaySubmenu);
  };

  render() {
    const {
      displaySubmenu,
      setRightMenuOpenForMenu,
      toggleGroupByDropdown,
      setGroupBySelectedOption,
      tooltipOptions = { place: 'bottom' },
      color,
      groupBy,
      filterSettings,
      setUserFilterSettings,
      filtersIsOpen,
      topicHeader
    } = this.props;

    return (
      <div
        className={`quick-rightbar-actions ${filtersIsOpen && 'spaceAround'}`}
      >
        {!filtersIsOpen && (
          <IconButton
            additionalClasses={
              'quick-right-action-bar_button filter_button ' +
              (typeof displaySubmenu === 'string' &&
              displaySubmenu.includes('Filters')
                ? 'active'
                : '')
            }
            style={topicHeader ? { marginRight: '7px', marginLeft: '7px' } : {}}
            fontSize={20}
            color={color || '#F2C94C'}
            icon="filter_list"
            tooltip="Filters"
            onClick={() =>
              setRightMenuOpenForMenu(
                typeof displaySubmenu === 'string' &&
                  displaySubmenu.includes('Filters')
                  ? null
                  : 'Filters'
              )
            }
            tooltipOptions={tooltipOptions}
            height="100%"
            lineHeight="initial"
            marginBottom="0px"
          />
        )}
        {groupBy && (
          <IconButton
            additionalClasses={'quick-right-action-bar_button group_button'}
            color={color || '#F2994A'}
            fontSize={20}
            style={topicHeader ? { marginRight: '7px' } : {}}
            icon="group_work"
            tooltip="GroupBy"
            onClick={() => {
              const group_by = {
                ...filterSettings.group_by,
                open: !filterSettings.group_by?.open
              };
              setUserFilterSettings({ group_by: group_by });
              setGroupBySelectedOption([]);
            }}
            tooltipOptions={tooltipOptions}
            height="100%"
            lineHeight="initial"
            marginBottom="0px"
          />
        )}
        <IconButton
          additionalClasses={
            'icon-order-class quick-right-action-bar_button' +
            (typeof displaySubmenu === 'string' &&
            displaySubmenu.includes('Orders')
              ? 'active'
              : '')
          }
          color={color || '#B865A8'}
          icon="swap_vert"
          tooltip="Orders"
          onClick={() =>
            setRightMenuOpenForMenu(
              typeof displaySubmenu === 'string' &&
                displaySubmenu.includes('Orders')
                ? null
                : 'Orders'
            )
          }
          tooltipOptions={tooltipOptions}
          height="100%"
          lineHeight="initial"
          marginBottom="0px"
          fontSize={20}
          style={
            filtersIsOpen
              ? { marginLeft: '5px' }
              : topicHeader
              ? { marginRight: '7px' }
              : {}
          }
        />
        <IconButton
          additionalClasses={
            'quick-right-action-bar_button tools_button ' +
            (displaySubmenu == 'Tools' ? 'active' : '')
          }
          color={color || '#56CCF2'}
          icon="view_carousel"
          tooltip="Tools"
          onClick={() =>
            setRightMenuOpenForMenu(displaySubmenu == 'Tools' ? null : 'Tools')
          }
          tooltipOptions={tooltipOptions}
          height="100%"
          lineHeight="initial"
          marginBottom="0px"
          fontSize={20}
          style={topicHeader ? { marginRight: '7px' } : {}}
        />
      </div>
    );
  }
}

const mapState = (state, props) => {
  const {
    filters: { keepOpen }
  } = stateMappings(state);
  const filterSettings = getFilterSettings(state);
  return {
    filterSettings,
    displaySubmenu: state._newReduxTree.ui.menus.displayRightSubMenuForMenu,
    filtersIsOpen: keepOpen
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  toggleGroupByDropdown,
  setGroupBySelectedOption,
  setUserFilterSettings
};

export default connect(mapState, mapDispatch)(QuickRightBarActions);
