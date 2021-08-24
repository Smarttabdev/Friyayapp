import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';

import { getCardUsersNew, toId } from 'Lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import UserAvatar from 'Src/components/shared/users/elements/UserAvatar.js';
import Tooltip from 'Components/shared/Tooltip';
import { useOutsideAlerter } from 'Src/lib/hooks';

import '../ChatPanel.module.scss';

const ChatUserNames = ({ query, presenceQuery, chat, wrap, currentUser }) => {
  const [showAllUsers, setShowAllUsers] = useState(false);
  const usersContainerRef = useRef(null);
  useOutsideAlerter(usersContainerRef, () => setShowAllUsers(false));

  useEffect(() => {
    if (!chat) return;
    const disposer = requestSubscription({
      subscription: graphql`
        subscription ChatUserNamesTipUpdatedSubscription($id: ID!) {
          tipUpdated(id: $id) {
            tip {
              ...ChatUserNames_chat
            }
          }
        }
      `,
      vars: { id: chat.id }
    });
    return () => disposer.dispose();
  }, [chat?.id]);

  useEffect(() => {
    const disposer = subscriptions.channelFlagUpdated({
      channel: 'domain',
      flag: 'presence'
    });
    return () => disposer.dispose();
  }, []);

  useEffect(() => {
    if (chat) {
      const disposer = subscriptions.channelFlagUpdated({
        channel: `Chat#${toId(chat.id)}`,
        flag: 'presence'
      });
      return () => disposer.dispose();
    }
  }, [chat?.id]);

  if (!chat?.id) return null;

  const chatUsers = getCardUsersNew(chat, query?.users, query?.groups);

  const users = chatUsers.users
    .map(user => ({
      id: user.id,
      name: user.name || user.username,
      online: query?.onlinePresences?.users.find(u => u.id == user.id),
      inRoom: presenceQuery?.channelPresences?.users.find(u => u.id == user.id)
    }))
    .sort((a, b) => (a.online ? 1 : 2) - (b.online ? 1 : 2));

  // // put current user last
  // const currentUserIndex = users.findIndex(
  //   user => toId(user.id) == currentUser.id
  // );
  // if (currentUserIndex >= 0) {
  //   const user = users.splice(currentUserIndex, 1)[0];
  //   users.push(user);
  // }

  const forId = Math.ceil(Math.random() * 100000, 6);
  const chatType = users.find(u => u.id == 'public' || u.id == 'private');
  const filteredList = users.filter(
    u => u.id != 'public' && u.id != 'private' && toId(u.id) != currentUser.id
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
    <div styleName={cn('chat-user-names', wrap && 'wrap')}>
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
              <UserAvatar userId={toId(user.id)} noTooltip noPointer />
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
                userId={toId(user.id)}
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
    </div>
  );
};

const mapState = state => {
  const sm = stateMappings(state);
  const { user: currentUser } = sm;
  return {
    currentUser
  };
};

const Container = createFragmentContainer(ChatUserNames, {
  query: graphql`
    fragment ChatUserNames_query on Query {
      users {
        id
        name
        username
      }
      groups {
        id
        title
        userFollowers {
          id
          name
          username
        }
      }
      onlinePresences: channelFlag(channel: "domain", flag: "presence") {
        id
        channel
        users {
          id
        }
      }
    }
  `,
  presenceQuery: graphql`
    fragment ChatUserNames_presenceQuery on Query
      @argumentDefinitions(channel: { type: "String!" }) {
      channelPresences: channelFlag(channel: $channel, flag: "presence") {
        id
        channel
        users {
          id
        }
      }
    }
  `,
  chat: graphql`
    fragment ChatUserNames_chat on Tip {
      id
      user {
        id
        name
        username
      }
      private
      sharePublic
      shareFollowing
      shareSettings {
        sharingObjectType
        sharingObjectId
      }
    }
  `
});

export default connect(mapState)(
  QueryRenderer(props => <Container {...props} presenceQuery={props} />, {
    query: graphql`
      query ChatUserNamesQuery($channel: String!) {
        ...ChatUserNames_presenceQuery @arguments(channel: $channel)
      }
    `,
    vars: ({ chat }) => ({
      channel: `Chat#${toId(chat.id)}`
    })
  })
);
