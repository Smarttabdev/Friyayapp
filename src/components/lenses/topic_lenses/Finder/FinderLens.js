import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSort } from 'Components/lenses/card_lenses/Starter/utils';
import { updateFinderLens } from 'Src/newRedux/interface/lenses/actions';
import {
  setShowVideoRoomModal,
  setShowChatModal
} from 'Src/newRedux/interface/modals/actions';
import { viewCard } from 'Src/newRedux/database/cards/thunks';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { updateSelectedCard } from 'Src/newRedux/database/user/thunks';
import { layoutTypes } from './utils';
import Header from './Header';
import { addTopicItem, addTipItem } from 'Lib/items';
import { getFilterSettings } from 'Src/helpers/user_config';
import { compactFilters } from 'Lib/utilities';

const boardTypes = [
  'BOARD',
  'PROJECT',
  'GOAL',
  'TASK_BOARD',
  'FILE_BOARD',
  'NOTES_BOARD',
  'KNOWLEDGE_BOARD',
  'DATA_BOARD'
];
const cardTypes = [
  'CARD',
  'NOTES_CARD',
  'NOTES',
  'TASK_CARD',
  'TASK',
  'DATA_CARD',
  'DATA',
  'FILE'
];

const FinderLens = props => {
  const items = getNodes(props.query?.items);
  const { topicId, finderLens, topic, card_font_color, relay } = props;

  const selectedLayout = layoutTypes.find(
    layout => layout.name == finderLens.activeLayout
  );

  const subscriptionVars = {
    topicId: toGid('Topic', topicId),
    sort: getSort(props.finderLens.sort),
    itemTypes: props.finderLens.activeFilters.filter(x => x != 'ALL')
  };

  const forceGraphQLUpdateItems = () => {
    props.updateFinderLens({
      refreshCount: props.finderLens.refreshCount + 1
    });
  };

  const handleClickTitle = ({ topic, tip, type, slug, id }) => {
    const {
      viewCard: showCard,
      viewTopic: showTopic,
      setShowVideoRoomModal: showVideoRoom,
      setShowChatModal: showChat,
      cardsSplitScreen,
      updateSelectedCard
    } = props;

    console.log({ type, slug, id });

    const updateOrShowCard = s => {
      if (cardsSplitScreen) {
        updateSelectedCard(s);
      } else {
        showCard({ cardSlug: s });
      }
    };

    if (topic) showTopic({ topicSlug: topic.slug });

    if (tip) updateOrShowCard(tip.slug);

    if (boardTypes.includes(type)) {
      showTopic({ topicSlug: slug });
    } else if (cardTypes.includes(type)) {
      updateOrShowCard(slug);
    }

    if (type === 'VIDEO_CHAT') {
      showVideoRoom({ isOpen: true, videoRoomId: id });
    } else if (type === 'CHAT') {
      showChat({ isOpen: true, chatId: id });
    }
  };

  // useEffect(() => {
  //   const disposer = requestSubscription({
  //     subscription: graphql`
  //       subscription FinderLensTipCreatedSubscription($topicId: ID!) {
  //         tipCreated(topicId: $topicId) {
  //           tip {
  //             id
  //             title
  //             slug
  //             cardType
  //             createdAt
  //             updatedAt
  //           }
  //         }
  //       }
  //     `,
  //     vars: {
  //       topicId: toGid('Topic', topicId || 0)
  //     },
  //     onNext: data => {
  //       const tip = data.tipCreated?.tip;
  //       console.log('Tip created', tip);
  //       tip &&
  //         addTipItem(
  //           {
  //             id: tip.id,
  //             attributes: {
  //               title: tip.title,
  //               slug: tip.slug,
  //               card_type: tip.cardType,
  //               created_at: tip.createdAt,
  //               updated_at: tip.updatedAt
  //             }
  //           },
  //           'FinderLens',
  //           subscriptionVars
  //         );
  //     }
  //   });
  //   return () => disposer.dispose();
  // }, [topicId]);

  // useEffect(() => {
  //   const disposer = requestSubscription({
  //     subscription: graphql`
  //       subscription FinderLensTopicCreatedSubscription($topicId: ID!) {
  //         topicCreated(topicId: $topicId) {
  //           topic {
  //             id
  //             title
  //             slug
  //             tagList
  //             createdAt
  //             updatedAt
  //           }
  //         }
  //       }
  //     `,
  //     vars: {
  //       topicId: toGid('Topic', topicId || 0)
  //     },
  //     onNext: data => {
  //       const topic = data.topicCreated?.topic;
  //       console.log('Topic created', topic);
  //       topic &&
  //         addTopicItem(
  //           {
  //             id: topic.id,
  //             attributes: {
  //               title: topic.title,
  //               slug: topic.slug,
  //               tag_list: topic.tagList,
  //               created_at: topic.createdAt,
  //               updated_at: topic.updatedAt
  //             }
  //           },
  //           'FinderLens',
  //           subscriptionVars
  //         );
  //     }
  //   });
  //   return () => disposer.dispose();
  // }, [topicId]);

  return (
    <div
      className="finder_lens"
      style={card_font_color ? { color: card_font_color } : {}}
    >
      <Header
        finderProps={props}
        topic={topic}
        card_font_color={card_font_color}
      />
      <div className="layout_section">
        <selectedLayout.Component
          items={items}
          topicId={topicId}
          id={topicId}
          handleClickTitle={handleClickTitle}
          forceGraphQLUpdateItems={forceGraphQLUpdateItems}
          card_font_color={card_font_color}
          paginationRelay={relay}
        />
      </div>
    </div>
  );
};

