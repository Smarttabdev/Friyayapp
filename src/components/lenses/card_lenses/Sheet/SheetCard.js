import classNames from 'classnames';
import React, { Fragment, useEffect, useCallback, useMemo } from 'react';
import { createSelector } from 'reselect';
import get from 'lodash/get';
import { array, bool, func, number, string } from 'prop-types';
import { connect } from 'react-redux';
import DMLoader from 'Src/dataManager/components/DMLoader';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import IconButton from 'Components/shared/buttons/IconButton';
import { getSpeedIcons } from './sheetConfig/speed';
import { toggleCardsSplitScreen } from 'Src/newRedux/interface/menus/actions.js';
import { updateSelectedCard } from 'Src/newRedux/database/user/thunks';
import { getSortedCardsByIds } from 'Src/newRedux/database/cards/selectors';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import {
  nestCardUnderCard as nestCardUnderCardAction,
  updateCard,
  ensureCard
} from 'Src/newRedux/database/cards/thunks';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';
import { stateMappings } from 'Src/newRedux/stateMappings';
import Ability from 'Lib/ability';
import moment from 'moment';
import { failure } from 'Utils/toast';
import { getParsedColumn } from 'Lib/utilities';
import SheetAddRow from './SheetAddRow';
import store from 'Src/store/store';
import Tooltip from 'Components/shared/Tooltip';
import { useTipCreatedUpdatedSubscription } from 'src/lib/hooks';
import { handleShowEmojiSplashOnTaskComplete } from 'src/lib/utilities';
import BoardAndCardTypeListDropdown from 'Components/shared/BoardAndCardTypeListDropdown';

const forId = Math.ceil(Math.random() * 100000, 6);
const Column = ({
  column,
  value,
  customFields,
  card,
  tips,
  handleValueChange,
  handleValueUpdate,
  setEditCardModalOpen,
  sheetBorderStyle
}) => {
  const isCustomField = column.startsWith('custom_field:');
  const parsedColumn = useMemo(() => {
    return getParsedColumn(column, {
      customFields,
      tips
    });
  }, [column, isCustomField && customFields, isCustomField && tips]);

  const config = parsedColumn.config;
  const modifier = parsedColumn.getValue('cssModifier');
  const cellClassNames = classNames('sheet-view__cell', {
    [`sheet-view__cell--${modifier}`]: modifier
  });

  const ColumnComponent = config.Component || null;
  const colHeader = document.getElementsByClassName(`rw--${modifier}`);

  const width = colHeader[0]?.style?.width;

  const style = useMemo(
    () => ({
      flexBasis: width,
      width: width,
      minWidth: width,
      maxWidth: width
    }),
    [width]
  );

  const handleValueChangeForColumn = useCallback(
    value => handleValueChange(column, value),
    [column]
  );

  return (
    <div
      key={column}
      className={cellClassNames}
      style={{ ...style, ...sheetBorderStyle }}
    >
      {card.type !== 'groupby' && ColumnComponent && (
        <ColumnComponent
          card={card}
          value={value}
          parsedColumn={parsedColumn}
          handleValueChange={handleValueChangeForColumn}
          handleValueUpdate={handleValueUpdate}
          setEditCardModalOpen={setEditCardModalOpen}
        />
      )}
      {card.type !== 'groupby' &&
        !ColumnComponent &&
        config.render(
          card,
          value,
          handleValueChangeForColumn,
          handleValueUpdate,
          parsedColumn
        )}
    </div>
  );
};

