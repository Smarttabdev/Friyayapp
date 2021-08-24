/* eslint-disable react/prop-types */
import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import Dropdown from 'Components/shared/Dropdown';
import AddCardCard from 'Components/shared/cards/AddCardCard';
// import LeftMenuNewTopicInput from 'Components/menus/left/elements/LeftMenuNewTopicInput';

import './VideoPanel.module.scss';
import { getDefaultVideoRoom } from 'Src/newRedux/database/topics/selectors';

const CreateVideoRoomCard = ({
  topicId,
  topics,
  onDismiss,
  afterCreated,
  defaultVideoRoom,
  topicHeader
}) => {
  const [selectedTopic] = useState(
    topics[topicId] ? topics[topicId] : defaultVideoRoom
  );
  const [_addAllMembersToChat, _setAddAllMembersToChat] = useState(false);
  const [_chatShareSettings, _setChatShareSettings] = useState();

  const _handlePeopleSelection = value => {
    _setChatShareSettings(_getChatShareSettings(value));
  };

  const handleChatMembersAddOptionChange = e => {
    const addAllMembers = e.target.checked;
    _setAddAllMembersToChat(addAllMembers);
    _setChatShareSettings(_getChatShareSettings([], addAllMembers));
  };

  const _getChatShareSettings = (members, makePublic) => {
    if (!members.length && !makePublic) return {};

    if (makePublic && !members.length) {
      return {
        share_public: true
      };
    }

    return {
      share_settings: {
        data: members.map(user => ({
          sharing_object_id: user.id,
          sharing_object_type: 'users'
        }))
      }
    };
  };
  return (
    <div className="create-chat-card">
      {selectedTopic && (
        <AddCardCard
          topic={selectedTopic}
          inInputMode={true}
          topMenu={true}
          placeholder="Video Chat title (optional)"
          newCardAttributes={{ is_video_chat: true }}
          newCardRelationships={_chatShareSettings}
          onDismiss={onDismiss}
          afterCardCreated={afterCreated}
          defaultCardTitle="#VideoChat"
          createChatOrVideoRoom
          makeChatPublic={_addAllMembersToChat}
          handleChecked={handleChatMembersAddOptionChange}
          getSelectedPeople={_handlePeopleSelection}
          topicHeader={topicHeader}
        />
      )}
    </div>
  );
};

const mapState = state => {
  const defaultVideoRoom = getDefaultVideoRoom(state);

  return {
    defaultVideoRoom
  };
};

export default connect(mapState)(CreateVideoRoomCard);
