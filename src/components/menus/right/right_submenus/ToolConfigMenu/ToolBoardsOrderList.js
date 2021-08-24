import React from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getUiSettings, getCustomLensId } from 'Src/helpers/user_config';
import RenderList from './RenderOrderList';

const ToolBoardsOrderList = ({ query, type }) => {
  return (
    <RenderList
      list={query.customOrders}
      type={type}
      activeCustomOrderId={query?.activeCustomOrder?.id}
    />
  );
};

const ToolBoardsOrderListContainer = createRefetchContainer(
  ToolBoardsOrderList,
  {
    query: graphql`
      fragment ToolBoardsOrderList_query on Query
        @argumentDefinitions(
          topicId: { type: ID }
          lenseId: { type: ID }
          lenseKey: { type: String }
        ) {
        customOrders(
          orderType: topics
          topicId: $topicId
          lenseId: $lenseId
          lenseKey: $lenseKey
        ) {
          id
          name
        }
        activeCustomOrder(
          orderType: topics
          topicId: $topicId
          lenseId: $lenseId
          lenseKey: $lenseKey
        ) {
          id
        }
        defaultCustomOrder(
          orderType: topics
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
    query ToolBoardsOrderListRefetchQuery(
      $topicId: ID
      $lenseId: ID
      $lenseKey: String
    ) {
      ...ToolBoardsOrderList_query
        @arguments(topicId: $topicId, lenseId: $lenseId, lenseKey: $lenseKey)
    }
  `
);

const mapState = state => {
  const {
    user,
    page: { topicId }
  } = stateMappings(state);
  const uiSettings = getUiSettings(state);
  const lenseId = getCustomLensId(state);
  const lenseKey = uiSettings.current_active_template;
  return {
    user,
    topicId,
    lenseId,
    lenseKey
  };
};

export default connect(mapState)(
  QueryRenderer(
    props => <ToolBoardsOrderListContainer {...props} query={props} />,
    {
      query: graphql`
        query ToolBoardsOrderListQuery(
          $topicId: ID
          $lenseId: ID
          $lenseKey: String
        ) {
          ...ToolBoardsOrderList_query
            @arguments(
              topicId: $topicId
              lenseId: $lenseId
              lenseKey: $lenseKey
            )
        }
      `,
      vars: ({ topicId, lenseId, lenseKey }) => ({
        topicId: toGid('Topic', topicId || 0),
        lenseId: toGid('Lens', lenseId),
        lenseKey
      })
    }
  )
);
