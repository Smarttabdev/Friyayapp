import React, { useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateTrackerLens } from 'Src/newRedux/interface/lenses/actions';
import Icon from 'Components/shared/Icon';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import Table from '../Table';
import UserSummary from './TeamTable/UserSummary';

const TeamTable = ({ groups, users, selectedTeam, updateTrackerLens }) => {
  useEffect(() => {
    return eventBus.subscribe('tracker.tab.click', () => {
      updateTrackerLens({ selectedTeam: null });
    });
  }, []);

  const setSelectedItem = item => updateTrackerLens({ selectedTeam: item });

  const items = useMemo(() => {
    return groups
      .map(group => ({
        id: group.id,
        title: `${group.title} Team`,
        icon: (
          <Icon icon="group" outlined color="white" style={{ fontSize: 18 }} />
        ),
        group
      }))
      .concat(
        users.map(user => ({
          id: user.id,
          title: user.name,
          icon: (
            <UserAvatar
              userId={toId(user.id)}
              size={20}
              margin={0}
              noPointer
              noTooltip
            />
          ),
          user
        }))
      );
  }, [groups, users]);

  return selectedTeam ? (
    <UserSummary item={selectedTeam} />
  ) : (
    <Table
      label="Team"
      darkColor="#9B51E0"
      items={items}
      onClick={setSelectedItem}
    />
  );
};

const mapState = state => {
  const {
    tools: {
      trackerLens: { selectedTeam }
    }
  } = stateMappings(state);
  return {
    selectedTeam
  };
};

const mapDispatch = {
  updateTrackerLens
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(TeamTable, {
    query: graphql`
      query TeamTableQuery {
        groups {
          id
          title
        }
        users {
          id
          name
        }
      }
    `
  })
);
