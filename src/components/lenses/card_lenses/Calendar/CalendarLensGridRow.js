import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import LoadingIndicator from 'Components/shared/LoadingIndicator';
import AddCardCard from 'Components/shared/cards/AddCardCard';
import CalendarCard from './CalendarCard';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getUiSettings } from 'Src/helpers/user_config';

class CalendarLensGridRow extends PureComponent {
  static propTypes = {
    cardRequirements: PropTypes.any,
    cards: PropTypes.array,
    className: PropTypes.string,
    columnMode: PropTypes.string,
    columns: PropTypes.array,
    timeframeDate: PropTypes.object,
    topicId: PropTypes.any,
    users: PropTypes.array,
    updateCard: PropTypes.func
  };

  state = {
    rowIsOpen: true
  };

  handleToggleRowOpen = open => {
    this.setState({ rowIsOpen: open });
  };

  handleDropCard = ({
    droppedItemProps: { item },
    dropZoneProps: { dueDate, userId }
  }) => {
    this.props.updateCard({
      id: item.id,
      attributes: { due_date: dueDate.clone().subtract(1, 'milliseconds') },
      relationships: { tip_assignments: { data: [userId] } }
    });
  };

  render() {
    const { rowIsOpen } = this.state;

    const {
      cardRequirements,
      cards,
      columns,
      topicId,
      user,
      ui_settings,
      columnMode,
      rowHours,
      dmLoading
    } = this.props;
    let filteredCards = [];
    // this filters the cards assigned to the current user
    let filteredMyCards = [];
    if (cards) {
      cards.forEach(cd => {
        if (cd.attributes.tip_assignments) {
          cd.attributes.tip_assignments.forEach(c => {
            if (c.assignment_id == user.id) {
              filteredMyCards.push(cd);
            }
          });
        }
      });
    }

    if (ui_settings.current_active_template === 'CALENDAR') {
      filteredCards = cards;
    } else if (ui_settings.current_active_template === 'MY_CALENDAR') {
      filteredCards = filteredMyCards;
    }

    const gridRowClassNames = classNames(
      this.props.className,
      'planning-grid__row',
      { 'planning-grid__row--collapsed': !rowIsOpen }
    );

    return (
      <div className={gridRowClassNames}>
        {(columnMode === 'weeks' || columnMode === 'weeksWD') && (
          <div className="planning-grid__cell planning-grid__cell--rowtime">
            {rowHours}
          </div>
        )}

        {columns.map(col => (
          <div key={col.id} className="planning-grid__cell calendar-view__cell">
            <GenericDragDropListing
              dragClassName=""
              dropClassName="planning-grid__drop-zone"
              dropZoneProps={{
                dueDate: col.range[1],
                userId: user && user.id
              }}
              draggedItemProps={{}}
              itemContainerClassName=""
              itemList={
                filteredCards
                  ? filteredCards.filter(
                      card =>
                        !!moment(card.attributes.due_date).isBetween(
                          col.range[0],
                          col.range[1],
                          null,
                          '[)'
                        )
                    )
                  : []
              }
              itemType={dragItemTypes.CARD}
              onDropItem={this.handleDropCard}
              renderItem={card => (
                <CalendarCard
                  card={card}
                  className="planning-grid__card"
                  topicId={topicId}
                />
              )}
              headerItem={
                <div>
                  {(columnMode === 'months' || columnMode === 'monthsWD') && (
                    <div className="calendar-view__cell-day">
                      {col.dayOfMonth}
                    </div>
                  )}
                </div>
              }
            >
              {dmLoading && <LoadingIndicator />}
              <AddCardCard
                cardClassName="planning-grid__add-card"
                newCardAttributes={{
                  due_date: col.range[1].clone().subtract(1, 'milliseconds'),
                  start_date: col.range[0]
                }}
                newCardRelationships={{
                  tip_assignments: { data: [user && user.id] }
                }}
                topicId={topicId}
                transparent
                topMenu
                smallerCard
              />
            </GenericDragDropListing>
          </div>
        ))}
      </div>
    );
  }
}
const mapState = state => {
  const sm = stateMappings(state);
  const ui_settings = getUiSettings(state);

  return {
    user: sm.user,
    ui_settings
  };
};

const mapDispatch = {
  updateCard
};

export default connect(mapState, mapDispatch)(CalendarLensGridRow);
