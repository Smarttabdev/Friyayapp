import React from 'react';

/**
  @param {(global|topic|tool)} scope Scope of the orders
 */
const createOrderQueryContainer = (Component, orderType, scope) => {
  const Container = createRefetchContainer(
    Component,
    {
      query: graphql`
        fragment orderQueryContainer_query on Query
          @argumentDefinitions(
            queryTopicId: { type: ID }
            queryLenseId: { type: ID }
            queryLenseKey: { type: String }
            topicId: { type: ID }
            lenseId: { type: ID }
            lenseKey: { type: String }
            orderType: { type: "CustomOrderEnum!" }
          ) {
          customOrders(
            orderType: $orderType
            topicId: $queryTopicId
            lenseId: $queryLenseId
            lenseKey: $queryLenseKey
          ) {
            id
            name
            order
          }
          activeCustomOrder(
            orderType: $orderType
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
          ) {
            id
          }
          defaultCustomOrder(
            orderType: $orderType
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
          ) {
            id
          }
        }
      `
    },
    graphql`
      query orderQueryContainerRefetchQuery(
        $queryTopicId: ID
        $queryLenseId: ID
        $queryLenseKey: String
        $topicId: ID
        $lenseId: ID
        $lenseKey: String
        $orderType: CustomOrderEnum!
      ) {
        ...orderQueryContainer_query
          @arguments(
            queryTopicId: $queryTopicId
            queryLenseId: $queryLenseId
            queryLenseKey: $queryLenseKey
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
            orderType: $orderType
          )
      }
    `
  );

  return QueryRenderer(props => <Container {...props} query={props} />, {
    query: graphql`
      query orderQueryContainerQuery(
        $queryTopicId: ID
        $queryLenseId: ID
        $queryLenseKey: String
        $topicId: ID
        $lenseId: ID
        $lenseKey: String
        $orderType: CustomOrderEnum!
      ) {
        ...orderQueryContainer_query
          @arguments(
            queryTopicId: $queryTopicId
            queryLenseId: $queryLenseId
            queryLenseKey: $queryLenseKey
            topicId: $topicId
            lenseId: $lenseId
            lenseKey: $lenseKey
            orderType: $orderType
          )
      }
    `,
    vars: ({ topicId, lenseId, lenseKey }) => ({
      queryTopicId: scope != 'global' ? toGid('Topic', topicId) : null,
      queryLenseId: !scope || scope === 'tool' ? toGid('Lens', lenseId) : null,
      queryLenseKey: !scope || scope === 'tool' ? lenseKey : null,
      topicId: toGid('Topic', topicId),
      lenseId: toGid('Lens', lenseId),
      lenseKey,
      orderType
    })
  });
};

export default createOrderQueryContainer;
