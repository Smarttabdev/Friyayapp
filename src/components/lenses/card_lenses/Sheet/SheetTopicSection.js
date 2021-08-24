/* eslint-disable indent */
/* eslint-disable complexity */
import PropTypes from 'prop-types';
import React, { Component, Fragment, useEffect } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { debounce } from 'lodash';
import SheetFooter from './SheetFooter';
import classNames from 'classnames';
import SheetAddCard from './SheetAddCard';
import SheetAddSubtopic from './SheetAddSubtopic';
import SheetCard from './SheetCard';
import SheetCardPreview from './SheetCardPreview';
import SheetTopicHeader from './SheetTopicHeader';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import DMLoader from 'Src/dataManager/components/DMLoader';
import { moveOrCopyCardInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/cards/abstractions';
import { moveOrCopyTopicInOrToTopicFromDragAndDrop } from 'Src/newRedux/database/topics/abstractions';
import {
  getSortedFilteredCardsByTopic,
  getGroupByCards
} from 'Src/newRedux/database/cards/selectors';
import { getSortedFilteredTopicsByParentTopicForTopic } from 'Src/newRedux/database/topics/selectors';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { createCard, updateCard } from 'Src/newRedux/database/cards/thunks';
import { createTopic } from 'Src/newRedux/database/topics/thunks';
import { getParsedColumn } from 'Lib/utilities';
import { getUiSettings, getFilterSettings } from 'Src/helpers/user_config';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';

const checkDueDate = (due_date, startDate, endDate) => {
  if (!due_date) return false;
  return moment(due_date).isBetween(
    startDate,
    moment(endDate).endOf('second'),
    null,
    '[]'
  );
};

const setColumnWidth = debounce(props => {
  const { columns, customFields, tips } = props;
  columns.concat('title', 'add').forEach(col => {
    const parsedColumn = getParsedColumn(col, { customFields, tips });
    let cssModifier = parsedColumn.getValue('cssModifier');
    if (!cssModifier) {
      cssModifier = col;
    }
    const colView = document.getElementsByClassName(
      'sheet-view__cell--' + cssModifier
    );
    const header = document.getElementsByClassName('rw--' + cssModifier);
    if (header.length) {
      const width = header[0].offsetWidth + 'px';
      for (var element of colView) {
        element.style.flexBasis = width;
        element.style.minWidth = width;
        element.style.maxWidth = width;
      }
    }
  });
}, 50);

const hoc = Component => props => {
  useEffect(() => {
    setTimeout(() => setColumnWidth(props));
  });
  return <Component {...props} />;
};

class SheetTopicSection extends Component {
  static propTypes = {
    className: PropTypes.string,
    showFooter: PropTypes.bool,
    // parent
    addCardOrSubtopic: PropTypes.any.isRequired,
    cardRequirements: PropTypes.any,
    columns: PropTypes.array.isRequired,
    configureColumns: PropTypes.bool.isRequired,
    expandedTopics: PropTypes.object.isRequired,
    level: PropTypes.number.isRequired,
    showAddCard: PropTypes.bool.isRequired,
    showAddSubtopic: PropTypes.bool.isRequired,
    sortColumn: PropTypes.string,
    sortOrder: PropTypes.string,
    topicId: PropTypes.string.isRequired,
    onAddCardOrSubtopic: PropTypes.func.isRequired,
    onAddCardOrSubtopicSubmit: PropTypes.func.isRequired,
    onTopicExpand: PropTypes.func.isRequired,
    // store
    cards: PropTypes.array.isRequired,
    subtopics: PropTypes.array.isRequired,
    topic: PropTypes.object,
    moveCard: PropTypes.func.isRequired,
    color: PropTypes.string,
    moveOrCopyTopicInOrToTopicFromDragAndDrop: PropTypes.any
  };

  static defaultProps = {
    newCardAttributes: {},
    newCardRelationships: {}
  };

  state = {
    boardTitle: '',
    cardTitle: '',
    cardType: 'CARD',
    boardType: '',
    selectedTopicId: {},
    showAddSubTopicCard: false,
    showAddSubTopicBoard: false,
    linkedBoards: []
  };

  constructor(props) {
    super(props);
    this.handleCardKeypress = this.handleKeyPress.bind(this, 'card');
  }

  componentDidMount() {
    this.setState({
      linkedBoards: this.props.topic.attributes.configs?.linked_boards || []
    });
  }

  handleShowAddSubTopicCardOrView = type => async e => {
    const { newCardAttributes, newCardRelationships } = this.props;
    const isExpanded = this.props.expandedTopics[this.props.topicId];
    if (e.key !== 'Enter') {
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const { createTopic, createCard } = this.props;
      const topicId = this.props.topic ? this.props.topic.id : '0';
      if (type === 'board') {
        let attributes = {
          title: this.state.boardTitle,
          parent_id: topicId,
          ...this.props.newTopicAttributes
        };
        if (this.state.boardType) {
          attributes = {
            ...attributes,
            tag_list: [this.state.boardType]
          };
        }
        await createTopic({
          attributes,
          relationships: this.props.newTopicRelationships
        });
        this.setState({ boardTitle: '' }, () => {
          if (!isExpanded) {
            this.props.onTopicExpand(topicId);
          }
        });
      } else {
        await createCard({
          attributes: {
            ...newCardAttributes,
            title: this.state.cardTitle,
            card_type: this.state.cardType
          },
          relationships: {
            ...newCardRelationships,
            topics: { data: [topicId] }
          }
        });
        this.setState({ cardTitle: '' }, () => {
          if (!isExpanded) {
            this.props.onTopicExpand(topicId);
          }
        });
      }
    }
  };

  handleShowSubTopicCardOrView = type => {
    this.setState(
      {
        [`showAddSubTopic${type}`]: true
      },
      () => {
        //this.props.onTopicExpand(this.props.topicId);
        // if (type=='Card') {
        //   this.addSubCardInput.current.focus()
        // }
        // else {
        //   this.addSubViewInput.current.focus()
        // }
      }
    );
  };

  closeAddSubTopicCardOrViewRow = type => {
    this.setState({
      [`showAddSubTopic${type}`]: false
    });
  };

  getPreview = () => {
    const { customFields, tips } = this.props;
    return (
      <SheetTopicHeader
        cards={this.props.cards}
        columns={this.props.columns}
        isExpanded={true}
        level={this.props.level}
        topic={this.props.topic}
        className="sheet-board-card-preview"
        configureColumns={this.props.configureColumns}
        onAddCardOrSubtopic={() => {}}
        onTopicExpand={() => {}}
        customFields={customFields}
        tips={tips}
      />
    );
  };

  moveTopic = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    if (!droppedItemProps.origin) {
      droppedItemProps.origin = { topicId: this.props.topicId };
    } // draggeditemprops are not being retained. Fixed this by changing ...monitor.getItem() to
    // ...monitor.getItem(), ...props.draggedItemProps.  That causes errors in nested zones as
    // in assigned board (lane zone, reorder zone).  So copying the props manually for now.
    this.props.moveOrCopyTopicInOrToTopicFromDragAndDrop({
      droppedItemProps,
      dropZoneProps,
      itemOrder
    });
  };

  handleKeyPress = async (type, newCard = {}) => {
    let {
      createTopic,
      createCard,
      parentTopic,
      newCardAttributes,
      newCardRelationships,
      newTopicAttributes,
      newTopicRelationships,
      topicId,
      projectPlan,
      useSelectedTopics,
      mustSelectTopics,
      showSubBoards
    } = this.props;
    const { selectedTopicId, selectedTopics } = this.state;
    topicId = topicId ? topicId : this.props.topic ? this.props.topic.id : '0';
    if (type === 'board') {
      let attributes = {
        title: this.state.boardTitle,
        ...newTopicAttributes
      };

      if (this.state.boardType) {
        attributes = {
          ...attributes,
          tag_list: [this.state.boardType]
        };
      }

      const params = {
        attributes,
        relationships: newTopicRelationships
      };
      if (topicId && topicId != '0') {
        params.attributes.parent_id = topicId;
      }
      await createTopic(params);
      this.setState({ boardTitle: '' });
    } else {
      if (mustSelectTopics && !selectedTopics.length) {
        return;
      }
      await createCard({
        attributes: {
          title: this.state.cardTitle,
          card_type: this.state.cardType,
          ...newCardAttributes,
          ...newCard.attributes
        },
        relationships: {
          topics: {
            data:
              (parentTopic || projectPlan) && !useSelectedTopics
                ? [topicId]
                : selectedTopics?.length
                ? selectedTopics
                : topicId && topicId != 0
                ? [topicId]
                : null
          },
          ...newCardRelationships,
          ...newCard.relationships
        }
      });
      this.setState({ cardTitle: '' });
    }
  };

  onFooterTopicSelected = selectedTopics => {
    const selected = selectedTopics.map(topic => topic.value);
    this.setState({
      selectedTopics: selected
    });
  };

  assignCard = ({ cardId, userId }) => {
    this.props.updateCard({
      id: cardId,
      relationships: {
        tip_assignments: {
          data: [userId]
        }
      }
    });
  };

  handleMoveCard = args => {
    let {
      dropZoneProps: { startDate, dueDate, columnMode }
    } = args;

    if (this.props.planLens) {
      if (
        !checkDueDate(
          args.droppedItemProps.item.attributes.due_date,
          startDate,
          dueDate
        )
      ) {
        const attributes = {};

        if (columnMode?.startsWith('weeks')) {
          dueDate = dueDate.isoWeekday(5);
        }

        if (
          dueDate.isBefore(
            moment(args.droppedItemProps.item.attributes.start_date)
          )
        ) {
          attributes.start_date = columnMode?.startsWith('weeks')
            ? startDate.add(1, 'days').format()
            : startDate.format();
        }
        attributes.due_date = dueDate.format();
        this.props.updateCard({
          id: args.droppedItemProps.item.id,
          attributes
        });
      }
    }
    if (args.dropZoneProps.laneUser?.attributes?.username) {
      this.assignCard({
        cardId: args.droppedItemProps.item.id,
        userId: args.dropZoneProps.laneUser.id
      });
    }
    this.props.moveCard(args);
  };

  getTopicsDropZoneProps = createSelector(
    topicId => topicId,
    topicId => ({ topicId })
  );

  getTopicsDraggedItemProps = createSelector(
    topicId => topicId,
    topicId => ({ origin: { topicId } })
  );

  getTopicsDragPreview = createSelector(
    color => color,
    color => topic => <SheetTopicHeader color={color} topic={topic} />
  );

  renderTopic = subtopic => (
    <ConnectedSheetTopicSection
      color={this.props.color}
      className="sheet-board-subtopic-header"
      key={subtopic.id}
      addCardOrSubtopic={this.props.addCardOrSubtopic}
      cardRequirements={this.props.cardRequirements}
      newCardAttributes={this.props.newCardAttributes}
      newCardRelationships={this.props.newCardRelationships}
      columns={this.props.columns}
      configureColumns={this.props.configureColumns}
      expandedTopics={this.props.expandedTopics}
      level={this.props.level + 1}
      showAddCard={
        this.props.addCardOrSubtopic.topicId === subtopic.id &&
        this.props.addCardOrSubtopic.mode === 'card'
      }
      showAddSubtopic={
        this.props.addCardOrSubtopic.topicId === subtopic.id &&
        this.props.addCardOrSubtopic.mode === 'topic'
      }
      sortColumn={this.props.sortColumn}
      sortOrder={this.props.sortOrder}
      topicId={subtopic.id}
      onAddCardOrSubtopic={this.props.onAddCardOrSubtopic}
      onAddCardOrSubtopicSubmit={this.props.onAddCardOrSubtopicSubmit}
      onTopicExpand={this.props.onTopicExpand}
      customFields={this.props.customFields}
      currentDomain={this.props.currentDomain}
      topicQuery={this.props.topicQuery}
      tips={this.props.tips}
      newTopicAttributes={this.props.newTopicAttributes}
      newTopicRelationships={this.props.newTopicRelationships}
      topicsFilter={this.props.topicsFilter}
      sheetTopicHeaderProps={this.props.sheetTopicHeaderProps}
      filterCards={this.props.filterCards}
      sheetBorderStyle={this.props.sheetBorderStyle}
      startDate={this.props.startDate}
      dueDate={this.props.dueDate}
      columnMode={this.props.columnMode}
    />
  );

  render() {
    const {
      customFields,
      tips,
      topic,
      user,
      sheetBorderStyle,
      startDate,
      dueDate,
      columnMode,
      linkingBoards,
      allTopics,
      subtopics = []
    } = this.props;

    const isTopmostSection = this.props.level === 0;
    let isExpanded = this.props.expandedTopics[this.props.topicId];
    const parsedColumn =
      this.props.sortColumn &&
      getParsedColumn(this.props.sortColumn, { customFields, tips });
    const cards = this.props.sortColumn
      ? parsedColumn.config.sort(
          this.props.cards,
          this.props.sortOrder,
          parsedColumn
        )
      : this.props.cards;
    const { color, hideTopicSection, includeSubtopics } = this.props;
    const {
      boardTitle,
      cardTitle,
      refreshFooter,
      showAddSubTopicCard,
      showAddSubTopicBoard,
      linkedBoards
    } = this.state;

    const itemList = [
      ...subtopics,
      ...linkedBoards?.map(board => allTopics[board.value])
    ];

    return (
      <div className="sheet-view__container-wrapper">
        <div>
          <div
            className={`sheet-view__topic-section ${this.props.className ||
              ''}`}
          >
            {this.props.topic && !isTopmostSection && (
              <>
                <SheetTopicHeader
                  color={color}
                  disableModalAdd={true}
                  disabledModalAddHandler={this.handleShowSubTopicCardOrView}
                  addCardReturnCardType={cardType =>
                    this.setState({ cardType })
                  }
                  addBoardReturnBoardType={boardType =>
                    this.setState({ boardType })
                  }
                  cards={this.props.cards}
                  columns={this.props.columns}
                  configureColumns={this.props.configureColumns}
                  isExpanded={isExpanded}
                  level={this.props.level}
                  topic={this.props.topic}
                  onAddCardOrSubtopic={this.props.onAddCardOrSubtopic}
                  onTopicExpand={this.props.onTopicExpand}
                  customFields={customFields}
                  tips={tips}
                  sheetBorderStyle={sheetBorderStyle}
                  {...this.props.sheetTopicHeaderProps}
                />
              </>
            )}
            {this.props.topic &&
              this.props.showAddCard &&
              (isExpanded || isTopmostSection) && (
                <SheetAddCard
                  columns={this.props.columns}
                  configureColumns={this.props.configureColumns}
                  level={this.props.level + 1}
                  onAddCard={this.props.onAddCardOrSubtopicSubmit}
                  onCancel={() => this.props.onAddCardOrSubtopic(null, null)}
                  customFields={this.props.customFields}
                  tips={this.props.tips}
                  sheetBorderStyle={sheetBorderStyle}
                />
              )}
            {(this.props.topic || this.props.planLens) &&
              (isExpanded || isTopmostSection) &&
              !this.props.hideRootCards && (
                <GenericDragDropListing
                  dragClassName=""
                  draggedItemProps={{
                    origin: { topicId: this.props.topicId, laneUser: user }
                  }}
                  dragPreview={card => <SheetCardPreview card={card} />}
                  dropClassName=""
                  dropZoneProps={{
                    topicId: this.props.topicId,
                    laneUser: user,
                    startDate,
                    dueDate,
                    columnMode
                  }}
                  itemContainerClassName=""
                  itemList={
                    this.props.groupByCards ? this.props.groupByCards : cards
                  }
                  itemType={dragItemTypes.CARD}
                  onDropItem={this.handleMoveCard}
                  renderItem={card => (
                    <SheetCard
                      color={color}
                      card={card}
                      columns={this.props.columns}
                      configureColumns={this.props.configureColumns}
                      key={card.id}
                      level={this.props.level + 1}
                      topicId={this.props.topicId}
                      planLens={this.props.planLens}
                      onAddCard={this.handleCardKeypress}
                      customFields={this.props.customFields}
                      currentDomain={this.props.currentDomain}
                      topicQuery={this.props.topicQuery}
                      tips={this.props.tips}
                      laneUser={user}
                      assignCard={this.assignCard}
                      filterCards={this.props.filterCards}
                      sheetBorderStyle={sheetBorderStyle}
                    />
                  )}
                >
                  {/* render children even if cards = 0, to fix drop cards to empty board issue */}
                  {cards.length == 0 && <span>&nbsp;</span>}
                  {this.props.planLens ? (
                    <DMLoader
                      dataRequirements={{
                        cardsWithAttributes: {
                          attributes: {
                            ...this.props.cardRequirements,
                            includeSubtopics
                          }
                        }
                      }}
                      loaderKey="cardsWithAttributes"
                    />
                  ) : (
                    <DMLoader
                      dataRequirements={{
                        cardsWithAttributes: {
                          attributes: {
                            ...this.props.cardRequirements,
                            topicId: this.props.topicId,
                            includeSubtopics
                          }
                        },
                        subtopicsForTopic: { topicId: this.props.topicId }
                      }}
                      loaderKey="cardsWithAttributes"
                    />
                  )}
                </GenericDragDropListing>
              )}
            {this.props.showAddSubtopic && (isExpanded || isTopmostSection) && (
              <SheetAddSubtopic
                columns={this.props.columns}
                configureColumns={this.props.configureColumns}
                level={this.props.level + 1}
                onAddSubtopic={this.props.onAddCardOrSubtopicSubmit}
                onCancel={() => this.props.onAddCardOrSubtopic(null, null)}
                customFields={customFields}
                tips={tips}
                sheetBorderStyle={sheetBorderStyle}
              />
            )}
            {(isExpanded || isTopmostSection) && !hideTopicSection && (
              <GenericDragDropListing
                dragClassName=""
                draggedItemProps={this.getTopicsDraggedItemProps(
                  this.props.topicId
                )}
                dragPreview={this.getTopicsDragPreview(color)}
                dropClassName=""
                dropZoneProps={this.getTopicsDropZoneProps(this.props.topicId)}
                itemContainerClassName=""
                itemList={itemList}
                itemType={dragItemTypes.TOPIC}
                onDropItem={this.moveTopic}
                renderItem={this.renderTopic}
              >
                {!this.props.topicId || this.props.topicId == '0' ? (
                  <DMLoader
                    dataRequirements={{
                      topics: {}
                    }}
                    loaderKey="topics"
                  />
                ) : (
                  <DMLoader
                    dataRequirements={{
                      subtopicsForTopic: { topicId: this.props.topicId }
                    }}
                    loaderKey="subtopicsForTopic"
                  />
                )}
              </GenericDragDropListing>
            )}
            {(isExpanded || isTopmostSection) && (
              <DMLoader
                dataRequirements={{
                  topicOrders: { topicId: topic.id }
                }}
                loaderKey="topicOrders"
              />
            )}
            {!isTopmostSection && (
              <Fragment>
                {showAddSubTopicCard && (
                  <div className="sheet-view__footer">
                    <div className="sheet-view__card">
                      <div className="sheet-view__cell sheet-view__cell--title sheet-add-nested-card">
                        <span
                          className="material-icons sheet-view__row-remove-btn"
                          onClick={() =>
                            this.closeAddSubTopicCardOrViewRow('Card')
                          }
                        >
                          clear
                        </span>
                        <BoardAndCardTypeListDropdown
                          itemType={this.state.cardType}
                          listType="card"
                          setItemType={cardTypeKey =>
                            this.setState({ cardType: cardTypeKey })
                          }
                          containerStyle={{ marginTop: '-3px' }}
                        />
                        <input
                          type="text"
                          autoFocus
                          placeholder={'Type card title'}
                          onChange={({ target }) =>
                            this.setState({ cardTitle: target.value })
                          }
                          value={this.state['cardTitle']}
                          onKeyPress={this.handleShowAddSubTopicCardOrView(
                            'card'
                          )}
                          className="add-subtopic-input sheet-board-add-card-input"
                        />
                      </div>
                      {this.props.columns.map(column => {
                        const parsedColumn = getParsedColumn(column, {
                          customFields,
                          tips
                        });
                        const cssModifier = parsedColumn.getValue(
                          'cssModifier'
                        );
                        const cellClassNames = classNames('sheet-view__cell', {
                          [`sheet-view__cell--${cssModifier}`]: cssModifier
                        });

                        return <div key={column} className={cellClassNames} />;
                      })}
                      {this.props.configureColumns && (
                        <div className="sheet-view__cell sheet-view__cell--add" />
                      )}
                    </div>
                  </div>
                )}
                {showAddSubTopicBoard && (
                  <div className="sheet-view__footer">
                    <div className="sheet-view__card">
                      <div className="sheet-view__cell sheet-view__cell--title sheet-add-nested-board">
                        <span
                          className="material-icons sheet-view__row-remove-btn"
                          onClick={() =>
                            this.closeAddSubTopicCardOrViewRow('Board')
                          }
                        >
                          clear
                        </span>
                        <BoardAndCardTypeListDropdown
                          itemType={this.state.boardType}
                          listType="board"
                          setItemType={boardTypeKey =>
                            this.setState({ boardType: boardTypeKey })
                          }
                          containerStyle={{ marginTop: '-3px' }}
                        />
                        <input
                          type="text"
                          autoFocus
                          placeholder={'Type Board title'}
                          onChange={({ target }) =>
                            this.setState({ boardTitle: target.value })
                          }
                          value={this.state['boardTitle']}
                          onKeyPress={this.handleShowAddSubTopicCardOrView(
                            'board'
                          )}
                          className="add-subtopic-input sheet-board-add-card-input"
                        />
                      </div>
                      {this.props.columns.map(column => {
                        const parsedColumn = getParsedColumn(column, {
                          customFields,
                          tips
                        });
                        const cssModifier = parsedColumn.getValue(
                          'cssModifier'
                        );
                        const cellClassNames = classNames('sheet-view__cell', {
                          [`sheet-view__cell--${cssModifier}`]: cssModifier
                        });

                        return <div key={column} className={cellClassNames} />;
                      })}
                      {this.props.configureColumns && (
                        <div className="sheet-view__cell sheet-view__cell--add" />
                      )}
                    </div>
                  </div>
                )}
              </Fragment>
            )}
          </div>
        </div>
        {this.props.showFooter && (
          <SheetFooter
            boardTitle={boardTitle}
            cardTitle={cardTitle}
            changeTitle={state => this.setState(state)}
            handleKeyPress={this.handleKeyPress}
            cards={cards}
            columns={this.props.columns}
            configureColumns={!!this.props.configureColumns}
            onFooterTopicSelected={this.onFooterTopicSelected}
            refreshFooter={refreshFooter}
            showOnlyAddCard={this.props.planLens && !this.props.projectPlan}
            // hideSummary={this.props.planLens}
            customFields={customFields}
            tips={tips}
            parentTopic={topic}
            mustSelectTopics={this.props.mustSelectTopics}
            user={user}
            setUserWorkload={this.props.setUserWorkload}
            sheetBorderStyle={sheetBorderStyle}
            linkingBoards={linkingBoards}
            getLinkedBoards={boards => this.setState({ linkedBoards: boards })}
            {...this.props.footerProps}
          />
        )}
      </div>
    );
  }
}

