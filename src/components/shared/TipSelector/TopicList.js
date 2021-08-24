import React, { Fragment } from 'react';

import TopicListItem from './TopicListItem';
import LoadMore from 'Components/shared/LoadMore';

const TopicList = ({
  topicsQuery,
  searchQuery,
  tipsFilter,
  relay,
  onTipClick
}) => {
  const topics = getNodes(topicsQuery?.topics);

  return (
    <div className="overflow-auto">
      {topics.map(topic => (
        <TopicListItem
          key={topic.id}
          topic={topic}
          searchQuery={searchQuery}
          tipsFilter={tipsFilter}
          onTipClick={onTipClick}
        />
      ))}
      <LoadMore relay={relay} count={15} />
    </div>
  );
};

export default createPaginationContainer(
  TopicList,
  {
    topicsQuery: graphql`
      fragment TopicList_topicsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          count: { type: Int, defaultValue: 15 }
          havingTips: { type: JSON }
        ) {
        topics(first: $count, after: $cursor, havingTips: $havingTips)
          @connection(key: "TopicList_topics") {
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
    getFragmentVariables: (prevVars, count) => ({ ...prevVars, count }),
    getVariables: (_props, { cursor }, fragmentVars) => ({
      ...fragmentVars,
      cursor
    }),
    query: graphql`
      query TopicListTopicsQuery($cursor: String, $havingTips: JSON) {
        ...TopicList_topicsQuery
          @arguments(cursor: $cursor, havingTips: $havingTips)
      }
    `
  }
);
