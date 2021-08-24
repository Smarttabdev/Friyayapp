/* eslint-disable no-console */
/* eslint-disable react/prop-types */
/* eslint-disable indent */

import React, { useState, useEffect } from 'react';
import AddCardCard from 'Components/shared/cards/AddCardCard';
// import LeftMenuNewTopicInput from 'Components/menus/left/elements/LeftMenuNewTopicInput';
import '../ChatPanel.module.scss';

const CreateChatCard = ({ onDismiss, afterCreated, query, topicHeader }) => {
  const [selectedTopic, setSelectedTopic] = useState();
  const [_addAllMembersToChat, _setAddAllMembersToChat] = useState(false);
  const [_chatShareSettings, _setChatShareSettings] = useState();

  useEffect(() => {
    setSelectedTopic(query?.currentTopic || query?.defaultTopic);
  }, [query?.currentTopic, query?.defaultTopic]);

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
          topicId={toId(selectedTopic?.id)}
          inInputMode={true}
          topMenu={true}
          placeholder="Chat title (optional)"
          newCardAttributes={{ is_chat: true, card_type: 'CHAT' }}
          newCardRelationships={_chatShareSettings}
          onDismiss={onDismiss}
          afterCardCreated={afterCreated}
          defaultCardTitle="#Chat"
          createChatOrVideoRoom
          getSelectedPeople={_handlePeopleSelection}
          makeChatPublic={_addAllMembersToChat}
          handleChecked={handleChatMembersAddOptionChange}
          topicHeader={topicHeader}
        />
      )}
    </div>
  );
};

const Container = createFragmentContainer(CreateChatCard, {
  query: graphql`
    fragment CreateChatCard_query on Query
      @argumentDefinitions(
        topicId: { type: ID }
        hasTopic: { type: "Boolean!" }
      ) {
      defaultTopic {
        id
        title
      }
      currentTopic: topic(id: $topicId) @include(if: $hasTopic) {
        id
        title
      }
    }
  `
});

export default QueryRenderer(props => <Container {...props} query={props} />, {
  query: graphql`
    query CreateChatCardQuery($topicId: ID, $hasTopic: Boolean!) {
      ...CreateChatCard_query @arguments(topicId: $topicId, hasTopic: $hasTopic)
    }
  `,
  vars: ({ topicId }) => ({
    topicId: toGid('Topic', topicId),
    hasTopic: !!topicId
  })
});
