import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getTopicOrdersByTopic } from 'Src/newRedux/database/topicOrders/selectors';
import { getLabelOrders } from 'Src/newRedux/database/labelOrders/selectors';
import { getCustomLensId } from 'Src/helpers/user_config';
import { getRelevantViewForPage } from 'Src/newRedux/interface/lenses/selectors';
import RenderList from './RenderOrderList';
import PinnedToolsOrderList from './PinnedToolsOrderList';
import ToolBoardsOrderList from './ToolBoardsOrderList';

const mapStateNotFromQuery = (state, props) => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const {
    type: { orderType }
  } = props;

  let ordersForType;

  if (orderType == 'cards_and_boards')
    ordersForType = getTopicOrdersByTopic(state)[topicId || 0] || [];
  if (orderType == 'labels') ordersForType = getLabelOrders(state);

  return { ordersForType };
};

const ListNotFromQuery = connect(mapStateNotFromQuery)(
  ({ ordersForType, type }) => {
    return <RenderList list={ordersForType} type={type} />;
  }
);

const ListFromQueryList = ({ query, type }) => {
  return (
    <RenderList
      list={query.customOrders}
      type={type}
      activeCustomOrderId={query?.activeCustomOrder?.id}
    />
  );
};

const Container = createRefetchContainer(
  ListFromQueryList,
  {
    query: graphql`
      fragment OrdersSectionValue_query on Query
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
    query OrdersSectionValueRefetchQuery(
      $queryTopicId: ID
      $queryLenseId: ID
      $queryLenseKey: String
      $topicId: ID
      $lenseId: ID
      $lenseKey: String
      $orderType: CustomOrderEnum!
    ) {
      ...OrdersSectionValue_query
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

const mapStateFromQuery = (state, props) => {
  const {
    user,
    page: { topicId }
  } = stateMappings(state);
  const lenseId = getCustomLensId(state);
  const lenseKey = getRelevantViewForPage(state);
  const {
    type: { orderType, scope }
  } = props;

  return {
    user,
    topicId,
    lenseId,
    lenseKey,
    scope,
    orderType
  };
};

const ListFromQuery = connect(mapStateFromQuery)(
  QueryRenderer(props => <Container {...props} query={props} />, {
    query: graphql`
      query OrdersSectionValueQuery(
        $queryTopicId: ID
        $queryLenseId: ID
        $queryLenseKey: String
        $topicId: ID
        $lenseId: ID
        $lenseKey: String
        $orderType: CustomOrderEnum!
      ) {
        ...OrdersSectionValue_query
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
    vars: ({ topicId, lenseId, lenseKey, orderType, scope }) => ({
      queryTopicId: scope != 'global' ? toGid('Topic', topicId) : null,
      queryLenseId: !scope || scope === 'tool' ? toGid('Lens', lenseId) : null,
      queryLenseKey: !scope || scope === 'tool' ? lenseKey : null,
      topicId: toGid('Topic', topicId),
      lenseId: toGid('Lens', lenseId),
      lenseKey,
      orderType
    })
  })
);

const OrdersSectionValue = ({ type }) => {
  const { orderType } = type;
  return ['cards_and_boards', 'labels'].includes(orderType) ? (
    <ListNotFromQuery type={type} />
  ) : orderType == 'pinned_tools' ? (
    <PinnedToolsOrderList type={type} />
  ) : orderType == 'tool_boards' ? (
    <ToolBoardsOrderList type={type} />
  ) : (
    <ListFromQuery type={type} />
  );
};

export default OrdersSectionValue;
