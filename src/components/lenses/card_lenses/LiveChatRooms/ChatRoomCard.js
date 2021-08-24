import React from 'react';
import cn from 'classnames';

import ChatMessage from 'Components/shared/chat/ChatPanel/ChatMessage';
import { usePresenceUpdated } from 'Src/graphql/hooks';

import './LiveChatRooms.module.scss';

const ChatRoomCard = ({
  title,
  chatId,
  msgAuthor,
  msgBody,
  isSelf,
  channelPresences,
  onClick
}) => {
  usePresenceUpdated({
    channel: `Chat#${toId(chatId)}`,
    deps: toId(chatId)
  });

  const users = channelPresences?.users || [];

  return (
    <div styleName="chat-room-card" onClick={onClick}>
      <div styleName="card-header">
        <i className="material-icons-outlined" styleName="chat-icon">
          forum
        </i>
        <h2>{title}</h2>
      </div>
      <div styleName="avatars-bar">
        {users.map(user => (
          <div key={user.id} styleName="avatar">
            <img src={user.avatarUrl} />
          </div>
        ))}
        {!users.length && (
          <div styleName="empty-users">Nobody's here right now</div>
        )}
      </div>
      <ChatMessage
        styleName={cn('chat-message', isSelf && 'is-self')}
        name={isSelf ? undefined : msgAuthor}
        body={msgBody}
        isSelf={isSelf}
      />
    </div>
  );
};

export default QueryRenderer(ChatRoomCard, {
  query: graphql`
    query ChatRoomCardQuery($channel: String!) {
      channelPresences: channelFlag(channel: $channel, flag: "presence") {
        id
        channel
        users {
          id
          avatarUrl
        }
      }
    }
  `,
  vars: ({ chatId }) => ({
    channel: `Chat#${toId(chatId)}`
  })
});
