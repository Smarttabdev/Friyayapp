import React, {
  Fragment,
  useEffect,
  useCallback,
  useState,
  useRef
} from 'react';
import { connect } from 'react-redux';
import { get, debounce } from 'lodash';
import cn from 'classnames';

import { stateMappings } from 'Src/newRedux/stateMappings';
import { getCards } from 'Src/newRedux/database/cards/selectors';
import {
  setShowVideoRoomModal,
  setShowChatModal,
  setExpandChatModal
} from 'Src/newRedux/interface/modals/actions';
import { updateChatLens } from 'Src/newRedux/interface/lenses/actions';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import {
  getCard,
  createCard,
  updateCard,
  removeChat
} from 'Src/newRedux/database/cards/thunks';

import ChatPanelTopbar from './ChatPanel/ChatPanelTopbar';
import ChatsList from './ChatPanel/ChatsList';
import ChatBox from './ChatPanel/ChatBox';

import './ChatPanel.module.scss';
import {
  getExpandedChatModal,
  getMinimizedChatModal
} from 'Src/newRedux/interface/modals/selectors';
import { chatModalStates } from 'Src/newRedux/interface/modals/constants';
import { joinChannel } from 'Src/newRedux/presence/thunks';

const hoc = Component => props => {
  const [searchQuery, setSearchQuery] = useState('');

  const setSearchQueryDebounced = useCallback(
    debounce(setSearchQuery, 300),
    []
  );

  return (
    <Component
      {...props}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQueryDebounced}
    />
  );
};

const ChatPanel = ({
  chatId,
  topicId,
  listTopicId,
  displayChatModal,
  expandChatModal,
  setShowChatModal,
  setExpandChatModal,
  setShowVideoRoomModal,
  asDropdown,
  onClose,
  setEditCardModalOpen,
  asLens,
  asBlock,
  onSelectChat,
  chatLens,
  updateChatLens,
  active_design,
  getCard,
  updateCard,
  removeChat,
  minimizeChatModal,
  searchQuery,
  setSearchQuery,
  chat,
  allAvailableCards,
  createCard,
  selectedChatDetails,
  isHome,
  ...restProps
}) => {
  const query = rootFragments(restProps);

  expandChatModal = !asDropdown && (expandChatModal || asLens);

  const topic = get(chat, 'topic');
  const topicTitle = get(topic, 'title', '');

  const title = chatId && !expandChatModal ? get(chat, 'title', '') : 'Chats';

  const [searchValue, setSearchValue] = useState('');
  const [focusOnSearch, setFocusOnSearch] = useState(false);

  const inputStyle = {
    borderColor: asLens || asBlock ? active_design.card_font_color : undefined
  };
  const cardsRef = useRef(allAvailableCards);

  useEffect(() => {
    cardsRef.current = allAvailableCards;
  });

  useEffect(() => {
    if (chat) {
      const chatId = toId(chat.id);
      return joinChannel(`Chat#${chatId}`);
    }
  }, [get(chat, 'id')]);

  const handleBack = () => {
    setShowChatModal({ isOpen: true, chatId: null });
  };

  const handleTitleClick = () => {
    const modalOptions = { cardId: toId(chat.id), tab: 'Organize' };
    setEditCardModalOpen(modalOptions);
  };

  const handleMarkAsRead = () => {
    mutations.markReadChat({ id: chat.id });
  };

  const handleSaveTitle = title => {
    if (title == get(chat, 'title')) {
      return;
    }
    updateCard({
      id: toId(chat.id),
      attributes: { title }
    });
  };

  const updateLinkedCard = () => {
    if (!cardsRef.current.hasOwnProperty(toId(chat.id))) {
      getCard(toId(chat.id));
    }
    const selectedChatCard = cardsRef.current[toId(chat.id)];
    const linkedVideoroomId = get(
      selectedChatCard,
      'attributes.configs.linked_video_chat'
    );
    linkedVideoroomId &&
      updateCard({
        id: linkedVideoroomId,
        attributes: {
          configs: {
            linked_chat: null
          }
        }
      });
  };
  const handleDelete = () => {
    removeChat(toId(chat.id), {
      beforeDelete: () => {
        updateLinkedCard();
        updateChatLens({ chatId: null });
        setShowChatModal({ isOpen: displayChatModal.isOpen, chatId: null });
      }
    });
  };

  const handleShare = async () => {
    await getCard(toId(chat.id));
    const modalOptions = { cardId: toId(chat.id), tab: 'Share' };
    setEditCardModalOpen(modalOptions);
  };

  const handleExpand = () => {
    if (asDropdown) {
      setShowChatModal({ isOpen: true, chatId: displayChatModal.chatId });
      onClose();
    }
    let setModalState;
    if (expandChatModal) {
      setModalState = chatModalStates.NORMAL;
    } else {
      setModalState = chatModalStates.EXPANDED;
    }
    setExpandChatModal(setModalState);
  };

  const handleMinimize = () => {
    let setModalState;
    if (minimizeChatModal) {
      setModalState = chatModalStates.NORMAL;
    } else {
      setModalState = chatModalStates.MINIMIZED;
    }
    setExpandChatModal(setModalState);
  };

  const handleClose = () => setShowChatModal({ isOpen: false });

  const handleChatClick = chat => {
    if (asBlock) {
      onSelectChat(chat);
    } else if (asLens) {
      updateChatLens({ chatId: toId(chat.id) });
    } else {
      setShowChatModal({ isOpen: true, chatId: toId(chat.id) });
      onClose();
    }
  };

  const handleChatCreated = chatId => {
    handleChatClick({ id: chatId });
  };

  const handleSearch = event => {
    setSearchValue(event.target.value);
    setSearchQuery(event.target.value);
    setFocusOnSearch(true);
  };

  const renderChatListContainer = () => (
    <Fragment>
      <input
        autoFocus={focusOnSearch}
        onChange={handleSearch}
        styleName="input"
        placeholder="Search chat"
        value={searchValue}
        style={inputStyle}
      />
      <ChatsList
        query={rootFragments(restProps)}
        searchQuery={searchQuery}
        topicId={listTopicId}
        onClick={handleChatClick}
      />
    </Fragment>
  );

  const renderExpandedLayout = () => (
    <div styleName="two-columns">
      <div styleName="left" key="chat-list">
        {renderChatListContainer()}
      </div>
      {chat ? (
        <ChatBox
          chatId={chatId}
          topicTitle={topicTitle}
          hasTitle
          onTitleClick={handleTitleClick}
          onShare={handleShare}
          onSaveTitle={handleSaveTitle}
          onDelete={handleDelete}
          borderColor={
            asLens || asBlock ? active_design.card_font_color : undefined
          }
          setFocusOnSearch={setFocusOnSearch}
          focusOnSearch={focusOnSearch}
          query={query}
          additionalStyle={
            asLens && {
              position: 'absolute',
              right: 15,
              top: 20,
              width: '65.5%',
              height: '97%',
              minHeight: 500
            }
          }
        />
      ) : (
        chatId && loadingIndicator()
      )}
    </div>
  );

  const renderCompactLayout = () =>
    chatId ? (
      chat ? (
        <ChatBox
          chatId={chatId}
          onShare={handleShare}
          onSaveTitle={handleSaveTitle}
          onDelete={handleDelete}
          borderColor={
            asLens || asBlock ? active_design.card_font_color : undefined
          }
          setFocusOnSearch={setFocusOnSearch}
          focusOnSearch={focusOnSearch}
          query={query}
        />
      ) : (
        loadingIndicator()
      )
    ) : (
      renderChatListContainer()
    );

  return (
    <div
      styleName={cn(
        'chat-panel',
        expandChatModal && 'expanded',
        minimizeChatModal && 'minimized'
      )}
      style={{
        color: asLens || asBlock ? active_design.card_font_color : undefined,
        paddingLeft: asLens && (isHome ? '15px' : '20px')
      }}
    >
      <ChatPanelTopbar
        updateCardProperties={updateCard}
        createNewCard={createCard}
        showVideoRoomModal={setShowVideoRoomModal}
        title={title}
        selectedChat={chat}
        subTitle={!expandChatModal && chatId ? `in ${topicTitle}` : null}
        isExpanded={expandChatModal}
        query={query}
        topicId={topicId}
        onTitleClick={!expandChatModal ? handleTitleClick : undefined}
        onBack={handleBack}
        onExpand={handleExpand}
        onClose={handleClose}
        hasMinimize={!expandChatModal && !!chatId && !asBlock}
        hasExpand={!asLens && !asBlock}
        hasClose={!asDropdown && !asLens && !asBlock}
        hasAdd={expandChatModal || !chatId}
        hasBack={!expandChatModal && !!chatId && !asBlock}
        hasShare={!!chatId}
        onMarkAsRead={handleMarkAsRead}
        onSaveTitle={handleSaveTitle}
        onDelete={!asBlock && handleDelete}
        canEditTitle={!expandChatModal && !!chatId}
        handleMinimize={handleMinimize}
        minimizeChatModal={minimizeChatModal}
        afterCreated={handleChatCreated}
        getCard={getCard}
        cardsRef={cardsRef}
      />
      {expandChatModal ? renderExpandedLayout() : renderCompactLayout()}
    </div>
  );
};

