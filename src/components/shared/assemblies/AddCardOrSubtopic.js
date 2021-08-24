import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import cs from 'classnames';
import Icon from 'Components/shared/Icon';
import { toggleSubtopicPanel } from 'Src/newRedux/interface/lenses/thunks';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import CreateChatCard from 'Components/shared/chat/ChatPanel/CreateChatCard';
import CreateVideoRoomCard from 'Components/shared/video_rooms/CreateVideoRoomCard';
import { scrollToShow } from 'Src/lib/utilities';
import { createCard } from 'Src/newRedux/database/cards/thunks';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import { AddCardButton } from 'Components/shared/buttons/index';
import { stateMappings } from 'Src/newRedux/stateMappings';
import SelectViewDropdown from './SelectViewDropdown';
import {
  setShowChatModal,
  setShowVideoRoomModal
} from 'Src/newRedux/interface/modals/actions';
import Tooltip from 'Components/shared/Tooltip';
import AddCardOrSubtopicMoreOptions from './AddCardOrSubtopicMoreOptions';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import { toId } from 'Lib/utilities';
import { setEditModalCardType } from 'Src/newRedux/utilities/actions';
import {
  cardTypes,
  boardTypes,
  cardDetails
} from 'src/components/shared/CardAndBoardTypes';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { setCopyTopicModalOpen } from 'Src/newRedux/interface/modals/actions';
import { workspaceTemplatesSelector } from 'Src/newRedux/database/topics/selectors';
import { getCardArray } from 'Src/newRedux/database/cards/selectors';
import { getCardTypeIconAttribute } from 'Src/utils/icons';
import { copyAndOpenCard } from 'Src/newRedux/database/cards/thunks';

