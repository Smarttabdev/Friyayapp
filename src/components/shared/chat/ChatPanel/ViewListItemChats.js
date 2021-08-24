import React, { Fragment } from 'react';

import LoadMore from 'Components/shared/LoadMore';
import ChatListItem from './ChatListItem';
import '../ChatPanel.module.scss';

const ViewListItemChats = ({ query, chatsQuery, relay, onChatClick }) => {
  const chats = getNodes(chatsQuery?.chats);

  return (
    <Fragment>
      {chats.map(chat => (
        <ChatListItem
          key={chat.id}
          chat={chat}
          query={query}
          onClick={() => onChatClick(chat)}
        />
      ))}
      {chats.length <= 0 && (
        <div styleName="no-chats-text">&#x2012; No chats &#x2012;</div>
      )}
      <LoadMore relay={relay} count={10} />
    </Fragment>
  );
};

export default createPaginationContainer(
  ViewListItemChats,
  {
    chatsQuery: graphql`
      fragment ViewListItemChats_chatsQuery on Query
        @argumentDefinitions(
          cursor: { type: String }
          topicId: { type: ID }
          chatsFilter: { type: JSON }
        ) {
        chats: tips(
          first: 10
          after: $cursor
          filter: $chatsFilter
          topicId: $topicId
          chatUnreads: true
          sort: "chat_unreads desc, last_chat_message_date desc"
        ) @connection(key: "ViewListItemChats_chats") {
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
    getConnectionFromProps: props => props?.chatsQuery?.chats,
    getFragmentVariables: (prevVars, count) => ({ ...prevVars, count }),
    getVariables: (_props, { cursor }, fragmentVars) => ({
      ...fragmentVars,
      cursor
    }),
    query: graphql`
      query ViewListItemChatsQuery(
        $cursor: String
        $topicId: ID
        $chatsFilter: JSON
      ) {
        ...ViewListItemChats_chatsQuery
          @arguments(
            cursor: $cursor
            topicId: $topicId
            chatsFilter: $chatsFilter
          )
      }
    `
  }
);
