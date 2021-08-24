import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tiphive from 'Lib/tiphive';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getPeopleFilters } from 'Src/newRedux/filters/selectors';

import Icon from 'Components/shared/Icon';
import IconButton from 'Components/shared/buttons/IconButton';

import { Link } from 'react-router-dom';
import { setUserInvitationModalOpen } from 'Src/newRedux/interface/modals/actions';
import { toggleLeftMenuPeoplePanel } from 'Src/newRedux/interface/menus/thunks';
import { getFilteredPeople } from 'Src/newRedux/database/people/selectors';
import { getFilterSettings } from 'Src/helpers/user_config';
import { setDomainFilterSettings } from 'Src/newRedux/database/domains/thunks';

class LeftMenuPeopleSegment extends Component {
  state = {
    isUserInviteOpen: false
  };

  static propTypes = {
    users: PropTypes.array,
    params: PropTypes.object,
    groupId: PropTypes.string,
    displayPeoplePanel: PropTypes.bool
  };

  handleUserInvitationClick = e => {
    e.preventDefault();
    this.setState(state => ({ ...state, isUserInviteOpen: true }));
  };

  closeUserInvite = () =>
    this.setState(state => ({ ...state, isUserInviteOpen: false }));

  tourPeoplePoint = null;
  tourInvitePoint = null;

  render() {
    if (tiphive.isSupportDomain()) {
      return null;
    }

    const {
      currentPath,
      displayPeoplePanel,
      pagePersonId,
      people,
      peopleFilters,
      rootUrl,
      selectedPeopleFilters,
      setUserInvitationModalOpen,
      toggleLeftMenuPeoplePanel,
      setDomainFilterSettings,
      userId,
      active_design = {}
    } = this.props;

    const baseUrl = rootUrl == '/' ? '' : rootUrl;
    const peopleUrl = baseUrl + '/users';
    const peopleFiltered = peopleFilters.filter(
      f => f.key === selectedPeopleFilters[0]
    );
    const { workspace_font_color } = active_design;

    return (
      <div className={`left-menu-people ${displayPeoplePanel && 'presented'}`}>
        <div className="left-menu_content-row-header">
          <IconButton
            color={workspace_font_color}
            additionalClasses="left-menu-people_expand-icon white-opac-icon-button"
            fontAwesome
            // icon="expand"
            icon="caret-right"
            onClick={toggleLeftMenuPeoplePanel}
          />
          <IconButton
            color={workspace_font_color}
            additionalClasses="left-menu-people_collapse-icon white-opac-icon-button"
            fontAwesome
            // icon="compress"
            icon="caret-down"
            onClick={toggleLeftMenuPeoplePanel}
          />

          <Link
            to={peopleUrl}
            className={` ${currentPath == peopleUrl ? 'grey-link active' : ''}`}
          >
            <span> {peopleFiltered.length ? peopleFiltered[0].name : ''} </span>
          </Link>
          {/* <div className="dropdown">
            <span
              className="flex-r-center dropdown"
              id="peopleDropdopwCaret"
              data-toggle="dropdown"
            >
              <div className="left-menu_people-filters">
                {peopleFilters.map(filter => (
                  <div
                    className="link-tooltip-container"
                    key={`people-filter-icon-${filter.key}`}
                  >
                    <div className="link-tooltip top">{filter.name}</div>
                  </div>
                ))}
              </div>
              <Icon
                color={workspace_font_color}
                additionalClasses="small people-header_title white-opac-icon-button"
                fontAwesome
                icon="caret-down"
              />
            </span>
            <ul className="dropdown-menu" aria-labelledby="dLabel">
              {peopleFilters.map(option => (
                <li key={option.key}>
                  <a
                    onClick={() => {
                      setDomainFilterSettings({
                        people: [option.key]
                      });
                    }}
                  >
                    {option.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}
          <IconButton
            color={workspace_font_color}
            fontAwesome
            icon="plus"
            onClick={() => setUserInvitationModalOpen(userId)}
            additionalClasses="white-opac-icon-button mlauto"
          />
        </div>
        {displayPeoplePanel && (
          <div className="left-menu_content-list">
            {people.map(person => (
              <Link
                className={`left-menu_people-item ${pagePersonId == person.id &&
                  'active'}`}
                key={person.id}
                to={`${peopleUrl}/${person.id}`}
              >
                {person.attributes.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const {
    routing,
    user,
    menus,
    page,
    utilities: { active_design }
  } = sm;
  const filter_setting = getFilterSettings(state);
  return {
    active_design,
    currentPath: routing.routerHistory.location.pathname,
    groupId: page.groupId,
    displayPeoplePanel: menus.displayLeftMenuPeoplePanel,
    pagePersonId: page.personId,
    people: getFilteredPeople(state, true),
    peopleFilters: getPeopleFilters(state),
    rootUrl: page.rootUrl,
    selectedPeopleFilters: filter_setting.people,
    userId: user.id
  };
};

const mapDispatch = {
  setDomainFilterSettings,
  setUserInvitationModalOpen,
  toggleLeftMenuPeoplePanel
};

export default connect(mapState, mapDispatch)(LeftMenuPeopleSegment);
