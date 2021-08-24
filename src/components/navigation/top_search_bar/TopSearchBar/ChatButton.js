import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Popup from 'Components/shared/Popup';
import ChatPanel from 'Components/shared/chat/ChatPanel';
import Tooltip from 'Components/shared/Tooltip';

import './Button.module.scss';

const ChatButton = ({ count, className, color }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const forId = Math.ceil(Math.random() * 100000, 6);

  return (
    <Popup
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      closeOnDocumentClick
      trigger={
        <div
          className={className}
          styleName="chat-button"
          data-tip={'Chat'}
          data-for={forId}
        >
          <div styleName="icon">
            <i
              style={{ color, fontSize: 19 }}
              styleName={cn('icon-size')}
              className="material-icons-outlined"
            >
              forum
            </i>
            {!!count && <div styleName="count">{count}</div>}
          </div>
          <Tooltip {...{ place: 'bottom' }} id={forId} />
        </div>
      }
      arrow={false}
      // position="bottom center"
      position="bottom right"
      // offsetX={-25}
      contentStyle={{ marginTop: -4 }}
    >
      <div styleName="chat-panel-container">
        <ChatPanel asDropdown onClose={handleClose} />
      </div>
    </Popup>
  );
};

ChatButton.propTypes = {
  count: PropTypes.node,
  className: PropTypes.string
};

export default ChatButton;
