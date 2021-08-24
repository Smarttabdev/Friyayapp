import React from 'react';

import { usePresenceUpdated } from 'Src/graphql/hooks';
import './LiveVideoRoomsLens.module.scss';

const LiveVideoRoomCard = ({
  chatId,
  title,
  topicTitle,
  channelPresences,
  onClick
}) => {
  usePresenceUpdated({
    channel: `VideoRoom#${toId(chatId)}`,
    deps: toId(chatId)
  });

  const users = channelPresences?.users || [];

  let userNameList = users
    .slice(0, 2)
    .map(user => user.name)
    .join(', ');

  if (users.length > 2) {
    userNameList += ` +${users.length - 2}`;
  }

  const userColor = user => {
    const hue = (user.id * 45) % 360;
    return `hsl(${hue}, 83%, 63%)`;
  };

  return (
    <div styleName="video-room-card" onClick={onClick}>
      <div styleName="card-header">
        <i className="material-icons-outlined" styleName="video-icon">
          videocam
        </i>
        <h2>{title}</h2>
      </div>
      <div styleName="avatars-bar">
        {users.map(user => (
          <div
            key={user.id}
            styleName="avatar"
            style={{
              borderColor: userColor(user)
            }}
          >
            <img src={user.avatarUrl} />
          </div>
        ))}
        {!users.length && (
          <div styleName="empty-users">Nobody's here right now</div>
        )}
      </div>
      <div styleName="card-footer">
        <div styleName="user-names">
          <i className="material-icons-outlined">person_add</i>
          <span>{userNameList}</span>
        </div>
        <div>{topicTitle}</div>
      </div>
    </div>
  );
};

export default QueryRenderer(LiveVideoRoomCard, {
  query: graphql`
    query LiveVideoRoomCardQuery($channel: String!) {
      channelPresences: channelFlag(channel: $channel, flag: "presence") {
        id
        channel
        users {
          id
          name
          avatarUrl
        }
      }
    }
  `,
  vars: ({ chatId }) => ({
    channel: `VideoRoom#${toId(chatId)}`
  })
});
