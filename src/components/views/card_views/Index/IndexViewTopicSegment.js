/* eslint-disable complexity */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';
import RevolvingToggleButton from 'Components/shared/buttons/RevolvingToggleButton';
import Icon from 'Components/shared/Icon';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import IndexViewCardsList from './IndexViewCardsList';
import TopicTitleLink from 'Components/shared/topics/elements/TopicTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import IconHex from 'Components/svg_icons/icon_hex';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import TopicActionsDropdown from 'Src/components/shared/topics/elements/TopicActionsDropdown';
import withDataManager from 'Src/dataManager/components/withDataManager';
import {
  dragItemTypes,
  GenericDragDropListing,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';

import { getSortedFilteredCardsByTopicWithoutDescendants } from 'Src/newRedux/database/cards/selectors';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import DMLoader from 'Src/dataManager/components/DMLoader';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { moveOrCopyTopicInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import AddViewBox from 'Src/components/shared/AddViewBox';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType } from 'Lib/utilities';
import { getRandomColor } from 'Src/utils/color';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import { AddCardButton } from 'Components/shared/buttons/index';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';

const WikiTopicDragPreview = ({ topic }) => (
  <div className="wiki-view_topic_drag-preview">
    <div className="wikilist-topic-segment_topic-title">
      {topic.attributes.title}
    </div>
  </div>
);

class IndexViewTopicSegment extends Component {
  static propTypes = {
    isTopLevelTopic: PropTypes.bool,
    active_design: PropTypes.object,
    topic: PropTypes.object,
    projectLens: PropTypes.bool
  };

  static defaultProps = {
    isTopLevelTopic: false
  };

  state = {
    isSegmentOpen: this.props.isTopLevelTopic,
    displayAddCard: false,
    displayAddSubtopic: false,
    topicNameEditMode: false,
    timeoutID: null,
    headerColor: '#9B51E0',
    handleAddCardToggle: () => {},
    isAddCardOrSubtopicDropdownOpen: false
  };

  componentDidMount() {
    this.setState({ headerColor: getRandomColor() });
  }

  handleAddCard = () => {
    this.state.handleAddCardToggle();
    this.setState({ displayAddCard: true, isSegmentOpen: true });
  };

  handleAddSubtopic = () =>
    this.setState({ displayAddSubtopic: true, isSegmentOpen: true });

  openSegmentOpenClose = () => {
    !this.state.isSegmentOpen && this.setState({ isSegmentOpen: true });
  };

  toggleSegmentOpenClose = () =>
    this.setState(prevState => ({ isSegmentOpen: !prevState.isSegmentOpen }));

  handleToggleTopicNameEditMode = () => {
    this.setState(state => ({ topicNameEditMode: !state.topicNameEditMode }));
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  getClickHandler = () => {
    const { timeoutID } = this.state;
    const { viewTopic, topic } = this.props;
    const delay = 250;
    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          viewTopic({ topicSlug: topic.attributes.slug });
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
      this.handleToggleTopicNameEditMode();
    }
  };

  render() {
    const {
      topic,
      cards,
      subtopics,
      isTopLevelTopic,
      moveOrCopyTopicInOrToTopicFromDragAndDrop,
      active_design: { card_font_color },
      projectLens,
      subtopicsArray,
      isTaskBoardsLens,
      isFileBoardsLens,
      isNoteBoardsLens,
      level = -1
    } = this.props;

    const {
      isSegmentOpen,
      displayAddCard,
      displayAddSubtopic,
      topicNameEditMode,
      addButtonClicked,
      headerColor,
      isAddCardOrSubtopicDropdownOpen
    } = this.state;

    const topicId = topic.id;
    const isCards = !!cards.length;
    const isSubtopics = !!subtopics.length;
    const isAddView = topic.id == 'for adding board' ? true : false;
    let isAddChat = false;
    let isAddVideo = false;
    if (projectLens) {
      isAddChat =
        !isAddView && topic.attributes?.default_view_id == 'CHAT'
          ? true
          : false;
      isAddVideo =
        !isAddView && topic.attributes?.default_view_id == 'VIDEO_CHAT'
          ? true
          : false;
    }

    return (
      <Fragment>
        {isTaskBoardsLens && isTopLevelTopic && (
          <div
            className="notch"
            style={{
              background:
                isTaskBoardsLens && isTopLevelTopic && !isAddView && headerColor
            }}
          >
            {isFileBoardsLens && (
              <svg
                width="259"
                height="56"
                viewBox="0 0 259 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M111 20C111 8.95432 119.954 0 131 0H186.62C193.159 0 199.284 3.1959 203.025 8.55866L223.287 37.6097C225.071 40.1678 227.428 42.2731 230.171 43.7576L241.285 49.7725C241.431 49.8513 241.583 49.9183 241.739 49.9729V49.9729C245.035 51.124 244.209 56 240.717 56H131C119.954 56 111 47.0457 111 36V30.7815V20Z"
                  fill={
                    (isTaskBoardsLens &&
                      isTopLevelTopic &&
                      !isAddView &&
                      headerColor) ||
                    '#fafafa'
                  }
                />
                <path
                  d="M148 20C148 8.95432 139.046 0 128 0H72.3796C65.8413 0 59.7158 3.1959 55.9755 8.55866L35.7134 37.6097C33.9292 40.1678 31.5715 42.2731 28.8286 43.7576L17.7147 49.7725C17.5691 49.8513 17.4174 49.9183 17.2611 49.9729V49.9729C13.9646 51.124 14.7914 56 18.2831 56H128C139.046 56 148 47.0457 148 36V30.7815V20Z"
                  fill={
                    (isTaskBoardsLens &&
                      isTopLevelTopic &&
                      !isAddView &&
                      headerColor) ||
                    '#fafafa'
                  }
                />
              </svg>
            )}

            <div></div>
          </div>
        )}
        <div
          className={
            projectLens &&
            `project-lens__topicSegment ${isAddView && 'add_view'}`
          }
          style={{
            background:
              isNoteBoardsLens && isTopLevelTopic && !isAddView && headerColor
          }}
        >
          {!isAddView ? (
            <Fragment>
              <div
                className={cx('index-view__topic-title-wrapper flex-r-center')}
                style={{
                  marginLeft: level > 0 && level * 10,
                  background: isTaskBoardsLens && isTopLevelTopic && headerColor
                }}
              >
                {!projectLens && (
                  <GenericDropZone
                    dropsDisabled={true}
                    itemType={[dragItemTypes.CARD, dragItemTypes.TOPIC]}
                    onDragEnter={this.openSegmentOpenClose}
                  >
                    <IconButton
                      color={isTaskBoardsLens && '#292b2d'}
                      fontAwesome
                      icon={isSegmentOpen ? 'caret-down' : 'caret-right'}
                      onClick={this.toggleSegmentOpenClose}
                      containerClasses="index-view-topic-caret"
                    />
                  </GenericDropZone>
                )}

                <Icon
                  additionalClasses={`indexview-topic-segment_topic-icon ${isTaskBoardsLens &&
                    isTopLevelTopic &&
                    'white-color'}`}
                  icon={getBoardTypeAttributes(getBoardType(topic)).icon}
                  fontAwesome={
                    getBoardTypeAttributes(getBoardType(topic)).fontAwesome
                  }
                  outlined={
                    getBoardTypeAttributes(getBoardType(topic)).outlined
                  }
                  color={
                    isTaskBoardsLens
                      ? getBoardTypeAttributes(getBoardType(topic)).color
                      : card_font_color ||
                        getBoardTypeAttributes(getBoardType(topic)).color
                  }
                  style={{
                    fontSize:
                      getBoardTypeAttributes(getBoardType(topic)).icon ===
                      'hashtag'
                        ? 14
                        : 16
                  }}
                />

                {topicNameEditMode ? (
                  <TopicTitleEditor
                    topic={topic}
                    onFinishEditing={this.handleToggleTopicNameEditMode}
                  />
                ) : (
                  <TopicTitleLink
                    additionalClasses={`wiki-card_title ${isTaskBoardsLens &&
                      isTopLevelTopic &&
                      'white-color'}`}
                    topic={topic}
                    onClick={this.getClickHandler}
                    color={card_font_color}
                    truncate={!isNoteBoardsLens || !isTopLevelTopic}
                  />
                )}

                <div
                  className={`index-view__topic-buttons`}
                  style={{
                    visibility: isAddCardOrSubtopicDropdownOpen && 'visible'
                  }}
                >
                  <TopicActionsDropdown
                    topic={topic}
                    onRenameTopicSelected={this.handleToggleTopicNameEditMode}
                  />

                  {isTopLevelTopic ? (
                    <AddCardOrSubtopic
                      additionalClasses="index-view-add-button"
                      color={
                        (!isTaskBoardsLens && card_font_color) || '#999999'
                      }
                      className={'pt6'}
                      topic={topic}
                      displayAddCardButton
                      displayAddSubtopicButton
                      displayUploadFileButton={isFileBoardsLens}
                      getIsOpen={isOpen =>
                        this.setState({
                          isAddCardOrSubtopicDropdownOpen: isOpen
                        })
                      }
                      transparent={false}
                      cardTypeFilter={
                        isNoteBoardsLens
                          ? ['NOTES']
                          : isFileBoardsLens
                          ? ['']
                          : isTaskBoardsLens && ['TASK']
                      }
                      boardTypeFilter={
                        isNoteBoardsLens
                          ? ['notes']
                          : isFileBoardsLens
                          ? ['file']
                          : isTaskBoardsLens && ['task']
                      }
                    />
                  ) : (
                    <OptionsDropdownButton
                      icon="add"
                      style={{ marginTop: 1.5 }}
                    >
                      {isFileBoardsLens ? (
                        <AddCardButton
                          className="dropdown-option-item add-file-upload-btn"
                          openFileUploader
                          topicId={topicId}
                          buttonText={'Upload File'}
                          instantUpload
                          style={{ fontSize: 14 }}
                        />
                      ) : (
                        <a
                          className="dropdown-option-item"
                          onClick={this.handleAddCard}
                        >
                          {isAddChat
                            ? 'Add Chat'
                            : isAddVideo
                            ? 'Add Video Chat'
                            : 'Add Card'}
                        </a>
                      )}
                      <a
                        className="dropdown-option-item"
                        onClick={this.handleAddSubtopic}
                      >
                        Add Board
                      </a>
                    </OptionsDropdownButton>
                  )}
                </div>
              </div>

              {isSegmentOpen && (
                <div className="item-wrapper">
                  {' '}
                  {/* className={cx('index-view__list', { open: isSegmentOpen })} */}
                  <IndexViewCardsList
                    displayAddCard={displayAddCard}
                    setDisplayAddCard={toggle =>
                      this.setState({ displayAddCard: toggle })
                    }
                    topic={topic}
                    className={`${
                      projectLens ? 'ml1' : level < 0 ? 'ml21' : 'ml10'
                    }`}
                    cards={
                      isFileBoardsLens
                        ? cards.filter(
                            card => card.attributes.attachments.length > 0
                          )
                        : cards
                    }
                    projectLens={projectLens}
                    isAddChat={isAddChat}
                    isAddVideo={isAddVideo}
                    cardFontColor={card_font_color}
                    level={level + 1}
                    isTaskBoardsLens={isTaskBoardsLens}
                    isTopLevelTopic={isTopLevelTopic}
                    isFileBoardsLens={isFileBoardsLens}
                    isNoteBoardsLens={isNoteBoardsLens}
                  />
                  <GenericDragDropListing
                    dragClassName="task-view_drag-card"
                    draggedItemProps={{
                      origin: { topicId: topicId ? topicId : '0' }
                    }}
                    dragPreview={subtopic => (
                      <WikiTopicDragPreview topic={subtopic} />
                    )}
                    dropClassName={`wiki-list_topic-dropzone ${
                      projectLens ? 'ml6' : level < 0 ? 'ml25' : 'ml15'
                    }`}
                    dropZoneProps={{ topicId: topicId ? topicId : '0' }}
                    itemContainerClassName="wiki-view_card-container"
                    itemList={subtopics}
                    itemType={dragItemTypes.TOPIC_LEFT_MENU}
                    onDropItem={moveOrCopyTopicInOrToTopicFromDragAndDrop}
                    parentListDragLeaveHandlers={
                      this.props.dragLeaveHandlersForParentLists
                    }
                    renderItem={(listTopic, parentDragLeaveHandlers) => (
                      <IndexViewTopicSegmentConnected
                        topic={listTopic}
                        dragLeaveHandlersForParentLists={
                          parentDragLeaveHandlers
                        }
                        level={level + 1}
                        isTaskBoardsLens={isTaskBoardsLens}
                        isNoteBoardsLens={isNoteBoardsLens}
                      />
                    )}
                  >
                    {!projectLens &&
                      !isTaskBoardsLens &&
                      !isSubtopics &&
                      !displayAddSubtopic &&
                      !isCards && (
                        <div
                          className="index-view__no-items-label"
                          style={{ color: card_font_color }}
                        >
                          No Boards
                        </div>
                      )}
                  </GenericDragDropListing>
                  <div className="wiki-list_topic-dropzone">
                    {(((projectLens || isTaskBoardsLens) && isTopLevelTopic) ||
                      displayAddCard) && (
                      <AddCardCard
                        selectedCardType={this.state.cardType}
                        cardClassName="wiki-card"
                        cardStyle={{
                          marginLeft: !isTaskBoardsLens && '15px',
                          width: !isTaskBoardsLens && '95%'
                        }}
                        inInputMode={displayAddCard}
                        onDismiss={() =>
                          this.setState({ displayAddCard: false })
                        }
                        getHandleToggle={handleToggle =>
                          this.setState({ handleAddCardToggle: handleToggle })
                        }
                        topicId={topicId}
                        newCardAttributes={
                          isAddChat
                            ? { is_chat: true }
                            : isAddVideo
                            ? { is_video_chat: true }
                            : null
                        }
                        topMenu={true}
                        transparent={isNoteBoardsLens || !isTaskBoardsLens}
                        uploadFileForm={isFileBoardsLens}
                      />
                    )}

                    {// !isSubtopics &&
                    !displayAddSubtopic &&
                      // !isCards &&
                      (projectLens || isTaskBoardsLens) &&
                      isTopLevelTopic && (
                        <div
                          onClick={this.handleAddSubtopic}
                          className="wiki-card add-board-button"
                        >
                          <span>+ Add Board</span>
                        </div>
                      )}
                    {displayAddSubtopic && (
                      <AddSubtopicCard
                        cardStyle={{ width: '90%', margiLeft: '-5px' }}
                        topicClassName="wiki-card"
                        inInputMode={true}
                        tag={getBoardType(topic)}
                        onDismiss={() =>
                          this.setState({ displayAddSubtopic: false })
                        }
                        parentTopicId={topicId}
                        transparent={isNoteBoardsLens || !isTaskBoardsLens}
                        card_font_color={isNoteBoardsLens && '#ffffff'}
                      />
                    )}
                    {projectLens && !isTaskBoardsLens && (
                      <div style={{ margin: '0 10px' }}>
                        <hr />
                        <hr />
                        <hr />
                      </div>
                    )}
                  </div>
                  {topicId && (
                    <DMLoader
                      dataRequirements={{
                        cardsWithAttributes: { attributes: { topicId } },
                        subtopicsForTopic: { topicId }
                      }}
                      loaderKey="cardsWithAttributes"
                    />
                  )}
                </div>
              )}
            </Fragment>
          ) : (
            <div className="project-add_view">
              <AddViewBox autoFocus cardFontColor={card_font_color} />
            </div>
          )}
        </div>
        {isAddView && subtopicsArray && subtopicsArray.length === 1 && (
          <p style={{ marginTop: '2rem', fontSize: '1.5rem' }}>
            Add a board for tasks, notes, files, sub projects or anything else
            you need to get organised.
          </p>
        )}
      </Fragment>
    );
  }
}

const mapState = (state, { topic }) => {
  const {
    utilities: { active_design },
    topics,
    page: { topicId }
  } = stateMappings(state);

  const topic_Id = topic ? topic.id : '0';

  const parentTopic = topics[topicId];

  return {
    // cards: topic_Id
    //   ? getSortedFilteredCardsByTopicWithoutDescendants(state)[topic_Id] || []
    //   : [],
    cards: topic_Id ? getSortedFilteredCardsByTopic(state)[topic_Id] || [] : [],
    subtopics: topic_Id
      ? getSortedFilteredTopicsByParentTopic(state)[topic_Id] || []
      : [],
    active_design,
    parentTopic
  };
};

const mapDispatch = {
  moveOrCopyTopicInOrToTopicFromDragAndDrop,
  viewTopic
};

const IndexViewTopicSegmentConnected = connect(
  mapState,
  mapDispatch
)(IndexViewTopicSegment);

export default IndexViewTopicSegmentConnected;
