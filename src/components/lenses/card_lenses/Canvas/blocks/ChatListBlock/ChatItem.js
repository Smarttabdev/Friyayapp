import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';

import Icon from 'Components/shared/Icon';
import ChatUserNames from 'Components/shared/chat/ChatPanel/ChatUserNames';
import 'Components/shared/chat/ChatPanel.module.scss';

const ChatItem = ({ chat, onClick, query }) => {
  useEffect(() => {
    if (chat) {
      const disposer = requestSubscription({
        subscription: graphql`
          subscription ChatItemSubscription($id: ID!) {
            tipUpdated(id: $id) {
              tip {
                id
                ...ChatItem_chat
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
    <Fragment>
      <tr className="pointer" onClick={onClick}>
        <td className="canvas-chatList-block__chat-item__td flex flex-r-center pl14">
          <Icon icon="forum" color="#f2c94c" outlined containerClasses="mr10" />
          {chat.title}
          {chat.chatUnreads > 0 && (
            <div styleName="unreads-badge">{chat.chatUnreads}</div>
          )}
        </td>
        <td className="canvas-chatList-block__chat-item__td">
          <ChatUserNames chat={chat} query={query} />
        </td>
      </tr>
    </Fragment>
  );
};

ChatItem.propTypes = {
  chat: PropTypes.object,
  onClick: PropTypes.func
};

export default createFragmentContainer(ChatItem, {
  chat: graphql`
    fragment ChatItem_chat on Tip {
      id
      title
      chatUnreads
      ...ChatUserNames_chat
    }
  `
});
