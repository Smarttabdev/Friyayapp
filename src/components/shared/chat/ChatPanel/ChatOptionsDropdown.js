import React from 'react';

import Dropdown from 'Components/shared/Dropdown';

import '../ChatPanel.module.scss';

const ChatOptionsDropdown = ({
  trigger,
  open,
  onClose,
  onMarkAsRead,
  onRename,
  onDelete,
  videoOptions
}) => {
  return (
    <Dropdown
      className="chat-options-dropdown"
      trigger={trigger}
      open={open}
      onClose={onClose}
      menuStyle={{
        padding: '10px 5px',
        left: -20
      }}
    >
      <li styleName="header-dropdown-item">
        {!videoOptions ? 'Chat options' : 'Video options'}
      </li>
      {onMarkAsRead && (
        <li styleName="dropdown-item" onClick={onMarkAsRead}>
          Mark as read
        </li>
      )}
      <li styleName="dropdown-item" onClick={onRename}>
        Rename
      </li>
      {onDelete && (
        <li styleName="dropdown-item" onClick={onDelete}>
          Delete
        </li>
      )}
    </Dropdown>
  );
};

export default ChatOptionsDropdown;
