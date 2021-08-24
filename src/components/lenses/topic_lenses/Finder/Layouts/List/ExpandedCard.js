import React from 'react';
import ListLayout from './ListLayout';

const ExpandedCard = props => {
  return (
    <>
      <ListLayout
        id={props.id}
        tips={getNodes(props.tipsQuery?.tips)}
        handleClickTitle={props.handleClickTitle}
        paginationRelay={props.relay}
      />
    </>
  );
};

const ExpandedCardContainer = createPaginationContainer(
  ExpandedCard,
  {
    tipsQuery: graphql`
      fragment ExpandedCard_tipsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          tipId: { type: ID }
          sort: { type: JSON }
        ) {
        tips(first: 15, after: $cursor, tipId: $tipId, sort: $sort)
          @connection(key: "ExpandedCard_tips") {
          totalCount
          edges {
            node {
              id
              title
              slug
              cardType
              nestedTips {
                totalCount
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.tipsQuery?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query ExpandedCardTipsQuery($cursor: String, $tipId: ID, $sort: JSON) {
        ...ExpandedCard_tipsQuery
          @arguments(cursor: $cursor, sort: $sort, tipId: $tipId)
      }
    `
  }
);

export default QueryRenderer(
  props => <ExpandedCardContainer {...props} tipsQuery={props} />,
  {
    query: graphql`
      query ExpandedCardQuery($cursor: String, $tipId: ID, $sort: JSON) {
        ...ExpandedCard_tipsQuery
          @arguments(cursor: $cursor, tipId: $tipId, sort: $sort)
      }
    `,
    vars: props => ({
      tipId: toGid('Topic', props.id),
      sort: { created_at: 'desc' }
    })
  }
);
