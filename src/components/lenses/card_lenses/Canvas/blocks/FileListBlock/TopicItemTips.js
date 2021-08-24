import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import LoadMore from 'Components/shared/LoadMore';
import TipItem from '../FileBlock/TipItem';

const TopicItemTips = ({
  topicId,
  tipsQuery,
  relay,
  viewCard,
  filterSettings
}) => {
  const tips = getNodes(tipsQuery?.tips);

  const handleClickTip = tip => {
    viewCard({ cardSlug: tip.slug });
  };

  return (
    <Fragment>
      {tips.map(tip => (
        <TipItem
          key={tip.id}
          tip={tip}
          topicId={topicId}
          filterSettings={filterSettings}
          onClickTip={handleClickTip}
          connectionField="__TopicItemTips_tips_connection"
        />
      ))}
      <LoadMore relay={relay} count={15} />
    </Fragment>
  );
};

const mapDispatch = {
  viewCard
};

export default connect(
  null,
  mapDispatch
)(
  createPaginationContainer(
    TopicItemTips,
    {
      tipsQuery: graphql`
        fragment TopicItemTips_tipsQuery on Query
          @argumentDefinitions(
            cursor: { type: String }
            topicId: { type: ID }
            subtopics: { type: Boolean }
            root: { type: Boolean }
          ) {
          tips(
            first: 15
            after: $cursor
            topicId: $topicId
            subtopics: $subtopics
            root: $root
            haveFiles: true
          ) @connection(key: "TopicItemTips_tips") {
            edges {
              node {
                id
                ...TipItem_tip
              }
            }
          }
        }
      `
    },
    {
      getConnectionFromProps: props => props?.tipsQuery.tips,
      getFragmentVariables: (vars, count) => ({ ...vars, count }),
      getVariables: (_props, { cursor }, vars) => ({ ...vars, cursor }),
      query: graphql`
        query TopicItemTipsQuery(
          $cursor: String
          $topicId: ID
          $subtopics: Boolean
          $root: Boolean
        ) {
          ...TopicItemTips_tipsQuery
            @arguments(
              cursor: $cursor
              topicId: $topicId
              subtopics: $subtopics
              root: $root
            )
        }
      `
    }
  )
);
