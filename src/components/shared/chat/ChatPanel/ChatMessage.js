import React from 'react';
import cn from 'classnames';

import '../ChatPanel.module.scss';

const moreOptions = ['Edit', 'Delete'];

const ChatMessage = ({
  name,
  body,
  time,
  isEditing,
  isSelf,
  className,
  innerRef,
  handleOptionClick,
  chatId,
  borderColor,
  messageId
}) => {
  return (
    <div
      className={cn('fr-view', className)}
      styleName={cn(
        'chat-message',
        isSelf && 'chat-message-self',
        isEditing && 'is-editing'
      )}
      ref={innerRef}
    >
      {isSelf && (
        <div className="dropdown" styleName="dropdown">
          <a className="btn-settings" data-toggle="dropdown" id="dLabel">
            <span
              style={{ color: 'grey' }}
              className="material-icons ml15 more_vert"
            >
              more_vert
            </span>
          </a>
          <ul
            className="dropdown-menu"
            styleName="dropdown-menu"
            aria-labelledby="dLabel"
          >
            {moreOptions.map(option => (
              <li key={option}>
                <a onClick={() => handleOptionClick(option, chatId, messageId)}>
                  {option}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        styleName="chat-message-time"
        style={{ color: borderColor || '#d0d0d0' }}
      >
        {time}
      </div>
      <div styleName="chat-message-user">{name}</div>
      <div
        styleName="chat-message-body"
        dangerouslySetInnerHTML={{ __html: body }}
      />
    </div>
  );
};

export default ChatMessage;