const FinderLensContainer = createPaginationContainer(
  FinderLens,
  {
    query: graphql`
      fragment FinderLens_query on Query
        @argumentDefinitions(
          cursor: { type: String }
          refreshCount: { type: String }
          sort: { type: JSON }
          filters: { type: JSON }
          itemTypes: { type: "[ItemTypeEnum!]" }
          topicId: { type: ID }
        ) {
        items(
          first: 20
          after: $cursor
          sort: $sort
          filters: $filters
          itemTypes: $itemTypes
          topicId: $topicId
        ) @connection(key: "Finderlens_items") {
          totalCount
          edges {
            node {
              id
              itemId
              title
              slug
              baseType
              itemType
              createdAt
              updatedAt
              completedAt
              meta
              speed
              completion
              tip {
                id
                parent {
                  id
                  title
                }
                topic {
                  id
                  title
                }
              }
              topic {
                id
                parent {
                  id
                  title
                }
              }
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.items,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query FinderLensItemsQuery(
        $cursor: String
        $sort: JSON
        $filters: JSON
        $refreshCount: String
        $itemTypes: [ItemTypeEnum!]
        $topicId: ID
      ) {
        ...FinderLens_query
          @arguments(
            cursor: $cursor
            sort: $sort
            filters: $filters
            refreshCount: $refreshCount
            itemTypes: $itemTypes
            topicId: $topicId
          )
      }
    `
  }
);

const mapState = state => {
  const sm = stateMappings(state);
  const {
    page: { topicId },
    tools: { finderLens },
    menus,
    utilities: {
      active_design: { card_font_color }
    }
  } = sm;

  const cardsSplitScreen = menus.cardsSplitScreen;

  return {
    topicId,
    finderLens,
    cardsSplitScreen,
    filterSettings: getFilterSettings(state),
    card_font_color
  };
};

const mapDispatch = {
  updateFinderLens,
  viewCard,
  viewTopic,
  setShowChatModal,
  setShowVideoRoomModal,
  updateSelectedCard
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <FinderLensContainer {...props} query={props} />, {
    query: graphql`
      query FinderLensQuery(
        $cursor: String
        $sort: JSON
        $filters: JSON
        $refreshCount: String
        $itemTypes: [ItemTypeEnum!]
        $topicId: ID
      ) {
        ...FinderLens_query
          @arguments(
            cursor: $cursor
            sort: $sort
            filters: $filters
            refreshCount: $refreshCount
            itemTypes: $itemTypes
            topicId: $topicId
          )
      }
    `,
    vars: props => ({
      sort: getSort(props.finderLens.sort),
      filters: {
        ...compactFilters(props.filterSettings),
        query: props.finderLens.searchQuery
      },
      itemTypes: props.finderLens.activeFilters.filter(x => x != 'ALL'),
      topicId: toGid('Topic', props.topicId),
      refreshCount: Number(props.finderLens.refreshCount).toString()
    })
  })
);
