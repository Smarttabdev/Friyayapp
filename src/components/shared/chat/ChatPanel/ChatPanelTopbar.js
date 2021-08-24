import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import Icon from 'Components/shared/Icon';
import Dropdown from 'Components/shared/Dropdown';
import CreateChatCard from './CreateChatCard';
import ChatOptionsDropdown from 'Components/shared/chat/ChatPanel/ChatOptionsDropdown';
import RenameInput from 'Components/shared/RenameInput';
// import { updateCardConfig } from 'Lib/utilities';

import '../ChatPanel.module.scss';

const ChatPanelTopbar = ({
  updateCardProperties,
  showVideoRoomModal,
  title,
  selectedChat,
  subTitle,
  isExpanded,
  query,
  topicId,
  onTitleClick,
  onBack,
  onExpand,
  onClose,
  hasMinimize,
  hasExpand,
  hasClose,
  hasAdd,
  hasBack,
  onMarkAsRead,
  onSaveTitle,
  onDelete,
  canEditTitle,
  handleMinimize,
  minimizeChatModal,
  afterCreated,
  getCard,
  createNewCard,
  cardsRef
}) => {
  const [addOpen, setAddOpen] = useState(false);
  const [chatOptionsOpen, setChatOptionsOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);

  const handleMarkAsRead = () => {
    setChatOptionsOpen(false);
    onMarkAsRead();
  };

  const handleRenameTitle = () => {
    setEditingTitle(true);
    setChatOptionsOpen(false);
  };

  const handleDelete = () => {
    setChatOptionsOpen(false);
    onDelete();
  };

  const handleVideoIcon = async () => {
    if (!cardsRef.current.hasOwnProperty(toId(selectedChat.id))) {
      await getCard(toId(selectedChat.id));
    }
    const selectedCardData = cardsRef.current[toId(selectedChat.id)];
    if (selectedCardData.attributes.configs.linked_video_chat) {
      showVideoRoomModal({
        isOpen: true,
        videoRoomId: selectedCardData.attributes.configs.linked_video_chat
      });
    } else {
      const attributes = {
        is_video_chat: true,
        title
      };
      const relationships = {
        share_settings: selectedCardData.relationships.share_settings,
        topics: selectedCardData.relationships.topics
      };
      let {
        data: { data: newCard, included }
      } = await createNewCard({ attributes, relationships });
      updateCardProperties({
        id: selectedCardData.id,
        attributes: {
          configs: {
            linked_video_chat: newCard.id
          }
        }
      });
      updateCardProperties({
        id: newCard.id,
        attributes: {
          configs: {
            linked_chat: selectedCardData.id
          }
        }
      });
      showVideoRoomModal({ isOpen: true, videoRoomId: newCard.id });
    }
  };

  return (
    <div styleName="toolbar">
      {hasBack && (
        <div styleName="back-btn" onClick={onBack}>
          <i className="material-icons">menu</i>
        </div>
      )}
      <div
        styleName={cn('panel-title', canEditTitle && 'panel-title--btn')}
        onClick={
          canEditTitle && !editingTitle
            ? () => setChatOptionsOpen(!chatOptionsOpen)
            : undefined
        }
      >
        {editingTitle ? (
          <RenameInput
            className="form-control form-control-minimal"
            styleName="panel-title-input"
            initialValue={title}
            onSave={onSaveTitle}
            onClose={() => setEditingTitle(false)}
          />
        ) : (
          title
        )}
        <ChatOptionsDropdown
          open={chatOptionsOpen}
          onClose={() => setChatOptionsOpen(false)}
          onMarkAsRead={handleMarkAsRead}
          onRename={handleRenameTitle}
          onDelete={onDelete && handleDelete}
        />
      </div>
      {subTitle && (
        <div
          styleName="panel-subtitle"
          onClick={isExpanded ? undefined : onTitleClick}
        >
          {subTitle}
        </div>
      )}
      {hasAdd && (
        <Dropdown
          trigger={
            <div styleName="add-btn" onClick={() => setAddOpen(!addOpen)}>
              <i
                style={{
                  color: 'rgb(111, 207, 151)',
                  lineHeight: 'initial',
                  fontSize: '18px'
                }}
                className="plus-icon tiphive-icon material-icons"
              >
                add_circle
              </i>
            </div>
          }
          closeOnClick={false}
          open={addOpen}
          onOpen={() => setAddOpen(true)}
          onClose={() => setAddOpen(false)}
          className="add-chat-dropdown"
          MenuComponent="div"
          menuStyle={{ overflow: 'visible', width: 320, left: '-50px' }}
        >
          <div styleName="add-chat-title">Create Chat</div>
          <CreateChatCard
            topicId={topicId}
            onDismiss={() => setAddOpen(false)}
            afterCreated={afterCreated}
          />
        </Dropdown>
      )}

      <div styleName="toolbar-right">
        {hasMinimize && (
          <div styleName="expand-btn" onClick={handleMinimize}>
            <Icon
              icon={
                minimizeChatModal ? 'keyboard_arrow_up' : 'keyboard_arrow_down'
              }
              // fontAwesome
            />
          </div>
        )}
        {canEditTitle && (
          <div styleName="video-btn" onClick={handleVideoIcon}>
            <Icon icon="videocam" outlined fontSize={20} />
          </div>
        )}

        {hasExpand && (
          <div styleName="expand-btn" onClick={onExpand}>
            <Icon
              icon={isExpanded ? 'external-link-square' : 'external-link'}
              fontAwesome
            />
          </div>
        )}
        {hasClose && (
          <div styleName="close-btn" onClick={onClose}>
            <Icon icon="close" />
          </div>
        )}
      </div>
    </div>
  );
};

ChatPanelTopbar.propTypes = {
  allVideoRooms: PropTypes.object,
  showVideoRoomModal: PropTypes.func,
  title: PropTypes.node,
  subTitle: PropTypes.node,
  isExpanded: PropTypes.bool,
  topics: PropTypes.object,
  topicId: PropTypes.any,
  onTitleClick: PropTypes.func,
  onBack: PropTypes.func,
  onExpand: PropTypes.func,
  onClose: PropTypes.func,
  hasExpand: PropTypes.bool,
  hasClose: PropTypes.bool,
  hasAdd: PropTypes.bool,
  hasBack: PropTypes.bool,
  updateCardProperties: PropTypes.func,
  availableCards: PropTypes.object,
  getCard: PropTypes.func,
  createNewCard: PropTypes.func
};

export default ChatPanelTopbar;
