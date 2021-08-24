import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import CardsSheet from './CardsSheet';
import { useTipCreatedUpdatedSubscription } from 'Lib/hooks';

const ActivitiesSheet = ({ userId, groupId, topicId, tipsQuery, relay }) => {
  const tips = getNodes(tipsQuery?.tips);
  const cards = tips.map(tip => tip.jsonApi.data);

  useTipCreatedUpdatedSubscription(topicId, () => relay.refetchConnection(15));

  return (
    <CardsSheet
      topicId={topicId}
      userId={userId}
      groupId={groupId}
      label="Activities"
      topicTags={['project']}
      cards={cards}
    />
  );
};

const ActivitiesSheetPagination = createPaginationContainer(
  ActivitiesSheet,
  {
    tipsQuery: graphql`
      fragment ActivitiesSheet_tipsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicId: { type: ID }
          tipsFilter: { type: JSON }
          topicsParams: { type: JSON }
        ) {
        tips(
          first: 10
          after: $cursor
          topicId: $topicId
          filter: $tipsFilter
          topicsParams: $topicsParams
          subtopics: true
        ) @connection(key: "ActivitiesSheet_tips") {
          totalCount
          edges {
            node {
              id
              jsonApi
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.tipsQuery?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({
      ...vars,
      cursor
    }),
    query: graphql`
      query ActivitiesSheetTipsQuery(
        $cursor: String
        $topicId: ID
        $tipsFilter: JSON
        $topicsParams: JSON
      ) {
        ...ActivitiesSheet_tipsQuery
          @arguments(
            cursor: $cursor
            topicId: $topicId
            tipsFilter: $tipsFilter
            topicsParams: $topicsParams
          )
      }
    `
  }
);

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  return {
    topicId
  };
};

export default connect(mapState)(
  QueryRenderer(
    props => <ActivitiesSheetPagination {...props} tipsQuery={props} />,
    {
      query: graphql`
        query ActivitiesSheetQuery(
          $topicId: ID
          $tipsFilter: JSON
          $topicsParams: JSON
        ) {
          ...ActivitiesSheet_tipsQuery
            @arguments(
              topicId: $topicId
              tipsFilter: $tipsFilter
              topicsParams: $topicsParams
            )
        }
      `,
      vars: ({ topicId, userId, groupId }) => ({
        topicId: toGid('Topic', topicId),
        tipsFilter: {
          assigned_to: userId || groupId,
          assigned_to_type: userId ? 'User' : 'Group'
        },
        topicsParams: {
          parent_id: topicId,
          subtopics: true,
          tagged: ['project']
        }
      })
    }
  )
);
