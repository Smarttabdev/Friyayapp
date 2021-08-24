export const tipsListQuery = graphql`
  fragment queries_tipsListQuery on Query
    @argumentDefinitions(
      count: { type: Int, defaultValue: 15 }
      cursor: { type: String }
      rootTopics: { type: Boolean }
      topicId: { type: ID }
      filter: { type: JSON }
    ) {
    tips(
      first: $count
      after: $cursor
      rootTopics: $rootTopics
      topicId: $topicId
      filter: $filter
    ) @connection(key: "queries_tips") {
      totalCount
      edges {
        node {
          id
          title
          slug
          cardType
        }
      }
    }
  }
`;

export const tipsListPaginationQuery = graphql`
  query queriesQuery(
    $count: Int
    $cursor: String
    $rootTopics: Boolean
    $topicId: ID
    $filter: JSON
  ) {
    ...queries_tipsListQuery
      @arguments(
        count: $count
        cursor: $cursor
        rootTopics: $rootTopics
        topicId: $topicId
        filter: $filter
      )
  }
`;
