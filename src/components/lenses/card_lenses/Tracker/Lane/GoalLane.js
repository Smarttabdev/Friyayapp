import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import LaneItem from './LaneItem';
import Icon from 'Components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import LoadMore from 'Components/shared/LoadMore';
import { useTopicCreatedUpdatedSubscription } from 'Src/lib/hooks';

const GoalLane = ({
  bgColor = '#EFEFEF',
  activeBgColor,
  addItemButton,
  isActive,
  query: { topics },
  updateTrackerLens,
  selectedGoalId,
  relay
}) => {
  const refetch = () => relay.refetchConnection(15);
  useTopicCreatedUpdatedSubscription(null, refetch);

  const [activeGoal, setActiveGoal] = useState(selectedGoalId || '0');

  const handleSelectedGoal = ({ id, goalId }) => {
    setActiveGoal(id);
    updateTrackerLens({ selectedGoalId: goalId });
  };

  return (
    <div
      style={{ backgroundColor: isActive ? activeBgColor : bgColor }}
      className="tracker__lane"
    >
      <Fragment>
        <LaneItem
          icon={
            <Icon icon="flag" outlined color="white" style={{ fontSize: 18 }} />
          }
          active={activeGoal}
          id={'0'}
          onClick={() => handleSelectedGoal({ id: '0', goalId: null })}
          title="All Goals"
          trailBgColor="#56CCF2"
          activeBgColor="#0088B4"
          completionLevel={40}
          menuItemsConfig={[
            { icon: 'person', color: '#3B3155', action: () => {} },
            { icon: 'person', color: '#3B3155', action: () => {} }
          ]}
        />
        {topics?.edges?.map(goal => (
          <LaneItem
            key={goal.node.id}
            id={goal.node.id}
            title={goal.node.title}
            icon={
              <Icon
                icon="flag"
                outlined
                color="white"
                style={{ fontSize: 18 }}
              />
            }
            active={activeGoal}
            onClick={() =>
              handleSelectedGoal({ id: goal.node.id, goalId: goal.node.id })
            }
            trailBgColor="#56CCF2"
            activeBgColor="#0088B4"
            completionLevel={20}
            menuItemsConfig={[
              { icon: 'person', color: '#3B3155', action: () => {} },
              { icon: 'person', color: '#3B3155', action: () => {} }
            ]}
          />
        ))}
      </Fragment>
      <LoadMore relay={relay} count={15} />
      <div className="tracker__lane-add-item-button">{addItemButton}</div>
    </div>
  );
};

const GoalLaneContainer = createPaginationContainer(
  GoalLane,
  {
    query: graphql`
      fragment GoalLane_query on Query
        @argumentDefinitions(
          cursor: { type: String }
          assignedId: { type: "[ID!]" }
          assignedToType: { type: String }
        ) {
        topics(
          first: 15
          after: $cursor
          all: true
          tagged: "goal"
          assignedTo: $assignedId
          assignedToType: $assignedToType
        ) @connection(key: "GoalLane_topics") {
          edges {
            node {
              id
              title
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.topics,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query GoalLaneTipsQuery(
        $cursor: String
        $assignedId: [ID!]
        $assignedToType: String
      ) {
        ...GoalLane_query
          @arguments(
            cursor: $cursor
            assignedId: $assignedId
            assignedToType: $assignedToType
          )
      }
    `
  }
);

const mapState = state => {
  const {
    tools: {
      trackerLens: { selectedGroupId, selectedUserId }
    }
  } = stateMappings(state);

  return {
    selectedUserId,
    selectedGroupId
  };
};

export default connect(mapState)(
  QueryRenderer(props => <GoalLaneContainer {...props} query={props} />, {
    query: graphql`
      query GoalLaneQuery(
        $cursor: String
        $assignedId: [ID!]
        $assignedToType: String
      ) {
        ...GoalLane_query
          @arguments(
            cursor: $cursor
            assignedId: $assignedId
            assignedToType: $assignedToType
          )
      }
    `,
    vars: props => ({
      assignedId: toId(props.selectedUserId || props.selectedGroupId),
      assignedToType: props.selectedUserId ? 'User' : 'Group'
    })
  })
);
