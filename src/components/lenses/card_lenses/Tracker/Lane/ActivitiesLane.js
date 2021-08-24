import React from 'react';
import { connect } from 'react-redux';
import LaneItem from './LaneItem';
import Icon from 'Components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import LoadMore from 'Components/shared/LoadMore';
import { useTipCreatedUpdatedSubscription } from 'Src/lib/hooks';

const ActivitiesLane = ({
  addItemButton,
  isActive,
  relay,
  query: { tips },
  selectedProjectId
}) => {
  const refetch = () => relay.refetchConnection(15);
  useTipCreatedUpdatedSubscription(toId(selectedProjectId), refetch);
  return (
    <div
      style={{ backgroundColor: isActive ? '#C5FFDD' : '#EFEFEF' }}
      className="tracker__lane"
    >
      {tips?.edges?.map(tip => (
        <LaneItem
          key={tip.node.id}
          title={tip.node.title}
          icon={
            <Icon
              icon="featured_play_list"
              outlined
              color="white"
              style={{ fontSize: 18 }}
            />
          }
          trailBgColor="#6FCF97"
          completionLevel={40}
          menuItemsConfig={[
            { icon: 'person', color: '#3B3155', action: () => {} },
            { icon: 'person', color: '#3B3155', action: () => {} }
          ]}
        />
      ))}
      <LoadMore relay={relay} count={15} />
      <div className="tracker__lane-add-item-button">{addItemButton}</div>
    </div>
  );
};

const ActivitiesLaneContainer = createPaginationContainer(
  ActivitiesLane,
  {
    query: graphql`
      fragment ActivitiesLane_query on Query
        @argumentDefinitions(cursor: { type: String }, topicId: { type: ID }) {
        tips(
          first: 15
          after: $cursor
          topicId: $topicId
          topicsParams: { tagged: ["project"] }
        ) @connection(key: "ActivitiesLane_tips") {
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
    getConnectionFromProps: props => props?.query?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query ActivitiesLaneTipsQuery($cursor: String, $topicId: ID) {
        ...ActivitiesLane_query @arguments(cursor: $cursor, topicId: $topicId)
      }
    `
  }
);

const mapState = state => {
  const {
    tools: {
      trackerLens: { selectedProjectId }
    }
  } = stateMappings(state);

  return {
    selectedProjectId
  };
};

export default connect(mapState)(
  QueryRenderer(props => <ActivitiesLaneContainer {...props} query={props} />, {
    query: graphql`
      query ActivitiesLaneQuery($cursor: String, $topicId: ID) {
        ...ActivitiesLane_query @arguments(cursor: $cursor, topicId: $topicId)
      }
    `,
    vars: props => ({
      topicId: toId(props.selectedProjectId) || null
    })
  })
);
