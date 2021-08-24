import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GenericDropZone from 'Components/shared/drag_and_drop/GenericDropZone';
import { dragItemTypes } from 'Components/shared/drag_and_drop/dragTypeEnum';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { getStartEndDates } from 'Src/lib/utilities';
import { failure } from 'Utils/toast';
import {
  getFilterSettings,
  setUserFilterSettings
} from 'Src/helpers/user_config';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
class TimelineTimeframeSelector extends Component {
  static propTypes = {
    className: PropTypes.string,
    columnMode: PropTypes.string,
    value: PropTypes.object,
    onChange: PropTypes.func,
    goalView: PropTypes.bool,
    board: PropTypes.string,
    include_uncompleted_sorted_cards: PropTypes.bool,
    offset: PropTypes.number,
    updateCard: PropTypes.func
  };

  state = {
    changedNextValue: ''
  };

  getNextTimeframeValue = offset => {
    const { goalView, board, columnMode, value } = this.props;
    let TFConfig = timeframeConfig;
    if (board === 'calendar') {
      TFConfig = calendarTFConfig;
    } else if (board === 'wsv') {
      TFConfig = wsvTFConfig;
    }
    if (board == 'planLens') TFConfig = planTFConfig;
    if (goalView) TFConfig = goalTFConfig;

    const nextValue = value.clone().add(offset, TFConfig[columnMode].units);
    return nextValue;
  };

  getEndDate = (startDate, offset, mode) => {
    let endDate = startDate;

    if (['quarters', 'months', 'weeks', 'days'].includes(mode)) {
      endDate = moment(startDate)
        .add(offset || 1, mode)
        .subtract(1, 'day')
        .endOf('day');
    }

    return endDate;
  };

  calendarBoardEndDate = (nextValue, positiveOffset) => {
    const { columnMode } = this.props;
    let endDate;
    if (columnMode == 'monthsWD') {
      endDate = this.getEndDate(moment(nextValue), positiveOffset, 'months');
      const dayOfMonth = +moment(endDate).format('DD');
      endDate = endDate.subtract(dayOfMonth, 'day');
      const dayOfWeek = moment(endDate).day();
      const lastWeekendDays = dayOfWeek == 6 ? 1 : dayOfWeek == 0 ? 2 : 0;
      return endDate.subtract(lastWeekendDays, 'day').endOf('hour');
    }
    if (columnMode == 'months') {
      endDate = this.getEndDate(moment(nextValue), positiveOffset, 'months');
      const dayOfMonth = +moment(endDate).format('DD');
      return endDate.subtract(dayOfMonth, 'day').endOf('hour');
    } else if (columnMode == 'weeksWD') {
      return nextValue
        .clone()
        .weekday(5)
        .endOf('hour');
    } else if (columnMode == 'weeks') {
      return nextValue
        .clone()
        .endOf('week')
        .endOf('hour');
    }
  };

  handleTimeframeChange(offset) {
    const { board, columnMode, value } = this.props;
    const nextValue = this.getNextTimeframeValue(offset);
    const positiveOffset = Math.abs(offset);
    let endDate;
    if (board == 'calendar') {
      endDate = this.calendarBoardEndDate(nextValue, positiveOffset);
    } else {
      endDate = this.getEndDate(
        moment(nextValue),
        positiveOffset,
        columnMode
      ).endOf('day');
    }
    this.setState({
      changedNextValue: endDate.toISOString(),
      offset: positiveOffset
    });
    this.props.onChange(nextValue);
  }

  handleDrop = ({ draggedItemProps }) => {
    if (
      draggedItemProps.item.attributes.start_date <
        this.state.changedNextValue ||
      !draggedItemProps.item.attributes.start_date
    ) {
      this.props.updateCard({
        id: draggedItemProps.item.id,
        attributes: {
          due_date: moment(this.state.changedNextValue).subtract(
            1,
            'milliseconds'
          )
        }
      });
    } else {
      failure('Due date can not be before Start date');
    }
  };

  render() {
    const controlClassNames = classNames(
      this.props.className,
      'timeline-timeframe-selector'
    );

    const {
      columnMode,
      board,
      goalView,
      value,
      include_uncompleted_sorted_cards,
      setUserFilterSettings,
      color,
      dropZoneEnabled,
      offset = 1
    } = this.props;
    let TFConfig = timeframeConfig;
    if (board === 'calendar') {
      TFConfig = calendarTFConfig;
    } else if (board === 'wsv') {
      TFConfig = wsvTFConfig;
    }
    if (board == 'planLens') TFConfig = planTFConfig;
    if (goalView) TFConfig = goalTFConfig;

    return (
      <div className={controlClassNames}>
        <GenericDropZone
          dropClassName="timeline-timeframe-selector__drop-zone"
          itemType={dragItemTypes.CARD}
          onDragEnter={() => this.handleTimeframeChange(-offset)}
          onDrop={this.handleDrop}
          dropsDisabled={!dropZoneEnabled}
        >
          <button
            type="button"
            style={{ color }}
            className="timeline-timeframe-selector__button material-icons-outlined"
            onClick={() => this.handleTimeframeChange(-offset)}
          >
            keyboard_arrow_left
          </button>
        </GenericDropZone>
        <span className="timeline-timeframe-selector__value">
          {TFConfig[columnMode].format(value, offset)}
        </span>
        <GenericDropZone
          dropClassName="timeline-timeframe-selector__drop-zone"
          itemType={dragItemTypes.CARD}
          onDragEnter={() => this.handleTimeframeChange(offset)}
          onDrop={this.handleDrop}
          dropsDisabled={!dropZoneEnabled}
        >
          <button
            type="button"
            style={{ color }}
            className="timeline-timeframe-selector__button material-icons-outlined"
            onClick={() => this.handleTimeframeChange(offset)}
          >
            keyboard_arrow_right
          </button>
        </GenericDropZone>
        {board === 'burndown' && (
          <a
            className={`timeline-timeframe-complete__status ${include_uncompleted_sorted_cards &&
              'active'}`}
            onClick={() => {
              const payload = {
                include_uncompleted_sorted_cards: !include_uncompleted_sorted_cards
              };
              setUserFilterSettings(payload);
            }}
          >
            Uncompleted
          </a>
        )}
      </div>
    );
  }
}

