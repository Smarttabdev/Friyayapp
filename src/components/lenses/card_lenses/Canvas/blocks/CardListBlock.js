import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import LoadMore from 'Components/shared/LoadMore';
import { viewCard, createCard } from 'Src/newRedux/database/cards/thunks';
import { getFilterSettings } from 'Src/helpers/user_config';
import SheetAddRow from 'Components/lenses/card_lenses/Sheet/SheetAddRow';
import TipItem from './CardListBlock/TipItem';
import { handleCreatedEdge } from 'Lib/utilities';

const CardListBlock = ({
  tipsQuery,
  relay,
  topic,
  topicId,
  viewCard,
  createCard,
  filterSettings
}) => {
  const [cardTitle, setCardTitle] = useState('');

  const tips = getNodes(tipsQuery?.tips);

  const handleSelectTip = async tip => {
    viewCard({ cardSlug: tip.slug });
  };

  const handleAddCard = async () => {
    await createCard({
      attributes: { title: cardTitle },
      relationships: topic
        ? {
            topics: { data: [topic.id] }
          }
        : {}
    });
    setCardTitle('');
  };

  useEffect(() => {
    const disposer = requestSubscription({
      subscription: graphql`
        subscription CardListBlockTipCreatedSubscription($topicId: ID!) {
          tipCreated(topicId: $topicId) {
            tip {
              id
              title
              slug
              nestedTips {
                totalCount
              }
            }
          }
        }
      `,
      vars: {
        topicId: toGid('Topic', topicId || 0)
      },
      updater: store => {
        handleCreatedEdge({
          store,
          rootField: 'tipCreated',
          field: 'tip',
          connectionId: '__CardListBlock_tips_connection',
          connectionVars: {
            topicId: toGid('Topic', topicId),
            subtopics: filterSettings?.include_subtopic_cards,
            root: !filterSettings?.include_nested_cards
          },
          edgeType: 'TipEdge'
        });
      }
    });
    return () => disposer.dispose();
  }, [topicId]);

  return (
    <Fragment>
      <div
        className="bold pb12 pl14"
        style={{ borderBottom: '1px solid #eeeeee', marginLeft: -14 }}
      >
        Cards
      </div>
      <div className="overflow-auto" style={{ marginLeft: -14 }}>
        {tips.map(tip => (
          <TipItem
            key={tip.id}
            tip={tip}
            onClick={() => handleSelectTip(tip)}
          />
        ))}
        {!tips?.length && <div>&#x2012; No cards &#x2012;</div>}
        <SheetAddRow
          type="card"
          placeholder="Add Card"
          noPlus
          noTopicSelector
          cardTitle={cardTitle}
          onChangeTitle={setCardTitle}
          onAdd={handleAddCard}
        />
        <LoadMore relay={relay} count={15} className="pt10" />
      </div>
    </Fragment>
  );
};

const CardListBlockPagination = createPaginationContainer(
  CardListBlock,
  {
    tipsQuery: graphql`
      fragment CardListBlock_tipsQuery on Query
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
        ) @connection(key: "CardListBlock_tips") {
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
    getVariables: (_props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query CardListBlockTipsQuery(
        $cursor: String
        $topicId: ID
        $subtopics: Boolean
        $root: Boolean
      ) {
        ...CardListBlock_tipsQuery
          @arguments(
            cursor: $cursor
            topicId: $topicId
            subtopics: $subtopics
            root: $root
          )
      }
    `
  }
);

const mapState = state => {
  return {
    filterSettings: getFilterSettings(state)
  };
};

const mapDispatch = {
  viewCard,
  createCard
};

export default {
  label: 'Card list',
  iconProps: {
    icon: 'format_list_bulleted',
    color: '#56CCF2'
  },
  Component: connect(
    mapState,
    mapDispatch
  )(
    QueryRenderer(
      props => (
        <CardListBlockPagination {...props} tipsQuery={rootFragments(props)} />
      ),
      {
        query: graphql`
          query CardListBlockQuery(
            $topicId: ID
            $subtopics: Boolean
            $root: Boolean
          ) {
            ...CardListBlock_tipsQuery
              @arguments(topicId: $topicId, subtopics: $subtopics, root: $root)
          }
        `,
        vars: props => ({
          topicId: toGid('Topic', props.topicId),
          subtopics: props.filterSettings?.include_subtopic_cards,
          root: !props.filterSettings?.include_nested_cards
        })
      }
    )
  )
};
