import React, { Fragment } from 'react';

import ChatPanel from 'Components/shared/chat/ChatPanel';

const ChatBlock = ({ id, config }) => {
  const handleSelectChat = chat => {
    mutations.updateBlock({
      id,
      config: {
        ...config,
        chat_id: toId(chat.id)
      }
    });
  };
  return (
    <Fragment>
      {!config.chat_id && <div className="mb10">Select chat:</div>}
      <div className="flex-1" style={{ minHeight: 0 }}>
        <ChatPanel
          asBlock
          chatId={config.chat_id}
          onSelectChat={handleSelectChat}
          all
        />
      </div>
    </Fragment>
  );
};

export default {
  label: 'Chat',
  iconProps: {
    icon: 'forum',
    color: '#f2c94c',
    outlined: true
  },
  renderDropdown: ({ id, type, config }) => {
    const handleSelectChat = () => {
      mutations.updateBlock({
        id,
        config: {
          ...config,
          chat_id: null
        }
      });
    };
    return (
      <li onClick={handleSelectChat}>
        <a>Select chat</a>
      </li>
    );
  },
  Component: ChatBlock
};
