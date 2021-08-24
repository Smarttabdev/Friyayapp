import React, { useState, useRef, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { throttle } from 'lodash';
import cn from 'classnames';
import Waypoint from 'react-waypoint';
import { useLocalStorage } from 'react-use';

import { stateMappings } from 'Src/newRedux/stateMappings';
import TextEditor from 'Components/shared/text_editor';
import ChatUserNames from './ChatUserNames';
import ChatOptionsDropdown from 'Components/shared/chat/ChatPanel/ChatOptionsDropdown';
import RenameInput from 'Components/shared/RenameInput';
import ChatMessage from './ChatMessage';
import Icon from 'Components/shared/Icon';
import LoadMore from 'Components/shared/LoadMore';
import { handleCreatedEdge } from 'Lib/utilities';

import '../ChatPanel.module.scss';
import { CHAT_TOOLBAR_SHOWN_PREF_KEY } from 'Src/appConstants';

const ChatBox = ({
  chat,
  topicTitle,
  hasTitle,
  onShare,
  onTitleClick,
  user,
  onSaveTitle,
  onDelete,
  borderColor,
  setFocusOnSearch,
  focusOnSearch,
  typingFlagQuery,
  query,
  relay,
  additionalStyle
}) => {
  const currentRef = useRef({});
  const refChatBox = useRef({});
  const chatBoxMessagesRef = useRef({});
  const [chatOptionsOpen, setChatOptionsOpen] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [isReadingMessage, setIsReadingMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [editingMessage, seteditingMessage] = useState(false);
  const [editMessageId, setEditMessageId] = useState(null);
  const [editMessage, setEditMessage] = useState('');
  const [sendingText, setSendingText] = useState();
  const [ready, setReady] = useState();

  const [showToolbar, setShowToolbar] = useLocalStorage(
    CHAT_TOOLBAR_SHOWN_PREF_KEY,
    true
  );

  const [toolbar, setToolbar] = useState(null);
  // fallback
  const [editorVariable, setEditorVariable] = useState(null);

  const editorRef = useCallback(node => {
    if (node !== null && node.editor !== null) {
      if (!node.editor.toolbar) {
        // Sometime toolbar is not attached to editor by froala editor right away
        // This workaround  and hopes that toolbar will be attached
        // fallback is setting the editor variable which will work in non=first case
        setTimeout(() => {
          if (node && node.editor) {
            setToolbar(node.editor.toolbar);
          }
        }, 0);
      } else {
        if (toolbar) {
          setToolbar(node.editor.toolbar);
        }
      }
    } else {
      setToolbar(null);
    }
    // in case we were not able to set toolbar
    // set this as fallback
    if (node !== null && node.editor) {
      setEditorVariable(node.editor);
    }
  }, []);

  // use ref because froala not using the current handleKeyUp
  currentRef.current = {
    ...currentRef.current,
    chat,
    editingMessage,
    editMessageId
  };

  const typingUsers = (typingFlagQuery?.typingFlag?.users || []).filter(
    u => toId(u.id) != user.id
  );

  const updateTyping = useCallback(
    throttle(
      chatId => {
        mutations.updateChannelFlag({
          channel: `Chat#${toId(chatId)}`,
          flag: 'typing',
          active: true
        });
      },
      2000,
      { leading: true, trailing: false }
    ),
    []
  );

  const handleKeyUp = function(e) {
    // newline on Shift+Enter or Ctrl+Enter
    if (e.which == 13) {
      if (e.shiftKey || e.ctrlKey) {
        this.cursor.enter();
      } else {
        const { chat, editingMessage, editMessageId } = currentRef.current;

        const msg = this.html.get();
        this.html.set('');

        if (editingMessage) {
          mutations.updateChatMessage({ id: editMessageId, body: msg });
          seteditingMessage(false);
          setEditMessageId(null);
          setEditMessage('');
        } else {
          setSendingText(msg);
        }
      }
    } else {
      const { chat } = currentRef.current;
      updateTyping(chat.id);
    }
    setFocusOnSearch(false);
  };

  useEffect(() => {
    if (!ready || !sendingText) return;
    mutations.createChatMessage({
      body: sendingText,
      tipId: chat.id
    });
    setSendingText();
  }, [chat.id, sendingText, ready]);

  const handleChatMessageEnter = msg => () => {
    if (msg.unread) {
      mutations.markReadChatMessage({ id: msg.id });
    }
  };

  const handleMarkAsRead = () => {
    setChatOptionsOpen(false);
    mutations.markReadChat({ id: chat.id });
  };

  const handleRenameTitle = () => {
    setEditingTitle(true);
    setChatOptionsOpen(false);
  };

  const handleOptionClick = (action, chatId, messageId) => {
    if (action == 'Edit') {
      seteditingMessage(true);
      setEditMessageId(messageId);
      const messages = getNodes(chat?.chatMessages);
      const msg = messages.find(msg => msg.id == messageId);
      setEditMessage(msg.body);
    } else if (action == 'Delete') {
      mutations.deleteChatMessage({ id: messageId });
    }
  };

  const handleDelete = () => {
    setChatOptionsOpen(false);
    onDelete();
  };

  // This effect take care for styling the toolbar
  // This is workaround and done using direct dom manipulation
  // Froala editor is initialized once and does not change or rerender the react-way when props changes
  // That is why this is important.
  useEffect(() => {
    const MARGIN = '2px';
    const HEIGHT = '16px';
    const domSubtreeModifiedListener = () => {
      if (!refChatBox.current) {
        return;
      }
      const svgEl = refChatBox.current.getElementsByClassName('fr-svg');
      const textInp = refChatBox.current.getElementsByClassName(
        'fr-element fr-view'
      );
      const spanPlaceholder = refChatBox.current.getElementsByClassName(
        'fr-placeholder'
      );

      for (let i = 0; i < svgEl.length; i++) {
        const svgIcon = svgEl[i];
        const path = svgIcon.getElementsByTagName('path')[0];
        svgIcon.style.margin = MARGIN;
        svgIcon.style.height = HEIGHT;
        // svgIcon.style.fill = borderColor;
        path.style.fill = borderColor ? borderColor : '#b0b0b0';
      }
      if (textInp[0]) {
        textInp[0].style.color = borderColor ? borderColor : '#414141';
      }
      if (spanPlaceholder[0]) {
        if (borderColor) {
          spanPlaceholder[0].style.color = borderColor;
          spanPlaceholder[0].style.opacity = '0.5';
        } else {
          spanPlaceholder[0].style.color = 'AAA';
          spanPlaceholder[0].style.opacity = '1';
        }
      }
    };

    domSubtreeModifiedListener();

    const config = { attributes: true, childList: true, subtree: true };

    const observer = new MutationObserver(domSubtreeModifiedListener);
    observer.observe(refChatBox.current, config);
    return () => observer.disconnect();
  }, [borderColor, refChatBox]);

  const toggleToolbar = () => {
    setShowToolbar(!showToolbar);
  };

  useEffect(() => {
    // check if toolbar can be referenced from editor do it.
    // This is not possible on first render because the library attached the toolbar after some delay without the callback
    // So we have timeout in useCallback, and have else for the case for the first time.
    if (editorVariable && editorVariable.toolbar) {
      if (showToolbar) {
        editorVariable.toolbar.show();
      } else {
        editorVariable.toolbar.hide();
      }
    } else {
      if (toolbar) {
        if (showToolbar) {
          toolbar.show();
        } else {
          toolbar.hide();
        }
      }
    }
  }, [showToolbar, toolbar, editorVariable]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = chatBoxMessagesRef.current;

      currentRef.current.scrollDelta = scrollHeight - scrollTop;

      const isReading =
        chatBoxMessagesRef.current.scrollTop +
          chatBoxMessagesRef.current.clientHeight <
        chatBoxMessagesRef.current.scrollHeight - 10;

      setIsReadingMessage(isReading);
    };
    chatBoxMessagesRef.current.addEventListener('scroll', handleScroll);
    return () =>
      chatBoxMessagesRef.current.removeEventListener('scroll', handleScroll);
  }, [chatBoxMessagesRef.current]);

  // don't scroll after loading old messages
  const chatMessages = getNodes(chat?.chatMessages);
  const oldestMessage =
    chatMessages.length && chatMessages[chatMessages.length - 1];
  const oldestMessageId = oldestMessage?.id;

  useEffect(() => {
    if (chatBoxMessagesRef.current) {
      const { scrollDelta, prevOldestMessageId } = currentRef.current;
      const { scrollHeight } = chatBoxMessagesRef.current;

      if (oldestMessageId && oldestMessageId != prevOldestMessageId) {
        chatBoxMessagesRef.current.scrollTop = scrollHeight - scrollDelta;
      }
    }
    currentRef.current.prevOldestMessageId = oldestMessageId;
  }, [oldestMessageId, chatBoxMessagesRef.current]);

  useEffect(() => {
    if (!isReadingMessage) {
      chatBoxMessagesRef.current.scrollTop =
        chatBoxMessagesRef.current.scrollHeight;
    }
  });

  useEffect(() => {
    if (chat) {
      const disposer = requestSubscription({
        subscription: graphql`
          subscription ChatBoxTipUpdatedSubscription($id: ID!) {
            tipUpdated(id: $id) {
              tip {
                id
                title
                ...ChatUserNames_chat
              }
            }
          }
        `,
        vars: { id: chat.id }
      });
      return () => disposer.dispose();
    }
  }, [chat?.id]);

  useEffect(() => {
    if (chat) {
      const disposer = requestSubscription({
        subscription: graphql`
          subscription ChatBoxChatMessageCreatedSubscription($tipId: ID!) {
            chatMessageCreated(tipId: $tipId) {
              chatMessage {
                id
                body
                unread
                createdAt
                user {
                  id
                  name
                }
                tip {
                  id
                }
              }
            }
          }
        `,
        vars: { tipId: chat.id },
        onNext: () => {
          !ready && setReady(true);
        },
        updater: store => {
          handleCreatedEdge({
            rootField: 'chatMessageCreated',
            field: 'chatMessage',
            connectionId: `client:${chat.id}:__Tip_chatMessages_connection`,
            store,
            edgeType: 'ChatMessageEdge',
            prepend: true
          });
        }
      });
      return () => disposer.dispose();
    }
  }, [chat?.id]);

  useEffect(() => {
    if (!chat?.id) return;
    const disposers = [
      subscriptions.chatMessageUpdated({ tipId: chat.id }),
      subscriptions.chatMessageDeleted({
        tipId: chat.id,
        configs: [
          {
            type: 'RANGE_DELETE',
            deletedIDFieldName: 'id',
            parentID: toGid('Tip', chat.id),
            connectionKeys: [
              {
                key: 'Tip_chatMessages'
              }
            ],
            pathToConnection: ['tips', 'chatMessages']
          },
          {
            type: 'NODE_DELETE',
            deletedIDFieldName: 'id'
          }
        ]
      })
    ];
    return () => disposers.forEach(d => d.dispose());
  }, [chat?.id]);

  useEffect(() => {
    if (!chat?.id) return;
    const disposer = requestSubscription({
      subscription: graphql`
        subscription ChatBoxTipQuerySubscription($tipId: ID!) {
          tipQuery(tipId: $tipId) {
            tip {
              ...ChatBox_chat
            }
          }
        }
      `,
      vars: {
        tipId: toGid('Tip', chat.id)
      }
    });
    return () => disposer.dispose();
  }, [chat?.id]);

  useEffect(() => {
    if (chat) {
      const disposer = subscriptions.channelFlagUpdated({
        channel: `Chat#${toId(chat.id)}`,
        flag: 'typing'
      });
      return () => disposer.dispose();
    }
  }, [chat?.id]);

  const formatTime = date => {
    const m = moment(date);
    return m.calendar(null, {
      sameDay: 'hh:mmA',
      lastDay: '[Yesterday at] hh:mmA',
      lastWeek: '[Last] dddd [at] hh:mmA',
      sameElse: 'MMM DD, YYYY hh:mmA'
    });
  };

  return (
    <div
      ref={refChatBox}
      styleName="chat-box"
      style={{ borderColor, ...additionalStyle }}
    >
      {hasTitle && (
        <div styleName="title-container">
          <div
            styleName="panel-title panel-title--btn"
            onClick={
              !editingTitle
                ? () => setChatOptionsOpen(!chatOptionsOpen)
                : undefined
            }
          >
            {editingTitle ? (
              <RenameInput
                className="form-control form-control-minimal"
                styleName="panel-title-input"
                initialValue={chat.title}
                onSave={onSaveTitle}
                onClose={() => setEditingTitle(false)}
              />
            ) : (
              chat.title
            )}
            <ChatOptionsDropdown
              open={chatOptionsOpen}
              onClose={() => setChatOptionsOpen(false)}
              onMarkAsRead={handleMarkAsRead}
              onRename={handleRenameTitle}
              onDelete={handleDelete}
            />
          </div>
          <div styleName="panel-subtitle" onClick={onTitleClick}>
            in {topicTitle}
          </div>
        </div>
      )}
      <div styleName="chat-box-bar">
        <div styleName="share-btn" onClick={onShare}>
          <i className="material-icons-outlined">person_add</i>
        </div>
        <ChatUserNames chat={chat} query={query} wrap />
      </div>
      <div styleName="chat-box-messages" ref={chatBoxMessagesRef}>
        <div>
          {typingUsers.map(user => (
            <ChatMessage
              key={`typing-${user.id}`}
              name={user.name}
              body="..."
            />
          ))}
          {getNodes(chat?.chatMessages).map(msg => (
            <Waypoint key={msg.id} onEnter={handleChatMessageEnter(msg)}>
              <ChatMessage
                name={msg.user.name}
                time={formatTime(msg.createdAt)}
                body={msg.body}
                isEditing={msg.id == editMessageId}
                isSelf={msg.user.id == toGid('User', user.id)}
                chatId={chat.id}
                messageId={msg.id}
                borderColor={borderColor}
                handleOptionClick={(action, chatId, msgId) => {
                  handleOptionClick(action, chatId, msgId);
                }}
              />
            </Waypoint>
          ))}
          <LoadMore
            relay={relay}
            count={10}
            auto
            scrollParent={
              chatBoxMessagesRef.current?.getBoundingClientRect &&
              chatBoxMessagesRef.current
            }
          />
        </div>
      </div>
      <div
        styleName={cn('new-msg-input', editingMessage && 'is-editing')}
        style={{ borderColor }}
      >
        {
          <TextEditor
            editorRef={editorRef}
            focus={!focusOnSearch}
            type="chat"
            tabIndex={1}
            placeholder="Type message"
            required
            body={editingMessage ? editMessage : message}
            onChange={editingMessage ? setEditMessage : setMessage}
            toolbarBottom={true}
            toolbarInline={false}
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
        }
        <div onClick={toggleToolbar} styleName="hide-key-icon">
          <Icon icon={'keyboard_hide'} fontSize={16} />
        </div>
      </div>
    </div>
  );
};

