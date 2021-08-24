import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { setRightMenuOpenForMenu } from 'Src/newRedux/interface/menus/actions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import lensConfig from 'Lib/config/lenses/lenses';
import get from 'lodash/get';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import { ButtonMenuOpenDismiss } from 'Components/shared/buttons/index';
import DockToggleButton from './elements/DockToggleButton';
import IconButton from 'Components/shared/buttons/IconButton';
import { toggleCardsSplitScreen } from 'Src/newRedux/interface/menus/actions.js';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import QSModal from 'Components/pages/quick_setup';
import Tooltip from 'Components/shared/Tooltip';
import { getUiSettings, setUserUiSettings } from 'Src/helpers/user_config';

class RightActionBar extends Component {
  static propTypes = {
    viewKey: PropTypes.string,
    showBadgeOnBot: PropTypes.bool,
    cardsSplitScreen: PropTypes.bool,
    displaySubmenu: PropTypes.any,
    toggleCardsSplitScreen: PropTypes.func,
    setRightMenuOpenForMenu: PropTypes.func,
    setUpdateTopicModalOpen: PropTypes.func,
    setUserUiSettings: PropTypes.func,
    topicId: PropTypes.string
  };

  state = {
    quickSetup: false
  };
  handleMenuButtonClick = () => {
    const { displaySubmenu, setRightMenuOpenForMenu } = this.props;
    setRightMenuOpenForMenu(!displaySubmenu);
  };

  toggleQuickSetup = () => {
    this.setState({ quickSetup: !this.state.quickSetup });
  };

  optionClickHandler = option => () => {
    const {
      topicId,
      displaySubmenu,
      setUpdateTopicModalOpen,
      setRightMenuOpenForMenu,
      setUserUiSettings,
      sprintBarVisible
    } = this.props;
    if (option === 'Plan') return setUpdateTopicModalOpen(topicId, true, 4);
    if (option === 'Sprint Bar')
      return setUserUiSettings({ sprint_bar_visible: !sprintBarVisible });
    if (option === 'Quick Setup') return this.toggleQuickSetup();
    return setRightMenuOpenForMenu(displaySubmenu === option ? null : option);
  };

  renderOption = (title, option, icon) => {
    const { displaySubmenu } = this.props;
    return (
      <IconButton
        additionalClasses={classNames('right-action-bar_button', {
          active: displaySubmenu === option
        })}
        color="#515050"
        icon={icon}
        tooltip={title}
        tooltipOptions={{ place: 'bottom' }}
        onClick={this.optionClickHandler(option)}
      />
    );
  };

  renderSplitScreen = () => {
    const { viewKey, cardsSplitScreen, toggleCardsSplitScreen } = this.props;
    const isSplitLayoutDisabled = get(
      lensConfig.cards,
      `[${viewKey}].isSplitLayoutDisabled`,
      false
    );

    return (
      <IconButton
        additionalClasses={classNames('right-action-bar_button', {
          active: !isSplitLayoutDisabled && cardsSplitScreen,
          'right-action-bar_button--disabled': isSplitLayoutDisabled
        })}
        color="#CCC"
        fontAwesome
        icon="columns"
        tooltip={
          isSplitLayoutDisabled
            ? 'Split Board Disabled for Current Board'
            : 'Split Board'
        }
        // FIXME: tooltipOptions={tooltipOptions}
        onClick={() => !isSplitLayoutDisabled && toggleCardsSplitScreen()}
      />
    );
  };

  render() {
    const { displaySubmenu, page, topicId } = this.props;
    const isUserProfileView = window.location.pathname.includes('users/');
    return (
      <div className="right-action-bar">
        <ButtonMenuOpenDismiss
          additionalClasses="right-action-bar_button"
          dismissRight
          color="#515050"
          isOpen={displaySubmenu}
          onClick={this.handleMenuButtonClick}
        />
        <div
          className={`${isUserProfileView ? 'flex-point-8' : 'flex-1'} flex-c`}
        >
          {this.renderOption('Tools', 'Tools', 'view_carousel')}
          {this.renderOption('Orders', 'Orders', 'swap_vert')}
          {this.renderOption('Filters', 'Filters', 'filter_list')}
          {this.renderOption('Group By', 'Group By', 'group_work')}
          {page === 'topic' &&
            this.renderOption('Design', 'Design', 'color_lens')}
          {page === 'home' &&
            this.renderOption(
              'Workspace Design',
              'Workspace Design',
              'color_lens'
            )}
          {this.renderOption('Labels', 'Filters_Labels', 'label')}
          {page === 'topic' && this.renderOption('Plan', 'Plan', 'date_range')}
          {page === 'topic' &&
            this.renderOption('Sprint Bar', 'Sprint Bar', 'directions_run')}
          <div className="right-submenu_item spacer"></div>
          {this.renderOption('Integrations', 'Integrations', 'power')}
          {page === 'topic' &&
            this.renderOption('Quick Setup', 'Quick Setup', 'map')}
          {/* <div data-tip={'Scorecard'} data-for={`scoreCard-${forId}`}>
            <Scorecard />
            <Tooltip {...{ place: 'bottom' }} id={`scoreCard-${forId}`} />
          </div> */}
          {/* {this.renderOption('Bot', 'Bot', 'android')} */}
          {this.state.quickSetup && (
            <QSModal toggleModal={this.toggleQuickSetup} />
          )}
        </div>
        <DockToggleButton />
      </div>
    );
  }
}

const mapState = state => {
  const {
    menus,
    bot,
    topics,
    page: { page, topicId }
  } = stateMappings(state);

  const currentTopic = topics[topicId];
  const user_configuration = get(
    currentTopic,
    'attributes.user_configuration.data',
    {}
  );
  const sprintBarVisible = getUiSettings(state).sprint_bar_visible;
  return {
    topicId,
    displaySubmenu: menus.displayRightSubMenuForMenu,
    cardsSplitScreen: menus.cardsSplitScreen,
    showBadgeOnBot: bot.showBadge,
    viewKey: getRelevantViewForPage(state),
    page,
    sprintBarVisible
  };
};

const mapDispatch = {
  setRightMenuOpenForMenu,
  toggleCardsSplitScreen,
  setUpdateTopicModalOpen,
  setUserUiSettings
};

export default connect(mapState, mapDispatch)(RightActionBar);
