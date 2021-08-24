import classNames from 'classnames';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineGridSection from './TimelineGridSection';
import { updateCard } from 'Src/newRedux/database/cards/thunks';
import { scrollToShow } from 'Src/lib/utilities';
import VisibilitySensor from 'react-visibility-sensor';
import chroma from 'chroma-js';
import { capitalize } from 'lodash';

const initialColumnsToShowForDaysInfinite = 24;
class TimelineGrid extends Component {
  static propTypes = {
    cards: PropTypes.array,
    className: PropTypes.string,
    columnMode: PropTypes.string,
    timeframeDate: PropTypes.object,
    topicId: PropTypes.any,
    updateCard: PropTypes.func
  };

  constructor(props) {
    super(props);

    const columns = columnsConfig[this.props.columnMode](
      this.props.timeframeDate,
      this.props.timeframeLength
    );

    this.state = {
      columns,
      activeMonth: moment(columns[0].range[0]).format('MMMM'),
      columnsToShow: initialColumnsToShowForDaysInfinite,
      containerWidth: 0
    };
  }

  componentDidMount() {
    this.cardsRef.addEventListener('scroll', this.handleCardsScroll);
    this.props.setActiveMonth(this.state.activeMonth);
    this.setState({ containerWidth: this.gridRef.offsetWidth });
  }