const mapState = () => {
  const getShowSubBoards = createSelector(
    state => getFilterSettings(state)?.include_subtopic_cards,
    includeSubtopics => {
      return !includeSubtopics;
    }
  );

  const getSubtopics = createSelector(
    state => getShowSubBoards(state),
    (state, topicsFilter) => topicsFilter?.assignedTo,
    (state, topicsFilter, topicId) =>
      getSortedFilteredTopicsByParentTopicForTopic(state, topicsFilter?.tags)[
        topicId
      ],
    (showSubBoards, assignedTo, subtopics) => {
      subtopics = showSubBoards ? subtopics || [] : [];
      if (assignedTo) {
        subtopics = subtopics.filter(topic => {
          const assignments = get(topic, 'relationships.assignments.data', []);
          return assignments.find(
            a =>
              a.assigned_type == assignedTo.type &&
              a.assigned_id == assignedTo.id
          );
        });
      }
      return subtopics;
    }
  );

  return (state, props) => {
    const sm = stateMappings(state);
    const topic = sm.topics[props.topicId];
    const {
      page: { topicId },
      utilities: { active_design },
      topics: allTopics
    } = sm;

    const parentTopic = sm.topics[topicId];
    const currentView = getUiSettings(state).current_active_template;
    let cards = props.cards
      ? props.cards
      : getSortedFilteredCardsByTopic(state)[props.topicId] || [];
    if (props.filterCards) {
      cards = props.filterCards(cards);
    }
    const filterSettings = getFilterSettings(state);
    const includeSubtopics = filterSettings?.include_subtopic_cards;
    const subtopics = getSubtopics(state, props.topicsFilter, props.topicId);
    return {
      cards,
      subtopics,
      topic: topic,
      parentTopic,
      includeSubtopics,
      allTopics,
      groupByCards:
        props.groupBy && props.groupBy.length >= 1
          ? getGroupByCards(state, props)
          : null
    };
  };
};

const mapDispatch = {
  moveCard: moveOrCopyCardInOrToTopicFromDragAndDrop,
  moveOrCopyTopicInOrToTopicFromDragAndDrop: moveOrCopyTopicInOrToTopicFromDragAndDrop,
  createCard,
  updateCard,
  createTopic
};

const ConnectedSheetTopicSection = connect(
  mapState,
  mapDispatch
)(hoc(SheetTopicSection));

export default ConnectedSheetTopicSection;
