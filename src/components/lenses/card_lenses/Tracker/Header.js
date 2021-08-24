import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Icon from 'Components/shared/Icon';
import TabButton from './TabButton';
import TopicsButton from './Header/TopicsButton';
import ActivitiesButton from './Header/ActivitiesButton';

const Header = ({
  currentTab,
  topicId,
  onTabChange,
  selectedGroupId,
  selectedUserId,
  selectedGoalId,
  selectedProjectId,
  currentMode
}) => {
  return (
    <div className="flex flex-r-center">
      {queryRenderer({
        query: graphql`
          query HeaderTeamQuery {
            groups {
              id
              title
            }
            users {
              id
              name
            }
          }
        `,
        render: ({ props }) => (
          <TabButton
            label="Team"
            icon={
              <Icon
                icon="group"
                outlined
                color="#9B51E0"
                style={{ fontSize: 22, marginTop: -2 }}
              />
            }
            count={props.groups.length + props.users.length}
            darkColor="#9B51E0"
            lightColor="rgba(155, 81, 224, 0.38)"
            active={currentTab == 'team'}
            onClick={() => onTabChange('team')}
          />
        )
      })}
      <TopicsButton
        topicId={topicId}
        tagged={['goal']}
        assignedId={
          currentMode === 'lane'
            ? toId(selectedGroupId || selectedUserId)
            : null
        }
        assignedToType={
          currentMode === 'lane' ? (selectedUserId ? 'User' : 'Group') : null
        }
        TabButtonProps={{
          label: 'Goals',
          icon: (
            <Icon
              icon="flag"
              outlined
              color="#56CCF2"
              style={{ fontSize: 20, marginTop: -2 }}
            />
          ),
          darkColor: '#56CCF2',
          lightColor: 'rgba(86, 204, 242, 0.33)',
          active: currentTab == 'goals',
          onClick: () => onTabChange('goals')
        }}
      />
      <TopicsButton
        topicId={currentMode === 'lane' ? selectedGoalId : topicId}
        tagged={['project']}
        TabButtonProps={{
          label: 'Projects',
          icon: (
            <Icon
              icon="category"
              outlined
              color="#EB5757"
              style={{ fontSize: 20, marginTop: -2 }}
            />
          ),
          darkColor: '#EB5757',
          lightColor: 'rgba(235, 87, 87, 0.39)',
          active: currentTab == 'projects',
          onClick: () => onTabChange('projects')
        }}
      />
      <ActivitiesButton
        topicId={currentMode === 'table' ? topicId : null}
        active={currentTab == 'activities'}
        projectId={currentMode === 'lane' ? selectedProjectId : null}
        onClick={() => onTabChange('activities')}
      />
    </div>
  );
};

const mapState = state => {
  const {
    page: { topicId },
    tools: {
      trackerLens: {
        selectedGroupId,
        selectedUserId,
        selectedGoalId,
        selectedProjectId,
        currentMode
      }
    }
  } = stateMappings(state);
  return {
    topicId,
    selectedUserId,
    selectedGroupId,
    selectedGoalId,
    selectedProjectId,
    currentMode
  };
};

export default connect(mapState)(Header);
