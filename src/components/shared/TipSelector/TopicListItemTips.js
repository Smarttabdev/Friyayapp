import React, { Fragment } from 'react';

import LoadMore from 'Components/shared/LoadMore';
import TipListItem from './TipListItem';
import './TipSelector.module.scss';
import { getCardTypeIconAttribute } from 'Src/utils/icons';

const TopicListItemTips = ({ tipsQuery, relay, renderTip, onTipClick }) => {
  const tips = getNodes(tipsQuery?.tips);

  return (
    <Fragment>
      {tips.map(tip =>
        renderTip ? (
          renderTip(tip)
        ) : (
          <TipListItem
            key={tip.id}
            tip={tip}
            onClick={() => onTipClick(tip)}
            iconProps={{
              icon: getCardTypeIconAttribute(tip?.cardType).icon,
              color: getCardTypeIconAttribute(tip?.cardType).defaultColor,
              outlined: true,
              fontSize: 20
            }}
          />
        )
      )}
      {tips.length <= 0 && (
        <div styleName="no-tips-text">&#x2012; No cards &#x2012;</div>
      )}
      <LoadMore relay={relay} count={10} />
    </Fragment>
  );
};

export default createPaginationContainer(
  TopicListItemTips,
  {
    tipsQuery: graphql`
      fragment TopicListItemTips_tipsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicId: { type: ID }
          tipsFilter: { type: JSON }
        ) {
        tips(
          first: 10
          after: $cursor
          filter: $tipsFilter
          sort: "updated_at desc"
          topicId: $topicId
        ) @connection(key: "TopicListItemTips_tips") {
          edges {
            node {
              id
              title
              cardType
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.tipsQuery?.tips,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (_, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query TopicListItemTipsQuery(
        $cursor: String
        $topicId: ID
        $tipsFilter: JSON
      ) {
        ...TopicListItemTips_tipsQuery
          @arguments(
            cursor: $cursor
            topicId: $topicId
            tipsFilter: $tipsFilter
          )
      }
    `
  }
);
