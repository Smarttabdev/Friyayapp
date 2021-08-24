import React, { Fragment } from 'react';

import ViewListItem from './ViewListItem';
import LoadMore from 'Components/shared/LoadMore';

const BoardChatList = ({
  query,
  topicsQuery,
  searchQuery,
  relay,
  onChatClick
}) => {
  const topics = getNodes(topicsQuery?.chatTopics);

  return (
    <Fragment>
      {topics.map(topic => (
        <ViewListItem
          key={topic.id}
          topic={topic}
          query={query}
          searchQuery={searchQuery}
          onChatClick={onChatClick}
        />
      ))}
      <LoadMore relay={relay} count={15} />
    </Fragment>
  );
};

export default createPaginationContainer(
  BoardChatList,
  {
    topicsQuery: graphql`
      fragment BoardChatList_topicsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          count: { type: Int, defaultValue: 15 }
          parentId: { type: ID }
          havingTips: { type: JSON }
        ) {
        chatTopics: topics(
          first: $count
          after: $cursor
          all: true
          parentId: $parentId
          subtopics: true
          havingTips: $havingTips
        ) @connection(key: "BoardChatList_chatTopics") {
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
    getConnectionFromProps: props => props?.topicsQuery?.chatTopics,
    getFragmentVariables: (prevVars, count) => ({ ...prevVars, count }),
    getVariables: (_props, { cursor }, fragmentVars) => ({
      ...fragmentVars,
      cursor
    }),
    query: graphql`
      query BoardChatListTopicsQuery($cursor: String, $havingTips: JSON) {
        ...BoardChatList_topicsQuery
          @arguments(cursor: $cursor, havingTips: $havingTips)
      }
    `
  }
);
