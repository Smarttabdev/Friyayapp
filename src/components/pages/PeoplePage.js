import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import PageContainer from './page_container';
// import AppStore from '../../stores/app_store';
// import analytics from '../../lib/analytics';
// import UserCard from './users_page/user_card';
import Masonry from 'react-masonry-component';
import { Helmet } from 'react-helmet';
import tiphive from '../../lib/tiphive';
// import UsersInvitationPage from './users_invitation_page';
import IconButton from 'Components/shared/buttons/IconButton';
import { setDomainFilterSettings } from 'Src/newRedux/database/domains/thunks';

// import MainFormPage from './main_form_page';
// import { PEOPLE_FILTER } from 'Enums';

import MainFormPage from 'Components/pages/MainFormPage';
import PersonCard from './PeoplePage/PersonCard';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { toggleFollowUser } from 'Src/newRedux/database/people/thunks';
import { getFilteredPeople } from 'Src/newRedux/database/people/selectors';
import { getGroups } from 'Src/newRedux/database/groups/selectors';
import {
  setEditCardModalOpen,
  setUserInvitationModalOpen,
  setEditDomainModalOpen,
  setOfficeHoursModalOpen
} from 'Src/newRedux/interface/modals/actions';
// import { peopleFilters } from 'Lib/config/filters/people';
// const peopleFilterArray = Object.values(peopleFilters);
import GroupUpdateFormPage from 'Src/components/pages/group_update_form_page';
import TeamContainer from 'Components/lenses/card_lenses/MyTeam/TeamContainer';
import people from 'src/reducers/people';

const masonryOptions = { isFitWidth: true, columnWidth: 200, gutter: 15 };

class PeoplePage extends Component {
  static propTypes = {
    people: PropTypes.array,
    isLoading: PropTypes.bool,
    followingUsers: PropTypes.arrayOf(PropTypes.string),
    toggleFollowUser: PropTypes.func.isRequired,
    setOfficeHoursModalOpen: PropTypes.func
  };

  state = {
    isUserInviteOpen: false,
    isMainFormOpen: false,
    isGroupFormOpen: false
  };

  changeFilter = filter => {
    this.props.setDomainFilterSettings({
      people: [filter.key]
    });
  };

  closeMainForm = () => {
    this.setState(state => ({ ...state, isMainFormOpen: false }));
  };

  closeUserInvite = () =>
    this.setState(state => ({ ...state, isUserInviteOpen: false }));

  handleUserInvitationClick = e => {
    this.props.setUserInvitationModalOpen(true);
  };

  handleCreateGroupClick = e => {
    e.preventDefault();
    this.setState(state => ({ ...state, isMainFormOpen: true }));
  };

  handleEditGroup = (group = null) => e => {
    e.preventDefault();
    if (group !== null) {
      tiphive.hideAllModals();
      this.setState(state => ({ ...state, isGroupFormOpen: true, group }));
    }
  };

  closeGroupForm = () => {
    this.setState(state => ({ ...state, isGroupFormOpen: false, group: null }));
  };

  render() {
    const {
      props: {
        people,
        team,
        teamPeople,
        userId,
        setOfficeHoursModalOpen
        // followingUsers,
        // groupId,
        // selectedPeopleFilters,
      },
      state: { isMainFormOpen, isGroupFormOpen, group }
    } = this;

    // const baseStyle = {
    //   textAlign: 'center'
    // };

    // const activeFilter =
    //   peopleFilters[selectedPeopleFilters[0]] || peopleFilters['ALL'];
    return (
      <Fragment>
        <Helmet>
          <title>Friyay - People</title>
        </Helmet>
        <div className="users-page">
          <div className="users-team">
            <div>
              <h3>Teams</h3>
              {!tiphive.userIsGuest() && (
                <IconButton
                  fontAwesome={true}
                  icon="plus"
                  tooltip="Add Team"
                  tooltipOptions={{ place: 'bottom' }}
                  onClick={this.handleCreateGroupClick}
                />
              )}
            </div>
            <div className="my-team-list">
              {team.map(tm => (
                <TeamContainer
                  key={tm.id}
                  group={tm}
                  people={teamPeople}
                  pathname={this.props.pathname}
                />
              ))}
            </div>
          </div>
          <div className="users-people">
            <div>
              <h3>Workspace members</h3>
              {!tiphive.userIsGuest() && (
                <IconButton
                  fontAwesome={true}
                  icon="plus"
                  tooltip="Invite People"
                  tooltipOptions={{ place: 'bottom' }}
                  onClick={this.handleUserInvitationClick}
                />
              )}
              {tiphive.userIsOwner() && (
                <IconButton
                  icon="cog"
                  fontAwesome
                  tooltip="Settings"
                  tooltipOptions={{ place: 'bottom' }}
                  onClick={() => this.props.setEditDomainModalOpen(true, 4)}
                />
              )}
              <a
                className="office-hours"
                onClick={() => setOfficeHoursModalOpen(true)}
              >
                Office Hours
              </a>
            </div>
            <div className="people-list">
              <Masonry
                className="users-container"
                id="users-container"
                elementType="div"
                options={masonryOptions}
              >
                {people.map(person => {
                  if (person.id != userId)
                    return (
                      <PersonCard key={person.id} user={person} showRole />
                    );
                })}
              </Masonry>
            </div>

            {people.length === 0 && (
              <p className="text-center">There are no users.</p>
            )}
          </div>
        </div>
        {isMainFormOpen && (
          <MainFormPage selectedTab="group-pane" onClose={this.closeMainForm} />
        )}
        {isGroupFormOpen && (
          <GroupUpdateFormPage group={group} onClose={this.closeGroupForm} />
        )}
      </Fragment>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const {
    location: { pathname }
  } = sm.routing.routerHistory;

  return {
    followingUsers: sm.user.relationships.following_users.data,
    groupId: sm.page.groupId,
    team: getGroups(state),
    people: getFilteredPeople(state),
    teamPeople: sm.people,
    rootUrl: sm.page.rootUrl,
    selectedPeopleFilters: sm.filters.peopleFilters,
    pathname,
    userId: sm.user.id
  };
};

const mapDispatch = {
  setEditCardModalOpen,
  setUserInvitationModalOpen,
  toggleFollowUser,
  setDomainFilterSettings,
  setEditDomainModalOpen,
  setOfficeHoursModalOpen
};

export default connect(mapState, mapDispatch)(PeoplePage);
