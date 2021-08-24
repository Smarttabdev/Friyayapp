import React, { Component, Fragment } from 'react';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import Tooltip from 'Components/shared/Tooltip';
import { getTopicUsers } from 'Lib/utilities';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { get } from 'lodash';
import { usePresenceUpdated } from 'Src/graphql/hooks';

class HeaderLiveUsers extends Component {
  constructor(props) {
    super(props);
    this.allUsersDropdownRef = React.createRef();
    this.state = {
      showAllUsers: false
    };
  }

  handleShowAllUsers = () => {
    this.setState(prev => ({
      showAllUsers: !prev.showAllUsers
    }));
  };

  isVisible = elem => {
    !!elem &&
      !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  };

  hideDropdownOnClickOut = element => {
    const outsideClickListener = event => {
      if (!element.contains(event.target) || this.isVisible(element)) {
        this.setState({ showAllUsers: false });
        removeClickListener();
      }
    };
    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    };
    document.addEventListener('click', outsideClickListener);
  };

  componentDidUpdate() {
    if (this.state.showAllUsers === true) {
      const dropdown = this.allUsersDropdownRef.current;
      this.hideDropdownOnClickOut(dropdown);
    }
  }

  render() {
    const { currentUser, topic, groups, people, channelPresences } = this.props;
    const { showAllUsers } = this.state;
    const topicUsers = getTopicUsers(topic, people, groups);
    const users = topicUsers.users.map(user => ({
      user: user,
      id: get(user, 'id'),
      name: get(user, 'attributes.name'),
      inRoom: !!channelPresences?.users?.find?.(u => toId(u.id) == user.id)
    }));

    // put current user last
    const currentUserIndex = users.findIndex(user => user.id == currentUser.id);
    if (currentUserIndex >= 0) {
      const user = users.splice(currentUserIndex, 1)[0];
      users.push(user);
    }

    const allUsersInRoom = users.filter(
      user => user.id != 'public' && user.inRoom
    ).length;

    return (
      <div
        style={{ display: 'flex', marginRight: '13px', position: 'relative' }}
      >
        {users
          .filter(user => user.id != 'public' && user.inRoom)
          .map((user, i) => {
            if (i < 2) {
              return (
                <div key={i} data-tip={user.name} data-for={user.id}>
                  <UserAvatar
                    user={user.user}
                    margin={3}
                    size={24}
                    tooltipText={false}
                    color={'#F1F1F1'}
                    noPointer
                  />
                  <Tooltip {...{ place: 'bottom' }} id={user.id} />
                </div>
              );
            }
          })}
        {allUsersInRoom > 2 && (
          <div onClick={this.handleShowAllUsers}>
            <UserAvatar
              user={{ name: `+${allUsersInRoom - 2}` }}
              margin={3}
              size={24}
              tooltipText={false}
              color={'#F1F1F1'}
              isCounter
            />
          </div>
        )}
        {showAllUsers && (
          <div
            className="dropdown-menu"
            style={styles}
            ref={this.allUsersDropdownRef}
          >
            {users
              .filter(user => user.id != 'public' && user.inRoom)
              .map((user, i) => (
                <div key={i} data-tip={user.name} data-for={user.id}>
                  <UserAvatar
                    user={user.user}
                    margin={5}
                    marginTop={5}
                    size={24}
                    tooltipText={false}
                    color={'#F1F1F1'}
                    noPointer
                  />
                  <Tooltip {...{ place: 'bottom' }} id={user.id} />
                </div>
              ))}
          </div>
        )}
      </div>
    );
  }
}

const styles = {
  display: 'flex',
  maxHeight: '200px',
  overflowY: 'auto',
  flexWrap: 'wrap',
  left: '-100px',
  top: 'calc(100% + 3px)'
};

const hoc = Component => props => {
  usePresenceUpdated({
    channel: `Topic#${props.topic.id}`,
    deps: props.topic.id
  });
  return <Component {...props} />;
};

const mapState = state => {
  const {
    topics,
    page: { topicId },
    user: currentUser,
    groups,
    people
  } = stateMappings(state);

  return {
    topic: topics[topicId] || '0',
    currentUser,
    groups,
    people
  };
};

export default connect(mapState)(
  QueryRenderer(hoc(HeaderLiveUsers), {
    query: graphql`
      query HeaderLiveUsersQuery($channel: String!) {
        channelPresences: channelFlag(channel: $channel, flag: "presence") {
          id
          channel
          users {
            id
          }
        }
      }
    `,
    vars: ({ topic }) => ({
      channel: `Topic#${topic.id}`
    })
  })
);
