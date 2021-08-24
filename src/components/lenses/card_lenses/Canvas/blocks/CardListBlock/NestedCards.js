import React, { Fragment } from 'react';

import LoadMore from 'Components/shared/LoadMore';
import TipItem from './TipItem';

const NestedCards = ({ tipsQuery, relay, onClick }) => {
  const tips = getNodes(tipsQuery?.tips);
  return (
    <div className="ml15">
      {tips.map(tip => (
        <TipItem key={tip.id} tip={tip} onClick={onClick} />
      ))}
      <LoadMore relay={relay} count={15} />
    </div>
  );
};

const NestedCardsPagination = createPaginationContainer(
  NestedCards,
  {
    tipsQuery: graphql`
      fragment NestedCards_tipsQuery on Query
        @argumentDefinitions(cursor: { type: String }, tipId: { type: "ID!" }) {
        tips(first: 15, after: $cursor, tipId: $tipId)
          @connection(key: "NestedCards_tips") {
          edges {
            node {
              id
              title
              slug
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
    getVariables: (_props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query NestedCardsQuery($cursor: String, $tipId: ID!) {
        ...NestedCards_tipsQuery @arguments(cursor: $cursor, tipId: $tipId)
      }
    `
  }
);

export default NestedCardsPagination;
