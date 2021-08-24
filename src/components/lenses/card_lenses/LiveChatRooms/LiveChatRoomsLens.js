import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { setShowChatModal } from 'Src/newRedux/interface/modals/actions';
import { ensureCard } from 'Src/newRedux/database/cards/thunks';
import ChatRoomCard from './ChatRoomCard';
import './LiveChatRooms.module.scss';

const CLEAR_MS = 1000 * 60 * 10;

const LiveChatRoomsLens = ({
  user,
  topicId,
  recentChats,
  setShowChatModal,
  ensureCard
}) => {
  const [liveChats, setLiveChats] = useState({});
  const currentRef = useRef({});

  currentRef.current = {
    liveChats,
    setLiveChats
  };

  useEffect(() => {
    if (!recentChats) return;
    recentChats.edges.forEach(edge => {
      const timerId = setTimeout(() => {
        delete liveChats[edge.node.id];
        setLiveChats({ ...liveChats });
      }, CLEAR_MS);

      liveChats[edge.node.id] = {
        ...edge.node,
        lastMessage: edge.node.chatMessages.edges[0].node,
        timerId
      };

      setLiveChats({ ...liveChats });
    });
  }, [recentChats]);

  useEffect(() => {
    const disposer = requestSubscription({
      subscription: graphql`
        subscription LiveChatRoomsLensChatMessageCreatedSubscription(
          $topicId: ID
        ) {
          chatMessageCreated(topicId: $topicId) {
            chatMessage {
              id
              body
              user {
                id
                name
              }
              tip {
                id
                title
              }
            }
          }
        }
      `,
      vars: {
        topicId: toGid('Topic', topicId)
      },
      onNext: data => {
        const chatMessage = data?.chatMessageCreated?.chatMessage;
        if (!chatMessage) return;

        const { liveChats, setLiveChats } = currentRef.current;

        clearTimeout(liveChats[chatMessage.tip.id]?.timerId);

        const timerId = setTimeout(() => {
          delete liveChats[chatMessage.tip.id];
          setLiveChats({ ...liveChats });
        }, CLEAR_MS);

        setLiveChats({
          ...liveChats,
          [chatMessage.tip.id]: {
            ...chatMessage.tip,
            lastMessage: chatMessage,
            timerId
          }
        });
      }
    });
    return () => disposer.dispose();
  }, [topicId]);

  const handleChatClick = chatId => async () => {
    await ensureCard(chatId);
    setShowChatModal({ isOpen: true, chatId });
  };

  const liveChatsArray = Object.values(liveChats);

  return (
    <div styleName="live-chat-room-tool">
      {liveChatsArray.map(chat => {
        const chatMessage = chat.lastMessage;
        const author = chatMessage.user;
        return (
          <ChatRoomCard
            key={chat.id}
            chatId={chat.id}
            title={chat.title}
            msgAuthor={author.name}
            msgBody={chatMessage.body}
            isSelf={user.id == toId(author.id)}
            onClick={handleChatClick(toId(chat.id))}
          />
        );
      })}
      {!liveChatsArray.length && (
        <div styleName="empty-message">No live chats at the moment!</div>
      )}
    </div>
  );
};

const mapState = state => {
  const {
    user,
    page: { topicId }
  } = stateMappings(state);
  return {
    user,
    topicId
  };
};

const mapDispatch = {
  setShowChatModal,
  ensureCard
};

export default connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(LiveChatRoomsLens, {
    query: graphql`
      query LiveChatRoomsLensQuery($chatMessageSince: String!, $topicId: ID!) {
        recentChats: tips(
          chatMessageSince: $chatMessageSince
          topicId: $topicId
          subtopics: true
        ) {
          edges {
            node {
              id
              title
              chatMessages(first: 1) {
                edges {
                  node {
                    id
                    body
                    user {
                      id
                      name
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    vars: ({ topicId }) => ({
      topicId: toGid('Topic', topicId),
      chatMessageSince: moment()
        .subtract(10, 'minutes')
        .format()
    })
  })
);
