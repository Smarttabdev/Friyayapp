import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import TeamContainer from './TeamContainer';
import tiphive from 'Src/lib/tiphive';
import { setUserInvitationModalOpen } from 'Src/newRedux/interface/modals/actions';
import Icon from 'Components/shared/Icon';
import Masonry from 'react-masonry-component';
import PersonCard from 'Components/pages/PeoplePage/PersonCard';

class MyTeamLens extends Component {
  render() {
    let { groups, user, people } = this.props;
    let teamList = Object.keys(groups).map(function(key) {
      return (
        <TeamContainer
          key={groups[key].id}
          group={groups[key]}
          people={people}
        />
      );
    });

    const masonryOptions = { isFitWidth: true, columnWidth: 200, gutter: 15 };
    return (
      <div className="my-team">
        <div className="my-team-list">{teamList}</div>
        <div className="team-members">
          <div className="header">
            <h3>Team Members</h3>
            <div style={{ position: 'absolute', left: '18rem', top: 0 }}>
              {!tiphive.userIsGuest() && (
                <div
                  title="Add Team"
                  className="add-member-button"
                  onClick={() => this.props.setUserInvitationModalOpen(true)}
                >
                  <Icon icon="add" color="#808080" />
                </div>
              )}
            </div>
          </div>
          <div className="people-list">
            <Masonry
              className="users-container"
              id="users-container"
              elementType="div"
              options={masonryOptions}
            >
              {Object.keys(people).map(key => {
                if (key !== user.id)
                  return (
                    <PersonCard
                      key={people[key].id}
                      showRole
                      user={people[key]}
                    />
                  );
              })}
            </Masonry>
          </div>

          {people.length === 0 && (
            <p className="text-center">There are no users.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const { user, groups, people } = stateMappings(state);
  return {
    user,
    groups,
    people
  };
};

const mapDispatch = {
  setUserInvitationModalOpen
};

export default connect(mapState, mapDispatch)(MyTeamLens);
