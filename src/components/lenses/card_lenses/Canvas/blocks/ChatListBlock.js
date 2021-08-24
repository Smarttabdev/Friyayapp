import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import LoadMore from 'Components/shared/LoadMore';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import { getFilterSettings } from 'Src/helpers/user_config';
import { setShowChatModal } from 'Src/newRedux/interface/modals/actions';
import SheetAddRow from 'Components/lenses/card_lenses/Sheet/SheetAddRow';
import ChatItem from './ChatListBlock/ChatItem';
import { handleCreatedEdge } from 'Lib/utilities';

const ChatListBlock = ({
  tipsQuery,
  relay,
  topicId,
  topic,
  setShowChatModal,
  filterSettings,
  createCard,
  ...restProps
}) => {
  const [cardTitle, setCardTitle] = useState('');

  const tips = getNodes(tipsQuery?.tips);

  const handleSelectTip = async tip => {
    setShowChatModal({ isOpen: true, chatId: toId(tip.id) });
  };

  const handleAddCard = async () => {
    await createCard({
      attributes: { title: cardTitle, is_chat: true },
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
        subscription ChatListBlockTipCreatedSubscription($topicId: ID!) {
          tipCreated(topicId: $topicId) {
            tip {
              id
              title
              slug
              ...ChatListItem_chat
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
          connectionId: '__ChatListBlock_tips_connection',
          connectionVars: {
            topicId: toGid('Topic', topicId),
            subtopics: filterSettings?.include_subtopic_cards,
            root: !filterSettings.include_nested_cards,
            isChat: true,
            sort: 'created_at asc'
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
        style={{ marginLeft: -14, borderBottom: '1px solid #eeeeee' }}
      >
        Chats
      </div>
      <div className="overflow-auto" style={{ marginLeft: -14 }}>
        <table>
          <tbody>
            {tips.map(tip => (
              <ChatItem
                key={tip.id}
                chat={tip}
                query={rootFragments(restProps)}
                onClick={() => handleSelectTip(tip)}
              />
            ))}
          </tbody>
        </table>
        {!tips?.length && <div>&#x2012; No chats &#x2012;</div>}
        <SheetAddRow
          type="card"
          placeholder="Add Chat"
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

const ChatListBlockPagination = createPaginationContainer(
  ChatListBlock,
  {
    tipsQuery: graphql`
      fragment ChatListBlock_tipsQuery on Query
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
          isChat: true
          sort: "created_at asc"
        ) @connection(key: "ChatListBlock_tips") {
          edges {
            node {
              id
              title
              slug
              ...ChatItem_chat
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
      query ChatListBlockTipsQuery(
        $cursor: String
        $topicId: ID
        $subtopics: Boolean
        $root: Boolean
      ) {
        ...ChatListBlock_tipsQuery
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
  setShowChatModal,
  createCard
};

export default {
  label: 'Chat list',
  iconProps: {
    icon: 'format_list_bulleted',
    color: '#F2C94C'
  },
  Component: connect(
    mapState,
    mapDispatch
  )(
    QueryRenderer(
      props => (
        <ChatListBlockPagination {...props} tipsQuery={rootFragments(props)} />
      ),
      {
        query: graphql`
          query ChatListBlockQuery(
            $topicId: ID
            $subtopics: Boolean
            $root: Boolean
          ) {
            ...ChatUserNames_query
            ...ChatListBlock_tipsQuery
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