const hoc = Component => props => {
  const { card, tips = [], columns } = props;
  const refetch = () => props.relay.refetchConnection(15);
  useTipCreatedUpdatedSubscription(props.topicId, refetch);

  const tip = tips.find(tip => tip.id == toGid('Tip', card.id));

  useEffect(() => {
    if (!tip) return;
    const disposers = [];
    disposers.push(
      requestSubscription({
        subscription: graphql`
          subscription SheetCardTipUpdatedSubscription(
            $id: ID!
            $customFieldValuesFilter: JSON
          ) {
            tipUpdated(id: $id) {
              tip {
                id
                customFieldValues(filter: $customFieldValuesFilter) {
                  id
                  value
                  customField {
                    id
                  }
                }
              }
            }
          }
        `,
        vars: {
          id: tip.id,
          customFieldValuesFilter: {
            // custom_field_id: getColumnFieldIds(columns, false)
          }
        }
      })
    );
    tip.customFieldValues.forEach(customFieldValue => {
      disposers.push(
        subscriptions.customFieldValueUpdated({
          id: customFieldValue.id
        })
      );
    });
  }, [tip && tip.id]);

  return <Component {...props} />;
};

class SheetCard extends GenericCard {
  static defaultProps = { dragLeaveHandlersForParentLists: [] };

  static propTypes = {
    // card: object.isRequired,
    columns: array.isRequired,
    configureColumns: bool.isRequired,
    dragLeaveHandlersForParentLists: array,
    level: number.isRequired,
    nestCardUnderCard: func.isRequired,
    topicId: string,
    updateCard: func.isRequired
  };

  state = {
    isEditing: false,
    showNestedCards: false,
    showNewCardInput: false,
    title: '',
    cardType: 'CARD',
    groupByPath: {},
    stateHelperCards: []
  };

