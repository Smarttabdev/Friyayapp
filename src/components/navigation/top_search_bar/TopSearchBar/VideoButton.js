import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Popup from 'Components/shared/Popup';
import VideoPanel from 'Components/shared/video_rooms/VideoPanel';
import Tooltip from 'Components/shared/Tooltip';

import './Button.module.scss';

const VideoButton = ({ text, className, color }) => {
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
          styleName={cn('chat-button', 'video-button')}
          data-tip={'Video Chat'}
          data-for={forId}
        >
          <span styleName="text">{text}</span>
          {/* <span styleName="count">{count}</span> */}
          <div styleName={cn('icon', 'video-button-color')}>
            <i
              style={{ color }}
              styleName={cn('icon-size')}
              className="material-icons-outlined"
            >
              videocam
            </i>
          </div>
          <Tooltip {...{ place: 'bottom' }} id={forId} />
        </div>
      }
      arrow={false}
      // position="bottom center"
      position="bottom right"
      contentStyle={{ marginTop: -4 }}
    >
      <div styleName="chat-panel-container">
        <VideoPanel asDropdown onClose={handleClose} />
      </div>
    </Popup>
  );
};

VideoButton.propTypes = {
  text: PropTypes.node,
  //   count: PropTypes.node,
  className: PropTypes.string
};

export default VideoButton;
