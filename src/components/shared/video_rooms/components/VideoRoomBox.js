/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
// import cn from 'classnames';

import { stateMappings } from 'Src/newRedux/stateMappings';
import withDataManager from 'Src/dataManager/components/withDataManager';
// import TextEditor from 'Components/shared/text_editor';
import ChatUserNames from './VideoRoomUserName';
import useJitsi from '../hooks/useJitsi';
import { setCallStarted as setCallStartedRedux } from 'Src/newRedux/videoRoom/actions';
import JitsiContext from '../JitsiContext';
import ChatOptionsDropdown from 'Components/shared/chat/ChatPanel/ChatOptionsDropdown';
import RenameInput from 'Components/shared/RenameInput';

import '../VideoPanel.module.scss';
// import { getJitsiAPI } from 'Src/newRedux/videoRoom/selectors';

// const ChatMessage = ({ name, body, isSelf }) => (
//   <div
//     className="fr-view"
//     styleName={cn('chat-message', isSelf && 'chat-message-self')}
//   >
//     <div styleName="chat-message-user">{name}</div>
//     <div
//       styleName="chat-message-body"
//       dangerouslySetInnerHTML={{ __html: body }}
//     />
//   </div>
// );

const JitsiVideoRoomContainer = ({
  displayName,
  jitsiApi,
  setJitsiApi,
  // handleCallEnd,
  videoRoomId,
  setCallStarted,
  domainName,
  containerKey,
  topicTitle,
  videoRoomName
}) => {
  // const jitsiApi = useSelector(getJitsiAPI);

  // const dispatch = useDispatch();

  // const setJitsiApi = (jitsiApiLocal) => {
  //   dispatch(setJitsiApiStore(jitsiApiLocal));
  // };

  const handleCallEnded = () => {
    setJitsiApi(null);
    setCallStarted(containerKey, false);
  };

  const containerId = `${containerKey}-jitsiVideoRoomContainer`;

  useJitsi({
    displayName,
    videoRoomId: `${domainName}${videoRoomId}`,
    containerId: `#${containerId}`,
    jitsiApi,
    setJitsiApi,
    topicTitle,
    videoRoomName,
    callEndedCb: handleCallEnded
  });
  return <div styleName="jitsi-container" id={containerId}></div>;
};