  componentDidMount() {
    const {
      card: { attributes }
    } = this.props;

    this.setState({
      title: attributes.title
    });
    this.handleAddHelperCardsToLocalStore();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props?.query?.isCardExpandedConfig?.value !==
      prevProps?.query?.isCardExpandedConfig?.value
    ) {
      this.setState({
        showNestedCards: this.props?.query?.sCardExpandedConfig?.value
      });
    }
    if (this.props?.query?.helperCards !== prevProps?.query?.helperCards) {
      this.handleAddHelperCardsToLocalStore();
    }
  }

  handleNestZoneDragStart = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    if (dropZoneProps.laneUser?.attributes?.username) {
      this.props.assignCard({
        cardId: droppedItemProps.item.id,
        userId: dropZoneProps.laneUser.id
      });
    }
    this.props.nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCardId: dropZoneProps.cardId,
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  handleDropCardNested = args => {
    if (args.dropZoneProps.laneUser?.attributes?.username) {
      this.props.assignCard({
        cardId: args.draggedItemProps.item.id,
        userId: args.dropZoneProps.laneUser.id
      });
    }
    this.handleNestCard(args);
  };

  handleNewCardInputButtonClick = card => {
    let groupByPath = this.state.groupByPath;
    if (card && card.type === 'groupby') {
      groupByPath = card.groupByPath;
    }
    this.setState(
      {
        showNestedCards: true,
        showNewCardInput: !this.state.showNewCardInput,
        groupByPath: groupByPath
      },
      () => {
        // const container = document.getElementsByClassName('board-container')[0];
        // if (this.state.showNewCardInput) {
        //   container.style.overflow = 'hidden';
        // } else {
        //   container.style.overflow = 'auto';
        // }
      }
    );
  };

  handleTitleChange = ev => {
    this.setState({ title: ev.target.value });
  };

  handleTitleKeyDown = ev => {
    if (ev.keyCode === 27) {
      this.handleToggleEditMode();
    }

    if (ev.keyCode === 13) {
      this.handleValueUpdate({
        attributes: { title: ev.target.value }
      });

      this.handleToggleEditMode();
    }
  };

  handleToggleEditMode = () => {
    this.setState({ isEditing: !this.state.isEditing });
  };

  handleValueChange = (column, value) => {
    this.setState({ [column]: value });
  };

  handleValueUpdate = updates => {
    this.props.updateCard({ id: this.props.card.id, ...updates });
  };

  handleToggleCompleteCard = async card => {
    const { updateCard } = this.props;

    if (Ability.can('update', 'self', card)) {
      const { completed_percentage, completion_date } = card.attributes;
      if (completed_percentage === 0) {
        handleShowEmojiSplashOnTaskComplete();
      }
      const attributes = {
        completion_date: completion_date ? null : moment().toISOString(),
        completed_percentage: completed_percentage == 100 ? 0 : 100
      };
      updateCard({ id: card.id, attributes });
    } else {
      failure("You don't have permission to complete that card!");
    }
  };
  findLabel(labels, cardLabelGroupBy) {
    const label = Object.keys(labels).filter(key =>
      labels[key].attributes.name.includes(cardLabelGroupBy)
    );
    return label[0];
  }
  findAssignee(people, cardAssigneeGroupBy) {
    const assignee = Object.keys(people).filter(key =>
      people[key].attributes.first_name.includes(cardAssigneeGroupBy)
    );
    return assignee[0];
  }
  getGroupByAttributesObj() {
    if (Object.keys(this.state.groupByPath).includes('labels')) {
      const cardLabelGroupBy = this.state.groupByPath.labels;
      const labelId = this.findLabel(this.props.labels, cardLabelGroupBy);
      return {
        attributes: {},
        relationships: { labels: { data: [].concat(labelId) } }
      };
    } else if (Object.keys(this.state.groupByPath).includes('assignee')) {
      const assigneeId = this.props.card.attributes.id;
      return {
        attributes: {},
        relationships: { tip_assignments: { data: [].concat(assigneeId) } }
      };
    }
    let attributes = { ...this.state.groupByPath };
    if (
      Object.keys(attributes).includes('priority_level') &&
      this.state.groupByPath.priority_level == 'Unassigned'
    ) {
      delete attributes.priority_level;
    }
    if (Object.keys(attributes).includes('due_date')) {
      if (this.state.groupByPath.due_date !== 'Unassigned') {
        attributes.due_date = moment(attributes.due_date, "Do MMMM 'YY");
      } else {
        delete attributes.due_date;
      }
    }
    if (Object.keys(attributes).includes('start_date')) {
      if (this.state.groupByPath.start_date !== 'Unassigned') {
        attributes.start_date = moment(attributes.start_date, "Do MMMM 'YY");
      } else {
        delete attributes.start_date;
      }
    }
    if (Object.keys(attributes).includes('completion_date')) {
      if (this.state.groupByPath.completion_date !== 'Unassigned') {
        attributes.completion_date = moment(
          attributes.completion_date,
          "Do MMMM 'YY"
        );
      } else {
        delete attributes.completion_date;
      }
    }
    return { attributes: attributes, relationships: {} };
  }

  handleAddCard = async () => {
    await this.props.onAddCard({
      attributes: {
        ...this.getGroupByAttributesObj().attributes,
        title: this.state.newCardTitle,
        card_type: this.state.cardType
      },
      relationships: {
        follows_tip: {
          data: this.props.isGroupByActive ? null : this.props.card.id
        },
        ...this.getGroupByAttributesObj().relationships
      }
    });
    this.setState({ newCardTitle: '' });
  };

  handleAddHelperCardsToLocalStore = async () => {
    const { ensureCard, query } = this.props;
    const { helperCards } = query || {};
    const cards = [];

    if (helperCards?.edges?.length) {
      for (const edge of helperCards.edges) {
        await ensureCard(toId(edge?.node?.id));
        const card = stateMappings(store.getState()).cards[
          toId(edge?.node?.id)
        ];
        cards.push(card);
      }
    }
    this.setState({ stateHelperCards: cards.filter(Boolean) });
  };

  handleUpdateCardType = cardType => {
    const {
      updateCard,
      card: { id }
    } = this.props;

    const attributes = {
      card_type: cardType
    };

    updateCard({ id, attributes });
  };

  render() {
    const {
      parentTopic,
      card,
      color,
      cardsSplitScreen,
      toggleCardsSplitScreen,
      updateSelectedCard,
      planLens,
      getSortedCards,
      customFields,
      tips,
      laneUser,
      filterCards,
      sheetBorderStyle
    } = this.props;
    const {
      attributes,
      id: cardId,
      relationships: {
        nested_tips,
        topics: {
          data: [defaultTopicId]
        }
      }
    } = card;

    const card_type = card.attributes.card_type || null;

    const { isHover, stateHelperCards } = this.state;
    const nestingLevelPadding = (this.props.level - 1) * 20;
    const title = this.state.title;
    const titleHeader = document.getElementsByClassName('rw--title');
    const isComplete = card.attributes.completed_percentage == 100;
    const slug = card.attributes.slug;
    const nestedTipsData = get(
      this.props,
      'card.relationships.nested_tips.data',
      []
    );
    let nestedCards =
      nestedTipsData && typeof nestedTipsData[0] != 'object'
        ? getSortedCards(this.state.nestedTips || nestedTipsData)
        : nestedTipsData;
    if (filterCards) {
      nestedCards = filterCards(nestedCards);
    }
    nestedCards = [...stateHelperCards, ...nestedCards];

    const nestedCardsLength = nestedCards.length;
    const hasNestedCards = nestedCardsLength > 0;
    const hasHelperCards = stateHelperCards?.length > 0;
    return (
      <Fragment>
        <div className="sheet-view__card">
          <div
            className={`sheet-view__cell sheet-view__cell--title ${
              card.type == 'groupby' ? 'sheet-view__cell-grouped' : ''
            }`}
            style={{
              ...sheetBorderStyle,
              paddingLeft: `${nestingLevelPadding + 7}px`,
              ...(titleHeader[0] && { flexBasis: titleHeader[0].style.width })
            }}
            onMouseEnter={() => this.setState({ isHover: true })}
            onMouseLeave={() => this.setState({ isHover: false })}
          >
            {this.state.isEditing ? (
              <input
                autoFocus
                className="form-control form-control-minimal sheet-view__card-title-edit"
                value={title}
                onBlur={this.handleToggleEditMode}
                onChange={this.handleTitleChange}
                onKeyDown={this.handleTitleKeyDown}
              />
            ) : (
              <Fragment>
                <div className="sheet-view__card-title">
                  <GenericDropZone
                    dropClassName="nest-card-zone"
                    onDragStart={this.handleNestZoneDragStart}
                    onDragEnter={this.showAsNestable}
                    onDragLeave={this.dontShowAsNestable}
                    itemType={dragItemTypes.CARD}
                    onDrop={this.handleDropCardNested}
                    topicId={this.props.topicId}
                    laneUser={laneUser}
                    key="nest-zone"
                  >
                    <div
                      className="nest-zone"
                      style={{
                        pointerEvents: hasNestedCards ? undefined : 'none'
                      }}
                    >
                      <IconButton
                        additionalClasses="sheet-card__nested-cards-caret dark-grey-icon-button"
                        fontAwesome
                        color={hasNestedCards ? color : '#dddddd'}
                        icon={
                          this.state.showNestedCards
                            ? 'caret-down'
                            : 'caret-right'
                        }
                        onClick={
                          hasNestedCards
                            ? this.handleNestedCardsCaretClick
                            : undefined
                        }
                      />
                    </div>
                  </GenericDropZone>
                  {card.type !== 'groupby' ? (
                    <Fragment>
                      <IconButton
                        fontAwesome
                        icon={isComplete ? 'check-square' : 'square'}
                        onClick={() => this.handleToggleCompleteCard(card)}
                        color={color}
                      />
                      {card_type && (
                        <BoardAndCardTypeListDropdown
                          itemType={card_type}
                          listType="card"
                          setItemType={cardSelectedType =>
                            this.handleUpdateCardType(cardSelectedType)
                          }
                          containerStyle={{ margin: '-7.5px -3.5px 0 1.5px' }}
                          smallModal
                          triggerIcon
                          typeIconSize={19}
                        />
                      )}
                      <CardTitleLink
                        additionalClasses={isComplete && 'card-title-strike'}
                        card={card}
                        additionalCardTitleStyle={{ marginLeft: 10 }}
                      />
                      {hasHelperCards && (
                        <span
                          style={{
                            fontSize: '12px'
                          }}
                          data-tip="has helper cards"
                          data-for={forId}
                        >
                          🙋
                          <Tooltip {...{ place: 'bottom' }} id={forId} />
                        </span>
                      )}
                      {isHover && (
                        <IconButton
                          additionalClasses="sheet-view__card-title-edit-btn"
                          fontAwesome
                          icon="pencil"
                          color={color}
                          onClick={this.handleToggleEditMode}
                          tooltip="Edit Card Title"
                          tooltipOptions={{ place: 'bottom' }}
                        />
                      )}
                    </Fragment>
                  ) : (
                    <div style={{ ...card.attributes.view }}>
                      {card.groupByPath['speed'] == card.attributes.title ? (
                        <div style={{ marginRight: '5px' }}>
                          {getSpeedIcons(card.attributes.title)}
                        </div>
                      ) : null}
                      {card.attributes.title}
                    </div>
                  )}
                  {isHover && (
                    <IconButton
                      additionalClasses="sheet-view__card-nested-cards-add"
                      icon="add"
                      color={color}
                      onClick={() => this.handleNewCardInputButtonClick(card)}
                      tooltip="Add Nested Card"
                      tooltipOptions={{ place: 'bottom' }}
                      info={nestedCardsLength}
                    />
                  )}
                </div>
                {card.type !== 'groupby' && (
                  <div className="flex">
                    <IconButton
                      additionalClasses={classNames('right-action-bar_button', {
                        active: cardsSplitScreen
                      })}
                      color={color || '#a2a2a2'}
                      icon="flip_to_front"
                      onClick={() => {
                        !cardsSplitScreen && toggleCardsSplitScreen();
                        updateSelectedCard(slug);
                      }}
                      tooltip={'Keep card open'}
                      tooltipOptions={{ place: 'bottom' }}
                    />
                    <CardActionsDropdown
                      color={color}
                      card={this.props.card}
                      onAddCard={this.handleNewCardInputButtonClick}
                    />
                  </div>
                )}
              </Fragment>
            )}
          </div>
          {this.props.columns.map(column => (
            <Column
              key={column}
              {...{
                column,
                value: this.state[column],
                customFields,
                card,
                tips,
                handleValueChange: this.handleValueChange,
                handleValueUpdate: this.handleValueUpdate,
                setEditCardModalOpen: this.props.setEditCardModalOpen,
                sheetBorderStyle
              }}
            />
          ))}
          {this.props.configureColumns && (
            <div
              className="sheet-view__cell sheet-view__cell--add"
              style={sheetBorderStyle}
            />
          )}
        </div>
        {(this.state.showNestedCards || card.type == 'groupby') && (
          <GenericDragDropListing
            draggedItemProps={{
              origin: { topicId: this.props.topicId, cardId, laneUser }
            }}
            dropZoneProps={{ topicId: this.props.topicId, cardId, laneUser }}
            itemList={nestedCards}
            itemType={dragItemTypes.CARD}
            onDropItem={this.handleDropCard}
            parentListDragLeaveHandlers={
              this.props.dragLeaveHandlersForParentLists
            }
            renderItem={(nestedCard, dragHandlers) => (
              <ConnectedSheetCard
                color={color}
                card={nestedCard}
                columns={this.props.columns}
                configureColumns={this.props.configureColumns}
                dragLeaveHandlersForParentLists={dragHandlers}
                key={nestedCard.id}
                level={this.props.level + 1}
                topicId={this.props.topicId || defaultTopicId}
                planLens={planLens}
                onAddCard={this.props.onAddCard}
                customFields={customFields}
                tips={tips}
                laneUser={laneUser}
                assignCard={this.props.assignCard}
                filterCards={filterCards}
              />
            )}
          >
            {card.type !== 'groupby' && nested_tips.data.length > 0 && (
              <DMLoader
                dataRequirements={{
                  cardsWithAttributes: {
                    attributes: {
                      filterIDs: nested_tips.data
                    }
                  }
                }}
                loaderKey="cardsWithAttributes"
              />
            )}
            {this.state.showNewCardInput && (
              <SheetAddRow
                type="card"
                cardTitle={this.state.newCardTitle || ''}
                onChangeTitle={(newCardTitle, cardType) =>
                  this.setState({ newCardTitle, cardType })
                }
                onAdd={this.handleAddCard}
                onFooterTopicSelected={this.props.onFooterTopicSelected}
                columns={this.props.columns}
                configureColumns={this.props.configureColumns}
                parentTopic={parentTopic}
                onClose={() => this.setState({ showNewCardInput: false })}
                autoFocus
                style={{ paddingLeft: `${nestingLevelPadding + 20}px` }}
                customFields={customFields}
                tips={tips}
              />
            )}
          </GenericDragDropListing>
        )}
      </Fragment>
    );
  }
}

