import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { updateTrackerLens } from 'Src/newRedux/interface/lenses/actions';
import Icon from 'Components/shared/Icon';
import IconButton from 'Components/shared/buttons/IconButton';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import TopicsSheet from './TopicsSheet';
import ActivitiesSheet from './ActivitiesSheet';

const UserSummary = ({ item, history, updateTrackerLens }) => {
  const onViewGoal = topic => {
    updateTrackerLens({
      currentTab: 'goals',
      selectedGoal: { id: topic.id }
    });
  };

  const onViewProject = topic => {
    updateTrackerLens({
      currentTab: 'projects',
      selectedProject: { id: topic.id }
    });
  };

  return (
    <div className="tracker__user-summary">
      <div className="flex flex-r-center">
        <IconButton
          icon="group"
          outlined
          color="#fff"
          containerClasses="tracker__square-btn"
          containerStyle={{ backgroundColor: '#9B51E0' }}
          fontSize={18}
          onClick={() => history.push('/users')}
        />
        {item.user ? (
          <UserAvatar
            userId={toId(item.user.id)}
            size={25}
            margin={12}
            noPointer
            noTooltip
          />
        ) : (
          <Icon
            icon="group"
            outlined
            color="#9B51E0"
            containerStyle={{
              width: 25,
              marginRight: 12,
              padding: 4,
              borderRadius: '50%',
              backgroundColor: 'rgba(155, 81, 224, 0.38)'
            }}
            style={{ fontSize: 18 }}
          />
        )}
        <span className="bold" style={{ fontSize: 18 }}>
          {item.title}
        </span>
      </div>
      <TopicsSheet
        userId={item?.user?.id}
        groupId={item?.group?.id}
        label="Goals"
        tags={['goal']}
        onViewTopic={onViewGoal}
      />
      <TopicsSheet
        userId={item?.user?.id}
        groupId={item?.group?.id}
        label="Projects"
        tags={['project']}
        onViewTopic={onViewProject}
      />
      <ActivitiesSheet userId={item?.user?.id} groupId={item?.group?.id} />
    </div>
  );
};

const mapDispatch = {
  updateTrackerLens
};

export default connect(null, mapDispatch)(withRouter(UserSummary));
