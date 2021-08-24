import React, { Component } from 'react';
import TimelineTimeframeSelector from 'Components/shared/TimelineTimeframeSelector';
import TimelineModeSelector from 'Components/shared/TimelineModeSelector';
import moment from 'moment';
import { connect } from 'react-redux';
import { stateMappings } from 'Src/newRedux/stateMappings';
import { updateTimeframe } from 'Src/newRedux/database/GIDBFLenses/actions';

const COL_MODE_MONTH = 'monthDays';
const COL_MODE_WEEK = 'weeks';
const COL_MODE_DAY = 'days';

class TimeframeSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnMode: props.lensType != 'dayLens' ? COL_MODE_WEEK : COL_MODE_DAY,
      startDate:
        props.lensType != 'dayLens'
          ? moment().startOf('week')
          : moment().startOf('day')
    };
  }

  changeTimeframe = () => {
    const { lensType, updateTimeframe } = this.props;
    updateTimeframe({
      timeframe_mode: lensType != 'dayLens' ? COL_MODE_WEEK : COL_MODE_DAY,
      timeframe: {
        startDate:
          lensType != 'dayLens'
            ? moment().startOf('week')
            : moment().startOf('day'),
        endDate:
          lensType != 'dayLens' ? moment().endOf('week') : moment().endOf('day')
      }
    });
  };

  componentDidMount() {
    this.changeTimeframe();
  }

  componentDidUpdate(prevProps) {
    const { lensType } = this.props;
    if (prevProps.lensType != lensType) {
      this.handleTimelineModeChange(
        lensType != 'dayLens' ? COL_MODE_WEEK : COL_MODE_DAY
      );
      this.changeTimeframe();
    }
  }

  getTimeUnit = () =>
    this.state.columnMode === COL_MODE_MONTH ? 'month' : 'week';

  handleTimelineModeChange = columnMode => {
    const { startDate } = this.state;
    const { updateTimeframe } = this.props;
    const newStartDate =
      columnMode === COL_MODE_MONTH
        ? moment(startDate).startOf('month')
        : columnMode === COL_MODE_WEEK
        ? moment(startDate).startOf('week')
        : moment().startOf('day');
    this.setState(
      {
        columnMode,
        startDate: newStartDate
      },
      () => {
        const endDate = newStartDate.clone().endOf(this.getTimeUnit());
        updateTimeframe({
          timeframe_mode: columnMode,
          timeframe: { startDate: newStartDate, endDate }
        });
      }
    );
  };

  handleTimeframeDateChange = startDate => {
    const { updateTimeframe } = this.props;
    const { columnMode } = this.state;
    this.setState({ startDate }, () => {
      updateTimeframe({
        timeframe_mode: columnMode,
        timeframe: {
          startDate: startDate,
          endDate: startDate.clone().endOf(this.getTimeUnit())
        }
      });
    });
  };

  render() {
    const { card_font_color, style } = this.props;
    return (
      <div className="timeframe" style={{ ...style }}>
        <div>
          <TimelineTimeframeSelector
            className="wsv planning-view__timeframe"
            columnMode={this.state.columnMode}
            value={this.state.startDate}
            onChange={this.handleTimeframeDateChange}
            board="planLens"
          />
        </div>
        <div>
          <TimelineModeSelector
            color={card_font_color}
            className="planning-view__mode-selector"
            value={this.state.columnMode}
            onChange={this.handleTimelineModeChange}
            board="planLens"
            bold
          />
        </div>
      </div>
    );
  }
}

const mapState = state => {
  const {
    utilities: { active_design }
  } = stateMappings(state);
  return {
    card_font_color: active_design.card_font_color
  };
};

const mapDispatch = {
  updateTimeframe
};

export default connect(mapState, mapDispatch)(TimeframeSelector);
