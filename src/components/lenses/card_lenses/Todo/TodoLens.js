import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { arrayOf, func, object, string, array } from 'prop-types';
import { failure } from 'Utils/toast';
import { createSelector } from 'reselect';
import Ability from 'Lib/ability';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { todoPeriods } from './todoConfig';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import DMLoader from 'Src/dataManager/components/DMLoader';
import ActiveFiltersPanel from 'Components/shared/filters/ActiveFiltersPanel';
import TodoCard from './TodoCard';
import TodoTopic from './TodoTopic';
const todoTabs = Object.values(todoPeriods);
import AddCardCard from 'Components/shared/cards/AddCardCard';
import AddSubtopicCard from 'Components/shared/topics/AddSubtopicCard';
import { scrollToShow } from 'Src/lib/utilities';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getSortedFilteredTopicsByParentTopicForTopic } from 'Src/newRedux/database/topics/selectors';
import { getSortedFilteredSearchedTopicsByParentTopic } from 'Src/newRedux/database/topics/selectors';
import LeftMenuNewTopicInput from 'Src/components/menus/left/elements/LeftMenuNewTopicInput';
import TopicsListDropdown from 'Components/shared/topics_list_dropdown';
import GroupByDropDown from 'Components/shared/assemblies/GroupByDropDown';
import { getUiSettings } from 'Src/helpers/user_config';
import { getFilterSettings } from 'Src/helpers/user_config';
import { boardTypes } from 'Components/shared/CardAndBoardTypes';

class TodoLens extends Component {
  constructor(props) {
    super(props);
    this.viewDropdownRef = React.createRef();
    this.state = {
      selectedTimePeriod: 'ALL',
      inInputMode: false,
      expandedTopics: {},
      isExpanded: false,
      selectedTopics: [],
      selectedTopicId: {},
      multipleTopicsId: [],
      showTopicDropdown: true,
      showTodoMessage: true
    };
  }

  static propTypes = {
    cards: arrayOf(object),
    moveOrCopyCardInOrToTopicFromDragAndDrop: func.isRequired,
    updateCard: func.isRequired,
    hideMessageUsersArray: array,
    appUser: object
  };

  handleDropCardOnNewTimeFrame = ({
    draggedItemProps: { item },
    dropZoneProps
  }) => {
    if (Ability.can('update', 'self', item)) {
      const newDueDate = todoPeriods[dropZoneProps.timePeriodKey].endOfPeriod
        ? moment(todoPeriods[dropZoneProps.timePeriodKey].endOfPeriod)
            .subtract(1, 'hours')
            .toISOString()
        : null;
      const newStartDate =
        item.attributes.start_date &&
        moment(newDueDate).isAfter(moment(item.attributes.start_date))
          ? item.attributes.start_date
          : moment(
              todoPeriods[dropZoneProps.timePeriodKey].startOfPeriod
            ).toISOString();
      const attributes = {
        due_date: newDueDate,
        start_date: newStartDate
      };
      this.props.updateCard({ id: item.id, attributes });
    } else {
      failure("You don't have permission to move that card!");
    }
  };

  handleSelectTimePeriod = key => {
    this.setState({ selectedTimePeriod: key });
  };

  handleToggleInputMode = () => {
    this.setState(state => ({ inInputMode: !state.inInputMode }));
  };

  afterCardCreated = cardId => {
    if (this.props.cardsSplitScreen) {
      this.props.updateSelectedCard(cardId);
    }
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
    this.setState({
      showAddCard: false,
      selectedTopics: [],
      hideTopicSelector: false
    });
  };

  handleTopicExpand = topicId => {
    this.setState({
      expandedTopics: {
        ...this.state.expandedTopics,
        [topicId]: !this.state.expandedTopics[topicId]
      }
    });
  };

  handleAddCardOrSubtopic = (topicId, mode) => {
    this.setState({
      addCardOrSubtopic: { topicId, mode },
      expandedTopics: { ...this.state.expandedTopics, [topicId]: true }
    });
  };

  toggleSelectView = () => {
    setTimeout(() => {
      this.setState(prevState => {
        return {
          showAddCard: !prevState.showAddCard
        };
      });
    });
  };

  handleTopicSelected = list => {
    setTimeout(() => {
      this.setState({
        selectedTopicId: list[list.length - 1].value,
        selectedTopics: list,
        multipleTopicsId: list.map(topic => topic.value)
      });
    });
  };

  handleAddView = () => {
    setTimeout(() => {
      this.setState({ addNewView: true });
    });
  };

  // isVisible = elem => {
  //   !!elem &&
  //     !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  // };

