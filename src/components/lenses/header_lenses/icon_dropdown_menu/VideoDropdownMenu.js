import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

import { stateMappings } from 'Src/newRedux/stateMappings';
import withDataManager from 'Src/dataManager/components/withDataManager';
import IconDropdownMenu from 'Components/shared/IconDropdownMenu';
import {
  getVideoRoomsForTopic,
  getVideoRoomArray
} from 'Src/newRedux/database/cards/selectors';
import { setShowVideoRoomModal } from 'Src/newRedux/interface/modals/actions';
import ChatUserNames from 'Components/shared/video_rooms/components/VideoRoomUserName';

class VideoDropdownMenu extends Component {
  state = {
    animate: false
  };
  static propTypes = {
    cardFontColor: PropTypes.string
  };

  componentDidUpdate(prevProps) {
    if (this.props?.videoRooms?.length !== prevProps?.videoRooms?.length) {
      this.setState({ animate: true });

      setTimeout(() => {
        this.setState({ animate: false });
      }, 5000);
    }
  }

  toggleFirst = () => {};

  render() {
    const {
      cardFontColor,
      videoRooms,
      people,
      groups,
      setShowVideoRoomModal,
      videoTips,
      topicHeader
    } = this.props;

    const handleChatClick = videoRoomId => () =>
      setShowVideoRoomModal({ isOpen: true, videoRoomId });

    const itemList = videoRooms.map(videoRoom => {
      const title = get(videoRoom, 'attributes.title');
      return {
        id: videoRoom.id,
        title: (
          <Fragment>
            {title} -&nbsp;
            <ChatUserNames videoRoom={videoRoom} />
          </Fragment>
        ),
        clickHandler: handleChatClick(videoRoom.id)
      };
    });

    const toggleList = [
      {
        title: 'Keep open on Board',
        toggleState: false,
        toggleHandler: this.toggleFirst
      }
    ];
    return (
      <IconDropdownMenu
        dropdownStyle={{ left: 'unset', right: 0 }}
        title="Video Chat"
        icon="videocam"
        outlined
        color="#EB5757"
        cardFontColor={cardFontColor}
        itemList={itemList}
        toggleList={toggleList}
        count={videoTips?.totalCount}
        additionalClasses={'mt1 medium-icon-vid'}
        badgeTopMargin={'-9px'}
        animate={this.state.animate}
        topicHeader={topicHeader}
      />
    );
  }
}

const dataRequirements = ({ topicId }) => {
  return {
    cardsWithAttributes: {
      attributes: {
        topicId,
        isVideoRoom: true
      }
    }
  };
};

const mapState = state => {
  const {
    page: { topicId },
    utilities: { active_design },
    people,
    groups
  } = stateMappings(state);

  const videoRooms = topicId
    ? getVideoRoomsForTopic(state, topicId)
    : getVideoRoomArray(state);

  return {
    topicId,
    videoRooms,
    cardFontColor: active_design.card_font_color,
    people,
    groups
  };
};

const mapDispatch = {
  setShowVideoRoomModal
};

export default withDataManager(
  dataRequirements,
  mapState,
  mapDispatch
)(
  QueryRenderer(VideoDropdownMenu, {
    query: graphql`
      query VideoDropdownMenuQuery($topicId: ID) {
        videoTips: tips(isVideoChat: true, topicId: $topicId) {
          totalCount
        }
      }
    `,
    vars: props => ({
      topicId: toGid('Topic', props.topicId)
    })
  })
);
