import React from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { setShowVideoRoomModal } from 'Src/newRedux/interface/modals/actions';
import LiveVideoRoomCard from './LiveVideoRoomCard';
import { usePresenceUpdated } from 'Src/graphql/hooks';
import './LiveVideoRoomsLens.module.scss';

const LiveVideoRoomsLens = ({
  relay,
  liveVideoChats,
  setShowVideoRoomModal
}) => {
  usePresenceUpdated({
    channel: 'VideoRoom#*',
    onNext: () => relay.refetch(vars => vars)
  });

  const handleChatClick = chatId => () => {
    setShowVideoRoomModal({ isOpen: true, videoRoomId: chatId });
  };

  const liveChats = getNodes(liveVideoChats?.tips);

  return (
    <div styleName="live-video-room-tool">
      {liveChats.map(chat => {
        return (
          <LiveVideoRoomCard
            key={chat.id}
            chatId={chat.id}
            title={chat.title}
            topicTitle={chat.topic.title}
            onClick={handleChatClick(toId(chat.id))}
          />
        );
      })}
      {!liveChats?.length && (
        <div styleName="empty-message">No live video chats at the moment!</div>
      )}
    </div>
  );
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  return {
    topicId
  };
};

const mapDispatch = {
  setShowVideoRoomModal
};

const Container = createRefetchContainer(
  LiveVideoRoomsLens,
  {
    liveVideoChats: graphql`
      fragment LiveVideoRoomsLens_liveVideoChats on Query
        @argumentDefinitions(topicId: { type: ID }) {
        tips(liveVideoChats: true, topicId: $topicId, subtopics: true) {
          edges {
            node {
              id
              title
              topic {
                id
                title
              }
            }
          }
        }
      }
    `
  },
  graphql`
    query LiveVideoRoomsLensLiveVideoChatsQuery($topicId: ID!) {
      ...LiveVideoRoomsLens_liveVideoChats @arguments(topicId: $topicId)
    }
  `
);

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <Container {...props} liveVideoChats={props} />, {
    query: graphql`
      query LiveVideoRoomsLensQuery($topicId: ID!) {
        ...LiveVideoRoomsLens_liveVideoChats @arguments(topicId: $topicId)
      }
    `,
    vars: ({ topicId }) => ({
      topicId: toGid('Topic', topicId)
    })
  })
);