// utility
const weekFormatter = date => {
  const weekStart = date.clone().startOf('week');
  const weekEnd = date.clone().endOf('week');

  return `${weekStart.format('YYYY MMMM D')} - ${weekEnd.format('MMMM D')}`;
};

const weekDaysFormatter = date => {
  const weekStart = date.clone().weekday(1);
  const weekEnd = date.clone().weekday(5);

  return `${weekStart.format('YYYY MMMM D')} - ${weekEnd.format('MMMM D')}`;
};

const infiniteFormater = date => {
  const incomingYear = date.clone().year();
  const currentYear = new Date().getFullYear();
  const timelineStart = date
    .clone()
    .startOf(incomingYear == currentYear ? 'week' : 'year');
  const timelineEnd = date.clone().endOf('year');

  return `${timelineStart.format('YYYY MMMM D')} - ${timelineEnd.format(
    'MMMM D'
  )}`;
};

// configs for diff views
const timeframeConfig = {
  days: { format: weekFormatter, units: 'weeks' },
  daysWD: { format: weekDaysFormatter, units: 'weeks' },
  daysInfinite: {
    format: infiniteFormater,
    units: 'years'
  },
  months: { format: date => date.format('YYYY'), units: 'years' },
  quarters: { format: date => date.format('YYYY'), units: 'years' },
  weeks: { format: date => date.format('YYYY MMMM'), units: 'months' },
  weeksWD: { format: date => date.format('YYYY MMMM'), units: 'months' }
};

const calendarTFConfig = {
  months: { format: date => date.format('MMM YYYY'), units: 'months' },
  monthsWD: { format: date => date.format('MMM YYYY'), units: 'months' },
  weeks: { format: weekFormatter, units: 'weeks' },
  weeksWD: { format: weekDaysFormatter, units: 'weeks' }
};

const goalTFConfig = {
  months: { format: date => date.format('YYYY MMMM'), units: 'months' },
  quarters: { format: date => date.format('YYYY [Q]Q'), units: 'quarters' },
  weeks: {
    format: (date, offset) => {
      const { startDate, endDate } = getStartEndDates(date, 'weeks', offset);
      return `${startDate.format('YYYY MMMM D')} - ${endDate.format('MMMM D')}`;
    },
    units: 'weeks'
  },
  days: {
    format: (date, offset) => {
      if (offset == 1) {
        return date.format('YYYY MMMM D');
      }
      const { startDate, endDate } = getStartEndDates(date, 'days', offset);
      return `${startDate.format('YYYY MMMM D')} - ${endDate.format('MMMM D')}`;
    },
    units: 'days'
  }
};

const wsvTFConfig = {
  monthDays: {
    format: date =>
      `${date.format('YYYY MMMM DD')} - ${date
        .clone()
        .endOf('month')
        .format('MMMM DD')}`,
    units: 'month'
  },
  weeks: {
    format: date =>
      `${date.format('YYYY MMMM DD')} - ${date
        .clone()
        .endOf('week')
        .format('MMMM DD')}`,
    units: 'week'
  },
  weeksWD: {
    format: date =>
      `${date.format('YYYY MMMM DD')} - ${date
        .clone()
        .add(4, 'day')
        .format('MMMM DD')}`,
    units: 'week'
  }
};

const planTFConfig = {
  monthDays: {
    format: date =>
      `${date.format('YYYY MMMM DD')} - ${date
        .clone()
        .endOf('month')
        .format('MMMM DD')}`,
    units: 'month'
  },
  weeks: {
    format: date =>
      `${date.format('YYYY MMMM DD')} - ${date
        .clone()
        .endOf('week')
        .format('MMMM DD')}`,
    units: 'week'
  },
  days: {
    format: (date, offset) => {
      return date.format('YYYY MMMM D');
    },
    units: 'days'
  }
};

const mapState = state => {
  const {
    page: { topicId }
  } = stateMappings(state);
  const filter_setting = getFilterSettings(state);
  return {
    topicId,
    include_uncompleted_sorted_cards:
      filter_setting.include_uncompleted_sorted_cards
  };
};

const mapDispatch = {
  setUserFilterSettings,
  updateCard
};

export default connect(mapState, mapDispatch)(TimelineTimeframeSelector);