const VideoRoomBox = ({
  videoRoom,
  topicTitle,
  hasTitle,
  onShare,
  // onSendMessage,
  onTitleClick,
  // groups,
  // people,
  user,
  // chatState,
  // setTyping,
  videoRoomRedux,
  setCallStarted,
  page,
  domains,
  borderColor,
  onSaveTitle,
  onDelete,
  additionalStyle
}) => {
  const { jitsiApi, setJitsiApi, containerKey } = useContext(JitsiContext);
  const [editingTitle, setEditingTitle] = useState(false);
  const [videoOptionsOpen, setVideoOptionsOpen] = useState(false);

  // const currentRef = useRef({});
  // const jitsiApi = videoRoom.jitsiAPI;
  // const [callStarted, setCallStarted] = useState(videoRoom.callStarted);
  const callStarted = videoRoomRedux.callStartedMap[containerKey];

  // use ref because froala not using the current handleKeyUp
  // currentRef.current = {
  //   ...currentRef.current,
  //   videoRoom,
  //   // onSendMessage,
  //   setTyping
  // };

  const title = get(videoRoom, 'attributes.title');
  const domainId = get(page, 'domainId');
  const domain = domains[domainId];
  // console.log(domain);
  //   const typingUsers = Object.values(get(chatState, 'users', {})).filter(
  //     ({ userId, isTyping }) => userId != user.id && isTyping
  //   );

  //   const handleKeyUp = function(e) {
  //     // newline on Shift+Enter or Ctrl+Enter
  //     if (e.which == 13) {
  //       if (e.shiftKey || e.ctrlKey) {
  //         this.cursor.enter();
  //       } else {
  //         const { clearTypingTimer, onSendMessage } = currentRef.current;

  //         const msg = this.html.get();
  //         this.html.set('');

  //         clearTimeout(clearTypingTimer);
  //         currentRef.current.clearTypingTimer = null;

  //         onSendMessage(msg);
  //       }
  //     } else {
  //       const { chat, setTyping, clearTypingTimer } = currentRef.current;

  //       if (!clearTypingTimer) {
  //         setTyping(chat.id, true);
  //       } else {
  //         clearTimeout(clearTypingTimer);
  //       }

  //       currentRef.current.clearTypingTimer = setTimeout(() => {
  //         currentRef.current.clearTypingTimer = null;
  //         setTyping(chat.id, false);
  //       }, 3000);
  //     }
  //   };

  const handleRenameTitle = () => {
    setEditingTitle(true);
    setVideoOptionsOpen(false);
  };

  const handleDelete = () => {
    setVideoOptionsOpen(false);
    onDelete();
  };

  return (
    <div styleName="chat-box" style={{ borderColor, ...additionalStyle }}>
      {hasTitle && (
        <div styleName="title-container">
          <div
            styleName="panel-title panel-title--btn"
            onClick={
              !editingTitle
                ? () => setVideoOptionsOpen(!videoOptionsOpen)
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
              open={videoOptionsOpen}
              onClose={() => setVideoOptionsOpen(false)}
              onRename={handleRenameTitle}
              onDelete={handleDelete}
            />
          </div>
          <div styleName="panel-subtitle">in {topicTitle}</div>
        </div>
      )}
      <div styleName="chat-box-bar">
        <div styleName="share-btn" onClick={onShare}>
          <i className="material-icons-outlined">person_add</i>
        </div>
        <ChatUserNames videoRoom={videoRoom} wrap />
      </div>
      <div styleName="chat-box-messages">
        {callStarted && (
          <JitsiVideoRoomContainer
            jitsiApi={jitsiApi}
            setJitsiApi={setJitsiApi}
            videoRoomId={get(videoRoom, 'attributes.slug')}
            videoRoomName={get(videoRoom, 'attributes.title')}
            displayName={get(user, 'attributes.name')}
            setCallStarted={setCallStarted}
            domainName={get(domain, 'attributes.tenant_name')}
            containerKey={containerKey}
            topicTitle={topicTitle}
            // handleCallEnd={handleCallEnd}
          />
        )}

        {!callStarted && (
          <button
            onClick={() => setCallStarted(containerKey, true)}
            styleName="start-jitsi-button"
          >
            Start Video Chat
          </button>
        )}

        {/* {typingUsers.map(({ userId }) => (
          <ChatMessage
            key={`typing-${userId}`}
            name={get(people, [userId, 'attributes', 'name'])}
            body="..."
          />
        ))}
        {get(chat, 'attributes.chat_messages', []).map(msg => (
          <ChatMessage
            key={msg.id}
            name={get(people, [msg.user_id, 'attributes', 'name'])}
            body={msg.body}
            isSelf={msg.user_id == user.id}
          />
        ))} */}
      </div>
      {/* <div styleName="new-msg-input">
        <TextEditor
          type="comment"
          tabIndex={1}
          placeholder="Type message"
          required
          toolbarInline
          froalaEditorEvents={{
            keyup: handleKeyUp
          }}
          settings={{
            heightMin: 40,
            heightMax: 65,
            zIndex: 1000,
            multiLine: false
          }}
        />
      </div> */}
    </div>
  );
};

VideoRoomBox.propTypes = {
  chat: PropTypes.object,
  topicTitle: PropTypes.string,
  hasTitle: PropTypes.bool,
  onShare: PropTypes.func,
  onSendMessage: PropTypes.func,
  onTitleClick: PropTypes.func
};

const dataRequirements = () => {
  return {
    people: {}
  };
};

const mapState = state => {
  const sm = stateMappings(state);
  const { groups, people, user, videoRoom, domains, page } = sm;

  // const chatId = get(props, 'chat.id');
  // const chatState = chatId && get(chat, ['chats', chatId]);

  return {
    // chatState,
    page,
    domains,
    groups,
    people,
    user,
    videoRoomRedux: videoRoom
  };
};

const mapDispatch = {
  // setTyping,
  setCallStarted: setCallStartedRedux
};

export default withDataManager(
  dataRequirements,
  mapState,
  mapDispatch
)(VideoRoomBox);
