import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import LaneItem from './LaneItem';
import Icon from 'Components/shared/Icon';
import { stateMappings } from 'Src/newRedux/stateMappings';
import LoadMore from 'Components/shared/LoadMore';
import { useTopicCreatedUpdatedSubscription } from 'Src/lib/hooks';

const ProjectLane = ({
  bgColor = '#EFEFEF',
  addItemButton,
  isActive,
  query: { topics },
  updateTrackerLens,
  selectedGoalId,
  selectedProjectId,
  relay
}) => {
  const refetch = () => relay.refetchConnection(15);
  useTopicCreatedUpdatedSubscription(toId(selectedGoalId), refetch);
  const [activeProject, setActiveProject] = useState(selectedProjectId || '0');

  const handleSelectedProject = ({ id, projectId }) => {
    setActiveProject(id);
    updateTrackerLens({ selectedProjectId: projectId });
  };
  return (
    <div
      style={{
        backgroundColor: isActive ? 'rgba(235, 87, 87, 0.39)' : bgColor
      }}
      className="tracker__lane"
    >
      <Fragment>
        <LaneItem
          id={'0'}
          title="All Projects"
          icon={
            <Icon
              icon="category"
              outlined
              color="white"
              style={{ fontSize: 18 }}
            />
          }
          active={activeProject}
          onClick={() =>
            handleSelectedProject({
              id: '0',
              projectId: null
            })
          }
          trailBgColor="#EB5757"
          activeBgColor="#C22D2D"
          completionLevel={40}
        />
        {topics?.edges?.map(project => (
          <LaneItem
            key={project?.node?.id}
            id={project.node.id}
            title={project.node.title}
            icon={
              <Icon
                icon="category"
                outlined
                color="white"
                style={{ fontSize: 18 }}
              />
            }
            active={activeProject}
            onClick={() =>
              handleSelectedProject({
                id: project.node.id,
                projectId: project.node.id
              })
            }
            trailBgColor="#EB5757"
            activeBgColor="#C22D2D"
            completionLevel={40}
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

const ProjectLaneContainer = createPaginationContainer(
  ProjectLane,
  {
    query: graphql`
      fragment ProjectLane_query on Query
        @argumentDefinitions(cursor: { type: String }, parentId: { type: ID }) {
        topics(
          first: 15
          after: $cursor
          all: true
          tagged: "project"
          parentId: $parentId
        ) @connection(key: "ProjectLane_topics") {
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
      query ProjectLaneTipsQuery($cursor: String, $parentId: ID) {
        ...ProjectLane_query @arguments(cursor: $cursor, parentId: $parentId)
      }
    `
  }
);

const mapState = state => {
  const {
    tools: {
      trackerLens: { selectedGoalId, selectedProjectId }
    }
  } = stateMappings(state);

  return {
    selectedGoalId,
    selectedProjectId
  };
};

export default connect(mapState)(
  QueryRenderer(props => <ProjectLaneContainer {...props} query={props} />, {
    query: graphql`
      query ProjectLaneQuery($cursor: String, $parentId: ID) {
        ...ProjectLane_query @arguments(cursor: $cursor, parentId: $parentId)
      }
    `,
    vars: props => ({
      parentId: toGid('Topic', props.selectedGoalId) || null
    })
  })
);
