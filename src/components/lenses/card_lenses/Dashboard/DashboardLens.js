import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { get } from 'lodash';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import Dropdown from 'Components/shared/Dropdown';
import DashboardSpeedometerBox from './DashboardSpeedometerBox';
import store from 'src/store/store';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';

const DashboardLens = props => {
  const { topicId, allTopics, path, query } = props;
  const { linkedBoardsConfig } = query || {};

  const [selectedTopics, setSelectedTopics] = useState([]);

  useEffect(() => {
    const topicIds = linkedBoardsConfig?.value || [];
    const topics = topicIds
      .filter(id => allTopics[id])
      .map(id => ({
        id,
        title: get(allTopics, [id, 'attributes', 'title'], ''),
        slug: get(allTopics, [id, 'attributes', 'slug'], ''),
        completed_percentage: get(
          allTopics,
          [id, 'attributes', 'completed_percentage'],
          0
        )
      }));
    setSelectedTopics(topics);
  }, [linkedBoardsConfig?.value]);

  const saveSelectedTopicIds = ids => {
    let boardIds = ids;
    // if (linkedBoardsConfig?.value) {
    //   boardIds = [...linkedBoardsConfig.value, ...ids];
    // }
    mutations.setConfig({
      owner: toGid('Topic', topicId),
      config: 'dashboard_boards',
      value: boardIds
    });
  };

  const getTopicsSelected = list => {
    const selectedTopicsArr = list.map(topic => ({
      id: allTopics[topic.value].id,
      title: allTopics[topic.value].attributes.title,
      slug: allTopics[topic.value].attributes.slug,
      completed_percentage:
        allTopics[topic.value].attributes.completed_percentage
    }));

    return setSelectedTopics(selectedTopicsArr);
  };

  const handleTopicSelected = topicsArr => {
    const list = topicsArr.map(topic => ({
      value: topic.id,
      label: topic.title
    }));
    getTopicsSelected(list);
    saveSelectedTopicIds(list.map(opt => opt.value));
  };

  const handleDropOrderItem = ({ itemOrder }) => {
    handleTopicSelected(itemOrder);
  };

  return (
    <div className="dashboard-lens">
      <GenericDragDropListing
        dropClassName="dashboard-lens__grid"
        itemList={selectedTopics || []}
        itemType={dragItemTypes.TOPIC}
        dragPreview={topic => <div>{topic.title}</div>}
        onDropItem={handleDropOrderItem}
        renderItem={topic => (
          <DashboardSpeedometerBox key={topic.id} topicId={topic.id} />
        )}
      >
        <div className="dashboard-speedometer-add-box">
          <Dropdown
            trigger="Add Board"
            closeOnClick={false}
            menuStyle={{ left: -165 }}
            menuClassName="p-a-0 max-h-unset"
          >
            <TopicsListDropdown
              additionalClasses="invite-form-dropdown-menu d-block static max-h-unset"
              actionButtonLabel="Select Board"
              actionButtonHandler={handleTopicSelected}
              actionButtonClass="btn-primary"
              path={path.concat({ id: '0' })}
              startAt={path && '0'}
              hideHeader
              hideTopicSelector={false}
              inputMode="list"
              showAddBoard
              disallowCreate
              multiple
              hideAddTopicLink
              skipConfirmation
              onInputBlur={() => {}}
              onInputFocus={() => {}}
              domain={window.currentDomain}
              onSelectTopic={() => {}}
              extraStyle={{ maxHeight: 'unset' }}
              selectedTopics={selectedTopics}
            />
          </Dropdown>
        </div>
      </GenericDragDropListing>
      <div className="dashboard-lens__grid"></div>
    </div>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId, parentTopicId },
    utilities: { active_design }
  } = sm;

  const id = parentTopicId || topicId;
  const allTopics = stateMappings(store.getState()).topics;
  const topic = allTopics[id];
  const path = topic?.attributes.path;

  return {
    path,
    allTopics,
    topicId: id,
    active_font_color: active_design.card_font_color
  };
};

const RefetchContainer = createRefetchContainer(
  DashboardLens,
  {
    query: graphql`
      fragment DashboardLens_query on Query
        @argumentDefinitions(owner: { type: "ID!" }) {
        linkedBoardsConfig: config(owner: $owner, config: "dashboard_boards") {
          value
        }
      }
    `
  },
  graphql`
    query DashboardLensRefetchQuery($owner: ID!) {
      ...DashboardLens_query @arguments(owner: $owner)
    }
  `
);

export default connect(mapState)(
  QueryRenderer(props => <RefetchContainer {...props} query={props} />, {
    query: graphql`
      query DashboardLensQuery($owner: ID!) {
        ...DashboardLens_query @arguments(owner: $owner)
      }
    `,
    vars: ({ topicId }) => ({
      owner: toGid('Topic', topicId || 0)
    })
  })
);
