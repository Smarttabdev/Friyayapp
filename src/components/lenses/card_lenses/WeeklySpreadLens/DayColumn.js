import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { HOURS } from './constants';
import GenericDragDropListing from 'Components/shared/drag_and_drop/GenericDragDropListing';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum.js';
import LogtimeCard from './LogtimeCard';
import get from 'lodash/get';
import { addLogTime, updateLogTime } from 'Src/newRedux/database/cards/thunks';
import DayColumnCell from './DayColumnCell';

const getCardClassName = (day, currentDate) => {
  if (day.isSame(currentDate)) {
    return 'present';
  } else if (day.isBefore(currentDate)) {
    return 'past';
  } else {
    return 'future';
  }
};

class DayColumn extends Component {
  state = {
    loadingCells: []
  };

  addLoadingCell = id => {
    const { loadingCells } = this.state;
    this.setState({ loadingCells: [...loadingCells, id] });
  };

  removeLoadingCell = id => {
    const { loadingCells } = this.state;
    this.setState({ loadingCells: loadingCells.filter(x => x !== id) });
  };

  createHandleCellClick = ({ day, startMinute, cellId }) => async e => {
    const { addOnClick, dispatch, card } = this.props;
    const { loadingCells } = this.state;
    if (card && addOnClick && !loadingCells.includes(cellId)) {
      const startLoadingTimer = setTimeout(() => {
        this.addLoadingCell(cellId);
      }, 250);
      const startTime = day.clone().add(startMinute, 'minutes');
      const endTime = startTime.clone().add(59, 'minutes');
      await dispatch(addLogTime(card.id, startTime, endTime));
      clearTimeout(startLoadingTimer);
      this.removeLoadingCell(cellId);
    }
  };

  handleDropCard = event => {
    const { id: cardId, logtimeId } = event.droppedItemProps.item;
    const startTime = event.dropZoneProps.day
      .clone()
      .add(event.dropZoneProps.startMinute, 'minutes');
    const endTime = startTime.clone().add(59, 'minutes');
    this.props.dispatch(
      logtimeId
        ? updateLogTime(cardId, logtimeId, startTime, endTime)
        : addLogTime(cardId, startTime, endTime)
    );
  };

  handleAddCard = (cardId, day, startMinute) => {
    const startTime = day.clone().add(startMinute, 'minutes');
    const endTime = startTime.clone().add(59, 'minutes');
    this.props.dispatch(addLogTime(cardId, startTime, endTime));
  };

  renderHourCells = () => {
    const { addOnClick, day, filteredCards, topicId } = this.props;
    const { loadingCells } = this.state;
    return HOURS.map((hour, i) => (
      <DayColumnCell
        key={hour.text}
        addOnClick={addOnClick}
        hour={hour}
        day={day}
        createHandleCellClick={this.createHandleCellClick}
        i={i}
        handleDropCard={this.handleDropCard}
        loadingCells={loadingCells}
        filteredCards={filteredCards}
        topicId={topicId}
        onClickAddCard={this.handleAddCard}
      />
    ));
  };

  render() {
    const { logTimes = [], containerRef, day, currentDate } = this.props;
    const cardClass = getCardClassName(day, currentDate);

    return (
      <div className="day-column">
        {this.renderHourCells()}
        {logTimes.map(card => (
          <LogtimeCard
            cardClassName={cardClass}
            key={`${card.cardId}_${card.logtimeId}`}
            containerRef={containerRef}
            startTime={card.startTime}
            endTime={card.endTime}
            card={card}
          >
            {card.title}
          </LogtimeCard>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state, { day, card }) => {
  const dayKey = day.format('DD_MM_YYYY');
  let logTimes = get(state, '_newReduxTree.database.logtimes.data', {});
  logTimes = logTimes[dayKey];
  if (card && logTimes) {
    logTimes = logTimes.filter(lt => lt.cardId == card.id);
  }

  return {
    logTimes: logTimes || []
  };
};

export default connect(mapStateToProps)(DayColumn);