class AddCardOrSubtopic extends PureComponent {
  myRef = React.createRef();
  state = {
    addCardMode: false,
    addSubtopicMode: false,
    addChatMode: false,
    addVideoRoomMode: false,
    visible: false,
    isSaving: false,
    tag: null,
    cardType: { type: 'CARD', index: 0 },
    hoveredCard: 0,
    hoveredBoard: 0,
    boardIndex: null,
    templateTypes: [{ name: 'board' }, { name: 'card' }]
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.visible !== prevState.visible) {
      this.props.getIsOpen && this.props.getIsOpen(this.state.visible);
    }
  }

  createNewCard = topicId => {
    setTimeout(async () => {
      this.setState({ isSaving: true });
      const { createTextCard } = this.props;
      const attributes = { title: 'Title' };
      const relationships = {
        topics: { data: [topicId] }
      };
      const newCard = await createTextCard({ attributes, relationships });
      document.querySelector('.c' + newCard.data.data.id).scrollIntoView();
      this.setState({ isSaving: false, visible: false });
    });
  };

  handleClickOutside = e => {
    if (this.myRef.current && !this.myRef.current.contains(e.target)) {
      this.setState({
        addCardMode: false,
        addSubtopicMode: false,
        addVideoRoomMode: false,
        visible: false
      });
    }
  };

  handleCardWasCreated = cardId => {
    const { handleAddCardOrSubtopic, afterCardCreated } = this.props;
    this.handleDismiss();
    let projectId = null;
    if (this.props.trackerLaneView) {
      projectId = toId(this.props.selectedProjectId) || null;
    }
    handleAddCardOrSubtopic &&
      handleAddCardOrSubtopic(this.props.topic.id || projectId);
    afterCardCreated
      ? afterCardCreated(cardId)
      : scrollToShow(document.querySelector('.c' + cardId), 14, 24);
    this.props.additionalEffects();
  };

  handleChatCreated = chatId => {
    const { setShowChatModal } = this.props;
    setShowChatModal({ isOpen: true, chatId });
  };

  handleVideoRoomCreated = id => {
    const { setShowVideoRoomModal } = this.props;
    setShowVideoRoomModal({ isOpen: true, videoRoomId: id });
  };

  handleDismiss = () => {
    this.setState({
      addSubtopicMode: false,
      addCardMode: false,
      addChatMode: false,
      addVideoRoomMode: false,
      visible: false
    });
  };

  handleShowAddCard = () => {
    if (this.props.disableModalAdd) {
      this.setState(
        {
          visible: false
        },
        () => {
          this.props.disabledModalAddHandler('Card');
          this.props.setEditModalCardType(this.state.cardType.type);
        }
      );
      return;
    }
    setTimeout(() => {
      this.setState({
        addCardMode: true,
        addSubtopicMode: false,
        addVideoRoomMode: false,
        addChatMode: false
      });
    });
  };

  handleShowAddChat = () => {
    setTimeout(() => {
      this.setState({
        addCardMode: false,
        addSubtopicMode: false,
        addVideoRoomMode: false,
        addChatMode: true
      });
    });
  };

  handleShowVideoRoomCard = () => {
    setTimeout(() => {
      this.setState({
        addCardMode: false,
        addSubtopicMode: false,
        addChatMode: false,
        addVideoRoomMode: true
      });
    });
  };

  handleShowAddTextCard = () => {
    this.createNewCard(this.props.topic.id);
  };

  handleShowAddSubtopic = () => {
    if (this.props.disableModalAdd) {
      this.setState(
        {
          visible: false
        },
        () => {
          this.props.disabledModalAddHandler('Board');
        }
      );
      return;
    }
    setTimeout(() => {
      this.setState({
        addSubtopicMode: true,
        addCardMode: false,
        addChatMode: false,
        addVideoRoomMode: false
      });
    });
  };

  handleTopicWasCreated = () => {
    this.handleDismiss();
    this.props.handleAddCardOrSubtopic &&
      this.props.handleAddCardOrSubtopic(this.props.topic.id);
    this.props.toggleSubtopicPanel &&
    this.props.cardView.view !== 'WIKI' &&
    !this.props.cardView.subtopic_panel_visible
      ? this.props.toggleSubtopicPanel(this.props.topic)
      : this.scrollToShow(
          document.querySelector('.t' + this.props.topic.id),
          18,
          26
        );
  };

  handleUploadFile = () => {
    const { setEditCardModalOpen, topic, additionalEffects } = this.props;

    setEditCardModalOpen({
      cardId: null,
      tab: 'Edit',
      openFileUploader: true,
      instantUpload: true,
      topicId: topic?.id
    });

    additionalEffects();
  };

  toggleTemplatesType = type => {
    let { showTemplatesType } = this.state;
    if (showTemplatesType == type) showTemplatesType = null;
    else showTemplatesType = type;
    this.setState({ showTemplatesType });
  };

  handleUseTemplate = async (type, template) => {
    const { setCopyTopicModalOpen, copyAndOpenCard, topicId } = this.props;
    if (type == 'board') setCopyTopicModalOpen(true, template);
    if (type == 'card') await copyAndOpenCard(template, topicId);
    this.setState({ visible: false });
  };

  render() {
    const {
      displayAddCardButton,
      displayAddSubtopicButton,
      displayAddChatButton,
      displayAddVideoRoomButton,
      displayAddGoalButton,
      displayAddProjectButton,
      displayUploadFileButton,
      showAddTextCard,
      showUploadFileCard,
      trackerLaneView,
      selectedProjectId,
      hideOtherButton,
      getBoardType,
      color,
      topicId,
      topics,
      icon,
      className,
      secondaryIcon,
      topicHeader,
      additionalClasses,
      boardTypeFilter,
      cardTypeFilter,
      transparent,
      disableModalAdd,
      boardTemplates,
      cardTemplates,
      selectedTopicId,
      location,
      dropdownStyle,
      ...childProps
    } = this.props;
    let {
      addCardMode,
      addSubtopicMode,
      addChatMode,
      addVideoRoomMode,
      visible,
      isSaving,
      moreOptions,
      showTemplatesType,
      templateTypes
    } = this.state;
    const forId = Math.ceil(Math.random() * 100000, 6);

    templateTypes[0].templates = boardTemplates;
    templateTypes[1].templates = cardTemplates;

    return (
      <div
        ref={this.myRef}
        className={cs(`add-card-or-subtopic dropdown ${additionalClasses}`, {
          open: visible || this.props.isVisible
        })}
        style={{ display: (visible || this.props.isVisible) && 'inherit' }}
      >
        {!this.props.isVisible && (
          <a
            className={cs(
              'dropdown-toggle add-card-or-subtopic_button',
              className
            )}
            onClick={() => {
              this.setState(state => {
                return {
                  visible: !state.visible,
                  addCardMode: false,
                  addSubtopicMode: false,
                  addChatMode: false
                };
              });
            }}
            data-tip={'Add Options'}
            data-for={forId}
          >
            {secondaryIcon ? (
              <Icon
                color={color ? color : '#C4C4C4'}
                icon={icon ?? 'add'}
                additionalClasses="plus-secondary-icon"
              />
            ) : (
              <Icon
                color={color ? color : '#6FCF97'}
                icon={icon ?? 'add'}
                additionalClasses="plus-icon"
              />
            )}
            <Tooltip {...{ place: 'bottom' }} id={forId} />
          </a>
        )}
        {(visible || this.props.isVisible) && (
          <ul
            style={dropdownStyle}
            className={`dropdown-menu ${moreOptions && 'more'}`}
            id="domain-dropdown"
          >
            {isSaving ? (
              <LoadingIndicator />
            ) : (
              <Fragment>
                <li>
                  {addSubtopicMode && (
                    <Fragment>
                      <p className="dropdown-menu-title">Create Board</p>
                      <AddSubtopicCard
                        {...childProps}
                        afterTopicCreated={this.handleTopicWasCreated}
                        inInputMode={true}
                        onDismiss={this.handleDismiss}
                        tag={this.state.tag}
                        trackerLaneView={trackerLaneView}
                        boardIndex={this.state.boardIndex}
                        parentTopicId={
                          selectedTopicId ||
                          (childProps.topic ? childProps.topic?.id : null)
                        }
                        boardTypeSmallModal
                        transparent={transparent}
                        addPickAnExistingBoard={
                          this.props.addPickAnExistingBoard
                        }
                        isPrivate={this.props.isPrivate}
                      />
                    </Fragment>
                  )}
                </li>
                <li>
                  {addCardMode && (
                    <Fragment>
                      <p className="dropdown-menu-title">Create Card</p>
                      <AddCardCard
                        {...childProps}
                        afterCardCreated={this.handleCardWasCreated}
                        inInputMode={true}
                        onDismiss={this.handleDismiss}
                        topMenu={true}
                        selectedCardType={this.state.cardType}
                        topicId={topicId}
                        topicHeader={topicHeader}
                        transparent={transparent}
                        selectedTopicId={selectedTopicId}
                        location={location}
                      />
                    </Fragment>
                  )}
                </li>
                <li>
                  {addChatMode && (
                    <Fragment>
                      <p className="dropdown-menu-title">Create Chat</p>
                      <CreateChatCard
                        topicId={topicId}
                        // share_settings={}
                        onDismiss={this.handleDismiss}
                        afterCreated={this.handleChatCreated}
                        hideCardTypeDropdown
                        topicHeader={topicHeader}
                      />
                    </Fragment>
                  )}
                </li>
                <li>
                  {addVideoRoomMode && (
                    <Fragment>
                      <p className="dropdown-menu-title">Create Video Chat</p>
                      <CreateVideoRoomCard
                        topicId={topicId}
                        topics={topics}
                        onDismiss={this.handleDismiss}
                        afterCreated={this.handleVideoRoomCreated}
                        topicHeader={topicHeader}
                      />
                    </Fragment>
                  )}
                </li>
                {!addCardMode &&
                  !addSubtopicMode &&
                  !addChatMode &&
                  !addVideoRoomMode && (
                    <Fragment>
                      <li>
                        {showUploadFileCard && childProps.topic && (
                          <a>
                            <AddCardButton
                              openFileUploader
                              topic={childProps.topic}
                              buttonText={
                                <Fragment>
                                  <p className="dropdown-menu-title">
                                    Upload File
                                  </p>
                                  <p className="dropdown-menu-description">
                                    Add a file to the card.
                                  </p>
                                </Fragment>
                              }
                            />
                          </a>
                        )}
                      </li>

                      {displayAddCardButton && (
                        <li className="dropdown-menu__details-1">
                          <article>
                            {cardTypes.map((x, i) => (
                              <a
                                key={i}
                                onClick={() => {
                                  this.handleShowAddCard();
                                  this.setState({
                                    cardType: { type: x.type, index: i }
                                  });
                                  this.props.returnCardType &&
                                    this.props.returnCardType(x.type);
                                }}
                                onMouseEnter={() =>
                                  this.setState({ hoveredCard: i })
                                }
                                style={{
                                  display:
                                    cardTypeFilter &&
                                    !cardTypeFilter.includes(x.type) &&
                                    'none'
                                }}
                              >
                                <Icon
                                  containerStyle={
                                    topicHeader ? { marginRight: 0 } : {}
                                  }
                                  color={x.color}
                                  icon={x.iconType}
                                  outlined={x.outlined}
                                />
                              </a>
                            ))}

                            {displayAddVideoRoomButton && (
                              <a
                                onClick={this.handleShowVideoRoomCard}
                                onMouseEnter={() =>
                                  this.setState({ hoveredCard: 4 })
                                }
                              >
                                <Icon
                                  color="#EB5757"
                                  icon="videocam"
                                  outlined={true}
                                  containerStyle={
                                    topicHeader ? { marginRight: 0 } : {}
                                  }
                                />
                              </a>
                            )}
                            {displayAddChatButton && (
                              <a
                                onClick={this.handleShowAddChat}
                                onMouseEnter={() =>
                                  this.setState({ hoveredCard: 5 })
                                }
                              >
                                <Icon
                                  color="#F2C94C"
                                  icon="question_answer"
                                  outlined={true}
                                  containerStyle={
                                    topicHeader ? { marginRight: 0 } : {}
                                  }
                                />
                              </a>
                            )}
                            {(displayUploadFileButton || !cardTypeFilter) && (
                              <a
                                onClick={this.handleUploadFile}
                                onMouseEnter={() =>
                                  this.setState({ hoveredCard: 6 })
                                }
                              >
                                <Icon
                                  color="#F2994A"
                                  icon="insert_drive_file"
                                  containerStyle={
                                    topicHeader ? { marginRight: 0 } : {}
                                  }
                                />
                              </a>
                            )}
                            <li>
                              {showAddTextCard && childProps.topic && (
                                <a
                                  onMouseEnter={() =>
                                    this.setState({ hoveredCard: 7 })
                                  }
                                  onClick={this.handleShowAddTextCard}
                                >
                                  <Icon
                                    color="#5C5DB9"
                                    icon="view_headline"
                                    containerStyle={
                                      topicHeader ? { marginRight: 0 } : {}
                                    }
                                  />
                                </a>
                              )}
                            </li>
                          </article>
                          <h4>{cardDetails[this.state.hoveredCard].title}</h4>
                          <p>
                            {cardDetails[this.state.hoveredCard].description}
                          </p>
                        </li>
                      )}
                      {displayAddSubtopicButton && (
                        <li className="dropdown-menu__details-2">
                          <article>
                            {boardTypes.map((x, i) => (
                              <a
                                key={i}
                                onClick={() => {
                                  this.handleShowAddSubtopic();
                                  this.setState({
                                    tag: x.type,
                                    boardIndex: i
                                  });
                                  if (this.props.returnBoardType)
                                    this.props.returnBoardType(x.type);
                                }}
                                onMouseEnter={() => {
                                  this.setState({ hoveredBoard: i });
                                  if (getBoardType) {
                                    getBoardType(x.type, i);
                                  }
                                }}
                                style={{
                                  display:
                                    boardTypeFilter &&
                                    !boardTypeFilter.includes(x.type) &&
                                    'none'
                                }}
                              >
                                <Icon
                                  color={x.color}
                                  icon={x.iconType}
                                  fontAwesome={x.fontAwesome}
                                  outlined={x.outlined}
                                  containerStyle={
                                    topicHeader ? { marginRight: 0 } : {}
                                  }
                                />
                              </a>
                            ))}
                          </article>
                          <h4>{boardTypes[this.state.hoveredBoard].title}</h4>
                          <p>
                            {boardTypes[this.state.hoveredBoard].description}
                          </p>
                        </li>
                      )}
                      <>
                        <div className="use_template_section">
                          {templateTypes.map((type, i) => (
                            <div key={i}>
                              <div
                                onClick={() =>
                                  this.toggleTemplatesType(type.name)
                                }
                                className={`header_button is_${type.name}`}
                              >
                                Use a {type.name} template
                              </div>
                              {showTemplatesType == type.name && (
                                <div className="templates_container">
                                  {type.templates.length == 0 && (
                                    <div
                                      className="template_item"
                                      style={{
                                        cursor: 'initial',
                                        marginTop: '10px'
                                      }}
                                    >
                                      No {type.name} templates yet
                                    </div>
                                  )}
                                  {type.templates.map((template, i) => {
                                    const cardIcon =
                                      type.name == 'card'
                                        ? getCardTypeIconAttribute(
                                            template.attributes.card_type
                                          )
                                        : false;
                                    return (
                                      <div
                                        key={i}
                                        className="template_item"
                                        onClick={() =>
                                          this.handleUseTemplate(
                                            type.name,
                                            template
                                          )
                                        }
                                      >
                                        <Icon
                                          icon={
                                            cardIcon ? cardIcon.icon : 'hashtag'
                                          }
                                          fontAwesome={!cardIcon}
                                          outlined={!!cardIcon}
                                          color={
                                            cardIcon
                                              ? cardIcon.defaultColor
                                              : '#9B51E0'
                                          }
                                          style={{ fontSize: '18px' }}
                                        />
                                        <div> {template.attributes.title} </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </>
                      {!hideOtherButton && (
                        <AddCardOrSubtopicMoreOptions
                          closeDropdown={() =>
                            this.setState({ visible: false })
                          }
                        />
                      )}
                    </Fragment>
                  )}
              </Fragment>
            )}
          </ul>
        )}
      </div>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);
  const { user, page, topics } = sm;
  const uiSettings = user.attributes.ui_settings;
  const myTopicsView = uiSettings.my_topics_view.find(
    view => view.id === page.topicId
  );

  // let allWorkspaceViews = getSortedFilteredTopicsByParentTopic(state)[0] || [];
  // const boardTemplates = allWorkspaceViews.filter(
  //   topic => topic.attributes.is_template == true
  // );

  const boardTemplates = workspaceTemplatesSelector(state, page.groupId);

  const cardTemplates = getCardArray(state).filter(
    card => card.attributes.is_template == true
  );

  return {
    boardTemplates,
    cardTemplates,
    topicId: page.topicId,
    topics,
    cardView: myTopicsView && myTopicsView
  };
};

const mapDispatch = {
  toggleSubtopicPanel,
  createTextCard: createCard,
  setShowChatModal,
  setEditCardModalOpen,
  setEditModalCardType,
  setCopyTopicModalOpen,
  setShowVideoRoomModal,
  copyAndOpenCard
};

export default connect(mapState, mapDispatch)(AddCardOrSubtopic);
