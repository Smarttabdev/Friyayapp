import classNames from 'classnames';
import moment from 'moment';
import React, { Fragment } from 'react';
import get from 'lodash/get';
import { array, func, number, object, bool, string } from 'prop-types';
import { connect } from 'react-redux';

import Ability from 'Lib/ability';
import CardTitleLink from 'Components/shared/cards/elements/CardTitleLink';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import CardActionsDropdown from 'Components/shared/cards/elements/CardActionsDropdown';
import CardLabels from 'Components/shared/cards/elements/assemblies/CardLabels';
import Icon from 'Components/shared/Icon';
import IconButton from 'Components/shared/buttons/IconButton';
import UserAvatar from 'Components/shared/users/elements/UserAvatar';
import {
  dragItemTypes,
  GenericDragDropListing
} from 'Components/shared/drag_and_drop/_index';
import {
  nestCardUnderCard as nestCardUnderCardAction,
  updateCard,
  viewCard
} from 'Src/newRedux/database/cards/thunks';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { failure } from 'Utils/toast';
import GenericDropZone from 'Src/components/shared/drag_and_drop/GenericDropZone.js';
import GenericCard from 'Components/lenses/card_lenses/GenericCard';
import DateInput from 'Components/shared/forms/DateInput';
import { PulseComponent } from 'Src/components/lenses/card_lenses/Sheet/sheetConfig/pulse';
import { setEditCardModalOpen } from 'Src/newRedux/interface/modals/actions';
import Select from 'react-select';
import customStyles from 'src/components/shared/cards/AddAssigneeStyle';

class TodoCard extends GenericCard {
  static defaultProps = { level: 0 };

  static propTypes = {
    allCardsHash: object.isRequired,
    card: object.isRequired,
    dragLeaveHandlersForParentLists: array,
    level: number,
    nestCardUnderCard: func.isRequired,
    topicId: string,
    updateCard: func.isRequired,
    viewCard: func.isRequired,
    color: string,
    isParentExpanded: bool
  };

