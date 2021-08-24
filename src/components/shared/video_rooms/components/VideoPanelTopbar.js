import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Icon from 'Components/shared/Icon';
import Dropdown from 'Components/shared/Dropdown';
import CreateVideoRoomCard from '../CreateVideoRoomCard';
import ChatOptionsDropdown from 'Components/shared/chat/ChatPanel/ChatOptionsDropdown';
import RenameInput from 'Components/shared/RenameInput';
import cn from 'classnames';
import '../VideoPanel.module.scss';
// import { getMinimizedVideoRoomModal } from 'Src/newRedux/interface/modals/selectors';
// import {
//   setExpandVideoRoomModal
// } from 'Src/newRedux/interface/modals/actions';

const VideoPanelTopBar = ({
  showChatModal,
  createNewCard,
  title,
  subTitle,
  selectedVideoRoom,
  isExpanded,
  topics,
  topicId,
  onTitleClick,
  onBack,
  onExpand,
  onClose,
  hasExpand,
  hasClose,
  hasAdd,
  hasBack,
  canEditTitle,
  onSaveTitle,
  onDelete,
  updateCardProperties
}) => {
  const [addOpen, setAddOpen] = useState(false);
  const [videoOptionsOpen, setVideoOptionsOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);

  const handleRenameTitle = () => {
    setEditingTitle(true);
    setVideoOptionsOpen(false);
  };

  async function handleChatIcon() {
    const linkedChat = get(selectedVideoRoom, 'attributes.configs.linked_chat');
    if (linkedChat) {
      showChatModal({
        isOpen: true,
        chatId: toId(linkedChat)
      });
    } else {
      const attributes = {
        is_chat: true,
        title
      };
      const relationships = {
        share_settings: selectedVideoRoom.relationships.share_settings,
        topics: selectedVideoRoom.relationships.topics
      };
      let {
        data: { data: newCard, included }
      } = await createNewCard({ attributes, relationships });
      updateCardProperties({
        id: selectedVideoRoom.id,
        attributes: {
          configs: {
            linked_chat: newCard.id
          }
        }
      });
      updateCardProperties({
        id: newCard.id,
        attributes: {
          configs: {
            linked_video_chat: selectedVideoRoom.id
          }
        }
      });
      //mutations.setConfig({ owner: `Tip:${selectedVideoRoom.id}`, config: 'linked_chat', value: newCard.id });
      showChatModal({ isOpen: true, chatId: toId(newCard.id) });
    }
  }

  const handleDelete = () => {
    setVideoOptionsOpen(false);
    onDelete();
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
            ? () => setVideoOptionsOpen(!videoOptionsOpen)
            : undefined
          //onTitleClick
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
          videoOptions
          open={videoOptionsOpen}
          onClose={() => setVideoOptionsOpen(false)}
          onRename={handleRenameTitle}
          onDelete={onDelete && handleDelete}
        />
      </div>
      {subTitle && <div styleName="panel-subtitle">{subTitle}</div>}
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
          <div styleName="add-chat-title">Create Video Chat</div>
          <CreateVideoRoomCard
            topicId={topicId}
            topics={topics}
            onDismiss={() => setAddOpen(false)}
          />
        </Dropdown>
      )}

      <div styleName="toolbar-right">
        {canEditTitle && (
          <div styleName="chat-btn" onClick={handleChatIcon}>
            <Icon icon="forum" outlined fontSize={20} />
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

VideoPanelTopBar.propTypes = {
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
  selectedVideoRoom: PropTypes.object,
  showChatModal: PropTypes.func,
  createNewCard: PropTypes.func,
  updateCardProperties: PropTypes.func
};

// const mapState = state => {
//   const minimizeVideoRoomModal = getMinimizedVideoRoomModal(state);
//   return {
//     minimizeVideoRoomModal
//   };
// };

// const mapDispatch = {
//   setExpandVideoRoomModal,
// };

// export default connect(
//   mapState,
//   mapDispatch,
// )(VideoPanelTopBar);

export default VideoPanelTopBar;
