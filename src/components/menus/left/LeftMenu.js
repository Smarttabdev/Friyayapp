import classNames from 'classnames';
import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
// import LeftMenuDomainSegment from './segments/LeftMenuDomainSegment';
import LeftMenuGroupIndicator from './segments/LeftMenuGroupIndicator';
import LeftMenuPeopleSegment from './segments/LeftMenuPeopleSegment';
import LeftMenuTopicSegment from './segments/LeftMenuTopicSegment';
// import LeftMenuUserSegment from './segments/LeftMenuUserSegment';
import MenuCloseSideBar from 'Components/menus/shared/MenuCloseSideBar';
import { toggleLeftMenu } from 'Src/newRedux/interface/menus/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import WorkspacesMenu from 'Src/components/menus/left/WorkspacesMenu';
import Switch from '../../shared/ToggleSwitch';
import { getDomains } from 'Src/newRedux/database/domains/selectors';
import { getThisDomain } from 'Src/lib/utilities';
import { setSelection } from '../../../actions/activity';
class LeftMenu extends PureComponent {
  static propTypes = {
    domains: PropTypes.array.isRequired,
    displayMenu: bool,
    toggleLeftMenu: func.isRequired
  };

  constructor(props) {
    super(props);
    // this.state = { sectionSelect: false };
    this.toggleLeftMenu = props.toggleLeftMenu;
    this.handleDismissMenu = this.handleDismissMenu.bind(this);
    this.handleDismissMenu(); // Keep left menu closed by default
  }

  handleDismissMenu = () => {
    this.toggleLeftMenu(false);
  };

  // componentDidMount() {
  //   const selected = localStorage.getItem('isSelected');
  //   console.log('selected: ', selected)
  //   if (selected) {
  //     this.props.setSelection(selected)
  //   }
  // }

  // componentWillUnmount(){
  //   console.log('Trueeeeeee')
  //   if(this.props.sectionSelect){
  //     this.props.setSelection(true)
  //   }else{
  //     this.props.setSelection(false)
  //   }
  // }

  render() {
    const { displayMenu, domains, page, active_design = {} } = this.props;
    const leftMenuFocusClass = classNames({ 'in-focus': displayMenu });
    const thisDomain = getThisDomain(domains);
    const domainName = thisDomain.attributes.name || '';
    const isBoardsPage = ['home', 'topics'].includes(page);
    const { workspace_font_color, workspace_background_color } = active_design;
    const isActiveDesign = !!workspace_background_color;

    return (
      displayMenu && (
        <div
          style={{
            background:
              !isBoardsPage && isActiveDesign
                ? workspace_background_color
                : '#2e3037'
          }}
          className={`left-menu-root-container ${leftMenuFocusClass}`}
        >
          <WorkspacesMenu />
          <div className={`left-menu ${leftMenuFocusClass}`} id="left-menu">
            {/* <ErrorBoundary>
              <LeftMenuDomainSegment /> 
            </ErrorBoundary> */}
            <div
              style={{
                borderTop:
                  !isBoardsPage && isActiveDesign
                    ? `1px solid ${workspace_font_color}`
                    : '',
                borderRight:
                  !isBoardsPage && isActiveDesign
                    ? `1px solid ${workspace_font_color}`
                    : ''
              }}
              className="left-menu_content-container"
            >
              <div className="leftmenu-switch">
                <Switch
                  onClick={this.handleDismissMenu}
                  on={displayMenu ? true : false}
                  className="flex-r-center"
                />
              </div>
              <div className="left-menu_content relative">
                {}
                <div
                  className={`left-menu-main-heading ${
                    this.props.sectionSelect ? 'selected' : ''
                  }`}
                  onFocus={() => this.props.setSelection(true)}
                >
                  <Link
                    to="/"
                    className="left-menu-domain-segment_root-domain-link"
                  >
                    <span className="fa fa-hashtag">
                      <span>Main Board</span>
                    </span>
                  </Link>
                </div>
                <ErrorBoundary>
                  <LeftMenuGroupIndicator />
                </ErrorBoundary>
                <ErrorBoundary>
                  <LeftMenuTopicSegment />
                </ErrorBoundary>
                <ErrorBoundary>
                  <LeftMenuPeopleSegment />
                </ErrorBoundary>
              </div>
            </div>
            <MenuCloseSideBar right onClick={this.handleDismissMenu} />
          </div>
        </div>
      )
    );
  }
}

const mapState = state => ({
  sectionSelect: state.activity.selected,
  displayMenu: stateMappings(state).menus.displayLeftMenu,
  domains: getDomains(state),
  active_design: stateMappings(state).utilities.active_design,
  page: stateMappings(state).page.page
});

const mapDispatch = { toggleLeftMenu, setSelection };

export default connect(mapState, mapDispatch)(LeftMenu);
