import React, { Fragment } from 'react';

import VideoPanel from 'Components/shared/video_rooms/VideoPanel';

const VideoChatBlock = ({ id, config }) => {
  const handleSelectVideoChat = chat => {
    mutations.updateBlock({
      id,
      config: {
        ...config,
        video_chat_id: toId(chat.id)
      }
    });
  };
  return (
    <Fragment>
      {!config.video_chat_id && <div className="mb10">Select video chat:</div>}
      <div className="flex-1" style={{ minHeight: 0 }}>
        <VideoPanel
          asBlock
          videoChatId={config.video_chat_id}
          onSelectVideoChat={handleSelectVideoChat}
        />
      </div>
    </Fragment>
  );
};

export default {
  label: 'Video chat',
  iconProps: {
    icon: 'videocam',
    color: '#EB5757',
    outlined: true
  },
  renderDropdown: ({ id, type, config }) => {
    const handleSelectVideoChat = () => {
      mutations.updateBlock({
        id,
        config: {
          ...config,
          video_chat_id: null
        }
      });
    };
    return (
      <li onClick={handleSelectVideoChat}>
        <a>Select video chat</a>
      </li>
    );
  },
  Component: VideoChatBlock
};
