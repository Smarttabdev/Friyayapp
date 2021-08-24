import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import AddCardCard from 'Components/shared/cards/AddCardCard';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import DMLoader from 'Src/dataManager/components/DMLoader';
import IconButton from 'Components/shared/buttons/IconButton';
import Icon from 'Components/shared/Icon';
import OptionsDropdownButton from 'Components/shared/buttons/OptionsDropdownButton';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import TopicActionsDropdown from 'Src/components/shared/topics/elements/TopicActionsDropdown';
import WikiCard from './WikiCard';

import {
  dragItemTypes,
  GenericDragDropListing,
  GenericDropZone
} from 'Components/shared/drag_and_drop/_index';
import { getSortedFilteredSearchedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { moveOrCopyTopicInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType } from 'Lib/utilities';

const WikiTopicDragPreview = ({ topic }) => (
  <div className="wiki-view_topic_drag-preview">
    <div className="wikilist-topic-segment_topic-title">
      {topic.attributes.title}
    </div>
  </div>
);

class WikiViewTopicSegment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAddCard: false,
      displayAddSubtopic: false,
      sectionIsOpen: props.hideHeader,
      topicNameEditMode: false,
      topicTitle: '',
      timeoutID: null,
      selectedTopics: [],
      selectedTopicId: {}
    };

    this.viewTopic = props.viewTopic;
  }

  handleAddCard = () => {
    this.setState({ displayAddCard: true, sectionIsOpen: true });
  };

  handleAddSubtopic = () => {
    this.setState({ displayAddSubtopic: true, sectionIsOpen: true });
  };

  handleToggleTopicNameEditMode = () => {
    this.setState(state => ({
      topicNameEditMode: !state.topicNameEditMode,
      topicTitle: this.props.topic.attributes.title
    }));
  };

  handleToggleSectionOpen = open => {
    this.setState(state => ({ sectionIsOpen: open }));
  };

  handleTimeoutIDChange = timeoutID => {
    this.setState({ timeoutID });
  };

  topicClickHandler = () => {
    const { timeoutID } = this.state;
    const delay = 250;
    if (!timeoutID) {
      this.handleTimeoutIDChange(
        window.setTimeout(() => {
          this.viewTopic({ topicSlug: this.props.topic.attributes.slug });
          this.handleTimeoutIDChange(null);
        }, delay)
      );
    } else {
      this.handleTimeoutIDChange(window.clearTimeout(timeoutID));
      this.handleToggleTopicNameEditMode();
    }
  };

  renderWikiCard = (card, dragLeaveHandlers = []) => {
    const { onSelectCard, selectedCardId, topic, color } = this.props;
    return (
      <WikiCard
        card={card}
        dragLeaveHandlersForParentLists={dragLeaveHandlers}
        isSelected={card.id == selectedCardId}
        key={card.id}
        onSelectCard={this.props.onSelectCard}
        renderCard={(card, parentDragLeaveHandlers) =>
          this.renderWikiCard(card, parentDragLeaveHandlers)
        }
        color={color}
        topicId={topic ? topic.id : null}
      />
    );
  };

  onInputBlur = () => {
    setTimeout(() => {
      if (this.state.selectedTopics.length !== 0) {
        this.setState({ hideTopicSelector: true });
      }
    });
  };

  onInputFocus = () => {
    setTimeout(() => {
      this.setState({
        hideTopicSelector: false
      });
    });
  };

  handleTopicSelected = list => {
    setTimeout(() => {
      this.setState({
        selectedTopicId: list[list.length - 1].value,
        selectedTopics: list
      });
    });
  };

  handleAfterCardCreated = cardId => {
    this.props.onSelectCard(cardId);
    this.setState({
      selectedTopics: [],
      hideTopicSelector: false,
      showTopicDropdown: false
    });
  };

  render() {
    const {
      cards,
      children,
      dragLeaveHandlersForParentLists,
      hideHeader,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      moveOrCopyTopicInOrToTopicFromDragAndDrop,
      onSelectCard,
      renderSubtopicSection,
      subtopics,
      topic,
      viewTopic,
      isRoot,
      color,
      parentTopic,
      togglePickBoard
    } = this.props;
    const {
      displayAddCard,
      displayAddSubtopic,
      sectionIsOpen,
      topicNameEditMode,
      topicTitle,
      selectedTopicId,
      hideTopicSelector,
      showTopicDropdown,
      selectedTopics
    } = this.state;
    const topicId = topic ? topic.id : null;

    return (
      <div className="wikilist-topic-segment">
        {!hideHeader && (
          <div className="wikilist-topic-segment_title-container">
            <GenericDropZone
              dropsDisabled={true}
              itemType={[dragItemTypes.CARD, dragItemTypes.TOPIC]}
              onDragEnter={() => this.handleToggleSectionOpen(true)}
            >
              <IconButton
                fontAwesome
                color={color}
                icon={`${sectionIsOpen ? 'caret-down' : 'caret-right'}`}
                onClick={() => this.handleToggleSectionOpen(!sectionIsOpen)}
              />
            </GenericDropZone>

            <div className="wikilist-topic-segment_topic-title">
              {topicNameEditMode ? (
                <TopicTitleEditor
                  topic={topic}
                  onFinishEditing={this.handleToggleTopicNameEditMode}
                />
              ) : (
                <Fragment>
                  <Icon
                    icon={getBoardTypeAttributes(getBoardType(topic)).icon}
                    color={
                      color || getBoardTypeAttributes(getBoardType(topic)).color
                    }
                    additionalClasses="wikilist-topic-segment_topic-icon wiki-left-board-icon"
                    fontAwesome={
                      getBoardTypeAttributes(getBoardType(topic)).fontAwesome
                    }
                    outlined={
                      getBoardTypeAttributes(getBoardType(topic)).outlined
                    }
                    fontSize={
                      getBoardTypeAttributes(getBoardType(topic)).icon ===
                        'hashtag' && 16
                    }
                  />
                  <a
                    className="wikilist-topic-segment_title flex-1 ml7"
                    onClick={this.topicClickHandler}
                  >
                    {topic.attributes.title}
                  </a>
                  <div className="wikilist-topic-segment_buttons">
                    <TopicActionsDropdown
                      color={color}
                      topic={topic}
                      onRenameTopicSelected={this.handleToggleTopicNameEditMode}
                    />
                    <OptionsDropdownButton color={color} icon="add">
                      <a
                        className="dropdown-option-item"
                        onClick={this.handleAddCard}
                      >
                        Add Card
                      </a>
                      <a
                        className="dropdown-option-item"
                        onClick={this.handleAddSubtopic}
                      >
                        Add Board
                      </a>
                    </OptionsDropdownButton>
                  </div>
                </Fragment>
              )}
            </div>
          </div>
        )}

        <div
          className={`wikilist-topic-segment_topic-content ${sectionIsOpen &&
            'is-presented'}`}
          style={{ marginLeft: sectionIsOpen && 13 }}
        >
          {sectionIsOpen && (
            <Fragment>
              {topic && (
                <GenericDragDropListing
                  dragClassName="task-view_drag-card"
                  draggedItemProps={{ origin: { topicId: topicId } }}
                  dropClassName="wiki-list_topic-dropzone"
                  dropZoneProps={{ topicId: topicId }}
                  itemList={cards}
                  itemType={dragItemTypes.CARD}
                  onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
                  renderItem={this.renderWikiCard}
                >
                  <p>{isRoot}</p>
                  {cards.length == 0 &&
                    !displayAddCard &&
                    (isRoot ? subtopics.length === 0 : true) && (
                      <div className="wiki-list-no-items-label">No Cards</div>
                    )}
                </GenericDragDropListing>
              )}
              <GenericDragDropListing
                dragClassName="task-view_drag-card"
                draggedItemProps={{
                  origin: { topicId: topicId ? topicId : '0' }
                }}
                dragPreview={subtopic => (
                  <WikiTopicDragPreview topic={subtopic} />
                )}
                dropClassName="wiki-list_topic-dropzone mt-10"
                dropZoneProps={{ topicId: topicId ? topicId : '0' }}
                itemContainerClassName="wiki-view_card-container"
                itemList={subtopics}
                itemType={dragItemTypes.TOPIC_LEFT_MENU}
                onDropItem={moveOrCopyTopicInOrToTopicFromDragAndDrop}
                parentListDragLeaveHandlers={
                  this.props.dragLeaveHandlersForParentLists
                }
                renderItem={renderSubtopicSection}
              />

              {topic && (
                <DMLoader
                  dataRequirements={{
                    cardsWithAttributes: { attributes: { topicId: topicId } },
                    subtopicsForTopic: { topicId: topicId }
                  }}
                  loaderKey="cardsWithAttributes"
                />
              )}
              {displayAddCard ? (
                parentTopic == null || parentTopic == undefined ? (
                  <div>
                    <AddCardCard
                      afterCardCreated={cardId =>
                        this.handleAfterCardCreated(cardId)
                      }
                      cardClassName="wiki-card"
                      inInputMode={true}
                      onDismiss={() => this.setState({ displayAddCard: false })}
                      topicId={selectedTopicId}
                      topMenu
                    />
                    {showTopicDropdown ? (
                      <TopicsListDropdown
                        additionalClasses="invite-form-dropdown-menu"
                        actionButtonLabel="Share selected Boards"
                        actionButtonHandler={() => {
                          return false;
                        }}
                        actionButtonClass="btn-primary"
                        path={null}
                        startAt={null}
                        hideHeader
                        inputMode="list"
                        disallowCreate
                        multiple={false}
                        hideAddTopicLink
                        hideTopicSelector={hideTopicSelector}
                        skipConfirmation
                        onInputBlur={this.onInputBlur}
                        onInputFocus={this.onInputFocus}
                        domain={window.currentDomain}
                        onSelectTopic={list => this.handleTopicSelected(list)}
                        selectedTopics={selectedTopics}
                      />
                    ) : (
                      <div
                        onClick={() =>
                          this.setState({
                            showTopicDropdown: !this.state.showTopicDropdown
                          })
                        }
                        className="selectView"
                      >
                        Select Board
                      </div>
                    )}
                  </div>
                ) : (
                  <AddCardCard
                    afterCardCreated={cardId => onSelectCard(cardId)}
                    cardClassName="wiki-card"
                    inInputMode={true}
                    onDismiss={() => this.setState({ displayAddCard: false })}
                    topicId={topicId}
                    transparent
                    topMenu
                  />
                )
              ) : (
                isRoot && (
                  <a
                    style={{ color }}
                    className="dropdown-option-item"
                    onClick={this.handleAddCard}
                  >
                    + Add Card
                  </a>
                )
              )}

              {displayAddSubtopic ? (
                <AddSubtopicCard
                  topicClassName="wiki-card"
                  inInputMode={true}
                  onDismiss={() => this.setState({ displayAddSubtopic: false })}
                  parentTopicId={topicId}
                  transparent
                />
              ) : (
                isRoot && (
                  <div className="flex flex-r-center">
                    <a
                      style={{ color }}
                      className="dropdown-option-item"
                      onClick={this.handleAddSubtopic}
                    >
                      + Add Board
                    </a>
                    <a
                      className="pick-a-board font-size-12 ml20"
                      onClick={togglePickBoard}
                    >
                      Pick a board
                    </a>
                  </div>
                )
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const { topicId } = sm.page;
  const topic_Id = props.topic ? props.topic.id : '0';
  return {
    cards: topic_Id ? getSortedFilteredCardsByTopic(state)[topic_Id] || [] : [],
    subtopics: topic_Id
      ? getSortedFilteredSearchedTopicsByParentTopic(state)[topic_Id] || []
      : [],
    parentTopic: sm.topics[topicId]
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  moveOrCopyTopicInOrToTopicFromDragAndDrop,
  viewTopic
};

export default connect(mapState, mapDispatch)(WikiViewTopicSegment);
