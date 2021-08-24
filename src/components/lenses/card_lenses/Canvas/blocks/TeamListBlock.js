import React from 'react';
import Icon from 'Components/shared/Icon';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { connect } from 'react-redux';

const TeamListBlock = props => {
  const {
    topic: {
      id: topicId,
      relationships: { assignments }
    },
    setUpdateTopicModalOpen
  } = props;

  const team = assignments?.data || [];

  return (
    <>
      <div className="header team-list flex-r-center">
        <Icon icon="people" color="#fff" outlined fontSize={20} />
        <span>Team</span>
      </div>
      <div className="team-avatar-list flex-r-center">
        {team.map(user => (
          <UserAvatar
            margin="4"
            userId={user.assigned_id}
            key={user.assigned_id}
            size={60}
            style={{ borderRadius: '50%', fontSize: 30 }}
            showName
          />
        ))}
        <div
          className="add-team-button flex-r-center"
          onClick={() => setUpdateTopicModalOpen(topicId, true, 4)}
        >
          <Icon icon="add" />
        </div>
      </div>
    </>
  );
};

const mapDispatch = {
  setUpdateTopicModalOpen
};

export default {
  label: 'Team list',
  defaultConfig: { height: 187, width: 484 },
  iconProps: {
    icon: 'people',
    color: '#9B51E0',
    outlined: true
  },
  Component: connect(null, mapDispatch)(TeamListBlock)
};
