/* eslint-disable react/prop-types */
import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { get } from 'lodash';

import { isOnline, inChannel, getCardUsers } from 'Lib/utilities';
import withDataManager from 'Src/dataManager/components/withDataManager';
import { stateMappings } from 'Src/newRedux/stateMappings';
import UserAvatar from 'Src/components/shared/users/elements/UserAvatar.js';
import Tooltip from 'Components/shared/Tooltip';
import { useOutsideAlerter } from 'Src/lib/hooks';

import '../VideoPanel.module.scss';

const VideoRoomUserName = ({
  videoRoom,
  people,
  groups,
  presence,
  wrap,
  currentUser
}) => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const usersContainerRef = useRef(null);
  useOutsideAlerter(usersContainerRef, () => setShowAllUsers(false));

  const videoRoomUsers = getCardUsers(videoRoom, people, groups);

  if (
    !videoRoomUsers.users.find(user => user.id == videoRoomUsers.creator.id)
  ) {
    videoRoomUsers.users.unshift(videoRoomUsers.creator);
  }

  const channel = `tip_${videoRoom.id}`;
  const users = videoRoomUsers.users
    .map(user => ({
      id: user.id,
      name: get(user, 'attributes.name'),
      online: isOnline(user.id, presence),
      inRoom: inChannel(user.id, channel, presence)
    }))
    .sort((a, b) => (a.online ? 1 : 2) - (b.online ? 1 : 2));

  const forId = Math.ceil(Math.random() * 100000, 6);
  const chatType = users.find(u => u.id == 'public' || u.id == 'private');
  const filteredList = users.filter(
    u => u.id != 'public' && u.id != 'private' && u.id != currentUser.id
  );
  const styles = {
    display: 'flex',
    maxHeight: '100px',
    overflowY: 'auto',
    flexWrap: 'wrap',
    top: '25px',
    minWidth: '0px',
    width: '175px'
  };

  return (
    <div styleName={cn('videos-user-names', wrap && 'wrap')}>
      {chatType && (
        <div styleName="user-name-item">
          <div className="mr5" style={{ color: '#e5e5e5' }}>
            {chatType.id == 'public' ? 'everyone' : 'private'}
          </div>
        </div>
      )}

      {filteredList.slice(0, 3).map(user => (
        <div key={user.id} styleName="user-name-item">
          <>
            <div data-tip={user.name} data-for={forId}>
              <UserAvatar userId={user.id} noTooltip noPointer />
              {user.online && (
                <span
                  styleName={cn('online-badge', user.inRoom && 'in-room')}
                />
              )}
              <Tooltip {...{ place: 'bottom' }} id={forId} />
            </div>
          </>
        </div>
      ))}
      {filteredList.length > 3 && (
        <div styleName="user-name-item" onClick={() => setShowAllUsers(true)}>
          <UserAvatar
            user={{ name: `+${filteredList.length - 3}` }}
            margin={3}
            size={24}
            tooltipText={false}
            color={'#F1F1F1'}
            isCounter
          />
        </div>
      )}
      {showAllUsers && (
        <div className="dropdown-menu" style={styles} ref={usersContainerRef}>
          {filteredList.slice(3).map((user, i) => (
            <div
              styleName="user-name-item"
              key={i}
              data-tip={user.name}
              data-for={user.id}
            >
              <UserAvatar
                userId={user.id}
                margin={5}
                marginTop={5}
                size={24}
                tooltipText={false}
                color={'#F1F1F1'}
                noPointer
              />
              {user.online && (
                <span
                  styleName={cn('online-badge', user.inRoom && 'in-room')}
                  style={{ top: '5px' }}
                />
              )}
              <Tooltip {...{ place: 'bottom' }} id={user.id} />
            </div>
          ))}
        </div>
      )}

      {/* {users.map(user => (
        <div key={user.id} styleName="user-name-item">
          <span styleName="user-name">{user.name}</span>
          {user.online && (
            <span styleName={cn('online-badge', user.inRoom && 'in-room')} />
          )}
        </div>
      ))} */}
    </div>
  );
};

const dataRequirements = () => {
  return {
    people: {}
  };
};

const mapState = state => {
  const sm = stateMappings(state);
  const { groups, people, presence, user: currentUser } = sm;
  return {
    groups,
    people,
    presence,
    currentUser
  };
};

export default withDataManager(dataRequirements, mapState)(VideoRoomUserName);
