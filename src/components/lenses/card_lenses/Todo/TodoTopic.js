import React, { Component, Fragment } from 'react';
import { array, func, object, string, bool } from 'prop-types';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import { dragItemTypes } from 'Components/shared/drag_and_drop/_index';
import IconButton from 'Components/shared/buttons/IconButton';
import TopicTitleLink from 'Src/components/shared/topics/elements/TopicTitleLink';
import Ability from 'Lib/ability';
import TopicTitleEditor from 'Src/components/shared/topics/elements/TopicTitleEditor';
import TopicActionsDropdown from 'Components/shared/topics/elements/TopicActionsDropdown';
import { moveTopicContents } from 'Src/newRedux/database/topics/thunks';
import { getSortedFilteredTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import { connect } from 'react-redux';
import AddCardOrSubtopic from 'Components/shared/assemblies/AddCardOrSubtopic';
import DMLoader from 'Src/dataManager/components/DMLoader';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import TodoCard from './TodoCard';
import { moveOrCopyCardInOrToTopicFromDragAndDrop as moveOrCopyCardInOrToTopicFromDragAndDropTodoTopic } from 'Src/newRedux/database/cards/abstractions';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSortedFilteredCardsByTopic } from 'Src/newRedux/database/cards/selectors';
import { createSelector } from 'reselect';
import { todoPeriods } from './todoConfig';
import moment from 'moment';
import Icon from 'Components/shared/Icon';
import { viewTopic } from 'Src/newRedux/database/topics/thunks';
import { getBoardTypeAttributes } from 'Src/utils/icons';
import { getBoardType } from 'Lib/utilities';

class TodoTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      cards: this.props.cards,
      showAddTopic: false,
      timeoutID: null
    };
  }

  static propTypes = {
    color: string,
    topic: object.isRequired,
    onTopicExpand: func.isRequired,
    expandedTopics: object,
    moveOrCopyCardInOrToTopicFromDragAndDrop: func,
    onAddCardOrSubtopic: func.isRequired,
    cards: array,
    subtopics: array,
    isParentExpanded: bool
  };

  handleToggleEditMode = () => {
    this.setState(prevState => {
      return {
        isEditing: !prevState.isEditing
      };
    });
  };

  handleShowAddTopic = () => {
    this.setState(prevState => {
      return {
        showAddTopic: !prevState.showAddTopic
      };
    });
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
    }
  };

  render() {
    const {
      color,
      topic,
      cards,
      onTopicExpand,
      expandedTopics,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      cardRequirements,
      onAddCardOrSubtopic,
      selectedTimePeriod,
      subtopics,
      moveOrCopyCardInOrToTopicFromDragAndDropTodoTopic,
      isParentExpanded,
      cardTypeFilter,
      boardTags,
      includeSubtopics
    } = this.props;
    const { showAddTopic } = this.state;
    const userCanEdit = Ability.can('update', 'self', topic);
    const isExpanded = expandedTopics[topic.id];

    return (
      <GenericDropZone
        dropsDisabled
        itemType={[dragItemTypes.CARD]}
        onDragEnter={() => onTopicExpand(topic.id)}
      >
        <div
          className={`todo-card ${
            isParentExpanded ? 'todo-card--top-border' : ''
          }`}
          style={{
            paddingLeft: isParentExpanded && '20px',
            paddingRight: isParentExpanded && 0,
            borderColor: color
          }}
        >
          <div
            className={
              isExpanded && cards.length != 0
                ? 'todo-card__wrapper todo-card__wrapper--expanded'
                : 'todo-card__wrapper'
            }
          >
            <GenericDropZone
              dropClassName=""
              onDragStart={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              itemType={dragItemTypes.TOPIC}
              onDrop={this.handleDrop}
              key="nest-zone"
            >
              <div className="nest-zone">
                <IconButton
                  additionalClasses="todo-card__nested-cards-caret dark-grey-icon-button"
                  fontAwesome
                  icon={isExpanded ? 'caret-down' : 'caret-right'}
                  color={color}
                  onClick={() => onTopicExpand(topic.id)}
                />
              </div>
            </GenericDropZone>
            <div className="todo-card_title-container">
              {this.state.isEditing ? (
                <TopicTitleEditor
                  topic={topic}
                  onFinishEditing={this.handleToggleEditMode}
                />
              ) : (
                <Fragment>
                  <div className="card-title">
                    <Icon
                      color={
                        color ||
                        getBoardTypeAttributes(getBoardType(topic)).color
                      }
                      icon={getBoardTypeAttributes(getBoardType(topic)).icon}
                      outlined={
                        getBoardTypeAttributes(getBoardType(topic)).outlined
                      }
                      fontAwesome={
                        getBoardTypeAttributes(getBoardType(topic)).fontAwesome
                      }
                      containerClasses="mr5"
                    />
                    <TopicTitleLink
                      cardTitleClass={false}
                      additionalClasses="bold80"
                      topic={topic}
                      color={color}
                      onClick={this.getClickHandler}
                    />
                  </div>
                  <span className="todo-card_title-edit-button">
                    {userCanEdit && (
                      <IconButton
                        fontAwesome
                        icon="pencil"
                        onClick={this.handleToggleEditMode}
                        color={color}
                      />
                    )}
                  </span>
                  {/* <span
                    className="todo-card_title-edit-button"
                    style={showAddTopic ? { display: 'initial' } : null}
                    onClick={this.handleShowAddTopic}
                  > */}
                  <AddCardOrSubtopic
                    color={color}
                    displayAddCardButton
                    displayAddSubtopicButton
                    addBothText=" "
                    topic={topic}
                    handleAddCardOrSubtopic={onAddCardOrSubtopic}
                    additionalClasses="todo-card_title-edit-button add-card-or-subtopic-button"
                  />
                  {/* </span> */}
                  <span className="todo-card_title-edit-button">
                    <TopicActionsDropdown
                      color={color}
                      topic={topic}
                      onRenameTopicSelected={this.handleToggleEditMode}
                    />
                  </span>
                </Fragment>
              )}
            </div>
          </div>
          {isExpanded && (
            <Fragment>
              <GenericDragDropListing
                itemList={timePeriodFilter(cards, selectedTimePeriod)}
                dropClassName="todo-view_card-list"
                dragClassName="task-view_drag-card"
                dragPreview={card => (
                  <div style={{ padding: '10px' }}>{card.attributes.title}</div>
                )}
                dropZoneProps={{ topicId: topic ? topic.id : null }}
                draggedItemProps={{
                  origin: { topicId: topic ? topic.id : null }
                }}
                itemType={dragItemTypes.CARD}
                onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
                renderItem={card => (
                  <TodoCard
                    isParentExpanded={isExpanded}
                    color={color}
                    card={card}
                    topicId={topic ? topic.id : null}
                  />
                )}
              >
                {/* render children even if cards = 0, to fix drop cards to empty board issue */}
                {cards.length == 0 && <span style={{ height: 1 }}>&nbsp;</span>}

                <DMLoader
                  dataRequirements={{
                    cardsWithAttributes: {
                      attributes: {
                        ...cardRequirements,
                        topicId: topic?.id,
                        cardTypes: cardTypeFilter,
                        includeSubtopics
                      }
                    },
                    subtopicsForTopic: { topicId: topic.id }
                  }}
                  loaderKey="cardsWithAttributes"
                />
              </GenericDragDropListing>
              <GenericDragDropListing
                itemList={subtopics}
                dropClassName="todo-view_card-list"
                dragClassName="task-view_drag-card"
                dragPreview={subtopic => (
                  <div style={{ padding: '10px' }}>
                    {subtopic.attributes.title}
                  </div>
                )}
                dropZoneProps={{ topicId: topic ? topic.id : null }}
                draggedItemProps={{
                  origin: { topicId: topic ? topic.id : null }
                }}
                itemType={dragItemTypes.TOPIC}
                onDropItem={moveOrCopyCardInOrToTopicFromDragAndDropTodoTopic}
                renderItem={subtopic => (
                  <ConnectedTodoTopic
                    isParentExpanded={isExpanded}
                    color={color}
                    topic={subtopic}
                    onTopicExpand={onTopicExpand}
                    expandedTopics={expandedTopics}
                    moveOrCopyCardInOrToTopicFromDragAndDrop={
                      moveOrCopyCardInOrToTopicFromDragAndDropTodoTopic
                    }
                    cardRequirements={cardRequirements}
                    onAddCardOrSubtopic={onAddCardOrSubtopic}
                    selectedTimePeriod={selectedTimePeriod}
                    cardTypeFilter={cardTypeFilter}
                    boardTags={boardTags}
                    includeSubtopics={includeSubtopics}
                  />
                )}
              >
                <DMLoader
                  dataRequirements={{
                    topicsWithAttributes: {
                      attributes: {
                        parentTopicId: topic?.id,
                        tagged: boardTags
                      }
                    }
                  }}
                  loaderKey="topicsWithAttributes"
                />
              </GenericDragDropListing>
            </Fragment>
          )}
        </div>
      </GenericDropZone>
    );
  }
}

const timePeriodFilter = createSelector(
  (cards, timePeriod) => todoPeriods[timePeriod],
  (cards, timePeriod) => cards,
  (timePeriod, cards) =>
    cards.filter(card =>
      timePeriod.key == 'ALL'
        ? true
        : timePeriod.startOfPeriod
        ? card.attributes.due_date &&
          moment(card.attributes.due_date).isBetween(
            timePeriod.startOfPeriod,
            timePeriod.endOfPeriod,
            null,
            '[]'
          )
        : !card.attributes.due_date
    )
);

const mapState = (state, props) => {
  const sm = stateMappings(state);
  const topicId = props.topic ? props.topic.id : '0';
  const topic = sm.topics[topicId];
  let cards = getSortedFilteredCardsByTopic(state)[topicId] || [];
  const subtopics = getSortedFilteredTopicsByParentTopic(state)[topicId] || [];

  // state.topic = props.topic;
  // return state;
  return {
    topic: topic,
    cards,
    subtopics
  };
};

const mapDispatch = {
  moveTopicContents,
  viewTopic,
  moveOrCopyCardInOrToTopicFromDragAndDropTodoTopic
};

const ConnectedTodoTopic = connect(mapState, mapDispatch)(TodoTopic);

export default ConnectedTodoTopic;
