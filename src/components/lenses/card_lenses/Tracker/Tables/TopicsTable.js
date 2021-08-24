import React, { useState, useMemo, useEffect } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateTrackerLens } from 'Src/newRedux/interface/lenses/actions';
import LoadMore from 'Components/shared/LoadMore';
import TopicPage from 'Components/pages/TopicPage';
import Table from '../Table';

const TopicsTable = ({
  topicsQuery,
  relay,
  label,
  darkColor,
  tab,
  icon,
  trackerLens,
  updateTrackerLens
}) => {
  const key = tab == 'goals' ? 'selectedGoal' : 'selectedProject';
  const { [key]: selectedItem } = trackerLens;

  useEffect(() => {
    return eventBus.subscribe('tracker.tab.click', () => {
      updateTrackerLens({ [key]: null });
    });
  }, []);

  const setSelectedItem = item => updateTrackerLens({ [key]: item });

  const items = useMemo(() => {
    const topics = getNodes(topicsQuery?.topics);
    return topics.map(topic => ({
      id: topic.id,
      title: topic.title,
      icon,
      topic
    }));
  }, [topicsQuery]);

  return selectedItem ? (
    <TopicPage
      topicId={toId(selectedItem.id)}
      cardView="CANVAS"
      hideQuickToolbar
    />
  ) : (
    <Table
      label={label}
      darkColor={darkColor}
      items={items}
      footer={<LoadMore relay={relay} />}
      onClick={setSelectedItem}
    />
  );
};

const TopicsTablePagination = createPaginationContainer(
  TopicsTable,
  {
    topicsQuery: graphql`
      fragment TopicsTable_topicsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          parentId: { type: ID }
          tagged: { type: "[String!]" }
        ) {
        topics(first: 10, after: $cursor, parentId: $parentId, tagged: $tagged)
          @connection(key: "TopicsTable_topics") {
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
    getConnectionFromProps: props => props?.topicsQuery?.topics,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query TopicsTablePaginationQuery(
        $cursor: String
        $parentId: ID
        $tagged: [String!]
      ) {
        ...TopicsTable_topicsQuery
          @arguments(cursor: $cursor, parentId: $parentId, tagged: $tagged)
      }
    `
  }
);

const mapState = state => {
  const {
    page: { topicId },
    tools: { trackerLens }
  } = stateMappings(state);
  return {
    topicId,
    trackerLens
  };
};

const mapDispatch = {
  updateTrackerLens
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(
    props => <TopicsTablePagination {...props} topicsQuery={props} />,
    {
      query: graphql`
        query TopicsTableQuery($parentId: ID, $tagged: [String!]) {
          ...TopicsTable_topicsQuery
            @arguments(parentId: $parentId, tagged: $tagged)
        }
      `,
      vars: ({ topicId, tagged }) => ({
        parentId: toGid('Topic', topicId),
        tagged
      })
    }
  )
);
