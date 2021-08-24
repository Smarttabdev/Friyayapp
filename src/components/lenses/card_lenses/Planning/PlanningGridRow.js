import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddCardCard from 'Components/shared/cards/AddCardCard';
import PlanningCard from './PlanningCard';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import DMLoader from 'Src/dataManager/components/DMLoader';
import UserSelect from 'Components/shared/users/elements/UserSelect';
import LabelSelect from 'Components/shared/labels/elements/LabelSelect';
import SubtopicSelect from 'Components/shared/topics/elements/SubtopicSelect';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { updateCard } from 'Src/newRedux/database/cards/thunks';

class PlanningGridRow extends Component {
  static propTypes = {
    cardRequirements: PropTypes.any,
    cards: PropTypes.array,
    className: PropTypes.string,
    columnMode: PropTypes.string,
    columns: PropTypes.array,
    isCollapsible: PropTypes.bool,
    showCardsList: PropTypes.bool,
    showUserSelector: PropTypes.bool,
    timeframeDate: PropTypes.object,
    title: PropTypes.string,
    topicId: PropTypes.any,
    users: PropTypes.array,
    updateCard: PropTypes.func,
    dmLoading: PropTypes.bool,
    filterOption: PropTypes.string,
    filteredValue: PropTypes.any,
    onChangeOrderRow: PropTypes.func
  };

  state = {
    rowIsOpen: true
  };

  getGroupByAttributesObj = () => {
    const { filteredValue, filterOption, title, topicId } = this.props;
    switch (filterOption) {
      case 'priority_level':
        return {
          title: filteredValue ? filteredValue : title,
          attributes:
            filteredValue != 'unassigned'
              ? { priority_level: filteredValue }
              : {},
          dropZoneProps:
            filteredValue != 'unassigned'
              ? { priorityLevel: filteredValue }
              : {},
          relationships: {}
        };

      case 'assignee':
        return {
          title: filteredValue ? filteredValue.attributes.name : title,
          attributes: filteredValue
            ? { assignedId: [filteredValue.id] }
            : { unassigned: true },
          dropZoneProps: { userId: filteredValue && filteredValue.id },
          relationships: {
            tip_assignments: { data: [filteredValue && filteredValue.id] }
          }
        };

      case 'label':
        return {
          title: filteredValue ? filteredValue.attributes.name : title,
          attributes: filteredValue ? { labelId: [filteredValue.id] } : {},
          dropZoneProps: { labelId: filteredValue && filteredValue.id },
          relationships: {
            labels: { data: [filteredValue && filteredValue.id] }
          }
        };
      case 'board':
        return {
          title: filteredValue ? filteredValue.attributes.title : title,
          attributes: {},
          dropZoneProps: {
            boardId: filteredValue ? filteredValue.id : topicId
          },
          relationships: {}
        };
      case 'status':
        return {
          title: filteredValue ? filteredValue : title,
          attributes: {},
          dropZoneProps: {},
          relationships: {}
        };
    }
  };

  selectUpdateAttribute = dropZoneProps => {
    const { filterOption } = this.props;
    switch (filterOption) {
      case 'priority_level':
        return {
          attributes: { priority_level: dropZoneProps.priorityLevel },
          relationships: {}
        };
      case 'assignee':
        return {
          attributes: {},
          relationships: { tip_assignments: { data: [dropZoneProps.userId] } }
        };
      case 'label':
        return {
          attributes: {},
          relationships: { labels: { data: [dropZoneProps.labelId] } }
        };
      case 'board':
        return {
          attributes: {},
          relationships: { topics: { data: [dropZoneProps.boardId] } }
        };
      case 'status':
        return {
          attributes: {},
          relationships: {}
        };
    }
  };

  handleChangeUser = userId => {
    this.props.onChangeOrderRow(this.props.filteredValue, userId);
  };

  handleChangeLabel = labelId => {
    this.props.onChangeOrderRow(this.props.filteredValue, labelId);
  };

  handleChangeBoard = boardId => {
    this.props.onChangeOrderRow(this.props.filteredValue, boardId);
  };

