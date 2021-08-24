import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import cn from 'classnames';

import VideoRoomListItem from './VideoRoomListItem';

import '../VideoPanel.module.scss';

const ViewListItem = ({ topic, videoRoomsByTopic, onVideoRoomClick }) => {
  const [open, setOpen] = useState();

  const videoRooms = get(videoRoomsByTopic, get(topic, 'id'), []);

  return (
    <div>
      <div styleName="board-list-item">
        <i
          className={cn('fa', open ? 'fa-caret-down' : 'fa-caret-right')}
          styleName="board-expand-icon"
          onClick={() => setOpen(!open)}
        />
        {/* <i className="material-icons-outlined" styleName="board-icon">
          bubble_chart
        </i> */}
        <i className="material-icons icon-fa" styleName="board-icon">
          <span className="fa fa-hashtag" />
        </i>
        <div styleName="board-title">{get(topic, 'attributes.title')}</div>
      </div>
      {open && (
        <div styleName="board-list">
          {videoRooms.map(videoRoom => (
            <VideoRoomListItem
              key={videoRoom.id}
              videoRoom={videoRoom}
              onClick={() => onVideoRoomClick(videoRoom)}
            />
          ))}
          {videoRooms.length <= 0 && (
            <div styleName="no-videos-text">&#x2012; No Videos &#x2012;</div>
          )}
        </div>
      )}
    </div>
  );
};

ViewListItem.propTypes = {
  topic: PropTypes.object,
  videoRoomsByTopic: PropTypes.object,
  onVideoRoomClick: PropTypes.func
};

export default ViewListItem;
