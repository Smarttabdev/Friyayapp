import React from 'react';

import TabButton from '../TabButton';
import { useTopicCreatedUpdatedSubscription } from 'Lib/hooks';

const TopicsButton = ({ topicsQuery, relay, topicId, TabButtonProps }) => {
  useTopicCreatedUpdatedSubscription(topicId, () =>
    relay.refetch(vars => vars)
  );

  return (
    <TabButton count={topicsQuery?.topics?.totalCount} {...TabButtonProps} />
  );
};

const RefetchContainer = createRefetchContainer(
  TopicsButton,
  {
    topicsQuery: graphql`
      fragment TopicsButton_topicsQuery on Query
        @argumentDefinitions(
          parentId: { type: ID }
          tagged: { type: "[String!]" }
          assignedId: { type: "[ID!]" }
          assignedToType: { type: String }
        ) {
        topics(
          parentId: $parentId
          tagged: $tagged
          assignedTo: $assignedId
          assignedToType: $assignedToType
        ) {
          totalCount
        }
      }
    `
  },
  graphql`
    query TopicsButtonRefetchQuery(
      $parentId: ID
      $tagged: [String!]
      $assignedId: [ID!]
      $assignedToType: String
    ) {
      ...TopicsButton_topicsQuery
        @arguments(
          parentId: $parentId
          tagged: $tagged
          assignedId: $assignedId
          assignedToType: $assignedToType
        )
    }
  `
);

export default QueryRenderer(
  props => <RefetchContainer {...props} topicsQuery={props} />,
  {
    query: graphql`
      query TopicsButtonQuery(
        $parentId: ID
        $tagged: [String!]
        $assignedId: [ID!]
        $assignedToType: String
      ) {
        ...TopicsButton_topicsQuery
          @arguments(
            parentId: $parentId
            tagged: $tagged
            assignedId: $assignedId
            assignedToType: $assignedToType
          )
      }
    `,
    vars: ({ topicId, tagged, assignedId, assignedToType }) => ({
      parentId: toGid('Topic', topicId),
      tagged,
      assignedId,
      assignedToType
    })
  }
);
