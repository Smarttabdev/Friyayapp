import React, { Fragment } from 'react';
import TimelineTimeframeSelector from 'Components/shared/TimelineTimeframeSelector';
import TimelineModeSelector from 'Components/shared/TimelineModeSelector';
import Popup from 'Src/components/shared/Popup';
import DateRangePicker from 'Src/components/shared/dates/DateRangePicker';

const getRange = (mode, offset = 1) => {
  let startDate = moment().startOf('day');
  let endDate = moment().endOf('day');

  let unit = mode;

  if (mode == 'any') {
    unit = 'year';
  } else if (mode === 'anyDateRange') {
    unit = 'weeks';
  }

  if (['quarters', 'months', 'weeks', 'days', 'year'].includes(unit)) {
    startDate = moment().startOf(unit);
    endDate = moment().endOf(unit);
  }

  if (['weeks', 'days'].includes(mode)) {
    endDate.add(offset - 1, mode);
  }

  return { startDate, endDate };
};

const getEndDate = (startDate, offset, mode) => {
  let endDate = startDate;

  if (['quarters', 'months', 'weeks', 'days'].includes(mode)) {
    endDate = moment(startDate)
      .add(offset || 1, mode)
      .subtract(1, 'day')
      .endOf('day');
  }

  return endDate;
};

const TimeframeSelectors = ({
  color,
  mode,
  startDate,
  endDate,
  offsets,
  onModeChange,
  onDateRangeChange,
  onOffsetChange,
  dropZoneEnabled,
  bold
}) => {
  const offset = offsets[mode] || 1;
  const handleModeChange = mode => {
    onModeChange(mode);
    const range = getRange(mode, offset);
    range &&
      onDateRangeChange({
        mode,
        offset,
        ...range
      });
  };

  const handleDateChange = startDate => {
    onDateRangeChange({
      mode,
      offset,
      startDate: moment(startDate).startOf('day'),
      endDate: getEndDate(startDate, offset, mode)
    });
  };

  const handleDateRangeChange = ({ startDate, endDate }) => {
    onDateRangeChange({
      mode,
      offset,
      startDate: moment(startDate).startOf('day'),
      endDate: moment(endDate).endOf('day')
    });
  };

  const handleOffsetChange = id => e => {
    const offset = Number(e.target.value);
    onOffsetChange(id, offset);
    onDateRangeChange({
      mode,
      offset,
      startDate: moment(startDate).startOf('day'),
      endDate: getEndDate(startDate, offset, mode)
    });
  };

  return (
    <div className="flex flex-r-center">
      {!['any', 'viewDateRange', 'anyDateRange', 'allCards'].includes(mode) && (
        <TimelineTimeframeSelector
          color={color}
          className="timeline-view__timeframe goal-board-options"
          columnMode={mode}
          value={startDate}
          onChange={handleDateChange}
          offset={offset}
          dropZoneEnabled={dropZoneEnabled}
          goalView
        />
      )}
      {mode === 'anyDateRange' && (
        <Popup
          on="click"
          trigger={
            <div className="goal-board-options timeline-view__any-timeframe-selector">
              {moment(startDate).format('YYYY MMMM DD')} -{' '}
              {moment(endDate).format('YYYY MMMM DD')}
            </div>
          }
          position="bottom left"
          arrow={false}
        >
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onSelect={handleDateRangeChange}
          />
        </Popup>
      )}
      <TimelineModeSelector
        color={color}
        bold={bold}
        className="timeline-view__mode-selector goal-board-options"
        value={mode}
        onChange={handleModeChange}
        renderItem={opt =>
          ['weeks', 'days'].includes(opt.id) ? (
            <Fragment>
              {opt.name}
              <span className="goal-view__options-item-right">
                <input
                  className="goal-view__options-input"
                  type="number"
                  min="1"
                  value={offsets[opt.id]}
                  onChange={handleOffsetChange(opt.id)}
                  onClick={e => e.preventDefault()}
                />
                {opt.name.replace(/s$/, '')}(s)
              </span>
            </Fragment>
          ) : (
            opt.name
          )
        }
        goalView
      />
    </div>
  );
};

TimeframeSelectors.defaultProps = {
  offsets: {}
};

export default TimeframeSelectors;
