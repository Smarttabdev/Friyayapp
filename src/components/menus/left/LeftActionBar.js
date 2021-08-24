import React from 'react';
import { Link } from 'react-router-dom';
import ErrorBoundary from 'Components/shared/errors/ErrorBoundary';
import LeftMenuDomainSegment from './segments/LeftMenuDomainSegment';
import LeftMenuGroupIndicator from './segments/LeftMenuGroupIndicator';
import LeftMenuPeopleSegment from './segments/LeftMenuPeopleSegment';
import LeftMenuTopicSegment from './segments/LeftMenuTopicSegment';
import Switch from '../../shared/ToggleSwitch';

const LeftActionBar = props => {
  return (
    <div className="left-menu in-focus" id="left-menu">
      {/* <ErrorBoundary>
        <LeftMenuDomainSegment />
      </ErrorBoundary> */}
      <div className="left-menu_content-container">
        <div className="leftmenu-switch">
          <Switch
            onClick={props.onClickHideActionbar}
            on={props.displayMenu ? true : false}
            className="flex-r-center"
          />
        </div>
        <div className="left-menu_content relative">
          <div className="left-menu-main-heading active">
            <Link to="/" className="left-menu-domain-segment_root-domain-link">
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
    </div>
  );
};

export default LeftActionBar;
