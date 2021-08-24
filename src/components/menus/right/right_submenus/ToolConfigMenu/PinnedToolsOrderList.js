import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import RenderList from './RenderOrderList';

const PinnedToolsOrderList = ({ query, type }) => {
  return (
    <RenderList
      list={query.pinnedLensesOrders}
      type={type}
      activeCustomOrderId={query?.activePinnedLensesOrder?.id}
    />
  );
};

const PinnedToolsOrderListContainer = createRefetchContainer(
  PinnedToolsOrderList,
  {
    query: graphql`
      fragment PinnedToolsOrderList_query on Query
        @argumentDefinitions(topicId: { type: ID }) {
        pinnedLensesOrders(topicId: $topicId) {
          id
          name
        }
        activePinnedLensesOrder(topicId: $topicId) {
          id
        }
        defaultPinnedLensesOrder(topicId: $topicId) {
          id
        }
      }
    `
  },
  graphql`
    query PinnedToolsOrderListOrdersQuery($topicId: ID) {
      ...PinnedToolsOrderList_query @arguments(topicId: $topicId)
    }
  `
);

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  return { topicId };
};

export default connect(mapState)(
  QueryRenderer(
    props => <PinnedToolsOrderListContainer {...props} query={props} />,
    {
      query: graphql`
        query PinnedToolsOrderListQuery($topicId: ID) {
          ...PinnedToolsOrderList_query @arguments(topicId: $topicId)
        }
      `,
      vars: ({ topicId }) => ({
        topicId: toGid('Topic', topicId)
      })
    }
  )
);
