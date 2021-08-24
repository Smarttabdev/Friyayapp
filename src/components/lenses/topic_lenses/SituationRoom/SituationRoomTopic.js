import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import TopicTitleLink from 'Components/shared/topics/elements/TopicTitleLink';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { isOnline, inChannel, getTopicUsers } from 'Lib/utilities';
import { get } from 'lodash';
import SituationRoomTopicImage from './SituationRoomTopicImage';
import IconButton from 'Components/shared/buttons/IconButton';
import { setUpdateTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import LivePulse from 'Components/shared/LivePulse';
import AddViewBox from 'Src/components/shared/AddViewBox';

class SituationRoomTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeoutID: null
    };
  }

  static propTypes = {
    topic: PropTypes.object
  };

  handleToggleTopicNameEditMode = () => {
    this.setState(state => ({ topicNameEditMode: !state.topicNameEditMode }));
  };

  getClickHandler = () => {
    const { timeoutID } = this.state;
    const { viewTopic, topic } = this.props;
    const delay = 250;
    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          viewTopic({ topicSlug: topic.attributes.slug });
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
      this.handleToggleTopicNameEditMode();
    }
  };

  render() {
    const {
      topic,
      people,
      groups,
      presence,
      currentUser,
      setUpdateTopicModalOpen,
      backgroundColor,
      fontColor,
      active_design
    } = this.props;
    const { topicNameEditMode } = this.state;
    const isAddView = topic.id == 'for adding board' ? true : false;
    const topicUsers = getTopicUsers(topic, people, groups);

    if (
      !topicUsers.users.find(
        user => get(user, 'id') == get(topicUsers, 'creator.id')
      )
    ) {
      topicUsers.users.unshift(topicUsers.creator);
    }

    const channel = `topic_${topic.id}`;

    const users = topicUsers.users
      .map(user => ({
        user: user,
        id: get(user, 'id'),
        name: get(user, 'attributes.username'),
        online: isOnline(get(user, 'id'), presence),
        inRoom: inChannel(get(user, 'id'), channel, presence)
      }))
      .sort((a, b) => (a.online ? 1 : 2) - (b.online ? 1 : 2));

    // put current user last
    const currentUserIndex = users.findIndex(user => user.id == currentUser.id);
    if (currentUserIndex >= 0) {
      const user = users.splice(currentUserIndex, 1)[0];
      users.push(user);
    }

    let sharedWith = [];
    if (users.some(user => user.id == 'public')) {
      sharedWith = ['Everyone'];
    } else if (users.length > 2) {
      sharedWith = users
        .filter((user, i) => i < 2)
        .map(user => `${get(user, 'user.attributes.first_name')}, `);
      sharedWith.push(`+${users.length - 2}`);
    } else users.map(user => `${get(user, 'user.attributes.first_name')}, `);

    return (
      <div
        className={`situation_room-topicSegment ${isAddView && 'add_view'}`}
        style={{ backgroundColor, borderColor: fontColor }}
      >
        {!isAddView ? (
          <Fragment>
            <div className="topicSegment_header">
              {topicNameEditMode ? (
                <TopicTitleEditor
                  topic={topic}
                  onFinishEditing={this.handleToggleTopicNameEditMode}
                />
              ) : (
                <TopicTitleLink
                  additionalClasses="wiki-card_title"
                  topic={topic}
                  onClick={this.getClickHandler}
                  //color={fontColor || '#292B2D'}
                  color={fontColor || active_design.card_font_color}
                />
              )}
              {users.some(user => user.id != 'public' && user.inRoom) && (
                <LivePulse />
              )}
            </div>
            <div className="situation_room-users">
              {users
                .filter(user => user.id != 'public' && user.inRoom)
                .map((user, i) => (
                  <SituationRoomTopicImage
                    key={i}
                    user={user.user}
                    borderColor={fontColor}
                  />
                ))}
            </div>
            <div className="situation_room-shared_with">
              <IconButton
                outlined
                icon="person_add"
                color={fontColor || active_design.card_font_color}
                fontSize="17px"
                onClick={() => setUpdateTopicModalOpen(topic.id, true, 1)}
              />
              <div style={{ color: fontColor }}>
                {sharedWith.map(
                  user => user.charAt(0).toUpperCase() + user.slice(1)
                )}
              </div>
            </div>
          </Fragment>
        ) : (
          <div className="situation_room-add_view">
            <AddViewBox cardFontColor={fontColor} />
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state, { topic }) => {
  const {
    utilities: { active_design },
    user: currentUser,
    groups,
    people,
    presence
  } = stateMappings(state);

  const activeDesignId = get(
    topic,
    'attributes.topic_design_id_for_current_user'
  );
  let activeDesign;
  topic.attributes &&
    (activeDesign = get(topic, 'attributes.topic_designs').find(
      design => design.id == activeDesignId
    ));
  const backgroundColor = get(activeDesign, 'card_background_color');
  const fontColor = get(activeDesign, 'card_font_color');

  return {
    active_design,
    currentUser,
    groups,
    people,
    presence,
    backgroundColor,
    fontColor
  };
};

const mapDispatch = {
  viewTopic,
  setUpdateTopicModalOpen
};

export default connect(mapState, mapDispatch)(SituationRoomTopic);
