import React, { useState, Fragment, useMemo } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import LaneItem from './LaneItem';
import Icon from 'Components/shared/Icon';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';

const UserGroupLane = ({
  bgColor = '#EFEFEF',
  activeBgColor,
  addItemButton,
  isActive,
  users,
  groups,
  selectedUserId,
  selectedGroupId,
  updateTrackerLens
}) => {
  const [activeTeam, setActiveTeam] = useState(
    selectedGroupId || selectedUserId || '0'
  );

  const handleSelectedTeam = ({ groupId, userId, id }) => {
    setActiveTeam(id);
    updateTrackerLens({
      selectedGroupId: groupId,
      selectedUserId: userId
    });
  };

  const teams = useMemo(() => {
    return groups
      .map(group => ({
        groupId: group.id,
        id: group.id,
        title: `${group.title} Team`,
        icon: (
          <Icon icon="group" outlined color="white" style={{ fontSize: 18 }} />
        ),
        group
      }))
      .concat(
        users.map(user => ({
          userId: user.id,
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
  return (
    <div
      style={{ backgroundColor: isActive ? activeBgColor : bgColor }}
      className="tracker__lane"
    >
      <Fragment>
        <LaneItem
          active={activeTeam}
          onClick={() =>
            handleSelectedTeam({
              userId: null,
              groupId: null,
              id: '0'
            })
          }
          id={'0'}
          title="All Teams"
          icon={
            <Icon
              icon="group"
              outlined
              color="white"
              style={{ fontSize: 18 }}
            />
          }
          trailBgColor="#9B51E0"
          activeBgColor="#571A8F"
          completionLevel={40}
          menuItemsConfig={[
            { icon: 'person', color: '#3B3155', action: () => {} },
            { icon: 'person', color: '#3B3155', action: () => {} }
          ]}
        />
        {teams.map(team => (
          <LaneItem
            key={team.id}
            active={activeTeam}
            onClick={() =>
              handleSelectedTeam({
                userId: team.userId,
                groupId: team.groupId,
                id: team.id
              })
            }
            id={team.id}
            title={team.title}
            icon={team.icon}
            trailBgColor="#9B51E0"
            activeBgColor="#571A8F"
            completionLevel={40}
            menuItemsConfig={[
              { icon: 'person', color: '#3B3155', action: () => {} },
              { icon: 'person', color: '#3B3155', action: () => {} }
            ]}
          />
        ))}
      </Fragment>
      <div className="tracker__lane-add-item-button">{addItemButton}</div>
    </div>
  );
};

const mapState = state => {
  const {
    tools: {
      trackerLens: { selectedGroupId, selectedUserId }
    }
  } = stateMappings(state);
  return {
    selectedGroupId,
    selectedUserId
  };
};
export default connect(mapState)(UserGroupLane);