  state = {
    cardTitle: this.props.card.attributes.title,
    inEditMode: false,
    showNestedCards: !!get(
      this.props.card,
      'relationships.nested_tips.data.length'
    ),
    showNewCardInput: false,
    additionalStyles: customStyles,
    selectedAssignee: []
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown, true);
  }

  componentDidMount() {
    this.setState({
      selectedAssignee: this.props.card.relationships.tip_assignments.data.map(
        id => this.props.users.find(option => option.id == id)
      )
    });
  }

  handleDropCard = ({ droppedItemProps, dropZoneProps, itemOrder }) => {
    this.props.nestCardUnderCard({
      nestedCard: droppedItemProps.item,
      parentCard: this.props.allCardsHash[dropZoneProps.cardId],
      fromTopicId: droppedItemProps.origin.topicId,
      toTopicId: dropZoneProps.topicId,
      itemOrder
    });
  };

  handleKeyDown = e => {
    if (e.key == 'Escape' || e.keyCode == 27) {
      this.setState({ inEditMode: false });
    }
  };

  handleNewCardInputButtonClick = () => {
    this.setState({
      showNestedCards: true,
      showNewCardInput: !this.state.showNewCardInput
    });
  };

  handleToggleCompleteCard = card => {
    const { updateCard } = this.props;

    if (Ability.can('update', 'self', card)) {
      const { completed_percentage, completion_date } = card.attributes;
      const attributes = {
        completion_date: completion_date ? null : moment().toISOString(),
        completed_percentage: completed_percentage == 100 ? 0 : 100
      };

      updateCard({ id: card.id, attributes });
    } else {
      failure("You don't have permission to complete that card!");
    }
  };

  handleSaveTitleChange = () => {
    this.handleToggleEditMode();
    const { card, updateCard } = this.props;
    const attributes = {
      title: this.state.cardTitle
    };
    updateCard({ id: card.id, attributes });
  };

  handleTitleChange = cardTitle => {
    this.setState({ cardTitle });
  };

  handleToggleEditMode = () => {
    const inEditMode = this.state.inEditMode;
    this.setState({ inEditMode: !inEditMode });
    inEditMode
      ? window.removeEventListener('keydown', this.handleKeyDown, true)
      : window.addEventListener('keydown', this.handleKeyDown, true);
  };

  toggleDatePicker = () => {
    this.setState({ showDatePicker: !this.state.showDatePicker });
  };

  handleFocusChange = ({ focused }) => {
    this.setState({ showDatePicker: focused });
  };

  handleDateChange = (date, dateType) => {
    const value = date ? date.valueOf() : null;
    const { updateCard, card } = this.props;

    if (Ability.can('update', 'self', card)) {
      let attributes = {};

      attributes[dateType] = value ? moment(value).toISOString() : null;
      updateCard({ id: card.id, attributes });
    } else {
      failure("You don't have permission to update the card!");
    }
  };

  handleDueDateChange = date => {
    this.handleDateChange(date, 'due_date');
  };

  handleStartDateChange = date => {
    this.handleDateChange(date, 'start_date');
  };
  renderListingItem = (nestedCard, dragHandlers) => (
    <ConnectedTodoCard
      color={this.props.color}
      card={nestedCard}
      dragLeaveHandlersForParentLists={dragHandlers}
      key={nestedCard.id}
      level={this.props.level + 1}
      topicId={this.props.topicId || this.props.defaultTopicId}
      isParentExpanded={this.props.isParentExpanded}
    />
  );

  handleValueUpdate = updates => {
    this.props.updateCard({ id: this.props.card.id, ...updates });
  };

  render() {
    const {
      allCardsHash,
      card: {
        attributes: { completed_percentage, due_date, start_date },
        id: cardId,
        relationships: {
          nested_tips,
          tip_assignments: { data },
          topics: {
            data: [defaultTopicId]
          }
        }
      },
      card,
      dragLeaveHandlersForParentLists,
      level,
      topicId,
      users,
      color,
      setEditCardModalOpen,
      isParentExpanded
    } = this.props;
    const {
      inEditMode,
      showNestedCards,
      showNewCardInput,
      additionalStyles,
      selectedAssignee
    } = this.state;
    const isComplete = completed_percentage == 100;
    const userCanEdit = Ability.can('update', 'self', card);
    const momentDate = due_date ? moment(due_date) : due_date;
    const momentStartDate = start_date
      ? moment(start_date).format('MMM D YYYY')
      : '';

    let avatars = null;

    if (data && data > 0) {
      avatars = data.map((assignedUser, index) => {
        var person = users.find(user => {
          return user.id === assignedUser;
        });

        return (
          <UserAvatar
            user={person}
            key={person ? person.id : `${card.id}_${index}`}
            size={24}
          />
        );
      });
    }

    const className = classNames(
      'todo-card todo-card-list',
      {
        'show-caret': !this.state.showNestedCards
      },
      { 'todo-card--top-border': isParentExpanded }
    );

    const levelMargin = level * 20;
    const nestedCards = nested_tips.data
      .map(nestedCardId => allCardsHash[nestedCardId])
      .filter(nestedCard => !!nestedCard);

    return (
      <Fragment>
        <div
          className={className}
          style={{
            paddingLeft:
              (isParentExpanded && level == 1 && '20px') ||
              (isParentExpanded && '20px'),
            paddingRight: isParentExpanded && 0,
            borderColor: color
          }}
        >
          <div
            className="todo-card__wrapper"
            style={{
              marginLeft: `${levelMargin}px`,
              width: `calc(100% - ${levelMargin}px)`
            }}
          >
            <GenericDropZone
              dropClassName=""
              onDragStart={e => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onDragEnter={attrs => this.showAsNestable(attrs)}
              onDragLeave={attrs => this.dontShowAsNestable(attrs)}
              itemType={dragItemTypes.CARD}
              onDrop={this.handleNestCard}
              key="nest-zone"
            >
              <div className="nest-zone">
                <IconButton
                  additionalClasses="todo-card__nested-cards-caret dark-grey-icon-button"
                  fontAwesome
                  icon={
                    this.state.showNestedCards ? 'caret-down' : 'caret-right'
                  }
                  color={color}
                  onClick={this.handleNestedCardsCaretClick}
                />
              </div>
            </GenericDropZone>
            <IconButton
              fontAwesome
              icon={isComplete ? 'check-square' : 'square'}
              onClick={() => this.handleToggleCompleteCard(card)}
              color={color}
            />
            <div className="todo-card_title-container">
              <CardTitleLink
                additionalClasses={classNames('todo-card_title', {
                  striked: isComplete
                })}
                inEditMode={inEditMode}
                card={card}
                showCardTypeIcon
                color={color}
              />
              <span className="todo-card_title-edit-button">
                {userCanEdit && !inEditMode && (
                  <IconButton
                    fontAwesome
                    icon="pencil"
                    onClick={this.handleToggleEditMode}
                    color={color}
                  />
                )}
              </span>
              <IconButton
                additionalClasses="todo-card_title-edit-button"
                icon="add"
                onClick={this.handleNewCardInputButtonClick}
                color={color}
              />
            </div>
            <CardLabels card={card} expandDirection="left" />
            <div style={{ minWidth: '180px' }}>
              <Select
                transparent
                classNamePrefix="todo-assignee-react-select-dropdown"
                styles={additionalStyles}
                value={selectedAssignee}
                options={users}
                getOptionLabel={option => option.attributes.name}
                getOptionValue={option => option.id}
                onChange={selected => {
                  this.setState({ selectedAssignee: selected });
                }}
                onBlur={() =>
                  this.props.updateCard({
                    id: cardId,
                    relationships: {
                      tip_assignments: {
                        data: selectedAssignee.map(user => user.id)
                      }
                    }
                  })
                }
                placeholder="Assignee"
                isMulti
                isSearchable
              />
              {/* <span
                onClick={() =>
                  setEditCardModalOpen({ cardId: card.id, tab: 'Plan' })
                }
                style={avatars ? { display: 'block' } : null}
                className="todo-card_assigned"
              >
                {avatars ? avatars : 'Unassigned'}
              </span> */}
            </div>
            <div className="todo-card_start-due-dates">
              <span
                data-for={`${card.id}-todo-start`}
                data-tip={
                  momentStartDate ? 'Select start date' : 'Click to change'
                }
              >
                <DateInput
                  className="plan-tab-content__date"
                  date={start_date}
                  onChange={this.handleStartDateChange}
                  placeholder=""
                />
              </span>
              <Icon
                additionalClasses="small ml10 mr10"
                fontAwesome
                icon="arrow-right"
                onClick={this.toggleDatePicker}
                color={color}
              />
              <span
                data-for={`${card.id}-todo-due`}
                data-tip={!momentDate ? 'Select due date' : 'Click to change'}
              >
                <DateInput
                  className="plan-tab-content__date"
                  date={momentDate}
                  onChange={this.handleDueDateChange}
                  placeholder=""
                />
              </span>
            </div>
            <PulseComponent
              card={card}
              style={{ color: color || '#000' }}
              size="medium"
              handleValueUpdate={this.handleValueUpdate}
            />
            <CardActionsDropdown
              color={color}
              card={card}
              onAddCard={this.handleNewCardInputButtonClick}
            />
          </div>
        </div>
        {showNestedCards && (
          <GenericDragDropListing
            dragClassName="task-view_drag-card"
            draggedItemProps={{ origin: { topicId, cardId } }}
            dropZoneProps={{ topicId, cardId }}
            dragPreview={card => <div>{card.attributes.title}</div>}
            itemList={nestedCards}
            itemType={dragItemTypes.CARD}
            onDropItem={this.handleDropCard}
            parentListDragLeaveHandlers={dragLeaveHandlersForParentLists}
            renderItem={this.renderListingItem}
          >
            {showNewCardInput && (
              <AddCardCard
                cardStyle={{
                  marginLeft: `${levelMargin + 20}px`,
                  marginTop: '10px'
                }}
                inInputMode
                newCardRelationships={{ follows_tip: { data: card.id } }}
                topicId={topicId}
                onDismiss={this.handleNewCardInputButtonClick}
                transparent
                topMenu
              />
            )}
          </GenericDragDropListing>
        )}
      </Fragment>
    );
  }
}

const mapState = state => {
  const sm = stateMappings(state);

  return {
    allCardsHash: sm.cards,
    users: Object.values(sm.people)
  };
};

const mapDispatch = {
  nestCardUnderCard: nestCardUnderCardAction,
  updateCard,
  viewCard,
  setEditCardModalOpen
};

const ConnectedTodoCard = connect(mapState, mapDispatch)(TodoCard);

export default ConnectedTodoCard;
