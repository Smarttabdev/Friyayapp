import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from 'Src/components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import LeftActionBar from './LeftActionBar';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getThisDomain } from 'Src/lib/utilities';
import { toggleLeftMenu } from 'Src/newRedux/interface/menus/thunks';

class LeftActionBarContainer extends Component {
  state = {
    over: false // show content only when hovered
  };

  componentDidUpdate(prevProps) {
    // fix state caused by mouseleave event not fired
    if (!this.props.displayMenu && prevProps.displayMenu && this.state.over) {
      this.setState({ over: false });
    }
  }

  handleMouseEnter = () => {
    this.overTimer = setTimeout(() => {
      this.setState({ over: true });
    }, 1000);
  };

  handleMouseLeave = () => {
    clearTimeout(this.overTimer);
    this.setState({ over: false });
  };

  onClickHideActionbar = () => {
    this.props.toggleLeftMenu(true);
  };
  render() {
    const { displayMenu, leftMenuOpen, domains } = this.props;
    if (leftMenuOpen) {
      return null;
    }
    const thisDomain = getThisDomain(domains);
    const domainName = thisDomain.attributes.name || '';
    return (
      <div
        className={`left-action-bar-container ${displayMenu ? 'expanded' : ''}`}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {this.state.over && (
          <div className="left-action-bar-menu">
            <LeftActionBar
              domainName={domainName}
              displayMenu={displayMenu}
              onClickHideActionbar={this.onClickHideActionbar}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    user: {
      attributes: { ui_settings }
    },
    menus: { displayLeftMenu }
  } = sm;
  const leftMenuOpen = ui_settings.left_menu_open;

  return {
    displayMenu: displayLeftMenu,
    leftMenuOpen,
    domains: getDomains(state)
  };
};

const mapDispatch = { toggleLeftMenu };

export default connect(mapState, mapDispatch)(LeftActionBarContainer);