const createGetSortedCards = createSelector(
  topicId => topicId,
  topicId => {
    return cardIds =>
      getSortedCardsByIds(store.getState(), cardIds || [], topicId || '0');
  }
);

const getGroupByAttributes = createSelector(
  groupBy => groupBy?.selectedOptions,
  options => options.map(option => option.value)
);

function mapState(state, props) {
  const { menus, user, page, groupBy, labels, topics } = stateMappings(state);
  const uiSettings = user.attributes.ui_settings;
  const groupByAttributes = getGroupByAttributes(groupBy);
  const isGroupByActive = props.card.type == 'groupby' ? true : false;
  const myTopicsView = uiSettings.my_topics_view.find(
    board => board.id === page.topicId
  );
  const topicId = get(props, 'topic.id') || props.topicId || page.topicId;
  const getSortedCards = createGetSortedCards(topicId);
  const parentTopic = topics[topicId];
  return {
    parentTopic,
    myTopicsView,
    groupByAttributes,
    isGroupByActive,
    labels,
    cardsSplitScreen: menus.cardsSplitScreen,
    getSortedCards
  };
}

const PaginationContainer = createPaginationContainer(
  hoc(SheetCard),
  {
    query: graphql`
      fragment SheetCard_query on Query
        @argumentDefinitions(owner: { type: "ID!" }, cursor: { type: String }) {
        isCardExpandedConfig: config(
          owner: $owner
          config: "is_card_expanded"
        ) {
          value
        }
        helperCards: tips(first: 10, after: $cursor, helperFor: $owner)
          @connection(key: "SheetCard_helperCards") {
          edges {
            node {
              id
              title
              slug
            }
          }
        }
      }
    `
  },
  {
    getConnectionFromProps: props => props?.query?.helperCards,
    getFragmentVariables: (prevVars, count) => ({ ...prevVars, count }),
    getVariables: (_props, { cursor }, fragmentVars) => ({
      ...fragmentVars,
      cursor
    }),
    query: graphql`
      query SheetCardRefetchQuery($cursor: String, $owner: ID!) {
        ...SheetCard_query @arguments(owner: $owner, cursor: $cursor)
      }
    `
  }
);

const mapDispatch = {
  nestCardUnderCard: nestCardUnderCardAction,
  updateCard,
  toggleCardsSplitScreen,
  updateSelectedCard,
  setEditCardModalOpen,
  ensureCard
};

const ConnectedSheetCard = connect(
  mapState,
  mapDispatch
)(
  QueryRenderer(props => <PaginationContainer {...props} query={props} />, {
    query: graphql`
      query SheetCardQuery($owner: ID!) {
        ...SheetCard_query @arguments(owner: $owner)
      }
    `,
    vars: ({ card }) => ({
      owner: toGid('Tip', card?.id || 0)
    })
  })
);

export default ConnectedSheetCard;
