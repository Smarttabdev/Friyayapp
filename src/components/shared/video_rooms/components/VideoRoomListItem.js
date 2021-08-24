import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import VideoRoomUserName from './VideoRoomUserName';

import '../VideoPanel.module.scss';

const VideoRoomListItem = ({ videoRoom, onClick }) => {
  const videoTitle = get(videoRoom, 'attributes.title');
  // const unreadMessages = get(videoRoom, 'attributes.unread_messages', 0);
  return (
    <div styleName="list-item">
      <div styleName="icon orange">
        <i className="material-icons-outlined">videocam</i>
      </div>

      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'hidden',
          marginRight: '10px'
        }}
      >
        <a
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
          onClick={onClick}
        >
          {videoTitle}
        </a>
        {/* {chat.chatUnreads > 0 && (
          <div styleName="unreads-badge" onClick={onClick}>
            {chat.chatUnreads}
          </div>
        )} */}
      </div>
      <VideoRoomUserName videoRoom={videoRoom} />

      {/* <div styleName="title">
        {videoTitle} -&nbsp;
        <VideoRoomUserName videoRoom={videoRoom} />
      </div> */}
      {/* {unreadMessages > 0 && (
        <div styleName="unreads-badge">{unreadMessages}</div>
      )} */}
    </div>
  );
};

VideoRoomListItem.propTypes = {
  videoRoom: PropTypes.object,
  onClick: PropTypes.func
};

export default VideoRoomListItem;
