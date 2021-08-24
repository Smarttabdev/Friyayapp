/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect, useMemo } from 'react';
import { get } from 'lodash';
import cn from 'classnames';

import { stateMappings } from 'Src/newRedux/stateMappings';
import withDataManager from 'Src/dataManager/components/withDataManager';
import {
  getVideoRooms,
  getVideoRoomArray,
  getVideoRoomsByTopic,
  getAllVideoRoomsByTopic
} from 'Src/newRedux/database/cards/selectors';
import { getTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import {
  setShowVideoRoomModal,
  setExpandVideoRoomModal
} from 'Src/newRedux/interface/modals/actions';
import { joinChannel } from 'Src/newRedux/presence/thunks';
import {
  setEditCardModalOpen,
  setShowChatModal
} from 'Src/newRedux/interface/modals/actions';
import VideoPanelTopbar from './components/VideoPanelTopbar';
import VideosList from './components/VideosList';
import VideoRoomBox from './components/VideoRoomBox';
import { setCallStarted } from 'Src/newRedux/videoRoom/actions';
import { updateVideoChatLens } from 'Src/newRedux/interface/lenses/actions';
import JitsiContext from './JitsiContext';
import './VideoPanel.module.scss';
import { getExpandVideoRoomModal } from 'Src/newRedux/interface/modals/selectors';
import { videoModalStates } from 'Src/newRedux/interface/modals/constants';
import {
  updateCard,
  removeChat,
  createCard
} from 'Src/newRedux/database/cards/thunks';

const VideoPanel = ({
  createCard,
  videoChatId,
  asBlock,
  onSelectVideoChat,
  topicId,
  topics,
  topicsByParent,
  videoRooms,
  videoRoomsMap,
  videoRoomByTopic,
  videoRoomRedux,
  allVideoRoomsByTopic,
  setShowChatModal,
  displayVideoRoomModal,
  expandVideoRoomModal,
  setShowVideoRoomModal,
  setExpandVideoRoomModal,
  asDropdown,
  onClose,
  setEditCardModalOpen,
  setCallStarted,
  asLens,
  videoChatLens,
  updateVideoChatLens,
  active_design,
  updateCard,
  removeChat,
  isHome
}) => {
  const [jitsiApi, setJitsiApi] = useState(null);

  const containerKey = asLens ? 'tool' : 'panel';

  expandVideoRoomModal = !asDropdown && (expandVideoRoomModal || asLens);

  const videoId = asBlock
    ? videoChatId
    : !asDropdown &&
      (asLens ? videoChatLens.videoRoomId : displayVideoRoomModal.videoRoomId);
  const videoRoom = videoRoomsMap[videoId];
  const videoTitle = get(videoRoom, 'attributes.title');

  const videoTopicId = get(videoRoom, 'relationships.topics.data.0');
  const topic = get(topics, videoTopicId);
  const topicTitle = get(topic, 'attributes.title');

  const title = videoId && !expandVideoRoomModal ? videoTitle : 'Videos';

  const childVideoRooms = useMemo(() => {
    if (!asLens || !topicId) {
      return videoRooms;
    }
    return get(allVideoRoomsByTopic, topicId, []);
  }, [asLens, topicId, videoRooms, allVideoRoomsByTopic]);

  const subTopics = useMemo(() => {
    if (!asLens || !topicId) {
      return Object.values(topics || {});
    }
    return get(topicsByParent, topicId, []);
  }, [asLens, topicId, topics, topicsByParent]);

  const inputStyle = {
    borderColor: asLens ? active_design.card_font_color : undefined
  };

  useEffect(() => {
    const started = videoRoomRedux.callStartedMap[containerKey];
    if (videoRoom && started) {
      return joinChannel(`VideoRoom#${videoRoom.id}`);
    }
  }, [videoRoom, videoRoomRedux.callStartedMap]);

  const handleBack = () =>
    setShowVideoRoomModal({ isOpen: true, videoRoomId: null });

  const handleTitleClick = () => {
    const modalOptions = { cardId: videoRoom.id, tab: 'Organize' };
    setEditCardModalOpen(modalOptions);
  };

  const handleShare = () => {
    const modalOptions = { cardId: videoRoom.id, tab: 'Share' };
    setEditCardModalOpen(modalOptions);
  };

  const handleExpand = () => {
    if (asDropdown) {
      setShowVideoRoomModal({
        isOpen: true,
        videoRoomId: displayVideoRoomModal.videoRoomId
      });
      onClose();
    }
    let setModalState;
    if (expandVideoRoomModal) {
      setModalState = videoModalStates.NORMAL;
    } else {
      setModalState = videoModalStates.EXPANDED;
    }
    setExpandVideoRoomModal(setModalState);
  };

  const handleClose = () => {
    setShowVideoRoomModal({ isOpen: false });
    // dispatch(setJitsiApi(null));
    setCallStarted(containerKey, false);
  };

  const handleChatClick = videoRoom => {
    if (asBlock) {
      onSelectVideoChat(videoRoom);
    } else if (asLens) {
      updateVideoChatLens({ videoRoomId: videoRoom.id });
    } else {
      setShowVideoRoomModal({ isOpen: true, videoRoomId: videoRoom.id });
      onClose();
    }
  };

  const handleSaveTitle = title => {
    if (title === videoTitle) {
      return;
    }
    updateCard({
      id: videoRoom.id,
      attributes: { title }
    });
  };

  const updateLinkedCard = () => {
    const linkedChatId = get(videoRoom, 'attributes.configs.linked_chat');
    linkedChatId &&
      updateCard({
        id: linkedChatId,
        attributes: {
          configs: {
            linked_video_chat: null
          }
        }
      });
  };

  const handleDelete = () => {
    removeChat(videoRoom.id, {
      beforeDelete: () => {
        updateLinkedCard();
        updateVideoChatLens({ videoRoomId: null });
        setShowVideoRoomModal({
          isOpen: displayVideoRoomModal.isOpen,
          videoRoomId: null
        });
      }
    });
  };

  // const handleSendMessage = message => {
  //   videoRoom && message && sendMessage(videoRoom.id, message);
  // };

  const renderExpandedLayout = () => (
    <div styleName="two-columns">
      <div styleName="left">
        <input
          styleName="input"
          placeholder="Search video chats"
          style={inputStyle}
        />
        <VideosList
          videoRooms={childVideoRooms}
          videoRoomsByTopic={videoRoomByTopic}
          topics={subTopics}
          onClick={handleChatClick}
        />
      </div>
      {videoRoom && (
        <VideoRoomBox
          videoRoom={videoRoom}
          topicTitle={topicTitle}
          hasTitle
          onTitleClick={handleTitleClick}
          // onSendMessage={handleSendMessage}
          onShare={handleShare}
          borderColor={asLens ? active_design.card_font_color : undefined}
          onSaveTitle={handleSaveTitle}
          onDelete={handleDelete}
          additionalStyle={
            asLens && {
              position: 'absolute',
              right: 15,
              top: 20,
              width: '65.5%',
              height: '92%'
            }
          }
        />
      )}
    </div>
  );

  const renderCompactLayout = () =>
    videoId ? (
      <VideoRoomBox
        topicTitle={topicTitle}
        videoRoom={videoRoom}
        // onSendMessage={handleSendMessage}
        onShare={handleShare}
        borderColor={asLens ? active_design.card_font_color : undefined}
        onSaveTitle={handleSaveTitle}
        onDelete={handleDelete}
      />
    ) : (
      <Fragment>
        <input
          styleName="input"
          placeholder="Search video chats"
          style={inputStyle}
        />
        <VideosList
          videoRooms={childVideoRooms}
          videoRoomsByTopic={videoRoomByTopic}
          topics={subTopics}
          onClick={handleChatClick}
        />
      </Fragment>
    );

  return (
    <div
      styleName={cn('video-panel', expandVideoRoomModal && 'expanded')}
      style={{
        color: asLens ? active_design.card_font_color : undefined,
        paddingLeft: asLens && (isHome ? '15px' : '20px')
      }}
    >
      <VideoPanelTopbar
        updateCardProperties={updateCard}
        createNewCard={createCard}
        selectedVideoRoom={videoRoom}
        showChatModal={setShowChatModal}
        title={title}
        subTitle={!expandVideoRoomModal && videoId ? `in ${topicTitle}` : null}
        isExpanded={expandVideoRoomModal}
        topics={topics}
        topicId={topicId}
        onTitleClick={!expandVideoRoomModal ? handleTitleClick : undefined}
        onBack={handleBack}
        onExpand={handleExpand}
        onClose={handleClose}
        hasExpand={!asLens && !asBlock}
        hasClose={!asDropdown && !asLens && !asBlock}
        hasAdd={expandVideoRoomModal || !videoId}
        hasBack={!expandVideoRoomModal && !!videoId && !asBlock}
        hasShare={!!videoId}
        canEditTitle={!expandVideoRoomModal && !!videoId}
        onSaveTitle={handleSaveTitle}
        onDelete={!asBlock && handleDelete}
      />
      <JitsiContext.Provider
        value={{
          jitsiApi,
          setJitsiApi,
          containerKey
        }}
      >
        {expandVideoRoomModal ? renderExpandedLayout() : renderCompactLayout()}
      </JitsiContext.Provider>
    </div>
  );
};

VideoPanel.defaultProps = {
  onClose: () => {}
};

const dataRequirements = () => {
  return {
    cardsWithAttributes: {
      attributes: {
        isVideoRoom: true
      }
    },
    topics: {}
  };
};

const mapState = state => {
  const {
    tools: { videoChatLens },
    // modals: { displayVideoRoomModal, expandVideoRoomModal },
    modals: { displayVideoRoomModal },
    topics,
    page: { topicId, isHome },
    utilities: { active_design },
    videoRoom: videoRoomRedux
  } = stateMappings(state);
  const videoRooms = getVideoRoomArray(state);
  const videoRoomsMap = getVideoRooms(state);
  const videoRoomByTopic = getVideoRoomsByTopic(state);
  const allVideoRoomsByTopic = getAllVideoRoomsByTopic(state);
  const topicsByParent = getTopicsByParentTopic(state);
  const expandVideoRoomModal = getExpandVideoRoomModal(state);

  return {
    topicId,
    topics,
    topicsByParent,
    videoRooms,
    videoRoomsMap,
    videoRoomByTopic,
    videoRoomRedux,
    allVideoRoomsByTopic,
    displayVideoRoomModal,
    videoChatLens,
    expandVideoRoomModal,
    active_design,
    isHome
  };
};

const mapDispatch = {
  setShowChatModal,
  setShowVideoRoomModal,
  setExpandVideoRoomModal,
  updateVideoChatLens,
  setEditCardModalOpen,
  setCallStarted,
  updateCard,
  removeChat,
  createCard
};

export default withDataManager(
  dataRequirements,
  mapState,
  mapDispatch
)(VideoPanel);