ChatBox.propTypes = {
  chat: PropTypes.object,
  topicTitle: PropTypes.string,
  hasTitle: PropTypes.bool,
  onShare: PropTypes.func,
  onTitleClick: PropTypes.func
};

const mapState = state => {
  const sm = stateMappings(state);
  const { user } = sm;
  return {
    user
  };
};

const Container = createPaginationContainer(
  ChatBox,
  {
    chat: graphql`
      fragment ChatBox_chat on Tip
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: Int, defaultValue: 10 }
          init: { type: "Boolean!", defaultValue: true }
        ) {
        id
        title
        ...ChatUserNames_chat @include(if: $init)
        chatMessages(first: $count, after: $cursor)
          @connection(key: "Tip_chatMessages") {
          edges {
            node {
              id
              body
              unread
              user {
                id
                name
              }
              createdAt
            }
          }
        }
      }
    `,
    typingFlagQuery: graphql`
      fragment ChatBox_typingFlagQuery on Query
        @argumentDefinitions(channel: { type: "String!" }) {
        typingFlag: channelFlag(channel: $channel, flag: "typing") {
          id
          channel
          users {
            id
            name
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.chat?.chatMessages,
    getFragmentVariables: (vars, count) => ({ ...vars, count }),
    getVariables: (props, { cursor }, vars) => ({ ...vars, cursor }),
    query: graphql`
      query ChatBoxPaginationQuery($chatId: ID!, $cursor: String, $count: Int) {
        chat: node(id: $chatId) {
          id
          ...ChatBox_chat
            @arguments(cursor: $cursor, count: $count, init: false)
        }
      }
    `
  }
);

export default connect(mapState)(
  QueryRenderer(
    props => <Container {...props} chat={props.chat} typingFlagQuery={props} />,
    {
      query: graphql`
        query ChatBoxQuery(
          $chatId: ID!
          $hasChat: Boolean!
          $channel: String!
        ) {
          chat: tip(id: $chatId) @include(if: $hasChat) {
            id
            title
            topic {
              id
              title
            }
            ...ChatBox_chat
          }
          ...ChatBox_typingFlagQuery
            @arguments(channel: $channel)
            @include(if: $hasChat)
        }
      `,
      vars: ({ chatId }) => ({
        hasChat: !!chatId,
        chatId: chatId ? toGid('Tip', chatId) : '',
        channel: chatId ? `Chat#${toId(chatId)}` : ''
      })
    }
  )
);