  getReselectCustomStyles = (level, selectorColor) => {
    const colourStyles = {
      container: styles => ({
        ...styles,
        width: '100%',
        borderRadius: '12px',
        margin: '0'
      }),
      control: styles => ({
        ...styles,
        borderRadius: '0 12px 12px 0',
        backgroundColor: 'white',
        border: 'none',
        minHeight: '32px',
        height: '32px'
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected
            ? data.color
            : isFocused
            ? color.alpha(0.1).css()
            : null,
          color: isDisabled
            ? '#ccc'
            : isSelected
            ? chroma.contrast(color, 'white') > 2
              ? 'white'
              : 'black'
            : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default'
        };
      },
      input: styles => ({
        ...styles,

        height: '21px',
        color: selectorColor,
        // backgroundColor: '#56CCF2',
        padding: '2px',
        alignItems: 'center',
        fontFamily: 'Helvetica',
        fontSize: '14px',
        lineHeight: '0px'
      }),
      placeholder: styles => ({
        ...styles,
        width: 'auto',
        height: '21px',
        color: '#fff',
        marginLeft: '6px',
        backgroundColor: selectorColor,
        padding: '12px',
        alignItems: 'center',
        borderRadius: '4px',
        fontFamily: 'Helvetica',
        fontSize: '14px',
        lineHeight: '0px',
        top: '43%'
      }),
      singleValue: (styles, { data }) => ({ ...styles }),
      multiValue: (styles, { data }) => {
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: color.alpha(1).css(),
          borderRadius: '4px',
          width: 'auto',
          color: '#fff',
          position: 'absolute',
          top: 0
        };
      },
      multiValueLabel: (styles, { data }) => ({
        ...styles,
        color: '#fff',
        fontFamily: 'Helvetica',
        fontSize: '14px',
        lineHeight: '21px',
        padding: '0 0 0 6px'
      }),
      multiValueRemove: (styles, { data }) => ({
        ...styles,
        color: 'white',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'transparent',
          color: 'white'
        }
      }),
      menu: (styles, { data }) => ({
        ...styles,
        width: '100%',
        maxHeight: '200px',
        overflow: 'auto',
        zIndex: 100
      })
    };

    return colourStyles;
  };

  componentDidUpdate(
    { columnMode, timeframeDate, timeframeLength },
    { columnsToShow, activeMonth }
  ) {
    if (
      columnMode !== this.props.columnMode ||
      timeframeDate !== this.props.timeframeDate ||
      timeframeLength !== this.props.timeframeLength
    ) {
      let timeframeDateToUse = this.props.timeframeDate;
      let startFromDay = false;
      if (this.props.columnMode == 'daysInfinite') {
        const incomingYear = timeframeDateToUse.clone().year();
        const currentYear = new Date().getFullYear();
        if (incomingYear != currentYear) {
          timeframeDateToUse = timeframeDateToUse.clone().startOf('year');
          startFromDay = true;
        }
      }
      this.setState({
        columns: columnsConfig[this.props.columnMode](
          timeframeDateToUse,
          this.props.timeframeLength,
          startFromDay
        ),
        columnsToShow: initialColumnsToShowForDaysInfinite,
        activeMonth: moment(this.state.columns[0].range[0]).format('MMMM')
      });
    }

    if (columnsToShow != this.state.columnsToShow) {
      this.setState({ containerWidth: this.gridRef.offsetWidth });
    }

    if (activeMonth != this.state.activeMonth) {
      this.props.setActiveMonth(this.state.activeMonth);
    }
  }

  componentWillUnmount() {
    this.cardsRef.removeEventListener('scroll', this.handleCardsScroll);
  }

  handleCardsScroll = ev => {
    requestAnimationFrame(() => {
      this.headerRef.scrollLeft = ev.target.scrollLeft;
    });
  };

  handleDateChange = (
    item,
    type,
    dueDate,
    startDate,
    newAttributes = {},
    newRelationships = {}
  ) => {
    const { columnMode } = this.props;
    const attributes = newAttributes || {};

    if (columnMode?.startsWith('weeks')) {
      dueDate = dueDate.isoWeekday(5);
    }

    if (type === 'due' && dueDate.isAfter(moment(item.attributes.start_date))) {
      attributes.due_date = dueDate.format();
    } else if (
      type === 'start' &&
      startDate.isBefore(moment(item.attributes.due_date))
    ) {
      attributes.start_date = startDate.format();
    } else {
      attributes.due_date = dueDate.format();
      attributes.start_date = startDate.format();
    }

    this.props.updateCard({
      id: item.id,
      attributes,
      relationships: newRelationships
    });
  };

  handleDrop = ({
    draggedItemProps: { item, dragType },
    dropZoneProps: { dueDate, startDate, newAttributes, newRelationships }
  }) => {
    this.handleDateChange(
      item,
      dragType,
      dueDate,
      startDate,
      newAttributes,
      newRelationships
    );
  };

  handleDropOverCard = ({ draggedItemProps: { item, dragType }, monitor }) => {
    const dragOffset = monitor.getClientOffset();
    const windowOffset = this.gridRef.getBoundingClientRect();

    const left = dragOffset.x + this.gridRef.scrollLeft - windowOffset.x;
    const width = this.gridRef.scrollWidth;
    const colWidth = width / this.state.columns.length;
    const columnIndex = Math.floor(left / colWidth);
    const [startDate, dueDate] = this.state.columns[columnIndex].range;

    this.handleDateChange(item, dragType, dueDate, startDate);
  };

  afterCardCreated = cardId => {
    if (this.props.cardsSplitScreen) {
      this.props.updateSelectedCard(cardId);
    }
    const elem = document.querySelector('.card-title.c' + cardId);
    scrollToShow(elem, 14, 24);
  };

  addMoreDays = () => {
    //Used to increase number of days in continuous days scroll

    this.props.setIsAddingMoreDays(true);
    this.setState(
      prev => ({
        columnsToShow: prev.columnsToShow + initialColumnsToShowForDaysInfinite
      }),
      () => {
        this.props.setIsAddingMoreDays(false);
      }
    );
  };

  checkCurrentMonthFromDate = (isVisible, col) => {
    if (isVisible) {
      //If isVisible and is first day of the month
      let activeMonth = moment(col.range[0]).format('MMMM');
      this.setState({ activeMonth });
    }
  };

  render() {
    let { columns, columnsToShow } = this.state;
    const { groupByOptions, className } = this.props;
    const gridClassNames = classNames(className, 'timeline-grid');
    columns = columns.filter((val, i) => i < columnsToShow);
    // const columnWidth = 100 / this.state.columns.length;
    const columnWidth = 100 / columns.length;

    const rangeStart = columns[0].range[0];
    const rangeEnd = columns[columns.length - 1].range[1];
    const cards = this.props.cards.filter(filterCard.bind(null, this.state));

    return (
      <div
        className={gridClassNames}
        ref={ref => (this.gridRef = ref)}
        style={{
          width:
            this.props.columnMode == 'daysInfinite' ? 'max-content' : 'initial'
        }}
      >
        <div
          className="timeline-grid__grid"
          style={{ width: `${columns.length * 250}px` }}
        >
          <div
            ref={ref => (this.headerRef = ref)}
            className="timeline-grid__header"
          >
            <div className="timeline-grid__row">
              {columns.map((col, i) => (
                <VisibilitySensor
                  key={i}
                  onChange={isVisible =>
                    this.checkCurrentMonthFromDate(isVisible, col)
                  }
                >
                  <div
                    key={col.id}
                    className="timeline-grid__cell timeline-grid__cell--header"
                  >
                    {col.name}
                  </div>
                </VisibilitySensor>
              ))}
            </div>
          </div>
          <div
            ref={ref => (this.cardsRef = ref)}
            className="timeline-grid__content"
          >
            <TimelineGridSection
              columns={columns}
              columnWidth={columnWidth}
              cards={cards}
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              topicId={this.props.topicId}
              afterCardCreated={this.afterCardCreated}
              cardRequirements={this.props.cardRequirements}
              handleDropOverCard={this.handleDropOverCard}
              handleDrop={this.handleDrop}
              groupByOptions={groupByOptions}
              getReselectCustomStyles={this.getReselectCustomStyles}
            />
          </div>
        </div>
      </div>
    );
  }
}