  // hideViewDropdownOnClickOut = element => {
  //   const outsideClickListener = event => {
  //     if (!element.contains(event.target) || this.isVisible(element)) {
  //       this.setState({ showAddCard: false });
  //       removeClickListener();
  //     }
  //   };
  //   const removeClickListener = () => {
  //     document.removeEventListener('click', outsideClickListener);
  //   };
  //   document.addEventListener('click', outsideClickListener);
  // };

  // componentDidUpdate(prevProps) {
  //   const { showAddCard } = this.state;
  //   if (showAddCard) {
  //     const dropdown = this.viewDropdownRef.current;
  //     this.hideViewDropdownOnClickOut(dropdown);
  //   }
  // }

  onInputBlur = () => {
    setTimeout(() => {
      if (this.state.selectedTopics.length !== 0) {
        this.setState({ hideTopicSelector: true });
      } else {
        this.setState({ showTopicDropdown: false });
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

  toggleViewDropdown = () => {
    setTimeout(() => {
      this.setState({
        showTopicDropdown: true
      });
    });
  };

  checkUserExistence = (array, userId) => {
    return array.includes(userId);
  };

  handleHideTodoMessage = ({ hideMessageUsersArray, topicId, userId }) => {
    hideMessageUsersArray.push(userId);
    mutations.setConfig({
      owner: toGid('Topic', topicId),
      config: 'hide_todo_message',
      value: hideMessageUsersArray
    });
    this.setState(showTodoMessage => ({
      showTodoMessage: !showTodoMessage
    }));
  };

  render() {
    const {
      cardRequirements,
      cards,
      moveOrCopyCardInOrToTopicFromDragAndDrop,
      topic,
      active_design,
      subtopics,
      subtopicCards,
      parentTopic,
      workspaceTopics,
      showSubBoards,
      hideMessageUsersArray,
      appUser,
      isHome,
      cardTypeFilter,
      boardTypeFilter,
      includeSubtopics
    } = this.props;

    const {
      showAddCard,
      addNewView,
      selectedTopicId,
      multipleTopicsId,
      showTopicDropdown,
      showTodoMessage
    } = this.state;

    const { card_font_color } = active_design || {};
    const {
      selectedTimePeriod,
      selectedTopics,
      hideTopicSelector
    } = this.state;
    const thisTimePeriodsCards = timePeriodFilter(cards, selectedTimePeriod);
    const thisTimePeriodsDueDate = moment(
      todoPeriods[selectedTimePeriod].endOfPeriod
    )
      .subtract(1, 'hours')

      .toISOString();

    const boardTags = boardTypeFilter?.map(key =>
      key === 'BOARDS' ? 'board' : boardTypes.find(t => t.key == key)?.type
    );

    return (
      <div className="todo-board">
        <GroupByDropDown additionalClass={`${isHome ? 'ml35' : 'ml45'} mb10`} />
        <ActiveFiltersPanel
          additionalContainerClass={`${isHome ? 'ml35' : 'ml45'} mb10`}
        />
        <div
          className="todo-view_time-tab-container"
          style={{
            borderColor: card_font_color
          }}
        >
          {todoTabs.map(tab => (
            <GenericDropZone
              canDrop
              dropClassName={`todo-view_time-tab-dropzone ${tab.breakPoint}`}
              itemType={dragItemTypes.CARD}
              key={tab.key}
              onDrop={this.handleDropCardOnNewTimeFrame}
              timePeriodKey={tab.key}
            >
              <a
                className={`todo-view_time-tab ${tab.key ==
                  selectedTimePeriod && 'selected'}`}
                onClick={() => this.handleSelectTimePeriod(tab.key)}
              >
                {tab.name}
              </a>
            </GenericDropZone>
          ))}
        </div>

        <GenericDragDropListing
          itemList={thisTimePeriodsCards}
          dropClassName="todo-view_card-list"
          dragClassName="task-view_drag-card"
          dragPreview={card => (
            <div style={{ padding: '10px' }}>{card.attributes.title}</div>
          )}
          dropZoneProps={{ topicId: topic ? topic.id : null }}
          draggedItemProps={{ origin: { topicId: topic ? topic.id : null } }}
          itemType={dragItemTypes.CARD}
          onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
          renderItem={card => (
            <TodoCard
              color={card_font_color}
              card={card}
              topicId={topic ? topic.id : null}
            />
          )}
        >
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: {
                attributes: {
                  ...cardRequirements,
                  cardTypes: cardTypeFilter,
                  includeSubtopics
                }
              }
            }}
            loaderKey="cardsWithAttributes"
          />
        </GenericDragDropListing>
        {showSubBoards && (
          <GenericDragDropListing
            itemList={subtopics}
            dropClassName="todo-view_card-list"
            dragClassName="task-view_drag-card"
            dragPreview={subtopic => (
              <div style={{ padding: '10px' }}>{subtopic.attributes.title}</div>
            )}
            dropZoneProps={{ topicId: topic ? topic.id : null }}
            draggedItemProps={{ origin: { topicId: topic ? topic.id : null } }}
            itemType={dragItemTypes.TOPIC}
            onDropItem={moveOrCopyCardInOrToTopicFromDragAndDrop}
            expandedTopics={this.state.expandedTopics}
            renderItem={subtopic => (
              <TodoTopic
                color={card_font_color}
                topic={subtopic}
                expandedTopics={this.state.expandedTopics}
                onTopicExpand={this.handleTopicExpand}
                moveOrCopyCardInOrToTopicFromDragAndDrop={
                  moveOrCopyCardInOrToTopicFromDragAndDrop
                }
                cardRequirements={cardRequirements}
                onAddCardOrSubtopic={this.handleAddCardOrSubtopic}
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
                    parentTopicId: this.props.topic.id,
                    tagged: boardTags
                  }
                }
              }}
              loaderKey="topicsWithAttributes"
            />
          </GenericDragDropListing>
        )}
        {parentTopic == undefined || parentTopic == null ? (
          <div className="todo-card add-card" style={{ position: 'relative' }}>
            {!showAddCard ? (
              <div className="selectViewDropdown">
                <div onClick={this.toggleSelectView}>+ Add Card</div>
              </div>
            ) : (
              <div
                //ref={this.viewDropdownRef}
                style={{ width: 'calc(100% - 430px)' }}
              >
                <AddCardCard
                  fullHeight={false}
                  newCardAttributes={{ due_date: thisTimePeriodsDueDate }}
                  inInputMode
                  afterCardCreated={this.afterCardCreated}
                  multipleTopicsId={multipleTopicsId}
                  transparent
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
                    multiple
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
                    className="dropdown-menu topics-list-dropdown select"
                    onClick={this.toggleViewDropdown}
                  >
                    Select Board
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <AddCardCard
            cardClassName="todo-card"
            cardStyle={{ borderColor: card_font_color }}
            fullHeight={false}
            newCardAttributes={{ due_date: thisTimePeriodsDueDate }}
            topic={topic}
            inInputMode={this.state.inInputMode}
            afterCardCreated={this.afterCardCreated}
            transparent
            topMenu
          />
        )}
        <div className="todo-card" style={{ borderColor: card_font_color }}>
          <AddSubtopicCard
            addTopicUI={'+ Add Board'}
            afterTopicCreated={() => {
              return;
            }}
            inInputMode={this.state.inInputMode}
            parentTopicId={topic ? topic.id : null}
            transparent
          />
        </div>
        {showTodoMessage &&
          !this.checkUserExistence(hideMessageUsersArray, appUser.id) && (
            <div className="todo-footer__message">
              <p
                className="todo-message"
                style={{ color: card_font_color || '#b8b8b8' }}
              >
                Use Cards for tasks and notes. Use Boards to organize your cards
                in groups.
              </p>
              <p
                className="todo-message"
                style={{ color: card_font_color || '#b8b8b8' }}
              >
                Switch to the Action Plan tool to add customizable columns.
                <span
                  className="todo-message__link"
                  style={{ color: card_font_color || '#b8b8b8' }}
                  onClick={() =>
                    this.handleHideTodoMessage({
                      hideMessageUsersArray,
                      topicId: topic.id,
                      userId: appUser.id
                    })
                  }
                >
                  Hide this message
                </span>
                .
              </p>
            </div>
          )}
      </div>
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
  const topic_id = props.topic ? props.topic.id : '0';
  const topic = sm.topics[topic_id];
  const {
    utilities: { active_design },
    page: { topicId, isHome }
  } = sm;
  const subtopics =
    getSortedFilteredSearchedTopicsByParentTopic(state)[topicId] || [];
  const filterSettings = getFilterSettings(state);
  const ui_settings = getUiSettings(state);
  const includeSubtopics = filterSettings?.include_subtopic_cards;
  const showSubBoards = !includeSubtopics;
  const appUser = state.appUser;
  const hideMessageUsersArray =
    topic && topic.attributes.configs.hide_todo_message
      ? topic.attributes.configs.hide_todo_message
      : [];
  return {
    showSubBoards,
    active_design,
    topic,
    subtopics,
    appUser,
    hideMessageUsersArray,
    parentTopic: sm.topics[topicId],
    cardTypeFilter: filterSettings?.card_type,
    boardTypeFilter: filterSettings?.board_type,
    isHome,
    workspaceTopics:
      getSortedFilteredTopicsByParentTopicForTopic(state)['0'] || []
  };
};

const mapDispatch = {
  moveOrCopyCardInOrToTopicFromDragAndDrop,
  updateCard
};

export default connect(mapState, mapDispatch)(TodoLens);