  handleDropCard = ({ droppedItemProps: { item }, dropZoneProps }) => {
    this.props.updateCard({
      id: item.id,
      attributes: {
        due_date: dropZoneProps.dueDate,
        start_date: dropZoneProps.startDate,
        ...this.selectUpdateAttribute(dropZoneProps).attributes
      },
      relationships: this.selectUpdateAttribute(dropZoneProps).relationships
    });
  };

  handleToggleRowOpen = open => {
    this.setState({ rowIsOpen: open });
  };

  render() {
    const {
      cards,
      columns,
      isCollapsible,
      showCardsList,
      showUserSelector,
      topicId,
      filteredValue,
      filterOption,
      dmLoading
    } = this.props;

    const { rowIsOpen } = this.state;
    const gridRowClassNames = classNames(
      this.props.className,
      'planning-grid__row',
      { 'planning-grid__row--collapsed': !rowIsOpen }
    );

    return (
      <div className={gridRowClassNames}>
        <div className="planning-grid__cell planning-grid__cell--user relative">
          <div className="planning-grid__cell--user-avatar-container">
            {showUserSelector && filterOption == 'assignee' && (
              <UserSelect
                className="planning-grid__user-select"
                showAvatar
                selectedUser={filteredValue}
                onSelectUser={this.handleChangeUser}
              />
            )}
            {showUserSelector && filterOption == 'label' && (
              <LabelSelect
                hideSelectText
                onSelectLabel={this.handleChangeLabel}
                selectedLabel={filteredValue}
              />
            )}
            {showUserSelector && filterOption == 'board' && (
              <SubtopicSelect
                onSelectSubtopic={this.handleChangeBoard}
                selectedSubtopic={filteredValue}
                topicId={topicId}
              />
            )}
          </div>

          {rowIsOpen && (
            <span className="planning-grid__user-name">
              {this.getGroupByAttributesObj().title}
            </span>
          )}
          {isCollapsible && (
            <button
              className="planning-grid__user-hide"
              onClick={() => this.handleToggleRowOpen(!rowIsOpen)}
            >
              {rowIsOpen ? '-' : '+'}
            </button>
          )}
          <DMLoader
            dataRequirements={{
              cardsWithAttributes: {
                attributes: {
                  topicId:
                    filteredValue && filterOption == 'board'
                      ? filteredValue.id
                      : topicId,
                  ...this.getGroupByAttributesObj().attributes,
                  dueDateFrom: moment(columns[0].range[0]).toISOString(),
                  dueDateTo: moment(
                    columns[columns.length - 1].range[1]
                  ).toISOString()
                }
              }
            }}
            loaderKey="cardsWithAttributes"
            style={{
              position: 'absolute',
              top: '50%',
              right: 'calc(100% + 120px)',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </div>
        {columns.map(col => (
          <div key={col.id} className="planning-grid__cell">
            {showCardsList && (
              <GenericDragDropListing
                dragClassName=""
                dropClassName="planning-grid__drop-zone"
                dropZoneProps={{
                  dueDate: col.range[1],
                  startDate: col.range[0],
                  ...this.getGroupByAttributesObj().dropZoneProps
                }}
                draggedItemProps={{}}
                itemContainerClassName=""
                itemList={cards}
                itemType={dragItemTypes.CARD}
                onDropItem={this.handleDropCard}
                renderItem={card =>
                  rowIsOpen &&
                  moment(card.attributes.due_date).isSameOrBefore(
                    col.range[1]
                  ) &&
                  moment(card.attributes.due_date).isSameOrAfter(
                    col.range[0]
                  ) && (
                    <PlanningCard
                      card={card}
                      className="planning-grid__card"
                      topicId={topicId}
                    />
                  )
                }
              >
                <AddCardCard
                  cardClassName="planning-grid__add-card"
                  newCardAttributes={{
                    due_date: col.range[1],
                    start_date: col.range[0],
                    ...this.getGroupByAttributesObj().attributes
                  }}
                  newCardRelationships={{
                    ...this.getGroupByAttributesObj().relationships
                  }}
                  topMenu
                  transparent
                  topicId={
                    filteredValue && filterOption == 'board'
                      ? filteredValue.id
                      : topicId
                  }
                />
              </GenericDragDropListing>
            )}
          </div>
        ))}
      </div>
    );
  }
}

const mapDispatch = {
  updateCard
};

export default connect(null, mapDispatch)(PlanningGridRow);
