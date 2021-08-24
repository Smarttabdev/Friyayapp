import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ChatListItem from './ChatListItem';
import BoardChatList from './BoardChatList';
import LoadMore from 'Components/shared/LoadMore';
import { handleCreatedEdge } from 'Lib/utilities';
import { useTipCreatedUpdatedSubscription } from 'Src/lib/hooks';
import '../ChatPanel.module.scss';

const ChatsList = ({
  query,
  chatsQuery,
  searchQuery,
  relay,
  topicId,
  onClick,
  ...props
}) => {
  const chats = getNodes(chatsQuery?.chats);
  useEffect(() => {
    const disposer = requestSubscription({
      subscription: graphql`
        subscription ChatsListTipCreatedSubscription($topicId: ID!) {
          tipCreated(topicId: $topicId) {
            tip {
              id
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
          connectionId: '__ChatList_chats_connection',
          connectionVars: {
            topicId: props.__fragmentOwner.variables.listTopicId,
            filter: props.__fragmentOwner.variables.chatsFilter,
            subtopics: true,
            chatUnreads: true,
            sort: 'chat_unreads desc, last_chat_message_date desc'
          },
          edgeType: 'TipEdge',
          prepend: true
        });
      }
    });
    return () => disposer.dispose();
  }, [topicId]);
  const refetch = () => relay.refetchConnection(15);

  useTipCreatedUpdatedSubscription(topicId, refetch);

  return (
    <div styleName="chats-list-container">
      <div styleName="chats-list">
        {chats.map(chat => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            query={query}
            onClick={() => onClick(chat)}
          />
        ))}
        <LoadMore relay={relay} count={15} />
      </div>
      <div styleName="boards-list-title">Chats in Boards</div>
      <div styleName="boards-list">
        <BoardChatList
          query={query}
          topicsQuery={props}
          searchQuery={searchQuery}
          onChatClick={onClick}
        />
      </div>
    </div>
  );
};

ChatsList.propTypes = {
  onClick: PropTypes.func
};

const PaginationContainer = createPaginationContainer(
  ChatsList,
  {
    chatsQuery: graphql`
      fragment ChatsList_chatsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          chatsFilter: { type: JSON }
          topicId: { type: ID }
        ) {
        chats: tips(
          first: 15
          after: $cursor
          topicId: $topicId
          subtopics: true
          filter: $chatsFilter
          chatUnreads: true
          sort: "chat_unreads desc, last_chat_message_date desc"
        ) @connection(key: "ChatList_chats") {
          edges {
            node {
              id
              ...ChatListItem_chat
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => {
      return props.chatsQuery && props.chatsQuery.chats;
    },
    getFragmentVariables: (prevVars, totalCount) => {
      return { ...prevVars, count: totalCount };
    },
    getVariables: (props, { cursor }, fragmentVars) => {
      return {
        ...fragmentVars,
        cursor
      };
    },
    query: graphql`
      query ChatsListPaginationQuery(
        $cursor: String
        $topicId: ID
        $chatsFilter: JSON
      ) {
        ...ChatsList_chatsQuery
          @arguments(
            cursor: $cursor
            topicId: $topicId
            chatsFilter: $chatsFilter
          )
      }
    `
  }
);

export default QueryRenderer(
  props => <PaginationContainer {...props} chatsQuery={props} />,
  {
    query: graphql`
      query ChatsListQuery(
        $topicId: ID
        $chatsFilter: JSON
        $havingTips: JSON
      ) {
        ...ChatsList_chatsQuery
          @arguments(topicId: $topicId, chatsFilter: $chatsFilter)
        ...BoardChatList_topicsQuery
          @arguments(havingTips: $havingTips, parentId: $topicId)
      }
    `,
    vars: props => ({
      topicId: toGid('Topic', props.topicId),
      chatsFilter: props.searchQuery
        ? `is_chat = TRUE AND title ILIKE '%${props.searchQuery}%'`
        : 'is_chat = TRUE',
      havingTips: {
        filter: props.searchQuery
          ? `is_chat = TRUE AND title ILIKE '%${props.searchQuery}%'`
          : 'is_chat = TRUE'
      }
    })
  }
);
