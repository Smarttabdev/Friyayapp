import React from 'react';
import PropTypes from 'prop-types';

import VideoRoomListItem from './VideoRoomListItem';
import ViewListItem from './ViewListItem';

import '../VideoPanel.module.scss';

const VideosList = ({ videoRooms, videoRoomsByTopic, topics, onClick }) => {
  return (
    <div styleName="list-container">
      <div styleName="videos-list">
        {videoRooms.map(videoRoom => (
          <VideoRoomListItem
            key={videoRoom.id}
            videoRoom={videoRoom}
            onClick={() => onClick(videoRoom)}
          />
        ))}
      </div>
      <div styleName="boards-list-title">Chats in Boards</div>
      <div styleName="boards-list">
        {topics.map(topic => (
          <ViewListItem
            key={topic.id}
            topic={topic}
            videoRoomsByTopic={videoRoomsByTopic}
            onVideoRoomClick={onClick}
          />
        ))}
      </div>
    </div>
  );
};

VideosList.propTypes = {
  videoRooms: PropTypes.array,
  videoRoomsByTopic: PropTypes.object,
  topics: PropTypes.array,
  onClick: PropTypes.func
};

export default VideosList;