ChatPanel.defaultProps = {
  onClose: () => {}
};

const mapState = (state, props) => {
  const {
    tools: { chatLens },
    modals: { displayChatModal },
    page: { topicId, isHome },
    utilities: { active_design }
  } = stateMappings(state);
  const allAvailableCards = state._newReduxTree.database.cards;
  const { asDropdown, asLens, asBlock } = props;
  const expandChatModal = getExpandedChatModal(state);
  const minimizeChatModal = getMinimizedChatModal(state);
  const chatId = asBlock
    ? props.chatId
    : !asDropdown && (asLens ? chatLens.chatId : displayChatModal.chatId);
  const selectedChatDetails =
    chatId && state._newReduxTree.database.cards[chatId];

  const listTopicId =
    props.all || props.asDropdown || (!props.asBlock && !props.asLens)
      ? undefined
      : topicId;

  return {
    chatId,
    topicId,
    listTopicId,
    displayChatModal,
    chatLens,
    expandChatModal,
    active_design,
    minimizeChatModal,
    allAvailableCards,
    selectedChatDetails,
    isHome
  };
};

const mapDispatch = {
  setShowVideoRoomModal,
  setShowChatModal,
  setExpandChatModal,
  updateChatLens,
  setEditCardModalOpen,
  getCard,
  updateCard,
  removeChat,
  createCard
};

const ConnectedChatPanel = connect(
  mapState,
  mapDispatch
)(
  QueryRenderer({
    query: graphql`
      query ChatPanelQuery($hasChat: Boolean!, $chatId: ID!) {
        chat: tip(id: $chatId) @include(if: $hasChat) {
          id
          title
          topic {
            id
            title
          }
        }
        ...ChatUserNames_query
      }
    `,
    vars: props => ({
      hasChat: !!props.chatId,
      chatId: props.chatId ? toGid('Tip', props.chatId) : ''
    }),
    component: ChatPanel
  })
);

export default hoc(ConnectedChatPanel);
