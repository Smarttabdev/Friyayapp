import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ChatUserNames from './ChatUserNames';
import '../ChatPanel.module.scss';

const ChatListItem = ({ chat, query, onClick }) => {
  useEffect(() => {
    if (chat) {
      const disposer = requestSubscription({
        subscription: graphql`
          subscription ChatListItemSubscription($id: ID!) {
            tipUpdated(id: $id) {
              tip {
                id
                ...ChatListItem_chat
              }
            }
          }
        `,
        vars: { id: chat.id }
      });
      return () => disposer.dispose();
    }
  }, [chat && chat.id]);

  return (
    <div styleName="chat-list-item">
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          marginRight: '10px'
        }}
      >
        <a className="flex-r-center full-width" onClick={onClick}>
          <div styleName="chat-icon gold">
            <i className="material-icons-outlined">forum</i>
          </div>
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {chat.title}
          </span>
        </a>
        {chat.chatUnreads > 0 && (
          <div styleName="unreads-badge" onClick={onClick}>
            {chat.chatUnreads}
          </div>
        )}
      </div>
      <ChatUserNames chat={chat} query={query} />
    </div>
  );
};

ChatListItem.propTypes = {
  chat: PropTypes.object,
  unreadCount: PropTypes.node,
  onClick: PropTypes.func
};

export default createFragmentContainer(ChatListItem, {
  chat: graphql`
    fragment ChatListItem_chat on Tip {
      id
      title
      chatUnreads
      ...ChatUserNames_chat
    }
  `
});