function filterCard({ columns }, card) {
  const startDate = moment(
    card.attributes.start_date || card.attributes.due_date
  );
  const dueDate = moment(card.attributes.due_date);
  const rangeStart = columns[0].range[0];
  const rangeEnd = columns[columns.length - 1].range[1];

  return !startDate.isAfter(rangeEnd) && !dueDate.isBefore(rangeStart);
}

const checkForStartOfYear = date => {
  const month = moment(date).format('M');
  const day = moment(date).format('D');

  return month == 1 && day == 1;
};

const columnsConfig = {
  quarters: year =>
    [...new Array(4)].map((item, index) => {
      const quarterIndex = index + 1;
      const quarter = year.clone().set({ quarter: quarterIndex });

      const name = `Q${quarterIndex}`;
      const quarterStart = quarter.startOf('quarter');
      const quarterEnd = quarter.clone().endOf('quarter');

      return { id: name, name, range: [quarterStart, quarterEnd] };
    }),
  months: year =>
    [...new Array(12)].map((item, index) => {
      const month = year.clone().set({ month: index });

      const name = month.format('MMMM');
      const monthStart = month.startOf('month');
      const monthEnd = month.clone().endOf('month');

      return { id: name, name, range: [monthStart, monthEnd] };
    }),
  weeks: month =>
    [...new Array(getWeeksInMonth(month))].map((item, index) => {
      const monthStart = month.clone().startOf('month');
      const week = monthStart.add(index, 'weeks');

      const weekStart = week.startOf('week');
      const weekEnd = week.clone().endOf('week');
      const name = `${weekStart.format('MMM D')} - ${weekEnd.format('MMM D')}`;

      return { id: name, name, range: [weekStart, weekEnd] };
    }),
  weeksWD: month =>
    [...new Array(getWeeksInMonth(month))].map((item, index) => {
      const monthStart = month.clone().startOf('month');
      const week = monthStart.add(index, 'weeks');

      const weekStart = week.startOf('week').add(1, 'days');
      const weekEnd = week
        .clone()
        .startOf('week')
        .add(5, 'days');
      const name = `${weekStart.format('MMM D')} - ${weekEnd.format('MMM D')}`;

      return { id: name, name, range: [weekStart, weekEnd] };
    }),
  days: week =>
    [...new Array(7)].map((item, index) => {
      const day = week.clone().set({ day: index });

      const name = day.format('dddd');
      const dayStart = day.clone().startOf('day');
      // const dayEnd = day.clone().endOf('day');
      const dayEnd = day.clone().endOf('day');

      return { id: name, name, range: [dayStart, dayEnd] };
    }),
  daysWD: week =>
    [...new Array(5)].map((item, index) => {
      const day = week.clone().set({ day: index + 1 });

      const name = day.format('dddd');
      const dayStart = day.startOf('day');
      const dayEnd = day.clone().endOf('day');

      return { id: name, name, range: [dayStart, dayEnd] };
    }),
  daysInfinite: (week, timeframeLength, startFromDay) => {
    let hasFoundStartOfYear = false;
    return [...new Array(timeframeLength)]
      .map((item, index) => {
        const day = week.clone().set({ day: index });

        if (startFromDay && !hasFoundStartOfYear) {
          const isStartOfYear = checkForStartOfYear(day);
          if (isStartOfYear) hasFoundStartOfYear = true;

          if (!hasFoundStartOfYear) return null;
        }

        const name = day.format('D');
        const dayStart = day.clone().startOf('day');
        const dayEnd = day.clone().endOf('day');

        return { id: name, name, range: [dayStart, dayEnd] };
      })
      .filter((item, i) => item != null);
  }
};

function getWeeksInMonth(month) {
  const weekdaysBefore =
    month
      .clone()
      .startOf('month')
      .weekday() - 1;
  const totalDays = month.daysInMonth() + weekdaysBefore;

  return Math.ceil(totalDays / 7);
}

const mapDispatch = { updateCard };

export default connect(null, mapDispatch, undefined, { withRef: true })(
  TimelineGrid
);
