import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
import { stateMappings } from 'Src/newRedux/stateMappings';
import ToggleSwitch from 'Components/shared/ToggleSwitch';
import RightFiltersMenu from './RightFiltersMenu';
import RightIntegrationsMenu from './RightIntegrationsMenu';
import TipHiveBot from './bot/TipHiveBot';
import RightOrdersMenu from './RightOrdersMenu';
import RightGroupByMenu from './RightGroupByMenu';
import RightLensesMenu from './RightLensesMenu';
import RightDesignMenu from './RightDesignMenu';
import MenuCloseSideBar from 'Components/menus/shared/MenuCloseSideBar';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import QSModal from 'Components/pages/quick_setup';
import {
  getUiSettings,
  setUserUiSettings,
  getCustomLensId
} from 'Src/helpers/user_config';
import Scorecard from 'Components/pages/score_card';
import ToolConfigMenu from './ToolConfigMenu/ToolConfigMenu';
import { toggleLeftMenu } from 'Src/newRedux/interface/menus/thunks';
import { setRightFiltersMenuOpen } from 'src/newRedux/filters/actions';
import RightUiSettings from './RightUiSettings';

const menuOptions = [
  'Tools',
  'Filters',
  'Orders',
  'Group By',
  'Design',
  'UI Settings',
  'Bot',
  'Integrations',
  'Workspace Design',
  'Tool Configuration'
];

const subMenuOptions = [
  'Filters_Card and Board types',
  'Filters_Board',
  'Filters_Status',
  'Filters_Labels',
  'Filters_Assigned To',
  'Filters_Completed Date',
  'Filters_Created By',
  'Filters_Created Date',
  'Filters_Due Date',
  'Filters_Start Date',
  'Filters_Priority Level',
  'Integrations_google',
  'Integrations_dropbox',
  'Integrations_box',
  'Integrations_slack',
  'Integrations_trello',
  'Orders_Cards & Boards',
  'Orders_Labels',
  'Orders_People',
  'Orders_Pinned Tools',
  'Orders_Tool Boards',
  'Orders_Columns',
  'Orders_Filters',
  'Design_Sub'
];

class RightSubMenu extends Component {
  static propTypes = {
    displaySubmenu: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    setRightMenuOpenForMenu: PropTypes.func.isRequired,
    setUpdateTopicModalOpen: PropTypes.func.isRequired,
    topicId: PropTypes.string,
    page: PropTypes.string
  };

  state = {
    submenu: this.props.displaySubmenu,
    quickSetup: false
  };

  componentDidUpdate = ({ displaySubmenu }) => {
    if (displaySubmenu !== this.props.displaySubmenu) {
      this.setState({ submenu: this.props.displaySubmenu });
    }
  };

  toggleQuickSetup = () => {
    this.setState({ quickSetup: !this.state.quickSetup });
  };

  /**
   * Render the submenu.
   *
   * @return {DOM}
   */
  renderSubMenu = () => {
    const { displaySubmenu, page } = this.props;
    const { submenu } = this.state;

    return (
      <ErrorBoundary>
        <div
          className={`${
            menuOptions.includes(displaySubmenu) ||
            subMenuOptions.includes(displaySubmenu)
              ? 'right-submenu_option-container presented'
              : 'right-submenu_option-container'
          }`}
        >
          <Fragment>
            {submenu.startsWith('Tools') && <RightLensesMenu />}
            {submenu.startsWith('Filters') && <RightFiltersMenu />}
            {submenu.includes('Orders') && <RightOrdersMenu />}
            {submenu.includes('Group By') && <RightGroupByMenu />}
            {submenu.includes('Integrations') && <RightIntegrationsMenu />}
            {submenu.includes('Bot') && <TipHiveBot />}
            {submenu.includes('Design') && <RightDesignMenu />}
            {submenu.includes('UI Settings') && <RightUiSettings />}
            {submenu.includes('Tool Configuration') && (
              <ToolConfigMenu toolId={this.props.displaySubmenuExtraData} />
            )}
          </Fragment>
        </div>
        <MenuCloseSideBar
          left
          onClick={() => this.props.setRightMenuOpenForMenu(null)}
        />
      </ErrorBoundary>
    );
  };

  optionClickHandler = option => () => {
    const { topicId, displaySubmenu } = this.props;
    if (option === 'Plan')
      return this.props.setUpdateTopicModalOpen(topicId, true, 4);

    if (option === 'Quick Setup') return this.toggleQuickSetup();
    return this.props.setRightMenuOpenForMenu(
      displaySubmenu === option ? null : option
    );
  };

  renderOption = (title, option) => {
    return (
      <a
        className="right-submenu_item option"
        onClick={this.optionClickHandler(option)}
      >
        <span>{title}</span>
        {option === 'Quick Open' && <ToggleSwitch on={this.state.quickOpen} />}
      </a>
    );
  };

  render() {
    const { page, customLensId } = this.props;

    const { submenu } = this.state;
    return (
      <div className="right-submenu with-border">
        {submenu === true && (
          <Fragment>
            <div className="right-submenu_header">
              <span>Options Menu</span>
            </div>
            {page === 'topic' &&
              this.renderOption('UI Settings', 'UI Settings')}
            {this.renderOption('Tools', 'Tools')}
            {customLensId &&
              this.renderOption('Tool Configuration', 'Tool Configuration')}
            {this.renderOption('Orders', 'Orders')}
            {this.renderOption('Filters', 'Filters')}
            {this.renderOption('Group By', 'Group By')}
            {page === 'home' &&
              this.renderOption('Workspace Design', 'Workspace Design')}
            {page === 'topic' && this.renderOption('Design', 'Design')}
            {this.renderOption('Labels', 'Filters_Labels')}
            {page === 'topic' && this.renderOption('Plan', 'Plan')}
            <div className="right-submenu_item spacer"></div>
            {this.renderOption('Integrations', 'Integrations')}
            {page === 'topic' &&
              this.renderOption('Quick Setup', 'Quick Setup')}
            {/* <div className="right-submenu_item option">
              <Scorecard enableCustomComponent />
            </div> */}
            {/* {this.renderOption('Bot', 'Bot')} */}
            {this.state.quickSetup && (
              <QSModal toggleModal={this.toggleQuickSetup} />
            )}
          </Fragment>
        )}
        {typeof submenu == 'string' && this.renderSubMenu()}
      </div>
    );
  }
}

const mapState = state => {
  const {
    menus,
    user,
    page: { page, topicId }
  } = stateMappings(state);
  const ui_settings = getUiSettings(state);

  return {
    topicId,
    page,
    userId: user?.id,
    displaySubmenu: menus.displayRightSubMenuForMenu,
    displaySubmenuExtraData: menus.displayRightSubMenuForMenuExtras,
    pinnedLensesBarVisible: ui_settings.pinned_lenses_bar_visible,
    customLensId: getCustomLensId(state)
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  setUserUiSettings,
  setUpdateTopicModalOpen,
  toggleLeftMenu,
  setRightFiltersMenuOpen
};

export default connect(mapState, mapDispatch)(RightSubMenu);
