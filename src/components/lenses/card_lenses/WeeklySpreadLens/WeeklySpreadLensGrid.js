import React, { Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import CalendarLensGridHeader from '../Calendar/CalendarLensGridHeader';
import { COLUMNS_CONFIG } from '../Calendar/CalendarLensGrid';
import { HOURS } from './constants';
import DayColumn from './DayColumn.js';
import moment from 'moment';

class WeeklySpreadLensGrid extends Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    this.currentDate = moment().startOf('day');
  }

  componentDidMount() {
    this.containerRef.current.scrollTo(0, 400);
  }

  render() {
    const {
      startDate,
      columnMode,
      card,
      filteredCards,
      compact,
      addOnClick,
      topicId
    } = this.props;
    const columns = COLUMNS_CONFIG[columnMode](startDate);

    return (
      <div className="planning-view__timeline planning-grid wsv">
        <CalendarLensGridHeader
          handleRef={ref => (this.headerRef = ref)}
          columns={columns}
          columnMode={columnMode}
          compact={compact}
        />
        <div ref={this.containerRef} className="planning-grid__cards">
          <div className="hour-column">
            {HOURS.map(hour => (
              <div className="hour-column-cell" key={hour.text}>
                <p>{hour.text}</p>
              </div>
            ))}
          </div>
          {columns.map(column => (
            <DayColumn
              key={column.id}
              day={column.range[0]}
              currentDate={this.currentDate}
              containerRef={this.containerRef}
              card={card}
              filteredCards={filteredCards}
              addOnClick={addOnClick}
              topicId={topicId}
            />
          ))}
        </div>
      </div>
    );
  }
}
WeeklySpreadLensGrid.propTypes = {
  columnMode: PropTypes.string,
  startDate: PropTypes.object,
  card: PropTypes.object,
  compact: PropTypes.bool,
  addOnClick: PropTypes.bool
};

const hoc = Component => props => {
  useEffect(() => {
    if (!props.card) return;

    queries.loadLogTimes([props.card.id]);

    const disposers = subscriptions.logTimeSubscriptions({
      tipId: props.card.id
    });

    return () => disposers.forEach(d => d.dispose());
  }, [props.card?.id]);

  return <Component {...props} />;
};

export default hoc(WeeklySpreadLensGrid);
